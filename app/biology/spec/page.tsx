import Link from "next/link";
import { getAllSpecPoints } from "@/lib/data";
import { getRelatedBiologyNotesForSpecPoints } from "@/lib/notes";
import { ThemeToggle } from "../../_components/ThemeToggle";
import { SpecViewer } from "../../_components/SpecViewer";

export default function SpecBrowser() {
  const points = getAllSpecPoints();

  // Order points: numeric topic order, then numeric ID order within topic
  const sorted = [...points].sort((a, b) => {
    if (a.topic !== b.topic) return a.topic.localeCompare(b.topic);
    return a.id.localeCompare(b.id, undefined, { numeric: true });
  });

  const entries = sorted.map((point) => ({
    point,
    relatedNotes: getRelatedBiologyNotesForSpecPoints([point]),
  }));

  return (
    <div className="flex flex-1 flex-col h-screen overflow-hidden">
      <header className="flex items-center justify-between px-6 py-3 border-b border-border shrink-0">
        <div className="flex items-baseline gap-3">
          <Link href="/" className="text-base font-semibold tracking-tight hover:text-accent transition-colors">
            pastpaperbd
          </Link>
          <Link href="/biology" className="text-sm text-muted hover:text-foreground transition-colors">
            / Biology
          </Link>
          <span className="text-sm text-muted">/ Specification</span>
        </div>
        <ThemeToggle />
      </header>

      <SpecViewer specPdfPath="/spec/biology.pdf" entries={entries} />
    </div>
  );
}
