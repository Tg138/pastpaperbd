#!/usr/bin/env node
// Sync Obsidian Biology notes into the repo so they ship with deploys.
// Source: env OBSIDIAN_BIOLOGY_NOTES_PATH, or the user's default iCloud path.
// Destination: content/notes/biology/  (committed to the repo)
//
// Usage:  node scripts/sync-notes.mjs
//         npm run sync:notes

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const SRC =
  process.env.OBSIDIAN_BIOLOGY_NOTES_PATH ??
  "C:\\Users\\TG134\\iCloudDrive\\iCloud~md~obsidian\\Obsidian Vault\\Content\\biology";
const DST = path.join(repoRoot, "content/notes/biology");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function copyTree(src, dst) {
  if (!fs.existsSync(src)) {
    console.error(`Source not found: ${src}`);
    process.exit(1);
  }
  ensureDir(dst);

  // Wipe destination first so deletions in the vault propagate.
  for (const entry of fs.readdirSync(dst, { withFileTypes: true })) {
    fs.rmSync(path.join(dst, entry.name), { recursive: true, force: true });
  }

  let copied = 0;
  for (const topicDir of fs.readdirSync(src, { withFileTypes: true })) {
    if (!topicDir.isDirectory()) continue;
    const topicSrc = path.join(src, topicDir.name);
    const topicDst = path.join(dst, topicDir.name);
    ensureDir(topicDst);
    for (const file of fs.readdirSync(topicSrc, { withFileTypes: true })) {
      if (!file.isFile() || !file.name.toLowerCase().endsWith(".md")) continue;
      fs.copyFileSync(path.join(topicSrc, file.name), path.join(topicDst, file.name));
      copied++;
    }
  }
  return copied;
}

const count = copyTree(SRC, DST);
console.log(`Synced ${count} notes from`);
console.log(`  ${SRC}`);
console.log(`→ ${path.relative(repoRoot, DST)}`);
