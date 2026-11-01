# Wiele — investment in perspective

## Final direction and preserved context

The user requested an ambitious, futuristic visual experience, prioritising mechanics and website automation over load time, then clarified: sell real estate assets; technology and AI support the investment journey. Automation scope is website scenes and guided journeys only. Preserve approved Wiele identity/tagline, contacts, inclusive buyer access, all 14 pages, current service scope, image classifications, no advertised stock and independent-practitioner boundaries. Existing Analytics receipt and investor-onboarding indexing audit remain unresolved.

## Interaction contract

| Element | Purpose / input | States and mechanics | Interruption / alternatives |
| --- | --- | --- | --- |
| Property opening | Establish Malta investment real estate | Three property studies, crossfade, bounded image depth and layered supporting image | Image sequence pauses on manual choice, visitor pause, reduced motion, hidden tab or offscreen; manual choices and primary link always work |
| Guided journeys | Buy, sell or care; then choose a priority | Selected scene, purpose-specific copy and genuine next route | Reset/back choices, keyboard/touch buttons, no personal profiling; native links remain available without enhancement |
| Brief preparation | Organise selected preferences into an enquiry | Optional controls, loading, real AI question selection, honest guided fallback, review and transfer | Abort on edits/unmount; model can only return approved question IDs; deterministic preference summary; no lead sent automatically |
| Investment scenario | Explore price/rent/cost/vacancy assumptions | Gross yield on price, operating yield on total cost; lower-rent toggle; keyboard sliders/reset | Illustrative defaults and explicit exclusions; no property recommendation, forecast or guaranteed return |
| Perspective gallery | Explore income, asset and investor fit | Tab panels, image entrance and arrow-key/Home/End navigation | Correct responsive orientation; three complete articles before JS enhancement; touch and keyboard paths |
| Shared pages | Coherent property experience beyond homepage | Image apertures for buyers, owners, collection and About; dark report stage, care ledger and portrait | Reserved image space, meaningful captions and ordinary scroll/navigation |

## AI implementation and boundary

Cloudflare Workers AI model `@cf/meta/llama-3.1-8b-instruct-fp8` selects three questions from a fixed bank. Generated explanations, property claims and advice are never shown. Input is strict enumerated goal/property/area/budget/timing; no name, contact details, documents or free text. Output IDs are validated and mapped to approved wording. The preference summary is deterministic. Fallback is explicitly labelled Guided preparation. No live stock recommendation or eligibility assessment.

Existing KV holds 24-hour question-ID caches and hashed technical abuse counters. Per-client/day and global/day counters are best-effort, not an atomic spending cap. AI inference consumes the existing account’s Workers AI allowance/usage; no plan upgrade was performed. Optional selections are sent only after the visitor asks for preparation. Explicit Use this brief action holds a draft in session storage with 30-minute logical expiry, transfers it to the existing contact form and clears it. Contact submission still requires the existing protected form and separate visitor action. Privacy/terms and llms.txt describe the final feature accurately.

## Verification record

Production build/TypeScript and changed-file lint passed. Twenty-five backend tests passed (ten new brief tests and fifteen existing enquiry tests). Local Cloudflare model execution and website AI-assisted result were verified; the prepared brief carried into the form without submission. Calculator default 6.00% gross / 4.34% operating and lower-rent 5.40% / 3.81% verified in browser. Gallery arrow-key navigation verified. All fourteen local site/search checks passed, including 29 assets, 20 internal destinations, legacy statuses, metadata/schema/crawl resources. Responsive final checks and production release are recorded in DELIVERY-STATUS.md in the external deliverable folder.

No new testimonials, credentials, property availability, market yields or legal/tax rates. No outreach, spend campaign, scheduled automation, account plan upgrade or live customer enquiry. Exploratory sculpture source was saved outside the shipping repository; the final experience is property-led.
