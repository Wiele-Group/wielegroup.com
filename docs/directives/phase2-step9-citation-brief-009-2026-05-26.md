# Phase 2 Step 9 — Citation Brief #009: Stage 5 Recommendation History
**Directive version:** phase2-step9-citation-brief-009-2026-05-26  
**Prepared by:** Claude Cowork  
**Date:** 2026-05-26  
**Scope:** Create Citation Brief #009 — Stage 5 Recommendation History. Final stage of the Five-Stage Citation Hierarchy. Add to brief cluster, manifest, static imports, sitemap, llms.txt, lastmod script, IndexNow.

---

## §0 PRE-FLIGHT — HARD STOP IF ANY FAILS

```bash
# 1. Clean working tree
git status
# Expected: nothing to commit, working tree clean

# 2. On main
git branch --show-current
# Expected: main

# 3. Confirm CB#008 is the last manifest entry
grep "stage-4-freshness" src/lib/citation-briefs-static.ts
# Expected: one match

# 4. Confirm CB#008 static import is present
grep "Stage4Freshness" src/app/citation-brief/\[slug\]/page.tsx
# Expected: two matches (import + BRIEF_COMPONENTS entry)

# 5. No existing CB#009 file
ls src/content/citation-briefs/stage-5-recommendation-history.mdx 2>/dev/null && echo EXISTS || echo OK
# Expected: OK

# 6. Confirm gen script has stage-4-freshness (Step 8.5 fix applied)
grep "stage-4-freshness" scripts/gen-static-route-lastmod.mjs
# Expected: one match

# 7. Node + npm accessible
node -v && npm -v
```

All 7 checks must pass. Any failure = hard stop.

---

## §1 BRIEF IDENTITY

| Field | Value |
|---|---|
| Slug | `stage-5-recommendation-history` |
| Brief number | 9 |
| Title | `Stage 5 — Recommendation History: how early citation becomes a compounding moat` |
| Eyebrow | `AEO methodology` |
| Category | `AEO methodology` |
| Author | `Jonathan Landman` |
| Reviewer | `Jonathan Landman` |
| lastUpdated | `2026-05-26` |
| readingMinutes | `13` |
| ogImage | (none — use siteConfig.ogImage default) |

**Summary:**
> Stage 5 of the Five-Stage Citation Hierarchy is Recommendation History — the engine's accumulated record of having cited your brand on a topic. It is the only stage that compounds indefinitely: early citation makes future citation more likely, which deepens the history, which raises citation probability further. Every other stage in the hierarchy exists to earn the first citations that start this loop. Stage 5 is where those citations become a moat.

---

## §2 FAQ ARRAY (8 entries — verbatim for BRIEF_MANIFEST)

```typescript
faq: [
  {
    question:
      "What is Stage 5 Recommendation History in the Five-Stage Citation Hierarchy?",
    answer:
      "Stage 5 Recommendation History is the engine's accumulated record of having cited your brand on a given topic or query cluster. It is the capstone of the Five-Stage Citation Hierarchy — stacking on Entity Resolution (Stage 1), Source Authority (Stage 2), Structured Extractability (Stage 3), and Freshness (Stage 4). Unlike the earlier stages, which establish the conditions for citation, Stage 5 is what happens after the first citations land: the engine builds a pattern, and that pattern becomes a prior. The more consistently and recently your brand has been cited on a topic, the higher the engine's default probability of citing it again. Stage 5 is the only stage that compounds without a ceiling — and the only stage where a first-mover advantage persists.",
  },
  {
    question: "How does Recommendation History compound?",
    answer:
      "The compounding mechanism is probabilistic reinforcement. When an AI engine cites a brand on a topic and that citation is not corrected, disputed, or displaced, the engine's internal confidence in that citation increases slightly. The next time the same or a similar query arrives, the brand's probability of citation is marginally higher. Over months of consistent citation across a topic cluster, the probability tilts decisively — not because the brand is actively winning a competition, but because its history has become the engine's default. The loop accelerates when citation spreads across multiple engines: a brand cited by ChatGPT, Perplexity, and Gemini on the same topic cluster has three independent history threads compounding in parallel. Cross-engine citation history is the strongest form of Stage 5.",
  },
  {
    question:
      "Can a new entrant compete with a brand that has years of citation history?",
    answer:
      "Yes — but the path is narrow and requires deliberate sequencing. A brand with years of citation history has a Stage 5 moat: the engine's prior is strong and the compounding has run for long enough that displacement requires sustained effort across all five stages simultaneously. The new entrant's best approach is not to compete on the same queries directly, but to dominate an adjacent sub-topic cluster where the incumbent has shallow history, build Stage 5 depth there, and expand from that beachhead. The other lever is Stage 3 Structured Extractability: a new entrant with cleaner, more extractable answers on a query where the incumbent's content is dense or poorly structured can earn citations faster than the history gap would suggest. Stage 5 favours incumbents; Stage 3 favours challengers. The combination is how the gap closes.",
  },
  {
    question:
      "How long does it take to build measurable Recommendation History?",
    answer:
      "The first measurable Stage 5 signal — a consistent citation pattern emerging in the monthly engine-panel run across two or more query variants — typically appears between months three and six of deliberate compounding after a clean Stage 1 sprint. Stage 5 becomes durable (resistant to single-query competitor displacement) between months nine and fifteen. Cross-engine citation history, where the pattern holds across ChatGPT, Perplexity, Gemini, and Claude simultaneously, typically stabilises between months twelve and twenty-four, depending on vertical competition and content quality. These timelines assume consistent Stage 4 maintenance throughout — a gap in freshness interrupts the compounding and partially resets the history thread for affected queries.",
  },
  {
    question: "What breaks the compounding loop?",
    answer:
      "Three failure modes interrupt Stage 5 compounding. First, Stage 4 neglect: if content goes stale and the engine pulls an outdated answer, the citation quality signal decays and the probability prior softens. The history does not reset to zero, but the compounding slows or reverses on stale queries. Second, Stage 3 degradation: if a structural change to the page (CMS migration, redesign, content restructure) breaks the extractable answer block, the engine stops pulling from the page. The history thread pauses; a competitor fills the gap. Third, competitor breakthrough: if a competitor completes stages 1 through 4 cleanly on a query where your history is thin or uneven, the engine splits citations and the exclusive history advantage ends. The first two failure modes are preventable through maintenance; the third is managed by building history depth across a topic cluster rather than a single query.",
  },
  {
    question: "How does Stage 5 relate to Stage 2 Source Authority?",
    answer:
      "Stage 2 Source Authority is the engine's domain-level trust signal, built from external editorial citations, named-author publishing, and topical concentration. Stage 5 Recommendation History is the engine's query-level citation pattern, built from being cited consistently on specific topics over time. The two are complementary and mutually reinforcing. Stage 2 makes the engine confident enough to start citing your brand — it is the threshold that earns the first citations. Stage 5 is what those citations become over time: a pattern that raises citation probability further. A strong Stage 2 domain that neglects Stage 5 (by failing to earn consistent citation on specific queries) holds broad trust but shallow topical citation depth. A domain with deep Stage 5 history on a narrow topic cluster and weak Stage 2 is vulnerable to displacement when a higher-authority competitor enters the cluster. The strongest citation posture is strong Stage 2 across the domain combined with deep Stage 5 history across the priority topic cluster.",
  },
  {
    question:
      "Is Recommendation History the same across all AI engines?",
    answer:
      "No — each engine builds its history independently. Citation patterns in ChatGPT do not automatically transfer to Perplexity or Gemini. A brand cited exclusively by one engine has a single-thread history that is vulnerable if that engine's behaviour changes, its retrieval layer shifts, or a competitor displaces it on that engine specifically. The strongest Stage 5 posture is cross-engine citation history: consistent citation across ChatGPT, Perplexity, Gemini, and Claude on the same query cluster. Cross-engine history is also the strongest external signal that Stage 2 Source Authority is genuinely established rather than engine-specific. The Wiele AI Visibility Monitoring retainer tracks citation share per engine per query cluster — the cross-engine view is the primary Stage 5 dashboard.",
  },
  {
    question: "How does Wiele build Recommendation History for clients?",
    answer:
      "Wiele builds Stage 5 through the Authority Engine retainer, which runs all five stages as one integrated system. Stage 5 specifically: monthly engine-panel runs track citation share per query cluster per engine — surfacing where history is building, where it is stalling, and where a competitor is building a competing history thread. Stage 4 maintenance is built into the retainer cadence to ensure freshness does not interrupt the compounding. Stage 3 audits are run quarterly to catch structural changes that would break the extractable answer. Stage 2 outreach (one tier-1 editorial placement per month) continuously feeds the authority layer that Stage 5 compounds on. The Citation Score™ subscription instruments Stage 5 directly through its Recommendation History component — tracking the citation pattern across engines and surfacing the depth and durability of the history on each priority query. Most engagements start with a Signal Audit that maps the current Stage 5 baseline against a named competitor set: which queries have an established history, which are contested, and which represent open compounding opportunities.",
  },
],
```

---

## §3 PRE-READS — READ EVERY FILE BEFORE EDITING ANYTHING

| # | File | Purpose |
|---|---|---|
| 3a | `src/lib/citation-briefs-static.ts` (last 60 lines) | Confirm CB#008 is last entry; identify insertion point |
| 3b | `src/app/citation-brief/[slug]/page.tsx` (lines 1–65) | Confirm Stage4Freshness is last static import |
| 3c | `src/app/sitemap.ts` (lines 155–190) | Confirm CB#008 entry; identify insertion point |
| 3d | `public/llms.txt` | Confirm CB#008 entry; identify insertion point |
| 3e | `scripts/gen-static-route-lastmod.mjs` (STATIC_ROUTES section) | Confirm stage-4-freshness is present; identify insertion point |
| 3f | `src/content/citation-briefs/stage-4-freshness.mdx` | Pattern reference — MDX structure, imports, Reveal usage, link classes |
| 3g | `scripts/notify-indexnow.sh` | Identify insertion point |

---

## §4 FILE EDITS — VERBATIM

### §4a NEW FILE — `src/content/citation-briefs/stage-5-recommendation-history.mdx`

Create this file exactly as written.

```mdx
import { Reveal } from "@/components/motion/reveal";
import Link from "next/link";

<div className="rounded-xl border border-electric/30 bg-electric/5 px-6 py-5 mb-10">
  <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-2">60-second answer</p>
  <p className="text-body-sm text-primary leading-relaxed">
    Stage 5 Recommendation History is the engine's accumulated record of having cited your brand on a topic. It is the only stage in the Five-Stage Citation Hierarchy that compounds without a ceiling: early citation raises citation probability, which generates more citation, which deepens the history, which raises probability further. Every other stage exists to earn the first citations that start this loop. Stage 5 is where those citations become a moat — and where the brands that started earliest hold a structural advantage that widens with every month.
  </p>
</div>

## The stage where citation becomes compounding

The first four stages of the Five-Stage Citation Hierarchy are about earning the right to be cited. Stage 1 Entity Resolution establishes who you are. Stage 2 Source Authority establishes why the engine should trust you. Stage 3 Structured Extractability ensures the engine can pull a clean answer from your page. Stage 4 Freshness ensures that answer is current.

Stage 5 is what happens after the first citations land.

An AI engine that has cited a brand on a topic — and found that citation to be accurate, extractable, and not disputed — develops a prior. The next time a similar query arrives, the brand's probability of citation is slightly higher. The time after that, slightly higher again. Over months and quarters, this prior deepens into a history thread: the engine's accumulated evidence that this brand is reliably cited when this query cluster comes up.

That history thread compounds. It does not plateau. A brand with two years of consistent citation history on a topic is not twice as hard to displace as a brand with one year — it is significantly harder, because the depth of the prior makes the engine resistant to single-query interventions. Competitors can earn citations on adjacent queries. They cannot quickly overwrite an established history on the queries where the incumbent has deep Recommendation History.

This is the only stage in the hierarchy where a first-mover advantage persists structurally. The brands building citation history now are creating compounding advantages that will widen every month — not because they will necessarily always have the best content, but because their history thread will make the engine's default harder to shift.

---

## The five Recommendation History signals

<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 my-8">
  <Reveal delay={0}>
    <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-raised)] p-5 h-full">
      <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-2">Signal 1</p>
      <h3 className="text-body-sm font-semibold text-primary mb-2">Citation frequency</h3>
      <p className="text-body-xs text-secondary leading-relaxed">How often the brand appears in the engine's citation set for a given topic cluster. Frequency across multiple query variants on the same topic is more valuable than a high count on a single query — it signals topic-level authority, not query-level optimisation.</p>
    </div>
  </Reveal>
  <Reveal delay={0.05}>
    <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-raised)] p-5 h-full">
      <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-2">Signal 2</p>
      <h3 className="text-body-sm font-semibold text-primary mb-2">Citation longevity</h3>
      <p className="text-body-xs text-secondary leading-relaxed">Whether the brand has been cited on this topic for months or years, not just in a recent campaign spike. Longevity is what distinguishes a durable prior from a temporary optimisation effect — the engine weights sustained history above recent peaks.</p>
    </div>
  </Reveal>
  <Reveal delay={0.1}>
    <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-raised)] p-5 h-full">
      <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-2">Signal 3</p>
      <h3 className="text-body-sm font-semibold text-primary mb-2">Cross-engine citation</h3>
      <p className="text-body-xs text-secondary leading-relaxed">Whether the brand is cited by multiple engines — ChatGPT, Perplexity, Gemini, Claude — on the same topic cluster. Cross-engine history is the strongest form of Stage 5: independent systems reaching the same citation conclusion is the highest-confidence signal that the brand is the primary source for the topic.</p>
    </div>
  </Reveal>
  <Reveal delay={0.15}>
    <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-raised)] p-5 h-full">
      <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-2">Signal 4</p>
      <h3 className="text-body-sm font-semibold text-primary mb-2">Topical depth</h3>
      <p className="text-body-xs text-secondary leading-relaxed">Whether the brand is cited across multiple sub-topics within a category, not just one anchor query. Shallow history — dominant on one query, absent on adjacent ones — is fragile. Deep topical history creates a citation surface that is difficult to displace partially and nearly impossible to displace entirely.</p>
    </div>
  </Reveal>
  <Reveal delay={0.2}>
    <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-raised)] p-5 h-full">
      <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-2">Signal 5</p>
      <h3 className="text-body-sm font-semibold text-primary mb-2">History continuity</h3>
      <p className="text-body-xs text-secondary leading-relaxed">Whether the citation pattern is uninterrupted — no gaps from content going stale, no structural breaks from site migrations, no periods of zero citation on core queries. Continuity is what turns frequency and longevity into a durable prior. A gap resets the compounding partially; the longer the gap, the larger the reset.</p>
    </div>
  </Reveal>
</div>

---

## How to diagnose a Stage 5 deficit

Four patterns indicate a Stage 5 problem:

- **A competitor is cited consistently on your core topic; you appear occasionally or not at all.** The competitor has established a prior. You have not started building one, or your history thread was interrupted. The gap will widen with every month the competitor's citations continue and yours do not.

- **Your citation share peaked after a sprint and then declined.** Stage 5 did not build because Stage 4 slipped — content went stale, the engine stopped pulling from your pages, and the history thread paused while the competitor's continued. The sprint created a window; the lack of maintenance closed it.

- **One engine cites you regularly; others do not.** Single-engine history is fragile. Cross-engine citation is the Stage 5 posture that persists when any one engine changes its retrieval behaviour, updates its training data, or shifts its weighting model.

- **You are cited for one specific query but not for adjacent queries in the same topic cluster.** Shallow topical history. A competitor who dominates the adjacent queries can surround your anchor query and compress your citation surface over time.

---

## The Stage 5 compounding loop

The full hierarchy runs as a loop once Stage 5 begins building:

Clean entity (Stage 1) → domain trust earned (Stage 2) → extractable answers available (Stage 3) → content maintained as current (Stage 4) → **first citation lands** → Recommendation History begins (Stage 5) → citation probability increases → more citations follow → history deepens → Stage 2 reinforced by citation pattern → Stage 5 compounds further.

Each full loop tightens the prior. Each interrupted loop — from a Stage 4 freshness gap, a Stage 3 structural break, or a Stage 2 authority deficit — softens it.

The practical implication: the loop cannot be started from Stage 5. It must be started from Stage 1 and run sequentially through the hierarchy. All five stages running simultaneously is what produces compounding. Any stage running at zero stops the loop at that point and caps the Stage 5 output at its current level.

---

## Stage 5 in the Five-Stage stack

Stage 5 is the capstone. Its relationship to every other stage:

- **Stage 1 prerequisite.** Recommendation History cannot build for an entity the engine has not resolved. Citations on an ambiguous or unresolved brand name are attributed to the category, not the brand. Stage 1 must be clean before Stage 5 can start.

- **Stage 2 feed.** Source Authority earns the first citations. Without a domain-level trust signal, the engine will not cite the brand frequently enough to build a history pattern — one-off citations are not Stage 5. Stage 2 is the input; Stage 5 is the output accumulated over time.

- **Stage 3 enabler.** Structured Extractability determines whether each citation is clean and attributable. A history built on poorly extracted, garbled, or misattributed citations is weaker than one built on clean, schema-confirmed, named-author citations. Stage 3 quality affects Stage 5 durability.

- **Stage 4 protector.** Freshness decay interrupts the loop. A stale page stops being cited; the history thread for that page's queries stops building. High Stage 4 maintenance is the most direct lever for ensuring Stage 5 continuity. Stage 4 does not build Stage 5; it prevents Stage 5 from being reset.

The full hierarchy: <Link href="/citation-brief/how-agencies-get-cited-in-ai-answers" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Citation Brief #001</Link>. Stage 1: <Link href="/citation-brief/stage-1-entity-resolution" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Citation Brief #006</Link>. Stage 2: <Link href="/citation-brief/stage-2-source-authority" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Citation Brief #007</Link>. Stage 3: <Link href="/citation-brief/stage-3-structured-extractability" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Citation Brief #002</Link>. Stage 4: <Link href="/citation-brief/stage-4-freshness" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Citation Brief #008</Link>.

---

## Stage 5 and the retainer argument

Stage 5 is the commercial argument for the long-term retainer made concrete.

A one-off sprint — however well-executed — addresses stages 1, 3, and partially 4. It does not build Recommendation History. History is the product of consistent citation over time, and consistent citation is the product of a system running continuously: monthly engine-panel measurement, quarterly content audits, ongoing Stage 2 outreach, and continuous Stage 3 structural maintenance.

The <Link href="/services/ai-visibility-monitoring" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">AI Visibility Monitoring retainer</Link> instruments Stage 5 directly: monthly citation share per engine per query cluster, with Recommendation History tracked as one of the four <Link href="/citation-score" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Wiele Citation Score™</Link> components. The history thread is visible, the compounding is attributable, and the competitive gap is measurable against a named competitor set every month.

For agencies, Stage 5 is the most defensible client value story in the AEO brief. Clients can see the history building in the monthly panel. They can see competitor history threads. They can see the compounding expressed as a widening gap on priority queries. The dependency on ongoing delivery is built into the methodology — not manufactured by the agency — because the loop cannot maintain itself without the four-stage foundation running beneath it. <Link href="/for-agencies" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Wiele OS for agencies</Link> covers Stage 5 delivery frameworks and the retainer architecture that produces them.

For brands, Stage 5 makes the cost of delay visible. Every month a brand is not building Recommendation History, a competitor is. The history gap that opens in 2026 will compound against the brand in 2027 and 2028. The <Link href="/for-brands" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Wiele brand engagement</Link> is designed to start the loop at the right stage and instrument the compounding so the value is visible from month three onward.

Start with the <Link href="/audit" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Signal Audit</Link> to map the current Stage 5 baseline: which queries have history, which are open, which competitors are compounding, and what the first-90-day build path looks like.

---

## Methodology & sources

The Five-Stage Citation Hierarchy is a Wiele Group framework. Stage 5 Recommendation History reflects Wiele's applied methodology across client engagements, tracked in the Wiele AI Citation Tracker dataset.

The compounding loop observations and cross-engine citation patterns are drawn from Wiele's monthly engine-panel methodology — documented at <Link href="/trust" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">/trust</Link>. Citation share tracking methodology uses the <Link href="/citation-score" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Wiele Citation Score™</Link> four-component metric, of which Recommendation History is the fourth component.
```

---

### §4b EDIT — `src/lib/citation-briefs-static.ts`

Append the following entry immediately after the closing `},` of the `stage-4-freshness` entry (briefNumber 8), before the closing `];` of the array.

```typescript
  {
    slug: "stage-5-recommendation-history",
    briefNumber: 9,
    title:
      "Stage 5 — Recommendation History: how early citation becomes a compounding moat",
    summary:
      "Stage 5 of the Five-Stage Citation Hierarchy is Recommendation History — the engine's accumulated record of having cited your brand on a topic. It is the only stage that compounds without a ceiling: early citation makes future citation more likely, which deepens the history, which raises citation probability further. Every other stage in the hierarchy exists to earn the first citations that start this loop. Stage 5 is where those citations become a moat.",
    eyebrow: "AEO methodology",
    category: "AEO methodology",
    author: "Jonathan Landman",
    reviewer: "Jonathan Landman",
    lastUpdated: "2026-05-26",
    readingMinutes: 13,
    faq: [
      {
        question:
          "What is Stage 5 Recommendation History in the Five-Stage Citation Hierarchy?",
        answer:
          "Stage 5 Recommendation History is the engine's accumulated record of having cited your brand on a given topic or query cluster. It is the capstone of the Five-Stage Citation Hierarchy — stacking on Entity Resolution (Stage 1), Source Authority (Stage 2), Structured Extractability (Stage 3), and Freshness (Stage 4). Unlike the earlier stages, which establish the conditions for citation, Stage 5 is what happens after the first citations land: the engine builds a pattern, and that pattern becomes a prior. The more consistently and recently your brand has been cited on a topic, the higher the engine's default probability of citing it again. Stage 5 is the only stage that compounds without a ceiling — and the only stage where a first-mover advantage persists.",
      },
      {
        question: "How does Recommendation History compound?",
        answer:
          "The compounding mechanism is probabilistic reinforcement. When an AI engine cites a brand on a topic and that citation is not corrected, disputed, or displaced, the engine's internal confidence in that citation increases slightly. The next time the same or a similar query arrives, the brand's probability of citation is marginally higher. Over months of consistent citation across a topic cluster, the probability tilts decisively — not because the brand is actively winning a competition, but because its history has become the engine's default. The loop accelerates when citation spreads across multiple engines: a brand cited by ChatGPT, Perplexity, and Gemini on the same topic cluster has three independent history threads compounding in parallel. Cross-engine citation history is the strongest form of Stage 5.",
      },
      {
        question:
          "Can a new entrant compete with a brand that has years of citation history?",
        answer:
          "Yes — but the path is narrow and requires deliberate sequencing. A brand with years of citation history has a Stage 5 moat: the engine's prior is strong and the compounding has run for long enough that displacement requires sustained effort across all five stages simultaneously. The new entrant's best approach is not to compete on the same queries directly, but to dominate an adjacent sub-topic cluster where the incumbent has shallow history, build Stage 5 depth there, and expand from that beachhead. The other lever is Stage 3 Structured Extractability: a new entrant with cleaner, more extractable answers on a query where the incumbent's content is dense or poorly structured can earn citations faster than the history gap would suggest. Stage 5 favours incumbents; Stage 3 favours challengers. The combination is how the gap closes.",
      },
      {
        question:
          "How long does it take to build measurable Recommendation History?",
        answer:
          "The first measurable Stage 5 signal — a consistent citation pattern emerging in the monthly engine-panel run across two or more query variants — typically appears between months three and six of deliberate compounding after a clean Stage 1 sprint. Stage 5 becomes durable (resistant to single-query competitor displacement) between months nine and fifteen. Cross-engine citation history, where the pattern holds across ChatGPT, Perplexity, Gemini, and Claude simultaneously, typically stabilises between months twelve and twenty-four, depending on vertical competition and content quality. These timelines assume consistent Stage 4 maintenance throughout — a gap in freshness interrupts the compounding and partially resets the history thread for affected queries.",
      },
      {
        question: "What breaks the compounding loop?",
        answer:
          "Three failure modes interrupt Stage 5 compounding. First, Stage 4 neglect: if content goes stale and the engine pulls an outdated answer, the citation quality signal decays and the probability prior softens. The history does not reset to zero, but the compounding slows or reverses on stale queries. Second, Stage 3 degradation: if a structural change to the page breaks the extractable answer block, the engine stops pulling from the page. The history thread pauses; a competitor fills the gap. Third, competitor breakthrough: if a competitor completes stages 1 through 4 cleanly on a query where your history is thin or uneven, the engine splits citations and the exclusive history advantage ends. The first two failure modes are preventable through maintenance; the third is managed by building history depth across a topic cluster rather than a single query.",
      },
      {
        question: "How does Stage 5 relate to Stage 2 Source Authority?",
        answer:
          "Stage 2 Source Authority is the engine's domain-level trust signal, built from external editorial citations, named-author publishing, and topical concentration. Stage 5 Recommendation History is the engine's query-level citation pattern, built from being cited consistently on specific topics over time. Stage 2 makes the engine confident enough to start citing your brand — it is the threshold that earns the first citations. Stage 5 is what those citations become over time: a pattern that raises citation probability further. A strong Stage 2 domain that neglects Stage 5 holds broad trust but shallow topical citation depth. A domain with deep Stage 5 history on a narrow topic cluster and weak Stage 2 is vulnerable to displacement when a higher-authority competitor enters. The strongest citation posture combines strong Stage 2 across the domain with deep Stage 5 history across the priority topic cluster.",
      },
      {
        question:
          "Is Recommendation History the same across all AI engines?",
        answer:
          "No — each engine builds its history independently. Citation patterns in ChatGPT do not automatically transfer to Perplexity or Gemini. A brand cited exclusively by one engine has a single-thread history that is vulnerable if that engine's behaviour changes or a competitor displaces it on that engine specifically. The strongest Stage 5 posture is cross-engine citation history: consistent citation across ChatGPT, Perplexity, Gemini, and Claude on the same query cluster. Cross-engine history is also the strongest external signal that Stage 2 Source Authority is genuinely established rather than engine-specific. The Wiele AI Visibility Monitoring retainer tracks citation share per engine per query cluster — the cross-engine view is the primary Stage 5 dashboard.",
      },
      {
        question: "How does Wiele build Recommendation History for clients?",
        answer:
          "Wiele builds Stage 5 through the Authority Engine retainer, which runs all five stages as one integrated system. Stage 5 specifically: monthly engine-panel runs track citation share per query cluster per engine — surfacing where history is building, where it is stalling, and where a competitor is building a competing history thread. Stage 4 maintenance is built into the retainer cadence to ensure freshness does not interrupt the compounding. Stage 3 audits are run quarterly to catch structural changes that would break the extractable answer. Stage 2 outreach continuously feeds the authority layer that Stage 5 compounds on. The Citation Score™ subscription instruments Stage 5 directly through its Recommendation History component — tracking the citation pattern across engines and surfacing the depth and durability of the history on each priority query. Most engagements start with a Signal Audit that maps the current Stage 5 baseline against a named competitor set.",
      },
    ],
  },
```

---

### §4c EDIT — `src/app/citation-brief/[slug]/page.tsx`

**Add import** — insert immediately after the `Stage4Freshness` import line:

```typescript
import Stage5RecommendationHistory from "@/content/citation-briefs/stage-5-recommendation-history.mdx";
```

**Add BRIEF_COMPONENTS entry** — insert immediately after `"stage-4-freshness": Stage4Freshness,`:

```typescript
  "stage-5-recommendation-history": Stage5RecommendationHistory,
```

---

### §4d EDIT — `src/app/sitemap.ts`

Append the following entry immediately after the `stage-4-freshness` entry block, before the `/citation-score` entry:

```typescript
  /* Phase 2 Step 9 (2026-05-26) — Citation Brief #009.
     Stage 5 Recommendation History — the compounding capstone of the
     Five-Stage Citation Hierarchy. First-mover advantage · cross-engine
     history · the retainer argument made concrete.
     NOTE: STATIC_ROUTES is hand-maintained — each brief requires a manual
     entry here. */
  {
    path: "/citation-brief/stage-5-recommendation-history",
    priority: 0.85,
    changeFrequency: "monthly" as const,
  },
```

---

### §4e EDIT — `public/llms.txt`

Append the following line immediately after the `stage-4-freshness` line:

```
- https://wielegroup.com/citation-brief/stage-5-recommendation-history — Citation Brief #009: Stage 5 Recommendation History — the compounding capstone of the Five-Stage Citation Hierarchy, the five history signals, the first-mover advantage, what breaks the loop, and the retainer argument made concrete
```

---

### §4f EDIT — `scripts/gen-static-route-lastmod.mjs`

In the `STATIC_ROUTES` array, append the following entry immediately after `"/citation-brief/stage-4-freshness"`:

```javascript
  "/citation-brief/stage-5-recommendation-history",
```

---

### §4g EDIT — `scripts/notify-indexnow.sh`

Append the following URL to the IndexNow URL list (after the `stage-4-freshness` entry):

```
  "https://wielegroup.com/citation-brief/stage-5-recommendation-history"
```

---

## §5 ACCEPTANCE CRITERIA — ALL MUST PASS BEFORE DEPLOY

```bash
# A1 — MDX file exists
ls src/content/citation-briefs/stage-5-recommendation-history.mdx

# A2 — Manifest has 9 entries
grep -c "briefNumber:" src/lib/citation-briefs-static.ts
# Expected: 9 (note: type definition adds 1 — if grep returns 10, check for the
# type field "briefNumber: number" in CitationBriefManifestEntry; actual data
# entries should be 9)

# A3 — CB#009 slug in manifest
grep "stage-5-recommendation-history" src/lib/citation-briefs-static.ts

# A4 — Static import present in page.tsx
grep "Stage5RecommendationHistory" src/app/citation-brief/\[slug\]/page.tsx
# Expected: 2 matches (import + BRIEF_COMPONENTS entry)

# A5 — Sitemap has CB#009 entry
grep "stage-5-recommendation-history" src/app/sitemap.ts

# A6 — llms.txt has CB#009 entry
grep "stage-5-recommendation-history" public/llms.txt

# A7 — gen script has CB#009 route
grep "stage-5-recommendation-history" scripts/gen-static-route-lastmod.mjs

# A8 — No GBP/£ in new MDX
grep -i "£\|gbp" src/content/citation-briefs/stage-5-recommendation-history.mdx
# Expected: no output

# A9 — TypeScript check
npx tsc --noEmit

# A10 — ESLint
npx next lint

# A11 — Build
npm run build
# Expected: exit 0, static page count ≥ 54

# A12 — Regenerate lastmod BEFORE git add
npm run gen:lastmod
```

---

## §6 POST-DEPLOY VERIFICATION — ALL 10 MUST PASS

```bash
# V1
curl -I https://wielegroup.com/citation-brief/stage-5-recommendation-history
# Expected: HTTP/2 200

# V2
curl -s https://wielegroup.com/citation-brief/stage-5-recommendation-history | grep -i "stage 5"

# V3 — Article schema
curl -s https://wielegroup.com/citation-brief/stage-5-recommendation-history | grep '"@type":"Article"'

# V4 — FAQPage schema
curl -s https://wielegroup.com/citation-brief/stage-5-recommendation-history | grep '"@type":"FAQPage"'

# V5 — BreadcrumbList schema
curl -s https://wielegroup.com/citation-brief/stage-5-recommendation-history | grep '"@type":"BreadcrumbList"'

# V6 — Person schema
curl -s https://wielegroup.com/citation-brief/stage-5-recommendation-history | grep '"@type":"Person"'

# V7 — Sitemap includes CB#009
curl -s https://wielegroup.com/sitemap.xml | grep "stage-5-recommendation-history"

# V8 — Citation brief index includes CB#009
curl -s https://wielegroup.com/citation-brief | grep -i "recommendation"

# V9 — No GBP in live source
curl -s https://wielegroup.com/citation-brief/stage-5-recommendation-history | grep -i "£\|gbp"
# Expected: no output

# V10 — Internal links spot-check
curl -I https://wielegroup.com/citation-brief/stage-4-freshness | head -1
curl -I https://wielegroup.com/citation-brief/stage-2-source-authority | head -1
curl -I https://wielegroup.com/audit | head -1
# Expected: all HTTP/2 200
```

---

## §7 COMMIT + TAG + DEPLOY SEQUENCE

```bash
# 1. Regenerate lastmod (after editing gen script + sitemap)
npm run gen:lastmod

# 2. Stage all changes
git add \
  src/content/citation-briefs/stage-5-recommendation-history.mdx \
  src/lib/citation-briefs-static.ts \
  "src/app/citation-brief/[slug]/page.tsx" \
  src/app/sitemap.ts \
  src/lib/static-route-lastmod.generated.json \
  public/llms.txt \
  scripts/gen-static-route-lastmod.mjs \
  scripts/notify-indexnow.sh

# 3. Verify diff
git diff --cached --stat

# 4. Commit
git commit -m "feat(citation-brief): Phase 2 Step 9 — CB#009 Stage 5 Recommendation History"

# 5. Tag
git tag phase2-step9-citation-brief-009-2026-05-26

# 6. Push
git push origin main --tags

# 7. Deploy
npm run deploy:cf

# 8. Run all §6 verification commands

# 9. IndexNow
bash scripts/notify-indexnow.sh
```

---

## §8 REPORT FORMAT

```
Status: PASS / FAIL
Worker: [worker ID]
Commit: [short SHA]
Tag: phase2-step9-citation-brief-009-2026-05-26
Build: Passed / Failed — [page count]/54
TypeScript: Passed / Failed
ESLint: Passed / Failed
Live route: HTTP/2 200 / FAIL
Schema: [list confirmed types]
Internal links: [count] destinations confirmed
GBP/£: [match count] matches
Sitemap: <loc> present / missing
Citation brief index: Includes CB#009 / missing
IndexNow: [URL count] URLs, HTTP [status]
Issues: none / [describe]
```

---

## §9 ROLLBACK

```bash
git revert HEAD --no-edit
npm run gen:lastmod
git add src/lib/static-route-lastmod.generated.json
git commit -m "revert: Phase 2 Step 9 — CB#009 rollback"
npm run deploy:cf
```

---

## §10 APPENDIX — BRIEF CLUSTER STATE AFTER STEP 9

| # | Slug | Stage | Status |
|---|---|---|---|
| 001 | how-agencies-get-cited-in-ai-answers | Overview (all 5 stages) | Live |
| 002 | stage-3-structured-extractability | Stage 3 | Live |
| 003 | aeo-is-the-2026-wcag | AEO lineage | Live |
| 004 | two-tier-access-doctrine | Two-tier access | Live |
| 005 | brand-semantics-infrastructure | Brand semantics | Live |
| 006 | stage-1-entity-resolution | Stage 1 | Live |
| 007 | stage-2-source-authority | Stage 2 | Live |
| 008 | stage-4-freshness | Stage 4 | Live |
| **009** | **stage-5-recommendation-history** | **Stage 5** | **This ship** |

**Five-Stage Citation Hierarchy complete after Step 9.** Stages 1, 2, 3, 4, and 5 each have a dedicated brief. CB#001 covers the full hierarchy overview. The brief cluster is now a complete AEO field guide.

**STATIC_ROUTES is hand-maintained.** Every new brief requires a manual entry in both `src/app/sitemap.ts` AND `scripts/gen-static-route-lastmod.mjs`. Both must be updated in the same commit.
