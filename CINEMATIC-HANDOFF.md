# Wiele Investments — cinematic website redesign

Prepared 12 November 2026. Original design inspired by the broad cinematic and architectural direction discussed with Jonathan; no BAUEN files or code were used.

## Deliverables

- Full Next.js website in this checkout, based on the latest deployed release f466434.
- Wiele-Cinematic-Preview.html alongside this folder: self-contained homepage preview, with embedded images and fonts. Open it in a browser. Scene selection, optional slideshow, mobile navigation, FAQ panels, motion controls and illustrative calculator are included. Links to other pages open the current wielegroup.com website; this file is not a production deployment.
- Desktop, mobile and research screenshots alongside this folder.
- Wiele-Cinematic-Website-Source.zip: complete tracked source, without dependencies, build output or credentials.

## What changed

- Fullscreen cinematic homepage with three selectable architectural scenes and optional crossfading slideshow. Default is a static scene. Pointer/scroll movement, finite entrances and the existing visitor motion preference are retained; system reduced motion is respected.
- Original Wiele Investments reflective gold lockup, approved tagline and charcoal / champagne / parchment colours.
- Editorial introduction, asymmetric buyer and owner image stories, truthful collection availability, sculptural report presentation, Valletta panorama, process, illustrative investment calculator, maintenance, nine FAQs and enquiry links.
- Shared navigation / footer refinement across the existing 16 public routes. Existing article registration, forms, legal content, backend integrations, canonical URLs and structured business identity retained.
- Approved Cormorant Garamond and Manrope files are now bundled locally, with their original OFL licences. No font service or template subscription is required.
- All AI imagery remains disclosed. Valletta waterfront is credited to Ludovica Dri. No fictional listings, prices, testimonials or return claims added.

## Validation

- Production Next build and TypeScript: passed after bundling local fonts.
- Changed-file ESLint and git diff whitespace checks: passed.
- Existing checker: all 16 public routes passed heading, canonical, unique metadata, social-preview, schema and header checks. 32 assets and 23 internal destinations passed, along with robots, sitemap and brand resources.
- Local Next normalises /pricing/?old=1 with a 308 redirect before middleware. The production Cloudflare wrapper treats the retired route first. Re-running that existing check with its canonical /pricing?old=1 variant passed the retired-route checks; the test file was not modified.
- Protected chart endpoint returned 503 rather than the checker's production-specific 401 because this isolated preview has no production access-cookie secret. It did not disclose the protected chart. End-to-end gated-content access, production form submission and inbox receipt were not tested.
- Browser: homepage widths 320, 390, 768 and 1440; no checked horizontal document overflow or broken loaded imagery. Contact also checked at 320. Desktop/mobile screenshots saved.
- Scene choice updates imagery, selected button, caption and count. Mobile menu opens and closes with Escape. FAQ disclosure and motion-pause state verified. Lower-rent scenario updates gross yield from 6.00% to 5.40%, operating yield from 4.34% to 3.81%; Reset restores initial inputs. These are hypothetical calculator values, not investment recommendations.
- Standalone export: HTML/assets and JavaScript syntax checked. Browser file-URL inspection was blocked by the browser's URL policy, so the exported file was not independently browser-rendered. Screenshots show the actual application served over local HTTP.

## Run the complete application

Use a supported Node version, then:

```sh
npm ci
npm run build
npm run start -- --hostname 127.0.0.1 --port 3047
```

Supply existing production secrets through the established environment mechanism only when deploying or testing authorised integrations. The isolated checkout deliberately contains no copied secret files.

## Release status

DEPLOYED on 12 November 2026 after explicit authorisation. Source 4c1eb0d; Cloudflare version b83cad64-7650-48ea-8d39-5820243acecf,100%traffic. See docs/cinematic-2026-11-12/DEPLOYMENT.md for final verification. No DNS, secret, social-account or paid-plan changes. Original working-directory edits remain intact. The authorised release used AGENTS.md and the established npm run deploy:cf workflow, including final search and live checks. Preserve rollback to f466434 / Worker a6c838d1-41a3-4a5f-b235-6665906cdb8a. Recheck the actual production version before release if other work has intervened.

The known Analytics receipt issue remains unverified. Editable listing administration and populated property-detail pages were not added by this design change; the released collection remains honestly empty until authorised stock is supplied.
