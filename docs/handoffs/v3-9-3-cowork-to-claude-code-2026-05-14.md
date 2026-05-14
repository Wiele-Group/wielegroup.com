# v3.9.3 — Cowork → Claude Code handoff (2026-05-14)

**Cowork shipped today (Worker version `b8513737`):** see §1.
**Claude Code picks up:** see §2 (P0 / P1 / P2 with explicit acceptance criteria).
**Founder gates:** see §3 — Citation Score™ commercial shape decisions BLOCK P0a.

---

## §1 · What Cowork shipped today (verified live)

All 9 of 10 mandated lifts shipped to **production** (canonical repo:
`/Users/jonathanlandman/Documents/Claude/Projects/Wiele Group Operations/wielegroup.com/`).
Item #10 (LinkedIn long-form post) is drafted; founder publishes manually.

| # | Lift | Status | Files touched |
|---|------|--------|---------------|
| 1 | USP crystallization (Reeves three-gate) | LIVE | `src/lib/metadata.ts` (tagline + description rewrite) |
| 2 | CBBE Resonance | LIVE (via #4) | n/a — extractable schema = pre-revenue Resonance |
| 3 | Citation Brief #001 + `/citation-brief` index | LIVE | `src/app/citation-brief/page.tsx`, `src/app/citation-brief/how-agencies-get-cited-in-ai-answers/page.tsx` |
| 4 | FAQPage (8 Qs) + HowTo (3 steps) on homepage | LIVE | `src/app/page.tsx` |
| 5 | Internal link mesh | LIVE | `src/data/nav.ts` (footer Resources), `src/data/homepage.ts` (labsPreviewArticles re-order) |
| 6 | Title + meta description rewrite | LIVE | `src/lib/metadata.ts` (homepage), `src/app/about/page.tsx` |
| 7 | IndexNow priority resubmit | RAN | `scripts/index-now-ping.mjs` — 35 URLs, 200 OK |
| 8 | Person.sameAs entity-disambiguation BUG FIX | LIVE | `src/app/page.tsx`, `src/app/about/page.tsx`, `src/app/labs/[slug]/page.tsx`, Citation Brief #001 |
| 9 | /L99 warm asset (LinkedIn 600w + Email 2 opener) | DRAFTED | `/Outreach/100-prospects/follow-up/` |
| 10 | LinkedIn long-form 1,221-word post | DRAFTED (founder publishes) | `/LinkedIn/founder-longform-2026-05-14-citation-not-clicks.md` |

**Sitemap additions:**
- `/citation-brief` (priority 0.85, weekly)
- `/citation-brief/how-agencies-get-cited-in-ai-answers` (priority 0.85, monthly)

**New owned framework introduced publicly:** Five-Stage Citation Hierarchy
(Entity Resolution → Source Authority → Structured Extractability → Freshness → Recommendation History).

**Brand mantra fully surfaced:** "Citation, not clicks." now in `<title>`, H1,
meta description, OG, Twitter card, and Citation Brief body.

**DOM verification (Chrome MCP, post-deploy):**
- 6 JSON-LD schemas on homepage: Organization, WebSite, BreadcrumbList, Person, FAQPage (8 mainEntity), HowTo (3 steps).
- `schema-person-founder-home.sameAs = ["https://www.linkedin.com/in/jonathan-b-landman"]` only — disambiguation fix confirmed.

---

## §2 · Claude Code task list

Prioritized by revenue lift. P0a BLOCKS on founder commercial decisions (§3).
All other items can proceed in parallel.

### P0a · Productize Citation Score™ on /pricing  · **BLOCKED on founder**

**Why:** Brief #001 references "Wiele Citation Score™ subscription" and links to `/pricing`.
`/pricing` doesn't yet carry the SKU. The brief's claim must match shipped state
(Shipped-vs-Drafted Precision Law).

**Files (when unblocked):**
- `src/data/pricing.ts` — add three tiers (see §3 for proposed shape; founder confirms before code)
- `src/components/sections/pricing-section.tsx` OR new section component for recurring AI visibility tier — match existing card pattern
- `src/app/pricing/page.tsx` — render the new section above existing one-off SKUs
- Stripe — create 3 products + 3 prices in GBP via Stripe MCP

**Schema requirement:** Each tier uses `serviceTierSchema()` from `src/lib/schema.ts`
with `recurring: true`, `billingDuration: "P1M"`, `priceCurrency: "GBP"`,
`areaServed: { "@type": "Place", name: "Worldwide" }`.

**Acceptance criteria:**
- Three tiers render on `/pricing` with correct copy, price, and CTA → `/audit` (or new `/contact?tier=...`).
- `serviceTierSchema` JSON-LD live in HTML response for each tier (curl-verified).
- Stripe payment links live for each tier in GBP.
- Brief #001 link `/pricing` lands on the section.
- `npm run deploy:cf` clean → IndexNow ping fires.

### P0b · MDX refactor of `/citation-brief` route  · **GO**

**Why:** Brief #001 is a single ~500-line TSX file. Doesn't scale. Mirror the
labs/[slug] architecture so Brief #002+ ship as MDX drops.

**Pattern reference:** `src/app/labs/[slug]/page.tsx` + `src/content/labs/*.mdx` + `src/lib/labs-static.ts`.
The Phase 7.4 fix (explicit static imports per slug) MUST be applied — dynamic
MDX imports break under OpenNext/Workers (notes in labs/[slug] head comment).

**Files to create:**
- `src/app/citation-brief/[slug]/page.tsx` — dynamic route with `generateStaticParams`, `dynamic = "force-static"`, `revalidate = false`. Schema: Article + Person + Breadcrumb + FAQPage (from MDX frontmatter `faq` array).
- `src/content/citation-briefs/how-agencies-get-cited-in-ai-answers.mdx` — port content from current `src/app/citation-brief/how-agencies-get-cited-in-ai-answers/page.tsx`.
- `src/lib/citation-briefs-static.ts` — manifest with explicit `import` per slug. Mirrors `labs-static.ts`.
- Components: `ArticleMeta`, `ArticleToc`, `ArticleCta` already exist for labs — either reuse or create `BriefMeta`/`BriefToc`/`BriefCta`. Prefer reuse if shape matches.

**Files to delete:**
- `src/app/citation-brief/how-agencies-get-cited-in-ai-answers/page.tsx` (replaced by `[slug]` route).

**Index page (`src/app/citation-brief/page.tsx`) updates:**
- Replace inline `briefs` array with `getVisibleBriefManifest()` import.
- Pattern-match `src/app/labs/page.tsx` exactly.

**Acceptance criteria:**
- `/citation-brief/how-agencies-get-cited-in-ai-answers` continues to render identically (curl-diff before/after).
- All 4 JSON-LD schemas still inline in HTML (curl + grep).
- `next build` adds the route as `● /citation-brief/[slug]` SSG (mirrors `/labs/[slug]`).
- Adding Brief #002 requires only: drop `.mdx` → add manifest entry → add static import. Zero new TSX.

### P1a · OG image for Brief #001  · **GO**

**Filename per Image Naming SEO Law:** `wiele-citation-brief-001-five-stage-citation-hierarchy.png`
**Location:** `public/og/wiele-citation-brief-001-five-stage-citation-hierarchy.png`
**Dimensions:** 1200×630
**Aesthetic:** Obsidian background (#141c2e) + electric-blue accent (#3b82f6) + 3D Chromaglass W mark. Match `public/og-image.png` brand DNA.
**Alt text (80–125 chars):** "Wiele Citation Brief #001 — Five-Stage Citation Hierarchy for AI answer engines. Citation, not clicks."

**Files:**
- `public/og/wiele-citation-brief-001-five-stage-citation-hierarchy.png` — new asset
- Brief #001 page (whichever route owns it after P0b) — pass `ogImage` to `buildMetadata`

**Acceptance:** `<meta property="og:image">` and `<meta name="twitter:image">` point to the new asset. LinkedIn / X scrapers render the image when the URL is pasted.

### P1b · Schema parity curl check  · **GO**

**Why:** Verify SSR/SSG outputs all 4 schemas inline in HTML (not client-rendered).
OpenNext on Cloudflare can occasionally miss JSON-LD blocks if React server
components misbehave.

**Command:**
```bash
curl -s -A 'Mozilla/5.0' https://wielegroup.com/citation-brief/how-agencies-get-cited-in-ai-answers \
  | grep -oE 'application/ld\+json[^<]*<\/script>' | wc -l
# Expect: 4
```

Also verify Google Rich Results Test passes for Article, FAQPage:
https://search.google.com/test/rich-results

**Acceptance:** 4 JSON-LD blocks in HTML. No "Page not eligible" verdicts from Rich Results Test for Article or FAQPage.

### P1c · Citation Brief #002 draft  · **GO (after P0b lands)**

**Working title:** "How to win Stage 3 — the schema and content pattern AI engines reward"
**Slug:** `stage-3-structured-extractability`
**Length target:** 2,500–3,500 words
**Required sections:** 60-second answer · why Stage 3 matters · the schema bundle (FAQPage, HowTo, Article, Person, Breadcrumb) · the extractability content pattern · what to NOT do · methodology + sources · FAQ (8 Qs).
**Internal links:** back to Brief #001 (Five-Stage Citation Hierarchy framework), to `/systems/ai-visibility`, to `/audit`.
**Frontmatter pattern:** mirror `src/content/labs/*.mdx` frontmatter (title, summary, eyebrow, author, lastUpdated, faq array).

**Acceptance:** ships at `/citation-brief/stage-3-structured-extractability`, sitemap updated, IndexNow ping fires on deploy.

### P2a · `/platform` page drift audit  · **GO**

**Why:** `/platform` is in sitemap at priority 0.9, but Cowork session didn't read
the file. Verify copy is consistent with new "Citation, not clicks." positioning;
fix if drifted.

**Files:** `src/app/platform/page.tsx` (read-only first).

**Acceptance:** either zero-change (file passes audit) or PR with copy aligned to new positioning + USP language.

### P2b · Header nav: surface `/citation-brief`  · **OPTIONAL, founder taste call**

Currently footer-only. Promoting to primary nav (between Labs and Pricing in `src/data/nav.ts`) lifts top-of-funnel surface but crowds the nav.

**Files (if approved):** `src/data/nav.ts` — one-line addition.

---

## §3 · Founder gates blocking P0a

P0a (Citation Score™ on /pricing) requires founder sign-off on the commercial
shape. Cowork proposed the following; founder ticks each ✓/✗ before code:

| # | Decision | Cowork proposal | Founder ✓/✗ |
|---|----------|-----------------|-------------|
| 1 | Tier 1 name | Citation Score™ Starter | ☐ |
| 2 | Tier 1 price | £2,000/mo GBP | ☐ |
| 3 | Tier 1 inclusions | 1 brand · 3 competitors · 5 engines · monthly run · quarterly Brief · self-serve dashboard | ☐ |
| 4 | Tier 2 name | Citation Score™ Pro | ☐ |
| 5 | Tier 2 price | £4,000/mo GBP | ☐ |
| 6 | Tier 2 inclusions | 1 brand · 6 competitors · 8 engines · weekly run · 1 published Brief/quarter · principal QBR call | ☐ |
| 7 | Tier 3 name | Citation Score™ Authority | ☐ |
| 8 | Tier 3 price | £6,000/mo GBP | ☐ |
| 9 | Tier 3 inclusions | 1 brand · 10 competitors · all 10 engines · weekly run · 1 Brief/month · monthly principal session · founder voice writing assist | ☐ |
| 10 | Billing cadence | Monthly only (no annual discount — pre-revenue cash cycle) | ☐ |
| 11 | Minimum term | 3 months (gives recommendation-history loop time to seed) | ☐ |
| 12 | Cancellation | 30 days notice | ☐ |
| 13 | Stripe product slugs | `citation-score-starter`, `citation-score-pro`, `citation-score-authority` | ☐ |
| 14 | Page CTA | `/contact?tier=<slug>` (route exists? if not, fall back to `/contact`) | ☐ |
| 15 | Pricing section position | Above existing one-off SKUs, headed "Recurring AI Visibility" | ☐ |

**Founder writes back inline edits → Claude Code wires.**

---

## §4 · Suggested Claude Code drive order

1. **P0b** (MDX refactor) — unblocks Brief #002 architecture, no commercial gate.
2. **P1b** (schema parity curl check) — fast verification, can run in parallel.
3. **P1a** (OG image) — design + wiring, no commercial gate.
4. **P0a** (Citation Score™ pricing) — once founder signs §3, wire pricing + Stripe.
5. **P1c** (Brief #002) — after P0b lands so MDX architecture is canonical.
6. **P2a** (`/platform` drift audit).
7. **P2b** (nav promotion) — founder taste call.

Each item: verify build → deploy:cf → IndexNow ping → curl-verify live → report.

---

## §5 · Hard constraints (per binding laws)

- **Single-source-of-truth law:** ship only to canonical `/Users/jonathanlandman/Documents/Claude/Projects/Wiele Group Operations/wielegroup.com/`. NEVER the experiments worktree.
- **Live-or-Nothing Law:** only curl-verified live state counts. Run `curl -s -A 'Mozilla/5.0' <url>` after every deploy.
- **Pre-Revenue Free-Tier Constraint:** no paid SaaS additions without ROI thesis. Stripe products are free; that's fine.
- **Shipped-vs-Drafted Precision:** "shipped" = live on wielegroup.com only. Drafting to filesystem ≠ shipping.
- **Image File Naming + Alt-Text SEO Law:** `wiele-{topic}-{angle}-{context}.{ext}` + 80–125 char alt.
- **Distribution Handoff Law:** every creative output gets the post-generation gate (filename · alt · schema · OG · UTM · sitemap · IndexNow).

---

## §6 · Open loops (longer horizon, not for this drive)

- Crunchbase / MuckRack / Wikidata Q-ID for founder Person.sameAs — founder action.
- Founder publishes the 1,221-word LinkedIn long-form from `/LinkedIn/founder-longform-2026-05-14-citation-not-clicks.md`.
- /L99 Batch-1 send Mon 2026-05-18 09:00 UK (scheduled task already fires).
- Brief #003+ topic candidates: ChatGPT vs Perplexity vs AI Overviews comparison · best AI visibility consultancies for B2B SaaS · the Citation Velocity metric.

---

## §7 · Cowork session memory (for continuity)

Cowork-side memory file lives at the Cowork session sandbox path (app-internal,
not accessible to Claude Code). The content above IS the canonical handoff —
this file lives in the repo and is the source-of-truth for Claude Code's
read-at-start.

Last memory entry mirrored from Cowork:
`project_session_2026_05_14_ten_zero_cost_lifts_shipped.md` — covers identical
shipped state.

---

**End of handoff.** Claude Code: read this file, confirm canonical cwd, then
execute §2 in §4 order. P0a waits on §3.
