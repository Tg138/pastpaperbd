import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PAPER_NUMBERS,
  YEARS,
  getBreakdown,
  getPaper,
  getQuestionsForPaper,
  getSpecPoint,
} from "@/lib/data";
import { getRelatedBiologyNotesForSpecPoints } from "@/lib/notes";
import { paperId } from "@/lib/types";
import type { PaperNumber, Year } from "@/lib/types";
import { buildPaperJsonLd, buildPaperMetadata } from "@/lib/seo";
import { ThemeToggle } from "../../../_components/ThemeToggle";
import { SearchTrigger } from "../../../_components/SearchTrigger";
import { PaperViewer } from "../../../_components/PaperViewer";

export async function generateMetadata(
  props: PageProps<"/biology/[year]/[paper]">
): Promise<Metadata> {
  const { year: yearParam, paper: paperParam } = await props.params;
  const year = Number(yearParam) as Year;
  const paperNumber = Number(paperParam) as PaperNumber;
  if (!YEARS.includes(year) || !PAPER_NUMBERS.includes(paperNumber)) return {};
  const paper = getPaper("biology", year, paperNumber);
  const pid = paperId("biology", year, paperNumber);
  const questionCount = getQuestionsForPaper(pid).length;
  return buildPaperMetadata({ paper, questionCount });
}

export default async function PaperPage(
  props: PageProps<"/biology/[year]/[paper]">
) {
  const { year: yearParam, paper: paperParam } = await props.params;
  const { page, panels } = await props.searchParams;
  const initialPage = typeof page === "string" ? Number(page) || undefined : undefined;
  const initialPanels = typeof panels === "string"
    ? (panels.split(",").filter((p): p is "spec" | "walkthrough" => p === "spec" || p === "walkthrough"))
    : undefined;
  const year = Number(yearParam) as Year;
  const paperNumber = Number(paperParam) as PaperNumber;

  if (!YEARS.includes(year)) notFound();
  if (!PAPER_NUMBERS.includes(paperNumber)) notFound();

  const paper = getPaper("biology", year, paperNumber);
  const pid = paperId("biology", year, paperNumber);
  const questions = getQuestionsForPaper(pid);

  const enriched = questions.map((q) => {
    const specPoints = q.specPoints
      .map((id) => getSpecPoint(id))
      .filter((s): s is NonNullable<ReturnType<typeof getSpecPoint>> => Boolean(s));

    return {
      question: q,
      breakdown: getBreakdown(q.id),
      specPoints,
      relatedNotes: getRelatedBiologyNotesForSpecPoints(specPoints),
    };
  });

  const jsonLd = buildPaperJsonLd({ paper, questionCount: questions.length });

  return (
    <div className="flex flex-1 flex-col md:h-screen md:overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="flex items-center justify-between px-6 py-3 border-b border-border shrink-0">
        <div className="flex items-baseline gap-3">
          <Link href="/" className="text-base font-semibold tracking-tight hover:text-accent transition-colors">
            pastpaperbd
          </Link>
          <Link href="/biology" className="text-sm text-muted hover:text-foreground transition-colors">
            / Biology
          </Link>
          <Link href={`/biology/${year}`} className="text-sm text-muted hover:text-foreground transition-colors">
            / {year}
          </Link>
          <span className="text-sm text-muted">/ Paper {paperNumber}</span>
        </div>
        <div className="flex items-center gap-3">
          <SearchTrigger />
          <ThemeToggle />
        </div>
      </header>

      <PaperViewer paper={paper} entries={enriched} initialPage={initialPage} initialPanels={initialPanels} />
    </div>
  );
}

export function generateStaticParams() {
  return YEARS.flatMap((year) =>
    PAPER_NUMBERS.map((paper) => ({
      year: String(year),
      paper: String(paper),
    }))
  );
}
