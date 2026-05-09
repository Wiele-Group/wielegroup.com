#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# Wiele Group · wielegroup.com
# Deploy: v3.6.0-card-coral-duality-variants
#
# WHAT SHIPS (capability addition, dormant on first ship)
# ──────────────────────────────────────────────────────
# Two new Card variants on top of the existing glass-strip system:
#   - coral    → glass-strip-coral (Ember Coral symmetric sweep,
#                B4 warm accent surface treatment)
#   - duality  → glass-strip-duality (B4 SIGNATURE asymmetric sweep:
#                blue → chrome → coral; the full bichromatic identity
#                in motion — every other variant is a symmetric tint,
#                this one expresses both halves of the duality)
#
# CSS primitives (src/app/globals.css, +69 lines)
# - .glass-strip-coral::before    conic-gradient with coral-core (#F08566)
#                                  symmetric around chrome highlight
# - .glass-strip-coral:hover      box-shadow with coral-glow
# - .glass-strip-duality::before  conic-gradient blue (95deg) →
#                                  chrome-hi (110deg) → coral (125deg)
# - .glass-strip-duality:hover    dual-tone box-shadow (blue + coral
#                                  ambient at 35px each)
# - prefers-reduced-motion        static linear-gradient fallbacks for
#                                  both new variants (animation: none)
#
# Component (src/components/ui/card.tsx, +21 / -6)
# - variantStyles registers `coral` and `duality` keys
# - CardProps `variant` type auto-extends via `keyof typeof variantStyles`
# - Header comment updated: "Brand v2 B3" → "Brand v2 B4 Chromaglass"
# - Both variants documented with reserved-use guidance
#
# WHY THIS MATTERS
# ────────────────
# The B4 Chromaglass token system has shipped Ember Coral as a warm
# accent since brand v2 B4 (founder selection 2026-05-04). But until
# now, no Card surface has exposed the warm half of the bichromatic
# identity. The site reads as monochrome chrome+electric in spite of
# the tokens. This deploy closes that gap at the primitive layer:
# any consumer can now opt into coral or duality with no further work.
#
# Visible expression of these variants ships in v3.6.1+ (hero duality
# divider, proof/services coral accents). v3.6.0 is the foundation —
# capability ships dormant, surface adoption follows.
#
# DORMANT-SHIP VERIFICATION MODEL
# ────────────────────────────────
# No card on any live route uses `coral` or `duality` yet, so the new
# class strings will NOT appear in any rendered HTML. The verification
# gates below check:
#   1. New CSS classes are present in the served CSS bundle
#      (= Tailwind 4 / OpenNext compiled them, not tree-shaken)
#   2. Existing surfaces still render (regression: chrome-card, hero
#      constellation, depth-card, duality-border on featured pricing)
#
# Visible-pixel verification of coral/duality lives in v3.6.1 and .2.
#
# WHAT DID NOT SHIP (intentional scope)
# - Hero coral moment            → v3.6.1 (founder picked option C:
#                                   hairline duality divider above the
#                                   discipline strip)
# - Depth-tilt PromptSimulator   → v3.6.2
# - Phase 3 alias deadline       → v3.7
# - Typography wrapper           → v3.8 (optional)
#
# Authority: founder verbal approval 2026-05-09 ("go v3.6", "full spectrum").
# Audit basis: third-person UI/UX self-critique 2026-05-09 (Claude Code
# session, B4 Chromaglass surface-coverage gap finding).
# ─────────────────────────────────────────────────────────────────────
set -euo pipefail
cd "$(dirname "$0")"

readonly VERSION="v3.6.0-card-coral-duality-variants"
readonly TAG_MESSAGE="v3.6.0: Card primitive gains coral + duality variants (B4 Chromaglass surface treatments). Capability ship — dormant on first deploy, visible expression follows in v3.6.1+."

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

echo "▸ Step 1/11 · Stage and commit ${VERSION} changes"
git add \
  src/app/globals.css \
  src/components/ui/card.tsx \
  deploy-v3.6.0-card-coral-duality-variants.sh 2>/dev/null || true
git diff --cached --stat --quiet && echo "  ℹ nothing to commit" || {
  git commit -m "feat(v3.6.0): Card variants coral + duality (B4 Chromaglass)

Authority: founder verbal approval 2026-05-09 ('go v3.6', 'full spectrum').
Audit basis: third-person UI/UX self-critique (B4 Chromaglass surface-
coverage gap finding — warm accent in tokens, invisible on rendered page).

CSS PRIMITIVES (src/app/globals.css, +69 lines)
- .glass-strip-coral::before    conic-gradient symmetric around coral
                                 (rgba(240,133,102,*)) with chrome peak
- .glass-strip-coral:hover      box-shadow with coral-core ambient glow
- .glass-strip-duality::before  conic-gradient asymmetric: blue (95deg)
                                 → chrome-hi (110deg) → coral (125deg);
                                 expresses full B4 bichromatic identity
- .glass-strip-duality:hover    dual-tone box-shadow (blue + coral at
                                 35px each, dimmed to 0.12 alpha)
- prefers-reduced-motion        static linear-gradient fallbacks for
                                 both variants (animation: none)

CARD PRIMITIVE (src/components/ui/card.tsx, +21 / -6)
- variantStyles: + coral, + duality (additive — existing keys preserved)
- Header comment: 'Brand v2 B3' → 'Brand v2 B4 Chromaglass'
- Reserved-use guidance documented for duality variant
- CardProps variant type extends automatically via keyof typeof

DESIGN INTENT
- Symmetric sweeps (default electric, pulse violet, neon cyan, coral) =
  color-tinted strip; asymmetric sweep (duality) = the B4 signature
  (blue → chrome → coral) in motion. Other variants tint the strip;
  duality expresses the bichromatic identity itself.
- Reserved use for duality: hero-grade surfaces, featured pricing,
  brand-mark moments. Not decoration.

DORMANT-SHIP MODEL (no consumer yet)
- No live route invokes coral or duality on first deploy.
- Capability is in the bundle; surface adoption follows in v3.6.1+.
- This is intentional atomic granularity: capability ship → expression
  ship → adoption ship as 3 separate deploys lets us bisect any
  regression to its causal change.

VERIFICATION MODEL (dormant capability)
- New class strings will NOT appear in rendered HTML on first deploy.
- Live gates check: (1) classes compiled into served CSS bundle,
  (2) existing surfaces still render (chrome-card, hero constellation,
  depth-card, duality-border on featured pricing tier).
- Visible-pixel verification deferred to v3.6.1 (hero duality divider)
  and v3.6.2 (depth-tilt PromptSimulator).

WHAT DID NOT SHIP (intentional scope)
- Hero coral moment           → v3.6.1 (option C: hairline duality
                                 divider above discipline strip)
- Depth-tilt PromptSimulator  → v3.6.2
- Phase 3 alias removal       → v3.7 (deadline still TBD)

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
$WRANGLER deploy 2>&1 | tee /tmp/wrangler-deploy-v3.6.0.log
WORKER_VERSION=$(grep -oE "Current Version ID: [0-9a-f-]+" /tmp/wrangler-deploy-v3.6.0.log | head -1 | awk '{print $4}')
echo "  ✓ deployed (Worker version: ${WORKER_VERSION:-?})"

echo ""
echo "▸ Step 8/11 · IndexNow notification (Bing + Yandex)"
sleep 10  # CF edge propagation before key validation
./scripts/notify-indexnow.sh
echo "  ✓ IndexNow ping complete"

echo ""
echo "▸ Step 9/11 · Push commit + tag to origin"
git push origin main
git push origin "refs/tags/$VERSION"
echo "  ✓ pushed"

echo ""
echo "▸ Step 10/11 · Create GitHub Release object (per §5.14)"
gh release create "$VERSION" --notes "$TAG_MESSAGE" --verify-tag 2>/dev/null \
  || echo "  ℹ release exists, skipping"
echo "  ✓ release created (or already existed)"

echo ""
echo "▸ Step 11/11 · LIVE VERIFICATION (Live-or-Nothing Law · §6 + §5.8)"
echo "   Dormant-ship model: gates check served CSS bundle for new"
echo "   variants + regression on existing live surfaces."
sleep 5
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/130.0 Safari/537.36'
TS=$(date +%s)
GATE_FAILS=0

# Standard HTML class-string gate (regression checks)
gate() {
  local label="$1" url="$2" pattern="$3"
  local body
  body=$(curl -sSL -A "$UA" --compressed "${url}?_v=${TS}")
  if echo "$body" | grep -qiE "$pattern"; then
    echo "    ✓ ${label}"
  else
    echo "    ❌ ${label}  (pattern: ${pattern})"
    GATE_FAILS=$((GATE_FAILS + 1))
  fi
}

# CSS-bundle gate — fetches the linked CSS asset and greps for the
# pattern. Required for dormant-ship verification because new classes
# won't appear in HTML until a consumer adopts them.
gate_css_present() {
  local label="$1" pattern="$2"
  local html css_url css_body
  html=$(curl -sSL -A "$UA" --compressed "https://wielegroup.com/?_v=${TS}")
  css_url=$(echo "$html" | grep -oE 'href="[^"]*\.css[^"]*"' | head -1 | sed 's/href="//;s/"$//')
  if [ -z "$css_url" ]; then
    echo "    ❌ ${label}  (no CSS link found in served HTML)"
    GATE_FAILS=$((GATE_FAILS + 1))
    return
  fi
  case "$css_url" in
    http*) ;;
    /*)  css_url="https://wielegroup.com${css_url}" ;;
    *)   css_url="https://wielegroup.com/${css_url}" ;;
  esac
  css_body=$(curl -sSL -A "$UA" --compressed "$css_url")
  if echo "$css_body" | grep -qE "$pattern"; then
    echo "    ✓ ${label}"
  else
    echo "    ❌ ${label}  (pattern: ${pattern} not in CSS at ${css_url})"
    GATE_FAILS=$((GATE_FAILS + 1))
  fi
}

echo ""
echo "  Gate group A · new variants present in served CSS bundle"
gate_css_present "glass-strip-coral CSS class shipped" \
  "glass-strip-coral"
gate_css_present "glass-strip-duality CSS class shipped" \
  "glass-strip-duality"
gate_css_present "duality conic-gradient stops blue→chrome→coral" \
  "59,[[:space:]]*130,[[:space:]]*246.*238,[[:space:]]*242,[[:space:]]*248.*240,[[:space:]]*133,[[:space:]]*102"

echo ""
echo "  Gate group B · regression — existing Card surfaces still render"
gate "/ chrome-card surfaces present" \
  "https://wielegroup.com/" "chrome-card"
gate "/ hero constellation backdrop present (v3.0.10)" \
  "https://wielegroup.com/" "hero-backdrop|constellation"
gate "/ depth-card surfaces present (v3.5.0)" \
  "https://wielegroup.com/" "wg-depth-card"
gate "/pricing duality-border on featured tier present" \
  "https://wielegroup.com/pricing" "duality-border"

echo ""
echo "  Gate group C · regression — existing glass-strip variants still in CSS"
gate_css_present "glass-strip default still present" \
  "\\.glass-strip[^-]"
gate_css_present "glass-strip-pulse still present" \
  "glass-strip-pulse"
gate_css_present "glass-strip-neon still present" \
  "glass-strip-neon"

echo ""
if [ $GATE_FAILS -eq 0 ]; then
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "   ✓ ALL GATES GREEN · ${VERSION} live"
  echo "   Worker: ${WORKER_VERSION:-?}"
  echo "   Capability dormant — visible expression in v3.6.1+"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
else
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "   ❌ ${GATE_FAILS} GATE FAIL(S) · ${VERSION} live but degraded"
  echo "   Worker: ${WORKER_VERSION:-?}"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  exit 1
fi
