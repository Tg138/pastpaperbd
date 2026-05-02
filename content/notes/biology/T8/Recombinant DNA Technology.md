# Recombinant DNA Technology

*AQA spec ref: 3.8.2 — Recombinant DNA technology*

Recombinant DNA technology refers to techniques that allow DNA from different sources to be combined, amplified, analysed, and used to produce desired gene products. It underpins modern biotechnology — from the production of insulin to forensic genetic fingerprinting. AQA requires detailed knowledge of the tools, techniques, and ethical considerations involved. See [[Gene Expression]], [[DNA]], [[DNA replication and Protein synthesis]].

## Tools of Recombinant DNA Technology

### Restriction Endonucleases

**Restriction endonucleases** are bacterial enzymes that cut double-stranded DNA at specific recognition sequences (usually 4–8 base pairs, palindromic — the sequence reads the same on both strands in the 5'→3' direction).

There are two cut patterns:
- **Blunt ends** — cut straight across both strands at the same point. Harder to ligate.
- **Sticky ends** — cut at staggered positions, leaving short single-stranded overhangs (typically 4 nucleotides). These overhangs are complementary to each other and to any DNA cut with the same enzyme → can hydrogen bond with complementary sticky ends from another DNA molecule → much easier to join.

**Why sticky ends are useful**: if the same restriction enzyme cuts both a gene of interest and a vector, both will have complementary sticky ends. The gene can be inserted into the vector, where the sticky ends base-pair and are then permanently joined by DNA ligase.

### DNA Ligase

**DNA ligase** seals the phosphodiester bonds between the inserted gene and the vector DNA, permanently joining them. It catalyses a condensation reaction, forming a covalent phosphodiester bond between adjacent nucleotides. This produces the **recombinant DNA** molecule.

### Vectors

A **vector** is a DNA molecule used to carry a gene of interest into a host cell. Vectors must be able to:
- Replicate independently inside the host cell
- Be taken up by host cells
- Carry a selectable marker so transformed cells can be identified

**Plasmid vectors** — small circular bacterial DNA molecules:
- Cut with a restriction enzyme → sticky ends created
- Gene of interest inserted → DNA ligase seals
- Transformed into bacteria (e.g. *E. coli*)
- Often contain antibiotic resistance genes as **selectable markers** — bacteria that have taken up the plasmid will survive on antibiotic-containing media

**Viral vectors** — viruses (bacteriophages for bacteria; retroviruses/adenoviruses for human cells) that inject DNA into host cells. Used in gene therapy where high efficiency of delivery to specific cell types is needed. Retroviruses integrate into the host genome.

## Obtaining the Gene of Interest

There are two main approaches:

### 1. Reverse Transcription from mRNA

If the gene is expressed in a specific cell type, its mRNA can be isolated. **Reverse transcriptase** (an enzyme from retroviruses) is used to produce complementary **cDNA** from the mRNA template:

1. Extract mRNA from cells where the gene is expressed (e.g. pancreatic β cells for insulin mRNA)
2. Add reverse transcriptase + free DNA nucleotides → **single-stranded cDNA**
3. Add **DNA polymerase** → second strand synthesised → **double-stranded cDNA**

**Advantages of cDNA over genomic DNA:**
- Contains no introns (mRNA has already been spliced) → cDNA can be expressed in bacteria (which lack the splicing machinery of eukaryotes)
- Smaller → easier to work with and insert into vectors
- Enriched for expressed genes

### 2. Gene Synthesis (Artificial gene synthesis)

If the amino acid sequence of the protein is known, the gene can be synthesised chemically (oligonucleotide synthesis). This is increasingly used for short genes and allows codon optimisation for the host organism.

### 3. From a Gene Library

A **gene library** is a collection of DNA fragments representing the entire genome (genomic library) or all expressed mRNAs (cDNA library) of an organism, inserted into vectors. Libraries are screened using DNA probes (complementary sequences labelled with fluorescent or radioactive tags) to identify vectors containing the gene of interest.

## Polymerase Chain Reaction (PCR)

PCR amplifies a specific DNA sequence exponentially in vitro, producing millions of copies from a tiny starting amount (even a single molecule). It is used whenever more DNA is needed — before cloning, in forensic analysis, in diagnostic testing.

### Components

- **Template DNA** — the DNA containing the target sequence
- **Primers** — short, single-stranded DNA sequences (oligonucleotides) complementary to the flanking sequences of the target region; one for each strand. Define the region to be amplified.
- **Free DNA nucleotides** — deoxyribonucleoside triphosphates (dNTPs)
- **Taq DNA polymerase** — a heat-stable DNA polymerase from *Thermus aquaticus* (a thermophilic bacterium). Survives the high temperatures used in PCR without denaturing.
- **Buffer solution** — appropriate pH and ion concentrations

### Stages (in a thermocycler)

1. **Denaturation** — heat to ~95°C for 30 seconds → hydrogen bonds between strands break → two single strands separate

2. **Annealing** — cool to 50–65°C (depends on primer melting temperature) → primers bind to their complementary sequences on the template strands by hydrogen bonds

3. **Extension** — heat to ~72°C (optimum for Taq polymerase) → Taq polymerase extends from each primer in the 5'→3' direction using free nucleotides → two new double-stranded DNA molecules

Each cycle doubles the amount of DNA. After 30 cycles: 2³⁰ ≈ 10⁹ copies.

## Gel Electrophoresis

**Gel electrophoresis** separates DNA fragments by size. It is used after restriction enzyme digestion (to check fragment sizes), after PCR (to confirm amplification), and in genetic fingerprinting.

### Procedure

1. DNA samples are cut with restriction enzymes (or already sized from PCR)
2. Add **loading dye** (contains a dye + glycerol — makes the sample dense so it sinks into the well)
3. Load samples into wells in the **agarose gel** (submerged in buffer)
4. Apply an **electric current** — DNA is negatively charged (due to phosphate backbone) → migrates toward the **positive electrode (anode)**
5. Smaller fragments move **faster** (less resistance) and travel further in a given time
6. Stain with **ethidium bromide** (intercalates into DNA) or SYBR Green → visualise under UV light as bright bands
7. Compare to a **DNA ladder** (standard with known fragment sizes) → determine sizes of unknown fragments

**Result**: each lane shows a pattern of bands. Larger fragments = bands near the top (near the wells); smaller fragments = bands near the bottom.

## Genetic Fingerprinting (DNA Profiling)

Genetic fingerprinting exploits the fact that each individual (except identical twins) has a unique pattern of **variable number tandem repeats (VNTRs)** or **short tandem repeats (STRs)** — sequences where a short motif (e.g. AATG) is repeated a variable number of times at multiple loci across the genome. The number of repeats at each locus is inherited and varies enormously between individuals.

### Procedure

1. **Extract DNA** from the sample (blood, hair, saliva, semen)
2. **Amplify** STR loci by PCR (using primers flanking each repeat region)
3. **Separate** by gel electrophoresis (or capillary electrophoresis, which is now more common)
4. **Compare** the band pattern of the suspect/child/sample to the reference

### Applications

- **Forensics** — matching crime scene DNA to suspects. The probability of two unrelated individuals sharing the same profile at multiple STR loci is astronomically low (~1 in 10⁹ or less).
- **Paternity/maternity testing** — a child inherits half their STR alleles from each parent; matching of alleles confirms parentage.
- **Identifying victims** — e.g. in mass disasters; comparison to relatives' DNA.
- **Animal conservation** — determining parentage and genetic diversity in breeding programmes.

## Transformation

**Transformation** is the uptake of foreign DNA by a host cell. For bacterial cells:
- Mix bacteria with recombinant plasmid
- Apply **heat shock** (sudden temperature change, e.g. 42°C for 90 seconds) or electroporation → increases membrane permeability → plasmid enters some cells

### Identifying Transformed Cells

Most cells will not take up the plasmid. To identify those that have:

**Antibiotic resistance markers**: if the plasmid carries a resistance gene (e.g. ampicillin resistance), grow bacteria on ampicillin plates → only transformed bacteria survive.

**Insertional inactivation**: if the gene of interest was inserted into the middle of a second marker gene (e.g. a lacZ gene encoding β-galactosidase), the marker is disrupted. Cells with the recombinant plasmid (gene inserted) fail to produce β-galactosidase → cannot cleave a blue dye substrate → **white colonies**. Cells with empty plasmid (no insert) → **blue colonies**. Only white colonies on ampicillin plates contain the recombinant plasmid.

## Gene Therapy

Recombinant DNA technology can be used to treat genetic disorders by introducing a functional copy of a defective gene into a patient's cells.

- **Somatic gene therapy** — modifying non-reproductive cells. Effects are not heritable. Example: CFTR gene delivery to lung cells in cystic fibrosis.
- **Germline gene therapy** — modifying gametes or early embryos. Effects would be heritable. Currently illegal in many countries due to ethical concerns.

**Vectors for gene therapy**: viral vectors (retroviruses, adenoviruses, adeno-associated viruses) are most efficient. Liposomes (phospholipid vesicles) are an alternative — less efficient but less immunogenic.

## Ethical Issues

Recombinant DNA technology raises significant ethical concerns:

- **GM organisms**: inserting genes from one species into another raises concerns about the release of GM organisms into the environment (gene flow to wild populations), effects on biodiversity, unforeseen consequences, and corporate ownership of genetic material.
- **Insulin production** (*E. coli* carrying human insulin gene): seen by most as straightforwardly beneficial — avoids reliance on animal-derived insulin, consistent supply, fewer immunogenic reactions.
- **Gene therapy**: somatic gene therapy is generally accepted. Germline modification is highly controversial — it would alter the genome of all future generations, raising questions about consent, eugenics, and inequality of access.
- **Genetic fingerprinting**: privacy concerns around storage of DNA databases; risk of misidentification; potential for discrimination.
- **Designer babies**: pre-implantation genetic diagnosis (PGD) combined with genetic modification raises concerns about selecting for non-medical traits.

## Summary

- **Restriction endonucleases**: cut DNA at specific palindromic sequences; sticky ends → complementary overhangs for joining
- **DNA ligase**: seals phosphodiester bonds → forms recombinant DNA
- **Vectors**: plasmids or viruses carry gene into host; selectable markers identify transformed cells
- **cDNA**: made from mRNA using reverse transcriptase; no introns; can be expressed in bacteria
- **PCR**: denature (95°C) → anneal primers (50–65°C) → extend with Taq polymerase (72°C) → exponential amplification
- **Gel electrophoresis**: separates DNA by size; smaller fragments travel further toward anode
- **Genetic fingerprinting**: STR/VNTR profiling; unique to individuals; forensics, paternity, conservation
- **Gene therapy**: somatic (non-heritable) vs germline (heritable, controversial)

## AQA Exam Tips

- **Why cDNA for bacterial expression**: "cDNA has no introns — bacteria lack spliceosomes so cannot remove introns from eukaryotic pre-mRNA. cDNA is derived from mature, spliced mRNA → can be directly transcribed and translated in bacteria."
- **PCR temperatures and order**: denaturation (95°C) → annealing (lower) → extension (72°C). Know why each temperature: 95°C breaks H-bonds; annealing temp depends on primer GC content; 72°C is Taq polymerase optimum.
- **Gel electrophoresis — direction of migration**: DNA moves toward the positive electrode because the phosphate backbone gives DNA a net negative charge.
- **Sticky ends vs blunt ends**: sticky ends leave single-stranded overhangs that are complementary → H-bond with each other → easier for ligase to join. Always explain *why* sticky ends are advantageous.
- **Genetic fingerprinting — probability**: the power comes from using multiple STR loci simultaneously. Any one locus might be shared by many people, but the probability of sharing the same profile across 10+ loci is negligible.
- **Insertional inactivation logic**: white colonies = gene inserted into marker (marker disrupted) = recombinant. Blue colonies = no insert (marker intact) = non-recombinant. Both are on antibiotic plates, so both have the plasmid — the colour distinguishes recombinant from non-recombinant.
