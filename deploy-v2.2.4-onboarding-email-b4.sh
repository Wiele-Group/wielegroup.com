#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# Wiele Group · wielegroup.com
# Deploy: v2.2.4-onboarding-email-b4
# Refactor all 5 transactional Resend email templates from light-mode
# 2018-SaaS styling to Brand v2 B4 Chromaglass.
#
# Surfaces affected (every real client + founder touch via email):
# 1. Audit customer confirmation    (every /audit submission)
# 2. Audit founder notification     (every /audit submission)
# 3. Contact founder notification   (every /contact submission)
# 4. Onboarding client confirmation (every /onboarding submission)
# 5. Onboarding founder notification (every /onboarding submission)
#
# NEW: shared chromaglassShell() wrapper — single source of truth
# for header (wordmark + tagline) + duality gradient accent line +
# body + optional footer note. Applied to all 5 templates.
#
# All inline hex (no CSS vars — Gmail/Outlook strip them).
# Tables for layout (Outlook safety). color-scheme dark meta.
# ─────────────────────────────────────────────────────────────────────
set -euo pipefail
cd "$(dirname "$0")"

readonly VERSION="v2.2.4-onboarding-email-b4"
readonly TAG_MESSAGE="Refactor all 5 Resend email templates to B4 Chromaglass"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   WIELE GROUP · Deploy ${VERSION}"
echo "   ${TAG_MESSAGE}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

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
echo "▸ Step 1/8 · Commit v2.2.4 email refactor"
git diff --stat --quiet || {
  git add src/lib/resend.ts \
          preview-email-onboarding-client.html \
          preview-email-onboarding-founder.html \
          preview-email-audit-customer.html \
          deploy-v2.2.4-onboarding-email-b4.sh 2>/dev/null || true
  git commit -m "feat(email): refactor all 5 Resend templates to B4 Chromaglass

Authority: brand-v2-B4-chromaglass.md · feedback_session_close_2026_05_04.md
loop 3 (onboarding email B4 polish — first-touch client surface).

CHANGES

src/lib/resend.ts — full refactor of HTML templates:
- NEW: B4 hex tokens (C constant) at top — single source of truth
- NEW: chromaglassShell() wrapper — header (wordmark + tagline) +
  duality gradient accent line + body + optional footer note
- NEW: sectionLabel() + stepRow() helpers for onboarding client steps
- REFACTOR: row() — chrome borders, monospace caps labels, B4 colors
- REFACTOR: 5 email templates to consume shared shell:
  • sendAuditCustomerConfirmation
  • sendAuditFounderNotification
  • sendContactNotification
  • sendOnboardingClientConfirmation (most polished — has steps + accent card)
  • sendOnboardingFounderNotification (full intake table, all 30+ fields)

DESIGN

- All inline hex (no CSS vars — Gmail / Outlook strip them)
- Tables for layout (Outlook Word-renderer safety)
- color-scheme: dark + supported-color-schemes: dark meta tags
- Bichromatic duality accent line (linear-gradient blue → coral)
- Lowercase 'wiele' wordmark + tagline 'The agency operating system'
- chrome-mid body text · chrome-hi headings · blue-hi links
- coral-core left border on contact-form messages
- All function signatures + exports unchanged (no callers affected)

PREVIEWS (open in macOS Finder, no deploy needed to inspect):
- preview-email-onboarding-client.html
- preview-email-onboarding-founder.html
- preview-email-audit-customer.html

EVIDENCE
- eslint src/lib/resend.ts → no output
- All 5 templates send via existing Resend route handlers (no API change)
- Real first-touch surface — every onboarding submission this week
  now reads on-brand instead of off-brand 2018-SaaS

Verified: lint ✓"
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
echo "Verification (real-world send required — emails are server-side):"
echo ""
echo "Option A — submit /audit form on production with your own email:"
echo "    https://wielegroup.com/audit"
echo "    Check inbox for both 'Wiele Audits — submission received' (you)"
echo "    and 'New Signal Audit submission' (founder mailbox)"
echo ""
echo "Option B — submit /onboarding wizard on production with your own email:"
echo "    https://wielegroup.com/onboarding"
echo "    Check inbox for the 4-step 'What happens next' chromaglass card"
echo ""
echo "Option C — preview locally without sending (no Resend call):"
echo "    open preview-email-onboarding-client.html"
echo "    open preview-email-onboarding-founder.html"
echo "    open preview-email-audit-customer.html"
echo ""
