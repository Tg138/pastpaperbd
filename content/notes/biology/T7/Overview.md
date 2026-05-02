# Topic 7 — Genetics, Populations, Evolution and Ecosystems

*AQA spec ref: 3.7.1–3.7.4*

This is one of the most conceptually rich topics in the A-level. It builds directly on Topic 4 (genes, alleles, meiosis) and extends into population genetics, evolution, and ecology. The concepts in this topic explain how traits are inherited, how populations evolve, how new species arise, and how organisms interact in ecosystems.

## 3.7.1 — Inheritance

### Genes, Alleles and Genotype

You already know a [[Genes|gene]] is a sequence of [[DNA]] bases coding for a polypeptide, and that alleles are different versions of the same gene. The terminology below is precise and AQA-tested:

- **Genotype** — the alleles an organism possesses at a given locus (e.g. Aa, BB, tt)
- **Phenotype** — the observable characteristics resulting from the genotype interacting with the environment
- **Homozygous** — both alleles at a locus are the same (AA or aa)
- **Heterozygous** — the two alleles at a locus are different (Aa)
- **Dominant** — an allele expressed in the phenotype when only one copy is present (expressed in heterozygotes). Written with a capital letter.
- **Recessive** — an allele only expressed when two copies are present (homozygous recessive). Written with a lowercase letter.
- **Codominant** — both alleles are expressed simultaneously in the heterozygote, producing an intermediate or blended phenotype. Neither masks the other.

### Monohybrid Inheritance

A monohybrid cross considers one gene with two alleles. Crossing two heterozygotes (Tt × Tt):

|  | T | t |
|---|---|---|
| **T** | TT | Tt |
| **t** | Tt | tt |

Genotype ratio: 1 TT : 2 Tt : 1 tt. Phenotype ratio: **3 tall : 1 dwarf**. This 3:1 ratio in the F₂ is the hallmark of a monohybrid cross between two heterozygotes.

### Test Crosses

A **test cross** determines whether an organism showing a dominant phenotype is homozygous dominant (TT) or heterozygous (Tt), by crossing with a homozygous recessive (tt):
- All offspring tall → parent was TT (all offspring Tt)
- 50% tall : 50% dwarf → parent was Tt (offspring are Tt and tt)

The homozygous recessive contributes only recessive alleles, so it acts as a genetic "revealer" — the phenotype of offspring directly reveals what allele the unknown parent contributed.

### Dihybrid Inheritance

A dihybrid cross considers two independently assorting genes. Two dihybrid heterozygotes (AaBb × AaBb) give a **9:3:3:1 phenotype ratio**. This ratio only holds when the two genes are on different chromosomes (independent assortment). If they are on the same chromosome, they tend to be inherited together — **genetic linkage** (see [[Autosomal linkage]]).

### Codominance

In codominance, both alleles are expressed in the heterozygote. Example: Shorthorn cattle with alleles Cᴿ (red) and Cᵂ (white). Heterozygote Cᴿ Cᵂ is **roan** — a mixture of red and white hairs. Both alleles produce their respective pigment; neither is dominant.

### Multiple Alleles — ABO Blood Groups

The ABO gene has three alleles: Iᴬ, Iᴮ, Iº.
- Iᴬ codes for antigen A
- Iᴮ codes for antigen B
- Iº codes for neither antigen
- Iᴬ and Iᴮ are codominant; both are dominant over Iº

| Blood group | Genotype(s) |
|---|---|
| A | Iᴬ Iᴬ or Iᴬ Iº |
| B | Iᴮ Iᴮ or Iᴮ Iº |
| AB | Iᴬ Iᴮ |
| O | Iº Iº |

Key insight: a blood group O child must be Iº Iº, so each parent must carry at least one Iº allele.

### Sex Linkage

Females are XX, males are XY. Genes on the X chromosome that have no Y counterpart are **X-linked**. Males are **hemizygous** — they have only one allele for X-linked genes, so recessive X-linked conditions appear much more frequently in males.

Classic example — **colour blindness** (X-linked recessive): alleles Xᴺ (normal) and Xⁿ (colour blind).

| | Xᴺ | Y |
|---|---|---|
| **Xᴺ** | XᴺXᴺ (normal female) | XᴺY (normal male) |
| **Xⁿ** | XᴺXⁿ (carrier female) | XⁿY (colour blind male) |

From a carrier female × normal male: 50% of sons are colour blind; no daughters are colour blind. Pattern: condition appears mostly in males, passed through carrier females.

### Epistasis

**Epistasis** is where the alleles of one gene affect the expression of another gene. It modifies the expected 9:3:3:1 dihybrid ratio:

**Recessive epistasis** (9:3:4 ratio): a homozygous recessive genotype at one locus (aa) masks expression of the second gene entirely. For example, gene A controls whether any pigment is produced; gene B controls pigment colour. If aa, no pigment regardless of B genotype.

**Dominant epistasis** (12:3:1 ratio): a dominant allele at one locus masks the expression of the second gene. For example, a dominant I allele at one locus suppresses pigment production regardless of the B gene.

AQA will give you an unusual ratio from a dihybrid cross and ask you to identify and explain the epistatic interaction. Identify which ratio (9:3:4 or 12:3:1), then reason through the mechanism.

## 3.7.2 — Populations

### The Hardy-Weinberg Principle

The **Hardy-Weinberg principle** states that in an ideal population (large, random mating, no mutation, no migration, no selection), **allele frequencies remain constant from generation to generation**. This is a null model — it describes what evolution would look like if it weren't occurring.

The Hardy-Weinberg equations:
$$p + q = 1$$
$$p^2 + 2pq + q^2 = 1$$

Where p = frequency of dominant allele A, q = frequency of recessive allele a, p² = freq(AA), 2pq = freq(Aa), q² = freq(aa).

**Strategy**: always start from q² (the only genotype you can directly identify from phenotype in a dominant-recessive system):
1. Identify q² from the proportion of affected individuals (homozygous recessive)
2. q = √q²
3. p = 1 − q
4. Calculate p², 2pq as needed

**Worked example**: 160/1000 people have cystic fibrosis (ff):
- q² = 160/1000 = 0.16 → q = 0.4
- p = 0.6
- 2pq (carriers) = 2 × 0.6 × 0.4 = 0.48 → 480 people
- p² (FF) = 0.36 → 360 people. Check: 160 + 480 + 360 = 1000 ✓

## 3.7.3 — Evolution May Lead to Speciation

### Natural Selection

**Natural selection** is the differential survival and reproduction of individuals with favourable heritable variations. Selection acts on phenotypes but changes allele frequencies. For types (directional, stabilising, disruptive) and full explanation see [[Genetic Diversity and Adaptation]].

### Speciation

**Speciation** is the formation of a new species from an existing one. It requires **reproductive isolation** — two populations must be prevented from interbreeding long enough to diverge genetically until they can no longer produce fertile offspring if reunited.

**Allopatric speciation** (most common) — a physical barrier (mountain range, ocean, river) divides one population into two geographically isolated groups. Each experiences different selection pressures and accumulates different mutations. Over many generations they diverge: different allele frequencies, different gene pools, eventually different chromosome structures or ploidy. When the barrier is removed, they can no longer successfully interbreed → two separate species. Time scale: typically thousands to millions of years.

**Sympatric speciation** — speciation within the same geographical area, without physical separation. Less common in animals. The most important mechanism in plants is **polyploidy**:

When meiosis fails and gametes are diploid (2n) rather than haploid (n), fertilisation can produce a tetraploid (4n) individual. This tetraploid cannot interbreed successfully with the diploid parent population (gametes from tetraploid = 2n; gametes from diploid = n; offspring = 3n = triploid = sterile because chromosomes cannot pair properly in meiosis). The tetraploid is therefore **immediately reproductively isolated** from the parent population → it is, by definition, a new species.

This is actually how many of our crop plants arose:
- **Wheat** (*Triticum aestivum*) = hexaploid (6n = 42 chromosomes) — arose by hybridisation and polyploidy events involving three different grass species
- **Potato** = tetraploid (4n = 48 chromosomes)
- **Strawberry** = octoploid (8n)

## 3.7.4 — Populations in Ecosystems

### Key Ecological Terms

- **Ecosystem** = community (all living organisms) + abiotic environment
- **Community** = all populations of all species in one area
- **Population** = all individuals of one species in a given area at a given time
- **Habitat** = the physical location where an organism lives
- **Niche** = the ecological role of an organism — what it eats, what eats it, how it interacts with abiotic factors. **No two species can occupy exactly the same niche** in the same habitat (competitive exclusion principle). If two species are too similar, one outcompetes the other.

### Mark-Release-Recapture

For mobile animals, population size is estimated using the **Lincoln index**:

$$N = \frac{n_1 \times n_2}{m}$$

Where N = population estimate, n₁ = first catch (marked and released), n₂ = second catch, m = number of marked individuals in second catch.

**Assumptions**: marks don't affect survival/behaviour; marks don't fall off; closed population (no births, deaths, migration between samples); marked individuals mix randomly before second sample.

### Population Growth

In unlimited conditions: **exponential (J-shaped) growth** — rate ∝ population size.

In limited conditions: **logistic (S-shaped) growth** — grows exponentially then slows as it approaches **carrying capacity (K)** — the maximum population the environment can sustain. Carrying capacity is set by **limiting factors** (food, water, space, light). Above K, intraspecific competition increases, raising death rate and lowering birth rate until the population stabilises at K.

### Energy Transfer

Energy flows through ecosystems via feeding:

- **Gross Primary Production (GPP)** = total energy fixed by photosynthesis
- **Net Primary Production (NPP)** = GPP − plant respiration. This is the energy available to primary consumers.
- Only ~10% of energy at each trophic level is transferred to the next (rest lost as heat in respiration, egestion, movement)
- This is why food chains are short and why there is more biomass at lower trophic levels

### Nitrogen Cycle

Key processes:
- **Nitrogen fixation** — N₂ → NH₄⁺ by *Rhizobium* (root nodules) and *Azotobacter* (free-living)
- **Nitrification** — NH₄⁺ → NO₂⁻ by *Nitrosomonas*; NO₂⁻ → NO₃⁻ by *Nitrobacter*
- **Assimilation** — plants absorb NO₃⁻/NH₄⁺ and incorporate into amino acids, proteins, nucleic acids
- **Ammonification** — decomposers break down organic N (in dead matter/waste) → NH₄⁺
- **Denitrification** — anaerobic bacteria (*Pseudomonas denitrificans*) convert NO₃⁻ → N₂ (in waterlogged soils). This returns N to the atmosphere and reduces soil fertility.

### Succession

**Succession** is the process by which a community changes over time in a predictable sequence. Each community modifies the environment (improves soil, adds organic matter, changes microclimate), making conditions more suitable for the next community and less suitable for itself.

**Primary succession** — begins on bare substrate with no soil (new volcanic island, bare rock after glacial retreat):
- Pioneer species (lichens, mosses) colonise first — tolerate harsh, nutrient-poor conditions
- They begin soil formation through weathering and organic matter addition
- Grasses → shrubs → trees follow in succession
- Each **seral stage** modifies conditions for the next

**Secondary succession** — begins where soil exists but vegetation has been removed (post-fire, abandoned agricultural land) — faster because soil and sometimes seed banks remain.

**Climax community** — the final stable community in which species composition remains constant (unless disturbed). In Britain, the climax community for most areas is deciduous woodland (oak woodland).

**Conservation implications**: to maintain non-climax habitats (heathland, chalk grassland), management is required to prevent succession advancing — e.g. controlled grazing, burning, cutting.

## Summary

- **Monohybrid 3:1 ratio** (heterozygote × heterozygote); test cross reveals unknown genotype
- **Dihybrid 9:3:3:1** (only for unlinked genes); epistasis modifies to 9:3:4 (recessive) or 12:3:1 (dominant)
- **X-linked recessive**: males more affected; passed through carrier females; hemizygous
- **Hardy-Weinberg**: p+q=1; p²+2pq+q²=1; start from q² (affected individuals)
- **Allopatric speciation**: geographic isolation → divergence → reproductive isolation
- **Sympatric speciation**: polyploidy → immediate reproductive isolation (gamete incompatibility)
- **Mark-release-recapture**: N = n₁n₂/m
- **Nitrogen cycle**: fixation → nitrification → assimilation → ammonification → denitrification
- **Succession**: pioneer → seral stages → climax community; primary (bare rock) vs secondary (existing soil)

## AQA Exam Tips

- **Hardy-Weinberg always start from q²**: identify the homozygous recessive proportion, take square root for q, calculate p = 1−q.
- **Epistasis ratio**: identify the modified ratio from data, state which gene masks which, give an example mechanism. "Recessive epistasis when aa prevents expression of gene B."
- **Speciation — reproductive isolation**: the definition of a new species is reproductive isolation (cannot interbreed to produce fertile offspring). Always state this explicitly.
- **Polyploidy speciation**: tetraploid × diploid → triploid offspring → sterile (cannot pair chromosomes in meiosis). This is the specific mechanism that causes immediate reproductive isolation.
- **Lincoln index assumptions**: AQA often asks for two assumptions. The most commonly tested: population is closed (no births/deaths/migration); marked individuals mix randomly.
- **NPP = GPP − R**: net primary production is what consumers actually have access to. GPP is total photosynthesis; respiration of the plant uses some of it.
- **Denitrification**: occurs in waterlogged, anaerobic soils. Converts nitrate → nitrogen gas. Reduces soil fertility. Bacteria responsible: *Pseudomonas denitrificans*.
- **Succession**: describe change as species modifying environment for the next stage. State pioneer species' characteristics (tolerate low nutrients, little competition) and what they do (begin soil formation). Climax community in UK = deciduous woodland.
