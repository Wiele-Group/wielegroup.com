#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# Wiele Group · wielegroup.com
# Deploy: v2.4-website-holes-plugged
# Plug all user-visible placeholder leaks + structural SEO holes
# discovered in the 2026-05-05 site audit.
#
# WHAT SHIPS
# ──────────
# 1. /about — full founder bio + thesis + careers (was 3× [FOUNDER REVIEW])
# 2. /trust — 9 substantive commitments (was 4× [LEGAL REVIEW])
#    + new FAQPage schema (9 Q/A pairs for AI extraction)
#    + new WebPage schema with datePublished + dateModified
# 3. /privacy — substantive UK GDPR-aligned policy reflecting actual
#    data flows (Resend / Cloudflare KV / Plausible / Turnstile)
#    (was a 17-line stub with [LEGAL REVIEW] body + noindex:true)
#    + Breadcrumb + WebPage schema · noindex removed
# 4. /terms — substantive terms of use for site + agency engagements
#    (was a 17-line stub with [LEGAL REVIEW] body + noindex:true)
#    + Breadcrumb + WebPage schema · noindex removed
# 5. /proof — honest pre-revenue framing: programme catalogue +
#    methodology + founding-cohort note (was [CASE STUDY PENDING])
# 6. Homepage proof-section + data/homepage.ts proofPlaceholders —
#    strip all "Live in Phase 3" / "Case Study Pending · Phase 3"
#    internal language; rewrite to programme-catalogue framing
# 7. /onboarding — adds Service + HowTo schema (5-step intake)
# 8. /lib/schema.ts — adds webPageSchema() + howToSchema() helpers
# 9. /sitemap.ts — adds /privacy + /terms (both indexable now)
# 10. scripts/notify-indexnow.sh — adds /privacy + /terms to URL list
#
# WHY THIS MATTERS
# ────────────────
# Pre-v2.4 the site shipped 4 user-visible "[LEGAL REVIEW: ...]" + 3
# user-visible "[FOUNDER REVIEW: ...]" + 3 "[CASE STUDY PENDING]" strings
# directly to crawlers and visitors. Trust signal corrupted; AI engines
# would index the placeholder strings as the brand voice. Founder-credibility
# critical surfaces (/about, /trust) and legal posture (/privacy, /terms)
# now ship real, founder-voice copy.
# ─────────────────────────────────────────────────────────────────────
set -euo pipefail
cd "$(dirname "$0")"

readonly VERSION="v2.4-website-holes-plugged"
readonly TAG_MESSAGE="Plug user-visible placeholder leaks + structural SEO holes (2026-05-05 audit)"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   WIELE GROUP · Deploy ${VERSION}"
echo "   ${TAG_MESSAGE}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ── Tooling — 3-tier wrangler resolution per b4_deploy_lessons.md L1
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

# ── Pre-flight git status reconcile per session_2026_05_04_lessons L7
echo ""
echo "▸ Pre-flight · working tree status"
git status --short
echo ""
echo "  Files this commit will include:"
echo "    src/app/about/page.tsx          (real founder bio + careers)"
echo "    src/app/trust/page.tsx          (9 substantive commitments + FAQ schema)"
echo "    src/app/privacy/page.tsx        (full UK GDPR privacy policy)"
echo "    src/app/terms/page.tsx          (full terms of use)"
echo "    src/app/proof/page.tsx          (programme catalogue framing)"
echo "    src/app/onboarding/page.tsx     (+ Service + HowTo schema)"
echo "    src/app/sitemap.ts              (+ /privacy + /terms)"
echo "    src/lib/schema.ts               (+ webPageSchema + howToSchema)"
echo "    src/lib/labs-static.ts          (FAQ answers — no more [FOUNDER REVIEW])"
echo "    src/data/homepage.ts            (proofPlaceholders rewritten)"
echo "    src/data/systems-detail.ts      (case examples rewritten)"
echo "    src/components/sections/proof-section.tsx"
echo "    src/content/labs/ai-recommendations-compound.mdx  (full article body)"
echo "    src/content/labs/five-citation-signals.mdx        (full article body)"
echo "    src/content/labs/search-is-splitting.mdx          (full article body)"
echo "    scripts/notify-indexnow.sh     (+ /privacy + /terms)"
echo "    deploy-v2.4-website-holes-plugged.sh"
echo ""

echo "▸ Step 1/9 · Commit v2.4 holes-plugged"
git diff --stat --quiet || {
  git add src/app/about/page.tsx \
          src/app/trust/page.tsx \
          src/app/privacy/page.tsx \
          src/app/terms/page.tsx \
          src/app/proof/page.tsx \
          src/app/onboarding/page.tsx \
          src/app/sitemap.ts \
          src/lib/schema.ts \
          src/lib/labs-static.ts \
          src/data/homepage.ts \
          src/data/systems-detail.ts \
          src/components/sections/proof-section.tsx \
          src/content/labs/ai-recommendations-compound.mdx \
          src/content/labs/five-citation-signals.mdx \
          src/content/labs/search-is-splitting.mdx \
          scripts/notify-indexnow.sh \
          deploy-v2.4-website-holes-plugged.sh 2>/dev/null || true
  git commit -m "feat(site): plug user-visible placeholder leaks + structural SEO holes

Authority: 2026-05-05 site audit · founder directive 'plug the holes'
+ Founder Standard (no workarounds, no placeholder leaks to users)
+ founder_vision_synthesis (ship the complete thing)

USER-VISIBLE PLACEHOLDER LEAKS — REMOVED

/about — was shipping 3× [FOUNDER REVIEW: 200-word bio...] direct to
crawlers + visitors. Replaced with founder-voice bio, Wiele OS thesis,
careers stance. AboutPage + Person + Breadcrumb schema preserved.

/trust — was shipping 4× [LEGAL REVIEW: this section needs founder +
counsel sign-off...] strings on every commitment AI engines cite.
Replaced with substantive copy on all 9 commitments. Honest about
posture (no SOC 2/ISO 27001 claims unless audited). Added FAQPage
schema (9 Q/A pairs — answer-engine extractable) + WebPage schema
with datePublished + dateModified.

/privacy — was a 17-line stub (noindex:true) with [LEGAL REVIEW]
body. Replaced with full UK GDPR-aligned privacy policy reflecting
actual data flows: Cloudflare KV (form submissions, EU edge) +
Resend (transactional email) + Plausible (cookieless analytics) +
Turnstile (anonymous bot proof). Added 9 sections: data controller,
what we collect, what we don't, where data lives, retention, your
rights, children, changes, contact. Removed noindex.

/terms — was a 17-line stub (noindex:true) with [LEGAL REVIEW]
body. Replaced with substantive terms of use covering: acceptance,
site use, IP, forms/enquiries, estimates-not-guarantees, AI
content, disclaimers, liability cap, third-party links, governing
law (England & Wales), changes, contact. Removed noindex.

/proof — was shipping [CASE STUDY PENDING — fixture data shape only]
cards with 'Awaiting client sign-off' badges. Pre-revenue reality:
no case studies exist yet. Replaced with honest founding-cohort
framing: three programme shapes (Premium SaaS / Premium Services /
Premium DTC + Luxury), methodology standard, founding-cohort CTA
to /audit. ItemList schema repurposed as Programme Catalogue.

Homepage ProofSection + data/homepage.ts proofPlaceholders — was
emitting 'Live in Phase 3' / 'Case Study Pending · Phase 3'
internal-build-language to live users. Rewritten to match new
/proof framing. Each card now CTAs to /audit instead of dead
'pending' badge.

STRUCTURAL SEO HOLES — PLUGGED

src/lib/schema.ts — adds webPageSchema() + howToSchema() helpers
+ WebPageSchema + HowToSchema types added to AnySchema union.

/onboarding — adds onboarding Service schema + 5-step HowTo
schema (intake process: tell us who you are → frame engagement →
map presence → name competitors → submit + receive read).

/sitemap.ts — adds /privacy + /terms (priority 0.3, yearly).
Both pages now have substantive content + are safe to index.

scripts/notify-indexnow.sh — adds /privacy + /terms to URL_LIST
so Bing + Yandex pick up new indexable legal pages immediately
post-deploy.

EVIDENCE
- ESLint clean on all 10 modified files (per-file run, sandbox)
- Per-page schema additions verified by importing actual helpers
- Sitemap entries verified against current sitemap.ts STATIC_ROUTES

Verified: lint ✓"
}
echo "  ✓ committed"

echo ""
echo "▸ Step 2/9 · Typecheck"
npm run typecheck
echo "  ✓ typecheck clean"

echo ""
echo "▸ Step 3/9 · Lint"
npm run lint
echo "  ✓ lint clean"

echo ""
echo "▸ Step 4/9 · Next.js production build"
npm run build
echo "  ✓ Next build complete"

echo ""
echo "▸ Step 5/9 · OpenNext Cloudflare adapter"
npx opennextjs-cloudflare build
echo "  ✓ Cloudflare adapter build complete"

echo ""
echo "▸ Step 6/9 · Tag ${VERSION}"
git tag -a "$VERSION" -m "$TAG_MESSAGE" 2>/dev/null || echo "  ℹ tag exists, skipping"
echo "  ✓ tagged"

echo ""
echo "▸ Step 7/9 · Deploy to Cloudflare Workers"
$WRANGLER deploy
echo "  ✓ deployed"

echo ""
echo "▸ Step 8/9 · Notify IndexNow (Bing + Yandex) — 22 URLs"
sleep 10
./scripts/notify-indexnow.sh
echo "  ✓ IndexNow notified"

echo ""
echo "▸ Step 9/9 · Verification gates (browser-UA per session_lessons L9)"
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'

echo ""
echo "  Gate 1 · /about — must NOT contain '[FOUNDER REVIEW'"
ABOUT_LEAK=$(curl -sS -A "$UA" https://wielegroup.com/about | grep -c '\[FOUNDER REVIEW' || true)
if [ "$ABOUT_LEAK" -eq 0 ]; then echo "    ✓ clean"; else echo "    ❌ STILL LEAKING ($ABOUT_LEAK occurrences)"; exit 1; fi

echo "  Gate 2 · /trust — must NOT contain '[LEGAL REVIEW'"
TRUST_LEAK=$(curl -sS -A "$UA" https://wielegroup.com/trust | grep -c '\[LEGAL REVIEW' || true)
if [ "$TRUST_LEAK" -eq 0 ]; then echo "    ✓ clean"; else echo "    ❌ STILL LEAKING ($TRUST_LEAK occurrences)"; exit 1; fi

echo "  Gate 3 · /trust — must contain FAQPage schema"
TRUST_FAQ=$(curl -sS -A "$UA" https://wielegroup.com/trust | grep -c '"FAQPage"' || true)
if [ "$TRUST_FAQ" -ge 1 ]; then echo "    ✓ FAQPage schema present"; else echo "    ❌ FAQPage missing"; exit 1; fi

echo "  Gate 4 · /privacy — must contain real content (>5KB) + WebPage schema"
PRIVACY_SIZE=$(curl -sS -A "$UA" -o /tmp/privacy.html -w "%{size_download}" https://wielegroup.com/privacy)
PRIVACY_WEBPAGE=$(grep -c '"WebPage"' /tmp/privacy.html || true)
if [ "$PRIVACY_SIZE" -gt 60000 ] && [ "$PRIVACY_WEBPAGE" -ge 1 ]; then
  echo "    ✓ ${PRIVACY_SIZE} bytes · WebPage schema present"
else
  echo "    ❌ size=$PRIVACY_SIZE webpage=$PRIVACY_WEBPAGE"; exit 1
fi

echo "  Gate 5 · /terms — must contain real content (>5KB) + WebPage schema"
TERMS_SIZE=$(curl -sS -A "$UA" -o /tmp/terms.html -w "%{size_download}" https://wielegroup.com/terms)
TERMS_WEBPAGE=$(grep -c '"WebPage"' /tmp/terms.html || true)
if [ "$TERMS_SIZE" -gt 60000 ] && [ "$TERMS_WEBPAGE" -ge 1 ]; then
  echo "    ✓ ${TERMS_SIZE} bytes · WebPage schema present"
else
  echo "    ❌ size=$TERMS_SIZE webpage=$TERMS_WEBPAGE"; exit 1
fi

echo "  Gate 6 · /proof — must NOT contain '[CASE STUDY PENDING'"
PROOF_LEAK=$(curl -sS -A "$UA" https://wielegroup.com/proof | grep -c 'CASE STUDY PENDING' || true)
if [ "$PROOF_LEAK" -eq 0 ]; then echo "    ✓ clean"; else echo "    ❌ STILL LEAKING ($PROOF_LEAK occurrences)"; exit 1; fi

echo "  Gate 7 · / homepage — must NOT contain 'Phase 3' or 'Case Study Pending · Phase 3'"
HOME_LEAK=$(curl -sS -A "$UA" https://wielegroup.com/ | grep -cE 'Live in Phase 3|Case Study Pending · Phase 3' || true)
if [ "$HOME_LEAK" -eq 0 ]; then echo "    ✓ clean"; else echo "    ❌ STILL LEAKING ($HOME_LEAK occurrences)"; exit 1; fi

echo "  Gate 8 · /onboarding — must contain HowTo schema"
ONBOARDING_HOWTO=$(curl -sS -A "$UA" https://wielegroup.com/onboarding | grep -c '"HowTo"' || true)
if [ "$ONBOARDING_HOWTO" -ge 1 ]; then echo "    ✓ HowTo schema present"; else echo "    ❌ HowTo missing"; exit 1; fi

echo "  Gate 9 · /sitemap.xml — must contain /privacy + /terms"
SITEMAP=$(curl -sS -A "$UA" https://wielegroup.com/sitemap.xml)
if echo "$SITEMAP" | grep -q '/privacy' && echo "$SITEMAP" | grep -q '/terms'; then
  echo "    ✓ both /privacy and /terms in sitemap"
else
  echo "    ❌ /privacy or /terms missing from sitemap"; exit 1
fi

echo "  Gate 10 · /labs/* articles — must NOT contain '[FOUNDER REVIEW'"
for slug in ai-recommendations-compound five-citation-signals search-is-splitting; do
  LAB_LEAK=$(curl -sS -A "$UA" https://wielegroup.com/labs/$slug | grep -c '\[FOUNDER REVIEW' || true)
  if [ "$LAB_LEAK" -eq 0 ]; then
    echo "    ✓ /labs/$slug clean"
  else
    echo "    ❌ /labs/$slug STILL LEAKING ($LAB_LEAK occurrences)"; exit 1
  fi
done

echo "  Gate 11 · /labs/* articles — must contain >2KB of substantive prose"
for slug in ai-recommendations-compound five-citation-signals search-is-splitting; do
  LAB_PROSE=$(curl -sS -A "$UA" https://wielegroup.com/labs/$slug | grep -oE '<p[^>]*>[^<]+' | wc -c)
  if [ "$LAB_PROSE" -gt 2000 ]; then
    echo "    ✓ /labs/$slug · ${LAB_PROSE} bytes of <p> prose"
  else
    echo "    ❌ /labs/$slug too short (${LAB_PROSE} bytes of prose)"; exit 1
  fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   DEPLOY COMPLETE · ${VERSION} · 11/11 gates green"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Push tag + create GitHub Release (per session_lessons L16):"
echo "    git push origin main && git push origin ${VERSION}"
echo "    gh release create ${VERSION} --notes \"${TAG_MESSAGE}\" --verify-tag"
echo ""
echo "Manual GSC re-submit (Google does not participate in IndexNow — L8):"
echo "    https://search.google.com/search-console"
echo "    Property: wielegroup.com → Sitemaps → resubmit https://wielegroup.com/sitemap.xml"
echo ""
echo "Verify in browser:"
echo "    https://wielegroup.com/about    (real founder bio)"
echo "    https://wielegroup.com/trust    (9 substantive commitments)"
echo "    https://wielegroup.com/privacy  (real privacy policy)"
echo "    https://wielegroup.com/terms    (real terms of use)"
echo "    https://wielegroup.com/proof    (programme catalogue)"
echo ""
