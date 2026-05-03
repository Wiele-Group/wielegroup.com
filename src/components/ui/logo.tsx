import Link from "next/link";
import { cn } from "@/lib/utils";

export type LogoProps = {
  /** Pixel width of the wordmark. Height auto-scales (5:1 viewBox). */
  width?: number;
  className?: string;
  /** Wrap the wordmark in a Link to "/". Default true; set false in headers/footers that already wrap. */
  asLink?: boolean;
  /** Accessible label override. Defaults to "Wiele — home". */
  ariaLabel?: string;
};

/**
 * Inline SVG wordmark — uses currentColor so it inherits text color from CSS.
 * The viewBox is 1200×240 (5:1), so a 148px wide wordmark renders ~30px tall.
 *
 * NEVER redraw or recolor this with brand accents — see directive §7.
 */
export function Logo({
  width = 148,
  className,
  asLink = true,
  ariaLabel = "Wiele — home",
}: LogoProps) {
  const svg = (
    <svg
      width={width}
      height={width / 5}
      viewBox="0 0 1200 240"
      role="img"
      aria-label={ariaLabel}
      className={cn("text-white", className)}
    >
      <title>Wiele</title>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={28}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M210,40 L210,180 Q210,210 245,210 Q280,210 280,180 L280,40" />
        <path d="M310,40 L310,180 Q310,210 345,210 Q380,210 380,180 L380,40" />
        <path d="M450,40 L450,210" />
        <path d="M520,40 L520,210" />
        <path d="M520,40 L630,40" />
        <path d="M520,125 L605,125" />
        <path d="M520,210 L630,210" />
        <path d="M700,40 L700,210" />
        <path d="M700,210 L810,210" />
        <path d="M880,40 L880,210" />
        <path d="M880,40 L990,40" />
        <path d="M880,125 L965,125" />
        <path d="M880,210 L990,210" />
      </g>
    </svg>
  );

  if (!asLink) return svg;
  return (
    <Link
      href="/"
      aria-label={ariaLabel}
      className="inline-flex items-center transition-opacity duration-[var(--duration-fast)] hover:opacity-80 focus-visible:outline-none focus-visible:opacity-80"
    >
      {svg}
    </Link>
  );
}
