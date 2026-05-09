import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Brand v2 B4 Chromaglass — glass-strip is the default surface treatment.
 * Rolling animated light strip around the card border, glass surface,
 * midnight-gradient backdrop expected behind. See globals.css `.glass-strip`.
 *
 * Variants:
 *   - default  → glass-strip (electric blue sweep) — most cards
 *   - pulse    → glass-strip-pulse (violet sweep) — premium tier markers
 *   - neon     → glass-strip-neon (cyan sweep) — data / technical surfaces
 *   - coral    → glass-strip-coral (Ember Coral sweep, B4 warm accent) —
 *                use for warm-tone authority moments and second-SKU
 *                differentiators; pairs with `default` electric cards
 *                without reading as duplicate
 *   - duality  → glass-strip-duality (B4 SIGNATURE asymmetric blue → chrome →
 *                coral sweep) — reserved for hero-grade surfaces, featured
 *                pricing markers, brand-mark moments. Not decoration.
 *   - glass    → static glass (no strip) — minor surfaces
 *   - outline  → ghost border (no fill) — tertiary contexts
 *   - raised   → opaque obsidian (legacy) — back-compat
 */
const variantStyles = {
  default: "glass-strip",
  pulse: "glass-strip glass-strip-pulse",
  neon: "glass-strip glass-strip-neon",
  coral: "glass-strip glass-strip-coral",
  duality: "glass-strip glass-strip-duality",
  glass:
    "bg-[var(--color-surface-glass)] backdrop-blur-[20px] border border-[var(--color-border-subtle)]",
  outline:
    "bg-transparent border border-[var(--color-border-default)] hover:border-[var(--color-border-strong)] transition-colors",
  raised:
    "bg-obsidian border border-[var(--color-border-default)] shadow-[var(--shadow-lg)]",
} as const;

export type CardVariant = keyof typeof variantStyles;

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[var(--radius-lg)] p-6",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5 mb-4", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-heading-sm text-white tracking-tight", className)}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-body-sm text-silver", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-body-md text-cloud", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-3 mt-6", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";
