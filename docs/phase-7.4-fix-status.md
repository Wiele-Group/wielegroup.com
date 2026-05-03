# Phase 7.4 Status — Post-v1.0 Fix-Forward

**Date:** 2026-05-03 (post-v1.0)
**Status:** ✅ Item 1 (labs/<slug> 404) FIXED in production. ⚠️ Items 2 + 3 require Cloudflare dashboard action.

---

## Item 1 — `/labs/<slug>` 404 → FIXED ✅

### Diagnosis

`getArticleBySlug(slug)` and `getArticleToc(slug)` in `src/lib/labs.ts` and `src/lib/labs-toc.ts` use `fs.readdirSync`/`readFileSync` at runtime. OpenNext on Workers fails these silently (returns empty/undefined), the page calls `notFound()`. Compounding: dynamic `import("@/content/labs/${slug}.mdx")` wasn't being followed by the OpenNext bundler — the MDX modules weren't in the Worker bundle.

### Fix

1. Extended `src/lib/labs-static.ts` to carry full article metadata (title, summary, category, author, reviewer, faq, relatedSystems, ogImage, hidden, readingMinutes) + pre-computed TOC entries. All bundled into the Worker — no fs at runtime.
2. Added explicit static MDX imports in `src/app/labs/[slug]/page.tsx` + `ARTICLE_COMPONENTS` map. Static imports force the bundler to track every MDX path.
3. Added `export const dynamic = "force-static"` + `revalidate = false` — defence in depth so OpenNext serves the prerendered HTML via the assets binding.
4. Updated `ArticleMeta`, `RelatedSystems`, `ArticleToc` component prop types to accept the runtime-safe manifest types.

### Verification (production)

```
curl -sI https://wielegroup.com/labs/ai-recommendations-compound  → HTTP 200 ✓
curl -sI https://wielegroup.com/labs/five-citation-signals        → HTTP 200 ✓
curl -sI https://wielegroup.com/labs/search-is-splitting          → HTTP 200 ✓
JSON-LD blocks: 6 (Org + WS + Article + Author + Breadcrumb + FAQPage) ✓
```

### Adding a new article (binding workflow)

1. Drop `.mdx` in `src/content/labs/`
2. Add static import + `ARTICLE_COMPONENTS` entry in `src/app/labs/[slug]/page.tsx`
3. Add `ARTICLE_MANIFEST` entry in `src/lib/labs-static.ts` (must match frontmatter)
4. (Optional) Add `ARTICLE_TOC` entry for sidebar TOC

---

## Item 2 — `/sitemap.xml` redirected ⚠️ DASHBOARD

### Diagnosis

```bash
$ curl -sI https://wielegroup.com/sitemap.xml | head -3
HTTP/2 301
location: https://www.wielegroup.com/_deleted_sitemap_gone.xml

$ curl -sI https://wielegroup-com.wiele-group.workers.dev/sitemap.xml
HTTP/2 200  # workers.dev serves the 17-URL sitemap correctly
```

Zone-level Cloudflare rule (Bulk Redirect, Page Rule, or Dynamic Redirect ruleset) — leftover from the legacy `wiele-edge-seo` deployment.

The OAuth token from `wrangler login` has `zone:read` but NOT `zone_settings:read` or rule-edit scope. Cannot list/modify via API.

### Fix (dashboard, ~3 min)

1. Open: https://dash.cloudflare.com/0edf698a8da62c67cde23e4f97de7a1b/wielegroup.com/rules
2. Check all four rule sections, in order:
   - **Redirect Rules**
   - **Bulk Redirects**
   - **Page Rules**
   - **Transform Rules → URL Rewrite**
3. Find the rule matching `wielegroup.com/sitemap.xml` (action: redirect to `_deleted_sitemap_gone.xml`)
4. **Delete** the rule

### Verify

```bash
curl -sI https://wielegroup.com/sitemap.xml | head -3        # Expect: HTTP/2 200
curl -s https://wielegroup.com/sitemap.xml | grep -c '<loc>' # Expect: 17
```

---

## Item 3 — CSP overlay ⚠️ DASHBOARD

### Diagnosis

```bash
$ curl -sI https://wielegroup-com.wiele-group.workers.dev/ | grep content-security
content-security-policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://plausible.io https://challenges.cloudflare.com; ...
# (strict — from next.config.ts, correct)

$ curl -sI https://wielegroup.com/ | grep content-security
content-security-policy: default-src 'self' https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: blob:; ...
# (permissive — overlaid by zone rule)
```

Same zone-level rule mechanism as Item 2. A Transform Rule on the zone is replacing/setting the CSP header.

### Fix (dashboard, ~2 min)

1. Open: https://dash.cloudflare.com/0edf698a8da62c67cde23e4f97de7a1b/wielegroup.com/rules
2. Rules → Transform Rules → "Modify Response Header"
3. Find rule with action "Set Content-Security-Policy" matching `wielegroup.com/*`
4. **DELETE** it (Worker emits its own correct CSP from `next.config.ts`)
5. Also check + delete any rule setting `X-Frame-Options: SAMEORIGIN` (Worker emits `DENY`)

### Verify

```bash
curl -sI https://wielegroup.com/ | grep -iE 'content-security-policy|x-frame'
# CSP: matches strict from next.config.ts (no 'unsafe-eval', no broad https:/blob:)
# X-Frame-Options: DENY
```

---

## Item 4 — GSC + Bing submission (founder, ~5 min, AFTER Items 2 + 3)

Don't submit until Items 2 + 3 are green. Submitting a sitemap that 301-redirects hurts crawl-budget and indexing.

- **Google Search Console**: https://search.google.com/search-console — Add Property → Domain → `wielegroup.com` → Verify via Cloudflare DNS → Sitemaps → `sitemap.xml` → Submit
- **Bing Webmaster**: https://www.bing.com/webmasters/ — Add Site → `https://wielegroup.com` → Sitemaps → `https://wielegroup.com/sitemap.xml`

---

## Acceptance gate

- [x] All 3 `/labs/<slug>` URLs return 200 in production
- [x] Article body + JSON-LD render correctly (6 blocks per article)
- [ ] **Sitemap returns 17 URLs from `https://wielegroup.com/sitemap.xml`** (dashboard fix)
- [ ] CSP header on custom domain matches strict CSP from `next.config.ts` (dashboard fix)
- [ ] X-Frame-Options on custom domain = `DENY` (dashboard fix)
- [ ] securityheaders.com grade A+ on `https://wielegroup.com` (verify post-fix)
- [ ] GSC sitemap submitted (after 3 above)
- [ ] Bing sitemap submitted (after 3 above)

## Tagging

Per Phase 7.4 directive's "Forbidden": no new release tag for Phase 7.4 — it's a fix-forward on v1.0. Optional: tag `v1.0.1-labs-mdx-fix` once dashboard fixes land.
