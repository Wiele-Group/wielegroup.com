import Image from "next/image";
import { availableBuyingMedia, type BuyingMediaKey } from "@/lib/buyingMedia";

export function BuyingImage({ media, alt, credit }: { media: BuyingMediaKey; alt: string; credit: string }) {
  const src = availableBuyingMedia(media);
  return (
    <div className="acq-image" data-media={media}>
      {src ? <>
        <Image src={src} alt={alt} fill preload={media === "hero"} sizes={media === "hero" ? "100vw" : "(max-width: 700px) 100vw, 33vw"} />
        <span className="acq-image-credit">{credit}</span>
      </> : (
        <div className="acq-linework" aria-hidden="true"><i /><i /><i /><i /></div>
      )}
    </div>
  );
}
