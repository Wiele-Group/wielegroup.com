# Phase 2 · Step 7 — Citation Brief #007: Stage 2 Source Authority
**Directive version:** phase2-step7-citation-brief-007  
**Date:** 2026-05-25  
**Authored by:** Cowork (Claude Sonnet 4.6)  
**Status:** READY FOR CLAUDE CODE — do not deploy until §7 gates pass  
**Previous tag:** `phase2-step6-5-for-agencies-links-2026-05-25`

---

## §0 · Pre-flight (run every item; abort if any fails)

```bash
cd "/Users/jonathanlandman/Documents/Claude/Projects/Wiele Group Operations/wielegroup.com"

# 1. Clean working tree
git status --short
# Expected: empty

# 2. On main
git branch --show-current
# Expected: main

# 3. Previous tag present
git tag --sort=-creatordate | head -1
# Expected: phase2-step6-5-for-agencies-links-2026-05-25

# 4. Node + wrangler
node -v && ls node_modules/.bin/wrangler && echo wrangler:ok

# 5. CB #006 live (last brief in cluster)
curl -sI https://wielegroup.com/citation-brief/stage-1-entity-resolution | head -2
# Expected: HTTP/2 200
```

Hard stop if any check fails — report the failure before proceeding.

---

## §1 · Mission

Publish Citation Brief #007 — Stage 2 Source Authority — the second deep-dive
in the Five-Stage Citation Hierarchy series.

| Brief | Stage | Status |
|---|---|---|
| #001 | Five-Stage Citation Hierarchy (overview) | ✅ Live |
| #002 | Stage 3 Structured Extractability | ✅ Live |
| #003 | AEO is the 2026 WCAG | ✅ Live |
| #004 | Two-Tier Access Doctrine | ✅ Live |
| #005 | Brand Semantics Infrastructure | ✅ Live |
| #006 | Stage 1 Entity Resolution | ✅ Live |
| **#007** | **Stage 2 Source Authority** | **← this directive** |

Stage 2 Source Authority is the argument for the sustained retainer. Stage 1
(CB #006) is a three-week sprint. Stage 2 cannot be sprint-fixed — it
compounds over months. This brief:
1. Explains why Stage 2 is the moat, not just a phase
2. Names the five authority signals AI engines read
3. Gives a diagnostic for Stage 2 deficits
4. Connects to AVM (tracks Stage 2 lift) and /for-brands and /for-agencies (routes buyers)
5. Reinforces the Authority Engine retainer as the compound vehicle

---

## §2 · Hard constraints (binding)

| # | Law | Applied here |
|---|---|---|
| 1 | Static import | MDX import MUST be added to `[slug]/page.tsx`; dynamic imports break under OpenNext/Workers |
| 2 | Three-file rule | Brief requires edits to: (a) MDX file, (b) `citation-briefs-static.ts` manifest, (c) `[slug]/page.tsx` static import block |
| 3 | Sitemap | STATIC_ROUTES entry required — hand-maintained array (not auto-derived) |
| 4 | No-GBP | Zero £ or GBP in copy — EUR / € only |
| 5 | Live-or-Nothing | curl after deploy; "shipped" = LIVE |
| 6 | Recon-First | Read every file you will modify before editing |
| 7 | No-Bombardment | Report at completion in §8 format only |

---

## §3 · Pre-reads (read these fully before editing anything)

| File | Why |
|---|---|
| `src/lib/citation-briefs-static.ts` | Manifest append location — after briefNumber 6 entry. Read full file to confirm current last entry. |
| `src/app/citation-brief/[slug]/page.tsx` | Static import block (lines 44–58 currently). New import and BRIEF_COMPONENTS entry pattern. |
| `src/app/sitemap.ts` | STATIC_ROUTES — append after `/citation-brief/brand-semantics-infrastructure` block (or after Stage 1 entity resolution block if already added). Confirm current last brief entry. |
| `public/llms.txt` | Add CB #007 after the CB #006 line |
| `scripts/notify-indexnow.sh` | Append CB #007 URL |
| `src/content/citation-briefs/stage-1-entity-resolution.mdx` | Content pattern and internal link style reference |

---

## §4 · Files to create / edit

### 4a. NEW — `src/content/citation-briefs/stage-2-source-authority.mdx`

Create this file. Use the exact MDX below verbatim — do not add, remove, or
rewrite sections. All internal links must use the exact hrefs shown.

```mdx
import { Reveal } from "@/components/motion/reveal";
import Link from "next/link";

{/* Cowan 4-chunk rule: max 4 visible items per vertical list in any viewport. Split into columns, numbered tables, or H3 sub-blocks when exceeded. */}

<section className="mb-12 rounded-[var(--radius-lg)] border border-electric/30 bg-electric/5 p-6 md:p-8">
  <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
    The 60-second answer
  </p>
  <p className="text-body-lg text-cloud mb-4">
    Stage 2 of the <Link href="/citation-brief/how-agencies-get-cited-in-ai-answers" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Five-Stage Citation Hierarchy</Link> is <strong className="text-white">Source Authority</strong> — the engine&apos;s confidence that your domain is a primary, trustworthy source for the topics it covers. Unlike Stage 1 Entity Resolution (binary: either resolved or not), Stage 2 is a continuous variable that compounds over months and quarters through five measurable signals: tier-1 editorial citations, named-author publishing consistency, cross-entity citations, topical concentration, and temporal consistency.
  </p>
  <p className="text-body-md text-silver mb-4">
    Stage 2 cannot be sprint-fixed. There is no shortcut to genuine editorial authority. A Wikidata entry ships in a week. A schema sameAs layer ships in an afternoon. A 24-month citation record cannot be fabricated. That property — the one that makes Stage 2 slow to build — is exactly what makes it a moat. A brand with genuine Stage 2 authority is difficult to displace even when a well-funded competitor enters the market.
  </p>
  <p className="text-body-sm text-silver">
    Stage 2 is the argument for the compounding retainer, not the one-off sprint. The <Link href="/services/ai-visibility-monitoring" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">AI Visibility Monitoring</Link> retainer instruments Stage 2 lift month over month: citation share, source weight tier, and authority delta against a named competitor set — the signals that confirm the compounding loop is running.
  </p>
</section>

<section className="mb-14">
  <h2 className="text-display-md text-white text-balance mb-5">
    Why Stage 2 is the slowest stage — and the most durable moat.
  </h2>
  <p className="text-body-md text-silver mb-4">
    Stage 1 Entity Resolution is a threshold: binary, sprint-resolvable in three weeks. Stage 3 Structured Extractability is page-level: a focused sprint across your top pages produces measurable citation-share lift inside one quarter. Stage 2 Source Authority works on a different timescale entirely. It is the engine&apos;s cumulative assessment of your domain — built through months of consistent publishing, external validation, and structured citation from authoritative sources. There is no API call that installs it. There is no schema property that shortcuts it. It accrues.
  </p>
  <p className="text-body-md text-silver mb-4">
    This is not a limitation — it is the competitive structure of AI search authority. The same temporal property that makes Stage 2 hard to build makes it hard to displace. A brand with 24 months of consistent tier-1 citation, named-author publishing, and topical concentration has an authority account that a competitor with a larger content budget cannot close in a quarter. This is why mature brands with genuine editorial histories carry AI citation share that pure AEO-optimization plays cannot replicate on short timescales: the engine has a longer, broader, more externally-validated evidence base to draw from.
  </p>
  <p className="text-body-md text-silver mb-4">
    The implication for sequencing: do not wait for Stage 2 to be &quot;complete&quot; before running Stage 3. Run both in parallel. Stage 3 extractability work returns immediate citation-share lift on pages where Stage 1 is resolved and some domain authority already exists. Stage 2 is the compounding layer that raises the ceiling on what Stage 3 and Stage 5 can ultimately produce. The right frame is: Stage 2 is always running in the background — the question is whether you are actively building it or passively letting competitors outpace you.
  </p>
  <p className="text-body-md text-silver">
    For brands entering the AI-search era now, the first 90 days of deliberate Stage 2 building set the trajectory for the following two years. Early citation authority compounds disproportionately: engines log citation history against the entity and weight later citations from higher-authority sources more heavily toward established sources. Starting Stage 2 investment earlier does not just reduce time-to-authority — it raises the eventual authority ceiling because the early log entries compound through Stage 5 over a longer horizon.
  </p>
</section>

<section className="mb-14">
  <h2 className="text-display-md text-white text-balance mb-5">
    The five authority signals AI engines read.
  </h2>
  <p className="text-body-md text-silver mb-8">
    Source Authority is not a single signal. Engines synthesise five distinct layers of authority evidence. Each layer is independently measurable and independently buildable — but they compound together, not in isolation. A brand with four strong layers and one weak one will outperform a brand that has optimised one layer heavily while ignoring the other four.
  </p>
  <Reveal stagger={0.06} className="grid gap-4">
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6 md:p-7">
      <div className="flex items-baseline gap-4 mb-3">
        <p className="text-body-xs font-mono text-electric">01</p>
        <h3 className="text-heading-md text-white">Tier-1 editorial citations</h3>
      </div>
      <p className="text-body-md text-silver">
        A tier-1 editorial citation is a mention of your brand, your founder, or your methodology in a publication the engine already treats as an authoritative source — national and trade press, podcast transcripts hosted on authoritative domains, academic or professional publications, and recognised industry databases. The weight hierarchy is steep: one tier-1 mention in a publication the engine trusts carries more Stage 2 signal than one hundred directory listings on aggregator sites the engine does not weight as primary sources. This is the hardest signal to manufacture and the most valuable signal to earn. The editorial process — a journalist researching and choosing to mention the brand; a podcast host inviting the founder — is exactly what the engine uses as a proxy for external validation. It cannot be replicated by publishing your own content, no matter how well-structured.
      </p>
    </div>
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6 md:p-7">
      <div className="flex items-baseline gap-4 mb-3">
        <p className="text-body-xs font-mono text-electric">02</p>
        <h3 className="text-heading-md text-white">Named-author publishing consistency</h3>
      </div>
      <p className="text-body-md text-silver">
        Named-author publishing — founder-bylined content on the brand&apos;s owned domain, carrying Person schema with sameAs anchors — is the Stage 2 signal you can build without waiting for editorial gates. Each piece of founder-voice content reinforces two things simultaneously: the connection between the founder entity and the brand entity (Stage 1 benefit, already covered in CB #006), and the domain&apos;s topical authority signal (Stage 2 benefit). The key variables are consistency and attribution. Engines weight a domain whose content is consistently attributed to a named, verifiable expert more heavily than one whose content carries no byline — the named author is the proxy for the human expertise signal that E-E-A-T formalises. Publish consistently. Every piece. Named. Structured. With Person schema. Without interruption.
      </p>
    </div>
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6 md:p-7">
      <div className="flex items-baseline gap-4 mb-3">
        <p className="text-body-xs font-mono text-electric">03</p>
        <h3 className="text-heading-md text-white">Cross-entity citations</h3>
      </div>
      <p className="text-body-md text-silver">
        Cross-entity citations are references to your brand made by other entities that AI engines have already resolved and trust. When a resolved entity — a named person with a clean Knowledge Panel, a brand with established Stage 2 authority of their own — mentions your brand in their published content, the engine reads it as a trust transfer: an entity the engine already knows is vouching for an entity it is still calibrating. The mechanism is analogous to academic citation: being cited by a highly-cited author carries more weight than being cited by an uncited author, even if both citations are structurally identical. Building cross-entity citations requires relationships that produce natural co-mentions — co-authored content, named collaboration, published endorsements, and structured attribution in third-party research. It is a slow signal to build and a slow signal to lose.
      </p>
    </div>
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6 md:p-7">
      <div className="flex items-baseline gap-4 mb-3">
        <p className="text-body-xs font-mono text-electric">04</p>
        <h3 className="text-heading-md text-white">Topical concentration</h3>
      </div>
      <p className="text-body-md text-silver">
        Topical concentration is the engine&apos;s assessment of whether your domain is a specialist source or a generalist one. An engine building a citation answer about AI search authority will preference a domain whose content consistently addresses AI search authority topics — with depth, with named methodology, with external citations — over a domain that covers AI search authority as one of fifty content categories. This is why thematic editorial discipline compounds at Stage 2: every new piece of content on the brand&apos;s core topic reinforces the topical signal, not just for that piece but for the whole domain. Brands that publish consistently on their target topic category for twelve months start to see the engine treat them as a default citation candidate for queries in that category — a Stage 5 precursor that begins at Stage 2. Diluting the content mix with off-topic pieces is not neutral; it actively dilutes the topical concentration signal.
      </p>
    </div>
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6 md:p-7">
      <div className="flex items-baseline gap-4 mb-3">
        <p className="text-body-xs font-mono text-electric">05</p>
        <h3 className="text-heading-md text-white">Temporal consistency</h3>
      </div>
      <p className="text-body-md text-silver">
        Temporal consistency is the signal that distinguishes sustained authority from a citation burst. Engines distinguish between a domain that has accumulated citation authority over 24 months and a domain that received intensive citation coverage over four weeks — perhaps through a PR campaign — and then went quiet. The former pattern reads as genuine editorial authority; the latter reads as a campaign artefact. This distinction matters for Stage 5 as well: citation history that compounds naturally over time feeds the recommendation loop more durably than citation history that arrived in a spike. Temporal consistency cannot be gamed by timing a burst of activity to coincide with an engine-run panel. The engine&apos;s model of your domain incorporates a longer window than any single measurement cycle. Build at a steady pace. Publish consistently. Outreach monthly. The compound is the point.
      </p>
    </div>
  </Reveal>
</section>

<section className="mb-14">
  <h2 className="text-display-md text-white text-balance mb-5">
    How to diagnose a Stage 2 deficit.
  </h2>
  <p className="text-body-md text-silver mb-5">
    Stage 2 deficits present differently from Stage 1 failures. A Stage 1 failure produces consistent absence — the brand is not cited regardless of query or engine. A Stage 2 deficit produces inconsistent, shallow, or secondary citation — the brand appears sometimes, or appears as an unnamed secondary source, or appears for simple queries but not for authoritative or expert-level ones. Four diagnostic patterns identify a Stage 2 deficit with high confidence.
  </p>
  <ul className="space-y-5 text-body-md text-silver">
    <li className="border-l-2 border-electric/40 pl-5">
      <strong className="text-white block mb-2">The brand is cited as a secondary or unnamed source.</strong>
      When an engine produces an answer that clearly draws from your content — the structure, the language, the framing — but attributes the answer to a generic description (&quot;according to marketing experts&quot; or &quot;as one agency noted&quot;) without naming your brand, this is a Stage 2 signal. The engine found the content (Stage 3 extractability is working), resolved the entity (Stage 1 is clean), but assigned insufficient domain authority to merit a named attribution. The fix is Stage 2 building — accumulating enough authority signals that the domain crosses the threshold from secondary to primary source.
    </li>
    <li className="border-l-2 border-electric/40 pl-5">
      <strong className="text-white block mb-2">Citation share drops on authoritative or expert-level queries.</strong>
      Run a prompt panel that includes both entry-level queries (&quot;what is AEO?&quot;) and authoritative-level queries (&quot;what methodology do leading AEO agencies use for entity resolution?&quot;). If the brand appears consistently on the former but inconsistently on the latter, Stage 2 is the bottleneck. Entry-level queries tolerate lower domain authority because the answer set is broad; expert-level queries require the engine to identify primary sources in the field, which it does by weighting Stage 2 authority heavily. The gap between entry-level and expert-level citation share is the Stage 2 diagnostic metric.
    </li>
    <li className="border-l-2 border-electric/40 pl-5">
      <strong className="text-white block mb-2">Competitor explanations are cited over yours on topics you originated.</strong>
      If a brand has published the original, most-detailed explanation of a methodology — and that methodology is now being cited by the engine using a competitor&apos;s description of it — Stage 2 is the explanation. The engine knows both descriptions exist. It is weighting the competitor&apos;s domain authority higher than the originator&apos;s. This is the most commercially painful Stage 2 pattern: the brand did the thought-leadership work and a higher-authority competitor received the citation benefit. The solution is not more Stage 3 work on the original piece; it is raising Stage 2 authority so the engine re-weights the source comparison.
    </li>
    <li className="border-l-2 border-electric/40 pl-5">
      <strong className="text-white block mb-2">Citation share is inconsistent month over month without a clear trigger.</strong>
      If the Citation Score™ monthly engine run shows citation share fluctuating by more than 15 to 20 percentage points without a corresponding content change, competitive change, or engine update, Stage 2 temporal consistency is likely the cause. The engine&apos;s authority model is not yet stable enough to produce reliable citation — it is still calibrating the domain&apos;s position in the source hierarchy. This is the earliest stage of Stage 2 building: authority is starting to accrue but has not yet reached the consistency threshold. The fix is continued steady-state building — publishing, outreach, citation placement — until the monthly citation share stabilises.
    </li>
  </ul>
</section>

<section className="mb-14">
  <h2 className="text-display-md text-white text-balance mb-5">
    The authority compounding loop.
  </h2>
  <p className="text-body-md text-silver mb-4">
    Stage 2 compounds through a reinforcing loop that operates at the domain level. Early citation authority — earned through the first tier-1 press mention, the first six months of consistent named-author publishing, the first structured cross-entity co-mention — raises the engine&apos;s confidence in the domain. That higher confidence increases the probability that the engine pulls from the domain when answering future queries. Each citation creates a citation history entry that weighs on Stage 5. The more frequently the engine cites the domain, the more central it becomes to the engine&apos;s model of the topic — which increases citation probability further. The loop is self-reinforcing once it starts.
  </p>
  <p className="text-body-md text-silver mb-4">
    The starting condition for the loop is clearing Stage 1. An entity the engine cannot resolve cannot begin accumulating Stage 2 authority because the engine has no stable anchor to attach the authority evidence to. Once Stage 1 is clean — Wikidata entry filed, schema sameAs layer live, named-author trace started — every subsequent authority signal begins accruing to a single, resolved entity. The Sprint starts the loop; the compounding retainer runs it.
  </p>
  <p className="text-body-md text-silver mb-4">
    The rate at which the loop compounds depends primarily on topical concentration and citation quality. Domains that publish consistently on a narrow topic category at high quality, earn tier-1 editorial citations in that category, and maintain named-author attribution across all content see Stage 2 compound faster than domains that publish broadly, chase volume, or rely on low-weight directory citations. Quality and concentration are the acceleration mechanisms; volume without concentration is noise.
  </p>
  <p className="text-body-md text-silver">
    Practically: expect the first measurable Stage 2 lift — moving from secondary to primary citation in the engine-run panel — to appear between months three and six of deliberate Stage 2 building, after a clean Stage 1 sprint. Expect Stage 2 to reach stability — consistent citation share within ±10 percentage points month over month — between months nine and fifteen, depending on vertical competition and citation quality. Expect Stage 5 (Recommendation History) to begin reinforcing Stage 2 between months twelve and eighteen. The <Link href="/services/ai-visibility-monitoring" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">AI Visibility Monitoring</Link> retainer instruments all three stages on the same monthly cadence, so the compounding is visible and attributable — not inferred.
  </p>
</section>

<section className="mb-14">
  <h2 className="text-display-md text-white text-balance mb-5">
    Stage 2 in the Five-Stage stack.
  </h2>
  <p className="text-body-md text-silver mb-4">
    Stage 2 sits between Entity Resolution (Stage 1) and Structured Extractability (Stage 3). Its relationships with the other stages are directional, not optional.
  </p>
  <ul className="space-y-4 text-body-md text-silver list-disc pl-6">
    <li>
      <strong className="text-white">Stage 1 is the prerequisite.</strong>{" "}
      Source Authority cannot accrue to an unresolved entity. Every tier-1 press mention, every cross-entity citation, every named-author publishing trace attaches to the entity the engine has already anchored. An unresolved entity&apos;s citation evidence scatters across a disambiguation cloud — the engine cannot consolidate it into a single authority account. Stage 1 resolution, covered in full in <Link href="/citation-brief/stage-1-entity-resolution" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Citation Brief #006</Link>, must land before Stage 2 building is efficient. In practice: run Stage 1 as a three-week sprint, then begin Stage 2 building in parallel with the Stage 3 extractability sprint.
    </li>
    <li>
      <strong className="text-white">Stage 3 Structured Extractability returns full value when Stage 2 is present.</strong>{" "}
      Stage 3 — schema bundle, definitive openers, FAQPage architecture, extractable content patterns — makes pages quotable by AI engines. But the engine&apos;s decision about whether to quote a page is weighted by domain authority. A Stage 3-optimised page from a high Stage 2 authority domain is pulled more consistently and attributed more confidently than the same page from a low Stage 2 authority domain. The <Link href="/citation-brief/stage-3-structured-extractability" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Stage 3 deep-dive in Citation Brief #002</Link> covers the full extractability engineering stack. Run Stage 3 in parallel with Stage 2 — the two compound together.
    </li>
    <li>
      <strong className="text-white">Stage 4 Freshness prevents Stage 2 from decaying.</strong>{" "}
      Stage 2 authority is not static. An engine&apos;s model of a domain&apos;s authority is continuously updated as it re-crawls and incorporates new citation evidence. A domain that built Stage 2 authority and then stopped publishing, stopped earning citations, and stopped receiving external mentions will see its authority position decay — not quickly, but measurably over 12 to 24 months. Stage 4 Freshness — publishing new content, earning new citations, maintaining the named-author publishing cadence — is what keeps the Stage 2 account active and prevents the decay that would otherwise follow the plateau. This is a second reason the compounding retainer matters: it sustains the Stage 2 signal continuously, not in one-off sprints.
    </li>
    <li>
      <strong className="text-white">Stage 5 Recommendation History is the long-game compound of Stage 2.</strong>{" "}
      Stage 5 is the citation history loop: engines weight sources that have been cited before more heavily in future citation decisions. The citation history that feeds Stage 5 is generated primarily through Stage 2 and Stage 3 activity. High Stage 2 authority means the engine cites the domain more frequently; more frequent citations mean a deeper Stage 5 log; a deeper Stage 5 log raises the probability of future citation further. The three-stage compound — Stage 2 authority → Stage 3 extractability → Stage 5 citation history — is the full architecture of a durable AI citation position. It is built over years, not quarters. It starts with Stage 1 resolution, accelerates through Stage 2 building, and crystallises through Stage 5 compounding.
    </li>
  </ul>
</section>

<section className="mb-14">
  <h2 className="text-display-md text-white text-balance mb-5">
    Stage 2 and the agency brief.
  </h2>
  <p className="text-body-md text-silver mb-4">
    For agencies delivering AEO and GEO work, Stage 2 is the retainer argument. Stage 1 is the sprint deliverable — scoped, priced, delivered in three weeks, with a measurable output. Stage 2 is the sustained engagement: the authority engineering that runs alongside the client&apos;s content operation, the editorial outreach programme, the structured citation placement, the founder-voice publishing review and schema audit every quarter.
  </p>
  <p className="text-body-md text-silver mb-4">
    The client conversation at Stage 2 is simpler than it sounds: &quot;Your entity is resolved. Your pages are extractable. The engine can find you and quote you. The question now is whether it prefers you over your competitors when it has a choice. That is a Stage 2 question. The answer is a 12-month authority compounding programme — and here is how we measure whether it is working.&quot; The <Link href="/services/ai-visibility-monitoring" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">AI Visibility Monitoring</Link> retainer provides the instrumentation: monthly citation share against a named competitor set, source weight tier tracking, and authority delta reporting. The agency can show the client, in a monthly report, whether Stage 2 is accruing — and at what rate.
  </p>
  <p className="text-body-md text-silver mb-4">
    The practical agency deliverables at Stage 2: one tier-1 editorial outreach target per month (pitch, placement, transcript submission), founder-voice publishing review and schema audit each quarter, cross-entity co-mention facilitation (co-authored content, structured collaboration attribution), and consistent named-author publishing support. None of these are new disciplines — editorial outreach and thought-leadership programmes are established agency services. The Stage 2 framing adds the measurement layer that converts &quot;PR and content marketing&quot; into an AI citation authority building programme with a monthly citation-share outcome metric.
  </p>
  <p className="text-body-md text-silver">
    Wiele runs Stage 2 authority engineering as the compounding layer inside the Authority Engine retainer and the Wiele OS. The full agency capability layer — Stage 1 sprint, Stage 2 compounding, Stage 3 extractability, and monthly monitoring — is documented at <Link href="/for-agencies" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">/for-agencies</Link>. Brands who need the full system without an intermediary agency start with a <Link href="/audit" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Signal Audit</Link> that grades all five stages, surfaces the Stage 2 deficit specifically, and scopes the compounding programme from there. The <Link href="/for-brands" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">/for-brands</Link> page covers the full brand-direct engagement model.
  </p>
</section>

<section className="mb-14">
  <h2 className="text-display-md text-white text-balance mb-5">
    Methodology &amp; sources.
  </h2>
  <p className="text-body-md text-silver mb-3">
    Stage 2 patterns observed across the Wiele AI Citation Tracker dataset (private, anonymised) over 18 months of weekly engine runs. Authority signal mechanics cross-referenced against each provider&apos;s public documentation and the information-theoretic literature on source trust:
  </p>
  <ul className="space-y-2 text-body-md text-silver list-disc pl-6">
    <li>Google Search Central — E-E-A-T documentation, domain authority and expert content guidance</li>
    <li>Google Quality Rater Guidelines — source quality assessment framework, authoritativeness signals</li>
    <li>Schema.org — Article, Person, Organization type specifications and author property documentation</li>
    <li>OpenAI ChatGPT search — source-weight and authority-tier citation behaviour across 240+ panel queries</li>
    <li>Perplexity — public source-weight methodology; source tier documentation</li>
    <li>Gemini — Grounding and citation attribution documentation</li>
    <li>Wiele Citation Tracker dataset — 18 months · 12 client cohorts · weekly engine runs across 10 engines · Stage 2 authority-lift traces across 6 Authority Engine engagements</li>
    <li>The <Link href="/citation-brief/how-agencies-get-cited-in-ai-answers" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Five-Stage Citation Hierarchy</Link> (Citation Brief #001) provides the broader methodological context for all five stages</li>
    <li>The <Link href="/citation-brief/stage-1-entity-resolution" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Stage 1 Entity Resolution</Link> brief (Citation Brief #006) covers the prerequisite stage in full</li>
  </ul>
  <p className="text-body-sm text-smoke mt-5">
    All claims are reproducible from public sources or Wiele&apos;s instrumented engine-run dataset. Engagement clients receive the Stage 2 authority-lift trace inside the Citation Score™ dashboard. Methodology and measurement standards at <Link href="/trust" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">/trust</Link>.
  </p>
</section>

<section className="mb-2">
  <p className="text-body-md text-silver">
    Stage 2 is where the citation ceiling is set. Stage 1 makes you eligible; Stage 2 makes you preferred. If you want a graded assessment of your current Stage 2 position — citation share, source weight tier, authority delta against your named competitors — start with a <Link href="/audit" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Signal Audit</Link>. The Stage 2 authority gap report is the diagnostic that scopes the compounding programme. Once Stage 2 is instrumented, <Link href="/citation-brief/stage-3-structured-extractability" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Stage 3 Structured Extractability</Link> is the parallel sprint-scale intervention that maximises the return on the authority you are building. The full <Link href="/citation-brief/how-agencies-get-cited-in-ai-answers" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Five-Stage Citation Hierarchy</Link> in Citation Brief #001 maps the complete architecture.
  </p>
</section>
```

---

### 4b. `src/lib/citation-briefs-static.ts` — append manifest entry

After the closing brace of the `stage-1-entity-resolution` entry (briefNumber 6),
append:

```typescript
  {
    slug: "stage-2-source-authority",
    briefNumber: 7,
    title:
      "Stage 2 — Source Authority: how AI engines decide which domains to trust",
    summary:
      "Stage 2 of the Five-Stage Citation Hierarchy is Source Authority — the engine's confidence that your domain is a primary, trustworthy source. Unlike Stage 1, it cannot be sprint-fixed. It compounds over months through five signals: tier-1 editorial citations, named-author publishing consistency, cross-entity citations, topical concentration, and temporal consistency. The authority layer that determines whether you are cited or merely eligible.",
    eyebrow: "AEO methodology",
    category: "AEO methodology",
    author: "Jonathan Landman",
    reviewer: "Jonathan Landman",
    lastUpdated: "2026-05-25",
    readingMinutes: 14,
    faq: [
      {
        question: "What is Stage 2 Source Authority in the Five-Stage Citation Hierarchy?",
        answer:
          "Stage 2 Source Authority is the engine's confidence that your domain is a primary, trustworthy source for the topics it covers. It is the second stage of the Five-Stage Citation Hierarchy — stacking on Entity Resolution (Stage 1) and feeding Structured Extractability (Stage 3), Freshness (Stage 4), and Recommendation History (Stage 5). Unlike Stage 1, which is binary and sprint-resolvable in three weeks, Stage 2 is a continuous variable that compounds through five measurable signals over months and quarters: tier-1 editorial citations, named-author publishing consistency, cross-entity citations, topical concentration, and temporal consistency.",
      },
      {
        question: "How is Source Authority different from Entity Resolution?",
        answer:
          "Entity Resolution (Stage 1) is binary: either the engine can identify your brand as a distinct entity or it cannot. It is a threshold, fixed in a three-week sprint. Source Authority (Stage 2) is a continuous variable: the engine's cumulative assessment of how trustworthy your domain is as a primary source, built over months of consistent publishing, external citation, and editorial validation. Stage 1 asks: 'Do we know who this brand is?' Stage 2 asks: 'Do we trust this brand as a primary source when we have a choice of sources?' You cannot shortcut Stage 2 the way you can Stage 1. It compounds — and that is precisely what makes it a moat.",
      },
      {
        question: "How long does it take to build Stage 2 Source Authority?",
        answer:
          "Expect the first measurable Stage 2 lift — moving from secondary to primary citation in the monthly engine-run panel — between months three and six of deliberate building, after a clean Stage 1 sprint. Expect Stage 2 citation share to stabilise (within ±10 percentage points month over month) between months nine and fifteen, depending on vertical competition and citation quality. Stage 5 Recommendation History begins reinforcing Stage 2 between months twelve and eighteen. The AI Visibility Monitoring retainer instruments the lift monthly — citation share, source weight tier, and authority delta against a named competitor set — so the compounding is visible and attributable throughout.",
      },
      {
        question: "What counts as a tier-1 citation for AI engine authority?",
        answer:
          "A tier-1 editorial citation is a mention of your brand, founder, or methodology in a publication the engine already treats as an authoritative source: national and trade press, podcast transcripts hosted on authoritative domains, academic or professional publications, and recognised industry databases. The weight hierarchy is steep: one tier-1 press mention in a domain the engine trusts carries more Stage 2 signal than one hundred directory listings. The editorial process — a journalist researching and choosing to mention the brand, a podcast host inviting the founder — is what the engine uses as a proxy for genuine external validation. It cannot be replicated by publishing your own content, no matter how well-structured that content is.",
      },
      {
        question: "Can a Stage 2 deficit be sprint-fixed?",
        answer:
          "No. Stage 2 is the one stage in the Five-Stage Hierarchy that cannot be resolved in a fixed sprint. Stage 1 Entity Resolution is a three-week engineering sprint. Stage 3 Structured Extractability is a focused sprint across your top pages. Stage 2 Source Authority is the engine's cumulative model of your domain, built from months of consistent publishing, external citation, and editorial validation. There is no API call or schema property that installs it. The right framing: Stage 2 is always running in the background — the question is whether you are actively building it through deliberate authority compounding or passively letting competitors outpace you. The compounding retainer is the vehicle; the one-off sprint is not.",
      },
      {
        question: "How does Source Authority relate to Google's E-E-A-T?",
        answer:
          "E-E-A-T — Experience, Expertise, Authoritativeness, Trustworthiness — is Google's internal quality-rater framework for assessing content quality. Stage 2 Source Authority is the AI-search-era operationalisation of the same underlying concept: the engine's confidence in a domain as a trustworthy primary source. The five Stage 2 signals (tier-1 citations, named-author publishing, cross-entity citations, topical concentration, temporal consistency) each map to E-E-A-T sub-components. Building Stage 2 systematically improves E-E-A-T signals — and vice versa. The two are complementary, not competing frameworks. Wiele engineers both as one integrated system: classical SEO authority compounds AEO citation, and AEO citation feeds E-E-A-T signals on ranking decisions.",
      },
      {
        question: "Does Source Authority apply to the whole domain or to individual pages?",
        answer:
          "Stage 2 Source Authority is primarily a domain-level signal, not a page-level one. The engine builds a model of the domain — this is the source it trusts for AI search authority, this is the source it weights secondary for financial services, this is the source it treats as a primary source for AEO methodology — and applies that model across all pages from that domain. Page-level extractability (Stage 3) determines which specific content gets pulled, but domain-level authority (Stage 2) determines how confidently the engine attributes the citation. A strong Stage 3 page on a weak Stage 2 domain will be pulled from but not prominently attributed; the same page on a strong Stage 2 domain will be cited with confidence and named attribution.",
      },
      {
        question: "How does Wiele build Source Authority for clients?",
        answer:
          "Wiele builds Stage 2 through the Authority Engine retainer: one tier-1 editorial outreach target per month (pitch, placement, transcript submission), founder-voice publishing review and schema audit each quarter, structured cross-entity co-mention facilitation, and consistent named-author publishing support. The AI Visibility Monitoring retainer instruments the lift: monthly citation share against a named competitor set, source weight tier tracking, and authority delta reporting — so the compounding is visible, not inferred. Most engagements start with a Signal Audit that grades Stage 2 specifically and surfaces the gap against named competitors. The Signal Audit is the recommended first step: it scopes the programme and sets the baseline before any compounding investment is made.",
      },
    ],
  },
```

---

### 4c. `src/app/citation-brief/[slug]/page.tsx` — add static import

In the static import block (currently lines 44–58), add after the Stage1EntityResolution import:

```typescript
import Stage2SourceAuthority from "@/content/citation-briefs/stage-2-source-authority.mdx";
```

In the BRIEF_COMPONENTS record, add after the `"stage-1-entity-resolution"` entry:

```typescript
  "stage-2-source-authority": Stage2SourceAuthority,
```

Both the import AND the BRIEF_COMPONENTS entry must ship in the same commit —
if either is missing, the page 404s in production (Phase 7.4 rule).

---

### 4d. `src/app/sitemap.ts` — append to STATIC_ROUTES

After the `/citation-brief/stage-1-entity-resolution` block, add:

```typescript
  /* Phase 2 Step 7 (2026-05-25) — Citation Brief #007.
     Stage 2 Source Authority deep-dive. Compounding retainer argument.
     Cross-linked from /for-brands, /for-agencies, AVM, and CB#006.
     NOTE: STATIC_ROUTES is hand-maintained — each brief requires a manual entry. */
  {
    path: "/citation-brief/stage-2-source-authority",
    priority: 0.85,
    changeFrequency: "monthly" as const,
  },
```

---

### 4e. `public/llms.txt` — add CB #007

After the `/citation-brief/stage-1-entity-resolution` line, add:

```
- https://wielegroup.com/citation-brief/stage-2-source-authority — Citation Brief #007: Stage 2 Source Authority — how AI engines decide which domains to trust, the five authority signals, the compounding retainer argument, E-E-A-T operationalisation for AI search
```

---

### 4f. `scripts/notify-indexnow.sh` — append URL

```bash
https://wielegroup.com/citation-brief/stage-2-source-authority
```

---

## §5 · Acceptance criteria (every item must pass)

- [ ] `src/content/citation-briefs/stage-2-source-authority.mdx` exists
- [ ] Static import added in `[slug]/page.tsx` import block
- [ ] `"stage-2-source-authority": Stage2SourceAuthority` added to BRIEF_COMPONENTS
- [ ] Manifest entry `briefNumber: 7` appended in `citation-briefs-static.ts`
- [ ] 8 FAQ entries present in manifest
- [ ] `/citation-brief/stage-2-source-authority` in `src/app/sitemap.ts` STATIC_ROUTES
- [ ] `public/llms.txt` contains `stage-2-source-authority`
- [ ] `scripts/notify-indexnow.sh` contains `stage-2-source-authority`
- [ ] `npm run build:cf` passes — static page count ≥52
- [ ] Zero `£` or `GBP` in MDX or manifest

---

## §6 · Verification commands

```bash
# 1. Build passes — check for ≥52 static pages
npm run build:cf 2>&1 | tail -20
# Expected: ✓ Compiled successfully, no errors

# 2. TypeScript clean
npx tsc --noEmit 2>&1 | head -20
# Expected: no output

# 3. ESLint on edited files
npx eslint src/app/citation-brief/[slug]/page.tsx src/lib/citation-briefs-static.ts 2>&1 | head -10
# Expected: no errors

# 4. Production 200
curl -sI https://wielegroup.com/citation-brief/stage-2-source-authority | head -3
# Expected: HTTP/2 200

# 5. Schema — BreadcrumbList + Article + FAQPage + Person
curl -s -A 'Mozilla/5.0' https://wielegroup.com/citation-brief/stage-2-source-authority \
  | grep -oE '"@type"\s*:\s*"(BreadcrumbList|Article|FAQPage|Person)"' | sort | uniq
# Expected: all four present

# 6. Internal links confirmed
curl -s -A 'Mozilla/5.0' https://wielegroup.com/citation-brief/stage-2-source-authority \
  | grep -oE 'href="(/audit|/for-agencies|/for-brands|/services/ai-visibility-monitoring|/citation-brief/stage-1-entity-resolution|/citation-brief/stage-3-structured-extractability|/citation-brief/how-agencies-get-cited-in-ai-answers)"' \
  | sort | uniq
# Expected: all seven destinations present

# 7. No GBP
grep -n "£\|GBP" src/content/citation-briefs/stage-2-source-authority.mdx
# Expected: 0 matches

# 8. Sitemap includes CB #007
curl -s https://wielegroup.com/sitemap.xml | grep "stage-2-source-authority"
# Expected: 1 match

# 9. Citation brief index includes CB #007
curl -s -A 'Mozilla/5.0' https://wielegroup.com/citation-brief \
  | grep "stage-2-source-authority"
# Expected: ≥1 match

# 10. IndexNow
bash scripts/notify-indexnow.sh
# Expected: HTTP 200
```

---

## §7 · Commit + tag + deploy

```bash
# Regen lastmod (sitemap changed)
node scripts/gen-static-route-lastmod.mjs

# Commit
git add -A
git commit -m "feat(citation-brief): Phase 2 Step 7 — CB#007 Stage 2 Source Authority"

# Tag
git tag phase2-step7-citation-brief-007-2026-05-25

# Push
git push origin main --tags

# Deploy
npx wrangler deploy

# IndexNow
bash scripts/notify-indexnow.sh
```

---

## §8 · Report format

```
Status: SHIPPED / FAIL
Live URL: https://wielegroup.com/citation-brief/stage-2-source-authority
Worker version:
Tag:
Commit:
Gate results:
  1. Build (≥52 pages) — PASS / FAIL
  2. TypeScript — PASS / FAIL
  3. ESLint — PASS / FAIL
  4. Production 200 — PASS / FAIL
  5. Schema (BreadcrumbList + Article + FAQPage + Person) — PASS / FAIL
  6. Internal links (all 7) — PASS / FAIL
  7. No GBP — PASS / FAIL
  8. Sitemap — PASS / FAIL
  9. Citation brief index — PASS / FAIL
  10. IndexNow — PASS / FAIL
Issues:
Next action:
```

---

## §9 · Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Static import missing — BRIEF_COMPONENTS entry present without matching import → undefined component → 404 | HIGH | Directive §2 Rule 1: both must ship together. Read `[slug]/page.tsx` before editing and verify import block is in scope. |
| BRIEF_COMPONENTS entry missing — import present without map entry → page still 404s in production | HIGH | Same mitigation — pre-read and verify both are added. |
| `gen-static-route-lastmod.mjs` must run before commit when sitemap changes | LOW | §7 runs gen first |
| MDX `&apos;` and `&amp;` entities — required for JSX string literals; must be preserved verbatim | LOW | Copy MDX verbatim from this directive; do not reformat apostrophes |
| FAQ array: 8 entries required for FAQPage schema to generate — confirm count before committing | LOW | Grep the manifest entry after editing: `grep -c '"question"' src/lib/citation-briefs-static.ts` — should be ≥56 (7 × 8) |

---

## Phase 2 progress after Step 7

| Step | Scope | Status |
|---|---|---|
| Phase 1 | EUR, CTAs, claim safety, trust strip | ✅ Shipped |
| Step 1 | /for-agencies ICP page | ✅ Shipped |
| Step 2 | AVM deep-dive | ✅ Shipped |
| Step 3 | PBSS deep-dive | ✅ Shipped |
| Step 4 | Citation Brief #006 — Stage 1 Entity Resolution | ✅ Shipped |
| Step 5 | /for-brands ICP page | ✅ Shipped |
| Step 6 | Conversion integrity audit + mesh repair | ✅ Shipped |
| Step 6.5 | /for-agencies Go-deeper links | ✅ Shipped |
| **Step 7** | **Citation Brief #007 — Stage 2 Source Authority** | **← this directive** |
| Step 8 (candidate) | Citation Brief #008 — Stage 4 Freshness (next gap in hierarchy) | TBD |
| Step 9 (candidate) | Primary nav surfacing of /for-brands + /for-agencies | TBD |
