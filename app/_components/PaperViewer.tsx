"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

// ─────────────────────────────────────────────────────────────────
// Icons

function IconSpec({ active }: { active: boolean }) {
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

function IconWalkthrough({ active }: { active: boolean }) {
  return (
    <span className={`text-xs font-semibold tracking-wide ${active ? "text-accent" : "text-muted"}`}>MS</span>
  );
}
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
  initialPage,
  initialPanels,
}: {
  paper: Paper;
  entries: QuestionEntry[];
  initialPage?: number;
  initialPanels?: SidebarKey[];
}) {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 767px)");

  const [examMode, setExamMode] = useState(false);
  const [layout, setLayoutRaw] = useState<ViewLayout>("qp");
  const [renderMode, setRenderMode] = useState<RenderMode>("interactive");
  const [zoom, setZoom] = useState(1);
  const pdfAreaRef = useRef<HTMLDivElement>(null);
  const mainRowRef = useRef<HTMLDivElement>(null);
  const [mainRowWidth, setMainRowWidth] = useState(0);

  // Force away from split layout on mobile — side-by-side PDFs are unusable on phones.
  const setLayout = useCallback(
    (v: ViewLayout | ((prev: ViewLayout) => ViewLayout)) => {
      setLayoutRaw((prev) => {
        const next = typeof v === "function" ? v(prev) : v;
        return next;
      });
    },
    []
  );

  useEffect(() => {
    if (isMobile && layout === "split") setLayoutRaw("qp");
  }, [isMobile, layout]);

  const clampZoom = (v: number) => Math.min(Math.max(Math.round(v * 20) / 20, 0.5), 3);
  const zoomIn = () => setZoom((z) => clampZoom(z + 0.25));
  const zoomOut = () => setZoom((z) => clampZoom(z - 0.25));
  const zoomReset = () => setZoom(1);

  // Measure main row width for panel sizing
  useEffect(() => {
    const el = mainRowRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) setMainRowWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Ctrl+scroll to zoom — attached to document so we beat the browser's native
  // pinch-zoom handler, but only acts when the pointer is over the PDF area.
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      if (!pdfAreaRef.current?.contains(e.target as Node)) return;
      e.preventDefault();
      setZoom((z) => clampZoom(z - e.deltaY * 0.001));
    };
    document.addEventListener("wheel", handler, { passive: false });
    return () => document.removeEventListener("wheel", handler);
  }, []);

  // Both panels can be open simultaneously
  const [openPanels, setOpenPanels] = useState<Set<SidebarKey>>(new Set(initialPanels ?? []));

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

  const [activeQid, setActiveQid] = useState<string | null>(() => {
    if (initialPage) {
      const match = entries.find((e) => e.question.pageNumber === initialPage);
      if (match) return match.question.id;
    }
    return entries[0]?.question.id ?? null;
  });
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
    const map: Record<number, string[]> = {};
    for (const e of entries) {
      if (e.question.pageNumber) {
        (map[e.question.pageNumber] ??= []).push(e.question.id);
      }
    }
    return map;
  }, [entries]);

  const activeEntry =
    entries.find((e) => e.question.id === activeQid) ?? entries[0];

  const panelsParam = openPanels.size > 0 ? `&panels=${[...openPanels].join(",")}` : "";
  const backHref = activeEntry?.question.pageNumber
    ? `${pathname}?page=${activeEntry.question.pageNumber}${panelsParam}`
    : `${pathname}${panelsParam ? `?${panelsParam.slice(1)}` : ""}`;

  const onScrollActiveQuestionChange = useCallback((qid: string | null) => {
    if (qid) setActiveQid(qid);
  }, []);

  const onSelectQuestion = useCallback(
    (qid: string) => {
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
    },
    [entries, layout, renderMode]
  );

  const [showHelp, setShowHelp] = useState(false);

  // Keyboard shortcuts: j/k navigate questions, s/w toggle panels, x exam mode, ? help.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable='true']")) return;

      if (e.key === "?") {
        e.preventDefault();
        setShowHelp((v) => !v);
        return;
      }
      if (entries.length === 0) return;
      const currentIdx = entries.findIndex((entry) => entry.question.id === activeQid);

      if (e.key === "j" || e.key === "ArrowRight") {
        e.preventDefault();
        const next = entries[Math.min(entries.length - 1, currentIdx + 1)];
        if (next) onSelectQuestion(next.question.id);
      } else if (e.key === "k" || e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = entries[Math.max(0, currentIdx - 1)];
        if (prev) onSelectQuestion(prev.question.id);
      } else if (e.key === "s") {
        e.preventDefault();
        togglePanel("spec");
      } else if (e.key === "w") {
        e.preventDefault();
        togglePanel("walkthrough");
      } else if (e.key === "x") {
        e.preventDefault();
        setExamMode((v) => !v);
      } else if (e.key === "m" && msAvailable) {
        e.preventDefault();
        setLayout((prev) => (prev === "ms" ? "qp" : "ms"));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeQid, entries, msAvailable, onSelectQuestion, setLayout]);

  // In split view, mirror QP page changes onto the MS by page number.
  // This handles the MS cover pages correctly — both land on the same question page.
  useEffect(() => {
    if (layout !== "split") return;
    if (!activeQid) return;
    const entry = entries.find((e) => e.question.id === activeQid);
    if (entry?.question.pageNumber) {
      msHandleRef.current?.scrollToPage(entry.question.pageNumber);
    }
  }, [activeQid, layout, entries]);

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

  // Width of each panel in dual-overlay mode: (containerWidth - docWidth) / 2 - 40
  // docWidth mirrors InteractivePdf's own sizing: clamp(containerWidth - 80, 320, 760) * zoom
  const dualPanelWidth = useMemo(() => {
    if (mainRowWidth === 0) return 360;
    const docWidth = Math.min(Math.max(mainRowWidth - 80, 320), 760) * zoom;
    return Math.max((mainRowWidth - docWidth) / 2 - 8, 200);
  }, [mainRowWidth, zoom]);

  return (
    <div className="flex flex-1 min-h-0 flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 border-b border-border bg-surface shrink-0 flex-wrap">
        {/* Spec toggle */}
        <button
          onClick={() => togglePanel("spec")}
          aria-label="Toggle spec panel"
          title="Spec points"
          className={`p-1.5 rounded transition-colors duration-150 ${
            specOpen ? "bg-accent-soft text-accent" : "hover:bg-surface-2 text-muted hover:text-foreground"
          }`}
        >
          <IconSpec active={specOpen} />
        </button>

        {/* Desktop layout segmented control */}
        <div className="hidden md:block">
          <SegmentedControl
            options={[
              { value: "qp", label: "Question paper" },
              {
                value: "ms",
                label: "MS",
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
        </div>

        {/* Mobile layout switch — QP / MS only, no split */}
        <div className="flex md:hidden">
          <SegmentedControl
            options={[
              { value: "qp", label: "QP" },
              {
                value: "ms",
                label: "MS",
                disabled: !msAvailable,
                title: !msAvailable ? "Complete all questions to unlock" : undefined,
              },
            ]}
            value={layout === "split" ? "qp" : layout}
            onChange={handleLayoutChange}
          />
        </div>

        <div className="hidden md:block h-5 w-px bg-border" />

        {/* Render mode — desktop only */}
        <div className="hidden md:block">
          <SegmentedControl
            options={[
              { value: "interactive", label: "Interactive" },
              { value: "classic", label: "Classic PDF" },
            ]}
            value={renderMode}
            onChange={(v) => setRenderMode(v as RenderMode)}
          />
        </div>

        {/* Zoom controls — desktop only (mobile uses native pinch) */}
        <div className="hidden md:flex items-center gap-1 rounded-md border border-border overflow-hidden text-sm">
          <button onClick={zoomOut} title="Zoom out" className="px-2 py-1.5 hover:bg-surface-2 transition-colors text-muted hover:text-foreground">−</button>
          <button onClick={zoomReset} title="Reset zoom" className="px-2 py-1.5 hover:bg-surface-2 transition-colors text-xs text-muted hover:text-foreground tabular-nums w-12 text-center">{Math.round(zoom * 100)}%</button>
          <button onClick={zoomIn} title="Zoom in" className="px-2 py-1.5 hover:bg-surface-2 transition-colors text-muted hover:text-foreground">+</button>
        </div>

        <div className="ml-auto flex items-center gap-2 md:gap-4">
          {/* Exam mode — text on desktop, icon-only on mobile */}
          <label className="hidden md:flex items-center gap-2 text-sm text-muted cursor-pointer select-none">
            <input
              type="checkbox"
              checked={examMode}
              onChange={(e) => setExamMode(e.target.checked)}
              className="accent-accent"
            />
            Exam mode
          </label>
          <button
            type="button"
            onClick={() => setExamMode((v) => !v)}
            aria-label={examMode ? "Disable exam mode" : "Enable exam mode"}
            title={examMode ? "Exam mode on" : "Exam mode off"}
            className={`md:hidden p-1.5 rounded transition-colors ${
              examMode ? "bg-accent-soft text-accent" : "text-muted hover:bg-surface-2 hover:text-foreground"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </button>

          <a
            href={downloadHref}
            download
            aria-label="Download PDF"
            className="text-xs text-muted hover:text-accent transition-colors hidden md:inline"
          >
            Download
          </a>
          <a
            href={downloadHref}
            download
            aria-label="Download PDF"
            className="md:hidden p-1.5 text-muted hover:text-accent transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>

          {/* Walkthrough toggle */}
          <button
            onClick={() => togglePanel("walkthrough")}
            aria-label="Toggle walkthrough panel"
            title="Walkthrough"
            className={`p-1.5 rounded transition-colors duration-150 ${
              walkthroughOpen ? "bg-accent-soft text-accent" : "hover:bg-surface-2 text-muted hover:text-foreground"
            }`}
          >
            <IconWalkthrough active={walkthroughOpen} />
          </button>
        </div>
      </div>

      {/* Main content row.
          One panel open (non-split layout) → inline 1/3 split.
          Both panels open, or split layout → panels overlay (DockedPanel). */}
      <div ref={mainRowRef} className={`flex flex-1 min-h-0 ${(!isMobile && openPanels.size < 2 && layout !== "split") ? "" : "relative"}`}>

        {/* Spec — inline when solo (non-split) on desktop, overlay otherwise.
            On mobile: always full-screen overlay. */}
        {(!isMobile && openPanels.size < 2 && layout !== "split") ? (
          <div className={`overflow-hidden flex flex-col bg-surface border-r border-border transition-all duration-150 ease-in-out ${specOpen ? "w-1/3 opacity-100" : "w-0 opacity-0"}`}>
            {specOpen && (
              <SpecSidebar entry={activeEntry} entries={entries} activeQid={activeQid} onSelectQuestion={onSelectQuestion} onClose={() => closePanel("spec")} backHref={backHref} />
            )}
          </div>
        ) : (
          <DockedPanel side="left" open={specOpen} onClose={() => closePanel("spec")} width={dualPanelWidth} fullScreen={isMobile}>
            <SpecSidebar entry={activeEntry} entries={entries} activeQid={activeQid} onSelectQuestion={onSelectQuestion} onClose={() => closePanel("spec")} backHref={backHref} />
          </DockedPanel>
        )}

        {/* PDF area — single (qp/ms) or split */}
        <div
          ref={pdfAreaRef}
          className="flex-1 min-w-0 flex"
          style={(openPanels.size >= 2 || layout === "split") && specOpen && walkthroughOpen ? {
            paddingLeft: dualPanelWidth,
            paddingRight: dualPanelWidth,
          } : (openPanels.size >= 2 || layout === "split") && specOpen ? {
            paddingLeft: dualPanelWidth,
          } : (openPanels.size >= 2 || layout === "split") && walkthroughOpen ? {
            paddingRight: dualPanelWidth,
          } : undefined}
        >
          {layout === "split" ? (
            <>
              <PdfPane label="Question paper" className="flex-1 min-w-0 border-r border-border">
                {renderMode === "interactive" ? (
                  <InteractivePdf
                    src={paper.qpPath}
                    questionPages={questionPages}
                    onActiveQuestionChange={onScrollActiveQuestionChange}
                    handleRef={qpHandleRef}
                    scale={zoom}
                    initialPage={initialPage}
                  />
                ) : (
                  <iframe src={paper.qpPath} className="w-full h-full bg-surface-2" title="Question paper" />
                )}
              </PdfPane>
              <PdfPane label="Mark scheme" className="flex-1 min-w-0">
                {renderMode === "interactive" ? (
                  msAvailable ? (
                    <InteractivePdf src={paper.msPath} questionPages={questionPages} handleRef={msHandleRef} scale={zoom} />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-surface-2 text-sm text-muted">
                      Complete all questions to unlock the mark scheme.
                    </div>
                  )
                ) : (
                  <iframe src={msAvailable ? paper.msPath : ""} className="w-full h-full bg-surface-2" title="Mark scheme" />
                )}
              </PdfPane>
            </>
          ) : (
            <PdfPane key={layout} label={layout === "qp" ? "Question paper" : "Mark scheme"} className="flex-1 min-w-0">
              {renderMode === "interactive" ? (
                layout === "qp" ? (
                  <InteractivePdf
                    src={paper.qpPath}
                    questionPages={questionPages}
                    onActiveQuestionChange={onScrollActiveQuestionChange}
                    handleRef={qpHandleRef}
                    scale={zoom}
                    initialPage={initialPage}
                  />
                ) : msAvailable ? (
                  <InteractivePdf src={paper.msPath} questionPages={questionPages} handleRef={msHandleRef} scale={zoom} />
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

        {/* Walkthrough — inline when solo (non-split) on desktop, overlay otherwise.
            On mobile: always full-screen overlay. */}
        {(!isMobile && openPanels.size < 2 && layout !== "split") ? (
          <div className={`overflow-hidden flex flex-col bg-surface border-l border-border transition-all duration-150 ease-in-out ${walkthroughOpen ? "w-1/3 opacity-100" : "w-0 opacity-0"}`}>
            {walkthroughOpen && (
              <WalkthroughSidebar entry={activeEntry} entries={entries} activeQid={activeQid} onSelectQuestion={onSelectQuestion} completed={completed} onToggleComplete={toggleComplete} examMode={examMode} onClose={() => closePanel("walkthrough")} backHref={backHref} />
            )}
          </div>
        ) : (
          <DockedPanel side="right" open={walkthroughOpen} onClose={() => closePanel("walkthrough")} width={dualPanelWidth} fullScreen={isMobile}>
            <WalkthroughSidebar entry={activeEntry} entries={entries} activeQid={activeQid} onSelectQuestion={onSelectQuestion} completed={completed} onToggleComplete={toggleComplete} examMode={examMode} onClose={() => closePanel("walkthrough")} backHref={backHref} />
          </DockedPanel>
        )}
      </div>

      {showHelp && <ShortcutsHelp msAvailable={msAvailable} onClose={() => setShowHelp(false)} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Keyboard shortcuts help

function ShortcutsHelp({ msAvailable, onClose }: { msAvailable: boolean; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "?") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const rows: { keys: string[]; label: string; disabled?: boolean }[] = [
    { keys: ["j", "→"], label: "Next question" },
    { keys: ["k", "←"], label: "Previous question" },
    { keys: ["s"], label: "Toggle spec panel" },
    { keys: ["w"], label: "Toggle walkthrough" },
    { keys: ["m"], label: "Toggle mark scheme", disabled: !msAvailable },
    { keys: ["x"], label: "Toggle exam mode" },
    { keys: ["⌘", "K"], label: "Open search" },
    { keys: ["esc"], label: "Close panel / dialog" },
    { keys: ["?"], label: "Show this help" },
  ];

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-lg border border-border bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="text-sm font-semibold">Keyboard shortcuts</div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-muted hover:text-foreground transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>
        <div className="px-4 py-3 space-y-1.5">
          {rows.map((row) => (
            <div
              key={row.label}
              className={`flex items-center justify-between gap-3 ${row.disabled ? "opacity-40" : ""}`}
            >
              <span className="text-sm">{row.label}</span>
              <div className="flex items-center gap-1">
                {row.keys.map((k) => (
                  <kbd
                    key={k}
                    className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
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
// Docked panel — overlays the PDF area

function DockedPanel({
  side,
  open,
  onClose,
  width,
  fullScreen,
  children,
}: {
  side: "left" | "right";
  open: boolean;
  onClose: () => void;
  width?: number;
  fullScreen?: boolean;
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

  if (fullScreen) {
    return (
      <div className="absolute inset-0 z-30 bg-surface flex flex-col">
        <div className="flex-1 min-h-0 overflow-y-auto">{children}</div>
      </div>
    );
  }

  const borderClass = side === "left" ? "border-r" : "border-l";
  const posClass = side === "left" ? "left-0" : "right-0";

  return (
    <div
      className={`absolute top-0 bottom-0 ${posClass} z-20 bg-surface ${borderClass} border-border flex flex-col`}
      style={{ width: width ?? 360 }}
    >
      <div className="flex-1 min-h-0 overflow-y-auto">{children}</div>
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
// Question tab bar

function QuestionTabBar({
  entries,
  activeQid,
  onSelect,
  onClose,
}: {
  entries: QuestionEntry[];
  activeQid: string | null;
  onSelect: (qid: string) => void;
  onClose: () => void;
}) {
  const activeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeQid]);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -120 : 120, behavior: "smooth" });
  };

  return (
    <div className="flex items-stretch border-b border-border bg-surface shrink-0">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className="shrink-0 px-1.5 text-muted hover:text-foreground transition-colors"
        aria-label="Scroll tabs left"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>

      {/* Tab list — scrollbar hidden */}
      <div
        ref={scrollRef}
        className="flex flex-1 min-w-0 overflow-x-auto [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
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

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="shrink-0 px-1.5 text-muted hover:text-foreground transition-colors"
        aria-label="Scroll tabs right"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close panel"
        className="shrink-0 px-2.5 text-muted hover:text-foreground transition-colors text-lg leading-none border-l border-border"
      >
        ×
      </button>
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
  onClose,
  backHref,
}: {
  entry: QuestionEntry | undefined;
  entries: QuestionEntry[];
  activeQid: string | null;
  onSelectQuestion: (qid: string) => void;
  onClose: () => void;
  backHref: string;
}) {
  if (entries.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-end px-3 py-2 border-b border-border shrink-0">
          <button onClick={onClose} aria-label="Close panel" className="text-muted hover:text-foreground transition-colors text-lg leading-none px-2">×</button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center gap-3">
          <div className="text-sm font-medium">No spec data yet</div>
          <div className="text-xs text-muted max-w-[200px]">Spec point tagging for this paper hasn't been added. Only 2024 papers are fully covered right now.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <QuestionTabBar entries={entries} activeQid={activeQid} onSelect={onSelectQuestion} onClose={onClose} />

      {entry ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted mb-2">
              Spec points for Q{entry.question.number}
            </div>
            <div className="space-y-3">
              {entry.specPoints.length === 0 && (
                <div className="text-sm text-muted">No spec points tagged yet.</div>
              )}
              {entry.specPoints.map((sp) => (
                <Collapsible key={sp.id} label={`${sp.id} — ${sp.title}`} defaultClosed>
                  <div className="space-y-2 pt-1">
                    <div className="text-sm leading-relaxed text-foreground/80">
                      {sp.description}
                    </div>
                    {sp.breakdown && (
                      <Collapsible label="In plain English">
                        <div className="text-sm leading-relaxed">{sp.breakdown}</div>
                      </Collapsible>
                    )}
                  </div>
                </Collapsible>
              ))}
            </div>
          </div>
          <RelatedNotes notes={entry.relatedNotes} backHref={backHref} />
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
  onClose,
  backHref,
}: {
  entry: QuestionEntry | undefined;
  entries: QuestionEntry[];
  activeQid: string | null;
  onSelectQuestion: (qid: string) => void;
  completed: Set<string>;
  onToggleComplete: (qid: string) => void;
  examMode: boolean;
  onClose: () => void;
  backHref: string;
}) {
  const done = entry ? completed.has(entry.question.id) : false;
  const breakdownLocked = examMode && entry !== undefined && !done;

  if (entries.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-end px-3 py-2 border-b border-border shrink-0">
          <button onClick={onClose} aria-label="Close panel" className="text-muted hover:text-foreground transition-colors text-lg leading-none px-2">×</button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center gap-3">
          <div className="text-sm font-medium">No walkthroughs yet</div>
          <div className="text-xs text-muted max-w-[200px]">Breakdown data for this paper hasn't been added. Only 2024 papers are fully covered right now.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <QuestionTabBar entries={entries} activeQid={activeQid} onSelect={onSelectQuestion} onClose={onClose} />

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

          <RelatedNotes notes={entry.relatedNotes} backHref={backHref} />
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

function RelatedNotes({ notes, backHref }: { notes: RelatedNote[]; backHref?: string }) {
  if (notes.length === 0) return null;

  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted mb-1.5">
        Related notes
      </div>
      <div className="space-y-1">
        {notes.map((note) => {
          const backParam = backHref ? `?back=${encodeURIComponent(backHref)}` : "";
          const hash = note.sectionAnchor ? `#${note.sectionAnchor}` : "";
          const href = `/biology/notes/${note.slug}${backParam}${hash}`;
          return (
            <Link
              key={`${note.slug}-${note.sectionAnchor ?? "note"}`}
              href={href}
              className="block rounded border border-border bg-background px-2.5 py-2 text-xs hover:border-accent hover:bg-accent-soft transition-colors"
            >
              <span className="font-medium">{note.title}</span>
              <span className="ml-2 font-mono text-muted">{note.topic}</span>
              {note.sectionTitle && (
                <span className="mt-1 block text-muted">Jump to {note.sectionTitle}</span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
