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
