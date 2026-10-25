# Wiele metadata and analytics — 25 October 2026

User authorised updating GSC, Google Analytics, Cloudflare and metadata across Wiele accounts.

## Account updates
GA4 account 394911739, property 537795532 retained. Previous property name Wiele Group; reporting country UK/timezone GMT; currency GBP; industry Other business activity. Updated to Wiele Property, Malta timezone, EUR, Property industry. Existing small business size preserved. Existing web stream 14880432388 retained; name changed from My website to Wiele Property · Malta website; URL from https://www.wielegroup.com to https://wielegroup.com. Measurement ID G-8YCESQ46BH confirmed in the stream UI. Enhanced measurement disabled to avoid automatic form/query data collection; explicit page views and sanitised events implemented. Linked verified GSC domain wielegroup.com to the matching web stream; LINK CREATED confirmed in UI.

## Website changes
Page-specific Open Graph/Twitter titles, descriptions and canonical social URLs. Homepage metadata names Malta property marketing and introductions. Organization schema adds confirmed logo, founder, founding year, Swieqi country/city address, client languages and Facebook/Instagram/LinkedIn identity links. Contact page shows confirmed location, appointment-only availability, languages and year. Footer links and llms.txt updated; sitemap date reflects content revision.

Restored GA4 using opt-in basic consent. No Google script before acceptance or after rejected first visit. Advertising consent denied. Manual page views omit queries/hash and reduce referrer to origin. Successful saved enquiries emit generate_lead with only enquiry_type enum; contact_click emits channel enum. Names, email, phone, messages and ticket identifiers are excluded. Revocation disables GA and removes its cookies. Privacy notice updated. Existing obsolete analytics component remains unused.

## Cloudflare release
Existing Worker wielegroup-com, account 0edf698a8da62c67cde23e4f97de7a1b, zone a3b700ea7a77ff4e8db02bd232a89220. Recovery version c822662c-225d-4d34-bdee-cf00bb1c69b4. Cache namespace updated for the metadata release. DNS/email/security preserved.

## Verification before release
Lint zero errors (one pre-existing unused-import warning in untracked social generation script). TypeScript and ten enquiry API tests pass. OpenNext production build passes. Local HTTP checker passes nine pages, 17 assets, canonical metadata, headers and internal link destinations. Browser confirms no Google tag before choice/after rejection, and correct measurement loader after acceptance. Contact OG URL/title verified in DOM. Mobile 390 px checked, no horizontal overflow. Final live checks follow release.

## Production outcome
- Source b9bfc4e; release tag property-platform-v1.5.0-metadata-20261025. Existing Worker deployed successfully, version 28cf8ebb-4ad6-4210-86c2-8685d0ce16b0, deployment a56bb1ae-fbb6-42b2-b618-fa3006aefdf7 at 100%; Cloudflare API read-back confirmed. Targeted purge of nine pages, sitemap and llms.txt succeeded.
- Live HTTP audit passes nine pages, 17 assets, internal destinations, headers, metadata and retired routes. Live browser verifies canonical/OG contact URL, complete Organization schema, visible Swieqi, languages, year and social links. Consent rejection/revocation reload has zero Google script elements.
- GSC confirms homepage already indexed and accepted a new indexing request (priority crawl queue). Sitemap status Success, last read 25 October 2026, nine discovered pages. No claim that new snippets/rankings have already propagated.
- GA4 generate_lead registered using Create with code and marked as a key event, once per event, without an assigned monetary value. Successful enquiry code emits this only after ticket confirmation. No synthetic lead submission made.

## Unresolved live Analytics collection
The existing Measurement ID G-8YCESQ46BH is confirmed by GA4, but both Google CDN loader endpoints /gtag/js?id=G-8YCESQ46BH and historical /gtm.js?id=G-8YCESQ46BH returned HTTP 404 during final checks. Realtime remained empty. Consent acceptance inserts the correct canonical loader element but script insertion is not proof of ingestion. Google tag installation controls resolve to account 6349105419/container 248991022 but embedded Tagging Settings remains blank; direct Tag Manager home renders only its shell. No duplicate property/stream, alternate credentials or Measurement Protocol bypass created. Remaining work: repair/reconnect the existing Google tag when tag-management controls are accessible, then verify actual page_view and contact_click ingestion and successful-enquiry generate_lead end to end. Do not report Analytics as fully working until this is verified.

Evidence screenshots are in assets-source/social-pages/gold-ring: ga4-property-updated-2026-10-25.png, ga4-search-console-linked-2026-10-25.png, gsc-indexing-requested-2026-10-25.png, gsc-sitemap-nine-pages-2026-10-25.png, website-metadata-live-2026-10-25.png and website-metadata-mobile-live-2026-10-25.png.
