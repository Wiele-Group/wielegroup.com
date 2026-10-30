# Wiele Properties — search and AI discovery rollout

Verified 30 October 2026, Europe/Malta.

## Applied and verified

| Platform | Result | Verification |
| --- | --- | --- |
| Website | More precise Malta property-marketing description; seven visible FAQs with matching structured answers; buyer/seller Service entities linked to their pages and Wiele Organization; social-image descriptions disclose AI-created concepts; llms.txt image classifications clarified. | Production build, TypeScript, changed-file lint, local HTTP checks and all ten live-page checks passed. |
| LinkedIn | Added concise answers covering service scope, Swieqi base and enquiry process to the existing approved overview. | Saved and read back in editor, 1,691/2,000 characters; no announcement post. Existing tagline, specialties, phone and website verified. |
| Facebook | Bio now leads with Malta property marketing and buyer introductions; includes apartments, residences, portfolios, local/international audience, Jonathan Landman, Swieqi, appointment basis, approved tagline and website. | Saved and read back, 222/255 characters. Current public name Wiele Properties and vanity URL https://www.facebook.com/wieleproperties/ observed. Existing service specialties reviewed. |
| Instagram | Bio leads with Malta property marketing and introductions; retains approved tagline, Jonathan Landman, Swieqi, appointment basis and domain. | Profile saved confirmation; 131/150 characters. Desktop editor states dedicated website-link editing requires mobile. |
| Google Search Console | Canonical sitemap resubmitted. | “Sitemap submitted successfully” confirmation. Before submission, sitemap showed Success, last read 29 October, ten discovered URLs. Discovery is not proof that all ten pages are indexed. |
| Bing / participating IndexNow engines | All ten canonical sitemap URLs submitted via IndexNow. | HTTP 200 accepted. No claim of completed recrawl or index inclusion. |
| Google Business Profile | Name aligned to Wiele Properties; factual 715-character service description saved; LinkedIn, Facebook and Instagram profile links added. | Name, full description (reopened) and all three saved links read back in manager. Profile was unverified / not publicly visible; owner verification remains required. |

## Website delivery

- Source commit: 915c5fe.
- Cloudflare Worker: wielegroup-com.
- Production version: 4efb243f-0e39-4f67-bbfe-a53e4b2b1b2a.
- Production URL: https://wielegroup.com/.
- Ten routes: /, /selling, /buying, /properties, /malta-investment-report, /about, /contact, /privacy, /terms, /credits.
- Live checks: HTTP 200; one H1 per page; one correct canonical; unique titles/descriptions; matching Open Graph and Twitter descriptions; absolute social-image URLs; image descriptions; preview assets reachable; Organization/WebSite and page/breadcrumb relationships; buyer/seller service identity; FAQ answers identical to visible text; 22 assets; 15 internal link destinations; retired agency routes 404; sitemap coverage and modification dates; robots.txt and llms.txt available.
- Existing unrelated AGENTS.md changes were preserved and restored after the required clean-tree deployment check. Existing untracked assets preserved. Synced sources were not edited.

## Saved profile copy

Facebook:

Malta property marketing & buyer introductions.
Malta Property. Global Ambition.
Apartments, residences & portfolios for local and international buyers and owners.
Jonathan Landman · Swieqi · By appointment.
wielegroup.com

Instagram:

Malta property marketing & introductions
Malta Property. Global Ambition.
Jonathan Landman · Swieqi · By appointment
wielegroup.com

LinkedIn additions to existing approved overview:

What does Wiele do? Property marketing and buyer introductions in Malta. Letting, property management and fund management are not offered.
Where is Wiele based? Swieqi, Malta; meetings by appointment.
How do I enquire? Share your property type, Malta locations, budget and timing through the website, email or WhatsApp.

Google Business Profile:

Malta property marketing and buyer introductions, led by Jonathan Landman in Swieqi. Wiele Properties welcomes local and international buyers and owners of apartments, residences and portfolios. For owners: accurate particulars, property presentation, photography direction, listing copy and digital marketing. For buyers: share your Malta locations, property type, budget, objectives and timing. Collected rent, contracted rent and projected income are distinguished; returns are not guaranteed. Sales documentation is handled by appropriately licensed practitioners. No letting, property management or fund management. Established 2026. By appointment only. English and Afrikaans. Malta Property. Global Ambition.

## Limits and unfinished work

- Google Business owner verification is required for public visibility. No invented address or verification evidence was supplied.
- Google Search Console overview contains historical URLs and legacy product reports from the prior website; do not read the domain-wide indexed count as the current property site's coverage.
- Analytics event receipt remains an unresolved earlier issue; not tested or repaired in this metadata rollout.
- Social platforms control their generated HTML metadata; this task updates their supported public profile fields and the website previews used when sharing links.
- AEO/GEO here means clear, factual, crawlable answers and consistent business identity. It does not guarantee rankings, AI citations, indexing or rich results. llms.txt is an informational resource, not a special eligibility requirement.
- No advertising spend, budget change, outreach or separate announcement post.

## Primary guidance checked

Accessed 30 October 2026:

- https://developers.google.com/search/docs/appearance/ai-features — ordinary SEO principles apply to AI features; no special AI markup is required.
- https://developers.google.com/search/docs/appearance/structured-data/organization — consistent organization details help identify the business.
- https://support.google.com/business/answer/3038177 — factual real-world name and useful business description.
- https://support.google.com/business/answer/13580646 — supported social-profile links.
- https://developers.cloudflare.com/workers/wrangler/commands/ — deployment command guidance.
