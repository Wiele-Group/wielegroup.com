#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# Wiele Group · wielegroup.com
# Deploy: v2.2.1-indexnow
# Permanent automated Bing/Yandex notification on every deploy.
#
# Adds:
#   - public/039085047de03d9f461bdf6f2d8beea5.txt  (IndexNow key file)
#   - scripts/notify-indexnow.sh                   (IndexNow notifier)
#
# After this ships, every future deploy can call
# `./scripts/notify-indexnow.sh` to push the URL list to Bing + Yandex
# without any credentials, OAuth, or dashboard work.
# ─────────────────────────────────────────────────────────────────────
set -euo pipefail
cd "$(dirname "$0")"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   WIELE GROUP · Deploy v2.2.1-indexnow"
echo "   Permanent IndexNow integration (Bing + Yandex)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Pre-flight (3-tier wrangler resolution)
command -v node >/dev/null || { echo "❌ node missing"; exit 1; }
command -v npm  >/dev/null || { echo "❌ npm missing"; exit 1; }
command -v git  >/dev/null || { echo "❌ git missing"; exit 1; }
command -v curl >/dev/null || { echo "❌ curl missing"; exit 1; }
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
echo "▸ Step 1/8 · Commit v2.2.1 IndexNow files"
git diff --stat --quiet || {
  git add public/039085047de03d9f461bdf6f2d8beea5.txt \
          scripts/notify-indexnow.sh \
          src/app/sitemap.ts \
          src/app/page.tsx \
          src/components/sections/cinematic-entry.tsx \
          src/components/sections/hero-section.tsx \
          src/components/sections/index.ts \
          src/components/motion/fade-in.tsx \
          src/components/motion/reveal.tsx \
          deploy-v2.2.1-indexnow.sh 2>/dev/null || true
  git commit -m "feat(seo): IndexNow integration for Bing + Yandex auto-notify

Adds permanent IndexNow protocol integration so every deploy can
push the canonical URL list to Bing + Yandex without OAuth or
dashboard work.

Files:
- public/039085047de03d9f461bdf6f2d8beea5.txt — IndexNow key file
  (32 hex chars, must be served unmodified at site root for IndexNow
  to validate ownership before accepting submissions).
- scripts/notify-indexnow.sh — submits 20 canonical URLs to
  https://api.indexnow.org/IndexNow on demand. Pre-flights the key
  file is publicly reachable; fails fast if not. Handles all
  IndexNow response codes (200/202 ok; 400/403/422/429 explicit).

After this ships, append to any future deploy script:
   ./scripts/notify-indexnow.sh
to auto-notify Bing + Yandex on every deploy.

Authority: https://www.indexnow.org/
Compatible with: Bing, Yandex, Seznam, IndexNow.org consortium.
Google does not participate in IndexNow — for Google use GSC manual
sitemap re-submit (Google auto-discovers via robots.txt sitemap ref
within hours-to-days regardless).

Also includes:
- src/app/sitemap.ts: ADD /onboarding route at priority 0.7. The
  onboarding wizard shipped in v2.0 but was never added to the
  sitemap STATIC_ROUTES — search engines didn't know about it.
  Discovered 2026-05-04 PM via post-deploy curl audit.
- src/components/sections/cinematic-entry.tsx: NEW. Full-viewport
  brand entry sequence — 3D Chromaglass W mark with phased motion
  (glow → mark → wordmark → tagline → scroll indicator). Mounted
  above HeroSection on / so visitors land on the cinematic before
  scrolling to the conversion engine (PromptSimulator). Uses
  centralized motion v1 tokens via @/lib/motion. priority=true on
  the W image — intended LCP candidate. Reduced-motion respected.
- src/components/sections/hero-section.tsx: removed the small
  LogoMark3D (the cinematic above renders the big version; one is
  enough). Hero is now copy + PromptSimulator only.
- src/components/sections/index.ts: export CinematicEntry.
- src/app/page.tsx: mount CinematicEntry as first section.
- src/components/motion/fade-in.tsx: refactor to consume centralized
  motion v1 tokens (ease.expressiveIn + duration.t4 from @/lib/motion)
  instead of hardcoded magic numbers. Per feedback_b4_deploy_lessons
  Lesson 2 — added to design system != consumed by page.
- src/components/motion/reveal.tsx: same refactor — now consumes
  centralized motion v1 tokens. Default stagger lowered from 0.08 to
  0.06 to match motion v1 ≤5-children rule." 2>/dev/null || echo "  ℹ commit may already exist"
}
echo "  ✓ committed"

echo ""
echo "▸ Step 2/8 · Typecheck (no source changes — sanity check)"
npm run typecheck
echo "  ✓ typecheck clean"

echo ""
echo "▸ Step 3/8 · Lint (no source changes — sanity check)"
npm run lint
echo "  ✓ lint clean"

echo ""
echo "▸ Step 4/8 · Next.js production build"
npm run build
echo "  ✓ Next build complete"

echo ""
echo "▸ Step 5/8 · OpenNext Cloudflare adapter"
npx opennextjs-cloudflare build
echo "  ✓ Cloudflare adapter build complete"

echo ""
echo "▸ Step 6/8 · Tag v2.2.1-indexnow"
git tag -a v2.2.1-indexnow -m "IndexNow integration (Bing + Yandex auto-notify)" 2>/dev/null || echo "  ℹ tag exists, skipping"
echo "  ✓ tagged"

echo ""
echo "▸ Step 7/8 · Deploy to Cloudflare Workers"
$WRANGLER deploy
echo "  ✓ deployed"

echo ""
echo "▸ Step 8/8 · Notify IndexNow (Bing + Yandex)"
echo "  Waiting 10 s for Cloudflare edge propagation before key validation…"
sleep 10
./scripts/notify-indexnow.sh
echo "  ✓ IndexNow notified"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   DEPLOY COMPLETE · v2.2.1-indexnow"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Push tag to remote:"
echo "    git push origin main && git push origin v2.2.1-indexnow"
echo ""
echo "Verification:"
echo "    Key file:  curl -A 'Mozilla/5.0' https://wielegroup.com/039085047de03d9f461bdf6f2d8beea5.txt"
echo "    Expected:  039085047de03d9f461bdf6f2d8beea5"
echo ""
echo "Bing reflects the submission within 30 minutes — 24 hours."
echo "Verify at: https://www.bing.com/webmasters/home/sitemaps"
echo ""
echo "GSC (Google Search Console) — manual one-step (Google does not"
echo "participate in IndexNow):"
echo ""
echo "    1. Open https://search.google.com/search-console"
echo "    2. Select property: https://wielegroup.com"
echo "    3. Sitemaps → Add new → 'sitemap.xml' → Submit"
echo ""
echo "Google will recrawl sitemap within hours and pick up all 4 new"
echo "division pages. (The robots.txt at /robots.txt already references"
echo "the sitemap, so Google would discover changes naturally too —"
echo "manual re-submit just accelerates indexing.)"
echo ""
