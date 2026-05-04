/**
 * Type-safe token names — mirror of styles/tokens.css.
 * Use when building variant maps or tokenized props.
 */

export const colors = {
  /* Foundation */
  void: "var(--color-void)",
  bgMidnight: "var(--color-bg-midnight)",
  bgFloor: "var(--color-bg-floor)",
  bgElevated: "var(--color-bg-elevated)",

  /* Legacy aliases (B4 values) */
  obsidian: "var(--color-obsidian)",
  graphite: "var(--color-graphite)",
  steel: "var(--color-steel)",
  smoke: "var(--color-smoke)",
  silver: "var(--color-silver)",
  cloud: "var(--color-cloud)",
  white: "var(--color-white)",
  platinum: "var(--color-platinum)",

  /* Chrome scale (B4) */
  chromeHi: "var(--color-chrome-hi)",
  chromeMid: "var(--color-chrome-mid)",
  chromeLo: "var(--color-chrome-lo)",
  chromeVlo: "var(--color-chrome-vlo)",

  /* Cool — Signal Blue */
  blueHi: "var(--color-blue-hi)",
  blueCore: "var(--color-blue-core)",
  blueLo: "var(--color-blue-lo)",
  electric: "var(--color-electric)",
  electricLight: "var(--color-electric-light)",
  electricDeep: "var(--color-electric-deep)",

  /* Warm — Ember Coral (B4 NEW) */
  coralHi: "var(--color-coral-hi)",
  coralCore: "var(--color-coral-core)",
  coralLo: "var(--color-coral-lo)",

  /* Rare-use accents */
  neon: "var(--color-neon)",
  pulse: "var(--color-pulse)",

  /* Semantic */
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  danger: "var(--color-danger)",
} as const;

export const gradients = {
  duality: "var(--gradient-duality)",
  dualityEdge: "var(--gradient-duality-edge)",
  pageRadial: "var(--gradient-page-radial)",
  pageVertical: "var(--gradient-page-vertical)",
} as const;

export type GradientToken = keyof typeof gradients;

export type ColorToken = keyof typeof colors;

export const radii = {
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  xl: "var(--radius-xl)",
  "2xl": "var(--radius-2xl)",
  full: "var(--radius-full)",
} as const;

export type RadiusToken = keyof typeof radii;
