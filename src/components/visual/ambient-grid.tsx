/**
 * AmbientGrid — global cinematic background layer.
 *
 * Mounted as the first child of <body> in src/app/layout.tsx, sits behind
 * all content (-z-10). Provides three layers of depth:
 *
 *   1. 64px grid lattice (linear-gradient overlay), masked with a
 *      radial fade so it dissolves at the viewport edges.
 *   2. Top-centre electric glow (#4A9EFF) — anchors the hero band.
 *   3. Right-third neon glow (#00D9FF) — pulls the eye into the rail.
 *
 * Brand v2 — Midnight Platinum (B3). Glow tints retuned from indigo/cyan
 * to signal-blue/cyan to match the new restrained accent system. See
 * project_brand_v2_doctrine.md for authority.
 *
 * Pure CSS, no JS, no observers. `fixed` positioning so it persists
 * across route changes without remount. `pointer-events: none` so it
 * never blocks interaction. `aria-hidden` so screen readers skip it.
 *
 * Phase 9 (visual upgrade) — additive only. Existing components still
 * render their own `.ambient-gradient` utility on hero sections; this
 * layer sits beneath them and adds global depth.
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
            "radial-gradient(circle at center, rgba(74, 158, 255, 0.13) 0%, transparent 60%)",
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
