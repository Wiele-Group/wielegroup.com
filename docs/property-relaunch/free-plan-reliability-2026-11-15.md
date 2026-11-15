# Free-plan reliability — 15 November 2026

User decision: “Keep the Free plan for now.” No paid upgrade is authorised. The attempted 100 ms configuration in 9459ab7 was rejected by Cloudflare (100328) and never deployed. Remove that limit, retain the existing Free plan, account, bindings and routes.

Official Worker telemetry for production 107e03a3 identified genuine exceededCpu outcomes at 10 ms during cold requests. Targeted successful retries do not establish reliability. Use the installed OpenNext adapter's supported static-assets incremental cache and cache interception to avoid loading NextServer for prerendered public pages. No PPR, live CMS or revalidation-dependent pages are configured. Dynamic article/listing access and APIs remain dynamic. The runtime still has the Free plan's hard limits; this optimisation is not a capacity guarantee.

Sources reviewed: https://opennext.js.org/cloudflare/caching (SSG and cache interception) and https://developers.cloudflare.com/workers/platform/limits/ (CPU limits). Installed @opennextjs/cloudflare 1.19.5 supports both configuration options; no dependency upgrade or new resource.

The existing deployment gate now populates the read-only cache before local verification, matching the cache assets uploaded by OpenNext deploy. Confirmed 66 generated cache entries include no protected article/listing detail pages. Public cache misses show x-opennext-cache: HIT, confirming adapter interception rather than merely a warm outer HTML cache. Existing source-linked metadata, crawl resources and access restrictions pass the complete rendered checks.

The outer edge HTML cache now bypasses RSC and segment-prefetch header requests even when the query lacks _rsc. Added HTTP regression checks that warm HTML, request the same URL as a component response, and revisit HTML; validates representation/content type/Vary isolation rather than relying on implementation shape.

Local build/TypeScript, changed-file lint, Python syntax and all 72 rendered pages, 59 assets and 103 internal destinations passed, including protected anonymous access and new representation checks. Re-run the prescribed npm run deploy:cf gate, inspect the actual deployed version and check fresh production requests and telemetry before closing the issue. Local emulation does not enforce production CPU limits. Deployment evidence and any remaining failures belong in the dated delivery folder.

Review: no page content, identity, imagery, schemas, canonical URLs, sitemap scope, contact forms, privacy choices or registration rules changed. No new AI calls, cron, storage service, subscription, DNS or credential change. Prerender-cache assets use OpenNext's reserved cdn-cgi path. The previous live source 551c503 and Worker 107e03a3 remain the recovery reference.
