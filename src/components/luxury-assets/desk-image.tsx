import Image from "next/image";
import { availableLuxuryAssetsMedia, type LuxuryAssetsMediaKey } from "@/lib/luxuryAssetsMedia";

export function DeskImage({ media, alt, caption }: { media: LuxuryAssetsMediaKey; alt: string; caption: string }) {
  const src = availableLuxuryAssetsMedia(media);
  return (
    <div className="acq-image triad-image" data-media={media}>
      {src ? <>
        <Image src={src} alt={alt} fill preload={media === "hero"}
          sizes={media === "hero" ? "100vw" : "(max-width: 780px) 100vw, 47vw"} />
        {media !== "hero" && <span className="acq-image-credit">{caption}</span>}
      </> : <div className="acq-linework triad-linework" aria-hidden="true"><i/><i/><i/><i/></div>}
    </div>
  );
}
