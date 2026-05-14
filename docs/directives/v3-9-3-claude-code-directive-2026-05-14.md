# Claude Code Directive — v3.9.3 (2026-05-14)

**Issued by:** Cowork (Wiele Enterprise Orchestrator)
**To:** Claude Code
**Authority:** Founder · Jonathan Landman
**Repo:** `wielegroup.com`
**Live state at issuance:** Worker version `b8513737` (deployed 2026-05-14 by Cowork)

This is a binding directive. Read it top to bottom before any action. Pre-flight
checks are non-negotiable. Decision gates BLOCK execution where stated.

---

## §0 · Pre-flight (run every item; abort if any fails)

```bash
# 0.1 — Working directory MUST be canonical wielegroup.com repo
cd "/Users/jonathanlandman/Documents/Claude/Projects/Wiele Group Operations/wielegroup.com"
pwd
# Expect EXACTLY: /Users/jonathanlandman/Documents/Claude/Projects/Wiele Group Operations/wielegroup.com

# 0.2 — Confirm git is on main, clean tree (or stash before starting)
git rev-parse --abbrev-ref HEAD
# Expect: main

git status --short
# Expect: empty (or only files you intend to commit in this directive)

# 0.3 — Confirm Node + wrangler local presence
node -v          # Expect: v22+ or v24+ — Node 22.22.0 in workspace, v24.15.0 on host
ls node_modules/.bin/wrangler && echo wrangler:ok
ls node_modules/.bin/next     && echo next:ok

# 0.4 — Verify last shipped state (sanity)
curl -s -A 'Mozilla/5.0' https://wielegroup.com/ \
  | grep -oE '<title>[^<]+</title>'
# Expect title contains: "Citation, not clicks. We engineer the brand AI engines choose."
```

**If any check fails, STOP. Do not improvise. Report the failure to the founder
inline. Resume only after the founder approves a remediation step.**

---

## §1 · Mission

Productize the Citation Score™ subscription on `/pricing`, refactor
`/citation-brief` to a scalable MDX architecture, ship OG imagery for Brief #001,
verify schema parity, draft Brief #002, audit `/platform` for positioning drift,
and (optionally) promote `/citation-brief` to primary nav.

Every task lifts citation-economy revenue. The brief that referenced Citation
Score™ is live; pricing must match to close the Shipped-vs-Drafted gap.

---

## §2 · Hard constraints (binding laws — non-negotiable)

| # | Law | Applied here |
|---|-----|--------------|
| 1 | Single-source-of-truth | Ship to canonical wielegroup.com only. NEVER any worktree. (Worktrees were deleted 2026-05-14.) |
| 2 | Live-or-Nothing | Only curl-verified live state counts as "shipped." Run `curl -A 'Mozilla/5.0' <url>` after every deploy. |
| 3 | Shipped-vs-Drafted Precision | "Shipped" = LIVE on wielegroup.com. Drafting to filesystem is NOT shipping. |
| 4 | Pre-Revenue Free-Tier Constraint | No paid SaaS additions without ROI thesis. Stripe products are free; Cloudflare deploys are free; OK. |
| 5 | Distribution Handoff | Every creative output gets: filename · alt · schema · OG · UTM · sitemap · IndexNow. |
| 6 | Image File Naming + Alt-Text SEO | `wiele-{topic}-{angle}-{context}.{ext}` + 80–125 char alt. |
| 7 | No-Bombardment | Terse status reports. `On it. → Done.` posture. No mid-flight narration. |
| 8 | Best-Action-or-Burn | Pre-action 4-gate: is this 100% positive · best for Wiele · current data · strategised? Yes to all → proceed. No → escalate. |
| 9 | Recon-FIRST-Write-SECOND | Read every file you will modify BEFORE editing. Cross-surface scan before bulk changes. |
| 10 | Authority Decays with Delay | When directive is unambiguous, acknowledge with `On it.` then ship. Report at completion, not mid-flight. |

---

## §3 · Founder decision gates (P0a BLOCKED until these are ticked)

Citation Score™ commercial shape requires founder sign-off line-by-line.
Cowork proposed values. Founder writes ✓ / ✗ / edit inline, then Claude Code wires.

```
TIER 1 — Citation Score™ Starter
  [ ] Name: "Citation Score™ Starter"
  [ ] Price: £2,000 / month (GBP)
  [ ] Inclusions: 1 brand tracked · 3 named competitors · 5 answer engines
       (ChatGPT, Perplexity, Google AI Overviews, Gemini, Copilot) ·
       monthly engine run · quarterly Citation Brief draft ·
       self-serve dashboard
  [ ] Stripe product slug: citation-score-starter
  [ ] Page CTA destination: /contact?tier=starter (fallback /contact)

TIER 2 — Citation Score™ Pro
  [ ] Name: "Citation Score™ Pro"
  [ ] Price: £4,000 / month (GBP)
  [ ] Inclusions: 1 brand · 6 competitors · 8 engines (Starter + Claude, Grok, You.com) ·
       weekly engine run · 1 published Citation Brief per quarter ·
       quarterly principal QBR call
  [ ] Stripe product slug: citation-score-pro
  [ ] Page CTA destination: /contact?tier=pro

TIER 3 — Citation Score™ Authority
  [ ] Name: "Citation Score™ Authority"
  [ ] Price: £6,000 / month (GBP)
  [ ] Inclusions: 1 brand · 10 competitors · all 10 engines (Pro + Brave Search, DeepSeek) ·
       weekly engine run · 1 Citation Brief per month ·
       monthly principal session · founder voice writing assist
  [ ] Stripe product slug: citation-score-authority
  [ ] Page CTA destination: /contact?tier=authority

GLOBAL
  [ ] Billing cadence: monthly only — no annual discount pre-revenue
  [ ] Minimum term: 3 months (recommendation-history loop needs time to seed)
  [ ] Cancellation: 30 days notice
  [ ] Pricing-section heading: "Recurring AI Visibility"
  [ ] Section position: ABOVE the existing one-off SKU cards on /pricing
```

**Founder action:** mark each line above ✓ / ✗ / edit value, paste back to
Cowork. Cowork relays to Claude Code. Claude Code does NOT proceed on §4.P0a
until the relay arrives.

---

## §4 · Tasks

Each task has the SAME structure:
- **Why** — strategic rationale
- **Pre-reads** — files Claude Code MUST `Read` before editing (Recon-First law)
- **Files to create / edit / delete** — explicit paths
- **Implementation notes** — code patterns, snippets, constraints
- **Acceptance criteria** — pass/fail checklist
- **Verification commands** — exact commands to run after the edit
- **Commit message** — exact text to use in the commit
- **Deploy** — when to deploy this item (per-item or batched)

---

### §4.P0a · Productize Citation Score™ on /pricing  · **BLOCKED on §3**

**Why.** Brief #001 ([live](https://wielegroup.com/citation-brief/how-agencies-get-cited-in-ai-answers))
references the Citation Score™ subscription and links to `/pricing`. `/pricing`
must carry the SKU within hours or the brief misleads visitors.

**Pre-reads.**
- `src/data/pricing.ts` — current pricing data shape
- `src/components/sections/pricing-section.tsx` — current section component
- `src/app/pricing/page.tsx` — current page composition
- `src/lib/schema.ts` lines 457–491 — `serviceTierSchema()` helper signature
- `src/app/services/ai-visibility-monitoring/page.tsx` — example of an existing recurring service page (pattern reference)

**Files to create.**
- `src/data/citation-score.ts` — new module with the three tiers as exported const arrays. Match the existing pricing data style.

**Files to edit.**
- `src/data/pricing.ts` — add a `citationScoreTiers` export if not split; otherwise import from `citation-score.ts`.
- `src/components/sections/pricing-section.tsx` — add a new `<RecurringAiVisibilityTiers />` block above the existing one-off cards. Use the existing card pattern: `<Card>` → `<Badge>` → `<h3>` → price → inclusions ul → CTA.
- `src/app/pricing/page.tsx` — render `<RecurringAiVisibilityTiers />` block, attach three `<JsonLd schema={serviceTierSchema(...)}>` blocks (one per tier).

**Implementation notes.**

Pricing data shape — match this exactly:

```typescript
// src/data/citation-score.ts
import type { ReactNode } from "react";

export type CitationScoreTier = {
  slug: "starter" | "pro" | "authority";
  name: string;                // "Citation Score™ Starter"
  priceGbp: number;             // 2000 | 4000 | 6000
  badgeLabel: string;           // "Starter" | "Pro" | "Authority"
  inclusions: string[];         // bullet-list copy
  ctaHref: string;              // "/contact?tier=starter"
  schemaServiceType: string;    // "AI Citation Monitoring Subscription"
  schemaDescription: string;    // 1-sentence schema description
};

export const citationScoreTiers: CitationScoreTier[] = [
  // populate from §3 once founder signs off
];
```

Schema wiring on page:

```typescript
import { serviceTierSchema } from "@/lib/schema";
import { citationScoreTiers } from "@/data/citation-score";
import { siteConfig } from "@/lib/metadata";

const tierSchemas = citationScoreTiers.map((t) =>
  serviceTierSchema({
    name: t.name,
    description: t.schemaDescription,
    serviceType: t.schemaServiceType,
    price: String(t.priceGbp),
    priceCurrency: "GBP",
    url: `${siteConfig.url}/pricing#${t.slug}`,
    recurring: true,
  })
);
// render: tierSchemas.map((s, i) => <JsonLd key={i} schema={s} id={`schema-citation-score-${i}`} />)
```

Stripe — use the Stripe MCP (`mcp__d5142a7e-...__create_product`,
`__create_price`). Each tier becomes one product + one recurring price in GBP.
Match the slug. Do NOT create payment links or checkouts in this directive —
just products and prices. CTA stays `/contact?tier=...` for principal-mediated
sign-up until pre-revenue stage closes.

**Acceptance criteria.**

- [ ] `/pricing` renders three new tier cards above the existing section.
- [ ] Each card shows: badge, name, price (£X,XXX/mo), 5-7 bullet inclusions, CTA button.
- [ ] HTML response includes three `<script type="application/ld+json">` blocks with `@type: "Service"`, `offers.priceCurrency: "GBP"`, `offers.priceSpecification.billingDuration: "P1M"`.
- [ ] Three Stripe products created with the agreed slugs. Each has a GBP recurring price.
- [ ] Brief #001's `/pricing` link lands at the section (URL fragment `#recurring-ai-visibility` or similar — anchor the section).
- [ ] No regression on existing pricing copy or layout.

**Verification commands.**

```bash
# Live HTML carries the schemas
curl -s -A 'Mozilla/5.0' https://wielegroup.com/pricing \
  | grep -oE '"@type":"Service"' | wc -l
# Expect: >= 3 (could be more if other Service entries exist)

curl -s -A 'Mozilla/5.0' https://wielegroup.com/pricing \
  | grep -oE '"priceCurrency":"GBP"' | wc -l
# Expect: >= 3

# Visible copy
curl -s -A 'Mozilla/5.0' https://wielegroup.com/pricing \
  | grep -oE 'Citation Score' | wc -l
# Expect: >= 3 (one per tier card minimum)

# Stripe check via MCP
# mcp__d5142a7e-..__list_products | filter for "citation-score-*" → expect 3
# mcp__d5142a7e-..__list_prices   | filter currency=gbp interval=month → expect 3 new entries
```

**Commit message.**

```
feat(pricing): productize Citation Score™ subscription (£2-6k/mo · 3 tiers · GBP)

Wiele Citation Score™ as the recurring AI Visibility SKU. Three tiers
(Starter £2k, Pro £4k, Authority £6k) match the canon Tier-1 play from
the 2026-05-14 Advertising Canon intake and close the open loop from
Citation Brief #001 referencing /pricing.

Tiers:
- Starter:    1 brand · 3 competitors · 5 engines · monthly run · quarterly Brief
- Pro:        1 brand · 6 competitors · 8 engines · weekly run · 1 Brief/quarter
- Authority:  1 brand · 10 competitors · all 10 engines · weekly run · 1 Brief/month

Stripe products + prices created in GBP via MCP.
serviceTierSchema with recurring: true, P1M billing.

Closes brief #001 /pricing reference.
```

**Deploy.** Per-item after Stripe creation succeeds. Run §5 deploy procedure.

---

### §4.P0b · MDX refactor of `/citation-brief` route  · **GO (no commercial gate)**

**Why.** Brief #001 is a single ~500-line TSX page. Doesn't scale. Mirror the
labs/[slug] pattern so Brief #002+ ship as MDX drops.

**Pre-reads.**
- `src/app/labs/[slug]/page.tsx` — gold-standard pattern (Phase 7.4 fix included)
- `src/lib/labs-static.ts` — manifest pattern with explicit static imports
- `src/content/labs/five-citation-signals.mdx` — example MDX article body
- `src/app/citation-brief/how-agencies-get-cited-in-ai-answers/page.tsx` — current Brief #001 (will be ported then deleted)
- `src/app/citation-brief/page.tsx` — index page (will be updated to read manifest)
- `src/components/labs/article-meta.tsx` · `article-toc.tsx` · `article-cta.tsx` — reusable components (decide reuse vs. fork)

**Files to create.**

```
src/app/citation-brief/[slug]/page.tsx              # dynamic route
src/content/citation-briefs/how-agencies-get-cited-in-ai-answers.mdx
src/lib/citation-briefs-static.ts                    # manifest
```

Optionally:
```
src/components/citation-briefs/brief-meta.tsx        # if /labs/article-meta needs forking
src/components/citation-briefs/brief-toc.tsx
src/components/citation-briefs/brief-cta.tsx
```

**Files to edit.**
- `src/app/citation-brief/page.tsx` — replace inline `briefs` const with `getVisibleBriefManifest()` import.

**Files to delete.**
- `src/app/citation-brief/how-agencies-get-cited-in-ai-answers/page.tsx` — replaced by `[slug]` dynamic route.

**Implementation notes.**

The Phase 7.4 fix (read the head comment in `src/app/labs/[slug]/page.tsx`) is
CRITICAL: OpenNext on Cloudflare doesn't follow dynamic `import("../path.mdx")`.
You MUST use static imports per slug, keyed by an object:

```typescript
import HowAgenciesGetCited from "@/content/citation-briefs/how-agencies-get-cited-in-ai-answers.mdx";

const BRIEF_COMPONENTS: Record<string, React.ComponentType> = {
  "how-agencies-get-cited-in-ai-answers": HowAgenciesGetCited,
};
```

Adding Brief #002 = (1) drop `.mdx` in `src/content/citation-briefs/`, (2) add a static `import` here, (3) add the manifest entry. Zero new TSX.

Frontmatter shape for MDX (mirror labs):
```yaml
---
title: "How premium agencies get cited by ChatGPT, Perplexity, and Google AI Overviews"
slug: "how-agencies-get-cited-in-ai-answers"
summary: "The Five-Stage Citation Hierarchy AI answer engines use…"
eyebrow: "AEO methodology"
author: "Jonathan Landman"
lastUpdated: "2026-05-14"
readingMinutes: 12
ogImage: "/og/wiele-citation-brief-001-five-stage-citation-hierarchy.png"
category: "AEO methodology"
faq:
  - question: "What is a Citation Brief?"
    answer: "A Wiele Citation Brief is a single-topic field guide…"
  # … 8 questions total
---
```

Manifest (`src/lib/citation-briefs-static.ts`):
```typescript
export type CitationBrief = {
  slug: string; title: string; summary: string; eyebrow: string;
  author: string; lastUpdated: string; readingMinutes: number;
  ogImage?: string; category: string;
  faq: Array<{ question: string; answer: string }>;
};

const MANIFEST: CitationBrief[] = [
  {
    slug: "how-agencies-get-cited-in-ai-answers",
    title: "How premium agencies get cited by ChatGPT, Perplexity, and Google AI Overviews",
    // … fill from MDX frontmatter
  },
];

export function getVisibleBriefManifest(): CitationBrief[] { return MANIFEST; }
export function getBriefBySlug(slug: string) { return MANIFEST.find(b => b.slug === slug); }
export function getAllBriefSlugs(): string[] { return MANIFEST.map(b => b.slug); }
```

`[slug]/page.tsx` schema setup — mirror `/labs/[slug]/page.tsx`:
- Article + Person + Breadcrumb + FAQPage (FAQPage only if `brief.faq.length > 0`).
- `Person.sameAs = [siteConfig.socials.founderLinkedin]` — entity-disambiguation fix (do NOT use company LinkedIn).

**Acceptance criteria.**

- [ ] `/citation-brief/how-agencies-get-cited-in-ai-answers` renders identically to current state (visual diff before/after).
- [ ] All 4 JSON-LD blocks (Article, Person, Breadcrumb, FAQPage) remain in HTML response.
- [ ] `next build` lists `● /citation-brief/[slug]` as SSG with `how-agencies-get-cited-in-ai-answers` enumerated.
- [ ] Old `src/app/citation-brief/how-agencies-get-cited-in-ai-answers/page.tsx` deleted; no orphaned imports.
- [ ] `npm run typecheck` clean.
- [ ] `npm run lint` clean.

**Verification commands.**

```bash
# Before deploy: build + visual diff
npm run build:cf 2>&1 | grep "citation-brief"
# Expect: ● /citation-brief/[slug] listed under SSG routes

# After deploy: HTML content didn't shift
curl -s -A 'Mozilla/5.0' https://wielegroup.com/citation-brief/how-agencies-get-cited-in-ai-answers \
  | grep -oE 'application/ld\+json[^<]*' | wc -l
# Expect: 4

# Sample H1 string is preserved
curl -s -A 'Mozilla/5.0' https://wielegroup.com/citation-brief/how-agencies-get-cited-in-ai-answers \
  | grep -oE 'How premium agencies get cited' | head -1
# Expect: 1 match
```

**Commit message.**

```
refactor(citation-brief): MDX architecture mirroring labs/[slug] pattern

Brief #001 ported from inline TSX (~500 lines) to MDX + manifest +
dynamic [slug] route. Phase 7.4 static-import fix applied: dynamic
MDX imports break under OpenNext/Workers; per-slug static imports
keyed by component map.

Brief #002+ now ship as MDX drops: (1) .mdx in src/content/citation-briefs/,
(2) static import in [slug]/page.tsx, (3) manifest entry in
citation-briefs-static.ts. Zero new TSX per brief.

Visual + schema parity preserved (curl-diffed).
```

**Deploy.** Per-item.

---

### §4.P1a · OG image for Brief #001  · **GO**

**Why.** Social-share preview cards for Brief #001 currently fall back to the
site-wide `og-image.png`. A brief-specific OG image lifts CTR on LinkedIn / X
shares and AI Overview share-back cards.

**Pre-reads.**
- `public/og-image.png` — current default, get the existing brand DNA
- `src/lib/metadata.ts` — `buildMetadata({ogImage})` signature
- `src/app/citation-brief/[slug]/page.tsx` (or the post-P0b path) — where `ogImage` resolves into metadata

**Files to create.**
- `public/og/wiele-citation-brief-001-five-stage-citation-hierarchy.png` (1200×630, ≤200KB after compression)

**Files to edit.**
- Citation Brief #001 MDX frontmatter (if P0b shipped): set `ogImage: "/og/wiele-citation-brief-001-five-stage-citation-hierarchy.png"`.
- OR the TSX page (if P0b not yet shipped): pass `ogImage` to `buildMetadata({...})`.

**Implementation notes.**

Design constraints (Wiele Brand Kit):
- Background: `#141c2e` obsidian
- Accent: `#3b82f6` electric blue (or `#5babff` electric light)
- Type: Geist Sans for title, Geist Mono for eyebrow if used
- Asset: 3D Chromaglass W mark in upper-left corner (small) OR centered behind type at low opacity

Canonical layout:
- Eyebrow row (Geist Mono uppercase, 14px equivalent at 1200×630 scale, electric blue): `CITATION BRIEF #001 · AEO METHODOLOGY`
- Title row (Geist Sans bold, ~64px scaled): `Citation, not clicks.`
- Subtitle row (Geist Sans regular, ~36px scaled, silver `#cbd5e1`): `The Five-Stage Citation Hierarchy.`
- Bottom-left: `wielegroup.com` in mono
- Bottom-right: Chromaglass W mark

Tools acceptable:
- Adobe Firefly via the Adobe MCP (image_apply_color_overlay, document_render_layout) — if connected.
- Manual: Photoshop or Figma + the existing brand assets.
- Fallback: HTML/CSS to PNG (Puppeteer or @vercel/og) — Brief #002+ can use programmatic OG if a pattern lands.

Alt text (80–125 chars):
`Wiele Citation Brief #001 — Five-Stage Citation Hierarchy for AI answer engines. Citation, not clicks.`
(112 chars ✓)

**Acceptance criteria.**

- [ ] PNG file exists at `public/og/wiele-citation-brief-001-five-stage-citation-hierarchy.png`.
- [ ] Dimensions exactly 1200×630.
- [ ] File size ≤200KB.
- [ ] Brief #001 page `<meta property="og:image">` resolves to the new URL.
- [ ] Brief #001 page `<meta name="twitter:image">` resolves to the new URL.
- [ ] LinkedIn Post Inspector renders the new image when the URL is pasted.

**Verification commands.**

```bash
# Local file
file "public/og/wiele-citation-brief-001-five-stage-citation-hierarchy.png"
# Expect: PNG image data, 1200 x 630

ls -la "public/og/wiele-citation-brief-001-five-stage-citation-hierarchy.png"
# Expect: ≤200KB

# Live meta tags
curl -s -A 'Mozilla/5.0' https://wielegroup.com/citation-brief/how-agencies-get-cited-in-ai-answers \
  | grep -oE 'og:image" content="[^"]+"'
# Expect: og:image points to /og/wiele-citation-brief-001-five-stage-citation-hierarchy.png

# LinkedIn Post Inspector (manual — open in browser)
echo "https://www.linkedin.com/post-inspector/inspect/https%3A%2F%2Fwielegroup.com%2Fcitation-brief%2Fhow-agencies-get-cited-in-ai-answers"
```

**Commit message.**

```
feat(og): brief-specific OG image for Citation Brief #001

Brand-uniform 1200×630 OG card: obsidian + electric-blue Chromaglass
aesthetic. Lead with "Citation, not clicks." + "Five-Stage Citation
Hierarchy" subtitle. Lifts share-card CTR on LinkedIn/X and AI
Overview share-back surfaces.

Filename per Image Naming SEO Law:
  wiele-citation-brief-001-five-stage-citation-hierarchy.png
Alt: 112 chars · Wiele Citation Brief #001 — Five-Stage Citation
     Hierarchy for AI answer engines. Citation, not clicks.
```

**Deploy.** Bundle with P0b deploy or per-item.

---

### §4.P1b · Schema parity curl check  · **GO**

**Why.** OpenNext on Cloudflare ships JSON-LD inline in SSG'd HTML. Verify all
4 schemas on Brief #001 are in the HTML response (not client-rendered) and
that homepage's 6 schemas are intact after any subsequent deploys.

**No file edits.** Pure verification step.

**Verification commands.**

```bash
# Brief #001 — 4 schemas expected (Article, Person, Breadcrumb, FAQPage)
curl -s -A 'Mozilla/5.0' https://wielegroup.com/citation-brief/how-agencies-get-cited-in-ai-answers \
  | grep -oE 'application/ld\+json' | wc -l
# Expect: 4

# Homepage — 6 schemas expected (Organization, WebSite, BreadcrumbList, Person, FAQPage, HowTo)
curl -s -A 'Mozilla/5.0' https://wielegroup.com/ \
  | grep -oE 'application/ld\+json' | wc -l
# Expect: 6

# Citation Brief INDEX — 3 schemas expected (Breadcrumb, WebPage, ItemList)
curl -s -A 'Mozilla/5.0' https://wielegroup.com/citation-brief \
  | grep -oE 'application/ld\+json' | wc -l
# Expect: 3
```

Then run Google Rich Results Test on each URL — paste into:
`https://search.google.com/test/rich-results?url=<encoded-url>`

**Acceptance criteria.**

- [ ] Brief #001: 4 schemas inline.
- [ ] Homepage: 6 schemas inline.
- [ ] Brief index: 3 schemas inline.
- [ ] Rich Results Test: no "Page not eligible" verdicts for Article or FAQPage on Brief #001.

**Verification report.** Paste counts into the Slack handback (or chat reply to Cowork).

---

### §4.P1c · Citation Brief #002 draft  · **GO (after §4.P0b lands)**

**Why.** Brief #001 introduces the Five-Stage Citation Hierarchy. Brief #002
deep-dives Stage 3 (Structured Extractability) — where most agency sites
underperform and where the highest-leverage zero-cost lift sits. Compounds
citation history (Stage 5) for /citation-brief as a topic cluster.

**Pre-reads.**
- `src/content/citation-briefs/how-agencies-get-cited-in-ai-answers.mdx` (post-P0b) — frontmatter shape + tone
- `src/content/labs/five-citation-signals.mdx` — adjacent topic; ensure no overlap, instead link mesh

**Files to create.**
- `src/content/citation-briefs/stage-3-structured-extractability.mdx`

**Files to edit.**
- `src/lib/citation-briefs-static.ts` — append manifest entry.
- `src/app/citation-brief/[slug]/page.tsx` — append static import + component-map entry.
- `src/app/sitemap.ts` — add the new route entry.
- `scripts/gen-static-route-lastmod.mjs` — add the new route to `STATIC_ROUTES`.

**Implementation notes.**

Working title: "How to win Stage 3 — the schema and content pattern AI engines reward."

Required structure (~2,500–3,500 words):
1. 60-second extractable answer
2. Why Stage 3 is the highest-leverage stage
3. The schema bundle: FAQPage, HowTo, Article, Person, Breadcrumb (with snippets)
4. The extractability content pattern (definitive opener · H2/H3 hierarchy · table/list-friendly layouts)
5. What NOT to do (5 antipatterns)
6. The Wiele extractability checklist (ownable artifact)
7. Methodology + sources
8. FAQ (8 questions, FAQPage schema)
9. CTA → /audit + /pricing#authority

Internal links REQUIRED (link mesh per Wiele law):
- → `/citation-brief/how-agencies-get-cited-in-ai-answers` (Brief #001 — back-reference to Five-Stage Hierarchy)
- → `/systems/ai-visibility`
- → `/audit`
- → `/pricing` (post-P0a, to recurring AI visibility section)
- → `/labs/five-citation-signals`

**Acceptance criteria.**

- [ ] Brief #002 LIVE at `/citation-brief/stage-3-structured-extractability`.
- [ ] Sitemap.xml lists the new URL.
- [ ] IndexNow ping fires on deploy.
- [ ] All 4 schemas inline (Article, Person, Breadcrumb, FAQPage).
- [ ] Brief #001 → Brief #002 cross-link visible.
- [ ] Brief #002 → Brief #001 cross-link visible.
- [ ] Total word count 2,500–3,500 (excluding frontmatter, FAQ).

**Verification commands.**

```bash
# Live status
curl -s -A 'Mozilla/5.0' -o /dev/null -w '%{http_code}\n' \
  https://wielegroup.com/citation-brief/stage-3-structured-extractability
# Expect: 200

# Sitemap inclusion
curl -s -A 'Mozilla/5.0' https://wielegroup.com/sitemap.xml \
  | grep -c "stage-3-structured-extractability"
# Expect: 1

# Schema count
curl -s -A 'Mozilla/5.0' https://wielegroup.com/citation-brief/stage-3-structured-extractability \
  | grep -oE 'application/ld\+json' | wc -l
# Expect: 4
```

**Commit message.**

```
feat(citation-brief): Brief #002 — Stage 3 Structured Extractability deep dive

Second Wiele Citation Brief (~3,000 words). Deep-dives Stage 3 of the
Five-Stage Citation Hierarchy (Structured Extractability) — the
highest-leverage zero-cost lift for premium agency sites. Includes the
schema bundle (FAQPage, HowTo, Article, Person, Breadcrumb), the
extractability content pattern, 5 antipatterns, and the Wiele
extractability checklist.

Sitemap + IndexNow updated.
Cross-linked with Brief #001 (back-reference to the hierarchy) and
/labs/five-citation-signals (adjacent topic).
```

**Deploy.** Per-item.

---

### §4.P2a · /platform page drift audit  · **GO**

**Why.** `/platform` sits at sitemap priority 0.9 (anchor surface). Cowork
session didn't read it. Verify it doesn't carry stale positioning conflicting
with the new "Citation, not clicks." mantra.

**Pre-reads.**
- `src/app/platform/page.tsx`
- Any data file it imports
- The H1 + lede on `src/app/page.tsx` for canonical positioning

**Files to edit (conditional).** Only if drift is detected.

**Implementation notes.**

The new canon since the last `/platform` edit (likely v2.x):
- Tagline: "Citation, not clicks. We engineer the brand AI engines choose."
- USP mantra: "Citation, not clicks."
- Methodology: "Map. Build. Compound."
- Owned framework introduced: Five-Stage Citation Hierarchy
- Productized: Wiele Citation Score™

Any copy that contradicts or undermines these MUST be fixed. Copy that just
predates them but doesn't contradict can stay (no forced re-write for the sake
of it).

**Acceptance criteria.**

- [ ] `/platform` page H1, lede, and any USP-adjacent copy align with current positioning.
- [ ] At minimum one link to `/citation-brief` and one to `/pricing#recurring-ai-visibility` (after P0a).
- [ ] No claims that contradict the Five-Stage Citation Hierarchy or the Citation Score™ SKU.

**Verification commands.**

```bash
# Page exists and 200s
curl -s -A 'Mozilla/5.0' -o /dev/null -w '%{http_code}\n' \
  https://wielegroup.com/platform
# Expect: 200

# After edits — check key strings if you fixed copy
curl -s -A 'Mozilla/5.0' https://wielegroup.com/platform \
  | grep -oE 'Citation.{0,30}not clicks' | head -1
# Expect: 1 match if you added the mantra
```

**Commit message (if edits).**

```
chore(platform): align /platform positioning with v3.9.3 canon

USP mantra (Citation, not clicks.), Map. Build. Compound. methodology,
and Five-Stage Citation Hierarchy now referenced on the platform page.
Cross-links to /citation-brief and /pricing#recurring-ai-visibility
added.
```

**Deploy.** Bundle with next item or per-item.

---

### §4.P2b · Header nav: surface `/citation-brief`  · **OPTIONAL · founder taste call**

**Why.** Currently footer-only. Promoting to primary nav between Labs and
Pricing in `src/data/nav.ts` lifts top-of-funnel surface for the citation-brief
topic cluster. Trade-off: nav crowding (already 6 items).

**Pre-read.** `src/data/nav.ts`

**Files to edit (if approved).** `src/data/nav.ts` — one-line addition.

**Acceptance criteria.**

- [ ] (If approved) "Briefs" link visible in primary nav on desktop and mobile.
- [ ] (If approved) Footer Resources entry remains (don't double-remove).

**Deploy.** Bundle with the next deploy.

**Founder gate.** ☐ Approve / ☐ Decline / ☐ Decide after Brief #002 ships.

---

## §5 · Deploy procedure (per-item or batched)

```bash
# 5.1 — Verify clean state, all changes committed
git status --short
# Expect: empty

# 5.2 — Verify reps still pass
npm run lint
npm run typecheck

# 5.3 — Full build + deploy + IndexNow
npm run deploy:cf
# This runs: gen:lastmod → next build → opennextjs build → wrangler deploy → indexnow ping

# 5.4 — Capture version ID from output (e.g. "Current Version ID: <uuid>")

# 5.5 — Post-deploy verification (mandatory, NOT optional)
# Citation Brief #001 reachable
curl -s -A 'Mozilla/5.0' -o /dev/null -w '%{http_code}\n' \
  https://wielegroup.com/citation-brief/how-agencies-get-cited-in-ai-answers
# Homepage carries new H1
curl -s -A 'Mozilla/5.0' https://wielegroup.com/ \
  | grep -oE '<title>[^<]+</title>'
# IndexNow log shows 200
grep "indexnow.*200" /tmp/wiele-deploy.log 2>/dev/null || \
  echo "Run deploy:cf via osascript and check stdout"

# 5.6 — Per-task verification commands from §4 (matching the task you shipped)
```

**Deploy gate.** If lint OR typecheck fails, ABORT. Fix locally; do not push a known-broken build.

---

## §6 · Rollback procedure (if deploy breaks production)

```bash
# 6.1 — Identify previous Worker version
wrangler deployments list 2>&1 | head -10

# 6.2 — Rollback to previous version
wrangler rollback <previous-version-id>

# 6.3 — Verify rollback live
curl -s -A 'Mozilla/5.0' -o /dev/null -w '%{http_code}\n' https://wielegroup.com/

# 6.4 — Revert offending commit locally + push
git revert <commit-sha>
git push origin main

# 6.5 — Notify Cowork: rollback ID, failing commit, what surface broke.
```

**Worktrees policy:** as of 2026-05-14, ALL Claude Code worktrees in
`/Users/jonathanlandman/Documents/Claude Code/.claude/worktrees/` were deleted.
Going forward, work in canonical wielegroup.com checkout ONLY. If a worktree
is genuinely needed for an isolated experiment, name it `experiment/<purpose>`
and clean it up within 24h.

---

## §7 · Reporting back to Cowork

After each task or batch, write a status line that includes ALL of:

```
✓ §<task-id> · <subject>
  Files: <created N · edited M · deleted K>
  Build: <pass / fail>
  Deploy: <version-id> | <not-deployed-this-cycle>
  Live verification: <pass / fail / pending — what was checked>
  Open: <anything still in flight or blocked>
```

Example:
```
✓ §4.P0b · MDX refactor of /citation-brief
  Files: created 3 · edited 2 · deleted 1
  Build: pass (43 static pages)
  Deploy: b8513737-... → c9624848-...
  Live verification: pass — 4 schemas inline, H1 preserved, sitemap unchanged
  Open: none
```

---

## §8 · Sources Cowork relies on

- Brief #001 — live: https://wielegroup.com/citation-brief/how-agencies-get-cited-in-ai-answers
- Cowork session brief (Cowork-internal memory): `project_session_2026_05_14_ten_zero_cost_lifts_shipped.md`
- Repo handoff (prior, lighter): `docs/handoffs/v3-9-3-cowork-to-claude-code-2026-05-14.md`
- Schema helpers: `src/lib/schema.ts`
- Pricing pattern reference: `src/data/pricing.ts` + `src/components/sections/pricing-section.tsx`
- Phase 7.4 MDX-import fix rationale: header comment in `src/app/labs/[slug]/page.tsx`

---

## §9 · Acknowledgement

Before starting, Claude Code acknowledges in chat:

```
Directive v3.9.3 received. Pre-flight clean (cwd / branch / status / live state).
Founder gates §3 — [received / not received].
Executing §4 in this order: [...]
ETA per item: [...]
On it.
```

Then go quiet and ship. No mid-flight narration.

---

**End of directive.**
