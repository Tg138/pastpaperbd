# pastpaperbd — handoff briefing

Read top to bottom before writing code. Also read:
- `AGENTS.md` (project rules, especially the Next 16 warning)
- `NEXT_SESSION.md` (prioritised queue of pending work + ideas)
- `node_modules/next/dist/docs/01-app/` (Next 16 API specifics — `params`/`searchParams` are now Promises, use `PageProps<'/route'>` global helper)

---

## What this site is (the vision)

A site where A-level students stop staring blankly at AQA mark schemes. Right now if you fail a question, AQA gives you a cryptic mark scheme and that's it — students don't know **why** the answer is the answer, where it sits in the spec, or what the examiner actually wanted.

pastpaperbd fixes that. For every question on every past paper:

- The actual paper PDF, in-browser, no redirects, no logins.
- A side-panel walkthrough explaining **why** the mark scheme answer earns each mark.
- A direct link to the exact AQA spec point, plus a plain-English breakdown of the spec.
- "Common mistakes" pulled from real examiner reports.
- Reverse lookup: pick a spec point → see every past-paper question that targets it.
- The user's own Obsidian notes, imported and rendered inline alongside the spec.

**Subjects:** Biology only at v1. Chemistry next, then Physics. UI must generalise — currently too biology-shaped.

**Audience:** A-level students self-revising. Free, no monetisation.

**The "feel":** Cool. Clean. Sand palette with brown undertones (light) / warm cocoa-tinted dark mode. Calm, academic, not childish, not corporate.

---

## Hard constraints — do not break these

1. **Never use the words "AI", "GPT", "Claude", "model", "LLM", "generated", "AI-powered".** Buttons say "Break this down", "Show explanation", "View walkthrough". Breakdowns are pre-generated offline and must read like a tutor wrote them.

2. **No sign-in / sign-up walls.** Progress lives in localStorage. Sign-in is paused indefinitely.

3. **No tab redirects.** Everything renders inline.

4. **Desktop and iPad only.** Don't waste effort on mobile responsive.

5. **Sand palette.** `#d2c39e` bg, `#2f2618` fg, `#5e4a2a` accent (light). Warm cocoa dark mode. No cool greys, no blue-black.

6. **Next.js 16, not 14/15.** `params`/`searchParams` are Promises — `await` them. Use `PageProps<'/route'>` and `LayoutProps<'/route'>` helpers. Read `node_modules/next/dist/docs/01-app/` before guessing API shape.

---

## Tech stack

- Next.js 16.2.4 (App Router, Turbopack)
- React 19.2.4
- Tailwind CSS v4 (`@import "tailwindcss"`, `@theme inline`)
- TypeScript strict, path alias `@/*` → project root
- PDFs self-hosted in `/public/papers/...` and `/public/spec/biology.pdf`
- No database, no auth, no API routes
- Hosting: Vercel

---

## File map

```
app/
  layout.tsx                  # root layout, theme bootstrap from localStorage (no-flash)
  globals.css                 # CSS variables (entire palette) + ppb-orbit keyframe
  page.tsx                    # landing page — orbital hub navigation
  _components/
    ThemeToggle.tsx           # dark/light toggle, persists in localStorage
    PaperViewer.tsx           # three-pane viewer (client component)
    OrbitalHub.tsx            # animated elliptic orbital navigation (client component)
    MarkdownNote.tsx          # custom markdown renderer (no deps): bold/italic/tables/LaTeX/$...$/wikilinks
  biology/
    page.tsx                  # year picker
    [year]/page.tsx           # paper picker (generateStaticParams over YEARS)
    [year]/[paper]/page.tsx   # three-pane paper viewer (server, awaits params)
    spec/page.tsx             # spec topic browser (notes chip per spec point)
    spec/[point]/page.tsx     # spec point detail with linked notes
    notes/page.tsx            # notes index grouped by topic
    notes/[slug]/page.tsx     # individual note page (generateStaticParams for static build)
lib/
  types.ts                    # Subject, Paper, Question, SpecPoint, Breakdown, RelatedNote
  data.ts                     # placeholder data + getters; will be replaced by extracted JSON
  notes.ts                    # reads content/notes/biology/, getBiologyNotes/getBiologyNote/getRelatedBiologyNotesForSpecPoints
public/
  papers/biology/{2022,2023,2024}/paper-{1,2,3}/{qp,ms,er}.pdf  # 27 PDFs
  spec/biology.pdf            # AQA 7402 spec
content/
  notes/biology/{T1..T8}/*.md # 37 Obsidian notes synced into repo (via npm run sync:notes)
scripts/
  sync-notes.mjs              # copies iCloud vault → content/notes/biology/ (wipe + recopy)
NEXT_SESSION.md               # prioritised work queue
HANDOFF.md                    # this file
AGENTS.md / CLAUDE.md         # project rules
```

---

## Data shape (`lib/types.ts`)

```ts
Subject       { slug: 'biology', name, code: '7402' }
Paper         { subject, year, paperNumber, qpPath, msPath, erPath }
Question      { id, paperId, number, marks, specPoints[], text? }
SpecPoint     { id, title, topic, parentId?, description, breakdown? }
Breakdown     { questionId, msAnswer, whyExplanation, specLinks[], commonMistakes? }
RelatedNote   { slug, title, topic, sectionTitle?, sectionAnchor? }
```

`paperId(subject, year, n)` → `"biology-2024-p1"`.  
`questionId(pid, num)` → `"biology-2024-p1-q1a"`.

---

## What's built

### Core viewer (current state)
- **Three-column docked layout.** Left: Spec panel. Centre: PDF area. Right: Walkthrough panel. Both side panels are sibling flex columns — they push the PDF aside instead of overlaying it. Both can be open simultaneously and independently. Edge tabs ("Spec" left, "Walkthrough" right) sit on the outer edges of the content row.
- **Three layout modes**, segmented control in toolbar:
  - **Question paper** — single-pane QP only.
  - **Mark scheme** — single-pane MS only.
  - **Side by side** — split: QP on the left, MS on the right, each labelled. Selecting a question scrolls both PDFs.
- **Two render modes**:
  - **Interactive** (default) — `react-pdf` renders pages as React elements. `IntersectionObserver` on each page reports the most-visible page → walked back to the nearest tagged question → tabs rebind as the user scrolls. Clicking a question tab in either panel scrolls the PDF to its page.
  - **Classic PDF** — original `<iframe>`. No auto-sync. Manual question tabs.
- **Mark scheme answer collapsed by default.** Walkthrough panel uses `Collapsible` accordions for "Mark scheme answer", "Why this is the answer", "Common mistakes". Click to reveal. Walkthrough panel never opens automatically — only on user click. Switching layouts auto-closes the walkthrough.
- **Question tabs** (not chips). Horizontal tab bar with active underline indicator at the top of each side panel. Auto-scrolls the active tab into view.
- Exam mode default OFF; locks MS and Side-by-side until all questions checked.
- Per-question completion in localStorage (`progress:<paperId>` key).
- `react-pdf@10.4.1` + `pdfjs-dist@5.4.296`. Worker at `public/pdf.worker.min.mjs`, pointed to via `pdfjs.GlobalWorkerOptions.workerSrc`.
- **SSR gotcha:** `pdfjs` references `DOMMatrix` at module top level → blows up in Node. `InteractivePdf` is loaded via `next/dynamic({ ssr: false })` from inside `PaperViewer` (a client component). Don't import it statically.
- PDF page width caps at 760px.

### Spec viewer (`/biology/spec`)
- Built. Mirrors the paper-viewer layout: docked Topics panel (left, open by default) | Spec PDF (centre) | Notes panel (right, closed by default).
- Topics panel groups all spec points by topic, highlights the active one, and clicking scrolls the spec PDF to that point's page. Active point auto-updates as the user scrolls.
- Notes panel shows the active spec point's official AQA description, plain-English breakdown, and related Obsidian notes.
- Component: `app/_components/SpecViewer.tsx`. Reuses `InteractivePdf`.

### `InteractivePdf` lazy rendering
- Required to make the 84-page spec PDF usable. Pages outside a 1500px IntersectionObserver buffer render as fixed-height placeholders (A4 aspect ratio); only nearby pages get the real `<Page>` canvas. Pages stay rendered once entered (avoids flicker on scroll-back).
- `scrollToPage` now flushes target + neighbours into the rendered set first, then a `useEffect` keyed on `[scrollTarget, renderedPages]` fires `scrollIntoView` after React commits — the previous rAF approach raced state updates and dropped the scroll.

### Navigation
- **Landing page** (`app/page.tsx`) — static three-card grid (Biology live; Chem/Physics dimmed "Soon"). Orbital hub was sidelined: the animation idea was good but couldn't be nailed without it feeling janky. `OrbitalHub.tsx` is unused but still in the repo — delete it if not coming back.
- All routes rendered: `/`, `/biology`, `/biology/[year]`, `/biology/[year]/[paper]`, `/biology/spec`, `/biology/spec/[point]`, `/biology/notes`, `/biology/notes/[slug]`

### Notes layer
- 37 Obsidian notes synced into `content/notes/biology/T{1-8}/` via `npm run sync:notes`
- `lib/notes.ts` reads from `content/notes/biology/` (in-repo, ships with Vercel deploys)
- `OBSIDIAN_BIOLOGY_NOTES_PATH` env var overrides to live vault path for local dev
- Scoring algorithm matches notes to spec points: topic folder match, title/word overlap, section scoring, manual aliases
- Notes appear as chips on spec point cards and as a "Related notes" section in question breakdowns
- Individual note pages render via `MarkdownNote` (handles wikilinks, LaTeX `$...$`, tables, bold/italic, callouts)
- `generateStaticParams` on `notes/[slug]/page.tsx` — statically built, no `force-dynamic`

### Theme
- CSS variables in `app/globals.css`, `@theme inline` maps to Tailwind colour tokens
- `@custom-variant dark (&:where(.dark, .dark *))` — dark mode via `.dark` class on `<html>`
- No-flash theme bootstrap: inline `<script>` in `app/layout.tsx` reads `localStorage.theme` and sets `.dark` before paint

### Data
- **2024 Paper 1 is fully populated**: 37 question parts (Q01.1 → Q10.3) with real mark-scheme text, plain-English walkthroughs, common-mistake notes, and tagged spec points.
- 18 spec points across all four taught topics — Biological molecules (3.1.1–3.1.6), Cells (3.2.1.1, 3.2.1.2, 3.2.1.3, 3.2.2, 3.2.3), Exchange and transport (3.3.1–3.3.4), Genetic information & variation (3.4.1), Energy transfers (3.5.3).
- Spec points mostly have real `pageNumber` against the spec PDF; the handful added late (3.4.1, 3.5.3) are missing page numbers — adding them is a small follow-up.
- `pageNumber` on every question is real (read off the QP page footer). Drives the Interactive viewer's scroll-based active question.
- 2023 + 2022 papers and Papers 2 + 3 are still untagged.
- Extraction tooling: `pdftotext -layout` works on QP and MS for these papers (text-based PDFs, no OCR needed). `er.pdf` may be image-based on older years.

---

## What's not built (see `NEXT_SESSION.md` for full queue)

- **2023 + 2022 Paper 1, and all of Papers 2/3** are untagged. Pipeline is `pdftotext -layout` → hand-write breakdowns into `lib/data.ts`. Top of the queue.
- **Page numbers for late-added spec points** (3.4.1 DNA/genetic code, 3.5.3 courtship) — add `pageNumber` once tagged from the spec PDF.
- **Examiner report integration** — `er.pdf` is unused. Best source for `commonMistakes` content; consider a separate `examinerReport` field with a fourth Collapsible.
- **Text mode for PDF viewer** — segmented control gains a "Text" option; renders `question.text` as styled HTML. Blocked on adding `Question.text` and extracting it.
- **Subject-agnostic refactor** — routes hardcoded as `/biology/...`. Generalise before Chemistry lands.
- **Reverse lookup** — spec point detail page should list all past paper questions targeting it.
- **"How to use" guide** — onboarding page or modal.
- **Delete dead code** — `OrbitalHub.tsx` is no longer imported. Also `@keyframes ppb-orbit` in `globals.css`.

---

## Working with the user

- **Be concise.** End-of-turn: 1–2 sentences max.
- **Confirm before risky actions.** Destructive ops, mass-rename, file deletion — ask first.
- **Don't narrate thinking.** State decisions, skip deliberation.
- **They have strong taste on UI.** Trust instincts on colour/layout. Adjust, don't argue.
- **They iterate fast.** Expect the spec to evolve. Keep `NEXT_SESSION.md` current.

## Verify before claiming done

- `npm run dev` and hit every changed route — confirm 200.
- For UI: check the page actually renders the change in browser. Don't assume.
- For type changes in `lib/types.ts`: run `npx tsc --noEmit` — every consumer must compile.
