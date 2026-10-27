# Wiele Properties editorial luxury redesign — 27 October 2026

Implemented in the existing Next.js/OpenNext site at wielegroup.com. Existing logo artwork, investment positioning, contact details, form integration, consent handling and factual disclosures retained. Masthead descriptor now uses Properties.

## Direction and research

- Architectural, editorial hierarchy: https://themodernhouse.com/ and https://www.modernhouse.co/ (reviewed 27 October 2026).
- Luxury property presentation: https://sothebysrealty.co.uk/ (reviewed 27 October 2026).
- Reduced motion: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion.
- Deployment: https://developers.cloudflare.com/workers/wrangler/commands/.

Design choices are Wiele recommendations inspired by those references, not measured conversion claims. Charcoal, champagne and parchment; Cormorant Garamond and Manrope served through Next fonts; full-viewport architectural hero; fine rules; asymmetric image grid.

## Motion

Finite 22-second hero image drift, desktop scroll parallax, staggered entry, one-time IntersectionObserver reveals, image and link transitions, sticky masthead and reading progress. No added animation dependency. Header pause control disables decorative animation and reveals all content. System reduced-motion preferences remove animation, transitions and hero parallax. Content remains visible without JS, keyboard focus reveals animated containers, anchor offset accounts for sticky masthead.

## Verification

Production OpenNext build, TypeScript and focused ESLint passed. Existing nine-route HTTP/content/asset checker passed locally, including canonical tags, one H1 per page, search resources and security headers. Desktop 1256px and phone 390px inspected; investor route and mobile navigation checked. Contact form correctly preselected investor interest. Delayed security-widget rendering exposed a 320px overflow; constrained grid children and compact verification below 300px address this. Empty submission focuses the required name field. Pause control changed state correctly. Live form submission not exercised; no test enquiry sent. Reduced-motion styling reviewed in source, without OS-setting emulation.

Cache release identifier changed to property-20261027-editorial-luxury-v9 to prevent old HTML sharing the previous release cache.
