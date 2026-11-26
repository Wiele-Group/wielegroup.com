import { PrivatePlacement, sellingMetadata } from "@/components/selling/private-placement";

export const metadata = sellingMetadata("en");

export default function SellingPage() {
  return <PrivatePlacement locale="en" />;
}
