import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * LogoMark3D — the canonical Wiele Chrome W (3D render).
 * Brand chrome signature asset. Use sparingly — hero, brand moments,
 * splash screens. Not for nav (use the wordmark via <Logo />).
 *
 * Asset pack lives at /public/brand/wiele-w-chrome-*.png.
 * Source render: /Logo Assets/wiele-w-chrome.png (founder-supplied 2026-05-05).
 */

export type LogoMark3DSize = "sm" | "md" | "lg" | "xl" | "hero";
export type LogoMark3DProps = {
  size?: LogoMark3DSize;
  priority?: boolean;
  className?: string;
  alt?: string;
};

const sizeMap: Record<LogoMark3DSize, { src: string; w: number; h: number; cls: string }> = {
  /* sm uses 64.png — sufficient at w-12 h-12 (48 CSS px) even at 2x DPR.
     Keeps the mark out of the LCP race. */
  sm:   { src: "/brand/wiele-w-chrome-64.png",   w: 64,   h: 64,   cls: "w-12 h-12"   },
  md:   { src: "/brand/wiele-w-chrome-256.png",  w: 256,  h: 256,  cls: "w-24 h-24"   },
  lg:   { src: "/brand/wiele-w-chrome-512.png",  w: 512,  h: 512,  cls: "w-40 h-40"   },
  xl:   { src: "/brand/wiele-w-chrome-1024.png", w: 1024, h: 1024, cls: "w-64 h-64"   },
  hero: { src: "/brand/wiele-w-chrome-1024.png", w: 1024, h: 1024, cls: "w-full max-w-[640px]" },
};

export function LogoMark3D({
  size = "lg",
  priority = false,
  className,
  alt = "Wiele Group — chrome W mark",
}: LogoMark3DProps) {
  const { src, w, h, cls } = sizeMap[size];
  return (
    <div className={cn("relative inline-block select-none", cls, className)} aria-hidden={alt === ""}>
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        priority={priority}
        sizes={size === "hero" ? "(max-width: 768px) 80vw, 640px" : undefined}
        className="w-full h-auto drop-shadow-[0_24px_60px_rgba(59,130,246,0.18)]"
      />
    </div>
  );
}
