# Visual File Routing — wielegroup.com

**Purpose:** When the founder says *"change the hero copy on /proof"* or *"the button on /platform"* or *"the pricing tier names"*, Builder reads this file FIRST, finds the row, edits the named file. No hunting. No guessing. No editing the wrong file.

**Authority:** Binding alongside `CLAUDE.md` and `../WIELE_CODE_OPERATING_DIRECTIVE.md`. Read at session start before any visual edit. If the request maps to a row below, edit that file. If the request maps nowhere obvious, escalate (don't guess).

**Last updated:** 2026-05-09 (post-v3.7.5)

---

## §1 — "When founder says X, edit Y"

The translation table. Row order: most-frequently-edited first.

### Home page (`/`)

| Founder language | File | Notes |
|---|---|---|
| "Hero h1 / hero tagline / hero headline on home" | `src/lib/metadata.ts` (`siteConfig.tagline`) | NOT in `hero-section.tsx` — that file imports the value |
| "Hero subhead / description on home" | `src/lib/metadata.ts` (`siteConfig.description`) | Same — imported into hero-section |
| "AI Visibility Defense pill / shield badge above hero h1" | `src/components/sections/hero-section.tsx` | Inline literal copy at `<span>` inside `<FadeIn delay={0.075}>` |
| "Hero CTAs (Run a Growth Audit / Explore the Agency)" | `src/components/sections/hero-section.tsx` | The two `<Link>` blocks at `<FadeIn delay={0.15}>` |
| "Discipline strip text below the duality hairline" | `src/components/sections/hero-section.tsx` | "Brand · Marketing · Web · Advertising · SEO · AI Search" line |
| "Duality hairline (the 1px bichromatic rule)" | `src/components/sections/hero-section.tsx` (`<hr className="duality-hairline">`) + `src/app/globals.css` for the `.duality-hairline` rule |
| "Anything else on home" | `src/app/page.tsx` (composition) → individual section component | See §2 for the section list |

### /proof + case studies

| Founder language | File | Notes |
|---|---|---|
| "Hero h1 / subhead on /proof" | `src/app/proof/page.tsx` (~lines 90–115) | Inline JSX inside the first `<section>` — NOT pulled from metadata |
| "Programme catalogue (3 programme shapes)" | `src/app/proof/page.tsx` (`programmes` const, ~line 22) | Edit the array |
| "Methodology notes section on /proof" | `src/app/proof/page.tsx` (`methodologyNotes` const, ~line 41) | Edit the array |
| "Case study list (Foundation Cycle 01, Sovereign Cycle 01)" | `src/lib/case-studies-static.ts` (manifest + content) | Single source of truth — both list rendering AND deep-link content come from here |
| "A specific case study's narrative content" | `src/lib/case-studies-static.ts` (full content section) + `src/content/case-studies/<slug>.mdx` (FAQ content surface only) | Two surfaces — most copy lives in the .ts file; only FAQ-style answers live in the .mdx |
| "/proof/[slug] page layout (the case-study render)" | `src/app/proof/[slug]/page.tsx` | Render layer — usually edit content not layout |

### /pricing

| Founder language | File | Notes |
|---|---|---|
| "Pricing tiers / tier names / prices / features list" | `src/data/pricing.ts` | Single source of truth for the 6-tier ladder |
| "Anchor tier card (Sovereign £45K/mo)" | `src/data/pricing.ts` (`anchorTier` export) | Edit the data; the card renders from it |
| "Tier card layout / featured-variant card design" | `src/components/sections/pricing-section.tsx` | Render-side only |
| "AI Visibility Defense badge (the shield-with-level on each tier)" | `src/components/sections/pricing-section.tsx` (`DefenseBadge` component) + `src/data/pricing.ts` (level value per tier) |
| "Pricing page hero / page-level intro" | `src/app/pricing/page.tsx` | Hero JSX inline at top of page |
| "Buy Stripe URLs on pricing tiers" | `src/data/pricing.ts` (`buyUrl` field per tier) | Just edit the URL string |

### /platform · /systems · /audit · /onboarding · /about · /contact · /trust · /labs · /advertising-agency · /web-design-agency · /brand-management-agency · /marketing-agency

| Founder language | File |
|---|---|
| "Hero / page copy on `/<route>`" | `src/app/<route>/page.tsx` (most page copy is inline JSX in this file) |
| "Form on /audit" | `src/components/forms/audit-form.tsx` |
| "Form on /onboarding" | `src/components/forms/onboarding-form.tsx` |
| "Form on /contact" | `src/components/forms/contact-form.tsx` |
| "Onboarding budget tiers / step questions" | `src/data/onboarding.ts` |
| "Division pages (advertising/web-design/brand-management/marketing-agency) hero + sections" | `src/components/sections/division-page.tsx` (template) + `src/data/divisions.ts` (per-division content) |
| "/labs index page" | `src/app/labs/page.tsx` |
| "/labs/[slug] article render" | `src/app/labs/[slug]/page.tsx` (render) + `src/lib/labs-static.ts` (manifest) + `src/content/labs/<slug>.mdx` (article body) |
| "/services/* productized SKU pages" | `src/app/services/<slug>/page.tsx` (e.g., ai-visibility-monitoring, premium-brand-site-system) |

### /systems sub-routes

| Surface | File |
|---|---|
| `/systems` index | `src/app/systems/page.tsx` |
| `/systems/ai-visibility` · `/systems/brand-authority` · `/systems/search` · `/systems/web-experience` | `src/app/systems/<slug>/page.tsx` (one page each) — content via `src/data/systems-detail.ts` |
| Shared system-detail layout | `src/components/sections/system-detail.tsx` |

### Site chrome (header + footer)

| Founder language | File |
|---|---|
| "Header / nav links / mobile menu" | `src/components/layout/header.tsx` |
| "Nav link list (which links appear in nav)" | `src/data/nav.ts` (`primaryNav` + `ctaLink`) |
| "Footer columns / social links / legal lines" | `src/components/layout/footer.tsx` + `src/data/nav.ts` (`footerColumns`) |
| "Site logo / W monogram" | `src/components/ui/logo.tsx` (wordmark) + `src/components/ui/logo-mark.tsx` (W mark) + `src/components/ui/logo-mark-3d.tsx` (3D variant) |

### Buttons + button variants

| Founder language | File |
|---|---|
| "Button styles / variant definitions / what featured looks like" | `src/components/ui/button.tsx` (`variantStyles` const, lines 7–25) |
| "Where the featured button appears on each page" | grep `variant="featured"` or `variant: "featured"` across `src/` — current 5 instances: `audit-preview.tsx`, `platform/page.tsx`, `systems/page.tsx`, `labs/article-cta.tsx`, `pricing-section.tsx` (Sovereign tier) |

### Card primitive (chrome-card / duality-border / depth-tilt)

| Founder language | File |
|---|---|
| "Card primitive / chrome-card variant / coral variant / duality-border variant" | `src/components/ui/card.tsx` |
| "wg-depth-card / depth-tilt motion behavior" | `src/components/ui/card.tsx` (class) + `src/components/visual/depth-runtime.tsx` (motion JS) |

### Backgrounds + visual effects

| Founder language | File |
|---|---|
| "Site backdrop / art-directed device crops / 50% unmask" | `src/components/visual/site-backdrop.tsx` |
| "AmbientGrid (deprecated, replaced in v3.7.0)" | `src/components/visual/ambient-grid.tsx` (still exists but no longer mounted; safe to delete in next pass) |
| "Marquee rail (scrolling discipline strip)" | `src/components/visual/marquee-rail.tsx` |
| "Hero backdrop (the simulator-area depth scene)" | `src/components/sections/hero-backdrop.tsx` |
| "HorizonStrip (the 3 chapter dividers on home)" | `src/components/sections/horizon-strip.tsx` (component) + `src/app/page.tsx` (3 mount points with `index={1\|2\|3}`) |

### Brand tokens (colors, fonts, spacing)

| Founder language | File |
|---|---|
| "Brand colors (electric, void, obsidian, coral, etc.)" | `styles/tokens.css` (CSS custom properties — top-level `:root`) + `src/lib/tokens.ts` (TS access if any) |
| "Font face / Geist setup" | `src/lib/fonts.ts` |
| "Global CSS (utility classes like .duality-hairline, .chrome-card, .glass-strip)" | `src/app/globals.css` |
| "Tailwind config" | `tailwind.config.ts` if present, else `src/app/globals.css` (Tailwind v4 uses `@theme` block) |

### Content stores (where article + case study text actually lives)

| Surface | Manifest file | Article body file |
|---|---|---|
| Labs articles | `src/lib/labs-static.ts` (ARTICLE_MANIFEST) | `src/content/labs/<slug>.mdx` |
| Case studies | `src/lib/case-studies-static.ts` (full content + FAQ) | `src/content/case-studies/<slug>.mdx` (FAQ only) |
| Systems detail copy | `src/data/systems-detail.ts` | (none — pure data) |
| Division pages copy | `src/data/divisions.ts` | (none — pure data) |
| Homepage section copy not pulled from metadata | `src/data/homepage.ts` | (none) |

### JSON-LD / structured data

| Surface | File |
|---|---|
| `<JsonLd>` component (the SSR-safe inline script element) | `src/components/json-ld.tsx` |
| Schema builders (breadcrumb, itemList, article, organization) | `src/lib/schema.ts` |
| Per-page schema mounting | each `src/app/<route>/page.tsx` calls `breadcrumbSchema()` etc. and renders `<JsonLd>` |

### Forms + lead capture

| Founder language | File |
|---|---|
| "Audit form fields / validation" | `src/components/forms/audit-form.tsx` (UI) + `src/lib/validations.ts` (Zod schema) + `src/app/api/audit/route.ts` (server) |
| "Onboarding form" | `src/components/forms/onboarding-form.tsx` + `src/data/onboarding.ts` (questions) |
| "Contact form" | `src/components/forms/contact-form.tsx` |
| "Turnstile widget config" | `src/components/forms/turnstile-widget.tsx` + `src/lib/turnstile.ts` |
| "Resend / KV / wiele-ai integrations" | `src/lib/resend.ts` · `src/lib/kv.ts` · `src/lib/wiele-ai.ts` |

### Motion / animation primitives

| Founder language | File |
|---|---|
| "Reveal animation / fade-in / scroll-triggered intro" | `src/components/motion/reveal.tsx` (IntersectionObserver-based) + `src/components/motion/fade-in.tsx` (Framer Motion) |
| "Motion timing values" | `src/lib/motion.ts` |
| "Depth-tilt runtime (the v3.6.2 hover effect)" | `src/components/visual/depth-runtime.tsx` |

---

## §2 — Page-to-section composition

When founder says *"the section on home that has the bento grid"* or *"the trust strip below proof"*, this is the reverse lookup.

### `src/app/page.tsx` (`/`) section order:
1. `<CinematicEntry />` — `src/components/sections/cinematic-entry.tsx` (the W-mark intro animation)
2. `<HeroSection />` — `src/components/sections/hero-section.tsx`
3. `<HorizonStrip index={1} fromLabel="Hero" toLabel="Proof" />` — `src/components/sections/horizon-strip.tsx`
4. `<ProofStrip />` — `src/components/sections/proof-strip.tsx` (logos / proof bar)
5. `<DisciplinesSection />` — `src/components/sections/disciplines-section.tsx`
6. `<HorizonStrip index={2} fromLabel="Disciplines" toLabel="Problem" />`
7. `<ProblemSection />` — `src/components/sections/problem-section.tsx`
8. `<BentoSystem />` — `src/components/sections/bento-system.tsx` (the bento grid)
9. `<AuditPreview />` — `src/components/sections/audit-preview.tsx` (the home audit CTA card)
10. `<ProcessSteps />` — `src/components/sections/process-steps.tsx`
11. `<PricingSection />` — `src/components/sections/pricing-section.tsx` (also rendered on /pricing)
12. `<HorizonStrip index={3} fromLabel="Pricing" toLabel="Trust" />`
13. `<ProofSection />` — `src/components/sections/proof-section.tsx` (case-study preview block)
14. `<AnswerEngineStrip />` — `src/components/sections/answer-engine-strip.tsx`
15. `<TrustSectionPreview />` — `src/components/sections/trust-section-preview.tsx`
16. `<LabsPreview />` — `src/components/sections/labs-preview.tsx` (recent labs articles block)
17. `<CTASection />` — `src/components/sections/cta-section.tsx` (final CTA)

### Other pages
Most other pages compose 1–4 sections inline in their `page.tsx` plus shared section primitives (`<CTASection />`, `<TrustSectionPreview />`). To find a specific surface, open the page file first — section imports at the top tell the story.

---

## §3 — Cross-cutting reference

| Concern | Location |
|---|---|
| Site-wide route layout (header/footer mount, fonts, theme provider) | `src/app/layout.tsx` |
| Plausible analytics mount | `src/components/plausible.tsx` (mounted in layout, gated by env var) |
| Site config (name, descriptor, tagline, description, URL) | `src/lib/metadata.ts` (`siteConfig` export) |
| Per-page metadata builder (Open Graph, twitter, canonical) | `src/lib/metadata.ts` (`buildMetadata` helper) |
| Sitemap + robots | `src/app/sitemap.ts` + `src/app/robots.ts` |
| Static OG image | `public/og-image.png` (Edge OG dynamic route was removed in v3.7.4 — Cloudflare/OpenNext WASM incompat) |
| llms.txt | `public/llms.txt` |
| Cloudflare Worker config | `wrangler.toml` (note: do NOT add `routes` block — see CLAUDE.md §"Don't add routes…") |
| Next config (legacy redirects, MDX setup) | `next.config.ts` |

---

## §4 — Things that look like they should be in this map but aren't

These are surfaces founder sometimes references that have NO single-file owner:

- **"Brand voice" / "tone of voice" / "messaging"** — distributed across `siteConfig` (metadata.ts), section components, content stores, MDX files. There is no central brand-voice registry. Reference for tone: `wiele-brand-philosophy-v2.md` and `WIELE_CODE_OPERATING_DIRECTIVE.md` in the parent dir, but those are doctrine — they don't render anywhere automatically.
- **"The look and feel"** — system of: `tokens.css` (colors), `globals.css` (utility classes), `card.tsx` + `button.tsx` (component variants), `site-backdrop.tsx` + `horizon-strip.tsx` + `hero-backdrop.tsx` (visual texture), `depth-runtime.tsx` (motion). Composite. Edit individual primitives, not "the look".

---

## §5 — When this map is wrong

Site architecture changes. When it does, this file goes stale, and Builder will edit the wrong file again.

**Trigger to regenerate:**
- Major refactor (route renames, component reshuffles)
- New top-level page or major component
- Founder reports "Builder edited the wrong file" — that's a routing-map signal, not a Builder failure

**How to regenerate:** ask Cowork to walk the repo, diff against this map, propose an updated version.

---

## §6 — Pairing law

This file is read FIRST. After identifying the file to edit, Builder MUST also load `LIVE_OR_NOTHING_PROTOCOL.md` before any deploy. The two are paired: routing map prevents *editing the wrong file*; protocol prevents *declaring victory before the change is live*. Either one alone leaves a failure mode open.
