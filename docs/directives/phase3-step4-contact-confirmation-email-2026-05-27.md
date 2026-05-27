# Phase 3 Step 4 — Contact Confirmation Email
**Directive version:** phase3-step4-contact-confirmation-email-2026-05-27  
**Prepared by:** Claude Cowork  
**Date:** 2026-05-27  
**Scope:** Two files. Three changes. No new imports beyond what is listed. No new pages. No sitemap changes. No MDX. No Turnstile changes.

---

## §0 AUDIT FINDINGS (read before editing)

The Phase 3 Step 4 lead-capture audit found the following:

**Cleared (no action needed):**
- `/api/contact` fail-open sequence (validate → honeypot → KV → email → 202) — correct, structural change only.
- `sendContactNotification` founder email — correct, preserved exactly.
- Honeypot `company_website` field — correct, no change.
- Turnstile on contact form — intentionally absent. WAF rate-limiting is the sophisticated-attacker layer. No change warranted at this stage. Revisit at Phase 3 Step 5 if spam rate warrants it.
- ContactForm success state renders `ticketId` reference and fallback email — correct, no change.

**Gap — `/api/contact` sends only one email (founder) on submission.**  
`sendContactNotification` fires the founder notification. No customer confirmation is sent. This creates a trust gap: the visitor has no proof their message was received, no reference ticket in their inbox, and no reply-to path back to Wiele. Fix: add `sendContactCustomerConfirmation` to `src/lib/resend.ts` and update `/api/contact` to fire both emails in parallel (matching the audit and onboarding route pattern).

**Design decision — no Turnstile on contact form:**  
Contact form is lower-risk than the audit form (no €2,500 commitment on the other end). Honeypot covers dumb bots. Cloudflare WAF covers sophisticated attacks. Adding Turnstile to contact would require: schema change (add `turnstileToken` field to `contactSchema`), form UI change (add `TurnstileWidget` component), server-side verification call. Not warranted at current traffic levels. Queue as Phase 3 Step 5 if needed.

**Email template design — `sendContactCustomerConfirmation`:**  
Uses `FROM_CONTACT`, `chromaglassShell`, `C` color tokens, `escapeHtml`, `row` — identical pattern to `sendAuditCustomerConfirmation`. Sends to `input.email`, `replyTo: siteConfig.email`. Subject: `"Wiele — message received"`. Body: first-name greeting, "one business day" commitment (bold blueHi), quoted message block (coralCore left-border — matches founder notification accent), reply-to instruction, founder sign-off. No runId-style reference in subject line (contact is lighter-weight than audit). footerNote carries the ticketId reference.

**`src/lib/resend.ts` file header comment — update required:**  
Line 7 currently reads: `"Two emails per audit / onboarding submission, not one"`. After this change, contact also fires two emails. Update to: `"Two emails per audit / contact / onboarding submission, not one"`.

**Section comment — update required:**  
Lines 318–320 currently read:
```
/* ─────────────────────────────────────────────────────────────
   Contact email (single — founder notification only)
───────────────────────────────────────────────────────────────── */
```
Update to:
```
/* ─────────────────────────────────────────────────────────────
   Contact emails — two per submission (customer confirm + founder notify).
───────────────────────────────────────────────────────────────── */
```

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
| 3a | `src/lib/resend.ts` | Read in full — locate line 7 (file header comment), lines 318–353 (contact section header + `sendContactNotification`). Confirm `C`, `chromaglassShell`, `escapeHtml`, `row`, `siteConfig`, `FROM_CONTACT` are in scope. |
| 3b | `src/app/api/contact/route.ts` | Read in full — locate import line 5 (`sendContactNotification`) and the email send block (~lines 79–85). |

Verify on read: `ContactInput` is already imported in `resend.ts` (line 1). Do not add a duplicate import.

---

## §4 FILE EDITS — VERBATIM

### §4a EDIT — `src/lib/resend.ts`

**Three changes to this file. Read the full file before editing.**

---

**Change 1: Update file header comment.**

Find this exact text:

```typescript
 * Two emails per audit / onboarding submission, not one
```

Replace with:

```typescript
 * Two emails per audit / contact / onboarding submission, not one
```

---

**Change 2: Update contact section separator comment.**

Find this exact block:

```typescript
/* ─────────────────────────────────────────────────────────────
   Contact email (single — founder notification only)
───────────────────────────────────────────────────────────────── */
```

Replace with:

```typescript
/* ─────────────────────────────────────────────────────────────
   Contact emails — two per submission (customer confirm + founder notify).
───────────────────────────────────────────────────────────────── */
```

---

**Change 3: Add `sendContactCustomerConfirmation` after `sendContactNotification`.**

Find this exact block (the closing of `sendContactNotification` and the start of the onboarding section):

```typescript
  return send({
    from: FROM_CONTACT,
    to: siteConfig.email,
    replyTo: input.email,
    subject,
    text,
    html,
  });
}

/* ─────────────────────────────────────────────────────────────
   Onboarding emails — two per submission (client confirm + founder notify).
───────────────────────────────────────────────────────────────── */
```

Replace with:

```typescript
  return send({
    from: FROM_CONTACT,
    to: siteConfig.email,
    replyTo: input.email,
    subject,
    text,
    html,
  });
}

export async function sendContactCustomerConfirmation(
  input: ContactInput,
  ticketId: string,
): Promise<ResendResult> {
  const firstName = input.name.split(" ")[0];
  const subject = `Wiele — message received`;
  const text = `Hi ${firstName},

We've received your message and will respond inside one business day.
${input.company ? `\nCompany: ${input.company}` : ""}
Your message:
"${input.message}"

If it's urgent, reply to this email directly — it reaches us immediately.

— ${siteConfig.founder}
${siteConfig.legalName} · ${siteConfig.url}
Reference: ${ticketId}`;
  const body = `
<p style="margin:0 0 16px;color:${C.chromeHi};font-size:16px;">Hi ${escapeHtml(firstName)},</p>
<p style="margin:0 0 24px;">We've received your message and will respond inside <strong style="color:${C.blueHi};">one business day</strong>.</p>
<div style="white-space:pre-wrap;line-height:1.65;background:${C.bgFloor};border:1px solid ${C.chromeVlo};border-left:3px solid ${C.coralCore};padding:16px 20px;border-radius:8px;color:${C.chromeMid};margin:0 0 24px;">${escapeHtml(input.message)}</div>
<p style="margin:0 0 16px;">If it's urgent, reply to this email directly — it reaches us immediately.</p>
<p style="margin:24px 0 0;color:${C.chromeMid};">— ${escapeHtml(siteConfig.founder)}<br/><span style="color:${C.chromeLo};">${escapeHtml(siteConfig.legalName)}</span> · <a href="${siteConfig.url}" style="color:${C.blueHi};text-decoration:none;">${siteConfig.url.replace(/^https?:\/\//, "")}</a></p>`;
  const html = chromaglassShell(body, { footerNote: `Reference: ${escapeHtml(ticketId)}` });

  return send({
    from: FROM_CONTACT,
    to: input.email,
    replyTo: siteConfig.email,
    subject,
    text,
    html,
  });
}

/* ─────────────────────────────────────────────────────────────
   Onboarding emails — two per submission (client confirm + founder notify).
───────────────────────────────────────────────────────────────── */
```

**No other changes to this file.**

---

### §4b EDIT — `src/app/api/contact/route.ts`

**Two changes to this file. Read the full file before editing.**

---

**Change 1: Update import to include `sendContactCustomerConfirmation`.**

Find this exact line:

```typescript
import { sendContactNotification } from "@/lib/resend";
```

Replace with:

```typescript
import { sendContactNotification, sendContactCustomerConfirmation } from "@/lib/resend";
```

---

**Change 2: Replace single email send with parallel `Promise.all`.**

Find this exact block:

```typescript
  const emailResult = await sendContactNotification(input, ticketId, meta).catch((err) => ({
    ok: false as const,
    reason: err instanceof Error ? err.message : "unknown",
  }));
  if (!emailResult.ok) {
    console.error(`[contact] founder email failed for ${ticketId}: ${emailResult.reason}`);
  }

  return NextResponse.json({ ticketId, queuedAt }, { status: 202 });
```

Replace with:

```typescript
  const [customerResult, founderResult] = await Promise.all([
    sendContactCustomerConfirmation(input, ticketId).catch((err) => ({
      ok: false as const,
      reason: err instanceof Error ? err.message : "unknown",
    })),
    sendContactNotification(input, ticketId, meta).catch((err) => ({
      ok: false as const,
      reason: err instanceof Error ? err.message : "unknown",
    })),
  ]);
  if (!customerResult.ok) {
    console.error(`[contact] customer email failed for ${ticketId}: ${customerResult.reason}`);
  }
  if (!founderResult.ok) {
    console.error(`[contact] founder email failed for ${ticketId}: ${founderResult.reason}`);
  }

  return NextResponse.json({ ticketId, queuedAt }, { status: 202 });
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
grep -r "£\|GBP" src/lib/resend.ts src/app/api/contact/route.ts
# Expected: no matches

# A3 — sendContactCustomerConfirmation exported
grep "export async function sendContactCustomerConfirmation" src/lib/resend.ts
# Expected: one match

# A4 — sendContactCustomerConfirmation imported in route
grep "sendContactCustomerConfirmation" src/app/api/contact/route.ts
# Expected: at least two matches (import + usage in Promise.all)

# A5 — Promise.all pattern present in route
grep "Promise.all" src/app/api/contact/route.ts
# Expected: one match

# A6 — Old single emailResult pattern gone
grep "emailResult" src/app/api/contact/route.ts
# Expected: no matches

# A7 — File header comment updated
grep "Two emails per audit / contact / onboarding" src/lib/resend.ts
# Expected: one match

# A8 — Section comment updated
grep "Contact emails — two per submission" src/lib/resend.ts
# Expected: one match

# A9 — No duplicate ContactInput import
grep -c "ContactInput" src/lib/resend.ts
# Expected: 1 (import line only — the function signature uses it but does not import it again)

# A10 — TypeScript clean
npx tsc --noEmit
# Expected: exit 0, no errors
```

All 10 checks must pass. Any failure = hard stop.

---

## §6 POST-DEPLOY VERIFICATION

```bash
# V1 — /contact returns 200
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/contact
# Expected: 200

# V2 — /audit returns 200
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/audit
# Expected: 200

# V3 — submit a real contact form test submission via /contact and verify:
#   (a) founder receives notification email to siteConfig.email
#   (b) submitter receives confirmation email to the address entered
#   (c) both emails carry the same ticketId reference
# Manual verification — check inbox.
```

---

## §7 COMMIT + DEPLOY SEQUENCE

```bash
# 1. Stage two files
git add src/lib/resend.ts src/app/api/contact/route.ts

# 2. Verify diff
git diff --cached --stat
# Expected: 2 files changed

# 3. Commit
git commit -m "feat(email): Phase 3 Step 4 — contact customer confirmation email"

# 4. Tag
git tag phase3-step4-contact-confirmation-email-2026-05-27

# 5. Push
git push origin main --tags

# 6. Deploy
npm run deploy:cf

# 7. Run §6 verification commands

# 8. IndexNow — 0 content pages changed (API route only — skip IndexNow)
```

**Note:** IndexNow is not required for this change. No page content changed. The API route is not indexed.

---

## §8 REPORT FORMAT

```
Status: PASS / FAIL
Worker: [worker ID]
Commit: [short SHA]
Tag: phase3-step4-contact-confirmation-email-2026-05-27
Build: Passed / Failed — [page count]
A3 sendContactCustomerConfirmation exported: yes / no
A4 imported in route: yes / no
A5 Promise.all present: yes / no
A6 emailResult pattern gone: yes / no
A7 file header comment updated: yes / no
A8 section comment updated: yes / no
A10 TypeScript clean: yes / no
V1 /contact 200: yes / no
V2 /audit 200: yes / no
V3 confirmation email received by submitter: yes / no
Issues: none / [describe]
```

---

## §9 ROLLBACK

```bash
git revert HEAD --no-edit
git push origin main
npm run deploy:cf
```

No generated JSON was modified — no secondary regeneration step needed.
