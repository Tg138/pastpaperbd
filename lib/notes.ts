import fs from "node:fs";
import path from "node:path";
import type { RelatedNote, SpecPoint } from "./types";

export interface NoteSummary {
  slug: string;
  title: string;
  topic: string;
  path: string;
}

export interface Note extends NoteSummary {
  content: string;
}

interface NoteSection {
  title: string;
  anchor: string;
  content: string;
}

// Notes are synced into the repo via `npm run sync:notes` so they ship with
// deploys (Vercel can't reach the user's iCloud folder). Override with the env
// var only if you want to read live from a vault path (dev only).
const NOTES_ROOT =
  process.env.OBSIDIAN_BIOLOGY_NOTES_PATH ??
  path.join(process.cwd(), "content", "notes", "biology");

export function getBiologyNotes(): NoteSummary[] {
  if (!fs.existsSync(NOTES_ROOT)) return [];

  return fs
    .readdirSync(NOTES_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((topicDir) => {
      const topicPath = path.join(NOTES_ROOT, topicDir.name);
      return fs
        .readdirSync(topicPath, { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
        .map((entry) => {
          const notePath = path.join(topicPath, entry.name);
          const title = entry.name.replace(/\.md$/i, "");
          return {
            slug: encodeSlug(topicDir.name, title),
            title,
            topic: topicDir.name,
            path: notePath,
          };
        });
    })
    .sort((a, b) => a.topic.localeCompare(b.topic) || a.title.localeCompare(b.title));
}

export function getBiologyNote(slug: string): Note | undefined {
  const summary = getBiologyNotes().find((note) => note.slug === slug);
  if (!summary) return undefined;

  return {
    ...summary,
    content: fs.readFileSync(summary.path, "utf8"),
  };
}

export function getRelatedBiologyNotesForSpecPoints(
  specPoints: SpecPoint[],
  limit = 3
): RelatedNote[] {
  const notes = getBiologyNotes();
  const scoredNotes = notes
    .map((note) => scoreNoteForSpecPoints(note, specPoints))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.note.title.localeCompare(b.note.title));

  const topScore = scoredNotes[0]?.score ?? 0;
  const scored = scoredNotes
    .filter((item) => item.score >= 6 && item.score >= topScore * 0.5)
    .slice(0, limit);

  return scored.map(({ note }) => ({
    slug: note.slug,
    title: note.title,
    topic: note.topic,
    sectionTitle: note.sectionTitle,
    sectionAnchor: note.sectionAnchor,
  }));
}

function encodeSlug(topic: string, title: string): string {
  return encodeURIComponent(`${topic}/${title}`);
}

function scoreNoteForSpecPoints(
  note: NoteSummary,
  specPoints: SpecPoint[]
): {
  note: NoteSummary & { sectionTitle?: string; sectionAnchor?: string };
  score: number;
} {
  const noteLevelScore = specPoints.reduce(
    (total, specPoint) => total + scoreNote(note, specPoint),
    0
  );
  const sections = readNoteSections(note);
  const bestSection = sections
    .map((section) => ({
      section,
      score: specPoints.reduce(
        (total, specPoint) => total + scoreSection(section, specPoint),
        0
      ),
    }))
    .sort((a, b) => b.score - a.score)[0];
  const sectionScore = bestSection?.score ?? 0;

  return {
    note: {
      ...note,
      sectionTitle: sectionScore > 0 ? bestSection.section.title : undefined,
      sectionAnchor: sectionScore > 0 ? bestSection.section.anchor : undefined,
    },
    score: noteLevelScore + sectionScore,
  };
}

function scoreNote(note: NoteSummary, specPoint: SpecPoint): number {
  const specTopic = topicFolderForSpec(specPoint.id);
  const noteTitle = normalise(note.title);
  const searchableSpec = normalise(
    `${specPoint.title} ${specPoint.topic} ${specPoint.description} ${specPoint.breakdown ?? ""}`
  );
  const titleWords = noteTitle.split(" ").filter((word) => word.length > 3);
  let score = 0;

  if (specTopic === note.topic) score += 5;
  if (searchableSpec.includes(noteTitle)) score += 10;

  for (const word of titleWords) {
    if (searchableSpec.includes(word)) score += 2;
  }

  for (const alias of aliasesForNote(note.title)) {
    if (searchableSpec.includes(alias)) score += 4;
  }

  return score;
}

function scoreSection(section: NoteSection, specPoint: SpecPoint): number {
  const searchableSpec = normalise(
    `${specPoint.title} ${specPoint.topic} ${specPoint.description} ${specPoint.breakdown ?? ""}`
  );
  const sectionTitle = normalise(section.title);
  const sectionContent = normalise(section.content);
  const specWords = searchableSpec.split(" ").filter((word) => word.length > 4);
  let score = 0;

  if (searchableSpec.includes(sectionTitle)) score += 12;
  if (sectionTitle.includes(searchableSpec)) score += 12;

  for (const word of specWords) {
    if (sectionTitle.includes(word)) score += 4;
    if (sectionContent.includes(word)) score += 1;
  }

  return score;
}

function readNoteSections(note: NoteSummary): NoteSection[] {
  const content = fs.readFileSync(note.path, "utf8");
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const sections: NoteSection[] = [];
  let current: NoteSection | undefined;

  for (const line of lines) {
    const heading = line.trim().match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      current = {
        title: stripMarkdown(heading[2]),
        anchor: headingAnchor(heading[2]),
        content: "",
      };
      sections.push(current);
      continue;
    }

    if (current) current.content += `${line}\n`;
  }

  return sections;
}

function stripMarkdown(value: string): string {
  return value
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/[—–]/g, "-")
    .replace(/[*_`]/g, "")
    .trim();
}

export function headingAnchor(value: string): string {
  return stripMarkdown(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function topicFolderForSpec(specId: string): string | undefined {
  const match = specId.match(/^3\.(\d+)/);
  return match ? `T${match[1]}` : undefined;
}

function aliasesForNote(title: string): string[] {
  const key = normalise(title);
  const aliases: Record<string, string[]> = {
    carbohydrates: ["monomer", "polymer", "monosaccharide", "glucose", "glycosidic"],
    proteins: ["enzyme", "peptide", "amino acid"],
    "nucleic acids": ["dna", "rna", "nucleotide", "atp"],
    "cell structure": ["eukaryotic", "prokaryotic", "microscope", "magnification", "resolution"],
    mitosis: ["cell division"],
    photosynthesis: ["chloroplast", "calvin"],
    respiration: ["mitochondria", "atp"],
  };

  return aliases[key] ?? [];
}

function normalise(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
