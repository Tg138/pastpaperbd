import type { Metadata } from "next";
import type { Note } from "./notes";
import type { Paper, SpecPoint } from "./types";

export const SITE_NAME = "pastpaperbd";
export const SITE_TAGLINE = "AQA A-level Biology — past papers, decoded";
export const SITE_DESCRIPTION =
  "Browse AQA A-level Biology past papers with linked specification points, walkthroughs of every mark scheme, and common-mistake notes pulled from real examiner reports.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://pastpaperbd.vercel.app";

const SUBJECT_NAME: Record<string, string> = {
  biology: "Biology",
};

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

interface PaperMetaInput {
  paper: Paper;
  questionCount: number;
}

export function buildPaperMetadata({ paper, questionCount }: PaperMetaInput): Metadata {
  const subject = SUBJECT_NAME[paper.subject] ?? paper.subject;
  const title = `${subject} ${paper.year} · Paper ${paper.paperNumber}`;
  const description = questionCount
    ? `AQA A-level ${subject} ${paper.year} Paper ${paper.paperNumber} — interactive question paper alongside the mark scheme, with walkthroughs for ${questionCount} question${questionCount === 1 ? "" : "s"} linked to the specification.`
    : `AQA A-level ${subject} ${paper.year} Paper ${paper.paperNumber} — interactive question paper alongside the mark scheme.`;
  const path = `/${paper.subject}/${paper.year}/${paper.paperNumber}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description,
      url: absoluteUrl(path),
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${SITE_NAME}`,
      description,
    },
  };
}

export function buildSpecMetadata(sp: SpecPoint): Metadata {
  const title = `${sp.id} · ${sp.title}`;
  const description = sp.description.length > 200 ? `${sp.description.slice(0, 197)}…` : sp.description;
  const path = `/biology/spec/${sp.id}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description,
      url: absoluteUrl(path),
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${SITE_NAME}`,
      description,
    },
  };
}

export function buildNoteMetadata(note: Pick<Note, "title" | "topic" | "slug" | "content">): Metadata {
  const title = `${note.title} · Biology notes`;
  const description = makeNoteDescription(note.content) ?? `Detailed AQA A-level Biology notes on ${note.title}.`;
  const path = `/biology/notes/${note.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${note.title} — ${SITE_NAME}`,
      description,
      url: absoluteUrl(path),
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${note.title} — ${SITE_NAME}`,
      description,
    },
  };
}

export function buildPaperJsonLd({ paper, questionCount }: PaperMetaInput) {
  const subject = SUBJECT_NAME[paper.subject] ?? paper.subject;
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: `AQA A-level ${subject} ${paper.year} Paper ${paper.paperNumber}`,
    inLanguage: "en-GB",
    educationalLevel: "A-level",
    learningResourceType: "Past paper",
    about: `${subject} (AQA 7402)`,
    url: absoluteUrl(`/${paper.subject}/${paper.year}/${paper.paperNumber}`),
    isAccessibleForFree: true,
    publisher: { "@type": "Organization", name: SITE_NAME },
    ...(questionCount > 0 ? { numberOfItems: questionCount } : {}),
  };
}

function makeNoteDescription(content: string): string | undefined {
  // Strip front-matter, headings, markdown formatting; take first ~180 chars of body.
  const stripped = content
    .replace(/^---[\s\S]*?---\n/, "")
    .replace(/^#{1,6}\s+.*$/gm, "")
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/[*_>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!stripped) return undefined;
  return stripped.length > 200 ? `${stripped.slice(0, 197)}…` : stripped;
}
