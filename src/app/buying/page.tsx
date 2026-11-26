import { PrivateAcquisition, buyingMetadata } from "@/components/buying/private-acquisition";

export const metadata = buyingMetadata("en");

export default function BuyingPage() {
  return <PrivateAcquisition locale="en" />;
}
