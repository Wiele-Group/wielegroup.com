import Script from "next/script";

/**
 * Google Analytics 4 — with Consent Mode v2 default-denied.
 *
 * Authority: v3.9.7 — founder approval "A" (post-XRAY pricing-save), 2026-05-14.
 *
 * GDPR / UK PECR posture (binding):
 *  · All consent categories default to "denied" before gtag.js loads.
 *  · GA4 sends only cookieless aggregate ping signals until consent flips.
 *  · No cookies set. No PII collected. No advertising data.
 *  · `wait_for_update: 500` reserves room for a future consent banner —
 *    when the banner exists and the user opts in, `gtag('consent','update',...)`
 *    flips the categories and richer telemetry begins. Until then, GA4 runs
 *    in the cleanest cookieless mode available.
 *
 * Why both Plausible + GA4:
 *  · Plausible (cookieless, EU-hosted) — daily ops telemetry, no consent friction.
 *  · GA4 (cookieless under default-denied) — Google Search Console closed-loop,
 *    future Google Ads attribution, audience export to Looker / BigQuery.
 *  · Together they cover the full B2B SaaS / agency telemetry stack with zero
 *    cookie-banner UX impact.
 *
 * Scope (binding):
 *  · Renders only when NEXT_PUBLIC_GA4_MEASUREMENT_ID is set.
 *  · Mounted in root layout — runs on every public page.
 *  · Never on /api/* (route handlers don't include this component).
 *  · Absent env var = no script renders, preserving the zero-cookie property
 *    of the dev environment.
 *
 * Implementation notes (App Router · Next.js 16):
 *  · `strategy="afterInteractive"` because GA4 doesn't need to block hydration.
 *  · Two <Script> tags in deterministic DOM order:
 *      1. Inline init script — establishes dataLayer + gtag + Consent Mode v2 default + config.
 *      2. External gtag.js — sees the queued commands when it loads, applies them in order.
 *  · Setting consent BEFORE gtag.js loads is the GDPR-correct sequence.
 */
export function GoogleAnalyticsScript() {
  const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  if (!measurementId) return null;

  return (
    <>
      {/*
        Inline init — runs FIRST per DOM order under afterInteractive strategy.
        Establishes dataLayer, defines gtag(), sets Consent Mode v2 default-denied
        state, then queues gtag('js') + gtag('config') for gtag.js to process.
      */}
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}

          // Consent Mode v2 — UK GDPR + PECR compliant default state.
          // All non-essential categories default to "denied". GA4 sends
          // cookieless aggregate ping signals only. Flips via a future
          // gtag('consent','update',...) call when (and if) we add a banner.
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            functionality_storage: 'granted',
            personalization_storage: 'denied',
            security_storage: 'granted',
            wait_for_update: 500
          });

          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            anonymize_ip: true,
            send_page_view: true
          });
        `}
      </Script>

      {/*
        External Google Tag loader — loads SECOND. Picks up the queued
        commands from dataLayer with consent state already set, so no
        cookies are written and no PII is sent.

        v3.9.8 (2026-05-14): switched from `gtag/js?id=` to `gtm.js?id=`.
        Reason: Google's CDN returns 404 for `https://www.googletagmanager.com/gtag/js?id=G-8YCESQ46BH`
        on this specific Measurement ID — verified from 3 independent
        network egresses (founder browser, sandbox curl, programmatic
        script.onerror). The /g/collect ingestion endpoint accepts hits
        for the same MID (204 No Content) and Realtime renders them, so
        the stream itself is healthy — only the canonical loader URL is
        broken on Google's end. The `gtm.js?id=G-XXX` endpoint serves a
        functionally-equivalent GA4 loader (235KB vs ~95KB) containing
        gtag init + consent handling + /g/collect collection logic for
        the same MID. Both honour the inline dataLayer queue identically.
        If Google's CDN later restores `gtag/js` for this MID, this
        fallback continues to work — no need to revert.
      */}
      <Script
        src={`https://www.googletagmanager.com/gtm.js?id=${measurementId}`}
        strategy="afterInteractive"
      />
    </>
  );
}
