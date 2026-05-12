"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { searchDocs, type SearchDoc, type SearchHit } from "@/lib/search";

const OPEN_EVENT = "pastpaperbd:open-search";

let cachedIndexPromise: Promise<SearchDoc[]> | null = null;

function loadIndex(): Promise<SearchDoc[]> {
  if (!cachedIndexPromise) {
    cachedIndexPromise = fetch("/search-index.json")
      .then((res) => {
        if (!res.ok) throw new Error(`Search index load failed (${res.status})`);
        return res.json() as Promise<SearchDoc[]>;
      })
      .catch((err) => {
        cachedIndexPromise = null;
        throw err;
      });
  }
  return cachedIndexPromise;
}

export function openSearchPalette() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_EVENT));
}

const KIND_LABELS: Record<SearchDoc["kind"], string> = {
  question: "Question",
  spec: "Spec point",
  note: "Note",
};

export function SearchPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchDoc[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIdx(0);
  }, []);

  // Global keyboard shortcut (Cmd/Ctrl-K) and external open event.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      // "/" opens search unless typing in an input.
      if (
        e.key === "/" &&
        !isMod &&
        !target?.matches("input, textarea, [contenteditable='true']")
      ) {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  // Lazy-load index on first open.
  useEffect(() => {
    if (!open || index) return;
    let cancelled = false;
    loadIndex()
      .then((docs) => {
        if (!cancelled) setIndex(docs);
      })
      .catch((err: Error) => {
        if (!cancelled) setLoadError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [open, index]);

  // Focus input when palette opens.
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const hits: SearchHit[] = useMemo(() => {
    if (!index || !query.trim()) return [];
    return searchDocs(index, query, 40);
  }, [index, query]);

  // Reset active index when query changes.
  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  // Keep active row in view.
  useEffect(() => {
    const container = resultsRef.current;
    if (!container) return;
    const el = container.querySelector<HTMLElement>(`[data-hit-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx, hits]);

  if (!open) return null;

  const handleInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (hits.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % hits.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + hits.length) % hits.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const hit = hits[activeIdx];
      if (hit) {
        router.push(hit.doc.href);
        close();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 backdrop-blur-sm px-4 py-[10vh]"
      onClick={close}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-lg border border-border bg-background shadow-2xl flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted shrink-0">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKey}
            placeholder="Search questions, spec points, notes…"
            className="flex-1 bg-transparent text-base outline-none placeholder:text-muted"
            aria-label="Search"
          />
          <kbd className="hidden md:inline-flex items-center gap-0.5 rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] text-muted">
            esc
          </kbd>
        </div>

        <div ref={resultsRef} className="flex-1 overflow-y-auto">
          {!query.trim() ? (
            <div className="px-4 py-8 text-center text-sm text-muted">
              {index ? "Type to search across questions, spec points, and notes." : "Loading search index…"}
            </div>
          ) : loadError ? (
            <div className="px-4 py-8 text-center text-sm text-muted">
              Couldn&apos;t load the search index. {loadError}
            </div>
          ) : !index ? (
            <div className="px-4 py-8 text-center text-sm text-muted">Loading…</div>
          ) : hits.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-muted">
              No matches for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            <ul className="py-1">
              {hits.map((hit, i) => (
                <li key={`${hit.doc.kind}-${hit.doc.id}`}>
                  <Link
                    href={hit.doc.href}
                    onClick={close}
                    onMouseEnter={() => setActiveIdx(i)}
                    data-hit-idx={i}
                    className={`block px-4 py-3 transition-colors ${
                      i === activeIdx ? "bg-accent-soft" : "hover:bg-surface"
                    }`}
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted shrink-0">
                        {KIND_LABELS[hit.doc.kind]}
                      </span>
                      <span className="font-medium text-sm truncate">{hit.doc.title}</span>
                    </div>
                    {hit.doc.subtitle && (
                      <div className="mt-0.5 text-xs text-muted truncate">{hit.doc.subtitle}</div>
                    )}
                    {hit.snippet && (
                      <div className="mt-1 text-xs text-foreground/70 line-clamp-2">{hit.snippet}</div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4 border-t border-border bg-surface px-4 py-2 text-[11px] text-muted">
          <span className="inline-flex items-center gap-1.5">
            <kbd className="rounded border border-border bg-background px-1.5 py-0.5">↑</kbd>
            <kbd className="rounded border border-border bg-background px-1.5 py-0.5">↓</kbd>
            navigate
          </span>
          <span className="inline-flex items-center gap-1.5">
            <kbd className="rounded border border-border bg-background px-1.5 py-0.5">↵</kbd>
            open
          </span>
          <span className="inline-flex items-center gap-1.5">
            <kbd className="rounded border border-border bg-background px-1.5 py-0.5">esc</kbd>
            close
          </span>
        </div>
      </div>
    </div>
  );
}
