# Codex handoff for Claude Code

Read this alongside `HANDOFF.md`, `NEXT_SESSION.md`, and `AGENTS.md`.

## What changed in this Codex session

### Obsidian notes are now browsable

Added a notes layer that reads Biology Markdown notes directly from:

`C:\Users\TG134\iCloudDrive\iCloud~md~obsidian\Obsidian Vault\Content\biology`

New files:

- `lib/notes.ts`
- `app/biology/notes/page.tsx`
- `app/biology/notes/[slug]/page.tsx`
- `app/_components/MarkdownNote.tsx`

Routes:

- `/biology/notes` lists all Biology notes grouped by `T1` to `T8`.
- `/biology/notes/[slug]` renders one note.

The note slug is encoded as `T1%2FCarbohydrates`, etc. This lets the route represent both topic folder and note title in a single dynamic segment.

### Notes are linked from navigation

Updated:

- `app/page.tsx`
- `app/biology/page.tsx`

Both now include a `Your notes` link.

### Paper questions now link to related notes

Updated:

- `lib/types.ts`
- `lib/notes.ts`
- `app/biology/[year]/[paper]/page.tsx`
- `app/_components/PaperViewer.tsx`

`RelatedNote` now has:

```ts
export interface RelatedNote {
  slug: string;
  title: string;
  topic: string;
  sectionTitle?: string;
  sectionAnchor?: string;
}
```

The paper route computes related notes server-side and passes them into `PaperViewer`.

### Links now jump to exact sections inside notes

`MarkdownNote` now adds stable `id` anchors to Markdown headings.

Example tested:

Q1a on `/biology/2024/1` links to:

`/biology/notes/T1%2FCarbohydrates#monomers-and-polymers`

That lands on the `Monomers and Polymers` section inside the Carbohydrates note.

## Current matching logic

`lib/notes.ts` currently uses lightweight automatic matching:

- Spec point ID maps to topic folder, e.g. `3.1.x` -> `T1`.
- Note titles are matched against spec point title/topic/description/breakdown.
- Some hardcoded aliases improve matching, e.g. `carbohydrates` -> `monomer`, `polymer`, `monosaccharide`, `glucose`, `glycosidic`.
- Note sections are parsed from `##`, `###`, and `####` headings.
- Section headings/content are scored against spec-point text.
- The best note section becomes `sectionTitle` + `sectionAnchor`.

This is good enough for the demo, but not exam-perfect.

## Important current behavior

- Related-note links show even when exam mode locks the walkthrough. This is intentional for now: students can revise the topic before revealing the mark scheme walkthrough.
- Note rendering is deliberately simple and local. It strips Obsidian wikilinks to readable text and renders headings, paragraphs, bullets, hr, and pipe-table lines as preformatted rows.
- Images like `![[Pasted image ...]]` are currently rendered as text (`Image: ...`). No image resolution yet.

## Verification already done

Ran:

```bash
npm.cmd exec tsc -- --noEmit
```

It passes.

Browser-verified:

- `/biology/notes`
- `/biology/notes/T1%2FCarbohydrates`
- `/biology/2024/1`
- Q1a related note link -> `Carbohydrates#monomers-and-polymers`

Known caveats:

- `npm.cmd run lint` still fails because of pre-existing React lint errors in:
  - `app/_components/PaperViewer.tsx`
  - `app/_components/ThemeToggle.tsx`
- `npm.cmd run build` is blocked in this environment by Google font fetching through `next/font/google`.

## Best next step

Create a manual mapping layer for exact question -> note section links.

Suggested file:

`lib/note-index.ts`

Suggested shape:

```ts
export const QUESTION_NOTE_LINKS = {
  "biology-2024-p1-q1a": [
    {
      note: "T1/Carbohydrates",
      section: "Monomers and Polymers",
    },
  ],
} as const;
```

Then update `lib/notes.ts` so manual mappings override automatic matching.

This gives the desired workflow:

question -> exact subtopic section -> note -> back to paper

Automatic matching should remain as a fallback for unmapped questions/spec points.

## UI direction from user

The user wants streamlined movement between notes and questions. The next strong UX move is probably:

- Add a `Back to question` link when arriving at a note section from a paper.
- Preserve paper URL/question ID in query params, e.g.
  `/biology/notes/T1%2FCarbohydrates#monomers-and-polymers?from=/biology/2024/1&q=biology-2024-p1-q1a`
  but note hash/query ordering needs care; preferred URL shape:
  `/biology/notes/T1%2FCarbohydrates?from=...&q=...#monomers-and-polymers`
- Consider opening notes in a side panel later rather than full navigation, if the three-pane paper viewer can support it cleanly.

## Do not forget project rules

- No user-facing mentions of AI, GPT, Claude, model, LLM, generated, etc.
- No auth in v1.
- Keep PDFs inline.
- Desktop/iPad priority.
- Respect Next.js 16 route typing: `params` are Promises, use `PageProps<'/route'>`.

---

## Update from user - 2026-05-02

The user has made substantial viewer changes after the earlier handoff. Check the code before editing, especially:

- `app/_components/PaperViewer.tsx`
- `app/_components/InteractivePdf.tsx`
- `lib/types.ts`
- `lib/data.ts`
- `package.json`
- `public/pdf.worker.min.mjs`

Current viewer state observed by Codex:

- `PaperViewer` no longer uses only the standard browser PDF iframe.
- It now has two render modes:
  - `interactive`: uses `InteractivePdf` via `react-pdf`.
  - `classic`: keeps iframe-style PDF rendering as the familiar fallback.
- Toolbar has segmented controls for:
  - Question paper / Mark scheme
  - Interactive / Classic PDF
- The PDF area has edge tabs:
  - Left tab: `Spec`
  - Right tab: `Walkthrough`
- Edge tabs open slide-in side panels.
- `InteractivePdf` renders PDF pages with `react-pdf`, watches page visibility with `IntersectionObserver`, and calls `onActiveQuestionChange`.
- `Question.pageNumber?: number` exists in `lib/types.ts`.
- Placeholder questions in `lib/data.ts` now have page numbers.
- Exam mode now defaults to off.

## User's new priorities

### 1. Fix question granularity / grouping

Current issue: the active question sometimes changes between question parts, e.g. `1.1`, `1.2`, rather than the broader full question `1`, `2`, `3`.

Desired behavior:

- The question navigation and active walkthrough should usually move between whole questions, not tiny subparts.
- Subparts can still exist inside the data, but the UI needs a grouping layer.
- Likely data model change:

```ts
interface QuestionGroup {
  id: string;          // biology-2024-p1-q1
  number: string;      // "1"
  questionIds: string[];
  pageNumber?: number;
  marks?: number;
}
```

Alternative: add `parentQuestionId` or `groupNumber` to `Question`.

Do not solve this only with display formatting. The sync logic needs to understand the intended grouping.

### 2. Hide mark scheme answers by default

Current issue: mark scheme answers / walkthrough content are too visible by default.

Desired behavior:

- The panel can show that a mark scheme is available, but the answer content should be collapsed by default.
- User described a dropdown pattern:
  - A front tab/row says something like `Mark scheme`.
  - As the user scrolls past questions, the active question updates.
  - The mark scheme row updates to the active question.
  - The user clicks to expand it if they want the answer.

This should work even when the active question changes from PDF scrolling.

### 3. Polish the slide-out tab menu

Current issue: edge tabs open side panels, but the panel/tabs do not feel seamless or professional yet.

Problems to inspect:

- Clicking a tab pulls out a panel, but the tab/panel state feels sticky or awkward.
- Closing/opening is not elegant.
- The tab may remain visually disconnected from the panel.

Desired direction:

- Make edge tabs feel attached to their panel.
- Smooth, professional slide behavior.
- Clear active/inactive states.
- Possibly close when clicking outside, pressing Escape, or choosing the opposite panel.
- Avoid panels feeling like temporary debug drawers.

### 4. Build the spec viewer next

This is important and should come after the question-viewer polish.

Desired direction:

- Similar interaction model to the question paper / mark scheme viewer.
- Spec PDF should be displayed cleanly.
- There should be linked notes alongside it.
- Clicking spec sections should expose relevant Obsidian note sections.
- The spec viewer should become a real study surface, not just a list page.

Likely route:

- `/biology/spec`

Likely layout:

- Main PDF/spec panel.
- Side panel for spec points and note links.
- Maybe a note-preview/open-note panel.

### 5. Better storage / source of truth for note files

Current issue: notes are read directly from the user's Obsidian/iCloud path.

Concern:

- This is fine locally, but messy for deployment and long-term storage.
- Need a cleaner content storage strategy for note files.

Options to consider:

- Copy/export selected notes into the repo under `content/notes/biology/...`.
- Keep Obsidian as authoring source, then add a sync/import script.
- Store generated/cleaned markdown or JSON in `content/data`.
- Do not rely on the absolute iCloud path in production.

Best likely path:

1. Keep Obsidian as the editing source.
2. Add an import script that copies notes + referenced images into repo-owned `content/`.
3. The site reads from repo-owned content.

### 6. Continue improving note readability

Current issue: notes are still hard to read in places because too much content has the same visual weight/color.

Already improved:

- Headings have stronger treatment.
- Bold/italic render.
- Tables render.
- Some equation / LaTeX block support was added for ATP.

Still needed:

- More section breaks.
- Better color rhythm.
- Better handling of callouts / key facts / exam tips.
- Better visual hierarchy inside long notes.
- Notes should not feel like one continuous slab.

Potential idea:

- Render `Summary` and `AQA Exam Tips` as distinct styled sections.
- Pull bold-leading list items into key-point cards.
- Add subtle separators between major sections.
- Use slightly different treatments for definitions, processes, equations, and exam tips.

### 7. UI visual idea: orbit-inspired motif

User mentioned wanting something pertaining to "orbits".

Do not overdo this. Possible tasteful applications:

- Subject/topic navigation as orbital rings or nodes.
- Spec/notes/question connections as orbiting linked nodes.
- A subtle motif for the landing/subject hub.
- Avoid making the study interface decorative or distracting.

This is a visual direction to explore later, not a blocker for current viewer work.

## Suggested next order

1. Fix active question grouping so scrolling changes between main questions, not fragments.
2. Collapse mark scheme answer by default using a clean dropdown or tab row.
3. Polish edge tabs/side panel behavior.
4. Build spec viewer with PDF + note links.
5. Formalize note storage/import from Obsidian into repo content.
6. Continue note readability improvements.
