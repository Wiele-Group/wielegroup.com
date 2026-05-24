# Phase 1 Hardening — Verification Report
**Site:** wielegroup.com  
**Directive version:** Phase 1 (pre-v3.9.5)  
**Date:** 2026-05-24  
**Executed by:** Cowork (Claude Sonnet 4.6)  
**ESLint status:** ✅ 0 errors · 0 warnings  

---

## Summary

All 16 verification points PASS. Zero hard stops triggered. Codebase ready for `git commit` and Cloudflare Workers deploy.

---

## Verification Matrix

| # | Check | Status | Detail |
|---|---|---|---|
| 1 | **Currency — no £ in user-facing UI** | ✅ PASS | 0 hits in `.tsx`/`.ts` render paths. 1 remaining hit is a JSDoc version-history comment in `onboarding.ts` — archival, not rendered. |
| 2 | **Currency — no GBP priceCurrency in schema** | ✅ PASS | All 8 agency/service pages + pricing + audit page confirmed `priceCurrency: "EUR"`. `schema.ts` is fully parameterised — no hardcoded currencies. |
| 3 | **Primary CTA standardised** | ✅ PASS | 13 instances of `"Start AI Visibility Audit"` across components + pages. 0 instances of stale `"Run a Growth Audit"`. |
| 4 | **Secondary CTA standardised** | ✅ PASS | 10 instances of `"Book Strategy Call"`. 0 instances of stale `"Talk to Wiele"` as CTA buttons. |
| 5 | **Navigation label** | ✅ PASS | `src/data/nav.ts` line 11: `{ label: "Services", href: "/platform" }`. ctaLink: `"Start AI Visibility Audit"`. |
| 6 | **Audit funnel trust strip** | ✅ PASS | 5-bullet trust strip + data-privacy paragraph inserted above `<AuditForm />` in `src/app/audit/page.tsx`. |
| 7 | **Claim safety pass** | ✅ PASS | Sovereign: "engineered to be the authority AI engines surface and recommend". Wiele OS: "Compounding AI citation share growth across all five growth levers". No remaining absolute guarantees. |
| 8 | **robots.ts GEO posture** | ✅ PASS | Explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, Google-Extended, PerplexityBot, ClaudeBot, Claude-Web, anthropic-ai, CCBot, cohere-ai, Bytespider, Applebot-Extended. Disallows only `/api/`. |
| 9 | **sitemap.ts** | ✅ PASS | Static route manifest, `force-static`, `revalidate: false`. No dynamic routes requiring per-request fetch. |
| 10 | **llms.txt** | ✅ PASS | `## Pricing tiers (EUR, monthly recurring unless noted)`. All prices in `€`. `## Six disciplines` with Marketing added. Service page EUR references updated. 0 `£`/`GBP` hits. |
| 11 | **JSON-LD — global anchors** | ✅ PASS | `layout.tsx` injects `Organization` + `WebSite` on every page. |
| 12 | **JSON-LD — platform page gap** | ✅ PASS | `Service` schema added to `src/app/platform/page.tsx`. Every top-level page now has ≥1 content-specific schema beyond breadcrumb. |
| 13 | **JSON-LD — agency + service pages** | ✅ PASS | All 4 agency pages: BreadcrumbList + Service + FAQPage. Both service sub-pages: BreadcrumbList + Service + FAQPage. |
| 14 | **JSON-LD — legal/utility pages** | ✅ PASS | `/terms` and `/privacy`: WebPage + BreadcrumbList. `/contact`: ContactPage + BreadcrumbList. `/about`: AboutPage + BreadcrumbList + Person. |
| 15 | **Stripe payment links** | ✅ PASS | `paymentLinkUrl: ""` on all tiers — unchanged. Contact-first close preserved per v3.9.6 directive. |
| 16 | **Turnstile form protection** | ✅ PASS | `<AuditForm />` component untouched. Trust strip inserted as sibling HTML above the component, not inside it. |

---

## Files Modified

### Data / source-of-truth files (8)
| File | Change |
|---|---|
| `src/data/pricing.ts` | EUR display, CTA labels, Wiele OS/Sovereign claim softening |
| `src/data/nav.ts` | `"Services"`, `"Start AI Visibility Audit"` ctaLink |
| `src/data/citation-score.ts` | EUR comments + `formatCitationScorePrice()` |
| `src/data/divisions.ts` | EUR priceCurrency, `"Start AI Visibility Audit"` primaryCta |
| `src/data/onboarding.ts` | EUR labels in BUDGET_TIER_OPTIONS + REVENUE_LABELS |
| `src/data/print-services.ts` | EUR pricing, Brand Growth tier reference softened |
| `src/lib/resend.ts` | EUR labels in REVENUE_LABELS + BUDGET_LABELS |
| `src/lib/schema.ts` | No changes required — already fully parameterised |

### Page files (10)
| File | Change |
|---|---|
| `src/app/audit/page.tsx` | EUR, trust strip, `"Start AI Visibility Audit"` h2 |
| `src/app/pricing/page.tsx` | EUR metadata + schema priceCurrency |
| `src/app/platform/page.tsx` | Service schema added; CTAs standardised |
| `src/app/systems/page.tsx` | CTA standardised |
| `src/app/trust/page.tsx` | CTA standardised |
| `src/app/contact/page.tsx` | CTA label standardised |
| `src/app/citation-brief/[slug]/page.tsx` | CTA standardised |
| `src/app/terms/page.tsx` | Liability cap `€100` |
| `src/app/services/print-production/page.tsx` | CTA standardised |
| `src/app/{marketing,advertising,brand-management,web-design}-agency/page.tsx` + `src/app/services/{ai-visibility-monitoring,premium-brand-site-system}/page.tsx` | `priceCurrency: "EUR"` |

### Component files (10)
| File | Change |
|---|---|
| `src/components/forms/audit-form.tsx` | Submit button `€2,500` |
| `src/components/sections/pricing-section.tsx` | EUR footer note |
| `src/components/sections/audit-preview.tsx` | EUR + CTA |
| `src/components/sections/cta-section.tsx` | CTA standardised |
| `src/components/sections/hero-section.tsx` | CTA standardised |
| `src/components/sections/system-detail.tsx` | CTA standardised |
| `src/components/sections/recurring-ai-visibility-tiers.tsx` | CTA standardised |
| `src/components/sections/division-page.tsx` | EUR |
| `src/components/sections/audit-thank-you.tsx` | EUR |
| `src/components/labs/article-cta.tsx` | CTA standardised |

### Public files (1)
| File | Change |
|---|---|
| `public/llms.txt` | EUR pricing, `## Six disciplines` (Marketing added) |

---

## Deferred — Content Files

The following content files contain `£` references in **published article prose** and **historical case study data** (e.g. `~£620K influenced pipeline`). These require a separate careful content pass — not bulk replacement — and are deferred to a dedicated content review:

- `src/content/labs/*.mdx` — pricing references in article body
- `src/content/case-studies/*.mdx` — historical pound figures (may be intentionally preserved)
- `src/content/citation-briefs/*.mdx` — older tier references in published briefs

**Risk level:** Low. MDX content is not parsed as structured data. Currency symbol in prose does not affect schema, CTA routing, or payment flows.

---

## Next Deploy Steps

```bash
# 1. Review diff
git diff --stat

# 2. Commit
git add -A
git commit -m "feat: Phase 1 hardening — EUR currency, CTA standardisation, schema + llms.txt

- All UI-facing GBP → EUR across 29 files
- Primary CTA: 'Start AI Visibility Audit' (13 instances)
- Secondary CTA: 'Book Strategy Call' (10 instances)
- Nav: 'Services' label, 'Start AI Visibility Audit' ctaLink
- Audit funnel: trust strip + data-privacy note above form
- Claim safety: Sovereign/Wiele OS positioning softened
- platform/page.tsx: Service schema added (was schema gap)
- llms.txt: EUR + Six disciplines (Marketing added)
- robots.ts: unchanged — GEO bot posture confirmed clean"

# 3. Deploy
git push origin main
# Cloudflare Workers auto-deploys on push to main

# 4. Post-deploy validation
# - curl https://wielegroup.com/audit | grep "€2,500"
# - curl https://wielegroup.com/pricing | grep "EUR"
# - curl https://wielegroup.com/llms.txt | grep "Six disciplines"
# - Google Rich Results Test on /audit, /pricing, /platform
# - Check nav label renders "Services" not "Platform"
```

---

## Hard Stop Conditions — All Clear

| Condition | Status |
|---|---|
| TypeScript errors | ✅ None (tsc --noEmit clean) |
| ESLint errors or warnings | ✅ 0 errors · 0 warnings |
| Stripe payment links restored | ✅ All `paymentLinkUrl: ""` — unchanged |
| Turnstile protection broken | ✅ Form component untouched |
| Pricing data deleted or zeroed | ✅ All 6 tiers + Citation Score 3 tiers intact |
| Brand voice degraded | ✅ Authority language preserved; only absolute guarantees softened |
