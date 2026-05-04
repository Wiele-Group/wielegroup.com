import { cn } from "@/lib/utils";

/**
 * Chrome divider — gradient line for section breaks.
 * B4 Chromaglass signature: transparent → chrome-lo → transparent.
 *
 * Use the `duality` variant sparingly — only where bichromatic accent
 * carries meaning (between hero and pricing, between brand and craft).
 */
export type DividerVariant = "chrome" | "duality";

export type DividerProps = {
  variant?: DividerVariant;
  className?: string;
};

export function Divider({ variant = "chrome", className }: DividerProps) {
  const styles =
    variant === "duality"
      ? {
          background:
            "linear-gradient(90deg, transparent 0%, var(--color-blue-core) 35%, var(--color-coral-core) 65%, transparent 100%)",
        }
      : {
          background:
            "linear-gradient(90deg, transparent 0%, var(--color-chrome-lo) 50%, transparent 100%)",
        };

  return (
    <hr
      role="separator"
      aria-hidden="true"
      className={cn("h-px w-[70%] mx-auto border-0", className)}
      style={styles}
    />
  );
}
