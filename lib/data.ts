import type {
  Breakdown,
  Paper,
  PaperNumber,
  Question,
  SpecPoint,
  Subject,
  SubjectSlug,
  Year,
} from "./types";
import { paperId, questionId } from "./types";

export const SUBJECTS: Subject[] = [
  { slug: "biology", name: "Biology", code: "7402" },
];

export const YEARS: Year[] = [2024, 2023, 2022];
export const PAPER_NUMBERS: PaperNumber[] = [1, 2, 3];

export function getSubject(slug: string): Subject | undefined {
  return SUBJECTS.find((s) => s.slug === slug);
}

export function getPaper(subject: SubjectSlug, year: Year, paperNumber: PaperNumber): Paper {
  return {
    subject,
    year,
    paperNumber,
    qpPath: `/papers/${subject}/${year}/paper-${paperNumber}/qp.pdf`,
    msPath: `/papers/${subject}/${year}/paper-${paperNumber}/ms.pdf`,
    erPath: `/papers/${subject}/${year}/paper-${paperNumber}/er.pdf`,
  };
}

const P1 = paperId("biology", 2024, 1);

// ─────────────────────────────────────────────────────────────────
// Spec points (AQA 7402)

const PLACEHOLDER_SPEC: SpecPoint[] = [
  // ── 3.1 Biological molecules ──
  {
    id: "3.1.1",
    title: "Monomers and polymers",
    topic: "Biological molecules",
    description:
      "Monomers are the smaller units from which larger molecules are made. Polymers are molecules made from a large number of monomers joined together. Condensation joins two molecules and releases water; hydrolysis breaks them apart using water.",
    breakdown:
      "Glucose → starch is the canonical monomer→polymer example. Condensation = build (lose water). Hydrolysis = break (add water). Same bond, two directions.",
    pageNumber: 12,
  },
  {
    id: "3.1.2",
    title: "Carbohydrates — monosaccharides and disaccharides",
    topic: "Biological molecules",
    description:
      "Monosaccharides are the monomers of carbohydrates. Glucose, galactose and fructose are common monosaccharides. Disaccharides form by condensation: maltose (α-glucose + α-glucose), sucrose (glucose + fructose), lactose (glucose + galactose). Glucose and fructose are reducing sugars; sucrose is non-reducing. The Benedict's test detects reducing sugars: heat with Benedict's reagent — a positive result is a colour change from blue through green/yellow/orange to a brick-red precipitate.",
    breakdown:
      "α-glucose builds starch and glycogen (storage). β-glucose builds cellulose (structure). Branching = quick energy access (glycogen). Reducing vs non-reducing matters for the Benedict's test — sucrose has to be hydrolysed first.",
    pageNumber: 13,
  },
  {
    id: "3.1.3",
    title: "Lipids — triglycerides and phospholipids",
    topic: "Biological molecules",
    description:
      "Triglycerides are formed by the condensation of one molecule of glycerol and three molecules of fatty acid. A condensation reaction between glycerol and a fatty acid forms an ester bond. Phospholipids have one fatty acid replaced by a phosphate group.",
    breakdown:
      "Triglycerides = 1 glycerol + 3 fatty acids, joined by ester bonds via condensation (releasing water). Saturated fatty acids have no C=C double bonds; unsaturated have at least one. More double bonds → lower melting point → more fluid.",
    pageNumber: 14,
  },
  {
    id: "3.1.4",
    title: "Proteins",
    topic: "Biological molecules",
    description:
      "Amino acids are the monomers from which proteins are made. The general structure: a central carbon, an amino group, a carboxyl group and an R-group. Peptide bonds link amino acids in condensation reactions. Primary, secondary, tertiary and quaternary structure.",
    breakdown:
      "Primary = sequence. Secondary = α-helix or β-pleated sheet (hydrogen bonds). Tertiary = 3D fold (ionic, hydrogen, disulfide bridges, hydrophobic). Quaternary = multiple polypeptide chains. Enzyme active sites depend on tertiary structure — denature it and the enzyme stops working.",
    pageNumber: 15,
  },
  {
    id: "3.1.4.2",
    title: "Enzymes and enzyme activity",
    topic: "Biological molecules",
    description:
      "Enzymes are biological catalysts. The rate of an enzyme-catalysed reaction depends on substrate concentration, enzyme concentration, temperature, and pH. Increasing temperature provides more kinetic energy, increasing collision frequency between enzyme and substrate. Exceeding the optimum temperature causes denaturation, reducing active-site complementarity.",
    breakdown:
      "More E-S complexes = faster reaction. Three levers in exam questions: temperature (kinetic energy or denaturation), pH (denaturation), and surface area / substrate concentration. Reject 'enzymes lower activation energy by adding heat' — they lower it via the active site.",
    pageNumber: 16,
  },
  {
    id: "3.1.5",
    title: "Nucleic acids — DNA and RNA",
    topic: "Biological molecules",
    description:
      "DNA and RNA are polymers of nucleotides. Each nucleotide has a pentose, a phosphate group and a nitrogenous base. DNA is a double helix, antiparallel, with complementary base pairing (A-T, C-G). mRNA is linear and carries codons; tRNA is clover-leaf shaped and carries anticodons and an amino acid binding site.",
    breakdown:
      "DNA is the long-term store; RNA is the working copy. Three RNA flavours: mRNA (the message), tRNA (the adapter), rRNA (in the ribosome). Substitution mutations may be silent because the genetic code is degenerate.",
    pageNumber: 18,
  },
  {
    id: "3.1.6",
    title: "ATP — structure and synthesis",
    topic: "Biological molecules",
    description:
      "ATP (adenosine triphosphate) is composed of adenine (a nitrogenous base), ribose (a pentose sugar), and three phosphate groups. ATP hydrolase (ATPase) catalyses hydrolysis: ATP + H₂O → ADP + Pᵢ, releasing energy. ATP synthase catalyses the condensation reaction: ADP + Pᵢ → ATP, using energy from respiration or photosynthesis.",
    breakdown:
      "ATP is the cell's pocket money — small, fast-spending. Hydrolysis releases the energy; synthesis costs it. The two reactions use different enzymes: ATPase (hydrolyse) vs ATP synthase (condense). Don't say 'glycosidic bond' — phosphate–phosphate bonds aren't glycosidic.",
    pageNumber: 20,
  },

  // ── 3.2 Cells ──
  {
    id: "3.2.1.1",
    title: "Eukaryotic cell structure — role of organelles in protein secretion",
    topic: "Cells",
    description:
      "Secretory proteins follow the pathway: nucleus (DNA codes for the protein) → ribosomes on rough endoplasmic reticulum (translation) → rough ER (transport / modification) → Golgi apparatus (further modification, packaging into vesicles) → vesicles move to and fuse with the cell-surface membrane (exocytosis). Mitochondria provide ATP for the process.",
    breakdown:
      "Each organelle has one job in the secretory pathway. Mark scheme reject: 'mitochondria produce energy' — energy is released from ATP, mitochondria produce ATP. Vesicles must specifically reach the cell-surface membrane, not 'where they're needed'.",
    pageNumber: 21,
  },
  {
    id: "3.2.1.2",
    title: "Methods of studying cells",
    topic: "Cells",
    description:
      "Magnification is the size of the image divided by the size of the real object. Resolution is the minimum distance apart that two objects can be in order to appear as separate items. Specimens for light microscopes are cut into thin slices so light can pass through.",
    breakdown:
      "Thin slices = single layer of cells = light can pass through cleanly = clear image. The magnification triangle: image = magnification × actual. Watch units — convert mm to μm by ×1000.",
    pageNumber: 22,
  },
  {
    id: "3.2.1.3",
    title: "Cell fractionation and ultracentrifugation",
    topic: "Cells",
    description:
      "Cell fractionation isolates organelles. Tissue is homogenised in a cold, isotonic, buffered solution. Cold: reduces enzyme activity. Isotonic: prevents osmotic damage to organelles. Buffered: maintains pH to prevent protein denaturation. The homogenate is filtered to remove debris, then centrifuged at successively higher speeds. Nuclei (largest/densest) pellet first at low speed; mitochondria next; ribosomes last at very high speed.",
    breakdown:
      "Three things the solution must be — cold, isotonic, buffered — each for a specific molecular reason. After homogenising, biggest organelles fall out first under low spin. Increasing the spin speed step by step lets you collect successively smaller organelles.",
    pageNumber: 22,
  },
  {
    id: "3.2.2",
    title: "All cells arise from other cells — mitosis",
    topic: "Cells",
    description:
      "Mitosis produces two genetically identical daughter cells. The stages are interphase, prophase, metaphase, anaphase and telophase. In prophase, chromosomes condense and become visible; spindle fibres form and attach to centromeres. In anaphase, centromeres split and chromatids are pulled to opposite poles. The mitotic index = number of cells in mitosis ÷ total number of cells observed.",
    breakdown:
      "Mitosis = identical copies (growth, repair). Don't confuse with meiosis (gametes, halving, crossing over). Anaphase always splits centromeres. Mitotic index is a proportion (0–1), not a percentage — don't multiply by 100 unless the question asks for one.",
    pageNumber: 23,
  },
  {
    id: "3.2.3",
    title: "Transport across cell membranes",
    topic: "Cells",
    description:
      "Movement across membranes occurs by simple diffusion, facilitated diffusion (down a gradient via channel/carrier proteins), osmosis (water down a water-potential gradient), active transport (against a gradient using ATP and carrier proteins), and co-transport. Osmosis: water moves from higher water potential (Ψ) to lower water potential across a partially permeable membrane. Pure water Ψ = 0; solutes lower (make more negative) Ψ.",
    breakdown:
      "Three big distinctions: (1) Down or against the gradient? (2) Needs a protein? (3) Needs ATP? Facilitated diffusion is down + protein + no ATP. Active transport is against + protein + ATP. Reject 'channel protein' for active transport — must be carrier. For osmosis, always say 'water potential', never 'water concentration'.",
    pageNumber: 24,
  },

  // ── 3.3 Organisms exchange substances with their environment ──
  {
    id: "3.3.1",
    title: "Surface area to volume ratio",
    topic: "Exchange and transport",
    description:
      "As organisms get larger, their surface area to volume ratio decreases. Larger organisms need specialised exchange surfaces. Adaptations include large surface area, thin membranes, good blood supply, and ventilation/water flow to maintain gradients.",
    breakdown:
      "Tiny organism (single cell) — diffusion across the whole surface works. As size increases, the inside is too far from the outside for diffusion alone. Hence lungs, gills, leaves.",
    pageNumber: 27,
  },
  {
    id: "3.3.2",
    title: "Gas exchange — ventilation and the alveoli",
    topic: "Exchange and transport",
    description:
      "The ventilation system consists of the trachea, bronchi, bronchioles and alveoli. Gas exchange occurs across the alveolar epithelium. Inspiration: diaphragm contracts (flattens), external intercostals contract pulling the ribs up and out, thoracic volume increases, pressure decreases, air flows in. Expiration is largely passive.",
    breakdown:
      "'How we breathe in' wants a process, not just 'air goes in'. Three marks for three stages: diaphragm contracting + intercostals + volume up / pressure down. The bronchiole has no cartilage rings (distinguishes it from bronchi/trachea) and contains smooth muscle.",
    pageNumber: 28,
  },
  {
    id: "3.3.3",
    title: "Digestion and absorption",
    topic: "Exchange and transport",
    description:
      "Lipids are broken down by lipase to monoglycerides and fatty acids. Bile salts emulsify lipids and form micelles which carry the products to the epithelium. Microvilli increase the surface area of the ileum epithelium.",
    breakdown:
      "Micelles aren't absorbed themselves — they shuttle fatty acids/monoglycerides/fat-soluble vitamins to the cell membrane and break down there, releasing their contents to diffuse in. Microvilli = folded membrane = bigger surface area = more absorption.",
    pageNumber: 29,
  },
  {
    id: "3.3.4",
    title: "Mass transport in animals — heart, blood vessels and the cardiac cycle",
    topic: "Exchange and transport",
    description:
      "Arteries carry blood away from the heart at high pressure. The aorta wall contains smooth muscle (resists high pressure), elastic tissue (stretches and recoils to smooth blood pressure), smooth endothelium (reduces friction) and protein/collagen fibres (prevent wall splitting). Cardiac output = heart rate × stroke volume. Stroke volume can be expressed as blood volume in ventricle (BVB) × ejection fraction.",
    breakdown:
      "Each layer of an artery has a specific job — match structure to function for marks. Elastic tissue 'recoils', it doesn't 'contract'. Stroke volume only counts the blood actually pumped out (BVB × ejection fraction), not everything in the chamber.",
    pageNumber: 29,
  },

  // ── 3.4 Genetic information, variation and relationships between organisms ──
  {
    id: "3.4.1",
    title: "DNA, genes and chromosomes — the genetic code",
    topic: "Genetic information & variation",
    description:
      "DNA carries the genetic code in triplets (codons). Each codon on mRNA specifies one amino acid. mRNA is linear/straight and carries codons; tRNA is clover-leaf shaped and carries anticodons and an amino acid binding site. A substitution mutation changes one base, which may or may not alter the amino acid coded (degenerate genetic code). If the same amino acid is still coded, primary and tertiary structure — and therefore active site shape — are unchanged.",
    breakdown:
      "Substitution + degenerate code = often a silent mutation. Same amino acid → same primary structure → same fold → same enzyme. Always check the codon table before assuming a mutation breaks something. Watch which strand the mark scheme wants — DNA template is complementary to mRNA.",
  },

  // ── 3.5 Energy transfers ──
  {
    id: "3.5.3",
    title: "Animal behaviour — courtship and reproduction",
    topic: "Energy transfers",
    description:
      "Courtship behaviour precedes mating and ensures reproductive success. It includes species-recognition signals, assessment of mate quality, and synchronisation of reproductive states. Reduction in courtship reduces offspring number. In Xenopus laevis, advertisement calls attract females, mating calls start/continue mating, and rasping calls signal sexual inactivity.",
    breakdown:
      "Courtship is data — you must link a numerical change to a specific behaviour outcome (attraction, mating, etc.) to score. 'Fewer courtship signals → fewer mates → fewer offspring' is the chain of reasoning examiners look for.",
  },
];

// ─────────────────────────────────────────────────────────────────
// Questions — 2024 Paper 1 (Q01.1 → Q10.3, real, extracted from qp.pdf)

const PLACEHOLDER_QUESTIONS: Question[] = [
  // ── Q01: Triglycerides and membrane fluidity ──
  { id: questionId(P1, "01.1"), paperId: P1, number: "01.1", marks: 3, pageNumber: 2, specPoints: ["3.1.3"] },
  { id: questionId(P1, "01.2"), paperId: P1, number: "01.2", marks: 1, pageNumber: 3, specPoints: ["3.1.3"] },
  { id: questionId(P1, "01.3"), paperId: P1, number: "01.3", marks: 1, pageNumber: 3, specPoints: ["3.1.3"] },
  { id: questionId(P1, "01.4"), paperId: P1, number: "01.4", marks: 3, pageNumber: 4, specPoints: ["3.1.3", "3.2.3"] },

  // ── Q02: Transport / microvilli / vitamin A ──
  { id: questionId(P1, "02.1"), paperId: P1, number: "02.1", marks: 3, pageNumber: 5, specPoints: ["3.2.3"] },
  { id: questionId(P1, "02.2"), paperId: P1, number: "02.2", marks: 1, pageNumber: 5, specPoints: ["3.3.3"] },
  { id: questionId(P1, "02.3"), paperId: P1, number: "02.3", marks: 3, pageNumber: 6, specPoints: ["3.3.3"] },

  // ── Q03: Breathing, microscopy of alveoli ──
  { id: questionId(P1, "03.1"), paperId: P1, number: "03.1", marks: 3, pageNumber: 8, specPoints: ["3.3.2"] },
  { id: questionId(P1, "03.2"), paperId: P1, number: "03.2", marks: 2, pageNumber: 8, specPoints: ["3.2.1.2"] },
  { id: questionId(P1, "03.3"), paperId: P1, number: "03.3", marks: 1, pageNumber: 9, specPoints: ["3.3.2"] },
  { id: questionId(P1, "03.4"), paperId: P1, number: "03.4", marks: 2, pageNumber: 9, specPoints: ["3.2.1.2"] },
  { id: questionId(P1, "03.5"), paperId: P1, number: "03.5", marks: 2, pageNumber: 10, specPoints: ["3.2.1.2"] },

  // ── Q04: Carbohydrates / Benedict's / osmosis ──
  { id: questionId(P1, "04.1"), paperId: P1, number: "04.1", marks: 1, pageNumber: 11, specPoints: ["3.1.2"] },
  { id: questionId(P1, "04.2"), paperId: P1, number: "04.2", marks: 3, pageNumber: 11, specPoints: ["3.1.2"] },
  { id: questionId(P1, "04.3"), paperId: P1, number: "04.3", marks: 1, pageNumber: 11, specPoints: ["3.1.2"] },
  { id: questionId(P1, "04.4"), paperId: P1, number: "04.4", marks: 3, pageNumber: 12, specPoints: ["3.2.3"] },
  { id: questionId(P1, "04.5"), paperId: P1, number: "04.5", marks: 2, pageNumber: 13, specPoints: ["3.2.3"] },

  // ── Q05: Mitosis ──
  { id: questionId(P1, "05.1"), paperId: P1, number: "05.1", marks: 4, pageNumber: 14, specPoints: ["3.2.2"] },
  { id: questionId(P1, "05.2"), paperId: P1, number: "05.2", marks: 1, pageNumber: 14, specPoints: ["3.2.2"] },
  { id: questionId(P1, "05.3"), paperId: P1, number: "05.3", marks: 2, pageNumber: 15, specPoints: ["3.2.2"] },
  { id: questionId(P1, "05.4"), paperId: P1, number: "05.4", marks: 3, pageNumber: 15, specPoints: ["3.2.2"] },

  // ── Q06: Genetic code, codons, mutation ──
  { id: questionId(P1, "06.1"), paperId: P1, number: "06.1", marks: 3, pageNumber: 16, specPoints: ["3.4.1"] },
  { id: questionId(P1, "06.2"), paperId: P1, number: "06.2", marks: 1, pageNumber: 16, specPoints: ["3.4.1"] },
  { id: questionId(P1, "06.3"), paperId: P1, number: "06.3", marks: 4, pageNumber: 17, specPoints: ["3.4.1"] },

  // ── Q07: Enzymes / PPO ──
  { id: questionId(P1, "07.1"), paperId: P1, number: "07.1", marks: 3, pageNumber: 18, specPoints: ["3.1.4.2"] },
  { id: questionId(P1, "07.2"), paperId: P1, number: "07.2", marks: 2, pageNumber: 19, specPoints: ["3.1.4.2"] },
  { id: questionId(P1, "07.3"), paperId: P1, number: "07.3", marks: 3, pageNumber: 20, specPoints: ["3.1.4.2"] },
  { id: questionId(P1, "07.4"), paperId: P1, number: "07.4", marks: 1, pageNumber: 20, specPoints: ["3.1.4.2"] },

  // ── Q08: Aorta / cardiac output ──
  { id: questionId(P1, "08.1"), paperId: P1, number: "08.1", marks: 2, pageNumber: 21, specPoints: ["3.3.4"] },
  { id: questionId(P1, "08.2"), paperId: P1, number: "08.2", marks: 3, pageNumber: 22, specPoints: ["3.3.4"] },
  { id: questionId(P1, "08.3"), paperId: P1, number: "08.3", marks: 3, pageNumber: 23, specPoints: ["3.3.4"] },

  // ── Q09: Xenopus courtship calls ──
  { id: questionId(P1, "09.1"), paperId: P1, number: "09.1", marks: 1, pageNumber: 24, specPoints: ["3.5.3"] },
  { id: questionId(P1, "09.2"), paperId: P1, number: "09.2", marks: 1, pageNumber: 25, specPoints: ["3.5.3"] },
  { id: questionId(P1, "09.3"), paperId: P1, number: "09.3", marks: 4, pageNumber: 25, specPoints: ["3.5.3"] },

  // ── Q10: Cell fractionation, secretion, ATP ──
  { id: questionId(P1, "10.1"), paperId: P1, number: "10.1", marks: 6, pageNumber: 26, specPoints: ["3.2.1.3"] },
  { id: questionId(P1, "10.2"), paperId: P1, number: "10.2", marks: 5, pageNumber: 27, specPoints: ["3.2.1.1"] },
  { id: questionId(P1, "10.3"), paperId: P1, number: "10.3", marks: 4, pageNumber: 28, specPoints: ["3.1.6"] },
];

// ─────────────────────────────────────────────────────────────────
// Breakdowns — real mark scheme answers + plain-English walkthroughs

const PLACEHOLDER_BREAKDOWNS: Breakdown[] = [
  // ── Q01 ──
  {
    questionId: questionId(P1, "01.1"),
    msAnswer:
      "1. Circle(s) drawn around an OH group of the glycerol and the OH group of the fatty acid (accept circle around the OH of one molecule and the H of an OH group of the other);\n2. Ester (bond);\n3. Condensation (reaction).",
    whyExplanation:
      "Three marks, one each: (1) the circle, (2) the bond name, (3) the reaction name. The circle has to capture what's actually lost — a water molecule comes off, so you're looking for the OH from glycerol plus H from the fatty acid's –COOH (or the full –OH from one and H from the other). 'Ester' and 'condensation' are mark-scheme exact words; 'esterification' alone wouldn't pick up the bond mark.",
    specLinks: ["3.1.3"],
    commonMistakes:
      "Drawing a circle around the whole carboxyl group (–COOH) — too broad. Writing 'hydrolysis' (the reverse reaction) instead of condensation.",
  },
  {
    questionId: questionId(P1, "01.2"),
    msAnswer: "Stearic (acid).",
    whyExplanation:
      "One mark for identifying which fatty acid in Table 1 has no C=C double bonds — that's the saturated one. Saturated = filled to capacity with hydrogen, no double bonds between carbons.",
    specLinks: ["3.1.3"],
  },
  {
    questionId: questionId(P1, "01.3"),
    msAnswer:
      "As (number of C) double bonds increases, melting point decreases\nOR\nAs unsaturation increases, melting point decreases\nOR\nAs saturation increases, melting point increases.",
    whyExplanation:
      "Single mark, but you have to name BOTH variables (double bonds / saturation AND melting point) and describe the relationship. Converse statements score too.",
    specLinks: ["3.1.3"],
    commonMistakes: "Just saying 'higher unsaturation, lower melting point' without referring to the data in Table 1.",
  },
  {
    questionId: questionId(P1, "01.4"),
    msAnswer:
      "1. More unsaturated fatty acids increases fluidity (in cell-surface membrane);\n2. (Making cell-surface) membrane more fluid / flexible;\n3. Easy to engulf (accept endocytosis for engulf, or 'easier for phagosomes to form').",
    whyExplanation:
      "Three-mark suggest-and-explain: link the data (more unsaturated lipids in the membrane) → consequence (more fluid/flexible membrane) → outcome (easier to engulf prey, more phagocytosis).",
    specLinks: ["3.1.3", "3.2.3"],
    commonMistakes:
      "Stopping at 'membrane is more fluid' without explaining why that helps phagocytosis. The question asks WHY there was more phagocytosis — the engulfment step is the actual answer.",
  },

  // ── Q02 ──
  {
    questionId: questionId(P1, "02.1"),
    msAnswer:
      "1. (Movement of) polar / charged molecules (accept ions, non-lipid soluble, named polar molecule e.g. glucose);\n2. (Facilitated diffusion) movement down a concentration gradient via carrier / channel protein;\n3. (Active transport) movement against a concentration gradient via carrier protein using ATP.",
    whyExplanation:
      "Three contrasts to make: what's being moved (point 1, applies to both), how facilitated diffusion works (point 2), how active transport works (point 3). For active transport you must say 'carrier protein' — channel proteins don't pump against gradients.",
    specLinks: ["3.2.3"],
    commonMistakes:
      "Saying 'against the gradient using a channel protein' — auto-reject. Forgetting ATP for active transport. Bringing ATP into facilitated diffusion (rejected).",
  },
  {
    questionId: questionId(P1, "02.2"),
    msAnswer: "(Highly) folded cell(-surface) membrane (accept invaginated / projections / extensions for folded).",
    whyExplanation:
      "One mark for a precise description: it's a folding of the cell-surface membrane, not a separate structure. 'Hairs' is rejected — microvilli aren't cilia.",
    specLinks: ["3.3.3"],
    commonMistakes:
      "Calling them 'tiny hairs' — auto-reject. Saying 'they increase surface area' — that's the function, not what they are.",
  },
  {
    questionId: questionId(P1, "02.3"),
    msAnswer:
      "1. Combine / mix / join with bile salts;\n2. Make (more) soluble (in water);\n3. (Micelles) breakdown close to cells\nOR\nMaintain higher concentration at cell-surface membrane\nOR\nTransport to cells/lining;\n4. Diffuses (into cells/ileum).",
    whyExplanation:
      "Three marks max from four possible points. The chain: vitamin A binds bile salts → forms a water-soluble micelle → micelle delivers vitamin A to the epithelial membrane and breaks down → vitamin A diffuses into the cell.",
    specLinks: ["3.3.3"],
    commonMistakes:
      "Saying 'micelles are absorbed' — explicit ignore. The micelle is a delivery vehicle, not the cargo. Saying 'facilitated diffusion' for the final step — also ignored.",
  },

  // ── Q03 ──
  {
    questionId: questionId(P1, "03.1"),
    msAnswer:
      "1. Diaphragm (muscle) contracts pulling diaphragm down (accept flattening / moves down);\n2. External intercostal muscles contract pulling / moving ribs upwards / outwards (accept ribs lifted);\n3. (Causes) volume increase and pressure decrease in thoracic cavity (accept thorax / lungs).",
    whyExplanation:
      "Three marks, three muscle/mechanics facts: diaphragm action, intercostal action, then the volume/pressure consequence. Both halves of point 3 are needed in one mark — volume up AND pressure down.",
    specLinks: ["3.3.2"],
    commonMistakes:
      "Saying 'diaphragm relaxes' — that's expiration. Forgetting the pressure change. Mixing up external and internal intercostals (internal = expiration).",
  },
  {
    questionId: questionId(P1, "03.2"),
    msAnswer:
      "1. (Create a) single / few layer(s) of cells / tissue (accept 'to avoid overlapping cells');\n2. (So) light can pass through.",
    whyExplanation:
      "Two marks. Point 1 is the practical reason (one cell thick = no overlap), point 2 is the optical reason (light has to transmit through to form the image). You need both.",
    specLinks: ["3.2.1.2"],
    commonMistakes:
      "Stopping at 'so you can see it clearly' — too vague. The mark scheme wants the mechanism: thin slice → light transmits → image forms.",
  },
  {
    questionId: questionId(P1, "03.3"),
    msAnswer: "Bronchiole(s).",
    whyExplanation:
      "Tube A has no cartilage rings (rules out trachea and bronchi), is small in diameter, and has smooth muscle in its wall — these are the defining features of a bronchiole. Alveoli are air sacs, not tubes.",
    specLinks: ["3.3.2"],
    commonMistakes:
      "Common wrong answers: bronchus (too large, has cartilage), alveolus (not a tube), trachea. The mark scheme rejects misspellings like 'bronchiolus' or 'brancheolles'.",
  },
  {
    questionId: questionId(P1, "03.4"),
    msAnswer:
      "Correct answer: 75 (μm).\n\nWorking:\n1. Mean diameter in mm: (4 + 2 + 5 + 1 + 2 + 3 + 5 + 2) ÷ 8 = 24 ÷ 8 = 3 mm.\n2. Real size = image size ÷ magnification = 3 ÷ 40 = 0.075 mm.\n3. Convert to μm: 0.075 × 1000 = 75 μm.",
    whyExplanation:
      "Magnification = image / real, so real = image / magnification. Image is in mm, so the result is in mm — convert to μm by ×1000. One mark is available for correct working alone (e.g. correct mean of 3 mm, correct ÷ 40, or 0.075 mm with wrong units).",
    specLinks: ["3.2.1.2"],
    commonMistakes:
      "Forgetting to convert mm → μm (leaving 0.075 mm). Multiplying instead of dividing by magnification. Mean calculation slips.",
  },
  {
    questionId: questionId(P1, "03.5"),
    msAnswer:
      "Uncertainty: ±1 (mm).\nPercentage error: 25 (%).\n\nWorking:\n• A ruler with 1 mm graduations has a precision of ±0.5 mm at each reading.\n• Two readings (start and end) → total uncertainty 0.5 + 0.5 = ±1 mm.\n• Percentage error = (1 ÷ 4) × 100 = 25 %.",
    whyExplanation:
      "Measuring a length needs two scale readings — each ±0.5 mm — so uncertainties add to ±1 mm. The mark scheme is generous on follow-through: ±0.5 mm gives 12.5 %, ±2 mm gives 50 %.",
    specLinks: ["3.2.1.2"],
    commonMistakes:
      "Using ±0.5 mm instead of ±1 mm — only counts one reading. Scores 1/2 because the percentage is calculated correctly off the wrong uncertainty.",
  },

  // ── Q04 ──
  {
    questionId: questionId(P1, "04.1"),
    msAnswer: "2 (accept: glucose and fructose).",
    whyExplanation:
      "Molasses contains sucrose, glucose and fructose. Sucrose is a disaccharide so it doesn't count. Glucose and fructose are both monosaccharides → 2 types.",
    specLinks: ["3.1.2"],
    commonMistakes: "Answering 3 (counting sucrose). Answering 1 (forgetting fructose).",
  },
  {
    questionId: questionId(P1, "04.2"),
    msAnswer:
      "1. Heat with Benedict's solution / reagent;\n2. Positive result: red colour / precipitate (also accept green, orange, brown, yellow);\n3. Because glucose and / or fructose are reducing sugars (and are therefore detected).\n\nReject: using acid instead of heat. Reject: sucrose given as the reason for the positive result.",
    whyExplanation:
      "Benedict's reagent detects reducing sugars by being reduced itself (Cu²⁺ → Cu⁺), forming a coloured precipitate. The test requires heat — must be stated. Glucose and fructose are reducing; sucrose is not, so don't credit it as the cause.",
    specLinks: ["3.1.2"],
    commonMistakes:
      "Omitting the 'heat' step — 'add Benedict's reagent' alone loses MP1. Saying sucrose causes the positive result — actively loses the explanation mark.",
  },
  {
    questionId: questionId(P1, "04.3"),
    msAnswer: "1.6 / 1.62 tablespoons (accept 2, rounded up).",
    whyExplanation:
      "5 % of 8100 kJ = 405 kJ allowed from free sugar. Each tablespoon = 250 kJ. 405 ÷ 250 = 1.62. Rounding up to 2 is fine because the question is about reaching the recommendation; rounding down to 1 or 1.5 wouldn't.",
    specLinks: ["3.1.2"],
    commonMistakes:
      "Rounding 1.62 down to 1 or 1.5. Using 8100 kJ as the budget without taking 5 % first.",
  },
  {
    questionId: questionId(P1, "04.4"),
    msAnswer:
      "1. Molasses / solution has a lower water potential (or 'water in beaker has higher water potential');\n2. Water moves into the molasses across the partially / selectively permeable bladder;\n3. Increased (molasses) volume OR decreased air volume.\n\nAccept 'more negative' for 'lower'; accept Ψ symbol.",
    whyExplanation:
      "The molasses has dissolved solutes → lower water potential than the surrounding water. The bladder is partially permeable: water in, big sugar molecules can't out. Water moves in by osmosis, raising the molasses volume in the tube and compressing the air above it.",
    specLinks: ["3.2.3"],
    commonMistakes:
      "Saying water 'concentration' instead of water potential — explicit reject in the spec. Not stating which compartment changed volume (MP3 missed).",
  },
  {
    questionId: questionId(P1, "04.5"),
    msAnswer:
      "Suggested change: dilute the molasses / decrease molasses concentration / increase molasses water potential.\nQuantitative support: reduction by 80 % / 5 times (or to 20 % / 1:4 ratio).\n\nCalculation: 160 ÷ 800 = 0.2 → pressure is 5× lower → concentration reduced 5-fold.",
    whyExplanation:
      "Air pressure increase tracks the osmotic driving force, which tracks the water potential gradient. 160 / 800 = 1/5 → gradient 5× smaller → dilute the molasses 5-fold. Need both the change AND the quantitative support to score full marks.",
    specLinks: ["3.2.3"],
    commonMistakes:
      "Suggesting changes to the water (the question fixes the change to the molasses). Calculating the ratio correctly but not naming the change as 'dilution'.",
  },

  // ── Q05 ──
  {
    questionId: questionId(P1, "05.1"),
    msAnswer:
      "Prophase (max 2 from):\n1. Chromosomes / chromatids continue to condense / shorten / thicken / coil;\n2. Chromosomes / chromatids become visible;\n3. Chromosomes / centromeres attach to spindle fibres.\n\nAnaphase:\n4. Centromeres divide / split;\n5. Chromosomes / chromatids pulled to opposite poles / sides / ends.\n\nReject 'homologous chromosomes move to opposite sides' — that's meiosis.",
    whyExplanation:
      "Marks split between the two stages. Prophase: condensing + visibility + spindle attachment. Anaphase always splits centromeres. Don't drift into meiotic events (crossing over, bivalents).",
    specLinks: ["3.2.2"],
    commonMistakes:
      "Saying homologous chromosomes separate — that's meiosis I. Omitting centromere splitting in anaphase.",
  },
  {
    questionId: questionId(P1, "05.2"),
    msAnswer:
      "Mitotic Index = number of cells in mitosis ÷ total number of cells (in field of view).\n\nAccept 'cells with visible chromosomes' for 'cells in mitosis'. Reject if multiplied by 100 (that would give a percentage).",
    whyExplanation:
      "The mitotic index is a proportion (0–1), not a percentage — the graph's y-axis runs 0–1. Numerator counts cells, not chromosomes.",
    specLinks: ["3.2.2"],
    commonMistakes:
      "Multiplying by 100. Counting chromosomes rather than cells.",
  },
  {
    questionId: questionId(P1, "05.3"),
    msAnswer:
      "1. There is a strong / significant negative correlation (between mitotic index and distance from root tip);\n2. Probability of this correlation occurring by chance is less than 0.05 / 5 % (or > 95 % probability it is not due to chance);\n3. (Therefore) reject the null hypothesis.\n\nMax 2 marks. Reject 'results are significant' — the correlation is significant, not the results.",
    whyExplanation:
      "r = –0.98 means strong, negative correlation. P < 0.05 is the threshold: less than 5 % chance of seeing this strong a correlation by random chance, so we reject the null. The examiner pin: 'P' must be linked to 'correlation occurring by chance', not to 'results' or 'differences'.",
    specLinks: ["3.2.2"],
    commonMistakes:
      "Comparing P and r values. Saying results are 'not due to chance' without mentioning the correlation. Forgetting 'strong' or 'significant'.",
  },
  {
    questionId: questionId(P1, "05.4"),
    msAnswer:
      "1. More / larger proportion of cells in mitosis closer to the tip (or fewer further away);\n2. More / larger proportion of cells in interphase further from the tip (or fewer in interphase closer to tip);\n3. No cells in mitosis at / after 2 mm from the tip (or all cells in interphase at / after 2 mm).\n\nAccept G1, S, or G2 for 'interphase'.",
    whyExplanation:
      "Mitotic index falls with distance → fewer cells in mitosis → more in interphase. The meristematic zone is at the tip; cells further away have differentiated. MP3 specifically wants the 2 mm threshold read from the graph.",
    specLinks: ["3.2.2"],
    commonMistakes:
      "Describing the trend without linking to interphase — students treat 'not in mitosis' as 'not in the cell cycle'. Missing the 2 mm threshold.",
  },

  // ── Q06 ──
  {
    questionId: questionId(P1, "06.1"),
    msAnswer:
      "Any 3 comparative rows (must be comparisons, not isolated facts):\n\nmRNA → tRNA\n1. Has codon(s) → has anticodon;\n2. No hydrogen bonds / base pairs (within molecule) → has hydrogen bonds / base pairs (within molecule);\n3. No amino-acid binding site → has amino-acid binding site;\n4. Linear / straight / not folded → clover-leaf shape / folded;\n5. Long / many nucleotides → short / few nucleotides.",
    whyExplanation:
      "Both molecules are single-stranded RNA. The differences live in shape, base-pairing, and what they bind. The question requires direct comparisons in each row — a fact about one molecule alone scores nothing.",
    specLinks: ["3.4.1"],
    commonMistakes:
      "Saying 'mRNA is single-stranded, tRNA is double-stranded' — both are single-stranded. Listing features of each separately rather than comparing.",
  },
  {
    questionId: questionId(P1, "06.2"),
    msAnswer:
      "Phe, Arg, Ala (in that order).\n\n• UUU → Phe\n• CGG → Arg\n• GCG → Ala\n\nReject if the order is different.",
    whyExplanation:
      "Translation reads 5' → 3', codon by codon. Look up each triplet directly in the codon table. Order matters because the amino acid sequence is determined by codon order.",
    specLinks: ["3.4.1"],
    commonMistakes:
      "Using the complementary DNA sequence (AAA GCC CGC) instead of the mRNA codons. Misreading rows/columns of the codon table.",
  },
  {
    questionId: questionId(P1, "06.3"),
    msAnswer:
      "Type of mutation: (single base) substitution.\nChange in DNA: guanine to thymine / G to T / GCC to TCC.\n(Reject mRNA bases — the question asks for the DNA change.)\n\nExplanation:\n3. Arg is still present in the sequence / no change in amino acid;\n4. Therefore no change in primary / tertiary structure / active-site shape.",
    whyExplanation:
      "Original mRNA UUU CGG GCG → Phe Arg Ala. Mutated UUU AGG GCG → Phe Arg Ala. CGG and AGG both code for Arg — silent / synonymous substitution. Same primary → same fold → same function. The DNA template change behind mRNA CGG → AGG is GCC → TCC, i.e. G → T.",
    specLinks: ["3.4.1"],
    commonMistakes:
      "Quoting mRNA bases as the DNA change. Assuming the mutation must alter the protein. Saying 'amino acids are formed' instead of 'coded for'.",
  },

  // ── Q07 ──
  {
    questionId: questionId(P1, "07.1"),
    msAnswer:
      "Table needs:\n1. Variety (D and E) in the left column;\n2. 'Time / min' AND 'Mean (time) / min' in column headings only (units not repeated in the body);\n3. Correctly calculated times and means to 1 d.p.\n\nVariety D: 15.8, 18.0, 14.5 min → mean 16.1 min.\nVariety E: 6.5, 8.0, 7.0 min → mean 7.2 min.\n\nReject mixed units.",
    whyExplanation:
      "Convert mixed minutes/seconds to one unit before averaging: 15 min 50 s = 15.83 min ≈ 15.8 min. Means then follow. Units belong only in the column heading.",
    specLinks: ["3.1.4.2"],
    commonMistakes:
      "Leaving '15 min 50 s' unconverted. Wrong number of decimal places. Repeating the unit in every cell.",
  },
  {
    questionId: questionId(P1, "07.2"),
    msAnswer:
      "1. More phenol / substrate in variety E, OR more PPO / enzyme in variety E, OR higher PPO activity in variety E;\n2. So more enzyme-substrate complexes form.\n\nAccept the converse for D.",
    whyExplanation:
      "E browned faster than D, so the rate was higher in E. Same conditions in both → difference must be in [substrate] or [enzyme]. More reactant → more E-S complexes → faster reaction. The 'more E-S complexes' link is its own mark.",
    specLinks: ["3.1.4.2"],
    commonMistakes:
      "Saying variety E had 'better' enzyme without explaining why. Confusing shorter time with slower reaction. Omitting the E-S complex step.",
  },
  {
    questionId: questionId(P1, "07.3"),
    msAnswer:
      "Mark in groups; any one complete group scores 3:\n\nGroup A — temperature toward optimum:\n1. Increase temperature toward enzyme's optimum;\n2. More kinetic energy / more active enzyme;\n3. More E-S complexes / increased rate.\n\nGroup B — pH toward optimum:\n1. Use optimum pH (or move toward it);\n2. Less denaturation / more active enzyme;\n3. More E-S complexes / increased rate.\n\nGroup C — surface area:\n1. Crush / grind / dice / homogenise / slice the apple;\n2. More PPO / phenol in contact with oxygen;\n3. More E-S complexes / increased rate.",
    whyExplanation:
      "The question wants a change AND its mechanism. Pick one approach and complete the chain: change → molecular effect → rate consequence. Mixing points across groups doesn't score.",
    specLinks: ["3.1.4.2"],
    commonMistakes:
      "Saying 'increase temperature' without 'toward optimum' — the method already uses 30 °C. Claiming temperature 'lowers activation energy' — it doesn't. Mixing groups.",
  },
  {
    questionId: questionId(P1, "07.4"),
    msAnswer:
      "Answer: B — measure brown-pigment intensity by comparing the apple tissue with a colour chart of known pigment concentrations.",
    whyExplanation:
      "B is the only option that measures the actual product (brown pigment) on a solid sample with simple equipment. A (oxygen in air around a solid) is impractical. C (biuret) tests for protein, not pigment. D (colorimeter on transmitted light) doesn't work on opaque solids — colorimeters need a transparent solution.",
    specLinks: ["3.1.4.2"],
    commonMistakes:
      "Picking D because students assume colorimeters work on anything. Picking A because it 'sounds scientific'.",
  },

  // ── Q08 ──
  {
    questionId: questionId(P1, "08.1"),
    msAnswer:
      "Any 2 (structure + function linked):\n1. Smooth muscle — absorbs / resists / withstands high blood pressure;\n2. Elastic tissue / layer — stretches AND recoils to maintain / smooth blood pressure;\n3. Smooth endothelium — reduces friction (to blood flow);\n4. Protein / collagen / fibrous coat — prevents wall splitting OR absorbs high pressure.\n\nReject 'elastic tissue contracts' (it recoils) and 'muscle pumps blood' (heart does that).",
    whyExplanation:
      "The aorta deals with the highest pressures in the body. Each layer's job: muscle resists, elastic stores-and-releases pressure to smooth flow, endothelium minimises friction, collagen anchors the wall. Both structure AND function must be stated for the mark.",
    specLinks: ["3.3.4"],
    commonMistakes:
      "Saying elastic tissue 'contracts and relaxes' — it recoils passively. Listing structure without function. Claiming wall muscle pumps blood.",
  },
  {
    questionId: questionId(P1, "08.2"),
    msAnswer:
      "Any 3 from:\n1. Small aorta diameters (≤ 3.5 cm) carry low risk of tears, so are unlikely to develop aneurysms (or: as diameter increases, tear/aneurysm risk increases);\n2. Few people are at high risk — only 7 had d > 4.5 cm; 98 had 4.0 < d ≤ 4.5;\n3. Diameters > 4.5 cm carry very high risk (380.00) so likely to develop aneurysms;\n4. A tear does not necessarily lead to an aneurysm.",
    whyExplanation:
      "Tear risk rises non-linearly with diameter — 0.06 at ≤ 3.5 cm to 380 at > 4.5 cm. Aneurysms come from tears letting blood through, so high tear risk implies high aneurysm risk — but the cohort weights the conclusion. Only 7 of 3500 had the highest-risk aortas. The phrase 'small tears may occur without bursting' earns MP4 if recognised.",
    specLinks: ["3.3.4"],
    commonMistakes:
      "Describing tear-risk numbers without linking to aneurysms. Treating the 7 high-risk people as a small sample (the cohort is 3500). Not quoting data values.",
  },
  {
    questionId: questionId(P1, "08.3"),
    msAnswer:
      "Correct percentage change: −35 % (accept −35.1, −35.3, −35.7, −36).\n\nWorking:\n• Diseased SV = 100 × 0.45 = 45 cm³.\n• Healthy SV = 120 × 0.58 = 69.6 cm³.\n• % change = (45 − 69.6) ÷ 69.6 × 100 = −35.3 %.\n\nMathematical error in the student's answer: they used the diseased BVB (100) as the denominator instead of the healthy stroke volume (69.6).\n\nPartial credit (1 mark) for any correct intermediate value: 45, 69.6, 24.6, 48.6.",
    whyExplanation:
      "Percentage change = (new − original) ÷ original × 100. 'Original' is the healthy value (the reference). Using BVB (100) instead of healthy SV (69.6) is the conceptual slip — the maths is otherwise fine.",
    specLinks: ["3.3.4"],
    commonMistakes:
      "Wrong denominator (using diseased SV or BVB). Computing 120 × 0.58 as 69.9 instead of 69.6.",
  },

  // ── Q09 ──
  {
    questionId: questionId(P1, "09.1"),
    msAnswer: "20 males.",
    whyExplanation:
      "Each male makes one type of call. In the control (800 males), 97 % are advertisement and 0.5 % are rasping → 97.5 %. The remaining 2.5 % make mating calls. 0.025 × 800 = 20.",
    specLinks: ["3.5.3"],
    commonMistakes:
      "Answering 780 (forgetting the mating-call category). Misreading the 2.5 % residual.",
  },
  {
    questionId: questionId(P1, "09.2"),
    msAnswer: "Add (sexually active) female(s).\n\nIgnore: add males.",
    whyExplanation:
      "Mating calls are made to start and continue mating — they require a female partner. Adding more males doesn't help; the bottleneck is females.",
    specLinks: ["3.5.3"],
    commonMistakes:
      "Suggesting more males. Suggesting EE2 (the experimental treatment that suppresses sexual activity).",
  },
  {
    questionId: questionId(P1, "09.3"),
    msAnswer:
      "Effect: less mating / breeding OR fewer offspring (MP1).\n\nExplanation (max 3 from):\n2. Fewer advertisement calls (94 % vs 97 %) → females not attracted / males not located;\n3. Fewer mating calls because males less sexually active (due to EE2);\n4. More rasping calls (4 % vs 0.5 %) because more males are not sexually active;\n5. Less time spent in courtship (8 s vs 16 s median) → less mating.",
    whyExplanation:
      "EE2 mimics oestrogen and disrupts male sexual activity. Each line of evidence (call type frequencies, courtship time) ties to a specific behaviour outcome. Marks reward linking data → behaviour → reproductive consequence — a trend description alone isn't enough.",
    specLinks: ["3.5.3"],
    commonMistakes:
      "Quoting data without linking to a named courtship behaviour. Misreading Table 7 ('time spent' ≠ 'number of females'). Using only one of the two tables.",
  },

  // ── Q10 ──
  {
    questionId: questionId(P1, "10.1"),
    msAnswer:
      "1. Homogenise tissue to break open cells / release organelles;\n2. Filter to remove intact cells / tissue / debris;\n3. Cold solution — to prevent / slow enzyme activity (which would damage organelles);\n4. Solution with equivalent water potential (isotonic) — to prevent osmosis and organelles bursting / shrinking;\n5. Buffered solution — to prevent pH change and stop enzymes / proteins denaturing;\n6. Centrifuge at low speed (up to 1000 rpm / × g) so nuclei pellet at the bottom; discard supernatant.\n\nReject: 'homogenise the cell walls' (animal tissue has no cell walls); 'damage to cells' for isotonic (should say organelles).",
    whyExplanation:
      "Three stages: homogenise, prepare medium, centrifuge. The medium has three jobs and three reasons — cold for enzymes, isotonic for osmosis, buffered for pH. Then differential centrifugation: nuclei are biggest and densest, so they pellet at LOW speed. Higher speeds bring down smaller organelles successively.",
    specLinks: ["3.2.1.3"],
    commonMistakes:
      "Cell walls in muscle (animal) tissue. Saying isotonic protects 'cells' instead of organelles. Describing increasing spin speed to get nuclei — they pellet at low speed.",
  },
  {
    questionId: questionId(P1, "10.2"),
    msAnswer:
      "1. DNA in nucleus codes for the enzyme / protein;\n2. Ribosomes / rough endoplasmic reticulum are the site of translation / protein synthesis;\n3. Rough ER transports / modifies / processes the enzyme;\n4. Mitochondria produce ATP (for the process);\n5. Golgi apparatus modifies / packages / processes the enzyme, forms vesicles (or makes glycoprotein);\n6. Vesicles move enzyme to the cell-surface membrane / fuse with it (exocytosis).\n\nReject: 'mitochondria produce energy' (they produce ATP). Max 5 marks.",
    whyExplanation:
      "Trace the secretory pathway: gene in nucleus → mRNA (excluded) → translation on rough ER → ER transport → Golgi modification & packaging → vesicle to cell-surface membrane → exocytosis. Mitochondria sit alongside, providing ATP for active steps.",
    specLinks: ["3.2.1.1"],
    commonMistakes:
      "Including transcription (mRNA synthesis) — explicitly excluded. Omitting mitochondria. Vague endpoint ('to where it's needed') — must specify cell-surface membrane / exocytosis.",
  },
  {
    questionId: questionId(P1, "10.3"),
    msAnswer:
      "1. ATP structure: ribose (pentose sugar) + adenine + 3 phosphate groups (accept adenosine + 3 phosphates; reject if both ribose AND adenosine are mentioned together);\n2. ATP → ADP + Pᵢ, catalysed by ATP hydrolase (ATPase) — hydrolysis;\n3. ADP + Pᵢ → ATP, catalysed by ATP synthase;\n4. ADP + Pᵢ → ATP is a condensation reaction.",
    whyExplanation:
      "ATP = adenosine + 3 phosphates. The two enzymes are different: ATPase hydrolyses (releases energy); ATP synthase condenses (costs energy from respiration / photosynthesis). Four marks across structure + two reactions + reaction types.",
    specLinks: ["3.1.6"],
    commonMistakes:
      "Saying both 'adenosine' and 'ribose' — adenosine already includes ribose, so the mark scheme rejects it. Wrong bond names (glycosidic, hydrogen). Confusing hydrolysis and condensation.",
  },
];

export function getQuestionsForPaper(pid: string): Question[] {
  return PLACEHOLDER_QUESTIONS.filter((q) => q.paperId === pid);
}

export function getBreakdown(qid: string): Breakdown | undefined {
  return PLACEHOLDER_BREAKDOWNS.find((b) => b.questionId === qid);
}

export function getSpecPoint(id: string): SpecPoint | undefined {
  return PLACEHOLDER_SPEC.find((s) => s.id === id);
}

export function getAllSpecPoints(): SpecPoint[] {
  return PLACEHOLDER_SPEC;
}
