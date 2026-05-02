"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
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

export function SpecViewer({
  specPdfPath,
  entries,
}: {
  specPdfPath: string;
  entries: SpecEntry[];
}) {
  const [renderMode, setRenderMode] = useState<RenderMode>("interactive");
  const [openPanels, setOpenPanels] = useState<Set<SidebarKey>>(
    new Set(["topics"])
  );

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

  const [activeId, setActiveId] = useState<string | null>(
    entries[0]?.point.id ?? null
  );

  const pdfHandle = useRef<InteractivePdfHandle>(null);

  // Map page → spec point id (for the IntersectionObserver in InteractivePdf)
  const pageMap = useMemo(() => {
    const map: Record<number, string> = {};
    for (const e of entries) {
      if (e.point.pageNumber) map[e.point.pageNumber] = e.point.id;
    }
    return map;
  }, [entries]);

  const activeEntry =
    entries.find((e) => e.point.id === activeId) ?? entries[0];

  const onSelectPoint = (id: string) => {
    setActiveId(id);
    const entry = entries.find((e) => e.point.id === id);
    if (renderMode === "interactive" && entry?.point.pageNumber) {
      pdfHandle.current?.scrollToPage(entry.point.pageNumber);
    }
  };

  const topicsOpen = openPanels.has("topics");
  const notesOpen = openPanels.has("notes");

  // Group spec points by topic for the sidebar
  const grouped = useMemo(() => {
    const map = new Map<string, SpecEntry[]>();
    for (const e of entries) {
      const list = map.get(e.point.topic) ?? [];
      list.push(e);
      map.set(e.point.topic, list);
    }
    return Array.from(map.entries());
  }, [entries]);

  return (
    <div className="flex flex-1 min-h-0 flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-border bg-surface shrink-0 flex-wrap">
        <SegmentedControl
          options={[
            { value: "interactive", label: "Interactive" },
            { value: "classic", label: "Classic PDF" },
          ]}
          value={renderMode}
          onChange={(v) => setRenderMode(v as RenderMode)}
        />

        <div className="ml-auto">
          <a
            href={specPdfPath}
            download
            className="text-xs text-muted hover:text-accent transition-colors"
          >
            Download
          </a>
        </div>
      </div>

      {/* Main content row: [Topics col] [PDF] [Notes col] */}
      <div className="flex flex-1 min-h-0 relative">
        <DockedPanel side="left" open={topicsOpen} onClose={() => closePanel("topics")}>
          <TopicsSidebar
            grouped={grouped}
            activeId={activeId}
            onSelect={onSelectPoint}
          />
        </DockedPanel>

        <EdgeTab
          side="left"
          label="Topics"
          active={topicsOpen}
          onClick={() => togglePanel("topics")}
        />

        <div className="flex-1 min-w-0 flex">
          <PdfPane label="AQA 7402 specification" className="flex-1 min-w-0">
            {renderMode === "interactive" ? (
              <InteractivePdf
                src={specPdfPath}
                questionPages={pageMap}
                onActiveQuestionChange={(id) => id && setActiveId(id)}
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

        <DockedPanel side="right" open={notesOpen} onClose={() => closePanel("notes")}>
          <NotesSidebar entry={activeEntry} />
        </DockedPanel>

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
// EdgeTab

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
// DockedPanel

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
// Topics sidebar — grouped tree of spec points

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
  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeId]);

  return (
    <div className="p-3 space-y-5">
      {grouped.map(([topic, list]) => (
        <section key={topic}>
          <h3 className="text-[10px] uppercase tracking-wider text-muted font-medium px-2 mb-1.5">
            {topic}
          </h3>
          <div className="space-y-0.5">
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
                  <span className={`font-mono text-xs shrink-0 ${isActive ? "text-accent" : "text-muted"}`}>
                    {e.point.id}
                  </span>
                  <span className="leading-snug">{e.point.title}</span>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Notes sidebar — active spec point detail + related notes

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
