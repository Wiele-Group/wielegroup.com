# Phase 3 Step 2 — Audit and Pricing Hero CTAs + FAQ Inline Links
**Directive version:** phase3-step2-audit-pricing-cta-2026-05-26  
**Prepared by:** Claude Cowork  
**Date:** 2026-05-26  
**Scope:** Two files. Three edits total. No new pages. No sitemap changes. No MDX. No changes to `gen-static-route-lastmod.mjs`.

---

## §0 AUDIT FINDINGS (read before editing)

The Phase 3 Step 2 audit identified three gaps on the two primary money-path pages:

**Gap 1 — `/audit` hero has no CTA button.**  
The hero renders Badge + H1 + body text + trust meta row (14 days / Engine + defense report / Defense baseline). There is no button or anchor linking visitors to `#audit-form`. A visitor who lands on the page and reads the hero must scroll blind to find the form. Fix: add a two-button CTA row after the trust meta FadeIn block, before the closing `</div>` of the hero left column. Primary: "Start AI Visibility Audit" → `#audit-form`. Ghost: "Book Strategy Call" → `/contact`.

**Gap 2 — `/pricing` hero has no CTA button.**  
The hero renders Badge + H1 + body text only. No path to action above the fold. Fix: add a two-button CTA row after the body-text FadeIn block. Primary: "Start AI Visibility Audit" → `/audit`. Ghost: "Book Strategy Call" → `/contact`.

**Gap 3 — `/pricing` FAQ `audit-required` and `custom-scope` answers have no inline links.**  
`audit-required` says "€2,500 one-off, 14 days" but is not linked to `/audit`. `custom-scope` says "talk to us" but is not linked to `/contact`. The `Accordion` component accepts `answer: ReactNode` so JSX links are valid. The `faqSchema` call uses the original `pricingFaq` string answers — keep that array unchanged. Fix: define a `pricingFaqAccordion` derived array with two answers overridden to JSX, pass that to `<Accordion>` instead.

No broken routes. All EUR. No GBP.

---

## §0 PRE-FLIGHT — HARD STOP IF ANY FAILS

```bash
# 1. Clean working tree
git status
# Expected: nothing to commit, working tree clean

# 2. On main
git branch --show-current
# Expected: main

# 3. Confirm /audit is live
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/audit
# Expected: 200

# 4. Confirm /pricing is live
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/pricing
# Expected: 200

# 5. Confirm /contact is live
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/contact
# Expected: 200
```

---

## §3 PRE-READS — READ BEFORE EDITING

| # | File | Purpose |
|---|---|---|
| 3a | `src/app/audit/page.tsx` | Read in full — locate the `<FadeIn delay={0.15}>` trust meta block and its closing `</div>` (hero left column) |
| 3b | `src/app/pricing/page.tsx` | Read in full — locate the `<FadeIn delay={0.1}>` body-text block, the `pricingFaq` const, and `<Accordion items={pricingFaq} />` |
| 3c | `src/components/ui/button.tsx` | Confirm `buttonStyles` export and its import path — use the same path as in `src/app/citation-score/page.tsx` |

---

## §4 FILE EDITS — VERBATIM

### §4a EDIT — `src/app/audit/page.tsx`

**Two changes to this file. Read the full file before editing.**

---

**Change 1: Add imports.**

Find the existing import block. Add these two lines immediately after the last existing import:

```tsx
import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
```

Verify `buttonStyles` import path against `src/app/citation-score/page.tsx` before committing.

---

**Change 2: Add hero CTA button row.**

Find this exact block (the trust meta FadeIn and its closing `</div>`):

```tsx
              <FadeIn delay={0.15}>
                <div className="flex items-center gap-5 text-body-sm text-cloud">
                  <span className="flex items-center gap-2">
                    <Clock size={15} className="text-electric" aria-hidden />
                    14 days
                  </span>
                  <span className="flex items-center gap-2">
                    <FileText size={15} className="text-electric" aria-hidden />
                    Engine + defense report
                  </span>
                  <span className="flex items-center gap-2">
                    <Shield size={15} className="text-electric" aria-hidden />
                    Defense baseline
                  </span>
                </div>
              </FadeIn>
            </div>
```

Replace with:

```tsx
              <FadeIn delay={0.15}>
                <div className="flex items-center gap-5 text-body-sm text-cloud">
                  <span className="flex items-center gap-2">
                    <Clock size={15} className="text-electric" aria-hidden />
                    14 days
                  </span>
                  <span className="flex items-center gap-2">
                    <FileText size={15} className="text-electric" aria-hidden />
                    Engine + defense report
                  </span>
                  <span className="flex items-center gap-2">
                    <Shield size={15} className="text-electric" aria-hidden />
                    Defense baseline
                  </span>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <Link
                    href="#audit-form"
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
                </div>
              </FadeIn>
            </div>
```

**No other changes to this file.**

---

### §4b EDIT — `src/app/pricing/page.tsx`

**Three changes to this file. Read the full file before editing.**

---

**Change 1: Add imports.**

Find the existing import block. Add these two lines immediately after the last existing import:

```tsx
import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
```

Same `buttonStyles` path as §4a. Verify against `src/app/citation-score/page.tsx`.

---

**Change 2: Add hero CTA button row.**

Find this exact block (the hero body-text FadeIn and the closing divs of the hero section):

```tsx
            <FadeIn delay={0.1}>
              <p className="text-body-lg text-silver max-w-2xl">
                Every Wiele tier includes AI Visibility Defense — prompt-injection
                surface monitoring, AI crawler posture management, and
                competitor displacement counter-engineering. Defend your
                authority. Compound your revenue.
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
                Every Wiele tier includes AI Visibility Defense — prompt-injection
                surface monitoring, AI crawler posture management, and
                competitor displacement counter-engineering. Defend your
                authority. Compound your revenue.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
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
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
```

---

**Change 3: Add `pricingFaqAccordion` and update `<Accordion>`.**

Find this exact line (the closing brace of the `pricingFaq` array):

```tsx
  {
    id: "vat",
    question: "Are prices inclusive of VAT?",
    answer:
      "Prices listed exclude VAT. UK clients pay 20% VAT on top. Non-UK clients are invoiced under reverse-charge / zero-rate rules where applicable.",
  },
];
```

Replace with:

```tsx
  {
    id: "vat",
    question: "Are prices inclusive of VAT?",
    answer:
      "Prices listed exclude VAT. UK clients pay 20% VAT on top. Non-UK clients are invoiced under reverse-charge / zero-rate rules where applicable.",
  },
];

const pricingFaqAccordion = pricingFaq.map((item) => ({
  ...item,
  answer:
    item.id === "audit-required" ? (
      <>
        We recommend it for every engagement.{" "}
        <Link
          href="/audit"
          className="text-electric underline-offset-4 hover:underline"
        >
          €2,500 one-off, 14 days
        </Link>
        , credited against month one if you continue with a Growth System or above.
      </>
    ) : item.id === "custom-scope" ? (
      <>
        Wiele OS and Sovereign are scoped to outcome by default. Growth System and
        Authority Engine can be scoped against specific outcomes —{" "}
        <Link
          href="/contact"
          className="text-electric underline-offset-4 hover:underline"
        >
          talk to us
        </Link>{" "}
        about what you&apos;re trying to achieve.
      </>
    ) : item.answer,
}));
```

Then find the Accordion JSX call:

```tsx
          <Accordion items={pricingFaq} />
```

Replace with:

```tsx
          <Accordion items={pricingFaqAccordion} />
```

**Note:** `pricingFaq` is unchanged and still passed to `faqSchema()` for JSON-LD schema generation — do NOT change that call. Only the `<Accordion>` call changes.

**Note:** `pricingFaqAccordion` is defined at module level (outside the component function), alongside `pricingFaq`. This is correct for a Server Component.

**No other changes to this file.**

---

## §5 ACCEPTANCE CRITERIA — ALL MUST PASS BEFORE DEPLOY

```bash
# A1 — Build passes
npm run build
# Expected: exit 0
# Expected: static page count = 54 (no regression, no new pages)

# A2 — No GBP/£ introduced
grep -r "£\|GBP" src/app/audit/page.tsx src/app/pricing/page.tsx
# Expected: no matches

# A3 — Audit hero CTA present (href="#audit-form")
grep 'href="#audit-form"' src/app/audit/page.tsx
# Expected: at least one match

# A4 — Audit hero "Book Strategy Call" present
grep 'href="/contact"' src/app/audit/page.tsx
# Expected: at least one match

# A5 — Pricing hero CTA present (href="/audit")
grep 'href="/audit"' src/app/pricing/page.tsx
# Expected: at least one match (hero CTA — not inside pricingFaqAccordion)

# A6 — Pricing hero "Book Strategy Call" present
grep 'href="/contact"' src/app/pricing/page.tsx
# Expected: at least one match

# A7 — pricingFaqAccordion defined
grep "pricingFaqAccordion" src/app/pricing/page.tsx
# Expected: at least two matches (definition + Accordion usage)

# A8 — Accordion uses pricingFaqAccordion not pricingFaq
grep 'Accordion items={pricingFaqAccordion}' src/app/pricing/page.tsx
# Expected: one match

# A9 — pricingFaq still passed to faqSchema (schema not broken)
grep 'faqSchema(pricingFaq' src/app/pricing/page.tsx
# Expected: one match

# A10 — No duplicate export or pricingFaq array
grep -c "^const pricingFaq " src/app/pricing/page.tsx
# Expected: 1
```

All 10 checks must pass. Any failure = hard stop.

---

## §6 POST-DEPLOY VERIFICATION

```bash
# V1 — /audit contains "Start AI Visibility Audit" link text
curl -s -A "Mozilla/5.0" https://wielegroup.com/audit | grep -i "Start AI Visibility Audit"
# Expected: at least one match

# V2 — /audit contains "Book Strategy Call" link text
curl -s -A "Mozilla/5.0" https://wielegroup.com/audit | grep -i "Book Strategy Call"
# Expected: at least one match

# V3 — /pricing contains "Start AI Visibility Audit" link text
curl -s -A "Mozilla/5.0" https://wielegroup.com/pricing | grep -i "Start AI Visibility Audit"
# Expected: at least one match

# V4 — /pricing contains "Book Strategy Call" link text
curl -s -A "Mozilla/5.0" https://wielegroup.com/pricing | grep -i "Book Strategy Call"
# Expected: at least one match

# V5 — No regressions
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/audit
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/pricing
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/contact
# Expected: all 200
```

---

## §7 COMMIT + DEPLOY SEQUENCE

```bash
# 1. Stage exactly two files
git add \
  src/app/audit/page.tsx \
  src/app/pricing/page.tsx

# 2. Verify diff — review before committing
git diff --cached --stat
# Expected: 2 files changed

# 3. Commit
git commit -m "feat(conversion): Phase 3 Step 2 — audit + pricing hero CTAs, pricing FAQ inline links"

# 4. Tag
git tag phase3-step2-audit-pricing-cta-2026-05-26

# 5. Push
git push origin main --tags

# 6. Deploy
npm run deploy:cf

# 7. Run §6 verification commands

# 8. IndexNow — 2 updated pages, no new URLs
bash scripts/notify-indexnow.sh
```

---

## §8 REPORT FORMAT

```
Status: PASS / FAIL
Worker: [worker ID]
Commit: [short SHA]
Tag: phase3-step2-audit-pricing-cta-2026-05-26
Build: Passed / Failed — [page count]
A3 audit hero CTA (#audit-form): present / missing
A4 audit hero "Book Strategy Call": present / missing
A5 pricing hero CTA (/audit): present / missing
A6 pricing hero "Book Strategy Call": present / missing
A7 pricingFaqAccordion defined: yes / no
A8 Accordion uses pricingFaqAccordion: yes / no
A9 faqSchema still uses pricingFaq: yes / no
A10 pricingFaq not duplicated: yes / no
V1 /audit "Start AI Visibility Audit": found / missing
V2 /audit "Book Strategy Call": found / missing
V3 /pricing "Start AI Visibility Audit": found / missing
V4 /pricing "Book Strategy Call": found / missing
V5 all pages 200: yes / no
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
