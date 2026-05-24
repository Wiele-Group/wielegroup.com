# DIRECTIVE v3.9.6 · Pricing Payment-Link Kill (P0 Monday-Block)
**Issued:** 2026-05-14 (afternoon, Cowork XRAY findings)
**Tag:** `v3.9.6-pricing-payment-link-kill`
**Branch:** `xray/v3-9-6-pricing-payment-link-kill-2026-05-14`
**Severity:** P0 — Monday outreach (2026-05-18, 100 prospects, ARMED) sends prospects to /pricing → 5 "Or pay now" buttons → dead Stripe payment links.
**Authority:** Founder approval "B" (contact-first routing) — Cowork XRAY 2026-05-14, post-XRAY recommendation pack.

---

## §0 — PRE-FLIGHT (binding · run all before §4 edits)

```bash
cd ~/Documents/Claude/Projects/Wiele\ Group\ Operations/wielegroup.com
git fetch origin && git checkout main && git pull origin main
git checkout -b xray/v3-9-6-pricing-payment-link-kill-2026-05-14
node -v   # expect: v22 or v24
npm -v
```

Confirm working tree pre-this-directive shows:
```
 M src/components/sections/pricing-section.tsx
 M src/data/pricing.ts
 M src/lib/static-route-lastmod.generated.json
```

These three modifications are the **Cowork-staged edits** for this directive. Pre-staged means the §4 edits are already on disk — verify, then commit. Do **not** re-apply.

Verify the staged edits are byte-correct:
```bash
git diff src/data/pricing.ts | head -80
git diff src/components/sections/pricing-section.tsx
```

Expected: 5 tier `paymentLinkUrl` fields blanked + 1 Sovereign blanked (6 total) + 1 footer copy line replaced. If diff is empty or different, **STOP** and surface to founder.

---

## §3 — FOUNDER GATES (settled — proceed)

| # | Gate | Decision |
|---|---|---|
| 1 | Routing — Option A (reactivate Stripe links) vs Option B (contact-first) vs Option C (hybrid) | **B — contact-first.** Confirmed 2026-05-14. |
| 2 | Footer copy — keep "Self-serve checkout via Stripe" or replace | **Replace** with: *"Begin with a Signal Audit or a Strategy Call. Onboarding scope agreed before any cheque is taken."* |
| 3 | Preserve `paymentLinkUrl` field shape for future flip-back? | **YES** — blank field, don't remove. Field kept on the type. |

All three settled. Zero remaining decisions.

---

## §4 — TASKS

### T1 · Verify staged edits (pre-reads + acceptance)

**Pre-read:** `src/data/pricing.ts` (244 lines · 6 tier objects) · `src/components/sections/pricing-section.tsx` (290 lines).

**Acceptance:**
- All 6 tiers in `pricingTiers` have `paymentLinkUrl: ""`
- One footer `<span>` reads: *"Begin with a Signal Audit or a Strategy Call. Onboarding scope agreed before any cheque is taken."*
- Type compiles: `npx tsc --noEmit` exits 0

**Verify:**
```bash
grep -c 'paymentLinkUrl: ""' src/data/pricing.ts   # expect: 6
grep -c "Begin with a Signal Audit or a Strategy Call" src/components/sections/pricing-section.tsx   # expect: 1
npx tsc --noEmit
```

### T2 · Lint + format

```bash
npx eslint src/data/pricing.ts src/components/sections/pricing-section.tsx
npx prettier --write src/data/pricing.ts src/components/sections/pricing-section.tsx
```

### T3 · Commit (Commit-Before-Deploy Law)

```bash
git add src/data/pricing.ts src/components/sections/pricing-section.tsx
# Do NOT add src/lib/static-route-lastmod.generated.json — pre-existing
# build artefact, will regenerate on next `npm run build:cf` cleanly.
git status
git commit -m "fix(pricing): contact-first routing — kill 5 dead Stripe Pay Now buttons

XRAY 2026-05-14 found all 5 buy.stripe.com payment links on /pricing
returning Stripe's 'no longer active' page. Pre-Monday-2026-05-18
outreach campaign would have sent 100 prospects to dead checkouts.

Strategic intent (per project memory open loop) was contact-first
until 5 case studies close — but the website never got updated when
the payment links were deactivated during the v3.x dashboard lockdown.

Fix: blank paymentLinkUrl on all 6 tiers (field kept on type for
future flip-back). Footer copy updated from 'Self-serve checkout via
Stripe' to a brand-aligned line. Sovereign was always contact-only
in the UI (AnchorTierCard never rendered paymentLinkUrl), so visual
impact is on the 5 standard tier cards only.

Authority: founder approval B (post-XRAY recommendation pack).
Tag: v3.9.6-pricing-payment-link-kill

Related Stripe-side cleanup (already shipped via MCP):
- prod_URvklUfSLtSNZI archived (duplicate Signal Audit)
- price_1TVshQGuLDs0qzh23HO3Kpb1 archived (stale £500 Signal Audit price)"
```

### T4 · Pre-deploy gate

```bash
npm run typecheck && npm run lint && npm run build:cf
```

Expected: all 3 clean. `.open-next/` rebuilt. Stop if any fails.

---

## §5 — DEPLOY

```bash
npm run deploy:cf   # wraps: build:cf → wrangler deploy → indexnow:ping (auto-fires 32 URLs)
```

Watch wrangler output for the Worker version line — expect a new `version_id`.

---

## §6 — VALIDATION (against PROD — Live-or-Nothing Law)

```bash
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15'

# Pricing page returns 200 and contains the new footer copy
curl -s -A "$UA" https://wielegroup.com/pricing | grep -c "Begin with a Signal Audit or a Strategy Call"   # expect: 1
curl -s -A "$UA" https://wielegroup.com/pricing | grep -c "Self-serve checkout via Stripe"   # expect: 0

# No more buy.stripe.com hrefs anywhere on /pricing
curl -s -A "$UA" https://wielegroup.com/pricing | grep -c "buy.stripe.com"   # expect: 0

# Primary CTA links still present and routing to /contact?tier=X
curl -s -A "$UA" https://wielegroup.com/pricing | grep -oE 'href="/contact\?tier=[a-z-]+"' | sort -u
# Expect at minimum:
#   href="/contact?tier=authority-engine"
#   href="/contact?tier=growth-system"
#   href="/contact?tier=launch"
#   href="/contact?tier=sovereign"
#   href="/contact?tier=wiele-os"
# Plus /audit for Signal Audit (different routing).

# Sitemap byte-stable 30s apart (regression — must hold)
curl -s -A "$UA" https://wielegroup.com/sitemap.xml | grep -oE '<lastmod>[^<]+' | sort -u > /tmp/l1.txt
sleep 30
curl -s -A "$UA" https://wielegroup.com/sitemap.xml | grep -oE '<lastmod>[^<]+' | sort -u > /tmp/l2.txt
diff /tmp/l1.txt /tmp/l2.txt && echo "✓ sitemap byte-stable"

# Cloudflare cache MISS → HIT after warm
curl -s -A "$UA" -L --compressed -D /dev/stderr -o /dev/null "https://wielegroup.com/pricing" 2>&1 | grep -i cf-cache-status
sleep 4
curl -s -A "$UA" -L --compressed -D /dev/stderr -o /dev/null "https://wielegroup.com/pricing" 2>&1 | grep -i cf-cache-status
# Expect: MISS then HIT
```

### Tag + push

```bash
git checkout main
git merge --no-ff xray/v3-9-6-pricing-payment-link-kill-2026-05-14 -m "Merge — v3.9.6-pricing-payment-link-kill"
git tag -a v3.9.6-pricing-payment-link-kill -m "v3.9.6 — kill 5 dead Pay Now buttons before Monday outreach"
git push origin main
git push origin refs/tags/v3.9.6-pricing-payment-link-kill
```

---

## §7 — ROLLBACK (if any §6 check fails)

```bash
git checkout main
git revert HEAD --no-edit   # reverts the v3.9.6 merge
npm run deploy:cf            # redeploys prior state
git push origin main
```

Then surface failure to Cowork (Apple Notes "Wiele Founder Diary" → tag `[REGRESSION v3.9.6]`).

---

## §8 — REPORTING

On §6 PASS, append to Apple Notes "Wiele Founder Diary":
```
[DONE v3.9.6 · 2026-05-14 · HH:MM UK]
Pricing Payment-Link Kill SHIPPED.
- 5 dead "Or pay now" buttons removed from /pricing (Signal Audit, Launch, Growth System, Authority Engine, Wiele OS)
- Sovereign tier already contact-only — paymentLinkUrl blanked for consistency
- Footer copy updated: contact-first signal
- Stripe back-office cleaned: prod_URvklUfSLtSNZI archived, price_1TVshQGuLDs0qzh23HO3Kpb1 archived
- Worker version: <version_id from wrangler>
- Monday 2026-05-18 outreach now ships into a clean /pricing surface
- Open loop: 5 dead plinks still sit in Stripe as inactive (will reactivate when "5 case studies close" trigger lands)
```

---

## ACCEPTANCE CRITERIA (all required)

- [ ] §4 T1 acceptance passes (6 blanked `paymentLinkUrl`s + 1 footer line + tsc clean)
- [ ] §4 T2 lint clean
- [ ] §4 T3 commit lands on `xray/v3-9-6-...` branch with the conventional commit message
- [ ] §5 wrangler deploy returns new version_id
- [ ] §6 PROD checks pass (3 grep counts + sitemap byte-stable + CF cache MISS→HIT)
- [ ] Tag `v3.9.6-pricing-payment-link-kill` pushed to origin
- [ ] Diary entry appended

**End of directive.**
