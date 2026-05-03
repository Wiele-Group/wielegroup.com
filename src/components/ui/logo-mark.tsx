import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type LogoMarkProps = {
  /** Pixel size of the square mark. Defaults to 32. */
  size?: number;
  className?: string;
  asLink?: boolean;
  ariaLabel?: string;
};

/**
 * Wiele "W" monogram — used at sizes below the wordmark threshold (~120px),
 * for favicons, app icons, compact headers, share cards.
 *
 * Uses the white-on-transparent PNG variant for dark surfaces. Never
 * recolor with brand accents — directive §7.
 */
export function LogoMark({
  size = 32,
  className,
  asLink = true,
  ariaLabel = "Wiele — home",
}: LogoMarkProps) {
  const img = (
    <Image
      src="/brand/wiele-W-monogram.svg"
      width={size}
      height={size}
      alt={ariaLabel}
      priority
      className={cn("block", className)}
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
