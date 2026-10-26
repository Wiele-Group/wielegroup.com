# Wiele investor positioning — 26 October 2026

## Authorised scope
User requested that the confirmed income-property/international-investor/consortium model be reflected on the website, LinkedIn Page and Facebook Page. This authorises the corresponding profile and website copy changes; no paid advertising or lead outreach was requested.

## Website
- Existing website source: this repository. Existing Worker: wielegroup-com. Previous live version: 28cf8ebb-4ad6-4210-86c2-8685d0ce16b0.
- Updated homepage, investor (/buying), owner (/selling), opportunities, about, contact, navigation/footer, titles/descriptions/social metadata and public information file.
- Added consortium enquiry choice and server support, retaining existing buying/marketing/general routes. No submissions were sent from the live form during checks.
- Preserved contact paths, service scope, no-current-stock state, concept imagery disclosures, form storage/security, analytics consent, existing routes and bindings.
- Required checks passed: lint (zero errors; existing unused-import warning in unrelated untracked social-branding script), TypeScript, eleven enquiry tests including investor/consortium routing, OpenNext production build. Local HTTP audit passed nine pages, 17 assets and 12 internal destinations, plus metadata/security/retired-route checks.
- Desktop preview visually inspected. At 390px viewport, document width 375px with no horizontal overflow; mobile homepage and consortium preselection visually inspected. Returns are not guaranteed; no property yield or investment stock invented.

## LinkedIn
- Page: https://www.linkedin.com/company/wiele-properties/ (organisation 146761838).
- Previous tagline: Malta property. A personal perspective. Thoughtful presentation. Direct contact.
- Saved tagline: Malta investment property marketing & introductions for international investors and consortiums.
- Saved overview addresses investor/consortium audience, income basis, property-marketing and introductions scope, licensed-practitioner documentation and contact route.
- Added specialties: Investment property marketing; International investor introductions; Income-producing property presentation; Consortium acquisition enquiries.
- One specialties save reported an edit conflict. Refreshed the page, confirmed overview persisted and specialties had not, then added only missing specialties. Save succeeded and all four were read back. No extra feed post was created.

## Facebook
- Page: Wiele Group, https://www.facebook.com/profile.php?id=61596012142539 . Existing Page identity retained.
- Previous bio: Malta property, thoughtfully presented. Based in Swieqi. By appointment only. English & Afrikaans. Established 2026.
- Saved bio: Malta investment property marketing & introductions for international investors and consortiums. Income-producing real estate. Swieqi · By appointment · English & Afrikaans.
- Updated services: Investor introductions; Investment property presentation; Digital property marketing description; Malta investment property marketing; Consortium acquisition enquiries. Photography direction retained.
- Saved services read back successfully. No adverts, messages or paid commitments created.

## Publication verification
- Production source e62836f; tag property-platform-v1.6.0-investors-20261026.
- Deployed existing Worker successfully: version 87db693c-7afb-46c0-85d9-7dfc433d1d2a, deployment e198f9c8-f452-4f28-8ca7-0745fac53b53, serving 100% of traffic. Recovery version 28cf8ebb-4ad6-4210-86c2-8685d0ce16b0.
- Wrangler retried transient asset-upload failures and then completed successfully. Deployment read-back confirmed the final version; no duplicate deployment was submitted.
- Live HTTP audit passed all nine pages, 17 assets, 12 internal destinations, metadata/security headers and retired-route checks. Live browser confirmed the investor homepage and updated title/description.
- Social profiles reloaded: LinkedIn member view shows saved tagline and overview. Facebook shows saved bio and all updated service descriptions.
- Replaced both social covers with the matching investor slogan: Property with purpose. Income in focus. Existing brand/image sources were reused in the code-generated layout, with concept-image disclosure retained. LinkedIn confirmed Cover image updated; member view visually verified. Facebook cover save visually verified.
- Final screenshots: website-investor-positioning.png, linkedin-investor-positioning.png, facebook-investor-positioning.png in this directory.
- No paid campaigns or direct outreach were launched. Existing unrelated untracked files preserved.
