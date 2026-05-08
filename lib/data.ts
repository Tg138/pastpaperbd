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
const P2_2024 = paperId("biology", 2024, 2);
const P3_2024 = paperId("biology", 2024, 3);

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
    topic: "Genetic information, variation and relationships between organisms",
    description:
      "DNA carries the genetic code in triplets (codons). Each codon on mRNA specifies one amino acid. mRNA is linear/straight and carries codons; tRNA is clover-leaf shaped and carries anticodons and an amino acid binding site. A substitution mutation changes one base, which may or may not alter the amino acid coded (degenerate genetic code). If the same amino acid is still coded, primary and tertiary structure — and therefore active site shape — are unchanged.",
    breakdown:
      "Substitution + degenerate code = often a silent mutation. Same amino acid → same primary structure → same fold → same enzyme. Always check the codon table before assuming a mutation breaks something. Watch which strand the mark scheme wants — DNA template is complementary to mRNA.",
  },

  // ── 3.1.7–3.1.8 ──
  {
    id: "3.1.7",
    title: "Water's biological importance",
    topic: "Biological molecules",
    description:
      `Water is a major component of cells with several vital properties. It acts as a metabolite in condensation and hydrolysis reactions and as an important solvent for metabolic reactions. Its high heat capacity buffers temperature changes, and its large latent heat of vaporisation provides a cooling effect. Strong cohesion between water molecules supports transport in plants and creates surface tension.`,
    breakdown:
      `Key properties: metabolite (condensation/hydrolysis), solvent, high heat capacity (buffers temp), high latent heat of vaporisation (cooling), cohesion (plant transport, surface tension). Link each property to its biological significance.`,
    pageNumber: 19,
  },
  {
    id: "3.1.8",
    title: "Roles of inorganic ions",
    topic: "Biological molecules",
    description:
      `Inorganic ions are found in varying concentrations in cytoplasm and body fluids, each with specific roles. Examples include hydrogen ions in pH regulation, iron ions as a component of haemoglobin, and sodium ions in glucose and amino acid co-transport. Phosphate ions are crucial components of DNA and ATP.`,
    breakdown:
      `Know specific examples: H+ (pH), Fe2+ (haemoglobin), Na+ (co-transport of glucose/amino acids), PO43- (DNA/ATP). Link ion to function.`,
    pageNumber: 19,
  },

  // ── 3.2.4 ──
  {
    id: "3.2.4",
    title: "Immune system and cell recognition",
    topic: "Cells",
    description:
      `Cells possess specific surface molecules (antigens) that allow the immune system to identify pathogens, foreign cells, abnormal body cells, and toxins. T lymphocytes mediate the cellular response via helper T cells stimulating cytotoxic T cells, B cells, and phagocytes. B lymphocytes mediate the humoral response through clonal selection, plasma cells, and antibody release — forming antigen-antibody complexes leading to agglutination and phagocytosis. Memory cells underpin the secondary immune response. Vaccines provide herd immunity. HIV replicates in helper T cells, causing AIDS. Monoclonal antibodies are used in targeted medication and ELISA-based diagnosis.`,
    breakdown:
      `Antigens = 'self' vs 'non-self'. Cellular response: APC → Helper T → Cytotoxic T + B cells + phagocytes. Humoral response: B cells → clonal selection → plasma cells → antibodies → agglutination. Primary vs secondary response (memory cells). Active vs passive immunity. HIV → helper T cells → AIDS. Antibiotics useless vs viruses. Monoclonal antibodies: targeted drugs, ELISA. Ethical considerations.`,
    pageNumber: 25,
  },

  // ── 3.4.2–3.4.4, 3.4.7 ──
  {
    id: "3.4.2",
    title: "DNA, RNA and protein synthesis",
    topic: "Genetic information, variation and relationships between organisms",
    description:
      `The genome is a cell's complete set of genes; the proteome is the full range of proteins it can produce. Transcription: RNA polymerase produces mRNA from a DNA template. In eukaryotes, pre-mRNA is spliced to remove introns before translation. Translation: ribosomes read mRNA codons; tRNA anticodons carry amino acids; ATP provides energy. Polypeptides fold into functional proteins.`,
    breakdown:
      `Genome = all genes. Proteome = all proteins (larger than genome — alternative splicing). Transcription: DNA → mRNA. Eukaryotes: pre-mRNA → splicing (introns out) → mRNA. Translation: mRNA codon + tRNA anticodon + ribosome → polypeptide. No specific codon recall needed.`,
    pageNumber: 33,
  },
  {
    id: "3.4.3",
    title: "Genetic diversity — mutation and meiosis",
    topic: "Genetic information, variation and relationships between organisms",
    description:
      `Gene mutations (base deletion, substitution) occur during DNA replication and can be increased by mutagenic agents. Chromosome mutations include non-disjunction during meiosis. Meiosis produces four genetically different haploid daughter cells from a diploid parent via two nuclear divisions. Independent segregation of homologous chromosomes and crossing over increase genetic variation. Random fertilisation of haploid gametes further enhances variation.`,
    breakdown:
      `Gene mutations: deletion (frame shift), substitution (may be silent — degenerate code). Mutagens ↑ rate. Non-disjunction = extra/missing chromosomes. Meiosis: 2 divisions → 4 haploid cells (genetically different). Variation sources: independent segregation + crossing over + random fertilisation.`,
    pageNumber: 34,
  },
  {
    id: "3.4.4",
    title: "Natural selection and adaptation",
    topic: "Genetic information, variation and relationships between organisms",
    description:
      `Genetic diversity (number of different alleles in a population) is essential for natural selection. Random mutations create new alleles; advantageous alleles increase reproductive success and rise in frequency over generations. This drives species adaptation through anatomical, physiological, or behavioural changes. Directional selection (e.g. antibiotic resistance) shifts the population mean; stabilising selection favours the middle (e.g. human birth weight).`,
    breakdown:
      `Genetic diversity = allele number. Natural selection: mutation → advantageous allele → ↑ reproductive success → ↑ allele frequency. Directional selection (antibiotic resistance). Stabilising selection (birth weight). Adaptations: anatomical, physiological, behavioural.`,
    pageNumber: 35,
  },
  {
    id: "3.4.7",
    title: "Investigating variation and biodiversity",
    topic: "Genetic information, variation and relationships between organisms",
    description:
      `Genetic diversity within or between species is investigated by comparing measurable characteristics, DNA base sequences, mRNA sequences, or protein amino acid sequences. Gene technology has shifted diversity investigation toward direct DNA sequencing. Quantitative studies of variation involve collecting random samples, calculating means and standard deviations, and interpreting these statistical measures.`,
    breakdown:
      `Compare diversity using: observable traits, DNA sequence, mRNA sequence, amino acid sequence. Direct DNA sequencing preferred. Quantitative studies: random sampling → mean + SD. Interpret mean/SD — no SD calculation required in exams.`,
    pageNumber: 37,
  },

  // ── 3.5 Energy transfers ──
  {
    id: "3.5.1",
    title: "Photosynthesis — light-dependent and light-independent reactions",
    topic: "Energy transfers in and between organisms",
    description:
      `The light-dependent reaction: chlorophyll absorbs light → photoionisation → electrons pass along an electron transfer chain → H+ gradient across thylakoid membrane → ATP synthase produces ATP (chemiosmosis). Photolysis of water yields H+, electrons, and O2. Reduced NADP is produced. The light-independent reaction (Calvin cycle): CO2 + RuBP → GP (catalysed by rubisco). GP is reduced to triose phosphate using ATP and reduced NADP. Triose phosphate regenerates RuBP and forms other organic compounds.`,
    breakdown:
      `Light-dependent: photoionisation → ETC → H+ gradient → ATP synthase → ATP. Photolysis: H2O → H+, e-, O2. Reduced NADP made. Calvin cycle: CO2 + RuBP (rubisco) → GP → TP (ATP + reduced NADP). TP → RuBP or organic compounds. Limiting factors: light, CO2, temperature.`,
    pageNumber: 38,
  },
  {
    id: "3.5.2",
    title: "Respiration — glycolysis, Krebs cycle and oxidative phosphorylation",
    topic: "Energy transfers in and between organisms",
    description:
      `Glycolysis (cytoplasm, anaerobic): glucose is phosphorylated, split to triose phosphate, then oxidised to pyruvate — yielding net 2 ATP and reduced NAD. Anaerobic respiration: pyruvate → ethanol + CO2 (plants/yeast) or lactate (animals), regenerating NAD. Aerobic: pyruvate enters mitochondrial matrix. Link reaction: pyruvate → acetyl CoA (CO2 + reduced NAD). Krebs cycle: acetyl CoA + 4C → 6C → regenerated 4C; produces reduced coenzymes, ATP, CO2. Oxidative phosphorylation: reduced coenzymes donate H+ to ETC → H+ gradient across inner mitochondrial membrane → ATP synthase → ATP (chemiosmosis). Lipids and amino acids can also be respiratory substrates.`,
    breakdown:
      `Glycolysis (cytoplasm): glucose → pyruvate. Net 2 ATP + reduced NAD. Anaerobic: pyruvate → ethanol/lactate (regenerates NAD). Link reaction: pyruvate → acetyl CoA. Krebs: acetyl CoA → CO2 + reduced coenzymes + ATP. Oxidative phosphorylation: ETC → H+ gradient → ATP synthase → ATP. Lipids/amino acids also enter respiration.`,
    pageNumber: 40,
  },
  {
    id: "3.5.3",
    title: "Animal behaviour — courtship and reproduction",
    topic: "Energy transfers in and between organisms",
    description:
      "Courtship behaviour precedes mating and ensures reproductive success. It includes species-recognition signals, assessment of mate quality, and synchronisation of reproductive states. Reduction in courtship reduces offspring number. In Xenopus laevis, advertisement calls attract females, mating calls start/continue mating, and rasping calls signal sexual inactivity.",
    breakdown:
      "Courtship is data — you must link a numerical change to a specific behaviour outcome (attraction, mating, etc.) to score. 'Fewer courtship signals → fewer mates → fewer offspring' is the chain of reasoning examiners look for.",
  },
  {
    id: "3.5.4",
    title: "Nutrient cycles and microorganisms",
    topic: "Energy transfers in and between organisms",
    description:
      `Natural ecosystems recycle nutrients, exemplified by the nitrogen and phosphorus cycles. Saprobionts are crucial for decomposition; mycorrhizae facilitate plant uptake of water and inorganic ions. Bacteria drive the nitrogen cycle through saprobiotic nutrition, ammonification, nitrification, nitrogen fixation, and denitrification. Natural and artificial fertilisers replace lost nitrates and phosphates but can cause leaching and eutrophication.`,
    breakdown:
      `N and P cycles rely on microorganisms. Saprobionts = decomposers. Mycorrhizae help plants absorb water/ions. Nitrogen cycle: saprobiotic nutrition, ammonification, nitrification, nitrogen fixation, denitrification. No specific bacterial names needed. Fertilisers (natural/artificial) replace lost nutrients. Issues: leaching, eutrophication.`,
    pageNumber: 42,
  },

  // ── 3.6 Organisms respond ──
  {
    id: "3.6.1",
    title: "Survival and nervous coordination",
    topic: "Organisms respond to changes in their environment",
    description:
      `The sinoatrial node (SAN) initiates a wave of electrical activity → atria contract → atrioventricular node (AVN) relays after a delay → Purkyne tissue in the bundle of His → ventricles contract from apex upwards. Chemoreceptors and pressure receptors relay information via the autonomic nervous system. Plants use IAA to regulate cell elongation, explaining gravitropism and phototropism. Animals exhibit taxes (directional) and kineses (non-directional).`,
    breakdown:
      `SAN → AVN (delay) → Purkyne/bundle of His → ventricles contract. 'Signal' and 'message' are rejected — use 'electrical activity' or 'wave of depolarisation'. IAA → cell elongation (shoots: elongation on shaded side; roots: inhibition). Taxes: directional response. Kineses: non-directional. Autonomic NS controls heart rate.`,
    pageNumber: 43,
  },
  {
    id: "3.6.2",
    title: "Nerve impulses — action potential and conduction",
    topic: "Organisms respond to changes in their environment",
    description:
      `A resting potential is maintained by differential membrane permeability and the Na+/K+ pump (more K+ out, Na+ in). Depolarisation: Na+ channels open → Na+ rushes in → inside becomes positive → action potential. All-or-nothing principle applies. Repolarisation: K+ channels open → K+ out. The refractory period prevents back-propagation and limits impulse frequency. Myelinated axons conduct faster via saltatory conduction (impulse jumps between nodes of Ranvier). Speed increases with myelination, axon diameter, and temperature.`,
    breakdown:
      `Resting potential: inside negative. Na+/K+ pump. Depolarisation: Na+ in → action potential (all-or-nothing). Refractory period: ensures one-way travel + limits frequency. Saltatory conduction: jumps between nodes of Ranvier → faster. Speed factors: myelination, axon diameter, temperature.`,
    pageNumber: 44,
  },
  {
    id: "3.6.3",
    title: "Skeletal muscle contraction",
    topic: "Organisms respond to changes in their environment",
    description:
      `Skeletal muscles operate in antagonistic pairs. Myofibril ultrastructure: A-band (myosin), I-band (actin only), H-zone (myosin only), Z-line. During contraction: Ca2+ released from sarcoplasmic reticulum → binds troponin → moves tropomyosin → exposes actin binding sites → myosin heads bind actin → power stroke (ADP + Pi released) → ATP binds myosin → cross-bridge breaks. H-zone and I-band shorten; A-band stays same length. ATP and phosphocreatine provide energy. Slow-twitch fibres: aerobic, fatigue-resistant; fast-twitch: anaerobic, fast but fatigue quickly.`,
    breakdown:
      `Sarcomere: A-band (myosin, constant), I-band (actin only, shortens), H-zone (myosin only, shortens). Contraction: Ca2+ → troponin → tropomyosin moves → actin site exposed → myosin binds → power stroke. ATP breaks cross-bridge. Phosphocreatine = rapid ATP regeneration. Slow-twitch: aerobic, more mitochondria/myoglobin. Fast-twitch: anaerobic, glycogen stores. 'Elasticity' for 'plasticity' is rejected.`,
    pageNumber: 45,
  },

  // ── 3.7 Genetics, populations, evolution ──
  {
    id: "3.7.1",
    title: "Inheritance — monohybrid, dihybrid and complex crosses",
    topic: "Genetics, populations, evolution and ecosystems",
    description:
      `Genotype is an organism's genetic constitution; phenotype is its observable expression influenced by genotype and environment. Genetic diagrams predict monohybrid and dihybrid cross outcomes for dominant/recessive, codominant, sex-linked, autosomal-linked alleles, multiple alleles, and epistasis. Hardy-Weinberg principle: p² + 2pq + q² = 1 and p + q = 1, used to calculate allele and genotype frequencies in a non-evolving population. The chi-squared (χ²) test compares observed and expected phenotypic ratios.`,
    breakdown:
      `Genotype vs phenotype. Genetic diagrams: dominant/recessive, codominant, sex-linkage (X-linked), autosomal linkage, multiple alleles, epistasis. Hardy-Weinberg: p² + 2pq + q² = 1. p = dominant allele freq, q = recessive. q² = homozygous recessive — start here when given a phenotype frequency. χ² test: compare observed vs expected.`,
    pageNumber: 49,
  },
  {
    id: "3.7.3",
    title: "Evolution and speciation",
    topic: "Genetics, populations, evolution and ecosystems",
    description:
      `Phenotypic variation arises from genetic (mutation, meiosis, random fertilisation) and environmental factors. Natural selection increases advantageous allele frequencies via differential survival and reproduction. Stabilising, directional, and disruptive selection describe different patterns. Evolution is a change in allele frequency in a population. Reproductive isolation causes gene pool divergence, eventually producing new species (allopatric: geographic isolation; sympatric: same location). Genetic drift significantly alters allele frequency in small populations.`,
    breakdown:
      `Variation: genetic (mutation, meiosis, random fertilisation) + environmental. Natural selection → ↑ advantageous allele frequency. Selection types: stabilising (middle favoured), directional (one extreme), disruptive (both extremes). Evolution = allele frequency change. Speciation: reproductive isolation → gene pools diverge → infertile offspring if crossed. Allopatric = geographic barrier. Sympatric = same location. Genetic drift: big effect in small populations.`,
    pageNumber: 51,
  },

  // ── 3.8 Control of gene expression ──
  {
    id: "3.8.1",
    title: "Gene mutations and epigenetics",
    topic: "The control of gene expression",
    description:
      `Gene mutations involve changes to DNA base sequences: addition, deletion, substitution, inversion, duplication, translocation. Additions and deletions cause frame shifts, altering all downstream codons. Due to the degenerate code, substitutions may be silent. Epigenetics: heritable changes in gene expression without DNA sequence change. Increased methylation of DNA and decreased histone acetylation reduce transcription. Environmental factors can alter these epigenetic markers.`,
    breakdown:
      `Mutation types: addition/deletion → frame shift (major effect); substitution → may be silent (degenerate code). Epigenetics: heritable changes without DNA sequence change. DNA methylation (↑ = ↓ transcription). Histone acetylation (↑ = ↑ transcription). Environment alters epigenetic markers. Cancer link: tumour suppressor gene silenced by methylation.`,
    pageNumber: 53,
  },
  {
    id: "3.8.3",
    title: "Genome projects and gene sequencing",
    topic: "The control of gene expression",
    description:
      `Genome sequencing projects have mapped genomes across diverse organisms. For simpler organisms, genome knowledge directly informs the proteome, aiding applications like vaccine antigen identification. In complex organisms, non-coding DNA and regulatory genes complicate the genome-to-proteome relationship. Sequencing methods are automated and continually advancing. Comparing genomes across species reveals evolutionary relationships and gene function.`,
    breakdown:
      `Genome projects → sequence DNA. Simple organisms: genome → proteome directly. Complex organisms: non-coding DNA + regulatory genes make it harder. Sequencing automated. Comparing genomes → evolutionary relationships, gene function. Applications: vaccines, gene therapy.`,
    pageNumber: 56,
  },
  {
    id: "3.8.4.1",
    title: "Recombinant DNA technology",
    topic: "The control of gene expression",
    description:
      `DNA fragments are produced by converting mRNA to cDNA (reverse transcriptase), cutting DNA with restriction endonucleases creating sticky ends, or using a gene machine. Amplification: PCR (in vitro) or transformed host cells (in vivo). Promoter and terminator sequences are added. Restriction endonucleases and DNA ligase insert DNA into vectors (plasmids). Marker genes identify successfully transformed cells. The universal genetic code allows expression of foreign genes in host cells. Ethical, financial, and social issues surround gene therapy and GM organisms.`,
    breakdown:
      `DNA fragment sources: mRNA → cDNA (reverse transcriptase); restriction enzymes (sticky ends); gene machine. Amplification: PCR or host cell transformation. Add promoter + terminator. Restriction endonuclease cuts vector → ligase seals. Marker genes identify GM cells. Universal code → foreign gene expressed in host. Evaluate ethical/financial/social issues. Gene therapy: somatic vs germ-line.`,
    pageNumber: 57,
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

  // ── 2024 Paper 2 ──
  { id: questionId(P2_2024, "01.1"), paperId: P2_2024, number: "01.1", marks: 2, pageNumber: 2, specPoints: ["3.6.1"] },
  { id: questionId(P2_2024, "01.2"), paperId: P2_2024, number: "01.2", marks: 4, pageNumber: 3, specPoints: ["3.6.1", "3.6.2"] },
  { id: questionId(P2_2024, "01.3"), paperId: P2_2024, number: "01.3", marks: 2, pageNumber: 3, specPoints: ["3.6.1"] },
  { id: questionId(P2_2024, "02.1"), paperId: P2_2024, number: "02.1", marks: 2, pageNumber: 4, specPoints: ["3.6.2", "3.1.1"] },
  { id: questionId(P2_2024, "02.2"), paperId: P2_2024, number: "02.2", marks: 1, pageNumber: 5, specPoints: ["3.6.2"] },
  { id: questionId(P2_2024, "02.3"), paperId: P2_2024, number: "02.3", marks: 4, pageNumber: 5, specPoints: ["3.6.2"] },
  { id: questionId(P2_2024, "03.1"), paperId: P2_2024, number: "03.1", marks: 2, pageNumber: 6, specPoints: ["3.4.1"] },
  { id: questionId(P2_2024, "03.2"), paperId: P2_2024, number: "03.2", marks: 2, pageNumber: 7, specPoints: ["3.4.1"] },
  { id: questionId(P2_2024, "03.3"), paperId: P2_2024, number: "03.3", marks: 3, pageNumber: 7, specPoints: ["3.4.1"] },
  { id: questionId(P2_2024, "04.1"), paperId: P2_2024, number: "04.1", marks: 2, pageNumber: 8, specPoints: ["3.4.3"] },
  { id: questionId(P2_2024, "04.2"), paperId: P2_2024, number: "04.2", marks: 1, pageNumber: 8, specPoints: ["3.4.3"] },
  { id: questionId(P2_2024, "04.3"), paperId: P2_2024, number: "04.3", marks: 2, pageNumber: 9, specPoints: ["3.4.3"] },
  { id: questionId(P2_2024, "04.4"), paperId: P2_2024, number: "04.4", marks: 3, pageNumber: 9, specPoints: ["3.4.3"] },
  { id: questionId(P2_2024, "05.1"), paperId: P2_2024, number: "05.1", marks: 5, pageNumber: 10, specPoints: ["3.7.1"] },
  { id: questionId(P2_2024, "05.2"), paperId: P2_2024, number: "05.2", marks: 3, pageNumber: 11, specPoints: ["3.7.1"] },
  { id: questionId(P2_2024, "05.3"), paperId: P2_2024, number: "05.3", marks: 2, pageNumber: 12, specPoints: ["3.1.1"] },
  { id: questionId(P2_2024, "06.1"), paperId: P2_2024, number: "06.1", marks: 5, pageNumber: 14, specPoints: ["3.6.1"] },
  { id: questionId(P2_2024, "06.2"), paperId: P2_2024, number: "06.2", marks: 3, pageNumber: 15, specPoints: ["3.1.5"] },
  { id: questionId(P2_2024, "07.1"), paperId: P2_2024, number: "07.1", marks: 2, pageNumber: 17, specPoints: ["3.4.4"] },
  { id: questionId(P2_2024, "07.2"), paperId: P2_2024, number: "07.2", marks: 2, pageNumber: 17, specPoints: ["3.4.4"] },
  { id: questionId(P2_2024, "07.3"), paperId: P2_2024, number: "07.3", marks: 1, pageNumber: 18, specPoints: ["3.4.4"] },
  { id: questionId(P2_2024, "07.4"), paperId: P2_2024, number: "07.4", marks: 2, pageNumber: 18, specPoints: ["3.4.4"] },
  { id: questionId(P2_2024, "08.1"), paperId: P2_2024, number: "08.1", marks: 2, pageNumber: 20, specPoints: ["3.5.2"] },
  { id: questionId(P2_2024, "08.2"), paperId: P2_2024, number: "08.2", marks: 2, pageNumber: 21, specPoints: ["3.1.1"] },
  { id: questionId(P2_2024, "08.3"), paperId: P2_2024, number: "08.3", marks: 1, pageNumber: 22, specPoints: ["3.1.1"] },
  { id: questionId(P2_2024, "08.4"), paperId: P2_2024, number: "08.4", marks: 5, pageNumber: 23, specPoints: ["3.1.1", "3.5.2"] },
  { id: questionId(P2_2024, "09.1"), paperId: P2_2024, number: "09.1", marks: 2, pageNumber: 25, specPoints: ["3.5.3"] },
  { id: questionId(P2_2024, "09.2"), paperId: P2_2024, number: "09.2", marks: 3, pageNumber: 26, specPoints: ["3.1.1"] },
  { id: questionId(P2_2024, "09.3"), paperId: P2_2024, number: "09.3", marks: 2, pageNumber: 27, specPoints: ["3.1.1"] },
  { id: questionId(P2_2024, "09.4"), paperId: P2_2024, number: "09.4", marks: 4, pageNumber: 28, specPoints: ["3.1.1", "3.5.3"] },
  { id: questionId(P2_2024, "10.1"), paperId: P2_2024, number: "10.1", marks: 2, pageNumber: 29, specPoints: ["3.4.3"] },
  { id: questionId(P2_2024, "10.2"), paperId: P2_2024, number: "10.2", marks: 2, pageNumber: 30, specPoints: ["3.7.3"] },
  { id: questionId(P2_2024, "10.3"), paperId: P2_2024, number: "10.3", marks: 5, pageNumber: 30, specPoints: ["3.4.3"] },
  { id: questionId(P2_2024, "10.4"), paperId: P2_2024, number: "10.4", marks: 3, pageNumber: 31, specPoints: ["3.4.4", "3.4.3"] },
  { id: questionId(P2_2024, "10.5"), paperId: P2_2024, number: "10.5", marks: 3, pageNumber: 32, specPoints: ["3.7.1"] },

  // ── 2024 Paper 3 ──
  { id: questionId(P3_2024, "01.1"), paperId: P3_2024, number: "01.1", marks: 3, pageNumber: 2, specPoints: ["3.2.4", "3.1.4"] },
  { id: questionId(P3_2024, "01.2"), paperId: P3_2024, number: "01.2", marks: 1, pageNumber: 2, specPoints: ["3.2.4", "3.4.3"] },
  { id: questionId(P3_2024, "01.3"), paperId: P3_2024, number: "01.3", marks: 2, pageNumber: 3, specPoints: ["3.2.1.1", "3.2.4"] },
  { id: questionId(P3_2024, "02.1"), paperId: P3_2024, number: "02.1", marks: 1, pageNumber: 4, specPoints: ["3.5.2", "3.1.7", "3.3.1", "3.1.8", "3.2.1.1"] },
  { id: questionId(P3_2024, "02.2"), paperId: P3_2024, number: "02.2", marks: 2, pageNumber: 5, specPoints: ["3.5.2"] },
  { id: questionId(P3_2024, "02.3"), paperId: P3_2024, number: "02.3", marks: 2, pageNumber: 5, specPoints: ["3.5.2"] },
  { id: questionId(P3_2024, "02.4"), paperId: P3_2024, number: "02.4", marks: 3, pageNumber: 6, specPoints: ["3.5.2", "3.1.7"] },
  { id: questionId(P3_2024, "03.1"), paperId: P3_2024, number: "03.1", marks: 3, pageNumber: 7, specPoints: ["3.3.1", "3.5.2"] },
  { id: questionId(P3_2024, "03.2"), paperId: P3_2024, number: "03.2", marks: 3, pageNumber: 8, specPoints: ["3.3.1"] },
  { id: questionId(P3_2024, "03.3"), paperId: P3_2024, number: "03.3", marks: 1, pageNumber: 9, specPoints: ["3.3.1"] },
  { id: questionId(P3_2024, "03.4"), paperId: P3_2024, number: "03.4", marks: 1, pageNumber: 9, specPoints: ["3.3.2"] },
  { id: questionId(P3_2024, "04.1"), paperId: P3_2024, number: "04.1", marks: 1, pageNumber: 10, specPoints: ["3.4.7"] },
  { id: questionId(P3_2024, "04.2"), paperId: P3_2024, number: "04.2", marks: 5, pageNumber: 11, specPoints: ["3.8.3", "3.8.4.1", "3.4.7"] },
  { id: questionId(P3_2024, "05.1"), paperId: P3_2024, number: "05.1", marks: 2, pageNumber: 12, specPoints: ["3.4.3", "3.4.2"] },
  { id: questionId(P3_2024, "05.2"), paperId: P3_2024, number: "05.2", marks: 3, pageNumber: 13, specPoints: ["3.4.7"] },
  { id: questionId(P3_2024, "05.3"), paperId: P3_2024, number: "05.3", marks: 2, pageNumber: 13, specPoints: ["3.4.4", "3.4.7"] },
  { id: questionId(P3_2024, "05.4"), paperId: P3_2024, number: "05.4", marks: 3, pageNumber: 14, specPoints: ["3.8.3"] },
  { id: questionId(P3_2024, "06.1"), paperId: P3_2024, number: "06.1", marks: 2, pageNumber: 15, specPoints: ["3.4.7"] },
  { id: questionId(P3_2024, "06.2"), paperId: P3_2024, number: "06.2", marks: 1, pageNumber: 16, specPoints: ["3.4.7"] },
  { id: questionId(P3_2024, "06.3"), paperId: P3_2024, number: "06.3", marks: 4, pageNumber: 17, specPoints: ["3.4.7"] },
  { id: questionId(P3_2024, "06.4"), paperId: P3_2024, number: "06.4", marks: 1, pageNumber: 17, specPoints: ["3.4.7"] },
  { id: questionId(P3_2024, "06.5"), paperId: P3_2024, number: "06.5", marks: 2, pageNumber: 18, specPoints: ["3.4.7"] },
  { id: questionId(P3_2024, "06.6"), paperId: P3_2024, number: "06.6", marks: 2, pageNumber: 19, specPoints: ["3.4.7"] },
  { id: questionId(P3_2024, "06.7"), paperId: P3_2024, number: "06.7", marks: 3, pageNumber: 21, specPoints: ["3.4.7"] },
  { id: questionId(P3_2024, "07.1"), paperId: P3_2024, number: "07.1", marks: 25, pageNumber: 22, specPoints: ["3.1.3", "3.1.5.1", "3.1.5.2", "3.1.6", "3.1.8", "3.2.1.1", "3.2.2", "3.2.3", "3.3.3", "3.4.1", "3.4.2", "3.4.3", "3.4.4", "3.4.7", "3.5.1", "3.5.2", "3.5.4", "3.6.2.1", "3.6.2.2", "3.6.3", "3.6.4.2", "3.6.4.3", "3.8.1", "3.8.2.1", "3.8.2.2", "3.8.3", "3.8.4.1"] },
  { id: questionId(P3_2024, "07.2"), paperId: P3_2024, number: "07.2", marks: 25, pageNumber: 22, specPoints: ["3.1.3", "3.1.4", "3.1.6", "3.1.7", "3.2.1.1", "3.2.2", "3.2.3", "3.2.4", "3.3.1", "3.3.2", "3.3.3", "3.3.4.1", "3.3.4.2", "3.4.2", "3.4.3", "3.5.1", "3.5.2", "3.6.1.1", "3.6.1.2", "3.6.1.3", "3.6.2.1", "3.6.2.2", "3.6.3", "3.6.4.1", "3.6.4.2", "3.6.4.3", "3.8.1", "3.8.2.2", "3.8.2.3"] },
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

  // ── 2024 Paper 2 ──
  {
    questionId: questionId(P2_2024, "01.1"),
    msAnswer: `1. A = mitochondrion
2. B = presynaptic membrane/neurone
3. C = (synaptic) vesicle(s)
4. D = synaptic gap/cleft;;
4 correct = 2 marks
2-3 correct = 1 mark
0-1 correct = 0 marks
A. Accept mitochondria/crista(e).
B. Accept synaptic knob/bulb or motor neurone.
B. Accept nerve cell for neurone.`,
    whyExplanation: `Two marks for naming all 4 parts (A-D). 2-3 correct = 1 mark. Be precise: 'mitochondrion', 'presynaptic membrane/neurone', '(synaptic) vesicle(s)', 'synaptic gap/cleft'.`,
    specLinks: ["3.6.1"],
  },
  {
    questionId: questionId(P2_2024, "01.2"),
    msAnswer: `1. Acetylcholine/neurotransmitter diffuses (across synaptic cleft);
2. (Acetylcholine/neurotransmitter) attaches to receptors on the sarcolemma;
3. Sodium ions enter leading to depolarisation/action potential;
4. Calcium (ions) released by endoplasmic/sarcoplasmic reticulum;
Incorrect sequence, penalise one mark.
2. Accept postsynaptic membrane for sarcolemma.
3. Accept Na+ for sodium ions.
3. \`Sodium ion channels opening' on its own is not enough.
4. Accept Ca2+ / Ca (ions not required as given in question).`,
    whyExplanation: `Sequence at neuromuscular junction: ACh diffuses → binds sarcolemma receptors → Na⁺ enters → depolarisation/action potential → Ca²⁺ released from sarcoplasmic reticulum. Sequence order matters — one mark deducted for wrong order. 'Sodium ion channels opening' alone insufficient for MP3.`,
    specLinks: ["3.6.1", "3.6.2"],
  },
  {
    questionId: questionId(P2_2024, "01.3"),
    msAnswer: `1. (Inside postsynaptic neurone/membrane/axon) is more negative OR Membrane potential is below resting potential OR Potential difference (across membrane) is greater;
2. More sodium ions (required to enter) for depolarisation OR More sodium ions (required to enter) for action potential OR Prevents sodium ions causing depolarisation;
1. Accept answers which refer to a numerical decrease in the resting potential.
1. Reject \`reduces potential difference'.
2. Accept to \`reach threshold' or \`generator potential' for \`action potential'.
2. Accept Na+ for sodium ions.`,
    whyExplanation: `Hyperpolarisation → inside more negative (MP1) → larger Na⁺ influx needed to reach threshold for action potential (MP2) → inhibits transmission. Avoid 'reduces potential difference' — it actually increases it.`,
    specLinks: ["3.6.1"],
  },
  {
    questionId: questionId(P2_2024, "02.1"),
    msAnswer: `Correct answer of 5 / 5.4 / 5.44 x 10^-2 = 2 marks;;
Incorrect answer but shows 5 / 54 / 544 (ignore position of any decimal point or preceding/subsequent zeros) = 1 mark;
10^-2 is essential for two marks.`,
    whyExplanation: `New sarcomere length = 2 µm × (1 - 0.20) = 1.6 µm. Total = 34 × 1.6 = 54.4 µm = 0.0544 mm = 5.44 × 10⁻² mm. The 10⁻² is required for full marks.`,
    specLinks: ["3.6.2", "3.1.1"],
  },
  {
    questionId: questionId(P2_2024, "02.2"),
    msAnswer: `H-zone decreases, I-band decreases, A-band no change;`,
    whyExplanation: `H-zone (myosin only) and I-band (actin only) shorten as actin slides in. A-band (length of myosin filament) stays the same.`,
    specLinks: ["3.6.2"],
  },
  {
    questionId: questionId(P2_2024, "02.3"),
    msAnswer: `1. Fast (fibres) contract quickly whereas slow (fibres) contract slowly OR Fast (fibres) used for short time whereas slow (fibres) used for long time;
2. Fast (fibres mainly) use anaerobic respiration OR Slow (fibres) use aerobic respiration;
3. Fast (fibres) produce ATP quickly OR Slow (fibres) produce ATP slowly OR Less ATP/energy (per glucose) from anaerobic respiration OR More ATP/energy (per glucose) from aerobic respiration;
4. Glycogen is a store of glucose OR Glycogen hydrolysed to glucose OR Glycogenolysis;
3. Reject \`produce energy'.`,
    whyExplanation: `Fast fibres: short burst, anaerobic, quick ATP, need large glycogen store. Slow fibres: endurance, aerobic, more ATP per glucose. Glycogen → glucose for respiration. Compare both types for each mark.`,
    specLinks: ["3.6.2"],
  },
  {
    questionId: questionId(P2_2024, "03.1"),
    msAnswer: `1. (Percentage of light absorbed at each wavelength) correlates (with rate of photosynthesis);
2. High(er)/increases (rate of photosynthesis) with blue and red light and low(er)/decreases (rate of photosynthesis) with green light;
1. Ignore directly proportional.
2. Reject \`no photosynthesis with green light'.`,
    whyExplanation: `Two conclusions: (1) correlation between % light absorbed and photosynthesis rate. (2) Higher rate with blue/red (high absorption), lower with green (low absorption). Don't say 'directly proportional' or 'no photosynthesis with green'.`,
    specLinks: ["3.4.1"],
  },
  {
    questionId: questionId(P2_2024, "03.2"),
    msAnswer: `1. Intensity/brightness of light (at each wavelength)
2. Carbon dioxide concentration
3. Temperature
4. Water OR Humidity;;
3 correct = 2 marks
2 correct = 1 mark
0-1 correct = 0 marks
Ignore pH and nutrients.
1. Accept \`distance of/from light source'.
1. Reject sunlight.`,
    whyExplanation: `Three controlled variables needed: light intensity, CO₂ concentration, temperature. Water/humidity also accepted. pH and nutrients ignored.`,
    specLinks: ["3.4.1"],
  },
  {
    questionId: questionId(P2_2024, "03.3"),
    msAnswer: `1. ATP and reduced NADP;
2. ATP provides energy;
3. GP reduced to triose phosphate;
1. Accept NADPH or NADPH2 or NADP + H for reduced NADP.
3. Must have idea of reduction. Accept GP converted to triose phosphate using reduced NADP.
3. Accept TP for triose phosphate.`,
    whyExplanation: `Light-dependent reaction produces ATP and reduced NADP. ATP provides energy; reduced NADP reduces GP → triose phosphate. 'Reduction' must be conveyed for MP3.`,
    specLinks: ["3.4.1"],
  },
  {
    questionId: questionId(P2_2024, "04.1"),
    msAnswer: `1. Cross with homozygous recessive (fly) OR Cross with a black (fly) OR Cross with gg (fly);
2. Black offspring/flies then is heterozygous/Gg OR All grey offspring/flies then is homozygous/GG;
Alternative: DNA base sequencing and compare with known alleles; OR Electrophoresis and gene probes.`,
    whyExplanation: `Test cross: cross with homozygous recessive (black, gg). Black offspring → parent was Gg. All grey → parent was GG. DNA sequencing/electrophoresis accepted as alternative.`,
    specLinks: ["3.4.3"],
  },
  {
    questionId: questionId(P2_2024, "04.2"),
    msAnswer: `(If sex-linked) grey/male fly would only have/pass on grey/dominant allele OR (If sex-linked) females would receive the grey/dominant allele OR (If sex-linked) no female (offspring) would be black OR (If sex-linked) male (parent) could not have been heterozygous;
Accept G for dominant allele and g for recessive allele.`,
    whyExplanation: `If sex-linked, grey male (X^G Y) passes X^G to all daughters → all daughters grey. Observing black females (X^g X^g) means father must have X^g, which grey male can't provide → gene not sex-linked.`,
    specLinks: ["3.4.3"],
  },
  {
    questionId: questionId(P2_2024, "04.3"),
    msAnswer: `1. Correct answer of 18 (%) = 2 marks;;
2. Incorrect answer but shows understanding that 2pq = heterozygous/carriers = 1 mark;
1. Accept 0.18 for one mark.`,
    whyExplanation: `Grey = dominant. 19% grey means 81% black = q² = 0.81. q = 0.9, p = 0.1. Heterozygous = 2pq = 2×0.1×0.9 = 0.18 = 18%.`,
    specLinks: ["3.4.3"],
    commonMistakes: `Treating 19% grey as p² instead of realising black-bodied (recessive) = q² = 0.81.`,
  },
  {
    questionId: questionId(P2_2024, "04.4"),
    msAnswer: `1. RrGG and Rrgg;
2. RrGg, (x2), rrGg, (and RRGg);
3. Curly(-winged), grey(-bodied) and Normal(-winged), grey(-bodied) and ratio 2 : 1;
Accept the alleles in any order.
Note: If no mark awarded allow one principle mark when parental genotypes are incorrect but correct dihybrid genotypes shown.`,
    whyExplanation: `Parents: RrGG × Rrgg. Rr×Rr gives RR:Rr:rr (1:2:1) but RR is lethal → surviving 2Rr:1rr. GG×gg gives all Gg. Offspring: RrGg (curly, grey) : rrGg (normal, grey) = 2:1.`,
    specLinks: ["3.4.3"],
  },
  {
    questionId: questionId(P2_2024, "05.1"),
    msAnswer: `1. Use a grid OR Divide field/area into squares;
2. Method of obtaining random coordinates/numbers e.g. calculator/computer/random numbers table/generator;
3. Count number/frequency in a quadrat;
4. Large sample and calculate mean number (per quadrat);
5. Multiply mean number of plants per m2 by area of field OR Divide area of field by area of quadrat x mean number;
4. If a specific number is given it must be 10 or more.
5. Do not allow \`scale up' without further qualification.`,
    whyExplanation: `Random sampling with quadrats: grid + random coordinates → count per quadrat → large sample (≥10) → mean → extrapolate to field area. Must describe how to obtain random coordinates and how to scale up.`,
    specLinks: ["3.7.1"],
  },
  {
    questionId: questionId(P2_2024, "05.2"),
    msAnswer: `1. Interspecific (competition);
2. Less/no light (for potato plant) so less/no photosynthesis;
3. Less nitrates/nitrogen to produce amino acids/protein/DNA/RNA/ATP OR Less phosphate/phosphorus to produce DNA/RNA/phospholipids/RuBP/GP/triose phosphate/NADP/ATP;
3. Accept any named organic nitrogen or phosphorus containing molecule.`,
    whyExplanation: `Interspecific competition (different species). Fat hen (2m tall) outcompetes for light → less photosynthesis. Also absorbs nitrates/phosphates → less available for potato DNA/protein/ATP synthesis.`,
    specLinks: ["3.7.1"],
  },
  {
    questionId: questionId(P2_2024, "05.3"),
    msAnswer: `Correct answer of 6.69 / 6.7 = 2 marks;;
Incorrect answer but shows 669 / 67 (ignore position of any decimal point) = 1 mark
OR Shows 0.012 = 1 mark
OR Shows 8.47 / 8.5 = 1 mark
OR Shows 8.69 = 1 mark`,
    whyExplanation: `550 plants × 20000 seeds = 11,000,000. Viable = ×0.79 = 8,690,000. Mass = ×0.77 mg = 6,691,300 mg ÷ 1,000,000 = 6.69 kg. One mark for correct intermediate, two for 6.69/6.7 kg.`,
    specLinks: ["3.1.1"],
  },
  {
    questionId: questionId(P2_2024, "06.1"),
    msAnswer: `1. SAN releases (wave of) electrical activity;
2. (So) atria contract (at the same time);
3. AVN relays/passes electrical activity after a (short) delay;
4. (Via) Purkyne tissue in/and bundle of His;
5. (So) ventricles contract (at the same time from bottom upwards);
Penalise one mark for incorrect sequence.
1 and 3. Accept \`impulse/s' or \`wave of depolarisation' for electrical activity but reject \`signal', \`message' once only.
4. Accept \`Purkinje' for Purkyne.`,
    whyExplanation: `SAN → atria contract → AVN (delays) → Purkyne/bundle of His → ventricles contract from apex up. Sequence marks — one mark deducted for wrong order. 'Signal'/'message' rejected once.`,
    specLinks: ["3.6.1"],
  },
  {
    questionId: questionId(P2_2024, "06.2"),
    msAnswer: `1. Significant with age, hyperthyroidism, and high blood pressure (P < 0.05);
2. Most significant with high blood pressure OR Least significant with hyperthyroidism;
3. Not significant with high LDL (P > 0.05);
4. (With) age, high blood pressure and hyperthyroidism reject the null hypothesis OR (With) high LDL accept the null hypothesis;
1, 2 and 3. Reject \`results are significant' / \`results not significant' once only.`,
    whyExplanation: `P < 0.05 = significant. Age (0.004), high BP (0.001), hyperthyroidism (0.018) are significant → reject null. High LDL (0.222) not significant → accept null. High BP has lowest P = strongest association.`,
    specLinks: ["3.1.5"],
    commonMistakes: `Saying 'results are significant' instead of 'the association/correlation is significant'.`,
  },
  {
    questionId: questionId(P2_2024, "07.1"),
    msAnswer: `Experiment 1 with 3 bands and experiment 2 with 5 bands in correct positions = 2 marks;;
Experiment 1 with 3 bands and experiment 2 with 5 bands but not in correct positions = 1 mark;
The second band from the top must be in the same position for both experiments.`,
    whyExplanation: `BamH1 alone: 2 cut sites → 3 fragments. BamH1 + HindIII: 4 cut sites → 5 fragments. The fragment between first BamH1 and first HindIII is the same in both — second band from top must match.`,
    specLinks: ["3.4.4"],
  },
  {
    questionId: questionId(P2_2024, "07.2"),
    msAnswer: `1. (Separate) DNA fragments/ladder of known sizes/lengths;
2. Compare position/distance/bands with unknown fragment(s);
1. Ignore mass.`,
    whyExplanation: `DNA ladder (known sizes) run alongside unknowns. Compare migration distance to determine unknown fragment sizes. Smaller fragments travel further.`,
    specLinks: ["3.4.4"],
  },
  {
    questionId: questionId(P2_2024, "07.3"),
    msAnswer: `4 or four;`,
    whyExplanation: `Circular DNA (plasmid) with 4 cut sites → 4 fragments (cuts open the circle). Linear DNA with 4 cut sites → 5 fragments.`,
    specLinks: ["3.4.4"],
  },
  {
    questionId: questionId(P2_2024, "07.4"),
    msAnswer: `1. Restriction endonucleases/enzymes cuts plasmid OR Restriction endonucleases/enzymes produce \`sticky ends';
2. Ligase joins gene/DNA and plasmid OR Ligase joins \`sticky ends' OR Ligase forms phosphodiester bonds;
1. Ignore restriction enzymes cuts out the gene.
2. Ignore reference to hydrogen bonds.`,
    whyExplanation: `Restriction endonuclease cuts plasmid at recognition site → sticky ends. DNA ligase forms phosphodiester bonds to seal the gene into the plasmid.`,
    specLinks: ["3.4.4"],
  },
  {
    questionId: questionId(P2_2024, "08.1"),
    msAnswer: `1. Increasing IAA concentration increases (cell wall) plasticity OR IAA activates enzymes which increases (cell wall) plasticity;
2. Increase in (cell wall) plasticity results in cell elongation;
1 and 2. Accept \`stretching' for plasticity. Reject \`elasticity' once only.
2. Idea of cell elongation or increase in cell length must be conveyed.`,
    whyExplanation: `IAA → increased cell wall plasticity (MP1) → cell wall stretches → cell elongates (MP2). Must link plasticity to elongation, not just IAA to elongation.`,
    specLinks: ["3.5.2"],
  },
  {
    questionId: questionId(P2_2024, "08.2"),
    msAnswer: `Correct answer of 570 (%) = 2 marks;;
Answer or working shows 560 / 566 / 567 (%) = 1 mark
Answer of 120 (%) = 1 mark`,
    whyExplanation: `At 10⁻⁸: 1.2 mm. At 10⁻⁵: 8.0 mm. % increase = (8.0-1.2)/1.2 × 100 = 566.7% → 570% to 2 sf. One mark for 560/566/567%, two marks for 570%.`,
    specLinks: ["3.1.1"],
    commonMistakes: `Not rounding to 2 significant figures (leaving 566.7%).`,
  },
  {
    questionId: questionId(P2_2024, "08.3"),
    msAnswer: `1 part/cm3 of 10^-1/stock/GA and/to 9 parts/cm3 of (distilled) water, then 1 part/cm3 (of 10^-2) and/to 9 parts/cm3 of (distilled) water;
Accept any volumes equivalent in parts to example provided.`,
    whyExplanation: `10⁻¹ → 10⁻³ requires two 10-fold dilutions. Take 1 part stock + 9 parts water → 10⁻². Take 1 part of that + 9 parts water → 10⁻³.`,
    specLinks: ["3.1.1"],
  },
  {
    questionId: questionId(P2_2024, "08.4"),
    msAnswer: `Max 3 marks from mark points 3 to 8.
1. (Use distilled) water (control) and different (GA) concentrations and 10 (stem) segments in each;
2. Measure (length of) stem/segments at start and at end OR Determine increase/change in length;
3. (Place stems in same) volume of solution/GA;
4. (Leave for same period of) time;
5. (Same) temperature;
6. (Same) species/type (of plant);
7. (Same) age (of plant);
8. (Same) diameter/thickness of stem/segments;
3 to 8. Ignore pH, carbon dioxide, humidity, nutrients, and light.`,
    whyExplanation: `Set up control (water) + multiple GA concentrations. Measure initial and final length. Max 3 marks from controlled variables: volume of solution, time, temperature, same species, same age/stage, same stem diameter.`,
    specLinks: ["3.1.1", "3.5.2"],
  },
  {
    questionId: questionId(P2_2024, "09.1"),
    msAnswer: `1. Type I do not produce insulin OR Type II do produce insulin;
2. In type II receptors/cells less sensitive/responsive to insulin OR In type II receptors/cells are insulin \`resistant';
3. Weight not linked to type I diabetes OR Weight linked to type II diabetes;
1. Accept \`Type I lack insulin' or is \`due to an immune response' or \`beta cells non-functional'.
3. Accept \`obesity' for \`weight'.`,
    whyExplanation: `Two reasons weight loss helps Type II not Type I: Type I = no insulin production (autoimmune) — weight loss can't fix that. Type II = insulin resistance — weight loss improves cell sensitivity. Weight/obesity is a Type II risk factor, not Type I.`,
    specLinks: ["3.5.3"],
  },
  {
    questionId: questionId(P2_2024, "09.2"),
    msAnswer: `1. Computer-generated list so no bias OR Selection of volunteers was random so no bias;
2. Large sample size so representative/reliable;
3. Two years so effect (could be) long term;
4. Control so comparison possible;
5. (Large) range/variety of ages so (age range) representative OR age is not a factor;
2. Accept \`large number of health centres' and accept \`380/190' for \`large sample size'.`,
    whyExplanation: `Three validity features: random selection (no bias), large sample (representative), 2-year duration (long-term effect), control group (comparison), wide age range (generalisable). Explain *why* each supports validity.`,
    specLinks: ["3.1.1"],
  },
  {
    questionId: questionId(P2_2024, "09.3"),
    msAnswer: `Correct answer of 71 = 2 marks;;
Answer of 142 = 1 mark
OR 80 OR 9 in working = 1 mark`,
    whyExplanation: `190 per group. Group P remission: 0.421×190 = 79.99. Group Q: 0.047×190 = 8.93. Difference = 79.99-8.93 = 71.06 → 71.`,
    specLinks: ["3.1.1"],
  },
  {
    questionId: questionId(P2_2024, "09.4"),
    msAnswer: `Max 3 marks from mark points 5 to 9.
1. Percentage/number in remission and percentage/number with weight loss is higher for group P;
2. High percentage with weight loss (15 kg) in both groups achieved remission;
3. Some with weight gain achieved remission;
4. Less than 50% in group P achieved remission;
5. Only shows results for volunteers with less than 5 years of diabetes;
6. No results for those over 60 years (of age) OR No results for those under 25 years;
7. No statistical test to see if significant difference (in results);
8. (Only shows remission) not cure OR Remission not (necessarily) long term;
9. Mass/weight (of volunteers) at beginning not known;
7. Reject \`to see if results are significant'.`,
    whyExplanation: `Balanced evaluation. For: Group P higher remission (42.1% vs 4.7%), 15kg weight loss → high remission in both groups. Against: <50% in P achieved remission, limited to <5 years T2D, age 25-60 only, no statistical test, remission ≠ cure, initial weight unknown.`,
    specLinks: ["3.1.1", "3.5.3"],
  },
  {
    questionId: questionId(P2_2024, "10.1"),
    msAnswer: `1. Mutations/genotype/alleles;
2. Environment/habitat OR (Natural) selection;
3. Epigenetics;
4. Crossing over;
5. Independent segregation/assortment (of homologous chromosomes);
6. Random fusion of gametes OR Random fertilisation;
2. Accept named different habitats.
4. Accept recombination.`,
    whyExplanation: `Phenotypic diversity from: mutations/alleles, environment/selection, epigenetics, crossing over, independent segregation, random fertilisation. Two distinct factors needed.`,
    specLinks: ["3.4.3"],
  },
  {
    questionId: questionId(P2_2024, "10.2"),
    msAnswer: `1. Provides camouflage;
2. (So) not seen by predators/prey OR Less predation OR Obtain/catch (more) prey;
2. Accept descriptions of reduced predation e.g. \`fewer are eaten'.`,
    whyExplanation: `Colour change → camouflage → avoids predators or ambushes prey more effectively.`,
    specLinks: ["3.7.3"],
  },
  {
    questionId: questionId(P2_2024, "10.3"),
    msAnswer: `Mark point 1 required for max marks
1. (Geckos in) same habitat/environment/area OR No geographical isolation/separation (between geckos);
2. (Possibly) allopatric speciation as different (areas of same) habitat(s);
3. (Could lead to) separate gene pools OR Reproductive isolation;
4. Mutation(s);
5. Selection for (both) extremes/colours OR Disruptive selection (occurs) as two extremes/colours;
6. (Analysis shows that) diurnal geckos are a distinct (genetic) group;
7. (Genomes/DNA indicates geckos are) same species;
4. Reject mutation(s) if context incorrect e.g., \`mutate to adapt'.`,
    whyExplanation: `Sympatric speciation requires same habitat (MP1, essential). Disruptive selection favours extremes (pale on walls, dark on trees). Different microhabitats could lead to reproductive isolation → separate gene pools. But genome data shows still same species → speciation incomplete.`,
    specLinks: ["3.4.3"],
    commonMistakes: `Missing MP1 (same habitat) — required for max marks.`,
  },
  {
    questionId: questionId(P2_2024, "10.4"),
    msAnswer: `1. Compare DNA base/nucleotide sequence OR Compare banding/position of DNA fragments;
2. A distinct (group) will have different alleles/DNA/banding (from other group/s);
3. DNA sequencing is automated/computerised OR PCR amplifies DNA/genes OR Genetic fingerprinting/electrophoresis separates fragments/genes/alleles OR Use of DNA probes/hybridisation to identify genes/alleles;
1. Idea of \`comparison' must be conveyed.
2. Reject \`species' for \`group'.`,
    whyExplanation: `Compare DNA sequences/banding. Distinct group = different alleles/banding from others. Modern techniques: automated sequencing, PCR, electrophoresis, DNA probes. 'Comparison' must be stated.`,
    specLinks: ["3.4.4", "3.4.3"],
  },
  {
    questionId: questionId(P2_2024, "10.5"),
    msAnswer: `1. Marking not toxic so does not affect survival OR Marking not visible to predators OR Marking does not wash/rub off so recaptured (geckos) identified;
2. Time/delay after release so (geckos) spread (in the population) OR Time/delay before recapture so (geckos) spread (in the population);
3. (Population =) (number in) first sample × (number in) second sample divided by (number) marked in second sample / number recaptured;
1 and 2. Ignore births, deaths, reproduction, immigration, emigration.`,
    whyExplanation: `Two precautions: marking must be harmless/invisible to predators/durable (MP1); allow time for marked animals to disperse before second sample (MP2). Formula: N = (n₁ × n₂) / m₂.`,
    specLinks: ["3.7.1"],
  },

  // ── 2024 Paper 3 ──
  {
    questionId: questionId(P3_2024, "01.1"),
    msAnswer: `1. (Cell-surface) membrane
2. Protein
3. Antigen
4. Plasma
5. Active
6. Herd;;;
(6 correct = 3 marks, 4-5 correct = 2 marks, 2-3 correct = 1 mark, 0-1 correct = 0 marks)
2. Accept immunoglobulin or glycoprotein.
2. Ignore tertiary.
2. Ignore polypeptide.
3. Accept complementary/specific.
3. Ignore identical.
5. Ignore artificial.
5. Ignore primary.`,
    whyExplanation: `Recall of key immunology terms. Six blanks, marks awarded by total correct: 6=3, 4-5=2, 2-3=1. Specific accepted alternatives: 'immunoglobulin' for protein, 'complementary/specific' for antigen.`,
    specLinks: ["3.2.4", "3.1.4"],
    commonMistakes: `Forgetting 'cell-surface' before membrane. Using 'tertiary' or 'polypeptide' for protein (rejected). Using 'identical' for antigen (rejected). Using 'artificial' or 'primary' for active immunity (rejected).`,
  },
  {
    questionId: questionId(P3_2024, "01.2"),
    msAnswer: `1. (High rate of) mutation;
2. (High) genetic diversity;
3. HIV in cells could (still) spread infection;
4. HIV (DNA) embeds/inserts itself in host DNA;
5. Lack of funding/money (for research/development);
6. HIV causes fewer T cells, so immune response (to the vaccine) does not happen;
(1 max)
1. Accept antigenic variability OR descriptions of antigenic variability.
6. Accept \`HIV destroys/kills T cells\` for \`HIV causes reduced T cells\`.
6. Accept \`so B cells not activated\` for \`so immune response (to the vaccine) does not happen\`.
6. Ignore immune cells destroyed.`,
    whyExplanation: `One mark for any valid reason why HIV vaccine development is hard. Key reasons: high mutation rate → antigenic variability; hides in host cells; destroys T cells needed for immune response; lack of funding.`,
    specLinks: ["3.2.4", "3.4.3"],
    commonMistakes: `General immune system statements without linking to HIV's specific mechanisms. 'Immune cells destroyed' without specifying T cells.`,
  },
  {
    questionId: questionId(P3_2024, "01.3"),
    msAnswer: `(Ciprofloxacin)
1. (HIV) has RNA OR (HIV) does not have DNA;
(Penicillin)
2. (HIV) has no cell wall OR (HIV) does not contain murein;
(2 marks)
1. Ignore any prefixes to RNA.
1. Reject references to single stranded DNA.
2. Reject any references to incorrect viral structures, eg viruses have a cell membrane OR a cell wall made of chitin.`,
    whyExplanation: `Two marks, one per antibiotic. Ciprofloxacin targets DNA — HIV is an RNA virus. Penicillin targets murein cell walls — HIV has no cell wall. Must state the *absence* of the target structure in HIV.`,
    specLinks: ["3.2.1.1", "3.2.4"],
    commonMistakes: `Saying HIV has 'single-stranded DNA' (rejected). Stating HIV has a 'cell wall made of chitin' (rejected). Not explicitly stating HIV *lacks* the target.`,
  },
  {
    questionId: questionId(P3_2024, "02.1"),
    msAnswer: `Accept any two of the following for 1 mark;
Volume/mass soda lime
Concentration of soda lime
Number/mass of woodlice
Age of woodlice
Same woodlice
Species/type of woodlice
Time for woodlice to acclimatise to (water bath) temperature
(Starting) concentration of oxygen (inside the apparatus)
Light intensity
(1 mark)
Accept weight/volume of woodlice for number/mass of woodlice.
Ignore \`amount\` for concentration/volume/weight/mass.`,
    whyExplanation: `One mark for any two valid controlled variables — factors that could affect respiration rate or drop movement other than temperature. Amount/concentration of soda lime, number/mass/type of woodlice, initial oxygen concentration.`,
    specLinks: ["3.5.2", "3.1.7", "3.3.1", "3.1.8", "3.2.1.1"],
    commonMistakes: `Stating 'amount of soda lime' without specifying volume/mass/concentration (ignored).`,
  },
  {
    questionId: questionId(P3_2024, "02.2"),
    msAnswer: `1. Open the (3-way) tap;
2. Push/press the syringe (down);
(2 marks)
1. Accept descriptions of opening the tap, eg push/move/turn the tap.
2. Accept descriptions of the pushing the syringe down, eg apply pressure to the syringe.`,
    whyExplanation: `Two marks for two actions to reset the respirometer: open the tap, then push the syringe. Both required.`,
    specLinks: ["3.5.2"],
    commonMistakes: `Only stating one action. Not specifying the tap must be opened first.`,
  },
  {
    questionId: questionId(P3_2024, "02.3"),
    msAnswer: `1. No woodlice and all other conditions/apparatus/equipment the same;
2. To show that (respiring) woodlice are causing the drop to move OR To show that (respiring) woodlice are taking up the oxygen OR To show that (respiring) woodlice are causing the change in volume/pressure;
(2 marks)
1. Accept other inert objects instead of woodlice eg glass beads.
1. Accept dead woodlice for no woodlice.
2. Accept to show that (respiring) woodlice are affecting the results.
2. Accept \`no other factor(s)\` OR no other named factor OR \`nothing else\` for woodlice.`,
    whyExplanation: `Two marks: setup (identical but no living woodlice) + purpose (prove the drop movement is caused by woodlice respiration, not environmental factors). Both needed.`,
    specLinks: ["3.5.2"],
    commonMistakes: `Not stating 'all other conditions the same'. Saying 'for comparison' without explaining what's being controlled.`,
  },
  {
    questionId: questionId(P3_2024, "02.4"),
    msAnswer: `Correct answer of 0.11 = 3 marks;;;
0.10816247795/0.1082600897/0.1082173395 = 2 marks (answer not to 2 dp)
Evidence of (3.14 x 1.25^2 x 25) / ((5 x 60) x 3.78) and incorrect answer to 2 dp = 2 marks (for input error into calculator)
0.41 = 2 marks (mean rate in mm3 s^-1 for 3.78 g of woodlice)
32.45/32.48/32.47 = 2 marks (mean rate in mm3 g^-1 in 5 minutes)
0.43 = 2 marks (used diameter instead of radius in calculation)
122.65625/122.767857142/122.718463 = 1 mark (volume of oxygen taken up in 5 minutes)`,
    whyExplanation: `Three marks for correct oxygen uptake rate. Steps: 1) volume = π×r²×l = 3.14×1.25²×25 = 122.66 mm³. 2) time = 5×60 = 300 s. 3) rate = 122.66 ÷ (300×3.78) = 0.108... → 0.11 mm³ s⁻¹ g⁻¹. Marks for correct intermediates.`,
    specLinks: ["3.5.2", "3.1.7"],
    commonMistakes: `Using diameter (2.5 mm) instead of radius (1.25 mm). Not converting minutes to seconds. Not dividing by mass.`,
  },
  {
    questionId: questionId(P3_2024, "03.1"),
    msAnswer: `1. As surface area to volume ratio increases, metabolic rate increases OR (Humans with) a large surface area to volume ratio have a high/fast metabolic rate;
2. (A large(r) surface area to volume ratio will) lose more heat;
3. (A high(er) rate of metabolism/respiration) releases/provides/replaces heat OR (A high(er) rate of metabolism/respiration) maintains body temperature;
(3 marks)
Accept the converse for all marking points.
1. Accept the relationship is proportional.
3. Reject produces energy/heat energy.`,
    whyExplanation: `Three-mark chain: higher SA:V → more heat loss (MP2) → higher metabolic rate to replace heat (MP3). Must state the positive correlation first (MP1). Converse scores.`,
    specLinks: ["3.3.1", "3.5.2"],
    commonMistakes: `Not linking all three points in a chain. Saying 'produces heat energy' (rejected). Not explicitly stating 'lose more heat'.`,
  },
  {
    questionId: questionId(P3_2024, "03.2"),
    msAnswer: `Person A and correct ratio of 23.7:1 OR 23.8:1 = 3 marks;;;
Person A and correct ratio (23.75349227:1) not to 3 sf = 2 marks
Person A and correct answer not expressed as a ratio = 2 marks
Person B and correct ratio of 23.7 OR 23.8:1 = 2 marks
Person B and 26.0:1 = 2 marks (correct calculations, wrong person)
Evidence of 2.14 and 1.61 in working = 1 mark
Evidence of 0.09 and 0.06(2) in working = 1 mark
(3 marks)
Ignore named person alone.
If no person remove 1 mark.`,
    whyExplanation: `Calculate SA:V for both persons using Mosteller formula (√(height×mass)/60 for SA; mass/1010 for volume). Person A: SA=2.138 m², V=0.0900 m³, ratio=23.8:1. Person B: SA=1.609 m², V=0.0620 m³, ratio=26.0:1. Person A has smaller ratio → named for 3 marks.`,
    specLinks: ["3.3.1"],
    commonMistakes: `Not using square root in surface area formula. Wrong significant figures. Not naming which person.`,
  },
  {
    questionId: questionId(P3_2024, "03.3"),
    msAnswer: `Due to a typographical error, this question has been discounted and all candidates will receive 1 mark, even the non-attempts.`,
    whyExplanation: `Question discounted — typographical error in question paper. All candidates awarded 1 mark.`,
    specLinks: ["3.3.1"],
  },
  {
    questionId: questionId(P3_2024, "03.4"),
    msAnswer: `(Gill) lamella(e) and (gill) filament(s);
(1 mark)
Accept primary and secondary lamellae.
Ignore (gill) arch and (gill) rakers.`,
    whyExplanation: `One mark for two structures. Gill filaments and lamellae increase surface area for gas exchange. 'Primary and secondary lamellae' also accepted.`,
    specLinks: ["3.3.2"],
    commonMistakes: `Naming gill arch or rakers (ignored). Only naming one structure.`,
  },
  {
    questionId: questionId(P3_2024, "04.1"),
    msAnswer: `Put the (stiffness) scores (for each concentration) in (value/rank) order and found middle value;
(1 mark)
Accept descriptions of (rank/value) order, eg smallest to largest.
Accept find the (+2 1)th term/value.`,
    whyExplanation: `One mark for median method: arrange data in order, find the middle value.`,
    specLinks: ["3.4.7"],
    commonMistakes: `Saying 'find the middle value' without mentioning ordering first.`,
  },
  {
    questionId: questionId(P3_2024, "04.2"),
    msAnswer: `Max 4 for mark points 3 to 9
For
1. (All concentrations) reduced stiffness (compared with 0 mg kg^-1);
2. (Reduced stiffness) could mean less damage/pain OR (Reduced stiffness) could improve movement/mobility
Against
3. No idea of range/SD OR No statistical tests, so do not know if differences are due to chance/significant;
4. No result for 37.5 OR No data between 25.0 and 50.0;
5. Not clear if enzyme/damage is the same (as OA);
6. All mice had stiffness, so not (completely) effective/cured OR Only reduced the amount of stiffness;
7. (Investigation) carried out in mice OR (Investigation) not carried out in humans;
8. (Investigation) only six weeks OR Do not know long-term effect;
9. Small sample/20 (mice) in each group OR 20 (mice) is a small sample size;
(5 max)
3. Do not accept results unqualified.`,
    whyExplanation: `Five marks for balanced evaluation. For: drug reduced stiffness at all concentrations vs control → less pain/improved mobility. Against: no statistical tests, missing 37.5 mg/kg data point, mice not humans, only 6 weeks, 20 mice per group, only reduced not cured, enzyme damage may not mimic OA.`,
    specLinks: ["3.8.3", "3.8.4.1", "3.4.7"],
    commonMistakes: `Only arguing one side. 'Results are significant' without statistical test evidence (rejected). Not linking limitations to human applicability.`,
  },
  {
    questionId: questionId(P3_2024, "05.1"),
    msAnswer: `Mark as pairs: 1 and 2 OR 3 and 4
1. Deletion/translocation;
2. Could mean triplet(s)/codon(s) missing OR Could mean amino acid(s) missing (from the polypeptide/SURF1);
3. Substitution/inversion/addition/duplication/deletion/translocation;
4. Could result in a (premature) stop triplet/codon;
(2 max)
2. Reject could mean an amino acid is not produced.`,
    whyExplanation: `Two marks as pairs. Deletion/translocation → missing codons → missing amino acids (shorter). Any mutation → premature stop codon → early termination (shorter). Must link mutation type to the mechanism.`,
    specLinks: ["3.4.3", "3.4.2"],
    commonMistakes: `'Amino acid is not produced' (rejected — should say 'missing from the sequence'). Not explaining the mechanism linking mutation to shorter polypeptide.`,
  },
  {
    questionId: questionId(P3_2024, "05.2"),
    msAnswer: `Correct answer of 3 (people) = 3 marks;;;
3.462564706/3.48/3.45 (or any correct rounding down to 1dp) = 2 marks (answer not to the nearest whole number)
23 = 2 marks (number of Faroe Islanders with nuclear mutations)
4 = 2 marks (not factored in that only 80% of mutations are in nuclear DNA)
29 = 1 mark (number of Faroe Islanders with LS)
(3 marks)`,
    whyExplanation: `Three marks. Steps: 1) LS cases in Faroe Islands = 49053÷1700 = 28.85. 2) Nuclear DNA mutations = 28.85×0.80 = 23.08. 3) SURF1 mutations = 23.08×0.15 = 3.46 → 3 people. Marks for correct intermediates.`,
    specLinks: ["3.4.7"],
    commonMistakes: `Not rounding to nearest whole number. Forgetting the 80% nuclear DNA filter or 15% SURF1 filter.`,
  },
  {
    questionId: questionId(P3_2024, "05.3"),
    msAnswer: `Mark as pairs: 1 and 2 OR 3 and 4
1. Genetic drift;
2. Frequency is higher by chance OR High frequency is not due to natural selection;
3. (Only) inbreeding/interbreeding (within a population) OR No (inter)breeding with other populations OR (Inherited from) common ancestor;
4. Low genetic diversity OR Small gene pool OR Little gene flow OR Higher chance of inheriting allele OR Frequency of allele higher (in offspring);
(2 max)
3. Accept reproductively isolated.
3. Accept genetic bottleneck OR founder effect.`,
    whyExplanation: `Two marks as pairs. Genetic drift → higher frequency by chance (not selection). OR inbreeding/founder effect → small gene pool → higher chance of inheriting recessive allele. Need both the mechanism and its consequence.`,
    specLinks: ["3.4.4", "3.4.7"],
    commonMistakes: `Stating 'isolated population' without the genetic consequence. Not linking inbreeding to reduced diversity or increased allele frequency.`,
  },
  {
    questionId: questionId(P3_2024, "05.4"),
    msAnswer: `2 max for mark point 1 to 4 OR 5 to 7
Yes (no mark)
1. Some people could be heterozygous/carriers;
2. Could prevent (human) suffering/death OR Could allow for (informed) decisions about having children;
3. (But only) in families/people with a history of LS OR (only) in families/people in the Faroe Islands (where high frequency/1: 1700);
4. Cost of screening might be cheaper than cost of treating LS;
No (no mark)
5. It is rare (globally) OR (Only) 1 in 40 000 (globally);
6. Caused by (too) many genes/one of 75 genes OR Would need (too) many probes/75 probes;
7. (Too) expensive to produce tests/probes (for more than 75 different genes) OR (Too) expensive to screen all;
(3 max)`,
    whyExplanation: `Three marks for balanced evaluation. For: identify carriers, prevent suffering, cost-effective vs treatment (especially high-frequency populations). Against: globally rare (1:40000), 75+ causal genes = complex/expensive screening. Max 2 if only one side.`,
    specLinks: ["3.8.3"],
    commonMistakes: `Not providing both sides. Generic statements without linking to LS specifics (rarity, multiple genes).`,
  },
  {
    questionId: questionId(P3_2024, "06.1"),
    msAnswer: `1. A group (of organisms) of the same species in a (particular) space at a (particular) time;
2. That can (potentially) interbreed;
(2 marks)
1. Accept descriptions of \`space\` eg area, part of the world, habitat, ecosystem.
2. Accept that can produce fertile offspring.`,
    whyExplanation: `Two marks: same species in a defined space/time + ability to interbreed (produce fertile offspring). All components needed.`,
    specLinks: ["3.4.7"],
    commonMistakes: `Missing one component (same species / space / time / interbreed).`,
  },
  {
    questionId: questionId(P3_2024, "06.2"),
    msAnswer: `The number of bird species present in the woodland
(1 mark)`,
    whyExplanation: `Species richness = number of different species in an area. Correct option focuses on count of bird species in the woodland.`,
    specLinks: ["3.4.7"],
    commonMistakes: `Including all species (question specifies birds) or habitats (not part of species richness).`,
  },
  {
    questionId: questionId(P3_2024, "06.3"),
    msAnswer: `Max 3 for mark points 3 to 10
Reason for
1. The number of (bird) species increased (over 30 years);
2. Long-term study;
Reasons against
3. (Bird) species did not increase every year;
4. Don't know if the protection was for birds OR Don't know when the protection started;
5. No data from/comparison with a woodland without protection;
6. Only breeding birds recorded OR Not all bird species were recorded;
7. Only one woodland OR Protection might not be the same in all woodlands;
8. Only one day each year OR Birds migrate OR Birds might not be present on the day;
9. Number of each species not known;
10. The data is old/out of date;
(4 max)
5. Accept no control (woodland).
6. and 7. Ignore unqualified references to sample size.`,
    whyExplanation: `Four marks for balanced evaluation. For: species increased over 30 years in protected woodland. Against: fluctuating data, no control woodland, only breeding birds, single site, single-day surveys, no species counts, data is dated. Must cover both sides for full marks.`,
    specLinks: ["3.4.7"],
    commonMistakes: `Only giving one side. Generic 'small sample size' without qualification (ignored). Not linking limitations to conclusion validity.`,
  },
  {
    questionId: questionId(P3_2024, "06.4"),
    msAnswer: `Not a linear relationship;
(1 mark)
Accept descriptions of a linear relationship.
Accept not a proportional relationship.
Accept no correlation.
Accept data fluctuates.`,
    whyExplanation: `One mark for explaining why extrapolation isn't valid. The data isn't linear/proportional — it fluctuates, making future predictions unreliable.`,
    specLinks: ["3.4.7"],
    commonMistakes: `Not explicitly stating 'not linear' or 'fluctuates'.`,
  },
  {
    questionId: questionId(P3_2024, "06.5"),
    msAnswer: `1. (The bird community) becomes less similar (to the first year) OR (The bird community) becomes more dissimilar (to the first year);
2. (Suggesting) biodiversity has changed/increased;
3. Due to changes/increases in the species/birds (present) OR Due to changes in the woodland/abiotic/biotic factors;
(2 max)
1. Accept the index (of similarity) decreases.
3. Accept named examples eg change in habitat/competition/predation.`,
    whyExplanation: `Two marks: index decreases → community less similar to initial state (MP1) → biodiversity/species composition changing, characteristic of succession (MPs 2-3).`,
    specLinks: ["3.4.7"],
    commonMistakes: `Not explicitly stating 'less similar'. Not linking to biodiversity or species changing.`,
  },
  {
    questionId: questionId(P3_2024, "06.6"),
    msAnswer: `1. Climax community;
2. (Even in a climax community,) number of birds/species will change;
(2 marks)
2. Accept suitable suggestions that describe the species/bird composition changing, eg migration of birds.`,
    whyExplanation: `Two marks: near-constant similarity index = climax community (MP1). Not absolutely constant because species composition still fluctuates naturally e.g. migration (MP2).`,
    specLinks: ["3.4.7"],
    commonMistakes: `Not naming 'climax community'. Not giving a specific reason for minor fluctuations.`,
  },
  {
    questionId: questionId(P3_2024, "06.7"),
    msAnswer: `1. No significant decrease/difference as shown by SD;
2. No idea if due to human activity OR No data/measurement/evidence of human activity OR Changes could be due to natural variation;
3. LPI/index above 1970/1.0/baseline OR LPI/index increased (overall);
4. (Vertical) scale has been altered to make (changes in) LPI/index look worse;
(3 max)
2. Accept named examples of factors that could cause change, eg disease, natural disasters.
3. and 4. Accept \`biodiversity\` for LPI.`,
    whyExplanation: `Three marks arguing the headline is invalid. SD lines show no significant decrease. No evidence changes are due to human activity. LPI still above 1970 baseline. Scale may be manipulated to exaggerate apparent decrease.`,
    specLinks: ["3.4.7"],
    commonMistakes: `Not referencing SD for significance. Not questioning the 'human activities' causal claim. Not noting LPI above baseline.`,
  },
  {
    questionId: questionId(P3_2024, "07.1"),
    msAnswer: `Phosphorus-containing substances and their importance in biological systems.
(Indicative content lists relevant spec points as above).
In order to fully address the question and reach the highest mark bands students must also include at least four topics in their answer, to demonstrate a synoptic approach to the essay.`,
    whyExplanation: `Essay — synoptic, minimum four distinct topics. Cover phosphorus-containing substances: DNA/RNA, ATP, phospholipids, inorganic phosphate. For each: structure and biological importance. Detailed, linked to essay theme.`,
    specLinks: ["3.1.3", "3.1.5.1", "3.1.5.2", "3.1.6", "3.1.8", "3.2.1.1", "3.2.2", "3.2.3", "3.3.3", "3.4.1", "3.4.2", "3.4.3", "3.4.4", "3.4.7", "3.5.1", "3.5.2", "3.5.4", "3.6.2.1", "3.6.2.2", "3.6.3", "3.6.4.2", "3.6.4.3", "3.8.1", "3.8.2.1", "3.8.2.2", "3.8.3", "3.8.4.1"],
    commonMistakes: `Fewer than four topics. Isolated facts without linking to 'importance'. Significant biological errors.`,
  },
  {
    questionId: questionId(P3_2024, "07.2"),
    msAnswer: `The mechanisms and importance of transport within organisms.
(Indicative content lists relevant spec points as above).
In order to fully address the question and reach the highest mark bands students must also include at least four topics in their answer, to demonstrate a synoptic approach to the essay.`,
    whyExplanation: `Essay — synoptic, minimum four distinct topics. Cover transport mechanisms: cell membranes, mass transport in animals/plants, nerve impulses, synaptic transmission, water transport. For each: mechanism + importance. Detailed, linked.`,
    specLinks: ["3.1.3", "3.1.4", "3.1.6", "3.1.7", "3.2.1.1", "3.2.2", "3.2.3", "3.2.4", "3.3.1", "3.3.2", "3.3.3", "3.3.4.1", "3.3.4.2", "3.4.2", "3.4.3", "3.5.1", "3.5.2", "3.6.1.1", "3.6.1.2", "3.6.1.3", "3.6.2.1", "3.6.2.2", "3.6.3", "3.6.4.1", "3.6.4.2", "3.6.4.3", "3.8.1", "3.8.2.2", "3.8.2.3"],
    commonMistakes: `Fewer than four topics. Facts without linking to 'mechanisms' or 'importance'. Irrelevant material.`,
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

export function paperHasBreakdowns(pid: string): boolean {
  return PLACEHOLDER_QUESTIONS.some((q) => q.paperId === pid);
}

export function getQuestionsForSpecPoint(specId: string): Question[] {
  return PLACEHOLDER_QUESTIONS.filter((q) =>
    q.specPoints.some((s) => s === specId || s.startsWith(specId + "."))
  );
}
