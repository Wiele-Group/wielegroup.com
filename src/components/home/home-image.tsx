import Image from "next/image";
import { availableHomeMedia, type HomeMediaKey } from "@/lib/homeMedia";

export function HomeImage({ media, alt, sizes }: { media: HomeMediaKey; alt: string; sizes: string }) {
  const src = availableHomeMedia(media);
  return (
    <div className="private-media" data-subject={media}>
      {src ? <Image src={src} alt={alt} sizes={sizes} fill preload={media === "hero"} /> : (
        <div className="private-elevation" aria-hidden="true">
          <i /><i /><i /><i /><i />
        </div>
      )}
    </div>
  );
}
