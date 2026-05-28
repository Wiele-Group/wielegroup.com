# Phase 5 Pricing Readiness Dossier

**Prepared:** 2026-05-28  
**Project:** wielegroup.com  
**Phase:** Visual Realignment Phase 5 — Pricing / Investment Architecture  
**Scope:** Read-only inspection. No files edited. No branch created.

---

## Status

**READY**

Source of truth confirmed. All pricing files located and read. No blockers to Phase 5 planning. Founder approval required before implementation begins.

---

## Current Source of Truth

| Field | Value |
|---|---|
| Branch | `main` |
| HEAD commit | `135fd73` — feat(visual): Phase 4 authority command architecture |
| Worker | `88cc17f7-d480-4c20-818a-71e34887fe23` (from prior session brief) |
| Pricing route | `/pricing` |
| Git status | Clean — one auto-generated file modified (`src/lib/static-route-lastmod.generated.json`), not pricing-related |

**Pricing files:**

| File | Role |
|---|---|
| `src/data/pricing.ts` | 6-tier ladder data (prices, CTAs, outcomes, AI defense copy) |
| `src/data/citation-score.ts` | 3 Citation Score™ subscription tier data |
| `src/app/pricing/page.tsx` | `/pricing` route — hero, defense vectors, FAQ, schema, page structure |
| `src/components/sections/pricing-section.tsx` | 6-tier ladder renderer (AnchorTierCard + StandardTierCard) |
| `src/components/sections/recurring-ai-visibility-tiers.tsx` | Citation Score™ subscription section renderer |

---

## Likely Editable Files

| File | Reason | Risk |
|---|---|---|
| `src/app/pricing/page.tsx` | Hero copy, defense vector copy, FAQ items, page section ordering | Medium — page structure touches schema wiring; do not alter `JsonLd` calls, schema imports, or metadata export |
| `src/components/sections/pricing-section.tsx` | Card layout, buyer copy, badge logic, CTA hierarchy, guarantee surfacing | Medium — shared with homepage via `showHeading` prop; any layout change renders on both `/pricing` and `/` |
| `src/components/sections/recurring-ai-visibility-tiers.tsx` | Citation Score section copy, layout, tier-connection narrative | Low — self-contained; only renders on `/pricing` |
| `src/data/pricing.ts` | `positioning`, `differentiator`, `outcomes` strings; buyer-type labels (new field if approved) | Low for copy fields. **High** for `price`, `cadence`, `paymentLinkUrl`, `stripePriceId` — do not touch |
| `src/data/citation-score.ts` | `inclusions` copy, `schemaDescription` | Low for copy. **High** for `priceGbp`, `ctaHref`, Stripe IDs — do not touch |

---

## Inspect-Only Files

| File | Reason |
|---|---|
| `src/components/ui/button.tsx` | `buttonStyles()` / variants (`primary`, `ghost`, `featured`, `secondary`, `link`) — do not add or rename variants |
| `src/components/ui/badge.tsx` | Badge variants used in pricing cards |
| `src/components/ui/accordion.tsx` | FAQ accordion — do not modify |
| `src/components/ui/tracking-link.tsx` | `TrackingLink` component — wraps Link with `track()` fire-and-forget |
| `src/components/motion/fade-in.tsx` | `FadeIn` used in page hero and recurring tiers |
| `src/components/motion/reveal.tsx` | `Reveal` stagger used on tier grids |
| `src/components/sections/cta-section.tsx` | Bottom CTA — uses `TrackingLink` with `eventName`; do not touch |
| `src/lib/utils.ts` | `cn()` utility |
| `src/lib/track.ts` | Analytics track function called by TrackingLink |

---

## Locked Files

| File | Reason |
|---|---|
| `wrangler.toml` | Cloudflare Worker config — locked |
| `package.json` / `package-lock.json` | No new packages — locked |
| `src/lib/tokens.ts` | B4 design tokens — locked |
| `src/lib/metadata.ts` | `buildMetadata()` — locked |
| `src/lib/schema.ts` | `productSchema`, `faqSchema`, `serviceTierSchema`, `breadcrumbSchema` — locked |
| `src/app/pricing/page.tsx` → `metadata` export | `buildMetadata()` call — locked inside editable file |
| `src/app/pricing/page.tsx` → all `JsonLd` blocks | Schema wiring — locked inside editable file |
| `src/app/contact/page.tsx` | Form / API — locked |
| `src/app/api/` | All API routes — locked |
| `src/app/robots.ts` | Locked |
| `src/app/sitemap.ts` | Hand-maintained `STATIC_ROUTES` — locked (critical Phase 3.3 lesson) |
| `src/data/pricing.ts` → `price`, `cadence`, `paymentLinkUrl`, `stripePriceId` | Prices and Stripe IDs — locked unless founder explicitly approves |
| `src/data/citation-score.ts` → `priceGbp`, `ctaHref`, Stripe IDs | Same — locked unless approved |

---

## Current Pricing Structure — As Coded

### Section 1: Citation Score™ Subscription Tiers (renders above main ladder)

| Tier | Price | Cadence | CTA Label | CTA Href | Featured |
|---|---:|---|---|---|---|
| Citation Score™ Starter | €2,000 | /mo | Book Strategy Call | `/contact?tier=starter` | No |
| Citation Score™ Pro | €4,000 | /mo | Book Strategy Call | `/contact?tier=pro` | **Yes** ("Most chosen") |
| Citation Score™ Authority | €6,000 | /mo | Book Strategy Call | `/contact?tier=authority` | No |

**Minimum term:** 3 months. **Direct Checkout:** deferred (CTA routes to principal session).  
**Tracking:** None on primary CTA. No `data-plausible` attributes on this section.

---

### Section 2: Main 6-Tier Ladder

**Layout:** Sovereign anchor (full-width, chrome-bordered, top) → 5 standard cards (1-col mobile → 2-col md → 5-col lg)

| Tier | Price | Cadence | Billing | CTA Label | CTA Href | Featured | Anchor | AI Defense Level |
|---|---:|---|---|---|---|---|---|---|
| **Sovereign** | €45,000 | /mo | priceFrom=true → "From €45,000 / mo" | Book Sovereign Discovery Call | `/contact?tier=sovereign` | — | **Yes** (top row chrome) | real-time |
| Signal Audit | €2,500 | one-off | "€2,500" | Start AI Visibility Audit | `/audit` | No | — | baseline |
| Launch | €1,950 | /month | "€1,950 / mo" | Book Strategy Call | `/contact?tier=launch` | No | — | baseline |
| Growth System | €4,500 | /month | "€4,500 / mo" | Book Strategy Call | `/contact?tier=growth-system` | **Yes** ("Most chosen") | — | monitored |
| Authority Engine | €8,500 | /month | "€8,500 / mo" | Book Strategy Call | `/contact?tier=authority-engine` | No | — | active |
| Wiele OS | €15,000 | /month | "€15,000 / mo" | Book Strategy Call | `/contact?tier=wiele-os` | No | — | embedded |

**Secondary CTA ("Or pay now"):** Hidden on all tiers — `paymentLinkUrl: ""` across all 6 tiers (v3.9.6 intentional; Stripe links deactivated pending 5 case studies).  
**Tracking:** `data-plausible-event-name="Pay Now Click"` / `data-plausible-event-tier` present in code on secondary CTA — currently invisible but must be preserved when `paymentLinkUrl` is re-activated.  
**Primary CTA tracking:** None — primary CTAs use plain `<Link>`, not `<TrackingLink>`.

**Pricing footer note (rendered):**
> "All prices in EUR, exclude VAT where applicable. Wiele bills monthly. 30-day notice. No long-term lock-in. Begin with a Signal Audit or a Strategy Call. Onboarding scope agreed before payment is taken."

---

### Section 3: FAQ (10 items, Accordion)

| ID | Question |
|---|---|
| ai-defense-included | Do all Wiele tiers really include AI Visibility Defense? |
| wiele-os-vs-sovereign | What's the difference between Wiele OS and Sovereign? |
| ai-defense-built-in | Why is AI Visibility Defense built in instead of an add-on? |
| audit-required | Do I need to do the Signal Audit before a Growth System engagement? |
| minimum-commitment | What's the minimum commitment? |
| switch-tiers | Can I move between tiers? |
| ad-spend | Is ad spend included in the pricing? |
| custom-scope | What if I need a custom scope? |
| guarantee | Do you guarantee specific outcomes? |
| vat | Are prices inclusive of VAT? |

**Guarantee note:** Authority Engine outcome-based guarantee referenced only in FAQ item `guarantee`. Not surfaced on the tier card itself.

---

### Page Structure (top to bottom, /pricing)

1. **Hero** — h1 + badge + two CTAs (primary: `/audit`, ghost: `/contact`)
2. **AI Visibility Defense section** — 3 defense vector cards (h2 + 3-col grid)
3. **RecurringAiVisibilityTiers** (`#recurring-ai-visibility`) — Citation Score™ 3-tier grid
4. **PricingSection** (`showHeading={false}`) — Sovereign anchor + 5-tier grid
5. **FAQ** — 10-item accordion
6. **CTASection** — "Find out if AI recommends you" (uses `<TrackingLink>`)

---

## Current Pricing Analysis — Weaknesses

### Buyer Guidance
- No "where to start" copy anywhere on the page
- No buyer-type labels on any tier
- No decision logic ("if you are X → start here")
- Buyer must self-map across 9 tiers (3 Citation Score + 6 ladder) with no connecting narrative explaining how the two tracks relate

### CTA Hierarchy
- 4 of 5 main ladder tiers use identical label: "Book Strategy Call" — no differentiation by urgency, commitment, or tier fit
- Signal Audit gets unique CTA ("Start AI Visibility Audit") — correct, but no visual prominence advantage
- All non-featured standard tier CTAs use `ghost` variant — creates flat visual hierarchy
- Only Growth System (featured) uses `featured` button variant on the main ladder

### Guarantee / Risk Reversal
- Authority Engine outcome-based guarantee buried in FAQ item #9
- No guarantee badge or callout on the Authority Engine card itself
- No money-back language anywhere on the page
- Minimum commitment (90-day initial) disclosed only in FAQ #5

### Comparison Clarity
- No side-by-side comparison table
- "Most chosen" pill appears on both Growth System (main ladder) and Citation Score™ Pro — dilutes the claim and creates ambiguity about which is actually most chosen overall
- Feature differentiation between tiers requires reading each card sequentially

### Mobile Layout
- 5-tier grid: 1-col at mobile → cards stack vertically → long scroll
- No horizontal scroll / snap option at small breakpoints
- 5 full-height cards stacking vertically = high scroll depth before reaching FAQ
- Citation Score (3 cards) stacks to 1-col separately above

### Two-Track Architecture Confusion
- Page presents Citation Score™ subscription (€2–6k/mo) ABOVE the main ladder (€1,950–45,000/mo)
- No copy explaining whether Citation Score is a standalone product, a complement to the ladder, or an entry point to the ladder
- Buyer could read 9 total tiers without understanding which track to enter

### Generic SaaS Appearance Risk
- "Most chosen" pill is a SaaS pricing convention — correct for the context, but premium buyers at €8,500+/mo may respond better to authority-framed language
- Tier names are strong (Signal Audit, Authority Engine, Sovereign) but cards lack buyer-identity copy that makes each feel written for a specific person

---

## Strategic Pricing Architecture Recommendation

Phase 5 should transform /pricing from a product catalogue into a **buyer pathway**. The goal: a prospect lands, identifies themselves in 10 seconds, and knows exactly which tier to click.

### Recommended Buyer Pathway Map

| Tier | Buyer Type | Commercial Purpose | Decision Logic | CTA Priority | Confidence Copy Needed |
|---|---|---|---|---|---|
| **Signal Audit** (€2,500 one-off) | Any — new prospect, unknown AI visibility baseline | Entry diagnostic — productized first engagement, credited against month 1 if continuing | "Start here if you don't know your current AI citation position" | **Highest** — universal entry; should be the page's most visible starting point | "Credited against month one of any retainer" — already in FAQ but should surface on card |
| **Citation Score™ Starter** (€2,000/mo) | Monitoring-first buyer — wants measurement before commitment | Subscription monitoring entry — proof before project engagement | "Start here if you want to track before you build" | High | 3-month minimum / can upgrade |
| **Launch** (€1,950/mo) | Early-stage brand building AI visibility baseline | Foundation — cheapest recurring retainer | "Start here if you're ready to commit and build baseline defense" | Medium | 14-day reverse-trial — currently listed as `differentiator` but not surfaced prominently |
| **Citation Score™ Pro** (€4,000/mo) | Growing brand, wants citation share evidence for board/stakeholders | Monitoring + authority compounding via briefs | "Step up from Starter when you need weekly runs + co-published briefs" | Medium | |
| **Growth System** (€4,500/mo) | Scaling B2B — actively investing in inbound | Core growth engine — main commercial tier | "Start here if you want defended visibility on buyer-intent queries" | High (featured) | Competitor tracking across 4 engines |
| **Citation Score™ Authority** (€6,000/mo) | Serious authority-builders, content-heavy brands | Maximum monitoring + monthly brief velocity | "Step up when you need monthly co-published briefs" | Medium | |
| **Authority Engine** (€8,500/mo) | Market contenders — wanting measurable citation share growth | Authority compounding with outcome guarantee | "Apply when citation share growth is a board-level objective" | High | **Guarantee should surface ON card** — not just in FAQ |
| **Wiele OS** (€15,000/mo) | Multi-channel enterprise — all five growth levers | Full-stack embedded team | "For companies who need Wiele across SEO, GEO, Brand, Web, and Advertising simultaneously" | High | |
| **Sovereign** (from €45,000/mo) | Category leaders — brand must be the answer AI surfaces | Founder-led bespoke — non-negotiable authority | "By application — for brands engineered to be the default answer" | Anchor (distinctive) | "By application" framing correct and strong |

### Narrative Gaps to Close (copy additions, no price/route changes)

1. **Two-track connector:** Add a short section or label explaining that Citation Score™ is the measurement layer and the main ladder is the execution layer — they can run together.
2. **Signal Audit as universal entry:** Promote Signal Audit as the recommended starting point for all new engagements — currently it reads as one of six equal options.
3. **Authority Engine guarantee badge:** Surface the outcome-based guarantee on the tier card, not only in FAQ.
4. **Launch reverse-trial:** The "14-day Pro reverse-trial" is the strongest differentiator for the Launch tier — currently shown only as an italic monospace `differentiator` line; should have more visual weight.
5. **Buyer-type label:** Add a short "Best for:" or "Designed for:" line to each card to help buyers self-select without reading all five outcomes.

---

## Risk Register

| Risk | Severity | Prevention Rule | Validation Method |
|---|---|---|---|
| Changing prices accidentally | **Critical** | `price` and `priceGbp` fields are locked data-layer constants. Only copy fields (`positioning`, `differentiator`, `outcomes`, `inclusions`) are editable. Pre-flight: diff `pricing.ts` and `citation-score.ts` before any commit — prices must be byte-identical to current values. | `git diff src/data/pricing.ts src/data/citation-score.ts` — zero numeric field changes |
| Breaking `data-plausible` tracking props | **Critical** | `paymentLinkUrl` secondary CTA tracking attributes (`data-plausible-event-name`, `data-plausible-event-tier`) must be preserved exactly. Do not touch the `<a>` element rendering the secondary CTA. | Grep for `data-plausible-event-name` — must remain present in source |
| Homepage regression (PricingSection shared) | **High** | `PricingSection` renders on both `/pricing` (via page.tsx) and `/` (homepage). Any layout or card change must be tested at both routes. | Smoke-check `/` at 375/768/1440 in addition to `/pricing` |
| CTA href changes losing tier query params | **High** | `/contact?tier=X` params are used by contact form to pre-fill tier context. If CTAs are edited, `?tier=` param must be preserved. Do not change `href` values in `pricing.ts` or `citation-score.ts` without explicit founder approval. | Manual: click each CTA, verify `?tier=X` lands in contact form |
| Schema breakage | **High** | `JsonLd` blocks in `pricing/page.tsx` are driven directly from `pricing.ts` tier IDs and prices via `tierSchemaPrice()`. If tier IDs or prices change, schema changes. IDs must remain stable. | Validate structured data post-build at `schema.org/` validator |
| "Most chosen" pill on two sections | **Medium** | Both Growth System and Citation Score™ Pro carry "Most chosen" pill. If copy is updated for one, consistency across both must be confirmed. Consider differentiating the label ("Most chosen" vs "Recommended"). | Visual review of both sections side by side |
| Mobile card stack overload | **Medium** | 5 standard tier cards stack to single column on mobile. If card height increases (new buyer copy, guarantee badge, comparison row), mobile scroll depth increases further. Test at 375px after any card height change. | Viewport test at 375/390/414 — no card exceeds comfortable height; no horizontal overflow |
| Guarantee language over-promising | **Medium** | Authority Engine guarantee copy ("outcome-based AI citation guarantee") is strong and accurate per FAQ item. If surfaced on card, copy must match FAQ exactly — do not strengthen beyond "measurable AI citation share growth quarter-over-quarter." | Cross-check card guarantee copy vs FAQ item `guarantee` — must be consistent |
| Fake/vague guarantee language | **Medium** | Do not add guarantee language to tiers below Authority Engine. Signal Audit and Launch do not carry outcome guarantees. | Review any new guarantee-adjacent copy against the tier's `aiDefense.level` and FAQ item |
| Two-track architecture confusion (9 total tiers) | **Medium** | Narrative connector between Citation Score™ and main ladder must be added before Phase 5 ships. Without it, adding more copy to each section increases confusion. | User-test (internal): can a cold reader identify their tier in under 30 seconds? |
| Generic SaaS pricing look | **Low** | Avoid adding standard SaaS conventions (feature tick-comparison tables, free/pro/enterprise headers) without premium-specific framing. Wiele's pricing is investment architecture, not feature gating. | Design review: premium buyer (€8,500+/mo) would they feel addressed? |
| Sitemap not auto-generated | **Low** (well-documented) | `/pricing` is in the hand-maintained `STATIC_ROUTES` array in `sitemap.ts`. No new routes created by Phase 5 — no sitemap change needed. But if a new anchor section is added with its own route, sitemap must be manually updated. Phase 5 adds NO new routes. | Confirm no new `app/` route directories created |
| Token/metadata/package change creep | **Low** | Phase 5 is styling and copy only. If any implementation requires a new CSS utility not in the current token set, stop and escalate. Do not add packages. | `git diff package.json` — must be clean; `git diff src/lib/tokens.ts` — must be clean |

---

## Phase 5 Implementation Boundary

### In scope
- `/pricing` page copy — hero paragraph, defense vector copy, FAQ answers (copy edits only)
- `pricing-section.tsx` — card structure enhancements:
  - Buyer-type label per tier ("Designed for:")
  - Guarantee badge/callout on Authority Engine card
  - Visual weight increase for Launch reverse-trial differentiator
  - CTA visual hierarchy improvement (founder approval required for label changes)
- `recurring-ai-visibility-tiers.tsx` — two-track connector copy
- `pricing.ts` — copy fields only: `positioning`, `differentiator`, `outcomes` (prices and CTAs preserved unless founder explicitly approves changes)
- `citation-score.ts` — copy fields only: `inclusions` (prices and Stripe IDs preserved)

### Explicitly out of scope
- No new route
- No metadata / schema changes
- No forms / API changes
- No token changes
- No new packages
- No price changes (without founder approval)
- No CTA href changes (without founder approval)
- No `paymentLinkUrl` changes (without founder approval)
- No Stripe product changes
- No wrangler.toml changes

---

## Validation Gates (Phase 5 exit criteria)

- [ ] `npm run typecheck` — zero errors
- [ ] `npm run lint` — zero errors
- [ ] `npm run build:cf` — clean build
- [ ] `/pricing` at 375px — no horizontal overflow, all prices visible, all CTAs tappable
- [ ] `/pricing` at 390px — same
- [ ] `/pricing` at 414px — same
- [ ] `/pricing` at 768px — grid transitions correct
- [ ] `/pricing` at 1280px — 5-col grid renders without overflow
- [ ] `/pricing` at 1440px — anchor card + 5-tier grid correct
- [ ] `/pricing` at 1920px — no stretching, max-width respected
- [ ] Homepage `/` at 375/768/1440 — `PricingSection` unchanged (shared component)
- [ ] All 6 main tier prices visible and identical to coded values
- [ ] All 3 Citation Score™ prices visible and identical to coded values
- [ ] All tier names preserved exactly: Signal Audit · Launch · Growth System · Authority Engine · Wiele OS · Sovereign
- [ ] All CTA hrefs preserved (unless founder explicitly approved changes)
- [ ] `data-plausible-event-name` / `data-plausible-event-tier` attributes present in source
- [ ] Zero changes to: metadata export, JsonLd blocks, schema imports, package.json, wrangler.toml, tokens.ts, sitemap.ts

---

## Recommendation

**PROCEED to Phase 5 with founder approval on the following gates before implementation begins:**

**Gate 1 — Scope confirmation:**  
Confirm Phase 5 is: buyer pathway copy additions + card structure enhancements only. No price changes.

**Gate 2 — CTA label decision:**  
Current: 4 of 5 main tiers say "Book Strategy Call." Phase 5 recommendation is to differentiate. Founder approves or overrides proposed labels before any edit.

**Gate 3 — Guarantee surfacing:**  
Confirm Authority Engine outcome guarantee should be elevated to the card level (not FAQ-only).

**Gate 4 — Two-track narrative:**  
Confirm a Citation Score™ / main ladder connector section is desired before Phase 5 ships.

Once gates confirmed, Phase 5 can be executed in a single Claude Code directive session.
