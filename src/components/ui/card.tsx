import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const variantStyles = {
  default:
    "bg-[var(--color-surface-elevated)] border border-[var(--color-border-default)] shadow-[var(--shadow-md)]",
  glass:
    "bg-[var(--color-surface-glass)] backdrop-blur-[16px] border border-[var(--color-border-subtle)]",
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
