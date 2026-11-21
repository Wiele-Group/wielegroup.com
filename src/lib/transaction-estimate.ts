import { convertCurrency, type ReferenceRates } from "./currency";

export const estimateCurrencies = ["GBP", "EUR", "ZAR", "USD"] as const;
export const estimateAssets = ["Property", "Yachts", "Classic Cars"] as const;
export const estimateMarkets = ["UK", "Europe (EU)", "South Africa"] as const;
export const estimateProfiles = ["Domestic", "EU/EEA cross-border", "Other foreign / non-resident"] as const;

export type EstimateCurrency = typeof estimateCurrencies[number];
export type EstimateAsset = typeof estimateAssets[number];
export type EstimateMarket = typeof estimateMarkets[number];
export type EstimateProfile = typeof estimateProfiles[number];
type Route = "pending" | "local" | "import" | "temporary";
type SellerTax = "quote" | "malta" | "sa-person" | "sa-company" | "sa-trust" | "none";
type Money = number | null;
type Line = { label: string; amount: Money; note?: string };
type Band = readonly [threshold: number, rate: number];
export type EstimateInput = {
 role: "Buyer" | "Seller"; asset: EstimateAsset; market: EstimateMarket; currency: EstimateCurrency;
 value: number; location: string; propertyBasis: "standard" | "additional" | "quote";
 sdltResidence: "unknown" | "resident" | "nonresident"; route: Route; sellerTax: SellerTax;
 fees: Money; survey: Money; delivery: Money; other: Money; quotedTax: Money; duty: Money;
 customsValue: Money; incidentalVatBase: Money; vatRate: Money;
 collector: "unknown" | "standard" | "confirmed"; sacu: "outside" | "blns" | "unknown";
 temporaryFacts: boolean; months: Money;
};

export const estimateSources = {
 sdlt: ["HMRC residential SDLT", "https://www.gov.uk/stamp-duty-land-tax/residential-property-rates"],
 lbtt: ["Revenue Scotland residential LBTT", "https://revenue.scot/taxes/land-buildings-transaction-tax/residential-property"],
 ads: ["Revenue Scotland additional dwelling supplement", "https://revenue.scot/taxes/land-buildings-transaction-tax/additional-dwelling-supplement-ads"],
 ltt: ["Welsh Revenue Authority LTT", "https://www.gov.wales/land-transaction-tax-rates-and-bands"],
 mtDuty: ["Malta stamp duty", "https://mtca.gov.mt/personal-tax/property-taxes/buying-property"],
 mtSale: ["Malta property transfer tax", "https://mtca.gov.mt/personal-tax/property-taxes/faqs/new-property-tax-system---faq"],
 mtVat: ["Malta VAT rates", "https://mtca.gov.mt/business-tax/vat1/vat-compliance/vat-rates/vat-rates"],
 saDuty: ["SARS transfer duty", "https://www.sars.gov.za/tax-rates/transfer-duty/"],
 saSale: ["SARS section 35A withholding", "https://www.sars.gov.za/types-of-tax/capital-gains-tax/non-resident-sellers-of-immovable-property/"],
 saVat: ["SARS duties and import VAT", "https://www.sars.gov.za/customs-and-excise/duties-and-taxes/duties-and-taxes-for-importers/"],
 saCar: ["South Africa used-vehicle import permits", "https://www.gov.za/services/services-organisations/import/importing-second-hand-or-used-vehicle"],
 ukVat: ["HMRC import VAT valuation", "https://www.gov.uk/guidance/working-out-the-vat-value-using-the-customs-value-of-the-imported-goods"],
 ukCar: ["HMRC collector vehicle classification and VAT", "https://www.gov.uk/guidance/classifying-vehicles"],
 ukCollectorVat: ["HMRC effective import VAT for collectors’ items", "https://www.gov.uk/guidance/how-to-value-goods-for-import-vat"],
 ukTa: ["HMRC Temporary Admission for pleasure craft", "https://www.gov.uk/guidance/sailing-a-pleasure-craft-into-the-uk-temporarily-for-private-use"],
 euVat: ["European Commission import VAT basis", "https://taxation-customs.ec.europa.eu/taxation/vat/vat-directive/taxable-amount_en"],
 euTa: ["European Commission pleasure craft customs guidance", "https://taxation-customs.ec.europa.eu/document/download/8c62e3be-807f-4607-bb1e-9ff46db7d97e_en?filename=Guidance_pleasure_craft.pdf"],
} as const;

type Source = keyof typeof estimateSources;
export type Estimate = { lines: Line[]; total: number; partial: boolean; notes: string[]; sources: Source[]; fxDate?: string };

const sdlt: Band[] = [[0,0],[125000,.02],[250000,.05],[925000,.10],[1500000,.12]];
const lbtt: Band[] = [[0,0],[145000,.02],[250000,.05],[325000,.10],[750000,.12]];
const ltt: Band[] = [[0,0],[225000,.06],[400000,.075],[750000,.10],[1500000,.12]];
const lttHigher: Band[] = [[0,.05],[180000,.085],[250000,.10],[400000,.125],[750000,.15],[1500000,.17]];
const transferDuty: Band[] = [[0,0],[1210000,.03],[1663800,.06],[2329300,.08],[2994800,.11],[13310000,.13]];

function bands(value: number, rates: Band[]) {
 return rates.reduce((total, [floor, rate], i) => total + Math.max(0, Math.min(value, rates[i + 1]?.[0] ?? value) - floor) * rate, 0);
}

export function estimateTransaction(input: EstimateInput, fx: ReferenceRates | null): Estimate {
 const { role, asset, market, currency, value, location } = input;
 const buyer = role === "Buyer";
 const lines: Line[] = [
  { label: buyer ? "Purchase price" : "Gross sale price", amount: value },
  { label: "Practitioner / legal fees", amount: input.fees },
  { label: "Survey / independent inspection", amount: input.survey },
  { label: "Transport / delivery / insurance", amount: input.delivery },
  { label: buyer ? "Other costs and disbursements" : "Commission, debt payoff and other deductions", amount: input.other },
 ];
 const notes: string[] = [];
 const sources: Source[] = [];
 const local = market === "UK" ? "GBP" : market === "South Africa" ? "ZAR" : "EUR";
 let fxUsed = false;
 const localTax = (calc: (localValue: number) => number): Money => {
  if (currency === local) return calc(value);
  if (!fx) {
   notes.push(`Reference FX is needed to calculate this tax in ${local}. You can enter the scenario in ${local} while rates are unavailable.`);
   return null;
  }
  fxUsed = true;
  return convertCurrency(calc(Math.round(convertCurrency(value, currency, local, fx.rates) * 100) / 100), local, currency, fx.rates);
 };
 const add = (label: string, amount: Money, note?: string) => lines.push({ label, amount, note });

 if (!buyer) {
  switch (input.sellerTax) {
   case "malta":
    sources.push("mtSale");
    add("Illustrative Malta transfer tax (8%)", value * .08, "Standard final property transfer-tax scenario. Exceptions, exemptions and other rates may apply.");
    break;
   case "sa-person":
   case "sa-company":
   case "sa-trust": {
    const rate = { "sa-person": .075, "sa-company": .10, "sa-trust": .15 }[input.sellerTax];
    sources.push("saSale");
    add(`Section 35A withholding (${rate * 100}%)`, localTax(price => price > 2_000_000 ? price * rate : 0), "Applies to the whole price above R2 million in this non-resident seller scenario, subject to a SARS directive. This is a cash withholding, not the final tax.");
    break;
   }
   case "none":
    add("Transaction tax / withholding", 0, "Based on your selection that no tax or withholding is payable at completion.");
    break;
   default:
    add("Quoted transaction tax / withholding", input.quotedTax, "Enter the deduction due on settlement as advised locally. Final capital gains and later tax adjustments are separate.");
  }
  notes.push("Seller proceeds are cash at completion. Include actual payoff, commission, settlement taxes and other deductions where applicable.");
 } else if (asset === "Property") {
  if (input.propertyBasis === "quote" || (market === "Europe (EU)" && location !== "Malta")) {
   add("Quoted acquisition tax / VAT", input.quotedTax, "Use the local practitioner’s figure for the selected country, transaction and VAT basis. Enter only tax due in addition to the price.");
  } else if (market === "South Africa") {
   sources.push("saDuty");
   add("South Africa Transfer Duty", localTax(price => bands(price, transferDuty)), "Transfer-duty transaction scenario. For a sale subject to VAT, select the quoted tax route instead.");
  } else if (market === "Europe (EU)") {
   sources.push("mtDuty");
   add("Malta standard stamp duty (5%)", value * .05, "Uses entered price as the taxable value, without any relief. Confirm valuation basis and acquisition eligibility with a notary.");
  } else if (location === "Scotland") {
   sources.push("lbtt", "ads");
   add("Scotland residential LBTT", localTax(price => bands(price, lbtt)));
   if (input.propertyBasis === "additional") add("Additional Dwelling Supplement (8%)", value * .08, "Assumes the supplement applies to this transaction.");
  } else if (location === "Wales") {
   sources.push("ltt");
   add(input.propertyBasis === "additional" ? "Wales higher residential LTT" : "Wales main residential LTT", localTax(price => bands(price, input.propertyBasis === "additional" ? lttHigher : ltt)));
  } else {
   sources.push("sdlt");
   add("England / Northern Ireland residential SDLT", localTax(price => bands(price, sdlt)));
   if (input.propertyBasis === "additional") add("Additional property surcharge (5%)", value * .05, "Assumes the higher rates apply to this transaction.");
   add("SDLT non-resident surcharge", input.sdltResidence === "unknown" ? null : value * (input.sdltResidence === "nonresident" ? .02 : 0), "Uses the separate SDLT residence test, independent of passport or matrix profile.");
  }
  notes.push("Residential property scenarios use the entered consideration. Reliefs, leases with taxable rent, commercial, mixed-use and exceptional transactions require a local quote.");
 } else if (input.route === "local") {
  add("Additional VAT on purchase", input.quotedTax, "Enter zero if your adviser confirms none is payable in addition to the price. Use this route for assets already in local free circulation.");
 } else if (input.route === "temporary" && asset === "Yachts") {
  const limit = market === "Europe (EU)" || location === "Northern Ireland" ? 18 : 24;
  const supported = market !== "South Africa";
  if (market === "UK") sources.push("ukTa");
  if (market === "Europe (EU)") sources.push("euTa");
  const withinLimit = input.months !== null && input.months > 0 && input.months <= limit;
  add("Temporary Admission duty / VAT", null, supported
   ? input.temporaryFacts && withinLimit
    ? `Potential private-use route, up to ${limit} months under the standard scenario. A customs specialist must confirm relief and re-export conditions. No relief is deducted.`
    : `Confirm the outside-territory registration and residence/establishment, private use and timely re-export. Standard limit ${limit} months for the selected territory.`
   : "A local customs specialist must confirm any South African temporary-entry procedure and guarantee.");
 } else if (input.route === "import") {
  const otherEU = market === "Europe (EU)" && location !== "Malta";
  const standardVat = market === "UK" ? location === "Great Britain" ? 20 : null : market === "South Africa" ? 15 : otherEU ? null : 18;
  const collectorScenario = asset === "Classic Cars" && market === "UK" && location === "Great Britain";
  const rate = collectorScenario && input.collector === "confirmed" ? 5
   : collectorScenario && input.collector === "unknown" ? null : input.vatRate ?? standardVat;
  const saBasisUnresolved = market === "South Africa" && input.sacu === "unknown";
  const saUplift = market === "South Africa" && input.sacu === "outside" ? 1.10 : 1;
  const taxBaseUnresolved = market !== "South Africa" && input.incidentalVatBase === null;
  const vat = rate === null || input.duty === null || input.customsValue === null || saBasisUnresolved || taxBaseUnresolved
   ? null
   : (input.customsValue * saUplift + input.duty + (market === "South Africa" ? 0 : input.incidentalVatBase ?? 0)) * rate / 100;
  add("Quoted customs duty and import levies", input.duty, "Use the broker’s quote including levies chargeable in the VAT base. Enter zero only for a confirmed nil amount.");
  add(rate === null ? "Import VAT" : `Import VAT (${rate}%)`, vat, market === "South Africa"
   ? "Based on SARS customs value, applicable 10% uplift and non-rebated duties."
   : "Customs value plus duties and additional taxable costs. Enter zero additional costs if all are already included in customs value or none apply.");
  if (market === "UK") sources.push("ukVat");
  if (market === "South Africa") sources.push("saVat");
  if (market === "Europe (EU)") sources.push("euVat", ...(!otherEU ? ["mtVat" as const] : []));
  if (asset === "Classic Cars") {
   if (collectorScenario) {
    sources.push("ukCar", "ukCollectorVat");
    notes.push("Great Britain collector treatment requires customs classification under heading 9705. A vehicle of at least 30 years may qualify if the classification criteria are met. Age alone is insufficient.");
   }
   if (market === "Europe (EU)") notes.push("Confirm collector classification and any reduced VAT with customs in the destination EU country before entering a different rate.");
   if (market === "South Africa") {
    sources.push("saCar");
    notes.push("South Africa requires the ITAC used-vehicle import permit where applicable. Obtain registration, steering and any collector rebate clearances separately before shipping.");
   }
  }
 } else {
  add("Customs duty / VAT", null, "Choose the documented customs route to estimate additional tax.");
 }

 const total = lines.slice(1).reduce((balance, line) => balance + (buyer ? 1 : -1) * (line.amount ?? 0), value);
 return { lines, total, partial: lines.some(line => line.amount === null), notes, sources, fxDate: fxUsed ? fx?.date : undefined };
}
