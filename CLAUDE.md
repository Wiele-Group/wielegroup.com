# wielegroup.com — Primary Directive

## ⚡ §0 — wielegroup.com IS the source-of-truth (founder directive 2026-05-09)

**Operating mode is PRODUCTION ONLY.** The site is live. Allowed work types going forward:
1. Visual enhancements
2. New pages
3. Edits to existing pages

**Forbidden:** prototype builds, concept explorations, parallel sandbox repos, anything that creates a competing source-of-truth. Future client work goes in **new sibling folders** at `/Wiele Group Operations/`, never in this repo.

**Single source rule:** when founder asks for a visual change, the answer always lives in this repo. There is no other "version" to consult. Files outside this repo are reference only and never override what's here.

## ⚡ §1 — Three binding files, read at session start in this order

| Order | File | Why |
|---|---|---|
| 1 | **`VISUAL_FILE_ROUTING.md`** (this directory) | Translates founder language ("hero copy on /proof", "the button on /platform") into exact file paths + line ranges. Builder reads FIRST before any visual edit — eliminates the "I edited the wrong file" failure mode. |
| 2 | **`LIVE_OR_NOTHING_PROTOCOL.md`** (this directory) | Mechanical post-deploy verification gate. Wrangler success ≠ live; only cache-busted curl with grep -oE proof = live. Builder reads BEFORE any deploy — eliminates the "I confirmed shipped but it isn't" failure mode. |
| 3 | **`../WIELE_CODE_OPERATING_DIRECTIVE.md`** | Cross-project Wiele code doctrine: Founder Standard, Evolution Directive, L99 Perfection, the 10 memorized lessons, deploy template, forbidden patterns, North Star. |

**Authority order on conflict:** founder live message > §0 (this section) > VISUAL_FILE_ROUTING.md > LIVE_OR_NOTHING_PROTOCOL.md > WIELE_CODE_OPERATING_DIRECTIVE.md > rest of this CLAUDE.md > prior plans.

**On any conflict:** the more recent / more specific rule wins. If still ambiguous, surface to founder — don't guess.

## Mission
Build Wiele as a modern AI-native AI Growth Systems company. Site must feel like a premium tech platform, not a traditional SEO/marketing agency. Convert visitors via the Signal Audit.

## Canonical reference paths (post-2026-05-09 cleanup)

All "find the brand spec" / "find the operating directive" routes are now stable. Builder should NEVER read from any other location:

| What | Path |
|---|---|
| **Primary repo (THIS)** | `/Wiele Group Operations/wielegroup.com/` |
| Brand visual assets (canonical) | `../brand-assets/` (master in `_master/`, spec in `specimen/wiele-identity-spec.md`) |
| Brand v2 B4 spec (canonical) | `../brand-v2-B4-chromaglass.md` |
| Brand kit reference | `../wiele-brand-kit-v2.md` |
| Brand philosophy | `../wiele-brand-philosophy-v2.md` |
| Motion system | `../wiele-motion-system-v1.md` |
| Cross-project Wiele code doctrine | `../WIELE_CODE_OPERATING_DIRECTIVE.md` |
| Current tasks | `../TASKS.md` |
| Future product reserves | `../_FUTURE_PRODUCT_LINES/` |

**Forbidden source paths** (never read from):
- `../_ARCHIVE_2026-05-09_post-v3.7.5/` — shipped directives, closed analysis, completed checklists, legacy deploy scripts
- `../_ARCHIVE_COMPLETED_HANDOFFS_2026-05-06/`
- `../_ARCHIVE_PRE_V3_DIRECTIVES_2026-05-06/`
- `../_brand_archives/`
- `../wiele-ai/` (sister project — different repo, different concerns)

If you find yourself wanting to read a file from any forbidden path, STOP. The information you need is either in this repo or in the canonical paths above. Reading from archives reintroduces the directive-confusion this cleanup eliminated.

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

### Production smoke-tests MUST send a browser User-Agent (Bot Fight Mode silently 403s bare curl)
**Rule:** Cloudflare Bot Fight Mode is enabled on the `wielegroup.com` zone. It silently returns HTTP 403 to bare `curl/X.Y.Z` user-agents — including from the founder's machine. Smoke-test scripts that don't set a UA will report "site is down" when the site is fine.

**Why this is binding:** Phase 9 deploy verification (2026-05-03) initially appeared to fail because bare-curl smoke-tests returned 403 across all routes. The site was healthy — Bot Fight Mode was filtering the verification traffic. Diagnosing this wasted time and almost triggered a rollback of a clean deploy. Every future deploy verification must use the UA-stamped pattern below.

**Canonical smoke-test snippet** (use this verbatim or wrap in a script):
```bash
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
for r in / /audit /labs /pricing /systems /proof /about /contact; do
  code=$(curl -sI -H "User-Agent: $UA" -o /dev/null -w "%{http_code}" "https://wielegroup.com$r")
  echo "$code  $r"
done
```

Expected: `200` on all canonical routes. Anything else is a real signal.

**Do NOT disable Bot Fight Mode to make bare curl work.** Bot Fight Mode is a security feature — it stays on. The fix is to make verification scripts behave like browsers, which is what the actual customers do.

**Other tools that need the same UA:** any `wget`, `httpie`, or `playwright headless` scripts targeting production. If it doesn't send a real-looking UA, expect 403.

## Cloudflare Workers in the Wiele Group account (audited 2026-05-06 v3.0.1)

Account `0edf698a8da62c67cde23e4f97de7a1b`. 5 Workers exist. Don't blind-archive any without re-confirming purpose against this table.

| Worker | Role | Status | Evidence |
|---|---|---|---|
| `wielegroup-com` | **PRODUCTION** marketing site (this repo, OpenNext bundle) | KEEP | `wrangler.toml` `name`, route bindings adc463…/2baac9… |
| `wiele-edge-seo` | Apex/www **routing handler** — issues 308 redirects from `wielegroup.com/*` and serves `www.wielegroup.com` requests | KEEP | Observability shows live `HEAD /`, `HEAD /robots.txt`, `HEAD /trust` traffic from prod hostnames; wired at zone level (no repo refs) |
| `wiele-dashboard-api` | wiele-ai dashboard backend (`dashboard.wielegroup.com`) — Cron `5 * * * *` plus auth-gated 401 favicon | KEEP | Hourly cron events present; managed in the wiele-ai repo, not here |
| `wiele-audit-intake-worker` | **Apollo CRM enrollment proxy** (POST `/submit` → Apollo `/contacts` + sequence add + Resend founder alert) | **FOUNDER DECISION PENDING** — superseded by current Next.js `/api/audit` route at the wielegroup.com level (KV + wiele-ai + Resend, no Apollo). 0 traffic 7d. Deletion drops `APOLLO_API_KEY`/`APOLLO_SEQUENCE_ID`/`APOLLO_EMAIL_ACCOUNT_ID` secrets and orphans any active Apollo sequence. Decide Apollo strategy before archiving. |
| `fragrant-king-50c6` | **UNKNOWN** — auto-generated Cloudflare name, 2 Upload-source deployments same minute on 2026-04-23, 0 traffic 7d, 0 references in `src/` `scripts/` `wrangler.toml`. MCP `workers_get_worker_code` returns malformed response so the script body cannot be inspected from the agent. | **FOUNDER DECISION PENDING** — strongest archive candidate per directive criteria, but archiving without code-level evidence violates §6 (evidence not assertion). Founder confirms via Cloudflare dashboard then `npx wrangler delete fragrant-king-50c6 --force`. |

**Process rule:** before any Worker deletion, capture `name + last-modified + version IDs + reason` in the commit message that authorizes the delete. Worker deletes are irreversible — KV bindings, secrets, route attachments all go with them.

## Start Here (post-2026-05-09 — site is LIVE)

Phase 0–9 are complete. Site shipped. Operating mode is now **production-only**: visual enhancements, new pages, edits.

**Every session:**
1. Read `VISUAL_FILE_ROUTING.md` — know which file owns the surface you're about to touch.
2. Read `LIVE_OR_NOTHING_PROTOCOL.md` — know exactly how to prove a change is live before claiming it.
3. Cross-reference `../WIELE_CODE_OPERATING_DIRECTIVE.md` for code doctrine.
4. Execute. Verify with curl. Report with verbatim output.

**When founder asks for a visual change:**
1. Find the surface in `VISUAL_FILE_ROUTING.md` §1
2. Edit only the file(s) that map listed
3. Build + deploy via the protocol in `LIVE_OR_NOTHING_PROTOCOL.md`
4. Run gate sequence
5. Report in the format §3 of LIVE_OR_NOTHING_PROTOCOL.md mandates
6. Do NOT say "shipped" / "live" / "deployed" before gate evidence is on screen

**Conflict resolution priority:**
- Founder live message > §0 of this file > §1 of this file > VISUAL_FILE_ROUTING.md > LIVE_OR_NOTHING_PROTOCOL.md > WIELE_CODE_OPERATING_DIRECTIVE.md > rest of this CLAUDE.md > prior plans

When in doubt: surface to founder. Never guess.

Ship the complete thing.
