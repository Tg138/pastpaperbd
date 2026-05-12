import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownNote } from "@/app/_components/MarkdownNote";
import { getBiologyNote, getBiologyNotes } from "@/lib/notes";
import { buildNoteMetadata } from "@/lib/seo";
import { ThemeToggle } from "../../../_components/ThemeToggle";
import { SearchTrigger } from "../../../_components/SearchTrigger";

export async function generateMetadata(
  props: PageProps<"/biology/notes/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const note = getBiologyNote(slug);
  if (!note) return {};
  return buildNoteMetadata(note);
}

function buildNoteIndex(): Record<string, string> {
  const notes = getBiologyNotes();
  const index: Record<string, string> = {};
  for (const note of notes) {
    index[note.title.toLowerCase()] = note.slug;
  }
  return index;
}

export function generateStaticParams() {
  return getBiologyNotes().map((note) => ({ slug: note.slug }));
}

export default async function BiologyNotePage(
  props: PageProps<"/biology/notes/[slug]">
) {
  const { slug } = await props.params;
  const { back } = await props.searchParams;
  const backHref = typeof back === "string" ? back : null;
  const backParam = backHref ? `?back=${encodeURIComponent(backHref)}` : "";

  const note = getBiologyNote(slug);
  if (!note) notFound();
  const noteIndex = buildNoteIndex();

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-border px-8 py-5">
        <div className="flex items-baseline gap-3">
          {backHref ? (
            <Link href={backHref} className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              Back to paper
            </Link>
          ) : (
            <Link href="/" className="text-lg font-semibold tracking-tight hover:text-accent transition-colors">
              pastpaperbd
            </Link>
          )}
          {!backHref && (
            <Link href="/biology" className="text-sm text-muted hover:text-foreground transition-colors">
              / Biology
            </Link>
          )}
          {!backHref && (
            <Link href="/biology/notes" className="text-sm text-muted hover:text-foreground transition-colors">
              / Notes
            </Link>
          )}
          {!backHref && <span className="text-sm text-muted">/ {note.title}</span>}
        </div>
        <div className="flex items-center gap-3">
          <SearchTrigger />
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 px-8 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 text-xs font-medium uppercase tracking-wider text-muted">
            {note.topic}
          </div>
          <MarkdownNote content={note.content} noteIndex={noteIndex} backParam={backParam} />
        </div>
      </main>

      {backHref && (
        <Link
          href={backHref}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm shadow-lg hover:border-accent hover:bg-accent-soft transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back to paper
        </Link>
      )}
    </div>
  );
}
