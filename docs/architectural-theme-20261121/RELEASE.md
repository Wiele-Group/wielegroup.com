# Wiele architectural theme — 21 November 2026

Applies the supplied limestone, obsidian and bronze palette across the current Next.js site and its five standalone HTML pages. Existing visual roles map to shared tokens. Cormorant is retained, with locally hosted Inter and JetBrains Mono in WOFF2. Prices, dimensions, scores and currency results use tabular numerals. Cards use hairline borders, square corners and weighted motion; reduced-motion preferences remain supported. The header uses the limestone glass surface.

Bronze #8C6D46 is retained for decorative accents and large text. Small bronze text uses #795C39 to meet AA contrast on limestone. Primary hover labels use the elevated #FDFCFA surface colour. Display headings inherit their section's ink so photographic and dark sections retain light headings. Existing verification containers gain role="group" to make their unchanged accessible label valid. Controls have 44px minimum targets; checkbox/radio labels provide the touch area.

## Scope preservation

Base commit: 3018862 (the source for the active mandate-intake release). Page copy, legal statements, routes, source dates, registration/privacy restrictions, schemas, canonical links, social previews, API handlers, calculator and form logic are retained. The five standalone HTML documents differ only by one stylesheet link, verified byte-for-byte after removing that link. The global metadata and viewport declarations are unchanged. The edge cache release identifier changes so the new CSS references reach existing visitors. No deployment configuration, bindings or security settings change.

## Verification

- Cloudflare OpenNext production build, ESLint, TypeScript and 87 existing unit tests passed.
- 25 representative pages at 320, 390, 768 and 1440px: 100 rendered checks, no horizontal overflow or visible target-size failures. Includes all primary journeys, country/legal references, registration, public dossiers and the downloadable example.
- axe WCAG A/AA scans at 390 and 1440px: no detected violations after the verification-label fix.
- Expanded mobile menu contrast, Escape dismissal, overflow and reduced-motion checks at 320, 390, 768, 1024, 1181, 1280 and 1440px.
- Seller intake for property, yachts and classic cars, metric/imperial conversions, readiness meters, and local seller handoff checked at mobile and desktop widths using local test API fixtures.
- JavaScript-disabled seller fallback and all three public dossiers checked without registration.
- Existing full HTTP verification checks canonical metadata, entity/schema agreement, FAQ agreement, sitemap/crawl resources, security headers, protected article/report access and HTML/App Router isolation.
- Mobile and desktop screenshots visually reviewed; the review corrected dark hero-heading ink that automated contrast analysis cannot establish over photography.

The automated accessibility checks cover detectable issues in the tested pages and states, rather than certifying all WCAG criteria. No live client enquiry is submitted for testing.

## Deployment and recovery

Release command: `npm run deploy:cf`, the existing guarded workflow. It rebuilds, packages the configured static incremental cache, verifies built HTTP output and deploys using Wrangler.

Prior production Worker version: `9af73cee-d054-4483-9af4-2f5712646667`.
Rollback: `npx wrangler rollback 9af73cee-d054-4483-9af4-2f5712646667` from this website directory.

Production activation and final public-URL verification are recorded after deployment below.

## Production verified

Activated 21 November 2026 at 11:36 CET, 100% traffic.

- URL: https://wielegroup.com
- Worker version: `5a81566b-14b3-4400-9d66-902e7ee973d5`
- Deployment ID: `23ad9b3a-e1b8-4923-9a01-487c751c44ec`
- Deployed source commit: `afa71279aa736bfaa302b2b0f3162ae3a18ab2a4`
- Public-domain verification: 25 pages at both 390 and 1440px, 50 rendered checks and 50 axe scans; zero reported violations, overflow, small visible controls or client errors.
- Live navigation, menu contrast, Escape and reduced motion passed at all seven widths.
- Live seller forms, unit conversions, current reference-rate conversions, readiness meters, local handoff, JavaScript-disabled seller fallback and all three public dossiers passed. No live enquiry was submitted.
- Public HTTP verification passed for 51 assets and 110 internal link destinations, metadata/schema/crawl consistency, correct 404/410 responses, protected reports and articles, and representation isolation.
- Production desktop and mobile screenshots are saved beside this report and visually reviewed.

The previous production version remains available through the rollback command above.
