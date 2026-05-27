# Phase 3 Step 5 — Lead Capture Analytics + Event Tracking
**Directive version:** phase3-step5-analytics-event-tracking-2026-05-27  
**Prepared by:** Claude Cowork  
**Date:** 2026-05-27  
**Scope:** Three files. New utility + two form changes. No new pages. No sitemap changes. No MDX. No Plausible script changes. No GA4 script changes.

---

## §0 AUDIT FINDINGS (read before editing)

**Current analytics state — confirmed by code audit:**

Both scripts are wired and functional:
- `PlausibleScript` renders when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set — basic `script.js`, exposes `window.plausible` globally.
- `GoogleAnalyticsScript` renders when `NEXT_PUBLIC_GA4_MEASUREMENT_ID` is set — Consent Mode v2 default-denied (cookieless aggregate), sends page views. Custom events fire into `dataLayer` via `window.gtag('event', ...)`.

Neither script component needs to change. Plausible `script.js` already exposes `window.plausible()` for custom events. GA4 already queues custom `gtag('event', ...)` calls in `dataLayer` even before the external script loads.

**Gap — zero custom event tracking fires anywhere in the codebase.**  
Confirmed by grep across all `src/components/forms/`. No `gtag`, `plausible`, or `trackEvent` calls exist in `audit-form.tsx` or `contact-form.tsx`. High-value conversion actions (audit step progression, form submissions) are invisible to analytics.

**No `window.gtag` or `window.plausible` global type declaration exists.**  
Only `window.turnstile` is declared (in `turnstile-widget.tsx`). `track.ts` must declare both.

**Events selected (3 — minimal high-value set):**

| Event | Where | Value |
|---|---|---|
| `audit_form_step2` | `handleContinue` in `AuditForm` after `setStep(2)` | Top-of-funnel signal: user completed step 1 (name/email/company/website) and committed to step 2 |
| `audit_submitted` | `handleSubmit` in `AuditForm` on `res.status === 202` | Primary conversion: €2,500 intent confirmed |
| `contact_submitted` | `handleSubmit` in `ContactForm` on `res.status === 202` | Qualified lead confirmed |

**Events not included in this directive:**

- CTA click tracking — pages are static; navigation is captured as pageviews by both scripts. Adding `onClick` to Link components adds complexity without proportionate value at current traffic levels. Queue for Phase 3 Step 6.
- `audit_form_start` — requires tracking first-interaction state flag; lower value than conversion events. Queue for Phase 3 Step 6.

**Implementation: `src/lib/track.ts` (new file).**  
Single utility, dual-fires GA4 + Plausible. Never throws — analytics must never interrupt user flow. SSR-safe. Silently no-ops if either script is absent (dev env, ad-blocked). Declares `window.gtag` and `window.plausible` globally.

**Post-deploy founder actions (not code — manual dashboard setup):**

After successful deploy, configure both analytics dashboards:

1. **Plausible.io** — navigate to the `wielegroup.com` site → Goals → Add Goal for each:
   - `audit_form_step2`
   - `audit_submitted`
   - `contact_submitted`

2. **GA4** — navigate to Admin → Events. The events will appear automatically once they fire. Mark `audit_submitted` and `contact_submitted` as Conversions.

---

## §0 PRE-FLIGHT — HARD STOP IF ANY FAILS

```bash
# 1. Clean working tree
git status
# Expected: nothing to commit, working tree clean

# 2. On main
git branch --show-current
# Expected: main

# 3. /contact is live
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/contact
# Expected: 200

# 4. /audit is live
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/audit
# Expected: 200
```

---

## §3 PRE-READ — READ BEFORE EDITING

| # | File | Purpose |
|---|---|---|
| 3a | `src/components/forms/audit-form.tsx` | Read in full — locate `handleContinue` (the function that calls `validateStep1()` then `setStep(2)`) and the `res.status === 202` success branch in `handleSubmit`. |
| 3b | `src/components/forms/contact-form.tsx` | Read in full — locate the `res.status === 202 && data.ticketId` success branch in `handleSubmit`. |

Verify on read: neither file currently imports from `@/lib/track`. The import will be new for both.

---

## §4 FILE EDITS — VERBATIM

### §4a CREATE — `src/lib/track.ts`

**New file. Create exactly as shown.**

```typescript
/**
 * Lightweight analytics event utility.
 *
 * Dual-fires GA4 + Plausible. Never throws — analytics must never
 * interrupt user flow. SSR-safe (guards typeof window). Silently
 * no-ops if either script is absent or ad-blocked.
 *
 * GA4: queues into dataLayer via window.gtag; honours Consent Mode v2
 *   default-denied state (see google-analytics.tsx). Custom events are
 *   recorded in GA4 as soon as the measurement ID is configured.
 *
 * Plausible: calls window.plausible exposed by script.js
 *   (see plausible.tsx). Goals must be configured in the Plausible
 *   dashboard for events to appear in reports.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (
      event: string,
      opts?: { props?: Record<string, string | number | boolean> },
    ) => void;
  }
}

type TrackProps = Record<string, string | number | boolean>;

export function track(name: string, props?: TrackProps): void {
  if (typeof window === "undefined") return;

  // GA4 — queues into dataLayer; processed when gtag.js loads
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, props ?? {});
    }
  } catch {
    /* silently ignore — analytics must never break user flow */
  }

  // Plausible — window.plausible exposed by script.js
  try {
    if (typeof window.plausible === "function") {
      window.plausible(name, props ? { props } : undefined);
    }
  } catch {
    /* silently ignore — analytics must never break user flow */
  }
}
```

---

### §4b EDIT — `src/components/forms/audit-form.tsx`

**Two changes to this file. Read the full file before editing.**

---

**Change 1: Add import for `track`.**

Find this exact line:

```typescript
import { cn } from "@/lib/utils";
```

Replace with:

```typescript
import { cn } from "@/lib/utils";
import { track } from "@/lib/track";
```

---

**Change 2: Fire events in `handleContinue` and `handleSubmit`.**

Find this exact block (the `handleContinue` function and the 202 success branch in `handleSubmit`):

```typescript
  const handleContinue = () => {
    if (validateStep1()) setStep(2);
  };
```

Replace with:

```typescript
  const handleContinue = () => {
    if (validateStep1()) {
      setStep(2);
      track("audit_form_step2");
    }
  };
```

Then find this exact block (the 202 success branch in `handleSubmit`):

```typescript
      if (res.status === 202 && data.runId) {
        setSuccess({ runId: data.runId, input: parsed.data });
        return;
      }
```

Replace with:

```typescript
      if (res.status === 202 && data.runId) {
        track("audit_submitted", {
          industry: parsed.data.industry,
          market: parsed.data.market,
        });
        setSuccess({ runId: data.runId, input: parsed.data });
        return;
      }
```

**No other changes to this file.**

---

### §4c EDIT — `src/components/forms/contact-form.tsx`

**Two changes to this file. Read the full file before editing.**

---

**Change 1: Add import for `track`.**

Find this exact line:

```typescript
import { contactSchema, type ContactInput } from "@/lib/validations";
```

Replace with:

```typescript
import { contactSchema, type ContactInput } from "@/lib/validations";
import { track } from "@/lib/track";
```

---

**Change 2: Fire event in the 202 success branch of `handleSubmit`.**

Find this exact block:

```typescript
      if (res.status === 202 && data.ticketId) {
        setSuccess(data.ticketId);
        return;
      }
```

Replace with:

```typescript
      if (res.status === 202 && data.ticketId) {
        track("contact_submitted");
        setSuccess(data.ticketId);
        return;
      }
```

**No other changes to this file.**

---

## §5 ACCEPTANCE CRITERIA — ALL MUST PASS BEFORE DEPLOY

```bash
# A1 — Build passes
npm run build
# Expected: exit 0
# Expected: static page count = 54 (no regression, no new pages)

# A2 — No GBP/£ introduced
grep -r "£\|GBP" src/lib/track.ts src/components/forms/audit-form.tsx src/components/forms/contact-form.tsx
# Expected: no matches

# A3 — track.ts created and exports track function
grep "export function track" src/lib/track.ts
# Expected: one match

# A4 — window.gtag declared in track.ts
grep "window.gtag" src/lib/track.ts
# Expected: at least one match (declare global + usage)

# A5 — window.plausible declared in track.ts
grep "window.plausible" src/lib/track.ts
# Expected: at least one match

# A6 — audit-form imports track
grep 'from "@/lib/track"' src/components/forms/audit-form.tsx
# Expected: one match

# A7 — contact-form imports track
grep 'from "@/lib/track"' src/components/forms/contact-form.tsx
# Expected: one match

# A8 — audit_form_step2 event present
grep '"audit_form_step2"' src/components/forms/audit-form.tsx
# Expected: one match

# A9 — audit_submitted event present
grep '"audit_submitted"' src/components/forms/audit-form.tsx
# Expected: one match

# A10 — contact_submitted event present
grep '"contact_submitted"' src/components/forms/contact-form.tsx
# Expected: one match

# A11 — TypeScript clean
npx tsc --noEmit
# Expected: exit 0, no errors
```

All 11 checks must pass. Any failure = hard stop.

---

## §6 POST-DEPLOY VERIFICATION

```bash
# V1 — /contact returns 200
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/contact
# Expected: 200

# V2 — /audit returns 200
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/audit
# Expected: 200

# V3 — track utility present in deployed Worker source
curl -s -A "Mozilla/5.0" https://wielegroup.com/audit | grep -i "audit_submitted"
# Expected: at least one match (minified event name in page bundle)
```

**Manual verification (founder action):**

1. Open `https://wielegroup.com/audit` in browser with DevTools Network tab open.
2. Complete step 1 of the audit form and click "Continue".
   - Verify `audit_form_step2` appears in the Plausible Realtime dashboard.
   - Or verify a `/g/collect` request fires in DevTools Network with `en=audit_form_step2`.
3. Submit a test audit form.
   - Verify `audit_submitted` fires.
4. Submit a test contact form at `https://wielegroup.com/contact`.
   - Verify `contact_submitted` fires.

**Dashboard setup (founder action — after manual verification):**

Plausible.io:
- Site settings → Goals → Add Goal (type: Custom event) for each:
  - `audit_form_step2`
  - `audit_submitted`
  - `contact_submitted`

GA4:
- Admin → Events → locate each event after first fire.
- Mark `audit_submitted` and `contact_submitted` as Conversions.

---

## §7 COMMIT + DEPLOY SEQUENCE

```bash
# 1. Stage three files
git add src/lib/track.ts src/components/forms/audit-form.tsx src/components/forms/contact-form.tsx

# 2. Verify diff
git diff --cached --stat
# Expected: 3 files changed (1 new + 2 modified)

# 3. Commit
git commit -m "feat(analytics): Phase 3 Step 5 — dual-fire GA4+Plausible event tracking for audit and contact conversions"

# 4. Tag
git tag phase3-step5-analytics-event-tracking-2026-05-27

# 5. Push
git push origin main --tags

# 6. Deploy
npm run deploy:cf

# 7. Run §6 verification commands

# 8. IndexNow — 0 content pages changed (client components only — skip IndexNow)
```

**Note:** IndexNow is not required for this change. No page content changed. Client-side tracking code is not indexed.

---

## §8 REPORT FORMAT

```
Status: PASS / FAIL
Worker: [worker ID]
Commit: [short SHA]
Tag: phase3-step5-analytics-event-tracking-2026-05-27
Build: Passed / Failed — [page count]
A3 track.ts created: yes / no
A6 audit-form imports track: yes / no
A7 contact-form imports track: yes / no
A8 audit_form_step2 present: yes / no
A9 audit_submitted present: yes / no
A10 contact_submitted present: yes / no
A11 TypeScript clean: yes / no
V1 /contact 200: yes / no
V2 /audit 200: yes / no
V3 event name in bundle: yes / no
Plausible goals configured: yes / no / deferred
GA4 conversions marked: yes / no / deferred
Issues: none / [describe]
```

---

## §9 ROLLBACK

```bash
git revert HEAD --no-edit
git push origin main
npm run deploy:cf
```

No generated JSON was modified — no secondary regeneration step needed. Plausible and GA4 dashboard goals can remain — removing events from the codebase simply stops them firing; orphaned goals are harmless.
