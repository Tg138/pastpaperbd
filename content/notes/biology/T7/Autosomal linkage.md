# Autosomal Linkage

*AQA spec ref: 3.7.1 — Inheritance*

Mendel's Law of Independent Assortment states that alleles of different genes assort independently during meiosis. This holds when genes are on different chromosomes. But humans have ~20,000 genes distributed across only 23 chromosome pairs, so many genes must share the same chromosome. Genes that share a chromosome are **linked genes**, and they tend to be inherited together, violating Mendel's prediction. Understanding linkage is essential for interpreting inheritance data and for connecting genetics to evolutionary biology.

## What Linkage Actually Means

Think of each chromosome as a long sequence of genes. If two genes sit on the same chromosome, they will generally be pulled into the same gamete during meiosis I — they travel as a unit. This means the **parental combinations** of alleles (the combinations that existed in the parent) appear far more frequently in offspring than **recombinant combinations** (new combinations formed by crossing over).

**Example**: genes A and B are on the same chromosome. The parent has genotype AB/ab (one homologue carries A and B alleles together; the other carries a and b alleles together). If the genes were on different chromosomes (independent assortment), the four gamete types AB, Ab, aB, ab would each appear at 25%. But because A and B are linked, gametes AB and ab (parental types) appear much more often than Ab and aB (recombinant types).

## Recombination: The Exception to Linkage

Linkage is not absolute. During **prophase I** of [[Meiosis]], homologous chromosomes pair up (forming bivalents) and non-sister chromatids exchange segments at points called **chiasmata** — this is **crossing over**. Crossing over reshuffles alleles between the two homologues, producing recombinant chromosomes.

The further apart two genes are on a chromosome, the more likely a chiasma will occur between them — therefore the higher the probability of recombination. Genes very close together are rarely separated by crossing over; genes far apart (or on different chromosomes) assort nearly independently.

## Recombination Frequency and Genetic Maps

**Recombination frequency (RF)** is:

$$RF = \frac{\text{number of recombinant offspring}}{\text{total number of offspring}} \times 100\%$$

- RF < 50% → genes are **linked** (on the same chromosome)
- RF = 50% → genes behave as if unlinked (either on different chromosomes, or so far apart that crossing over between them is virtually certain)

RF also measures **genetic distance**: 1% RF = 1 **centimorgan (cM)** = 1 map unit. By measuring RF between multiple pairs of genes, a **linkage map** can be constructed showing the relative order and spacing of genes along a chromosome.

## How to Detect Linkage: The Test Cross

To measure recombination frequency, a **test cross** is used: cross the organism with unknown gamete ratios against a homozygous recessive individual (aabb). Because the test cross parent contributes only ab gametes, the phenotype of each offspring directly reveals which gamete the dihybrid parent produced.

**Worked Example**:

A test cross of an AaBb organism (with A and B linked in coupling: AB/ab) × aabb gives:

| Phenotype | Number | Type |
|---|---|---|
| AB (tall, purple) | 430 | Parental |
| ab (dwarf, white) | 420 | Parental |
| Ab (tall, white) | 75 | Recombinant |
| aB (dwarf, purple) | 75 | Recombinant |
| **Total** | **1000** | |

Recombinant offspring = 75 + 75 = 150.

$$RF = \frac{150}{1000} \times 100\% = 15\%$$

The two genes are **15 cM apart** on the same chromosome. The signature of linkage is clear: parental classes (430 + 420 = 850) vastly outnumber recombinant classes (150).

## Explaining the Data — AQA Mark Scheme Language

When explaining why parental combinations are more frequent, say:
- "The two genes are located close together on the same chromosome"
- "Crossing over between the two loci is less frequent than no crossing over" (because a chiasma must form at precisely the right point)
- "Therefore parental combinations are preserved in most gametes"

Simply saying "the genes are linked" without explaining why this leads to unequal ratios will not get full marks.

## Repulsion vs Coupling

**Coupling** (cis): the two dominant alleles are on the same homologue (AB/ab). Parental classes = AB and ab. Recombinant = Ab and aB.

**Repulsion** (trans): the two dominant alleles are on different homologues (Ab/aB). Parental classes = Ab and aB. Recombinant = AB and ab.

It is important to identify which parental combination the original organism had, to correctly identify parental vs recombinant gametes. The parental classes are always the most frequent.

## The Broader Significance of Linkage

Linkage is directly relevant to population genetics and genomics. Disease-associated alleles often exist in **haplotype blocks** — stretches of DNA inherited together due to linkage. This is why certain single nucleotide polymorphisms (SNPs) associated with type 2 diabetes risk (e.g. near *TCF7L2*) are found together in populations: they are close enough on the chromosome that recombination rarely separates them. Natural selection (or founder effects) on one variant thus drags neighbouring variants along — a phenomenon called **linkage disequilibrium**. This is crucial for understanding the elevated metabolic disease risk in South Asian populations, where certain haplotype blocks at metabolic disease loci are at higher frequency.

## Summary

- Linked genes are on the same chromosome and tend to be inherited together
- Parental combinations appear more often than recombinant combinations
- Recombination occurs via crossing over at chiasmata in prophase I of meiosis
- RF = recombinant offspring / total offspring × 100%; RF < 50% = linked
- 1% RF = 1 cM = 1 map unit of genetic distance
- Test cross detects linkage by directly revealing gamete types
- Coupling (AB/ab) vs repulsion (Ab/aB): identify parental type first, then classify recombinants

## AQA Exam Tips

- **Calculate RF**: always show formula and working. Express as a percentage. If RF < 50%, conclude genes are linked.
- **Identifying parental vs recombinant classes**: the parental classes are always the most frequent. Identify which combination of alleles the parent had, then any offspring that carry new combinations are recombinants.
- **Why parental classes dominate**: "crossing over between the two loci occurs less frequently than no crossing over because the loci are close together on the same chromosome." State this explicitly.
- **The 9:3:3:1 vs linkage ratio**: if a dihybrid cross gives a ratio close to 9:3:3:1, genes are unlinked. If parental classes are far more frequent, genes are linked. AQA will give you numbers and ask you to decide.
- **Test cross is needed**: you cannot easily distinguish linkage from independent assortment using F2 data alone (because dominance masks some genotypes). The test cross reveals gamete types directly.
- **Map units**: give genetic distance as a percentage (cM). "The genes are 15 map units apart" or "15 cM apart."
