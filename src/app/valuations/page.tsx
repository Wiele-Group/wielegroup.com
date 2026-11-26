import { ValuationDesk, valuationMetadata } from "@/components/valuations/valuation-desk";

export const metadata = valuationMetadata("en");

export default function ValuationsPage() {
  return <ValuationDesk locale="en" />;
}
