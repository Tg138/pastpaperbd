# Next session — work queue (priority order)

---

## 1. 2023 + 2022 Paper 1  ← START HERE

2024 Paper 1 is fully populated (37 questions, Q01.1 → Q10.3). Repeat the process for the other two years.

**How:**
```bash
pdftotext -layout public/papers/biology/2023/paper-1/qp.pdf - | less
pdftotext -layout public/papers/biology/2023/paper-1/ms.pdf - | less
```

Append entries to `PLACEHOLDER_QUESTIONS` and `PLACEHOLDER_BREAKDOWNS` in `lib/data.ts`. The 2024 entries are the template — same field shape, same conventions:
- `pageNumber`: read the QP page footer (`*04*` = page 4).
- `marks`: from the `[N marks]` cue.
- `specPoints`: reuse existing IDs where possible. Add a new `SpecPoint` if a topic isn't covered (use AQA 7402 IDs — the existing 18 cover most of paper-1 territory).
- `msAnswer`: paste the mark-scheme text, with `\n` for line breaks.
- `whyExplanation`: 2–4 sentences, tutor voice, no AI/generation language.
- `commonMistakes`: pull from MS `Reject` / `Ignore` / `Max if` lines, or examiner report.

After both years are in, the same UI works without code changes.

---

## 2. Page numbers for spec points 3.4.1 and 3.5.3

These were added late and don't have `pageNumber` set, so the spec viewer can't scroll to them. Open `public/spec/biology.pdf` and find the PDF page for each section, then add to `lib/data.ts`.

---

## 3. Examiner report integration

`er.pdf` for each paper has rich examiner commentary. Currently unused. Two paths:
- Extract per question and append to existing `commonMistakes` text (manual, high quality).
- Add `examinerReport?: string` to `Breakdown` and a fourth `Collapsible` in the walkthrough. Cleaner separation of "mark scheme rule" vs "what students actually did".

The 2024 `er.pdf` is text-based; older years may be scanned (need OCR — Tesseract works).

---

## 4. Papers 2 and 3 (all years)

Same pipeline as Paper 1. Paper 2 covers a different topic split (3.4–3.6 mostly), Paper 3 is the synoptic essay paper. Routes already exist via `generateStaticParams` over YEARS × PAPER_NUMBERS.

---

## 5. Subject-agnostic refactor

Routes are hardcoded `/biology/...`. Before Chemistry lands:
- Generalise to `/[subject]/[year]/[paper]` with a subject registry in `lib/data.ts`.
- Subject registry: `{ slug, name, code, paperCount, years[] }`.
- Spec and Notes routes: `/[subject]/spec`, `/[subject]/notes/[slug]`.

---

## 6. Reverse lookup on spec point pages

`/biology/spec/[point]` still shows placeholder. Now that question data exists across most of Paper 1:
- Query all questions whose `specPoints` includes this point ID.
- Group by paper, show as a grid of question chips.
- Each chip links to `/biology/[year]/[paper]` with the question pre-selected (use a `?q=` query param).

---

## 7. PDF viewer — Text mode toggle

Add a third option to **Interactive | Classic PDF**: **Text**. Renders `question.text` as styled HTML cards instead of the PDF.

**Blocked on:** `Question.text` field doesn't exist. Add to `lib/types.ts` and populate during data extraction.

---

## 8. "How to use pastpaperbd" guide

Short onboarding page or dismissable modal. Cover:
- Three layout modes (QP / MS / Side by side)
- Edge tabs and docked panels
- Exam mode vs. open mode
- How notes link to spec points

Linked from landing page.

---

## 9. Cleanup

- Remove `app/_components/OrbitalHub.tsx` (unused).
- Remove `@keyframes ppb-orbit` from `app/globals.css`.
- The `MarkdownNote` component still strips Obsidian image syntax (`![[Pasted image …]]`). Resolve images by copying them into `public/notes/biology/` during the sync step.

---

## Deferred / parking lot

- Chemistry papers (user will source PDFs when ready)
- Mobile layout (explicitly out of scope)
- Sign-in / cloud sync (paused indefinitely)
- Wikilink resolution across notes (currently renders `[[title]]` as text)
- Reviving the orbital hub — only worth it if it can be made absolutely smooth

These are my own changes that im adding,
the tabs on the left and right (Spec and Walkthrough) overlap with the text. additionally, when on the MS tab, the tabs don't link with the question answer showing. don't like the note presentation, would prefer it to look like  my obsidian notes with custom colours. put the site online too at pastpaperbd.com

