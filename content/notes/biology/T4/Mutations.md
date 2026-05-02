# Mutations

*AQA spec ref: 3.4.4 — Genetic diversity can arise as a result of mutation*

A **mutation** is a change in the base sequence of DNA. Mutations are the ultimate source of all genetic variation — every new allele in existence arose originally as a mutation. Without mutation, evolution would be impossible (there would be no new variants for selection to act on). However, most mutations are harmful or neutral; beneficial mutations are rare but enormously important over evolutionary time.

## Types of Mutation

### Point Mutations (Base Substitutions)

A **point mutation** is the replacement of one base with another at a single position in the DNA sequence. There are three possible effects on the resulting protein:

**1. Synonymous (silent) mutation**
The changed codon still codes for the same amino acid. This is possible because the genetic code is **degenerate** — most amino acids are coded by more than one codon (see [[Genes]]). For example, if UCU (serine) changes to UCC (also serine), no change in amino acid sequence occurs. The protein is completely unaffected. Silent mutations are the most common type of point mutation in protein-coding sequences.

**2. Missense mutation**
The changed codon codes for a **different amino acid**. The polypeptide chain has one amino acid substituted. The effect on the protein depends entirely on where the substitution occurs:
- If the changed amino acid is not in a critical region (not the active site, not involved in disulfide bonds or salt bridges), the protein may still fold correctly and function normally.
- If the changed amino acid is in a critical region, the protein may misfold, lose its active site shape, or gain an abnormal function.

**Classic example — sickle cell anaemia**: a single A→T substitution in the 6th codon of the beta-globin gene changes GAG (glutamic acid — hydrophilic, negatively charged) to GTG (valine — hydrophobic). Valine at position 6 causes haemoglobin molecules to polymerise under low oxygen conditions, distorting red blood cells into a sickle shape. Sickle cells block capillaries (causing pain crises) and are destroyed faster than normal cells (anaemia). One base change → one amino acid change → drastically altered protein function.

**3. Nonsense mutation**
The changed codon becomes a **stop codon** (UAA, UAG, or UGA in mRNA). Translation terminates prematurely, producing a **truncated (shortened) polypeptide**. This usually produces a completely non-functional protein, because essential C-terminal regions are missing. Nonsense mutations are generally the most damaging type of base substitution.

### Frameshift Mutations (Insertions and Deletions)

The genetic code is read in **triplets** (codons), and each codon is read **non-overlappingly** from the start codon. If a base is inserted or deleted, the reading frame shifts for all codons downstream of the mutation. This means every codon after the insertion/deletion is changed.

**Insertion**: one or more bases are added. Example:
- Original: ATG GGT CAT TAG (Met-Gly-His-Stop)
- After inserting A before second codon: ATG AGG TCA TTA G (Met-Arg-Ser-Leu...) — completely different

**Deletion**: one or more bases are removed. Similar effect — reading frame shifts.

**Why frameshifts are more damaging than substitutions**: a point substitution only changes one amino acid. A frameshift changes every amino acid from the mutation point to the new stop codon — the entire protein sequence downstream is garbled. Frameshifts almost always produce a completely non-functional protein.

**Exception**: if 3 (or a multiple of 3) bases are inserted or deleted, the reading frame is preserved, and only the addition or removal of one (or more) amino acids results — less damaging.

**Trinucleotide repeat expansions**: a specific type of insertion mutation where a short 3-base repeat is duplicated many extra times. The classic example is **Huntington's disease**, caused by expansion of a CAG repeat in the Huntingtin gene. Normal alleles have 10–35 repeats; disease alleles have >36. The expanded polyglutamine tract in the huntingtin protein causes it to misfold and aggregate in neurons.

### Chromosomal Mutations

These are large-scale changes affecting the number or structure of chromosomes:

**Deletion**: a segment of chromosome is lost.

**Duplication**: a segment is copied twice. Gene duplication is the source of new genes — the original gene continues its normal function while the duplicate can accumulate mutations and potentially evolve new functions.

**Inversion**: a segment breaks off and reinserts in reverse orientation. May not affect amino acid sequence but can disrupt gene regulation.

**Translocation**: a segment moves to a different chromosome. Can produce fusion genes with altered function (e.g. the Philadelphia chromosome in CML — translocation of chromosome 9 onto 22 — creates the BCR-ABL fusion oncogene).

**Aneuploidy**: incorrect number of chromosomes due to non-disjunction in meiosis:
- **Trisomy** — three copies of one chromosome (e.g. trisomy 21 = Down syndrome, trisomy 18 = Edwards syndrome)
- **Monosomy** — only one copy of a chromosome (e.g. Turner syndrome = 45, X0)

**Polyploidy**: multiple full sets of chromosomes (e.g. tetraploid = 4n). Common in plants — leads to rapid speciation because polyploids are reproductively isolated from diploid parents. Many crop plants are polyploid (wheat = hexaploid, 6n; potato = tetraploid, 4n).

## Rate of Mutation

Mutations occur spontaneously during DNA replication due to mispairing of bases. The error rate of DNA polymerase alone would be about 1 mistake per 10⁵ bases copied, but proofreading and mismatch repair reduce this to approximately **1 error per 10⁹–10¹⁰ bases** — an extraordinarily low rate, but still significant given the size of the genome.

**Mutagens** are agents that increase the rate of mutation:

**Physical mutagens:**
- **UV radiation** — causes adjacent thymine bases to form covalent **thymine dimers** that distort the DNA helix and block replication and transcription. Leads to skin cancer if the damage is not repaired. Nucleotide excision repair normally removes these dimers.
- **Ionising radiation** (X-rays, gamma rays) — breaks phosphodiester bonds, causing double-strand breaks or base damage. Used in cancer treatment (to damage tumour cell DNA) but also a carcinogen.

**Chemical mutagens:**
- **Base analogues** — chemicals similar to bases that are incorporated during replication but have different pairing properties (e.g. 5-bromouracil, which pairs with G instead of A).
- **Intercalating agents** — insert between base pairs, distorting the helix and causing frameshift mutations during replication (e.g. ethidium bromide, acridine dyes).
- **Alkylating agents** — add alkyl groups to bases, altering their base-pairing properties (e.g. nitrogen mustard, used in early chemotherapy).

## Mutation, Genetic Variation, and Evolution

Mutations are the **ultimate source** of all genetic variation. All the allele diversity that natural selection acts upon, all the genetic variation between individuals and between species, originated as mutations. Without mutation:
- No new alleles could arise
- Evolution by natural selection would eventually consume all variation and stop
- Life could not adapt to changing environments

Most mutations are harmful (disrupting functional proteins) or neutral. Beneficial mutations are rare because most proteins are already highly optimised by millions of years of selection. However, in a changing environment, what was previously neutral may become beneficial, or vice versa.

**The heterozygous advantage of sickle cell**: the sickle cell allele (HbS) illustrates how a mutation can be both harmful (sickle cell disease in homozygotes HbS/HbS) and beneficial (protection against malaria in heterozygotes HbA/HbS). In malaria-endemic regions, the HbS allele is maintained at high frequency by **balancing selection** (heterozygous advantage). This connects to your EPQ — the interaction between genetic variation and disease susceptibility varies dramatically between populations.

## Summary

- Mutation = change in DNA base sequence
- **Point mutations (substitutions)**:
  - Silent/synonymous → same amino acid (degenerate code)
  - Missense → different amino acid (effect depends on position)
  - Nonsense → new stop codon → truncated, non-functional protein
- **Frameshift (insertion/deletion)** → all codons downstream changed → usually severe
  - Unless 3n bases affected (reading frame preserved)
- **Chromosomal mutations**: deletion, duplication, inversion, translocation, aneuploidy, polyploidy
- Spontaneous rate ~1/10⁹–10¹⁰ per base; increased by mutagens (UV, ionising radiation, chemical agents)
- Mutations = ultimate source of all genetic variation → basis of evolution

## AQA Exam Tips

- **Why frameshifts are more damaging than substitutions**: every codon from the mutation point onwards is changed, producing a completely different (and usually non-functional) amino acid sequence. A substitution changes only one codon.
- **Silent mutation — relate to degeneracy**: the codon changes but still codes for the same amino acid because the code is degenerate (many amino acids have multiple codons). This is why the third base position is often called the "wobble position."
- **Sickle cell as missense mutation**: single A→T substitution → glutamate (hydrophilic, −ve charge) replaced by valine (hydrophobic) at position 6 of beta-globin. Hydrophobic patches cause HbS molecules to polymerise under low O₂ → sickling. Know both the molecular cause and the physiological consequence.
- **Mutagen types**: UV → thymine dimers (physical); ionising radiation → double-strand breaks (physical); base analogues, intercalating agents, alkylating agents (chemical). AQA may ask you to classify a mutagen.
- **Polyploidy and speciation**: if a polyploid (e.g. tetraploid) arises, its gametes cannot successfully fuse with diploid parent gametes (offspring would be triploid and sterile). Therefore the polyploid is immediately reproductively isolated → a new species. This is **sympatric speciation**.
- **Trinucleotide repeats**: Huntington's disease is an example of a mutation type that AQA sometimes introduces. The key concept is that the number of repeats increases the severity/reduces the age of onset.
