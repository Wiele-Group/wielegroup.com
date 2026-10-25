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
