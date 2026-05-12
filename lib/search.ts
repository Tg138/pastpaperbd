export interface SearchDoc {
  id: string;
  kind: "question" | "spec" | "note";
  title: string;
  subtitle?: string;
  body: string;
  href: string;
}

export interface SearchHit {
  doc: SearchDoc;
  score: number;
  snippet?: string;
}

const STOPWORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "but", "by", "for", "from", "has",
  "have", "in", "is", "it", "of", "on", "or", "that", "the", "this", "to", "was",
  "were", "with", "will",
]);

export function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 0 && !STOPWORDS.has(t));
}

export function scoreDoc(doc: SearchDoc, query: string): number {
  const tokens = tokenize(query);
  if (tokens.length === 0) return 0;

  const titleLower = doc.title.toLowerCase();
  const bodyLower = doc.body.toLowerCase();
  const queryLower = query.toLowerCase().trim();

  let score = 0;

  // Exact spec-ID match (e.g., "3.4.1") — huge bonus on spec docs.
  if (doc.kind === "spec" && doc.id.toLowerCase() === queryLower) {
    score += 100;
  }

  // Full phrase match in title.
  if (titleLower.includes(queryLower)) score += 40;
  // Full phrase match in body.
  if (bodyLower.includes(queryLower)) score += 10;

  // Per-token scoring.
  for (const token of tokens) {
    if (titleLower.includes(token)) score += token.length >= 4 ? 5 : 3;
    if (bodyLower.includes(token)) score += token.length >= 4 ? 1.5 : 0.5;
    if (titleLower.startsWith(token)) score += 4;
  }

  // Kind weighting: spec points are higher priority for ID-like queries.
  if (/^\d+(\.\d+)+$/.test(queryLower) && doc.kind === "spec") {
    score += 20;
  }

  return score;
}

export function searchDocs(docs: SearchDoc[], query: string, limit = 30): SearchHit[] {
  const trimmed = query.trim();
  if (!trimmed) return [];
  const tokens = tokenize(trimmed);
  if (tokens.length === 0) return [];

  return docs
    .map((doc) => ({ doc, score: scoreDoc(doc, trimmed), snippet: makeSnippet(doc.body, tokens) }))
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function makeSnippet(body: string, tokens: string[]): string | undefined {
  if (!body) return undefined;
  const lower = body.toLowerCase();
  let firstHit = -1;
  for (const token of tokens) {
    const idx = lower.indexOf(token);
    if (idx >= 0 && (firstHit < 0 || idx < firstHit)) firstHit = idx;
  }
  if (firstHit < 0) return body.slice(0, 140).trim();
  const start = Math.max(0, firstHit - 30);
  const end = Math.min(body.length, firstHit + 110);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < body.length ? "…" : "";
  return `${prefix}${body.slice(start, end).trim()}${suffix}`;
}
