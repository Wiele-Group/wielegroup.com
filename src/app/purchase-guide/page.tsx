import { PurchaseGuideHub } from "@/components/property/purchase-guide";
import { propertyMetadata } from "@/lib/property";
export const metadata = propertyMetadata("International property sales & purchase guide", "UK, European and South African property and asset purchase requirements. Explore 35 jurisdictions, nationality-specific checks, legal sales stages, documents, funding and registration.", "/purchase-guide");
export default function Page() { return <PurchaseGuideHub />; }
