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

Visual identity: forest #193F35, ivory #F6F3ED, sage accents, Instrument Serif + Geist. New architectural archway/W logo assets are in `public/property-identity`; editable vector sources/notes in `assets-source/property-identity`. The previous tech/chrome logo and old agency copy are retired.

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
