import Link from "next/link";
import { ThemeToggle } from "./_components/ThemeToggle";

interface SubjectCard {
  slug: string;
  name: string;
  code: string;
  available: boolean;
  links: { label: string; href: string }[];
}

const SUBJECTS: SubjectCard[] = [
  {
    slug: "biology",
    name: "Biology",
    code: "AQA 7402",
    available: true,
    links: [
      { label: "Papers", href: "/biology" },
      { label: "Spec", href: "/biology/spec" },
      { label: "Notes", href: "/biology/notes" },
    ],
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    code: "AQA 7405",
    available: false,
    links: [],
  },
  {
    slug: "physics",
    name: "Physics",
    code: "AQA 7408",
    available: false,
    links: [],
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <header className="flex items-center justify-between px-8 py-5 border-b border-border">
        <span className="text-lg font-semibold tracking-tight">pastpaperbd</span>
        <ThemeToggle />
      </header>

      <main className="flex-1 flex flex-col items-center px-8 py-16">
        <div className="text-center max-w-xl">
          <h1 className="text-4xl font-semibold tracking-tight leading-tight">
            Past papers, decoded.
          </h1>
          <p className="mt-3 text-muted text-base leading-relaxed">
            Every mark scheme answer walked through. Linked to the spec. Common
            mistakes flagged from real examiner reports.
          </p>
        </div>

        <div className="mt-12 grid w-full max-w-4xl gap-4 grid-cols-1 sm:grid-cols-3">
          {SUBJECTS.map((s) => (
            <SubjectTile key={s.slug} subject={s} />
          ))}
        </div>
      </main>

      <footer className="px-8 py-5 border-t border-border text-xs text-muted">
        Free for students. Past papers © AQA.
      </footer>
    </div>
  );
}

function SubjectTile({ subject }: { subject: SubjectCard }) {
  if (!subject.available) {
    return (
      <div className="rounded-lg border border-border bg-surface/50 p-6 opacity-60">
        <div className="flex items-baseline justify-between">
          <div className="text-xl font-semibold tracking-tight">{subject.name}</div>
          <span className="text-[10px] uppercase tracking-wider text-muted">Soon</span>
        </div>
        <div className="mt-1 text-xs text-muted">{subject.code}</div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent">
      <div className="flex items-baseline justify-between">
        <div className="text-xl font-semibold tracking-tight">{subject.name}</div>
        <span className="text-xs text-muted">{subject.code}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {subject.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded border border-border bg-background px-3 py-1.5 text-sm font-medium hover:border-accent hover:bg-accent-soft hover:text-accent transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
