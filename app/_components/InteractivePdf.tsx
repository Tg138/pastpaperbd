"use client";

import { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

export interface InteractivePdfHandle {
  scrollToPage: (page: number) => void;
}

interface Props {
  src: string;
  // Map of pageNumber → ordered list of question IDs starting on that page.
  questionPages: Record<number, string[]>;
  onActiveQuestionChange?: (questionId: string | null) => void;
  handleRef?: React.Ref<InteractivePdfHandle>;
}

// A4 portrait aspect ratio (height = width × √2). Used for placeholder height.
const PAGE_ASPECT = 1.414;

export function InteractivePdf({
  src,
  questionPages,
  onActiveQuestionChange,
  handleRef,
}: Props) {
  const [numPages, setNumPages] = useState(0);
  const [width, setWidth] = useState<number>(760);
  const [renderedPages, setRenderedPages] = useState<Set<number>>(new Set([1, 2, 3]));
  const [scrollTarget, setScrollTarget] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Stable file prop — react-pdf re-fetches if the object identity changes
  const file = useMemo(() => ({ url: src }), [src]);

  // pdf.js 5.x uses WASM (openjpeg) to decode JPEG2000 images; without the
  // wasmUrl set, figures encoded as JP2 silently fail and you get
  // "Dependent image isn't ready yet" warnings with blank space where figures
  // should be. AQA past papers contain JP2 figures.
  const documentOptions = useMemo(
    () => ({
      disableAutoFetch: false,
      disableStream: false,
      wasmUrl: "/pdfjs-wasm/",
    }),
    []
  );

  // Per-page render keys. Bumped after onRenderSuccess so the Page re-renders
  // once with fully-loaded image data — works around pdf.js image races.
  const [renderKeys, setRenderKeys] = useState<Map<number, number>>(new Map());
  const bumpRenderKey = useCallback((pageNum: number) => {
    setRenderKeys((prev) => {
      const cur = prev.get(pageNum) ?? 0;
      // Only retry once per page to avoid loops
      if (cur >= 1) return prev;
      const next = new Map(prev);
      next.set(pageNum, cur + 1);
      return next;
    });
  }, []);

  // Fit width to container
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        setWidth(Math.min(Math.max(w - 80, 320), 760));
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Lazy-render pages near the viewport. Pages stay rendered once entered.
  useEffect(() => {
    if (numPages === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const toAdd: number[] = [];
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const pageStr = (e.target as HTMLElement).dataset.pageNumber;
          if (!pageStr) continue;
          toAdd.push(Number(pageStr));
        }
        if (toAdd.length > 0) {
          setRenderedPages((prev) => {
            let changed = false;
            const next = new Set(prev);
            for (const p of toAdd) {
              if (!next.has(p)) {
                next.add(p);
                changed = true;
              }
            }
            return changed ? next : prev;
          });
        }
      },
      { rootMargin: "1500px 0px 1500px 0px" }
    );

    for (const el of pageRefs.current.values()) observer.observe(el);
    return () => observer.disconnect();
  }, [numPages]);

  // Scroll-spy: track active question as user scrolls.
  // Multiple questions can share a page; the page is divided proportionally
  // among them so each question gets its fair slice of scroll distance.
  useEffect(() => {
    if (numPages === 0) return;
    if (!onActiveQuestionChange) return;
    const container = containerRef.current;
    if (!container) return;

    const sorted = Object.entries(questionPages)
      .map(([page, qids]) => ({ page: Number(page), qids }))
      .sort((a, b) => a.page - b.page);

    if (sorted.length === 0) return;

    const resolve = () => {
      // Threshold: 40% down from the top of the visible container.
      const threshold = container.clientHeight * 0.4;
      const containerTop = container.getBoundingClientRect().top;

      let active: string | null = null;
      for (const { page, qids } of sorted) {
        const el = pageRefs.current.get(page);
        if (!el) continue;
        const relativeTop = el.getBoundingClientRect().top - containerTop;
        if (relativeTop > threshold) continue;

        // Page top has crossed the threshold. Divide the page height equally
        // among all questions starting on this page and pick the slice we're in.
        const scrolledInto = threshold - relativeTop; // px of page above threshold
        const fraction = Math.min(scrolledInto / el.offsetHeight, 1);
        const idx = Math.min(Math.floor(fraction * qids.length), qids.length - 1);
        active = qids[idx];
      }

      if (active) onActiveQuestionChange(active);
    };

    container.addEventListener("scroll", resolve, { passive: true });
    return () => container.removeEventListener("scroll", resolve);
  }, [numPages, questionPages, onActiveQuestionChange]);

  const scrollToPage = useCallback((page: number) => {
    setRenderedPages((prev) => {
      const next = new Set(prev);
      for (let p = Math.max(1, page - 1); p <= page + 1; p++) next.add(p);
      return next;
    });
    setScrollTarget(page);
  }, []);

  // Effect runs after the new pages render — guaranteed to find a real (non-placeholder) element
  useEffect(() => {
    if (scrollTarget === null) return;
    const el = pageRefs.current.get(scrollTarget);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setScrollTarget(null);
  }, [scrollTarget, renderedPages]);

  useImperativeHandle(handleRef, () => ({ scrollToPage }), [scrollToPage]);

  const placeholderHeight = Math.round(width * PAGE_ASPECT);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-y-auto bg-surface-2">
      <div className="flex flex-col items-center gap-3 py-4">
        <Document
          file={file}
          options={documentOptions}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<div className="text-sm text-muted py-8">Loading…</div>}
          error={<div className="text-sm text-muted py-8">Could not load this PDF.</div>}
        >
          {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => {
            const isRendered = renderedPages.has(pageNum);
            const renderKey = renderKeys.get(pageNum) ?? 0;
            return (
              <div
                key={pageNum}
                ref={(el) => {
                  if (el) pageRefs.current.set(pageNum, el);
                  else pageRefs.current.delete(pageNum);
                }}
                data-page-number={pageNum}
                className="shadow-sm rounded overflow-hidden bg-white"
                style={{ width, minHeight: isRendered ? undefined : placeholderHeight }}
              >
                {isRendered && (
                  <Page
                    key={`${pageNum}-${renderKey}`}
                    pageNumber={pageNum}
                    width={width}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    onRenderSuccess={() => {
                      // Schedule a one-shot re-render so any images that streamed
                      // in late get drawn into the canvas.
                      if (renderKey === 0) {
                        setTimeout(() => bumpRenderKey(pageNum), 600);
                      }
                    }}
                  />
                )}
              </div>
            );
          })}
        </Document>
      </div>
    </div>
  );
}
