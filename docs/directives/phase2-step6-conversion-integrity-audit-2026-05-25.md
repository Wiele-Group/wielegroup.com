# Phase 2 · Step 6 — Conversion Integrity Audit + Mesh Repair
**Directive version:** phase2-step6-conversion-integrity-audit  
**Date:** 2026-05-25  
**Authored by:** Cowork (Claude Sonnet 4.6)  
**Status:** READY FOR CLAUDE CODE — read §0 pre-flight, audit §3, then fix §4  
**Previous tag:** `phase2-step5-for-brands-icp-2026-05-25`

---

## §0 · Pre-flight (run every item; abort if any fails)

```bash
cd "/Users/jonathanlandman/Documents/Claude/Projects/Wiele Group Operations/wielegroup.com"

# 1. Clean working tree
git status --short
# Expected: empty

# 2. On main
git branch --show-current
# Expected: main

# 3. Previous tag present
git tag --sort=-creatordate | head -1
# Expected: phase2-step5-for-brands-icp-2026-05-25

# 4. Node + wrangler
node -v && ls node_modules/.bin/wrangler && echo wrangler:ok

# 5. All 7 commercial pages live
for path in /for-brands /for-agencies /audit /pricing \
  /services/ai-visibility-monitoring \
  /services/premium-brand-site-system \
  /citation-brief/stage-1-entity-resolution; do
  status=$(curl -sI "https://wielegroup.com${path}" | awk '/^HTTP/{print $2}')
  echo "$path → $status"
done
# Expected: all 200
```

Hard stop if any check fails — report the failure before proceeding.

---

## §1 · Mission

Two-phase execution:

**Phase A — Production audit.** Run all checks in §3 against live production.
Record PASS / FAIL / GAP for every item. Do NOT edit files during Phase A.

**Phase B — Mesh repair.** Fix the four confirmed gaps listed in §4 (pre-read
from source files by Cowork before authoring this directive). Run build +
verification + deploy. Report in §8 format.

The commercial funnel is now:

```
/for-brands ──────────┐
/for-agencies ────────┤
                       ▼
/audit ─────────────► /services/ai-visibility-monitoring
                    ► /services/premium-brand-site-system
                    ► /citation-brief/stage-1-entity-resolution
                    ► /pricing
```

Every page in the funnel must:
1. Resolve 200 on production
2. Carry the correct schema types
3. Link to the correct CTA destinations (/audit primary, /contact secondary)
4. Contain zero £ or GBP
5. Be present in sitemap.xml
6. Be in the footer (for ICP pages) or reachable via footer navigation
7. Cross-link correctly to the pages adjacent to it in the funnel

---

## §2 · Hard constraints (binding)

| # | Law | Applied here |
|---|---|---|
| 1 | Recon-First | Read every file you will modify before editing |
| 2 | No-GBP | Zero £ or GBP in user-facing copy — EUR / € only |
| 3 | Live-or-Nothing | `curl -A 'Mozilla/5.0'` after every deploy |
| 4 | Shipped-vs-Drafted | "Shipped" = LIVE on wielegroup.com |
| 5 | No-Bombardment | Report at completion — §8 format only |

---

## §3 · Phase A — Production audit (run in order; record all results)

### A1. Route resolution

```bash
for path in /for-brands /for-agencies /audit /pricing \
  /services/ai-visibility-monitoring \
  /services/premium-brand-site-system \
  /citation-brief/stage-1-entity-resolution; do
  status=$(curl -sI "https://wielegroup.com${path}" | awk '/^HTTP/{print $2}')
  echo "$path → $status"
done
# Expected: all 200
```

### A2. Schema completeness per page

```bash
# /for-brands — expected: BreadcrumbList + Service + FAQPage
curl -s -A 'Mozilla/5.0' https://wielegroup.com/for-brands \
  | grep -oE '"@type"\s*:\s*"(BreadcrumbList|Service|FAQPage)"' | sort | uniq

# /for-agencies — expected: BreadcrumbList + Service + FAQPage
curl -s -A 'Mozilla/5.0' https://wielegroup.com/for-agencies \
  | grep -oE '"@type"\s*:\s*"(BreadcrumbList|Service|FAQPage)"' | sort | uniq

# /services/ai-visibility-monitoring — expected: BreadcrumbList + Service + FAQPage
curl -s -A 'Mozilla/5.0' https://wielegroup.com/services/ai-visibility-monitoring \
  | grep -oE '"@type"\s*:\s*"(BreadcrumbList|Service|FAQPage)"' | sort | uniq

# /services/premium-brand-site-system — expected: BreadcrumbList + Service + FAQPage
curl -s -A 'Mozilla/5.0' https://wielegroup.com/services/premium-brand-site-system \
  | grep -oE '"@type"\s*:\s*"(BreadcrumbList|Service|FAQPage)"' | sort | uniq

# /citation-brief/stage-1-entity-resolution — expected: BreadcrumbList + Article + FAQPage + Person
curl -s -A 'Mozilla/5.0' https://wielegroup.com/citation-brief/stage-1-entity-resolution \
  | grep -oE '"@type"\s*:\s*"(BreadcrumbList|Article|FAQPage|Person)"' | sort | uniq

# /audit — expected: BreadcrumbList (+ any service/FAQ present)
curl -s -A 'Mozilla/5.0' https://wielegroup.com/audit \
  | grep -oE '"@type"\s*:\s*"[A-Za-z]+"' | sort | uniq

# /pricing — expected: BreadcrumbList (+ any offer/FAQ present)
curl -s -A 'Mozilla/5.0' https://wielegroup.com/pricing \
  | grep -oE '"@type"\s*:\s*"[A-Za-z]+"' | sort | uniq
```

### A3. CTA href consistency

```bash
# /for-brands — primary: /audit, secondary: /contact
curl -s -A 'Mozilla/5.0' https://wielegroup.com/for-brands \
  | grep -oE 'href="(/audit|/contact)"' | sort | uniq -c

# /for-agencies — primary: /contact, secondary: /audit
curl -s -A 'Mozilla/5.0' https://wielegroup.com/for-agencies \
  | grep -oE 'href="(/audit|/contact)"' | sort | uniq -c

# AVM — primary: /audit, secondary: /contact
curl -s -A 'Mozilla/5.0' https://wielegroup.com/services/ai-visibility-monitoring \
  | grep -oE 'href="(/audit|/contact)"' | sort | uniq -c

# PBSS — primary: /contact (intent param), secondary: #tiers anchor — check
curl -s -A 'Mozilla/5.0' https://wielegroup.com/services/premium-brand-site-system \
  | grep -oE 'href="(/audit|/contact[^"]*)"' | sort | uniq -c
```

### A4. Internal link mesh — /for-brands

```bash
curl -s -A 'Mozilla/5.0' https://wielegroup.com/for-brands \
  | grep -oE 'href="(/audit|/contact|/services/ai-visibility-monitoring|/services/premium-brand-site-system|/citation-brief/stage-1-entity-resolution|/pricing)"' \
  | sort | uniq
# Expected: all 6 destinations present
```

### A5. Internal link mesh — /for-agencies

```bash
curl -s -A 'Mozilla/5.0' https://wielegroup.com/for-agencies \
  | grep -oE 'href="(/audit|/contact|/services/ai-visibility-monitoring|/services/premium-brand-site-system|/citation-brief/stage-1-entity-resolution|/pricing)"' \
  | sort | uniq
# Expected: all 6 destinations present
```

### A6. Internal link mesh — AVM

```bash
curl -s -A 'Mozilla/5.0' https://wielegroup.com/services/ai-visibility-monitoring \
  | grep -oE 'href="(/audit|/contact|/for-agencies|/for-brands|/services/premium-brand-site-system|/citation-brief/stage-1-entity-resolution|/pricing)"' \
  | sort | uniq
# GAP EXPECTED: /for-brands missing (fix in §4)
```

### A7. Internal link mesh — PBSS

```bash
curl -s -A 'Mozilla/5.0' https://wielegroup.com/services/premium-brand-site-system \
  | grep -oE 'href="(/audit|/contact|/for-agencies|/for-brands|/services/ai-visibility-monitoring|/citation-brief/stage-1-entity-resolution|/pricing)"' \
  | sort | uniq
# GAP EXPECTED: /for-brands and /for-agencies missing (fix in §4)
```

### A8. Reverse mesh — who links to /for-brands?

```bash
# Check homepage, for-agencies, AVM, PBSS, CB#006
for src in "" /for-agencies /services/ai-visibility-monitoring \
  /services/premium-brand-site-system \
  /citation-brief/stage-1-entity-resolution; do
  count=$(curl -s -A 'Mozilla/5.0' "https://wielegroup.com${src}" \
    | grep -c 'href="/for-brands"')
  echo "wielegroup.com${src} → /for-brands count: $count"
done
# Record counts — baseline for post-fix verification
```

### A9. Sitemap coverage

```bash
# All 7 commercial pages must appear
SITEMAP=$(curl -s https://wielegroup.com/sitemap.xml)
for path in /for-brands /for-agencies /audit /pricing \
  /services/ai-visibility-monitoring \
  /services/premium-brand-site-system \
  /citation-brief/stage-1-entity-resolution; do
  count=$(echo "$SITEMAP" | grep -c "$path")
  echo "sitemap: $path → $count"
done
# GAP EXPECTED: /citation-brief/stage-1-entity-resolution count = 0 (fix in §4)
```

### A10. Footer coverage

```bash
HOME=$(curl -s -A 'Mozilla/5.0' https://wielegroup.com/)
for path in /for-brands /for-agencies /audit /citation-brief; do
  count=$(echo "$HOME" | grep -c "href=\"${path}\"")
  echo "footer: $path → $count"
done
# Expected: /for-brands ≥1, /for-agencies ≥1, /audit ≥1, /citation-brief ≥1
```

### A11. No GBP across all 7 source files

```bash
grep -rn "£\|GBP" \
  src/app/for-brands/page.tsx \
  src/app/for-agencies/page.tsx \
  src/data/services.ts \
  public/llms.txt
# Expected: 0 matches
```

### A12. llms.txt individual brief entries

```bash
grep "stage-1-entity-resolution" public/llms.txt
# GAP EXPECTED: likely 0 matches (index page covers it; see §4 for fix decision)
```

---

## §4 · Phase B — Mesh repair (four confirmed gaps; fix in one commit)

Pre-read every file listed below before editing.

### 4a. `src/app/sitemap.ts` — add CB #006 to STATIC_ROUTES

**CRITICAL.** CB #006 (`/citation-brief/stage-1-entity-resolution`) shipped in
Phase 2 Step 4 but was NOT added to STATIC_ROUTES. This means it has no
sitemap entry and no per-route lastmod signal.

After the `/citation-brief/brand-semantics-infrastructure` block, add:

```typescript
  /* Phase 2 Step 4 (2026-05-25) — Citation Brief #006.
     Stage 1 Entity Resolution deep-dive. Core AEO methodology anchor.
     Cross-linked from /for-agencies, /for-brands, AVM, and PBSS.
     NOTE: STATIC_ROUTES is hand-maintained (not auto-derived from
     getAllBriefSlugs) — each brief requires a manual entry here. */
  {
    path: "/citation-brief/stage-1-entity-resolution",
    priority: 0.85,
    changeFrequency: "monthly" as const,
  },
```

### 4b. `src/data/services.ts` — add /for-brands to AVM internalLinks

After the `/for-agencies` internalLinks entry in `aiVisibilityMonitoring`,
insert:

```typescript
    {
      label: "For Premium Brands",
      description: "AI search visibility engineered for brands that need to appear in AI-generated answers — entity trust, citation architecture, and monthly monitoring.",
      href: "/for-brands",
    },
```

The AVM `internalLinks` array after the fix should be ordered:
`/audit` → `/for-agencies` → `/for-brands` → `/pricing` → PBSS → CB #006

### 4c. `src/data/services.ts` — add /for-brands and /for-agencies to PBSS internalLinks

The PBSS `internalLinks` array currently has: /audit, AVM, /web-design-agency,
/pricing, CB#006. It is missing both ICP pages.

Insert after the `/audit` entry:

```typescript
    {
      label: "For Premium Brands",
      description: "How Wiele engineers AI visibility for premium brands directly — entity trust, citation architecture, answer-engine monitoring. The Foundation Build installs the technical substrate this page describes.",
      href: "/for-brands",
    },
    {
      label: "For AEO & GEO Agencies",
      description: "How Wiele Group works as a capability layer for agencies. The Premium Brand Site System is the flagship build SKU within the agency delivery stack.",
      href: "/for-agencies",
    },
```

The PBSS `internalLinks` array after the fix should be ordered:
`/audit` → `/for-brands` → `/for-agencies` → AVM → `/web-design-agency` → `/pricing` → CB#006

### 4d. `public/llms.txt` — add CB #006 entry

After the `/for-brands` line in the Key pages section, add:

```
- https://wielegroup.com/citation-brief/stage-1-entity-resolution — Citation Brief #006: Stage 1 Entity Resolution — how AI engines learn which brands to trust, the schema/Wikidata/authority engineering sprint, Five-Stage Citation Hierarchy gate
```

---

## §5 · Acceptance criteria (every item must pass before deploy)

- [ ] `src/app/sitemap.ts` contains `/citation-brief/stage-1-entity-resolution` in STATIC_ROUTES
- [ ] `src/data/services.ts` AVM internalLinks contains `/for-brands`
- [ ] `src/data/services.ts` PBSS internalLinks contains `/for-brands` and `/for-agencies`
- [ ] `public/llms.txt` contains `stage-1-entity-resolution`
- [ ] `npm run build:cf` passes — check static page count is stable (≥51)
- [ ] `npx tsc --noEmit` clean
- [ ] Zero `£` or `GBP` in any edited file

---

## §6 · Verification commands (run after deploy)

```bash
# 1. Build passes
npm run build:cf 2>&1 | tail -20
# Expected: ✓ Compiled successfully, no errors, ≥51 static pages

# 2. TypeScript clean
npx tsc --noEmit 2>&1 | head -20
# Expected: no output

# 3. ESLint on edited files
npx eslint src/data/services.ts 2>&1 | head -10
# Expected: no errors

# 4. CB #006 now in sitemap
curl -s https://wielegroup.com/sitemap.xml | grep "stage-1-entity-resolution"
# Expected: 1 match with loc URL

# 5. AVM now links to /for-brands
curl -s -A 'Mozilla/5.0' https://wielegroup.com/services/ai-visibility-monitoring \
  | grep 'href="/for-brands"'
# Expected: ≥1 match

# 6. PBSS now links to /for-brands
curl -s -A 'Mozilla/5.0' https://wielegroup.com/services/premium-brand-site-system \
  | grep 'href="/for-brands"'
# Expected: ≥1 match

# 7. PBSS now links to /for-agencies
curl -s -A 'Mozilla/5.0' https://wielegroup.com/services/premium-brand-site-system \
  | grep 'href="/for-agencies"'
# Expected: ≥1 match

# 8. llms.txt updated
grep "stage-1-entity-resolution" public/llms.txt
# Expected: 1 match

# 9. CB #006 still 200
curl -sI https://wielegroup.com/citation-brief/stage-1-entity-resolution | head -3
# Expected: HTTP/2 200

# 10. IndexNow
bash scripts/notify-indexnow.sh
# Expected: HTTP 200
```

---

## §7 · Commit + tag + deploy

```bash
# Regen lastmod (sitemap STATIC_ROUTES changed)
node scripts/gen-static-route-lastmod.mjs

# Commit
git add -A
git commit -m "fix(mesh): Phase 2 Step 6 — CB#006 sitemap, /for-brands in AVM+PBSS internalLinks, llms.txt"

# Tag
git tag phase2-step6-mesh-repair-2026-05-25

# Push
git push origin main --tags

# Deploy
npx wrangler deploy

# IndexNow
bash scripts/notify-indexnow.sh
```

---

## §8 · Report format

```
Status: SHIPPED / FAIL
Worker version:
Tag:
Commit:

Phase A audit results:
  A1.  Route resolution (all 7) — PASS / FAIL
  A2.  Schema completeness — PASS / FAIL / PARTIAL (list any missing types)
  A3.  CTA hrefs — PASS / FAIL
  A4.  /for-brands internal links (6) — PASS / FAIL
  A5.  /for-agencies internal links (6) — PASS / FAIL
  A6.  AVM internal links — GAP confirmed / PASS
  A7.  PBSS internal links — GAP confirmed / PASS
  A8.  Reverse mesh to /for-brands (counts per page)
  A9.  Sitemap coverage — GAP confirmed on CB#006 / PASS
  A10. Footer coverage — PASS / FAIL
  A11. No GBP — PASS / FAIL
  A12. llms.txt CB#006 — GAP confirmed / already present

Phase B gate results:
  1. Build — PASS / FAIL
  2. TypeScript — PASS / FAIL
  3. ESLint — PASS / FAIL
  4. CB#006 in sitemap — PASS / FAIL
  5. AVM → /for-brands — PASS / FAIL
  6. PBSS → /for-brands — PASS / FAIL
  7. PBSS → /for-agencies — PASS / FAIL
  8. llms.txt updated — PASS / FAIL
  9. CB#006 still 200 — PASS / FAIL
  10. IndexNow — PASS / FAIL

Unexpected findings (any Phase A results that deviated from expectations):
Issues:
Next action:
```

---

## §9 · Risks

| Risk | Severity | Mitigation |
|---|---|---|
| CB #006 sitemap entry missing causes IndexNow miss | MEDIUM — already submitted in Step 4; sitemap fix closes the gap | Add to STATIC_ROUTES; resubmit IndexNow after deploy |
| `gen-static-route-lastmod.mjs` must run BEFORE commit when sitemap changes | LOW — known pattern from v3.9.0 | Directive §7 runs gen before git add |
| AVM / PBSS `internalLinks` are rendered server-side — changes appear in HTML source immediately after deploy | LOW — no static import issues | Standard Next.js data file pattern |
| PBSS primary CTA uses `/contact?intent=premium-brand-site-system` — not a plain `/contact` — this is intentional; do NOT change it | LOW | Confirm in Phase A audit; document in report |

---

## Phase 2 progress after Step 6

| Step | Scope | Status |
|---|---|---|
| Phase 1 | EUR, CTAs, claim safety, trust strip | ✅ Shipped |
| Step 1 | /for-agencies ICP page | ✅ Shipped |
| Step 2 | AVM deep-dive | ✅ Shipped |
| Step 3 | PBSS deep-dive | ✅ Shipped |
| Step 4 | Citation Brief #006 — Entity Resolution | ✅ Shipped |
| Step 5 | /for-brands ICP page | ✅ Shipped |
| **Step 6** | **Conversion integrity audit + mesh repair** | **← this directive** |
| Step 7 (candidate) | Citation Brief #007 — Stage 2 Source Authority | TBD |
| Step 8 (candidate) | Primary nav surfacing of /for-brands + /for-agencies | TBD |
