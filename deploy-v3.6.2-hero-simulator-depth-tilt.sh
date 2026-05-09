#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# Wiele Group · wielegroup.com
# Deploy: v3.6.2-hero-simulator-depth-tilt
#
# WHAT SHIPS (smallest deploy of the v3.6 cycle)
# ──────────────────────────────────────────────
# Add v3.5.0 depth-tilt to the hero PromptSimulator. The most
# important asset on the home page becomes its most kinetic.
#
# Single file change, +4 / -2 lines:
#
# src/components/sections/hero-section.tsx
#   BEFORE:
#     <FadeIn delay={0.1} className="w-full">
#       <PromptSimulator data={fixture} animate />
#     </FadeIn>
#
#   AFTER:
#     <FadeIn delay={0.1} className="w-full wg-depth-scene">
#       <div className="wg-depth-card">
#         <PromptSimulator data={fixture} animate />
#       </div>
#     </FadeIn>
#
# - FadeIn (motion.div) gets `wg-depth-scene` → applies perspective:
#   1200px + transform-style: preserve-3d (sets up 3D rendering context)
# - New wrapper div gets `wg-depth-card` → DepthRuntime client island
#   (mounted in layout.tsx since v3.5.0) auto-discovers it on mount
#   and attaches mousemove/mouseleave handlers
# - PromptSimulator renders unchanged inside the wrapper — its
#   internal markup is untouched, only the parent transforms tilt
#
# ZERO NEW CSS, ZERO NEW COMPONENT, ZERO NEW RUNTIME
# ──────────────────────────────────────────────────
# All primitives consumed are pre-existing:
#   - .wg-depth-scene    shipped v3.5.0 (globals.css ~line 356)
#   - .wg-depth-card     shipped v3.5.0 (globals.css ~line 361)
#   - DepthRuntime       shipped v3.5.0 (visual/depth-runtime.tsx)
#                        class-driven discovery, no per-component wiring
#
# This is the compounding payoff of v3.5.0's class-driven design:
# adding tilt to a new surface is a 4-line edit, not a refactor.
#
# WHY THIS MATTERS
# ────────────────
# The third-person UI/UX self-critique flagged that the PromptSimulator
# (the proof artifact in the hero, rotating per-minute via ISR=60s)
# had no depth-tilt while v3.5.0 added it to disciplines/pricing/
# division pages. The hero is the highest-stakes surface; its primary
# asset should be the most kinetic, not the least.
#
# After this deploy:
#   - Hover the simulator on desktop → ±4deg rotateX/Y + lift -6px
#   - Mobile (<769px) → flat (transform: none !important per v3.5.0)
#   - prefers-reduced-motion → flat (same fallback)
#
# VERIFICATION MODEL (HTML-only — no new CSS to verify)
# ──────────────────────────────────────────────────────
# Live curl gates check the rendered hero markup contains both
# `wg-depth-scene` AND `wg-depth-card` near the simulator, plus
# regression on existing depth-card surfaces (disciplines, pricing,
# divisions) still rendering.
#
# KNOWN LIMIT: gates confirm the classes are wired into the served
# HTML; they do NOT confirm the tilt actually animates on mousemove.
# Per memory feedback_perceptual_vs_dom_check.md — DOM-state probes
# say nothing about whether the effect is perceivable. Founder must
# test on desktop in a browser to confirm the tilt visibly works.
# This is acceptable: the same applied to v3.5.0's original ship.
#
# v3.6 CYCLE COMPLETION
# ─────────────────────
# v3.6.0  capability ship   (Card variants coral + duality, dormant)
# v3.6.1  expression ship   (hero duality hairline, first visible coral)
# v3.6.2  expression ship   (hero simulator depth-tilt) ← THIS DEPLOY
#
# Cycle complete after this lands. Recommendation per audit:
# - PAUSE for live inspection round before v3.7 (motion system
#   consolidation + Phase 3 alias deadline)
# - v3.8 surface-coverage audit (coral propagation to division pages,
#   typography wrapper consideration)
#
# Authority: founder verbal approval 2026-05-09 ("go v3.6", "full
# spectrum", "1" → roll v3.6.1, "1" → roll v3.6.2).
# ─────────────────────────────────────────────────────────────────────
set -euo pipefail
cd "$(dirname "$0")"

readonly VERSION="v3.6.2-hero-simulator-depth-tilt"
readonly TAG_MESSAGE="v3.6.2: Hero PromptSimulator gains v3.5.0 depth-tilt. The most important asset on the home page becomes its most kinetic. Class-driven discovery — zero new CSS / runtime."

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
  src/components/sections/hero-section.tsx \
  deploy-v3.6.2-hero-simulator-depth-tilt.sh 2>/dev/null || true
git diff --cached --stat --quiet && echo "  ℹ nothing to commit" || {
  git commit -m "feat(v3.6.2): hero PromptSimulator depth-tilt (v3.5.0 consumer)

Authority: founder verbal approval 2026-05-09 ('go v3.6', '1' to roll v3.6.2).
Audit basis: third-person UI/UX self-critique — hero primary asset
(PromptSimulator) lacked depth-tilt while disciplines/pricing/division
pages got it in v3.5.0; hero is highest-stakes surface, should be MOST
kinetic not least.

HERO EDIT (src/components/sections/hero-section.tsx, +4 / -2)
- FadeIn className: 'w-full' → 'w-full wg-depth-scene'
- Wrapper div added: <div className='wg-depth-card'>...</div>
- PromptSimulator renders unchanged inside wrapper

ZERO NEW PRIMITIVES
- .wg-depth-scene    shipped v3.5.0 (globals.css)
- .wg-depth-card     shipped v3.5.0 (globals.css)
- DepthRuntime       shipped v3.5.0, class-driven discovery
                      mounted in layout.tsx, auto-attaches mousemove
                      to any .wg-depth-card on mount

BEHAVIOR
- Desktop ≥769px      mousemove → ±4deg rotateX/Y + lift -6px
                       + scale 1.008 (DepthRuntime values from v3.5.0)
- Mobile <769px       flat (transform: none !important)
- prefers-reduced     flat (same fallback)

THE COMPOUNDING PAYOFF OF v3.5.0
- Adding depth-tilt to a new surface is now a 4-line edit, not a
  refactor. Class-driven discovery means no per-component wiring,
  no runtime modification, no CSS authoring.
- Future surfaces can opt in with the same 2-line pattern.

v3.6 CYCLE COMPLETE
- v3.6.0  capability ship   (dormant Card variants)
- v3.6.1  expression ship 1 (hero duality hairline — first visible coral)
- v3.6.2  expression ship 2 (hero simulator tilt — kinetic primary asset)

VERIFICATION
- HTML class gates: wg-depth-scene + wg-depth-card both in / hero markup
- Regression: existing v3.5.0 depth-card surfaces (disciplines/
  pricing/divisions) still rendering
- Regression: v3.6.0 capability still in CSS bundle
- Regression: v3.6.1 duality-hairline still in / hero markup

KNOWN LIMIT
Live gates confirm class wiring; mousemove tilt animation requires
desktop + cursor and cannot be live-curled. Founder visual check
required for perceptual confirmation. Per memory:
feedback_perceptual_vs_dom_check.md.

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
$WRANGLER deploy 2>&1 | tee /tmp/wrangler-deploy-v3.6.2.log
WORKER_VERSION=$(grep -oE "Current Version ID: [0-9a-f-]+" /tmp/wrangler-deploy-v3.6.2.log | head -1 | awk '{print $4}')
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
echo "   HTML class wiring confirmed via curl; tilt animation"
echo "   requires desktop browser test (per perceptual-check rule)."
sleep 5
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/130.0 Safari/537.36'
TS=$(date +%s)
GATE_FAILS=0

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
echo "  Gate group A · hero simulator depth-tilt wiring"
gate "/ hero has wg-depth-scene wrapper near simulator" \
  "https://wielegroup.com/" "wg-depth-scene"
gate "/ hero has wg-depth-card on simulator wrapper" \
  "https://wielegroup.com/" "wg-depth-card"

echo ""
echo "  Gate group B · v3.6.1 not regressed"
gate "/ duality-hairline still present" \
  "https://wielegroup.com/" "duality-hairline"
gate "/ discipline strip still rendered below hairline" \
  "https://wielegroup.com/" "Brand · Marketing · Web · Advertising"

echo ""
echo "  Gate group C · v3.6.0 capability not regressed"
gate_css_present "glass-strip-coral still in CSS bundle" \
  "glass-strip-coral"
gate_css_present "glass-strip-duality still in CSS bundle" \
  "glass-strip-duality"

echo ""
echo "  Gate group D · v3.5.0 depth surfaces not regressed"
gate "/pricing has wg-depth-card surfaces (v3.5.0)" \
  "https://wielegroup.com/pricing" "wg-depth-card"
gate "/marketing-agency has wg-depth-card surfaces (v3.5.0)" \
  "https://wielegroup.com/marketing-agency" "wg-depth-card"

echo ""
echo "  Gate group E · pre-existing surfaces still rendering"
gate "/ chrome-card surfaces present" \
  "https://wielegroup.com/" "chrome-card"
gate "/ hero constellation backdrop present (v3.0.10)" \
  "https://wielegroup.com/" "hero-backdrop|constellation"
gate "/pricing duality-border on featured tier present" \
  "https://wielegroup.com/pricing" "duality-border"

echo ""
if [ $GATE_FAILS -eq 0 ]; then
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "   ✓ ALL GATES GREEN · ${VERSION} live"
  echo "   Worker: ${WORKER_VERSION:-?}"
  echo ""
  echo "   v3.6 CYCLE COMPLETE"
  echo "   - v3.6.0 capability ship  (dormant Card variants)"
  echo "   - v3.6.1 expression ship  (hero duality hairline)"
  echo "   - v3.6.2 expression ship  (hero simulator depth-tilt) ← LIVE"
  echo ""
  echo "   ⚠ FOUNDER VISUAL CHECK REQUIRED"
  echo "   Visit https://wielegroup.com/ on desktop, hover the"
  echo "   PromptSimulator on the right side of the hero — should"
  echo "   tilt up to ±4deg following cursor + lift -6px on hover."
  echo "   Mobile + reduced-motion stays flat (expected)."
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
else
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "   ❌ ${GATE_FAILS} GATE FAIL(S) · ${VERSION} live but degraded"
  echo "   Worker: ${WORKER_VERSION:-?}"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  exit 1
fi
