# AMENDMENT A · Directive v3.9.3 — §3 Citation Score™ APPROVED

**Date:** 2026-05-14
**Authority chain:** Cowork (Wiele Enterprise Orchestrator) → Founder approval received → relayed to Claude Code
**Status:** P0a UNBLOCKED. Ship.
**Parent directive:** `docs/directives/v3-9-3-claude-code-directive-2026-05-14.md`

This amendment supersedes §3 of the parent directive. Every other section of the
parent directive stands unchanged (§0 pre-flight, §2 hard constraints, §4 tasks
P0b/P1a/P1b/P1c/P2a/P2b, §5 deploy, §6 rollback, §7 reporting).

---

## §3' — APPROVED FINAL SHAPE

### TIER 1 — Citation Score™ Starter

- **Name:** `Citation Score™ Starter`
- **Price:** £2,000 / month GBP, recurring monthly
- **Inclusions (final copy — use verbatim):**
  - 1 brand tracked
  - Up to 3 named competitors
  - 5 answer engines: ChatGPT · Perplexity · Google AI Overviews · Gemini · Copilot
  - Monthly engine run
  - **Quarterly Citation Brief written for your domain (you publish on your site)**
  - Self-serve Citation Score™ dashboard
- **Stripe product slug:** `citation-score-starter`
- **CTA destination:** `/contact?tier=starter` (fallback `/contact` if query param routing not yet implemented)

### TIER 2 — Citation Score™ Pro

- **Name:** `Citation Score™ Pro`
- **Price:** £4,000 / month GBP, recurring monthly
- **Inclusions (final copy — use verbatim):**
  - 1 brand tracked
  - Up to 6 named competitors
  - 8 answer engines: all Starter engines + Claude · Grok · You.com
  - Weekly engine run
  - **Quarterly Citation Brief co-published on wielegroup.com (your brand inherits Wiele's domain authority)**
  - Quarterly principal QBR call
- **Stripe product slug:** `citation-score-pro`
- **CTA destination:** `/contact?tier=pro`

### TIER 3 — Citation Score™ Authority

- **Name:** `Citation Score™ Authority`
- **Price:** £6,000 / month GBP, recurring monthly
- **Inclusions (final copy — use verbatim):**
  - 1 brand tracked
  - Up to 10 named competitors
  - All 10 answer engines: all Pro engines + Brave Search · DeepSeek
  - Weekly engine run
  - **Monthly Citation Brief co-published on wielegroup.com (12 per year — deepest authority compounding)**
  - Monthly principal session
  - Founder voice writing assist
- **Stripe product slug:** `citation-score-authority`
- **CTA destination:** `/contact?tier=authority`

### GLOBAL

- **Billing cadence:** monthly only, no annual discount published. (Founder may offer 10% off annual prepay in private sales conversations; do not surface that lever on the page.)
- **Minimum term:** 3 months (Stage-5 Recommendation-History compounding loop requires the seeding window).
- **Cancellation:** 30 days notice.
- **Section heading on /pricing:** `Recurring AI Visibility`.
- **Section position:** ABOVE the existing one-off SKU cards.
- **Currency:** GBP across the board.
- **Schema:** every tier wires `serviceTierSchema()` with `recurring: true`, `billingDuration: "P1M"`, `priceCurrency: "GBP"`, `areaServed: { "@type": "Place", name: "Worldwide" }`.

---

## Implementation reminders (cross-reference parent §4.P0a)

- Data location: create `src/data/citation-score.ts` exporting the typed array of three tiers. Match the shape laid out in §4.P0a of the parent directive.
- Component pattern: extend `src/components/sections/pricing-section.tsx` (preferred) or add a sibling `<RecurringAiVisibilityTiers />` block. Use the existing card pattern: `<Card>` → `<Badge>` (tier name) → `<h3>` → price → inclusions `<ul>` → CTA `<Link>`.
- Schema: three `<JsonLd schema={serviceTierSchema(...)} id="schema-citation-score-{slug}">` blocks on `/pricing`.
- Stripe: three products + three recurring GBP prices via the Stripe MCP (`mcp__d5142a7e-..._create_product`, `_create_price`). Do NOT create payment links or hosted checkouts in this cycle — keep CTA on `/contact?tier=...` (principal-mediated close).
- Anchor link target: add `id="recurring-ai-visibility"` to the section heading so external citations (Brief #001's `/pricing` link) can deep-link.

## Acceptance criteria (unchanged from parent §4.P0a)

- Three tier cards render on /pricing, above existing SKUs.
- Three `<script type="application/ld+json">` blocks with `@type: "Service"` and `offers.priceSpecification.billingDuration: "P1M"` present in live HTML.
- Three Stripe products created in GBP, recurring.
- Brief #001 `/pricing` link still 200s (no regression).
- `npm run lint && npm run typecheck && npm run build:cf` clean.
- Per §5 deploy procedure: `git commit` BEFORE `npm run deploy:cf` (Commit-Before-Deploy Law).
- Per §7 report-back: status line with version ID, schema count, Stripe product IDs.

## Verification commands (use these)

```bash
# Live schema count via opening tags (Schema-Count Grep Trap fix)
curl -s -A 'Mozilla/5.0' https://wielegroup.com/pricing \
  | grep -oE '<script[^>]*type="application/ld\+json"' | wc -l
# Expect: >= 3 new + whatever existed prior

# GBP recurring presence
curl -s -A 'Mozilla/5.0' https://wielegroup.com/pricing \
  | grep -oE '"priceCurrency":"GBP"' | wc -l
# Expect: >= 3

# Citation Score™ visible copy
curl -s -A 'Mozilla/5.0' https://wielegroup.com/pricing \
  | grep -oE 'Citation Score' | head -5
# Expect: visible in heading + each card

# Anchor reachable
curl -s -A 'Mozilla/5.0' -o /dev/null -w '%{http_code}\n' \
  'https://wielegroup.com/pricing#recurring-ai-visibility'
# Expect: 200

# IndexNow ran on deploy:cf (35+ URLs accepted)
# (Read deploy log for: "[indexnow] ✓ submitted (200)")
```

## Commit message (use verbatim)

```
feat(pricing): productize Citation Score™ subscription — 3 tiers GBP recurring

Wiele Citation Score™ as the recurring AI Visibility SKU on /pricing,
closing the brief→pricing buyer-journey gap before /L99 Batch 1 hits
inboxes Monday 2026-05-18.

Tiers (founder-approved 2026-05-14, AMENDMENT A to directive v3.9.3):
- Starter   £2,000/mo · 1 brand · 3 competitors · 5 engines · monthly run
            · quarterly Brief written for your domain
- Pro       £4,000/mo · 1 brand · 6 competitors · 8 engines · weekly run
            · quarterly Brief co-published on wielegroup.com · QBR
- Authority £6,000/mo · 1 brand · 10 competitors · all 10 engines · weekly run
            · monthly Brief co-published on wielegroup.com · monthly principal
            · founder voice writing assist

Co-publish on wielegroup.com is the Pro/Authority value-leap — clients
inherit Wiele's domain authority on each brief.

Billing monthly only (no annual discount published; founder offers in
private sales). 3-month minimum (Stage-5 substrate needs the seeding
window). 30 days cancellation notice. CTA principal-mediated via
/contact?tier=... — direct checkout deferred until 5 named-client
case studies close.

Stripe products + prices created in GBP via MCP.
serviceTierSchema() with recurring: true, billingDuration P1M.
Anchor #recurring-ai-visibility for Brief #001 deep link.

Closes brief #001 /pricing reference. Closes /L99 buyer-journey gap.
```

## Tag

After commit + clean deploy verified live:

```bash
git tag -a v3.9.4-citation-score-productized \
  -m "Citation Score™ subscription live on /pricing (3 tiers GBP)"
git push origin main
git push origin v3.9.4-citation-score-productized
```

---

## Authority chain log (per Autonomous Judgment Authority feedback)

- 2026-05-14 — Cowork proposed the 15-line matrix in chat.
- 2026-05-14 — Founder elevated Cowork to autonomous-judgment authority.
- 2026-05-14 — Cowork ran Best-Action-or-Burn 4-gate → PASS on all four. Approved §3 on Cowork's authority. Inclusions-language refinement applied.
- 2026-05-14 — Founder confirmed: "approved." (Veto window closed clean.)
- 2026-05-14 — Cowork wrote this AMENDMENT A. Relayed to Claude Code.
- Next — Claude Code runs §4.P0a per parent directive + this amendment, ships, reports per §7.

**End of amendment.** Claude Code: pre-flight §0 still applies (clean tree, branch=main, dependencies, live state). Execute §4.P0a now.
