import { AssetGuide } from "@/components/property/asset-guide";
import { assetGuides } from "@/lib/asset-guides";
import { propertyMetadata } from "@/lib/property";
const guide=assetGuides["yachts"];
export const metadata=propertyMetadata(guide.title,guide.intro,"/luxury-assets/yachts");
export default function Page(){return <AssetGuide category="yachts"/>;}
