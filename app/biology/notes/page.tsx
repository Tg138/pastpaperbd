import Link from "next/link";
import { getBiologyNotes } from "@/lib/notes";
import { ThemeToggle } from "../../_components/ThemeToggle";

export default function BiologyNotesPage() {
  const notes = getBiologyNotes();
  const grouped = notes.reduce<Record<string, typeof notes>>((acc, note) => {
    (acc[note.topic] ??= []).push(note);
    return acc;
  }, {});

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
          <span className="text-sm text-muted">/ Notes</span>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-1 px-8 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight">Your Biology notes</h1>
          <p className="mt-2 text-muted">
            Pulled from your Obsidian Biology folder.
          </p>

          {notes.length === 0 ? (
            <div className="mt-8 rounded-lg border border-border bg-surface p-4 text-sm text-muted">
              No Markdown notes were found in your Obsidian Biology folder.
            </div>
          ) : (
            <div className="mt-10 space-y-8">
              {Object.entries(grouped).map(([topic, list]) => (
                <section key={topic}>
                  <h2 className="text-sm font-medium uppercase tracking-wider text-muted">
                    {topic}
                  </h2>
                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {list.map((note) => (
                      <Link
                        key={note.slug}
                        href={`/biology/notes/${note.slug}`}
                        className="rounded-md border border-border bg-surface px-4 py-3 transition-colors hover:border-accent hover:bg-accent-soft"
                      >
                        <span className="text-sm font-medium">{note.title}</span>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
