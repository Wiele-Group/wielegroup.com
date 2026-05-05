#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# Wiele Group · Lighthouse / PageSpeed baseline capture
#
# Captures Performance / Accessibility / Best-Practices / SEO scores
# + LCP / CLS / FCP / TBT for every canonical Wiele route via Google
# PageSpeed Insights API v5. No Chrome install required, no API key
# needed (free tier = 25k QPD; we use ~44 requests).
#
# Usage:
#   ./scripts/lighthouse-baseline.sh              # mobile (default)
#   ./scripts/lighthouse-baseline.sh desktop      # desktop
#
# Output: /tmp/lighthouse-baseline-<VERSION>-<strategy>.md
#   — markdown table ready to paste into a memory entry.
#
# Authority: WIELE_CODE_OPERATING_DIRECTIVE.md § 6 (verification with
# evidence). Lock the baseline so future regressions become visible.
# ─────────────────────────────────────────────────────────────────────
set -euo pipefail
cd "$(dirname "$0")/.."

readonly VERSION="v2.2.3"
readonly HOST="wielegroup.com"
readonly STRATEGY="${1:-mobile}"
readonly OUT="/tmp/lighthouse-baseline-${VERSION}-${STRATEGY}.md"
readonly API="https://www.googleapis.com/pagespeedonline/v5/runPagespeed"

# Pre-flight
command -v curl    >/dev/null || { echo "❌ curl missing"; exit 1; }
command -v python3 >/dev/null || { echo "❌ python3 missing"; exit 1; }

# API key — anonymous requests share a tiny global quota that fluctuates
# and silently 429s. With a free personal key (5 min to get from
# https://console.cloud.google.com/apis/credentials), you get 25k queries
# per day on your own quota.
#
# Set in .env.local and source it before running:
#   echo 'export LIGHTHOUSE_API_KEY=AIza...' >> ~/.zshrc && source ~/.zshrc
#
# The script works without a key but will likely 429 — see message below.
KEY_OPTION=""
if [ -n "${LIGHTHOUSE_API_KEY:-}" ]; then
  KEY_OPTION="${LIGHTHOUSE_API_KEY}"
  echo "  ✓ using LIGHTHOUSE_API_KEY (personal 25k QPD quota)"
else
  echo "  ⚠️  no LIGHTHOUSE_API_KEY set — falling back to anonymous shared quota"
  echo "      If this 429s, get a free key at:"
  echo "      https://console.cloud.google.com/apis/credentials"
  echo "      Then: export LIGHTHOUSE_API_KEY=AIza... && bash $0 ${STRATEGY}"
fi

# Canonical 22-route list — keep in sync with src/app/sitemap.ts STATIC_ROUTES.
readonly ROUTES=(
  "/"
  "/audit"
  "/onboarding"
  "/platform"
  "/pricing"
  "/proof"
  "/labs"
  "/about"
  "/contact"
  "/trust"
  "/marketing-agency"
  "/advertising-agency"
  "/brand-management-agency"
  "/web-design-agency"
  "/systems"
  "/systems/ai-visibility"
  "/systems/search"
  "/systems/brand-authority"
  "/systems/web-experience"
)

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   LIGHTHOUSE BASELINE · ${VERSION} · ${STRATEGY}"
echo "   Capturing ${#ROUTES[@]} routes via PageSpeed Insights API"
echo "   Output → ${OUT}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Markdown header
cat > "${OUT}" <<EOF
# Wiele Lighthouse Baseline · ${VERSION} · ${STRATEGY}

**Captured:** $(date -u +"%Y-%m-%d %H:%M:%S UTC")
**Strategy:** ${STRATEGY}
**Source:** PageSpeed Insights API v5
**Routes:** ${#ROUTES[@]} canonical (matches sitemap.ts STATIC_ROUTES)
**Tag:** ${VERSION}

## Score legend
- **Perf / A11y / BP / SEO** — Lighthouse 0-100 scores (90+ = green)
- **LCP** — Largest Contentful Paint (target < 2.5 s)
- **CLS** — Cumulative Layout Shift (target < 0.1)
- **FCP** — First Contentful Paint (target < 1.8 s)
- **TBT** — Total Blocking Time (target < 200 ms)

## Results

| Route | Perf | A11y | BP | SEO | LCP | CLS | FCP | TBT |
|----|---:|---:|---:|---:|---:|---:|---:|---:|
EOF

# Run each route
TOTAL=${#ROUTES[@]}
i=0
FAILED=0
for route in "${ROUTES[@]}"; do
  i=$((i + 1))
  URL="https://${HOST}${route}"
  printf "  [%2d/%d] %s ..." "$i" "$TOTAL" "$route"

  # PageSpeed API call. Note: takes 10-30s per URL — total run ~5-10 min.
  # Use -G + --data-urlencode so the url= parameter is properly URL-encoded
  # (otherwise the colon and slashes in https://... break the query string).
  # Capture HTTP code separately so we can diagnose failures instead of
  # silently swallowing them like the v1 -sf flag did.
  # Build curl args — append key= only if set (avoid empty key= which API rejects)
  CURL_ARGS=(-s --max-time 60 -w $'\n%{http_code}' -G "${API}"
    --data-urlencode "url=${URL}"
    --data-urlencode "strategy=${STRATEGY}"
    --data-urlencode "category=performance"
    --data-urlencode "category=accessibility"
    --data-urlencode "category=best-practices"
    --data-urlencode "category=seo")
  if [ -n "${KEY_OPTION}" ]; then
    CURL_ARGS+=(--data-urlencode "key=${KEY_OPTION}")
  fi

  HTTP_RESP=$(curl "${CURL_ARGS[@]}" 2>&1) || {
      echo " ❌ curl transport error"
      echo "| ${route} | ⚠️ curl transport error | | | | | | | |" >> "${OUT}"
      FAILED=$((FAILED + 1))
      continue
    }
  HTTP_CODE=$(echo "${HTTP_RESP}" | tail -1)
  RESP=$(echo "${HTTP_RESP}" | sed '$d')

  if [ "${HTTP_CODE}" != "200" ]; then
    echo " ❌ HTTP ${HTTP_CODE}"
    # Diagnostic dump on first failure of the run
    if [ "${FAILED}" -eq 0 ]; then
      echo "    First-failure diagnostic — response excerpt (first 6 lines):"
      echo "${RESP}" | head -6 | sed 's/^/      | /'
      echo ""
    fi
    echo "| ${route} | ⚠️ HTTP ${HTTP_CODE} | | | | | | | |" >> "${OUT}"
    FAILED=$((FAILED + 1))
    continue
  fi

  # Parse + append row
  ROW=$(echo "${RESP}" | python3 -c "
import sys, json
try:
    d = json.loads(sys.stdin.read())
    lh = d.get('lighthouseResult', {})
    cats = lh.get('categories', {})
    audits = lh.get('audits', {})

    def score(key):
        s = cats.get(key, {}).get('score')
        return str(int(s*100)) if s is not None else '?'

    def metric(key):
        return audits.get(key, {}).get('displayValue', '?')

    perf = score('performance')
    a11y = score('accessibility')
    bp = score('best-practices')
    seo = score('seo')
    lcp = metric('largest-contentful-paint')
    cls = metric('cumulative-layout-shift')
    fcp = metric('first-contentful-paint')
    tbt = metric('total-blocking-time')
    print(f'| ${route} | {perf} | {a11y} | {bp} | {seo} | {lcp} | {cls} | {fcp} | {tbt} |')
except Exception as e:
    print(f'| ${route} | parse error: {e} | | | | | | | |')
" 2>/dev/null) || {
      echo " ❌ parse error"
      echo "| ${route} | ⚠️ parse error | | | | | | | |" >> "${OUT}"
      FAILED=$((FAILED + 1))
      continue
    }

  echo "${ROW}" >> "${OUT}"

  # Extract perf score for terminal display
  PERF=$(echo "${ROW}" | awk -F'|' '{gsub(/^ +| +$/, "", $3); print $3}')
  echo " perf=${PERF}"

  # Polite throttle — PageSpeed prefers ~5s gap between requests.
  sleep 5
done

# Footer
cat >> "${OUT}" <<EOF

## Notes

- Run via \`./scripts/lighthouse-baseline.sh ${STRATEGY}\` from repo root.
- Compare against future runs by diff'ing the table — any score drop ≥ 10 or LCP rise ≥ 500ms is a regression signal.
- ${FAILED} route(s) failed during capture (transient API issue or rate limit — re-run that subset if needed).
- Captured against tag ${VERSION} · Worker live at https://${HOST}
EOF

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   BASELINE CAPTURE COMPLETE"
echo "   Output: ${OUT}"
echo "   ${FAILED}/${TOTAL} routes failed"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Preview the table:"
echo "    cat ${OUT}"
echo ""
echo "Or paste it back to Cowork to write the baseline memory entry."
