#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  getAllBreakdowns,
  getAllQuestions,
  getAllSpecPoints,
  getQuestionsForSpecPoint,
  getSpecPoint,
} from "../lib/data";
import { getBiologyNotes } from "../lib/notes";
import type { SearchDoc } from "../lib/search";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const OUT_PATH = path.join(repoRoot, "public", "search-index.json");

function paperPathFromId(paperId: string): { year: string; paperNumber: string; label: string } {
  const [, year, paperPart] = paperId.split("-");
  const paperNumber = paperPart.replace("p", "");
  return { year, paperNumber, label: `${year} Paper ${paperNumber}` };
}

function stripMarkdown(text: string): string {
  return text
    .replace(/^---[\s\S]*?---\n/, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/[*_>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];
  const allQuestions = getAllQuestions();
  const allBreakdowns = getAllBreakdowns();
  const allSpec = getAllSpecPoints();

  // Questions — only include those with breakdowns (otherwise low search value).
  for (const q of allQuestions) {
    const breakdown = allBreakdowns.find((b) => b.questionId === q.id);
    if (!breakdown) continue;
    const { year, paperNumber, label } = paperPathFromId(q.paperId);
    const specTitles = q.specPoints
      .map((id) => getSpecPoint(id))
      .filter((s): s is NonNullable<ReturnType<typeof getSpecPoint>> => Boolean(s))
      .map((s) => `${s.id} ${s.title}`)
      .join(" · ");
    const bodyParts = [
      breakdown.msAnswer,
      breakdown.whyExplanation,
      breakdown.commonMistakes ?? "",
      specTitles,
    ].filter(Boolean);
    docs.push({
      id: q.id,
      kind: "question",
      title: `Q${q.number} · ${label}`,
      subtitle: `${q.marks} marks${specTitles ? ` · ${specTitles.slice(0, 80)}` : ""}`,
      body: bodyParts.join(" \n "),
      href: `/biology/${year}/${paperNumber}${q.pageNumber ? `?page=${q.pageNumber}` : ""}`,
    });
  }

  // Spec points.
  for (const sp of allSpec) {
    const linked = getQuestionsForSpecPoint(sp.id);
    docs.push({
      id: sp.id,
      kind: "spec",
      title: `${sp.id} · ${sp.title}`,
      subtitle: `${sp.topic}${linked.length ? ` · ${linked.length} question${linked.length === 1 ? "" : "s"}` : ""}`,
      body: [sp.description, sp.breakdown ?? "", sp.topic].filter(Boolean).join(" \n "),
      href: `/biology/spec/${sp.id}`,
    });
  }

  // Notes.
  const notes = getBiologyNotes();
  for (const n of notes) {
    const content = fs.readFileSync(n.path, "utf8");
    const body = stripMarkdown(content);
    docs.push({
      id: n.slug,
      kind: "note",
      title: n.title,
      subtitle: n.topic,
      body: body.slice(0, 4000),
      href: `/biology/notes/${n.slug}`,
    });
  }

  return docs;
}

function main(): void {
  const docs = buildIndex();
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(docs));
  const bytes = fs.statSync(OUT_PATH).size;
  const kb = (bytes / 1024).toFixed(1);
  console.log(
    `[search-index] wrote ${docs.length} docs (${kb} KB) → ${path.relative(repoRoot, OUT_PATH)}`
  );
}

main();
