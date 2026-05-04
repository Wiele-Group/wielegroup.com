#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# Wiele Group · wielegroup.com
# Deploy: v2.2.3-wave-a-reconcile
# Make git HEAD match what's already on production.
#
# Wave A is the 21 modified + 7 untracked files that have been silently
# riding along in build snapshots since 2026-05-03 — real production
# code (onboarding feature, mobius-backdrop, answer-engine-strip, lib
# expansion, B4 cascade edits) that no commit ever owned.
#
# After this tag: working tree clean. Tomorrow's first deploy starts
# from a known state. No more "carryover acknowledged" footnotes.
#
# Authority: directive § 5.6 (pre-deploy reconcile) + § 5.12 (VERSION).
# ─────────────────────────────────────────────────────────────────────
set -euo pipefail
cd "$(dirname "$0")"

readonly VERSION="v2.2.3-wave-a-reconcile"
readonly TAG_MESSAGE="Wave A reconcile — make git HEAD match production"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   WIELE GROUP · Deploy ${VERSION}"
echo "   ${TAG_MESSAGE}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Pre-flight (3-tier wrangler resolution — directive § 5.1)
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
echo "▸ Step 0/8 · Pre-deploy reconcile (directive § 5.6)"
echo "  Working tree before commit:"
git status -s | head -40
echo "  ── End working tree dump"

echo ""
echo "▸ Step 1/8 · Stage + commit Wave A (every modified + untracked file)"
git diff --stat --quiet || {
  # Add EVERYTHING currently in the working tree — that's the whole point.
  git add -A
  git commit -m "feat(wave-a): reconcile working tree with production state

Make git HEAD match what's already deployed. No code changes; this
commit captures the 21 modified + 7 untracked files that have been
silently riding along in build snapshots since 2026-05-03 but no
commit ever owned. After this tag, working tree is clean.

CONTENTS

Modified — pre-existing files extended for Wave A features:
- src/app/about/page.tsx, audit/page.tsx, contact/page.tsx,
  platform/page.tsx, systems/page.tsx — page-level edits
- src/components/labs/article-cta.tsx — labs CTA tweak
- src/components/layout/footer.tsx — agency column already added
  (committed in v2.2 div pages); plus minor tweaks
- src/components/sections/{audit-preview, bento-system, cta-section,
  system-detail}.tsx — section-level B4 cascade edits
- src/components/ui/card.tsx — card component refinement
- src/components/visual/ambient-grid.tsx — visual primitive
- src/data/pricing.ts — pricing data minor edit
- src/lib/{fonts,kv,metadata,resend,validations}.ts — lib expansion
  for onboarding form (Resend templates, Zod schemas, KV writers)
- CLAUDE.md — TOP AUTHORITY block referencing operating directive
- deploy-v2.2.2-indexnow-script-fix.sh — tail message typo fix

Untracked — NEW files referenced from layout/page imports already in prod:
- src/app/api/onboarding/route.ts (137 lines) — POST handler:
  Zod validate → Turnstile verify → KV write → Resend × 2 → 202
- src/app/onboarding/page.tsx (72 lines) — wizard page mount
- src/components/forms/onboarding-form.tsx (837 lines) — 5-step
  wizard, client component
- src/components/forms/onboarding-thank-you.tsx (72 lines) — success state
- src/components/sections/answer-engine-strip.tsx (34 lines) —
  homepage section already mounted in src/app/page.tsx
- src/components/visual/mobius-backdrop.tsx (309 lines) —
  ambient backdrop already mounted in src/app/layout.tsx
- src/data/onboarding.ts (80 lines) — wizard step data + types

VERIFIED LIVE IN PRODUCTION:
- All untracked files referenced from currently-deployed layout.tsx
  and page.tsx (grep-confirmed before commit)
- /onboarding returns HTTP 200 in prod (gate D of #2 GSC pre-flight)
- Homepage HTML contains AnswerEngineStrip section
- MobiusBackdrop mounts in layout

NO functional change. No regression risk. Pure git hygiene.

Authority: WIELE_CODE_OPERATING_DIRECTIVE.md § 5.6 (pre-deploy reconcile)"
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
echo "▸ Step 8/8 · Notify IndexNow (Bing + Yandex)"
sleep 10
./scripts/notify-indexnow.sh
echo "  ✓ IndexNow notified"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   DEPLOY COMPLETE · ${VERSION}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Push tag to remote:"
echo "    git push origin main && git push origin ${VERSION}"
echo ""
echo "Single acceptance gate (zero new functional behaviour to verify):"
echo "    git status -s"
echo "    Expected: empty output (working tree clean)."
echo ""
echo "After this lands, tomorrow's first deploy starts from a known state."
echo "No more 'Wave A carryover acknowledged' footnotes in deploy reports."
echo ""
