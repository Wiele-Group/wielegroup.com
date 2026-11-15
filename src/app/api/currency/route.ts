import { parseReferenceRates } from "@/lib/currency";
export const dynamic = "force-dynamic";
export async function GET() {
 try {
  const upstream = await fetch("https://api.frankfurter.dev/v2/rates?base=EUR&quotes=GBP,ZAR,USD,CHF,SEK,NOK,DKK,PLN,CZK&providers=ECB", { signal: AbortSignal.timeout(8000), next: { revalidate: 3600 } });
  if (!upstream.ok) throw new Error("Provider unavailable");
  const data = parseReferenceRates(await upstream.json());
  return Response.json({ ...data, source: "ECB reference rates via Frankfurter" }, { headers: { "Cache-Control": "public, max-age=300, s-maxage=3600", "X-Robots-Tag": "noindex" } });
 } catch {
  return Response.json({ error: "Reference rates are temporarily unavailable. Please retry shortly." }, { status: 503, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
 }
}
