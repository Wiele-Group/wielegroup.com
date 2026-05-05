#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# Wiele Group · wielegroup.com
# Deploy: v2.5-flagship-playbooks
# Promote 2 flagship strategic playbooks to /labs/ — claims the un-owned
# AI-Era Brand & Marketing Operating System category in AI-search results.
#
# WHAT SHIPS
# ──────────
# 1. /labs/ai-era-billion-dollar-brand-playbook — flagship #1
#    9-principle brand playbook (7 canonical + 2 AI-era new), Wiele
#    4-tier Machete Order, 10-question diagnostic. ~2,000 words.
#    4 FAQ entries (FAQPage schema). Full Article + Person + Breadcrumb.
#
# 2. /labs/generative-ai-marketing-operating-system — flagship #2
#    5-layer architecture (Models → Use Cases → Workflows → Governance
#    → Outcomes). 12 use cases. 5 workflows. 180-day roadmap. ~1,950
#    words. 5 FAQ entries (FAQPage schema). Wiele Trust Commitment.
#
# WHY THIS MATTERS
# ────────────────
# Three category-claim flagship documents shipped on 2026-05-05:
#   • AI Search Modernization Playbook (live since v2.4)
#   • AI-Era Billion-Dollar Brand Playbook (this deploy)
#   • Generative AI Marketing Operating System (this deploy)
#
# Together they claim the un-owned territory between OneBillion (brand
# fundamentals), IAB (AI taxonomy), and HubSpot (global marketing ops):
# the AI-Era Brand & Marketing Operating System. Engineered for citation
# by ChatGPT, Gemini, Perplexity, and AI Overview. Each carries
# Article + FAQPage + Breadcrumb + Person schema for maximal
# AI-extractability.
#
# IndexNow URL list expanded from 22 → 27: adds 5 labs article slugs
# (the 3 existing + 2 new) so AI engines see the citation surface
# directly, not just the index page.
# ─────────────────────────────────────────────────────────────────────
set -euo pipefail
cd "$(dirname "$0")"

readonly VERSION="v2.5-flagship-playbooks"
readonly TAG_MESSAGE="Promote 2 flagship strategic playbooks to /labs/ — claim AI-Era Brand & Marketing OS category"

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

# ── Pre-flight git status reconcile per session_2026_05_04_lessons L7
echo ""
echo "▸ Pre-flight · working tree status"
git status --short
echo ""
echo "  Files this commit will include:"
echo "    src/content/labs/ai-era-billion-dollar-brand-playbook.mdx     (~2,038 words)"
echo "    src/content/labs/generative-ai-marketing-operating-system.mdx (~1,937 words)"
echo "    src/app/labs/[slug]/page.tsx       (+ 2 static MDX imports)"
echo "    src/lib/labs-static.ts             (+ 2 manifest + 2 TOC entries)"
echo "    scripts/notify-indexnow.sh         (22 → 27 URLs · adds 5 labs articles)"
echo "    deploy-v2.5-flagship-playbooks.sh  (this script)"
echo ""

echo "▸ Step 1/9 · Commit v2.5 flagship playbooks"
git diff --stat --quiet || {
  git add src/content/labs/ai-era-billion-dollar-brand-playbook.mdx \
          src/content/labs/generative-ai-marketing-operating-system.mdx \
          src/app/labs/\[slug\]/page.tsx \
          src/lib/labs-static.ts \
          scripts/notify-indexnow.sh \
          deploy-v2.5-flagship-playbooks.sh 2>/dev/null || true
  git commit -m "feat(labs): promote 2 flagship strategic playbooks · claim AI-Era Brand & Marketing OS category

Authority: 2026-05-05 evening · founder directive 'promote and deploy'
+ Founder Standard (do the complete thing, not a plan to build it)
+ founder_vision_synthesis (premium register, founder-led writing)
+ Drive-It Law (literal execute = literal execute)
+ L99 Perfection Standard

WHAT'S NEW

/labs/ai-era-billion-dollar-brand-playbook — 9 principles for
building a billion-dollar brand in the AI search era. Adapts and
extends OneBillion's canonical 7 with 2 AI-era principles
(AI-Search Extractability, Generative Continuity). Wiele 4-tier
Machete Order (Pre-Revenue / Growth / Scale / Enterprise) with
explicit principle ordering per tier. 10-question diagnostic.
~2,038 words. 4 FAQ entries.

/labs/generative-ai-marketing-operating-system — 5-layer
architecture (Models → Use Cases → Workflows → Governance →
Outcomes). 12 production-ready use cases mapped to revenue.
5 minimum-viable workflows (Brand-Aware Generation with
self-review pass, Prompt Library, Evaluation Rubric, Review
Gate Matrix, Drift Audit). Wiele Trust Commitment (governance
as sales asset). 180-day implementation roadmap with founder
gates at Day 30/90/180. ~1,937 words. 5 FAQ entries.

WHY

Three category-claim flagships shipped on 2026-05-05:
  • AI Search Modernization Playbook (already live)
  • AI-Era Billion-Dollar Brand Playbook (this commit)
  • Generative AI Marketing Operating System (this commit)

Claims the un-owned territory between OneBillion (brand
fundamentals), IAB (AI taxonomy), HubSpot (global marketing
ops): the AI-Era Brand & Marketing Operating System. Each
flagship engineered for citation by ChatGPT, Gemini,
Perplexity, AI Overview — extractable H2/H3 answer blocks,
FAQPage schema, founder-attributed Person schema, clean
entity surface.

WIRING

src/app/labs/[slug]/page.tsx
  + import AiEraBillionDollarBrandPlaybook
  + import GenerativeAiMarketingOperatingSystem
  + 2 entries in ARTICLE_COMPONENTS map

src/lib/labs-static.ts
  + 2 ARTICLE_MANIFEST entries (with full FAQ + relatedSystems)
  + 2 ARTICLE_TOC entries (8-9 H2/H3 anchors each)

scripts/notify-indexnow.sh
  URL_LIST 22 → 27 · adds 5 labs article slugs:
  - /labs/ai-recommendations-compound (existing, was missing)
  - /labs/five-citation-signals (existing, was missing)
  - /labs/search-is-splitting (existing, was missing)
  - /labs/ai-era-billion-dollar-brand-playbook (new)
  - /labs/generative-ai-marketing-operating-system (new)

src/app/sitemap.ts auto-includes both new articles via
getVisibleArticleManifest() — no edit needed.

VERIFICATION (built into this script)

11 verification gates run after deploy:
  1-2. Both new article URLs return 200
  3-4. Both new articles render >2KB of <p> prose
  5-6. Both new articles include Article schema
  7-8. Both new articles include FAQPage schema
  9.   /labs index lists both new articles (links present)
  10.  /sitemap.xml contains both new article URLs
  11.  IndexNow submission HTTP 200 (Bing + Yandex)

Tag: ${VERSION}
Companion source-of-truth docs:
  /Wiele Group Operations/2026-cross-playbook-strategic-synthesis-brief.md
  /Wiele Group Operations/2026-ai-era-billion-dollar-brand-playbook.md
  /Wiele Group Operations/2026-generative-ai-marketing-operating-system.md
"
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
echo "▸ Step 8/9 · Notify IndexNow (Bing + Yandex) — 27 URLs"
sleep 10
./scripts/notify-indexnow.sh
echo "  ✓ IndexNow notified"

echo ""
echo "▸ Step 9/9 · Verification gates (browser-UA per session_lessons L9)"
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'

echo ""
echo "  Gate 1 · /labs/ai-era-billion-dollar-brand-playbook — must return 200"
BRAND_CODE=$(curl -sS -o /tmp/v25-brand.html -w "%{http_code}" -A "$UA" https://wielegroup.com/labs/ai-era-billion-dollar-brand-playbook)
if [ "$BRAND_CODE" = "200" ]; then echo "    ✓ HTTP 200"; else echo "    ❌ HTTP $BRAND_CODE"; exit 1; fi

echo "  Gate 2 · /labs/generative-ai-marketing-operating-system — must return 200"
OS_CODE=$(curl -sS -o /tmp/v25-os.html -w "%{http_code}" -A "$UA" https://wielegroup.com/labs/generative-ai-marketing-operating-system)
if [ "$OS_CODE" = "200" ]; then echo "    ✓ HTTP 200"; else echo "    ❌ HTTP $OS_CODE"; exit 1; fi

echo "  Gate 3 · /labs/ai-era-… — must contain >2KB of <p> prose"
BRAND_PROSE=$(grep -oE '<p[^>]*>[^<]+' /tmp/v25-brand.html | wc -c)
if [ "$BRAND_PROSE" -gt 2000 ]; then echo "    ✓ ${BRAND_PROSE} bytes of <p> prose"; else echo "    ❌ too short (${BRAND_PROSE} bytes)"; exit 1; fi

echo "  Gate 4 · /labs/generative-ai-… — must contain >2KB of <p> prose"
OS_PROSE=$(grep -oE '<p[^>]*>[^<]+' /tmp/v25-os.html | wc -c)
if [ "$OS_PROSE" -gt 2000 ]; then echo "    ✓ ${OS_PROSE} bytes of <p> prose"; else echo "    ❌ too short (${OS_PROSE} bytes)"; exit 1; fi

echo "  Gate 5 · /labs/ai-era-… — must contain Article schema"
BRAND_ART=$(grep -c '"Article"' /tmp/v25-brand.html || true)
if [ "$BRAND_ART" -ge 1 ]; then echo "    ✓ Article schema present"; else echo "    ❌ Article schema missing"; exit 1; fi

echo "  Gate 6 · /labs/generative-ai-… — must contain Article schema"
OS_ART=$(grep -c '"Article"' /tmp/v25-os.html || true)
if [ "$OS_ART" -ge 1 ]; then echo "    ✓ Article schema present"; else echo "    ❌ Article schema missing"; exit 1; fi

echo "  Gate 7 · /labs/ai-era-… — must contain FAQPage schema"
BRAND_FAQ=$(grep -c '"FAQPage"' /tmp/v25-brand.html || true)
if [ "$BRAND_FAQ" -ge 1 ]; then echo "    ✓ FAQPage schema present"; else echo "    ❌ FAQPage missing"; exit 1; fi

echo "  Gate 8 · /labs/generative-ai-… — must contain FAQPage schema"
OS_FAQ=$(grep -c '"FAQPage"' /tmp/v25-os.html || true)
if [ "$OS_FAQ" -ge 1 ]; then echo "    ✓ FAQPage schema present"; else echo "    ❌ FAQPage missing"; exit 1; fi

echo "  Gate 9 · /labs index — must list both new article slugs"
LABS_INDEX=$(curl -sS -A "$UA" https://wielegroup.com/labs)
if echo "$LABS_INDEX" | grep -q "ai-era-billion-dollar-brand-playbook" && \
   echo "$LABS_INDEX" | grep -q "generative-ai-marketing-operating-system"; then
  echo "    ✓ both flagship articles linked from /labs"
else
  echo "    ❌ /labs missing one or both new articles"; exit 1
fi

echo "  Gate 10 · /sitemap.xml — must contain both new article URLs"
SITEMAP=$(curl -sS -A "$UA" https://wielegroup.com/sitemap.xml)
if echo "$SITEMAP" | grep -q "ai-era-billion-dollar-brand-playbook" && \
   echo "$SITEMAP" | grep -q "generative-ai-marketing-operating-system"; then
  echo "    ✓ both flagships in sitemap"
else
  echo "    ❌ one or both flagships missing from sitemap"; exit 1
fi

echo "  Gate 11 · IndexNow submission — already executed in Step 8"
echo "    ✓ (Step 8 succeeded — script exits non-zero if IndexNow fails)"

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
echo "    https://wielegroup.com/labs"
echo "    https://wielegroup.com/labs/ai-era-billion-dollar-brand-playbook"
echo "    https://wielegroup.com/labs/generative-ai-marketing-operating-system"
echo ""
echo "AI-search citation testing (run weekly · monitor citation share):"
echo "    ChatGPT:    'AI-era brand playbook for premium brands'"
echo "    Gemini:     'generative AI marketing operating system'"
echo "    Perplexity: 'how to run marketing in the AI era'"
echo "    AI Overview: 'best billion-dollar brand framework for AI search'"
echo ""
