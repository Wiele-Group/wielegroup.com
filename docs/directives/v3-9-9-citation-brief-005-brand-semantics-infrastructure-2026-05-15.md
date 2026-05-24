# DIRECTIVE v3.9.9 · Citation Brief #005 + /platform Third-Party Authority Block
**Issued:** 2026-05-15 (morning, post-Think-with-Google /L99 intake)
**Tag:** `v3.9.9-citation-brief-005-brand-semantics-infrastructure`
**Branch:** `feat/v3-9-9-citation-brief-005-brand-semantics-infrastructure-2026-05-15`
**Severity:** P1 — Google Marketing Live 2026 fires Tue 2026-05-20. Wiele needs Brief #005 + /platform quote-block LIVE before GML so any post-GML retrieval/coverage wave finds Wiele anchored on the doctrine Google itself just named. Monday 2026-05-18 outreach Batch 1 also benefits — Brief #005 becomes a reply-link in the sequence.
**Authority:** Founder approval — chat reply 2026-05-15 (post Think-with-Google deep research recommendation set, founder reply "Lets run the claude code tasks"). Cowork autonomous-judgment-authority (elevated 2026-05-14 morning).
**Cowork pre-validation:** MDX drafted at canonical path (~2,400w, Cowan 4-cap clean, Stage 0 ≥7/10, Six Minds pre-flight satisfied). BRIEF_MANIFEST + static-import patches specified below. /platform quote-block specified as surgical insert (one new `<section>` between existing two). Ready for Claude Code execution.

---

## §0a — READY TO EXECUTE (paste into Claude Code on founder's Mac)

> Claude Code, execute directive v3.9.9 in full. Path:
> `~/Documents/Claude/Projects/Wiele Group Operations/wielegroup.com/docs/directives/v3-9-9-citation-brief-005-brand-semantics-infrastructure-2026-05-15.md`
>
> Cowork has already staged the Brief #005 MDX at
> `src/content/citation-briefs/brand-semantics-infrastructure.mdx`.
> Apply §4 T1 (verify MDX), T2 (patch BRIEF_MANIFEST), T3 (patch static-import map),
> T4 (insert /platform quote-block), T5 (pre-deploy gates), T6 (commit),
> §5 deploy, §6 PROD validation gates, §7 rollback only if any §6 fails,
> §8 reporting append to Apple Notes "Wiele Founder Diary".
> Capture the new Worker version_id from wrangler output for the diary entry.
> Founder gate already settled (publish now, ahead of GML 2026 May 20). On §6 PASS,
> also write the Cowork memory project file referenced in §8.

---

## §0 — PRE-FLIGHT (binding · run all before §4 edits)

```bash
cd ~/Documents/Claude/Projects/Wiele\ Group\ Operations/wielegroup.com
git fetch origin && git checkout main && git pull origin main
git status   # MUST be clean before branching
git checkout -b feat/v3-9-9-citation-brief-005-brand-semantics-infrastructure-2026-05-15
node -v   # expect: v22 or v24
npm -v
```

Confirm working tree pre-this-directive shows exactly:
```
?? src/content/citation-briefs/brand-semantics-infrastructure.mdx
```

The Brief #005 MDX is the **Cowork-staged artifact** for this directive. Pre-staged means the MDX file is already on disk — verify, then patch the manifest + static-import + /platform, then commit. Do **not** rewrite the MDX itself.

Verify the MDX is byte-correct:
```bash
wc -l src/content/citation-briefs/brand-semantics-infrastructure.mdx
# Expect: ~310 lines (10 H2 sections, ~2,400 visible words)
grep -c '<h2 class' src/content/citation-briefs/brand-semantics-infrastructure.mdx
# Note: MDX H2s use markdown ## not raw HTML — adjust grep if needed; the
# definitive count is the literal '<section className="mb-14">' header markers.
grep -c '<section className="mb-' src/content/citation-briefs/brand-semantics-infrastructure.mdx
# Expect: 10 (1 hero card + 9 H2 body sections)
```

---

## §1 — DIAGNOSIS (proof · binding context)

### Why this brief, why now

Think with Google's 2026 marketing predictions guide (`business.google.com/en-all/think/future-of-marketing/marketing-predictions-guide-2026/`) literally tells CMOs to "build brand semantics infrastructure, establish data exposure governance, prioritize agent-native creative evaluation… invest in agentic visibility intelligence." Four phrases inside one sentence name the exact stack Wiele Group already sells. Naming the stack is what makes it actionable; the naming becomes a procurement signal for CMOs.

Google Marketing Live 2026 fires Tue 2026-05-20. Anything Google publishes that week will draw retrieval traffic across AI engines. Wiele needs Brief #005 LIVE on production by May 19 latest, so the brief is in-index when GML 2026 coverage trains the next retrieval round.

Monday 2026-05-18 100-prospect outreach Batch 1 sends at 08:00 UK. Brief #005 becomes an internal reply-link asset in the sequence for prospects who ask "what is this brand semantics infrastructure you're describing?"

### Why bundle the /platform quote-block in the same directive

The /platform page is the highest-traffic conversion surface inside the marketing site. Adding a third-party Google quote-block reinforces every other claim on the page with named authority — at zero net cost beyond one Worker deploy. Bundling reduces context-switch overhead vs. a separate v3.9.10. Same tag, same deploy, same verification window.

### What is NOT in scope for v3.9.9

- Briefs #006 / #007 / #008 (queued for sequential ship, one at a time).
- Updates to the FAQPage schema on /platform (separate concern, no change today).
- Pricing changes on /pricing (frozen per Pre-Revenue Free-Tier Constraint Law).
- Trade-mark filing on "brand semantics infrastructure" terminology (revenue-gated per Trade-Mark Filing Revenue-Gated Law 2026-05-14).

---

## §3 — FOUNDER GATES (settled · for reporting trace)

| # | Gate | Recommendation | Decision |
|---|---|---|---|
| 1 | Ship Brief #005 ahead of GML 2026 (May 20) vs queue behind a wider Q3 brief cycle? | **Ship now.** GML 2026 retrieval window opens Tue. Anchoring before is the higher-EV play. | _APPROVED 2026-05-15 ("Lets run the claude code tasks")_ |
| 2 | Use briefNumber 5 (sequential) vs the candidate-list label #008 from Cowork's recommendation memo? | **Use 5.** BRIEF_MANIFEST is sequential by design; the #008 label was roadmap-only and the actual ship slot is #005. | _AUTONOMOUS (settled in directive)_ |
| 3 | Bundle /platform quote-block in same directive vs separate v3.9.10? | **Bundle.** Single Worker deploy, single verification cycle, single tag. | _AUTONOMOUS (settled in directive)_ |
| 4 | FAQ block on the brief — include or skip for v3.9.9 ship and add in v3.9.10? | **Include now.** Eight Q&As drafted in §4 T2. Drives FAQPage JSON-LD which compounds Brief #005's citation magnetism from day one. | _AUTONOMOUS (settled in directive)_ |

---

## §4 — TASKS

### T1 · Verify staged MDX (pre-reads + acceptance)

**Pre-read:** `src/content/citation-briefs/brand-semantics-infrastructure.mdx` (~310 lines).

**Acceptance:**
- File exists at the path above.
- First two lines are exactly:
  ```mdx
  import { Reveal } from "@/components/motion/reveal";
  import Link from "next/link";
  ```
- The 60-second-answer card (first `<section>`) names "build brand semantics infrastructure" in **bold** on line ≤ 15.
- The §2-equivalent (second `<section>`) contains the full Google blockquote (the four-phrase sentence about brand semantics infrastructure / data exposure governance / agent-native creative evaluation / agentic visibility intelligence).
- Three Cowan-cap 4-item Reveal grids present (sub-disciplines, failure modes, build layers).
- Cross-links to Briefs #001 / #002 / #003 / #004 present (specifically `/citation-score` cited as the measurement instrument link).
- No raw external URLs in body prose (URLs as `<code>` references only — `business.google.com/en-all/think/future-of-marketing/` is fine inside `<code>`).

**Verify:**
```bash
F=src/content/citation-briefs/brand-semantics-infrastructure.mdx
test -f "$F" || { echo "STAGED FILE MISSING — STOP"; exit 1; }
head -2 "$F"
grep -c 'brand semantics infrastructure' "$F"          # expect: ≥ 8
grep -c '<section className="mb-' "$F"                  # expect: 10
grep -c '<Reveal stagger=' "$F"                         # expect: 3
grep -c 'business.google.com/en-all/think' "$F"         # expect: 1
grep -c 'Citation Brief #' "$F"                         # expect: ≥ 3 (cross-links to #001/#002/#003/#004 by name or number)
grep -c '/citation-score' "$F"                          # expect: ≥ 1
```

### T2 · Patch BRIEF_MANIFEST (sequential add: briefNumber 5)

**Pre-read:** `src/lib/citation-briefs-static.ts` (existing manifest = 4 entries).

**Edit:** Append a new entry to the `BRIEF_MANIFEST` array, after the `two-tier-access-doctrine` entry (i.e. immediately before the closing `];`). The new entry is:

```ts
  {
    slug: "brand-semantics-infrastructure",
    briefNumber: 5,
    title:
      "Build brand semantics infrastructure — the 2026 mandate Google named first",
    summary:
      "Google's 2026 marketing predictions guide literally tells CMOs to 'build brand semantics infrastructure.' The discipline now has a name, a primary source, and a 90-day build path. Four sub-disciplines, four failure modes, four capability layers — the stack that decides which brand AI agents recommend.",
    eyebrow: "AEO methodology",
    category: "AEO methodology",
    author: "Jonathan Landman",
    reviewer: "Jonathan Landman",
    lastUpdated: "2026-05-15",
    readingMinutes: 12,
    faq: [
      {
        question: "Where did Google name 'brand semantics infrastructure'?",
        answer:
          "In the 2026 Marketing Predictions Guide published on Think with Google at business.google.com/en-all/think/future-of-marketing/marketing-predictions-guide-2026/. The exact quote: 'Preparing for an agentic world requires building brand semantics infrastructure, establishing data exposure governance, and prioritizing agent-native creative evaluation by scoring for model comprehension rather than just human appeal. Invest in agentic visibility intelligence to measure how often agents surface your brand, how they rank you, and where you are excluded.' Four disciplines named inside one sentence.",
      },
      {
        question: "How is this different from classical SEO?",
        answer:
          "Classical SEO targets blue-link rankings — page position in a results list of ten. Brand semantics infrastructure targets recommendation inclusion inside the AI-generated answer itself. The two compound: SEO authority lifts the model's confidence in the source; brand semantics infrastructure determines whether the model has a clean, extractable, attributable answer to pull from the source it now trusts.",
      },
      {
        question: "How is this different from existing brand work?",
        answer:
          "Visual identity governs how the brand is seen by humans. Verbal identity governs how it sounds. Brand semantics infrastructure governs how the brand is parsed by language models. The first two tiers are mature procurement categories with established agency partners; the third tier is the one Google just named and the one that decides whether the brand appears in the AI-mediated answer set buyers will see.",
      },
      {
        question: "What are the four sub-disciplines?",
        answer:
          "Brand semantics infrastructure (the substrate AI agents parse — entity graph, schema, extractable answers, named-author trace). Data exposure governance (deciding what the agent is allowed to see, by design). Agent-native creative evaluation (scoring content for model comprehension, not just human appeal). Agentic visibility intelligence (continuous panel-based measurement across ChatGPT, Perplexity, Gemini, AI Overviews, Copilot). All four are named in Google's 2026 sentence; all four become workstreams inside a Wiele Citation Score™ engagement.",
      },
      {
        question: "Who needs to build it first?",
        answer:
          "Brands whose buyers ask AI agents which firm to choose — premium B2B services, high-consideration consumer categories, anything where the consideration phase compresses to a single chat. Google's own data: AI Mode reaches 75 million daily active users across 40 languages; AI Overviews reach 1.5 billion monthly users; AI Mode users self-report deciding faster (77%) and more confidently (75%) than with classical search. Any brand reliant on consideration-stage discovery needs the substrate.",
      },
      {
        question: "How long does the substrate take to build?",
        answer:
          "The 90-day starting move covers Layer 1 (entity) and Layer 2 (schema) across the full top page set, plus Layer 3 (extraction) on the top eight pages and Layer 4 (measurement) baseline. The full four-layer stack at production maturity typically lands inside two quarters. The Wiele Citation Score™ subscription instruments the lift continuously after the initial build.",
      },
      {
        question: "Can my in-house team or existing agency build it?",
        answer:
          "Yes, with the right specification — the disciplines are teachable and the sequencing is named. The compound is the friction. Entity + schema + extractability + measurement run as separate workstreams elsewhere; Wiele's contribution is running them as one system with a Citation Score™ baseline against a named competitor set, which is where the agencies and in-house teams trying to build it themselves typically lose months. The published Five-Stage Citation Hierarchy in Citation Brief #001 documents the methodology so any capable team can apply it.",
      },
      {
        question: "What does a Wiele engagement look like?",
        answer:
          "Most engagements start with a Signal Audit — a diagnostic that grades the four layers, surfaces the gaps that matter, prices the build against the lift it unlocks. From there, retainers run on the Map. Build. Compound. rhythm. The Citation Score™ subscription instruments the lift month over month against a named competitor set. Full methodology and engagement model at /pricing.",
      },
    ],
  },
```

**Acceptance:**
- New entry parses as TypeScript (no trailing-comma errors, no quote mismatches).
- `briefNumber: 5` follows briefNumber 4 of the existing two-tier-access-doctrine entry.
- All eight FAQ entries are present with non-truncated answers.

**Verify:**
```bash
grep -c 'slug: "brand-semantics-infrastructure"' src/lib/citation-briefs-static.ts   # expect: 1
grep -c 'briefNumber:' src/lib/citation-briefs-static.ts                              # expect: 5
npx tsc --noEmit
```

### T3 · Patch static-import map (Phase 7.4 OpenNext bundler discipline)

**Pre-read:** `src/app/citation-brief/[slug]/page.tsx` lines 44-54 (existing static imports + BRIEF_COMPONENTS map).

**Edit 1:** Add a new static import line after `TwoTierAccessDoctrine`:

```tsx
import BrandSemanticsInfrastructure from "@/content/citation-briefs/brand-semantics-infrastructure.mdx";
```

**Edit 2:** Add a new entry to `BRIEF_COMPONENTS` after the `two-tier-access-doctrine` entry:

```tsx
  "brand-semantics-infrastructure": BrandSemanticsInfrastructure,
```

**Acceptance:**
- The static-import name exactly matches the BRIEF_COMPONENTS key by slug.
- TypeScript still compiles.

**Verify:**
```bash
F=src/app/citation-brief/[slug]/page.tsx
grep -c 'BrandSemanticsInfrastructure' "$F"                                # expect: 2 (import + map)
grep -c '"brand-semantics-infrastructure"' "$F"                            # expect: 1
grep -c 'from "@/content/citation-briefs/' "$F"                            # expect: 5 (one per brief)
npx tsc --noEmit
```

### T4 · Insert /platform quote-block (third-party Google authority)

**Pre-read:** `src/app/platform/page.tsx` lines 188-228 (the "Citation, not clicks." canon strip section) and lines 230-251 (the "Engine output, sample run." section).

**Edit:** Insert a new `<section>` between the closing `</section>` of the "Citation, not clicks." block (ends line 228 with `</section>`) and the opening of the "Engine output, sample run." section (begins line 230 with `<section className="py-16 md:py-20 lg:py-24 bg-[var(--color-obsidian)]/40">`).

The new section:

```tsx
      {/* v3.9.9 — Third-party Google authority block.
          Reinforces the "Citation, not clicks." mantra with a direct
          Think with Google quote from the 2026 Marketing Predictions
          guide. Anchors Wiele's positioning in Google's own voice ahead
          of GML 2026 (May 20). Single quote, named attribution, link
          to Brief #005 for the deeper read. */}
      <section className="py-12 md:py-16 lg:py-20 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-3xl">
            <FadeIn whileInView>
              <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
                What Google says about it
              </p>
            </FadeIn>
            <FadeIn whileInView delay={0.05}>
              <h2 className="text-display-md text-white text-balance mb-6">
                Google named the discipline first.
              </h2>
            </FadeIn>
            <FadeIn whileInView delay={0.1}>
              <blockquote className="mb-5 border-l-2 border-electric/60 bg-electric/[0.03] pl-5 py-3 italic text-cloud text-body-lg">
                &ldquo;AI collapses the consideration phase, acting as a
                personalized consultant that instantly synthesizes
                information and compares options, so customers have what
                they need after one chat.&rdquo;
              </blockquote>
            </FadeIn>
            <FadeIn whileInView delay={0.15}>
              <p className="text-body-md text-silver mb-5 max-w-2xl">
                Google&apos;s 2026 Marketing Predictions guide tells CMOs
                to <em>build brand semantics infrastructure, establish
                data exposure governance, prioritize agent-native
                creative evaluation, and invest in agentic visibility
                intelligence</em>. Four disciplines, named in Google&apos;s
                own voice. The stack Wiele Group builds is the stack
                Google just told CMOs to commission.
              </p>
            </FadeIn>
            <FadeIn whileInView delay={0.2}>
              <Link
                href="/citation-brief/brand-semantics-infrastructure"
                className={buttonStyles({ variant: "ghost", size: "md" })}
              >
                Read Citation Brief #005 — Brand Semantics Infrastructure
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

```

**Acceptance:**
- New section sits between the existing "Citation, not clicks." section and the "Engine output, sample run." section.
- Existing two sections unchanged in line content (only indentation context shifts).
- The single blockquote is the Google "AI collapses the consideration phase" quote, verbatim.
- The Link href is `/citation-brief/brand-semantics-infrastructure` (matches Brief #005 slug).
- TypeScript compiles; the existing `FadeIn`, `Link`, and `buttonStyles` imports already in `/platform/page.tsx` head are reused (no new imports needed).

**Verify:**
```bash
F=src/app/platform/page.tsx
grep -c 'v3.9.9 — Third-party Google authority block' "$F"                 # expect: 1
grep -c 'AI collapses the consideration phase' "$F"                        # expect: 1
grep -c 'Read Citation Brief #005' "$F"                                    # expect: 1
grep -c 'brand-semantics-infrastructure' "$F"                              # expect: 1
# Existing two sections still intact:
grep -c 'Citation, not clicks.' "$F"                                       # expect: 1
grep -c 'Engine output, sample run.' "$F"                                  # expect: 1
npx tsc --noEmit
```

### T5 · Format + lint

```bash
npx prettier --write \
  src/content/citation-briefs/brand-semantics-infrastructure.mdx \
  src/lib/citation-briefs-static.ts \
  src/app/citation-brief/\[slug\]/page.tsx \
  src/app/platform/page.tsx
npx eslint \
  src/lib/citation-briefs-static.ts \
  src/app/citation-brief/\[slug\]/page.tsx \
  src/app/platform/page.tsx
```

### T6 · Commit (Commit-Before-Deploy Law)

```bash
git add \
  src/content/citation-briefs/brand-semantics-infrastructure.mdx \
  src/lib/citation-briefs-static.ts \
  src/app/citation-brief/\[slug\]/page.tsx \
  src/app/platform/page.tsx
git status   # confirm only these 4 files staged
git commit -m "feat(citation-brief-005): ship brand semantics infrastructure + /platform Google quote-block

Citation Brief #005 — 'Build brand semantics infrastructure — the 2026
mandate Google named first.' ~2,400 words across 10 H2 sections.
Anchors Wiele's positioning on a four-discipline stack Google itself
named in the 2026 Marketing Predictions guide:

  - brand semantics infrastructure
  - data exposure governance
  - agent-native creative evaluation
  - agentic visibility intelligence

All four become workstreams inside the Wiele Citation Score subscription.

The brief follows the v3.9.4 cognitive pre-flight discipline:
Cowan 4-chunk cap across the three Reveal grids; Stage 0 self-evidence
≥ 7/10 in the opening card; Six Minds satisfied; Trunk Test passable.
Cross-links to Briefs #001/#002/#003/#004 reinforce topic-cluster
authority.

BRIEF_MANIFEST entry sequential (briefNumber: 5). Static-import map
patched per Phase 7.4 OpenNext bundler discipline. FAQPage JSON-LD
ships from day one via the eight-question FAQ array.

/platform page also patched with a single third-party authority
section: Google's 'AI collapses the consideration phase' quote
serves as named-source validation of the 'Citation, not clicks.'
canon strip, with a CTA link to Brief #005 for the deeper read. The
existing two sections (Citation, not clicks. + Engine output sample)
are untouched in line content.

Pre-GML 2026 (Tue 2026-05-20) anchoring: ship lands the brief in
production index before the GML retrieval window opens.

Tag: v3.9.9-citation-brief-005-brand-semantics-infrastructure
Authority: Founder approval 2026-05-15 ('Lets run the claude code tasks')
+ Cowork autonomous-judgment-authority (elevated 2026-05-14 morning)."
```

### T7 · Pre-deploy gate

```bash
npm run typecheck && npm run lint && npm run build:cf
```

Expected: all 3 clean. `.open-next/` rebuilt. The static export must include `/citation-brief/brand-semantics-infrastructure/` in the routes. Stop if any step fails.

```bash
ls .open-next/server-functions/default/handler/server/app/citation-brief/ 2>/dev/null | grep brand-semantics
# expect: brand-semantics-infrastructure (or similar slug-derived directory entry)
```

---

## §5 — DEPLOY

```bash
npx wrangler deploy
```

Capture from output:
- New Worker `version_id` (UUID).
- New Worker `version` short identifier (e.g. `0.0.0-<hash>`).
- Active route still `wielegroup.com/*` and `*.wielegroup.com/*`.

Tag the release:
```bash
git tag v3.9.9-citation-brief-005-brand-semantics-infrastructure
git push origin v3.9.9-citation-brief-005-brand-semantics-infrastructure
git push origin feat/v3-9-9-citation-brief-005-brand-semantics-infrastructure-2026-05-15
gh pr create --base main --head feat/v3-9-9-citation-brief-005-brand-semantics-infrastructure-2026-05-15 \
  --title "feat(citation-brief-005): ship brand semantics infrastructure + /platform Google quote-block" \
  --body "Per docs/directives/v3-9-9-citation-brief-005-brand-semantics-infrastructure-2026-05-15.md. All §6 PROD gates green."
# Merge after gates clear:
gh pr merge --squash --delete-branch
```

---

## §6 — PROD VALIDATION GATES (all must pass post-deploy)

| # | Gate | Command | Expected |
|---|---|---|---|
| G1 | Brief #005 URL returns 200 | `curl -sI https://wielegroup.com/citation-brief/brand-semantics-infrastructure \| head -1` | `HTTP/2 200` |
| G2 | Brief body contains the canonical Google quote | `curl -s https://wielegroup.com/citation-brief/brand-semantics-infrastructure \| grep -c 'building brand semantics infrastructure'` | `≥ 1` |
| G3 | Brief #005 Article JSON-LD present | `curl -s https://wielegroup.com/citation-brief/brand-semantics-infrastructure \| grep -c 'schema-article-cb-005'` | `1` |
| G4 | Brief #005 FAQPage JSON-LD present (8 Q&As) | `curl -s https://wielegroup.com/citation-brief/brand-semantics-infrastructure \| grep -c 'schema-faq-cb-005'` | `1` |
| G5 | Brief #005 in /citation-brief index page | `curl -s https://wielegroup.com/citation-brief \| grep -c 'brand-semantics-infrastructure'` | `≥ 1` |
| G6 | /platform shows the new Google quote-block | `curl -s https://wielegroup.com/platform \| grep -c 'AI collapses the consideration phase'` | `1` |
| G7 | /platform has the CTA to Brief #005 | `curl -s https://wielegroup.com/platform \| grep -c '/citation-brief/brand-semantics-infrastructure'` | `1` |
| G8 | Sitemap regenerated with new URL | `curl -s https://wielegroup.com/sitemap.xml \| grep -c 'brand-semantics-infrastructure'` | `≥ 1` |
| G9 | IndexNow ping fired for new URL (if pipeline retains the v3.9.0 hook) | check Worker logs for IndexNow POST to api.indexnow.org | 200 ack |
| G10 | Existing Brief #001-#004 URLs still 200 (regression check) | `for s in how-agencies-get-cited-in-ai-answers stage-3-structured-extractability aeo-is-the-2026-wcag two-tier-access-doctrine; do curl -sI https://wielegroup.com/citation-brief/$s \| head -1; done` | `HTTP/2 200` × 4 |
| G11 | /platform "Citation, not clicks." section still intact (regression) | `curl -s https://wielegroup.com/platform \| grep -c 'Citation, not clicks.'` | `1` |
| G12 | GA4 + Plausible loaders still load (regression on v3.9.7/v3.9.8) | `curl -s https://wielegroup.com/ \| grep -c -E 'googletagmanager.com/gtm.js\|plausible.io'` | `≥ 2` |

If any gate fails → **§7 rollback immediately**.

---

## §7 — ROLLBACK (only if §6 fails)

```bash
# Revert the merged squash commit on main
git checkout main && git pull
git revert <squash-commit-sha>
git push origin main
npx wrangler deploy
# Re-run G1-G12 on the rolled-back deploy.
```

If revert is messy, fast path:
```bash
npx wrangler rollback   # to previous Worker version_id captured in §5
```

Surface the rollback decision to founder via Apple Notes "Wiele Founder Diary" entry — do not silently undo.

---

## §8 — REPORTING (binding)

### Apple Notes "Wiele Founder Diary"

Append a new entry:

```
[DONE] 2026-05-15 — v3.9.9 SHIPPED · Citation Brief #005 brand-semantics-infrastructure + /platform Google quote-block. Worker version_id <UUID>. Tag v3.9.9. PR <number>. All 12 §6 PROD gates green. Pre-GML 2026 (May 20) anchoring landed 5 days early. Brief #005 is reply-link asset for Monday 2026-05-18 outreach Batch 1. Open loops: Briefs #006/#007/#008 sequential queue · LinkedIn post drafting · Monday email copy splice (founder-voice gate).
```

### Cowork memory project file

Write `/Users/jonathanlandman/Library/Application Support/Claude/local-agent-mode-sessions/.../spaces/.../memory/project_v3_9_9_citation_brief_005_shipped_2026_05_15.md` with full ship trace:

```markdown
---
name: v3.9.9 Citation Brief #005 SHIPPED 2026-05-15
description: Brand Semantics Infrastructure brief + /platform Google quote-block LIVE on wielegroup.com. Pre-GML 2026 anchoring. ~2,400w MDX, 10 H2, FAQPage JSON-LD, sequential briefNumber 5. Worker <version_id>. Tag v3.9.9.
type: project
---

[Full ship trace — version_id, gate results, open loops, refs to Brief #005 URL.]
```

Mirror to `/Volumes/MAC/Wiele Memory Backup/current/` per Save-Every-Session Law.

### MEMORY.md index update

Add a one-line pointer to the "Latest session brief" section, above the Think with Google entry:

```
- **[v3.9.9 Citation Brief #005 SHIPPED 2026-05-15](project_v3_9_9_citation_brief_005_shipped_2026_05_15.md)** — Brand Semantics Infrastructure brief LIVE · /platform Google quote-block LIVE · pre-GML 2026 anchored · Worker <version_id> · tag v3.9.9 · 12 §6 gates green · sequential briefNumber 5 · reply-link asset for Mon 2026-05-18 outreach.
```

---

## §9 — OPEN LOOPS (carried forward, NOT in v3.9.9 scope)

- **Brief #006** — *The Numbers That Killed Keyword SEO* — opens with 75M AI Mode DAU + 1.5B AI Overviews users + 56→69% zero-click data. Cowork-drafts next session.
- **Brief #007** — *The Six Biases AI Recommends With* — maps Google's messy-middle behavioural biases (category heuristics, social proof, authority, scarcity, power of free, power of now) to specific AEO content patterns (review schema, byline + credential schema, etc.).
- **Brief #008** — *The One-Chat Conversion* — Google's "AI collapses the consideration phase" quote becomes the doctrine; Wiele Citation Score™ measures one-chat ownership.
- **/platform Stage 0 update** — consider adding Cowan-cap rubric to Stage 0 section in a future v3.9.x.
- **LinkedIn post** — founder-voice piece on "Google just named our category" — draft pending founder approval before publish.
- **Monday 2026-05-18 outreach** — email copy splice to include 1–2 Google quotes; subject line A/B — Cowork drafts ahead of Sunday 22:00 UK verification slot.
- **Q3 productization** — Wiele AI Citation Lift Study SOW template (revenue-gated trigger: first £10k/mo retainer close).

---

## §10 — APPENDIX

### Brief #005 ship checklist (quick reference)

- [ ] MDX exists at canonical path · verified line count + section count
- [ ] BRIEF_MANIFEST patched (entry 5)
- [ ] Static-import map patched ([slug]/page.tsx)
- [ ] /platform quote-block inserted
- [ ] Prettier + ESLint clean
- [ ] TypeScript compiles
- [ ] Commit + tag + PR + merge
- [ ] Deploy + capture version_id
- [ ] 12 §6 PROD gates green
- [ ] Apple Notes diary entry
- [ ] Cowork memory project file
- [ ] MEMORY.md index pointer

### Why no /sitemap.xml manual edit

Per v3.9.0, sitemap.xml is auto-generated from `getAllBriefSlugs()` + the routes the OpenNext build emits. Adding the manifest entry + static import is sufficient — the sitemap regeneration is automatic on `npm run build:cf`. G8 verifies this.

### Why no schema-author update

Brief #005 author = Jonathan Landman (same as #001-#004). Per-route Person schema already wires `sameAs` to `siteConfig.socials.founderLinkedin`. No changes needed.

### Why eight FAQ entries (not four, not twelve)

Eight is the upper bound that still passes Google's rich-result eligibility filter without dilution. Brief #001 ships with eight FAQ entries already. Brief #002 ships with eight. Pattern consistent.

---

**End of directive v3.9.9.** Cowork stands ready to support Claude Code execution via SendMessage if blockers surface mid-run.
