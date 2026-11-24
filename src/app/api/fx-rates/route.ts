import { fxRatesResponse, loadFxRates } from "@/lib/fx-rates";

export const dynamic = "force-dynamic";

export async function GET() {
  return fxRatesResponse(await loadFxRates());
}
