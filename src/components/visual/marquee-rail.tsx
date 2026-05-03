import type { ReactNode } from "react";

/**
 * MarqueeRail — infinite horizontal scroll for proof / capability rails.
 *
 * Pattern:
 *   - JSX renders the items array twice. translateX(-50%) over the
 *     doubled track loops seamlessly (position 50% = position 0%).
 *   - Duplicates carry `aria-hidden` so screen readers don't double-announce.
 *   - Duplicates also carry `data-marquee-duplicate` so the
 *     reduced-motion CSS can hide them when the track flattens to a
 *     wrapped grid — otherwise reduced-motion users see content twice.
 *   - `.marquee-mask` fades both edges so items dissolve in/out.
 *   - `.marquee-track:hover` + `:focus-within` pause the animation
 *     (mouse OR keyboard) — see globals.css.
 *
 * Animation duration is configurable via the `--marquee-duration` CSS
 * variable, default 38s. Lower = faster.
 *
 * Accessibility:
 *   - `<section aria-label>` exposes the rail as a landmark.
 *   - Pause-on-focus inside the track handles keyboard users.
 *   - `prefers-reduced-motion: reduce` flattens to a wrapped grid with
 *     duplicates hidden (see globals.css media query).
 *
 * Tokens:
 *   - Glass surface (`--color-surface-glass`) + subtle border.
 *   - Electric pip indicator. NOT blueprint's gold/cyan — see CLAUDE.md
 *     "Active Decisions (binding)".
 */

interface MarqueeItem {
  label: string;
  icon?: ReactNode;
}

interface MarqueeRailProps {
  items: ReadonlyArray<MarqueeItem>;
  /** Animation duration in seconds. Default 38. Lower = faster. */
  duration?: number;
  /** Aria-label for the section landmark. */
  ariaLabel?: string;
  /** Extra classes appended to the outer <section>. */
  className?: string;
}

export function MarqueeRail({
  items,
  duration = 38,
  ariaLabel = "Capability rail",
  className,
}: MarqueeRailProps) {
  const doubled = [...items, ...items];

  return (
    <section
      aria-label={ariaLabel}
      className={`marquee-mask overflow-hidden border-y border-[var(--color-border-default)] bg-[var(--color-obsidian)]/50 py-6 ${className ?? ""}`.trim()}
    >
      <div
        className="marquee-track"
        style={
          {
            "--marquee-duration": `${duration}s`,
          } as React.CSSProperties
        }
      >
        {doubled.map((item, idx) => {
          const isDuplicate = idx >= items.length;
          return (
            <span
              key={`${item.label}-${idx}`}
              aria-hidden={isDuplicate || undefined}
              data-marquee-duplicate={isDuplicate || undefined}
              className="flex shrink-0 items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface-glass)] px-4 py-2 text-body-xs uppercase tracking-[0.18em] font-mono text-silver"
            >
              <span
                aria-hidden="true"
                className="block h-1 w-1 rounded-full bg-electric"
              />
              {item.icon ?? null}
              {item.label}
            </span>
          );
        })}
      </div>
    </section>
  );
}
