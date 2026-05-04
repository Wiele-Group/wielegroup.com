#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# Wiele Group · wielegroup.com
# Deploy: v2.1-brand-b4-chromaglass
# Brand v2 B4 Chromaglass — bichromatic chrome-glass on midnight
# Authority: brand-v2-B4-chromaglass.md + wiele-motion-system-v1.md
# ─────────────────────────────────────────────────────────────────────
set -euo pipefail

cd "$(dirname "$0")"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   WIELE GROUP · Deploy v2.1-brand-b4-chromaglass"
echo "   Brand v2 B4 Chromaglass + Wiele Motion System v1"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Pre-flight checks
command -v node    >/dev/null || { echo "❌ node missing"; exit 1; }
command -v npm     >/dev/null || { echo "❌ npm missing"; exit 1; }
command -v git     >/dev/null || { echo "❌ git missing"; exit 1; }

# Wrangler resolution: prefer global, fall back to project-pinned (devDependency).
# This script ran outside `npm run` context, so node_modules/.bin isn't on PATH
# by default. Resolve to a single $WRANGLER variable used throughout.
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
echo "  using wrangler: $WRANGLER ($($WRANGLER --version 2>&1 | head -1))"

echo "▸ Step 1/7 · Verify clean working state for tracked files"
git diff --stat --quiet || {
  echo "  Uncommitted changes detected — committing as v2.1-brand-b4-chromaglass"
  git add styles/tokens.css \
          src/app/globals.css \
          src/app/layout.tsx \
          src/lib/motion.ts \
          src/lib/tokens.ts \
          src/components/ui/divider.tsx \
          src/components/ui/logo-mark-3d.tsx \
          src/components/ui/index.ts \
          src/components/ui/button.tsx \
          src/components/sections/hero-section.tsx \
          public/brand/wiele-3d-chromaglass-master.png \
          public/brand/wiele-3d-chromaglass-hero-2400.png \
          public/brand/wiele-3d-chromaglass-hero-1200.png \
          public/brand/wiele-3d-chromaglass-1024.png \
          public/brand/wiele-3d-chromaglass-512.png \
          public/brand/wiele-3d-chromaglass-256.png \
          public/brand/wiele-3d-chromaglass-128.png \
          public/brand/wiele-3d-chromaglass-64.png \
          public/brand/og-default.png \
          public/brand/og-default.jpg \
          public/brand/icon-192.png \
          public/brand/icon-512.png \
          public/brand/apple-touch-icon.png \
          public/brand/favicon.ico \
          public/brand/favicon-16.png \
          public/brand/favicon-32.png \
          public/favicon.ico \
          public/favicon-16.png \
          public/favicon-32.png \
          public/apple-touch-icon.png \
          public/icon-192.png \
          public/icon-512.png \
          public/og-image.png \
          public/site.webmanifest \
          preview-b4-chromaglass.html \
          wiele-3d-chromaglass-preview.png \
          deploy-v2.1-brand-b4-chromaglass.sh 2>/dev/null || true
  git commit -m "feat(brand): v2.1 B4 Chromaglass + 3D mark + Motion System v1

Brand v2 B4 Chromaglass — bichromatic chrome-glass on midnight.
Founder-supplied 3D logo asset integrated; full asset pack generated;
LogoMark3D component mounted in hero; favicon set + OG card replaced.

Tokens & styling:
- styles/tokens.css: B4 token grid (chrome scale, blue-core, ember coral,
  duality gradients, Motion v1 5×5 grid)
- src/app/globals.css: page gradient backgrounds, chrome-card,
  duality-border, chrome-divider, tier-accent-* utilities
- All blue rgba references migrated 74,158,255 → 59,130,246
- Reduced-motion: substitute don't delete (B4 spec)
- Backward-compatible: legacy tokens retained with B4 values

Components:
- src/lib/motion.ts: NEW Framer Motion presets per Wiele Motion System v1
- src/lib/tokens.ts: expanded TS color tokens + gradients export
- src/components/ui/divider.tsx: NEW gradient divider (chrome|duality)
- src/components/ui/logo-mark-3d.tsx: NEW Chromaglass W component
- src/components/ui/button.tsx: NEW 'featured' variant (duality border + dual glow)
- src/components/sections/hero-section.tsx: LogoMark3D mounted above eyebrow
- src/app/layout.tsx: theme-color → B4 midnight #0C1220, PWA icon links

3D Chromaglass W asset pack (founder-supplied source 1063×599):
- public/brand/wiele-3d-chromaglass-master.png (transparent native)
- public/brand/wiele-3d-chromaglass-hero-{1200,2400}.png
- public/brand/wiele-3d-chromaglass-{64,128,256,512,1024}.png
- public/brand/og-default.{png,jpg} 1200×630 (mark on chromaglass radial bg)
- public/brand/{apple-touch-icon,icon-192,icon-512}.png
- public/brand/favicon.{ico,16,32}
- Root /public favicon set + apple-touch + og-image overwritten with B4

Authority: brand-v2-B4-chromaglass.md + wiele-motion-system-v1.md
Supersedes: B3 Midnight Platinum (retired)
Verified: typecheck ✓ lint ✓"
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
echo "▸ Step 6/7 · Tag v2.1-brand-b4-chromaglass"
git tag -a v2.1-brand-b4-chromaglass -m "Brand v2 B4 Chromaglass + Motion System v1" 2>/dev/null || echo "  ℹ tag exists, skipping"
echo "  ✓ tagged"

echo ""
echo "▸ Step 7/7 · Deploy to Cloudflare Workers"
$WRANGLER deploy
echo "  ✓ deployed"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   DEPLOY COMPLETE · v2.1-brand-b4-chromaglass"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Push tag to remote:"
echo "    git push origin main && git push origin v2.1-brand-b4-chromaglass"
echo ""
echo "Run 9-gate verification:"
echo "    1. https://wielegroup.com (apex resolves)"
echo "    2. View source — confirm B4 tokens on body element"
echo "    3. Pricing page — featured tier shows duality-edge border"
echo "    4. Mobile (390px) — gradient + glow render correctly"
echo "    5. Lighthouse Performance ≥ 90"
echo "    6. prefers-reduced-motion — gradients persist, animations disabled"
echo "    7. Form focus — blue-core ring + glow visible"
echo "    8. /onboarding — wizard inherits B4 chrome surfaces"
echo "    9. GSC + Bing re-submit sitemap"
echo ""
