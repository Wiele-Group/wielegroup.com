# Cowork handoff · v3.9.1 OG Images Pass

**Issued:** 2026-05-13
**From:** Claude Code session (v3.9.1a-infra-hygiene shipped commit `6019e43`)
**To:** Cowork session with `wiele-corporate-visual-artist` skill + premium image-gen tool
**Predecessor tag:** `v3.9.1a-infra-hygiene` (pushed to origin)
**Target tag (this work):** `v3.9.1-og-images-pass` — closes the v3.9.x XRAY SUPERSWEEP
**Branch to create:** `xray/og-images-cowork-2026-05-13` (from current `main`)

---

## Why this is a handoff (not a Claude Code direct ship)

The Claude Code session that handled Items A + C (drift fix, redirect audit) did not have a premium text-to-image MCP tool wired. Adobe Firefly MCP exposed image-edit operations only (no clean 1200×630 text-to-image at brand quality). The directive's own path 3 anticipated this exact scenario:

> "Last resort: queue for a Cowork session where `wiele-corporate-visual-artist` skill + a premium image-gen tool is fully wired, then commit the 5 PNGs in a separate small commit. If using path 3, ship Item A independently first so the supersweep doesn't block on image-gen tooling availability."

That's the path taken. Items A + C shipped 2026-05-13 as `v3.9.1a-infra-hygiene`. Item B (this handoff) closes the supersweep.

---

## Scope — 3 atomic parts

| Part | What | Where |
|---|---|---|
| 1 | Generate 5 OG images at 1200×630 PNG | `public/images/og/*.png` (new dir, ensure committed) |
| 2 | Extend `buildMetadata()` helper with `ogImageAlt` param | `src/lib/metadata.ts` |
| 3 | Wire per-route OG image + alt-text in 5 routes | 5 `page.tsx` files |

Ship as a single commit + deploy + tag. The deploy script (`npm run deploy:cf`) auto-fires IndexNow for all 32 sitemap URLs after wrangler succeeds — no manual ping required.

---

## Part 1 — Generate the 5 OG images

### Brand spec (BINDING — from `reference_wiele_brand_kit.md`)

| Element | Spec |
|---|---|
| Background | Obsidian `#141c2e` (CSS var `--color-void`) |
| Accent (primary) | Electric blue `#3b82f6` |
| Accent (secondary) | Electric blue light `#5babff` |
| Typography | Geist (sans-serif primary, mono for utility chips) |
| Hero accent | 3D Chromaglass W — refractive glass / liquid chrome (existing style on `public/images/agencies/wiele-marketing-agency-hero-systems-intelligence.png`) |
| Output dimensions | **1200×630 PNG** (OG standard) |
| File naming | `wiele-{topic}-{angle}-{context}.png` per Image File Naming + Alt-Text SEO Law |
| Alt text length | **80–125 characters** per same law |
| Style continuity | Must match the founder-approved `wiele-marketing-agency-hero-systems-intelligence.png` and `wiele-web-design-agency-hero-conversion-experience.png` |
| Aesthetic ceiling | Goldman/Hermès tier — never SaaS/startup template — never icons or stock imagery |

### The 5 images (filenames + prompts + alt-text)

> Treat each prompt as binding. Style references in `public/images/agencies/` are founder-approved — use them as anchors for the Chromaglass W treatment.

#### 1 — Homepage `/`

**Filename:** `public/images/og/wiele-homepage-hero-six-disciplines-one-engine.png`

**Generation prompt:**
> Premium dark editorial OG image, 1200×630. Background: deep obsidian `#141c2e` with subtle radial gradient (lighter at center, darker at edges). Center-left: large refractive 3D Chromaglass capital "W" letter, electric-blue `#3b82f6` lighting reflecting through liquid-chrome surface, premium luxury feel — exactly the treatment used in existing Wiele agency hero images. Right side: minimal Geist sans-serif typography "Six disciplines. One operating system." in `#ffffff` at approximately 64pt, with a thin electric-blue accent line `#5babff` underneath. Bottom-right: small `WIELE GROUP` lockup in Geist mono `#ffffff` 80% opacity. Composition: 60/40 weight split (W on left, copy on right), generous negative space, premium agency aesthetic. NO photorealistic people. NO stock photography. NO icons. Pure typographic + Chromaglass W only.

**Alt text (105 chars):**
`Wiele Group homepage — six discipline operating system for premium AI search dominance and compounding growth.`

#### 2 — `/pricing`

**Filename:** `public/images/og/wiele-pricing-six-tier-ladder-ai-visibility-defense.png`

**Generation prompt:**
> Premium dark editorial OG, 1200×630. Background: obsidian `#141c2e`. Left third: refractive 3D Chromaglass "W" emerging from the bottom edge, smaller than the homepage version (approximately 30% canvas height). Right two-thirds: six horizontal tier lines stepping up like a staircase from bottom-left to upper-right, each line with a tier label in Geist `#ffffff` and a small electric-blue `#3b82f6` price chip — labels in this order: Signal Audit £2,500 · Launch £1,950/mo · Growth £4,500/mo · Authority £8,500/mo · Wiele OS £15,000/mo · Sovereign £45,000/mo. Top-right corner: small outlined chip `AI VISIBILITY DEFENSE · BUILT-IN` in `#5babff`. Premium ladder visual — the feel of a Goldman Sachs tier card, never a SaaS pricing page.

**Alt text (123 chars):**
`Wiele Group pricing — six-tier ladder Signal Audit £2,500 through Sovereign £45,000, AI Visibility Defense in every tier.`

#### 3 — `/audit`

**Filename:** `public/images/og/wiele-ai-visibility-audit-fourteen-day-citation-map.png`

**Generation prompt:**
> Premium dark editorial OG, 1200×630. Background: obsidian `#141c2e` with faint grid lines `#5babff` at 10% opacity — visual metaphor for a citation map / scan grid. Center-left: stylized 3D Chromaglass "scanning lens" or refractive sphere shape — same blue-chrome material language as the W in other Wiele assets, premium feel. Right two-thirds: large Geist headline `#ffffff` at approximately 56pt "AI Visibility Audit" with subheading `#5babff` at approximately 28pt "£2,500 · 14 days". Below the subheading: four small abstract typographic chips for the engines (ChatGPT · Perplexity · Gemini · Claude) in `#ffffff` 70% opacity Geist mono. Bottom edge: thin electric-blue accent line.

**Alt text (118 chars):**
`Wiele AI Visibility Audit — £2,500 fourteen-day diagnostic mapping brand citation across ChatGPT, Perplexity, Gemini, Claude.`

#### 4 — `/platform`

**Filename:** `public/images/og/wiele-platform-wiele-os-four-growth-systems-one-engine.png`

**Generation prompt:**
> Premium dark editorial OG, 1200×630. Background: obsidian `#141c2e`. Center: four horizontal refractive Chromaglass bars stacked, each one labeled in Geist `#ffffff` at top: AI VISIBILITY · SEARCH AUTHORITY · BRAND AUTHORITY · WEB EXPERIENCE. The four bars merge at the right edge into a single Chromaglass "W" — visual metaphor for "four systems, one engine". Electric-blue `#3b82f6` glow underneath the merging point. Top-left: `WIELE OS` lockup in Geist mono `#ffffff`. Premium architectural feel — the aesthetic of a system-diagram for a luxury brand, never a generic feature-block layout.

**Alt text (115 chars):**
`Wiele OS platform — four integrated growth systems (AI Visibility, Search, Brand, Web) running on one operating engine.`

#### 5 — `/systems`

**Filename:** `public/images/og/wiele-systems-four-disciplines-compound-each-other.png`

**Generation prompt:**
> Premium dark editorial OG, 1200×630. Background: obsidian `#141c2e`. Center: four overlapping refractive Chromaglass circles arranged in Venn-diagram style, but premium and architectural — never cartoony, never flat-color. Each circle labeled in Geist `#ffffff` at approximately 24pt: AI Visibility · Search · Brand · Web Experience. The zone where all four overlap glows brightest electric-blue `#3b82f6` — visual metaphor for the compounding zone. Top-right tagline in Geist `#ffffff` at approximately 28pt: "The systems make each other stronger." Bottom-left: small `WIELE GROUP` lockup in Geist mono.

**Alt text (110 chars):**
`Wiele growth systems — four disciplines (AI Visibility, Search, Brand, Web) compound each other on one engine.`

---

## Part 2 — Extend `buildMetadata()` with `ogImageAlt`

The current helper at `src/lib/metadata.ts` hardcodes `alt: siteConfig.name` for every route's OG image. We need a per-route override.

### Exact diff

```diff
 type BuildMetadataInput = {
   title?: string;
   description?: string;
   path?: string;
   ogImage?: string;
+  ogImageAlt?: string;
   noindex?: boolean;
 };

 export function buildMetadata({
   title,
   description = siteConfig.description,
   path = "/",
   ogImage = siteConfig.ogImage,
+  ogImageAlt = siteConfig.name,
   noindex = false,
 }: BuildMetadataInput = {}): Metadata {
   const fullTitle = title
     ? `${title} | ${siteConfig.name}`
     : `${siteConfig.name} — ${siteConfig.tagline}`;
   const url = new URL(path, siteConfig.url).toString();

   return {
     // ... existing fields ...
     openGraph: {
       // ... existing fields ...
-      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
+      images: [{ url: ogImage, width: 1200, height: 630, alt: ogImageAlt }],
     },
     // ... existing fields ...
   };
 }
```

**Backward compatible** — every existing caller that omits `ogImageAlt` keeps the previous default (`siteConfig.name`).

---

## Part 3 — Wire per-route OG image + alt-text in 5 routes

For each route, add `ogImage` and `ogImageAlt` to the existing `buildMetadata()` call. **Preserve every other field.**

### Homepage — `src/app/page.tsx`

Note: page.tsx doesn't currently call `buildMetadata()` (it uses default metadata from `app/layout.tsx`). Either:
- (a) Add a `buildMetadata()` call at module scope with both new fields, OR
- (b) Update the root `layout.tsx` metadata to use the homepage OG (preferred — homepage is the root canonical).

Recommended option (b) — add the homepage OG to `src/app/layout.tsx`:

```diff
 export const metadata: Metadata = buildMetadata({
+  ogImage: "/images/og/wiele-homepage-hero-six-disciplines-one-engine.png",
+  ogImageAlt: "Wiele Group homepage — six discipline operating system for premium AI search dominance and compounding growth.",
   // existing fields preserved
 });
```

### `/pricing` — `src/app/pricing/page.tsx`

```diff
 export const metadata: Metadata = buildMetadata({
   // existing fields preserved
+  ogImage: "/images/og/wiele-pricing-six-tier-ladder-ai-visibility-defense.png",
+  ogImageAlt: "Wiele Group pricing — six-tier ladder Signal Audit £2,500 through Sovereign £45,000, AI Visibility Defense in every tier.",
 });
```

### `/audit` — `src/app/audit/page.tsx`

```diff
 export const metadata: Metadata = buildMetadata({
   // existing fields preserved
+  ogImage: "/images/og/wiele-ai-visibility-audit-fourteen-day-citation-map.png",
+  ogImageAlt: "Wiele AI Visibility Audit — £2,500 fourteen-day diagnostic mapping brand citation across ChatGPT, Perplexity, Gemini, Claude.",
 });
```

### `/platform` — `src/app/platform/page.tsx`

```diff
 export const metadata: Metadata = buildMetadata({
   // existing fields preserved
+  ogImage: "/images/og/wiele-platform-wiele-os-four-growth-systems-one-engine.png",
+  ogImageAlt: "Wiele OS platform — four integrated growth systems (AI Visibility, Search, Brand, Web) running on one operating engine.",
 });
```

### `/systems` — `src/app/systems/page.tsx`

```diff
 export const metadata: Metadata = buildMetadata({
   // existing fields preserved
+  ogImage: "/images/og/wiele-systems-four-disciplines-compound-each-other.png",
+  ogImageAlt: "Wiele growth systems — four disciplines (AI Visibility, Search, Brand, Web) compound each other on one engine.",
 });
```

---

## Build + deploy

```bash
cd "/Users/jonathanlandman/Documents/Claude/Projects/Wiele Group Operations/wielegroup.com"
git checkout main && git pull origin main
git checkout -b xray/og-images-cowork-2026-05-13

# After landing PNGs, helper extension, and 5 route updates:
npm run typecheck   # must be clean
npm run lint        # must be clean
npm run deploy:cf   # chained: build:cf → wrangler deploy → indexnow:ping (auto-fires 32 URLs)
```

---

## Validation gates (against PROD — Single Source of Truth Law)

```bash
UA="Mozilla/5.0 (Macintosh) WIELE-validate"

# Each route serves its specific OG
for p in / /pricing /audit /platform /systems ; do
  echo "$p:"
  curl -s -A "$UA" "https://wielegroup.com$p" | grep -oE 'property="og:image" content="[^"]*"' | head -1
done
# Expected: 5 different filenames, all under /images/og/

# Each asset file is reachable
for f in \
  wiele-homepage-hero-six-disciplines-one-engine.png \
  wiele-pricing-six-tier-ladder-ai-visibility-defense.png \
  wiele-ai-visibility-audit-fourteen-day-citation-map.png \
  wiele-platform-wiele-os-four-growth-systems-one-engine.png \
  wiele-systems-four-disciplines-compound-each-other.png ; do
  curl -sI -A "$UA" "https://wielegroup.com/images/og/$f" | head -3
done
# Expected: HTTP 200 · content-type: image/png · cf-cache-status (HIT after warm)

# Alt text in HTML (twitter:image:alt fallback)
for p in / /pricing /audit /platform /systems ; do
  echo "$p:"
  curl -s -A "$UA" "https://wielegroup.com$p" | grep -oE 'property="og:image:alt" content="[^"]*"' | head -1
done
```

Visual validation (browser, open both for each of the 5 URLs):
- https://www.linkedin.com/post-inspector/
- https://cards-dev.twitter.com/validator

---

## Regression gates — must all still pass post-deploy

```bash
UA="Mozilla/5.0 (Macintosh) WIELE-validate"

# CF HTML cache MISS → HIT
curl -s -A "$UA" -L --compressed -D /dev/stderr -o /dev/null "https://wielegroup.com/" 2>&1 | grep cf-cache-status
sleep 4
curl -s -A "$UA" -L --compressed -D /dev/stderr -o /dev/null "https://wielegroup.com/" 2>&1 | grep cf-cache-status
# Expected: MISS first, HIT second

# Sitemap byte-stable 30s apart
curl -s -A "$UA" "https://wielegroup.com/sitemap.xml" | grep -oE '<lastmod>[^<]+' | sort -u > /tmp/l1.txt
sleep 30
curl -s -A "$UA" "https://wielegroup.com/sitemap.xml" | grep -oE '<lastmod>[^<]+' | sort -u > /tmp/l2.txt
diff /tmp/l1.txt /tmp/l2.txt && echo "✓ identical"

# IndexNow key file + alias
curl -s -A "$UA" "https://wielegroup.com/indexnow.txt"
# Expected: 039085047de03d9f461bdf6f2d8beea5

# apple-touch-icon Cache-Control
curl -sI -A "$UA" "https://wielegroup.com/apple-touch-icon.png" | grep -i cache-control
# Expected: public, max-age=86400, immutable

# Security headers
curl -sI -A "$UA" "https://wielegroup.com/" | grep -iE "strict-transport|x-frame|x-content|referrer-policy|permissions-policy|content-security-policy"
# Expected: all 6 present
```

---

## Tag + push

```bash
git checkout main
git merge --no-ff xray/og-images-cowork-2026-05-13 -m "Merge — v3.9.1-og-images-pass"
git tag -a "v3.9.1-og-images-pass" -m "v3.9.1-og-images-pass — closes v3.9.x XRAY SUPERSWEEP"
git push origin main
git push origin refs/tags/v3.9.1-og-images-pass
```

---

## Acceptance criteria (mirror of directive)

- [ ] 5 OG image files committed under `public/images/og/`
- [ ] All 5 assets HTTP 200, `content-type: image/png`, cacheable
- [ ] `buildMetadata()` helper extended with `ogImageAlt`, no breaking changes to existing callers
- [ ] 5 routes return their specific OG in HTML (`og:image` + `twitter:image`)
- [ ] LinkedIn Post Inspector renders correctly for all 5 URLs
- [ ] Twitter Card Validator renders correctly for all 5 URLs
- [ ] Filenames follow `wiele-{topic}-{angle}-{context}.png`
- [ ] Alt texts 80–125 chars (verified in prompts above: 105 / 123 / 118 / 115 / 110)
- [ ] All regression gates above pass post-deploy
- [ ] Tag `v3.9.1-og-images-pass` pushed to origin

---

## Non-negotiables (from directive)

- Production-only validation against wielegroup.com
- Zero regressions on security headers, JSON-LD, canonicals, CF cache pattern, sitemap stability, GBP catalogue
- Visual enhancements only — no animation removal, no LCP-stripping, no hero changes outside `public/images/og/`
- No LCP/loading-time work
- Brand kit binding — obsidian + electric-blue + Geist + Chromaglass W. No deviation.
- File naming + alt-text law — `wiele-{topic}-{angle}-{context}.png` + 80–125-char alt

---

**End of handoff.**
