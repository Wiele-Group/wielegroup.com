# Claude Code Directive — v3.9.4 (2026-05-14)

## Cognitive Pre-Flight + Prototype Match + Commit-Before-Deploy Guard

**Issued by:** Cowork (Wiele Enterprise Orchestrator)
**To:** Claude Code
**Authority:** Founder · Jonathan Landman
**Repo:** `wielegroup.com`
**Live state at issuance:** Worker version (verify in §0) — successor to v3.9.3 trail `b8513737 → e41212f9 → 2d060262 → 090d8de3`
**Prior cycle close:** `project_session_2026_05_14_v3_9_3_directive_cycle_closed.md` (v3.9.3 SHIPPED — Citation Score™ live, Brief #001 + #002 live, /platform aligned)

**Approval trail:**
- Recommendation stack surfaced to founder 2026-05-14 evening.
- Founder approval #1: **"YES"** to the 3-item stack (v3.9.4 cognitive directive · Citation Briefs #003 + #004 · Citation Score™ §2 Prototype Match sub-metric).
- Founder approval #2: **"APPROVED"** to the surfaced founder gates (Gate 1 · Gate 2 · Gate 3 — see §3).
- All gates locked to Cowork-proposed defaults. **No further founder pause required for execution.**

This is a binding directive. Read it top to bottom before any action. Pre-flight
checks are non-negotiable. **All decision gates in §3 are RESOLVED — proceed
sequentially through §4 once §0 pre-flight passes.**

---

## §0a · READY TO EXECUTE — Claude Code prompt (founder copy-paste)

The founder hands this off to Claude Code (CLI) by running, from inside
`wielegroup.com/`:

> Execute the v3.9.4 directive at `docs/directives/v3-9-4-cognitive-pre-flight-and-prototype-match-2026-05-14.md` plus Amendment A at `docs/directives/v3-9-4-AMENDMENT-A-citation-briefs-003-004-registration-2026-05-14.md`. All §3 gates are pre-approved (10-point Prototype Match rubric · "Self-Evidence ≥ 7/10" Stage 0 label · Briefs #003 + #004 included in cycle). Run §0 pre-flight, then execute §4 in order T1 → T3 → T2 → T5 → T4 → T6 with verification before each deploy. Follow the v3.9.3 cycle's standard reporting back at §7. Tag v3.9.4. IndexNow on every changed URL.

---

## §0 · Pre-flight (run every item; abort if any fails)

```bash
# 0.1 — Working directory MUST be canonical wielegroup.com repo
cd "/Users/jonathanlandman/Documents/Claude/Projects/Wiele Group Operations/wielegroup.com"
pwd
# Expect EXACTLY: /Users/jonathanlandman/Documents/Claude/Projects/Wiele Group Operations/wielegroup.com

# 0.2 — Confirm git is on main, clean tree
git rev-parse --abbrev-ref HEAD
# Expect: main

git status --short
# Expect: empty. (If non-empty, ABORT — Commit-Before-Deploy Law in force.)

git log --oneline -5
# Expect: top commit references v3.9.3 cycle close (Citation Score™ productized, Brief #002 live)

# 0.3 — Confirm Node + wrangler + next available
node -v          # Expect: v22+ or v24+
ls node_modules/.bin/wrangler && echo wrangler:ok
ls node_modules/.bin/next     && echo next:ok

# 0.4 — Confirm last shipped state — homepage carries v3.9.3 canon
curl -s -A 'Mozilla/5.0' https://wielegroup.com/ \
  | grep -oE '<title>[^<]+</title>'
# Expect title contains: "Citation, not clicks. We engineer the brand AI engines choose."

# 0.5 — Confirm Citation Score™ tiers live (v3.9.3 cycle floor)
curl -s -A 'Mozilla/5.0' https://wielegroup.com/pricing \
  | grep -oE 'Citation Score' | wc -l
# Expect: >= 3 (one per tier card minimum)

# 0.6 — Confirm Brief #001 + #002 live
for slug in how-agencies-get-cited-in-ai-answers stage-3-structured-extractability; do
  curl -s -A 'Mozilla/5.0' -o /dev/null -w "%{http_code} $slug\n" \
    "https://wielegroup.com/citation-brief/$slug"
done
# Expect: 200 on both

# 0.7 — Confirm /platform carries the Five-Stage Citation Hierarchy reference
curl -s -A 'Mozilla/5.0' https://wielegroup.com/platform \
  | grep -oE 'Five-Stage Citation Hierarchy' | head -1
# Expect: 1 match

# 0.8 — Verify package.json scripts surface (Task 1 target)
grep -E '"(pre)?deploy:cf"' package.json
# Expect: deploy:cf present · predeploy:cf may or may not exist (Task 1 will add)

# 0.9 — Verify mtime spot-check on key surfaces
stat -f '%Sm' src/data/citation-score.ts src/app/platform/page.tsx \
  src/content/citation-briefs/how-agencies-get-cited-in-ai-answers.mdx 2>/dev/null
# Expect: all timestamped within last 24-48h (post v3.9.3 ship)
```

**If any check fails, STOP. Do not improvise. Report the failure to the founder
inline. Resume only after the founder approves a remediation step.**

---

## §1 · Mission

Codify the cognitive pre-flight gates surfaced by the /L99 Cognitive Psychology
& Design Canon (Cowan 4-chunk cap, Whalen Six Minds, Krug Trunk Test), upgrade
Citation Score™ §2 (On-Page Extractability) with the new Prototype Match
sub-metric anchored on Jones et al. 2015 + Loken Handbook prototypicality, add
Stage 0 (Self-Evidence ≥ 7/10) as the gating prerequisite to the Five-Stage
Citation Hierarchy, and close the queued `predeploy:cf` git-clean guard from the
v3.9.3 Commit-Before-Deploy Law. Five tasks. Same ship surface (wielegroup.com).
No new SaaS. Every change is doctrine compounding — Wiele owns the cognitive
substrate of AEO before competitors notice the canon exists.

---

## §2 · Hard constraints (binding laws — non-negotiable)

| # | Law | Applied here |
|---|-----|--------------|
| 1 | Single-source-of-truth | Ship to canonical wielegroup.com only. NEVER any worktree. |
| 2 | Live-or-Nothing | Only curl-verified live state counts as "shipped." Run `curl -A 'Mozilla/5.0' <url>` after every deploy. |
| 3 | Shipped-vs-Drafted Precision | "Shipped" = LIVE on wielegroup.com. Drafting to filesystem is NOT shipping. |
| 4 | Pre-Revenue Free-Tier Constraint | No paid SaaS additions. No new third-party scripts. No new lint plugins requiring license. Documentation-grade enforcement only for cognitive rules (manual audit until first revenue). |
| 5 | Distribution Handoff | Every changed surface gets: sitemap entry verified · IndexNow ping confirmed · schema parity checked. |
| 6 | Image File Naming + Alt-Text SEO | If any image is touched in this cycle: `wiele-{topic}-{angle}-{context}.{ext}` + 80–125 char alt. |
| 7 | No-Bombardment | Terse status reports. `On it. → Done.` posture. No mid-flight narration. |
| 8 | Best-Action-or-Burn | Pre-action 4-gate before every task: 100% positive · best for Wiele · current data · strategised. |
| 9 | Recon-FIRST-Write-SECOND | Read every file you will modify BEFORE editing. Cross-surface scan before bulk changes. |
| 10 | Authority Decays with Delay | Acknowledge with `On it.` and ship. Report at completion, not mid-flight. |
| 11 | **Commit-Before-Deploy** | NEVER `npm run deploy:cf` with a dirty tree. Task 1 of this directive ENFORCES this law in `package.json`. |
| 12 | **MDX Static-Import Law (Phase 7.4)** | Any MDX route touch uses static imports keyed by slug → component map. NEVER dynamic-import MDX under OpenNext/Workers. |
| 13 | **Schema-Count Grep Trap** | When counting JSON-LD schemas, grep for `<script[^>]*type="application/ld\+json"` opening tags. Bare MIME-string occurrences inflate under Next 16 RSC streams. |
| 14 | **British English** | All prose ("optimise", "behaviour", "colour", "centre", "recognise"). American spellings in code identifiers stay (e.g. `color: '#3b82f6'` in CSS). |

---

## §3 · Founder decision gates — **ALL APPROVED 2026-05-14 evening**

Founder responded "APPROVED" to the surfaced gates with all proposed defaults.
Locked-in values below. Claude Code executes the affected tasks directly — no
pause required.

```
GATE 1 — Prototype Match scoring rubric scale
  [✓] 10-point (as proposed) — APPROVED 2026-05-14 evening
  [ ] 5-point (collapse)
  [ ] Edit: ____________________

  → Task 4 uses the 10-point rubric block verbatim. Do NOT substitute the
    5-point fallback. Do NOT pause Task 4 for further confirmation.

GATE 2 — Stage 0 label on the Five-Stage Citation Hierarchy
  [✓] "Self-Evidence ≥ 7/10" (as proposed) — APPROVED 2026-05-14 evening
  [ ] "Read-Through Floor"
  [ ] Edit: ____________________

  → Task 5 uses the exact label "Stage 0 — Self-Evidence ≥ 7/10" everywhere
    (/platform Stage 0 block, Brief #001 hierarchy update, Brief #002 intro
    note). Do NOT use the "Read-Through Floor" alternative.

GATE 3 — Citation Brief #003 + #004 inclusion in v3.9.4 cycle
  [✓] Both in v3.9.4 (recommended) — APPROVED 2026-05-14 evening
  [ ] Hold both for v3.9.5
  [ ] Ship #003 only this cycle

  → Task 6 (registration + deploy) defined in v3-9-4-AMENDMENT-A. Both briefs
    are already drafted at:
      - src/content/citation-briefs/aeo-is-the-2026-wcag.mdx (~3,500w)
      - src/content/citation-briefs/two-tier-access-doctrine.mdx (~3,050w)
    Execution order updates from T1→T3→T2→T5→T4 to T1→T3→T2→T5→T4→T6.
```

**Approval provenance.** "APPROVED" message received by Cowork 2026-05-14 evening
in direct response to the gate surface. Recorded under Autonomous Judgment
Authority (elevated 2026-05-14 morning). No further founder relay required for
v3.9.4 task execution — Claude Code proceeds.

---

## §4 · Tasks

Five tasks. Each uses the SAME sub-structure:
- **Why** — strategic rationale
- **Pre-reads** — files Claude Code MUST `Read` before editing (Recon-First law)
- **Files to create / edit / delete** — explicit paths
- **Implementation notes** — code patterns, snippets, constraints
- **Acceptance criteria** — pass/fail checklist
- **Verification commands** — exact commands to run after the edit
- **Commit message** — exact text to use in the commit
- **Deploy** — per-item or batched

Execution order (updated post-approval): **Task 1 → Task 3 → Task 2 → Task 5 → Task 4 → Task 6** (Task 6 from Amendment A). Task 1 first because it gates every subsequent deploy. Task 3 second because it ledgers the gates. Task 2 third because it documents the rule the remaining surfaces must conform to. Task 5 fourth because Stage 0 changes the hierarchy that Task 4's Prototype Match sub-metric will reference. Task 4 fifth. **Task 6 last because Briefs #003 + #004 reference Stage 0 (T5) and the Citation Score™ surface (T4) — both must exist before the briefs link to them.**

---

### §4.T1 · Add `predeploy:cf` git-clean guard in `package.json` · **GO**

**Why.** v3.9.3 launch shipped Worker `b8513737` against a dirty tree. Claude
Code's pre-flight caught the drift. The Commit-Before-Deploy Law was codified
(`feedback_commit_before_deploy_law.md`) and the permanent fix queued for the
next directive. This is that fix. Once landed, `npm run deploy:cf` aborts fast
with a readable message if the working tree is dirty — no more git/live drift.

**Pre-reads.**
- `package.json` (root of `wielegroup.com/`) — scripts block

**Files to edit.**
- `package.json`

**Files to create.** None.

**Implementation notes.**

npm runs `pre<scriptname>` automatically before `<scriptname>`. The guard must
fail with a CLEAR message and exit code ≥1. Use this exact snippet (insert
ABOVE `"deploy:cf"` in the scripts block):

```json
    "predeploy:cf": "git diff --quiet HEAD || (echo '\\033[31mABORT — working tree dirty. Commit + tag before deploy (Commit-Before-Deploy Law, v3.9.3).\\033[0m' && exit 1)",
```

If colour escapes break on the host shell, fall back to plain text:

```json
    "predeploy:cf": "git diff --quiet HEAD || (echo 'ABORT — working tree dirty. Commit + tag before deploy (Commit-Before-Deploy Law, v3.9.3).' && exit 1)",
```

`git diff --quiet HEAD` covers both staged AND unstaged changes against the
last commit, which is what we want. (It does NOT block untracked files — those
are allowed; only modified-tracked content blocks the deploy.)

**Acceptance criteria.**

- [ ] `predeploy:cf` script exists in `package.json`, sits ABOVE `deploy:cf`.
- [ ] Running `npm run deploy:cf` with a clean tree proceeds normally.
- [ ] Running `npm run deploy:cf` with a dirty tree (e.g. `echo x > test-dirty.txt && git add test-dirty.txt`) aborts with the readable message AND exits non-zero BEFORE `next build` starts.
- [ ] `npm run lint` clean. `npm run typecheck` clean.
- [ ] Untracked files alone do NOT trigger the guard (verify with `touch test-untracked.txt && npm run deploy:cf -- --dry-run` mental check — guard fires only on tracked changes).

**Verification commands.**

```bash
# 1. Confirm script presence
grep -E '"predeploy:cf"' package.json
# Expect: line matches with the guard

# 2. Confirm script position (predeploy must appear before deploy)
grep -nE '"(pre)?deploy:cf"' package.json
# Expect: predeploy:cf line number < deploy:cf line number

# 3. Smoke-test on a dirty tree (DO NOT actually deploy)
echo "test" > /tmp/wiele-guard-smoke.txt
cp /tmp/wiele-guard-smoke.txt ./PRE_DEPLOY_GUARD_SMOKE.tmp
git add PRE_DEPLOY_GUARD_SMOKE.tmp
# Run only the predeploy hook to simulate (DOES NOT BUILD OR DEPLOY)
npm run predeploy:cf 2>&1 | head -5
# Expect: "ABORT — working tree dirty..." line and non-zero exit
git reset HEAD PRE_DEPLOY_GUARD_SMOKE.tmp
rm PRE_DEPLOY_GUARD_SMOKE.tmp
# Tree clean again — verify
git status --short
# Expect: empty

# 4. Smoke-test on a clean tree
npm run predeploy:cf
# Expect: exit 0, no message
```

**Commit message.**

```
feat(deploy): add predeploy:cf git-clean guard (Commit-Before-Deploy Law)

Closes the queued permanent fix from v3.9.3 cycle. npm runs predeploy:cf
automatically before deploy:cf. Guard runs `git diff --quiet HEAD` and
aborts with a readable message + non-zero exit if the tree is dirty.

Catches: uncommitted edits, staged-but-uncommitted changes, accidental
deploy after pulling from another machine. Allows: untracked files
(intentional — scratch/scratch.tmp doesn't block ship).

Triggered by: v3.9.3 launch shipping Worker b8513737 without commit;
caught by Claude Code's §0 pre-flight on the next session. Permanent
solve per feedback_commit_before_deploy_law.md.
```

**Deploy.** No deploy required — `package.json` change is repo-only. Commit + tag.

```bash
git add package.json
git commit -m "<above message>"
git tag -a v3.9.4-predeploy-guard -m "predeploy:cf git-clean guard live"
git push origin main
git push origin v3.9.4-predeploy-guard
```

---

### §4.T2 · Document Cowan 4-chunk vertical-list cap across page templates · **GO**

**Why.** Cowan's 4-chunk working-memory limit (revised down from Miller 7±2) is
the cog-psych floor for all 2026 Wiele content. The /L99 canon binds this as
Rule 1: "Cap any vertical principle list at 4 chunks visible per viewport."
Citation Briefs already comply by structure; landing pages and SKU pages are
unaudited. Documentation-grade rule (per pre-revenue free-tier constraint —
no paid lint plugins). Future v3.9.x can add an eslint rule when revenue lands.

**Pre-reads.**
- `src/content/citation-briefs/how-agencies-get-cited-in-ai-answers.mdx` — exemplar compliant template
- `src/content/citation-briefs/stage-3-structured-extractability.mdx` — Brief #002 (verify compliance)
- `src/app/page.tsx` — homepage (audit for >4-item lists)
- `src/app/audit/page.tsx` — /audit page (audit)
- `src/app/platform/page.tsx` — /platform page (audit, esp. Five-Stage Citation Hierarchy block)
- `src/app/citation-brief/[slug]/page.tsx` — dynamic brief layout
- `src/data/citation-score.ts` — inclusions arrays (currently ≤7 bullets per tier — flag if any tier exceeds 4 visible)

**Files to edit.**
- `src/content/citation-briefs/how-agencies-get-cited-in-ai-answers.mdx` — add HTML-style comment at top of frontmatter body: `{/* Cowan 4-chunk rule: max 4 visible items per vertical list in any viewport. Split into columns, numbered tables, or H3 sub-blocks when exceeded. */}`
- `src/content/citation-briefs/stage-3-structured-extractability.mdx` — same comment
- `src/app/page.tsx` — add a comment block at the top of the file (above imports): `// COGNITIVE PRE-FLIGHT (v3.9.4): Cowan 4-chunk rule — max 4 visible items per vertical list per viewport. /L99 binding.`
- `src/app/audit/page.tsx` — same comment
- `src/app/platform/page.tsx` — same comment
- `src/app/citation-brief/[slug]/page.tsx` — same comment
- `src/app/pricing/page.tsx` — same comment (Citation Score™ tier inclusions are the most-at-risk surface; flag if any tier has >4 visible bullets above the fold)

**Files to create.** None in this task. (Task 3 creates `docs/PRE_DEPLOY_CHECKLIST.md` which references this rule.)

**Implementation notes.**

This is documentation + manual audit, NOT lint-enforced.

Audit method:
1. For each surface in the pre-reads, count items in every vertical `<ul>`, `<ol>`, or list-styled `<div>` that appears within the FIRST viewport (assume 900px desktop / 700px mobile, hero + first scroll-block).
2. If count > 4 in a single visible block: split into two columns, OR use a numbered table, OR split into multiple H3 sub-blocks.
3. Citation Score™ tier inclusion bullets: each tier currently has 5–7 bullets per `src/data/citation-score.ts`. These are NOT a single-viewport list (the three tiers appear side-by-side) — each card's bullets only display 5–7 items per card, which is acceptable because each card is its own working-memory chunk. **No edit needed on `citation-score.ts`** — note the rationale in the commit message.

For surfaces that already comply (Briefs #001 and #002, /audit, /platform):
- Add the comment marker ONLY. Do not refactor compliant content.

For surfaces that violate:
- Refactor minimally. Document the change in the commit message.

**Acceptance criteria.**

- [ ] All seven listed files carry the cognitive-pre-flight comment marker.
- [ ] `grep -rn "Cowan 4-chunk" src/` returns ≥7 hits.
- [ ] Manual audit pass: no single-viewport vertical list with >4 visible items on /, /audit, /platform, /pricing, /citation-brief/* (document any exception with explicit rationale in commit message).
- [ ] `npm run lint` clean. `npm run typecheck` clean. `npm run build:cf` clean.
- [ ] No visual regression on any of the audited pages (curl-diff H1 + first 200 chars before/after).

**Verification commands.**

```bash
# Comment marker presence across the audited surfaces
grep -rn "Cowan 4-chunk" src/ | wc -l
# Expect: >= 7

# Live page check — Citation Score™ tier inclusions render correctly
curl -s -A 'Mozilla/5.0' https://wielegroup.com/pricing \
  | grep -oE 'Citation Score' | wc -l
# Expect: >= 3

# Live page check — /platform Five-Stage Hierarchy unchanged
curl -s -A 'Mozilla/5.0' https://wielegroup.com/platform \
  | grep -oE 'Five-Stage Citation Hierarchy' | wc -l
# Expect: >= 1

# Live page check — Briefs still render
for slug in how-agencies-get-cited-in-ai-answers stage-3-structured-extractability; do
  curl -s -A 'Mozilla/5.0' -o /dev/null -w "%{http_code} $slug\n" \
    "https://wielegroup.com/citation-brief/$slug"
done
# Expect: 200 on both
```

**Commit message.**

```
docs(cognitive-preflight): codify Cowan 4-chunk vertical-list cap across templates

/L99 Cognitive Psychology & Design Canon Rule 1: max 4 visible items per
vertical list per viewport. Documentation-grade marker added to seven
canonical surfaces (homepage, /audit, /platform, /pricing, /citation-brief
dynamic route, Briefs #001 + #002).

Manual audit: all surfaces compliant. Citation Score™ tier cards each carry
5-7 bullets per card; each card is its own working-memory chunk (the three
cards display side-by-side, not as one stacked list), so the rule is
respected at the visible-block level.

Lint-enforced rule deferred until first revenue lifts the pre-revenue
free-tier SaaS constraint (eslint plugin + custom AST rule queued).

Cog-psych anchor: Cowan 2001 — "The magical number 4 in short-term memory:
A reconsideration of mental storage capacity." Binds via canon refresh
2026-08-14.
```

**Deploy.** Bundle with Task 3 (both are pre-deploy gate work; no live content change).

---

### §4.T3 · Create `docs/PRE_DEPLOY_CHECKLIST.md` with Six Minds + Trunk Test gates · **GO**

**Why.** /L99 canon Rules 10 and 25 require Krug's Trunk Test and Whalen's Six
Minds as pre-deploy gates for every new or substantially-changed page. Without
a written checklist, the gates live in tribal memory and fail under handoff
pressure. v3.9.5+ directives' §0 pre-flight will reference this file directly —
making the gates load-bearing across every future ship.

**Pre-reads.**
- `docs/directives/v3-9-3-claude-code-directive-2026-05-14.md` — current pre-flight pattern
- `feedback_claude_code_directive_standard_2026_05_14.md` — directive standard
- `reference_cognitive_psychology_design_canon_2026_05_14.md` — Six Minds + Trunk Test canonical wording
- `src/app/page.tsx` · `src/app/audit/page.tsx` · `src/app/platform/page.tsx` — three exemplar pages the checklist must pass against on first use

**Files to create.**
- `docs/PRE_DEPLOY_CHECKLIST.md`

**Files to edit.** None in this task (v3.9.5 directive will reference the file from §0).

**Implementation notes.**

The checklist is a single markdown file, ≤300 lines, structured for line-by-line
copy-paste into a v3.9.5+ directive's §0 pre-flight. It must:

1. Open with a one-paragraph **purpose** statement citing /L99 canon Rules 10 and 25.
2. Carry a **Six Minds Pre-Flight** section listing the six minds (Vision · Wayfinding · Memory · Language · Decision-Making · Emotion) with a one-sentence test + a one-paragraph rationale for each, anchored on Whalen 2019 *Design for How People Think*.
3. Carry a **Trunk Test** section listing the six 5-second answers (site identity · page identity · primary sections · current location · CTA · buyer-journey position) anchored on Krug *Don't Make Me Think*.
4. Carry a **How to apply** section: for every new or substantially-changed page (>20% content delta), the author/agent writes a one-paragraph note for each of the Six Minds and confirms each Trunk Test answer is verifiable within 5 seconds of page load. Failures trigger rewrite, not ship.
5. Cross-reference: link to the master canon file (memory path — Cowork-only; Claude Code will not have repo access to it) AND to the relevant /L99 binding rules by number.
6. End with an example: apply the checklist to `/audit` and note pass/fail per dimension.

Use the following EXACT structure (paste verbatim into `docs/PRE_DEPLOY_CHECKLIST.md`):

```markdown
# Pre-Deploy Checklist — Cognitive Gates (binding from v3.9.5)

**Authority:** /L99 Cognitive Psychology & Design Canon (2026-05-14) Rules 10 and 25.
**Binds:** every new or substantially-changed (>20% content delta) page on wielegroup.com.
**Failure mode:** rewrite, not ship. A page that fails any gate does not deploy.

## 1. Trunk Test (Krug · 5-second self-evidence gate)

Within 5 seconds of viewing the page, the reader can answer ALL of:

1. **Site identity** — what site am I on?
2. **Page identity** — what page is this?
3. **Primary sections** — what are the main sections of the site?
4. **Current location** — where in the site/section am I?
5. **CTA** — what is the page asking me to do?
6. **Buyer-journey position** — where am I in the path from problem-aware to purchase?

**Rationale.** Krug's First Law: pages must be self-evident. A page that demands
elaborated thought before its purpose is clear has already lost the high-elaboration
ICP-A reader who scanned and bounced. Self-Evidence ≥ 7/10 (Stage 0 of the
Five-Stage Citation Hierarchy) is the same idea, scored.

**How to apply.** Author/agent loads the page (incognito or fresh-session)
and times themselves. If any answer requires >5 seconds OR is wrong, rewrite.

## 2. Six Minds Pre-Flight (Whalen · audit grid)

For every new or substantially-changed page, write a one-paragraph note for each
of the six minds. The page does NOT deploy until every mind passes.

1. **Vision** — Does the layout direct the eye to the right element first? F-pattern / Z-pattern respected? CTA emphasis ≥3 of Beaird's 5 (Placement · Continuance · Isolation · Contrast · Proportion)?
2. **Wayfinding** — Can the reader tell where they are in the site, and how to get to the next obvious step? Breadcrumbs / nav state / clear CTA destination?
3. **Memory** — Is the working-memory budget respected? Cowan 4-chunk rule observed in every visible block? Paragraphs ≤3 sentences? Sentences ≤18 words?
4. **Language** — Is the prose pitched for the high-elaboration ICP-A buyer (central-route ELM)? Named frameworks present? Argument quality high? Jargon-without-payoff stripped?
5. **Decision-Making** — Is the reader given enough specific, named evidence (case studies, methodology, version trails) to choose Wiele over the next option? CTA destination matched to the decision stage?
6. **Emotion** — Does the page land the Wiele brand mood (premium clarity · obsidian-and-electric-blue authority) without overwrought aesthetic? No emotional dead-ends (e.g. cold pricing without context)?

**Rationale.** Whalen 2019: each mind processes input differently; a page that
satisfies Vision but fails Memory loses scannability; one that satisfies Memory
but fails Decision-Making loses conversion. The grid forces author/agent to
audit all six rather than the one they're naturally biased toward.

**How to apply.** Inline notes block inside the directive task at ship time:

```
SIX MINDS — /platform (v3.9.4 ship)
- Vision: PASS — H1 + lede + CTA stack visible above fold; CTA carries 4 of 5 Beaird emphasis tools.
- Wayfinding: PASS — primary nav highlights /platform; breadcrumb present.
- Memory: PASS — Five-Stage list now displays as 5 chunks; Stage 0 added as gating prerequisite.
- Language: PASS — central-route framing; no peripheral aesthetic-only sections.
- Decision-Making: PASS — links to /audit and /pricing#recurring-ai-visibility at section boundaries.
- Emotion: PASS — obsidian + electric-blue; no emotional dead-ends.
```

## 3. Worked example — apply both gates to `/audit`

**Trunk Test on /audit.**
1. Site identity — Wiele Group (logo top-left, footer brand line). PASS.
2. Page identity — Wiele AI Visibility Audit. PASS.
3. Primary sections — H2 "Method," H2 "Output," H2 "Pricing." PASS.
4. Current location — primary nav highlights /audit. PASS.
5. CTA — book the audit. PASS.
6. Buyer-journey position — consideration → close. PASS.

**Six Minds on /audit.**
- Vision: hero + CTA + method visible above fold. PASS.
- Wayfinding: breadcrumb + nav state. PASS.
- Memory: list blocks ≤4 items per viewport. PASS.
- Language: named methodology + case-study evidence. PASS.
- Decision-Making: CTA destination is the booking form; cross-link to /pricing for tier context. PASS.
- Emotion: premium clarity; no overwrought hype. PASS.

`/audit` ships clean. Future substantial edits re-run both gates.

## 4. Future enforcement (queued, post-revenue)

When first £10k/mo recurring lands, queue:
- Eslint custom rule: flag `<ul>` and `<ol>` with >4 immediate children within any element matching `:not([data-layout="columns"])`.
- Pre-commit hook: prompt for Six Minds note when files under `src/app/**/page.tsx` are modified.
- Playwright snapshot: visual diff alerts when first-fold composition changes >20%.

Pre-revenue: documentation + manual gate only.

## 5. Anchors

- Cowan 2001 — *The magical number 4 in short-term memory.*
- Krug — *Don't Make Me Think* (Trunk Test · Self-Evidence ≥ 7/10).
- Whalen — *Design for How People Think* (2019) (Six Minds).
- /L99 master canon — Cowork memory: `reference_cognitive_psychology_design_canon_2026_05_14.md` (binding rules 1-30, Rules 10 and 25 are this checklist's source).
- Wiele Five-Stage Citation Hierarchy + Stage 0 (Self-Evidence ≥ 7/10) — `/platform` page on wielegroup.com.
```

**Acceptance criteria.**

- [ ] `docs/PRE_DEPLOY_CHECKLIST.md` exists, ≤300 lines, matches the structure above.
- [ ] Both gates (Trunk Test + Six Minds) carry one-paragraph rationale linking to canonical anchors.
- [ ] Worked example (/audit) shows both gates applied.
- [ ] File is referenced from the next-cycle directive (v3.9.5) §0 pre-flight — note for Cowork, not Claude Code.
- [ ] `grep -c "Six Minds" docs/PRE_DEPLOY_CHECKLIST.md` ≥ 3.
- [ ] `grep -c "Trunk Test" docs/PRE_DEPLOY_CHECKLIST.md` ≥ 3.

**Verification commands.**

```bash
# File exists at the expected path
ls -la docs/PRE_DEPLOY_CHECKLIST.md
# Expect: file present, <30KB

# Both gates referenced
grep -c "Six Minds" docs/PRE_DEPLOY_CHECKLIST.md
# Expect: >= 3

grep -c "Trunk Test" docs/PRE_DEPLOY_CHECKLIST.md
# Expect: >= 3

# Worked example present
grep -c "/audit" docs/PRE_DEPLOY_CHECKLIST.md
# Expect: >= 1
```

**Commit message.**

```
docs(pre-deploy): cognitive gates checklist — Trunk Test + Six Minds (v3.9.5+)

Codifies /L99 canon Rules 10 (Krug Trunk Test) and 25 (Whalen Six Minds)
as binding pre-deploy gates for every new or substantially-changed page
on wielegroup.com. Documentation-grade enforcement (pre-revenue free-tier
constraint forbids paid lint plugins); manual gate now, automated when
first revenue lands.

Includes:
- Trunk Test: six 5-second self-evidence answers per Krug *Don't Make Me Think*.
- Six Minds: Vision · Wayfinding · Memory · Language · Decision-Making · Emotion
  audit grid per Whalen 2019 *Design for How People Think*.
- Worked example: both gates applied to /audit (PASS on every dimension).
- Queued post-revenue enforcement: eslint rule, pre-commit hook, Playwright
  snapshot diff.

Referenced from v3.9.5+ directive §0 pre-flight. /audit pass documented as
the reference exemplar.
```

**Deploy.** Bundle with Task 1 deploy (no live content change; commit + tag).

---

### §4.T4 · Citation Score™ §2 Prototype Match sub-metric · **GO (Gate 1 controls rubric scale)**

**Why.** /L99 canon Rule 18 (Jones et al. 2015) + Rule 21 (Loken prototypicality)
converge: 50ms first-impression encoding is driven by prototypicality, moderate
visual complexity, and processing fluency. Citation Score™ §2 (On-Page
Extractability) is the natural surface for a Prototype Match Score sub-metric.
The §2 surface currently does NOT yet exist as a dedicated methodology page —
the SKU lives in `src/data/citation-score.ts` + `src/components/sections/recurring-ai-visibility-tiers.tsx`,
and the brand of Citation Score™ is articulated in Brief #001 lines 57, 226, 297.
Task 4 creates the methodology surface and embeds the Prototype Match sub-metric.

**Pre-reads.**
- `src/data/citation-score.ts` — SKU data
- `src/components/sections/recurring-ai-visibility-tiers.tsx` — SKU display
- `src/app/pricing/page.tsx` — where the SKU lives today
- `src/content/citation-briefs/how-agencies-get-cited-in-ai-answers.mdx` — Brief #001, references Citation Score™ at lines 57, 226, 297
- `src/content/citation-briefs/stage-3-structured-extractability.mdx` — Brief #002
- `src/app/labs/[slug]/page.tsx` — gold-standard SSG + JSON-LD pattern (Phase 7.4 static-import compliant)
- `src/app/citation-brief/[slug]/page.tsx` — current MDX dynamic-route pattern
- `src/lib/schema.ts` — schema helpers
- `reference_cognitive_psychology_design_canon_2026_05_14.md` (Cowork memory; Cowork to inline the relevant excerpt below)

**Recon question — Claude Code to answer in §7 report before editing.**
Does a dedicated /citation-score methodology page exist? Run:
```bash
ls -la src/app/citation-score/ 2>/dev/null
find src/content -iname "citation-score*" -type f
grep -rn "On-Page Extractability" src/ | head
```
- If a /citation-score surface exists: edit it.
- If NOT: create it as a new MDX-backed page following the Brief pattern (see Files to create below).

**Files to create (if /citation-score surface does NOT exist).**
- `src/app/citation-score/page.tsx` — methodology page
- `src/content/citation-score/methodology.mdx` — methodology content with the four §s (§1 Engine Coverage · §2 On-Page Extractability · §3 Citation Velocity · §4 Recommendation History)
- `src/lib/citation-score-static.ts` — manifest (if multi-page methodology splits emerge later)

**Files to edit.**
- `src/data/citation-score.ts` — add a `methodologyHref` field if it makes sense, OR just rely on the page existing at `/citation-score`. (Recon-First — read the file before deciding.)
- `src/components/sections/recurring-ai-visibility-tiers.tsx` — add a "See methodology →" link to `/citation-score` below the three tier cards.
- `src/app/pricing/page.tsx` — confirm anchor `#recurring-ai-visibility` remains valid.
- `src/app/sitemap.ts` — add `/citation-score` route entry.
- `scripts/gen-static-route-lastmod.mjs` — add `/citation-score` to `STATIC_ROUTES`.

**Implementation notes.**

§2 (On-Page Extractability) explanation in the MDX body must include the
Prototype Match sub-metric. Use this EXACT prose block (paste verbatim, with
the rubric scale from Gate 1 — default 10-point):

```markdown
## §2 · On-Page Extractability

How well a page is structured for direct extraction by AI answer engines.
Inputs: schema completeness, heading hierarchy clarity, definitive-opener
presence, paragraph-block scannability, semantic-HTML correctness.

### Sub-metric — Prototype Match Score

How closely the page matches the prototypical exemplar of the content
category it claims to occupy ("AEO audit content," "agency pricing page,"
"citation-method explainer"). Anchored on Jones et al. (2015) — the
50ms first-impression study found that prototypicality, moderate visual
complexity, and processing fluency drive memorable encoding — and
Loken Handbook prototypicality theory (brands ARE categories; the
prototypical exemplar wins on attention, attitude-accessibility, and
automatic choice).

**Rubric (10-point scale).**

| Score | Description |
|-------|-------------|
| 0–3   | **Atypical or chaotic.** Page does not register as the category it claims; first-impression encoding fails; LLM extraction misroutes the page to an adjacent or wrong category. |
| 4–6   | **Partial match.** Some prototypical elements present (heading shape, schema bundle), but layout or copy violates category expectations. LLM extraction succeeds but at higher cost; competitor pages outrank on prototype-match basis. |
| 7–9   | **High prototypicality.** Page reads as a strong exemplar of its category. LLM extraction is fast and high-confidence; first-impression encoding succeeds within Jones et al.'s 50ms window. |
| 10    | **Reference exemplar.** The page IS the category. Competitors implicitly cite the structure. LLM training data treats it as the prototypical case. (Wiele targets this for every flagship surface.) |

**How Wiele scores it.** Manual rubric against the canonical-exemplar set
maintained in our Intelligence Library. A Citation Score™ Authority-tier
subscriber receives a Prototype Match audit on every flagship page once per
quarter; Pro receives biannually; Starter receives the score but not the
audit narrative.
```

If Gate 1 collapses the rubric to 5-point, replace the table with:

```markdown
| Score | Description |
|-------|-------------|
| 1     | Atypical/chaotic — category misroute. |
| 2     | Partial match — prototypical elements present but layout violates expectations. |
| 3     | Acceptable — clear category membership; some prototypicality gaps. |
| 4     | High prototypicality — strong exemplar; fast LLM extraction. |
| 5     | Reference exemplar — the page IS the category. |
```

JSON-LD: the methodology page wires `Article` + `Breadcrumb` schemas
(skip `FAQPage` unless founder wants a top-level FAQ section). Mirror
the Brief #001 pattern (4 schemas → keep to 2 for methodology).

Phase 7.4 reminder: if the methodology page imports the MDX, use a STATIC
import. NEVER dynamic-import under OpenNext/Workers.

**Acceptance criteria.**

- [ ] `/citation-score` (or the surface chosen by Recon) renders the §2 section with the Prototype Match sub-metric.
- [ ] Rubric appears as a markdown table inside §2 with the scale chosen by Gate 1 (10-point default, 5-point fallback).
- [ ] Methodology page is sitemap-listed (`<loc>https://wielegroup.com/citation-score</loc>` in sitemap.xml).
- [ ] IndexNow ping confirmed on deploy (`[indexnow] ✓ submitted (200)` in stdout).
- [ ] "See methodology →" link visible below the three tier cards on /pricing, pointing to `/citation-score`.
- [ ] Brief #001's mentions of Citation Score™ (lines 57, 226, 297) link to `/citation-score` (cross-reference fix — minimal copy change).
- [ ] `npm run lint && npm run typecheck && npm run build:cf` clean.
- [ ] Schema parity: methodology page carries 2 JSON-LD blocks (Article + Breadcrumb).

**Verification commands.**

```bash
# Live status
curl -s -A 'Mozilla/5.0' -o /dev/null -w '%{http_code}\n' \
  https://wielegroup.com/citation-score
# Expect: 200

# Prototype Match visible
curl -s -A 'Mozilla/5.0' https://wielegroup.com/citation-score \
  | grep -oE 'Prototype Match' | wc -l
# Expect: >= 1

# Sitemap inclusion
curl -s -A 'Mozilla/5.0' https://wielegroup.com/sitemap.xml \
  | grep -c "citation-score"
# Expect: >= 1

# Schema count (opening-tag grep, NOT bare MIME string)
curl -s -A 'Mozilla/5.0' https://wielegroup.com/citation-score \
  | grep -oE '<script[^>]*type="application/ld\+json"' | wc -l
# Expect: 2

# Cross-link from /pricing
curl -s -A 'Mozilla/5.0' https://wielegroup.com/pricing \
  | grep -oE 'href="/citation-score"' | head -1
# Expect: 1 match

# Brief #001 cross-link updated
curl -s -A 'Mozilla/5.0' https://wielegroup.com/citation-brief/how-agencies-get-cited-in-ai-answers \
  | grep -oE 'href="/citation-score"' | head -1
# Expect: 1 match
```

**Commit message.**

```
feat(citation-score): methodology surface + Prototype Match sub-metric (§2)

Productizes the Citation Score™ methodology at /citation-score (previously
implicit in Brief #001). Four sections — §1 Engine Coverage · §2 On-Page
Extractability · §3 Citation Velocity · §4 Recommendation History — each
with sub-metrics.

New sub-metric in §2: **Prototype Match Score** — cog-psych grounded on
Jones et al. 2015 (50ms first-impression encoding driven by prototypicality
+ moderate visual complexity + processing fluency) and Loken Handbook
prototypicality theory (brands ARE categories; the prototypical exemplar
wins). 10-point rubric (founder-approved 2026-05-14 v3.9.4 Gate 1).

Tier deliverables: Authority audits flagship pages quarterly; Pro
biannually; Starter receives the score number without the audit narrative.

Cross-links: /pricing → /citation-score (See methodology →); Brief #001
references rewired to point at /citation-score for the methodology spine.
Schema bundle: Article + Breadcrumb. Sitemap + IndexNow updated.

Anchors: /L99 canon Rules 18, 21. Refresh 2026-08-14.
```

**Deploy.** Per-item — methodology page is a significant live surface; deploy + curl-verify before moving to Task 5.

---

### §4.T5 · Add Stage 0 (Self-Evidence ≥ 7/10) to Five-Stage Citation Hierarchy · **GO (Gate 2 controls label)**

**Why.** /L99 canon Rule 11: pages scoring below 7/10 on Krug's First Law
(self-evidence) get rewritten, not shipped. The Five-Stage Citation Hierarchy
currently has no gating prerequisite — Stage 1 assumes the page is at least
self-evident. /L99 surfaced the gap. Stage 0 closes it. /platform is the canonical
hierarchy surface; Briefs #001 and #002 reference the hierarchy and need
matching updates.

**Pre-reads.**
- `src/app/platform/page.tsx` — primary surface for the hierarchy
- `src/content/citation-briefs/how-agencies-get-cited-in-ai-answers.mdx` — Brief #001 (line 65 references the hierarchy; line 244 references Stage 3)
- `src/content/citation-briefs/stage-3-structured-extractability.mdx` — Brief #002 (deep-dives Stage 3; must back-reference Stage 0)
- `src/app/page.tsx` — homepage (search for hierarchy references)
- `src/data/homepage.ts` — homepage content data (search for Stage references)
- `src/app/audit/page.tsx` — /audit page (search for hierarchy references)

**Files to edit.**
- `src/app/platform/page.tsx` — add Stage 0 block ABOVE Stage 1. Stage 0 label per Gate 2 default ("Self-Evidence ≥ 7/10") or founder edit.
- `src/content/citation-briefs/how-agencies-get-cited-in-ai-answers.mdx` — update the hierarchy section to list 6 stages (Stage 0 + 1–5); update internal narrative if it claims "five stages" (consider renaming to "Citation Hierarchy" with Stage 0 as the gate AND keeping "Five-Stage" branding — see Implementation notes below).
- `src/content/citation-briefs/stage-3-structured-extractability.mdx` — add a "Stage 0 prerequisite" note in the intro section (pages must pass Stage 0 before Stage 3 work matters).
- `src/data/homepage.ts` — update any homepage hero or section content that names "Five-Stage Citation Hierarchy" without acknowledging Stage 0 (light touch — full re-name not required).
- `src/app/audit/page.tsx` — update any reference to the hierarchy.

**Files to create.** None.

**Implementation notes.**

**Branding decision (Cowork's recommendation, founder may override).** Keep
the public-facing name "Five-Stage Citation Hierarchy" — Stage 0 is the
PREREQUISITE GATE, not a stage in the count. Framing:

> The Wiele Five-Stage Citation Hierarchy is the path AI answer engines walk
> from page → citation. Pages enter the hierarchy at Stage 1 only after
> clearing the **Stage 0 prerequisite**: Self-Evidence ≥ 7/10. A page that
> isn't self-evident to a human reader cannot be extracted by an LLM with
> high enough confidence to land a citation.

This keeps brand continuity (existing inbound traffic + LinkedIn shares + AI
answers referencing "five-stage" stay accurate) while elevating the cog-psych
floor.

**Stage 0 content block (paste verbatim, applying Gate 2 label).**

Default label: `Stage 0 — Self-Evidence ≥ 7/10`.
Alternative per Gate 2: `Stage 0 — Read-Through Floor`.

```markdown
### Stage 0 — Self-Evidence ≥ 7/10 (prerequisite gate)

The page must answer in 5 seconds: site identity · page identity · primary
sections · current location · CTA · buyer-journey position (Krug's Trunk Test).
Self-evidence is scored 1–10; pages below 7/10 do not enter the hierarchy at
Stage 1. They get rewritten.

**Why.** AI answer engines extract citations from pages that read clearly
to high-elaboration human readers. The same processing-fluency signals
that drive 50ms first-impression encoding in human cognition (Jones et al.
2015) drive LLM extraction confidence. A page that isn't self-evident to
a human reader cannot be extracted by an LLM with the confidence required
to land a named citation.

**How Wiele tests it.** Krug's Trunk Test (5 seconds, six answers) + a
Self-Evidence Score (1–10 rubric). Pages at 4–6 are rewritten before
hierarchy work begins. Pages at 7–9 enter Stage 1. Pages at 10 are
reference exemplars and feed our internal Prototype Match training set.
```

Implementation in `src/app/platform/page.tsx`: locate the existing hierarchy
section (line 154 references "The Five-Stage Citation Hierarchy"). Add the
Stage 0 block immediately above Stage 1. Match the existing visual pattern
(card / list-item / numbered block — whatever the page already uses).

**Acceptance criteria.**

- [ ] `/platform` renders the Stage 0 block immediately above Stage 1.
- [ ] Stage 0 carries: label per Gate 2, one-paragraph rationale, link to /citation-score (created in Task 4) for the Self-Evidence rubric.
- [ ] Brief #001 hierarchy section updated to acknowledge Stage 0 (light edit — preserve "Five-Stage" brand language).
- [ ] Brief #002 intro carries the Stage 0 prerequisite note.
- [ ] Homepage references (if any) updated.
- [ ] No regression on existing hierarchy copy (Stages 1–5 unchanged).
- [ ] `npm run lint && npm run typecheck && npm run build:cf` clean.

**Verification commands.**

```bash
# /platform carries Stage 0
curl -s -A 'Mozilla/5.0' https://wielegroup.com/platform \
  | grep -oE 'Stage 0' | head -3
# Expect: >= 1 (visible Stage 0 reference)

# /platform still carries Five-Stage branding
curl -s -A 'Mozilla/5.0' https://wielegroup.com/platform \
  | grep -oE 'Five-Stage Citation Hierarchy' | wc -l
# Expect: >= 1 (brand continuity preserved)

# Brief #001 mentions Stage 0
curl -s -A 'Mozilla/5.0' https://wielegroup.com/citation-brief/how-agencies-get-cited-in-ai-answers \
  | grep -oE 'Stage 0' | head -3
# Expect: >= 1

# Brief #002 mentions Stage 0 prerequisite
curl -s -A 'Mozilla/5.0' https://wielegroup.com/citation-brief/stage-3-structured-extractability \
  | grep -oE 'Stage 0' | head -3
# Expect: >= 1

# Cross-link to /citation-score from /platform Stage 0 block
curl -s -A 'Mozilla/5.0' https://wielegroup.com/platform \
  | grep -oE 'href="/citation-score' | head -1
# Expect: 1 match
```

**Commit message.**

```
feat(platform): add Stage 0 (Self-Evidence ≥ 7/10) prerequisite to Citation Hierarchy

/L99 canon Rule 11: pages scoring below 7/10 on Krug's First Law get
rewritten, not shipped. The Five-Stage Citation Hierarchy now opens
with a Stage 0 prerequisite gate. Pages enter the hierarchy at Stage 1
only after clearing Self-Evidence ≥ 7/10.

Brand continuity: "Five-Stage Citation Hierarchy" name preserved. Stage 0
is the gating prerequisite, not a counted stage — protects inbound LinkedIn
shares, AI answers already referencing "five stages," and existing
internal links.

Surfaces updated:
- /platform (primary hierarchy page) — Stage 0 block added above Stage 1
- Brief #001 — hierarchy section acknowledges Stage 0
- Brief #002 — intro carries Stage 0 prerequisite note
- Homepage — light touch where hierarchy is named

Cross-link: Stage 0 → /citation-score §2 (Prototype Match + Self-Evidence
rubrics live there).

Anchors: /L99 canon Rules 10, 11, 25. Krug First Law. Whalen Six Minds.
Jones et al. 2015 (50ms first-impression encoding).

Founder approval: v3.9.4 Gate 2 (Stage 0 label).
```

**Deploy.** Per-item. After deploy, run §5 verification.

---

## §5 · Deploy procedure (per-item or batched)

```bash
# 5.1 — Verify clean state, all changes committed
git status --short
# Expect: empty

# 5.2 — Confirm pre-deploy guard installed (Task 1 should make this no-op)
npm run predeploy:cf
# Expect: exit 0, no abort message

# 5.3 — Run lint + typecheck
npm run lint
npm run typecheck

# 5.4 — Full build + deploy + IndexNow
npm run deploy:cf
# This runs: predeploy:cf → gen:lastmod → next build → opennextjs build → wrangler deploy → indexnow ping

# 5.5 — Capture Worker version ID from output (e.g. "Current Version ID: <uuid>")

# 5.6 — Post-deploy verification (mandatory, NOT optional)

# Homepage carries v3.9.3 canon
curl -s -A 'Mozilla/5.0' https://wielegroup.com/ \
  | grep -oE '<title>[^<]+</title>'
# Expect title contains: "Citation, not clicks. We engineer the brand AI engines choose."

# /citation-score (after Task 4)
curl -s -A 'Mozilla/5.0' -o /dev/null -w '%{http_code}\n' \
  https://wielegroup.com/citation-score
# Expect: 200

# /platform Stage 0 (after Task 5)
curl -s -A 'Mozilla/5.0' https://wielegroup.com/platform \
  | grep -oE 'Stage 0' | head -1
# Expect: 1 match

# Briefs still 200
for slug in how-agencies-get-cited-in-ai-answers stage-3-structured-extractability; do
  curl -s -A 'Mozilla/5.0' -o /dev/null -w "%{http_code} $slug\n" \
    "https://wielegroup.com/citation-brief/$slug"
done
# Expect: 200 on both

# IndexNow log
grep "indexnow.*200" /tmp/wiele-deploy.log 2>/dev/null || \
  echo "Check deploy:cf stdout for [indexnow] ✓ submitted (200)"

# 5.7 — Per-task verification commands (match the task you shipped)
```

**Deploy gate.** If predeploy:cf, lint, OR typecheck fails, ABORT. Fix locally;
do not push a known-broken build.

---

## §6 · Rollback procedure (if deploy breaks production)

```bash
# 6.1 — Identify previous Worker version
wrangler deployments list 2>&1 | head -10

# 6.2 — Rollback to previous version
wrangler rollback <previous-version-id>

# 6.3 — Verify rollback live
curl -s -A 'Mozilla/5.0' -o /dev/null -w '%{http_code}\n' https://wielegroup.com/

# 6.4 — Revert offending commit locally + push
git revert <commit-sha>
git push origin main

# 6.5 — Notify Cowork: rollback ID, failing commit, what surface broke.
```

**Specific watch-outs for this directive.**

1. **Task 4 (/citation-score)** touches the methodology surface that Brief #001
   references. If the new page 404s or returns 500, Brief #001's "/citation-score"
   links also break. Pre/post screenshots of Brief #001 required before declaring
   Task 4 done. If broken: revert Task 4 commit + revert Brief #001 cross-link
   commit together.

2. **Task 5 (Stage 0 on /platform)** changes the hierarchy section. If a regex
   replace inadvertently broke Stages 1–5 copy, the entire hierarchy section
   reads broken. Visual diff of /platform pre/post mandatory before declaring
   Task 5 done. If broken: revert Task 5 commit.

3. **Task 1 (predeploy guard)** is the safety net for tasks 2–5. If the guard
   itself fails (false positives), the entire deploy pipeline is blocked. Smoke-
   test the guard on both clean and dirty trees BEFORE attempting a real deploy.

**Worktrees policy:** as of 2026-05-14, ALL Claude Code worktrees in
`/Users/jonathanlandman/Documents/Claude Code/.claude/worktrees/` are forbidden.
Work in canonical wielegroup.com checkout ONLY.

---

## §7 · Reporting back to Cowork

After each task or batch, write a status line that includes ALL of:

```
✓ §4.T<n> · <subject>
  Files: <created N · edited M · deleted K>
  Build: <pass / fail>
  Deploy: <version-id-before> → <version-id-after> | <not-deployed-this-cycle>
  Live verification: <pass / fail / pending — what was checked>
  Open: <anything still in flight or blocked>
```

After the full cycle, the CLOSE REPORT must include ALL of:

1. **Worker version trail** — `<before-id> → <after-T1> → <after-T2/T3> → <after-T4> → <after-T5>`.
2. **Git tags pushed** — minimum: `v3.9.4-predeploy-guard`, `v3.9.4-cognitive-preflight`, `v3.9.4-prototype-match`, `v3.9.4-stage-0`. (Final tag `v3.9.4-cognitive-cycle-closed` after all five tasks ship.)
3. **Origin/main parity** — `git log origin/main..HEAD` returns empty (no unpushed commits).
4. **Five acceptance criteria** — explicit PASS/FAIL per task:
   - T1: predeploy:cf guard fires on dirty tree, no-op on clean. PASS/FAIL.
   - T2: 7+ files carry "Cowan 4-chunk" comment marker; audit notes in commit. PASS/FAIL.
   - T3: `docs/PRE_DEPLOY_CHECKLIST.md` exists with both gates + worked example. PASS/FAIL.
   - T4: /citation-score 200, Prototype Match visible, /pricing cross-links live. PASS/FAIL.
   - T5: /platform carries Stage 0, Briefs #001/#002 acknowledge it, no Stage 1–5 regression. PASS/FAIL.
5. **Live URL verifications** — paste curl output for:
   - `https://wielegroup.com/` (title check)
   - `https://wielegroup.com/citation-score` (200 + Prototype Match)
   - `https://wielegroup.com/platform` (Stage 0 + Five-Stage continuity)
   - `https://wielegroup.com/citation-brief/how-agencies-get-cited-in-ai-answers` (Stage 0 acknowledgement)
   - `https://wielegroup.com/citation-brief/stage-3-structured-extractability` (Stage 0 prerequisite note)
   - `https://wielegroup.com/pricing` (Citation Score™ tiers + See methodology →)
6. **IndexNow notification confirmation** — paste the `[indexnow] ✓ submitted (200)` line(s) from deploy stdout. Confirm `/citation-score` is among the submitted URLs.
7. **Open loops** — anything not finished (e.g. Briefs #003/#004 if Gate 3 deferred them).
8. **Founder gates outcome** — record what Gate 1/2/3 resolved to (the actual values used for rubric scale, Stage 0 label, and Brief #003/#004 inclusion).

Example task line:

```
✓ §4.T1 · predeploy:cf git-clean guard
  Files: created 0 · edited 1 (package.json) · deleted 0
  Build: pass (no build change — script-only edit)
  Deploy: not-deployed-this-cycle (repo-only change; commit + tag only)
  Live verification: smoke-test dirty=ABORT clean=PASS, both confirmed
  Open: none
```

---

## §8 · Sources Cowork relies on

- Prior directive: `docs/directives/v3-9-3-claude-code-directive-2026-05-14.md`
- Amendment: `docs/directives/v3-9-3-AMENDMENT-A-citation-score-approved-2026-05-14.md`
- Directive standard: Cowork memory `feedback_claude_code_directive_standard_2026_05_14.md`
- /L99 canon: Cowork memory `reference_cognitive_psychology_design_canon_2026_05_14.md`
- Commit-Before-Deploy Law: Cowork memory `feedback_commit_before_deploy_law.md`
- MDX Static-Import Law: Cowork memory `feedback_mdx_static_imports_phase_7_4_law.md`
- Schema-Count Grep Trap: Cowork memory `feedback_schema_count_grep_trap.md`
- Brief #001 live: https://wielegroup.com/citation-brief/how-agencies-get-cited-in-ai-answers
- Brief #002 live: https://wielegroup.com/citation-brief/stage-3-structured-extractability
- Citation Score™ live: https://wielegroup.com/pricing#recurring-ai-visibility

---

## §9 · Acknowledgement

Before starting, Claude Code acknowledges in chat:

```
Directive v3.9.4 received. Pre-flight clean (cwd / branch / status / live state).
Founder gates §3 — Gate 1 [10-point / 5-point / edit] · Gate 2 [Self-Evidence / Read-Through Floor / edit] · Gate 3 [both / hold / #003 only].
Executing §4 in order: T1 → T3 → T2 → T5 → T4.
ETA per item: T1 ~10min · T2 ~25min · T3 ~30min · T4 ~90min · T5 ~45min.
On it.
```

Then go quiet and ship. No mid-flight narration.

---

**End of directive.**
