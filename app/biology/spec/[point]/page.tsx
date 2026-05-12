import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSpecPoints, getQuestionsForSpecPoint, getSpecPoint } from "@/lib/data";
import { getRelatedBiologyNotesForSpecPoints } from "@/lib/notes";
import { buildSpecMetadata } from "@/lib/seo";
import { ThemeToggle } from "../../../_components/ThemeToggle";
import { SearchTrigger } from "../../../_components/SearchTrigger";

export async function generateMetadata(
  props: PageProps<"/biology/spec/[point]">
): Promise<Metadata> {
  const { point } = await props.params;
  const sp = getSpecPoint(point);
  if (!sp) return {};
  return buildSpecMetadata(sp);
}

export default async function SpecPointPage(
  props: PageProps<"/biology/spec/[point]">
) {
  const { point } = await props.params;
  const sp = getSpecPoint(point);
  if (!sp) notFound();
  const relatedNotes = getRelatedBiologyNotesForSpecPoints([sp]);

  const linkedQuestions = getQuestionsForSpecPoint(point).map((q) => {
    const [, year, paperPart] = q.paperId.split("-");
    const paperNumber = paperPart.replace("p", "");
    const pageParam = q.pageNumber ? `?page=${q.pageNumber}` : "";
    return {
      paperId: q.paperId,
      year,
      paperNumber,
      number: q.number,
      marks: q.marks,
      href: `/biology/${year}/${paperNumber}${pageParam}`,
    };
  });

  // Group questions by year for easier scanning.
  const questionsByYear = linkedQuestions.reduce<Record<string, typeof linkedQuestions>>(
    (acc, q) => {
      (acc[q.year] ??= []).push(q);
      return acc;
    },
    {}
  );
  const years = Object.keys(questionsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between px-8 py-5 border-b border-border">
        <div className="flex items-baseline gap-3">
          <Link href="/" className="text-lg font-semibold tracking-tight hover:text-accent transition-colors">
            pastpaperbd
          </Link>
          <Link href="/biology" className="text-sm text-muted hover:text-foreground transition-colors">
            / Biology
          </Link>
          <Link href="/biology/spec" className="text-sm text-muted hover:text-foreground transition-colors">
            / Spec
          </Link>
          <span className="text-sm text-muted">/ {sp.id}</span>
        </div>
        <div className="flex items-center gap-3">
          <SearchTrigger />
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 px-8 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="text-xs uppercase tracking-wider text-muted">{sp.topic}</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            <span className="font-mono text-accent text-2xl mr-3">{sp.id}</span>
            {sp.title}
          </h1>

          <div className="mt-8 space-y-6">
            <section>
              <h2 className="text-xs uppercase tracking-wider text-muted mb-2">Specification text</h2>
              <p className="text-base leading-relaxed">{sp.description}</p>
            </section>

            {sp.breakdown && (
              <section>
                <h2 className="text-xs uppercase tracking-wider text-muted mb-2">In plain English</h2>
                <div className="rounded-lg border border-border bg-surface p-4 leading-relaxed">
                  {sp.breakdown}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-xs uppercase tracking-wider text-muted mb-2">Linked notes</h2>
              {relatedNotes.length === 0 ? (
                <div className="rounded-lg border border-border bg-surface p-4 text-sm text-muted">
                  No matching notes found yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {relatedNotes.map((note) => (
                    <Link
                      key={`${note.slug}-${note.sectionAnchor ?? "note"}`}
                      href={`/biology/notes/${note.slug}${note.sectionAnchor ? `#${note.sectionAnchor}` : ""}`}
                      className="rounded-md border border-border bg-surface px-4 py-3 transition-colors hover:border-accent hover:bg-accent-soft"
                    >
                      <div className="text-sm font-medium">{note.title}</div>
                      <div className="mt-1 font-mono text-xs text-muted">{note.topic}</div>
                      {note.sectionTitle && (
                        <div className="mt-2 text-xs text-muted">Jump to {note.sectionTitle}</div>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </section>

            <section>
              <div className="mb-3 flex items-baseline justify-between">
                <h2 className="text-xs uppercase tracking-wider text-muted">
                  Past-paper questions on this point
                </h2>
                {linkedQuestions.length > 0 && (
                  <span className="text-xs text-muted">
                    {linkedQuestions.length} question{linkedQuestions.length === 1 ? "" : "s"}
                  </span>
                )}
              </div>
              {linkedQuestions.length === 0 ? (
                <div className="rounded-lg border border-border bg-surface p-4 text-sm text-muted">
                  Reverse-lookup coming once question data is extracted from each paper.
                </div>
              ) : (
                <div className="space-y-5">
                  {years.map((year) => (
                    <div key={year}>
                      <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted">
                        {year}
                      </div>
                      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                        {questionsByYear[year].map((q) => (
                          <Link
                            key={`${q.paperId}-${q.number}`}
                            href={q.href}
                            className="flex items-baseline justify-between gap-3 rounded-md border border-border bg-surface px-3 py-2 hover:border-accent hover:bg-accent-soft transition-colors"
                          >
                            <span className="text-sm">
                              <span className="font-medium">Paper {q.paperNumber}</span>
                              <span className="ml-2 text-muted">Q{q.number}</span>
                            </span>
                            <span className="font-mono text-xs text-muted shrink-0">
                              {q.marks} {q.marks === 1 ? "mark" : "marks"}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return getAllSpecPoints().map((sp) => ({ point: sp.id }));
}
