import { AssetGuide } from "@/components/property/asset-guide";
import { assetGuides } from "@/lib/asset-guides";
import { propertyMetadata } from "@/lib/property";
const guide=assetGuides["exotic-cars"];
export const metadata=propertyMetadata(guide.title,guide.intro,"/luxury-assets/exotic-cars");
export default function Page(){return <AssetGuide category="exotic-cars"/>;}
