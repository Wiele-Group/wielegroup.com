# Phase 5 — Final Visual Specification
# Pricing / Investment Architecture

**Date:** 2026-05-28  
**Status:** Approved — ready for Claude Code directive  
**Predecessor:** `phase5-pricing-readiness-dossier-2026-05-28.md`  
**Founder gates:** All four approved  
**Claude Code:** Awaiting. Do not begin until founder issues the build directive.

---

## Design Objective

Transform `/pricing` from a catalogue of 9 options into a **premium buyer pathway** — one where a cold prospect can identify their starting point in under 10 seconds, understand how the two product tracks relate, and move to action with confidence.

The page currently has the architecture right. The problem is **buyer orientation**: nothing tells a prospect where to enter, which track is theirs, or why Authority Engine carries more conviction than the others. Phase 5 adds the connective tissue without rebuilding the system.

**Commercial goal:** Increase qualified `/contact` conversions by reducing buyer paralysis. Every change must serve that goal.

---

## What Does Not Change

This is non-negotiable. State it at the top of every design decision below.

- No prices
- No routes
- No metadata or schema
- No forms or API
- No tokens
- No packages
- No `cta.href` values (all `/contact?tier=X` params preserved exactly)
- No `paymentLinkUrl` or Stripe IDs
- No tier IDs (`signal-audit`, `launch`, `growth-system`, `authority-engine`, `wiele-os`, `sovereign`)
- No `JsonLd` blocks
- No `wrangler.toml`
- No `sitemap.ts`

---

## Summary of Changes

| # | Change | File(s) | Risk |
|---|---|---|---|
| 1 | CTA label differentiation — 4 main tiers | `src/data/pricing.ts` | Low — hrefs unchanged |
| 2 | Buyer-type label per main tier (new copy line) | `src/data/pricing.ts` + `pricing-section.tsx` | Low |
| 3 | Authority Engine guarantee badge on card | `src/data/pricing.ts` + `pricing-section.tsx` | Low |
| 4 | Signal Audit "Recommended entry" treatment | `pricing-section.tsx` | Low |
| 5 | Two-track connector section | `src/app/pricing/page.tsx` | Low — new JSX block, no schema/route change |
| 6 | Launch reverse-trial visual weight upgrade | `pricing-section.tsx` | Low |
| 7 | Citation Score™ CTA label (optional, if approved) | `src/data/citation-score.ts` | Low |

Total files touched: **3 source files** + **1 page file**. No new files. No new components unless `GuaranteeBadge` sub-component is added inline within `pricing-section.tsx`.

---

## Change 1 — CTA Label Differentiation

### Context
Four of five main-tier primary CTAs currently read "Book Strategy Call." At the €8,500–€45,000 tier level, identical CTAs signal indifference to buyer type and reduce the sense that each offer is designed for a specific person.

### Decision
Update `cta.label` in `src/data/pricing.ts` only. **Do not touch `cta.href`.** All `/contact?tier=X` query params preserved exactly.

### Exact CTA Labels — `src/data/pricing.ts`

| Tier ID | Current `cta.label` | Phase 5 `cta.label` |
|---|---|---|
| `signal-audit` | `Start AI Visibility Audit` | **No change** |
| `launch` | `Book Strategy Call` | `Build the Foundation` |
| `growth-system` | `Book Strategy Call` | `Start Growth System` |
| `authority-engine` | `Book Strategy Call` | `Apply for Authority Engine` |
| `wiele-os` | `Book Strategy Call` | `Discuss Wiele OS` |
| `sovereign` | `Book Sovereign Discovery Call` | **No change** |

### Rationale per label

**"Build the Foundation"** — Launch is a baseline commitment. "Foundation" signals this is a starting point, not a closing point. Lower-pressure than "Book Strategy Call" which implies you need to explain yourself before anything happens.

**"Start Growth System"** — Growth System is the most commercially important tier. A verb-led, confident CTA mirrors what the buyer is actually doing: starting a system. Reinforces the featured treatment.

**"Apply for Authority Engine"** — Authority Engine carries an outcome guarantee. "Apply" elevates its positioning — this tier is not simply booked, it is earned. Sets a premium expectation that aligns with €8,500/mo. Does not imply rejection; implies seriousness on both sides.

**"Discuss Wiele OS"** — Wiele OS is a team-level embedded engagement. "Discuss" is appropriately consultative for a €15k/mo decision. Less transactional than "Book," more collaborative than "Apply."

### Button variant — unchanged
- Growth System (featured): `featured` variant — **no change**
- All others: `ghost` variant — **no change**
- The variant hierarchy is already correct. Phase 5 does not alter it.

---

## Change 2 — Buyer-Type Label Per Main Tier

### Context
Currently no card tells the buyer who it is designed for. Premium buyers self-qualify; every high-ticket service page should make that easy. A one-line "Designed for:" label beneath the tier name removes ambiguity and shortens decision time.

### Design Specification

**Location in card:** Immediately below the tier `<h3>` name, above the price block.  
**Visual style:** `text-body-xs font-mono text-smoke italic` — quiet, not competing with price.  
**Prefix:** None ("Designed for:" adds cognitive weight without value; the label itself communicates).  
**Max length:** 60 characters per label. One line on desktop, wraps on mobile.

### Implementation approach
Add an optional `buyerLabel?: string` field to the `PricingTier` type in `pricing.ts`. Render in `StandardTierCard` and `AnchorTierCard` when present. `null`/`undefined` = render nothing (safe for future tiers).

### Exact `buyerLabel` strings — `src/data/pricing.ts`

```
signal-audit:    "Any brand entering AI search for the first time."
launch:          "Early-stage brands building AI visibility baseline."
growth-system:   "Scaling B2B brands defending inbound growth."
authority-engine:"Brands where AI citation share is a board objective."
wiele-os:        "Enterprise teams needing all five growth levers."
sovereign:       "Category leaders built to be the AI engine default."
```

### Render location in `StandardTierCard`
Insert after `<h3>` tier name block, before the price block:

```tsx
{tier.buyerLabel ? (
  <p className="text-body-xs font-mono text-smoke italic mt-1.5 mb-0">
    {tier.buyerLabel}
  </p>
) : null}
```

### Render location in `AnchorTierCard` (Sovereign)
Insert after `<h3>` name, before price block — same pattern:

```tsx
{tier.buyerLabel ? (
  <p className="text-body-sm font-mono text-smoke italic mt-1 mb-2">
    {tier.buyerLabel}
  </p>
) : null}
```

---

## Change 3 — Authority Engine Guarantee Badge

### Context
Authority Engine is the only tier on the main ladder with an outcome-based guarantee ("measurable AI citation share growth quarter-over-quarter"). This is a material commercial differentiator. It currently appears only in FAQ item #9 — invisible to any buyer who does not scroll the FAQ. Phase 5 surfaces it on the card, using language that exactly matches the FAQ to avoid contradiction.

### Design Specification

**Name:** `GuaranteeBadge` — inline sub-component within `pricing-section.tsx`.  
**Applies to:** Authority Engine only (`tier.id === "authority-engine"` or via optional `guaranteeBadge?: string` field on `PricingTier`).  
**Location:** Immediately below `DefenseBadge` in the card, before `positioning` text.  
**Visual style:** Small bordered pill — distinct from `DefenseBadge` (which uses `electric/30 bg-electric/5`). Guarantee badge uses `border-[var(--color-coral,#f97316)]/30 bg-[var(--color-coral,#f97316)]/5` (warm accent, not blue) to visually differentiate from defense.

**Note:** If `--color-coral` is not a defined CSS token, use `border-orange-500/30 bg-orange-500/5` as fallback. Do not add a new token.

### Exact badge copy

```
Outcome guarantee · Citation share growth Q/Q
```

This exactly matches the existing FAQ language: "outcome-based AI citation guarantee" and "Measurable AI citation share growth quarter-over-quarter."

### Implementation — `GuaranteeBadge` component (add inline to `pricing-section.tsx`)

```tsx
function GuaranteeBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-1 rounded-full border border-orange-500/30 bg-orange-500/5">
      <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-orange-400 shrink-0" />
      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-orange-400">
        Outcome guarantee · Citation share growth Q/Q
      </span>
    </div>
  );
}
```

### Data approach
Add optional `guaranteeBadge?: string` to `PricingTier` type.  
Set on Authority Engine only:

```ts
guaranteeBadge: "Outcome guarantee · Citation share growth Q/Q",
```

Render in `StandardTierCard` after `DefenseBadge`:

```tsx
{tier.guaranteeBadge ? <GuaranteeBadge /> : null}
```

This keeps the badge copy in the data layer, not hardcoded in the component — consistent with the existing pattern.

---

## Change 4 — Signal Audit "Recommended Entry" Treatment

### Context
Signal Audit is the universal entry point — €2,500 one-off, no retainer, credited against month one of any retainer engagement. This is the lowest-friction first step for any buyer. Currently it renders as one of five equal-weight cards in the standard grid. Phase 5 elevates it visually to communicate "start here."

### Design Specification

**Approach:** Add a small eyebrow label above the Signal Audit card — not a full redesign, just a subtle "Where to start" marker that guides new buyers without cluttering the grid.

**Two options — founder to confirm preferred approach before Claude Code builds:**

**Option A — Eyebrow label in the card (recommended)**  
Above the Signal Audit `<h3>`, add:

```tsx
<p className="text-[0.625rem] font-mono uppercase tracking-[0.16em] text-electric mb-2">
  Where to start →
</p>
```

This mirrors the eyebrow pattern used elsewhere on the page (e.g., "AI Visibility Defense · Built-in"). No structural change.

**Option B — Section-level guide above the 5-tier grid**  
Above `<Reveal>` containing the five standard tier cards, add a single line:

```tsx
<p className="text-body-xs font-mono text-smoke text-center mb-6">
  New to Wiele? Begin with a{" "}
  <Link href="/audit" className="text-electric hover:underline underline-offset-4">
    Signal Audit
  </Link>
  {" "}— €2,500 one-off, credited against month one of any retainer.
</p>
```

**Recommendation:** Option A. It localises the guidance to the card itself and avoids adding yet another line between the Sovereign anchor and the 5-tier grid.

**Default for Claude Code:** Implement Option A unless founder specifies Option B.

---

## Change 5 — Two-Track Connector Section

### Context
The page currently presents Citation Score™ subscription tiers (€2–6k/mo) followed by the main ladder (€1,950–€45k/mo) with no explanation of how they relate. A buyer can read all nine tiers without understanding whether these are competing choices, complementary products, or sequenced options.

The founder has approved this connector copy:

> "Citation Score™ is the measurement layer. The Wiele ladder is the execution layer. Use Citation Score™ to monitor AI visibility, then activate the ladder when you are ready to build authority, attribution, and revenue growth."

### Design Specification

**Location:** Between `<RecurringAiVisibilityTiers />` and `<PricingSection showHeading={false} />` in `src/app/pricing/page.tsx`.

**Component:** New inline JSX block in `pricing/page.tsx` — not a new component file (too small to justify). Wrapped in a `<section>` or a `<div>` depending on semantic context — use `<div>` since it is a transitional connector, not a primary page section.

**Visual style:** A contained, low-prominence callout — two columns at `md:`, single column on mobile. Left column: Measurement Layer. Right column: Execution Layer. Separated by a thin vertical rule on desktop (`hidden md:block border-r border-[var(--color-border-default)]`).

**Exact JSX block — insert in `pricing/page.tsx`:**

```tsx
{/* ── Two-track connector ───────────────────────────────── */}
<div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-8 md:py-10">
  <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] px-6 py-5 md:px-8 md:py-6 grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-0 items-center">

    <div className="md:pr-8">
      <p className="text-[0.625rem] font-mono uppercase tracking-[0.16em] text-electric mb-1.5">
        Measurement Layer
      </p>
      <p className="text-body-sm text-cloud font-medium mb-1">Citation Score™</p>
      <p className="text-body-xs text-smoke">
        Track AI citation share across engines. Know exactly where you stand before you build.
      </p>
    </div>

    <div aria-hidden className="hidden md:block border-r border-[var(--color-border-default)] self-stretch" />

    <div className="md:pl-8">
      <p className="text-[0.625rem] font-mono uppercase tracking-[0.16em] text-electric mb-1.5">
        Execution Layer
      </p>
      <p className="text-body-sm text-cloud font-medium mb-1">Wiele Ladder</p>
      <p className="text-body-xs text-smoke">
        Build authority, attribution, and revenue growth. Activate when you are ready to compound.
      </p>
    </div>

  </div>
  <p className="mt-3 text-body-xs font-mono text-smoke text-center">
    Both layers can run simultaneously. Citation Score™ measures what the ladder builds.
  </p>
</div>
```

**No `id` anchor needed** — this is a connector, not a navigable section. If deep-linking is needed in future, add `id="two-track-connector"` at that point.

**Schema:** No schema change. This block contains no structured data.

---

## Change 6 — Launch Reverse-Trial Visual Weight Upgrade

### Context
Launch is the entry retainer at €1,950/mo. Its strongest commercial differentiator is the "14-day Pro reverse-trial" — buyers get Pro features for 14 days before committing. This is a material risk-reversal mechanic. It currently renders as:

```
text-body-xs font-mono text-smoke italic
```

— invisible italic monospace at the bottom of the positioning block. This is the most underweight differentiator on the page relative to its commercial value.

### Design Specification

**Approach:** Elevate the reverse-trial line to a small badge treatment, parallel to `DefenseBadge` and `GuaranteeBadge`. Uses a neutral surface (not electric, not orange) to avoid competing with those two badges.

**New inline component — `TrialBadge` — add to `pricing-section.tsx`:**

```tsx
function TrialBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-1 rounded-full border border-[var(--color-border-strong,rgba(255,255,255,0.15))] bg-[var(--color-surface-elevated)]">
      <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-silver shrink-0" />
      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-silver">
        14-day Pro reverse-trial included
      </span>
    </div>
  );
}
```

**Data approach:** Add optional `trialBadge?: boolean` to `PricingTier` type. Set `trialBadge: true` on Launch tier only.

**Render in `StandardTierCard`** — after `DefenseBadge`, before `GuaranteeBadge` (which is Authority Engine only — never both on same card):

```tsx
{tier.trialBadge ? <TrialBadge /> : null}
{tier.guaranteeBadge ? <GuaranteeBadge /> : null}
```

**Remove the `differentiator` italic line for Launch only?** No. Keep `differentiator` rendering for all tiers — it provides additional context. The badge supplements, it does not replace. The italic line and the badge will coexist cleanly at the established size scale.

---

## Change 7 — Citation Score™ CTA Labels (Optional)

### Context
All three Citation Score™ tiers currently use "Book Strategy Call." The founder approved "Keep or 'Book Measurement Call' if Design supports it."

### Design Decision
**Recommended: "Book Measurement Call"** — it differentiates the Citation Score™ track from the execution ladder and makes the buyer's action legible. Measurement-oriented buyers respond to language that matches their intent.

**Apply to:** All three Citation Score™ tiers (Starter, Pro, Authority) — consistency across the section.  
**File:** `src/data/citation-score.ts` — update `ctaHref` is locked, but the CTA button label in `recurring-ai-visibility-tiers.tsx` is hardcoded as the string `"Book Strategy Call"` (not from the data layer).

**Note:** The Citation Score™ tier card CTA label is hardcoded in `recurring-ai-visibility-tiers.tsx` (line: `Book Strategy Call`) — **not** driven from a `cta` field in `citation-score.ts`. Implementation must update the hardcoded string in the component, not the data file.

**Exact change — `recurring-ai-visibility-tiers.tsx`:**
```tsx
// Before
Book Strategy Call

// After
Book Measurement Call
```

This is a single string replacement in the `CitationScoreTierCard` render, line ~146. Apply uniformly to all three tiers (same hardcoded string).

**This change is optional.** If the founder prefers "Book Strategy Call" for consistency across the page, omit this change. Mark as low-priority in the Claude Code directive.

---

## Mobile Behaviour Specification

All changes must be tested at 375/390/414/768px.

| Change | Mobile behaviour |
|---|---|
| CTA labels | Same label, same button height — no layout impact |
| Buyer-type labels | Single line at most copy lengths; wraps to 2 lines on 375px for "Authority Engine" and "Sovereign" labels — acceptable |
| GuaranteeBadge | Inline-flex wraps gracefully — verified at short copy length; no overflow |
| TrialBadge | Same — inline-flex, wraps gracefully |
| Two-track connector | Stacks to single column (grid-cols-1) at mobile; vertical divider hidden; each panel full-width — clean |
| Signal Audit eyebrow | Single line — no overflow risk |

**No horizontal overflow expected.** Each change adds only inline or stacked elements within existing card boundaries.

**Card height increase estimate:**
- StandardTierCard with `buyerLabel` + one badge (either `TrialBadge` or `GuaranteeBadge`): approx +36–48px taller on mobile
- Signal Audit with eyebrow: approx +24px
- This is acceptable — the cards already stack vertically at mobile; the additional height is proportional

---

## Updated Page Architecture (annotated)

```
/pricing
│
├── [UNCHANGED] Hero
│   └── h1 · badge · 2 CTAs (primary /audit · ghost /contact)
│
├── [UNCHANGED] AI Visibility Defense section
│   └── 3 defense vector cards
│
├── [UNCHANGED] RecurringAiVisibilityTiers (#recurring-ai-visibility)
│   └── Citation Score™ Starter · Pro · Authority
│   [Change 7 — optional] CTA: "Book Measurement Call"
│
├── [NEW — Change 5] Two-Track Connector
│   └── Measurement Layer | Execution Layer — connector card
│
├── [CHANGED — Changes 1,2,3,4,6] PricingSection (showHeading=false)
│   │
│   ├── Sovereign anchor (AnchorTierCard — chrome-bordered, full-width)
│   │   └── [Change 2] buyerLabel added
│   │
│   └── 5-tier grid (Reveal stagger)
│       ├── Signal Audit    [Changes 1-kept, 2, 4 — eyebrow]
│       ├── Launch          [Changes 1, 2, 6 — TrialBadge]
│       ├── Growth System   [Changes 1, 2]
│       ├── Authority Engine[Changes 1, 2, 3 — GuaranteeBadge]
│       └── Wiele OS        [Changes 1, 2]
│
├── [UNCHANGED] FAQ (10 items accordion)
│
└── [UNCHANGED] CTASection
```

---

## PricingTier Type — Phase 5 Additions

Add to `PricingTier` type in `src/data/pricing.ts`:

```ts
/** Short buyer-type label — rendered beneath tier name. Optional. */
buyerLabel?: string;
/** Surface the outcome guarantee badge on card. Copy = value string. Optional. */
guaranteeBadge?: string;
/** Surface the reverse-trial badge. Optional. */
trialBadge?: boolean;
```

These are all optional — backward-compatible. No existing tiers break. Future tiers can opt in.

---

## Exact Data Changes — `src/data/pricing.ts`

Per-tier changes (only changed fields listed — all other fields unchanged):

```ts
// signal-audit
buyerLabel: "Any brand entering AI search for the first time.",
// cta.label: unchanged

// launch
cta: { label: "Build the Foundation", href: "/contact?tier=launch" },
buyerLabel: "Early-stage brands building AI visibility baseline.",
trialBadge: true,

// growth-system
cta: { label: "Start Growth System", href: "/contact?tier=growth-system" },
buyerLabel: "Scaling B2B brands defending inbound growth.",

// authority-engine
cta: { label: "Apply for Authority Engine", href: "/contact?tier=authority-engine" },
buyerLabel: "Brands where AI citation share is a board objective.",
guaranteeBadge: "Outcome guarantee · Citation share growth Q/Q",

// wiele-os
cta: { label: "Discuss Wiele OS", href: "/contact?tier=wiele-os" },
buyerLabel: "Enterprise teams needing all five growth levers.",

// sovereign
buyerLabel: "Category leaders built to be the AI engine default.",
// cta.label: unchanged
```

**Prices unchanged. Stripe IDs unchanged. `paymentLinkUrl` unchanged. `aiDefense` unchanged. `outcomes` unchanged. `positioning` unchanged.**

---

## Component Changes — `pricing-section.tsx`

### New sub-components to add (inline — no new file)

1. `GuaranteeBadge()` — see Change 3 spec above
2. `TrialBadge()` — see Change 6 spec above

### Updated `StandardTierCard` render sequence

Current order:
```
h3 name
price block
DefenseBadge
positioning text
differentiator italic
outcomes list
DefenseVectors block
CTA button / pay now link
```

Phase 5 order:
```
[NEW] buyerLabel (if present) ← Change 2
h3 name
price block
DefenseBadge
[NEW] TrialBadge (if tier.trialBadge) ← Change 6
[NEW] GuaranteeBadge (if tier.guaranteeBadge) ← Change 3
positioning text
differentiator italic
outcomes list
DefenseVectors block
CTA button / pay now link
```

Wait — re-evaluating order. The buyer-type label should orient the buyer before they read the name, or immediately after. Looking at the existing card structure:

```tsx
<h3 className="text-heading-md text-white text-balance min-h-[2.6em]">
  {tier.name}
</h3>
```

The `min-h-[2.6em]` on the h3 ensures visual alignment across cards. If `buyerLabel` is inserted before the h3, it disrupts the grid alignment because some cards will have the label and push the h3 down.

**Corrected order:** Insert `buyerLabel` AFTER h3, before the price block. This preserves h3 top-alignment across the 5-col grid.

```
h3 name                              ← position fixed, min-h preserved
[NEW] buyerLabel (if present)        ← Change 2 — after name, before price
price block
DefenseBadge
[NEW] TrialBadge (if present)        ← Change 6
[NEW] GuaranteeBadge (if present)    ← Change 3
positioning text
differentiator italic
outcomes list
DefenseVectors block
CTA button
```

### Signal Audit eyebrow (Option A — default)

Add before `<h3>` for Signal Audit only. Conditional on `tier.id === "signal-audit"` or a new optional field `entryLabel?: string` in `PricingTier`.

Recommended: use `entryLabel?: string` field — consistent with the pattern.

Add to PricingTier type:
```ts
/** Small eyebrow shown above tier name — marks recommended entry point. */
entryLabel?: string;
```

Set on Signal Audit:
```ts
entryLabel: "Where to start →",
```

Render in `StandardTierCard`:
```tsx
{tier.entryLabel ? (
  <p className="text-[0.625rem] font-mono uppercase tracking-[0.16em] text-electric mb-2">
    {tier.entryLabel}
  </p>
) : null}
```

**Critical:** This is placed ABOVE the `<h3>`. The `min-h-[2.6em]` on the h3 must remain unchanged — the eyebrow label adds height above the name across the grid column, but since Signal Audit is the first card and the grid does not use `items-start`... check: the grid uses `gap-4` with no `items-stretch` override, so cards are independent height. The eyebrow will push the Signal Audit card taller than adjacent cards. This is acceptable and actually draws attention to the card — a small height asymmetry is a premium design pattern.

---

## Component Changes — `src/app/pricing/page.tsx`

### Two-track connector insertion

**Location:** Between `<RecurringAiVisibilityTiers />` and `<PricingSection showHeading={false} />`.

No new import needed. Uses only Tailwind classes and existing CSS variables.

Insert the JSX block specified in Change 5 exactly as written.

---

## Token Usage Reference

Existing tokens used by Phase 5 additions (all confirmed present in current system):

| Token | Usage |
|---|---|
| `var(--color-surface-elevated)` | Two-track connector background, TrialBadge background |
| `var(--color-border-default)` | Two-track connector border, vertical divider |
| `var(--color-border-strong)` | TrialBadge border |
| `text-electric` | Eyebrow labels, connector section headers |
| `text-smoke` | buyerLabel, connector body, TrialBadge copy |
| `text-silver` | TrialBadge copy |
| `text-cloud` | Connector body |
| `orange-500/30`, `orange-500/5`, `orange-400` | GuaranteeBadge — Tailwind built-in, no new token |
| `var(--radius-lg)` | Two-track connector border radius |
| `font-mono`, `uppercase`, `tracking-[0.16em]` | Eyebrow pattern — consistent with page |

**No new CSS tokens required.** No `tokens.ts` changes.

---

## Accessibility Notes

All Phase 5 additions maintain existing accessibility standards:

- `buyerLabel`, `entryLabel`, `GuaranteeBadge`, `TrialBadge` render as plain text/spans — screen reader visible, no `aria-hidden`
- Two-track connector vertical divider uses `aria-hidden` — decorative only
- No interactive elements added — no focus state changes needed
- Color contrast: `text-electric` on dark surface = 7:1+ (WCAG AAA) · `text-smoke` on dark surface = 4.5:1+ (WCAG AA) · `text-orange-400` on `bg-orange-500/5` = borderline — must be verified post-build; if contrast fails, use `text-orange-300` at 5:1+
- No motion added — no `reduce-motion` considerations

---

## Validation Gates — Phase 5 Exit Criteria

All gates from the dossier apply. Phase 5-specific additions:

- [ ] `npm run typecheck` — new optional fields on `PricingTier` type pass without error
- [ ] `npm run lint` — zero errors
- [ ] `npm run build:cf` — clean build
- [ ] `/pricing` at 375px — Signal Audit eyebrow renders · all badge text readable · two-track connector stacks cleanly · no horizontal overflow
- [ ] `/pricing` at 390/414px — same
- [ ] `/pricing` at 768px — two-track connector switches to 2-col with vertical divider
- [ ] `/pricing` at 1280/1440/1920px — all 5 tier cards render without content overflow
- [ ] Homepage `/` at 375/768/1440 — PricingSection unchanged on homepage (`showHeading=true` path unchanged)
- [ ] CTA label verification: "Build the Foundation" · "Start Growth System" · "Apply for Authority Engine" · "Discuss Wiele OS" render exactly
- [ ] CTA href verification: all `/contact?tier=X` hrefs unchanged
- [ ] GuaranteeBadge appears on Authority Engine card only
- [ ] TrialBadge appears on Launch card only
- [ ] Signal Audit "Where to start →" eyebrow renders
- [ ] Two-track connector renders between Citation Score section and main ladder
- [ ] All 6 prices unchanged — `€2,500` · `€1,950 / mo` · `€4,500 / mo` · `€8,500 / mo` · `€15,000 / mo` · `From €45,000 / mo`
- [ ] All 3 Citation Score prices unchanged — `€2,000 / mo` · `€4,000 / mo` · `€6,000 / mo`
- [ ] `git diff src/lib/tokens.ts` — clean
- [ ] `git diff package.json` — clean
- [ ] `git diff wrangler.toml` — clean
- [ ] `git diff src/app/pricing/page.tsx` — no changes to `metadata`, `JsonLd`, schema imports
- [ ] `data-plausible-event-name` attributes still present in source

---

## Pre-Build Checklist for Claude Code

Before writing a single line of code:

1. `git status` — confirm clean working tree on `main`
2. `git log --oneline -1` — confirm HEAD is `135fd73`
3. Read `src/data/pricing.ts` — confirm current `price` and `cta.href` values before any edit
4. Read `src/components/sections/pricing-section.tsx` — confirm component structure before edit
5. Read `src/app/pricing/page.tsx` — confirm `RecurringAiVisibilityTiers` / `PricingSection` ordering before inserting connector
6. **Do not proceed if any of the above differ from this specification.**

---

## Commit Message (for Claude Code)

```
feat(visual): Phase 5 pricing investment architecture

- Buyer-type labels per tier (buyerLabel field)
- Differentiated CTA labels (Launch / Growth / Authority / OS)
- Authority Engine outcome guarantee badge on card
- Launch 14-day reverse-trial badge
- Signal Audit entry point eyebrow
- Two-track connector (Citation Score™ / Wiele Ladder)
- PricingTier type extended: buyerLabel, guaranteeBadge, trialBadge, entryLabel

Prices unchanged. CTA hrefs unchanged. Schema unchanged.
No new routes. No token/package/wrangler changes.
```

---

## Founder Review Checklist

Before issuing the Claude Code build directive, confirm:

- [ ] CTA label set approved exactly as specified
- [ ] GuaranteeBadge copy approved ("Outcome guarantee · Citation share growth Q/Q")
- [ ] Two-track connector copy approved (or revision noted)
- [ ] Signal Audit Option A confirmed (eyebrow on card)
- [ ] Citation Score™ CTA "Book Measurement Call" — approved or keep "Book Strategy Call"
- [ ] buyerLabel strings approved per tier
- [ ] Dossier + this spec saved to `docs/directives/` — confirmed
