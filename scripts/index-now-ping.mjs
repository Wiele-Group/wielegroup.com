#!/usr/bin/env node
/**
 * index-now-ping.mjs — fires IndexNow API for every URL in the live
 * sitemap.xml. Run as part of `deploy:cf` after `wrangler deploy` succeeds.
 *
 * Why this exists (v3.9.0-xray-supersweep, 2026-05-13):
 *   The IndexNow key file is live at https://wielegroup.com/<KEY>.txt and
 *   /indexnow.txt (alias). Until this script, zero IndexNow distribution
 *   was happening — Bing + Yandex relied on their own crawler cadence,
 *   meaning new content waited days/weeks to appear in their indices.
 *
 *   This script tells the participating search engines (Bing, Yandex, Seznam,
 *   Naver, Yep) that the listed URLs have been updated. The engines fetch
 *   each URL themselves within their own SLA (typically minutes to hours,
 *   vs. days for crawl-discovery).
 *
 * Strategy:
 *   Fetch live sitemap.xml, extract every <loc>, submit all URLs in a
 *   single batch POST. IndexNow tolerates repeated submissions of unchanged
 *   URLs; over-submitting is wasteful but not harmful. A smarter "diff
 *   against previous deploy's sitemap" optimisation can come later — for
 *   v3.9.0 the simple flood is acceptable, sitemap is small (~30 URLs).
 *
 * Failure modes:
 *   - IndexNow returns 200, 202, or 4xx. We treat 200/202 as success.
 *   - On 4xx the response body usually explains (e.g. key file not
 *     reachable from IndexNow's edge → 422). Log and exit non-zero.
 *   - On network/DNS failure: log and exit non-zero — caller can choose to
 *     ignore (deploy already succeeded; IndexNow ping is best-effort).
 *
 * Idempotency: yes. Submitting the same URL list twice in a row is safe.
 */

const KEY = "039085047de03d9f461bdf6f2d8beea5";
const HOST = "wielegroup.com";
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow";
const USER_AGENT =
  "Mozilla/5.0 (compatible; wielegroup-indexnow-ping/1.0; +https://wielegroup.com)";

async function fetchSitemap() {
  const resp = await fetch(SITEMAP_URL, {
    headers: { "User-Agent": USER_AGENT },
  });
  if (!resp.ok) {
    throw new Error(
      `[indexnow] sitemap fetch failed: ${resp.status} ${resp.statusText}`,
    );
  }
  return resp.text();
}

function extractUrls(sitemapXml) {
  // Lightweight regex over <loc>...</loc>. Avoids pulling in an XML parser
  // dependency for what is a well-formed, predictable structure that our
  // own sitemap.ts emits.
  const matches = sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g);
  return Array.from(matches, (m) => m[1].trim()).filter(Boolean);
}

async function submitToIndexNow(urlList) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };
  const resp = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "User-Agent": USER_AGENT,
    },
    body: JSON.stringify(payload),
  });
  const body = await resp.text();
  return { status: resp.status, body };
}

async function main() {
  // Allow opting out via env var (useful in CI dry-runs or local builds
  // where the key file isn't yet live).
  if (process.env.INDEXNOW_SKIP === "1") {
    console.log("[indexnow] INDEXNOW_SKIP=1 — skipping ping");
    return;
  }

  console.log(`[indexnow] fetching ${SITEMAP_URL}`);
  const xml = await fetchSitemap();
  const urls = extractUrls(xml);

  if (urls.length === 0) {
    console.error("[indexnow] no <loc> entries found in sitemap.xml — aborting");
    process.exit(1);
  }

  console.log(`[indexnow] submitting ${urls.length} URLs to ${INDEXNOW_ENDPOINT}`);
  const { status, body } = await submitToIndexNow(urls);

  if (status === 200 || status === 202) {
    console.log(`[indexnow] ✓ submitted (${status})`);
    return;
  }

  console.error(`[indexnow] ✗ failed (${status})`);
  if (body) console.error(`[indexnow] response body: ${body}`);
  process.exit(1);
}

main().catch((err) => {
  console.error(`[indexnow] error: ${err.message}`);
  // Best-effort: exit non-zero so deploy script surfaces the failure but
  // caller can choose to ignore (deploy already succeeded by this point).
  process.exit(1);
});
