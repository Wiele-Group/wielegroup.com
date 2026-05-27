# Phase 3 Step 1 — Conversion QA: Offer-Path and Internal Link Mesh
**Directive version:** phase3-step1-conversion-qa-2026-05-26  
**Prepared by:** Claude Cowork  
**Date:** 2026-05-26  
**Scope:** Four targeted copy/data edits that close the conversion gaps identified in the Phase 3 Step 1 audit. No new pages. No sitemap changes. No MDX. No changes to `gen-static-route-lastmod.mjs`.

---

## §0 AUDIT FINDINGS (read before editing)

The Cowork audit identified four gaps:

**Gap 1 — `/citation-score` has no path to `/audit`.**  
The CTA block sends visitors to `/pricing#recurring-ai-visibility` (primary) and CB#001 (secondary). Someone who does not yet know their citation position has no entry point. Fix: add an inline audit link below the CTA block.

**Gap 2 — `src/data/services.ts` internalLinks only surface CB#006.**  
PBSS internalLinks references CB#006 (Entity Resolution). The correct deep-read for PBSS is CB#002 (Structured Extractability) — the Foundation Build installs the extractability layer. AVM internalLinks references CB#006. The correct deep-reads for AVM are CB#008 (Freshness — AVM monitors freshness signals monthly) and CB#009 (Recommendation History — AVM tracks the compounding loop). Fix: add one link each.

**Gap 3 — `/for-agencies` "Go deeper" card grid only surfaces CB#006.**  
The grid has: AVM · PBSS · CB#006 · Pricing. CB#006 is the foundation brief. CB#009 (Recommendation History) is the retainer argument — the most commercially relevant brief for agencies selling ongoing AEO/GEO engagements. CB#006 remains linked inline higher on the page. Fix: replace CB#006 card with CB#009 card.

**Gap 4 — `/for-brands` "Go deeper" card grid only surfaces CB#006.**  
Same grid structure. CB#009 (Recommendation History — compounding is the brand argument) is the stronger closer for brands making ongoing investment decisions. CB#006 remains linked inline higher on the page. Fix: replace CB#006 card with CB#009 card.

No broken routes found. All 54 static pages 200. All EUR. No GBP.

---

## §0 PRE-FLIGHT — HARD STOP IF ANY FAILS

```bash
# 1. Clean working tree
git status
# Expected: nothing to commit, working tree clean

# 2. On main
git branch --show-current
# Expected: main

# 3. Confirm CB#009 is live
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/citation-brief/stage-5-recommendation-history
# Expected: 200

# 4. Confirm CB#002 is live
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/citation-brief/stage-3-structured-extractability
# Expected: 200

# 5. Confirm CB#008 is live
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/citation-brief/stage-4-freshness
# Expected: 200
```

---

## §3 PRE-READS — READ BEFORE EDITING

| # | File | Purpose |
|---|---|---|
| 3a | `src/app/citation-score/page.tsx` | Read in full — locate the CTA `<div className="flex flex-col sm:flex-row gap-3">` block and the closing `</section>` that wraps it |
| 3b | `src/data/services.ts` | Read in full — locate `internalLinks` arrays for both `premiumBrandSiteSystem` and `aiVisibilityMonitoring` objects |
| 3c | `src/app/for-agencies/page.tsx` | Read the "Go deeper" section — locate the CB#006 card block |
| 3d | `src/app/for-brands/page.tsx` | Read the "Go deeper" section — locate the CB#006 card block |

---

## §4 FILE EDITS — VERBATIM

### §4a EDIT — `src/app/citation-score/page.tsx`

**One change. Read the full file before editing.**

Find this exact block (the closing of the CTA `<div>` inside the citation-score bottom section):

```tsx
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/pricing#recurring-ai-visibility"
                  className={buttonStyles({ variant: "primary", size: "lg" })}
                >
                  See Citation Score™ subscription
                </Link>
                <Link
                  href="/citation-brief/how-agencies-get-cited-in-ai-answers"
                  className={buttonStyles({ variant: "ghost", size: "lg" })}
                >
                  Read the Five-Stage Citation Hierarchy
                </Link>
              </div>
            </section>
```

Replace with:

```tsx
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/pricing#recurring-ai-visibility"
                  className={buttonStyles({ variant: "primary", size: "lg" })}
                >
                  See Citation Score™ subscription
                </Link>
                <Link
                  href="/citation-brief/how-agencies-get-cited-in-ai-answers"
                  className={buttonStyles({ variant: "ghost", size: "lg" })}
                >
                  Read the Five-Stage Citation Hierarchy
                </Link>
              </div>
              <p className="mt-5 text-body-sm text-silver">
                Not sure where you stand?{" "}
                <Link
                  href="/audit"
                  className="text-electric hover:text-electric-light underline-offset-4 hover:underline"
                >
                  Start with the Signal Audit →
                </Link>
              </p>
            </section>
```

**No other changes to this file.**

---

### §4b EDIT — `src/data/services.ts`

**Two changes to this file. Read the full file before editing.**

---

**Change 1: Add CB#002 to PBSS `internalLinks`.**

Find this exact block in the `premiumBrandSiteSystem` object `internalLinks` array:

```typescript
    {
      label: "Stage 1 — Entity Resolution",
      description:
        "The technical substrate of the Foundation Build installs the entity layer first: schema sameAs, structured identity signals, llms.txt, knowledge-graph footprint. Understand Stage 1 before scoping the build.",
      href: "/citation-brief/stage-1-entity-resolution",
    },
  ],
};
```

Replace with:

```typescript
    {
      label: "Stage 1 — Entity Resolution",
      description:
        "The technical substrate of the Foundation Build installs the entity layer first: schema sameAs, structured identity signals, llms.txt, knowledge-graph footprint. Understand Stage 1 before scoping the build.",
      href: "/citation-brief/stage-1-entity-resolution",
    },
    {
      label: "Stage 3 — Structured Extractability",
      description:
        "How AI engines decide whether your content is safe to quote. The Foundation Build engineers the extractability layer — schema markup, answer blocks, heading hierarchy, citation-ready prose. Understand Stage 3 to understand what the build delivers.",
      href: "/citation-brief/stage-3-structured-extractability",
    },
  ],
};
```

---

**Change 2: Add CB#008 to AVM `internalLinks`.**

Find this exact block in the `aiVisibilityMonitoring` object `internalLinks` array:

```typescript
    {
      label: "Stage 1 — Entity Resolution",
      description:
        "The foundation of AI citation — whether engines can unambiguously identify your brand as a distinct entity. AI Visibility Monitoring tracks the signals that confirm entity resolution landed and measures citation lift month over month.",
      href: "/citation-brief/stage-1-entity-resolution",
    },
  ],
};
```

Replace with:

```typescript
    {
      label: "Stage 1 — Entity Resolution",
      description:
        "The foundation of AI citation — whether engines can unambiguously identify your brand as a distinct entity. AI Visibility Monitoring tracks the signals that confirm entity resolution landed and measures citation lift month over month.",
      href: "/citation-brief/stage-1-entity-resolution",
    },
    {
      label: "Stage 4 — Freshness",
      description:
        "Why AI engines prefer maintained sources — the five freshness signals, the content decay curve, and the two-track maintenance cadence. AI Visibility Monitoring tracks freshness signals monthly and surfaces decay before it costs citation share.",
      href: "/citation-brief/stage-4-freshness",
    },
  ],
};

export const services: readonly Division[] = [premiumBrandSiteSystem, aiVisibilityMonitoring];
```

**Note:** Remove the existing `export const services` line that follows the original closing brace — the replacement above includes it. Do not duplicate it.

**No other changes to this file.**

---

### §4c EDIT — `src/app/for-agencies/page.tsx`

**One change. Read the file before editing.**

Find this exact card block in the "Go deeper" `sm:grid-cols-2` grid:

```tsx
            <Link
              href="/citation-brief/stage-1-entity-resolution"
              className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-5 hover:border-electric/40 transition-colors"
            >
              <h3 className="text-heading-sm text-white mb-1.5">Citation Brief #006 — Entity Resolution</h3>
              <p className="text-body-sm text-silver">How AI engines learn which brands to trust — the Stage 1 deep-dive and methodology behind the Citation Readiness System you deliver to clients.</p>
            </Link>
```

Replace with:

```tsx
            <Link
              href="/citation-brief/stage-5-recommendation-history"
              className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-5 hover:border-electric/40 transition-colors"
            >
              <h3 className="text-heading-sm text-white mb-1.5">Citation Brief #009 — Recommendation History</h3>
              <p className="text-body-sm text-silver">The compounding capstone of the Five-Stage Citation Hierarchy — why AI engines build recommendation loops, how the first-mover advantage works, and the retainer argument made concrete for your clients.</p>
            </Link>
```

**No other changes to this file.**

---

### §4d EDIT — `src/app/for-brands/page.tsx`

**One change. Read the file before editing.**

Find this exact card block in the "Go deeper" `sm:grid-cols-2` grid:

```tsx
            <Link
              href="/citation-brief/stage-1-entity-resolution"
              className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-5 hover:border-electric/40 transition-colors"
            >
              <h3 className="text-heading-sm text-white mb-1.5">Citation Brief #006 — Entity Resolution</h3>
              <p className="text-body-sm text-silver">How AI engines learn which brands to trust — the Stage 1 deep-dive.</p>
            </Link>
```

Replace with:

```tsx
            <Link
              href="/citation-brief/stage-5-recommendation-history"
              className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-5 hover:border-electric/40 transition-colors"
            >
              <h3 className="text-heading-sm text-white mb-1.5">Citation Brief #009 — Recommendation History</h3>
              <p className="text-body-sm text-silver">Why AI engines build compounding recommendation loops — and why the brands that land first keep compounding. The brief that makes the retainer argument concrete.</p>
            </Link>
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
grep -r "£\|GBP" src/app/citation-score/page.tsx src/data/services.ts src/app/for-agencies/page.tsx src/app/for-brands/page.tsx
# Expected: no matches

# A3 — Audit link present in citation-score
grep "href=\"/audit\"" src/app/citation-score/page.tsx
# Expected: at least one match

# A4 — CB#002 present in services.ts PBSS internalLinks
grep "stage-3-structured-extractability" src/data/services.ts
# Expected: one match

# A5 — CB#008 present in services.ts AVM internalLinks
grep "stage-4-freshness" src/data/services.ts
# Expected: one match

# A6 — CB#009 in for-agencies "Go deeper" grid
grep "stage-5-recommendation-history" src/app/for-agencies/page.tsx
# Expected: one match (the card href)

# A7 — CB#009 in for-brands "Go deeper" grid
grep "stage-5-recommendation-history" src/app/for-brands/page.tsx
# Expected: one match (the card href)

# A8 — CB#006 inline links still present on both pages (unchanged)
grep "stage-1-entity-resolution" src/app/for-agencies/page.tsx
# Expected: one match (inline link — card was replaced, inline remains)
grep "stage-1-entity-resolution" src/app/for-brands/page.tsx
# Expected: one match (inline link — card was replaced, inline remains)

# A9 — services.ts export not duplicated
grep -c "^export const services" src/data/services.ts
# Expected: 1
```

All 9 checks must pass. Any failure = hard stop.

---

## §6 POST-DEPLOY VERIFICATION

```bash
# V1 — /citation-score loads and contains "Signal Audit" link text
curl -s -A "Mozilla/5.0" https://wielegroup.com/citation-score | grep -i "Signal Audit"
# Expected: at least one match

# V2 — /for-agencies contains CB#009 reference
curl -s -A "Mozilla/5.0" https://wielegroup.com/for-agencies | grep -i "Recommendation History"
# Expected: at least one match

# V3 — /for-brands contains CB#009 reference
curl -s -A "Mozilla/5.0" https://wielegroup.com/for-brands | grep -i "Recommendation History"
# Expected: at least one match

# V4 — /services/premium-brand-site-system contains CB#002 reference
curl -s -A "Mozilla/5.0" https://wielegroup.com/services/premium-brand-site-system | grep -i "Extractability"
# Expected: at least one match

# V5 — /services/ai-visibility-monitoring contains CB#008 reference
curl -s -A "Mozilla/5.0" https://wielegroup.com/services/ai-visibility-monitoring | grep -i "Freshness"
# Expected: at least one match

# V6 — No regressions on key pages
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/for-agencies
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/for-brands
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/citation-score
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/services/ai-visibility-monitoring
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" https://wielegroup.com/services/premium-brand-site-system
# Expected: all 200
```

---

## §7 COMMIT + DEPLOY SEQUENCE

```bash
# 1. Stage exactly four files
git add \
  src/app/citation-score/page.tsx \
  src/data/services.ts \
  src/app/for-agencies/page.tsx \
  src/app/for-brands/page.tsx

# 2. Verify diff — review before committing
git diff --cached --stat
# Expected: 4 files changed

# 3. Commit
git commit -m "feat(conversion): Phase 3 Step 1 — citation-score audit CTA, CB#002/CB#008 service links, CB#009 ICP cards"

# 4. Tag
git tag phase3-step1-conversion-qa-2026-05-26

# 5. Push
git push origin main --tags

# 6. Deploy
npm run deploy:cf

# 7. Run §6 verification commands

# 8. IndexNow — pages changed but no new URLs; run notify-indexnow.sh to
#    signal freshness on the 4 updated pages
bash scripts/notify-indexnow.sh
```

---

## §8 REPORT FORMAT

```
Status: PASS / FAIL
Worker: [worker ID]
Commit: [short SHA]
Tag: phase3-step1-conversion-qa-2026-05-26
Build: Passed / Failed — [page count]
A3 audit link in citation-score: present / missing
A4 CB#002 in PBSS internalLinks: present / missing
A5 CB#008 in AVM internalLinks: present / missing
A6 CB#009 in for-agencies card: present / missing
A7 CB#009 in for-brands card: present / missing
A8 CB#006 inline links intact: yes / no
A9 services export not duplicated: yes / no
V1 citation-score "Signal Audit": found / missing
V2 for-agencies "Recommendation History": found / missing
V3 for-brands "Recommendation History": found / missing
V4 PBSS "Extractability": found / missing
V5 AVM "Freshness": found / missing
V6 all pages 200: yes / no
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
