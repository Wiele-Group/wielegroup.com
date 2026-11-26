import Image from "next/image";
import { availableSellingMedia, type SellingMediaKey } from "@/lib/sellingMedia";

export function SellerImage({ media, alt, credit }: { media: SellingMediaKey; alt: string; credit: string }) {
  const image = availableSellingMedia(media);
  return (
    <div className="acq-image seller-media" data-media={media}>
      {image ? <>
        <Image src={image} alt={alt} fill preload={media === "hero"} sizes={media === "hero" ? "100vw" : "(max-width: 700px) 100vw, 50vw"} />
        <span className="acq-image-credit">{credit}</span>
      </> : (
        <div className="acq-linework seller-linework" aria-hidden="true"><i /><i /><i /><i /></div>
      )}
    </div>
  );
}
