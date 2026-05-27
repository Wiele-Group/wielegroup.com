# Phase 2 Step 8 — Citation Brief #008: Stage 4 Freshness
**Directive version:** phase2-step8-citation-brief-008-2026-05-25  
**Prepared by:** Claude Cowork  
**Date:** 2026-05-25  
**Scope:** Create Citation Brief #008 — Stage 4 Freshness. Add to brief cluster, manifest, static imports, sitemap, llms.txt, IndexNow.

---

## §0 PRE-FLIGHT — HARD STOP IF ANY FAILS

Run before touching any file.

```bash
# 1. Clean working tree
git status
# Expected: nothing to commit, working tree clean
# If not clean: stop. Report uncommitted changes to founder.

# 2. On main
git branch --show-current
# Expected: main

# 3. Confirm CB #007 is present in the manifest
grep "stage-2-source-authority" src/lib/citation-briefs-static.ts
# Expected: one match

# 4. Confirm CB #007 static import is in page.tsx
grep "Stage2SourceAuthority" src/app/citation-brief/\[slug\]/page.tsx
# Expected: one match

# 5. No existing CB #008 file
ls src/content/citation-briefs/stage-4-freshness.mdx 2>/dev/null && echo EXISTS || echo OK
# Expected: OK

# 6. Confirm sitemap has CB #007 entry
grep "stage-2-source-authority" src/app/sitemap.ts
# Expected: one match

# 7. Confirm llms.txt has CB #007 entry
grep "stage-2-source-authority" public/llms.txt
# Expected: one match

# 8. Node + npm accessible
node -v && npm -v
```

All 8 checks must pass. Any failure = hard stop. Report blocked state to founder.

---

## §1 BRIEF IDENTITY

| Field | Value |
|---|---|
| Slug | `stage-4-freshness` |
| Brief number | 8 |
| Title | `Stage 4 — Freshness: why AI engines prefer maintained sources over published ones` |
| Eyebrow | `AEO methodology` |
| Category | `AEO methodology` |
| Author | `Jonathan Landman` |
| Reviewer | `Jonathan Landman` |
| lastUpdated | `2026-05-25` |
| readingMinutes | `13` |
| ogImage | (none — use siteConfig.ogImage default) |

**Summary:**
> Stage 4 of the Five-Stage Citation Hierarchy is Freshness — the engine's assessment of whether your content reflects current information. Unlike Stage 2 Source Authority, Freshness decays: content that was current becomes stale, and citations follow. Five signals, one compounding vulnerability, and the content cadence that prevents decay.

---

## §2 FAQ ARRAY (8 entries — verbatim for BRIEF_MANIFEST)

```typescript
faq: [
  {
    question: "What is Stage 4 Freshness in the Five-Stage Citation Hierarchy?",
    answer:
      "Stage 4 Freshness is the engine's assessment of whether your content reflects current, accurate information at the time of citation. It is the fourth stage of the Five-Stage Citation Hierarchy — stacking on Entity Resolution (Stage 1), Source Authority (Stage 2), and Structured Extractability (Stage 3), and feeding Recommendation History (Stage 5). Unlike Stage 2, which compounds over time, Stage 4 decays: content that was current when published becomes stale as the year advances, benchmarks are superseded, tools change, and the engine's training data is refreshed. The five freshness signals — temporal currency, schema date accuracy, sitemap lastmod integrity, domain publishing cadence, and link freshness — determine how much confidence the engine has that what it extracts from your page reflects today's reality.",
  },
  {
    question: "How do AI engines detect that content is stale?",
    answer:
      "AI engines use four primary signals to assess content staleness: (1) Temporal currency — statistics, benchmarks, tool names, and event references that are tied to a prior year flag the content as potentially outdated. (2) Schema date signals — the dateModified value in Article schema is a direct input to the engine's freshness model; if it never changes, or is absent, the engine defaults to datePublished and applies a decay curve from there. (3) Sitemap lastmod accuracy — engines learn quickly if a domain's sitemap shows today's date on every URL regardless of actual content changes; a sitemap that lies about freshness eventually gets discounted. (4) Domain publishing cadence — a domain that publishes no new substantive content for 60 or more days signals dormancy; the engine begins to down-weight all pages from that domain in freshness-sensitive queries.",
  },
  {
    question: "Is publishing frequency more important than content depth?",
    answer:
      "Neither in isolation. The engine rewards substantive updates to existing high-authority pages more than thin new content published frequently. The optimal cadence is two-track: a regular cadence of new substantive pieces (minimum one per fortnight) combined with a quarterly audit and meaningful update of the top-cited existing pages. Superficial edits — changing a date without updating the substance, adding a sentence without revising the core claim — are detected and discounted. The test is whether the information extracted from the page has changed in a way that matters to a buyer-intent query. If not, the freshness signal does not move.",
  },
  {
    question: "What is the difference between content freshness and domain freshness?",
    answer:
      "Content freshness is a page-level signal: whether this specific page's claims, statistics, and examples are current. Domain freshness is an aggregate signal: how consistently the domain publishes new substantive content across its full URL set. Both matter. A single page with a recent dateModified on a dormant domain scores better on content freshness than on domain freshness — the engine trusts the update but down-weights the domain as an active, maintained source. The strongest freshness posture is consistent page-level updates AND a live domain publishing cadence. Domain freshness is what protects your whole citation footprint; content freshness is what protects individual high-value pages.",
  },
  {
    question: "Does Stage 2 Source Authority protect you from freshness decay?",
    answer:
      "Partially — but not indefinitely. High-authority domains receive a grace period: the engine accepts that a trusted primary source may not update every page constantly, and applies a longer decay curve before freshness penalties affect citation share. This grace period is real and measurable: a Stage 2 domain with 18 months of stale content on a key methodology page will hold citation share longer than a low-authority domain with the same staleness. But Stage 2 is not a shield against Stage 4. At some point, even the most authoritative domain loses citation share on stale content if a well-structured competitor publishes a fresher, cleaner answer. The right framing: Stage 2 buys you time; Stage 4 maintenance is still required.",
  },
  {
    question: "How accurate do publication dates need to be in schema?",
    answer:
      "The dateModified value in Article schema must reflect the date of the last meaningful content change — not the build date, not today's date added automatically by the CMS, and not a fabricated future date. Engines cross-reference the schema date against the actual content change history available in their crawl logs. A page that reports a recent dateModified but whose extractable content has not changed will eventually be flagged as a freshness signal manipulator and down-weighted. The correct practice: update dateModified only when substantive content changes, and regenerate sitemap lastmod values from actual git commit dates rather than build time. Wiele's own sitemap uses a build-time lastmod generator seeded from git log committer dates — not new Date() evaluated at deploy time.",
  },
  {
    question: "What counts as a meaningful update versus a superficial edit?",
    answer:
      "A meaningful update changes the extractable information in a way that matters to a buyer-intent query: a statistic revised to a current-year figure, a tool recommendation updated to reflect the current market, a methodology step refined based on new evidence, a case study result added from a recent engagement. A superficial edit does not change the core extractable answer: rewording a paragraph without updating the claim, adding a sentence without revising the statistic, or changing a heading without updating the content beneath it. The practical test: run the same AI query against the page before and after the edit. If the engine would pull a different, more current answer after the edit, it was meaningful. If the extracted answer is unchanged, the freshness signal did not move.",
  },
  {
    question: "How does Wiele maintain freshness for clients?",
    answer:
      "Wiele builds Stage 4 maintenance into every retainer through two mechanisms. First, the AI Visibility Monitoring retainer runs monthly engine-panel queries against the client's top-cited pages and flags citations that pull stale statistics or superseded claims — giving the client a specific, prioritised list of pages to update each month. Second, the Authority Engine retainer includes a quarterly content audit across the top-cited page set: statistics are refreshed to current-year sources, schema dateModified values are updated, and the sitemap lastmod layer is regenerated from actual content-change commits. Most engagements start with a Signal Audit that grades Stage 4 specifically: it maps which pages are decaying, which freshness signals are missing, and what the update cadence needs to be to hold citation share against named competitors.",
  },
],
```

---

## §3 PRE-READS — READ EVERY FILE BEFORE EDITING ANYTHING

Claude Code must read each file in full before making any edit. No exceptions.

| # | File | Purpose |
|---|---|---|
| 3a | `src/lib/citation-briefs-static.ts` | Confirm CB #007 is last entry; identify exact insertion point for CB #008 |
| 3b | `src/app/citation-brief/[slug]/page.tsx` (lines 1–65) | Confirm Stage2SourceAuthority is the last static import; identify insertion points |
| 3c | `src/app/sitemap.ts` | Confirm CB #007 sitemap entry; identify insertion point for CB #008 |
| 3d | `public/llms.txt` | Confirm CB #007 llms.txt entry; identify insertion point for CB #008 |
| 3e | `src/content/citation-briefs/stage-2-source-authority.mdx` | Pattern reference — MDX structure, imports, component usage, link class names |
| 3f | `src/content/citation-briefs/stage-1-entity-resolution.mdx` | Secondary pattern reference |
| 3g | `scripts/notify-indexnow.sh` | Confirm current URL list; identify insertion point |

---

## §4 FILE EDITS — VERBATIM

### §4a NEW FILE — `src/content/citation-briefs/stage-4-freshness.mdx`

Create this file exactly as written. Do not alter wording, structure, or class names.

```mdx
import { Reveal } from "@/components/motion/reveal";
import Link from "next/link";

<div className="rounded-xl border border-electric/30 bg-electric/5 px-6 py-5 mb-10">
  <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-2">60-second answer</p>
  <p className="text-body-sm text-primary leading-relaxed">
    Stage 4 Freshness is the engine's assessment of whether your content reflects current information at the time of citation. It is the only stage in the Five-Stage Citation Hierarchy that decays without active maintenance. Five signals govern it: temporal currency, schema date accuracy, sitemap lastmod integrity, domain publishing cadence, and link freshness. Stage 2 Source Authority buys a grace period — but not a permanent shield. The content cadence that prevents freshness decay is two-track: regular new substantive publishing plus a quarterly audit of existing top-cited pages.
  </p>
</div>

## Why Stage 4 is the stage that decays

Every other stage in the Five-Stage Citation Hierarchy compounds or holds without active intervention. Entity Resolution (Stage 1) is a one-time sprint that holds once clean. Source Authority (Stage 2) compounds over months as editorial citations accumulate. Structured Extractability (Stage 3) holds until the page structure is changed.

Stage 4 is different. Freshness decays the moment you stop maintaining it.

A statistic published in 2024 was current in 2024. By mid-2026 it is 18 months old. An AI engine refreshing its training data or running a live retrieval pass will detect the gap between the published date and the current year — and weight a competitor's fresher answer more heavily, even if that competitor's Stage 2 authority is lower.

This is the stage that most brands lose citation share on quietly. Not because a competitor outranked them on authority. Because a competitor updated their page in March and they did not.

The corrective is a content maintenance system, not a one-off sprint. The sprint fixes today's deficit; the system prevents tomorrow's.

---

## The five freshness signals AI engines read

<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 my-8">
  <Reveal delay={0}>
    <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-raised)] p-5 h-full">
      <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-2">Signal 1</p>
      <h3 className="text-body-sm font-semibold text-primary mb-2">Temporal currency</h3>
      <p className="text-body-xs text-secondary leading-relaxed">Statistics, benchmarks, tool names, and event references tied to a prior year. The single most detectable freshness failure — a 2024 benchmark in a 2026 query context triggers an immediate confidence discount.</p>
    </div>
  </Reveal>
  <Reveal delay={0.05}>
    <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-raised)] p-5 h-full">
      <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-2">Signal 2</p>
      <h3 className="text-body-sm font-semibold text-primary mb-2">Schema date accuracy</h3>
      <p className="text-body-xs text-secondary leading-relaxed">The <code>dateModified</code> value in Article schema is a direct input to the engine's freshness model. It must reflect the date of the last meaningful content change — not the build date, not today's date injected at deploy time.</p>
    </div>
  </Reveal>
  <Reveal delay={0.1}>
    <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-raised)] p-5 h-full">
      <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-2">Signal 3</p>
      <h3 className="text-body-sm font-semibold text-primary mb-2">Sitemap lastmod integrity</h3>
      <p className="text-body-xs text-secondary leading-relaxed">Engines learn quickly if a sitemap reports today's date on every URL regardless of actual content changes. A sitemap that lies about freshness gets discounted. Lastmod values must be seeded from actual content-change commits, not build time.</p>
    </div>
  </Reveal>
  <Reveal delay={0.15}>
    <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-raised)] p-5 h-full">
      <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-2">Signal 4</p>
      <h3 className="text-body-sm font-semibold text-primary mb-2">Domain publishing cadence</h3>
      <p className="text-body-xs text-secondary leading-relaxed">A domain with gaps of 60 or more days between new substantive content signals dormancy. The engine begins down-weighting all pages from that domain in freshness-sensitive queries — even pages whose individual content is still current.</p>
    </div>
  </Reveal>
  <Reveal delay={0.2}>
    <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-raised)] p-5 h-full">
      <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-2">Signal 5</p>
      <h3 className="text-body-sm font-semibold text-primary mb-2">Link freshness</h3>
      <p className="text-body-xs text-secondary leading-relaxed">Outbound citations that link to deprecated resources, 404 destinations, or sources with their own freshness decay problems compound the page-level signal. Broken or stale external references read as a proxy for content neglect.</p>
    </div>
  </Reveal>
</div>

---

## How to diagnose a Stage 4 deficit

Four patterns indicate a Stage 4 problem:

- **The engine pulls a statistic you updated 12+ months ago.** The extracted answer is correct in structure but stale in substance. The page's <code>dateModified</code> has not been updated since the last meaningful edit, and the content itself contains a benchmark tied to a prior year.

- **Your sitemap lastmod shows today's date on every URL.** This is the most common technical freshness failure — a build pipeline that evaluates <code>new Date()</code> at deploy time and writes it as lastmod for all routes, regardless of whether any content changed. Engines detect the pattern and discount the signal.

- **Your publishing calendar has gaps of 60 or more days.** No new labs articles, no new citation briefs, no new case studies. The domain is alive but not active. Domain freshness decays before content freshness in this scenario.

- **Your top-cited pages reference tools, events, or benchmarks from a prior year without a visible update marker.** A buyer reading the page would notice the gap. The engine notices faster.

---

## The freshness maintenance loop

Stage 4 is not a one-off fix — it is a system. The minimum viable maintenance cadence:

**Monthly:** Run the engine-panel query set against the top-cited pages. Flag any citation that extracts a statistic or claim older than 12 months. Add the flagged page to the update queue.

**Fortnightly:** Publish at least one new substantive piece — a citation brief, a labs article, a case study section. This maintains domain publishing cadence and generates new anchor dates for the engine's freshness model.

**Quarterly:** Conduct a full content audit of the top 10 cited pages. Update statistics to current-year sources. Revise or remove superseded claims. Update <code>dateModified</code> in Article schema. Regenerate sitemap lastmod values from actual git commit dates. Check all outbound citations for 404s and stale destinations.

**Annual:** Deep review of all permanent pages — methodology pages, service pages, about and trust pages — for superseded claims, deprecated tools, or outdated positioning. These pages change less frequently but hold significant citation weight; a stale methodology page on a high-authority domain is a Stage 4 liability.

---

## Stage 4 in the Five-Stage stack

Stage 4 does not operate in isolation. Its relationship to each other stage:

- **Stage 1 prerequisite.** Entity Resolution determines who the engine attributes the fresh content to. A page with a current <code>dateModified</code> and fresh statistics on an unresolved entity will still fail to generate confident citations — the engine cannot attribute the update to a known, trusted brand.

- **Stage 2 modifier.** Source Authority extends the grace period before freshness decay hits citation share. High-authority domains hold citation share longer on stale content than low-authority domains do. The modifier is real but bounded — it does not eliminate the decay curve, it lengthens it.

- **Stage 3 amplifier.** Structured Extractability determines *which version* of your answer the engine pulls. A page with clean extractable structure and a recent <code>dateModified</code> makes it easy for the engine to pull the current answer confidently. Without Stage 3, the engine may extract a stale sentence from a poorly structured page even if the page has been updated — because the update was not in the extractable position.

- **Stage 5 compound.** Recommendation History builds on consistent citation over time. Freshness decay interrupts the loop: if citation share drops on a key query because content went stale, the Recommendation History signal resets partially. Maintaining Stage 4 is how you protect the compounding loop that Stage 5 represents.

Full hierarchy context: <Link href="/citation-brief/how-agencies-get-cited-in-ai-answers" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Citation Brief #001 — the Five-Stage Citation Hierarchy</Link>.

---

## Stage 4 and the content calendar

The commercial implication of Stage 4 is direct: freshness requires a content calendar, and a content calendar requires a retainer relationship.

A one-off sprint can repair today's temporal currency failures and fix the sitemap lastmod layer. It cannot maintain domain publishing cadence, run monthly engine-panel checks for emerging stale citations, or conduct quarterly content audits. Those require a system that runs continuously — which is exactly what the <Link href="/services/ai-visibility-monitoring" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">AI Visibility Monitoring retainer</Link> instruments.

For agencies, Stage 4 is one of the most commercially compelling parts of the AEO brief: it is the stage that generates recurring client value most visibly. Clients can see the citations decaying in the monthly panel run. They can see them recovering after the quarterly content audit. The lift is attributable, the cadence is predictable, and the dependency on ongoing delivery is built into the methodology rather than manufactured by the agency. The <Link href="/for-agencies" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Wiele OS agency capability layer</Link> covers Stage 4 delivery frameworks in full.

For brands managing AEO in-house, Stage 4 is the stage most at risk of deprioritisation under time pressure. The content calendar slips, the quarterly audit gets deferred, and the engine-panel checks are the first thing cut when the marketing calendar gets crowded. The <Link href="/for-brands" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Wiele brand engagement</Link> is designed around this failure mode — the monitoring is external, automated, and reports against a named competitor set so the cost of deprioritisation is visible before it becomes a citation share problem.

Start with the <Link href="/audit" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Signal Audit</Link> to grade your current Stage 4 posture: which pages are decaying, which freshness signals are missing, and what the update cadence needs to be to hold citation share against the competitor set.

---

## Methodology & sources

The Five-Stage Citation Hierarchy is a Wiele Group framework. Stage 4 Freshness reflects Wiele's applied methodology across client engagements tracked in the Wiele AI Citation Tracker dataset.

Sitemap lastmod integrity principles are derived from Google Search Central's sitemap documentation and Wiele's own implementation using git log committer dates as the lastmod source — documented in the wielegroup.com codebase (v3.9.0, 2026-05-13).

Stage relationships and decay curve observations are drawn from Wiele's monthly engine-panel methodology, documented at <Link href="/trust" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">/trust</Link>. Citation share tracking methodology uses the <Link href="/citation-score" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Wiele Citation Score™</Link> four-component metric.

---

The full Five-Stage Citation Hierarchy is in <Link href="/citation-brief/how-agencies-get-cited-in-ai-answers" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Citation Brief #001</Link>. Stage 1 Entity Resolution is in <Link href="/citation-brief/stage-1-entity-resolution" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Citation Brief #006</Link>. Stage 2 Source Authority is in <Link href="/citation-brief/stage-2-source-authority" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Citation Brief #007</Link>. Stage 3 Structured Extractability is in <Link href="/citation-brief/stage-3-structured-extractability" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Citation Brief #002</Link>.

To grade your current Stage 4 posture and the full Five-Stage stack against a named competitor set, start with the <Link href="/audit" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">Signal Audit</Link>.
```

---

### §4b EDIT — `src/lib/citation-briefs-static.ts`

Append the following entry to the end of the `BRIEF_MANIFEST` array, immediately after the closing `},` of the `stage-2-source-authority` entry (briefNumber 7), before the closing `];` of the array.

```typescript
  {
    slug: "stage-4-freshness",
    briefNumber: 8,
    title:
      "Stage 4 — Freshness: why AI engines prefer maintained sources over published ones",
    summary:
      "Stage 4 of the Five-Stage Citation Hierarchy is Freshness — the engine's assessment of whether your content reflects current information. Unlike Stage 2 Source Authority, Freshness decays: content that was current becomes stale, and citations follow. Five signals, one compounding vulnerability, and the content cadence that prevents decay.",
    eyebrow: "AEO methodology",
    category: "AEO methodology",
    author: "Jonathan Landman",
    reviewer: "Jonathan Landman",
    lastUpdated: "2026-05-25",
    readingMinutes: 13,
    faq: [
      {
        question:
          "What is Stage 4 Freshness in the Five-Stage Citation Hierarchy?",
        answer:
          "Stage 4 Freshness is the engine's assessment of whether your content reflects current, accurate information at the time of citation. It is the fourth stage of the Five-Stage Citation Hierarchy — stacking on Entity Resolution (Stage 1), Source Authority (Stage 2), and Structured Extractability (Stage 3), and feeding Recommendation History (Stage 5). Unlike Stage 2, which compounds over time, Stage 4 decays: content that was current when published becomes stale as the year advances, benchmarks are superseded, tools change, and the engine's training data is refreshed. The five freshness signals — temporal currency, schema date accuracy, sitemap lastmod integrity, domain publishing cadence, and link freshness — determine how much confidence the engine has that what it extracts from your page reflects today's reality.",
      },
      {
        question: "How do AI engines detect that content is stale?",
        answer:
          "AI engines use four primary signals to assess content staleness: (1) Temporal currency — statistics, benchmarks, tool names, and event references that are tied to a prior year flag the content as potentially outdated. (2) Schema date signals — the dateModified value in Article schema is a direct input to the engine's freshness model; if it never changes, or is absent, the engine defaults to datePublished and applies a decay curve from there. (3) Sitemap lastmod accuracy — engines learn quickly if a domain's sitemap shows today's date on every URL regardless of actual content changes; a sitemap that lies about freshness eventually gets discounted. (4) Domain publishing cadence — a domain that publishes no new substantive content for 60 or more days signals dormancy; the engine begins to down-weight all pages from that domain in freshness-sensitive queries.",
      },
      {
        question:
          "Is publishing frequency more important than content depth?",
        answer:
          "Neither in isolation. The engine rewards substantive updates to existing high-authority pages more than thin new content published frequently. The optimal cadence is two-track: a regular cadence of new substantive pieces (minimum one per fortnight) combined with a quarterly audit and meaningful update of the top-cited existing pages. Superficial edits — changing a date without updating the substance, adding a sentence without revising the core claim — are detected and discounted. The test is whether the information extracted from the page has changed in a way that matters to a buyer-intent query. If not, the freshness signal does not move.",
      },
      {
        question:
          "What is the difference between content freshness and domain freshness?",
        answer:
          "Content freshness is a page-level signal: whether this specific page's claims, statistics, and examples are current. Domain freshness is an aggregate signal: how consistently the domain publishes new substantive content across its full URL set. Both matter. A single page with a recent dateModified on a dormant domain scores better on content freshness than on domain freshness — the engine trusts the update but down-weights the domain as an active, maintained source. The strongest freshness posture is consistent page-level updates AND a live domain publishing cadence. Domain freshness is what protects your whole citation footprint; content freshness is what protects individual high-value pages.",
      },
      {
        question:
          "Does Stage 2 Source Authority protect you from freshness decay?",
        answer:
          "Partially — but not indefinitely. High-authority domains receive a grace period: the engine accepts that a trusted primary source may not update every page constantly, and applies a longer decay curve before freshness penalties affect citation share. This grace period is real and measurable: a Stage 2 domain with 18 months of stale content on a key methodology page will hold citation share longer than a low-authority domain with the same staleness. But Stage 2 is not a shield against Stage 4. At some point, even the most authoritative domain loses citation share on stale content if a well-structured competitor publishes a fresher, cleaner answer. The right framing: Stage 2 buys you time; Stage 4 maintenance is still required.",
      },
      {
        question:
          "How accurate do publication dates need to be in schema?",
        answer:
          "The dateModified value in Article schema must reflect the date of the last meaningful content change — not the build date, not today's date added automatically by the CMS, and not a fabricated future date. Engines cross-reference the schema date against the actual content change history available in their crawl logs. A page that reports a recent dateModified but whose extractable content has not changed will eventually be flagged as a freshness signal manipulator and down-weighted. The correct practice: update dateModified only when substantive content changes, and regenerate sitemap lastmod values from actual git commit dates rather than build time. Wiele's own sitemap uses a build-time lastmod generator seeded from git log committer dates — not new Date() evaluated at deploy time.",
      },
      {
        question:
          "What counts as a meaningful update versus a superficial edit?",
        answer:
          "A meaningful update changes the extractable information in a way that matters to a buyer-intent query: a statistic revised to a current-year figure, a tool recommendation updated to reflect the current market, a methodology step refined based on new evidence, a case study result added from a recent engagement. A superficial edit does not change the core extractable answer: rewording a paragraph without updating the claim, adding a sentence without revising the statistic, or changing a heading without updating the content beneath it. The practical test: run the same AI query against the page before and after the edit. If the engine would pull a different, more current answer after the edit, it was meaningful. If the extracted answer is unchanged, the freshness signal did not move.",
      },
      {
        question: "How does Wiele maintain freshness for clients?",
        answer:
          "Wiele builds Stage 4 maintenance into every retainer through two mechanisms. First, the AI Visibility Monitoring retainer runs monthly engine-panel queries against the client's top-cited pages and flags citations that pull stale statistics or superseded claims — giving the client a specific, prioritised list of pages to update each month. Second, the Authority Engine retainer includes a quarterly content audit across the top-cited page set: statistics are refreshed to current-year sources, schema dateModified values are updated, and the sitemap lastmod layer is regenerated from actual content-change commits. Most engagements start with a Signal Audit that grades Stage 4 specifically: it maps which pages are decaying, which freshness signals are missing, and what the update cadence needs to be to hold citation share against named competitors.",
      },
    ],
  },
```

---

### §4c EDIT — `src/app/citation-brief/[slug]/page.tsx`

**Add import** — insert immediately after the `Stage2SourceAuthority` import line (line ~50):

```typescript
import Stage4Freshness from "@/content/citation-briefs/stage-4-freshness.mdx";
```

**Add BRIEF_COMPONENTS entry** — insert immediately after `"stage-2-source-authority": Stage2SourceAuthority,`:

```typescript
  "stage-4-freshness": Stage4Freshness,
```

---

### §4d EDIT — `src/app/sitemap.ts`

Append the following entry to the `STATIC_ROUTES` array, immediately after the `stage-2-source-authority` entry block, before the `/citation-score` entry:

```typescript
  /* Phase 2 Step 8 (2026-05-25) — Citation Brief #008.
     Stage 4 Freshness deep-dive. Five freshness signals · decay curve ·
     content maintenance loop · sitemap lastmod integrity.
     NOTE: STATIC_ROUTES is hand-maintained (not auto-derived from
     getAllBriefSlugs) — each brief requires a manual entry here. */
  {
    path: "/citation-brief/stage-4-freshness",
    priority: 0.85,
    changeFrequency: "monthly" as const,
  },
```

---

### §4e EDIT — `public/llms.txt`

Append the following line immediately after the `stage-2-source-authority` line:

```
- https://wielegroup.com/citation-brief/stage-4-freshness — Citation Brief #008: Stage 4 Freshness — why AI engines prefer maintained sources, the five freshness signals, the content decay curve, sitemap lastmod integrity, and the two-track maintenance cadence that prevents citation share loss
```

---

### §4f EDIT — `scripts/notify-indexnow.sh`

Append the following URL to the IndexNow URL list (after the `stage-2-source-authority` entry):

```
  "https://wielegroup.com/citation-brief/stage-4-freshness"
```

---

## §5 ACCEPTANCE CRITERIA — ALL MUST PASS BEFORE DEPLOY

Run these checks after file edits, before `npm run deploy:cf`.

```bash
# A1 — MDX file exists
ls src/content/citation-briefs/stage-4-freshness.mdx
# Expected: file listed

# A2 — Manifest has 8 entries
grep -c "briefNumber:" src/lib/citation-briefs-static.ts
# Expected: 8

# A3 — CB #008 slug in manifest
grep "stage-4-freshness" src/lib/citation-briefs-static.ts
# Expected: one match

# A4 — Static import present in page.tsx
grep "Stage4Freshness" src/app/citation-brief/\[slug\]/page.tsx
# Expected: two matches (import line + BRIEF_COMPONENTS entry)

# A5 — Sitemap has CB #008 entry
grep "stage-4-freshness" src/app/sitemap.ts
# Expected: one match

# A6 — llms.txt has CB #008 entry
grep "stage-4-freshness" public/llms.txt
# Expected: one match

# A7 — No GBP/£ in new MDX
grep -i "£\|gbp" src/content/citation-briefs/stage-4-freshness.mdx
# Expected: no output

# A8 — TypeScript check
npx tsc --noEmit
# Expected: exit 0, no errors

# A9 — ESLint check
npx next lint
# Expected: exit 0 or warnings only, no errors

# A10 — Build
npm run build
# Expected: exit 0
# Expected: static page count ≥ 53 (52 from Step 7 + 1 new brief)

# A11 — Regenerate static route lastmod BEFORE git add
npm run gen:lastmod
# Required: run this after sitemap.ts edit, before committing
```

All 11 checks must pass. Any failure = hard stop. Fix before deploying.

---

## §6 POST-DEPLOY VERIFICATION — ALL 10 MUST PASS

Run after `npm run deploy:cf`.

```bash
# V1 — Live route returns HTTP 200
curl -I https://wielegroup.com/citation-brief/stage-4-freshness
# Expected: HTTP/2 200

# V2 — Title tag present
curl -s https://wielegroup.com/citation-brief/stage-4-freshness | grep -i "stage 4"
# Expected: match

# V3 — Article schema present
curl -s https://wielegroup.com/citation-brief/stage-4-freshness | grep '"@type":"Article"'
# Expected: match

# V4 — FAQPage schema present
curl -s https://wielegroup.com/citation-brief/stage-4-freshness | grep '"@type":"FAQPage"'
# Expected: match

# V5 — BreadcrumbList schema present
curl -s https://wielegroup.com/citation-brief/stage-4-freshness | grep '"@type":"BreadcrumbList"'
# Expected: match

# V6 — Person schema present
curl -s https://wielegroup.com/citation-brief/stage-4-freshness | grep '"@type":"Person"'
# Expected: match

# V7 — Sitemap includes CB #008
curl -s https://wielegroup.com/sitemap.xml | grep "stage-4-freshness"
# Expected: match

# V8 — Citation brief index includes CB #008
curl -s https://wielegroup.com/citation-brief | grep -i "freshness"
# Expected: match

# V9 — No GBP in live source
curl -s https://wielegroup.com/citation-brief/stage-4-freshness | grep -i "£\|gbp"
# Expected: no output

# V10 — Internal links resolve (spot-check 3)
curl -I https://wielegroup.com/services/ai-visibility-monitoring | head -1
curl -I https://wielegroup.com/citation-brief/stage-2-source-authority | head -1
curl -I https://wielegroup.com/audit | head -1
# Expected: all HTTP/2 200
```

---

## §7 COMMIT + TAG + DEPLOY SEQUENCE

Execute in this exact order:

```bash
# 1. Regenerate lastmod (must run BEFORE git add when sitemap.ts changed)
npm run gen:lastmod

# 2. Stage all changes
git add \
  src/content/citation-briefs/stage-4-freshness.mdx \
  src/lib/citation-briefs-static.ts \
  "src/app/citation-brief/[slug]/page.tsx" \
  src/app/sitemap.ts \
  src/lib/static-route-lastmod.generated.json \
  public/llms.txt \
  scripts/notify-indexnow.sh

# 3. Verify diff — review before committing
git diff --cached --stat

# 4. Commit
git commit -m "feat(citation-brief): Phase 2 Step 8 — CB#008 Stage 4 Freshness"

# 5. Tag
git tag phase2-step8-citation-brief-008-2026-05-25

# 6. Push
git push origin main --tags

# 7. Deploy
npm run deploy:cf

# 8. Run all §6 verification commands

# 9. Notify IndexNow
bash scripts/notify-indexnow.sh
```

---

## §8 REPORT FORMAT (use exactly — no mid-flight updates)

```
Status: PASS / FAIL
Worker: [worker ID from wrangler output]
Commit: [short SHA]
Tag: phase2-step8-citation-brief-008-2026-05-25
Build: Passed / Failed
TypeScript: Passed / Failed
ESLint: Passed / Failed
Live route: HTTP/2 200 / FAIL
Schema: [list confirmed schema types]
Internal links: [count] destinations confirmed
GBP/£: [match count] matches
Sitemap: <loc> present / missing
Citation brief index: Includes CB#008 / missing
IndexNow: [URL count] URLs, HTTP [status]
Issues: [none / describe any]
```

---

## §9 ROLLBACK

If deploy fails validation:

```bash
git revert HEAD --no-edit
npm run gen:lastmod
git add src/lib/static-route-lastmod.generated.json
git commit -m "revert: Phase 2 Step 8 — CB#008 rollback"
npm run deploy:cf
```

Verify production returns to pre-Step-8 state before reporting.

---

## §10 APPENDIX — BRIEF CLUSTER STATE AFTER STEP 8

| # | Slug | Stage | Status |
|---|---|---|---|
| 001 | how-agencies-get-cited-in-ai-answers | Overview (all 5 stages) | Live |
| 002 | stage-3-structured-extractability | Stage 3 | Live |
| 003 | aeo-is-the-2026-wcag | AEO lineage | Live |
| 004 | two-tier-access-doctrine | Two-tier access | Live |
| 005 | brand-semantics-infrastructure | Brand semantics | Live |
| 006 | stage-1-entity-resolution | Stage 1 | Live |
| 007 | stage-2-source-authority | Stage 2 | Live |
| **008** | **stage-4-freshness** | **Stage 4** | **This ship** |

Remaining Five-Stage gap after Step 8: **Stage 5 — Recommendation History** (candidate for Step 9 or later).

**STATIC_ROUTES is hand-maintained.** Every new brief requires a manual entry in `src/app/sitemap.ts`. Do not assume auto-generation from `getAllBriefSlugs()`.
