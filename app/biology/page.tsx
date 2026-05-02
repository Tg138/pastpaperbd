import Link from "next/link";
import { YEARS } from "@/lib/data";
import { ThemeToggle } from "../_components/ThemeToggle";

export default function BiologyIndex() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between px-8 py-5 border-b border-border">
        <div className="flex items-baseline gap-3">
          <Link href="/" className="text-lg font-semibold tracking-tight hover:text-accent transition-colors">
            pastpaperbd
          </Link>
          <span className="text-sm text-muted">/ Biology (7402)</span>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-1 px-8 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight">Pick a year</h1>
          <p className="mt-2 text-muted">Three papers per year. June series.</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/biology/notes"
              className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-surface transition-colors"
            >
              Your notes
            </Link>
            <Link
              href="/biology/spec"
              className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-surface transition-colors"
            >
              Spec browser
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {YEARS.map((year) => (
              <Link
                key={year}
                href={`/biology/${year}`}
                className="rounded-lg border border-border bg-surface p-6 hover:border-accent hover:bg-accent-soft transition-colors group"
              >
                <div className="text-3xl font-semibold tracking-tight group-hover:text-accent transition-colors">
                  {year}
                </div>
                <div className="mt-1 text-sm text-muted">Papers 1, 2, 3</div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
