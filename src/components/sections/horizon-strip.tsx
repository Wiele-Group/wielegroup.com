import Image from "next/image";

type Props = {
  fromLabel: string;
  toLabel: string;
  index?: number;
  total?: number;
};

/**
 * HorizonStrip — connective separator between major page sections.
 *
 * Canonical-native port from wiele-prototype/components/sections/HorizonStrip.tsx.
 * Differs from prototype by design:
 *   - No Three.js Monolith (canonical doesn't ship Three.js — would be a
 *     new dependency + GPU cost on hardware-constrained reviewers).
 *   - Centre mark is the existing chrome W SVG instead of a 3D Monolith.
 *   - Hairline is a 1px translucent chrome-low rule with edge fades, NOT
 *     the bichromatic duality-hairline (which is a hero-specific 12rem
 *     primitive and would visually dominate at full container width).
 *   - Section labels use canonical's font-mono tokens + smoke colour.
 *
 * Usage in home page IA — sparingly, between major IA pivots only.
 * Mounting it between every section on a 14-section page is noise.
 */
export function HorizonStrip({ fromLabel, toLabel, index, total }: Props) {
  const counter =
    typeof index === "number" && typeof total === "number"
      ? `0${index} / 0${total}`
      : null;

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className="relative py-12 md:py-16"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="relative flex items-center gap-4">
          <span
            aria-hidden
            className="block h-2 w-2 shrink-0 rounded-full border border-[var(--color-border-default)]"
          />

          <div className="relative h-px flex-1">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, var(--color-chrome-low) 20%, var(--color-chrome-low) 80%, transparent 100%)",
                opacity: 0.4,
              }}
            />
            <Image
              src="/brand/wiele-W-monogram.svg"
              alt=""
              width={20}
              height={20}
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70"
            />
          </div>

          <span
            aria-hidden
            className="block h-2 w-2 shrink-0 rounded-full border border-[var(--color-border-default)]"
          />
        </div>

        <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-smoke)]">
          <span>↑ {fromLabel}</span>
          {counter && <span className="opacity-60">{counter}</span>}
          <span>{toLabel} ↓</span>
        </div>
      </div>
    </div>
  );
}
