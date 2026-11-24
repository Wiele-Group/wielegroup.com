import { currencies, parseReferenceRates, type ReferenceRates } from "./currency";

const source = "ECB reference rates via Frankfurter";
const upstream = new URL("https://api.frankfurter.dev/v2/rates");
upstream.search = new URLSearchParams({
  base: "EUR",
  quotes: currencies.filter(currency => currency !== "EUR").join(","),
  providers: "ECB",
}).toString();

export type FxRates = ReferenceRates & { base: "EUR"; source: string; degraded: boolean };

export const fallbackFxRates: FxRates = {
  base: "EUR",
  date: "2026-11-24",
  source,
  degraded: true,
  // ECB publication for 24 November 2026, retrieved via Frankfurter.
  rates: {
    EUR: 1, GBP: 0.837, ZAR: 19.2333, USD: 1.0963, CHF: 0.9183,
    SEK: 11.221, NOK: 10.735, DKK: 7.4744, PLN: 4.4599, CZK: 24.428,
  },
};

export async function loadFxRates(): Promise<FxRates> {
  try {
    const response = await fetch(upstream, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(3500),
    });
    if (!response.ok) throw new Error("FX provider unavailable");
    return { ...parseReferenceRates(await response.json()), base: "EUR", source, degraded: false };
  } catch {
    return fallbackFxRates;
  }
}

export function fxRatesResponse(data: FxRates): Response {
  return Response.json(data, {
    headers: {
      "Cache-Control": data.degraded ? "public, max-age=60, s-maxage=300" : "public, max-age=300, s-maxage=3600",
      "X-Robots-Tag": "noindex",
    },
  });
}
