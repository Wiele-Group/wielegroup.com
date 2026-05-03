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

## Start Here
Read `../CLAUDE_CODE_HANDOFF_wielegroup.com_2026-05-03.md` once. Then execute Phase 0 (brand asset copy) → Phase 1 (foundation).

When in doubt: defer to handoff directive. When directive contradicts memory: directive wins. When directive contradicts founder: founder wins.

Boil the ocean. Ship the complete thing.
