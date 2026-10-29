# Wiele Properties investment report release

User authorisation: publish the Wiele report on wielegroup.com, require interested investors to register before downloading, and use the original gold-ring PNG without a background. Preserve the current premium identity and tagline: Malta Property. Global Ambition.

## Reader journey

- Public report page: `/malta-investment-report`, linked from navigation, the homepage and buyer page.
- Name and email required; property interest optional. Separate email-marketing choice is unticked and never required for download.
- Registration is a report request, not an investor account. Email addresses are not verified and the form does not promise email delivery of the report.
- Server verifies Turnstile and saves a 90-day registration record to existing `AUDIT_QUEUE` under `report-registration:<UUID>` before issuing download access. Consent choice, wording version and timestamp are recorded separately.
- Supplementary notification goes only to the existing admin@wielegroup.com inbox. Notification failure does not lose the saved registration.
- A signed, Secure, HttpOnly, SameSite=Strict cookie grants 24-hour access. It includes no name or email. The dedicated `REPORT_ACCESS_SECRET` is managed as a Cloudflare secret.
- `/api/reports/download` returns the PDF only after signature and expiry checks. Responses use private/no-store and noindex headers. The PDF is a server-only module and is not in public assets. The public cover image previews only the first page.
- Reader enquiries and following Wiele on LinkedIn remain available through the report and landing page. No marketing mail campaign or follow-up automation was launched.

## Editorial and visual work

- 16-page Wiele Properties editorial report, retaining source periods, 22 linked references and disclosed original-release transaction figures.
- Modern Malta-inspired AI architectural cover and interior, revised integrated ring-and-wordmark identity, Cormorant Garamond and Manrope typography, ivory/charcoal/gold palette, facing-page locality features and a separate debt/tax stress-test feature. AI images are labelled; the complete report has selectable text and live sources.
- Replaced uncalibrated numerical property-growth forecasts with a qualitative Wiele outlook and explicitly hypothetical sensitivity inputs. Published macro forecasts remain attributed separately.
- Clarified yield denominators, explained abbreviations, tightened locality propositions and included an additional rental-downside cash-flow calculation.
- Updated report-page metadata, canonical/social preview, Report/WebPage/BreadcrumbList data, sitemap coverage, internal links, privacy notice and terms.
- The user requested a new integrated logo. New transparent PNG and native vector masters connect the ring, WIELE name, PROPERTIES · MALTA descriptor and Cormorant Garamond Medium Italic slogan as one unit. Original source assets remain unchanged.

## Verification

23 enquiry/report unit tests pass, covering storage failure, absent configuration, Turnstile failure/hostname mismatch, consent separation, signed-cookie tampering/expiry, unauthorised download and PDF bytes after registration. Type checking and Cloudflare production build pass. Lint passes with one pre-existing unused-import warning in an unrelated social-branding script; generated `.wrangler` output is excluded.

Built HTTP checks pass all ten public pages, 20 assets, canonical URLs, unique titles/descriptions, social metadata, entity data, visible FAQ agreement, sitemap and crawl rules. Mobile form and desktop/tablet design were visually reviewed. The existing unresolved Analytics data-receipt issue remains unresolved; instrumentation is not proof of receipt.

Offline editorial master and source:
`/Users/jonathanlandman/Documents/Wiele Properties/Reports/2026-10-29/`

Initial report deployment: `b1489a59-67e7-4cdd-b1c2-a188538fb796`; editorial redesign follows the user’s explicit Magazine Editorial Studio request.

Pre-release Worker code version: `5eeb60b8-00a0-41e5-9702-e0c9827b5240`. Adding the signing secret creates an intervening configuration version. Capture the final deployment identifier and live checks in `LIVE-VERIFICATION.md` after release.


## 30 October 2026 — current revision
The user restored the original metallic gold-circle W emblem. Active website/report assets use `/property-identity/gold-circle/`; the previous open-ring identity is superseded for active production. Transparent PNG masters and current standards are in `~/Documents/Wiele Properties/Brand/2026-10-30-gold-circle-restored/`. No personal photograph.

Homepage/About now introduce Jonathan Landman through text; contact and report pages explain the three-step enquiry process. Buyer paths distinguish income-focused acquisitions and residences. The report landing page provides an evidence chart, hypothetical operating-yield example and two sample page images before registration. The full 16-page PDF remains private and registration-gated. Current source commit: f838326. GA4 receipt remains unresolved; download-click instrumentation is consent-gated and is not a completed-download measure.
