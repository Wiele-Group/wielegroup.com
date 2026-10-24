# Wiele Property — file routing

Updated 24 October 2026 for the property-platform relaunch. Previous agency map is preserved in the backup tag.

| Surface | Source |
|---|---|
| Home | src/app/page.tsx |
| Seller marketing | src/app/selling/page.tsx |
| Buyer information | src/app/buying/page.tsx |
| Property collection and empty state | src/app/properties/page.tsx |
| About | src/app/about/page.tsx |
| Contact page | src/app/contact/page.tsx |
| Privacy / terms / photo credits | src/app/privacy/page.tsx, src/app/terms/page.tsx, src/app/credits/page.tsx |
| Header, footer, logo mounting and CTA band | src/components/property/chrome.tsx |
| Mobile menu | src/components/property/mobile-navigation.tsx |
| Enquiry form | src/components/property/enquiry-form.tsx |
| Enquiry server validation/storage/notification | src/app/api/enquiry/route.ts |
| Turnstile client | src/components/forms/turnstile-widget.tsx |
| Business name, phone, email and nav data | src/lib/property.ts |
| Layout, fonts, global metadata, Organization schema | src/app/layout.tsx |
| Styling, tokens and responsive layout | src/app/globals.css |
| New logo SVG/PNG | public/property-identity/ |
| Logo source, preview and usage | assets-source/property-identity/, scripts/build-property-identity.py |
| Location photos / social preview | public/property/ |
| Sitemap / robots | src/app/sitemap.ts, src/app/robots.ts |
| AI-readable factual summary | public/llms.txt |
| Redirects / HTTP security headers | next.config.ts |
| Deployment / edge cache | wrangler.toml, cf-cache-wrapper.ts |
| Recovery and validation notes | docs/property-relaunch/launch-record.md |

Older agency components/data still in the repository are historical and are not mounted in the public site. Update current source and verify live output; do not edit historical files expecting them to change the website.
