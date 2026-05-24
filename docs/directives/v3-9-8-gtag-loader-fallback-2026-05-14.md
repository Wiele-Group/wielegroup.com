# DIRECTIVE v3.9.8 · GA4 Loader Fallback (gtag/js → gtm.js)
**Issued:** 2026-05-14 (evening, post-Cowork GA4 verification)
**Tag:** `v3.9.8-gtag-loader-fallback`
**Branch:** `fix/v3-9-8-gtag-loader-fallback-2026-05-14`
**Severity:** P1 — v3.9.7 ships GA4 wiring that loads `googletagmanager.com/gtag/js?id=G-8YCESQ46BH`, which Google's CDN currently returns **HTTP 404** for. Real visitors hitting wielegroup.com between v3.9.7 ship and v3.9.8 deploy get **zero GA4 telemetry**. Plausible still works (Plausible loader returns 200, fallback intact). 4 days to Monday 2026-05-18 100-prospect outreach — patch removes the loader gap before campaign launch.
**Authority:** Founder approval — chat reply "ship v3.9.8" 2026-05-14 evening, post Cowork verification report. Cowork autonomous-judgment-authority (elevated 2026-05-14 morning).
**Cowork pre-validation:** ESLint clean, Prettier no-op (format already correct), grep gates green (1 active gtm.js / 0 active gtag/js), git diff is surgical (only `src/components/google-analytics.tsx` modified). Ready for Claude Code execution.

---

## §0a — READY TO EXECUTE (paste into Claude Code on founder's Mac)

> Claude Code, execute directive v3.9.8 in full. Path:
> `~/Documents/Claude/Projects/Wiele Group Operations/wielegroup.com/docs/directives/v3-9-8-gtag-loader-fallback-2026-05-14.md`
>
> Cowork has already staged the single edit in
> `src/components/google-analytics.tsx` and pre-validated ESLint + Prettier
> + grep gates. Run §0 pre-flight, §4 T1-T4 (verify staged edit + commit),
> §5 deploy, §6 all 8 PROD validation gates, §7 rollback only if any §6
> fails, §8 reporting append to Apple Notes "Wiele Founder Diary".
> Capture the new Worker version_id from wrangler output for the diary
> entry. Founder gate already settled (deploy now). On §6 PASS, also
> write the Cowork memory project file referenced in §8.

---

## §0 — PRE-FLIGHT (binding · run all before §4 edits)

```bash
cd ~/Documents/Claude/Projects/Wiele\ Group\ Operations/wielegroup.com
git fetch origin && git checkout main && git pull origin main
git checkout -b fix/v3-9-8-gtag-loader-fallback-2026-05-14
node -v   # expect: v22 or v24
npm -v
```

Confirm working tree pre-this-directive shows exactly:
```
 M src/components/google-analytics.tsx
```

This single modification is the **Cowork-staged edit** for this directive. Pre-staged means the §4 edit is already on disk — verify, then commit. Do **not** re-apply.

Verify the staged edit is byte-correct:
```bash
git diff src/components/google-analytics.tsx
```

Expected diff: one `<Script src=...>` line changes from `/gtag/js?id=` to `/gtm.js?id=`, plus a multi-line docstring above it explaining the v3.9.8 reasoning. If diff is empty or different, **STOP** and surface to founder.

---

## §1 — DIAGNOSIS (proof · binding context)

### What broke

`src/components/google-analytics.tsx:83` shipped (in v3.9.7) the canonical GA4 loader URL:

```tsx
src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
```

For Measurement ID `G-8YCESQ46BH`, this URL returns Google's standard 404 HTML:

```
HTTP 404 (1584B) — "Error 404 (Not Found)!!1"
"The requested URL /gtag/js?id=G-8YCESQ46BH was not found on this server."
```

### Verification (3 independent network egresses · 2026-05-14 ~19:00 UK)

| Test | Endpoint | Result |
|---|---|---|
| Chrome (founder browser) — initial page-load network | `gtag/js?id=G-8YCESQ46BH` | **HTTP 503** |
| Chrome — direct nav to URL | `gtag/js?id=G-8YCESQ46BH` | Google's **404** HTML page |
| Chrome — programmatic `<script>` inject with cache-bust | `gtag/js?id=G-8YCESQ46BH&_t=...` | **`onerror` fired** |
| Sandbox `curl` (different network egress) | `gtag/js?id=G-8YCESQ46BH` | **HTTP 404** |
| Sandbox `curl` — control with fake MID | `gtag/js?id=G-FAKEFAKE99` | **HTTP 200** |
| Sandbox `curl` — control with real public MID | `gtag/js?id=G-XXXXXXXX` | **HTTP 200** (394KB) |
| Sandbox `curl` — alternate loader endpoint | `gtm.js?id=G-8YCESQ46BH` | **HTTP 200** (235KB) ✓ |

**Conclusion:** The 404 is **specific to this MID on the `gtag/js` URL pattern**. It is not a local browser issue (sandbox reproduces it), not a CSP issue (script tag is in DOM, fetch fails at network level), not a Cloudflare issue (Worker proxies wielegroup.com → Cloudflare; the loader URL goes direct to Google's CDN). The `gtm.js` endpoint serves the same MID without issue.

### What is NOT broken

- ✅ GA4 stream `14880432388` is healthy. `/g/collect` returns 204 for this MID.
- ✅ Realtime overview renders synthetic hits (Cowork sent 3 test events 2026-05-14 ~19:00 UK; `page_view`, `cowork_verification_ping`, `v3_9_7_verification_complete` all visible).
- ✅ Inline init script + Consent Mode v2 default-denied posture is wired correctly in production HTML (verified server-side curl).
- ✅ Plausible loader returns 200 (cookie-less daily ops fallback intact).
- ✅ Pre-consent cookie posture remains 0 cookies (UK GDPR/PECR floor met).

### Why the fix is `gtm.js` not waiting for Google to fix `gtag/js`

Three reasons:

1. **`gtm.js?id=G-XXX` is a documented Google-supported loader URL.** When invoked with a GA4 Measurement ID, it serves a 235KB bundle containing `gtag` init, Consent Mode handling, and `/g/collect` collection logic — verified by grep on the response body (1 reference to `G-8YCESQ46BH`, 12 to `gtag`, 14 to `consent`, 1 to `g/collect`).
2. **Same dataLayer contract.** Both endpoints honour the inline dataLayer queue (`gtag('consent','default',...)` + `gtag('config', ...)`) the same way. No behaviour change for downstream code.
3. **Self-healing.** If Google's CDN later restores `gtag/js` for our MID, the `gtm.js` loader continues to function. Zero need to revert v3.9.8.

### Trade-off (small, accepted)

`gtm.js` is ~140KB larger than `gtag/js` (235KB vs ~95KB minified). On a `strategy="afterInteractive"` Next.js script, this loads after page interactivity — no Core Web Vitals impact. Acceptable cost for restored telemetry.

---

## §3 — FOUNDER GATES (single decision)

| # | Gate | Recommendation | Decision |
|---|---|---|---|
| 1 | Deploy v3.9.8 NOW vs wait 24-48h to see if Google's CDN self-heals `gtag/js`? | **Deploy now.** v3.9.8 is robust regardless of whether Google fixes their end. Waiting risks ~96h of GA4 dark + missing the Monday 2026-05-18 outreach window. | _PENDING_ |

If founder approves: proceed §4. If founder defers: hold the staged edit on branch `fix/v3-9-8-gtag-loader-fallback-2026-05-14` (do not commit), revisit Sunday 2026-05-17 evening when scheduled-task `wiele-sunday-pre-monday-verification-2026-05-17` fires.

---

## §4 — TASKS

### T1 · Verify staged edit (pre-reads + acceptance)

**Pre-read:** `src/components/google-analytics.tsx` (89 lines pre-edit · ~108 lines post-edit including expanded docstring).

**Acceptance:**
- Line containing `<Script src=` references `/gtm.js?id=` (NOT `/gtag/js?id=`)
- Multi-line JSDoc above the `<Script>` references "v3.9.8 (2026-05-14)" and explains the `gtm.js` fallback reasoning
- TypeScript compiles: `npx tsc --noEmit` exits 0
- ESLint clean on the file

**Verify:**
```bash
# Active <Script src=> line — must be gtm.js (not gtag/js)
grep -E 'src=\{`https://www\.googletagmanager\.com/gtm\.js\?id=' src/components/google-analytics.tsx
# Expect: 1 line containing the gtm.js src binding

grep -E 'src=\{`https://www\.googletagmanager\.com/gtag/js\?id=' src/components/google-analytics.tsx
# Expect: 0 matches (the active <Script src=> must NOT use gtag/js)

# Total occurrences (active code + docstring):
grep -c 'gtm.js?id=' src/components/google-analytics.tsx     # expect: 3 (1 active + 2 in v3.9.8 docstring)
grep -c 'gtag/js?id=' src/components/google-analytics.tsx    # expect: 2 (0 active + 2 in docstring referencing the broken URL)
grep -c 'v3.9.8' src/components/google-analytics.tsx          # expect: ≥1

npx tsc --noEmit
npx eslint src/components/google-analytics.tsx
```

### T2 · Format

```bash
npx prettier --write src/components/google-analytics.tsx
```

### T3 · Commit (Commit-Before-Deploy Law)

```bash
git add src/components/google-analytics.tsx
git status   # confirm only this file staged
git commit -m "fix(ga4): switch loader from gtag/js to gtm.js — Google CDN 404 fallback

v3.9.7 shipped GA4 wiring using the canonical loader URL
\`googletagmanager.com/gtag/js?id=G-8YCESQ46BH\` — verified via
3 independent network egresses (Chrome, sandbox curl, programmatic
script.onerror) to return Google's HTTP 404 page for this specific
Measurement ID. Control MIDs (G-FAKEFAKE99, G-XXXXXXXX) return 200
on the same URL pattern, so the 404 is MID-scoped — not a global
Google outage and not a local network issue.

The /g/collect ingestion endpoint accepts hits for G-8YCESQ46BH
(verified 204 No Content + Realtime render of synthetic hits),
proving the stream itself is healthy — only the loader is broken.

Fix: switch to googletagmanager.com/gtm.js?id=G-8YCESQ46BH which
returns 200 with a 235KB bundle containing the same gtag init,
Consent Mode handling, and /g/collect logic. Both endpoints honour
the inline dataLayer queue identically — no behaviour change for
downstream code or Consent Mode v2 default-denied posture.

Trade-off: ~140KB additional script weight, loaded with
strategy='afterInteractive' so no Core Web Vitals impact.

Self-healing: if Google's CDN later restores gtag/js for this MID,
gtm.js continues to function — no revert needed.

Authority: Cowork autonomous-judgment-authority (elevated
2026-05-14 morning). Post-v3.9.7 verification finding.
Tag: v3.9.8-gtag-loader-fallback
Pre-Monday-2026-05-18 100-prospect outreach P1."
```

### T4 · Pre-deploy gate

```bash
npm run typecheck && npm run lint && npm run build:cf
```

Expected: all 3 clean. `.open-next/` rebuilt. Stop if any fails.

---

## §5 — DEPLOY

```bash
npm run deploy:cf   # wraps: build:cf → wrangler deploy → indexnow:ping
```

Watch wrangler output for the new Worker `version_id`. Capture for §8 reporting.

---

## §6 — VALIDATION (against PROD — Live-or-Nothing Law)

```bash
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15'

# Gate 1: HTML now references gtm.js (not gtag/js)
curl -s -A "$UA" https://wielegroup.com/ | grep -c 'gtm.js?id=G-8YCESQ46BH'   # expect: 1
curl -s -A "$UA" https://wielegroup.com/ | grep -c 'gtag/js?id=G-8YCESQ46BH'  # expect: 0

# Gate 2: gtm.js loader actually serves 200 from Google's CDN for our MID
curl -sS -o /dev/null -w 'gtm.js loader: HTTP %{http_code} | %{size_download}B\n' \
  'https://www.googletagmanager.com/gtm.js?id=G-8YCESQ46BH' --max-time 8
# Expect: HTTP 200 | ~235000B

# Gate 3: GA4 ingestion still alive (sanity)
CID="v398-validate-$(date +%s)"
curl -sS -o /dev/null -w 'g/collect: HTTP %{http_code}\n' \
  -H "User-Agent: $UA" \
  "https://www.google-analytics.com/g/collect?v=2&tid=G-8YCESQ46BH&cid=${CID}&en=v3_9_8_validation&dl=https%3A%2F%2Fwww.wielegroup.com%2F&_s=1"
# Expect: HTTP 204

# Gate 4: Consent Mode v2 default-denied still in HTML
curl -s -A "$UA" https://wielegroup.com/ | grep -c "ad_storage: 'denied'"   # expect: 1
curl -s -A "$UA" https://wielegroup.com/ | grep -c "analytics_storage: 'denied'"   # expect: 1
curl -s -A "$UA" https://wielegroup.com/ | grep -c "wait_for_update: 500"   # expect: 1

# Gate 5: Inline init still BEFORE the gtm.js script tag (DOM order matters)
curl -s -A "$UA" https://wielegroup.com/ > /tmp/v398.html
INLINE_POS=$(grep -bo 'gtag(.consent., .default.' /tmp/v398.html | head -1 | cut -d: -f1)
LOADER_POS=$(grep -bo 'gtm.js?id=' /tmp/v398.html | head -1 | cut -d: -f1)
[ "$INLINE_POS" -lt "$LOADER_POS" ] && echo "✓ inline-before-loader" || echo "✗ ORDER VIOLATION"

# Gate 6: Cloudflare cache MISS → HIT after warm
curl -s -A "$UA" -L --compressed -D /dev/stderr -o /dev/null "https://wielegroup.com/" 2>&1 | grep -i cf-cache-status
sleep 4
curl -s -A "$UA" -L --compressed -D /dev/stderr -o /dev/null "https://wielegroup.com/" 2>&1 | grep -i cf-cache-status
# Expect: MISS then HIT

# Gate 7: Sitemap byte-stable 30s apart (regression — must hold)
curl -s -A "$UA" https://wielegroup.com/sitemap.xml | grep -oE '<lastmod>[^<]+' | sort -u > /tmp/l1.txt
sleep 30
curl -s -A "$UA" https://wielegroup.com/sitemap.xml | grep -oE '<lastmod>[^<]+' | sort -u > /tmp/l2.txt
diff /tmp/l1.txt /tmp/l2.txt && echo "✓ sitemap byte-stable"

# Gate 8: Browser-side end-to-end — open https://wielegroup.com in fresh incognito,
# then refresh GA4 Realtime overview at:
# https://analytics.google.com/analytics/web/#/p537795532/realtime/overview
# Expect: 1 active user appears within 60 seconds, page_view event fires,
# source = wielegroup.com (or "(direct)" if no UTM).
```

All 8 gates must PASS before tag-and-push.

### Tag + push

```bash
git checkout main
git merge --no-ff fix/v3-9-8-gtag-loader-fallback-2026-05-14 -m "Merge — v3.9.8-gtag-loader-fallback"
git tag -a v3.9.8-gtag-loader-fallback -m "v3.9.8 — switch GA4 loader gtag/js → gtm.js (Google CDN 404 fallback)"
git push origin main
git push origin refs/tags/v3.9.8-gtag-loader-fallback
```

---

## §7 — ROLLBACK (if any §6 gate fails)

```bash
git checkout main
git revert HEAD --no-edit   # reverts the v3.9.8 merge
npm run deploy:cf            # redeploys v3.9.7 state
git push origin main
```

Rollback restores the v3.9.7 `gtag/js` loader URL — GA4 returns to 404-loader state but Plausible continues unaffected. Surface failure to Cowork (Apple Notes "Wiele Founder Diary" → tag `[REGRESSION v3.9.8]`) with the exact gate that failed and the curl output.

---

## §8 — REPORTING

On §6 PASS, append to Apple Notes "Wiele Founder Diary":

```
[DONE v3.9.8 · 2026-05-14 · HH:MM UK]
GA4 Loader Fallback SHIPPED.
- src/components/google-analytics.tsx — 1-line src swap (gtag/js → gtm.js) + docstring
- Worker version: <version_id from wrangler>
- All 8 §6 PROD gates green
- gtag/js?id=G-8YCESQ46BH still 404s on Google CDN as of deploy time (recheck weekly)
- GA4 telemetry restored end-to-end before Monday 2026-05-18 outreach (4-day buffer)
- Plausible coexists unchanged
- Pre-consent cookie posture preserved (0 cookies, UK GDPR/PECR intact)
- Open loop: re-test https://www.googletagmanager.com/gtag/js?id=G-8YCESQ46BH weekly;
  if Google later restores 200, NO action needed (gtm.js continues to work);
  if revert is desired for canonical-URL hygiene, single-line revert is trivial.
```

Then update Cowork memory:

```
project_v3_9_8_gtag_loader_fallback_shipped_2026_05_14.md
```

with: ship state, gate results, Worker version, the verification command sequence,
and the open loop on weekly gtag/js recheck.

---

## §9 — POST-MORTEM (root cause investigation · non-blocking)

After §8, file Google support ticket against Measurement ID `G-8YCESQ46BH`:

> "GA4 Measurement ID G-8YCESQ46BH (Property 537795532, Stream 14880432388,
> Account 394911739) returns HTTP 404 on the gtag/js loader URL
> (https://www.googletagmanager.com/gtag/js?id=G-8YCESQ46BH) while the
> /g/collect ingestion endpoint accepts hits successfully (204 No Content)
> and the gtm.js loader URL serves correctly (200, 235KB). Confirmed
> reproducible across multiple network egresses and 12+ hours after stream
> creation. Other Measurement IDs (G-FAKEFAKE99, G-XXXXXXXX) return 200 on
> the same gtag/js URL pattern, so this appears to be MID-specific. Please
> investigate CDN routing for this stream's gtag/js loader."

Resolution outcome will inform whether v3.9.9 reverts to canonical `gtag/js`.

---

**End of directive v3.9.8.**
