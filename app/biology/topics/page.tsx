import type { Metadata } from "next";
import Link from "next/link";
import { getAllSpecPoints, getQuestionsForSpecPoint } from "@/lib/data";
import { ThemeToggle } from "../../_components/ThemeToggle";
import { SearchTrigger } from "../../_components/SearchTrigger";

export const metadata: Metadata = {
  title: "Topics — Biology by area",
  description:
    "Revise AQA A-level Biology by topic. Every spec point and past-paper question grouped by topic area.",
  alternates: { canonical: "/biology/topics" },
  openGraph: {
    title: "AQA A-level Biology topics",
    description:
      "Every spec point and past-paper question, grouped by topic area.",
    url: "/biology/topics",
    type: "website",
  },
};

interface TopicSummary {
  topic: string;
  specCount: number;
  questionCount: number;
}

function buildTopicSummaries(): TopicSummary[] {
  const points = getAllSpecPoints();
  const map = new Map<string, TopicSummary>();
  const seenQuestionIds = new Map<string, Set<string>>();

  for (const sp of points) {
    if (!map.has(sp.topic)) {
      map.set(sp.topic, { topic: sp.topic, specCount: 0, questionCount: 0 });
      seenQuestionIds.set(sp.topic, new Set());
    }
    const summary = map.get(sp.topic)!;
    summary.specCount += 1;
    const qids = seenQuestionIds.get(sp.topic)!;
    for (const q of getQuestionsForSpecPoint(sp.id)) {
      qids.add(q.id);
    }
  }

  for (const summary of map.values()) {
    summary.questionCount = seenQuestionIds.get(summary.topic)!.size;
  }

  return [...map.values()].sort((a, b) => a.topic.localeCompare(b.topic));
}

export default function TopicsIndex() {
  const topics = buildTopicSummaries();

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-border px-8 py-5">
        <div className="flex items-baseline gap-3">
          <Link href="/" className="text-lg font-semibold tracking-tight hover:text-accent transition-colors">
            pastpaperbd
          </Link>
          <Link href="/biology" className="text-sm text-muted hover:text-foreground transition-colors">
            / Biology
          </Link>
          <span className="text-sm text-muted">/ Topics</span>
        </div>
        <div className="flex items-center gap-3">
          <SearchTrigger />
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 px-8 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight">Revise by topic</h1>
          <p className="mt-2 text-muted">
            Every spec point and past-paper question, grouped by topic area.
          </p>

          {topics.length === 0 ? (
            <div className="mt-8 rounded-lg border border-border bg-surface p-4 text-sm text-muted">
              No topics indexed yet.
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {topics.map((t) => (
                <Link
                  key={t.topic}
                  href={`/biology/topics/${encodeURIComponent(t.topic)}`}
                  className="rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent hover:bg-accent-soft"
                >
                  <div className="text-lg font-semibold tracking-tight">{t.topic}</div>
                  <div className="mt-2 flex gap-4 text-xs text-muted">
                    <span>{t.specCount} spec point{t.specCount === 1 ? "" : "s"}</span>
                    <span>{t.questionCount} question{t.questionCount === 1 ? "" : "s"}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
