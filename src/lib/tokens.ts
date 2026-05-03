/**
 * Type-safe token names — mirror of styles/tokens.css.
 * Use when building variant maps or tokenized props.
 */

export const colors = {
  void: "var(--color-void)",
  obsidian: "var(--color-obsidian)",
  graphite: "var(--color-graphite)",
  steel: "var(--color-steel)",
  smoke: "var(--color-smoke)",
  silver: "var(--color-silver)",
  cloud: "var(--color-cloud)",
  white: "var(--color-white)",
  electric: "var(--color-electric)",
  electricLight: "var(--color-electric-light)",
  electricDeep: "var(--color-electric-deep)",
  neon: "var(--color-neon)",
  pulse: "var(--color-pulse)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  danger: "var(--color-danger)",
} as const;

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
