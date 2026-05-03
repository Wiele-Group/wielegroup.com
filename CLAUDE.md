# wielegroup.com — Project Memory

## Mission
Build Wiele as a modern AI-native AI Growth Systems company. Site must feel like a premium tech platform, not a traditional SEO/marketing agency. Convert visitors via the Signal Audit.

## Authority
The binding execution directive is **`../CLAUDE_CODE_HANDOFF_wielegroup.com_2026-05-03.md`** at the repo parent. Read it before any work. It supersedes prior plans on conflict.

Strategic context: `../SYNTHESIS_Brand_x_Build_ActionPlan_2026-05-03.md`
Brand assets: `../brand-assets/` (master in `_master/`, spec in `specimen/wiele-identity-spec.md`)

## Brand Direction (locked)
AI Product Interface + Swiss Minimalism + Modular Bento. Dark-mode futuristic (Linear/Vercel/Raycast register).

## Core Message (locked)
**Be the brand AI recommends.**

## Stack (locked)
Next.js 16.2 App Router · React 19 · TypeScript 6 · Tailwind 4 · Framer Motion · Lucide · MDX · Zod · Cloudflare Pages + Workers · Resend · Cloudflare Turnstile.

## Tone
Precise, modern, confident, commercially clear, evidence-led. No ceremony. No hedging. No corporate-speak.

## Killed (do not use)
- Monolith identity (parchment, gilt, serif, blue/silver V-monogram)
- Tier names: Hearing, Seat, Ledger, Sovereign
- Lexicon: sovereign, doctrine, hearing, oath, petition
- Routes: `/services/*`, `/work`, `/journal` (refactored — see §4 of handoff)

## Active Decisions (binding — do not re-ask)
- Public masterbrand: **Wiele** (legal: Wiele Group)
- Descriptor: **AI Growth Systems**
- Hero H1: **Be the brand AI recommends.**
- Primary CTA: **Run AI Visibility Audit** → /audit
- Hosting: Cloudflare Pages + Workers
- Currency: GBP
- Pricing: Signal Audit £2,500 + Launch £1,500 / Growth £4,000 / Authority £8,000 / Wiele OS £15,000+
- Content hub route: /labs · Proof route: /proof · Service IA: /systems
- Lighthouse target: 100/100/100/100 (non-negotiable)

## Quality Gates (per phase)
- `npm run lint` clean
- `npx tsc --noEmit` clean
- `npm run build` clean
- Lighthouse ≥ 95 (Phase 1) → 100 (Phase 6)
- axe-core: zero violations
- All forms validated with Zod (client + server)
- No exposed secrets in client bundle

## Branch + Commit
- `main` always deployable
- Phase branches: `phase-1-foundation` → `phase-6-qa-deploy`
- Commit msg: `phase-N: <scope> — <one-line>`
- Tag each phase complete

## Forbidden
- Redrawing the wordmark or W monogram
- Recoloring wordmark with brand accents
- Inventing metrics or testimonials
- Auto-publishing to external channels
- Committing secrets
- Shipping below Lighthouse 100 in Phase 6
- Stock photography, AI brain visuals, robot imagery, neural network clichés
- Ceremonial copy (sovereign, doctrine, etc.)

## Wiele-ai Integration
Marketing site `/api/audit` POSTs to wiele-ai `/api/projects` to create Project + queue first EngineRun. If wiele-ai not live, stub with KV queue + founder email notification (same response shape).
Env vars: `WIELE_AI_API_URL`, `WIELE_AI_API_KEY`, `RESEND_API_KEY`, `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`.

## ⚠️ Patterns that must NOT regress

### JSON-LD must ship in the initial SSR HTML
**Rule:** `<JsonLd>` (in `src/components/json-ld.tsx`) renders a direct `<script type="application/ld+json">` element via React's inline-HTML escape hatch — NEVER `import Script from "next/script"`.

**Why this is binding:** `<Script strategy="afterInteractive">` injects the schema **after hydration**. Crawlers (Googlebot, OAI-SearchBot, PerplexityBot, ClaudeBot) parse the initial HTML response on first byte and typically don't wait for JS execution. Schema rendered via `<Script>` is **invisible** to the exact crawlers we built it for. We caught this in Phase 4 smoke-tests against `npm run start`. Without the SSR-HTML fix, every JSON-LD block on the site would be invisible.

**The hardening that makes the inline pattern safe:** `JSON.stringify(data).replace(/</g, '\\u003c')` prevents the literal `</script>` substring from closing the surrounding tag. JSON spec allows the unicode escape; the JSON parses identically. `eslint-disable-next-line react/no-danger` with a justifying comment is the canonical pattern.

**Smoke-test:** `curl -s http://localhost:3000/<route> | grep -oE 'type="application/ld\+json"' | wc -l` should match the expected `<JsonLd>` count for that route. Run against `npm run start`, NOT `npm run dev` — dev mode lazy-compiles routes; first request returns 404 if you don't wait.

### Build-time fixture rotation, not runtime
The `selectFixture(date)` pattern in `src/data/prompt-simulator-fixtures.ts` is evaluated at build time during static generation. Don't move it to client-side or runtime — it's deliberately deterministic per-build to keep SSR/hydration aligned. Same for `getAllArticles()` in labs.

### MDX plugins must be string identifiers (Turbopack)
In `next.config.ts`: `remarkPlugins: [["remark-gfm", {}]]`, NOT `[remarkGfm]`. Turbopack serialises loader options across worker boundaries; function references break the build with "options not serializable."

### Lead-capture forms fail-open to KV
Audit + contact route handlers: validate Zod → verify Turnstile → write KV FIRST → wiele-ai (best-effort) → Resend × 2 (best-effort) → return 202. A paid-intent submission must NEVER see "submission failed" because of downstream flakiness. The customer-facing failure path is invalid input or bot — that's it.

### ISR scope is `/` only
`export const revalidate = 60` lives on `src/app/page.tsx` ONLY — it's there so the per-minute fixture rotation in HeroSection actually rotates between deploys. Other routes stay fully static (`/labs/<slug>` redeploys on git push; `/systems/*`, `/pricing`, `/about` are content-stable; `/api/*` are dynamic on submit). Adding `revalidate` elsewhere is wasted runtime cost.

### Plausible analytics scope is public marketing only
`<PlausibleScript />` mounted in root layout, gated by `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`. Absent env var = no script renders, zero-cookie dev experience preserved. Never inject on `/api/*` or future admin routes — keep the "no cookie banner anywhere on Wiele" property intact.

### Don't auto-remove the legacy redirect block
The 9-redirect block in `next.config.ts` carries a `TODO(2026-08-03)` comment. Phase 7+ task: REMOVE only after Search Console + Plausible referrer data confirm zero traffic to `/services/*`, `/work`, `/journal` for the prior 30 days. Code that auto-deletes itself in 90 days is a footgun.

### Adding a new Labs article (Phase 7.4 binding workflow)
MDX dynamic imports don't survive the OpenNext bundle to Workers — we use **explicit static imports + manifest** instead. To add an article:

1. Drop the `.mdx` file in `src/content/labs/`
2. Add a static import + `ARTICLE_COMPONENTS` map entry in `src/app/labs/[slug]/page.tsx`
3. Add a full metadata entry in `ARTICLE_MANIFEST` in `src/lib/labs-static.ts` (must match the .mdx frontmatter exactly — Zod validation in `src/lib/labs.ts` fails the build if not)
4. (Optional) Add the article's TOC entries to `ARTICLE_TOC` in `src/lib/labs-static.ts` if you want a sidebar TOC

Why this pattern: dynamic `import("@/content/labs/${slug}.mdx")` worked locally but the OpenNext bundler didn't follow the dynamic path → MDX modules absent in the Worker bundle → `/labs/<slug>` returned 404 in production. Static imports force the bundler to track every path. The Phase 7.4 commit (post-v1.0) closed this regression.

### Don't add `routes = [{ pattern, custom_domain = true }]` to wrangler.toml
The wrangler OAuth token from `wrangler login` lacks `dns_records:edit` scope. With existing apex DNS records, `wrangler deploy` fails with API error 100117 every time. Custom domain bindings live as ZONE-LEVEL Workers Routes (created via direct API or dashboard). `wrangler deploy` ships only the Worker code; routing is preserved via the zone-level routes. See the comment block in `wrangler.toml` for the route IDs.

## Start Here
Read `../CLAUDE_CODE_HANDOFF_wielegroup.com_2026-05-03.md` once. Then execute Phase 0 (brand asset copy) → Phase 1 (foundation).

When in doubt: defer to handoff directive. When directive contradicts memory: directive wins. When directive contradicts founder: founder wins.

Boil the ocean. Ship the complete thing.
