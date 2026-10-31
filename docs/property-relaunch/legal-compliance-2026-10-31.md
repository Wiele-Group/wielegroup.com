# Malta property-investment legal compliance section

Reviewed 31 October 2026 (Europe/Malta). User requested a public website section with FAQs for EU investors, non-EU investors, third-country nationals and corporations.

## Delivered content

- /legal-compliance: four investor routes, four purchase checks, 13 FAQs, dated editorial review and direct official-source links.
- Non-EU and TCN labels are explicitly described as overlapping; recognised statutory long-term-resident status is distinguished from five years of work permits or a programme label.
- AIP acquisition eligibility is separated from rental use, tourism/residential operating obligations, residence permission and citizenship.
- Corporate review looks beyond incorporation/directors to ownership/control. Pooled passive investment requires a separate financial-services assessment.
- The guide does not advertise legal services, certify compliance or imply regulator endorsement. Independent transaction-specific advice is identified.
- Homepage/buyer-page introductions, main/mobile navigation and footer links; sitemap, llms.txt, unique canonical/social metadata and matching visible FAQ/schema.
- Dedicated typographic social card uses outlined Cormorant Garamond and Manrope with the existing approved Option 1 logo. Existing source logos were preserved.

## Current source checks

- https://legislation.mt/eli/cap/246/eng/pdf — current consolidated acquisition Act, definitions, acquisition routes, exceptions, permit/use and anti-avoidance provisions.
- https://mtca.gov.mt/personal-tax/property-taxes/acquisition-of-immovable-property-in-malta-by-non-residents/conditions-for-buying-immovable-property — official broad buyer routes; statutory exceptions take precedence over simplified wording.
- https://mtca.gov.mt/personal-tax/property-taxes/acquisition-of-immovable-property-in-malta-by-non-residents/negotiations-with-the-eu — Malta's EU arrangements for secondary residence.
- https://identita.gov.mt/expatriates-unit-main-page/noneu-nationals/non-employment-permits/long-term-residence/ — long-term residence is an application/status question, not an automatic inference from duration.
- https://fiaumalta.org/procedures-guidance-2/implementing-procedures/ — applicable professionals' CDD framework.
- https://www.mfsa.mt/our-work/investment-services-supervision/ — current financial-services/fund-rule discovery route; no determination that a particular consortium is regulated.
- https://legislation.mt/eli/cap/604/eng/pdf — covered residential leases; 30-day registration rule.
- https://mta.com.mt/wp-content/uploads/2026/06/Circular-regarding-the-New-Tourism-Accommodation-Regulations-2026-Private.pdf — 2026 accommodation regime with phased requirements. No claim that all transitional requirements apply immediately.
- https://mtca.gov.mt/personal-tax/property-taxes/promise-of-sale — provisional duty and transaction process; public guide avoids disputed precise deadline wording or blanket tax rates.

Public copy intentionally avoids indexed AIP minimum values, specific SDA-development lists, unqualified tax rates and guarantees of eligibility. Individual-unit boundaries and exact permits require transaction-specific evidence. EU Protocol 6 direct retrieval encountered a verification page; the linked official MTCA explanation supports the public EU-arrangements summary.

## Release and verification

Baseline source: 1370ba1 (maintenance launch). Previous live Worker version: 40d94297-caea-4f75-a224-4c4102457684.

Development used an isolated branch/worktree to preserve unrelated original working-tree changes. Changed TypeScript lint and typecheck passed. Existing enquiry/report backend checks passed. Browser review at 320, 390, 768 and 1440 pixels showed no horizontal overflow or broken loaded images; main/mobile navigation, anchor links and keyboard FAQ expansion worked. The dev-only React eval/CSP warning was not addressed by weakening production CSP.

Production release uses the existing npm run deploy:cf workflow: build, local Worker verification of all twelve canonical pages, then deployment. Live outcomes and release identifiers belong in the handoff record created after deployment. No enquiry was submitted, analytics receipt was not tested, and the prior unresolved analytics issue is unchanged.
