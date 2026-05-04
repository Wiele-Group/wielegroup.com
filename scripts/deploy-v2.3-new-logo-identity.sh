#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# Wiele Group · Deploy v2.3 — New Logo Identity (3D Chromaglass Refresh)
#
# What ships:
#   • New 3D Chromaglass W mark (master + 64/128/256/512/1024 + hero 1200/2400)
#   • New WIELE wordmark (on-void + white + black-on-white at 2048)
#   • Refreshed favicons (16/32/.ico), apple-touch-icon (180), PWA icons (192/512)
#   • Refreshed OG image (1200×630, midnight bg + chromaglass wordmark)
#   • schema.ts Organization.logo + Article.publisher.logo → wordmark PNG
#
# Source: /Wiele Group Operations/Logo Assets/{New Logo Full Small.png, W Logo Small.png}
# Backup: _archive_brand_pre_2026_05_05/ (legacy assets preserved)
#
# Self-resolving wrangler binary (3-tier per b4_deploy_lessons):
#   1. ./node_modules/.bin/wrangler   (project-pinned, preferred)
#   2. npx --no-install wrangler      (if node_modules present)
#   3. global wrangler                (fallback)
#
# Auto-tails: IndexNow ping (Bing + Yandex)
# ─────────────────────────────────────────────────────────────────────
set -euo pipefail

readonly TAG="v2.3-new-logo-identity"
readonly REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${REPO_ROOT}"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   Wiele Group · Deploy ${TAG}"
echo "   New 3D Chromaglass W + WIELE wordmark identity"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ── Resolve wrangler binary ─────────────────────────────────────────
if [ -x "./node_modules/.bin/wrangler" ]; then
  WRANGLER="./node_modules/.bin/wrangler"
elif [ -d "./node_modules" ] && command -v npx >/dev/null 2>&1; then
  WRANGLER="npx --no-install wrangler"
elif command -v wrangler >/dev/null 2>&1; then
  WRANGLER="wrangler"
else
  echo "❌ wrangler not found. Run \`npm install\` first."
  exit 1
fi
echo "▸ wrangler: ${WRANGLER}"

# ── Pre-flight: clean working tree ──────────────────────────────────
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ Working tree dirty. Commit or stash before deploying."
  git status --short
  exit 1
fi
echo "▸ Working tree clean"

# ── Build ───────────────────────────────────────────────────────────
echo ""
echo "▸ Building Next.js"
npm run build

echo ""
echo "▸ Building OpenNext Cloudflare adapter"
npx @opennextjs/cloudflare build

# ── Deploy ──────────────────────────────────────────────────────────
echo ""
echo "▸ Deploying to Cloudflare Workers"
${WRANGLER} deploy

# ── IndexNow ────────────────────────────────────────────────────────
echo ""
echo "▸ Submitting to IndexNow (Bing + Yandex)"
if [ -x "./scripts/notify-indexnow.sh" ]; then
  ./scripts/notify-indexnow.sh
else
  echo "⚠ scripts/notify-indexnow.sh not executable — skipping IndexNow"
fi

# ── Verification probe ──────────────────────────────────────────────
echo ""
echo "▸ Probing prod (apex)"
echo "  /                                  → $(curl -sI -o /dev/null -w '%{http_code}' https://wielegroup.com/)"
echo "  /brand/wiele-3d-chromaglass-512.png → $(curl -sI -o /dev/null -w '%{http_code}' https://wielegroup.com/brand/wiele-3d-chromaglass-512.png)"
echo "  /apple-touch-icon.png              → $(curl -sI -o /dev/null -w '%{http_code}' https://wielegroup.com/apple-touch-icon.png)"
echo "  /og-image.png                      → $(curl -sI -o /dev/null -w '%{http_code}' https://wielegroup.com/og-image.png)"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   ✓ ${TAG} deployed"
echo "   Manual: re-submit sitemap in GSC → https://search.google.com/search-console"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
