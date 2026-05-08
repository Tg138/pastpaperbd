/**
 * populate-spec.mjs
 *
 * Usage:
 *   GEMINI_API_KEY=<key> node scripts/populate-spec.mjs
 *
 * Reads public/spec/biology.pdf and outputs TypeScript SpecPoint entries
 * for the 18 missing sections. Paste the output into PLACEHOLDER_SPEC in lib/data.ts.
 *
 * Output written to scripts/out/spec-missing.ts
 */

import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
if (!apiKey) {
  console.error("GEMINI_API_KEY not set");
  process.exit(1);
}

const PDFTOTEXT = process.platform === "win32"
  ? "C:/Program Files/Git/mingw64/bin/pdftotext.exe"
  : "pdftotext";

function pdfText(filePath) {
  try {
    return execSync(`"${PDFTOTEXT}" -layout "${filePath}" -`, {
      maxBuffer: 10 * 1024 * 1024,
      shell: true,
    }).toString();
  } catch (e) {
    console.error(`Failed to extract ${filePath}:`, e.message);
    process.exit(1);
  }
}

const MISSING_IDS = [
  "3.1.7", "3.1.8",
  "3.2.4",
  "3.4.2", "3.4.3", "3.4.4", "3.4.7",
  "3.5.1", "3.5.2", "3.5.4",
  "3.6.1", "3.6.2", "3.6.3",
  "3.7.1", "3.7.3",
  "3.8.1", "3.8.3", "3.8.4.1",
];

process.stderr.write("Extracting spec PDF...\n");
const specText = pdfText("public/spec/biology.pdf");

const genai = new GoogleGenerativeAI(apiKey);

const responseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    specPoints: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          id: { type: SchemaType.STRING, description: 'e.g. "3.6.1"' },
          title: { type: SchemaType.STRING, description: "Short 3-7 word title for this spec section" },
          topic: { type: SchemaType.STRING, description: 'Topic group name, e.g. "Nervous system and muscles"' },
          description: { type: SchemaType.STRING, description: "Concise spec-accurate description of what students must know. 2-5 sentences. Exact terminology." },
          breakdown: { type: SchemaType.STRING, description: "Exam-coach plain-English note. Terse. What examiners actually test. Key mark-scheme traps. Arrows for chains. Fragments OK." },
          pageNumber: { type: SchemaType.NUMBER, description: "Page number in the spec PDF where this section appears" },
        },
        required: ["id", "title", "topic", "description", "breakdown", "pageNumber"],
      },
    },
  },
  required: ["specPoints"],
};

const model = genai.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema,
    temperature: 0.2,
  },
});

const prompt = `You are processing the AQA A-level Biology specification (7402).

SPEC PDF TEXT:
${specText}

Extract ONLY these spec section IDs (they may span multiple sub-sections — capture all essential content):
${MISSING_IDS.join(", ")}

STYLE GUIDE — match these existing entries EXACTLY in tone and structure:

{
  id: "3.1.1",
  title: "Monomers and polymers",
  topic: "Biological molecules",
  description: "Monomers are the smaller units from which larger molecules are made. Polymers are molecules made from a large number of monomers joined together. Condensation joins two molecules and releases water; hydrolysis breaks them apart using water.",
  breakdown: "Glucose → starch is the canonical monomer→polymer example. Condensation = build (lose water). Hydrolysis = break (add water). Same bond, two directions.",
  pageNumber: 12,
}

{
  id: "3.2.1.3",
  title: "Cell fractionation and ultracentrifugation",
  topic: "Cells",
  description: "Cell fractionation isolates organelles. Tissue is homogenised in a cold, isotonic, buffered solution. Cold: reduces enzyme activity. Isotonic: prevents osmotic damage to organelles. Buffered: maintains pH to prevent protein denaturation. The homogenate is filtered to remove debris, then centrifuged at successively higher speeds. Nuclei (largest/densest) pellet first at low speed; mitochondria next; ribosomes last at very high speed.",
  breakdown: "Three things the solution must be — cold, isotonic, buffered — each for a specific molecular reason. After homogenising, biggest organelles fall out first under low spin. Increasing the spin speed step by step lets you collect successively smaller organelles.",
  pageNumber: 22,
}

{
  id: "3.3.4",
  title: "Mass transport in animals — heart, blood vessels and the cardiac cycle",
  topic: "Exchange and transport",
  description: "Arteries carry blood away from the heart at high pressure. The aorta wall contains smooth muscle (resists high pressure), elastic tissue (stretches and recoils to smooth blood pressure), smooth endothelium (reduces friction) and protein/collagen fibres (prevent wall splitting). Cardiac output = heart rate × stroke volume. Stroke volume can be expressed as blood volume in ventricle (BVB) × ejection fraction.",
  breakdown: "Each layer of an artery has a specific job — match structure to function for marks. Elastic tissue 'recoils', it doesn't 'contract'. Stroke volume only counts the blood actually pumped out (BVB × ejection fraction), not everything in the chamber.",
  pageNumber: 29,
}

RULES:
- description: spec-accurate, exact terminology, 2-5 sentences. Not a textbook — dense and direct.
- breakdown: exam-coach voice. Lead with what the mark scheme actually tests. Key words the examiner requires. Common reject terms. Arrows (→) for chains. Short fragments OK. NO filler like "Students need to understand..." or "This section covers...".
- topic: use the exact AQA topic group name from the spec (e.g. "Nervous coordination", "Genetic information, variation and relationships").
- pageNumber: actual page in the spec PDF.
- Cover ALL ${MISSING_IDS.length} IDs. Do not skip any.`;

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

process.stderr.write(`Got ${data.specPoints.length} spec points.\n`);

function escape(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\${/g, "\\${");
}

let out = `// ── Generated missing spec points ──\n`;
out += `// Run: GEMINI_API_KEY=... node scripts/populate-spec.mjs\n`;
out += `// Paste these into PLACEHOLDER_SPEC in lib/data.ts\n\n`;

for (const sp of data.specPoints) {
  out += `  {\n`;
  out += `    id: "${sp.id}",\n`;
  out += `    title: "${sp.title.replace(/"/g, '\\"')}",\n`;
  out += `    topic: "${sp.topic.replace(/"/g, '\\"')}",\n`;
  out += `    description:\n      \`${escape(sp.description)}\`,\n`;
  out += `    breakdown:\n      \`${escape(sp.breakdown)}\`,\n`;
  if (sp.pageNumber) out += `    pageNumber: ${sp.pageNumber},\n`;
  out += `  },\n`;
}

mkdirSync("scripts/out", { recursive: true });
const outPath = "scripts/out/spec-missing.ts";
writeFileSync(outPath, out, "utf8");
process.stderr.write(`Written to ${outPath}\n`);
