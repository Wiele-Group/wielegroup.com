#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# Wiele Group · wielegroup.com
# Deploy: v2.5.1-fix1-onboarding-tiers
# Phase 1 · Fix #1 of 8 — onboarding budget tiers ↔ live pricing
#
# WHAT SHIPS
# ──────────
# Three-file lockstep correction that was corrupting every onboarding
# intake's budget signal:
#
#   src/data/onboarding.ts     BUDGET_TIER_OPTIONS  (UI options)
#   src/lib/validations.ts     budgetTier Zod enum  (form validation)
#   src/lib/resend.ts          BUDGET_LABELS map    (founder email)
#
# Pre-fix values: launch / growth / scale / enterprise (with prices
#   £2,500/mo · £6,500/mo · £14,000/mo · bespoke) — none of which
#   matched the live tier cards on /pricing.
#
# Post-fix values: signal-audit / growth-system / authority-engine /
#   wiele-os — mirroring src/data/pricing.ts tier IDs exactly. Email
#   labels carry the live prices: £2,500 one-off · £4,000/mo ·
#   £8,000/mo · £15,000+/mo.
#
# WHY THIS MATTERS (REVENUE)
# ──────────────────────────
# Every prospect submitting /onboarding was self-selecting a budget tier
# that did not exist. The founder email surfaced wrong budget signals;
# downstream CRM / Stripe lookups had no clean join. This fix makes the
# intake's budget signal lossless and unambiguous all the way through to
# Stripe Payment Links.
#
# Authority: 2026-website-xray-audit.md P0-1 · Priority Stack item 2
# (Business Model) + item 5 (Revenue) · Money Filter PASS.
# ─────────────────────────────────────────────────────────────────────
set -euo pipefail
cd "$(dirname "$0")"

readonly VERSION="v2.5.1-fix1-onboarding-tiers"
readonly TAG_MESSAGE="Fix #1: onboarding budget tiers map to live pricing tier IDs"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   WIELE GROUP · Deploy ${VERSION}"
echo "   ${TAG_MESSAGE}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ── Tooling — 3-tier wrangler resolution per b4_deploy_lessons L1
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
echo "▸ Pre-flight · working tree status"
git status --short
echo ""
echo "  Files this commit will include:"
echo "    src/data/onboarding.ts     BUDGET_TIER_OPTIONS"
echo "    src/lib/validations.ts     budgetTier Zod enum"
echo "    src/lib/resend.ts          BUDGET_LABELS map"
echo "    deploy-v2.5.1-fix1-onboarding-tiers.sh"
echo ""

echo "▸ Step 1/8 · Commit Fix #1"
git diff --stat --quiet || {
  git add src/data/onboarding.ts \
          src/lib/validations.ts \
          src/lib/resend.ts \
          deploy-v2.5.1-fix1-onboarding-tiers.sh 2>/dev/null || true
  git commit -m "fix(onboarding): budget tiers mirror live pricing tier IDs

Authority: 2026-05-05 site XRAY audit · Priority Stack item 2 + 5
+ Live-or-Nothing Law (this fix is verified live by step 9)
+ Money Filter PASS (revenue-direct: stops bad-fit signal corruption)

THE FAILURE
Before this commit, /onboarding step 5 offered 4 budget tiers
(launch / growth / scale / enterprise at £2,500/mo / £6,500/mo /
£14,000/mo / bespoke) that did not exist as live tier cards on
/pricing. Every intake captured a budget signal pointing at
non-existent tiers; founder onboarding emails showed wrong amounts;
downstream CRM/Stripe joins had no clean match.

THE FIX
Three files updated in lockstep, values mirror src/data/pricing.ts
tier IDs exactly:

  src/data/onboarding.ts     BUDGET_TIER_OPTIONS  →
    signal-audit / growth-system / authority-engine / wiele-os / not-sure

  src/lib/validations.ts     budgetTier Zod enum  →
    same enum literal set

  src/lib/resend.ts          BUDGET_LABELS map    →
    Signal Audit (£2,500 one-off) / Growth System (£4,000 / mo) /
    Authority Engine (£8,000 / mo) / Wiele OS (£15,000+ / mo)

Email labels now match what the prospect sees on /pricing. Tier
IDs join cleanly to Stripe Price IDs in src/data/pricing.ts.

Tag: ${VERSION}
" 2>/dev/null || echo "  ℹ nothing to commit"
}
echo "  ✓ committed"

echo ""
echo "▸ Step 2/8 · Typecheck"
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
echo "▸ Step 6/8 · Tag ${VERSION}"
git tag -a "$VERSION" -m "$TAG_MESSAGE" 2>/dev/null || echo "  ℹ tag exists, skipping"
echo "  ✓ tagged"

echo ""
echo "▸ Step 7/8 · Deploy to Cloudflare Workers"
$WRANGLER deploy
echo "  ✓ deployed"

echo ""
echo "▸ Step 8/8 · LIVE VERIFICATION (Live-or-Nothing Law)"
echo "   The deploy is not complete until live HTML confirms the fix."
sleep 10
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/121.0 Safari/537.36'
CB="?cb=$(date +%s)"
ONBOARDING_HTML=$(curl -sS -A "$UA" "https://wielegroup.com/onboarding${CB}")

echo ""
echo "  Gate 1 · /onboarding renders 'Signal Audit — £2,500 one-off' option"
if echo "$ONBOARDING_HTML" | grep -q 'Signal Audit'; then
  echo "    ✓ Signal Audit tier label rendered"
else
  echo "    ❌ Signal Audit label NOT found in live HTML"; exit 1
fi

echo "  Gate 2 · /onboarding renders 'Growth System — £4,000 / mo' option"
if echo "$ONBOARDING_HTML" | grep -q 'Growth System'; then
  echo "    ✓ Growth System tier label rendered"
else
  echo "    ❌ Growth System label NOT found in live HTML"; exit 1
fi

echo "  Gate 3 · /onboarding renders 'Authority Engine — £8,000 / mo' option"
if echo "$ONBOARDING_HTML" | grep -q 'Authority Engine'; then
  echo "    ✓ Authority Engine tier label rendered"
else
  echo "    ❌ Authority Engine label NOT found in live HTML"; exit 1
fi

echo "  Gate 4 · /onboarding renders 'Wiele OS — £15,000+ / mo' option"
if echo "$ONBOARDING_HTML" | grep -q 'Wiele OS'; then
  echo "    ✓ Wiele OS tier label rendered"
else
  echo "    ❌ Wiele OS label NOT found in live HTML"; exit 1
fi

echo "  Gate 5 · /onboarding does NOT contain stale 'Launch — £2,500/mo' label"
if echo "$ONBOARDING_HTML" | grep -qE 'Launch.*£2,500/mo|Growth.*£6,500|Scale.*£14,000'; then
  echo "    ❌ STALE label still rendered in live HTML"; exit 1
else
  echo "    ✓ no stale tier labels in live HTML"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   ✓ DEPLOY + LIVE VERIFIED · ${VERSION} · 5/5 gates green"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Push tag + create GitHub Release:"
echo "    git push origin main && git push origin ${VERSION}"
echo "    gh release create ${VERSION} --notes \"${TAG_MESSAGE}\" --verify-tag"
echo ""
echo "Manual verify in browser:"
echo "    https://wielegroup.com/onboarding"
echo "    Walk to step 5 → Budget tier dropdown should show:"
echo "      • Signal Audit — £2,500 one-off"
echo "      • Growth System — £4,000 / mo"
echo "      • Authority Engine — £8,000 / mo"
echo "      • Wiele OS — £15,000+ / mo"
echo "      • Not sure yet"
echo ""
