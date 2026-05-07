import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type LogoProps = {
  /** Pixel width of the wordmark. Height auto-scales per variant. */
  width?: number;
  className?: string;
  /** Wrap the wordmark in a Link to "/". Default true; set false in headers/footers that already wrap. */
  asLink?: boolean;
  /** Accessible label override. Defaults to "Wiele — home". */
  ariaLabel?: string;
  /** Set true for above-the-fold instances (header) so Next prioritises preload. */
  priority?: boolean;
  /**
   * "chrome" (default) — 3D rendered PNG, brand-luxe, scales well at md+.
   * "flat" — inline stroke SVG using currentColor; crisp at any size,
   * preferred below md where chrome's depth bands become visual noise.
   */
  variant?: "chrome" | "flat";
};

/**
 * Brand wordmark.
 *
 * Two variants:
 *   • `chrome` (default) — 3D rendered PNG from /public/brand/wiele-wordmark-chrome-2000.png.
 *     Height auto-scales using the master's 2000×1126 (~1.78:1) aspect. NEVER recolor
 *     or invert — directive §7.
 *   • `flat` — inline stroke SVG mirroring /public/brand/wiele-wordmark-currentColor.svg
 *     (1200×240, 5:1 aspect). `currentColor` flows from parent CSS, so wherever this
 *     component is dropped, the wordmark inherits the surrounding text color. Used in
 *     the mobile header where chrome's depth detail becomes muddy at ~92px width.
 *
 * Both variants render the same 5-letter mark (W I E L E). The `flat` variant is a
 * legibility primitive — not a brand alternate — and only swaps in below the md
 * breakpoint. Footer and desktop nav stay on chrome.
 */
export function Logo({
  width = 148,
  className,
  asLink = true,
  ariaLabel = "Wiele — home",
  priority = false,
  variant = "chrome",
}: LogoProps) {
  const inner = variant === "flat" ? (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox="0 0 1200 240"
      width={width}
      height={Math.round((width * 240) / 1200)}
      className={cn("block select-none", className)}
      style={{ color: "var(--color-chrome-hi, #EEF2F8)" }}
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
  ) : (
    <Image
      src="/brand/wiele-wordmark-chrome-2000.png"
      alt={ariaLabel}
      width={width}
      height={Math.round((width * 1126) / 2000)}
      priority={priority}
      sizes={`${width}px`}
      className={cn("block h-auto select-none", className)}
      draggable={false}
    />
  );

  if (!asLink) return inner;
  return (
    <Link
      href="/"
      aria-label={ariaLabel}
      className="inline-flex items-center transition-opacity duration-[var(--duration-fast)] hover:opacity-80 focus-visible:outline-none focus-visible:opacity-80"
    >
      {inner}
    </Link>
  );
}
