# Phase 2 · Step 2 — AI Visibility Monitoring Deep-Dive Expansion
**Directive version:** phase2-step2-avm-deep-dive  
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

# 3. Confirm active Worker
npx wrangler deployments list --name wielegroup-com | head -5
# Record the active Worker version ID.

# 4. Confirm page resolves
curl -sI https://wielegroup.com/services/ai-visibility-monitoring | head -5
# Expected: HTTP/2 200

# 5. Confirm for-agencies page resolves (cross-link dependency)
curl -sI https://wielegroup.com/for-agencies | head -5
# Expected: HTTP/2 200

# 6. Confirm audit page resolves (primary CTA destination)
curl -sI https://wielegroup.com/audit | head -5
# Expected: HTTP/2 200
```

Hard stop if any pre-flight check fails.

---

## §1 · Objective

Expand `/services/ai-visibility-monitoring` from a DivisionPage shell into a full
SEO/GEO/AEO service deep-dive page that:

1. Passes a direct answer block to AI engines
2. Targets both AEO/GEO agencies (who need to deliver this for clients) AND
   premium businesses (who need to monitor their own AI citation surface)
3. Uses standardised CTAs: **Start AI Visibility Audit → /audit** (primary) and
   **Book Strategy Call → /contact** (secondary)
4. Links internally to `/for-agencies`, `/audit`, `/pricing`, and related service pages
5. Has `offerCatalog` on its `serviceSchema` (mirrors `/for-agencies` pattern)
6. Has no GBP, no productSchema, no fabricated metrics

Architecture decision: **extend Division type + extend DivisionPage** (not a custom
page). Rationale: all six capability items and three tiers live in `services.ts` — no
duplication. New sections are optional fields → zero regression risk on other pages.

---

## §2 · Files to inspect

Read these fully before editing anything:

| File | Why |
|---|---|
| `src/data/divisions.ts` | Division type — add optional fields here |
| `src/data/services.ts` | AVM data object — primary edit target |
| `src/components/sections/division-page.tsx` | Shared shell — add conditional section renders |
| `src/app/services/ai-visibility-monitoring/page.tsx` | Schema wiring — update serviceSchema offerCatalog |
| `src/lib/schema.ts` | Confirm serviceSchema accepts offerCatalog (it does — line ~325) |
| `src/app/sitemap.ts` | Confirm `/services/ai-visibility-monitoring` present (it is, priority 0.9) |
| `scripts/gen-static-route-lastmod.mjs` | Confirm route present (it is — no sitemap edit needed) |
| `scripts/notify-indexnow.sh` | GBP stale comment on line 44 — fix in this pass |

---

## §3 · Files likely to edit

| File | Change summary |
|---|---|
| `src/data/divisions.ts` | Add 3 optional fields to Division type |
| `src/data/services.ts` | Update AVM data: CTAs + directAnswer + audienceItems + internalLinks + serviceSchema offerCatalog data |
| `src/components/sections/division-page.tsx` | Add 3 conditional section renders (direct answer · audience · internal links) |
| `src/app/services/ai-visibility-monitoring/page.tsx` | Update serviceSchema call to include offerCatalog |
| `scripts/notify-indexnow.sh` | Fix stale `£` comment on line 44 → EUR |

No new routes. No sitemap changes. No new schema files.

---

## §4 · Exact changes

### 4.1 · `src/data/divisions.ts` — extend Division type

Add three optional fields after the `deeperFramework` block:

```typescript
/**
 * phase2-step2 — optional direct-answer block rendered between hero
 * and capabilities grid. Provides AI-extractable answer for the
 * "what is X" query. eyebrow = mono label, headline = H2, body = paragraph.
 */
directAnswer?: {
  eyebrow: string;
  headline: string;
  body: string;
};

/**
 * phase2-step2 — optional audience section rendered after the direct-answer
 * block. Array of strings. Renders as a two-column check-list (mirrors
 * /for-agencies audience section pattern).
 */
audienceItems?: readonly string[];

/**
 * phase2-step2 — optional internal-links mesh rendered after the deeper-
 * framework callout and before the pricing tiers. Max 4 items.
 */
internalLinks?: readonly {
  label: string;
  description: string;
  href: string;
}[];
```

### 4.2 · `src/data/services.ts` — update AVM data object

**CTA standardisation (hero level):**
```typescript
// BEFORE
primaryCta: { label: "Book a Strategic Review", href: "/contact?intent=ai-visibility-monitoring" },
secondaryCta: { label: "See pricing", href: "#tiers" },

// AFTER
primaryCta: { label: "Start AI Visibility Audit", href: "/audit" },
secondaryCta: { label: "Book Strategy Call", href: "/contact" },
```

Note: Tier-level CTAs (`"Start with Lite"`, `"Talk about Standard"`, `"Apply for Pro"`)
are granular and buyer-intent matched — do NOT change them.

**Add `directAnswer` field to AVM object:**
```typescript
directAnswer: {
  eyebrow: "Direct answer",
  headline: "What is AI Visibility Monitoring?",
  body: "AI Visibility Monitoring is a recurring retainer that tracks where a brand appears, disappears, or gets cited inside AI-generated answers across ChatGPT, Gemini, Perplexity, and Claude. Every month, a structured panel of buyer-intent prompts runs across all four engines. The output is a citation share score, source weight breakdown, named-competitor comparison, prioritised action queue, and a founder-signed report. The methodology is open — every metric is replayable from the citation log.",
},
```

**Add `audienceItems` field:**
```typescript
audienceItems: [
  "AEO and GEO agencies monitoring AI visibility for clients",
  "SEO agencies expanding into answer-engine deliverables",
  "Premium B2B firms in competitive AI-search categories",
  "Brand and marketing agencies building AI visibility reporting",
  "Founders and marketing leads who need to know where they stand in AI answers",
  "Businesses preparing for AI-search-first buyer journeys",
],
```

**Add `internalLinks` field:**
```typescript
internalLinks: [
  {
    label: "AI Visibility Audit",
    description: "One-shot diagnostic: where your brand stands today across four AI engines, with a gap analysis and 30-day roadmap. The recommended entry point before committing to Monitoring.",
    href: "/audit",
  },
  {
    label: "For AEO & GEO Agencies",
    description: "How Wiele Group works as an AI-search capability layer for agencies — including the strategy, audit frameworks, and delivery architecture for client work.",
    href: "/for-agencies",
  },
  {
    label: "Pricing",
    description: "Full Wiele pricing ladder — Signal Audit, Launch, Growth, Authority, Wiele OS, Sovereign. Monitoring is the recurring layer that stacks with every tier.",
    href: "/pricing",
  },
  {
    label: "Premium Brand Site System",
    description: "The Wiele web design flagship — AI-Search-Native architecture, contractual Core Web Vitals SLA. Stack with Monitoring for the full visibility-plus-defence system.",
    href: "/services/premium-brand-site-system",
  },
],
```

### 4.3 · `src/components/sections/division-page.tsx` — add three conditional sections

**Section A — Direct Answer block**  
Render AFTER the hero section and BEFORE the capabilities grid (i.e. between the two `</section>` tags in that order). Pattern matches `/for-agencies` direct answer section exactly.

```tsx
{/* ── Direct Answer block (phase2-step2 — optional) ─────── */}
{division.directAnswer ? (
  <section className="py-12 md:py-16 border-t border-[var(--color-border-default)]">
    <div className="mx-auto max-w-3xl px-[var(--container-px)]">
      <FadeIn whileInView>
        <p
          className="text-body-xs font-mono uppercase tracking-[0.16em] mb-4"
          style={{ color: accent.eyebrow }}
        >
          {division.directAnswer.eyebrow}
        </p>
        <h2 className="text-display-md text-white text-balance mb-5">
          {division.directAnswer.headline}
        </h2>
        <p className="text-body-lg text-silver leading-relaxed">
          {division.directAnswer.body}
        </p>
      </FadeIn>
    </div>
  </section>
) : null}
```

**Section B — Audience section**  
Render AFTER the direct answer block and BEFORE the capabilities grid.

```tsx
{/* ── Audience (phase2-step2 — optional) ─────────────────── */}
{division.audienceItems && division.audienceItems.length > 0 ? (
  <section className="py-16 md:py-20 bg-[var(--color-obsidian)]/40">
    <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-start">
        <div>
          <p
            className="text-body-xs font-mono uppercase tracking-[0.16em] mb-4"
            style={{ color: accent.eyebrow }}
          >
            Who this is for
          </p>
          <h2 className="text-display-md text-white text-balance">
            Built for firms that need to know where they stand in AI answers
          </h2>
        </div>
        <Reveal stagger={0.05} className="flex flex-col gap-2">
          {division.audienceItems.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] px-4 py-3"
            >
              <span
                aria-hidden
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-electric/15 text-electric"
              >
                <Check size={12} />
              </span>
              <span className="text-body-md text-cloud">{item}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  </section>
) : null}
```

**Section C — Internal links mesh**  
Render AFTER the `deeperFramework` callout and BEFORE the `#tiers` pricing section. This is the cross-link mesh.

```tsx
{/* ── Internal links mesh (phase2-step2 — optional) ──────── */}
{division.internalLinks && division.internalLinks.length > 0 ? (
  <section className="py-12 md:py-16 border-t border-[var(--color-border-default)]">
    <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
      <p
        className="text-body-xs font-mono uppercase tracking-[0.16em] mb-8"
        style={{ color: accent.eyebrow }}
      >
        Related
      </p>
      <Reveal stagger={0.05} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {division.internalLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex flex-col p-5 rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] hover:border-electric/40 transition-colors"
          >
            <span className="text-heading-sm text-white mb-2 group-hover:text-electric transition-colors">
              {link.label}
              <ArrowRight size={13} className="inline ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
            </span>
            <span className="text-body-sm text-silver">{link.description}</span>
          </Link>
        ))}
      </Reveal>
    </div>
  </section>
) : null}
```

### 4.4 · `src/app/services/ai-visibility-monitoring/page.tsx` — add offerCatalog to serviceSchema

Update the `serviceLd` declaration to include `offerCatalog`:

```typescript
const serviceLd = serviceSchema({
  name: `Wiele ${service.eyebrow}`,
  description: service.subhead,
  url: `${siteConfig.url}/services/${service.slug}`,
  serviceType: "AI Visibility Monitoring Retainer",
  offerCatalog: {
    name: "AI Visibility Monitoring tiers",
    items: [
      {
        name: "AI Visibility Monitoring — Lite",
        description: "25-prompt panel, four engines monthly, citation share + source weight, top 3 actions, monthly founder-signed report.",
      },
      {
        name: "AI Visibility Monitoring — Standard",
        description: "60-prompt panel, 3 named competitors, live dashboard, modelled influenced pipeline, top 5 actions with spec docs, quarterly QBR.",
      },
      {
        name: "AI Visibility Monitoring — Pro",
        description: "100-prompt panel, bi-weekly runs, 5 competitors, featured snippet capture, full pipeline modelling, 2 Wiele-executed quick wins, 90-min founder QBR.",
      },
    ],
  },
});
```

### 4.5 · `scripts/notify-indexnow.sh` — fix stale GBP comment

Line 44 contains `Lite £2.5K · Standard £4K · Pro £6K /mo`. Change to EUR:

```bash
# BEFORE (line 44)
  # First Wiele recurring monitoring SKU. Lite £2.5K · Standard £4K ·

# AFTER
  # First Wiele recurring monitoring SKU. Lite €2,500 · Standard €4,000 ·
```

And line 45 (if `Pro £6K` is there):
```bash
# BEFORE
  # Pro £6K /mo. Citation share + source weight + named-competitor

# AFTER
  # Pro €6,000 /mo. Citation share + source weight + named-competitor
```

---

## §5 · Schema requirements

| Schema | Requirement |
|---|---|
| `BreadcrumbList` | Already present — no change |
| `Service` | Already present — add `offerCatalog` (§4.4) |
| `FAQPage` | Already present — rendered from visible FAQ accordion — no change |
| `ServiceTier` (×3) | Already present, EUR, recurring — no change |
| productSchema | BANNED — do not add |

**Verification after deploy:**
```bash
curl -s https://wielegroup.com/services/ai-visibility-monitoring \
  | grep -c '"@type":"Service"'
# Expected: ≥1

curl -s https://wielegroup.com/services/ai-visibility-monitoring \
  | grep '"offerCatalog"'
# Expected: match

curl -s https://wielegroup.com/services/ai-visibility-monitoring \
  | grep '"priceCurrency":"EUR"'
# Expected: ≥3 matches (one per ServiceTier)

curl -s https://wielegroup.com/services/ai-visibility-monitoring \
  | grep -c '"@type":"FAQPage"'
# Expected: 1
```

---

## §6 · CTA audit

| Location | Before | After |
|---|---|---|
| Hero primaryCta | `"Book a Strategic Review"` → `/contact?intent=...` | `"Start AI Visibility Audit"` → `/audit` |
| Hero secondaryCta | `"See pricing"` → `#tiers` | `"Book Strategy Call"` → `/contact` |
| Tier CTAs | `"Start with Lite"` / `"Talk about Standard"` / `"Apply for Pro"` | **No change — preserve granular buyer-intent CTAs** |
| CTASection (bottom) | Already uses global standard | No change |

---

## §7 · Internal link verification

All four `internalLinks` entries must resolve 200 before deploy:

```bash
for path in /audit /for-agencies /pricing /services/premium-brand-site-system; do
  status=$(curl -sI "https://wielegroup.com${path}" | awk '/^HTTP/{print $2}')
  echo "$path → $status"
done
# Expected: all 200
```

---

## §8 · Sitemap + lastmod

No new routes are added. No sitemap entry changes needed.

`/services/ai-visibility-monitoring` is already present in:
- `src/app/sitemap.ts` at priority `0.9`, `changeFrequency: "monthly"`
- `scripts/gen-static-route-lastmod.mjs` static route array

The `gen-static-route-lastmod.mjs` script uses file mtime to set `lastmod`.
Because `src/data/services.ts` and `src/components/sections/division-page.tsx`
will be modified, their mtime will advance and the generated `lastmod` for
`/services/ai-visibility-monitoring` will update naturally on next build.
No manual lastmod intervention required.

After deploy, run IndexNow ping to notify supporting engines:
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
| 4 | Page 200 + fast | `curl -sI https://wielegroup.com/services/ai-visibility-monitoring` | HTTP/2 200 |
| 5 | Direct answer block live | `curl -s https://wielegroup.com/services/ai-visibility-monitoring \| grep "What is AI Visibility Monitoring"` | match |
| 6 | Audience section live | `curl -s https://wielegroup.com/services/ai-visibility-monitoring \| grep "AEO and GEO agencies"` | match |
| 7 | Internal links live | `curl -s https://wielegroup.com/services/ai-visibility-monitoring \| grep "for-agencies"` | match |
| 8 | Hero CTA updated | `curl -s https://wielegroup.com/services/ai-visibility-monitoring \| grep "Start AI Visibility Audit"` | match |
| 9 | No GBP in HTML | `curl -s https://wielegroup.com/services/ai-visibility-monitoring \| grep -c "£"` | 0 |
| 10 | offerCatalog in schema | `curl -s https://wielegroup.com/services/ai-visibility-monitoring \| grep "offerCatalog"` | match |
| 11 | EUR in schema | `curl -s https://wielegroup.com/services/ai-visibility-monitoring \| grep '"priceCurrency":"EUR"'` | ≥3 |
| 12 | for-agencies page unaffected | `curl -sI https://wielegroup.com/for-agencies` | HTTP/2 200 |
| 13 | IndexNow fired | `./scripts/notify-indexnow.sh` | HTTP 200 |

Gate 9 is a HARD STOP: any `£` in the HTML response is a ship blocker.

---

## §10 · Deploy rules

```bash
# Tag format
git tag phase2-step2-avm-deep-dive-2026-05-25

# Commit message
feat(services): AVM deep-dive expansion — direct answer, audience, internal links, offerCatalog, CTA standardisation

- directAnswer block: AI-extractable answer for "what is AI Visibility Monitoring"
- audienceItems: 6-item audience section (AEO/GEO agencies + premium businesses)
- internalLinks mesh: /audit · /for-agencies · /pricing · /services/premium-brand-site-system
- Hero CTAs: "Start AI Visibility Audit" → /audit · "Book Strategy Call" → /contact
- serviceSchema: offerCatalog added (Lite/Standard/Pro)
- notify-indexnow.sh: stale £ comment → EUR
- Division type: 3 new optional fields (directAnswer · audienceItems · internalLinks)
- DivisionPage: 3 conditional section renders (no regression on other pages)

# Deploy
git push origin main
# Cloudflare Workers deploys on push to main.

# Post-deploy
./scripts/notify-indexnow.sh
```

Rollback: `git revert HEAD --no-edit && git push`

---

## §11 · Memory update (post-ship — Cowork executes)

After all 13 gates pass and tag is pushed, Cowork updates:

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
| `DivisionPage` changes break any other division page | Regression risk — conditional renders must be optional |
| `for-agencies` page returns non-200 after changes | Cross-link target broken |
| Any gate 1–13 fails | Do not tag. Do not call complete. |
