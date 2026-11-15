import { AssetGuide } from "@/components/property/asset-guide";
import { assetGuides } from "@/lib/asset-guides";
import { propertyMetadata } from "@/lib/property";
const guide=assetGuides["aircraft"];
export const metadata=propertyMetadata(guide.title,guide.intro,"/luxury-assets/aircraft");
export default function Page(){return <AssetGuide category="aircraft"/>;}
