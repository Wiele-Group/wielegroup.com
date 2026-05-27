/**
 * Lightweight analytics event utility.
 *
 * Dual-fires GA4 + Plausible. Never throws — analytics must never
 * interrupt user flow. SSR-safe (guards typeof window). Silently
 * no-ops if either script is absent or ad-blocked.
 *
 * GA4: queues into dataLayer via window.gtag; honours Consent Mode v2
 *   default-denied state (see google-analytics.tsx). Custom events are
 *   recorded in GA4 as soon as the measurement ID is configured.
 *
 * Plausible: calls window.plausible exposed by script.js
 *   (see plausible.tsx). Goals must be configured in the Plausible
 *   dashboard for events to appear in reports.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (
      event: string,
      opts?: { props?: Record<string, string | number | boolean> },
    ) => void;
  }
}

type TrackProps = Record<string, string | number | boolean>;

export function track(name: string, props?: TrackProps): void {
  if (typeof window === "undefined") return;

  // GA4 — queues into dataLayer; processed when gtag.js loads
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, props ?? {});
    }
  } catch {
    /* silently ignore — analytics must never break user flow */
  }

  // Plausible — window.plausible exposed by script.js
  try {
    if (typeof window.plausible === "function") {
      window.plausible(name, props ? { props } : undefined);
    }
  } catch {
    /* silently ignore — analytics must never break user flow */
  }
}
