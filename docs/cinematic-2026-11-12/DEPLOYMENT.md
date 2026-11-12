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

Final release result and live validation will be recorded after the authorised deployment completes.
