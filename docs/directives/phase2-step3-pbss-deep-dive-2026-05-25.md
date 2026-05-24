# Phase 2 · Step 3 — Premium Brand Site System Deep-Dive Expansion
**Directive version:** phase2-step3-pbss-deep-dive  
**Date:** 2026-05-25  
**Authored by:** Cowork (Claude Sonnet 4.6)  
**Status:** READY FOR CLAUDE CODE — do not deploy until §9 gates pass

---

## §0 · Pre-flight (read before touching a single file)

```bash
# 1. Confirm clean working tree
git status --short
# Expected: nothing uncommitted. If dirty → STOP. Surface to founder.

# 2. Confirm on main
git branch --show-current
# Expected: main

# 3. Confirm latest tag is phase2-step2
git tag --sort=-creatordate | head -1
# Expected: phase2-step2-avm-deep-dive-2026-05-25

# 4. Confirm active Worker
npx wrangler deployments list --name wielegroup-com | head -5
# Record the active Worker version ID.

# 5. Confirm PBSS page resolves
curl -sI https://wielegroup.com/services/premium-brand-site-system | head -5
# Expected: HTTP/2 200

# 6. Confirm internal link targets resolve (all must be 200 before editing)
for path in /audit /services/ai-visibility-monitoring /web-design-agency /pricing; do
  status=$(curl -sI "https://wielegroup.com${path}" | awk '/^HTTP/{print $2}')
  echo "$path → $status"
done
# Expected: all 200

# 7. Confirm AVM page unaffected (Step 2 dependency — must remain 200)
curl -sI https://wielegroup.com/services/ai-visibility-monitoring | head -5
# Expected: HTTP/2 200
```

Hard stop if any pre-flight check fails.

---

## §1 · Objective

Expand `/services/premium-brand-site-system` from a DivisionPage shell into a full
SEO/GEO/AEO service deep-dive page that:

1. Passes a direct answer block to AI engines for "what is the Premium Brand Site System"
2. Targets premium brands replacing legacy estates AND brands requiring AI-native web architecture
3. Deepens the internal link mesh: PBSS → audit, AVM, web-design-agency, pricing
4. Completes the AVM ↔ PBSS cross-link (AVM Step 2 already links TO PBSS — this closes the loop)
5. Adds `offerCatalog` to the PBSS `serviceSchema` for structured data completeness
6. Surfaces the ROI Operating System as the methodology backbone

**Architecture decision:** extend `services.ts` data only — **no DivisionPage changes needed.**  
Step 2 already added `directAnswer`, `audienceItems`, and `internalLinks` to the Division type and
DivisionPage component. PBSS simply populates those optional fields. Zero regression risk.

---

## §2 · Context — Phase 2 step sequence

| Step | Target | Tag | Status |
|---|---|---|---|
| Step 1 | `/for-agencies` ICP landing page | `phase-2-for-agencies-icp` | SHIPPED |
| Step 2 | AVM deep-dive (direct answer · audience · internal links · offerCatalog) | `phase2-step2-avm-deep-dive-2026-05-25` | SHIPPED |
| **Step 3** | **PBSS deep-dive (this directive)** | `phase2-step3-pbss-deep-dive-2026-05-25` | TARGET |

Step 2 added the reusable fields to `Division` type and `DivisionPage` — no type or component changes
are needed here. This directive is data-only + schema wiring.

---

## §3 · Files to inspect

Read these fully before editing anything:

| File | Why |
|---|---|
| `src/data/divisions.ts` | Confirm `directAnswer`, `audienceItems`, `internalLinks` optional fields exist (added in Step 2) |
| `src/data/services.ts` | PBSS data object — primary edit target |
| `src/app/services/premium-brand-site-system/page.tsx` | Schema wiring — add `offerCatalog` to `serviceSchema` call |
| `src/lib/schema.ts` | Confirm `serviceSchema` accepts `offerCatalog` (mirrors AVM pattern from Step 2) |
| `src/components/sections/division-page.tsx` | Confirm Step 2 conditional renders are in place — **do not modify** |
| `src/app/sitemap.ts` | Confirm `/services/premium-brand-site-system` present at priority 0.9 — no change needed |

---

## §4 · Files likely to edit

| File | Change summary |
|---|---|
| `src/data/services.ts` | Add `directAnswer` + `audienceItems` + `internalLinks` + `deeperFramework` to PBSS data object |
| `src/app/services/premium-brand-site-system/page.tsx` | Add `offerCatalog` to `serviceSchema` call |

**No other files require changes.** No new routes. No sitemap edits. No DivisionPage edits.
No `divisions.ts` type changes — all fields already exist from Step 2.

---

## §5 · Exact changes

### 5.1 · `src/data/services.ts` — extend PBSS data object

Add all four fields to the `premiumBrandSiteSystem` object.
Insert after the existing `seo` block.

#### 5.1.1 · `directAnswer`

```typescript
directAnswer: {
  eyebrow: "Direct answer",
  headline: "What is the Wiele Premium Brand Site System?",
  body: "The Premium Brand Site System is Wiele's flagship web design and engineering SKU — a token-first, AI-Search-Native production build on Next.js and Cloudflare, backed by a contractual Core Web Vitals SLA. It delivers the technical substrate that makes a brand citeable by ChatGPT, Gemini, Perplexity, and Claude — not just ranked on Google. Three engagement shapes: Foundation Build at €18,000 fixed-fee over 6–8 weeks, Authority Retainer at €14,000 per month for continuous evolution, and Sovereign Concierge at €45,000 per month for category-leader brands requiring private AI routing and embedded brand-defense engineering.",
},
```

#### 5.1.2 · `audienceItems`

```typescript
audienceItems: [
  "Premium B2B brands replacing legacy WordPress or Webflow estates",
  "Founders and CMOs whose sites are invisible to AI-generated answers",
  "Category-leader firms preparing for AI-search-first buyer journeys",
  "Brands requiring contractual performance guarantees (LCP · INP · CLS · WCAG 2.2 AA)",
  "Marketing and brand agencies delivering AI-native web builds for premium clients",
  "Multi-domain, multi-language brands operating at Sovereign scale",
],
```

#### 5.1.3 · `deeperFramework`

```typescript
deeperFramework: {
  eyebrow: "Methodology",
  headline: "Built on the Wiele AI Search ROI Operating System.",
  body: "The Foundation Build installs the technical substrate the ROI Operating System runs on: entity reconciliation, schema layer, llms.txt, sitemap, IndexNow, Core Web Vitals tuning. The Authority Retainer runs the editorial engine and visibility compounding loop. Read the full operating system to understand what you are buying — every deliverable ladders back to it.",
  href: "/labs/ai-search-roi-operating-system",
  cta: "Read the operating system",
},
```

#### 5.1.4 · `internalLinks`

```typescript
internalLinks: [
  {
    label: "AI Visibility Audit",
    description: "One-shot diagnostic: where your brand stands today across ChatGPT, Gemini, Perplexity, and Claude — with a gap analysis and 30-day roadmap. The recommended entry point before scoping a Foundation Build.",
    href: "/audit",
  },
  {
    label: "AI Visibility Monitoring",
    description: "The recurring retainer that defends the citation surface after the Foundation Build ships. Monthly engine runs, citation share tracking, named-competitor comparison, action queue. Stack with any tier.",
    href: "/services/ai-visibility-monitoring",
  },
  {
    label: "Web Design Agency",
    description: "The Wiele Web Design Agency overview — engagement shapes, philosophy, and the full scope of what we build. The Premium Brand Site System is the productized SKU from this division.",
    href: "/web-design-agency",
  },
  {
    label: "Pricing",
    description: "Full Wiele pricing ladder — Signal Audit through Sovereign. The Foundation Build and Authority Retainer live inside the six-tier ladder. See how the tiers stack.",
    href: "/pricing",
  },
],
```

---

### 5.2 · `src/app/services/premium-brand-site-system/page.tsx` — add offerCatalog to serviceSchema

Update the existing `serviceLd` declaration. Preserve all other fields exactly.

```typescript
// BEFORE
const serviceLd = serviceSchema({
  name: `Wiele ${service.eyebrow}`,
  description: service.subhead,
  url: `${siteConfig.url}/services/${service.slug}`,
  serviceType: "Premium Web Design and Development System",
});

// AFTER
const serviceLd = serviceSchema({
  name: `Wiele ${service.eyebrow}`,
  description: service.subhead,
  url: `${siteConfig.url}/services/${service.slug}`,
  serviceType: "Premium Web Design and Development System",
  offerCatalog: {
    name: "Premium Brand Site System engagement shapes",
    items: [
      {
        name: "Premium Brand Site System — Foundation Build",
        description: "Token-first design system, 5-mode delivery, 8–12 page Next.js + Cloudflare production build, AI-Search-Native content layer, llms.txt, schema.org, contractual Core Web Vitals SLA. Fixed scope, 6–8 weeks.",
      },
      {
        name: "Premium Brand Site System — Authority Retainer",
        description: "1,200 AI revision credits per month, continuous CWV + SEO monitoring, AI Visibility Defense (citation tracking, prompt-injection surface audit), conversion optimisation, design-system extension.",
      },
      {
        name: "Premium Brand Site System — Sovereign Concierge",
        description: "Unlimited AI revision credits, private AI routing, embedded brand-defense engineering team, multi-domain and multi-language scope, direct founder access, 24-hour response SLA.",
      },
    ],
  },
});
```

---

## §6 · Schema requirements

| Schema | Requirement |
|---|---|
| `BreadcrumbList` | Already present — no change |
| `Service` | Already present — add `offerCatalog` (§5.2) |
| `FAQPage` | Already present — rendered from visible FAQ accordion — no change |
| `ServiceTier` (×3) | Already present, EUR, correct — no change |
| productSchema | BANNED — do not add |
| GBP pricing | BANNED — all values EUR only |

**Verification after deploy:**

```bash
curl -s https://wielegroup.com/services/premium-brand-site-system \
  | grep -c '"@type":"Service"'
# Expected: ≥1

curl -s https://wielegroup.com/services/premium-brand-site-system \
  | grep '"offerCatalog"'
# Expected: match

curl -s https://wielegroup.com/services/premium-brand-site-system \
  | grep '"priceCurrency":"EUR"'
# Expected: ≥3 matches (one per ServiceTier)

curl -s https://wielegroup.com/services/premium-brand-site-system \
  | grep -c '"@type":"FAQPage"'
# Expected: 1
```

---

## §7 · Internal link verification

All four `internalLinks` entries must resolve 200 before AND after deploy:

```bash
for path in /audit /services/ai-visibility-monitoring /web-design-agency /pricing; do
  status=$(curl -sI "https://wielegroup.com${path}" | awk '/^HTTP/{print $2}')
  echo "$path → $status"
done
# Expected: all 200
```

---

## §8 · Sitemap + lastmod

No new routes. No sitemap entry changes needed.

`/services/premium-brand-site-system` is already present in:
- `src/app/sitemap.ts` at priority `0.9`, `changeFrequency: "monthly"`
- `scripts/gen-static-route-lastmod.mjs` static route array

Because `src/data/services.ts` and `src/app/services/premium-brand-site-system/page.tsx`
will be modified, their mtime will advance — the generated `lastmod` for
`/services/premium-brand-site-system` will update naturally on next build.
No manual lastmod intervention required.

After deploy, run IndexNow ping:
```bash
./scripts/notify-indexnow.sh
# Expected: HTTP 200
```

---

## §9 · Validation gates (all must PASS before tagging)

| # | Gate | Command | Expected |
|---|---|---|---|
| 1 | TypeScript clean | `npx tsc --noEmit` | 0 errors |
| 2 | ESLint clean | `npx eslint src --max-warnings 0` | 0 errors · 0 warnings |
| 3 | Build succeeds | `npm run build:cf` | exits 0 |
| 4 | Page 200 + fast | `curl -sI https://wielegroup.com/services/premium-brand-site-system` | HTTP/2 200 |
| 5 | Direct answer block live | `curl -s https://wielegroup.com/services/premium-brand-site-system \| grep "What is the Wiele Premium Brand Site System"` | match |
| 6 | Audience section live | `curl -s https://wielegroup.com/services/premium-brand-site-system \| grep "legacy WordPress"` | match |
| 7 | Internal links live | `curl -s https://wielegroup.com/services/premium-brand-site-system \| grep "ai-visibility-monitoring"` | match |
| 8 | deeperFramework live | `curl -s https://wielegroup.com/services/premium-brand-site-system \| grep "ai-search-roi-operating-system"` | match |
| 9 | No GBP in HTML | `curl -s https://wielegroup.com/services/premium-brand-site-system \| grep -c "£"` | 0 |
| 10 | offerCatalog in schema | `curl -s https://wielegroup.com/services/premium-brand-site-system \| grep "offerCatalog"` | match |
| 11 | EUR in schema | `curl -s https://wielegroup.com/services/premium-brand-site-system \| grep '"priceCurrency":"EUR"'` | ≥3 |
| 12 | AVM page unaffected | `curl -sI https://wielegroup.com/services/ai-visibility-monitoring` | HTTP/2 200 |
| 13 | web-design-agency unaffected | `curl -sI https://wielegroup.com/web-design-agency` | HTTP/2 200 |
| 14 | IndexNow fired | `./scripts/notify-indexnow.sh` | HTTP 200 |

Gate 9 is a HARD STOP: any `£` in the HTML response is a ship blocker.

---

## §10 · Deploy rules

```bash
# Commit message
feat(services): PBSS deep-dive expansion — direct answer, audience, internal links, deeperFramework, offerCatalog

- directAnswer block: AI-extractable answer for "what is the Premium Brand Site System"
- audienceItems: 6-item audience section (legacy-estate replacements + AI-native brands)
- internalLinks mesh: /audit · /services/ai-visibility-monitoring · /web-design-agency · /pricing
- deeperFramework: link to /labs/ai-search-roi-operating-system (methodology backbone)
- serviceSchema: offerCatalog added (Foundation Build · Authority Retainer · Sovereign Concierge)
- Completes AVM ↔ PBSS internal cross-link (AVM links to PBSS, PBSS now links to AVM)
- No DivisionPage changes — Step 2 fields already in place
- No sitemap changes — /services/premium-brand-site-system already at priority 0.9

# Tag
git tag phase2-step3-pbss-deep-dive-2026-05-25

# Deploy
git push origin main
# Cloudflare Workers deploys on push to main.

# Post-deploy
./scripts/notify-indexnow.sh
```

Rollback: `git revert HEAD --no-edit && git push`

---

## §11 · Memory update (post-ship — Cowork executes)

After all 14 gates pass and tag is pushed, Cowork updates:

1. Session brief in `/memory/` with ship proof (Worker version, tag, gate results)
2. `MEMORY.md` index pointer
3. Mirror to `/Volumes/MAC/Wiele Memory Backup/current/`

---

## §12 · Hard stop conditions

Stop and surface to founder if any of the following are encountered:

| Condition | Reason |
|---|---|
| `git status` shows uncommitted changes | Unknown work in tree — do not build over it |
| `npx tsc --noEmit` has errors | Type system broken — gate 1 fail |
| Gate 9: `£` found in live HTML | GBP regression — hard ship blocker |
| `Division` type missing `directAnswer` / `audienceItems` / `internalLinks` | Step 2 not fully shipped — stop, investigate |
| AVM page returns non-200 after changes | Cross-link dependency broken |
| `web-design-agency` returns non-200 | Internal link target broken |
| Any gate 1–14 fails | Do not tag. Do not call complete. |

---

## §13 · Why this next

1. **Completes the internal mesh.** Step 2 (AVM) already links to PBSS. This closes the loop: PBSS links back to AVM, audit, web-design-agency, and pricing. The mesh becomes bidirectional.

2. **Highest-value SKU.** PBSS is the commercial anchor — €18k Foundation, €14k/mo Authority, €45k/mo Sovereign. A shallow service page at this price point is a conversion liability.

3. **Bridges AI visibility → premium web → conversion.** The PBSS deep-dive becomes the landing point for high-intent queries crossing AI-search and web design decision criteria.

4. **Zero new infrastructure.** Step 2 built all reusable architecture. Step 3 is data-only — lowest risk, highest commercial return.

5. **Pattern proven.** The Step 2 AVM directive shipped cleanly. Step 3 follows the identical pattern. Claude Code has the template.

---

**End of directive. Ship when ready.**
