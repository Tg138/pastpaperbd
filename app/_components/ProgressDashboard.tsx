"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export interface PaperProgressMeta {
  subject: "biology";
  year: number;
  paperNumber: number;
  total: number;
}

interface PaperWithProgress extends PaperProgressMeta {
  completed: number;
}

function readProgress(meta: PaperProgressMeta): number {
  if (typeof window === "undefined") return 0;
  const key = `progress:${meta.subject}-${meta.year}-p${meta.paperNumber}`;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
}

export function ProgressDashboard({ papers }: { papers: PaperProgressMeta[] }) {
  const [withProgress, setWithProgress] = useState<PaperWithProgress[] | null>(null);

  useEffect(() => {
    setWithProgress(papers.map((p) => ({ ...p, completed: readProgress(p) })));
    const onStorage = (e: StorageEvent) => {
      if (e.key?.startsWith("progress:")) {
        setWithProgress(papers.map((p) => ({ ...p, completed: readProgress(p) })));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [papers]);

  const tracked = withProgress ?? papers.map((p) => ({ ...p, completed: 0 }));
  const overall = tracked.reduce(
    (acc, p) => ({ completed: acc.completed + p.completed, total: acc.total + p.total }),
    { completed: 0, total: 0 }
  );

  const byYear = tracked.reduce<Record<number, PaperWithProgress[]>>((acc, p) => {
    (acc[p.year] ??= []).push(p);
    return acc;
  }, {});
  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  const overallPct = overall.total > 0 ? Math.round((overall.completed / overall.total) * 100) : 0;
  const trackedPapers = tracked.filter((p) => p.total > 0).length;

  const clearAll = () => {
    if (typeof window === "undefined") return;
    if (!confirm("Clear progress for every paper? This can't be undone.")) return;
    for (const p of papers) {
      try {
        localStorage.removeItem(`progress:${p.subject}-${p.year}-p${p.paperNumber}`);
      } catch {}
    }
    setWithProgress(papers.map((p) => ({ ...p, completed: 0 })));
  };

  return (
    <div className="space-y-10">
      <div className="rounded-lg border border-border bg-surface p-5">
        <div className="flex items-baseline justify-between">
          <div className="text-xs uppercase tracking-wider text-muted">Overall</div>
          <div className="text-xs text-muted">
            {overall.completed} / {overall.total} questions
          </div>
        </div>
        <div className="mt-3 text-3xl font-semibold tabular-nums">{overallPct}%</div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${overallPct}%` }}
          />
        </div>
        {trackedPapers === 0 && (
          <p className="mt-3 text-xs text-muted">
            Walkthroughs are only available for some papers right now — progress shows once a paper has tracked questions.
          </p>
        )}
        {withProgress && overall.completed > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="mt-4 text-xs text-muted underline-offset-2 hover:text-foreground hover:underline"
          >
            Reset all progress
          </button>
        )}
      </div>

      {years.map((year) => (
        <section key={year}>
          <h2 className="text-xs uppercase tracking-wider text-muted mb-3">{year}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {byYear[year]
              .sort((a, b) => a.paperNumber - b.paperNumber)
              .map((p) => {
                const pct =
                  p.total > 0 ? Math.round((p.completed / p.total) * 100) : 0;
                return (
                  <Link
                    key={`${p.year}-${p.paperNumber}`}
                    href={`/biology/${p.year}/${p.paperNumber}`}
                    className="rounded-lg border border-border bg-surface p-4 transition-colors hover:border-accent hover:bg-accent-soft"
                  >
                    <div className="flex items-baseline justify-between">
                      <div className="text-sm font-semibold">Paper {p.paperNumber}</div>
                      <div className="font-mono text-xs text-muted tabular-nums">
                        {p.total > 0 ? `${p.completed}/${p.total}` : "—"}
                      </div>
                    </div>
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                      <div
                        className="h-full bg-accent transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="mt-2 text-xs text-muted">
                      {p.total > 0 ? `${pct}% complete` : "No walkthroughs yet"}
                    </div>
                  </Link>
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}
