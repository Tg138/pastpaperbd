// ── Generated: biology 2024 paper 1 ──
// Run: GEMINI_API_KEY=... node scripts/populate-paper.mjs 2024 1

const P1_2024 = paperId("biology", 2024, 1);

// Questions
const QUESTIONS_2024_P1: Question[] = [
  { id: questionId(P1_2024, "01.1"), paperId: P1_2024, number: "01.1", marks: 3, pageNumber: 2, specPoints: ["3.1.2.1"] },
  { id: questionId(P1_2024, "01.2"), paperId: P1_2024, number: "01.2", marks: 1, pageNumber: 3, specPoints: ["3.1.2.1"] },
  { id: questionId(P1_2024, "01.3"), paperId: P1_2024, number: "01.3", marks: 1, pageNumber: 3, specPoints: ["3.1.2.1"] },
  { id: questionId(P1_2024, "01.4"), paperId: P1_2024, number: "01.4", marks: 3, pageNumber: 4, specPoints: ["3.1.2.1", "3.4.1", "3.4.2"] },
  { id: questionId(P1_2024, "02.1"), paperId: P1_2024, number: "02.1", marks: 3, pageNumber: 5, specPoints: ["3.4.2"] },
  { id: questionId(P1_2024, "02.2"), paperId: P1_2024, number: "02.2", marks: 1, pageNumber: 5, specPoints: ["3.4.1"] },
  { id: questionId(P1_2024, "02.3"), paperId: P1_2024, number: "02.3", marks: 3, pageNumber: 6, specPoints: ["3.1.2.1", "3.4.2"] },
  { id: questionId(P1_2024, "03.1"), paperId: P1_2024, number: "03.1", marks: 3, pageNumber: 8, specPoints: ["3.4.4"] },
  { id: questionId(P1_2024, "03.2"), paperId: P1_2024, number: "03.2", marks: 2, pageNumber: 8, specPoints: ["3.4.1"] },
  { id: questionId(P1_2024, "03.3"), paperId: P1_2024, number: "03.3", marks: 1, pageNumber: 9, specPoints: ["3.4.4"] },
  { id: questionId(P1_2024, "03.4"), paperId: P1_2024, number: "03.4", marks: 2, pageNumber: 9, specPoints: ["3.4.1"] },
  { id: questionId(P1_2024, "03.5"), paperId: P1_2024, number: "03.5", marks: 2, pageNumber: 10, specPoints: ["3.1.1.2"] },
  { id: questionId(P1_2024, "04.1"), paperId: P1_2024, number: "04.1", marks: 1, pageNumber: 11, specPoints: ["3.1.2.1"] },
  { id: questionId(P1_2024, "04.2"), paperId: P1_2024, number: "04.2", marks: 3, pageNumber: 11, specPoints: ["3.1.2.1"] },
  { id: questionId(P1_2024, "04.3"), paperId: P1_2024, number: "04.3", marks: 1, pageNumber: 11, specPoints: ["3.1.2.1"] },
  { id: questionId(P1_2024, "04.4"), paperId: P1_2024, number: "04.4", marks: 3, pageNumber: 12, specPoints: ["3.4.2"] },
  { id: questionId(P1_2024, "04.5"), paperId: P1_2024, number: "04.5", marks: 2, pageNumber: 13, specPoints: ["3.4.2"] },
  { id: questionId(P1_2024, "05.1"), paperId: P1_2024, number: "05.1", marks: 4, pageNumber: 14, specPoints: ["3.1.4"] },
  { id: questionId(P1_2024, "05.2"), paperId: P1_2024, number: "05.2", marks: 1, pageNumber: 14, specPoints: ["3.1.4"] },
  { id: questionId(P1_2024, "05.3"), paperId: P1_2024, number: "05.3", marks: 2, pageNumber: 15, specPoints: ["3.1.1.2"] },
  { id: questionId(P1_2024, "05.4"), paperId: P1_2024, number: "05.4", marks: 3, pageNumber: 15, specPoints: ["3.1.4"] },
  { id: questionId(P1_2024, "06.1"), paperId: P1_2024, number: "06.1", marks: 3, pageNumber: 16, specPoints: ["3.1.3"] },
  { id: questionId(P1_2024, "06.2"), paperId: P1_2024, number: "06.2", marks: 1, pageNumber: 16, specPoints: ["3.1.3"] },
  { id: questionId(P1_2024, "06.3"), paperId: P1_2024, number: "06.3", marks: 4, pageNumber: 17, specPoints: ["3.1.3", "3.1.2.2"] },
  { id: questionId(P1_2024, "07.1"), paperId: P1_2024, number: "07.1", marks: 3, pageNumber: 18, specPoints: ["3.1.1.2"] },
  { id: questionId(P1_2024, "07.2"), paperId: P1_2024, number: "07.2", marks: 2, pageNumber: 19, specPoints: ["3.1.2.2"] },
  { id: questionId(P1_2024, "07.3"), paperId: P1_2024, number: "07.3", marks: 3, pageNumber: 20, specPoints: ["3.1.2.2"] },
  { id: questionId(P1_2024, "07.4"), paperId: P1_2024, number: "07.4", marks: 1, pageNumber: 20, specPoints: ["3.1.1.2"] },
  { id: questionId(P1_2024, "08.1"), paperId: P1_2024, number: "08.1", marks: 2, pageNumber: 21, specPoints: ["3.4.3"] },
  { id: questionId(P1_2024, "08.2"), paperId: P1_2024, number: "08.2", marks: 3, pageNumber: 22, specPoints: ["3.4.3", "3.1.1.2"] },
  { id: questionId(P1_2024, "08.3"), paperId: P1_2024, number: "08.3", marks: 3, pageNumber: 23, specPoints: ["3.4.3", "3.1.1.2"] },
  { id: questionId(P1_2024, "09.1"), paperId: P1_2024, number: "09.1", marks: 1, pageNumber: 24, specPoints: ["3.1.1.2"] },
  { id: questionId(P1_2024, "09.2"), paperId: P1_2024, number: "09.2", marks: 1, pageNumber: 25, specPoints: ["3.7.1"] },
  { id: questionId(P1_2024, "09.3"), paperId: P1_2024, number: "09.3", marks: 4, pageNumber: 25, specPoints: ["3.7.1"] },
  { id: questionId(P1_2024, "10.1"), paperId: P1_2024, number: "10.1", marks: 6, pageNumber: 26, specPoints: ["3.4.1"] },
  { id: questionId(P1_2024, "10.2"), paperId: P1_2024, number: "10.2", marks: 5, pageNumber: 27, specPoints: ["3.4.1"] },
  { id: questionId(P1_2024, "10.3"), paperId: P1_2024, number: "10.3", marks: 4, pageNumber: 28, specPoints: ["3.1.2.1", "3.2.1", "3.2.2"] },
];

// Breakdowns
const BREAKDOWNS_2024_P1: Breakdown[] = [
  {
    questionId: questionId(P1_2024, "01.1"),
    msAnswer: `1. Circle(s)/shape(s) drawn around H in one of the HO groups of the glycerol and the OH group of the fatty acid;
2. Ester (bond);
3. Condensation (reaction);`,
    whyExplanation: `This question assesses understanding of triglyceride formation. Marks are awarded for correctly identifying the atoms removed (H from glycerol's hydroxyl, OH from fatty acid's carboxyl) during the condensation reaction, which forms an ester bond. This process links a fatty acid to glycerol, releasing a water molecule. The question tests knowledge of the chemical reactions involved in forming biological macromolecules.`,
    specLinks: ["3.1.2.1"],
    commonMistakes: `Students might circle the wrong parts of the molecules or incorrectly name the bond or reaction.`,
  },
  {
    questionId: questionId(P1_2024, "01.2"),
    msAnswer: `Stearic (acid);`,
    whyExplanation: `This question tests knowledge of the classification of fatty acids. Saturated fatty acids contain only single carbon-carbon bonds, meaning they are 'saturated' with hydrogen atoms. Students need to identify the fatty acid from the (unseen) Table 1 that fits this description, demonstrating their recall of lipid structures.`,
    specLinks: ["3.1.2.1"],
    commonMistakes: `Misidentifying a saturated fatty acid, possibly confusing it with an unsaturated one.`,
  },
  {
    questionId: questionId(P1_2024, "01.3"),
    msAnswer: `As (number of C) double bonds increases, melting point decreases
OR
As unsaturation increases, melting point decreases
OR
As saturation increases, melting point increases;`,
    whyExplanation: `This question requires students to interpret data from Table 1 (which would show fatty acid structures and melting points) and deduce the relationship. Unsaturated fatty acids (with double bonds) have kinks in their chains, preventing them from packing as closely as saturated fatty acids, leading to lower melting points. The mark is awarded for correctly stating this inverse relationship or its converse, demonstrating data analysis skills.`,
    specLinks: ["3.1.2.1"],
    commonMistakes: `Not clearly stating the relationship or getting the direction of the relationship wrong.`,
  },
  {
    questionId: questionId(P1_2024, "01.4"),
    msAnswer: `1. More unsaturated fatty acids increases fluidity (in (cell-surface membrane);
2. (Making cell-surface) membrane more fluid/flexible;
3. Easy to engulf;`,
    whyExplanation: `This question tests the understanding of how membrane composition affects its properties and function. Unsaturated fatty acids in phospholipids increase membrane fluidity due to their kinks preventing tight packing. A more fluid and flexible membrane can more easily change shape, allowing for increased phagocytosis (engulfing of substances) as the membrane can readily form vesicles. This links lipid structure to cell membrane function.`,
    specLinks: ["3.1.2.1", "3.4.1", "3.4.2"],
    commonMistakes: `Not linking unsaturated fatty acids directly to increased fluidity or not explaining how increased fluidity facilitates phagocytosis.`,
  },
  {
    questionId: questionId(P1_2024, "02.1"),
    msAnswer: `1. (Movement of) polar/charged molecules;
2. (Facilitated diffusion) movement down a concentration gradient via carrier/channel protein;
3. (Active transport) movement against a concentration gradient via carrier protein using ATP;`,
    whyExplanation: `This question requires a clear description of two key transport mechanisms across cell membranes. For facilitated diffusion, marks are awarded for mentioning the movement of polar/charged molecules down a concentration gradient using carrier or channel proteins. For active transport, marks are awarded for movement against a concentration gradient using carrier proteins and requiring ATP. The distinction between the two processes is crucial for full marks.`,
    specLinks: ["3.4.2"],
    commonMistakes: `Confusing the use of ATP or the direction of the concentration gradient between the two processes. Not specifying carrier/channel proteins for facilitated diffusion or carrier proteins for active transport.`,
  },
  {
    questionId: questionId(P1_2024, "02.2"),
    msAnswer: `(Highly) folded cell(-surface) membrane;`,
    whyExplanation: `This question tests basic anatomical knowledge of cell structures. Microvilli are finger-like projections or folds of the cell-surface membrane, typically found in cells specialised for absorption (like those in the ileum), which increase the surface area for efficient uptake of substances. This demonstrates recall of cell adaptations.`,
    specLinks: ["3.4.1"],
    commonMistakes: `Describing them as hairs or not specifying they are folds of the cell-surface membrane.`,
  },
  {
    questionId: questionId(P1_2024, "02.3"),
    msAnswer: `1. Combine/mix/join with bile salts;
2. Make (more) soluble (in water);
3. (Micelles) breakdown close to cells
OR
Maintain high(er) concentration at cell(-surface membrane)
OR
Transport to cells/lining;
4. Diffuses (into cells/ileum);`,
    whyExplanation: `This question requires a description of how fat-soluble substances, like vitamin A, are absorbed, highlighting the role of micelles. Marks are awarded for explaining that vitamin A combines with bile salts to form micelles, making it more soluble. These micelles then break down near the ileum cells, releasing vitamin A which, being fat-soluble, can then diffuse directly across the cell-surface membrane into the cells. This tests the understanding of lipid absorption.`,
    specLinks: ["3.1.2.1", "3.4.2"],
    commonMistakes: `Confusing the role of micelles with digestion, or not specifying diffusion as the final transport mechanism into the cell.`,
  },
  {
    questionId: questionId(P1_2024, "03.1"),
    msAnswer: `1. Diaphragm (muscle) contracts pulling diaphragm down;
2. External intercostal muscles contract pulling/moving ribs upwards/outwards;
3. (Causes) volume increase and pressure decrease in thoracic cavity;`,
    whyExplanation: `This question tests the understanding of the mechanics of inspiration. Marks are awarded for describing the contraction of the diaphragm (moving down) and external intercostal muscles (pulling ribs up and out). These actions collectively increase the volume of the thoracic cavity, which in turn decreases the pressure inside, causing air to rush in. This demonstrates knowledge of the gas exchange system.`,
    specLinks: ["3.4.4"],
    commonMistakes: `Confusing external and internal intercostal muscles, or not linking muscle contractions to changes in volume and pressure.`,
  },
  {
    questionId: questionId(P1_2024, "03.2"),
    msAnswer: `1. (Create a) single/few layer(s) of cells/tissue;
2. (So) light can pass through;`,
    whyExplanation: `This question assesses the practical aspects of preparing samples for optical microscopy. Thin slices are essential to ensure that light can pass through the specimen, allowing for clear observation. If the tissue is too thick, light cannot penetrate effectively, leading to a blurry or opaque image. It also prevents overlapping cells, making individual cells distinguishable. This tests practical skills in microscopy.`,
    specLinks: ["3.4.1"],
    commonMistakes: `Only stating that light can pass through without explaining why thinness is needed (e.g., to avoid overlapping cells).`,
  },
  {
    questionId: questionId(P1_2024, "03.3"),
    msAnswer: `Bronchiole(s);`,
    whyExplanation: `This question requires identification of a specific structure within the lung tissue from an image. Given the context of alveolar tissue, tube A is likely a bronchiole, which are small airways leading to the alveoli. This tests recall of the structure of the gas exchange system.`,
    specLinks: ["3.4.4"],
    commonMistakes: `Confusing bronchioles with bronchi or other respiratory structures.`,
  },
  {
    questionId: questionId(P1_2024, "03.4"),
    msAnswer: `Correct answer for 2 marks, 75 (m);;
Accept for 1 mark, evidence of
Real/actual = Image / Mag(nification) (correct rearranged magnitude word equation)
OR
� 40 (correct denominator from equation)
OR
3000 (�m) (correct mean diameter)
OR
� 1000 (correct conversion of mm to �m)
OR
0.075 (correct calculation with incorrect units (mm))
OR
Answer shows correct number but incorrect number of decimal places eg 0.75 / 7.5 / 750`,
    whyExplanation: `This is a calculation question involving mean, magnification, and unit conversion. First, calculate the mean diameter from Table 2 (3 mm). Then, use the magnification formula: Real size = Image size / Magnification (3 mm / 40 = 0.075 mm). Finally, convert mm to µm (0.075 mm * 1000 µm/mm = 75 µm). Marks are awarded for the correct final answer or for showing correct intermediate steps like the mean, the division by magnification, or the unit conversion, demonstrating quantitative skills.`,
    specLinks: ["3.4.1"],
    commonMistakes: `Errors in calculating the mean, incorrect application of the magnification formula, or incorrect unit conversion (e.g., to m instead of µm, or wrong power of 10).`,
  },
  {
    questionId: questionId(P1_2024, "03.5"),
    msAnswer: `1. (Uncertainty �) 1 (mm);
2. (Percentage error) 25 (%);`,
    whyExplanation: `This question tests understanding of measurement uncertainty and percentage error. For a ruler with 1 mm graduations, the uncertainty is typically taken as the smallest division, which is 1 mm. The percentage error is calculated as (Uncertainty / Measurement) * 100. So, (1 mm / 4 mm) * 100 = 25%. Marks are awarded for both the correct uncertainty and the correct percentage error calculation, assessing practical data analysis skills.`,
    specLinks: ["3.1.1.2"],
    commonMistakes: `Stating uncertainty as 0.5 mm (which is sometimes used for analogue scales but 1mm is also acceptable for graduations), or errors in the percentage error calculation.`,
  },
  {
    questionId: questionId(P1_2024, "04.1"),
    msAnswer: `2;`,
    whyExplanation: `This question tests knowledge of carbohydrate classification. Sucrose is a disaccharide made of glucose and fructose. Glucose and fructose are both monosaccharides. Therefore, there are two different types of monosaccharides present in molasses. This demonstrates recall of basic carbohydrate chemistry.`,
    specLinks: ["3.1.2.1"],
    commonMistakes: `Counting sucrose as a monosaccharide or only counting one of the monosaccharides.`,
  },
  {
    questionId: questionId(P1_2024, "04.2"),
    msAnswer: `1. Heat with Benedict's (solution/reagent);
2. Red (colour/precipitate);
3. (Because) glucose/fructose is/are reducing sugars
OR
(Because) glucose/fructose is/are detected;`,
    whyExplanation: `This question requires a description of the Benedict's test and an explanation of the expected outcome for molasses. Marks are awarded for stating the need to heat the sample with Benedict's solution, the expected colour change to red (or other colours in the range), and explaining that this is due to the presence of reducing sugars (glucose and fructose) in molasses. This assesses knowledge of biochemical tests.`,
    specLinks: ["3.1.2.1"],
    commonMistakes: `Forgetting to mention heating, incorrect colour change, or incorrectly stating that sucrose is a reducing sugar.`,
  },
  {
    questionId: questionId(P1_2024, "04.3"),
    msAnswer: `1.6 / 1.62;`,
    whyExplanation: `This is a calculation question. First, calculate 5% of the daily energy requirement: 0.05 * 8100 kJ = 405 kJ. Then, divide this by the energy per tablespoon of molasses: 405 kJ / 250 kJ/tablespoon = 1.62 tablespoons. The mark is awarded for the correct numerical answer, demonstrating quantitative problem-solving.`,
    specLinks: ["3.1.2.1"],
    commonMistakes: `Calculation errors, or not rounding appropriately if asked (though here 1.6 or 1.62 are accepted, and 2 if rounded up).`,
  },
  {
    questionId: questionId(P1_2024, "04.4"),
    msAnswer: `1. Molasses/solution has a lower water potential
OR
Water (in beaker) has higher water potential;
2. Water moves in (across) partially/selectively permeable bladder;
3. Increased (molasses/solution) volume
OR
Decreased air volume;`,
    whyExplanation: `This question tests the understanding of osmosis. Marks are awarded for explaining that molasses has a lower water potential (or water in the beaker has a higher water potential). This causes water to move by osmosis from the beaker into the bladder across the partially permeable membrane. The influx of water increases the volume of the molasses solution, which in turn compresses the air in the tube, leading to an increase in air pressure. This demonstrates understanding of water potential and membrane transport.`,
    specLinks: ["3.4.2"],
    commonMistakes: `Not clearly defining the water potential gradient, or not linking the increased volume of molasses to the compression of air.`,
  },
  {
    questionId: questionId(P1_2024, "04.5"),
    msAnswer: `Suggested change
1. Diluted (molasses)
OR
Decreased (molasses) concentration
OR
Increased (molasses) water potential
OR
Decreased water potential gradient;
2. (Reduction by) 80% / 5 times
OR
(Reduction to) 20%
OR
(Used) 1 in 5 molasses to water
OR
(Used) 1 : 4 molasses to water;`,
    whyExplanation: `This question requires applying knowledge of osmosis to an experimental change. A smaller increase in air pressure indicates less water moved into the bladder, meaning a smaller water potential gradient. This would be achieved by diluting the molasses, thereby increasing its water potential (making it less negative). The calculation (160 kPa / 800 kPa = 0.2 or 20%) shows that the effect was 1/5th, implying a 5-fold dilution or a 1 in 5 concentration. Marks are awarded for suggesting the dilution and supporting it with a correct calculation, assessing experimental design and quantitative reasoning.`,
    specLinks: ["3.4.2"],
    commonMistakes: `Not linking the change in air pressure to a change in molasses concentration/water potential, or incorrect calculation.`,
  },
  {
    questionId: questionId(P1_2024, "05.1"),
    msAnswer: `Max two marks for prophase
(In prophase)
1. Chromosomes/chromatids (continue to) condense;
2. Chromosomes/chromatids (become/are) visible;
3. Chromosomes attach to spindle (fibres)
OR
Chromatids attach to spindle (fibres)
OR
Centromeres attach to spindle (fibres);
(In anaphase)
4. Centromeres divide/split;
5. Chromosomes/chromatids moved/pulled to opposite poles/sides/ends;`,
    whyExplanation: `This question tests detailed knowledge of two specific stages of mitosis. For prophase, marks are awarded for describing chromosome condensation (becoming visible) and attachment to spindle fibres. For anaphase, marks are awarded for describing the division of centromeres and the movement of sister chromatids (now considered individual chromosomes) to opposite poles of the cell. This demonstrates recall of the cell cycle.`,
    specLinks: ["3.1.4"],
    commonMistakes: `Confusing the events of different mitotic stages, or not being precise about the terms (e.g., chromosomes vs. chromatids).`,
  },
  {
    questionId: questionId(P1_2024, "05.2"),
    msAnswer: `Number of cells in mitosis � Total number of cells (in field of view);`,
    whyExplanation: `This question assesses the formula for calculating the mitotic index. The mitotic index is a measure of the proportion of cells undergoing mitosis in a given sample. It is calculated by dividing the number of cells in mitosis by the total number of cells observed. This tests knowledge of quantitative measures in cell biology.`,
    specLinks: ["3.1.4"],
    commonMistakes: `Forgetting to divide by the total number of cells, or incorrectly multiplying by 100 (as it's a proportion, not a percentage unless specified).`,
  },
  {
    questionId: questionId(P1_2024, "05.3"),
    msAnswer: `1. Strong/significant negative (correlation);
2. (Because probability of) correlation occurring by chance is less than / < 0.05 / 5%
OR
(Because) more than / > 0.95 / 95% (probability) that correlation is not due to chance;
3. Reject null hypothesis;`,
    whyExplanation: `This question tests the interpretation of statistical results. An 'r' value of -0.98 indicates a strong negative correlation. The 'P' value of < 0.05 means that the probability of this correlation occurring by chance is less than 5%, which is considered statistically significant. Therefore, the null hypothesis (that there is no correlation) can be rejected. This assesses data analysis and statistical reasoning.`,
    specLinks: ["3.1.1.2"],
    commonMistakes: `Not specifying "strong" or "negative" for the correlation, or misinterpreting the meaning of the P-value.`,
  },
  {
    questionId: questionId(P1_2024, "05.4"),
    msAnswer: `1. More/larger proportion of cells in mitosis closer to tip
OR
Fewer/lower proportion of cells in mitosis further from tip;
2. More/larger proportion of cells in interphase further from tip
OR
Fewer/smaller proportion of cells in interphase closer to tip;
3. No cells in mitosis at/after 2 (mm)
OR
All cells in interphase at/after 2 (mm);`,
    whyExplanation: `This question requires interpreting data from Figure 4 (which would show mitotic index or proportion of cells in stages at different distances from the root tip). Root tips are regions of active cell division. Marks are awarded for observing that the proportion of cells in mitosis decreases with increasing distance from the tip, while the proportion of cells in interphase increases. This indicates that cell division is concentrated at the tip, and cells further away are primarily growing or differentiating. This tests data interpretation in a biological context.`,
    specLinks: ["3.1.4"],
    commonMistakes: `Not making clear comparisons between distance and cell cycle stage, or not using specific data points from the figure (if available).`,
  },
  {
    questionId: questionId(P1_2024, "06.1"),
    msAnswer: `1. (Has) codon(s)       (Has) anticodon;
2. No hydrogen/H bonds/base pairs       Has hydrogen/H bonds/base pairs;
3. No amino acid binding site       Has amino acid binding site;
4. Linear/straight/not folded       \`Clover (leaf' shape)/folded;
5. Long/many nucleotides/bases       Short/few nucleotides/bases;`,
    whyExplanation: `This question tests knowledge of the structural differences between mRNA and tRNA, both crucial for protein synthesis. Marks are awarded for three distinct comparative differences, such as mRNA having codons while tRNA has anticodons, tRNA having hydrogen bonds (forming a folded structure) while mRNA is linear, or tRNA having an amino acid binding site which mRNA lacks. This demonstrates recall of nucleic acid structures.`,
    specLinks: ["3.1.3"],
    commonMistakes: `Not making direct comparisons, or listing features without contrasting them between the two molecules.`,
  },
  {
    questionId: questionId(P1_2024, "06.2"),
    msAnswer: `Phe, Arg, Ala;`,
    whyExplanation: `This question requires applying the genetic code (from Table 3) to an mRNA sequence (Figure 5). Students need to correctly identify the amino acid for each codon in the given order: UUU codes for Phenylalanine (Phe), CGG codes for Arginine (Arg), and GCG codes for Alanine (Ala). This tests understanding of the genetic code and translation.`,
    specLinks: ["3.1.3"],
    commonMistakes: `Incorrectly reading the genetic code table or getting the order of amino acids wrong.`,
  },
  {
    questionId: questionId(P1_2024, "06.3"),
    msAnswer: `1. (Single base) substitution;
2. Guanine to thymine
OR
G to T
OR
GCC to TCC;
3. (So) Arg (still) present
OR
No change in amino acid;
4. (So) no change in primary structure
OR
(So) no change in tertiary structure
OR
(So) no change in active site (shape);`,
    whyExplanation: `This question combines knowledge of mutations, the genetic code, and enzyme structure/function. The change from CGG to AGG in mRNA indicates a single base substitution (G to T in DNA). Since both CGG and AGG code for Arginine, this is a silent mutation. Therefore, there is no change in the primary or tertiary structure of the enzyme, and consequently, no effect on its active site or function. This tests the impact of mutations on protein function.`,
    specLinks: ["3.1.3", "3.1.2.2"],
    commonMistakes: `Incorrectly identifying the type of mutation, getting the DNA change wrong, or failing to recognise that the mutation is silent and thus has no effect on the enzyme's active site or function.`,
  },
  {
    questionId: questionId(P1_2024, "07.1"),
    msAnswer: `1. Variety and D and E in left column;
2. Time and \`/ min' and Mean (time) \`/ min' in column heading only;
3. Correctly calculated times and means calculated to one decimal place;`,
    whyExplanation: `This question assesses practical skills in data handling. Marks are awarded for designing a clear table with appropriate headings and units (e.g., 'Time / minutes', 'Mean / minutes'). Students must correctly convert the times to a consistent unit (e.g., minutes and decimal seconds, or total seconds), enter the raw data accurately, and then calculate the mean for each variety, ensuring the mean is given to one decimal place as specified. This demonstrates data presentation and calculation skills.`,
    specLinks: ["3.1.1.2"],
    commonMistakes: `Incorrect units, inconsistent units, calculation errors for means, or not presenting means to the specified decimal place. Poor table structure.`,
  },
  {
    questionId: questionId(P1_2024, "07.2"),
    msAnswer: `1. More phenol/substrate in E
OR
More PPO/enzyme in E
OR
Higher PPO/enzyme activity in E;
2. (So) more enzyme-substrate/E-S complexes (form);`,
    whyExplanation: `This question asks for an explanation of differing enzyme activity between two varieties. The brown pigment forms faster in variety E, indicating higher PPO activity. Marks are awarded for suggesting that variety E either has more substrate (phenol compounds) or more enzyme (PPO), or higher PPO activity. This leads to more enzyme-substrate complexes forming per unit time, resulting in a faster reaction and quicker pigment appearance. This tests understanding of factors affecting enzyme kinetics.`,
    specLinks: ["3.1.2.2"],
    commonMistakes: `Not linking the difference in enzyme/substrate concentration to the rate of enzyme-substrate complex formation.`,
  },
  {
    questionId: questionId(P1_2024, "07.3"),
    msAnswer: `1. Use (enzyme's) higher/optimum temperature;
2. More kinetic energy
OR
(So) more active enzyme;
3. (Causing) increased rate of reaction
OR
(Causing) more enzyme-substrate complexes/collisions;
OR
4. Use (enzyme's) lower/optimum temperature
OR
Use (enzyme's) optimum pH;
5. Less denaturation;
OR
(So) more active enzyme;
6. (Causing) increased rate of reaction
OR
(Causing) more enzyme-substrate complexes/collisions;
OR
7. Crush/grind/blend/chop the apple (tissue);
8 (So) more PPO/phenol/substrate in contact with oxygen/air;
9. (Causing) increased rate of reaction
OR
(Causing) more enzyme-substrate complexes/collisions;`,
    whyExplanation: `This question asks for a modification to the method (excluding volume/mass) that would increase the rate of reaction, and an explanation. Possible changes include increasing temperature towards optimum (more kinetic energy, more collisions), adjusting to optimum pH (less denaturation, more active enzyme), or increasing surface area by crushing/chopping (more contact with oxygen/substrate). Marks are awarded for a valid change and a clear biological explanation of how it increases the reaction rate, assessing experimental design and enzyme principles.`,
    specLinks: ["3.1.2.2"],
    commonMistakes: `Suggesting changes that are already excluded (volume/mass), or providing an incomplete explanation for the increased reaction rate.`,
  },
  {
    questionId: questionId(P1_2024, "07.4"),
    msAnswer: `Measure the intensity of brown colour by comparing apple tissue with a colour chart showing a range of apple tissues of known pigment concentration.`,
    whyExplanation: `This question assesses the understanding of how to quantitatively measure enzyme activity. PPO produces a brown pigment. Measuring the intensity of this brown colour directly correlates with the amount of product formed. A colour chart with known pigment concentrations provides a semi-quantitative or quantitative way to assess this. This tests practical skills in measuring reaction rates.`,
    specLinks: ["3.1.1.2"],
    commonMistakes: `Choosing an option that measures a different variable or is not directly related to the product/substrate of this specific reaction.`,
  },
  {
    questionId: questionId(P1_2024, "08.1"),
    msAnswer: `1. (Smooth) muscle absorbs/resists/withstands high (blood) pressure;
2. Elastic (tissue/layer) stretches and recoils maintains/smooths blood pressure;
3. (Smooth) endothelium reduces friction;
4. Protein (coat) prevents (artery) wall splitting
OR
Protein (coat) absorbs/resists/withstands high (blood) pressure;`,
    whyExplanation: `This question tests knowledge of the adaptations of the aorta for its function. Marks are awarded for identifying structural features like muscle, elastic tissue, endothelium, or a protein/fibrous coat, and then explaining how each feature contributes to the aorta's role in withstanding high pressure, maintaining blood flow, or reducing friction. For example, elastic tissue allows stretching and recoiling to smooth out blood flow and maintain pressure. This demonstrates understanding of the circulatory system.`,
    specLinks: ["3.4.3"],
    commonMistakes: `Stating a feature without explaining its functional relevance, or providing an incorrect function.`,
  },
  {
    questionId: questionId(P1_2024, "08.2"),
    msAnswer: `1. Small diameters are low risk of tears so unlikely to/do not have aneurysms
OR
As diameter increases, risk of tears increases and (risk of developing) aneurysms increase;
2. Few people have/at high risk of tear
OR
Few people have/at high risk of aneurysms;
3. Diameters > / above 4.5 (cm) at high risk (of tears) so may have aneurysms;
4. (High risk of) tear does not mean aneurysm will/has occurred;`,
    whyExplanation: `This question requires careful interpretation of the provided text and Table 4. Marks are awarded for concluding that as aorta diameter increases, the risk of developing a tear (and thus an aneurysm) significantly increases. Students should also note that while a tear increases the risk, it doesn't guarantee an aneurysm has formed, and that only a small proportion of the population has very large diameters with extremely high risk. This tests data interpretation and risk assessment.`,
    specLinks: ["3.4.3", "3.1.1.2"],
    commonMistakes: `Not linking tears to aneurysms, or not using specific data from the table to support conclusions about risk and population numbers.`,
  },
  {
    questionId: questionId(P1_2024, "08.3"),
    msAnswer: `1. and 2. Correct answer of 35 / 35.1 / 35.3 / 35.7 / 36 / 40(%) = 2 marks;;
Accept for 1 mark, incorrect answer but shows:
Evidence of 45 (correct stroke volume for diseased heart)
OR
Evidence of 69.6 OR 70 (correct stroke volume for healthy heart)
OR
Evidence of 24.6 OR 25 (correct difference between stroke volumes)
OR
Evidence of 48.6 to 50 (correct calculated volume change, not percentage change)
3. (Mathematical error) incorrect rounding;`,
    whyExplanation: `This is a multi-step calculation and error identification question. First, calculate the stroke volume for each heart using the given formula. Then, calculate the percentage change in stroke volume. Finally, identify the mathematical error in the student's calculation, which is specified as incorrect rounding. Marks are awarded for the correct percentage change (2 marks) and identifying the mathematical error (1 mark), assessing quantitative skills and error analysis.`,
    specLinks: ["3.4.3", "3.1.1.2"],
    commonMistakes: `Calculation errors at any stage, especially in calculating the percentage change (e.g., dividing by the wrong value, or not multiplying by 100). Incorrectly identifying the mathematical error.`,
  },
  {
    questionId: questionId(P1_2024, "09.1"),
    msAnswer: `20;`,
    whyExplanation: `This is a simple calculation. First, find the total percentage of advertisement and rasping calls: 97.0% + 0.5% = 97.5%. Since each male made one type of call, the percentage making mating calls is 100% - 97.5% = 2.5%. Then, calculate 2.5% of 800 males: 0.025 * 800 = 20 males. This tests basic data interpretation and calculation.`,
    specLinks: ["3.1.1.2"],
    commonMistakes: `Calculation errors, or misinterpreting the percentages.`,
  },
  {
    questionId: questionId(P1_2024, "09.2"),
    msAnswer: `Add (sexually active) female(s);`,
    whyExplanation: `Mating calls are made to start and continue mating. The most direct way to increase mating calls would be to introduce the target for these calls: sexually active females. This would stimulate the males to engage in mating behaviour. This tests understanding of animal behaviour and experimental design.`,
    specLinks: ["3.7.1"],
    commonMistakes: `Suggesting changes that don't directly relate to stimulating mating behaviour, or suggesting adding more males.`,
  },
  {
    questionId: questionId(P1_2024, "09.3"),
    msAnswer: `1. Less mating/breeding
OR
Fewer offspring;
2. Fewer advertisement calls, so females not attracted
OR
Fewer advertisement calls, so males not located;
3. Fewer mating calls as males less (sexually) active;
4. More rasping calls as (more) males not (sexually) active;
5. Less time spent in courtship;`,
    whyExplanation: `This question requires synthesizing information from two tables to predict the environmental impact of EE2. Marks are awarded for stating the overall effect (less breeding/fewer offspring). The explanation should draw from the tables: EE2 causes males to make fewer advertisement calls (reducing female attraction/male location), fewer mating calls (males less sexually active), and more rasping calls (signalling non-sexual activity). Additionally, females spend less time in courtship when males are exposed to EE2. All these factors combine to reduce successful breeding, demonstrating ecological understanding.`,
    specLinks: ["3.7.1"],
    commonMistakes: `Not linking specific data points from the tables to the explanation, or not providing a clear overall effect on breeding.`,
  },
  {
    questionId: questionId(P1_2024, "10.1"),
    msAnswer: `1. Homogenise (tissue) to break open cells
OR
Homogenise (tissue) to release organelles/nuclei;
2. Filter to remove (intact) tissue/cells/debris;
3. Cold (solution) to prevent enzyme activity;
4. (Solution with) equivalent water potential to prevent osmosis
OR
(Solution with) equivalent water potential to prevent organelles bursting/shrinking;
5. Buffered (solution) to stop enzymes/protein denaturing;
6. Centrifuge/spin at low(er) speed so nuclei in pellet/move to bottom
OR
Centrifuge at low(er) speed and supernatant/solution discarded;`,
    whyExplanation: `This question tests the detailed procedure of cell fractionation and ultracentrifugation. Marks are awarded for describing the steps: homogenisation (to break cells), filtration (to remove debris), and maintaining specific conditions (cold to prevent enzyme activity, isotonic to prevent osmotic damage, buffered to prevent denaturation). Finally, the process of differential centrifugation is described, starting with a low speed to pellet the heaviest organelles (nuclei). This assesses practical knowledge of cell biology techniques.`,
    specLinks: ["3.4.1"],
    commonMistakes: `Missing key conditions (cold, isotonic, buffered), not explaining the purpose of each condition, or confusing the order/speed of centrifugation for different organelles.`,
  },
  {
    questionId: questionId(P1_2024, "10.2"),
    msAnswer: `1. DNA in nucleus codes for enzyme/protein (production);
2. Ribosomes/rough endoplasmic reticulum produce enzyme/protein
OR
Translation on ribosomes/rough endoplasmic reticulum;
3. Rough endoplasmic reticulum transports/modifies/processes enzymes/protein;
4. Mitochondria produce ATP;
5. Golgi apparatus modify/process/package/transport enzymes/protein
OR
Golgi apparatus make/transport glycoprotein
OR
Golgi apparatus forms/releases vesicles;
6. Vesicles move (protein) to cell(-surface) membrane
OR
Vesicles fuse with cell(-surface) membrane;`,
    whyExplanation: `This question requires a step-by-step description of the secretory pathway for enzymes. Marks are awarded for outlining the roles of the nucleus (DNA code), ribosomes/RER (protein synthesis), RER (transport/modification), mitochondria (ATP supply), Golgi apparatus (further modification, packaging, vesicle formation), and vesicles (transport to cell membrane for release). Transcription is explicitly excluded. This tests detailed knowledge of organelle function and protein secretion.`,
    specLinks: ["3.4.1"],
    commonMistakes: `Missing organelles, incorrect sequence of events, or not specifying the role of each organelle in the context of enzyme production and release.`,
  },
  {
    questionId: questionId(P1_2024, "10.3"),
    msAnswer: `1. Ribose, Adenine and 3 phosphates;
2. ATP to ADP + Pi by ATP hydrolase in hydrolysis (reaction);
3. ADP + Pi to ATP by ATP synthase;
4. (In) condensation (reaction);`,
    whyExplanation: `This question has two parts: describing ATP structure and outlining its breakdown/resynthesis. Marks are awarded for identifying the three components: ribose sugar, adenine base, and three phosphate groups. For breakdown, ATP is converted to ADP and inorganic phosphate by ATP hydrolase in a hydrolysis reaction. For resynthesis, ADP and Pi are converted back to ATP by ATP synthase in a condensation reaction. This tests fundamental knowledge of ATP's role as an energy currency.`,
    specLinks: ["3.1.2.1", "3.2.1", "3.2.2"],
    commonMistakes: `Incorrectly naming the components of ATP, confusing the enzymes involved, or mixing up hydrolysis and condensation reactions.`,
  },
];

// Add these to PLACEHOLDER_QUESTIONS and PLACEHOLDER_BREAKDOWNS in lib/data.ts
// Or wire them into getQuestionsForPaper / getBreakdown directly.

