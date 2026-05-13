# CLAUDE CODE DIRECTIVE — XRAY L99 RESTORATION (v3.8.0)
**Issued:** 2026-05-10 by Cowork operator on behalf of Founder · **Authority:** Full repo + Cloudflare deploy
**Repo:** `~/Documents/Claude/Projects/Wiele Group Operations/wielegroup.com` (branch `main`)
**Tag on completion:** `v3.8.0-xray-l99-restoration`

---

## CONTEXT (read fully before any action)

Cowork ran a full ecosystem `/XRAY` at L99 standard on 2026-05-10. Findings (full report at `_OPERATIONS/XRAY_2026-05-10.md` + 70-URL list at `_OPERATIONS/XRAY_404_LIST_2026-05-10.md`):

- **GSC:** 131 not-indexed vs 54 indexed (71%). Reasons:
  - 70 × Not found (404) — legacy URLs from prior site versions
  - 24 × Alternative page with proper canonical tag — apex/www war
  - 19 × Page with redirect (expected 308s)
  - 11 × Discovered – currently not indexed (fresh-site lag)
  - 4 × Excluded by 'noindex' tag
- **Bing:** site `https://www.wielegroup.com/` UNVERIFIED 11 days
- **Cloudflare workers (7 d):** 1,215 ok / 28 exceededCpu / 2 canceled. CPU kills evenly distributed (4 each) across `/audit · /pricing · /platform · /systems · /marketing-agency · /advertising-agency · /brand-management-agency · /web-design-agency`. Free tier 10 ms CPU limit being breached on SSR brochure pages.
- **Live test:** `/audit` HTTP 000 / 30 s timeout under sequential load.
- **Other:** apex sitemap submitted to GSC alongside www (different counts), `/opengraph-image` route returns 404 (TypeError on prior version), no AI-bot directives in robots, `/llms.txt` missing, Person schema `sameAs` LinkedIn link missing on homepage, image alt coverage 4/8 (50%) on homepage.

This directive bundles 6 fixes in one PR + deploy + tag. Single deploy carries everything.

---

## DECISIONS (already made — execute, do not reopen)

1. **Canonical = apex `https://wielegroup.com`** (matches existing `Host:` directive in `robots.txt`)
2. **Bing verification = HTML META TAG** (bundled into this deploy, not CNAME)
3. **404 redirect strategy = Next.js `redirects()` in `next.config.ts`** (in-repo, not Cloudflare bulk redirects, for git-tracked transparency)
4. **Brochure routes = `force-static` + `revalidate=3600`** (eliminate Worker CPU exceed, $0 cost)
5. **`/opengraph-image` route = DELETE** (broken; static `/og-image.png` already serves as fallback in OG meta)

---

## EXECUTION (sequential)

### STEP 0 · Pre-flight

```bash
cd ~/Documents/Claude/Projects/Wiele\ Group\ Operations/wielegroup.com
git status                       # confirm clean
git pull origin main             # confirm tip
git checkout -b xray-l99-2026-05-10
node --version                   # expect v24+
npm install                      # confirm deps
```

### STEP 1 · APEX CANONICAL LOCK

**1.1** — Update `next.config.ts`:
- Set `metadataBase: new URL('https://wielegroup.com')` (apex, no www)
- Add `redirects()` async function (see STEP 2 below — combine 404 + canonical redirects into single function)

**1.2** — Update `src/app/sitemap.ts`:
- Change all URL emissions to use `https://wielegroup.com` (apex, no www)
- Verify all 31 URLs use apex base

**1.3** — Update `src/app/robots.ts`:
- Confirm `host: 'https://wielegroup.com'` (already set per audit — verify, do not regress)
- Confirm sitemap line: `sitemap: 'https://wielegroup.com/sitemap.xml'`

**1.4** — Search-and-replace `https://www.wielegroup.com` → `https://wielegroup.com` across:
- `src/app/**/*.tsx` (page files, layouts, OG image config)
- `src/lib/seo.ts` or wherever canonical helpers live
- All structured data JSON-LD blocks
- `public/llms.txt` (creating in STEP 4)

**1.5** — Verify `metadata` export in `src/app/layout.tsx` uses apex canonical for `alternates.canonical` and `openGraph.url`.

### STEP 2 · 70 × 404 REDIRECT MAP + WWW→APEX 301

In `next.config.ts`, build the `redirects()` function. Combines:

**2A · WWW → APEX (catch-all, permanent 301)**
```ts
{
  source: '/:path*',
  has: [{ type: 'host', value: 'www.wielegroup.com' }],
  destination: 'https://wielegroup.com/:path*',
  permanent: true,
}
```

**2B · Legacy URL redirects (70 entries, grouped)** — paste full table from `~/Documents/Claude/Projects/Wiele Group Operations/_OPERATIONS/XRAY_404_LIST_2026-05-10.md` sections B–I. Use wildcards for `/enterprise/*`, `/catalyst/*`, `/sovereign/*`, `/engines/*`, `/blog/*`, `/fr/*`, `/de/*`, `/es/*`, `/nl/*`. Explicit rules for the 3 contact-with-querystring variants and one-offs.

Group structure:
```ts
async redirects() {
  return [
    // 2A: www → apex
    { source: '/:path*', has: [{ type: 'host', value: 'www.wielegroup.com' }], destination: 'https://wielegroup.com/:path*', permanent: true },

    // 2B-Group B: legacy product divisions
    { source: '/enterprise', destination: '/pricing#sovereign', permanent: true },
    { source: '/enterprise/:path*', destination: '/pricing#sovereign', permanent: true },
    { source: '/catalyst', destination: '/pricing', permanent: true },
    { source: '/catalyst/:path*', destination: '/pricing', permanent: true },
    { source: '/sovereign', destination: '/pricing#sovereign', permanent: true },
    { source: '/sovereign/:path*', destination: '/pricing#sovereign', permanent: true },

    // 2B-Group C: legacy services → /systems hub
    { source: '/service-seo', destination: '/systems/search', permanent: true },
    { source: '/service-geo', destination: '/systems/ai-visibility', permanent: true },
    { source: '/service-ledger', destination: '/systems', permanent: true },
    { source: '/services/authority', destination: '/systems/brand-authority', permanent: true },

    // 2B-Group D: engines → /platform
    { source: '/engines', destination: '/platform', permanent: true },
    { source: '/engines/:path*', destination: '/platform', permanent: true },

    // 2B-Group E: case pages → /case-studies
    { source: '/case-obelisk', destination: '/case-studies', permanent: true },
    { source: '/case-verdant', destination: '/case-studies', permanent: true },
    { source: '/case-northward-coe.html', destination: '/case-studies', permanent: true },
    { source: '/work.html', destination: '/case-studies', permanent: true },

    // 2B-Group F: legacy blog/labs → /labs
    { source: '/blog/:path*', destination: '/labs', permanent: true },
    { source: '/state-of-ai-search', destination: '/labs', permanent: true },
    { source: '/best-geo-agencies-2026', destination: '/labs', permanent: true },
    { source: '/chatgpt-seo', destination: '/labs', permanent: true },
    { source: '/chatgpt-seo-vs-traditional-seo', destination: '/labs', permanent: true },
    { source: '/claude-seo', destination: '/labs', permanent: true },
    { source: '/ai-search-seo', destination: '/labs', permanent: true },
    { source: '/geo', destination: '/systems/ai-visibility', permanent: true },
    { source: '/journal/:path*', destination: '/labs', permanent: true },

    // 2B-Group G: contact/audit unification → /audit
    { source: '/book-a-call', destination: '/audit', permanent: true },

    // 2B-Group H: i18n stubs → /
    { source: '/fr', destination: '/', permanent: true },
    { source: '/fr/:path*', destination: '/', permanent: true },
    { source: '/de', destination: '/', permanent: true },
    { source: '/de/:path*', destination: '/', permanent: true },
    { source: '/nl', destination: '/', permanent: true },
    { source: '/nl/:path*', destination: '/', permanent: true },
    { source: '/es', destination: '/', permanent: true },
    { source: '/es/:path*', destination: '/', permanent: true },
    { source: '/en', destination: '/', permanent: true },

    // 2B-Group I: misc one-offs
    { source: '/imprint', destination: '/', permanent: true },
    { source: '/essay/:path*', destination: '/case-studies', permanent: true },
  ];
},
```

**Note:** Next.js `redirects()` matches in order — put more-specific rules above wildcards. The `/enterprise/contact?subject=...` URLs from GSC carry query strings — Next.js redirects() ignore query strings on the source, but the destination preserves them. The bare path match `/enterprise/:path*` will catch `/enterprise/contact` regardless of query.

### STEP 3 · BING META TAG

Add to `src/app/layout.tsx` `metadata.other` (or in the `<head>` block):

```ts
metadata = {
  // ... existing
  other: {
    'msvalidate.01': '6392E5D05679A01E548B4F101B23B188',
  },
}
```

This emits `<meta name="msvalidate.01" content="6392E5D05679A01E548B4F101B23B188" />` in the `<head>` of every page.

### STEP 4 · `/llms.txt`

Create `public/llms.txt`:

```
# Wiele Group — AI/LLM-friendly site map
# https://wielegroup.com
# Updated: 2026-05-10

> Wiele Group — The premium agency engineered for compounding growth.
> Brand · marketing · web design · advertising · SEO · AI search optimization.
> Six disciplines, one operating system, engineered as one.
> Citation, not clicks.

## About
- Founder: Jonathan B. Landman (https://www.linkedin.com/in/jonathan-b-landman)
- Methodology: Map. Build. Compound.
- IP: Wiele OS · Five Compounding Systems · AI Visibility Defense

## Core pages
- Homepage: https://wielegroup.com/
- Diagnostic offer: https://wielegroup.com/audit
- Pricing & tiers: https://wielegroup.com/pricing
- Operating system: https://wielegroup.com/platform
- Five Compounding Systems: https://wielegroup.com/systems

## Systems
- AI visibility: https://wielegroup.com/systems/ai-visibility
- Search: https://wielegroup.com/systems/search
- Brand authority: https://wielegroup.com/systems/brand-authority
- Web experience: https://wielegroup.com/systems/web-experience

## Agency divisions
- Marketing: https://wielegroup.com/marketing-agency
- Advertising: https://wielegroup.com/advertising-agency
- Brand management: https://wielegroup.com/brand-management-agency
- Web design: https://wielegroup.com/web-design-agency

## Proof
- Case studies: https://wielegroup.com/case-studies
- Labs (frameworks · datasets · methodologies): https://wielegroup.com/labs

## Sitemap
- XML: https://wielegroup.com/sitemap.xml

## Contact
- Diagnostic / first contact: https://wielegroup.com/audit
```

### STEP 5 · WORKER CPU FIX — `force-static` ON 8 BROCHURE ROUTES

For each of these page files, add at the TOP of the file (after imports, before component):

```ts
export const dynamic = 'force-static';
export const revalidate = 3600; // 1 hour
```

Files to update:
- `src/app/audit/page.tsx`
- `src/app/pricing/page.tsx`
- `src/app/platform/page.tsx`
- `src/app/systems/page.tsx`
- `src/app/marketing-agency/page.tsx`
- `src/app/advertising-agency/page.tsx`
- `src/app/brand-management-agency/page.tsx`
- `src/app/web-design-agency/page.tsx`

If any of these files import server-only modules that block static export (e.g., dynamic Stripe price lookup at request time), refactor to fetch at build time using `generateStaticParams` or move dynamic data to a client component fetched after hydration.

### STEP 6 · DELETE `/opengraph-image` ROUTE

```bash
rm src/app/opengraph-image.tsx 2>/dev/null || true
rm src/app/opengraph-image.* 2>/dev/null || true
# also check for nested route variants
find src/app -name 'opengraph-image*' -delete
```

The static `public/og-image.png` (referenced in `metadata.openGraph.images`) handles OG correctly already.

### STEP 7 · AI-BOT DIRECTIVES IN `robots.ts`

Update `src/app/robots.ts`:

```ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Universal default
      { userAgent: '*', allow: '/', disallow: '/api/' },

      // Explicit AI bot welcome (per AEO/GEO doctrine)
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
    ],
    sitemap: 'https://wielegroup.com/sitemap.xml',
    host: 'https://wielegroup.com',
  };
}
```

### STEP 8 · PERSON SCHEMA `sameAs` LINKEDIN

Find homepage Person JSON-LD (likely in `src/app/page.tsx` or `src/components/StructuredData.tsx`). Update Person object:

```ts
{
  '@type': 'Person',
  name: 'Jonathan B. Landman',
  jobTitle: 'Founder',
  worksFor: { '@type': 'Organization', name: 'Wiele Group' },
  sameAs: ['https://www.linkedin.com/in/jonathan-b-landman'],
  url: 'https://wielegroup.com',
}
```

If a `sameAs` array already exists and contains other URLs (X, GitHub, etc.), prepend the LinkedIn URL — do not replace.

### STEP 9 · IMAGE ALT COVERAGE 100% ON HOMEPAGE

Audit `src/app/page.tsx` and any homepage components for `<Image>` or `<img>` tags. Every image must have non-empty alt text following the format from `feedback_image_file_naming_seo_law.md`:

- Filename pattern: `wiele-{topic}-{angle}-{context}.{ext}`
- Alt text: 80–125 chars, descriptive, includes "Wiele" if brand-relevant, includes context

If any decorative/icon images exist, mark them `alt=""` (empty intentional) and add `aria-hidden="true"` rather than missing alt entirely.

### STEP 10 · BUILD + LOCAL VERIFY

```bash
npm run build:cf
# expect: Next build success + opennextjs-cloudflare build success
# expect: no warnings about dynamic rendering on the 8 force-static routes
```

Local sanity check:
```bash
grep -r 'wielegroup.com' src/ public/ | grep -v 'https://wielegroup.com' | grep -v 'www\\\.' || echo "all canonical refs are apex"
```

### STEP 11 · DEPLOY

```bash
npx wrangler deploy
# expect: Worker version uploaded, version ID printed
# capture version ID
```

### STEP 12 · POST-DEPLOY GATES (curl-verified, all must pass)

```bash
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15'

# Gate 1: WWW redirects to APEX (301)
curl -sI -A "$UA" https://www.wielegroup.com/ | grep -E '^HTTP|^location' | head -2
# expect: HTTP/2 301 + location: https://wielegroup.com/

# Gate 2: APEX 200 with content
curl -sI -A "$UA" https://wielegroup.com/ | head -3
# expect: HTTP/2 200

# Gate 3: All 8 brochure routes return 200 sub-300ms (force-static cache hit)
for path in /audit /pricing /platform /systems /marketing-agency /advertising-agency /brand-management-agency /web-design-agency; do
  curl -sI -m 8 -A "$UA" -o /dev/null -w "%{http_code} ttfb=%{time_starttransfer}s  $path\\n" "https://wielegroup.com$path"
done
# expect: ALL 200, ALL ttfb <0.5s

# Gate 4: Spot-check 5 legacy URLs return 301
for url in /enterprise /catalyst /sovereign /service-seo /book-a-call; do
  curl -sI -A "$UA" "https://wielegroup.com$url" | grep -E '^HTTP|^location' | head -2
done
# expect: HTTP 301 + location header for each

# Gate 5: /opengraph-image is gone (404 or absent)
curl -sI -A "$UA" https://wielegroup.com/opengraph-image | head -2
# expect: HTTP/2 404 (route deleted, static og-image.png remains)

# Gate 6: /llms.txt accessible
curl -sI -A "$UA" https://wielegroup.com/llms.txt | head -2
# expect: HTTP/2 200

# Gate 7: Bing meta tag in homepage
curl -s -A "$UA" https://wielegroup.com/ | grep -oE 'msvalidate\\.01[^>]+' | head -1
# expect: msvalidate.01" content="6392E5D05679A01E548B4F101B23B188"

# Gate 8: AI bots in robots.txt
curl -s -A "$UA" https://wielegroup.com/robots.txt | grep -iE 'GPTBot|ClaudeBot|PerplexityBot' | head -5
# expect: at least 3 lines matching

# Gate 9: Sitemap on apex, count = 31
curl -s -A "$UA" https://wielegroup.com/sitemap.xml | grep -oE '<loc>[^<]+</loc>' | wc -l
# expect: 31

# Gate 10: All sitemap URLs use apex (no www in any <loc>)
curl -s -A "$UA" https://wielegroup.com/sitemap.xml | grep -oE 'https://www\\.' | wc -l
# expect: 0
```

### STEP 13 · INDEXNOW NOTIFY + CACHE WARM

```bash
sleep 10  # CF edge propagation
./scripts/notify-indexnow.sh
# expect: 200 or 202 from api.indexnow.org

# Warm cache on hot routes
for path in / /audit /pricing /platform /systems /marketing-agency /advertising-agency /brand-management-agency /web-design-agency /labs /case-studies; do
  curl -s -A "$UA" -o /dev/null -w "%{http_code} $path\\n" "https://wielegroup.com$path"
done
```

### STEP 14 · GIT COMMIT + TAG + PUSH

```bash
git add -A
git commit -m "v3.8.0 XRAY L99 restoration

- Lock canonical to apex (wielegroup.com); www→apex 301
- Add 70-URL legacy redirect map (next.config.ts redirects)
- Mark 8 brochure routes force-static + revalidate=3600 (kills CF Free CPU exceed)
- Delete /opengraph-image route (static fallback works)
- Bing Webmaster meta tag (msvalidate.01)
- /llms.txt for LLM-friendly site map
- AI-bot allow directives in robots.txt (GPTBot, ClaudeBot, PerplexityBot, +9 more)
- Person JSON-LD sameAs LinkedIn
- Homepage image alt 100%

Founder directive: ecosystem XRAY L99 restoration 2026-05-10."

git push origin xray-l99-2026-05-10
gh pr create --title "v3.8.0 — XRAY L99 restoration" --body "See CLAUDE_CODE_DIRECTIVE_XRAY_L99_2026-05-10.md" --base main
gh pr merge --squash --delete-branch
git checkout main && git pull origin main
git tag v3.8.0-xray-l99-restoration
git push origin refs/tags/v3.8.0-xray-l99-restoration
```

---

## SUCCESS CRITERIA (L99)

ALL of:
- [ ] Build succeeds with no errors and no warnings about dynamic rendering on the 8 force-static routes
- [ ] All 10 post-deploy gates pass (Gate 1-10 in STEP 12)
- [ ] Worker observability shows ZERO `exceededCpu` events in the 1 hour after deploy (verify via Cloudflare MCP `query_worker_observability`)
- [ ] `/audit` consistent 200 with ttfb <300 ms across 5 sequential cold-cache checks
- [ ] IndexNow returns 200/202

If any gate fails: fix-forward, do not escalate. The directive Owner (Cowork operator) will run a verification sweep post-deploy.

---

## ROLLBACK

If post-deploy gates 1-3 fail catastrophically:
```bash
# Revert to last known good
git revert HEAD --no-edit
git push origin main
npx wrangler deploy
./scripts/notify-indexnow.sh
```

Last known good tag (per memory): `v3.7.5-proof-hero-archetypes` (2026-05-09 PM, audit-clean).

---

## OUT OF SCOPE FOR THIS DIRECTIVE

- Stripe back-office cleanup — already done by Cowork operator (10 zombie products archived 2026-05-10)
- GSC sitemap removal of non-canonical — Cowork operator will do post-deploy via Chrome MCP
- Bing "Verify" click — Cowork operator will do post-deploy via Chrome MCP after meta tag is live

---

## REPORT BACK FORMAT

After deploy, append to `~/Documents/Claude/Projects/Wiele Group Operations/_OPERATIONS/XRAY_2026-05-10.md`:

```
## Phase 1A + 1B + 1C + 2 + 3 — Claude Code execution complete
- Tag: v3.8.0-xray-l99-restoration
- Commit: <SHA>
- CF version: <version-id>
- All 10 gates: PASS / FAIL details
- Worker observability post-deploy 1h: <exceededCpu count>
- Time elapsed: <minutes>
```

---

**Founder authority granted. Execute.**
