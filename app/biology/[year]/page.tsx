import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PAPER_NUMBERS, YEARS, paperHasBreakdowns } from "@/lib/data";
import { paperId } from "@/lib/types";
import type { Year } from "@/lib/types";
import { ThemeToggle } from "../../_components/ThemeToggle";
import { SearchTrigger } from "../../_components/SearchTrigger";

export async function generateMetadata(
  props: PageProps<"/biology/[year]">
): Promise<Metadata> {
  const { year: yearParam } = await props.params;
  const year = Number(yearParam) as Year;
  if (!YEARS.includes(year)) return {};
  const title = `Biology ${year} · AQA A-level papers`;
  const description = `AQA A-level Biology (7402) — June ${year} series. Papers 1, 2, and 3 with mark schemes and walkthroughs.`;
  return {
    title,
    description,
    alternates: { canonical: `/biology/${year}` },
    openGraph: {
      title,
      description,
      url: `/biology/${year}`,
      type: "website",
    },
  };
}

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
        <div className="flex items-center gap-3">
          <SearchTrigger />
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 px-8 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight">Pick a paper</h1>
          <p className="mt-2 text-muted">June {year}.</p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PAPER_NUMBERS.map((n) => {
              const hasData = paperHasBreakdowns(paperId("biology", year, n));
              return (
                <Link
                  key={n}
                  href={`/biology/${year}/${n}`}
                  className="rounded-lg border border-border bg-surface p-6 hover:border-accent hover:bg-accent-soft transition-colors group"
                >
                  <div className="text-2xl font-semibold tracking-tight group-hover:text-accent transition-colors">
                    Paper {n}
                  </div>
                  <div className="mt-1 text-sm text-muted">7402/{n}</div>
                  <div className="mt-3">
                    {hasData ? (
                      <span className="text-xs text-accent font-medium">Walkthroughs available</span>
                    ) : (
                      <span className="text-xs text-muted">PDFs only</span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return YEARS.map((year) => ({ year: String(year) }));
}
