# Live-or-Nothing Protocol — wielegroup.com

**Purpose:** Replace the rhetorical "always verify before declaring done" with a hard-coded, mechanical sequence Builder MUST execute before any "shipped" / "deployed" / "live" claim. If the protocol's gates aren't on screen with verbatim curl output, the task is **not closed** — regardless of how confident the wrangler logs look.

**Authority:** Binding. Pairs with `VISUAL_FILE_ROUTING.md` and overrides any session-time pressure to "just say it's done." If a directive's gates fail, the directive **stops** — no retry, no partial close, no rationalization. Surface to founder.

**Origin:** Saved 2026-05-05 after the logo deploy where Cowork edited locally + claimed shipped + nothing went live. Re-confirmed 2026-05-09 after Cowork narrated "v3.7.5 deploying" without actually deploying. The pattern keeps coming back because the prior law was rhetorical. This one is mechanical.

---

## §1 — The seven states of a change

| State | Evidence | Counts as "live"? |
|---|---|---|
| Edited locally | file content shows new value | NO |
| Committed | `git log` shows the commit | NO |
| Tagged | `git tag` shows the tag locally | NO |
| Pushed to origin | `git ls-remote` shows the commit on remote | NO |
| Built | `npm run build:cf` exit 0 | NO |
| Wrangler deploy returned success | "Uploaded wielegroup-com (X sec)" + Worker Version ID | **ALMOST — but no** |
| **Curl-with-cache-bust returns the new state** | grep -oE for change marker matches expected count | **YES — this is "live"** |

**Founder Standard:** the only state that matters is the seventh. The first six are intermediate states. They tell you Builder is making progress; they do NOT tell you the user is seeing the change.

---

## §2 — The mechanical gate sequence (mandatory, every deploy)

After every `wrangler deploy` for `wielegroup-com`, Builder MUST run this sequence verbatim and capture the output BEFORE writing any "shipped" / "done" / "live" message:

```bash
# 1. Define the realistic browser UA — Bot Fight Mode silently 403s bare curl
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15"

# 2. Define the cache-bust token — defeats Cloudflare edge cache so curl reads origin
CB=$(date +%s)

# 3. Define the surface(s) the change should be visible on
SURFACE="/proof"   # or whatever route was edited

# 4. Capture the live response
BODY=$(curl -sL -A "$UA" "https://wielegroup.com${SURFACE}?_cb=$CB")

# 5. Capture headers (HTTP status + cf-ray for fresh-edge proof)
curl -sI -A "$UA" "https://wielegroup.com${SURFACE}?_cb=$CB" | grep -E "HTTP/|cf-ray|x-nextjs-cache"

# 6. Run change-marker gates — substitute the actual change marker(s) per directive
# Examples:
echo "Stale phrase count (must = 0):"
echo "$BODY" | grep -oE 'OLD COPY HERE' | wc -l

echo "New phrase count (must >= 1):"
echo "$BODY" | grep -oE 'NEW COPY HERE' | wc -l

# 7. Cross-verify (if Cowork ran the curl, fine — same protocol applies if Builder ran it)
```

**Gate evaluation rule:** every gate has a threshold (must = 0, must >= 1, must = N). If ANY gate fails, the deploy is **not closed**. Builder reports the failing gate + actual count + stops.

---

## §3 — Mandatory output format for "shipped" claims

When all gates pass, Builder MUST write the close message in this format. Anything else is non-compliant:

```
Ship closed: <tag>

Worker Version: <version-id>
Tag pushed:    <tag>
Commit:        <short-hash>

Live verification (curl with UA + cache-bust ?_cb=<CB>):
  HTTP <code>           cf-ray <ray>
  Gate 1 [stale]:       <count>   threshold <op> <n>   ✅/❌
  Gate 2 [new]:         <count>   threshold <op> <n>   ✅/❌
  Gate 3 [...]:         <count>   threshold <op> <n>   ✅/❌

Verdict: <PASS / FAIL / FAIL-AND-STOPPED>
```

**Forbidden phrasings** that have created false-live confirmations in past sessions:
- ❌ "v3.X.Y deploying" — narrative, not action
- ❌ "should be live now" — assumption
- ❌ "almost done" — non-binary; either curl-passes-gates or it doesn't
- ❌ "wrangler reports success, ship closed" — wrangler success is state 6, not 7
- ❌ "the build went green, calling it live" — build success ≠ edge serving new state
- ❌ "I checked and it looks right" — without verbatim grep counts, unverifiable

---

## §4 — Cache-bust discipline

Cloudflare's edge can cache HTML for tens of seconds even with `revalidate: 60` from Next ISR. A curl without cache-bust may read **stale cached SSR** and report success on a deploy that hasn't propagated yet.

**Rule:** every gate curl MUST include `?_cb=$(date +%s)` as a query parameter. The query string defeats edge cache and forces origin render.

**Verify cache-bust worked:** the response header should include `cf-cache-status: DYNAMIC` (or no `cf-cache-status` header at all). If you see `cf-cache-status: HIT`, the cache-bust failed and the gate result is unreliable.

---

## §5 — `grep -oE | wc -l`, never `grep -c`

Cloudflare Workers SSR ships HTML as one giant single line. `grep -c` returns the number of matching **lines** (always 1), not the number of substring occurrences. This was the bug behind the 8/2/6 → 18/8/8 baseline correction in the v3.5.1 → v3.5.2 audit.

**Rule:** every count gate MUST use `grep -oE 'pattern' | wc -l`. The `-o` outputs each match on its own line, then `wc -l` counts the matches.

**Single-line SSR test:** if you want to confirm the response is one-line (it always is for our Worker), run `curl -sL -A "$UA" URL | wc -l` — typical output: `1` or `2` (one line + a trailing newline).

---

## §6 — POP variability

Cloudflare serves from many points of presence (POPs). Two consecutive curls can hit different POPs and return different `cf-ray` values. This is normal and is actually useful: it provides cross-POP verification that the new state is consistent across the edge fleet.

**Rule:** if Builder runs the gates AND Cowork (Cowork-Bash MCP) runs the same gates independently, capture both `cf-ray` values. Different POPs = stronger verification. Same POP = still valid but less defensive.

If a gate passes in one POP and fails in another, the deploy is partially propagated. Wait 30 seconds, retry once. If still split, surface to founder — don't paper over it.

---

## §7 — When to retry vs when to stop

| Failure mode | Retry? |
|---|---|
| `cf-cache-status: HIT` despite `?_cb=` (probable cache-bust evasion) | YES — retry once with `?_cb_v2=$(date +%s)` and a different cache-bust key |
| Gate fails on first run, passes 30s later | LIKELY edge propagation lag — retry once after 30s, mark as "recovered" if it passes |
| Gate fails twice with 30s gap | DO NOT retry — surface to founder. Either the change didn't compile in, or Worker version doesn't match expected. |
| `wrangler deploy` succeeded but curl returns old SSR consistently across multiple POPs | Worker version mismatch — verify `Current Version ID` from wrangler output matches what Cloudflare API returns for `wielegroup-com`. If they differ, deploy didn't take. |
| HTTP 5xx on the surface | Stop immediately. Don't gate-grep an error response. Roll back unless the issue is unrelated. |

---

## §8 — The single founder-facing rule

If founder asks **"is it live?"** the only acceptable answers are:

- **"Yes — gates passed. Here's the verbatim curl output."** + paste output.
- **"No — gate <N> failed at <count>. Here's the failing curl output."** + paste output.

Anything else ("looks live", "should be live", "I think it's live") is a directive violation. Re-run the gate, get evidence, then answer.

---

## §9 — When Cowork is the verifier (cross-verification mode)

Standard pattern across recent ships: Builder runs the gates, then Cowork independently runs the same gates via its bash MCP. Two passes, same result, different POPs (usually) — strongest verification possible.

**Rule:** Cowork MUST run independent verification before writing memory or updating MEMORY.md anchors. Memory writes assume the change is live; if Cowork's curl returns stale, the memory write is rolled back too.

**Lesson from this session (2026-05-09):** Cowork wrote a memory entry saying "v3.7.5 shipped" while v3.7.5 was still local-only and origin/main was at v3.7.4. Memory said true; reality didn't. Memory entries are now bound to the same gate evidence as Builder's "shipped" claim — no evidence, no entry.

---

## §10 — Pairing law

This file is read AFTER `VISUAL_FILE_ROUTING.md` (which tells Builder *which* file to edit) and BEFORE any `wrangler deploy` (which would otherwise let Builder declare false-live). The two are paired:

- Routing map prevents *editing the wrong file*.
- Live-or-nothing prevents *declaring victory before live*.

Either one alone leaves a failure mode open. Both binding.

---

## §11 — When this protocol changes

The site adds new verification surfaces (e.g., specific JSON-LD schema counts, IndexNow ping endpoints, Plausible event verification). When new gates become standard, this file gets a §-block extension. Don't fork this protocol; extend it.

**Trigger:** any deploy that surfaces a new failure mode this protocol didn't anticipate. Capture the new gate. Add a §-block. Save the lesson to memory as `feedback_<lesson>_2026-MM-DD.md`.
