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
 * Footer layout per directive §6 Phase 1, extended v2.2 (2026-05-04):
 *   Brand column | Agency | Systems | Resources | Legal
 *
 * The Agency column was added when the four division landing pages
 * shipped — they need persistent footer presence for crawl + UX.
 */
export const footerColumns = [
  {
    title: "Agency",
    links: [
      { label: "Marketing Agency", href: "/marketing-agency" },
      { label: "Advertising Agency", href: "/advertising-agency" },
      { label: "Brand Management Agency", href: "/brand-management-agency" },
      { label: "Web Design Agency", href: "/web-design-agency" },
    ],
  },
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
      { label: "Client Onboarding", href: "/onboarding" },
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
