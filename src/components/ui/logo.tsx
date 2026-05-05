import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type LogoProps = {
  /** Pixel width of the wordmark. Height auto-scales (~1.78:1 aspect). */
  width?: number;
  className?: string;
  /** Wrap the wordmark in a Link to "/". Default true; set false in headers/footers that already wrap. */
  asLink?: boolean;
  /** Accessible label override. Defaults to "Wiele — home". */
  ariaLabel?: string;
  /** Set true for above-the-fold instances (header) so Next prioritises preload. */
  priority?: boolean;
};

/**
 * Brand wordmark — chrome 3D rendered PNG. Source masters in /public/brand/wiele-wordmark-chrome-*.png.
 * Height auto-scales from width using the master's 2000×1126 (~1.78:1) aspect.
 *
 * NEVER recolor or invert — directive §7.
 */
export function Logo({
  width = 148,
  className,
  asLink = true,
  ariaLabel = "Wiele — home",
  priority = false,
}: LogoProps) {
  const height = Math.round((width * 1126) / 2000);
  const img = (
    <Image
      src="/brand/wiele-wordmark-chrome-2000.png"
      alt={ariaLabel}
      width={width}
      height={height}
      priority={priority}
      sizes={`${width}px`}
      className={cn("block h-auto select-none", className)}
      draggable={false}
    />
  );

  if (!asLink) return img;
  return (
    <Link
      href="/"
      aria-label={ariaLabel}
      className="inline-flex items-center transition-opacity duration-[var(--duration-fast)] hover:opacity-80 focus-visible:outline-none focus-visible:opacity-80"
    >
      {img}
    </Link>
  );
}
