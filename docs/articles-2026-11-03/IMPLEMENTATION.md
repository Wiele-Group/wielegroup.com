# Articles implementation and release preparation

Authorised: write the researched article, create an Articles website section, require registration to access articles, and focus current/future editorial coverage on Malta income property and going concerns.

Public routes: /articles and /articles/malta-short-let-investment-2026 (title, image, summary and registration invitation). Full text is rendered only after server validation of a signed HttpOnly cookie. Text lives in a server-only module; charts are available only from protected /api/articles/media routes. No full article or chart is placed in public/static assets. The public hero is an explicitly disclosed AI illustration.

Registration uses existing Cloudflare KV, Turnstile, HMAC secret and Resend infrastructure. The article cookie uses a distinct signed purpose from the existing report cookie, is Secure/HttpOnly/SameSite=Lax, lasts 30 days and contains no name or email. A registration record must be saved before access is issued. Notification failure retains the saved record and access. No new account/login provider, paid resource, database migration or DNS change.

Public metadata, canonical/social links, Article registration schema, breadcrumbs, navigation, homepage introduction, sitemap, llms.txt, image credits, privacy and terms updated. The Worker explicitly bypasses caches for article HTML/RSC, preserves private/no-store headers and blocks shared caching of private responses.

Recovery: prior production Worker 05d80955-42ca-41a7-ab01-add3b7866738. Prior source 6eec8f2. Changes isolated from unrelated source-worktree AGENTS.md and untracked assets.

Validation before release: 47 backend tests passed; changed-file lint and TypeScript passed; Cloudflare build passed. Built HTTP checks passed for 16 public routes, 32 assets and 24 internal destinations. Public build scanned for a protected-prose marker with no exposure. Synthetic local signed-reader fixture verified full HTML and both PNG charts; anonymous/forged cookies denied content and chart access; private cache bypass checked. Browser 320/768/1440 checked on catalogue, gate and registered article without horizontal overflow. Marketing checkbox unticked. Missing-challenge UI error retained entered values. Local Turnstile domain failure is expected. No production registration, CAPTCHA completion or actual inbox receipt tested. No claim of Analytics event receipt.

Final live release results are recorded in DELIVERY-STATUS.md after deployment.
