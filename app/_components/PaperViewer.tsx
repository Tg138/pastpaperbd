"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Breakdown, Paper, Question, RelatedNote, SpecPoint } from "@/lib/types";
import type { InteractivePdfHandle } from "./InteractivePdf";

const InteractivePdf = dynamic(
  () => import("./InteractivePdf").then((m) => m.InteractivePdf),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center bg-surface-2 text-sm text-muted">
        Loading paper…
      </div>
    ),
  }
);

export interface QuestionEntry {
  question: Question;
  breakdown: Breakdown | undefined;
  specPoints: SpecPoint[];
  relatedNotes: RelatedNote[];
}

type ViewLayout = "qp" | "ms" | "split";
type RenderMode = "classic" | "interactive";
type SidebarKey = "spec" | "walkthrough";

export function PaperViewer({
  paper,
  entries,
}: {
  paper: Paper;
  entries: QuestionEntry[];
}) {
  const [examMode, setExamMode] = useState(false);
  const [layout, setLayout] = useState<ViewLayout>("qp");
  const [renderMode, setRenderMode] = useState<RenderMode>("interactive");

  // Both panels can be open simultaneously
  const [openPanels, setOpenPanels] = useState<Set<SidebarKey>>(new Set());

  const togglePanel = (key: SidebarKey) => {
    setOpenPanels((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };
  const closePanel = (key: SidebarKey) => {
    setOpenPanels((prev) => {
      if (!prev.has(key)) return prev;
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  };

  const [activeQid, setActiveQid] = useState<string | null>(
    entries[0]?.question.id ?? null
  );
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const qpHandleRef = useRef<InteractivePdfHandle>(null);
  const msHandleRef = useRef<InteractivePdfHandle>(null);

  const storageKey = `progress:${paper.subject}-${paper.year}-p${paper.paperNumber}`;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setCompleted(new Set(JSON.parse(raw)));
    } catch {}
  }, [storageKey]);

  const persistCompleted = (next: Set<string>) => {
    setCompleted(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify([...next]));
    } catch {}
  };

  const toggleComplete = (qid: string) => {
    const next = new Set(completed);
    if (next.has(qid)) next.delete(qid);
    else next.add(qid);
    persistCompleted(next);
  };

  const allDone = entries.length > 0 && entries.every((e) => completed.has(e.question.id));
  const msAvailable = !examMode || allDone;

  const questionPages = useMemo(() => {
    const map: Record<number, string> = {};
    for (const e of entries) {
      if (e.question.pageNumber) map[e.question.pageNumber] = e.question.id;
    }
    return map;
  }, [entries]);

  const activeEntry =
    entries.find((e) => e.question.id === activeQid) ?? entries[0];

  const onSelectQuestion = (qid: string) => {
    setActiveQid(qid);
    const entry = entries.find((e) => e.question.id === qid);
    if (renderMode === "interactive" && entry?.question.pageNumber) {
      if (layout === "split") {
        qpHandleRef.current?.scrollToPage(entry.question.pageNumber);
        msHandleRef.current?.scrollToPage(entry.question.pageNumber);
      } else {
        const handle = layout === "qp" ? qpHandleRef : msHandleRef;
        handle.current?.scrollToPage(entry.question.pageNumber);
      }
    }
  };

  const handleLayoutChange = (v: string) => {
    const next = v as ViewLayout;
    if (next === "ms" && !msAvailable) return;
    if (next === "split" && !msAvailable) return;
    setLayout(next);
    // Walkthrough never auto-persists across layout changes — close it on switch
    closePanel("walkthrough");
  };

  const downloadHref = layout === "ms" ? paper.msPath : paper.qpPath;

  const specOpen = openPanels.has("spec");
  const walkthroughOpen = openPanels.has("walkthrough");

  return (
    <div className="flex flex-1 min-h-0 flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-border bg-surface shrink-0 flex-wrap">
        <SegmentedControl
          options={[
            { value: "qp", label: "Question paper" },
            {
              value: "ms",
              label: "Mark scheme",
              disabled: !msAvailable,
              title: !msAvailable ? "Complete all questions to unlock" : undefined,
            },
            {
              value: "split",
              label: "Side by side",
              disabled: !msAvailable,
              title: !msAvailable ? "Complete all questions to unlock" : undefined,
            },
          ]}
          value={layout}
          onChange={handleLayoutChange}
        />

        <div className="h-5 w-px bg-border" />

        <SegmentedControl
          options={[
            { value: "interactive", label: "Interactive" },
            { value: "classic", label: "Classic PDF" },
          ]}
          value={renderMode}
          onChange={(v) => setRenderMode(v as RenderMode)}
        />

        <div className="ml-auto flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-muted cursor-pointer select-none">
            <input
              type="checkbox"
              checked={examMode}
              onChange={(e) => setExamMode(e.target.checked)}
              className="accent-accent"
            />
            Exam mode
          </label>
          <a
            href={downloadHref}
            download
            className="text-xs text-muted hover:text-accent transition-colors"
          >
            Download
          </a>
        </div>
      </div>

      {/* Main content row: [Spec col] [PDF area] [Walkthrough col] */}
      <div className="flex flex-1 min-h-0 relative">
        {/* Spec docked column */}
        <DockedPanel side="left" open={specOpen} onClose={() => closePanel("spec")}>
          <SpecSidebar
            entry={activeEntry}
            entries={entries}
            activeQid={activeQid}
            onSelectQuestion={onSelectQuestion}
          />
        </DockedPanel>

        {/* Spec edge tab */}
        <EdgeTab
          side="left"
          label="Spec"
          active={specOpen}
          onClick={() => togglePanel("spec")}
        />

        {/* PDF area — single (qp/ms) or split */}
        <div className="flex-1 min-w-0 flex">
          {layout === "split" ? (
            <>
              <PdfPane label="Question paper" className="flex-1 min-w-0 border-r border-border">
                {renderMode === "interactive" ? (
                  <InteractivePdf
                    src={paper.qpPath}
                    questionPages={questionPages}
                    onActiveQuestionChange={(qid) => qid && setActiveQid(qid)}
                    handleRef={qpHandleRef}
                  />
                ) : (
                  <iframe src={paper.qpPath} className="w-full h-full bg-surface-2" title="Question paper" />
                )}
              </PdfPane>
              <PdfPane label="Mark scheme" className="flex-1 min-w-0">
                {renderMode === "interactive" ? (
                  msAvailable ? (
                    <InteractivePdf
                      src={paper.msPath}
                      questionPages={questionPages}
                      handleRef={msHandleRef}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-surface-2 text-sm text-muted">
                      Complete all questions to unlock the mark scheme.
                    </div>
                  )
                ) : (
                  <iframe
                    src={msAvailable ? paper.msPath : ""}
                    className="w-full h-full bg-surface-2"
                    title="Mark scheme"
                  />
                )}
              </PdfPane>
            </>
          ) : (
            <PdfPane
              key={layout}
              label={layout === "qp" ? "Question paper" : "Mark scheme"}
              className="flex-1 min-w-0"
            >
              {renderMode === "interactive" ? (
                layout === "qp" ? (
                  <InteractivePdf
                    src={paper.qpPath}
                    questionPages={questionPages}
                    onActiveQuestionChange={(qid) => qid && setActiveQid(qid)}
                    handleRef={qpHandleRef}
                  />
                ) : msAvailable ? (
                  <InteractivePdf
                    src={paper.msPath}
                    questionPages={questionPages}
                    handleRef={msHandleRef}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-surface-2 text-sm text-muted">
                    Complete all questions to unlock the mark scheme.
                  </div>
                )
              ) : (
                <iframe
                  src={layout === "qp" ? paper.qpPath : msAvailable ? paper.msPath : ""}
                  className="w-full h-full bg-surface-2"
                  title={layout === "qp" ? "Question paper" : "Mark scheme"}
                />
              )}
            </PdfPane>
          )}
        </div>

        {/* Walkthrough docked column */}
        <DockedPanel side="right" open={walkthroughOpen} onClose={() => closePanel("walkthrough")}>
          <WalkthroughSidebar
            entry={activeEntry}
            entries={entries}
            activeQid={activeQid}
            onSelectQuestion={onSelectQuestion}
            completed={completed}
            onToggleComplete={toggleComplete}
            examMode={examMode}
          />
        </DockedPanel>

        {/* Walkthrough edge tab */}
        <EdgeTab
          side="right"
          label="Walkthrough"
          active={walkthroughOpen}
          onClick={() => togglePanel("walkthrough")}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// PdfPane — wrapper for a PDF area with a label badge

function PdfPane({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider text-muted bg-surface/80 backdrop-blur-sm border border-border pointer-events-none">
        {label}
      </div>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Toolbar — segmented control

function SegmentedControl({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string; disabled?: boolean; title?: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex rounded-md border border-border overflow-hidden text-sm">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => !opt.disabled && onChange(opt.value)}
          disabled={opt.disabled}
          title={opt.title}
          className={`px-3 py-1.5 transition-colors ${
            value === opt.value ? "bg-accent text-white" : "hover:bg-surface-2"
          } ${opt.disabled ? "opacity-40 cursor-not-allowed" : ""}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Edge tab — sits on the outer edge of the content area

function EdgeTab({
  side,
  label,
  active,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-30 px-1.5 py-4 text-xs font-medium border border-border transition-colors duration-200 ${
        side === "left"
          ? "left-0 rounded-r-md border-l-0"
          : "right-0 rounded-l-md border-r-0"
      } ${
        active
          ? "bg-accent text-white border-accent"
          : "bg-surface hover:bg-accent-soft hover:text-accent"
      }`}
      style={{
        writingMode: "vertical-rl",
        textOrientation: "mixed",
      }}
    >
      {label}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────
// Docked panel — pushes content aside instead of overlaying

function DockedPanel({
  side,
  open,
  onClose,
  children,
}: {
  side: "left" | "right";
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const borderClass = side === "left" ? "border-r" : "border-l";

  return (
    <div className={`shrink-0 w-[360px] max-w-[40%] bg-surface ${borderClass} border-border flex flex-col`}>
      <div className="flex items-center justify-end px-3 py-2 border-b border-border shrink-0">
        <button
          onClick={onClose}
          aria-label="Close panel"
          className="text-muted hover:text-foreground transition-colors text-lg leading-none px-2"
        >
          ×
        </button>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Question tab bar

function QuestionTabBar({
  entries,
  activeQid,
  onSelect,
}: {
  entries: QuestionEntry[];
  activeQid: string | null;
  onSelect: (qid: string) => void;
}) {
  const activeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeQid]);

  return (
    <div className="flex border-b border-border bg-surface overflow-x-auto shrink-0">
      {entries.map((e) => {
        const isActive = activeQid === e.question.id;
        return (
          <button
            key={e.question.id}
            ref={isActive ? activeRef : undefined}
            onClick={() => onSelect(e.question.id)}
            className={`relative px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
              isActive ? "text-accent" : "text-muted hover:text-foreground"
            }`}
          >
            Q{e.question.number}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Spec sidebar

function SpecSidebar({
  entry,
  entries,
  activeQid,
  onSelectQuestion,
}: {
  entry: QuestionEntry | undefined;
  entries: QuestionEntry[];
  activeQid: string | null;
  onSelectQuestion: (qid: string) => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <QuestionTabBar entries={entries} activeQid={activeQid} onSelect={onSelectQuestion} />

      {entry ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted mb-2">
              Spec points for Q{entry.question.number}
            </div>
            <div className="space-y-3">
              {entry.specPoints.length === 0 && (
                <div className="text-sm text-muted">No spec points tagged yet.</div>
              )}
              {entry.specPoints.map((sp) => (
                <div key={sp.id} className="rounded-md border border-border bg-background p-3">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xs text-accent">{sp.id}</span>
                    <span className="text-sm font-medium">{sp.title}</span>
                  </div>
                  <div className="mt-2 text-xs leading-relaxed text-foreground/80">
                    {sp.description}
                  </div>
                  {sp.breakdown && (
                    <Collapsible label="In plain English">
                      <div className="text-xs leading-relaxed">{sp.breakdown}</div>
                    </Collapsible>
                  )}
                </div>
              ))}
            </div>
          </div>
          <RelatedNotes notes={entry.relatedNotes} />
        </div>
      ) : (
        <div className="p-4 text-sm text-muted">No question selected.</div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Walkthrough sidebar

function WalkthroughSidebar({
  entry,
  entries,
  activeQid,
  onSelectQuestion,
  completed,
  onToggleComplete,
  examMode,
}: {
  entry: QuestionEntry | undefined;
  entries: QuestionEntry[];
  activeQid: string | null;
  onSelectQuestion: (qid: string) => void;
  completed: Set<string>;
  onToggleComplete: (qid: string) => void;
  examMode: boolean;
}) {
  const done = entry ? completed.has(entry.question.id) : false;
  const breakdownLocked = examMode && entry !== undefined && !done;

  return (
    <div className="flex flex-col h-full">
      <QuestionTabBar entries={entries} activeQid={activeQid} onSelect={onSelectQuestion} />

      <div className="px-4 py-2 border-b border-border text-xs text-muted shrink-0">
        {completed.size} / {entries.length} marked done
      </div>

      {entry ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleComplete(entry.question.id)}
              aria-label={done ? "Mark as not done" : "Mark as done"}
              className={`h-5 w-5 shrink-0 rounded-sm border ${
                done ? "bg-accent border-accent" : "border-border"
              } flex items-center justify-center transition-colors`}
            >
              {done && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-base font-semibold">Q{entry.question.number}</span>
              <span className="text-xs text-muted">{entry.question.marks} marks</span>
            </div>
          </div>

          {breakdownLocked ? (
            <div className="rounded border border-border bg-background p-3 text-sm text-muted">
              Mark this question as done to reveal the walkthrough. Exam mode is on — try it first.
            </div>
          ) : entry.breakdown ? (
            <div className="space-y-2">
              <Collapsible label="Mark scheme answer" defaultClosed>
                <div className="text-sm leading-relaxed whitespace-pre-line">{entry.breakdown.msAnswer}</div>
              </Collapsible>
              <Collapsible label="Why this is the answer" defaultClosed>
                <div className="text-sm leading-relaxed whitespace-pre-line">{entry.breakdown.whyExplanation}</div>
              </Collapsible>
              {entry.breakdown.commonMistakes && (
                <Collapsible label="Common mistakes" defaultClosed variant="warn">
                  <div className="text-sm leading-relaxed whitespace-pre-line">{entry.breakdown.commonMistakes}</div>
                </Collapsible>
              )}
              {entry.specPoints.length > 0 && (
                <div className="pt-2">
                  <div className="text-[10px] uppercase tracking-wider text-muted mb-1.5">
                    Spec points
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {entry.specPoints.map((sp) => (
                      <span
                        key={sp.id}
                        className="inline-flex items-baseline gap-1.5 rounded bg-accent-soft text-accent px-2 py-0.5 text-xs"
                      >
                        <span className="font-mono">{sp.id}</span>
                        <span>{sp.title}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-sm text-muted">Walkthrough not available yet for this question.</div>
          )}

          <RelatedNotes notes={entry.relatedNotes} />
        </div>
      ) : (
        <div className="p-4 text-sm text-muted">No question selected.</div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Collapsible section

function Collapsible({
  label,
  children,
  defaultClosed = false,
  variant = "default",
}: {
  label: string;
  children: React.ReactNode;
  defaultClosed?: boolean;
  variant?: "default" | "warn";
}) {
  const [open, setOpen] = useState(!defaultClosed);

  const borderClass = variant === "warn" ? "border-amber-500/30" : "border-border";
  const bgClass = variant === "warn" ? "bg-amber-500/5" : "bg-background";

  return (
    <div className={`rounded border ${borderClass} ${bgClass} overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-surface-2/50 transition-colors"
      >
        <span className="text-[10px] uppercase tracking-wider text-muted">{label}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-muted transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div className="px-3 pb-3">{children}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Shared

function RelatedNotes({ notes }: { notes: RelatedNote[] }) {
  if (notes.length === 0) return null;

  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted mb-1.5">
        Related notes
      </div>
      <div className="space-y-1">
        {notes.map((note) => (
          <Link
            key={`${note.slug}-${note.sectionAnchor ?? "note"}`}
            href={`/biology/notes/${note.slug}${note.sectionAnchor ? `#${note.sectionAnchor}` : ""}`}
            className="block rounded border border-border bg-background px-2.5 py-2 text-xs hover:border-accent hover:bg-accent-soft transition-colors"
          >
            <span className="font-medium">{note.title}</span>
            <span className="ml-2 font-mono text-muted">{note.topic}</span>
            {note.sectionTitle && (
              <span className="mt-1 block text-muted">Jump to {note.sectionTitle}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
