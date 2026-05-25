# Phase 2 · Step 4 — Citation Brief #006 Scope Directive
**Directive version:** phase2-step4-citation-brief-006-scope  
**Date:** 2026-05-25  
**Authored by:** Cowork (Claude Sonnet 4.6)  
**Status:** SCOPE ONLY — read-only research. Do not edit files. Do not deploy.  
**Next step:** Founder approves → Cowork issues full Claude Code execution directive.

---

## Status

Source of truth loaded. Phase 2 Steps 1–3 confirmed shipped:

| Step | Tag | Commit |
|---|---|---|
| Phase 1 hardening (EUR, CTAs, claim safety, trust strip) | `phase-1-eur-cta-trust` | `3cdb826` |
| Phase 2 Step 1 — /for-agencies ICP landing page | `phase-2-for-agencies-icp` | `b468500` |
| Phase 2 Step 2 — AVM deep-dive expansion | `phase2-step2-avm-deep-dive-2026-05-25` | `a997828` |
| Phase 2 Step 3 — PBSS deep-dive expansion | `phase2-step3-pbss-deep-dive-2026-05-25` | `706e5ed` |

Live site HEAD: `69eaa0e` (lastmod regen post PBSS build). Working tree clean.

Citation Brief cluster live: **5 briefs** (#001–#005). MDX architecture confirmed
scalable — adding #006 requires: (1) drop `.mdx`, (2) add static import in
`[slug]/page.tsx`, (3) append BRIEF_MANIFEST entry. Zero new TSX.

---

## Recommended Citation Brief #006 Topic

**Stage 1 — Entity Resolution: how AI engines learn which brands to trust**

Slug: `stage-1-entity-resolution`  
File: `src/content/citation-briefs/stage-1-entity-resolution.mdx`

---

## Why this topic

The Five-Stage Citation Hierarchy has one gap in the published brief cluster.

| Stage | Topic | Brief |
|---|---|---|
| Overview | Five-Stage Hierarchy | #001 |
| Stage 3 | Structured Extractability | #002 |
| Lineage | AEO is the 2026 WCAG | #003 |
| Doctrine | Two-Tier Access | #004 |
| Named | Brand Semantics Infrastructure | #005 |
| **Stage 1** | **Entity Resolution — gap** | **#006 ← this** |

Stage 1 is the foundation of the entire hierarchy. Every AEO engagement starts
here. #001 names it but dedicates ≈200 words. There is no standalone deep-dive.

**Strategic fit with Phase 2 targets:**

1. **/for-agencies** — "Entity and Authority Engineering" is explicitly listed as
   one of the seven capability areas Wiele delivers for agencies. Brief #006 is
   the educational asset that proves Wiele owns this capability. Natural inline
   reference: agencies reading /for-agencies get sent to the brief; brief readers
   get sent back to /for-agencies.

2. **/services/ai-visibility-monitoring** — AVM tracks entity trust signals every
   month (source weight by tier, citation share, named-competitor gap). Brief #006
   establishes WHY those metrics matter (entity resolution is Stage 1; everything
   AVM measures presupposes it). Internal link: brief #006 → AVM ("track your
   entity trust monthly"). AVM `internalLinks` → brief #006 ("understand Stage 1").

3. **/services/premium-brand-site-system** — The Foundation Build deliverables
   already name "entity reconciliation" as item one of the technical substrate
   (`deeperFramework.body` in `services.ts`). Brief #006 turns that phrase into a
   published methodology with authority. Internal link: brief #006 → PBSS ("install
   the entity substrate"). PBSS `internalLinks` → brief #006 ("read Stage 1 before
   scoping the Foundation Build").

**Revenue angle:** Entity resolution is the decision-gate question agencies and
premium brands hit first. "Why doesn't my brand appear in ChatGPT?" is a Stage 1
problem 80% of the time. A brief that answers that question routes buyers to
/audit (Signal Audit = entry SKU) and /for-agencies (if the reader is an agency).

---

## Target query

Primary:
> **"why doesn't my brand appear in ChatGPT and Perplexity answers"**

Secondary:
> "how to get your brand recognised by AI answer engines"  
> "entity resolution for AI search visibility"  
> "how AI engines decide which brands to trust"  
> "knowledge graph for AI search"  
> "brand entity optimization 2026"

The primary query is high commercial-investigation intent — the exact moment a
buyer realises they have a Stage 1 problem and reaches for an answer. Wiele
should own this answer.

---

## Internal links Brief #006 should carry

| Destination | Anchor context |
|---|---|
| `/citation-brief/how-agencies-get-cited-in-ai-answers` (#001) | "The Five-Stage Citation Hierarchy — the full picture" |
| `/citation-brief/stage-3-structured-extractability` (#002) | "Once entity is resolved, Stage 3 is the highest-leverage next move" |
| `/services/ai-visibility-monitoring` | "Track your entity trust signals monthly with AI Visibility Monitoring" |
| `/services/premium-brand-site-system` | "Install the entity substrate — the Foundation Build starts here" |
| `/for-agencies` | "Wiele runs entity resolution sprints as part of the agency capability layer" |
| `/audit` | "Start with a Signal Audit — entity baseline is the first diagnostic output" |
| `/citation-score` | "The Citation Score™ subscription instruments entity lift month over month" |

---

## Internal links that should reference Brief #006 (reverse mesh)

After the brief ships, these should be updated to point to it:

| Source page / file | Where to add | Suggested anchor label |
|---|---|---|
| `src/data/services.ts` — AVM `internalLinks[]` | New fourth entry | `"Stage 1 — Entity Resolution"` |
| `src/data/services.ts` — PBSS `internalLinks[]` | New fifth entry | `"Stage 1 — Entity Resolution"` |
| `src/app/for-agencies/page.tsx` | Citation brief reference in capability section | `"Read Citation Brief #006 — Stage 1 Entity Resolution"` |
| `src/content/citation-briefs/how-agencies-get-cited-in-ai-answers.mdx` (#001) | Link from Stage 1 paragraph | `"Stage 1 deep-dive — Citation Brief #006"` |

Note: #001 MDX edit is optional but high-value — the Stage 1 section in #001
currently has no outbound link. Adding one makes the cluster self-reinforcing.

---

## Files Claude Code should inspect (pre-reads, read-only)

| File | Why |
|---|---|
| `src/content/citation-briefs/stage-3-structured-extractability.mdx` | Gold-standard MDX pattern for a Stage deep-dive (60-second answer box, H2 sections, Reveal components, internal links) |
| `src/content/citation-briefs/how-agencies-get-cited-in-ai-answers.mdx` | #001 — the Stage 1 section to cross-link from |
| `src/lib/citation-briefs-static.ts` | BRIEF_MANIFEST shape + existing entries to append after |
| `src/app/citation-brief/[slug]/page.tsx` | Static import pattern (lines 44–56) — where to add the new import + BRIEF_COMPONENTS entry |
| `src/data/services.ts` lines 176–210 (AVM `internalLinks`) | Where to append the brief #006 reference |
| `src/data/services.ts` lines 353–390 (PBSS `internalLinks`) | Where to append the brief #006 reference |
| `src/app/for-agencies/page.tsx` | Where to add citation brief reference |
| `scripts/notify-indexnow.sh` | URL list — add `https://wielegroup.com/citation-brief/stage-1-entity-resolution` |
| `src/app/sitemap.ts` — `STATIC_ROUTES` array | Confirm citation-brief routes are generated dynamically (they are, via `getAllBriefSlugs()`) — no sitemap edit expected |

---

## Likely files to edit

| File | Change |
|---|---|
| `src/content/citation-briefs/stage-1-entity-resolution.mdx` | **NEW** — full brief content |
| `src/lib/citation-briefs-static.ts` | Append `briefNumber: 6` manifest entry |
| `src/app/citation-brief/[slug]/page.tsx` | Add static import + BRIEF_COMPONENTS entry (2 lines) |
| `src/data/services.ts` | AVM `internalLinks` — append brief #006 entry; PBSS `internalLinks` — append brief #006 entry |
| `src/app/for-agencies/page.tsx` | Add citation brief reference (exact insertion point to be determined after reading the file) |
| `src/content/citation-briefs/how-agencies-get-cited-in-ai-answers.mdx` | **(Optional)** Add outbound link from Stage 1 section to #006 |
| `scripts/notify-indexnow.sh` | Append new URL |
| `scripts/gen-static-route-lastmod.mjs` | Run post-build (standard) |

**Not in scope:**
- OG image generation (can ship with siteConfig.ogImage fallback; add in follow-up)
- New TSX components (existing MDX + div-page pattern covers everything)
- New Stripe products
- Any routing or nav changes

---

## Manifest entry (draft — Claude Code to wire)

```typescript
{
  slug: "stage-1-entity-resolution",
  briefNumber: 6,
  title: "Stage 1 — Entity Resolution: how AI engines learn which brands to trust",
  summary:
    "Stage 1 of the Five-Stage Citation Hierarchy is Entity Resolution — whether AI engines can unambiguously identify your brand as a distinct entity. Every other stage in the hierarchy is gated on it. The engineering sprint that fixes it, and the signals that confirm it landed.",
  eyebrow: "AEO methodology",
  category: "AEO methodology",
  author: "Jonathan Landman",
  reviewer: "Jonathan Landman",
  lastUpdated: "2026-05-25",
  readingMinutes: 13,
  // ogImage: omit for now → falls back to siteConfig.ogImage; add in dedicated OG pass
  faq: [
    // 6–8 buyer-decision questions (see Claude Code execution prompt below for suggested questions)
  ],
}
```

---

## Validation gates

After Claude Code ships:

```bash
# 1. Clean tree after commit
git status --short
# Expected: nothing

# 2. Build succeeds
npm run build:cf 2>&1 | grep "citation-brief"
# Expected: /citation-brief/[slug] listed; stage-1-entity-resolution enumerated

# 3. Route resolves on production
curl -sI https://wielegroup.com/citation-brief/stage-1-entity-resolution | head -3
# Expected: HTTP/2 200

# 4. Schema present — Article + FAQPage + BreadcrumbList
curl -s -A 'Mozilla/5.0' https://wielegroup.com/citation-brief/stage-1-entity-resolution \
  | grep -oE '"@type"\s*:\s*"(Article|FAQPage|BreadcrumbList)"' | sort | uniq
# Expected: all three types present

# 5. Internal links render — AVM and PBSS links in brief body
curl -s -A 'Mozilla/5.0' https://wielegroup.com/citation-brief/stage-1-entity-resolution \
  | grep -oE 'href="(/services/ai-visibility-monitoring|/services/premium-brand-site-system|/for-agencies|/audit)"' | sort | uniq
# Expected: all four destinations present in source

# 6. IndexNow 200
# (Run notify-indexnow.sh — expect HTTP 200 response on the new URL)

# 7. AVM page carries brief #006 link
curl -s -A 'Mozilla/5.0' https://wielegroup.com/services/ai-visibility-monitoring \
  | grep "stage-1-entity-resolution"
# Expected: 1+ match

# 8. PBSS page carries brief #006 link
curl -s -A 'Mozilla/5.0' https://wielegroup.com/services/premium-brand-site-system \
  | grep "stage-1-entity-resolution"
# Expected: 1+ match

# 9. /for-agencies page carries brief #006 reference
curl -s -A 'Mozilla/5.0' https://wielegroup.com/for-agencies \
  | grep "stage-1-entity-resolution"
# Expected: 1+ match
```

---

## Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Static import omitted in `[slug]/page.tsx` | HIGH — page 404s on production | Phase 7.4 fix is documented in the file header; Claude Code has done this 5 times. Pre-read the import block before editing. |
| BRIEF_MANIFEST entry added but static import missing (or vice versa) | HIGH — `notFound()` triggered | Both changes must ship in the same commit. Acceptance gate: `npm run build:cf` must list the new slug under `[slug]`. |
| AVM/PBSS internal links added with wrong href path | MEDIUM — broken links, no 404 (Next.js Link silently routes) | Validation gate #5 catches this. |
| #001 MDX edit introduces JSX syntax error | LOW — only if optional edit is attempted | Read the exact Stage 1 paragraph before editing; match surrounding JSX exactly. |
| IndexNow fails | LOW — indexing delay only; content is live | Re-run `notify-indexnow.sh`; check exit code. |
| OG image fallback is wrong path | LOW — social share uses generic OG; no broken route | Omit `ogImage` from manifest — siteConfig.ogImage fallback is confirmed working on #003 and #004. |

---

## Claude Code execution prompt

When the founder approves this scope, issue this prompt to Claude Code:

---

**WIELE GROUP — PHASE 2 STEP 4 — CITATION BRIEF #006**

Read this directive fully before any action:
`wielegroup.com/docs/directives/phase2-step4-citation-brief-006-scope-2026-05-25.md`

**§0 Pre-flight**

```bash
cd "/Users/jonathanlandman/Documents/Claude/Projects/Wiele Group Operations/wielegroup.com"
git status --short          # Expected: empty
git branch --show-current   # Expected: main
git tag --sort=-creatordate | head -1   # Expected: phase2-step3-pbss-deep-dive-2026-05-25
curl -sI https://wielegroup.com/citation-brief/brand-semantics-infrastructure | head -2
# Expected: HTTP/2 200
```

Hard stop if any check fails.

**§1 Pre-reads (read every file before editing anything)**

1. `src/content/citation-briefs/stage-3-structured-extractability.mdx` — MDX pattern
2. `src/content/citation-briefs/how-agencies-get-cited-in-ai-answers.mdx` — Stage 1 section to cross-link from
3. `src/lib/citation-briefs-static.ts` — full file
4. `src/app/citation-brief/[slug]/page.tsx` — full file
5. `src/data/services.ts` — full file
6. `src/app/for-agencies/page.tsx` — full file
7. `scripts/notify-indexnow.sh` — URL list section

**§2 Files to create / edit**

2a. **NEW** `src/content/citation-briefs/stage-1-entity-resolution.mdx`

Write a full Stage 1 deep-dive brief following the established MDX pattern
(60-second answer box → H2 sections → Reveal components → internal links →
closing CTA section). Minimum sections:

- 60-second answer (electric border box, same pattern as #002)
- Why Stage 1 is the gate (not the ceiling)
- The four entity signals AI engines read (knowledge graph footprint · schema
  sameAs disambiguation · named-author trace · consistent NAP/identity data
  across trusted sources)
- How to diagnose a Stage 1 failure (brand name resolves to wrong entity ·
  brand name absent from knowledge graph · engine confuses brand with common
  noun or competitor · citation shows up as "unnamed source")
- The entity resolution sprint (3-week engineering sequence)
- What Stage 1 unlocks (and why Stage 3 alone won't move the needle without it)
- Internal links to: #001, #002, /services/ai-visibility-monitoring,
  /services/premium-brand-site-system, /for-agencies, /audit, /citation-score

Tone and register: match Brief #002 exactly — precise, technical, direct.
No filler. No hedged claims. Every statement attributable or verifiable.
Target reading time: 12–14 minutes.

2b. `src/lib/citation-briefs-static.ts` — append after the #005 entry:

```typescript
{
  slug: "stage-1-entity-resolution",
  briefNumber: 6,
  title: "Stage 1 — Entity Resolution: how AI engines learn which brands to trust",
  summary:
    "Stage 1 of the Five-Stage Citation Hierarchy is Entity Resolution — whether AI engines can unambiguously identify your brand as a distinct entity. Every other stage in the hierarchy is gated on it. The engineering sprint that fixes it, and the signals that confirm it landed.",
  eyebrow: "AEO methodology",
  category: "AEO methodology",
  author: "Jonathan Landman",
  reviewer: "Jonathan Landman",
  lastUpdated: "2026-05-25",
  readingMinutes: 13,
  faq: [
    {
      question: "What is entity resolution in the context of AI search?",
      answer:
        "Entity resolution is the process by which an AI answer engine disambiguates a brand name from all other entities sharing the same or similar names and anchors it to a unique, trusted knowledge node. Once resolved, the engine can attribute content, citations, and authority to that specific entity — and pull from it confidently when answering buyer-intent prompts. Until resolution is clean, the engine either ignores the brand, conflates it with a competitor, or cites it as an unnamed secondary source.",
    },
    {
      question: "How do I know if my brand has an entity resolution problem?",
      answer:
        "Four signals: (1) Your brand name returns a generic description rather than a specific entity card in Google's Knowledge Panel. (2) AI engines cite your competitors when asked about your category but not you, even when your content directly addresses the query. (3) Schema.org markup on your site carries no sameAs links to recognised third-party profiles. (4) Your brand name is a common noun, a person's name, or an acronym shared with other entities — and you have no published disambiguation layer. A Wiele Signal Audit grades Stage 1 first and surfaces the specific failure mode.",
    },
    {
      question: "Is entity resolution the same as building a Wikipedia page?",
      answer:
        "Wikipedia is one input — and a strong one — but it is not the only path. AI engines synthesise entity information from structured data (JSON-LD sameAs links), named-author publishing, consistent NAP (name, address, phone or brand-equivalent identity data) across trusted sources, and Wikidata entries. A brand without a Wikipedia article can still achieve clean entity resolution by engineering the other three signals. Conversely, a brand with a Wikipedia article but no schema layer, no named author, and inconsistent identity data across sources will still fail Stage 1 queries.",
    },
    {
      question: "How long does entity resolution take?",
      answer:
        "The engineering sprint runs three weeks. Week one: audit the existing entity footprint, file the Wikidata claim if absent, publish or update the schema sameAs layer across the top pages. Week two: founder-voice publishing on the brand's owned domain with consistent identity signals. Week three: structured third-party citation placement (one tier-1 press mention or podcast transcript is worth more than twenty directory listings). Engines re-crawl within days if you submit via IndexNow; citation-share lift from Stage 1 resolution typically shows up in the second monthly engine run.",
    },
    {
      question: "Does entity resolution help with classical search rankings too?",
      answer:
        "Yes — entity resolution improves Google's entity understanding, which feeds the Knowledge Graph, which in turn raises E-E-A-T signals on ranking decisions. The compound is intentional: classical SEO authority (Stage 2) and entity resolution (Stage 1) are the two foundational layers that make every other investment in the Five-Stage Hierarchy more efficient. Wiele runs both as one integrated system.",
    },
    {
      question: "What is the difference between Stage 1 entity resolution and Stage 5 recommendation history?",
      answer:
        "Stage 1 is binary: the engine either resolves your brand to a clean entity or it does not. You can fix a Stage 1 failure in three weeks. Stage 5 — Recommendation History — is a compounding signal; early citation begets later citation, and the loop strengthens over years. Stage 5 requires Stage 1 to be clean first: an engine cannot build a citation-history loop for an entity it has not yet resolved. Fix Stage 1 in a sprint; build Stage 5 through the compounding retainer.",
    },
    {
      question: "Can my in-house team run the entity resolution sprint?",
      answer:
        "Yes, with the right specification. The sequence is: entity audit → Wikidata filing → schema sameAs layer → founder-voice content → structured tier-1 citation placement. The friction is prioritisation and completion rate — most in-house teams file the Wikidata entry but skip the sameAs layer, or publish the founder-voice content but let it sit without a named-author schema wrapper. Wiele runs the sprint as a turnkey delivery inside the Signal Audit engagement. Agencies can licence the sprint as a white-label deliverable through the /for-agencies capability layer.",
    },
    {
      question: "Where does entity resolution sit in the Five-Stage Citation Hierarchy?",
      answer:
        "Stage 1 — the gate. The full hierarchy: Stage 1 Entity Resolution → Stage 2 Source Authority → Stage 3 Structured Extractability → Stage 4 Freshness → Stage 5 Recommendation History. Every stage compounds on the previous. Stage 3 Structured Extractability is the highest-leverage sprint-scale intervention, but only on pages where Stage 1 is already solved — the engine needs to know who is publishing the page before it trusts what the page says. The full hierarchy is in Citation Brief #001.",
    },
  ],
},
```

2c. `src/app/citation-brief/[slug]/page.tsx` — add after line 48 (after BrandSemanticsInfrastructure import):

```typescript
import Stage1EntityResolution from "@/content/citation-briefs/stage-1-entity-resolution.mdx";
```

And inside `BRIEF_COMPONENTS`:

```typescript
"stage-1-entity-resolution": Stage1EntityResolution,
```

2d. `src/data/services.ts` — AVM `internalLinks` array (after the existing last entry):

```typescript
{
  label: "Stage 1 — Entity Resolution",
  description:
    "The foundation of AI citation — whether engines can unambiguously identify your brand as a distinct entity. AI Visibility Monitoring tracks the signals that confirm entity resolution landed and measures citation lift month over month.",
  href: "/citation-brief/stage-1-entity-resolution",
},
```

2e. `src/data/services.ts` — PBSS `internalLinks` array (after the existing last entry):

```typescript
{
  label: "Stage 1 — Entity Resolution",
  description:
    "The technical substrate of the Foundation Build installs the entity layer first: schema sameAs, structured identity signals, llms.txt, knowledge-graph footprint. Understand Stage 1 before scoping the build.",
  href: "/citation-brief/stage-1-entity-resolution",
},
```

2f. `src/app/for-agencies/page.tsx` — add a citation brief reference in the
"Entity and Authority Engineering" capability section. Read the file to locate
the exact JSX node, then add a paragraph or link alongside the capability
description pointing to `/citation-brief/stage-1-entity-resolution`. Match
surrounding JSX style exactly.

2g. `scripts/notify-indexnow.sh` — append to the URL list:
`https://wielegroup.com/citation-brief/stage-1-entity-resolution`

**§3 Validation (run every gate; hard-stop on any failure)**

Run all 9 gates listed in the scope directive §Validation gates above.

**§4 Commit + tag + deploy**

```bash
# Commit
git add -A
git commit -m "feat(citation-brief): Stage 1 Entity Resolution — Brief #006 + internal link mesh"

# Tag
git tag phase2-step4-citation-brief-006-2026-05-25

# Push
git push origin main --tags

# Deploy
npx wrangler deploy

# Lastmod regen
node scripts/gen-static-route-lastmod.mjs

# IndexNow
bash scripts/notify-indexnow.sh
```

**§5 Report back**

Format:

```
Status: SHIPPED / FAIL
Live URL: https://wielegroup.com/citation-brief/stage-1-entity-resolution
Worker version:
Tag:
Commit:
Gate results: [list all 9 — PASS / FAIL each]
Issues:
Next action:
```

---

## Stopped

Scope complete. No files edited. No deployment. Awaiting founder approval.
