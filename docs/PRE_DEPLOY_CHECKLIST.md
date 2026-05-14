# Pre-Deploy Checklist — Cognitive Gates (binding from v3.9.5)

**Authority:** /L99 Cognitive Psychology & Design Canon (2026-05-14) Rules 10 and 25.
**Binds:** every new or substantially-changed (>20% content delta) page on wielegroup.com.
**Failure mode:** rewrite, not ship. A page that fails any gate does not deploy.

## 1. Trunk Test (Krug · 5-second self-evidence gate)

Within 5 seconds of viewing the page, the reader can answer ALL of:

1. **Site identity** — what site am I on?
2. **Page identity** — what page is this?
3. **Primary sections** — what are the main sections of the site?
4. **Current location** — where in the site/section am I?
5. **CTA** — what is the page asking me to do?
6. **Buyer-journey position** — where am I in the path from problem-aware to purchase?

**Rationale.** Krug's First Law: pages must be self-evident. A page that demands
elaborated thought before its purpose is clear has already lost the high-elaboration
ICP-A reader who scanned and bounced. Self-Evidence ≥ 7/10 (Stage 0 of the
Five-Stage Citation Hierarchy) is the same idea, scored.

**How to apply.** Author/agent loads the page (incognito or fresh-session)
and times themselves. If any answer requires >5 seconds OR is wrong, rewrite.

## 2. Six Minds Pre-Flight (Whalen · audit grid)

For every new or substantially-changed page, write a one-paragraph note for each
of the six minds. The page does NOT deploy until every mind passes.

1. **Vision** — Does the layout direct the eye to the right element first? F-pattern / Z-pattern respected? CTA emphasis ≥3 of Beaird's 5 (Placement · Continuance · Isolation · Contrast · Proportion)?
2. **Wayfinding** — Can the reader tell where they are in the site, and how to get to the next obvious step? Breadcrumbs / nav state / clear CTA destination?
3. **Memory** — Is the working-memory budget respected? Cowan 4-chunk rule observed in every visible block? Paragraphs ≤3 sentences? Sentences ≤18 words?
4. **Language** — Is the prose pitched for the high-elaboration ICP-A buyer (central-route ELM)? Named frameworks present? Argument quality high? Jargon-without-payoff stripped?
5. **Decision-Making** — Is the reader given enough specific, named evidence (case studies, methodology, version trails) to choose Wiele over the next option? CTA destination matched to the decision stage?
6. **Emotion** — Does the page land the Wiele brand mood (premium clarity · obsidian-and-electric-blue authority) without overwrought aesthetic? No emotional dead-ends (e.g. cold pricing without context)?

**Rationale.** Whalen 2019: each mind processes input differently; a page that
satisfies Vision but fails Memory loses scannability; one that satisfies Memory
but fails Decision-Making loses conversion. The grid forces author/agent to
audit all six rather than the one they're naturally biased toward.

**How to apply.** Inline notes block inside the directive task at ship time:

```
SIX MINDS — /platform (v3.9.4 ship)
- Vision: PASS — H1 + lede + CTA stack visible above fold; CTA carries 4 of 5 Beaird emphasis tools.
- Wayfinding: PASS — primary nav highlights /platform; breadcrumb present.
- Memory: PASS — Five-Stage list now displays as 5 chunks; Stage 0 added as gating prerequisite.
- Language: PASS — central-route framing; no peripheral aesthetic-only sections.
- Decision-Making: PASS — links to /audit and /pricing#recurring-ai-visibility at section boundaries.
- Emotion: PASS — obsidian + electric-blue; no emotional dead-ends.
```

## 3. Worked example — apply both gates to `/audit`

**Trunk Test on /audit.**
1. Site identity — Wiele Group (logo top-left, footer brand line). PASS.
2. Page identity — Wiele AI Visibility Audit. PASS.
3. Primary sections — H2 "Method," H2 "Output," H2 "Pricing." PASS.
4. Current location — primary nav highlights /audit. PASS.
5. CTA — book the audit. PASS.
6. Buyer-journey position — consideration → close. PASS.

**Six Minds on /audit.**
- Vision: hero + CTA + method visible above fold. PASS.
- Wayfinding: breadcrumb + nav state. PASS.
- Memory: list blocks ≤4 items per viewport. PASS.
- Language: named methodology + case-study evidence. PASS.
- Decision-Making: CTA destination is the booking form; cross-link to /pricing for tier context. PASS.
- Emotion: premium clarity; no overwrought hype. PASS.

`/audit` ships clean. Future substantial edits re-run both gates.

## 4. Future enforcement (queued, post-revenue)

When first £10k/mo recurring lands, queue:
- Eslint custom rule: flag `<ul>` and `<ol>` with >4 immediate children within any element matching `:not([data-layout="columns"])`.
- Pre-commit hook: prompt for Six Minds note when files under `src/app/**/page.tsx` are modified.
- Playwright snapshot: visual diff alerts when first-fold composition changes >20%.

Pre-revenue: documentation + manual gate only.

## 5. Anchors

- Cowan 2001 — *The magical number 4 in short-term memory.*
- Krug — *Don't Make Me Think* (Trunk Test · Self-Evidence ≥ 7/10).
- Whalen — *Design for How People Think* (2019) (Six Minds).
- /L99 master canon — Cowork memory: `reference_cognitive_psychology_design_canon_2026_05_14.md` (binding rules 1-30, Rules 10 and 25 are this checklist's source).
- Wiele Five-Stage Citation Hierarchy + Stage 0 (Self-Evidence ≥ 7/10) — `/platform` page on wielegroup.com.
