import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSpecPoints, getSpecPoint } from "@/lib/data";
import { getRelatedBiologyNotesForSpecPoints } from "@/lib/notes";
import { ThemeToggle } from "../../../_components/ThemeToggle";

export default async function SpecPointPage(
  props: PageProps<"/biology/spec/[point]">
) {
  const { point } = await props.params;
  const sp = getSpecPoint(point);
  if (!sp) notFound();
  const relatedNotes = getRelatedBiologyNotesForSpecPoints([sp]);

  // TODO: replace with real reverse-lookup once question data is extracted
  const linkedQuestions: { paperId: string; number: string; href: string }[] = [];

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
        <ThemeToggle />
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
              <h2 className="text-xs uppercase tracking-wider text-muted mb-2">
                Past-paper questions on this point
              </h2>
              {linkedQuestions.length === 0 ? (
                <div className="rounded-lg border border-border bg-surface p-4 text-sm text-muted">
                  Reverse-lookup coming once question data is extracted from each paper.
                </div>
              ) : (
                <div className="space-y-1">
                  {linkedQuestions.map((q) => (
                    <Link
                      key={`${q.paperId}-${q.number}`}
                      href={q.href}
                      className="block rounded-md border border-border bg-surface px-3 py-2 hover:border-accent transition-colors"
                    >
                      <span className="font-mono text-sm">{q.paperId}</span>{" "}
                      <span className="text-muted">— Q{q.number}</span>
                    </Link>
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
