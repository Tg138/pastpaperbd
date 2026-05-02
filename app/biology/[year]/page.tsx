import Link from "next/link";
import { notFound } from "next/navigation";
import { PAPER_NUMBERS, YEARS } from "@/lib/data";
import type { Year } from "@/lib/types";
import { ThemeToggle } from "../../_components/ThemeToggle";

export default async function YearIndex(props: PageProps<"/biology/[year]">) {
  const { year: yearParam } = await props.params;
  const year = Number(yearParam) as Year;
  if (!YEARS.includes(year)) notFound();

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
          <span className="text-sm text-muted">/ {year}</span>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-1 px-8 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight">Pick a paper</h1>
          <p className="mt-2 text-muted">June {year}.</p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PAPER_NUMBERS.map((n) => (
              <Link
                key={n}
                href={`/biology/${year}/${n}`}
                className="rounded-lg border border-border bg-surface p-6 hover:border-accent hover:bg-accent-soft transition-colors group"
              >
                <div className="text-2xl font-semibold tracking-tight group-hover:text-accent transition-colors">
                  Paper {n}
                </div>
                <div className="mt-1 text-sm text-muted">7402/{n}</div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return YEARS.map((year) => ({ year: String(year) }));
}
