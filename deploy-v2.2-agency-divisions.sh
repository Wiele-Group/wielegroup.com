#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# Wiele Group · wielegroup.com
# Deploy: v2.2-agency-divisions
# Four agency division landing pages with B4 Chromaglass tier-coded
# accents, full pricing ladders, JSON-LD, and homepage wiring.
# ─────────────────────────────────────────────────────────────────────
set -euo pipefail
cd "$(dirname "$0")"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   WIELE GROUP · Deploy v2.2-agency-divisions"
echo "   /marketing-agency · /advertising-agency"
echo "   /brand-management-agency · /web-design-agency"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Pre-flight (3-tier wrangler resolution — same as v2.1+)
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
  echo "❌ wrangler not found — install: npm i -g wrangler  OR  npm install"
  exit 1
fi
echo "  using wrangler: $WRANGLER"

echo ""
echo "▸ Step 1/7 · Commit v2.2 division pages"
git diff --stat --quiet || {
  git add src/data/divisions.ts \
          src/data/homepage.ts \
          src/data/nav.ts \
          src/components/sections/division-page.tsx \
          src/components/sections/disciplines-section.tsx \
          src/app/marketing-agency/page.tsx \
          src/app/advertising-agency/page.tsx \
          src/app/brand-management-agency/page.tsx \
          src/app/web-design-agency/page.tsx \
          src/app/sitemap.ts \
          deploy-v2.2-agency-divisions.sh 2>/dev/null || true
  git commit -m "feat(v2.2): four agency division landing pages

Authority: project_agency_division_pages_v1.md (founder spec 2026-05-03)
+ Brand v2 B4 Chromaglass tier-coded accent rules.

NEW ROUTES
- /marketing-agency       (accent: blue   — intelligence, systems)
- /advertising-agency     (accent: coral  — craft, demand)
- /brand-management-agency (accent: chrome — precision, authority)
- /web-design-agency      (accent: duality — both forces)

Each page: hero (B4 tier-coded eyebrow + CTA) → 6 services grid →
3-tier sub-pricing ladder (with featured tier on duality-border) →
3 FAQs (Accordion) → CTASection. All consume shared <DivisionPage>.

DATA
- src/data/divisions.ts: NEW. 4 divisions × {hero, 6 services, 3 tiers,
  3 faqs, seo}. Single source of truth; type-safe; getDivisionBySlug().
- src/data/homepage.ts: split legacy 'Brand Design & Marketing' card
  into Brand Management + Marketing → 6 disciplines, each with href to
  their landing page or systems page.
- src/data/nav.ts: NEW 'Agency' footer column with all 4 division links.

COMPONENTS
- src/components/sections/division-page.tsx: NEW shared shell. Accent
  system (blue/coral/chrome/duality) drives hero eyebrow color, capability
  dot, FAQ eyebrow, divider variant, hero CTA variant.
- src/components/sections/disciplines-section.tsx: 6 cards (was 5),
  cards become clickable Next.js Links with arrow-up-right indicator,
  chrome-card hover (B4) replaces glass-strip variants. Removed B3
  variant array; cleaner consume of B4 system.

PAGES (4)
- Each page consumes DivisionPage + emits 4 JSON-LD schemas:
  breadcrumb · service · faq · 3× product (one per tier).
- buildMetadata wraps SEO title + description from data file.

SEO
- src/app/sitemap.ts: 4 new entries at priority 0.9 (division pages
  outrank /pricing 0.8 — they're the discipline anchors).

Verified: typecheck ✓ lint ✓
Tier accent rules per /Wiele Group Operations/brand-v2-B4-chromaglass.md."
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
echo "▸ Step 6/7 · Tag v2.2-agency-divisions"
git tag -a v2.2-agency-divisions -m "Four agency division landing pages with B4 Chromaglass" 2>/dev/null || echo "  ℹ tag exists, skipping"
echo "  ✓ tagged"

echo ""
echo "▸ Step 7/7 · Deploy to Cloudflare Workers"
$WRANGLER deploy
echo "  ✓ deployed"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   DEPLOY COMPLETE · v2.2-agency-divisions"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Push tag to remote:"
echo "    git push origin main && git push origin v2.2-agency-divisions"
echo ""
echo "Verification (browser UA required for Cloudflare Managed Challenge):"
echo ""
echo "Gate A — All 4 pages return 200:"
echo "    for path in marketing-agency advertising-agency brand-management-agency web-design-agency; do"
echo "      code=\$(curl -s -o /dev/null -w '%{http_code}' -A 'Mozilla/5.0 Chrome/121' https://wielegroup.com/\$path)"
echo "      echo \"\$code  /\$path\""
echo "    done"
echo "    Expect: 200 on all four"
echo ""
echo "Gate B — Tier accents present:"
echo "    curl -s -A 'Mozilla/5.0 Chrome/121' https://wielegroup.com/marketing-agency | grep -oc 'blue-core\\|tier-accent'"
echo "    curl -s -A 'Mozilla/5.0 Chrome/121' https://wielegroup.com/advertising-agency | grep -oc 'coral-core\\|tier-accent'"
echo "    Expect: > 0 each"
echo ""
echo "Gate C — JSON-LD schemas attached:"
echo "    curl -s -A 'Mozilla/5.0 Chrome/121' https://wielegroup.com/marketing-agency | grep -oc 'application/ld+json'"
echo "    Expect: 6 (breadcrumb + service + faq + 3 products)"
echo ""
echo "Gate D — Sitemap includes all 4:"
echo "    curl -s https://wielegroup.com/sitemap.xml | grep -E 'marketing-agency|advertising-agency|brand-management|web-design-agency' | wc -l"
echo "    Expect: 4"
echo ""
echo "Gate E — Homepage disciplines link to division pages:"
echo "    curl -s -A 'Mozilla/5.0 Chrome/121' https://wielegroup.com | grep -oE 'href=\"/(marketing|advertising|brand-management|web-design)-agency\"' | sort -u | wc -l"
echo "    Expect: 4"
echo ""
echo "Gate F — Footer has Agency column with all 4:"
echo "    curl -s -A 'Mozilla/5.0 Chrome/121' https://wielegroup.com | grep -oE 'href=\"/(marketing|advertising|brand-management|web-design)-agency\"' | wc -l"
echo "    Expect: >= 8 (4 in homepage disciplines + 4 in footer = 8 minimum, often more)"
echo ""
echo "After all gates PASS:"
echo "    Submit fresh sitemap to GSC + Bing"
echo ""
