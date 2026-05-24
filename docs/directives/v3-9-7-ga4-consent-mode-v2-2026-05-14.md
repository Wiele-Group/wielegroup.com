# DIRECTIVE v3.9.7 · GA4 + Consent Mode v2 (default-denied)
**Issued:** 2026-05-14 (evening) — Cowork orchestrator
**Tag:** `v3.9.7-ga4-consent-mode-v2`
**Branch:** `xray/v3-9-7-ga4-consent-mode-v2-2026-05-14`
**Severity:** P1 — non-urgent ship. GA4 telemetry adds Google Search Console closed-loop signal + future Google Ads attribution. Plausible (cookie-less) keeps running in parallel.
**Authority:** Founder approval "A" (post-XRAY recommendation pack, 2026-05-14).

---

## §0 — PRE-FLIGHT (binding · run all before §4 edits)

```bash
cd ~/Documents/Claude/Projects/Wiele\ Group\ Operations/wielegroup.com
git fetch origin && git checkout main && git pull origin main
git checkout -b xray/v3-9-7-ga4-consent-mode-v2-2026-05-14
node -v   # expect: v22 or v24
```

Verify the **Cowork-staged edits** are byte-correct on disk:

```bash
git status --short
# Expect:
#  M next.config.ts
#  M src/app/layout.tsx
#  M src/app/privacy/page.tsx
# ?? src/components/google-analytics.tsx
# (plus possibly the leftover v3.9.6 directive doc — already merged on main)
```

Inspect:

```bash
ls -la src/components/google-analytics.tsx       # expect ~3700 bytes
git diff src/app/layout.tsx                       # expect: + import GoogleAnalyticsScript + render after PlausibleScript
git diff next.config.ts                           # expect: CSP widened (script-src + connect-src)
git diff src/app/privacy/page.tsx                 # expect: LAST_UPDATED bump + 2 new <li> entries (GA4 disclosure)
```

If any expected change is missing, **STOP** and surface to founder.

Verify env var present:

```bash
grep -c "^NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-8YCESQ46BH" .env.local   # expect: 1
grep -c "NEXT_PUBLIC_GA4_MEASUREMENT_ID" .env.local.example          # expect: 1
```

`.env.local.example` is gitignored along with `.env.local` — change is purely for local-machine documentation. Will NOT appear in `git status`.

---

## §3 — FOUNDER GATES (settled — proceed)

| # | Gate | Decision |
|---|---|---|
| 1 | Consent posture — A (Consent Mode v2 default-denied) · B (banner) · C (skip GA4) | **A — Consent Mode v2 default-denied.** Confirmed 2026-05-14. Aligned with Google's EEA guidance. |
| 2 | Coexistence with Plausible | **Keep both.** Plausible = daily ops · GA4 = GSC closed-loop + future Google Ads attribution. |
| 3 | `anonymize_ip: true` flag | **YES.** Defensive — GA4 doesn't log IPs by default but the flag is preserved for audit trail. |
| 4 | `wait_for_update: 500` reserve future banner | **YES.** Lets a future opt-in banner flip categories without code changes. |

All four settled. Zero remaining decisions.

---

## §4 — TASKS

### T1 · Verify staged edits (pre-reads + acceptance)

**Pre-read:**
- `src/components/google-analytics.tsx` (NEW · ~3,700 bytes · Consent Mode v2 + gtag.js)
- `src/app/layout.tsx` (+2 lines: import + render)
- `next.config.ts` (CSP `script-src` + `connect-src` widened)
- `src/app/privacy/page.tsx` (LAST_UPDATED 2026-05-05 → 2026-05-14 · +2 disclosure `<li>`s)
- `.env.local.example` (+1 documented var · gitignored)
- `.env.local` (+1 actual var · gitignored)

**Acceptance:**
- `src/components/google-analytics.tsx` exports `GoogleAnalyticsScript`, gates on `NEXT_PUBLIC_GA4_MEASUREMENT_ID`, sets Consent Mode v2 default-denied **before** `gtag('config')`.
- `src/app/layout.tsx` renders `<GoogleAnalyticsScript />` immediately after `<PlausibleScript />` inside `<body>`.
- `next.config.ts` CSP `script-src` contains both `https://*.googletagmanager.com` and `https://www.googletagmanager.com`; `connect-src` contains `https://*.google-analytics.com`, `https://www.google-analytics.com`, `https://*.analytics.google.com`.
- `src/app/privacy/page.tsx` has new "Anonymous analytics — Google Analytics 4" disclosure + processor section + Last-updated 2026-05-14.

**Verify:**
```bash
grep -c "Consent Mode v2" src/components/google-analytics.tsx              # ≥ 1
grep -c "default-denied" src/components/google-analytics.tsx               # ≥ 1
grep -c "wait_for_update" src/components/google-analytics.tsx              # 1
grep -c "GoogleAnalyticsScript" src/app/layout.tsx                          # 2 (import + render)
grep -c "googletagmanager.com" next.config.ts                              # ≥ 1
grep -c "google-analytics.com" next.config.ts                              # ≥ 1
grep -c "Google Analytics 4" src/app/privacy/page.tsx                       # ≥ 2
grep "LAST_UPDATED" src/app/privacy/page.tsx                                # = "2026-05-14"

npx tsc --noEmit                                                            # exit 0
```

### T2 · Lint + format

```bash
npx eslint src/components/google-analytics.tsx src/app/layout.tsx src/app/privacy/page.tsx next.config.ts
npx prettier --write src/components/google-analytics.tsx src/app/layout.tsx src/app/privacy/page.tsx next.config.ts
```

### T3 · Commit (Commit-Before-Deploy Law)

```bash
git add src/components/google-analytics.tsx src/app/layout.tsx next.config.ts src/app/privacy/page.tsx
git status
git commit -m "feat(analytics): add GA4 + Consent Mode v2 (default-denied)

Google Analytics 4 (Measurement ID G-8YCESQ46BH) wired with Consent
Mode v2 set to default-denied for all non-essential categories. GA4
sends only cookieless aggregate ping signals until a future banner
exists — no cookies set, no PII collected, no advertising data.

UK GDPR + PECR compliant by construction. Runs in parallel with
Plausible (cookieless, EU-hosted) — Plausible for daily ops, GA4 for
Google Search Console closed-loop and future Google Ads attribution.

Implementation:
- src/components/google-analytics.tsx (NEW) — mirrors PlausibleScript
  pattern, env-gated on NEXT_PUBLIC_GA4_MEASUREMENT_ID, sets Consent
  Mode v2 default before gtag.js loads.
- src/app/layout.tsx — render <GoogleAnalyticsScript /> after
  <PlausibleScript /> in <body>.
- next.config.ts — CSP widened: script-src adds googletagmanager.com,
  connect-src adds google-analytics.com (+ wildcards for region1 /
  region5 / regional endpoints).
- src/app/privacy/page.tsx — GA4 disclosure added to 'What we collect'
  and 'Where your data lives' sections; LAST_UPDATED bumped to
  2026-05-14.
- .env.local + .env.local.example — NEXT_PUBLIC_GA4_MEASUREMENT_ID
  documented + set (gitignored, surfaces only as a local doc change).

Authority: founder approval A (post-XRAY recommendation pack 2026-05-14).
Tag: v3.9.7-ga4-consent-mode-v2"
```

### T4 · Pre-deploy gate

```bash
npm run typecheck && npm run lint && npm run build:cf
```

All three must clean. Build re-stamps `src/lib/static-route-lastmod.generated.json` per the v3.9.6 lesson — if the gate trips on dirty tree, `git add` the regenerated artefact in a separate `chore: lastmod regen` commit (same pattern as v3.9.6).

---

## §5 — DEPLOY

```bash
npm run deploy:cf
```

Expect: wrangler returns a new `version_id`. IndexNow fires sitemap URLs.

---

## §6 — VALIDATION (against PROD — Live-or-Nothing Law)

```bash
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15'

# 1. CSP header on every route includes the new allowlists
curl -sI -A "$UA" https://wielegroup.com/ | grep -oE "content-security-policy:[^\r\n]+" | grep -c "googletagmanager.com"           # ≥ 1
curl -sI -A "$UA" https://wielegroup.com/ | grep -oE "content-security-policy:[^\r\n]+" | grep -c "google-analytics.com"          # ≥ 1
curl -sI -A "$UA" https://wielegroup.com/pricing | grep -oE "content-security-policy:[^\r\n]+" | grep -c "googletagmanager.com"   # ≥ 1

# 2. gtag.js script tag visible in homepage HTML
curl -s -A "$UA" https://wielegroup.com/ | grep -c "https://www.googletagmanager.com/gtag/js?id=G-8YCESQ46BH"                    # = 1
curl -s -A "$UA" https://wielegroup.com/ | grep -c "G-8YCESQ46BH"                                                                 # ≥ 2 (script src + config)

# 3. Consent Mode v2 default-denied is in the page
curl -s -A "$UA" https://wielegroup.com/ | grep -c "ad_storage: 'denied'"                                                         # = 1
curl -s -A "$UA" https://wielegroup.com/ | grep -c "analytics_storage: 'denied'"                                                  # = 1

# 4. Plausible still rendering (no regression)
curl -s -A "$UA" https://wielegroup.com/ | grep -c "plausible.io/js/script.js"                                                    # = 1

# 5. v3.9.6 pricing fix still holds (no regression)
curl -s -A "$UA" https://wielegroup.com/pricing | grep -c "buy.stripe.com"                                                        # = 0
curl -s -A "$UA" https://wielegroup.com/pricing | grep -c "Begin with a Signal Audit or a Strategy Call"                          # = 1

# 6. Privacy page disclosure live
curl -s -A "$UA" https://wielegroup.com/privacy | grep -c "Google Analytics 4"                                                    # ≥ 2
curl -s -A "$UA" https://wielegroup.com/privacy | grep -c "Consent Mode v2"                                                       # ≥ 1
curl -s -A "$UA" https://wielegroup.com/privacy | grep -c "Last updated · 2026-05-14"                                             # = 1

# 7. AI bot UAs still admitted (no CSP regression breaking them)
for ua in "GPTBot/1.0" "PerplexityBot/1.0" "ClaudeBot/1.0" "Googlebot/2.1" "bingbot/2.0" ; do
  CODE=$(curl -sI -A "Mozilla/5.0 (compatible; $ua)" -o /dev/null -w "%{http_code}" https://wielegroup.com/)
  echo "$ua → $CODE"
done   # all 200

# 8. Sitemap byte-stable 30s apart (regression)
curl -s -A "$UA" https://wielegroup.com/sitemap.xml | grep -oE '<lastmod>[^<]+' | sort -u > /tmp/l1.txt
sleep 30
curl -s -A "$UA" https://wielegroup.com/sitemap.xml | grep -oE '<lastmod>[^<]+' | sort -u > /tmp/l2.txt
diff /tmp/l1.txt /tmp/l2.txt && echo "✓ sitemap byte-stable"
```

### Browser-side spot-check (optional but recommended)

Open `https://wielegroup.com/` in Chrome → DevTools → Network → filter `collect`.

- Expect: one `POST` to `https://region1.google-analytics.com/g/collect?...&gcs=G100&...` on page load.
- `gcs=G100` is the Consent Mode v2 default-denied state code (G1=denied, 0=no flip yet).
- No cookies set (DevTools → Application → Cookies → `wielegroup.com` shows zero `_ga*` cookies).
- Plausible request also fires to `plausible.io` — both running in parallel, no conflict.

### GA4 Realtime confirmation

- Sign in to https://analytics.google.com (account hosting `G-8YCESQ46BH`).
- Reports → Realtime → expect to see Wiele site activity within 30 seconds of any prod page load.
- "Users in last 30 minutes" should increment as you navigate.

### Tag + push

```bash
git checkout main
git merge --no-ff xray/v3-9-7-ga4-consent-mode-v2-2026-05-14 -m "Merge — v3.9.7-ga4-consent-mode-v2"
git tag -a v3.9.7-ga4-consent-mode-v2 -m "v3.9.7 — GA4 + Consent Mode v2 default-denied"
git push origin main
git push origin refs/tags/v3.9.7-ga4-consent-mode-v2
```

---

## §7 — ROLLBACK (if any §6 check fails)

```bash
git checkout main
git revert HEAD --no-edit
npm run deploy:cf
git push origin main
```

Then surface failure to Cowork (Apple Notes "Wiele Founder Diary" tag `[REGRESSION v3.9.7]`).

If failure is CSP-specific (a third-party script blocked by the new policy), the rollback restores the pre-v3.9.7 CSP. GA4 also disappears — Plausible keeps running. Safe failure mode.

---

## §8 — REPORTING

On §6 PASS, append to Apple Notes "Wiele Founder Diary":

```
[DONE v3.9.7 · 2026-05-14 · HH:MM UK]
GA4 + Consent Mode v2 SHIPPED (default-denied).
- Measurement ID: G-8YCESQ46BH live on every public page
- Plausible still running in parallel — no regression
- CSP widened for googletagmanager.com + google-analytics.com
- Privacy page disclosure live, LAST_UPDATED 2026-05-14
- v3.9.6 pricing fix verified intact (no buy.stripe.com refs)
- All 5 AI bot UAs still admitted
- Sitemap byte-stable
- Worker version: <version_id from wrangler>
- GA4 Realtime confirmed (or pending propagation up to 30s)
- Open: future cookie-consent banner = the path to user-level GA4 data
```

---

## ACCEPTANCE CRITERIA (all required)

- [ ] §4 T1 acceptance: 8 grep counts pass + tsc clean
- [ ] §4 T2 lint clean
- [ ] §4 T3 commit lands on `xray/v3-9-7-...` branch with the conventional commit message
- [ ] §5 wrangler deploy returns a new version_id
- [ ] §6 PROD validation: 8 sections all pass (CSP × 3 + gtag tag + consent default × 2 + plausible regression + pricing regression + privacy disclosure + bot UAs + sitemap)
- [ ] Browser-side: GA4 `collect` request fires with `gcs=G100`, no `_ga*` cookies
- [ ] GA4 Realtime dashboard shows activity within 30 seconds
- [ ] Tag `v3.9.7-ga4-consent-mode-v2` pushed to origin
- [ ] Diary entry appended

**End of directive.**
