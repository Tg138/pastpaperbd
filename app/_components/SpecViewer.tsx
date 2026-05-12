"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { RelatedNote, SpecPoint } from "@/lib/types";
import type { InteractivePdfHandle } from "./InteractivePdf";

const InteractivePdf = dynamic(
  () => import("./InteractivePdf").then((m) => m.InteractivePdf),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center bg-surface-2 text-sm text-muted">
        Loading specification…
      </div>
    ),
  }
);

export interface SpecEntry {
  point: SpecPoint;
  relatedNotes: RelatedNote[];
}

type RenderMode = "classic" | "interactive";
type SidebarKey = "topics" | "notes";

// ─────────────────────────────────────────────────────────────────
// Icons

function IconList({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={active ? "text-accent" : "text-muted"}>
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function IconNotes({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={active ? "text-accent" : "text-muted"}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// Main

export function SpecViewer({
  specPdfPath,
  entries,
}: {
  specPdfPath: string;
  entries: SpecEntry[];
}) {
  const [renderMode, setRenderMode] = useState<RenderMode>("interactive");
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

  const [activeId, setActiveId] = useState<string | null>(null);
  const pdfHandle = useRef<InteractivePdfHandle>(null);

  const onScrollActiveChange = useCallback((id: string | null) => {
    if (id) setActiveId(id);
  }, []);

  const pageMap = useMemo(() => {
    const map: Record<number, string[]> = {};
    for (const e of entries) {
      if (e.point.pageNumber) {
        (map[e.point.pageNumber] ??= []).push(e.point.id);
      }
    }
    return map;
  }, [entries]);

  const activeEntry = entries.find((e) => e.point.id === activeId) ?? undefined;

  const onSelectPoint = (id: string) => {
    setActiveId(id);
    const entry = entries.find((e) => e.point.id === id);
    if (renderMode === "interactive" && entry?.point.pageNumber) {
      pdfHandle.current?.scrollToPage(entry.point.pageNumber);
    }
  };

  const grouped = useMemo(() => {
    const map = new Map<string, SpecEntry[]>();
    for (const e of entries) {
      const list = map.get(e.point.topic) ?? [];
      list.push(e);
      map.set(e.point.topic, list);
    }
    return Array.from(map.entries());
  }, [entries]);

  const topicsOpen = openPanels.has("topics");
  const notesOpen = openPanels.has("notes");

  return (
    <div className="flex flex-1 min-h-0 flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-border bg-surface shrink-0 flex-wrap">
        {/* Topics toggle */}
        <button
          onClick={() => togglePanel("topics")}
          aria-label="Toggle topics panel"
          title="Topics"
          className={`p-1.5 rounded transition-colors duration-150 ${
            topicsOpen ? "bg-accent-soft text-accent" : "hover:bg-surface-2 text-muted hover:text-foreground"
          }`}
        >
          <IconList active={topicsOpen} />
        </button>

        <SegmentedControl
          options={[
            { value: "interactive", label: "Interactive" },
            { value: "classic", label: "Classic PDF" },
          ]}
          value={renderMode}
          onChange={(v) => setRenderMode(v as RenderMode)}
        />

        <div className="ml-auto flex items-center gap-3">
          <a
            href={specPdfPath}
            download
            className="text-xs text-muted hover:text-accent transition-colors"
          >
            Download
          </a>

          {/* Notes toggle */}
          <button
            onClick={() => togglePanel("notes")}
            aria-label="Toggle notes panel"
            title="Notes"
            className={`p-1.5 rounded transition-colors duration-150 ${
              notesOpen ? "bg-accent-soft text-accent" : "hover:bg-surface-2 text-muted hover:text-foreground"
            }`}
          >
            <IconNotes active={notesOpen} />
          </button>
        </div>
      </div>

      {/* Main content row */}
      <div className="flex flex-1 min-h-0 relative">
        {/* Topics docked panel */}
        <DockedPanel side="left" open={topicsOpen} onClose={() => closePanel("topics")}>
          <TopicsSidebar grouped={grouped} activeId={activeId} onSelect={onSelectPoint} />
        </DockedPanel>

        {/* Topics edge tab */}
        <EdgeTab
          side="left"
          label="Topics"
          active={topicsOpen}
          onClick={() => togglePanel("topics")}
        />

        {/* PDF */}
        <div className="flex-1 min-w-0 flex">
          <PdfPane label="AQA 7402 specification" className="flex-1 min-w-0">
            {renderMode === "interactive" ? (
              <InteractivePdf
                src={specPdfPath}
                questionPages={pageMap}
                onActiveQuestionChange={onScrollActiveChange}
                handleRef={pdfHandle}
              />
            ) : (
              <iframe
                src={specPdfPath}
                className="w-full h-full bg-surface-2"
                title="AQA 7402 specification"
              />
            )}
          </PdfPane>
        </div>

        {/* Notes docked panel */}
        <DockedPanel side="right" open={notesOpen} onClose={() => closePanel("notes")}>
          <NotesSidebar entry={activeEntry} />
        </DockedPanel>

        {/* Notes edge tab */}
        <EdgeTab
          side="right"
          label="Notes"
          active={notesOpen}
          onClick={() => togglePanel("notes")}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// PdfPane

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
// SegmentedControl

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
// Edge tab

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
      style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
    >
      {label}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────
// Docked panel

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
// Topics sidebar

function TopicsSidebar({
  grouped,
  activeId,
  onSelect,
}: {
  grouped: [string, SpecEntry[]][];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const activeRef = useRef<HTMLButtonElement>(null);
  const [openTopics, setOpenTopics] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeId]);

  // Auto-open topic containing the active spec point
  useEffect(() => {
    if (!activeId) return;
    const topic = grouped.find(([, list]) => list.some((e) => e.point.id === activeId))?.[0];
    if (topic) setOpenTopics((prev) => new Set([...prev, topic]));
  }, [activeId, grouped]);

  function toggleTopic(topic: string) {
    setOpenTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topic)) next.delete(topic);
      else next.add(topic);
      return next;
    });
  }

  return (
    <div className="p-3 space-y-1">
      {grouped.map(([topic, list]) => {
        const isOpen = openTopics.has(topic);
        return (
          <section key={topic}>
            <button
              onClick={() => toggleTopic(topic)}
              className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md hover:bg-surface-2 transition-colors group"
            >
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className={`shrink-0 text-muted transition-transform ${isOpen ? "rotate-90" : ""}`}
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="text-xs uppercase tracking-wider text-muted font-medium group-hover:text-foreground/70 transition-colors">
                {topic}
              </span>
              <span className="ml-auto text-xs text-muted/60">{list.length}</span>
            </button>
            {isOpen && (
              <div className="space-y-0.5 mt-0.5 ml-3">
                {list.map((e) => {
                  const isActive = activeId === e.point.id;
                  return (
                    <button
                      key={e.point.id}
                      ref={isActive ? activeRef : undefined}
                      onClick={() => onSelect(e.point.id)}
                      className={`w-full text-left flex items-baseline gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
                        isActive
                          ? "bg-accent-soft text-accent"
                          : "hover:bg-surface-2 text-foreground/90"
                      }`}
                    >
                      <span className={`font-mono text-sm shrink-0 ${isActive ? "text-accent" : "text-muted"}`}>
                        {e.point.id}
                      </span>
                      <span className="leading-snug text-sm">{e.point.title}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Notes sidebar

function NotesSidebar({ entry }: { entry: SpecEntry | undefined }) {
  if (!entry) {
    return <div className="p-4 text-sm text-muted">No spec point selected.</div>;
  }

  const sp = entry.point;

  return (
    <div className="p-4 space-y-4">
      <div>
        <div className="text-[10px] uppercase tracking-wider text-muted mb-1">
          {sp.topic}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-sm text-accent">{sp.id}</span>
          <h2 className="text-base font-semibold leading-tight">{sp.title}</h2>
        </div>
        <Link
          href={`/biology/spec/${sp.id}`}
          className="mt-2 inline-flex items-center gap-1 text-xs text-accent hover:underline"
        >
          View full page <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="rounded-md border border-border bg-background p-3 text-sm leading-relaxed">
        {sp.description}
      </div>

      {sp.breakdown && (
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted mb-1.5">
            In plain English
          </div>
          <div className="rounded-md border border-border bg-accent-soft/40 p-3 text-sm leading-relaxed">
            {sp.breakdown}
          </div>
        </div>
      )}

      <RelatedNotes notes={entry.relatedNotes} />
    </div>
  );
}

function RelatedNotes({ notes }: { notes: RelatedNote[] }) {
  if (notes.length === 0) {
    return (
      <div className="text-xs text-muted">No notes linked to this spec point yet.</div>
    );
  }

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
