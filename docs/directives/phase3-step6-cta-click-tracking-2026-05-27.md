# Phase 3 Step 6 — CTA Click Tracking + Funnel Attribution
**Directive version:** phase3-step6-cta-click-tracking-2026-05-27  
**Prepared by:** Claude Cowork  
**Date:** 2026-05-27  
**Scope:** 1 new file + 5 edits. No new pages. No sitemap changes. No MDX. No API changes. No script changes.

---

## §0 AUDIT FINDINGS (read before editing)

**Current state — confirmed by code audit:**

`src/lib/track.ts` exists (Step 5). It exports `track(name, props?)`, dual-fires GA4 + Plausible, declares `window.gtag` and `window.plausible` globally, is SSR-safe, never throws.

**Gap — zero CTA click events fire anywhere in the codebase.**  
Confirmed by grep. No `track(` calls exist in `cta-section.tsx`, `hero-section.tsx`, `audit-preview.tsx`, `article-cta.tsx`. Navigation clicks to `/audit` and `/contact` — the highest-value conversion pathways — are invisible beyond page views.

**Server component constraint.**  
All four shared CTA components are React Server Components (no `"use client"` directive). Server components cannot attach `onClick` handlers. The correct solution is a `TrackingLink` client component (`"use client"`) that wraps Next.js `Link` and calls `track()` on click. Server components import client components freely across the RSC boundary — this is standard Next.js App Router pattern.

**`audit_form_start` queued from Step 5.**  
`audit-form.tsx` is already a client component. Track on first focus of the name field using a `useRef` flag. Fire once — not on every re-focus.

**Events selected (2 names, 6 fires):**

| Event | Props | Component | Commercial value |
|---|---|---|---|
| `cta_audit_click` | `{ source: "hero" }` | hero-section.tsx | Homepage primary intent |
| `cta_audit_click` | `{ source: "cta_section" }` | cta-section.tsx (shared across all pages) | Cross-page conversion intent |
| `cta_contact_click` | `{ source: "cta_section" }` | cta-section.tsx | Strategy call intent |
| `cta_audit_click` | `{ source: "audit_preview" }` | audit-preview.tsx | Product-section intent |
| `cta_audit_click` | `{ source: "article_cta" }` | article-cta.tsx | Content → conversion attribution |
| `audit_form_start` | (none) | audit-form.tsx | Top-of-funnel engagement |

**Events excluded from this directive:**

- Page-level CTAs in individual page files (`for-brands`, `for-agencies`, `proof`, etc.) — shared components above cover the highest-frequency placements. Per-page work at current traffic levels adds complexity without proportionate funnel insight.
- Pricing tier CTA clicks — `StandardTierCard` and `AnchorTierCard` have data-driven `href`s from `/data/pricing`. The "Or pay now" links already carry `data-plausible-event-name` (Plausible data-attribute integration, separate mechanism). Leave both untouched.
- Nav and footer links — noise at current traffic.

**`TrackingLink` design:**  
`"use client"` component. Wraps `Link`, spreads all props through, fires `track()` in `onClick` before passing through any user-supplied `onClick`. Import path: `@/components/ui/tracking-link`. No new dependencies. No CSS. Renders identical DOM to `Link` with the same `className` and `href`.

---

## §0 PRE-FLIGHT — HARD STOP IF ANY FAILS

```bash
# 1. Clean working tree
git status
# Expected: nothing to commit, working tree clean

# 2. On main
git branch --show-current
# Expected: main

# 3. track.ts exists (Step 5 shipped)
ls src/lib/track.ts
# Expected: file present, no error

# 4. /audit is live
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/audit
# Expected: 200

# 5. /contact is live
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/contact
# Expected: 200
```

---

## §3 PRE-READ — READ BEFORE EDITING

| # | File | Purpose |
|---|---|---|
| 3a | `src/lib/track.ts` | Confirm `track` export and global type declarations. No changes to this file. |
| 3b | `src/components/sections/cta-section.tsx` | Read in full. Two `<Link>` elements: `/audit` ("Start AI Visibility Audit") and `/contact` ("Book Strategy Call"). Both will become `<TrackingLink>`. |
| 3c | `src/components/sections/hero-section.tsx` | Read in full. One primary `<Link>` to `/audit` ("Start AI Visibility Audit"). Replace with `<TrackingLink>`. Secondary link to `#disciplines` is NOT tracked (anchor, not conversion). |
| 3d | `src/components/sections/audit-preview.tsx` | Read in full. One `<Link>` to `/audit` ("Start AI Visibility Audit · €2,500"). Replace with `<TrackingLink>`. Secondary link to `/platform` is NOT tracked. |
| 3e | `src/components/labs/article-cta.tsx` | Read in full. One `<Link>` to `/audit` ("Start AI Visibility Audit"). Replace with `<TrackingLink>`. Secondary link to `/labs` is NOT tracked. |
| 3f | `src/components/forms/audit-form.tsx` | Read in full. Locate `useCallback` and `useState` imports at top. Locate the name `<Input>` (first field in step 1 grid, `name="name"`). Add `useRef` import and `onFocus` handler. |

---

## §4 FILE EDITS — VERBATIM

### §4a CREATE — `src/components/ui/tracking-link.tsx`

**New file. Create exactly as shown.**

```typescript
"use client";

/**
 * TrackingLink — wraps Next.js Link with a track() call on click.
 *
 * Use in server components to fire analytics events from CTA links.
 * Renders identical DOM to <Link>; all props forwarded through.
 * track() is fire-and-forget — never interrupts navigation.
 */

import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { track } from "@/lib/track";

interface TrackingLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  eventName: string;
  eventProps?: Record<string, string | number | boolean>;
}

export function TrackingLink({
  eventName,
  eventProps,
  onClick,
  ...props
}: TrackingLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        track(eventName, eventProps);
        onClick?.(e);
      }}
    />
  );
}
```

---

### §4b EDIT — `src/components/sections/cta-section.tsx`

**Two changes. Read file before editing.**

---

**Change 1: Add TrackingLink import.**

Find this exact line:

```typescript
import Link from "next/link";
```

Replace with:

```typescript
import Link from "next/link";
import { TrackingLink } from "@/components/ui/tracking-link";
```

---

**Change 2: Replace both conversion links with TrackingLink.**

Find this exact block:

```typescript
            <Link
              href="/audit"
              className={buttonStyles({ variant: "primary", size: "lg" })}
            >
              Start AI Visibility Audit
            </Link>
            <Link
              href="/contact"
              className={buttonStyles({ variant: "ghost", size: "lg" })}
            >
              Book Strategy Call
            </Link>
```

Replace with:

```typescript
            <TrackingLink
              href="/audit"
              className={buttonStyles({ variant: "primary", size: "lg" })}
              eventName="cta_audit_click"
              eventProps={{ source: "cta_section" }}
            >
              Start AI Visibility Audit
            </TrackingLink>
            <TrackingLink
              href="/contact"
              className={buttonStyles({ variant: "ghost", size: "lg" })}
              eventName="cta_contact_click"
              eventProps={{ source: "cta_section" }}
            >
              Book Strategy Call
            </TrackingLink>
```

**No other changes to this file.**

---

### §4c EDIT — `src/components/sections/hero-section.tsx`

**Two changes. Read file before editing.**

---

**Change 1: Add TrackingLink import.**

Find this exact line:

```typescript
import Link from "next/link";
```

Replace with:

```typescript
import Link from "next/link";
import { TrackingLink } from "@/components/ui/tracking-link";
```

---

**Change 2: Replace the primary audit CTA with TrackingLink.**

Find this exact block:

```typescript
                <Link
                  href="/audit"
                  className={buttonStyles({ variant: "primary", size: "lg" })}
                >
                  Start AI Visibility Audit
                </Link>
```

Replace with:

```typescript
                <TrackingLink
                  href="/audit"
                  className={buttonStyles({ variant: "primary", size: "lg" })}
                  eventName="cta_audit_click"
                  eventProps={{ source: "hero" }}
                >
                  Start AI Visibility Audit
                </TrackingLink>
```

The `<Link href="#disciplines">` secondary CTA remains `<Link>` — anchor scroll, not a conversion action. Do not change it.

**No other changes to this file.**

---

### §4d EDIT — `src/components/sections/audit-preview.tsx`

**Two changes. Read file before editing.**

---

**Change 1: Add TrackingLink import.**

Find this exact line:

```typescript
import Link from "next/link";
```

Replace with:

```typescript
import Link from "next/link";
import { TrackingLink } from "@/components/ui/tracking-link";
```

---

**Change 2: Replace the primary audit CTA with TrackingLink.**

Find this exact block:

```typescript
              <Link
                href="/audit"
                className={buttonStyles({ variant: "featured", size: "lg" })}
              >
                Start AI Visibility Audit · €2,500
              </Link>
```

Replace with:

```typescript
              <TrackingLink
                href="/audit"
                className={buttonStyles({ variant: "featured", size: "lg" })}
                eventName="cta_audit_click"
                eventProps={{ source: "audit_preview" }}
              >
                Start AI Visibility Audit · €2,500
              </TrackingLink>
```

The `<Link href="/platform">` secondary CTA remains `<Link>` — content navigation, not a conversion action. Do not change it.

**No other changes to this file.**

---

### §4e EDIT — `src/components/labs/article-cta.tsx`

**Two changes. Read file before editing.**

---

**Change 1: Add TrackingLink import.**

Find this exact line:

```typescript
import Link from "next/link";
```

Replace with:

```typescript
import Link from "next/link";
import { TrackingLink } from "@/components/ui/tracking-link";
```

---

**Change 2: Replace the primary audit CTA with TrackingLink.**

Find this exact block:

```typescript
          <Link href="/audit" className={buttonStyles({ variant: "featured", size: "md" })}>
            Start AI Visibility Audit
          </Link>
```

Replace with:

```typescript
          <TrackingLink
            href="/audit"
            className={buttonStyles({ variant: "featured", size: "md" })}
            eventName="cta_audit_click"
            eventProps={{ source: "article_cta" }}
          >
            Start AI Visibility Audit
          </TrackingLink>
```

The `<Link href="/labs">` secondary CTA remains `<Link>`. Do not change it.

**No other changes to this file.**

---

### §4f EDIT — `src/components/forms/audit-form.tsx`

**Two changes. Read file before editing.**

---

**Change 1: Add `useRef` to the React import.**

Find this exact line:

```typescript
import { useCallback, useState } from "react";
```

Replace with:

```typescript
import { useCallback, useRef, useState } from "react";
```

---

**Change 2: Add `startedRef` and fire `audit_form_start` on first focus of the name field.**

Find this exact block (the state declarations inside `AuditForm`, after `const [success, setSuccess]`):

```typescript
  const update =
```

Replace with:

```typescript
  // Fire audit_form_start once on first interaction with the name field.
  // useRef ensures the event fires at most once per component mount
  // even if the user focuses/blurs the field multiple times.
  const startedRef = useRef(false);

  const update =
```

Then find the name `<Input>` block (first field in step 1, `name="name"`):

```typescript
            <Input
              label="Your name"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={update("name")}
              error={errors.name}
              required
            />
```

Replace with:

```typescript
            <Input
              label="Your name"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={update("name")}
              onFocus={() => {
                if (!startedRef.current) {
                  startedRef.current = true;
                  track("audit_form_start");
                }
              }}
              error={errors.name}
              required
            />
```

**No other changes to this file.**

---

## §5 ACCEPTANCE CRITERIA — ALL MUST PASS BEFORE DEPLOY

```bash
# A1 — Build passes
npm run build
# Expected: exit 0
# Expected: static page count = 54 (no regression)

# A2 — TrackingLink created
grep "export function TrackingLink" src/components/ui/tracking-link.tsx
# Expected: one match

# A3 — TrackingLink is a client component
grep '"use client"' src/components/ui/tracking-link.tsx
# Expected: one match

# A4 — TrackingLink imports track
grep 'from "@/lib/track"' src/components/ui/tracking-link.tsx
# Expected: one match

# A5 — cta-section uses TrackingLink
grep "TrackingLink" src/components/sections/cta-section.tsx
# Expected: at least two matches (two links)

# A6 — hero-section uses TrackingLink
grep "TrackingLink" src/components/sections/hero-section.tsx
# Expected: at least one match

# A7 — audit-preview uses TrackingLink
grep "TrackingLink" src/components/sections/audit-preview.tsx
# Expected: at least one match

# A8 — article-cta uses TrackingLink
grep "TrackingLink" src/components/labs/article-cta.tsx
# Expected: at least one match

# A9 — cta_audit_click event wired
grep '"cta_audit_click"' \
  src/components/sections/cta-section.tsx \
  src/components/sections/hero-section.tsx \
  src/components/sections/audit-preview.tsx \
  src/components/labs/article-cta.tsx
# Expected: four matches (one per file)

# A10 — cta_contact_click event wired
grep '"cta_contact_click"' src/components/sections/cta-section.tsx
# Expected: one match

# A11 — audit_form_start event wired
grep '"audit_form_start"' src/components/forms/audit-form.tsx
# Expected: one match

# A12 — startedRef present in audit-form
grep "startedRef" src/components/forms/audit-form.tsx
# Expected: at least two matches (declaration + usage)

# A13 — source prop wired on all audit CTAs
grep 'source:' \
  src/components/sections/cta-section.tsx \
  src/components/sections/hero-section.tsx \
  src/components/sections/audit-preview.tsx \
  src/components/labs/article-cta.tsx
# Expected: four matches

# A14 — TypeScript clean
npx tsc --noEmit
# Expected: exit 0, no errors
```

All 14 checks must pass. Any failure = hard stop.

---

## §6 POST-DEPLOY VERIFICATION

```bash
# V1 — /audit returns 200
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/audit
# Expected: 200

# V2 — / returns 200 (hero + cta-section + audit-preview all render)
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/
# Expected: 200

# V3 — TrackingLink class present in deployed bundle
curl -s -A "Mozilla/5.0" https://wielegroup.com/ | grep -c "cta_audit_click"
# Expected: at least 1 (minified event name present)
```

**Manual verification (founder action):**

1. Open `https://wielegroup.com/` in browser with Plausible Realtime dashboard open (or DevTools Network).
2. Click "Start AI Visibility Audit" in the hero.
   - Plausible Realtime should show `cta_audit_click` with `source=hero`.
3. Navigate back. Click "Start AI Visibility Audit" in the lower CTA section.
   - Plausible Realtime should show `cta_audit_click` with `source=cta_section`.
4. Click "Book Strategy Call" in the CTA section.
   - Plausible Realtime should show `cta_contact_click` with `source=cta_section`.
5. Navigate to `/audit`. Click the name field without typing.
   - Plausible Realtime should show `audit_form_start`.
   - Click the field again — confirm the event does NOT fire a second time.
6. Navigate to any `/labs/[slug]` article. Click "Start AI Visibility Audit" in the article CTA.
   - Plausible Realtime should show `cta_audit_click` with `source=article_cta`.

**Dashboard setup (founder action — after manual verification):**

Plausible.io — Site settings → Goals → Add Goal (type: Custom event) for each:
- `cta_audit_click` (add custom property filter: `source` → for funnel breakdown by placement)
- `cta_contact_click`
- `audit_form_start`

GA4 — these will appear in Admin → Events after first fire. No conversion marking needed (navigation clicks; mark `audit_submitted` and `contact_submitted` as conversions per Step 5 instructions).

---

## §7 COMMIT + DEPLOY SEQUENCE

```bash
# 1. Stage all changed files
git add \
  src/components/ui/tracking-link.tsx \
  src/components/sections/cta-section.tsx \
  src/components/sections/hero-section.tsx \
  src/components/sections/audit-preview.tsx \
  src/components/labs/article-cta.tsx \
  src/components/forms/audit-form.tsx

# 2. Verify diff
git diff --cached --stat
# Expected: 6 files changed (1 new + 5 modified)

# 3. Commit
git commit -m "feat(analytics): Phase 3 Step 6 — CTA click tracking + audit_form_start funnel attribution"

# 4. Tag
git tag phase3-step6-cta-click-tracking-2026-05-27

# 5. Push
git push origin main --tags

# 6. Deploy
npm run deploy:cf

# 7. Run §6 verification commands
```

**Note:** IndexNow not required. No page content changed. Client-side analytics code is not indexed.

---

## §8 REPORT FORMAT

```
Status: PASS / FAIL
Worker: [worker ID]
Commit: [short SHA]
Tag: phase3-step6-cta-click-tracking-2026-05-27
Build: Passed / Failed — [page count]
A2 TrackingLink created: yes / no
A3 TrackingLink is client: yes / no
A5 cta-section wired: yes / no
A6 hero-section wired: yes / no
A7 audit-preview wired: yes / no
A8 article-cta wired: yes / no
A9 cta_audit_click (4x): yes / no
A10 cta_contact_click: yes / no
A11 audit_form_start: yes / no
A12 startedRef present: yes / no
A14 TypeScript clean: yes / no
V1 /audit 200: yes / no
V2 / 200: yes / no
V3 event name in bundle: yes / no
Issues: none / [describe]
```

---

## §9 ROLLBACK

```bash
git revert HEAD --no-edit
git push origin main
npm run deploy:cf
```

Plausible and GA4 goal definitions can remain — orphaned goals are harmless when events stop firing.

---

## §10 FUNNEL MODEL AFTER STEP 6

Complete event chain now live:

```
Page view (Plausible/GA4 auto)
  → cta_audit_click { source: hero | cta_section | audit_preview | article_cta }
    → audit_form_start
      → audit_form_step2
        → audit_submitted { industry, market }

Page view
  → cta_contact_click { source: cta_section }
    → contact_submitted
```

This is a clean 5-event funnel. Sufficient for conversion attribution, source comparison, and drop-off analysis at current traffic levels. Do not add more events until this data is in use.
