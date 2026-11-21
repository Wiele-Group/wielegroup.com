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
