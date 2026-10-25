# Wiele Property relaunch — 24 October 2026

## Confirmed direction
- User owns wielegroup.com and authorised redesign, Cloudflare deployment and relaunch.
- Sales-only portfolio. Wiele provides property marketing and introductions; sales documentation is processed by licensed practitioners. User reports no personal property intermediary licence.
- Confirmed WhatsApp: +356 9932 0474.
- Preserve existing Wiele/GoDaddy-connected email configuration. Existing public inbox: admin@wielegroup.com.
- No verified property stock or named licensed partner supplied. No invented listings, accreditations, results or testimonials.

## Architecture and recovery
- Existing Next.js/OpenNext Cloudflare Worker maintained: wielegroup-com.
- Account: 0edf698a8da62c67cde23e4f97de7a1b; zone: a3b700ea7a77ff4e8db02bd232a89220.
- Original local commit: 3a1360993132aeedda3656a13d89c60b312b9a75.
- Backup tag: backup/wiele-agency-2026-10-24.
- Prior production version: 92015267-0a98-451e-955a-3616566cd958.
- Existing apex/www zone routes remain attached to wielegroup-com. DNS and other Workers/Pages remain unchanged.
- Enquiries: Turnstile server verification → durable AUDIT_QUEUE KV under property-enquiry prefix (90-day TTL) → notification to existing admin inbox through existing Resend binding. Success means durable record, not proof of inbox delivery.
- No advertising/analytics tags loaded. New Wiele Property architectural archway/W identity in outlined SVG; new sage/limestone visual system and real Malta location photographs.
- Retired agency pages intentionally return new branded 404 pages. No unrelated agency-to-property redirects.

## Photography
- Valletta waterfront: Ludovica Dri, Unsplash, photo _p7_c-KU3Bw; image asset photo-1612172976094-97dc088354a7.
- Valletta balconies: Intrepid, Unsplash, photo F7c_hgrLqo0; image asset photo-1764335486717-d3630e859ee2.
- Unsplash licence checked 24 October 2026: https://unsplash.com/license. These are location images, not sale listings. Source files resized for website use.

## Follow-up inputs
Real property facts/photos/authority, practitioner's identity/role and agreed engagement terms before transaction-specific features are introduced. Legal/privacy text is an operational website notice and should be checked against actual business arrangements as they develop.

## Pre-release verification
- Lint passed. TypeScript passed after clearing obsolete generated development route validators.
- Next/OpenNext production build passed.
- Ten isolated enquiry API tests passed, including storage failure, verification failure and notification failure.
- Local HTTP check passed for nine pages, 13 assets, canonical metadata, H1 structure, security headers, internal links, metadata resources and retired-route 404s.
- Browser checked desktop at 1440 px and phone at 390 px. Mobile menu opens/closes and navigates; no horizontal overflow after headline correction.
- New outlined logo inspected in forest/ivory/black. No font dependency in delivered SVG masters.
- Actual live email delivery is not yet established by these local tests.

## Production release
- Deployed existing Worker `wielegroup-com` via the authenticated official Wrangler workflow.
- Worker version: d90e56d7-0354-497e-91f4-a635f366e00f.
- Production: https://wielegroup.com/
- Original release source commit: dc923f1; release tag property-platform-v1.0.0-20261024.
- All nine public pages, 13 referenced assets, internal links, sitemap/robots/llms resources and branding passed the live HTTP checker.
- Fresh root check: HTTP 200, cf-ray a4fa4ac11abc81a6-MRS; former agency phrase count 0, Wiele Property count 23, new forest logo path count 3.
- www root and /contact return 308 to the correct corresponding apex URLs. Python 3.9 verification does not automatically follow this response; redirect Location values were inspected directly.
- DNS comparison: all 27 records unchanged. All three existing zone routes unchanged. Email routing and verification records remain as before.
- Real browser enquiry test completed successfully; returned reference 1FC34CFF. Its durable KV record was independently read and identified as the labelled synthetic launch test. Notification inbox delivery has not been independently inspected.
- Live browser checks at 1440 px desktop and 390 px mobile. Mobile page width 375 within 390 viewport; new logo and Malta hero image loaded.
- Saved screenshots: live-homepage-desktop.png and live-homepage-mobile.png.
- No real property listings supplied; collection remains explicitly empty.

## Premium visual revision
- User steered the design towards Pam Golding's photographic scale and spacious property presentation, then explicitly requested premium decorative property photography, a premium cognitive colour hierarchy and a high-end logo.
- Replaced the heavy lowercase logo draft with a tapered W and light spaced uppercase lettering; supplied forest, ivory, champagne, charcoal and signature variants.
- Added four original AI-generated decorative residential images. These are fictional and disclosed in the page, footer and credits; no property stock is invented.
- Preserved the sales-only scope, existing inbox and WhatsApp number, and existing enquiry workflow.
- Palette, usage and contrast notes: premium-direction.md. Full prompts and PNG masters: assets-source/property-photography.
- Final production source commit efdbfac; tag property-platform-v1.1.0-premium-20261024.
- Deployed existing Worker successfully, version 966d450f-6410-4799-acd4-355c47d1c0f7. Infrastructure routes and email settings were not modified by this visual revision.
- Final OpenNext build passed. Lint/TypeScript and the existing ten enquiry API tests passed during the revision. Final live HTTP checker passed all nine pages, 15 assets, metadata and internal link destinations.
- Live desktop (1440 px) and phone (390 px) visually inspected. Phone header spacing corrected, mobile navigation opens and links correctly; page width 375 px within 390 px viewport. All eight rendered image elements loaded after scrolling through the page.
- Proof screenshots: live-premium-desktop.png, live-premium-mobile.png, live-premium-lifestyle.png and live-premium-full-page.png.

## Selected logo: Option 2 Editorial
- User explicitly selected Option 2 from three distinct logo directions.
- Finalised serif WIELE / sans PROPERTY wordmark in outlined SVG, transparent PNG and four colours. Compact serif W receives optical reinforcement for web icons.
- Primary website header/footer, favicon, touch icons and social previews updated. New versioned asset URLs and edge cache namespace avoid carrying the previous identity forward in caches.
- Approved package: assets-source/property-identity/wiele-property-logo-pack.zip. Source, usage notes and original SIL font licences included.
- Earlier concepts remain separate from approved artwork. No trademark clearance or physical production certification is claimed.
- Production source a1a0873, tag property-platform-v1.2.0-editorial-20261024. Worker version 644ef052-84fd-497f-9903-bce0ca1620de.
- Build (including TypeScript) and lint passed. Final live HTTP audit passed nine pages, referenced assets, search metadata and retired-route behaviour.
- Selected wordmark inspected on the live desktop and phone homepage. Phone width 375 px within 390 px viewport; correct forest/ivory asset switching confirmed. Screenshots: live-editorial-desktop.png and live-editorial-mobile.png.

## New source wordmarks and launch review
- Review requested in Wiele Properties chat on 24 October 2026. Located this existing source repository and confirmed current production version 644ef052-84fd-497f-9903-bce0ca1620de through Cloudflare API.
- Mounted source-supplied charcoal/gold WIELE wordmarks with a Property · Malta descriptor (user requested removal of marketing from the header before release). Lossless 720 px WebP derivatives preserve source artwork; synced originals remain untouched. Full circular artwork withheld because of visible coloured edge artefacts. Existing compact W icons retained.
- Updated shared social preview and versioned edge HTML cache. Homepage seller and buyer actions now open the corresponding enquiry interest instead of routing the primary action to an empty collection. Collection page offers both buying and owner marketing paths.
- Added immediate concept/no-inventory disclosure in the hero and clearer Malta property-marketing copy. Contact, scope and existing server-side enquiry workflow retained.
- Lint: zero errors; one pre-existing unused-import warning in unrelated untracked scripts/build-social-branding.mjs. TypeScript and ten enquiry tests passed. Browser preview checked desktop and 390 px phone; phone document width 375 px. Mobile menu opens; seller enquiry preselects Marketing my property. Local Turnstile rejects localhost as expected; no external enquiry was submitted during this revision.

- Final user steering: logo descriptor Property · Malta; homepage eyebrow Malta property · Thoughtfully presented. Final source f684324, release tag property-platform-v1.3.1-header-20261024.
- Final OpenNext build including TypeScript passed. Deployed existing Worker via official Wrangler, version 84bd1826-f467-44e1-8490-a298a0888d20.
- Final live HTTP audit passed nine pages, 15 assets, 11 internal destinations, metadata and retired-route behaviour. Initial asset request returned a transient 404 immediately after release; subsequent full audit passed.
- Live homepage visually verified at 390 px; descriptor read back as Property · Malta and document width 375 px. Saved live-launch-wordmark-mobile.png and live-launch-wordmark-default.png. Desktop preview was inspected earlier in this revision; final live desktop resize was blocked by a stale stopped-local-preview tab, so no final live desktop screenshot is claimed.

## Premium ring revision after Pam Golding comparison
- User requested a more premium site, reference comparison, refined copy/visuals and use of the source gold-ring logo. Review: pam-golding-review.md.
- Rebuilt the homepage with a forest masthead and source-derived retouched ring emblem, more visible architecture, editorial typography, separate owner/buyer entry points, varied lifestyle photography and a clearer seller presentation section.
- Consolidated prior layered CSS into one current responsive system. Refined seller/buyer/about/contact introductions. Added ring icons, collection emblem and social preview.
- Preserved source images, confirmed contacts, actual service scope, decorative imagery disclosures and honest no-inventory state. No forms submitted externally in this revision.
- Lint: zero errors, one existing warning in unrelated untracked social-branding script. TypeScript and ten enquiry tests passed. Local HTTP checker passed nine pages, 24 assets and 11 internal destinations before production build.
- Browser preview: desktop inspected at 1440 px; phone at 390 px and 320 px, tablet seller page at 768 px; no horizontal overflow. Mobile menu opens/closes and Escape dismisses it; buyer path selects buying in the enquiry form. Existing localhost Turnstile limitation remains; production binding is retained.
- Production source d33f092; release tag property-platform-v1.4.0-gold-ring-20261024. Final OpenNext build including TypeScript passed.
- Existing Worker deployed successfully: c822662c-225d-4d34-bdee-cf00bb1c69b4. Recovery version: 84bd1826-f467-44e1-8490-a298a0888d20.
- Final live HTTP audit passed nine pages, 16 assets, 11 internal link destinations, search metadata and retired-route behaviour.
- Live browser inspected at 1440 px and 390 px. Gold ring decoded at 320 px native width; all nine image elements loaded after scrolling. No horizontal overflow (document width 1425/375 within 1440/390 viewports).
- Saved live-gold-ring-desktop.png, live-gold-ring-mobile.png, live-gold-ring-editorial.png and live-gold-ring-full-page.png. Browser viewport override reset after verification.

## Metadata and analytics alignment — 25 October 2026
- Source b9bfc4e; tag property-platform-v1.5.0-metadata-20261025; deployed existing Worker version 28cf8ebb-4ad6-4210-86c2-8685d0ce16b0. Recovery c822662c-225d-4d34-bdee-cf00bb1c69b4.
- Page-specific social metadata, expanded confirmed business schema, contact information, social links and opt-in analytics published. Existing DNS/mail/routes preserved. Targeted cache purge succeeded.
- Build/TypeScript/lint and ten enquiry tests passed; live audit nine pages/17 assets passed.
- GSC domain linked to GA4; homepage recrawl request accepted; sitemap Success with nine pages.
- GA4 identity changed to Wiele Property, Malta timezone, EUR and Property industry; stream canonical URL/name updated; generate_lead key event registered.
- Live ingestion remains unresolved: existing G-8YCESQ46BH loader returns Google CDN HTTP 404, tag-management controls blank and Realtime empty. Do not claim working collection. Full report metadata-analytics-2026-10-25.md.
