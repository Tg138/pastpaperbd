// ── Generated: biology 2024 paper 3 ──
// Run: GEMINI_API_KEY=... node scripts/populate-paper.mjs 2024 3

const P3_2024 = paperId("biology", 2024, 3);

// Questions
const QUESTIONS_2024_P3: Question[] = [
  { id: questionId(P3_2024, "01.1"), paperId: P3_2024, number: "01.1", marks: 3, pageNumber: 2, specPoints: ["3.2.4 Cell recognition and the immune system", "3.1.4 Proteins"] },
  { id: questionId(P3_2024, "01.2"), paperId: P3_2024, number: "01.2", marks: 1, pageNumber: 2, specPoints: ["3.2.4 Cell recognition and the immune system", "3.4.3 Genetic diversity can arise as a result of mutation"] },
  { id: questionId(P3_2024, "01.3"), paperId: P3_2024, number: "01.3", marks: 2, pageNumber: 3, specPoints: ["3.2.1.1 Structure of eukaryotic cells", "3.2.4 Cell recognition and the immune system"] },
  { id: questionId(P3_2024, "02.1"), paperId: P3_2024, number: "02.1", marks: 1, pageNumber: 4, specPoints: ["3.5.2 Respiration", "3.1.7 Water", "3.3.1 Surface area to volume ratio", "3.1.8 Inorganic ions", "3.2.1.1 Structure of eukaryotic cells"] },
  { id: questionId(P3_2024, "02.2"), paperId: P3_2024, number: "02.2", marks: 2, pageNumber: 5, specPoints: ["3.5.2 Respiration"] },
  { id: questionId(P3_2024, "02.3"), paperId: P3_2024, number: "02.3", marks: 2, pageNumber: 5, specPoints: ["3.5.2 Respiration"] },
  { id: questionId(P3_2024, "02.4"), paperId: P3_2024, number: "02.4", marks: 3, pageNumber: 6, specPoints: ["3.5.2 Respiration", "3.1.7 Water"] },
  { id: questionId(P3_2024, "03.1"), paperId: P3_2024, number: "03.1", marks: 3, pageNumber: 7, specPoints: ["3.3.1 Surface area to volume ratio", "3.5.2 Respiration"] },
  { id: questionId(P3_2024, "03.2"), paperId: P3_2024, number: "03.2", marks: 3, pageNumber: 8, specPoints: ["3.3.1 Surface area to volume ratio"] },
  { id: questionId(P3_2024, "03.3"), paperId: P3_2024, number: "03.3", marks: 1, pageNumber: 9, specPoints: ["3.3.1 Surface area to volume ratio"] },
  { id: questionId(P3_2024, "03.4"), paperId: P3_2024, number: "03.4", marks: 1, pageNumber: 9, specPoints: ["3.3.2 Gas exchange"] },
  { id: questionId(P3_2024, "04.1"), paperId: P3_2024, number: "04.1", marks: 1, pageNumber: 10, specPoints: ["3.4.7 Investigating diversity"] },
  { id: questionId(P3_2024, "04.2"), paperId: P3_2024, number: "04.2", marks: 5, pageNumber: 11, specPoints: ["3.8.3 Using genome projects", "3.8.4.1 Recombinant DNA technology", "3.4.7 Investigating diversity"] },
  { id: questionId(P3_2024, "05.1"), paperId: P3_2024, number: "05.1", marks: 2, pageNumber: 12, specPoints: ["3.4.3 Genetic diversity can arise as a result of mutation", "3.4.2 DNA and protein synthesis"] },
  { id: questionId(P3_2024, "05.2"), paperId: P3_2024, number: "05.2", marks: 3, pageNumber: 13, specPoints: ["3.4.7 Investigating diversity"] },
  { id: questionId(P3_2024, "05.3"), paperId: P3_2024, number: "05.3", marks: 2, pageNumber: 13, specPoints: ["3.4.4 Genetic diversity and adaptation", "3.4.7 Investigating diversity"] },
  { id: questionId(P3_2024, "05.4"), paperId: P3_2024, number: "05.4", marks: 3, pageNumber: 14, specPoints: ["3.8.3 Using genome projects"] },
  { id: questionId(P3_2024, "06.1"), paperId: P3_2024, number: "06.1", marks: 2, pageNumber: 15, specPoints: ["3.4.7 Investigating diversity"] },
  { id: questionId(P3_2024, "06.2"), paperId: P3_2024, number: "06.2", marks: 1, pageNumber: 16, specPoints: ["3.4.7 Investigating diversity"] },
  { id: questionId(P3_2024, "06.3"), paperId: P3_2024, number: "06.3", marks: 4, pageNumber: 17, specPoints: ["3.4.7 Investigating diversity"] },
  { id: questionId(P3_2024, "06.4"), paperId: P3_2024, number: "06.4", marks: 1, pageNumber: 17, specPoints: ["3.4.7 Investigating diversity"] },
  { id: questionId(P3_2024, "06.5"), paperId: P3_2024, number: "06.5", marks: 2, pageNumber: 18, specPoints: ["3.4.7 Investigating diversity"] },
  { id: questionId(P3_2024, "06.6"), paperId: P3_2024, number: "06.6", marks: 2, pageNumber: 19, specPoints: ["3.4.7 Investigating diversity"] },
  { id: questionId(P3_2024, "06.7"), paperId: P3_2024, number: "06.7", marks: 3, pageNumber: 21, specPoints: ["3.4.7 Investigating diversity"] },
  { id: questionId(P3_2024, "07.1"), paperId: P3_2024, number: "07.1", marks: 25, pageNumber: 22, specPoints: ["3.1.3 Lipids", "3.1.5.1 Structure of DNA and RNA", "3.1.5.2 DNA replication", "3.1.6 ATP", "3.1.8 Inorganic ions", "3.2.1.1 Structure of eukaryotic cells", "3.2.2 All cells arise from other cells", "3.2.3 Transport across cell membranes", "3.3.3 Digestion and absorption", "3.4.1 DNA, genes and chromosomes", "3.4.2 DNA and protein synthesis", "3.4.3 Genetic diversity can arise as a result of mutation or during meiosis", "3.4.4 Genetic diversity and adaptation", "3.4.7 Investigating diversity", "3.5.1 Photosynthesis", "3.5.2 Respiration", "3.5.4 Nutrient cycles", "3.6.2.1 Nerve impulses", "3.6.2.2 Synaptic transmission", "3.6.3 Skeletal muscles", "3.6.4.2 Control of blood glucose concentration (cyclic AMP)", "3.6.4.3 Control of blood water potential", "3.8.1 Alteration of the sequence of bases in DNA can alter the structure of proteins", "3.8.2.1 Most of a cell's DNA is not translated", "3.8.2.2 Regulation of transcription and translation", "3.8.3 Using genome projects", "3.8.4.1 Recombinant DNA technology"] },
  { id: questionId(P3_2024, "07.2"), paperId: P3_2024, number: "07.2", marks: 25, pageNumber: 22, specPoints: ["3.1.3 Phospholipids", "3.1.4 Proteins", "3.1.6 ATP", "3.1.7 Water", "3.2.1.1 Structure of eukaryotic cells", "3.2.2 All cells arise from other cells", "3.2.3 Transport across cell membranes", "3.2.4 Cell recognition and the immune system", "3.3.1 Surface area to volume ratio", "3.3.2 Gas exchange", "3.3.3 Digestion and absorption", "3.3.4.1 Mass transport in animals", "3.3.4.2 Mass transport in plants", "3.4.2 DNA and protein synthesis", "3.4.3 Genetic diversity can arise as a result of mutation or during meiosis", "3.5.1 Photosynthesis", "3.5.2 Respiration", "3.6.1.1 Survival and response (IAA)", "3.6.1.2 Receptors", "3.6.1.3 Control of heart rate", "3.6.2.1 Nerve impulses", "3.6.2.2 Synaptic transmission", "3.6.3 Skeletal muscles", "3.6.4.1 Principles of homeostasis and negative feedback", "3.6.4.2 Control of blood glucose concentration", "3.6.4.3 Control of blood water potential", "3.8.1 Alteration of the sequence of bases in DNA can alter the structure of proteins", "3.8.2.2 Regulation of transcription and translation", "3.8.2.3 Gene expression and cancer"] },
];

// Breakdowns
const BREAKDOWNS_2024_P3: Breakdown[] = [
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
    whyExplanation: `This question tests recall of key immunology terms. Each correct term fills a numbered blank. Three marks are awarded based on the total number of correct answers: 6 correct for 3 marks, 4-5 for 2 marks, 2-3 for 1 mark. Pay attention to specific accepted alternatives like 'immunoglobulin' for protein, and 'complementary/specific' for antigen.`,
    specLinks: ["3.2.4 Cell recognition and the immune system", "3.1.4 Proteins"],
    commonMistakes: `Forgetting the 'cell-surface' part of membrane. Using 'tertiary' or 'polypeptide' for protein (rejected). Using 'identical' for antigen (rejected). Using 'artificial' or 'primary' for active immunity (rejected).`,
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
    whyExplanation: `One mark for any valid reason why an HIV vaccine is hard to develop. Key reasons include HIV's high mutation rate leading to antigenic variability, its ability to hide in host cells, or its destruction of T cells which are crucial for immune response. Lack of funding is also a valid point.`,
    specLinks: ["3.2.4 Cell recognition and the immune system", "3.4.3 Genetic diversity can arise as a result of mutation"],
    commonMistakes: `General statements about the immune system without linking to HIV's specific mechanisms. Saying 'immune cells destroyed' without specifying T cells.`,
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
    whyExplanation: `Two marks, one for each antibiotic. Ciprofloxacin targets DNA, but HIV is an RNA virus, so it's ineffective. Penicillin targets murein cell walls, but HIV is a virus and lacks a cell wall (and murein). You must state the *absence* of the target structure/molecule in HIV.`,
    specLinks: ["3.2.1.1 Structure of eukaryotic cells", "3.2.4 Cell recognition and the immune system"],
    commonMistakes: `Saying HIV has 'single-stranded DNA' (rejected). Stating HIV has a 'cell membrane' or 'cell wall made of chitin' (rejected). Not explicitly stating that HIV *lacks* the target structure.`,
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
    whyExplanation: `One mark for any two valid controlled variables. These are factors that could affect the rate of respiration or the movement of the liquid drop, other than temperature. Examples include the amount/concentration of CO2 absorbent (soda lime), the number/mass/type of woodlice, or initial oxygen concentration.`,
    specLinks: ["3.5.2 Respiration", "3.1.7 Water", "3.3.1 Surface area to volume ratio", "3.1.8 Inorganic ions", "3.2.1.1 Structure of eukaryotic cells"],
    commonMistakes: `Stating 'amount of soda lime' without specifying volume/mass/concentration (ignored).`,
  },
  {
    questionId: questionId(P3_2024, "02.2"),
    msAnswer: `1. Open the (3-way) tap;
2. Push/press the syringe (down);
(2 marks)
1. Accept descriptions of opening the tap, eg push/move/turn the tap.
2. Accept descriptions of the pushing the syringe down, eg apply pressure to the syringe.`,
    whyExplanation: `Two marks for describing the two actions needed to reset the respirometer. First, open the tap to allow air in/out, then push the syringe to move the liquid. Both actions are required.`,
    specLinks: ["3.5.2 Respiration"],
    commonMistakes: `Only stating one action. Not specifying '3-way' tap.`,
  },
  {
    questionId: questionId(P3_2024, "02.3"),
    msAnswer: `1. No woodlice and all other conditions/apparatus/equipment the same;
2. To show that (respiring) woodlice are causing the drop to move OR To show that (respiring) woodlice are taking up the oxygen OR To show that (respiring) woodlice are causing the change in volume/pressure;
(2 marks)
1. Accept other inert objects instead of woodlice eg glass beads.
1. Accept dead woodlice for no woodlice.
1. Accept descriptions of \`all other conditions/apparatus/equipment the same\` eg same investigation.
2. Accept to show that (respiring) woodlice are affecting the results.
2. Accept \`no other factor(s)\` OR no other named factor OR \`nothing else\` for woodlice.`,
    whyExplanation: `Two marks: one for describing the control setup, and one for explaining its purpose. The control should be identical to the experimental setup but *without* the respiring organisms (e.g., empty tube, dead woodlice, or glass beads). Its purpose is to ensure that any observed change in liquid drop movement is *only* due to the woodlice's respiration, not other environmental factors like temperature or pressure changes.`,
    specLinks: ["3.5.2 Respiration"],
    commonMistakes: `Not stating 'all other conditions the same'. Not clearly explaining *why* the control is needed (e.g., just saying 'for comparison').`,
  },
  {
    questionId: questionId(P3_2024, "02.4"),
    msAnswer: `Correct answer of 0.11 = 3 marks;;;
0.10816247795/0.1082600897/0.1082173395 = 2 marks (answer not to 2 dp)
Evidence of (3.14 x 1.25^2 x 25) / ((5 x 60) x 3.78) and incorrect answer to 2 dp = 2 marks (for input error into calculator)
0.41 = 2 marks (mean rate in mm3 s^-1 for 3.78 g of woodlice)
32.45/32.48/32.47 = 2 marks (mean rate in mm3 g^-1 in 5 minutes)
0.43 = 2 marks (used diameter instead of radius in calculation)
Evidence of (3.14 x 1.25^2 x 25) / ((5 x 60) x 3.78) and incorrect answer not to 2 dp = 1 mark (for input error into calculator)
122.65625/122.767857142/122.718463 = 1 mark (volume of oxygen taken up in 5 minutes)
0.40885416/0.40922619047/0.4090615434 = 1 mark (mean rate in mm3 s^-1 for 3.78 g of woodlice and not to 2 dp)
32.44874339/32.47826909/32.46520186 = 1 mark (mean rate in mm3 g^-1 in 5 minutes and not to 2 dp)
0.4326499118/0.43286935813/0.43304358780 = 1 mark (used diameter instead of radius in calculation and not to 2 dp)
0.08 = 1 mark (distance travelled by the drop per second)
0.02 = 1 mark (just used 25 mm distance travelled by the drop and not worked out volume)`,
    whyExplanation: `Three marks for a correct calculation of oxygen uptake rate. 1. Calculate the volume of oxygen taken up: π * r^2 * l = 3.14 * (1.25 mm)^2 * 25 mm = 122.65625 mm^3. 2. Calculate the total time in seconds: 5 minutes * 60 seconds/minute = 300 seconds. 3. Calculate the rate per second per gram: (122.65625 mm^3) / (300 s * 3.78 g) = 0.10816... mm^3 s^-1 g^-1. 4. Round to 2 decimal places: 0.11 mm^3 s^-1 g^-1. Marks are awarded for correct intermediate steps or for the final correct answer. Be careful with units and rounding.`,
    specLinks: ["3.5.2 Respiration", "3.1.7 Water"],
    commonMistakes: `Using diameter instead of radius (2.5 mm instead of 1.25 mm). Not converting minutes to seconds. Not dividing by the mass of woodlice. Incorrect rounding.`,
  },
  {
    questionId: questionId(P3_2024, "03.1"),
    msAnswer: `1. As surface area to volume ratio increases, metabolic rate increases OR (Humans with) a large surface area to volume ratio have a high/fast metabolic rate;
2. (A large(r) surface area to volume ratio will) lose more heat;
3. (A high(er) rate of metabolism/respiration) releases/provides/replaces heat OR (A high(er) rate of metabolism/respiration) maintains body temperature;
(3 marks)
Accept the converse for all marking points.
1. Accept the relationship is proportional.
1. Ignore 'directly' if prefixing proportional.
1. Accept the relationship is positively correlated.
2. Accept lose heat faster/more easily.
3. Accept (a higher rate of metabolism/respiration) releases energy OR produces /generates heat.
3. Reject produces energy/heat energy.`,
    whyExplanation: `Three marks for describing and explaining the relationship. 1. State the positive correlation: higher SA:V ratio → higher metabolic rate. 2. Explain *why*: a larger SA:V ratio means more heat loss. 3. Explain the *consequence*: a higher metabolic rate (respiration) is needed to generate/replace that lost heat and maintain body temperature. The converse relationship (smaller SA:V → lower metabolic rate → less heat loss → less heat generation needed) also scores.`,
    specLinks: ["3.3.1 Surface area to volume ratio", "3.5.2 Respiration"],
    commonMistakes: `Not linking all three points in a logical chain. Saying 'produces energy/heat energy' (rejected). Not explicitly stating 'lose more heat'.`,
  },
  {
    questionId: questionId(P3_2024, "03.2"),
    msAnswer: `Person A and correct ratio of 23.7:1 OR 23.8:1 = 3 marks;;;
Person A and correct ratio (23.75349227:1) not to 3 sf = 2 marks
Person A and correct answer not expressed as a ratio = 2 marks
Person A and 2.14:0.09 = 2 marks
Person B and correct ratio of 23.7 OR 23.8:1 = 2 marks
Person B and 26.0:1 = 2 marks (correct calculations, wrong person)
Person A and answer not expressed as a ratio (23.75349227) and not to 3 sf = 1 mark
Evidence of 2.14 and 1.61 in working = 1 mark
Evidence of 0.09 and 0.06(2) in working = 1 mark
1.61:0.06(2) = 1 mark
(3 marks)
Ignore named person alone.
If no person remove 1 mark.`,
    whyExplanation: `Three marks for calculating the SA:V ratio for both persons and identifying the one with the smaller ratio, rounded to 3 significant figures. 1. Calculate Surface Area for Person A: sqrt(181 * 90.90) / 60 = 2.138 m^2. 2. Calculate Volume for Person A: 90.90 / 1010 = 0.08999 m^3. 3. Calculate SA:V for Person A: 2.138 / 0.08999 = 23.758 (23.8:1 to 3 sf). 4. Calculate Surface Area for Person B: sqrt(149 * 62.62) / 60 = 1.609 m^2. 5. Calculate Volume for Person B: 62.62 / 1010 = 0.06200 m^3. 6. Calculate SA:V for Person B: 1.609 / 0.06200 = 25.95 (26.0:1 to 3 sf). Person A has the smaller SA:V ratio. Note: The formula provided in the question paper for surface area appears to have omitted the square root symbol, but the mark scheme calculations are based on the common Mosteller formula which includes it (i.e., sqrt(height * mass) / 60). You must use the square root to get the correct answer.`,
    specLinks: ["3.3.1 Surface area to volume ratio"],
    commonMistakes: `Not using the square root in the surface area calculation (if following the question paper literally, this would lead to incorrect answers). Incorrect rounding to 3 significant figures. Not stating the person with the smaller ratio.`,
  },
  {
    questionId: questionId(P3_2024, "03.3"),
    msAnswer: `Due to a typographical error, this question has been discounted and all candidates will receive 1 mark, even the non-attempts.`,
    whyExplanation: `This question was discounted due to a typographical error in the question paper. All candidates will be awarded 1 mark.`,
    specLinks: ["3.3.1 Surface area to volume ratio"],
  },
  {
    questionId: questionId(P3_2024, "03.4"),
    msAnswer: `(Gill) lamella(e) and (gill) filament(s);
(1 mark)
Accept primary and secondary lamellae.
Ignore (gill) arch and (gill) rakers.`,
    whyExplanation: `One mark for naming two structural features of fish gills that increase surface area. The key structures are gill filaments and gill lamellae (or primary and secondary lamellae).`,
    specLinks: ["3.3.2 Gas exchange"],
    commonMistakes: `Naming gill arch or gill rakers (ignored). Only naming one feature.`,
  },
  {
    questionId: questionId(P3_2024, "04.1"),
    msAnswer: `Put the (stiffness) scores (for each concentration) in (value/rank) order and found middle value;
(1 mark)
Accept descriptions of (rank/value) order, eg smallest to largest.
Accept find the (+2 1)th term/value.`,
    whyExplanation: `One mark for describing how to find the median. This involves arranging the data in order (ascending or descending) and then identifying the middle value.`,
    specLinks: ["3.4.7 Investigating diversity"],
    commonMistakes: `Just saying 'find the middle value' without mentioning ordering the data.`,
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
    whyExplanation: `Five marks for evaluating the use of pralnacasan in humans, using all provided information. You need to provide both 'for' and 'against' arguments. For: The drug *did* reduce stiffness in mice across all tested concentrations compared to the control, suggesting potential benefit (less damage/pain, improved mobility). Against: Several limitations exist: no statistical analysis (SD/range, significance), missing data point (37.5 mg/kg), mice model (not humans), short duration (6 weeks, no long-term data), small sample size per group (20 mice), and it only *reduced* stiffness, not cured it. Also, the enzyme-induced damage might not perfectly mimic human OA. Aim for a balanced argument, covering both positive findings and significant experimental limitations.`,
    specLinks: ["3.8.3 Using genome projects", "3.8.4.1 Recombinant DNA technology", "3.4.7 Investigating diversity"],
    commonMistakes: `Not providing a balanced argument. Stating 'results are significant' without qualification (rejected). Not linking the limitations to the reliability or applicability of the results to humans.`,
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
    whyExplanation: `Two marks for naming a mutation type and explaining how it leads to a shorter polypeptide. Deletion/Translocation: If a deletion or translocation removes one or more triplets/codons, then amino acids will be missing from the polypeptide, making it shorter. Any mutation (including substitution, addition, etc.): If the mutation results in a premature stop codon, translation will terminate early, leading to a shorter polypeptide. You must link the mutation type to the specific mechanism (missing codons/amino acids OR premature stop codon).`,
    specLinks: ["3.4.3 Genetic diversity can arise as a result of mutation", "3.4.2 DNA and protein synthesis"],
    commonMistakes: `Stating 'amino acid is not produced' (rejected for deletion/translocation, it's about *missing* from the sequence). Not explaining *how* the mutation leads to a shorter polypeptide.`,
  },
  {
    questionId: questionId(P3_2024, "05.2"),
    msAnswer: `Correct answer of 3 (people) = 3 marks;;;
3.462564706/3.48/3.45 (or any correct rounding down to 1dp) = 2 marks (answer not to the nearest whole number)
23 = 2 marks (number of Faroe Islanders with nuclear mutations)
4 = 2 marks (not factored in that only 80% of mutations are in nuclear DNA)
29 = 1 mark (number of Faroe Islanders with LS)
(3 marks)`,
    whyExplanation: `Three marks for estimating the number of people in the Faroe Islands with LS caused by a SURF1 gene mutation, rounded to the nearest whole number. 1. Calculate total LS cases in Faroe Islands: 49053 / 1700 = 28.8547... 2. Calculate LS cases due to nuclear DNA mutations: 28.8547... * 0.80 = 23.0837... 3. Calculate LS cases due to SURF1 gene mutations (15% of nuclear DNA mutations): 23.0837... * 0.15 = 3.4625... 4. Round to the nearest whole number: 3 people. Marks are awarded for correct intermediate steps.`,
    specLinks: ["3.4.7 Investigating diversity"],
    commonMistakes: `Not rounding to the nearest whole number. Forgetting to apply the 80% for nuclear DNA mutations or the 15% for SURF1 gene mutations. Calculation errors.`,
  },
  {
    questionId: questionId(P3_2024, "05.3"),
    msAnswer: `Mark as pairs: 1 and 2 OR 3 and 4
1. Genetic drift;
2. Frequency is higher by chance OR High frequency is not due to natural selection;
3. (Only) inbreeding/interbreeding (within a population) OR No (inter)breeding with other populations OR (Inherited from) common ancestor;
4. Low genetic diversity OR Small gene pool OR Little gene flow OR Higher chance of inheriting allele OR Frequency of allele higher (in offspring);
(2 max)
3. Accept descriptions of inbreeding OR no interbreeding.
3. Accept reproductively isolated.
3. Accept genetic bottleneck OR founder effect.`,
    whyExplanation: `Two marks for suggesting and explaining why LS frequency is higher in isolated populations like the Faroe Islands. Genetic Drift: Due to the small, isolated population, genetic drift (random changes in allele frequency) can lead to a higher frequency of the LS allele by chance. Inbreeding/Founder Effect: Limited gene flow and inbreeding within the isolated population increase the likelihood of inheriting recessive alleles from common ancestors, leading to a smaller gene pool and higher allele frequency. You need to provide both the reason (e.g., genetic drift, inbreeding) and its consequence (e.g., higher frequency by chance, higher chance of inheriting allele).`,
    specLinks: ["3.4.4 Genetic diversity and adaptation", "3.4.7 Investigating diversity"],
    commonMistakes: `Only stating 'isolated population' without explaining the genetic consequence. Not linking inbreeding/founder effect to reduced genetic diversity or increased allele frequency.`,
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
    whyExplanation: `Three marks for evaluating genetic screening for LS, requiring a balanced argument of 'for' and 'against'. For: Screening could identify carriers, prevent suffering/death, or enable informed reproductive decisions. It might be cost-effective compared to treatment, especially in high-frequency populations (e.g., Faroe Islands) or families with a history of LS. Against: Globally, LS is rare (1 in 40,000). It's caused by mutations in many different genes (over 75), making comprehensive screening complex and expensive (many probes needed). You need to present points from both sides to achieve full marks, with a maximum of 2 marks if only one side is discussed.`,
    specLinks: ["3.8.3 Using genome projects"],
    commonMistakes: `Not providing a balanced argument. General statements without linking to the specifics of LS (rarity, multiple genes).`,
  },
  {
    questionId: questionId(P3_2024, "06.1"),
    msAnswer: `1. A group (of organisms) of the same species in a (particular) space at a (particular) time;
2. That can (potentially) interbreed;
(2 marks)
1. Accept descriptions of \`space\` eg area, part of the world, habitat, ecosystem.
2. Accept that can produce fertile offspring.`,
    whyExplanation: `Two marks for defining 'population'. It's a group of organisms of the *same species* living in a *particular space* at a *particular time*, and they must be able to *interbreed* (or produce fertile offspring). All these components are necessary.`,
    specLinks: ["3.4.7 Investigating diversity"],
    commonMistakes: `Missing one or more of the key components (same species, space, time, interbreed).`,
  },
  {
    questionId: questionId(P3_2024, "06.2"),
    msAnswer: `The number of bird species present in the woodland
(1 mark)`,
    whyExplanation: `One mark for correctly identifying the statement that represents species richness. Species richness is simply the *number of different species* in a given area. The question specifies 'bird species', so the correct option focuses on that.`,
    specLinks: ["3.4.7 Investigating diversity"],
    commonMistakes: `Including 'all species' (too broad, question is about birds), or 'habitats' (not part of species richness definition).`,
  },
  {
    questionId: questionId(P3_2024, "06.3"),
    msAnswer: `Max 3 for mark points 3 to 10
Reason for
1. The number of (bird) species increased (over 30 years);
2. Long-term study;
Reasons against
3. (Bird) species did not increase every year;
4. Don't know if the protection was for birds OR Don't know if the aim of the protection was to increase biodiversity OR Don't know when the protection started;
5. No data from/comparison with a woodland without protection;
6. Only breeding birds recorded OR Non-breeding birds may be present, but not recorded OR Not all bird species were recorded;
7. Only one woodland OR Protection might not be the same in other/all woodlands;
8. Only one day each year OR Birds breed at different times OR Birds migrate OR Birds might not be present/seen on the day (of recording);
9. Number of each species not known;
10. The data is old/out of date;
(4 max)
3. Accept some years the (bird) species decreased.
3. Accept (bird) species fluctuated.
5. Accept no control (woodland).
6. and 7. Ignore unqualified references to sample size.`,
    whyExplanation: `Four marks for evaluating the student's conclusion. You need to provide reasons *for* and *against* the conclusion, drawing from the provided text and Figure 4 (which shows an increase in bird species over 30 years). For: The data shows an increase in bird species over a long period in a protected woodland. Against: Many limitations: species richness fluctuated, no control (unprotected woodland) for comparison, only breeding birds recorded (not all birds), only one woodland studied (not generalisable), data collected only one day a year (potential for missed species/migration), no information on *when* protection started or its specific aim, and the data is old. A balanced evaluation with specific points from the text/figure is key.`,
    specLinks: ["3.4.7 Investigating diversity"],
    commonMistakes: `Only giving reasons for or against. Not linking the limitations to the validity of the conclusion. General statements like 'small sample size' without qualification (ignored).`,
  },
  {
    questionId: questionId(P3_2024, "06.4"),
    msAnswer: `Not a linear relationship;
(1 mark)
Accept descriptions of a linear relationship.
Accept not a proportional relationship.
Accept no correlation.
Accept data fluctuates.`,
    whyExplanation: `One mark for explaining why the data cannot be extrapolated beyond 1979. The graph (Figure 4, not reproduced but described as showing fluctuating bird species) indicates that the relationship is not linear or consistently trending, making future predictions unreliable.`,
    specLinks: ["3.4.7 Investigating diversity"],
    commonMistakes: `Not explicitly stating 'not linear' or 'fluctuates'.`,
  },
  {
    questionId: questionId(P3_2024, "06.5"),
    msAnswer: `1. (The bird community) becomes less similar (to the first year) OR (The bird community) becomes more dissimilar (to the first year);
2. (Suggesting) biodiversity has changed/increased;
3. Due to changes/increases in the species/birds (present) OR Due to changes in the woodland/abiotic/biotic factors;
(2 max)
1. Accept the index (of similarity) decreases.
1. Accept there is a negative correlation.
3. Accept named examples that would cause change eg change in environment/habitat/competition/predation/food sources.`,
    whyExplanation: `Two marks for linking changes in the index of similarity to succession. 1. The index of similarity decreases over time, meaning the bird community becomes less similar to the initial state. 2. This change indicates that the species composition (biodiversity) is changing, which is characteristic of succession. 3. This change is driven by alterations in species present or environmental factors.`,
    specLinks: ["3.4.7 Investigating diversity"],
    commonMistakes: `Not explicitly stating 'less similar' or 'more dissimilar'. Not linking the change to 'biodiversity' or 'species' changing.`,
  },
  {
    questionId: questionId(P3_2024, "06.6"),
    msAnswer: `1. Climax community;
2. (Even in a climax community,) number of birds/species will change;
(2 marks)
2. Accept suitable suggestions that describe the species/bird composition changing, eg migration of birds.`,
    whyExplanation: `Two marks: one for naming the stage of succession and one for explaining why the index isn't *absolutely* constant. 1. A constant (or nearly constant) index of similarity suggests a climax community. 2. Even in a climax community, there will be minor fluctuations in species numbers or composition due to natural variations (e.g., migration, disease, small environmental changes).`,
    specLinks: ["3.4.7 Investigating diversity"],
    commonMistakes: `Not naming 'climax community'. Not providing a specific reason for minor fluctuations.`,
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
    whyExplanation: `Three marks for suggesting reasons why the headline "The LPI shows human activities cause significant decrease in biodiversity" is not valid. 1. The dotted lines (± 2 standard deviations) show that the LPI values are within the range of natural variation, so there's no *significant* decrease. 2. The report doesn't provide evidence to directly link any changes to *human activities*; natural variations or other factors could be responsible. 3. The LPI is still above its 1970 baseline (1.0), or even shows an overall increase in some periods, contradicting a 'decrease'. 4. The alternative Figure 7 (not reproduced, but implied to be manipulated) might have altered the vertical scale to exaggerate the perceived decrease.`,
    specLinks: ["3.4.7 Investigating diversity"],
    commonMistakes: `Not referring to the standard deviation to argue against significance. Not questioning the link to 'human activities'. Not noting the LPI is still above baseline or that the scale might be misleading.`,
  },
  {
    questionId: questionId(P3_2024, "07.1"),
    msAnswer: `Phosphorus-containing substances and their importance in biological systems.
(Indicative content lists relevant spec points as above).
In order to fully address the question and reach the highest mark bands students must also include at least four topics in their answer, to demonstrate a synoptic approach to the essay.
Students may be able to show the relevance of other topics from the specification.
Note, other topics from beyond the specification can be used, providing they relate to the title and contain factually correct material of at least an A-level standard. Credit should not be given for topics beyond the specification which are below A-level standard.`,
    whyExplanation: `This is an essay question requiring a synoptic approach. To score highly, you must discuss at least four distinct topics from the specification that involve phosphorus-containing substances (e.g., DNA/RNA, ATP, phospholipids, inorganic phosphate ions). For each substance, explain its structure and its biological importance. The explanation should be detailed, comprehensive, use appropriate terminology, and clearly link different topics to the essay theme.`,
    specLinks: ["3.1.3 Lipids", "3.1.5.1 Structure of DNA and RNA", "3.1.5.2 DNA replication", "3.1.6 ATP", "3.1.8 Inorganic ions", "3.2.1.1 Structure of eukaryotic cells", "3.2.2 All cells arise from other cells", "3.2.3 Transport across cell membranes", "3.3.3 Digestion and absorption", "3.4.1 DNA, genes and chromosomes", "3.4.2 DNA and protein synthesis", "3.4.3 Genetic diversity can arise as a result of mutation or during meiosis", "3.4.4 Genetic diversity and adaptation", "3.4.7 Investigating diversity", "3.5.1 Photosynthesis", "3.5.2 Respiration", "3.5.4 Nutrient cycles", "3.6.2.1 Nerve impulses", "3.6.2.2 Synaptic transmission", "3.6.3 Skeletal muscles", "3.6.4.2 Control of blood glucose concentration (cyclic AMP)", "3.6.4.3 Control of blood water potential", "3.8.1 Alteration of the sequence of bases in DNA can alter the structure of proteins", "3.8.2.1 Most of a cell's DNA is not translated", "3.8.2.2 Regulation of transcription and translation", "3.8.3 Using genome projects", "3.8.4.1 Recombinant DNA technology"],
    commonMistakes: `Discussing fewer than four distinct topics. Providing isolated facts without linking them to the 'importance' aspect of the question. Including irrelevant material or making significant biological errors.`,
  },
  {
    questionId: questionId(P3_2024, "07.2"),
    msAnswer: `The mechanisms and importance of transport within organisms.
(Indicative content lists relevant spec points as above).
In order to fully address the question and reach the highest mark bands students must also include at least four topics in their answer, to demonstrate a synoptic approach to the essay.
Students may be able to show the relevance of other topics from the specification.
Note, other topics from beyond the specification can be used, providing they relate to the title and contain factually correct material of at least an A-level standard. Credit should not be given for topics beyond the specification which are below A-level standard.`,
    whyExplanation: `This is an essay question requiring a synoptic approach. To score highly, you must discuss at least four distinct topics from the specification that involve transport mechanisms and their importance (e.g., transport across cell membranes, mass transport in animals/plants, nerve impulses, synaptic transmission, water transport). For each mechanism, explain how it works and why it is important for the organism. The explanation should be detailed, comprehensive, use appropriate terminology, and clearly link different topics to the essay theme.`,
    specLinks: ["3.1.3 Phospholipids", "3.1.4 Proteins", "3.1.6 ATP", "3.1.7 Water", "3.2.1.1 Structure of eukaryotic cells", "3.2.2 All cells arise from other cells", "3.2.3 Transport across cell membranes", "3.2.4 Cell recognition and the immune system", "3.3.1 Surface area to volume ratio", "3.3.2 Gas exchange", "3.3.3 Digestion and absorption", "3.3.4.1 Mass transport in animals", "3.3.4.2 Mass transport in plants", "3.4.2 DNA and protein synthesis", "3.4.3 Genetic diversity can arise as a result of mutation or during meiosis", "3.5.1 Photosynthesis", "3.5.2 Respiration", "3.6.1.1 Survival and response (IAA)", "3.6.1.2 Receptors", "3.6.1.3 Control of heart rate", "3.6.2.1 Nerve impulses", "3.6.2.2 Synaptic transmission", "3.6.3 Skeletal muscles", "3.6.4.1 Principles of homeostasis and negative feedback", "3.6.4.2 Control of blood glucose concentration", "3.6.4.3 Control of blood water potential", "3.8.1 Alteration of the sequence of bases in DNA can alter the structure of proteins", "3.8.2.2 Regulation of transcription and translation", "3.8.2.3 Gene expression and cancer"],
    commonMistakes: `Discussing fewer than four distinct topics. Providing isolated facts without linking them to the 'mechanisms' or 'importance' aspect of the question. Including irrelevant material or making significant biological errors.`,
  },
];

// Add these to PLACEHOLDER_QUESTIONS and PLACEHOLDER_BREAKDOWNS in lib/data.ts
// Or wire them into getQuestionsForPaper / getBreakdown directly.
