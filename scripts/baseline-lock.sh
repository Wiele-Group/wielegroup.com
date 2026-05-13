#!/usr/bin/env bash
#
# baseline-lock.sh — capture pre-v3.0 wielegroup.com baseline metrics
#
# Why: v3.0.x SUPERSWEEP shipped 2026-05-06 → 2026-05-07 (six tagged
# deploys). Without a baseline of the 90-day window BEFORE the sweep,
# we can't measure conversion lift, lead-volume change, or tier-mix
# shift. The predictive-analytics agent forecast (medium-direction /
# low-magnitude) needs this to upgrade to quantitative scenarios.
#
# Window: 2026-02-05 → 2026-05-06 (90 days ending the day v3.0 shipped).
#
# What this script captures automatically:
#   1. KV lead-capture count (wrangler) — paid-intent submissions
#      stored in AUDIT_QUEUE namespace via the lead-capture failover
#   2. Cloudflare Workers analytics (GraphQL API) — requests, errors,
#      bandwidth — if CF_API_TOKEN + CF_ACCOUNT_ID are exported
#
# What this script emits as a manual checklist (no auth path here):
#   3. Google Search Console — clicks, impressions, top queries
#   4. Stripe — payment_intents and customers created in window
#
# Output: scripts/baseline/baseline-pre-v3.0-<TIMESTAMP>.json
#
# Usage:
#   export CF_API_TOKEN=<your-cloudflare-api-token>      # optional
#   export CF_ACCOUNT_ID=<your-cloudflare-account-id>    # optional
#   ./scripts/baseline-lock.sh
#
# Exit codes:
#   0  success (any auto-pull that worked is captured)
#   1  not run from canonical wielegroup.com directory
#   2  wrangler not found in node_modules/.bin/
#
set -euo pipefail

WINDOW_START="2026-02-05"
WINDOW_END="2026-05-06"
KV_NAMESPACE_ID="4f4aeab739c247268c6a6c7cc9d91c1f"  # AUDIT_QUEUE binding from wrangler.toml

# --- pre-flight ----------------------------------------------------------

if [[ ! -f "wrangler.toml" ]] || [[ ! -d ".open-next" && ! -d "node_modules" ]]; then
  echo "ERROR: run this from the canonical wielegroup.com directory" >&2
  echo "       (where wrangler.toml + node_modules/ live)" >&2
  exit 1
fi

WRANGLER="./node_modules/.bin/wrangler"
if [[ ! -x "$WRANGLER" ]]; then
  echo "ERROR: wrangler not found at $WRANGLER" >&2
  echo "       run: npm install" >&2
  exit 2
fi

TIMESTAMP="$(date +%Y-%m-%d-%H%M%S)"
OUT_DIR="scripts/baseline"
OUT_FILE="$OUT_DIR/baseline-pre-v3.0-${TIMESTAMP}.json"
mkdir -p "$OUT_DIR"

echo "📊 baseline-lock.sh — capturing wielegroup.com pre-v3.0 baseline"
echo "   Window: $WINDOW_START → $WINDOW_END (90 days)"
echo "   Output: $OUT_FILE"
echo ""

# --- 1. KV lead-capture count -------------------------------------------

echo "→ [1/4] KV lead-capture count (AUDIT_QUEUE namespace)..."
KV_COUNT="null"
KV_KEYS_FILE=""
if KV_LIST="$("$WRANGLER" kv key list --namespace-id "$KV_NAMESPACE_ID" 2>&1)"; then
  KV_COUNT="$(echo "$KV_LIST" | jq 'length' 2>/dev/null || echo "null")"
  KV_KEYS_FILE="$OUT_DIR/kv-keys-${TIMESTAMP}.json"
  echo "$KV_LIST" > "$KV_KEYS_FILE"
  echo "   ✓ KV total keys: $KV_COUNT (raw list saved to $KV_KEYS_FILE)"
  echo "   NOTE: KV doesn't store creation timestamps natively. To window"
  echo "         to $WINDOW_START → $WINDOW_END, inspect the keys for"
  echo "         embedded timestamps or fetch each value's metadata."
else
  echo "   ✗ wrangler kv list failed — check 'wrangler login' status"
  echo "   $(echo "$KV_LIST" | head -3)"
fi
echo ""

# --- 2. Cloudflare Workers analytics ------------------------------------

echo "→ [2/4] Cloudflare Workers analytics (GraphQL API)..."
CF_ANALYTICS="null"
if [[ -n "${CF_API_TOKEN:-}" && -n "${CF_ACCOUNT_ID:-}" ]]; then
  CF_QUERY='
  {
    "query": "query GetAnalytics($accountTag: string!, $start: Date!, $end: Date!) { viewer { accounts(filter: { accountTag: $accountTag }) { workersInvocationsAdaptive(filter: { datetimeHour_geq: $start, datetimeHour_lt: $end }, limit: 10000) { sum { requests errors subrequests } dimensions { scriptName } } } } }",
    "variables": {
      "accountTag": "'"$CF_ACCOUNT_ID"'",
      "start": "'"${WINDOW_START}T00:00:00Z"'",
      "end": "'"${WINDOW_END}T00:00:00Z"'"
    }
  }'

  CF_RESPONSE="$(curl -sS -X POST https://api.cloudflare.com/client/v4/graphql \
    -H "Authorization: Bearer $CF_API_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$CF_QUERY" 2>&1)" || CF_RESPONSE='{"errors":[{"message":"curl failed"}]}'

  if echo "$CF_RESPONSE" | jq -e '.data.viewer.accounts' >/dev/null 2>&1; then
    CF_ANALYTICS="$CF_RESPONSE"
    REQUESTS="$(echo "$CF_RESPONSE" | jq '[.data.viewer.accounts[0].workersInvocationsAdaptive[].sum.requests] | add // 0')"
    ERRORS="$(echo "$CF_RESPONSE" | jq '[.data.viewer.accounts[0].workersInvocationsAdaptive[].sum.errors] | add // 0')"
    echo "   ✓ Workers requests in window: $REQUESTS"
    echo "   ✓ Workers errors in window:   $ERRORS"
  else
    echo "   ✗ GraphQL API call failed:"
    echo "$CF_RESPONSE" | jq -r '.errors[]?.message // "unknown error"' | sed 's/^/     /'
  fi
else
  echo "   ⊘ CF_API_TOKEN or CF_ACCOUNT_ID not set — skipping"
  echo "   To capture: get an API token with Account.Account Analytics:Read"
  echo "   from https://dash.cloudflare.com/profile/api-tokens"
fi
echo ""

# --- 3. Google Search Console (manual checklist) ------------------------

echo "→ [3/4] Google Search Console — MANUAL EXPORT REQUIRED"
echo "   No programmatic auth path here. Steps:"
echo "   a. Open https://search.google.com/search-console"
echo "   b. Property: wielegroup.com"
echo "   c. Performance → set date range $WINDOW_START to $WINDOW_END"
echo "   d. Export: clicks, impressions, CTR, avg position"
echo "   e. Top 50 queries → export to CSV"
echo "   f. Save the CSV as: $OUT_DIR/gsc-pre-v3.0-${TIMESTAMP}.csv"
echo ""

# --- 4. Stripe inquiries (manual or env-token pull) ---------------------

echo "→ [4/4] Stripe — payment_intents + customers in window"
STRIPE_DATA="null"
if [[ -n "${STRIPE_SECRET_KEY:-}" ]]; then
  WINDOW_START_TS="$(date -j -f "%Y-%m-%d" "$WINDOW_START" "+%s" 2>/dev/null || date -d "$WINDOW_START" "+%s")"
  WINDOW_END_TS="$(date -j -f "%Y-%m-%d" "$WINDOW_END" "+%s" 2>/dev/null || date -d "$WINDOW_END" "+%s")"

  PI_RESPONSE="$(curl -sS "https://api.stripe.com/v1/payment_intents?limit=100&created[gte]=${WINDOW_START_TS}&created[lt]=${WINDOW_END_TS}" \
    -u "$STRIPE_SECRET_KEY:" 2>&1)" || PI_RESPONSE='{"error":{"message":"curl failed"}}'

  if echo "$PI_RESPONSE" | jq -e '.data' >/dev/null 2>&1; then
    PI_COUNT="$(echo "$PI_RESPONSE" | jq '.data | length')"
    PI_TOTAL_AMOUNT="$(echo "$PI_RESPONSE" | jq '[.data[].amount] | add // 0')"
    STRIPE_DATA="$PI_RESPONSE"
    echo "   ✓ Stripe payment_intents in window: $PI_COUNT (total cents: $PI_TOTAL_AMOUNT)"
    echo "   NOTE: limit=100 — paginate if count == 100"
  else
    echo "   ✗ Stripe API call failed:"
    echo "$PI_RESPONSE" | jq -r '.error.message // "unknown"' | sed 's/^/     /'
  fi
else
  echo "   ⊘ STRIPE_SECRET_KEY not set — skipping"
  echo "   To capture: export STRIPE_SECRET_KEY=sk_live_... and rerun"
  echo "   (use a restricted key with read-only payment_intents + customers)"
fi
echo ""

# --- write composite baseline file --------------------------------------

cat > "$OUT_FILE" <<EOF
{
  "captured_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "window": {
    "start": "$WINDOW_START",
    "end": "$WINDOW_END",
    "days": 90,
    "rationale": "90 days ending the day v3.0 shipped (2026-05-06)"
  },
  "purpose": "pre-v3.0.x SUPERSWEEP baseline for predictive-analytics 60-day read on 2026-07-06",
  "kv_lead_capture": {
    "namespace_id": "$KV_NAMESPACE_ID",
    "binding": "AUDIT_QUEUE",
    "total_keys_at_capture": $KV_COUNT,
    "raw_keys_file": "$KV_KEYS_FILE",
    "caveat": "KV total at capture time, not windowed — inspect keys for embedded timestamps to window precisely"
  },
  "cloudflare_workers_analytics": $CF_ANALYTICS,
  "google_search_console": {
    "status": "manual_export_required",
    "expected_file": "$OUT_DIR/gsc-pre-v3.0-${TIMESTAMP}.csv"
  },
  "stripe": $STRIPE_DATA,
  "next_read": {
    "date": "2026-07-06",
    "rationale": "60-day post-sweep read — earlier reads will look flat",
    "compare_to": "$OUT_FILE"
  }
}
EOF

echo "✅ Baseline captured: $OUT_FILE"
echo ""
echo "Next steps:"
echo "  1. Complete manual GSC export and save CSV alongside the JSON"
echo "  2. (Optional) Re-run with STRIPE_SECRET_KEY exported to fill that section"
echo "  3. Schedule a 60-day re-run on 2026-07-06 with the SAME window logic"
echo "     ending at the read date, to compare apples-to-apples"
