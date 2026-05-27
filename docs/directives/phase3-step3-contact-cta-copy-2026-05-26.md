# Phase 3 Step 3 — Contact Hero CTA + "Open calendar" Copy Fix
**Directive version:** phase3-step3-contact-cta-copy-2026-05-26  
**Prepared by:** Claude Cowork  
**Date:** 2026-05-26  
**Scope:** One file. Two changes. No new imports. No new pages. No sitemap changes. No MDX.

---

## §0 AUDIT FINDINGS (read before editing)

The Phase 3 Step 3 lead-capture audit found the following across `/contact`, `AuditForm`, and both API routes:

**Cleared (no action needed):**
- AuditForm progressive disclosure, Turnstile, step-back on error, Turnstile disable-until-token — all correct.
- `/api/audit` fail-open sequence (validate → Turnstile server-verify → KV → engine → 2 emails → 202) — correct.
- `/api/contact` fail-open sequence (validate → honeypot → KV → founder email → 202) — correct.
- `AuditThankYou` PromptSimulator + timeline + express upsell bar + email + Labs links — correct.
- ContactForm success state with reference ticket and fallback email address — correct.
- Turnstile dev-bypass + production fail-closed — correct.

**Gap 1 — `/contact` hero has no CTA button.**  
Hero renders Badge + H1 + body text only. No above-the-fold path to `#form`. Same pattern as `/audit` and `/pricing` before Phase 3 Steps 2–3. Fix: add a two-button CTA row after the body-text FadeIn block. Primary: "Send a message" → `#form`. Ghost: "Start AI Visibility Audit" → `/audit`.

**Gap 2 — "Book a strategy call" channel card says "Open calendar" but links to `#form`.**  
`cta.label: "Open calendar"` implies Calendly / cal.com. What actually happens: page scrolls to the contact form. A premium B2B visitor expects a calendar booking flow. Mismatched label breaks trust at the moment of conversion. Fix: change label from `"Open calendar"` to `"Send a message →"`. One word-group change.

**Note (not in this directive):** No customer confirmation email fires on `/api/contact` — this is intentional per route comment ("the message itself is the conversation start"). Recommend a Resend customer confirmation template as Phase 3 Step 4 work. No analytics events on form submits — recommend GA4 / Plausible instrumentation as separate work.

`Link` and `buttonStyles` are already imported in `src/app/contact/page.tsx`. No new imports are needed.

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
| 3a | `src/app/contact/page.tsx` | Read in full — locate the `<FadeIn delay={0.1}>` hero body-text block and the `channels` const `"Open calendar"` label |

Verify on read: `Link` and `buttonStyles` are already imported (lines 2 and 5). Do not add duplicate imports.

---

## §4 FILE EDITS — VERBATIM

### §4a EDIT — `src/app/contact/page.tsx`

**Two changes to this file. Read the full file before editing.**

---

**Change 1: Add hero CTA button row.**

Find this exact block (the hero body-text FadeIn and the closing divs):

```tsx
            <FadeIn delay={0.1}>
              <p className="text-body-lg text-silver max-w-2xl">
                Three ways to reach us. Pick the one that matches what you
                need; we&apos;ll route from there.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>
```

Replace with:

```tsx
            <FadeIn delay={0.1}>
              <p className="text-body-lg text-silver max-w-2xl">
                Three ways to reach us. Pick the one that matches what you
                need; we&apos;ll route from there.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link
                  href="#form"
                  className={buttonStyles({ variant: "primary", size: "lg" })}
                >
                  Send a message
                </Link>
                <Link
                  href="/audit"
                  className={buttonStyles({ variant: "ghost", size: "lg" })}
                >
                  Start AI Visibility Audit
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
```

---

**Change 2: Fix "Open calendar" channel card label.**

Find this exact block in the `channels` const:

```tsx
  {
    icon: Calendar,
    title: "Book a strategy call",
    body: "30-minute call with a Wiele principal. Best for active engagements or sizing fit.",
    cta: { label: "Open calendar", href: "/contact#form", external: false },
  },
```

Replace with:

```tsx
  {
    icon: Calendar,
    title: "Book a strategy call",
    body: "30-minute call with a Wiele principal. Best for active engagements or sizing fit.",
    cta: { label: "Send a message →", href: "/contact#form", external: false },
  },
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
grep -r "£\|GBP" src/app/contact/page.tsx
# Expected: no matches

# A3 — Hero CTA present ("Send a message" → #form)
grep 'href="#form"' src/app/contact/page.tsx
# Expected: at least one match (hero CTA)

# A4 — Hero ghost CTA present (/audit)
grep 'href="/audit"' src/app/contact/page.tsx
# Expected: at least one match

# A5 — "Open calendar" label removed
grep '"Open calendar"' src/app/contact/page.tsx
# Expected: no matches

# A6 — "Send a message →" label present
grep '"Send a message →"' src/app/contact/page.tsx
# Expected: one match (the channel card)

# A7 — No duplicate imports
grep -c 'from "next/link"' src/app/contact/page.tsx
# Expected: 1
grep -c 'from "@/components/ui/button"' src/app/contact/page.tsx
# Expected: 1
```

All 7 checks must pass. Any failure = hard stop.

---

## §6 POST-DEPLOY VERIFICATION

```bash
# V1 — /contact renders "Send a message" in HTML
curl -s -A "Mozilla/5.0" https://wielegroup.com/contact | grep -i "Send a message"
# Expected: at least one match

# V2 — "Open calendar" no longer in HTML
curl -s -A "Mozilla/5.0" https://wielegroup.com/contact | grep -i "Open calendar"
# Expected: no matches

# V3 — No regressions
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/contact
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/audit
# Expected: both 200
```

---

## §7 COMMIT + DEPLOY SEQUENCE

```bash
# 1. Stage one file
git add src/app/contact/page.tsx

# 2. Verify diff
git diff --cached --stat
# Expected: 1 file changed

# 3. Commit
git commit -m "feat(conversion): Phase 3 Step 3 — contact hero CTA, fix 'Open calendar' copy"

# 4. Tag
git tag phase3-step3-contact-cta-copy-2026-05-26

# 5. Push
git push origin main --tags

# 6. Deploy
npm run deploy:cf

# 7. Run §6 verification commands

# 8. IndexNow — 1 updated page
bash scripts/notify-indexnow.sh
```

---

## §8 REPORT FORMAT

```
Status: PASS / FAIL
Worker: [worker ID]
Commit: [short SHA]
Tag: phase3-step3-contact-cta-copy-2026-05-26
Build: Passed / Failed — [page count]
A3 hero CTA (#form): present / missing
A4 hero ghost CTA (/audit): present / missing
A5 "Open calendar" removed: yes / no
A6 "Send a message →" label present: yes / no
A7 no duplicate imports: yes / no
V1 /contact "Send a message": found / missing
V2 /contact "Open calendar": gone / still present
V3 all pages 200: yes / no
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
