/**
 * Navigation data — single source of truth for header, footer, sitemap.
 * Routes match the IA in CLAUDE_CODE_HANDOFF_wielegroup.com_2026-05-03.md §4.
 * Some routes (/platform, /systems, /trust, /labs, /proof) are added in
 * Phase 3 but are listed here so Header/Footer can wire to them in Phase 1.
 */

export type NavLink = { label: string; href: string };

export const primaryNav: NavLink[] = [
  { label: "Platform", href: "/platform" },
  { label: "Systems", href: "/systems" },
  { label: "Proof", href: "/proof" },
  { label: "Labs", href: "/labs" },
  { label: "Pricing", href: "/pricing" },
  { label: "Trust", href: "/trust" },
];

export const ctaLink: NavLink = { label: "Run Audit", href: "/audit" };

/**
 * 4-column footer layout per directive §6 Phase 1:
 *   Brand column | Systems | Resources | Legal
 */
export const footerColumns = [
  {
    title: "Systems",
    links: [
      { label: "AI Visibility", href: "/systems/ai-visibility" },
      { label: "Search Authority", href: "/systems/search" },
      { label: "Brand Authority", href: "/systems/brand-authority" },
      { label: "Web Experience", href: "/systems/web-experience" },
      { label: "Wiele OS", href: "/platform" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Signal Audit", href: "/audit" },
      { label: "Pricing", href: "/pricing" },
      { label: "Proof", href: "/proof" },
      { label: "Wiele Labs", href: "/labs" },
      { label: "Trust", href: "/trust" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "AI Disclosure", href: "/trust#ai-disclosure" },
    ],
  },
] as const;
