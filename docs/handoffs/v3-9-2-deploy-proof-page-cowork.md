# v3.9.2 — Deploy `/proof` Page (Google's Own Proof)

**Type:** Cowork directive · Claude Code execution
**Authoring date:** 2026-05-13
**Target release tag:** `v3.9.2-proof-page`
**Estimated time:** 30–60 minutes
**Branch:** `main`
**Authority:** Founder GO 1.2.3 · 2026-05-13

---

## ROLE

You are Claude Code executing as Wiele's engineering operator. Single objective: ship `https://wielegroup.com/proof` as a live, indexable, AI-extractable page that hosts the "Google's Own Proof" sales artifact.

Operate per Wiele Operating Standard: STAKE × PRECISION × VELOCITY. Live-or-Nothing Law: nothing counts until curl returns 200 with the expected content. No-Repeat Conflict Law: clear all field-level state before push.

---

## CONTEXT

The "Google's Own Proof" asset cites 12 Google-published case studies (Saramin 2× · Jobrapido 3× · MX Player 3× · Monster India +94% · ZipRecruiter 4.5× conversion · Eventbrite +100% · Rakuten 1.5× · etc.) and uses verbatim Google quotes to displace 8 median-agency tactics.

Source HTML at `/Users/jonathanlandman/Documents/Claude/Projects/Wiele Group Operations/Sales/google-own-proof-2026-05-13.html` is the visual reference — Wiele brand colors (obsidian #141c2e + electric-blue #3b82f6/#5babff), Geist font, premium tone.

Target deployment: Next.js App Router page at `/proof` with full Wiele design system parity (uses existing tokens, NOT raw inline CSS).

This is a sales-conversion asset — it must rank, be AI-cited, and convert. Every brand token, schema property, and meta tag matters.

---

## TASK

Ship `/proof` as a production page with:

1. **Next.js App Router page** at `app/proof/page.tsx` using existing Wiele design system tokens (not the raw HTML inline styles from the source asset — match the rest of wielegroup.com).
2. **Brand parity** — obsidian background + electric-blue accent + Geist + same nav + footer + page-shell pattern as `/method`, `/work`, `/audit`.
3. **Full SEO + AEO/GEO stack** on the page (see schema requirements below).
4. **AI-maximization robots meta** explicitly set (this is the wedge — Wiele dogfoods the doctrine).
5. **Sitemap entry** with real git mtime via existing sitemap generator.
6. **IndexNow ping** on deploy (already wired per `reference_indexnow_setup.md`).
7. **OG image** — use existing brand-uniform OG generator (the v3.9.1 OG images handoff applies — pick the appropriate template variant).
8. **Curl verification** — 200 OK, expected H1 content, structured data validates in Rich Results Test.

---

## EXACT STEPS

### Step 1 — Read existing patterns first (Recon FIRST · per `feedback_recon_first_write_second.md`)

```bash
# Confirm Next.js structure
ls app/
# Find an existing "premium content" page to mirror — likely /method or /audit
cat app/method/page.tsx | head -50
cat app/audit/page.tsx | head -50
# Identify shared shell / nav / footer components
grep -rn "import.*Shell\|import.*Nav\|import.*Footer" app/proof.tsx 2>/dev/null || echo "no /proof exists yet — clean slate"
ls components/ | grep -i "shell\|nav\|footer\|hero\|table"
# Confirm CSS tokens
cat app/globals.css | grep -A3 "obsidian\|electric\|--brand"
# Confirm sitemap generator
ls app/sitemap.* 2>/dev/null || ls pages/sitemap.* 2>/dev/null || find . -maxdepth 3 -name "sitemap*"
```

Stop. Read the output. Confirm:
- Next.js App Router (not pages router)
- Existing page shell pattern (use that, don't invent)
- Existing nav + footer components (import them)
- CSS variable names for brand tokens (use them via Tailwind or styled-components, whichever Wiele uses)
- Sitemap generator (so the entry is auto-picked up)

If any of the above is missing or unclear, STOP and report back. Do not invent structure.

### Step 2 — Build `app/proof/page.tsx`

Page composition (replace placeholder component imports with Wiele's actual ones discovered in Step 1):

```tsx
import type { Metadata } from 'next'
// import Wiele's actual page shell + nav + footer
// import shared brand components (Hero, Table, MethodCards, CtaRow, Footer)

export const metadata: Metadata = {
  title: "Google's Own Proof — Wiele Group",
  description:
    "12 Google-published case studies prove structured data + AI-aware architecture produces measurable revenue. Wiele OS systematises the doctrine.",
  alternates: { canonical: 'https://wielegroup.com/proof' },
  openGraph: {
    title: "Google's Own Proof — Wiele Group",
    description:
      "12 Google-published case studies prove structured data + AI-aware architecture produces measurable revenue.",
    url: 'https://wielegroup.com/proof',
    siteName: 'Wiele Group',
    type: 'article',
    locale: 'en_GB',
    images: [
      {
        url: 'https://wielegroup.com/og/proof.png', // generate via existing OG pipeline
        width: 1200,
        height: 630,
        alt: "Wiele Group — Google's Own Proof. 12 Google-published case studies.",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Google's Own Proof — Wiele Group",
    description:
      "12 Google-published case studies prove structured data + AI-aware architecture produces measurable revenue.",
    images: ['https://wielegroup.com/og/proof.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

const caseStudies = [
  { company: 'Saramin', country: 'South Korea', industry: 'Jobs / Recruitment', result: '2× organic Search traffic', schema: 'Job Posting' },
  { company: 'Jobrapido', country: 'Italy', industry: 'Jobs / Aggregator', result: '3× organic traffic', schema: 'Job Posting' },
  { company: 'MX Player', country: 'India', industry: 'Video streaming', result: '3× organic traffic', schema: 'VideoObject' },
  { company: 'Monster India', country: 'India', industry: 'Jobs / Recruitment', result: '+94% organic traffic', schema: 'Job Posting' },
  { company: 'ZipRecruiter', country: 'USA', industry: 'Jobs / Recruitment', result: '4.5× conversion rate', schema: 'Job Posting' },
  { company: 'Eventbrite', country: 'USA', industry: 'Events / Ticketing', result: '+100% traffic boost', schema: 'Event' },
  { company: 'Rakuten', country: 'Japan', industry: 'Ecommerce', result: '1.5× time-on-site', schema: 'Ecommerce structured data + UX' },
  { company: 'Vidio', country: 'Indonesia', industry: 'Video streaming', result: 'Increased video clicks', schema: 'VideoObject' },
  { company: 'Vimeo', country: 'USA', industry: 'Video hosting', result: 'Improved Video SEO', schema: 'Video SEO features' },
  { company: 'Cross-Regional Publishers', country: 'Global', industry: 'News', result: 'Reach more audience', schema: 'Video SEO features' },
  { company: 'Multi-publisher Discover Study', country: 'Global', industry: 'News', result: 'Improved CTR + visits', schema: 'Large images in Google Discover' },
  { company: 'Wix', country: 'Global', industry: 'Website builder / SaaS', result: 'Generated user value', schema: 'Multiple Google APIs' },
]

const killedTactics = [
  { tactic: 'Meta keywords', quote: '"Has no effect on indexing and ranking at all."' },
  { tactic: 'AI mass content', quote: '"Scaled Content Abuse, no matter how it\'s created."' },
  { tactic: 'Parasite SEO on Forbes / HuffPost', quote: '"Site Reputation Abuse."' },
  { tactic: 'E-E-A-T as a ranking factor', quote: '"No, it\'s not."' },
  { tactic: 'AMP for ranking', quote: '"AMP itself isn\'t a ranking factor."' },
  { tactic: "'GEO infrastructure' / llms.txt / AI-specific schema", quote: '"No additional requirements… no special schema.org structured data."' },
  { tactic: 'Featured snippet "optimisation"', quote: '"You can\'t [mark a page as featured snippet]."' },
  { tactic: 'Guaranteed rankings', quote: '"No one can guarantee a #1 ranking on Google."' },
]

export default function ProofPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: "Google's Own Proof — 12 Case Studies",
    description:
      "12 Google-published case studies prove structured data + AI-aware architecture produces measurable revenue. Wiele OS systematises the doctrine.",
    image: ['https://wielegroup.com/og/proof.png'],
    datePublished: '2026-05-13T08:00:00+00:00',
    dateModified: '2026-05-13T08:00:00+00:00',
    author: [
      {
        '@type': 'Person',
        name: 'Jonathan Landman',
        url: 'https://wielegroup.com/about',
        sameAs: 'https://www.linkedin.com/in/jonathan-b-landman',
        jobTitle: 'Founder',
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: 'Wiele Group',
      url: 'https://wielegroup.com',
      logo: { '@type': 'ImageObject', url: 'https://wielegroup.com/brand/logo.png' },
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wielegroup.com' },
      { '@type': 'ListItem', position: 2, name: 'Proof' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* PAGE BODY — use Wiele's actual shell + components.
          Mirror the visual structure of the source HTML at
          /Documents/Claude/Projects/Wiele Group Operations/Sales/google-own-proof-2026-05-13.html
          Sections in order:
            1. Hero — "Google's Own Proof. Citation, not clicks."
            2. Lede paragraph
            3. Case studies table (12 rows from caseStudies above)
            4. Section heading: "What this means"
            5. Section heading: "Median agencies sell tactics Google has publicly killed."
               — bulleted list from killedTactics above
            6. Method grid — 3 cards: Map / Build / Compound
            7. CTA row — "Run the AI Visibility Audit" + "Read the Wiele OS Method"
            8. Footer (existing component)
          Use Wiele's existing typography scale + spacing tokens.
          DO NOT inline raw CSS — use Wiele design system. */}
    </>
  )
}
```

**Notes for the implementing operator:**
- Replace placeholder comments with Wiele's actual component imports.
- Use existing typography tokens (likely `text-display-1`, `text-h2`, `text-body-lg` etc. — discovered in Step 1).
- Use existing CTA button components.
- Use existing table component if one exists (e.g., `<DataTable>` or shadcn `<Table>`); otherwise build minimal accessible table with semantic `<table>` element.
- Tailwind spacing scale (or whatever Wiele uses — discover in Step 1).
- The example arrays (`caseStudies`, `killedTactics`) can stay inline as data — they're small and don't need separate files.

### Step 3 — Sitemap entry

If sitemap is generated dynamically (e.g., `app/sitemap.ts`), it should auto-pick up the new route. Confirm by:

```bash
grep -A20 "proof\|case-studies" app/sitemap.ts 2>/dev/null || echo "auto-discovery mode"
# If a manual array exists, add: { url: 'https://wielegroup.com/proof', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 }
```

If sitemap uses real git mtimes (per `feedback_sitemap_real_mtimes` doctrine from v3.9.0): the new file's mtime will be picked up automatically once committed.

### Step 4 — OG image

```bash
# Check OG generator (per v3.9.1 handoff)
ls public/og/ 2>/dev/null || ls scripts/og-gen* 2>/dev/null
```

If existing OG generator script exists, run it for the new page:
```bash
node scripts/generate-og.mjs --page=/proof --title="Google's Own Proof" --subtitle="12 Google-published case studies"
```

If no OG generator yet (v3.9.1 deferred): create `public/og/proof.png` as a 1200×630 PNG using the existing brand template — or use the v3.9.1 handoff brief at `docs/handoffs/v3-9-1-og-images-cowork.md` to ship both batches together.

### Step 5 — Build + preview

```bash
npm run build
npm run dev
# Open http://localhost:3000/proof in browser
# Verify: brand parity, all 12 case studies render, killed-tactics list complete, CTAs link to /audit and /method, footer present, mobile responsive
```

Stop. Visual QA against the source HTML at `/Sales/google-own-proof-2026-05-13.html`. Confirm parity (not pixel-perfect — design-system-consistent). Adjust if needed.

### Step 6 — Validate structured data

Before deploy, paste rendered page HTML into Rich Results Test (https://search.google.com/test/rich-results) — confirm:
- Article schema validates (no errors)
- BreadcrumbList schema validates (no errors)
- 0 warnings on required fields

### Step 7 — Commit + push + deploy

```bash
git checkout main
git pull
git status  # confirm clean before adding
git add app/proof/page.tsx public/og/proof.png
git commit -m "feat(proof): ship /proof — Google's Own Proof (12 case studies + verbatim killed tactics)"
git push origin main
# Wait for Cloudflare deploy to complete (check Workers Builds dashboard or wait ~2-3 min)
```

### Step 8 — Live verification (Live-or-Nothing Law)

```bash
# Use realistic UA (per feedback_directive_authoring_lessons_2026_05_07.md)
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15'

# Status check
curl -A "$UA" -s -o /dev/null -w "%{http_code}\n" https://wielegroup.com/proof
# Expect: 200

# Content check
curl -A "$UA" -s https://wielegroup.com/proof | grep -c "Saramin\|Jobrapido\|MX Player\|Monster India\|ZipRecruiter\|Eventbrite\|Rakuten"
# Expect: >= 7

# Structured data presence
curl -A "$UA" -s https://wielegroup.com/proof | grep -c "application/ld+json"
# Expect: >= 2 (Article + BreadcrumbList)

# Canonical
curl -A "$UA" -s https://wielegroup.com/proof | grep -c 'rel="canonical".*proof'
# Expect: 1

# Robots meta
curl -A "$UA" -s https://wielegroup.com/proof | grep -c 'max-snippet:-1.*max-image-preview:large'
# Expect: 1
```

ALL FIVE checks must pass. If any fail, fix before tagging release.

### Step 9 — Sitemap + IndexNow

```bash
# Sitemap should now include /proof
curl -A "$UA" -s https://wielegroup.com/sitemap.xml | grep -c "/proof"
# Expect: 1

# IndexNow ping (per reference_indexnow_setup.md)
curl -X POST "https://api.indexnow.org/IndexNow" \
  -H "Content-Type: application/json" \
  -d '{
    "host": "wielegroup.com",
    "key": "<INDEXNOW_KEY>",
    "keyLocation": "https://wielegroup.com/<INDEXNOW_KEY>.txt",
    "urlList": ["https://wielegroup.com/proof"]
  }'
# Expect: 200 OK
```

If IndexNow key + key-file already deployed (per v3.9.0), use the existing key value from environment or repo secrets.

### Step 10 — Submit URL Inspection to Google Search Console

Manual step for founder: open Search Console → URL Inspection → paste `https://wielegroup.com/proof` → click "Request indexing." This accelerates Google crawl beyond the IndexNow signal (Bing/Yandex covered by IndexNow; Google itself doesn't accept IndexNow).

### Step 11 — Tag release

```bash
git tag v3.9.2-proof-page
git push origin refs/tags/v3.9.2-proof-page
# Use explicit refs/tags/<tag> form per feedback_refspec_discipline_2026_05_09.md
```

Create GitHub release:
```bash
gh release create v3.9.2-proof-page \
  --title "v3.9.2 — /proof page shipped" \
  --notes "Ships Google's Own Proof page at /proof.

12 Google-published case studies (Saramin 2x, Jobrapido 3x, MX Player 3x, Monster India +94%, ZipRecruiter 4.5x conversion, Eventbrite +100%, Rakuten 1.5x, Vidio, Vimeo, Cross-Regional Publishers, Multi-publisher Discover, Wix).

Plus 8 verbatim Google quotes killing median-agency tactics (meta keywords, AI mass content, parasite SEO, E-E-A-T as ranking factor, AMP for ranking, GEO infrastructure pitches, featured snippet 'optimisation', guaranteed rankings).

Author Entity Chain shipped: Person schema with sameAs:linkedin.com/in/jonathan-b-landman + Article + BreadcrumbList + AI-maximisation robots meta.

Sales doctrine source: developers.google.com/search/case-studies (verified 2026-05-13)."
```

### Step 12 — Brief founder

Report back with:
- Production URL: `https://wielegroup.com/proof`
- All 5 curl verifications passed (paste status codes)
- Sitemap entry confirmed
- IndexNow ping response
- Release tag URL on GitHub
- Time to ship (target ≤60 min)

---

## VERIFICATION GATES (must pass before declaring shipped)

1. ✅ `curl /proof` returns 200 with realistic UA
2. ✅ Page content contains all 12 case studies
3. ✅ Article + BreadcrumbList JSON-LD validate in Rich Results Test (0 errors)
4. ✅ Canonical tag points to `https://wielegroup.com/proof`
5. ✅ Robots meta contains `max-snippet:-1, max-image-preview:large, max-video-preview:-1`
6. ✅ OG image renders correctly (Facebook Sharing Debugger OR LinkedIn Post Inspector)
7. ✅ Sitemap includes `/proof` with current mtime
8. ✅ IndexNow ping returns 200
9. ✅ GitHub release tag `v3.9.2-proof-page` exists
10. ✅ Mobile responsive (DevTools mobile preview clean)

ALL TEN must pass. Live-or-Nothing Law.

---

## ROLLBACK

If anything breaks production after deploy:
```bash
git revert <commit-sha>
git push origin main
# Cloudflare auto-redeploys
```

Then re-investigate locally before re-attempting.

---

## NOTES FOR THE OPERATOR

- This is a sales-conversion asset, not a marketing brochure. Tone is decisive, data-anchored, premium. Brand voice = "Citation, not clicks." No fluff. No emojis. No filler transitions.
- The 12 case studies and 8 killed tactics are FACTUAL (sourced from `/memory/reference_google_search_central_master_doctrine.md` and Tier 5C agent sweep — Google's own published doctrine).
- Page is binding doctrine substrate for Wiele OS B2B outreach. It will be linked from cold emails (Variant C of the doctrine outreach pack at `/Outreach/100-prospects/email-doctrine-variants-2026-05-13.md`).
- If founder discovers any discrepancy in case-study numbers vs Google's actual case-study page, fix immediately — credibility is the asset. Cross-reference: `https://developers.google.com/search/case-studies`.

---

**Authority:** Founder GO 1.2.3 · 2026-05-13. Ship this. Brief on completion.
