import { SettlementBriefing, settlementMetadata } from "@/components/purchase-guide/settlement-briefing";

export const metadata = settlementMetadata("en");

export default function PurchaseGuidePage() {
  return <SettlementBriefing locale="en" />;
}
