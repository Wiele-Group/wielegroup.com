#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# Wiele Group · IndexNow notifier
# Submits the canonical URL list to IndexNow (Bing + Yandex + others).
# IndexNow protocol: https://www.indexnow.org/
#
# Auto-called by deploy scripts after wrangler deploy succeeds.
# Safe to run standalone:  ./scripts/notify-indexnow.sh
# Safe to extend with more URLs — append to URL_LIST below.
#
# Key validation: api.indexnow.org GETs https://wielegroup.com/<KEY>.txt
# and checks the file body equals <KEY>. The key file lives at
# public/039085047de03d9f461bdf6f2d8beea5.txt — never delete or rename.
# ─────────────────────────────────────────────────────────────────────
set -euo pipefail

readonly HOST="wielegroup.com"
readonly KEY="039085047de03d9f461bdf6f2d8beea5"
readonly KEY_LOCATION="https://${HOST}/${KEY}.txt"
readonly INDEXNOW_ENDPOINT="https://api.indexnow.org/IndexNow"

# Canonical URL list — keep in sync with sitemap.ts STATIC_ROUTES.
# IndexNow accepts up to 10,000 URLs per submission; we're nowhere near.
readonly URL_LIST=(
  "https://${HOST}/"
  "https://${HOST}/audit"
  "https://${HOST}/onboarding"
  "https://${HOST}/platform"
  "https://${HOST}/pricing"
  "https://${HOST}/proof"
  "https://${HOST}/labs"
  "https://${HOST}/about"
  "https://${HOST}/contact"
  "https://${HOST}/trust"
  "https://${HOST}/marketing-agency"
  "https://${HOST}/advertising-agency"
  "https://${HOST}/brand-management-agency"
  "https://${HOST}/web-design-agency"
  # Productized service offers — v3.1 (2026-05-07).
  # Premium Brand Site System: WDA flagship SKU. Token-first builds,
  # 5-mode delivery, AI revision credits, contractual CWV SLA.
  "https://${HOST}/services/premium-brand-site-system"
  "https://${HOST}/systems"
  "https://${HOST}/systems/ai-visibility"
  "https://${HOST}/systems/search"
  "https://${HOST}/systems/brand-authority"
  "https://${HOST}/systems/web-experience"
  "https://${HOST}/privacy"
  "https://${HOST}/terms"
  # Labs articles — added v2.5-flagship-playbooks (2026-05-05).
  # Index page /labs already listed; individual articles must ping too
  # so AI-search engines pick up the citation surface immediately.
  "https://${HOST}/labs/ai-recommendations-compound"
  "https://${HOST}/labs/five-citation-signals"
  "https://${HOST}/labs/search-is-splitting"
  "https://${HOST}/labs/ai-era-billion-dollar-brand-playbook"
  "https://${HOST}/labs/generative-ai-marketing-operating-system"
  "https://${HOST}/sitemap.xml"
  # AI-engine context surface — added v3.0.1 (2026-05-06).
  # llms.txt is the canonical hint file every AI search crawler reads
  # for positioning + pricing. Re-pinging on every deploy ensures
  # AI engines re-fetch when the ladder, defense thread, or page list
  # changes — the v3.0 deploy did not include this and AI engines were
  # observed quoting outdated v2 pricing.
  "https://${HOST}/llms.txt"
)

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   IndexNow · ${HOST}"
echo "   Submitting ${#URL_LIST[@]} URLs to IndexNow"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Validate key file is reachable before submitting (fast-fail if not deployed)
echo ""
echo "▸ Pre-flight: verify key file is live"
KEY_BODY=$(curl -sf -A "Mozilla/5.0 IndexNow-Verifier" "${KEY_LOCATION}" 2>/dev/null || echo "")
KEY_BODY_TRIMMED=$(echo "${KEY_BODY}" | tr -d '[:space:]')
if [ "${KEY_BODY_TRIMMED}" != "${KEY}" ]; then
  echo "❌ Key file at ${KEY_LOCATION} is missing or wrong content."
  echo "   Got: '${KEY_BODY_TRIMMED}'"
  echo "   Expected: '${KEY}'"
  echo ""
  echo "   The key file (public/${KEY}.txt) must be deployed before IndexNow"
  echo "   will accept submissions. Re-run after the next wrangler deploy."
  exit 1
fi
echo "  ✓ key file live: ${KEY_LOCATION}"

# Build compact JSON array of URLs.
# IMPORTANT: bash double-quoted string literals do NOT interpret '\n'.
# (printf does — that's why the original v2.2.1 line worked partially —
# but `JSON_URLS="...\n..."` ships LITERAL backslash-n into the JSON,
# which IndexNow rejects with HTTP 400 for malformed payload.)
# Compact JSON is fine for an HTTP POST body — IndexNow accepts it.
URLS_JSON=$(printf '"%s",' "${URL_LIST[@]}")
URLS_JSON="[${URLS_JSON%,}]"   # strip the trailing comma left by printf

PAYLOAD=$(cat <<EOF
{
  "host": "${HOST}",
  "key": "${KEY}",
  "keyLocation": "${KEY_LOCATION}",
  "urlList": ${URLS_JSON}
}
EOF
)

echo ""
echo "▸ POST ${INDEXNOW_ENDPOINT}"
RESPONSE=$(curl -s -w "\n%{http_code}" \
  -X POST "${INDEXNOW_ENDPOINT}" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "${PAYLOAD}")

HTTP_CODE=$(echo "${RESPONSE}" | tail -1)
BODY=$(echo "${RESPONSE}" | sed '$d')

case "${HTTP_CODE}" in
  200|202)
    echo "  ✓ IndexNow accepted (HTTP ${HTTP_CODE})"
    [ -n "${BODY}" ] && echo "    body: ${BODY}"
    ;;
  400)
    echo "❌ Bad request (HTTP 400) — check JSON payload"
    echo "   body: ${BODY}"
    exit 1
    ;;
  403)
    echo "❌ Key validation failed (HTTP 403) — IndexNow could not verify the key file"
    echo "   Check ${KEY_LOCATION} is publicly accessible and contains exactly: ${KEY}"
    exit 1
    ;;
  422)
    echo "⚠️  HTTP 422 — URLs not authoritative for the host (mismatch between host and submitted URLs)"
    echo "   body: ${BODY}"
    exit 1
    ;;
  429)
    echo "⚠️  HTTP 429 — too many requests, throttled. Retry in ~5 minutes."
    exit 1
    ;;
  *)
    echo "⚠️  Unexpected HTTP ${HTTP_CODE}"
    echo "   body: ${BODY}"
    exit 1
    ;;
esac

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   IndexNow notification complete · ${#URL_LIST[@]} URLs submitted"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Bing typically reflects the submission within 30 minutes — 24 hours."
echo "Verify at: https://www.bing.com/webmasters/home/sitemaps"
echo ""
