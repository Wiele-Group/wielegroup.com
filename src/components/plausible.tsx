import Script from "next/script";

/**
 * Plausible analytics — privacy-preserving, no cookies, no consent banner.
 *
 * Authority: founder reinforcement #4 from Phase 6 brief.
 *
 * Scope (binding):
 *  · Renders only when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set
 *  · Public marketing pages only (mounted in root layout)
 *  · Never on /api/* or admin routes (route-level conditionals if/when added)
 *  · Absent env var = no script renders, preserving the zero-cookie property
 *    of the dev environment
 */
export function PlausibleScript() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
