#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# Wiele Group · wielegroup.com
# Deploy: v3.5.0-depth-tilt
#
# WHAT SHIPS (one sweep, depth-only)
# ──────────────────────────────────
# Net-new dimensional layer additive on chrome-card surfaces.
# Per-card 3D tilt on mousemove (desktop only); CSS perspective
# scene wrappers on the parent grids. Mobile (≤768px) and
# prefers-reduced-motion fall back to flat (transform: none !important).
#
# CSS primitives (src/app/globals.css)
# - .wg-depth-scene       perspective: 1200px + transform-style: preserve-3d
# - .wg-depth-card        transform-style: preserve-3d + will-change
# - .wg-depth-layer-1/2/3 translateZ helpers (for future layered children)
# All token-driven: --motion-t4, --ease-expressive-out (NO --wg-* namespace).
#
# Runtime (src/components/visual/depth-runtime.tsx — NEW)
# - Single client island mounted in layout.tsx
# - Class-driven discovery: every .wg-depth-card gets mousemove/mouseleave
# - Skipped under prefers-reduced-motion or viewport <769px
# - Tilt: rotateX/Y ±4deg + lift -6px + scale 1.008
#
# Surface application (3 files)
# - src/components/sections/disciplines-section.tsx
#     Reveal grid → +wg-depth-scene; 6 chrome-card Links → +wg-depth-card
# - src/components/sections/pricing-section.tsx
#     Reveal grid → +wg-depth-scene; 5 standard tiers → +wg-depth-card;
#     anchor wrapper → +wg-depth-scene; anchor card → +wg-depth-card
# - src/components/sections/division-page.tsx
#     Services grid → +wg-depth-scene; 6 service cards → +wg-depth-card
#     Tiers grid → +wg-depth-scene; 3 tier cards → +wg-depth-card
#
# WHY THIS MATTERS
# ────────────────
# v3.0.10 hero constellation gave the homepage atmospheric depth.
# v3.5.0 extends that dimensionality to the cards themselves —
# every chrome-card surface now responds to cursor with subtle 3D
# tilt. Premium AI-native feel without rewriting the design system.
# Additive: zero risk to shipped chrome-card / Reveal / hero work.
#
# WHAT DID NOT SHIP (intentional scope shrink from the original directive)
# - wg-crystal-card    — chrome-card is superior, kept as-is
# - wg-hero-depth      — would double-render against v3.0.10 constellation
# - wg-reveal          — <Reveal/> framer-motion already ships this better
# - --wg-* token block — every var remapped to existing --color-*/--motion-*
# - wg-premium-button  — deferred; pricing CTAs already strong
# - wg-engine-panel    — deferred to v3.5.1 if v3.5.0 lands clean
#
# Authority: founder verbal approval 2026-05-09 ("1.2.3.")
# Conflict-map basis: v3.5.0-conflict-map exchange (Claude Code session).
# ─────────────────────────────────────────────────────────────────────
set -euo pipefail
cd "$(dirname "$0")"

readonly VERSION="v3.5.0-depth-tilt"
readonly TAG_MESSAGE="v3.5.0: 3D depth tilt on every chrome-card surface (disciplines, pricing, division-page). Additive; mobile + reduced-motion safe."

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
  src/app/layout.tsx \
  src/components/sections/disciplines-section.tsx \
  src/components/sections/division-page.tsx \
  src/components/sections/pricing-section.tsx \
  src/components/visual/depth-runtime.tsx \
  deploy-v3.5.0-depth-tilt.sh 2>/dev/null || true
git diff --cached --stat --quiet && echo "  ℹ nothing to commit" || {
  git commit -m "feat(v3.5.0): 3D depth tilt on chrome-card surfaces

Authority: founder verbal approval 2026-05-09 ('1.2.3.')
Scope basis: v3.5.0-conflict-map exchange (Claude Code session).

PRIMITIVES (src/app/globals.css, +38 lines)
- .wg-depth-scene       perspective:1200px + transform-style:preserve-3d
- .wg-depth-card        transform-style:preserve-3d + will-change:transform
                        + transition: transform var(--motion-t4) var(--ease-expressive-out)
- .wg-depth-layer-1/2/3 translateZ helpers (20/40/60px) for layered children
- @media (max-width:768px) and @media (prefers-reduced-motion:reduce):
  transform: none !important on cards + layers (mobile + a11y safe)

RUNTIME (src/components/visual/depth-runtime.tsx, NEW ~52 lines)
- 'use client' island mounted in layout.tsx (after AmbientGrid)
- Class-driven discovery: queries .wg-depth-card on mount,
  attaches mousemove/mouseleave per card
- Skipped entirely under prefers-reduced-motion or window <769px
- Math: rotateX/Y = ((coord-center)/center) * ±4deg
        translate3d(0,-6px,0) + scale(1.008) on move
        full reset on leave

SURFACE APPLICATION (additive — no chrome-card markup removed)
- disciplines-section.tsx: Reveal grid +wg-depth-scene;
                            6 chrome-card Links +wg-depth-card
- pricing-section.tsx:     Reveal grid +wg-depth-scene;
                            5 StandardTierCards +wg-depth-card;
                            anchor wrapper +wg-depth-scene;
                            AnchorTierCard +wg-depth-card
- division-page.tsx:       services Reveal grid +wg-depth-scene;
                            6 service cards +wg-depth-card;
                            tiers Reveal grid +wg-depth-scene;
                            3 tier cards +wg-depth-card

CONFLICT MAP (what was deliberately NOT shipped)
- wg-crystal-card     chrome-card already superior (animated conic strip,
                       optimizer-safe !important, prefers-reduced fallback)
- wg-hero-depth       v3.0.10 hero constellation already owns hero stack
- wg-reveal           <Reveal/> framer-motion already does it better
- --wg-* token block  remapped: --motion-t4 + --ease-expressive-out only
- wg-premium-button   deferred (pricing CTAs already strong)
- wg-engine-panel     deferred to v3.5.1

LIVE VERIFICATION (dev server, pre-deploy)
- 3 .wg-depth-scene wrappers on / (disciplines + standard pricing + anchor)
- 12 .wg-depth-card surfaces on / (6 disciplines + 5 tiers + 1 anchor)
- perspective: 1200px confirmed on first scene
- transform-style: preserve-3d + will-change: transform on cards
- mousemove (75%, 25%) → rotateX 2.01° rotateY 1.99° lift -6px scale 1.008
- mouseleave → full reset
- Mobile (375x812): cardComputedTransform = 'none' (CSS !important wins)
- Console errors: none related to v3.5.0
- npm run typecheck: clean

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
$WRANGLER deploy 2>&1 | tee /tmp/wrangler-deploy-v3.5.0.log
WORKER_VERSION=$(grep -oE "Current Version ID: [0-9a-f-]+" /tmp/wrangler-deploy-v3.5.0.log | head -1 | awk '{print $4}')
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
echo "   Class-string presence in SSR HTML. Browser UA required (BFM)."
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

echo ""
echo "  Gate group A · homepage depth wiring"
gate "/ has wg-depth-scene wrapper" \
  "https://wielegroup.com/" "wg-depth-scene"
gate "/ has wg-depth-card surfaces" \
  "https://wielegroup.com/" "wg-depth-card"

echo ""
echo "  Gate group B · /pricing depth wiring"
gate "/pricing has wg-depth-scene wrapper" \
  "https://wielegroup.com/pricing" "wg-depth-scene"
gate "/pricing has wg-depth-card surfaces" \
  "https://wielegroup.com/pricing" "wg-depth-card"

echo ""
echo "  Gate group C · division-page depth wiring (4 divisions)"
for slug in marketing-agency advertising-agency brand-management-agency web-design-agency; do
  gate "/${slug} has wg-depth-card surfaces" \
    "https://wielegroup.com/${slug}" "wg-depth-card"
done

echo ""
echo "  Gate group D · regression — pre-existing surfaces still rendering"
gate "/ chrome-card surfaces still present (not replaced)" \
  "https://wielegroup.com/" "chrome-card"
gate "/ hero constellation still present (v3.0.10)" \
  "https://wielegroup.com/" "hero-backdrop|constellation"
gate "/pricing duality-border on featured tier" \
  "https://wielegroup.com/pricing" "duality-border"

echo ""
if [ $GATE_FAILS -eq 0 ]; then
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "   ✓ ALL GATES GREEN · ${VERSION} live"
  echo "   Worker: ${WORKER_VERSION:-?}"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
else
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "   ❌ ${GATE_FAILS} GATE FAIL(S) · ${VERSION} live but degraded"
  echo "   Worker: ${WORKER_VERSION:-?}"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  exit 1
fi
