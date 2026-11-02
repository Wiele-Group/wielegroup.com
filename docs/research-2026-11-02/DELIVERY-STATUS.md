# Wiele research update — delivered 2 November 2026

Published: https://wielegroup.com/malta-investment-report (production).
Also updated: homepage, /buying, /selling, llms.txt and report metadata/previews. The sitemap already carries 2 November dates and remains consistent. No service claims, contacts, advertised stock or infrastructure settings changed.

Source: 05561e1; tag wiele-research-2026-11-02. Cloudflare Worker version 05d80955-42ca-41a7-ab01-add3b7866738; deployment 161f72c6-36fc-4635-aa10-af218a81ce94, confirmed active at 100%. Prior production version 2fbb2e2d-89e5-408a-9f4e-c1e854e142dd retained for rollback. Release used npm run deploy:cf from an isolated worktree; original repository fast-forwarded, preserving unrelated AGENTS.md and untracked assets.

## Delivered

- Rebuilt established 16-page report with revised 2025 annual sales (13,351 deeds; EUR4,034.9m value; 14,569 promises), current policy/economic context and narrow, attributed Savills preliminary European context.
- Added six dated public indicators with direct sources; annual-average growth, quarterly year-on-year growth, sales registrations, permits and ECB policy remain distinct.
- Added audience-specific market context to homepage, buyer and seller pages. Shared reference data for the current indicators.
- Replaced report cover, samples and social preview with assets matching the new PDF; Report dateModified is 2 November, original datePublished retained. Registration ID and consent wording/version unchanged.
- Report form explicitly uses compact Turnstile size to fit phone width, including desktop-to-phone resizing. Other forms retain their established sizing.
- Preserved company-only identity and admin@wielegroup.com contact; PDF scanned for prohibited personal contact and obsolete annual totals.

## Verification

Production Cloudflare build and TypeScript pass; changed-file lint and diff checks pass; all 37 existing backend tests pass. Fourteen built and live page/search checks pass, covering 30 assets, 22 internal destinations, canonical/social metadata, schema, FAQ alignment, robots/sitemap and retired routes. The live four changed pages return 200 and contain the review date without former personal contact; anonymous PDF request returns 401. No real lead/registration submitted, no live inbox receipt test, no CAPTCHA completion, no authenticated production PDF download. The existing unit path validates signed access and PDF bytes against the new server module.

Browser-reviewed four changed pages at 320/768/1440px: no horizontal overflow or broken loaded images in checked states. Live dashboard and mobile registration reviewed; narrowing the live report retains a 320px document width. Optional marketing choice remains unchecked. Consent rejection and register-anchor navigation work in the compiled preview. Live screenshots are provided. Local Turnstile hostname errors are expected; no challenge bypass performed.

All 16 PDF pages rendered and reviewed as a contact sheet; changed content/source pages reviewed at readable resolution; arithmetic and source-vintage reconciliation checked. The PDF remains 16 pages with selectable text and linked sources. Existing hypothetical yield/finance/tax assumptions remain explicit. This is market commentary, not a property valuation or lender quotation.

## Evidence limits and remaining work

NSO annual revisions use the retained 9 October workbook from 29 October research because direct fresh XLSX download returned 403. Rechecked official HTML agrees with the September headline; later workbook revisions cannot be excluded. The limitation appears visibly in the report and webpage. Eurostat annual series was freshly retrieved. RPPI full HTML intermittently timed out; its official release search and retained original tables support the dated reading. Historical population/tourism/rent data retain their source periods, rather than being presented as new full-year 2026 observations. Only a narrow European context is supplied; no locality yields or peer ranking is inferred.

Existing unresolved Analytics event receipt and investor-onboarding indexing issues remain outside this release. No search-indexing requests, social changes, outreach, spending or automation were performed.
