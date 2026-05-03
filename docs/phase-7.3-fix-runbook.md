# Phase 7.3 Fix — Custom Domain Binding (Status + Founder Runbook)

**Date:** 2026-05-03 (afternoon, post-7.3 attempt)
**Status:** ⚠️ Custom domains NOT YET bound. Worker code is healthy — workers.dev URL serves 200. Issue is purely the route binding for `wielegroup.com` + `www.wielegroup.com`.

---

## Diagnosis

### What's wrong

`https://wielegroup.com` returns HTTP 403 (Cloudflare default error page) instead of routing to the `wielegroup-com` Worker.

### Root cause

The apex zone `wielegroup.com` has **pre-existing externally-managed DNS records** (A or CNAME, likely from a prior host before the Worker existed). Cloudflare Workers Custom Domain attach refuses to overwrite these records without explicit override.

Cloudflare returns API error `100117`:
> Hostname 'wielegroup.com' already has externally managed DNS records (A, CNAME, etc). Either delete them, try a different hostname, or use the option 'override_existing_dns_record' to override.

### Why the CLI path is blocked

Three CLI paths attempted, all blocked by the same auth scope gap:

| Path | Result | Reason |
|---|---|---|
| `npx wrangler deploy` (with `routes` in `wrangler.toml`) | Worker uploaded, routes silently rejected | wrangler.toml schema doesn't accept `override_existing_dns_record` field |
| `npx wrangler triggers deploy` (experimental) | Error 100117 | Same root cause |
| Direct `PUT /accounts/.../workers/domains` API call with `override_existing_dns_record: true` | Error 100117 | OAuth token from `wrangler login` lacks `dns_records:edit` scope |

The wrangler OAuth token's scopes (verified at `~/Library/Preferences/.wrangler/config/default.toml`):
```
account:read, user:read, workers:write, workers_kv:write,
workers_routes:write, workers_scripts:write, workers_tail:read,
zone:read, ssl_certs:write, ...
```

Notice: **no `dns_records:edit`**. Cloudflare's API requires this scope on the token before honoring `override_existing_dns_record: true`.

---

## Fix path — founder dashboard action (~5 min)

This is the FIX directive's Step 2C (last-resort dashboard fallback). It works because the dashboard uses session auth with full-account scope, not the down-scoped OAuth token.

### Option A — Recommended: Add Custom Domain via dashboard with override prompt

1. Open: https://dash.cloudflare.com/0edf698a8da62c67cde23e4f97de7a1b/workers/services/view/wielegroup-com/production/triggers
2. Scroll to **Custom Domains** section → **Add Custom Domain**
3. Enter `wielegroup.com` → click Add
4. Cloudflare detects the existing DNS records and shows: *"This hostname has existing DNS records. Override them?"* — click **Override**
5. SSL provisions automatically (~5–15 min)
6. Repeat steps 2–5 for `www.wielegroup.com`

### Option B — Alternative: Delete conflicting DNS records first, then attach

If the override prompt doesn't appear, manually delete the existing A/CNAME records first:

1. Open: https://dash.cloudflare.com/0edf698a8da62c67cde23e4f97de7a1b/wielegroup.com/dns/records
2. Look for A or CNAME records pointing at the apex (`wielegroup.com`) — delete them
3. Look for A or CNAME records pointing at `www` — delete them
4. **Do NOT delete** MX, TXT, CAA, NS records — those are email + verification + nameserver records, unrelated to web routing
5. Then run Option A from Step 2 (it'll succeed without an override prompt)

---

## Post-attachment verification

After the domains attach, run from this repo:

```bash
cd ~/Documents/Claude/Projects/Wiele\ Group\ Operations/wielegroup.com

# Verify domains route to the Worker (apex + www)
curl -sI -o /dev/null -w "wielegroup.com:     HTTP %{http_code}\n" https://wielegroup.com
curl -sI -o /dev/null -w "www.wielegroup.com: HTTP %{http_code}\n" https://www.wielegroup.com
# Expect: 200 + 200 (or 308 for www→apex if you set up that redirect)

# Verify HSTS now fires (was dormant on workers.dev)
curl -sI https://wielegroup.com/ | grep -i 'strict-transport'
# Expect: strict-transport-security: max-age=63072000; includeSubDomains; preload

# Verify all 6 security headers
curl -sI https://wielegroup.com/ | grep -ciE '^(strict-transport|content-security|x-frame|x-content|referrer|permissions)'
# Expect: 6

# Verify sitemap article entries shipped (the Phase 7.1 fix)
curl -s https://wielegroup.com/sitemap.xml | grep -c '<loc>'
# Expect: 17

# Verify llms.txt
curl -s https://wielegroup.com/llms.txt | wc -c
# Expect: ~1225 bytes
```

Then the rest of the 9-gate verification from `DEPLOY.md §3`:

- [ ] Lighthouse Desktop = 100/100/100/100 on `/`, `/audit`, `/pricing`, `/systems`, `/labs/<slug>`
- [ ] Lighthouse Mobile ≥ 95 on the same 5 routes
- [ ] axe-core 0 violations: `npx @axe-core/cli https://wielegroup.com/<route>`
- [ ] All 9 redirects 308 with correct Location: see `DEPLOY.md §4` curl loop, swap workers.dev URL → wielegroup.com
- [ ] llms.txt + sitemap.xml + robots.txt all 200, content valid (already covered above)
- [ ] OG card renders in opengraph.xyz + Twitter Card Validator
- [ ] JSON-LD validates at validator.schema.org on `/`, `/audit`, `/labs/<slug>` — zero errors
- [ ] securityheaders.com = grade A
- [ ] SSL Labs = grade A+

---

## Tag v1.0-public-launch

Only after **all 9 gates pass** on `https://wielegroup.com`:

```bash
cd ~/Documents/Claude/Projects/Wiele\ Group\ Operations/wielegroup.com
git tag -a v1.0-public-launch -m "Production launch — all 9 post-deploy gates verified on https://wielegroup.com"
git push origin v1.0-public-launch
```

Then submit:
- Google Search Console — add property, request indexing, submit `https://wielegroup.com/sitemap.xml`
- Bing Webmaster — same flow

---

## What's already correct (don't touch)

- **Worker code**: builds clean, deploys clean, serves 200 on workers.dev. Phase 7.1 fixes are live (sitemap manifest, schema sweep). Phase 7.2 fixes are live (HSTS + CSP at app layer).
- **`wrangler.toml`** routes block (with `custom_domain = true` on both routes) — this IS the right config; the dashboard attach completes what wrangler couldn't.
- **`next.config.ts`** headers (HSTS + CSP + 4 baseline headers).
- **`public/_headers`** static-asset headers (matching CSP).

After the dashboard fix lands, future deploys (`npx wrangler deploy`) will succeed without the override prompt because the routes are already bound — wrangler just confirms them.

---

## If a future Cloudflare change makes this fixable from CLI

If/when Cloudflare adds `dns_records:edit` to the wrangler OAuth scope (or adds an `override_existing_dns_record` flag to wrangler.toml's `routes` schema), the dashboard fix can be replaced by:

```bash
# Future-state — not currently working as of wrangler 4.87
npx wrangler deploy --override-existing-records  # hypothetical flag
```

Until then: dashboard for first-attach, CLI for subsequent operations.

---

## Memory annotation

After v1.0 tag lands, update `wielegroup_milestone.md` with:
- Production URL: `https://wielegroup.com`
- v1.0 tag commit hash
- Lighthouse scores (Desktop + Mobile per route)
- securityheaders.com grade
- SSL Labs grade
- GSC + Bing submission timestamps
