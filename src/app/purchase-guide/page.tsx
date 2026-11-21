import { PurchaseGuideHub, purchaseGuideDescription } from "@/components/property/purchase-guide";
import { propertyMetadata } from "@/lib/property";
export const metadata = propertyMetadata("International property sales & purchase guide", purchaseGuideDescription, "/purchase-guide");
export default function Page() { return <PurchaseGuideHub />; }
