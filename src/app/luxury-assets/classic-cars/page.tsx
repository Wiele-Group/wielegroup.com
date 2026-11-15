import { AssetGuide } from "@/components/property/asset-guide";
import { assetGuides } from "@/lib/asset-guides";
import { propertyMetadata } from "@/lib/property";
const guide=assetGuides["classic-cars"];
export const metadata=propertyMetadata(guide.title,guide.intro,"/luxury-assets/classic-cars");
export default function Page(){return <AssetGuide category="classic-cars"/>;}
