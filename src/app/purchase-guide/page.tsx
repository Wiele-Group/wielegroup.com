import { PurchaseGuideHub } from "@/components/property/purchase-guide";
import { propertyMetadata } from "@/lib/property";
export const metadata = propertyMetadata("International property & asset purchase guide", "UK, European and South African property and asset purchase requirements. Explore 35 jurisdictions, buyer status, funding, import and registration checks.", "/purchase-guide");
export default function Page() { return <PurchaseGuideHub />; }
