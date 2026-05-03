// open-next.config.ts
// OpenNext configuration for Cloudflare Workers deployment.
// Generated 2026-05-03 — minimal config per @opennextjs/cloudflare 1.19+ docs.
//
// Defaults are sufficient for first deploy. ISR cache uses the static-assets
// cache by default; can be upgraded to KV or R2 cache later for higher
// throughput without code changes.

import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({});
