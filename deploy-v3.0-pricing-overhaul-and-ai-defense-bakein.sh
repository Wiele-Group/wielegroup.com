#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# Wiele Group · wielegroup.com
# Deploy: v3.0-pricing-overhaul-and-ai-defense-bakein
#
# WHAT SHIPS (one sweep, one deploy, three coordinated changes)
# ──────────────────────────────────────────────────────────────
# 1. Pricing v3 — 6-tier ladder.
#    Sovereign Concierge tier added (£45,000+/mo, prod_USnSzdCpc0dLhr).
#    Launch repriced £1,500 → £1,950, Growth £4,000 → £4,500,
#    Authority £8,000 → £8,500. Wiele OS + Signal Audit unchanged.
#
# 2. AI Visibility Defense baked into every paid tier.
#    Three vectors at every tier, scaled by tier depth:
#      · Prompt-injection surface monitoring
#      · AI crawler access posture
#      · Competitor displacement risk model
#    Levels: baseline (Launch) → monitored (Growth) → active (Authority)
#            → embedded (Wiele OS) → real-time (Sovereign).
#
# 3. Defender-register content rewrite.
#    Homepage hero ribbon · Disciplines defense badge ·
#    /pricing rewrite (new H1, defense section, 6 tier cards, 3 new FAQs) ·
#    4 division pages (subhead defense register, sub-tier price realignment,
#    outcome-based copy, AI Defense badge per tier) ·
#    /audit page (3 new defense feature blocks, "what we won't do" callout,
#    binding disclaimer footer) ·
#    JSON-LD (Product schemas refresh, FAQPage extended,
#    Service.hasOfferCatalog on /audit) ·
#    Resend email templates (BUDGET_LABELS Sovereign + repriced) ·
#    Onboarding (Launch + Sovereign budget tiers; Zod enum lockstep).
#
# WHY THIS MATTERS (REVENUE)
# ──────────────────────────
# Sovereign anchor lifts perceived value across all tiers (price-anchoring).
# Built-in defense converts security spend into a positive-sum tier feature
# rather than an upsell. Defender register is the differentiation moat
# against generic "AI search" agencies. Outcome-based division copy
# (CPL ceiling / ROAS floor / citation guarantee / branded query lift /
# conversion floor) shifts buyer psychology from input-pricing to
# outcome-pricing — Anthropic 2026 SaaS pricing best practice.
#
# Authority: DIRECTIVE_2026-05-06_v3-pricing-overhaul-and-ai-defense-bakein.md
# Top authority: ../WIELE_CODE_OPERATING_DIRECTIVE.md
# ─────────────────────────────────────────────────────────────────────
set -euo pipefail
cd "$(dirname "$0")"

readonly VERSION="v3.0-pricing-overhaul-and-ai-defense-bakein"
readonly TAG_MESSAGE="v3.0: 6-tier pricing ladder + Sovereign anchor + AI Visibility Defense baked into every tier + defender-register rewrite across homepage / pricing / 4 division pages / audit / schemas / emails."

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   WIELE GROUP · Deploy ${VERSION}"
echo "   ${TAG_MESSAGE}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ── Tooling — 3-tier wrangler resolution per WIELE_CODE_OPERATING_DIRECTIVE §5.1
command -v node >/dev/null || { echo "❌ node missing"; exit 1; }
command -v npm  >/dev/null || { echo "❌ npm missing"; exit 1; }
command -v git  >/dev/null || { echo "❌ git missing"; exit 1; }
if command -v wrangler >/dev/null 2>&1; then
  WRANGLER="wrangler"
elif [ -x "./node_modules/.bin/wrangler" ]; then
  WRANGLER="./node_modules/.bin/wrangler"
elif command -v npx >/dev/null 2>&1; then
  WRANGLER="npx wrangler"
else
  echo "❌ wrangler not found"; exit 1
fi
echo "  using wrangler: $WRANGLER"

echo ""
echo "▸ Pre-flight · working tree status (per §5.6 reconcile)"
git status --short
echo ""
git diff --stat | tail -25
echo ""

echo "▸ Step 1/11 · Stage and commit v3.0 changes"
git add \
  src/data/pricing.ts \
  src/data/divisions.ts \
  src/data/onboarding.ts \
  src/lib/validations.ts \
  src/lib/resend.ts \
  src/lib/schema.ts \
  src/components/sections/pricing-section.tsx \
  src/components/sections/division-page.tsx \
  src/components/sections/hero-section.tsx \
  src/components/sections/disciplines-section.tsx \
  src/app/pricing/page.tsx \
  src/app/audit/page.tsx \
  CLAUDE.md \
  scripts/lighthouse-baseline.sh \
  deploy-v3.0-pricing-overhaul-and-ai-defense-bakein.sh 2>/dev/null || true
git diff --cached --stat --quiet && echo "  ℹ nothing to commit" || {
  git commit -m "feat(v3.0): pricing overhaul + AI Visibility Defense baked into every tier

Authority: DIRECTIVE_2026-05-06_v3-pricing-overhaul-and-ai-defense-bakein.md
Top authority: ../WIELE_CODE_OPERATING_DIRECTIVE.md

PRICING (Stripe live + Worker secrets set)
- Sovereign Concierge tier added (from £45,000 / mo,
  prod_USnSzdCpc0dLhr · price_1TTrs0GuLDs0qzh2y4POM9Sq)
- Launch repriced £1,500 → £1,950 (price_1TTrrVGuLDs0qzh2MZGJWbT1)
- Growth System repriced £4,000 → £4,500 (price_1TTrrZGuLDs0qzh28535esBR)
- Authority Engine repriced £8,000 → £8,500 (price_1TTrrcGuLDs0qzh2NOjlxs9x)
- Wiele OS unchanged (£15,000+ / mo · price_1TT1u0GuLDs0qzh2VQ5jAyZQ)
- Signal Audit unchanged (£2,500 one-off · price_1TT1tkGuLDs0qzh2S85rJ8Fp)
- Old Stripe prices LEFT ACTIVE for any legacy active subs

AI VISIBILITY DEFENSE (built into every paid tier)
Three vectors at every tier, scaled by depth (baseline → monitored →
active → embedded → real-time):
- Prompt-injection surface monitoring
- AI crawler access posture
- Competitor displacement risk model

Type: PricingTier extended with aiDefense { level, features },
differentiator, anchor, priceFrom. price now numeric;
formatTierPrice / tierPriceLabel / tierSchemaPrice helpers added.

CONTENT REWRITES (defender register)
- Homepage: hero defense ribbon below H1 · DisciplinesSection
  'AI Visibility Defense across all 6' badge above 6-card grid
- /pricing: new H1 'Premium AI search dominance — with defense
  built-in' · 'Why every Wiele engagement defends your AI
  visibility' section above tier grid · 6-tier card layout
  (Sovereign anchor row + 5 standard) · 3 new FAQs
  (defense-included / Wiele OS vs Sovereign / why built-in)
- 4 division pages (Marketing / Advertising / Brand / Web): hero
  subhead defense register · sub-tier price realignment (tier 2
  → £4,500 / mo, tier 3 → £8,500 / mo where recurring) · outcome
  copy on featured tier (CPL ceiling / ROAS floor / citation
  guarantee / branded query lift / conversion rate floor) ·
  AI Defense badge per tier
- /audit: 3 new feature blocks (Prompt-Injection Surface Audit /
  AI Crawler Access Posture / Competitor Displacement Risk Model)
  · 'What we won't do' asymmetric callout · binding disclaimer
  footer ('this is a brand visibility audit, not pen-test')
- Onboarding tier labels lockstep (BUDGET_TIER_OPTIONS / Zod enum
  / Resend BUDGET_LABELS) — Launch + Sovereign added

SCHEMAS
- /pricing Product schemas use new numeric prices (6 products)
- /pricing FAQPage extended with 3 defense-related FAQs
- /audit Service.hasOfferCatalog populated with 8 audit components
  (5 visibility signals + 3 defense vectors)
- ServiceSchema type extended to support hasOfferCatalog
- serviceSchema() helper extended to accept offerCatalog input

OPS
- Cloudflare Worker secrets set (4 new STRIPE_PRICE_ID_* values)
- IndexNow URL list verified (already covers all touched routes)
- Sitemap lastModified auto-current via 'now' generator
- All paid Stripe Payment Links wired in pricingTiers

Tag: ${VERSION}
"
}
echo "  ✓ committed (or nothing to commit)"

echo ""
echo "▸ Step 2/11 · Typecheck (npm run typecheck)"
npm run typecheck
echo "  ✓ typecheck clean"

echo ""
echo "▸ Step 3/11 · Lint (npm run lint)"
npm run lint
echo "  ✓ lint clean"

echo ""
echo "▸ Step 4/11 · Next.js production build"
npm run build
echo "  ✓ Next build complete"

echo ""
echo "▸ Step 5/11 · OpenNext Cloudflare adapter build"
npx opennextjs-cloudflare build
echo "  ✓ Cloudflare adapter build complete"

echo ""
echo "▸ Step 6/11 · Tag ${VERSION}"
git tag -a "$VERSION" -m "$TAG_MESSAGE" 2>/dev/null || echo "  ℹ tag exists, skipping"
echo "  ✓ tagged"

echo ""
echo "▸ Step 7/11 · Deploy to Cloudflare Workers"
$WRANGLER deploy 2>&1 | tee /tmp/wrangler-deploy-v3.log
WORKER_VERSION=$(grep -oE "Current Version ID: [0-9a-f-]+" /tmp/wrangler-deploy-v3.log | head -1 | awk '{print $4}')
echo "  ✓ deployed (Worker version: ${WORKER_VERSION:-?})"

echo ""
echo "▸ Step 8/11 · IndexNow notification (Bing + Yandex)"
sleep 10  # CF edge propagation before key validation
./scripts/notify-indexnow.sh
echo "  ✓ IndexNow ping complete"

echo ""
echo "▸ Step 9/11 · Push commit + tag to origin"
git push origin main
git push origin "$VERSION"
echo "  ✓ pushed"

echo ""
echo "▸ Step 10/11 · Create GitHub Release object (per §5.14)"
gh release create "$VERSION" --notes "$TAG_MESSAGE" --verify-tag 2>/dev/null \
  || echo "  ℹ release exists, skipping"
echo "  ✓ release created (or already existed)"

echo ""
echo "▸ Step 11/11 · LIVE VERIFICATION (Live-or-Nothing Law · §6 + §5.8)"
echo "   Browser UA required (Bot Fight Mode 403s bare curl)."
sleep 5
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/130.0 Safari/537.36'
TS=$(date +%s)
GATE_FAILS=0

gate() {
  local label="$1" url="$2" pattern="$3"
  local body
  body=$(curl -sSL -A "$UA" "${url}?_v=${TS}")
  if echo "$body" | grep -qiE "$pattern"; then
    echo "    ✓ ${label}"
  else
    echo "    ❌ ${label}  (pattern: ${pattern})"
    GATE_FAILS=$((GATE_FAILS + 1))
  fi
}

echo ""
echo "  Gate group A · /pricing"
gate "Sovereign tier name renders" \
  "https://wielegroup.com/pricing" "Sovereign"
gate "AI Visibility Defense badge renders" \
  "https://wielegroup.com/pricing" "AI Visibility Defense"
gate "From £45,000 anchor renders" \
  "https://wielegroup.com/pricing" "45,000"
gate "Launch new price £1,950 renders" \
  "https://wielegroup.com/pricing" "1,950"
gate "Growth System new price £4,500 renders" \
  "https://wielegroup.com/pricing" "4,500"
gate "Authority Engine new price £8,500 renders" \
  "https://wielegroup.com/pricing" "8,500"
gate "Stripe Payment Link wired" \
  "https://wielegroup.com/pricing" "buy\.stripe\.com"

echo ""
echo "  Gate group B · /audit (AI Visibility Audit)"
gate "Prompt-injection feature block renders" \
  "https://wielegroup.com/audit" "prompt-injection"
gate "AI Crawler Access feature block renders" \
  "https://wielegroup.com/audit" "crawler access|crawler Access"
gate "Displacement risk feature block renders" \
  "https://wielegroup.com/audit" "displacement"
gate "Asymmetric won't-do callout renders" \
  "https://wielegroup.com/audit" "won.?t do|black-hat"
gate "Binding disclaimer footer renders" \
  "https://wielegroup.com/audit" "not an information-security"

echo ""
echo "  Gate group C · 4 division pages — defense thread"
for slug in marketing-agency advertising-agency brand-management-agency web-design-agency; do
  gate "/${slug} carries Defense badge or thread" \
    "https://wielegroup.com/${slug}" "AI Visibility Defense"
done

echo ""
echo "  Gate group D · homepage defense ribbon"
gate "Homepage hero defense ribbon renders" \
  "https://wielegroup.com/" "AI Visibility Defense built into every engagement"
gate "DisciplinesSection AI Visibility Defense badge renders" \
  "https://wielegroup.com/" "AI Visibility Defense across all 6"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $GATE_FAILS -eq 0 ]; then
  echo "   ✓ DEPLOY + LIVE VERIFIED · ${VERSION} · ALL gates green"
else
  echo "   ❌ ${GATE_FAILS} GATE(S) FAILED · investigate before declaring done"
  exit 1
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Worker version ID:  ${WORKER_VERSION:-(see /tmp/wrangler-deploy-v3.log)}"
echo "Tag:                ${VERSION}"
echo "Pushed to origin:   yes"
echo "GitHub Release:     created (or already existed)"
echo "IndexNow:           submitted"
echo "Live URL set:       /pricing /audit /marketing-agency"
echo "                    /advertising-agency /brand-management-agency"
echo "                    /web-design-agency /"
echo ""
