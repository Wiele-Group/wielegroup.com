# Property journeys and enquiry refinement — 14 November 2026

Implements the first release recommended by the full website audit.

- Contact page: concise introduction, immediate company email alternative, form before company details in document order. Compact mobile layout.
- Buying: property-first residence/investment routes, shorter process, explicit availability and optional expandable income scenario. Complementary categories remain linked.
- Selling: property-first title, service explanation and first content-feature image; property ownership, evidence and marketing scope remain explicit.
- Enquiry: ordinary property-buying guidance no longer requests consortium information. Existing category/intent routing and durable storage remain intact.
- Verification: failed script removed, rejected promise reset, 15-second load timeout and cancellation-aware error callback. Existing server verification stays in place. Five isolated loader regression tests cover shared loading, network failure/retry, timeout/retry, missing API and existing-script reuse.
- Fonts: full-character-coverage WOFF2 versions replace the three TTF imports. Original font sources and licences retained. Font file total falls from 2,075,904 to 406,552 bytes (80.4%). Character maps verified against originals. This is an asset-size reduction, not a measured Core Web Vitals improvement.
- Asset thumbnail disclosures enlarged from 8px to 11px on mobile.
- Titles, descriptions, social metadata and Service schema updated to match property-first pages. Crawl resource text updated. Existing canonical URLs remain.

Recovery: prior production version 8ea88295-9302-4370-a7b8-8e2d6af2b6ba, source 20281ea, tag wiele-editorial-20261114.

No fabricated listings, transaction history, testimonials, company registrations or operating coverage added. No DNS, secrets, provider, pricing, permission or infrastructure migration is part of this release. No real client enquiry or registration should be submitted for verification; use isolated tests and preview checks.

Preview verification:
- Lint, TypeScript and Next production build passed. 22 isolated enquiry/verification tests passed (17 existing enquiry tests + 5 loader tests).
- Contact, buying, selling and home checked at 320, 390 and 1440px: no horizontal overflow.
- At 390×844: contact name field y=704.125 (previous y≈1515); buying page closed-calculator height=4715 (previous 8963), 47.4% shorter. Measurements exclude any conversion claim.
- Residence CTA selects buying and residence guidance. Optional scenario opens with Enter; price ArrowRight changes displayed results from 6.00%/4.34% to 5.81%/4.21%.
- Mobile asset caption computed font size=11px.
- Company-only identity, admin inbox and truthful availability/AI-image disclosures retained.

Production verification and release identifier are recorded in the external DELIVERY.md after deployment.
