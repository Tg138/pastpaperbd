import type { Metadata } from "next";
import Link from "next/link";
import { PAPER_NUMBERS, YEARS, getQuestionsForPaper } from "@/lib/data";
import { paperId } from "@/lib/types";
import { ThemeToggle } from "../../_components/ThemeToggle";
import { SearchTrigger } from "../../_components/SearchTrigger";
import {
  ProgressDashboard,
  type PaperProgressMeta,
} from "../../_components/ProgressDashboard";

export const metadata: Metadata = {
  title: "Your progress",
  description:
    "Track which AQA A-level Biology past-paper questions you've completed. Progress is stored locally in your browser.",
  alternates: { canonical: "/biology/progress" },
  robots: { index: false, follow: true },
};

export default function ProgressPage() {
  const papers: PaperProgressMeta[] = YEARS.flatMap((year) =>
    PAPER_NUMBERS.map((n) => ({
      subject: "biology" as const,
      year,
      paperNumber: n,
      total: getQuestionsForPaper(paperId("biology", year, n)).length,
    }))
  );

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
          <span className="text-sm text-muted">/ Progress</span>
        </div>
        <div className="flex items-center gap-3">
          <SearchTrigger />
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 px-8 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight">Your progress</h1>
          <p className="mt-2 text-muted">
            Stored locally in this browser. Clear your browser data and it&apos;s gone.
          </p>

          <div className="mt-8">
            <ProgressDashboard papers={papers} />
          </div>
        </div>
      </main>
    </div>
  );
}
