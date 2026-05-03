import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownNote } from "@/app/_components/MarkdownNote";
import { getBiologyNote, getBiologyNotes } from "@/lib/notes";
import { ThemeToggle } from "../../../_components/ThemeToggle";

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
  const note = getBiologyNote(slug);
  if (!note) notFound();
  const noteIndex = buildNoteIndex();

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
          <Link href="/biology/notes" className="text-sm text-muted hover:text-foreground transition-colors">
            / Notes
          </Link>
          <span className="text-sm text-muted">/ {note.title}</span>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-1 px-8 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 text-xs font-medium uppercase tracking-wider text-muted">
            {note.topic}
          </div>
          <MarkdownNote content={note.content} noteIndex={noteIndex} />
        </div>
      </main>
    </div>
  );
}
