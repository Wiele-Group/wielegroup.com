# v3.9.4 — AMENDMENT A — Citation Brief #003 + #004 Registration & Deploy

**Date:** 2026-05-14 (evening)
**Status:** APPROVED by founder (single-word "YES" against recommendation stack)
**Scope:** Adds Task 6 to v3.9.4 — register and deploy Citation Brief #003 (`aeo-is-the-2026-wcag`) and Citation Brief #004 (`two-tier-access-doctrine`) drafted in parallel by Cowork on 2026-05-14 evening.
**Pairs with:** `v3-9-4-cognitive-pre-flight-and-prototype-match-2026-05-14.md` (base directive — Tasks 1–5)
**Pattern precedent:** `v3-9-3-AMENDMENT-A-citation-score-approved-2026-05-14.md`

---

## Mission delta

The v3.9.4 base directive ships 5 tasks (predeploy guard, Cowan cap docs, Six Minds + Trunk Test gate, Citation Score™ §2 Prototype Match sub-metric, Stage 0 prerequisite). This amendment adds **Task 6** — register and deploy **two new Citation Briefs** drafted by Cowork in the same cycle:

- **Citation Brief #003** — *"AEO is the 2026 WCAG: The Accessibility Lineage of AI Citation"* — ~3,500 words, 10 H2 sections, MDX live at `src/content/citation-briefs/aeo-is-the-2026-wcag.mdx`.
- **Citation Brief #004** — *"The Two-Tier Access Doctrine: Why Pages That Load Still Fail in AI Answers"* — ~3,050 words, 9 H2 sections, MDX live at `src/content/citation-briefs/two-tier-access-doctrine.mdx`.

Both MDX files are written but will 404 until registered in the BRIEF_MANIFEST + static-import map. This amendment closes that gap.

---

## §0 Pre-flight additions (run before Task 6)

In addition to the v3.9.4 base §0 checks:

```bash
# Brief MDX files exist
test -f src/content/citation-briefs/aeo-is-the-2026-wcag.mdx
test -f src/content/citation-briefs/two-tier-access-doctrine.mdx

# Locate the BRIEF_MANIFEST (per Phase 7.4 MDX Static-Import Law)
grep -rn "BRIEF_MANIFEST\|BRIEF_COMPONENTS" src/lib/ src/app/citation-brief/

# Confirm existing brief slugs already in the manifest (sanity)
grep -E "how-agencies-get-cited-in-ai-answers|stage-3-structured-extractability" src/lib/citation-briefs-static.ts
```

All four checks must pass before Task 6 proceeds.

---

## §3 Founder gates (revised — Gate 3 from base directive now CLOSED)

The base directive's Gate 3 ("ship Briefs #003 + #004 in this cycle or hold until v3.9.5") is **resolved: ship in v3.9.4**. The remaining base directive gates (Gate 1 = Prototype Match rubric scale; Gate 2 = Stage 0 naming) stand.

---

## §4 — Task 6: Register and deploy Citation Brief #003 + #004

### Why
Cowork drafted both briefs in parallel on 2026-05-14 evening. The MDX files exist on disk but the brief loader uses static imports per the Phase 7.4 MDX Static-Import Law — dynamic imports are forbidden under OpenNext/Workers. Registration requires editing `BRIEF_MANIFEST` (front-matter + tags + reading time + OG image path) and the slug→Component static-import map in `src/app/citation-brief/[slug]/page.tsx`.

### Pre-reads
- `src/lib/citation-briefs-static.ts` — BRIEF_MANIFEST shape and existing entries for `how-agencies-get-cited-in-ai-answers` and `stage-3-structured-extractability`.
- `src/app/citation-brief/[slug]/page.tsx` — slug→Component static-import map and any generateStaticParams export.
- `src/content/citation-briefs/aeo-is-the-2026-wcag.mdx` — the new Brief #003 body.
- `src/content/citation-briefs/two-tier-access-doctrine.mdx` — the new Brief #004 body.

### Files to create / edit / delete
- **EDIT** `src/lib/citation-briefs-static.ts` — add two entries to BRIEF_MANIFEST:
  - Slug `aeo-is-the-2026-wcag`: title "AEO is the 2026 WCAG: The Accessibility Lineage of AI Citation", description (≤155 chars, entity-rich), datePublished 2026-05-14, dateModified 2026-05-14, category "Citation Brief", tags ["AEO","WCAG","accessibility","AI search","agency","citation"], readingTime ~14, ogImage placeholder per existing convention.
  - Slug `two-tier-access-doctrine`: title "The Two-Tier Access Doctrine: Why Pages That Load Still Fail in AI Answers", description (≤155 chars, entity-rich), datePublished 2026-05-14, dateModified 2026-05-14, category "Citation Brief", tags ["AEO","cognitive access","Citation Score","agency","AI search","extractability"], readingTime ~12, ogImage placeholder per existing convention.
- **EDIT** `src/app/citation-brief/[slug]/page.tsx` — add two static imports and two entries to the slug→Component map:
  ```ts
  import AeoIsThe2026Wcag from '@/content/citation-briefs/aeo-is-the-2026-wcag.mdx';
  import TwoTierAccessDoctrine from '@/content/citation-briefs/two-tier-access-doctrine.mdx';
  // ...
  const BRIEF_COMPONENTS = {
    'how-agencies-get-cited-in-ai-answers': HowAgenciesGetCited,
    'stage-3-structured-extractability': Stage3StructuredExtractability,
    'aeo-is-the-2026-wcag': AeoIsThe2026Wcag,
    'two-tier-access-doctrine': TwoTierAccessDoctrine,
  };
  ```
- **CONFIRM** `generateStaticParams` (or equivalent) returns both new slugs at build time.
- **EDIT** sitemap generation (likely `src/app/sitemap.ts` or `next-sitemap.config.js`) — confirm new slugs are included. If sitemap reads from BRIEF_MANIFEST, no change required; if hard-coded, add both.
- **EDIT** OG image generation if dynamic (likely `src/app/citation-brief/[slug]/opengraph-image.tsx` or similar) — confirm new slugs covered. No code change expected; the route should already accept any slug from the manifest.
- **EDIT** any "Latest Citation Briefs" carousel/index on the homepage, /platform, or /audit that lists briefs by slug — confirm new entries surface.

### Implementation notes
- **Per the Schema-Count Grep Trap (2026-05-14 feedback):** when counting JSON-LD blocks post-deploy, count `<script[^>]*type="application/ld+json"` opening tags only, not bare MIME-string occurrences. RSC stream inflates the latter.
- **Per MDX Static-Import Law:** NEVER use dynamic imports for these MDX files. Static imports + BRIEF_COMPONENTS map only.
- **Per Distribution Handoff Law:** post-deploy, the §5 deploy procedure must trigger IndexNow notification for both new URLs.

### Acceptance criteria
1. `npm run build` succeeds with both new slugs in the prerendered route output.
2. `npm run dev` renders both briefs at `/citation-brief/aeo-is-the-2026-wcag` and `/citation-brief/two-tier-access-doctrine` without console errors.
3. Production deploy: `curl -sI https://wielegroup.com/citation-brief/aeo-is-the-2026-wcag` returns 200.
4. Production deploy: `curl -sI https://wielegroup.com/citation-brief/two-tier-access-doctrine` returns 200.
5. Production sitemap at `https://wielegroup.com/sitemap.xml` contains both new URLs (`curl -s https://wielegroup.com/sitemap.xml | grep -E 'aeo-is-the-2026-wcag|two-tier-access-doctrine' | wc -l` returns ≥ 2).
6. Production OG image renders for both: `curl -sI https://wielegroup.com/citation-brief/aeo-is-the-2026-wcag/opengraph-image` returns 200; same for #004.
7. JSON-LD Article schema renders inside each brief page (verify: `curl -s <url> | grep -oE '<script[^>]*type="application/ld+json"' | wc -l` returns ≥ 1 per page).
8. Internal cross-links resolve: from Brief #003 body, all links to Briefs #001/#002/#004 produce HTTP 200. Same from Brief #004 body.
9. Homepage / /platform / /audit "Latest Citation Briefs" listings (if present) surface both new entries.
10. IndexNow notification fires for both URLs (check `npm run indexnow` output or equivalent script).

### Verification commands
```bash
# Build
npm run build 2>&1 | grep -E "aeo-is-the-2026-wcag|two-tier-access-doctrine"

# Dev render
npm run dev &
sleep 8
curl -sI http://localhost:3000/citation-brief/aeo-is-the-2026-wcag
curl -sI http://localhost:3000/citation-brief/two-tier-access-doctrine

# Post-deploy live verification (after §5)
curl -sI https://wielegroup.com/citation-brief/aeo-is-the-2026-wcag
curl -sI https://wielegroup.com/citation-brief/two-tier-access-doctrine
curl -s https://wielegroup.com/sitemap.xml | grep -cE "aeo-is-the-2026-wcag|two-tier-access-doctrine"
curl -s https://wielegroup.com/citation-brief/aeo-is-the-2026-wcag | grep -ocE '<script[^>]*type="application/ld\+json"'
```

### Commit message
```
feat(citation-brief): publish Briefs #003 + #004 (/L99 cognitive canon)

- Brief #003: AEO is the 2026 WCAG (3,500w · 10 H2 sections)
  Robbins 2007 + Corrao 1998 accessibility-to-AEO lineage argument
  Cognitive Access Audit (£1,950) + Citation Score™ tie-in
- Brief #004: Two-Tier Access Doctrine (3,050w · 9 H2 sections)
  Corrao & Fulantelli 1998 CNR Palermo source
  Krug Trunk Test + Whalen Six Minds + Jones 2015 50ms tests
  Citation Score™ §2 productisation lineage

Registered in src/lib/citation-briefs-static.ts BRIEF_MANIFEST
and src/app/citation-brief/[slug]/page.tsx static-import map
per MDX Static-Import Law (Phase 7.4).

Closes v3.9.4 Amendment A.

Refs: /L99 Cognitive Psychology & Design canon 2026-05-14
```

---

## §5 Deploy (extension of base directive)

In addition to the v3.9.4 base deploy procedure:
1. After `npm run deploy:cf`, run IndexNow for the two new URLs.
2. Submit sitemap re-crawl to GSC + Bing Webmaster Tools.
3. Verify Cloudflare cache HIT on both new brief URLs within 30 minutes (CF should populate after 2-3 hits).

---

## §6 Rollback (Amendment-A-specific)

If Task 6 fails post-deploy:
1. Revert the BRIEF_MANIFEST + page.tsx changes (`git revert`).
2. `npm run deploy:cf` to push the rollback.
3. The two MDX files can remain on disk — they will simply not route until re-registered. No further cleanup required.
4. The base v3.9.4 directive (Tasks 1–5) is independent of Task 6 — Tasks 1–5 do not require rollback if only Task 6 fails.

---

## §7 Reporting back (Amendment-A additions)

The close report must additionally confirm:
- Both new brief URLs return 200 in production.
- Sitemap contains both new entries (grep count ≥ 2).
- IndexNow notification succeeded for both URLs.
- JSON-LD Article schema renders on both pages.
- Internal cross-links (Brief #003 ↔ #001/#002/#004; Brief #004 ↔ #001/#002/#003) all resolve to HTTP 200.
- /platform Stage 0 reference (from base Task 5) cross-linked correctly from the new briefs.

---

## §8 Sources

- `/L99 Cognitive Psychology & Design canon` — `/memory/reference_cognitive_psychology_design_canon_2026_05_14.md`
- MDX Static-Import Law (Phase 7.4 2026-05-14) — `/memory/feedback_mdx_static_imports_phase_7_4_law.md`
- Schema-Count Grep Trap 2026-05-14 — `/memory/feedback_schema_count_grep_trap.md`
- Distribution Handoff Law — `/memory/feedback_distribution_handoff_law.md`
- v3.9.3 Amendment A precedent — `docs/directives/v3-9-3-AMENDMENT-A-citation-score-approved-2026-05-14.md`
- Brief #003 MDX — `src/content/citation-briefs/aeo-is-the-2026-wcag.mdx` (written 2026-05-14 evening by Cowork)
- Brief #004 MDX — `src/content/citation-briefs/two-tier-access-doctrine.mdx` (written 2026-05-14 evening by Cowork)

---

## §9 Acknowledgement

Brief drafting performed by Cowork under autonomous judgment authority elevated 2026-05-14 morning. Founder approval for ship surfaced via single-word "YES" against the /L99-evening recommendation stack (3 items: v3.9.4 directive · Citation Briefs #003 + #004 · Citation Score™ §2 Prototype Match sub-metric). All three items now packaged for Claude Code execution: base directive Tasks 1–5 + this Amendment A Task 6.

**Execution order (full v3.9.4 cycle):** T1 (predeploy guard) → T3 (pre-deploy checklist) → T2 (Cowan cap docs) → T5 (Stage 0 prerequisite) → T4 (Prototype Match sub-metric) → **T6 (Brief #003 + #004 registration & deploy)**.
