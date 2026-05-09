#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# Wiele Group · wielegroup.com
# Deploy: v3.6.1-hero-duality-hairline
#
# WHAT SHIPS (B4 Chromaglass — first visible warm-accent moment)
# ──────────────────────────────────────────────────────────────
# A 1px hairline duality-gradient rule above the discipline strip in
# the hero. Bichromatic blue → chrome → coral with edge fades, sized
# 12rem (~192px) — quiet typographic moment, not a hard divider.
#
# This is the first time Ember Coral is visible on the home page.
# v3.6.0 shipped the capability (Card variants); v3.6.1 ships the
# first surface adoption — strategically placed in the hero between
# the CTAs (FadeIn delay 0.15) and the discipline strip (0.2), at
# delay 0.18, so it animates as a typographic threshold drawing the
# eye down to "what we do."
#
# CSS primitive (src/app/globals.css, +20 lines after .chrome-divider)
# - .duality-hairline   1px height, 12rem width default
#                        background: linear-gradient(90deg,
#                          transparent 0%,
#                          rgba(59,130,246,0.85) 20%,
#                          rgba(238,242,248,1) 50%,
#                          rgba(240,133,102,0.85) 80%,
#                          transparent 100%)
#                        Mirrors .chrome-divider philosophy (transparent
#                        at edges, peak in middle) but expresses the
#                        full B4 bichromatic identity instead of
#                        monochrome chrome.
#
# Naming: NOT hero-locked. .duality-hairline is reusable — services
# pages, division pages, authority callouts can all opt in.
#
# Hero edit (src/components/sections/hero-section.tsx, +8 / -1)
# - <hr className="duality-hairline mt-6 mb-3" aria-hidden="true" />
#   wrapped in <FadeIn delay={0.18}>, inserted between CTAs and the
#   discipline strip <p>
# - mt-6 spacing migrated from <p> to <hr> (hairline now owns the
#   gap from CTAs); <p> retains its original visual position via
#   <hr>'s mb-3
# - aria-hidden="true" — decorative, screen-readers skip
# - <hr> semantic element (not <div>) — communicates "thematic break"
#   to AT users who DO surface hr (some screen readers do)
#
# WHY THIS MATTERS
# ────────────────
# The third-person UI/UX self-critique (2026-05-09) flagged that
# the hero is 100% chrome+electric — the new B4 warm accent is
# invisible on first impression in spite of being in tokens. Founder
# decision: option C (full spectrum) — use the entire duality
# gradient (blue→chrome→coral) in one deliberate hero moment.
#
# This single 1px element makes the home page bichromatic at first
# impression. The Foundation cycle (capability → expression →
# adoption) completes its second beat with this deploy.
#
# WHAT DID NOT SHIP (intentional scope)
# - Card variants in any new consumer  → none yet (still dormant
#                                          across /pricing, /services,
#                                          /proof, /labs)
# - Depth-tilt PromptSimulator         → v3.6.2
# - Coral propagation to division pages → v3.8 surface-coverage audit
# - Phase 3 alias removal              → v3.7
#
# VERIFICATION MODEL (visible consumer — HTML class gates available)
# ────────────────────────────────────────────────────────────────
# Unlike v3.6.0 which shipped dormant, v3.6.1 has a rendered consumer
# (the hero <hr>). Live verification can use HTML class-string gates
# directly — no need to inspect the CSS bundle for the consumer.
#
# CSS-bundle gate is retained for the .duality-hairline class
# DEFINITION (proves the rule shipped through Lightning CSS optimizer).
# Pattern uses CLASS + STRUCTURAL KEYWORD (linear-gradient + transparent)
# rather than literal color values — defends against the rgba→hex
# transcoding that bit v3.6.0's verification regex.
# (See feedback_tailwind4_lightning_css_rgba_rewrite.md)
#
# Authority: founder verbal approval 2026-05-09 ("go v3.6", "full
# spectrum", "1" to roll v3.6.1).
# ─────────────────────────────────────────────────────────────────────
set -euo pipefail
cd "$(dirname "$0")"

readonly VERSION="v3.6.1-hero-duality-hairline"
readonly TAG_MESSAGE="v3.6.1: Hero duality hairline — first visible warm-accent (Ember Coral) on home page. 1px bichromatic rule above discipline strip; reusable .duality-hairline utility."

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
  src/components/sections/hero-section.tsx \
  deploy-v3.6.1-hero-duality-hairline.sh 2>/dev/null || true
git diff --cached --stat --quiet && echo "  ℹ nothing to commit" || {
  git commit -m "feat(v3.6.1): hero duality hairline — first visible Ember Coral

Authority: founder verbal approval 2026-05-09 ('go v3.6', 'full spectrum').
Audit basis: third-person UI/UX self-critique — hero reads as 100%
chrome+electric in spite of B4 Chromaglass tokens shipping coral.

CSS PRIMITIVE (src/app/globals.css, +20 lines)
- .duality-hairline   reusable bichromatic 1px rule
                       linear-gradient(90deg,
                         transparent 0%,
                         rgba(59,130,246,0.85) 20%,
                         rgba(238,242,248,1) 50%,
                         rgba(240,133,102,0.85) 80%,
                         transparent 100%)
                       Edge fades mirror .chrome-divider philosophy.
                       NOT hero-locked — reusable across pages.

HERO EDIT (src/components/sections/hero-section.tsx, +8 / -1)
- <FadeIn delay={0.18}>
    <hr className='duality-hairline mt-6 mb-3' aria-hidden='true' />
  </FadeIn>
  inserted between CTAs (delay 0.15) and discipline strip (0.20)
- mt-6 spacing migrated from <p> to <hr> (hairline owns CTA→strip gap)
- <p> keeps original visual position via <hr>'s mb-3
- <hr> semantic (thematic break) + aria-hidden (decorative)

CHOREOGRAPHY (FadeIn delays in hero copy column)
  0     badge
  0.05  h1
  0.075 shield trust strip
  0.10  description
  0.15  CTAs
  0.18  ← NEW duality hairline
  0.20  discipline strip

The hairline animates as a typographic threshold drawing the eye
down to 'what we do' (the discipline strip below it).

WHY THIS MATTERS
- v3.6.0 shipped capability (Card coral + duality variants, dormant).
- v3.6.1 ships first surface adoption — first time Ember Coral is
  visible on the home page since the B4 token introduction.
- One deliberate 1px element makes the site bichromatic at first
  impression. Founder selected option C (full spectrum) over (a)
  coral trust strip and (b) coral glyph; this matches that brief.

VERIFICATION
- HTML class gate: hero markup contains 'duality-hairline' on /
- CSS bundle gate: .duality-hairline rule shipped (class + linear-
  gradient + transparent structural anchors; defends against
  Lightning CSS rgba→hex transcoding per feedback memory)
- Regression: chrome-card, hero-backdrop, depth-card, glass-strip-
  coral/duality from v3.6.0 still in CSS bundle

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
$WRANGLER deploy 2>&1 | tee /tmp/wrangler-deploy-v3.6.1.log
WORKER_VERSION=$(grep -oE "Current Version ID: [0-9a-f-]+" /tmp/wrangler-deploy-v3.6.1.log | head -1 | awk '{print $4}')
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
echo "   Visible-consumer model: HTML class gate on hero +"
echo "   CSS-bundle gate using class+structural-keyword pattern"
echo "   (defends against Lightning CSS rgba→hex transcoding)."
sleep 5
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/130.0 Safari/537.36'
TS=$(date +%s)
GATE_FAILS=0

# Standard HTML class-string gate (visible consumer, regression checks)
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

# CSS-bundle gate — fetches the linked CSS asset and greps for the
# pattern. CRITICAL: pattern must use class name + structural keyword
# (gradient functions, custom property names, animation names) NOT
# literal color values — Lightning CSS rewrites rgba(R,G,B,A) →
# #RRGGBBAA which will silently fail color-value patterns.
# See: feedback_tailwind4_lightning_css_rgba_rewrite.md
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
echo "  Gate group A · hero duality hairline visible on /"
gate "/ hero markup contains duality-hairline class" \
  "https://wielegroup.com/" "duality-hairline"
gate "/ hero hairline preserves discipline strip below it" \
  "https://wielegroup.com/" "Brand · Marketing · Web · Advertising"

echo ""
echo "  Gate group B · CSS bundle has new utility (structural anchors)"
gate_css_present "duality-hairline rule shipped (class + linear-gradient)" \
  "duality-hairline[^}]*linear-gradient"
gate_css_present "duality-hairline has edge fades (transparent at 0% + 100%)" \
  "duality-hairline[^}]*transparent[^}]*transparent"

echo ""
echo "  Gate group C · regression — v3.6.0 capability still in CSS"
gate_css_present "glass-strip-coral still present (v3.6.0)" \
  "glass-strip-coral"
gate_css_present "glass-strip-duality still present (v3.6.0)" \
  "glass-strip-duality"

echo ""
echo "  Gate group D · regression — pre-existing surfaces still rendering"
gate "/ chrome-card surfaces present" \
  "https://wielegroup.com/" "chrome-card"
gate "/ hero constellation backdrop present (v3.0.10)" \
  "https://wielegroup.com/" "hero-backdrop|constellation"
gate "/ depth-card surfaces present (v3.5.0)" \
  "https://wielegroup.com/" "wg-depth-card"
gate "/pricing duality-border on featured tier present" \
  "https://wielegroup.com/pricing" "duality-border"

echo ""
if [ $GATE_FAILS -eq 0 ]; then
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "   ✓ ALL GATES GREEN · ${VERSION} live"
  echo "   Worker: ${WORKER_VERSION:-?}"
  echo "   First visible Ember Coral on home page."
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
else
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "   ❌ ${GATE_FAILS} GATE FAIL(S) · ${VERSION} live but degraded"
  echo "   Worker: ${WORKER_VERSION:-?}"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  exit 1
fi
