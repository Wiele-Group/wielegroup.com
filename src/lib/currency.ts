export const currencies = ["EUR", "GBP", "ZAR", "USD", "CHF", "SEK", "NOK", "DKK", "PLN", "CZK"] as const;
export type Currency = typeof currencies[number];
export type ReferenceRates = { date: string; rates: Record<Currency, number> };
export function parseReferenceRates(value: unknown, now = new Date()): ReferenceRates {
 if (!Array.isArray(value)) throw new Error("Rates unavailable");
 const rates = { EUR: 1 } as Record<Currency, number>;
 let date = "";
 for (const code of currencies.filter(c => c !== "EUR")) {
  const row = value.find(r => r && r.base === "EUR" && r.quote === code);
  if (!row || typeof row.rate !== "number" || !Number.isFinite(row.rate) || row.rate <= 0 || !/^\d{4}-\d{2}-\d{2}$/.test(row.date)) throw new Error("Incomplete rates");
  const time = Date.parse(row.date + "T00:00:00Z");
  if (!Number.isFinite(time) || new Date(time).toISOString().slice(0,10) !== row.date || time > now.getTime() || now.getTime() - time > 7 * 86400000 || (date && date !== row.date)) throw new Error("Rates need updating");
  date = row.date; rates[code] = row.rate;
 }
 return { date, rates };
}
export function convertCurrency(amount: number, from: Currency, to: Currency, rates: Record<Currency, number>): number {
 if (!Number.isFinite(amount) || amount < 0 || amount > 1e12 || !Number.isFinite(rates[from]) || !Number.isFinite(rates[to]) || rates[from] <= 0 || rates[to] <= 0) throw new Error("Check amount and currencies");
 return amount / rates[from] * rates[to];
}
