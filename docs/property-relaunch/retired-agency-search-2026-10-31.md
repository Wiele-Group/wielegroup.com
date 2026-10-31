# Retired agency search correction — 31 October 2026

Public search sample for `"wielegroup.com"` and `site:wielegroup.com` surfaced former /pricing and /citation-brief/brand-semantics-infrastructure content advertising SEO, marketing and AI-search services. Direct /pricing fetch returned 404; homepage describes current Malta property services. Public search also surfaced historical agency wording in Jonathan Landman's LinkedIn posts. These observations do not reproduce the user's exact Gemini response.

Change: explicit HTTP 410 Gone + noindex for 17 retired agency section roots and descendants, enforced before Cloudflare cache lookup and in Edge middleware. No unrelated homepage redirects. Current property pages remain indexable; robots allows crawlers to see retired statuses. API and unrelated missing routes retain 404. New cache release key prevents old HTML reuse.

Current entity aliases (Wiele Group, WieleGroup, Wiele Property) added to Organization and WebSite. Two visible homepage FAQs explain identity and retired offer and use the existing shared schema source. About and llms.txt agree. No legal-company identity is invented. Current public brand, contact details, current services, imagery and scope preserved.

Google treats ordinary 4xx responses (except 429) as signals that content is unavailable and removes previously indexed URLs over time. 410 is an explicit retirement signal; no faster removal than 404 is promised. Search and Gemini refresh timing is outside website control. llms.txt does not guarantee AI ingestion. Reference: https://developers.google.com/crawling/docs/troubleshooting/http-status-codes and https://developers.google.com/search/docs/appearance/ai-features (accessed 31 October 2026).

Rollback: preceding source commit 3a2f376. Existing unrelated working-tree changes preserved in original checkout; release built in isolated worktree. See delivery status for final checks and deployment identifier.

Live release: source 093707a; Worker e55363ea-3f8f-483d-a426-86f061b19a63. Cloudflare build/TypeScript and all 12 local/live page checks passed. Verified Googlebot HEAD responses on all 17 retired section roots (410 + noindex). IndexNow accepted 12 current sitemap URLs (HTTP 200). Google Search Console recorded all 17 retired prefix-removal requests (Processing request); canonical sitemap submission succeeded on 31 October. Search Console still showed 10 discovered pages from its prior read; fresh coverage is not confirmed.
