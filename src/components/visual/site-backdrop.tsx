/**
 * SiteBackdrop — global art-directed backdrop for every route.
 *
 * Three crops, browser picks one and never loads the others:
 *   - desktop (2880×1620, 16:9 landscape) — viewports ≥1024px
 *   - tablet  (2048×2732, 3:4 portrait)   — viewports 768–1023px
 *   - mobile  (1170×2532, 19.5:9 portrait) — viewports <768px
 *
 * Mounted as the first child of <body> in src/app/layout.tsx, sits behind
 * all content (`-z-10`). Replaces the prior AmbientGrid (v3.6.x), which
 * provided CSS-only grid + glow. The new revised images carry their own
 * grid/glow language — see project memory v3.6.x → v3.7 cycle.
 *
 * Fixed positioning so it persists across route changes without remount.
 * `pointer-events-none` so it never blocks interaction. `aria-hidden` so
 * screen readers skip it. `fetchPriority="high"` on the <img> so the
 * picked source preloads as the LCP candidate on first paint.
 */
export function SiteBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <picture className="block h-full w-full">
        <source
          media="(min-width: 1024px)"
          srcSet="/brand/backdrops/desktop.webp"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/brand/backdrops/tablet.webp"
        />
        <img
          src="/brand/backdrops/mobile.webp"
          alt=""
          width={1170}
          height={2532}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </picture>
    </div>
  );
}
