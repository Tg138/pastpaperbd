/**
 * populate-paper.mjs
 *
 * Usage:
 *   GEMINI_API_KEY=<key> node scripts/populate-paper.mjs <year> <paper>
 *
 * Example:
 *   GEMINI_API_KEY=AIza... node scripts/populate-paper.mjs 2024 1
 *
 * Outputs TypeScript source to stdout that can be pasted into lib/data.ts.
 * Redirecting to a file:
 *   GEMINI_API_KEY=... node scripts/populate-paper.mjs 2024 2 > scripts/out/2024-p2.ts
 */

import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const [, , yearArg, paperArg] = process.argv;
if (!yearArg || !paperArg) {
  console.error("Usage: node scripts/populate-paper.mjs <year> <paper>");
  process.exit(1);
}

const year = yearArg;
const paper = paperArg;
const pid = `biology-${year}-p${paper}`;
const qpPath = `public/papers/biology/${year}/paper-${paper}/qp.pdf`;
const msPath = `public/papers/biology/${year}/paper-${paper}/ms.pdf`;

const apiKey = process.env.GEMINI_API_KEY || "";
if (!apiKey) {
  console.error("GEMINI_API_KEY not set");
  process.exit(1);
}

// ── Extract PDF text ──────────────────────────────────────────────
// pdftotext lives in Git Bash / mingw on Windows; fall back to full path if not on PATH
const PDFTOTEXT = process.platform === "win32"
  ? "C:\\Program Files\\Git\\mingw64\\bin\\pdftotext.exe"
  : "pdftotext";

function pdfText(path) {
  try {
    return execSync(`"${PDFTOTEXT}" -layout "${path}" -`, { maxBuffer: 10 * 1024 * 1024 }).toString();
  } catch (e) {
    console.error(`Failed to extract ${path}:`, e.message);
    process.exit(1);
  }
}

process.stderr.write(`Extracting PDFs for ${year} Paper ${paper}...\n`);
const qpText = pdfText(qpPath);
const msText = pdfText(msPath);

// ── Gemini call ───────────────────────────────────────────────────
const genai = new GoogleGenerativeAI(apiKey);

const responseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    questions: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          number: { type: SchemaType.STRING, description: 'e.g. "01.1", "03.4"' },
          marks: { type: SchemaType.NUMBER },
          pageNumber: { type: SchemaType.NUMBER, description: "QP page number (1-indexed)" },
          specPoints: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
            description: 'AQA 7402 spec IDs, e.g. ["3.1.3", "3.2.1"]',
          },
          msAnswer: {
            type: SchemaType.STRING,
            description: "Exact mark scheme answer, numbered points separated by \\n",
          },
          whyExplanation: {
            type: SchemaType.STRING,
            description: "Plain-English explanation of why the mark scheme answer is correct, what examiners look for, and how marks are awarded",
          },
          commonMistakes: {
            type: SchemaType.STRING,
            description: "Common student mistakes for this question (optional, omit if none notable)",
          },
        },
        required: ["number", "marks", "pageNumber", "specPoints", "msAnswer", "whyExplanation"],
      },
    },
  },
  required: ["questions"],
};

const model = genai.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema,
    temperature: 0.2,
  },
});

const prompt = `You are processing an AQA A-level Biology (7402) past paper.

QUESTION PAPER TEXT:
${qpText}

MARK SCHEME TEXT:
${msText}

Extract every sub-question (e.g. 01.1, 01.2, 02.1...) from the question paper and match it to its mark scheme answer.

STYLE GUIDE — match this exactly:

msAnswer: Copy the mark scheme verbatim. Number each marking point. Include accept/reject/ignore notes inline. Use OR on its own line for alternatives. Show worked calculations step by step.

whyExplanation: Terse, exam-coach voice. Lead with what the mark scheme is actually testing. Name both variables in relationships. Call out the exact words the mark scheme requires. Use arrows (→) for chains of reasoning. Short sentences or fragments. NO filler like "This question assesses..." or "Students need to demonstrate...".

commonMistakes: Specific wrong answers students write, not generic advice. Quote mark-scheme reject notes where relevant.

EXAMPLES (2024 Paper 1):

Q01.1 (3 marks, ester bond / condensation):
msAnswer: "1. Circle(s) drawn around an OH group of the glycerol and the OH group of the fatty acid (accept circle around the OH of one molecule and the H of an OH group of the other);\n2. Ester (bond);\n3. Condensation (reaction)."
whyExplanation: "Three marks, one each: (1) the circle, (2) the bond name, (3) the reaction name. The circle has to capture what's actually lost — a water molecule comes off, so you're looking for the OH from glycerol plus H from the fatty acid's –COOH (or the full –OH from one and H from the other). 'Ester' and 'condensation' are mark-scheme exact words; 'esterification' alone wouldn't pick up the bond mark."
commonMistakes: "Drawing a circle around the whole carboxyl group (–COOH) — too broad. Writing 'hydrolysis' (the reverse reaction) instead of condensation."

Q01.3 (1 mark, data relationship):
msAnswer: "As (number of C) double bonds increases, melting point decreases\nOR\nAs unsaturation increases, melting point decreases\nOR\nAs saturation increases, melting point increases."
whyExplanation: "Single mark, but you have to name BOTH variables (double bonds / saturation AND melting point) and describe the relationship. Converse statements score too."
commonMistakes: "Just saying 'higher unsaturation, lower melting point' without referring to the data in Table 1."

Q02.1 (3 marks, membrane transport):
msAnswer: "1. (Movement of) polar / charged molecules (accept ions, non-lipid soluble, named polar molecule e.g. glucose);\n2. (Facilitated diffusion) movement down a concentration gradient via carrier / channel protein;\n3. (Active transport) movement against a concentration gradient via carrier protein using ATP."
whyExplanation: "Three contrasts to make: what's being moved (point 1, applies to both), how facilitated diffusion works (point 2), how active transport works (point 3). For active transport you must say 'carrier protein' — channel proteins don't pump against gradients."
commonMistakes: "Saying 'against the gradient using a channel protein' — auto-reject. Forgetting ATP for active transport. Bringing ATP into facilitated diffusion (rejected)."

Q03.4 (2 marks, magnification calculation):
msAnswer: "Correct answer: 75 (μm).\n\nWorking:\n1. Mean diameter in mm: (4 + 2 + 5 + 1 + 2 + 3 + 5 + 2) ÷ 8 = 24 ÷ 8 = 3 mm.\n2. Real size = image size ÷ magnification = 3 ÷ 40 = 0.075 mm.\n3. Convert to μm: 0.075 × 1000 = 75 μm."
whyExplanation: "Magnification = image / real, so real = image / magnification. Image is in mm, so the result is in mm — convert to μm by ×1000. One mark is available for correct working alone (e.g. correct mean of 3 mm, correct ÷ 40, or 0.075 mm with wrong units)."
commonMistakes: "Forgetting to convert mm → μm (leaving 0.075 mm). Multiplying instead of dividing by magnification. Mean calculation slips."

Q04.4 (3 marks, osmosis):
msAnswer: "1. Molasses / solution has a lower water potential (or 'water in beaker has higher water potential');\n2. Water moves into the molasses across the partially / selectively permeable bladder;\n3. Increased (molasses) volume OR decreased air volume.\n\nAccept 'more negative' for 'lower'; accept Ψ symbol."
whyExplanation: "The molasses has dissolved solutes → lower water potential than the surrounding water. The bladder is partially permeable: water in, big sugar molecules can't out. Water moves in by osmosis, raising the molasses volume in the tube and compressing the air above it."
commonMistakes: "Saying water 'concentration' instead of water potential — explicit reject in the spec. Not stating which compartment changed volume (MP3 missed)."

Q05.3 (3 marks, statistics):
msAnswer: "1. There is a strong / significant negative correlation (between mitotic index and distance from root tip);\n2. Probability of this correlation occurring by chance is less than 0.05 / 5 % (or > 95 % probability it is not due to chance);\n3. (Therefore) reject the null hypothesis.\n\nMax 2 marks. Reject 'results are significant' — the correlation is significant, not the results."
whyExplanation: "r = –0.98 means strong, negative correlation. P < 0.05 is the threshold: less than 5 % chance of seeing this strong a correlation by random chance, so we reject the null. The examiner pin: 'P' must be linked to 'correlation occurring by chance', not to 'results' or 'differences'."
commonMistakes: "Comparing P and r values. Saying results are 'not due to chance' without mentioning the correlation. Forgetting 'strong' or 'significant'."

Q06.1 (3 marks, mRNA vs tRNA comparison):
msAnswer: "Any 3 comparative rows (must be comparisons, not isolated facts):\n\nmRNA → tRNA\n1. Has codon(s) → has anticodon;\n2. No hydrogen bonds / base pairs (within molecule) → has hydrogen bonds / base pairs (within molecule);\n3. No amino-acid binding site → has amino-acid binding site;\n4. Linear / straight / not folded → clover-leaf shape / folded;\n5. Long / many nucleotides → short / few nucleotides."
whyExplanation: "Both molecules are single-stranded RNA. The differences live in shape, base-pairing, and what they bind. The question requires direct comparisons in each row — a fact about one molecule alone scores nothing."
commonMistakes: "Saying 'mRNA is single-stranded, tRNA is double-stranded' — both are single-stranded. Listing features of each separately rather than comparing."

Q07.3 (3 marks, experimental design — enzyme):
msAnswer: "Mark in groups; any one complete group scores 3:\n\nGroup A — temperature toward optimum:\n1. Increase temperature toward enzyme's optimum;\n2. More kinetic energy / more active enzyme;\n3. More E-S complexes / increased rate.\n\nGroup B — pH toward optimum:\n1. Use optimum pH (or move toward it);\n2. Less denaturation / more active enzyme;\n3. More E-S complexes / increased rate.\n\nGroup C — surface area:\n1. Crush / grind / dice / homogenise / slice the apple;\n2. More PPO / phenol in contact with oxygen;\n3. More E-S complexes / increased rate."
whyExplanation: "The question wants a change AND its mechanism. Pick one approach and complete the chain: change → molecular effect → rate consequence. Mixing points across groups doesn't score."
commonMistakes: "Saying 'increase temperature' without 'toward optimum' — the method already uses 30 °C. Claiming temperature 'lowers activation energy' — it doesn't. Mixing groups."

Q08.3 (3 marks, calculation with error identification):
msAnswer: "Correct percentage change: −35 % (accept −35.1, −35.3, −35.7, −36).\n\nWorking:\n• Diseased SV = 100 × 0.45 = 45 cm³.\n• Healthy SV = 120 × 0.58 = 69.6 cm³.\n• % change = (45 − 69.6) ÷ 69.6 × 100 = −35.3 %.\n\nMathematical error in the student's answer: they used the diseased BVB (100) as the denominator instead of the healthy stroke volume (69.6).\n\nPartial credit (1 mark) for any correct intermediate value: 45, 69.6, 24.6, 48.6."
whyExplanation: "Percentage change = (new − original) ÷ original × 100. 'Original' is the healthy value (the reference). Using BVB (100) instead of healthy SV (69.6) is the conceptual slip — the maths is otherwise fine."
commonMistakes: "Wrong denominator (using diseased SV or BVB). Computing 120 × 0.58 as 69.9 instead of 69.6."

Q09.3 (4 marks, data synthesis / ecology):
msAnswer: "Effect: less mating / breeding OR fewer offspring (MP1).\n\nExplanation (max 3 from):\n2. Fewer advertisement calls (94 % vs 97 %) → females not attracted / males not located;\n3. Fewer mating calls because males less sexually active (due to EE2);\n4. More rasping calls (4 % vs 0.5 %) because more males are not sexually active;\n5. Less time spent in courtship (8 s vs 16 s median) → less mating."
whyExplanation: "EE2 mimics oestrogen and disrupts male sexual activity. Each line of evidence (call type frequencies, courtship time) ties to a specific behaviour outcome. Marks reward linking data → behaviour → reproductive consequence — a trend description alone isn't enough."
commonMistakes: "Quoting data without linking to a named courtship behaviour. Misreading Table 7 ('time spent' ≠ 'number of females'). Using only one of the two tables."

Q10.1 (6 marks, cell fractionation):
msAnswer: "1. Homogenise tissue to break open cells / release organelles;\n2. Filter to remove intact cells / tissue / debris;\n3. Cold solution — to prevent / slow enzyme activity (which would damage organelles);\n4. Solution with equivalent water potential (isotonic) — to prevent osmosis and organelles bursting / shrinking;\n5. Buffered solution — to prevent pH change and stop enzymes / proteins denaturing;\n6. Centrifuge at low speed (up to 1000 rpm / × g) so nuclei pellet at the bottom; discard supernatant.\n\nReject: 'homogenise the cell walls' (animal tissue has no cell walls); 'damage to cells' for isotonic (should say organelles)."
whyExplanation: "Three stages: homogenise, prepare medium, centrifuge. The medium has three jobs and three reasons — cold for enzymes, isotonic for osmosis, buffered for pH. Then differential centrifugation: nuclei are biggest and densest, so they pellet at LOW speed. Higher speeds bring down smaller organelles successively."
commonMistakes: "Cell walls in muscle (animal) tissue. Saying isotonic protects 'cells' instead of organelles. Describing increasing spin speed to get nuclei — they pellet at low speed."

Q10.3 (4 marks, ATP structure and reactions):
msAnswer: "1. ATP structure: ribose (pentose sugar) + adenine + 3 phosphate groups (accept adenosine + 3 phosphates; reject if both ribose AND adenosine are mentioned together);\n2. ATP → ADP + Pᵢ, catalysed by ATP hydrolase (ATPase) — hydrolysis;\n3. ADP + Pᵢ → ATP, catalysed by ATP synthase;\n4. ADP + Pᵢ → ATP is a condensation reaction."
whyExplanation: "ATP = adenosine + 3 phosphates. The two enzymes are different: ATPase hydrolyses (releases energy); ATP synthase condenses (costs energy from respiration / photosynthesis). Four marks across structure + two reactions + reaction types."
commonMistakes: "Saying both 'adenosine' and 'ribose' — adenosine already includes ribose, so the mark scheme rejects it. Wrong bond names (glycosidic, hydrogen). Confusing hydrolysis and condensation."

Now extract ALL sub-questions from the paper above using exactly this style. Be thorough and accurate. Include ALL sub-questions.`;

process.stderr.write("Calling Gemini API...\n");

async function generateWithRetry(model, prompt, maxRetries = 5) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await model.generateContent(prompt);
    } catch (e) {
      const is503 = e.message && e.message.includes("503");
      if (is503 && attempt < maxRetries) {
        const wait = Math.min(10000 * attempt, 60000);
        process.stderr.write(`503 overloaded (attempt ${attempt}/${maxRetries}), retrying in ${wait / 1000}s...\n`);
        await new Promise(r => setTimeout(r, wait));
      } else {
        throw e;
      }
    }
  }
}

let result;
try {
  result = await generateWithRetry(model, prompt);
} catch (e) {
  console.error("Gemini API error:", e.message);
  process.exit(1);
}

const raw = result.response.text();
let data;
try {
  data = JSON.parse(raw);
} catch (e) {
  console.error("Failed to parse Gemini response:", e.message);
  console.error("Raw:", raw.slice(0, 500));
  process.exit(1);
}

process.stderr.write(`Got ${data.questions.length} questions.\n`);

// ── Generate TypeScript ───────────────────────────────────────────
function escape(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\${/g, "\\${");
}

// Strip any trailing text label from spec IDs, e.g. "3.2.4 Cell recognition..." → "3.2.4"
function cleanSpecId(s) {
  return s.replace(/^(\d+(?:\.\d+)*).*$/, "$1");
}

const varName = `P${paper}_${year}`;

let out = `// ── Generated: biology ${year} paper ${paper} ──\n`;
out += `// Run: GEMINI_API_KEY=... node scripts/populate-paper.mjs ${year} ${paper}\n\n`;
out += `const ${varName} = paperId("biology", ${year}, ${paper});\n\n`;

// Questions array
out += `// Questions\n`;
out += `const QUESTIONS_${year}_P${paper}: Question[] = [\n`;
for (const q of data.questions) {
  const specStr = q.specPoints.map(s => `"${cleanSpecId(s)}"`).join(", ");
  out += `  { id: questionId(${varName}, "${q.number}"), paperId: ${varName}, number: "${q.number}", marks: ${q.marks}, pageNumber: ${q.pageNumber}, specPoints: [${specStr}] },\n`;
}
out += `];\n\n`;

// Breakdowns array
out += `// Breakdowns\n`;
out += `const BREAKDOWNS_${year}_P${paper}: Breakdown[] = [\n`;
for (const q of data.questions) {
  const specStr = q.specPoints.map(s => `"${cleanSpecId(s)}"`).join(", ");
  out += `  {\n`;
  out += `    questionId: questionId(${varName}, "${q.number}"),\n`;
  out += `    msAnswer: \`${escape(q.msAnswer)}\`,\n`;
  out += `    whyExplanation: \`${escape(q.whyExplanation)}\`,\n`;
  out += `    specLinks: [${specStr}],\n`;
  if (q.commonMistakes) {
    out += `    commonMistakes: \`${escape(q.commonMistakes)}\`,\n`;
  }
  out += `  },\n`;
}
out += `];\n\n`;

out += `// Add these to PLACEHOLDER_QUESTIONS and PLACEHOLDER_BREAKDOWNS in lib/data.ts\n`;
out += `// Or wire them into getQuestionsForPaper / getBreakdown directly.\n`;

const outPath = `scripts/out/${year}-p${paper}.ts`;
mkdirSync("scripts/out", { recursive: true });
writeFileSync(outPath, out, "utf8");
process.stderr.write(`Written to ${outPath}\n`);
