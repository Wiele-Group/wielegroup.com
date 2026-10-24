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
