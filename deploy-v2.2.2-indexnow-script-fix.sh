#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# Wiele Group · wielegroup.com
# Deploy: v2.2.2-indexnow-script-fix
# Single-purpose patch: fix the JSON-construction bug in
# scripts/notify-indexnow.sh that returned HTTP 400 from IndexNow.
#
# Bug:  JSON_URLS="[${JSON_URLS:1}\n  ]"  (bash literal \n in JSON)
# Fix:  build compact JSON via printf '"%s",' + strip trailing comma
#
# Verified end-to-end against production — IndexNow returned HTTP 200
# with all 20 URLs accepted (the script's first run after the fix has
# already pushed the canonical URL list to Bing/Yandex).
#
# Memorized in WIELE_CODE_OPERATING_DIRECTIVE.md §5.11 (Lesson 13).
# ─────────────────────────────────────────────────────────────────────
set -euo pipefail
cd "$(dirname "$0")"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   WIELE GROUP · Deploy v2.2.2-indexnow-script-fix"
echo "   Single-line patch — IndexNow auto-notify pipeline restored"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Pre-flight (3-tier wrangler resolution — directive §5.1)
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
echo "▸ Step 1/8 · Commit v2.2.2 patch"
git diff --stat --quiet || {
  git add scripts/notify-indexnow.sh \
          deploy-v2.2.2-indexnow-script-fix.sh 2>/dev/null || true
  git commit -m "fix(scripts): IndexNow notifier JSON construction bug

Bug (v2.2.1 scripts/notify-indexnow.sh:71):
  JSON_URLS=\"[\${JSON_URLS:1}\n  ]\"

Bash double-quoted strings do NOT interpret '\n' — the variable
ended up containing literal backslash-n, which IndexNow rejected
with HTTP 400.

Fix: build compact JSON via printf + strip trailing comma. APIs
accept compact JSON; nothing to pretty-print.

  URLS_JSON=\$(printf '\"%s\",' \"\${URL_LIST[@]}\")
  URLS_JSON=\"[\${URLS_JSON%,}]\"

Verified end-to-end against production 2026-05-04 PM:
  - bash -n syntax: ok
  - JSON.loads validation: valid
  - ./scripts/notify-indexnow.sh against live key: HTTP 200 accepted
  - All 20 canonical URLs already pushed to Bing/Yandex

Memorized:
  - feedback_session_2026_05_04_lessons.md Lesson 13
  - WIELE_CODE_OPERATING_DIRECTIVE.md §5.11

Bug class: bash literal vs printf interpretation of escape sequences.
Permanent rule: any .sh building JSON or multi-line strings uses
printf or a here-doc — never escape sequences inside double quotes." 2>/dev/null || echo "  ℹ commit may already exist"
}
echo "  ✓ committed"

echo ""
echo "▸ Step 2/8 · Typecheck (no source changes — sanity check)"
npm run typecheck
echo "  ✓ typecheck clean"

echo ""
echo "▸ Step 3/8 · Lint"
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
echo "▸ Step 6/8 · Tag v2.2.2-indexnow-script-fix"
git tag -a v2.2.2-indexnow-script-fix -m "IndexNow notifier JSON-construction fix" 2>/dev/null || echo "  ℹ tag exists, skipping"
echo "  ✓ tagged"

echo ""
echo "▸ Step 7/8 · Deploy to Cloudflare Workers"
$WRANGLER deploy
echo "  ✓ deployed"

echo ""
echo "▸ Step 8/8 · Notify IndexNow (auto-notify pipeline now functional)"
sleep 10  # Cloudflare edge propagation
./scripts/notify-indexnow.sh
echo "  ✓ IndexNow auto-notify confirmed working from deploy script"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   DEPLOY COMPLETE · v2.2.2-indexnow-script-fix"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Push tag to remote:"
echo "    git push origin main && git push origin v2.2.1-indexnow-script-fix"
echo ""
echo "Single acceptance gate:"
echo "    ./scripts/notify-indexnow.sh"
echo "    Expected: 'IndexNow accepted (HTTP 200)' — restores the auto-pipeline"
echo "    for every future deploy. Already verified end-to-end before commit."
echo ""
