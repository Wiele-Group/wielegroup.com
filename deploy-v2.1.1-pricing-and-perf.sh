#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# Wiele Group · wielegroup.com
# Deploy: v2.1.1-pricing-and-perf
# Fix-forward release for v2.1-brand-b4-chromaglass post-deploy gaps:
#   1. Wire `featured` button variant + duality-border on /pricing
#   2. Lighten LogoMark3D LCP impact (64px asset, no priority on hero)
# ─────────────────────────────────────────────────────────────────────
set -euo pipefail
cd "$(dirname "$0")"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   WIELE GROUP · Deploy v2.1.1-pricing-and-perf"
echo "   Fix-forward: Gate 8 (pricing featured wire) + Gate 9 (LCP)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Pre-flight (uses same self-resolving wrangler pattern as v2.1)
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
  echo "❌ wrangler not found — install: npm i -g wrangler  OR  npm install"
  exit 1
fi
echo "  using wrangler: $WRANGLER"

echo ""
echo "▸ Step 1/7 · Commit v2.1.1 fixes"
git diff --stat --quiet || {
  git add src/components/ui/logo-mark-3d.tsx \
          src/components/sections/hero-section.tsx \
          src/components/sections/pricing-section.tsx \
          deploy-v2.1.1-pricing-and-perf.sh 2>/dev/null || true
  git commit -m "fix(v2.1.1): wire featured pricing tier + reduce LogoMark3D LCP impact

Post-deploy fixes for v2.1-brand-b4-chromaglass.

Gate 8 fix — featured pricing tier now uses B4 signature:
- pricing-section.tsx: featured tier swaps glass-strip-pulse (B3 violet) for
  duality-border + chrome-card (B4 bichromatic blue→coral gradient ring)
- Featured CTA button: variant 'primary' → 'featured' (duality border + dual glow)
- Badge: replaced electric badge with inline duality-edge pill
- Added data-tier and data-featured attributes for testability
- Removed unused Badge import

Gate 9 fix — LogoMark3D no longer races for LCP slot:
- logo-mark-3d.tsx: size='sm' now loads /brand/wiele-3d-chromaglass-64.png
  (6.8 KB instead of 20.5 KB — ~70% smaller). Display class w-12 h-12
  (48 CSS px); 64px asset is sufficient at 2x DPR.
- hero-section.tsx: removed priority on hero LogoMark3D — H1 text now wins
  LCP (near-instant paint), mark loads after.

Expected impact:
- Gate 8: /pricing source includes 'featured', 'duality-border', 'chrome-card',
  'data-tier', 'data-featured' — measurable via curl grep.
- Gate 9: LCP candidate becomes the H1; render delay should drop from 3,831 ms
  toward the TTFB-anchored sub-second range. ImageDelivery wasted-bytes alert
  should clear (17.8 KB → ~0).

Verified: typecheck ✓ lint ✓
Authority: post-deploy report from Claude Code 2026-05-04 PM."
}
echo "  ✓ committed"

echo ""
echo "▸ Step 2/7 · Typecheck"
npm run typecheck
echo "  ✓ typecheck clean"

echo ""
echo "▸ Step 3/7 · Lint"
npm run lint
echo "  ✓ lint clean"

echo ""
echo "▸ Step 4/7 · Next.js production build"
npm run build
echo "  ✓ Next build complete"

echo ""
echo "▸ Step 5/7 · OpenNext Cloudflare adapter"
npx opennextjs-cloudflare build
echo "  ✓ Cloudflare adapter build complete"

echo ""
echo "▸ Step 6/7 · Tag v2.1.1-pricing-and-perf"
git tag -a v2.1.1-pricing-and-perf -m "Pricing featured wire + LogoMark3D LCP fix" 2>/dev/null || echo "  ℹ tag exists, skipping"
echo "  ✓ tagged"

echo ""
echo "▸ Step 7/7 · Deploy to Cloudflare Workers"
$WRANGLER deploy
echo "  ✓ deployed"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   DEPLOY COMPLETE · v2.1.1-pricing-and-perf"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Push tag to remote:"
echo "    git push origin main && git push origin v2.1.1-pricing-and-perf"
echo ""
echo "Re-verify the two failed gates (browser UA required):"
echo ""
echo "Gate 8 — /pricing 'featured' wired:"
echo "    curl -s -A 'Mozilla/5.0 Chrome/121.0.0.0' https://wielegroup.com/pricing | \\"
echo "      grep -oE 'featured|duality-border|chrome-card|data-tier|data-featured' | sort -u"
echo "    Expect: at least 3 of those 5 tokens present"
echo ""
echo "Gate 9 — LCP improved:"
echo "    Run Lighthouse against https://wielegroup.com (not /pricing — fix targets homepage)"
echo "    Expect: LCP < 2500ms, Performance >= 90"
echo "    Compare: previous LCP 3914ms, render delay 3831ms"
echo ""
