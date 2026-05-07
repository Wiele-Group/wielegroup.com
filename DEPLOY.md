# wielegroup.com — Deploy guide (Phase 6)

Authority: directive §6 Phase 6 + Phase 6 brief reinforcements.

This is the **deploy phase**. Only the founder can run the production pipeline (Cloudflare account, DNS, env vars, KV creation). The code is deploy-ready as of this branch's tip; tag `v1.0-public-launch` is reserved for **after all 9 post-deploy gates pass**.

---

## 1. Pre-deploy setup (one-time)

### 1.1 Cloudflare account prep
1. Sign in to the Cloudflare dashboard
2. Workers & Pages → **Create** → connect this Git repo
3. Build framework preset: **Next.js**
4. Build command: `npm run build:cf`
5. Build output: `.open-next` (the OpenNext adapter writes here)

> Adapter note: this project uses **`@opennextjs/cloudflare`**, not `@cloudflare/next-on-pages`. The legacy adapter peer-locks to Next ≤15.5.2 and doesn't support Next 16. OpenNext for Cloudflare is Cloudflare's actively-maintained adapter for Next 14+.

### 1.2 KV namespace
1. Workers & Pages → KV → **Create namespace** named `wielegroup-audit-queue` (production) and `wielegroup-audit-queue-preview` (preview)
2. Copy each namespace ID
3. Edit [wrangler.toml](wrangler.toml) — uncomment the `[[kv_namespaces]]` block, paste the production ID; same for `[[env.preview.kv_namespaces]]` with the preview ID
4. Commit (this is fine to commit — KV IDs are not secrets)

### 1.3 Environment variables (Cloudflare dashboard)
Workers & Pages → Settings → Environment variables → **Production**:

| Name | Value | Notes |
|---|---|---|
| `WIELE_AI_API_URL` | `stub` | Flip to real URL when wiele-ai sprints 4–9 ship |
| `WIELE_AI_API_KEY` | (empty in stub mode) | Required when URL is real |
| `RESEND_API_KEY` | `re_…` | Get from resend.com dashboard |
| `TURNSTILE_SECRET_KEY` | `0x4AAA…` | Get from Cloudflare Turnstile dashboard |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | `0x4AAA…` | Public site key (paired with the secret) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | `wielegroup.com` | Triggers Plausible script |

Mark `RESEND_API_KEY`, `WIELE_AI_API_KEY`, and `TURNSTILE_SECRET_KEY` as **encrypted secrets**.

### 1.4 Resend domain verification
1. resend.com → Domains → **Add** `wielegroup.com`
2. Add the DNS records to Cloudflare DNS
3. Wait for verification (~10 min)
4. Configure sending domains: `audits@wielegroup.com` and `admin@wielegroup.com`

### 1.5 Cloudflare Turnstile site
1. Cloudflare dashboard → Turnstile → **Add site** for `wielegroup.com`
2. Widget mode: **Managed** (default)
3. Copy site key + secret key into the env vars above

### 1.6 Custom domain
1. Workers & Pages → Custom domains → **Add** `wielegroup.com` and `www.wielegroup.com`
2. Cloudflare auto-issues SSL via Universal SSL
3. Set `www.wielegroup.com` → `wielegroup.com` redirect at the DNS or Pages level

---

## 2. Deploy

### 2.1 Local preview
```bash
npm run preview:cf
```
Builds + runs the Cloudflare Workers runtime locally via wrangler. Hits `http://localhost:8787`. Test the audit form against `WIELE_AI_API_URL=stub` here before pushing.

### 2.2 Production deploy
```bash
npm run deploy:cf
```
Or push to the connected Git branch and Cloudflare Pages auto-deploys. The first deploy takes ~3 minutes; subsequent ones ~60 seconds (asset hash diffing).

---

## 3. Post-deploy gates — all 9 must pass before tagging v1.0-public-launch

| # | Gate | How to verify |
|---|------|---------------|
| 1 | **Lighthouse Desktop** on `/`, `/audit`, `/pricing`, `/systems`, `/labs/<slug>` | All four categories = **100** on each route |
| 2 | **Lighthouse Mobile** on the same 5 routes | Each category ≥ **95** (mobile is harder) |
| 3 | **axe-core** on the 5 routes | `npx @axe-core/cli https://wielegroup.com/<route>` → **zero violations** |
| 4 | **9 redirects via curl -I** | All return `HTTP/2 308` with correct `Location` header — see [§4 redirect commands](#4-redirect-smoke-test) |
| 5 | **llms.txt + sitemap.xml + robots.txt** | All return `200`; sitemap has ≥ 17 URLs; llms.txt < 4 KB; robots.txt references sitemap |
| 6 | **OG images render** | [opengraph.xyz/url/https://wielegroup.com](https://www.opengraph.xyz/) + Twitter Card Validator both show the OG card |
| 7 | **JSON-LD validates** at [validator.schema.org](https://validator.schema.org/) on `/`, `/audit`, `/labs/<slug>` | Zero errors per route, all expected `@types` present |
| 8 | **securityheaders.com** | Grade **A** at [securityheaders.com/?q=https://wielegroup.com](https://securityheaders.com/) |
| 9 | **SSL Labs** | Grade **A+** at [ssllabs.com/ssltest/](https://www.ssllabs.com/ssltest/analyze.html?d=wielegroup.com) |

**Tag `v1.0-public-launch` ONLY after gates 1–9 are all green.**

```bash
git tag -a v1.0-public-launch -m "Production launch — all 9 post-deploy gates verified"
git push origin v1.0-public-launch
```

Then submit:
- Google Search Console — add property, request indexing, submit `https://wielegroup.com/sitemap.xml`
- Bing Webmaster — same

---

## 4. Redirect smoke-test

```bash
for src_dst in \
  "/services::/systems" \
  "/services/seo::/systems/search" \
  "/services/aeo::/systems/ai-visibility" \
  "/services/geo::/systems/ai-visibility" \
  "/services/marketing::/systems/brand-authority" \
  "/services/advertising::/systems/brand-authority" \
  "/services/web-design::/systems/web-experience" \
  "/work::/proof" \
  "/journal::/labs"; do
  src="${src_dst%%::*}"
  expected="${src_dst##*::}"
  loc=$(curl -sI "https://wielegroup.com${src}" | grep -i '^location:' | awk '{print $2}' | tr -d '\r\n')
  if [[ "$loc" == "https://wielegroup.com${expected}" || "$loc" == "${expected}" ]]; then
    echo "  PASS  $src -> $expected"
  else
    echo "  FAIL  $src -> expected $expected, got '$loc'"
  fi
done
```

---

## 5. Likely fixes if production Lighthouse misses 100

Local Lighthouse on `npm run start` returned: **Performance 55 (mobile), Accessibility 94, Best Practices 100, SEO 100**.

Production over HTTPS + HTTP/2 + Cloudflare CDN typically lifts mobile Performance by 20–40 points. If gate 1 (Desktop = 100) or gate 2 (Mobile ≥ 95) misses on production, profile the failing route with Chrome DevTools → Performance tab and apply the targeted fix:

| Symptom | Fix |
|---------|-----|
| LCP > 2.5s on `/` | Set `priority` on the hero `<Image>` if any; preload Inter font; consider `fetchpriority="high"` on the simulator container |
| CLS > 0.1 | Reserve explicit `min-height` / `aspect-ratio` on hero, simulator, OG cards, signal cards |
| Long tasks > 200ms | Code-split framer-motion via dynamic import; defer PromptSimulator animation start; `useReducedMotion` already short-circuits the rAF loop |
| INP > 200ms on form submit | Already async; verify Turnstile widget isn't blocking |
| Accessibility < 100 | Run `axe-core` locally to identify specific violations; usually colour contrast on `text-smoke` against dark backgrounds — bump to `text-silver` if so |

Fix-forward in this branch (Phase 6 is the deploy phase — fixes here are part of the deploy, not a new phase).

---

## 6. Stub → real wiele-ai swap (Phase 5+)

When wiele-ai sprints 4–9 ship and the engine is live:

1. Cloudflare dashboard → Settings → Environment variables → Production
2. Set `WIELE_AI_API_URL` to the real engine base URL (no trailing slash)
3. Set `WIELE_AI_API_KEY` to the server-to-server bearer token
4. Trigger a redeploy (next push or manual deploy)

Zero code changes. The route handler at [src/app/api/audit/route.ts](src/app/api/audit/route.ts) detects the env change and routes to the real engine. The fail-open pattern still applies — if wiele-ai is down, the lead is still in KV and the founder still gets the email.

---

## 7. Phase 7+ tasks (not Phase 6)

- Remove the legacy redirect block in [next.config.ts](next.config.ts) — `TODO(2026-08-03)`, only after Search Console + Plausible referrer data confirm zero traffic to `/services/*`, `/work`, `/journal` for 30 days
- Fill in `[FOUNDER REVIEW]` markers across `/about`, `/trust`, the 3 Labs MDX articles
- Fill in `[CASE STUDY PENDING]` placeholders on `/proof` once first case studies clear NDA
- Fill in `[LEGAL REVIEW]` markers on `/trust`, `/privacy`, `/terms` after counsel sign-off
- Plausible custom event for audit form submission (engagement metric)
- A/B test on audit form friction (single page vs progressive disclosure) — only after baseline traffic is significant

---

## Authority + memory

- Directive: `../CLAUDE_CODE_HANDOFF_wielegroup.com_2026-05-03.md`
- Memory: `feedback_phase_discipline.md`, `feedback_cutover_discipline.md`, `feedback_zero_cost_discipline.md`, `feedback_lead_capture_failopen.md`
- CLAUDE.md regression-prevention notes: see `## Patterns that must NOT regress` section
