import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSpecPoints, getQuestionsForSpecPoint } from "@/lib/data";
import { ThemeToggle } from "../../../_components/ThemeToggle";
import { SearchTrigger } from "../../../_components/SearchTrigger";

function getTopics(): string[] {
  return [...new Set(getAllSpecPoints().map((sp) => sp.topic))].sort();
}

export function generateStaticParams() {
  return getTopics().map((topic) => ({ topic: encodeURIComponent(topic) }));
}

export async function generateMetadata(
  props: PageProps<"/biology/topics/[topic]">
): Promise<Metadata> {
  const { topic: topicParam } = await props.params;
  const topic = decodeURIComponent(topicParam);
  if (!getTopics().includes(topic)) return {};
  const title = `${topic} — Biology topic`;
  const description = `AQA A-level Biology revision for ${topic}. Spec points, linked notes, and past-paper questions in one place.`;
  return {
    title,
    description,
    alternates: { canonical: `/biology/topics/${encodeURIComponent(topic)}` },
    openGraph: {
      title,
      description,
      url: `/biology/topics/${encodeURIComponent(topic)}`,
      type: "article",
    },
  };
}

export default async function TopicPage(
  props: PageProps<"/biology/topics/[topic]">
) {
  const { topic: topicParam } = await props.params;
  const topic = decodeURIComponent(topicParam);
  const topics = getTopics();
  if (!topics.includes(topic)) notFound();

  const specs = getAllSpecPoints()
    .filter((sp) => sp.topic === topic)
    .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

  const allQuestions = specs.flatMap((sp) =>
    getQuestionsForSpecPoint(sp.id).map((q) => ({ q, specId: sp.id }))
  );
  // Dedupe by question id — questions touching multiple spec points only show once.
  const seen = new Set<string>();
  const dedupedQuestions = allQuestions
    .filter(({ q }) => {
      if (seen.has(q.id)) return false;
      seen.add(q.id);
      return true;
    })
    .sort((a, b) => {
      const [, yearA] = a.q.paperId.split("-");
      const [, yearB] = b.q.paperId.split("-");
      if (yearA !== yearB) return Number(yearB) - Number(yearA);
      return a.q.paperId.localeCompare(b.q.paperId) || a.q.number.localeCompare(b.q.number);
    });

  const questionsByYear = dedupedQuestions.reduce<Record<string, typeof dedupedQuestions>>(
    (acc, item) => {
      const [, year] = item.q.paperId.split("-");
      (acc[year] ??= []).push(item);
      return acc;
    },
    {}
  );
  const years = Object.keys(questionsByYear).sort((a, b) => Number(b) - Number(a));

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
          <Link href="/biology/topics" className="text-sm text-muted hover:text-foreground transition-colors">
            / Topics
          </Link>
          <span className="text-sm text-muted">/ {topic}</span>
        </div>
        <div className="flex items-center gap-3">
          <SearchTrigger />
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 px-8 py-12">
        <div className="mx-auto max-w-3xl space-y-10">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted">Topic</div>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">{topic}</h1>
            <p className="mt-2 text-muted">
              {specs.length} spec point{specs.length === 1 ? "" : "s"} ·{" "}
              {dedupedQuestions.length} question{dedupedQuestions.length === 1 ? "" : "s"}
            </p>
          </div>

          <section>
            <h2 className="text-xs uppercase tracking-wider text-muted mb-3">Spec points</h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {specs.map((sp) => (
                <Link
                  key={sp.id}
                  href={`/biology/spec/${sp.id}`}
                  className="rounded-md border border-border bg-surface px-4 py-3 transition-colors hover:border-accent hover:bg-accent-soft"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xs text-accent">{sp.id}</span>
                    <span className="text-sm font-medium">{sp.title}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted line-clamp-2">{sp.description}</p>
                </Link>
              ))}
            </div>
          </section>

          {dedupedQuestions.length > 0 && (
            <section>
              <h2 className="text-xs uppercase tracking-wider text-muted mb-3">
                Past-paper questions
              </h2>
              <div className="space-y-5">
                {years.map((year) => (
                  <div key={year}>
                    <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted">
                      {year}
                    </div>
                    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                      {questionsByYear[year].map(({ q }) => {
                        const [, qYear, paperPart] = q.paperId.split("-");
                        const paperNumber = paperPart.replace("p", "");
                        const href = `/biology/${qYear}/${paperNumber}${q.pageNumber ? `?page=${q.pageNumber}` : ""}`;
                        return (
                          <Link
                            key={q.id}
                            href={href}
                            className="flex items-baseline justify-between gap-3 rounded-md border border-border bg-surface px-3 py-2 hover:border-accent hover:bg-accent-soft transition-colors"
                          >
                            <span className="text-sm">
                              <span className="font-medium">Paper {paperNumber}</span>
                              <span className="ml-2 text-muted">Q{q.number}</span>
                            </span>
                            <span className="font-mono text-xs text-muted shrink-0">
                              {q.marks} {q.marks === 1 ? "mark" : "marks"}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
