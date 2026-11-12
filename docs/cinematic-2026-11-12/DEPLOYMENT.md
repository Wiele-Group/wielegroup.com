# Cinematic redesign — 12 November 2026

User explicitly authorised production deployment with embedded metadata, SEO, GEO and AEO.

Target: https://wielegroup.com/; Worker wielegroup-com; existing OpenNext/Wrangler release workflow retained.
Account and active zone verified through connected Cloudflare API. Existing apex and www routes point to this Worker; no DNS change required.

Before release: Cloudflare deployment a0cba8c4-878d-4868-bf06-4841bf707edf, active version a6c838d1-41a3-4a5f-b235-6665906cdb8a (100%), matching base source f466434. Rollback uses that prior version through the existing Workers deployment mechanism.

Search and metadata preparation:
- Unique page titles/descriptions, canonical URLs, Open Graph/Twitter previews, indexable public pages, robots and sitemap retained and checked through prescribed release gate.
- Sitemap dates updated to 12 November 2026 for shared design changes.
- Existing nine visible homepage FAQ answers retain matching FAQ structured data. Separate homepage WebPage entity links Organisation/WebSite, FAQ and primary ImageObject.
- Five descriptive new WebP copies carry embedded XMP titles, descriptions, creator credits, subject classification and imagery disclosures. Original image bytes remain untouched. Decoded pixel hashes before/after embedding match. The JSON metadata ledger records dimensions and provenance.
- ImageObject descriptions and visible captions distinguish AI-created scenes from actual location photography; no fictional listing schema, prices, ratings, street address or return promises added.
- Swieqi/Malta business location, current brand, service scope, general email and official social links remain consistent. llms.txt updated to match homepage structure and access restrictions. No claim of guaranteed rankings, AI recommendations or rich-result eligibility.
- Public Turnstile build configuration reused from existing approved environment; no server secrets copied or changed. Existing remote secret and storage binding names confirmed through Cloudflare settings.

The edge-cache release key is wiele-cinematic-20261112-metadata-v34, preventing prior-release HTML from being reused. Existing protected-route cache exclusions remain in force.

## Verified production release

Published source: 4c1eb0d. Production tag: wiele-cinematic-production-2026-11-12.
Cloudflare version: b83cad64-7650-48ea-8d39-5820243acecf.
Deployment: a1383086-3362-445c-bf1d-996255dbd5b7, 100% traffic, observed through the connected Cloudflare API.
Live URL: https://wielegroup.com/.

- Prescribed npm run deploy:cf succeeded: Next production build/TypeScript, OpenNext adapter, Cloudflare-runtime local verification and upload.
- All 16 built and live public pages passed heading, canonical, unique metadata, social-preview, business entity and security-header checks. 34 assets and 23 internal destinations passed, as did sitemap/robots/brand resources, retired-route410/unknown404 behaviour and anonymous article protection (401 for protected charts; private/no-store).
- Ordinary public homepage serves the new cinematic design. New release cache namespace prevents previous-release HTML reuse. HTTPS www redirects308 to https://wielegroup.com/; the canonical target serves200. Python3.9 requires explicit handling of308; browser navigation is unaffected.
- All five live WebP files byte-match the release copies. Embedded XMP XML was downloaded, parsed and verified for descriptions and creator credits.
- Live homepage has a linked WebPage/FAQ/Organization/WebSite/ImageObject graph with five descriptive image entities, nine FAQs, current dateModified and Swieqi/Malta location metadata.
- Browser desktop1440 and mobile390 checked with no observed horizontal overflow or broken loaded images. Mobile menu/Escape verified. Contact verification loads without the local-preview unavailable message; no CAPTCHA was manually solved and no enquiry/registration was submitted.
- Existing KV/AI/assets and secret binding names remain present after deployment. No DNS/SSL/account-plan changes. Analytics event receipt and live enquiry email receipt remain untested.
- Live desktop/mobile screenshots: ../wiele-cinematic-live-desktop.jpg and ../wiele-cinematic-live-mobile.jpg relative to the source folder's parent output directory.
- No search-engine recrawl, ranking change, AI citation or rich-result appearance is claimed. The published technical/content groundwork is verified.

