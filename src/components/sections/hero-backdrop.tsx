/**
 * Hero backdrop — 5 token-driven layers (mesh, grid, light, constellation, grain).
 * Inline SVG + CSS only. No raster, ~0KB asset cost.
 *
 * Layer order (back → front):
 *   1. mesh    — radial conic over --color-void / --color-bg-midnight / --color-bg-elevated
 *   2. grid    — isometric 60px lattice in --color-blue-hi @ 5% (md+ only)
 *   3. light   — volumetric radial from upper-right
 *   4. star    — constellation focal + satellites + hairlines (md+ only, pulse xl+)
 *   5. grain   — SVG turbulence at 2% (single rasterise, browser-cached)
 *
 * Responsive cascade is owned by `.hero-backdrop-*` rules in globals.css.
 */
export function HeroBackdrop() {
  return (
    <div
      aria-hidden
      className="hero-backdrop absolute inset-0 overflow-hidden pointer-events-none"
    >
      <div className="hero-backdrop-mesh absolute inset-0" />

      <svg
        className="hero-backdrop-grid absolute inset-0 hidden md:block h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="hero-grid"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="var(--color-blue-hi)"
              strokeWidth="1"
              strokeOpacity="0.05"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      <div className="hero-backdrop-light absolute inset-0" />

      <svg
        className="hero-backdrop-star absolute inset-0 hidden md:block h-full w-full"
        viewBox="0 0 1440 810"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="hero-focal-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-blue-hi)" stopOpacity="0.95" />
            <stop offset="40%" stopColor="var(--color-blue-hi)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-blue-hi)" stopOpacity="0" />
          </radialGradient>
          <filter id="hero-focal-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        {/* Hairlines — drawn first so the glow reads in front */}
        <g
          stroke="var(--color-blue-hi)"
          strokeWidth="1"
          strokeOpacity="0.30"
          fill="none"
          shapeRendering="geometricPrecision"
        >
          <line x1="1140" y1="380" x2="1300" y2="240" />
          <line x1="1140" y1="380" x2="1080" y2="220" />
          <line x1="1140" y1="380" x2="1020" y2="320" />
          <line x1="1140" y1="380" x2="1010" y2="460" />
          <line x1="1140" y1="380" x2="1100" y2="560" />
          <line x1="1140" y1="380" x2="1240" y2="540" />
          <line x1="1140" y1="380" x2="1330" y2="430" />
          <line x1="1140" y1="380" x2="1280" y2="320" />
          <line x1="1300" y1="240" x2="1080" y2="220" />
          <line x1="1080" y1="220" x2="1020" y2="320" />
          <line x1="1020" y1="320" x2="1010" y2="460" />
          <line x1="1010" y1="460" x2="1100" y2="560" />
          <line x1="1100" y1="560" x2="1240" y2="540" />
          <line x1="1240" y1="540" x2="1330" y2="430" />
          <line x1="1330" y1="430" x2="1300" y2="240" />
        </g>

        {/* Focal halo (outer soft glow) */}
        <circle
          cx="1140"
          cy="380"
          r="64"
          fill="url(#hero-focal-glow)"
          filter="url(#hero-focal-blur)"
          className="hero-backdrop-pulse"
        />

        {/* Focal core */}
        <circle
          cx="1140"
          cy="380"
          r="6"
          fill="var(--color-chrome-hi)"
          className="hero-backdrop-pulse"
        />
        <circle cx="1140" cy="380" r="3" fill="var(--color-chrome-hi)" />

        {/* Satellites */}
        <g fill="var(--color-blue-hi)">
          <circle cx="1300" cy="240" r="3" />
          <circle cx="1080" cy="220" r="2.5" />
          <circle cx="1020" cy="320" r="2" />
          <circle cx="1010" cy="460" r="2.5" />
          <circle cx="1100" cy="560" r="2" />
          <circle cx="1240" cy="540" r="3" />
          <circle cx="1330" cy="430" r="2.5" />
          <circle cx="1280" cy="320" r="2" />
        </g>

        {/* Field stars — scattered low-opacity dots */}
        <g fill="var(--color-cloud)" fillOpacity="0.45">
          <circle cx="120" cy="80" r="1" />
          <circle cx="240" cy="160" r="1" />
          <circle cx="360" cy="60" r="0.8" />
          <circle cx="80" cy="280" r="1.2" />
          <circle cx="320" cy="380" r="0.8" />
          <circle cx="180" cy="500" r="1" />
          <circle cx="60" cy="640" r="0.8" />
          <circle cx="280" cy="700" r="1" />
          <circle cx="440" cy="220" r="0.8" />
          <circle cx="500" cy="480" r="1" />
          <circle cx="640" cy="120" r="0.8" />
          <circle cx="720" cy="320" r="1" />
          <circle cx="820" cy="660" r="0.8" />
          <circle cx="900" cy="100" r="1" />
          <circle cx="960" cy="700" r="0.8" />
          <circle cx="540" cy="600" r="0.8" />
          <circle cx="380" cy="280" r="0.6" />
          <circle cx="200" cy="380" r="0.6" />
          <circle cx="660" cy="540" r="0.6" />
        </g>
      </svg>

      <svg
        className="hero-backdrop-grain absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="hero-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>
    </div>
  );
}
