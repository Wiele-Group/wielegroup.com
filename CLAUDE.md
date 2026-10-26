# wielegroup.com — current project brief

The user's 24 October 2026 instruction replaces the previous AI/marketing-agency positioning with **Wiele Property**, an independent Malta property-marketing platform focused on sales. This repository remains the website source of truth. The earlier site is recoverable from tag `backup/wiele-agency-2026-10-24`.

## Confirmed facts
- Public brand: Wiele Property; Wiele Group domain retained.
- Sales portfolio only; no rentals.
- User states no personal property intermediary licence. Wiele provides marketing and introductions; official sales documentation is processed by appropriately licensed practitioners. Do not invent an accreditation or a named partner.
- WhatsApp/phone: +356 9932 0474. Email: admin@wielegroup.com, using existing email setup.
- No real property listings supplied yet. Use a clear empty collection; location photography is not listing stock.
- User authorised redesign and public relaunch through Cloudflare, including a new logo. This authorisation covers the requested relaunch, not unrelated advertising spend or changes to email services.

## Implementation
Next.js 16 / React 19 / TypeScript / OpenNext on the existing Cloudflare Worker `wielegroup-com`. Retain established DNS routes. Website pages live in `src/app`; current components in `src/components/property`; brand details in `src/lib/property.ts`.

Visual identity: deep forest #17332E, warm ivory #F8F5EF, champagne #C6AD86 accents, Instrument Serif + Geist. Approved Option 2: editorial serif WIELE wordmark with sans PROPERTY descriptor assets are in `public/property-identity/editorial`; editable vector sources/notes in `assets-source/property-identity`. The previous tech/chrome logo and old agency copy are retired.

Forms must validate on the server, verify Turnstile, persist to KV before success and report unavailable storage honestly. Enquiries are not marketing subscriptions. Existing secret bindings must remain secret. Never read credential stores or commit `.env.local`.

## Verification and release
- `npm run lint`
- `npm run typecheck`
- `node --test tests/property-enquiry.test.mjs`
- `npm run build:cf`
- Inspect desktop/mobile rendering, navigation, form errors, metadata and assets.
- Commit/tag before production deployment. Existing routes/email DNS stay intact.
- After deploying, verify the actual domain with a browser User-Agent and cache-busted requests. Check new brand markers and absence of former AI-agency copy before claiming live.
- Record deployment/version, checks and any unresolved issue in `docs/property-relaunch/launch-record.md`.

Use the latest user instruction over historical project guidance. Old agency-specific rules in parent references do not override this rebrand.

Design direction: Pam Golding inspired photographic scale, generous whitespace and collection-led navigation, with original Wiele branding, imagery and copy. No rentals or invented inventory.

Premium decorative property imagery: original AI-created residence, interior, terrace and material detail concepts. Keep disclosure in footer, homepage imagery note and /credits; never reuse these as evidence of actual inventory. Sources and prompts: assets-source/property-photography. Colour hierarchy uses forest for key actions, ivory for calm reading fields and restrained champagne accents; no conversion effect is claimed without measurement.

Approved identity: user selected Option 2 (Editorial). Current wordmark is type-led, without a separate geometric W symbol in the main lockup. Optical serif W used only for compact icons.

## Latest wordmark revision — 24 October 2026
- User supplied new standalone WIELE wordmarks in project sources, replacing the primary Option 2 lockup. Web derivatives live in public/property-identity/launch; preserve synced originals.
- Use charcoal on ivory and champagne gold on dark fields. User requested removal of Property marketing from the header; descriptor is now Property · Malta. Supplied full brokerage lockup and circular emblem have coloured edge artefacts and are not used. Existing compact W favicon remains.
- Homepage now routes sellers/buyers directly to their selected enquiry interests. No-inventory and concept-imagery disclosures remain visible. Social preview uses the new gold wordmark.

## Current premium ring identity — supersedes previous identity selections
- User explicitly requested use of the gold-ring logo from project sources and a premium revision compared with Pam Golding. The prior no-symbol editorial decision is superseded.
- Current primary mark combines the supplied gold-ring W (retouched from the source to remove coloured fringes, on a forest matte) with the supplied standalone gold WIELE wordmark. Masthead descriptor remains Property · Malta, with no marketing descriptor.
- Refined raster master: assets-source/property-identity/ring/wiele-ring-refined-forest.png. Web mark, icons: public/property-identity/ring. Existing synced originals remain untouched. This is a raster asset, not a vector master.
- Shared style system is now consolidated in globals.css: forest masthead, gold identity, ivory reading surfaces, Instrument Serif headings, Geist body, responsive image-led editorial layouts. Home uses estate-* components/classes.
- Homepage photography is decorative AI-created imagery plus the credited Valletta location photo; disclosures remain immediate and in footer/credits. No advertised stock yet.


## Confirmed investor positioning — 26 October 2026
- Primary market: international investors and consortiums seeking income-producing Malta real estate. This supersedes general home-seeker positioning.
- Property-marketing and introductions scope and licensing disclosures above remain in force; investment positioning does not establish intermediary or financial-services authorisation.
- Distinguish collected income, contracted rent and projected rent. Disclose calculation bases, operating costs and risks; no guaranteed yield or capital appreciation. No numerical yield target, minimum ticket or investor source country is confirmed.
- No real stock is supplied. Preserve honest empty opportunities and concept-image disclosures.
- /buying remains the investor page to preserve existing links. Enquiry values buying/consortium/marketing/general are supported; no enquiry implies investment subscription or marketing consent.
