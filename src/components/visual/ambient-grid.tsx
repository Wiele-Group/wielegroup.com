/**
 * AmbientGrid — global cinematic background layer.
 *
 * DEPRECATED (v3.7.0): SiteBackdrop (art-directed webp crops) replaced this
 * component as the primary background layer. This file is retained as a
 * pure-CSS fallback for contexts where the backdrop images are unavailable.
 * It is NOT mounted in layout.tsx.
 *
 * Provides three depth layers when used:
 *   1. 64px grid lattice (linear-gradient overlay), radial-masked at edges.
 *   2. Top-centre blue glow (--color-blue-hi) — anchors the hero band.
 *   3. Right-third neon glow (--color-neon) — pulls the eye into the rail.
 *
 * Brand v2 — B4 Chromaglass. Glow tints use B4 blue-hi and neon tokens.
 * Pure CSS, no JS, no observers. `fixed` positioning persists across routes.
 * `pointer-events: none` never blocks interaction. `aria-hidden` skips screen readers.
 */
export function AmbientGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Layer 1 — grid lattice, radial-masked at edges */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 75% 55% at 50% 40%, #000 25%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 55% at 50% 40%, #000 25%, transparent 80%)",
        }}
      />

      {/* Layer 2 — top-centre electric glow */}
      <div
        className="absolute -top-32 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(91, 171, 255, 0.13) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      {/* Layer 3 — right-third neon glow */}
      <div
        className="absolute right-0 top-1/3 h-[34rem] w-[34rem] translate-x-1/3 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0, 217, 255, 0.09) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}
