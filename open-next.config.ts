// open-next.config.ts
// OpenNext configuration for Cloudflare Workers deployment.
// Generated 2026-05-03 — minimal config per @opennextjs/cloudflare 1.19+ docs.
//
// Serve build-time public pages through the adapter's cache interceptor.
// This avoids loading NextServer on those requests within the Free CPU limit.
// Dynamic access-controlled routes are not prerendered and remain dynamic.

import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
