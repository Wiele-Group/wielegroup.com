# Company-led website and email contact — 2 November 2026

User requested removal of the personal profile and anonymity on the website, with all enquiries through admin@wielegroup.com. This supersedes the prior personal-email/profile direction.

Removed the named profile and portrait from the homepage, About and Contact pages; direct email, phone/WhatsApp routes, founder/Person structured data, personal LinkedIn link, named FAQ/onboarding/maintenance/report/AI-helper copy, privacy operator wording and llms.txt references. Contact metadata now identifies Wiele Properties. Company social links remain.

The original portrait is removed from published static assets. The Worker explicitly returns 410/noindex/no-store for its former URL and its image-optimiser URL before cached HTML handling. The HTML release cache key is new and the sitemap dates are 2 November 2026.

Enquiry/onboarding and report-registration notifications continue to target admin@wielegroup.com; no recipient, secrets or binding changes were needed. Form success/error paths now point to email. No real enquiry or email delivery test was performed.

The server-only, registration-protected 16-page report was also checked. Two personal references were permanently redacted from the PDF content and replaced with Wiele Properties, retaining the supplied Manrope font and original layout. Report contact now links to mailto:admin@wielegroup.com. Changed pages were rendered and visually inspected; extracted text and link checks found no name, personal email, phone or WhatsApp link. Historical reference documents and source assets outside the published site are preserved.

Validation: changed TypeScript lint and all 37 existing backend tests passed. The deployment workflow builds and checks all fourteen public pages, metadata, schemas, FAQ consistency, assets, links, crawl files and retired URLs. Additional checks reject personal identifiers and direct phone/WhatsApp links in every rendered public page and llms.txt.

Recovery version before this release: 8c923032-4f80-4052-ad44-b2b290ea43d4. Rolling back to it would restore personal content. Production version and browser verification are recorded in the external delivery status after release.

External search snippets and previously downloaded reports can retain older content. Existing unresolved Analytics receipt and investor-onboarding indexing issues are outside this change.
