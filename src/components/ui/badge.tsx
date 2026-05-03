import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const variantStyles = {
  default:
    "bg-[var(--color-surface-elevated)] text-cloud border border-[var(--color-border-default)]",
  electric:
    "bg-[rgba(99,102,241,0.12)] text-electric-light border border-[rgba(99,102,241,0.32)]",
  neon: "bg-[rgba(34,211,238,0.10)] text-neon border border-[rgba(34,211,238,0.30)]",
  pulse: "bg-[rgba(168,85,247,0.10)] text-pulse border border-[rgba(168,85,247,0.30)]",
  success:
    "bg-[rgba(55,214,122,0.10)] text-success border border-[rgba(55,214,122,0.30)]",
  warning:
    "bg-[rgba(242,201,76,0.10)] text-warning border border-[rgba(242,201,76,0.30)]",
  danger:
    "bg-[rgba(255,77,77,0.10)] text-danger border border-[rgba(255,77,77,0.30)]",
  outline:
    "bg-transparent text-silver border border-[var(--color-border-default)]",
} as const;

const sizeStyles = {
  sm: "text-[0.6875rem] px-2 py-0.5",
  md: "text-xs px-2.5 py-1",
  lg: "text-[0.8125rem] px-3 py-1.5",
} as const;

export type BadgeVariant = keyof typeof variantStyles;
export type BadgeSize = keyof typeof sizeStyles;

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5 font-medium uppercase tracking-[0.06em] rounded-[var(--radius-full)] whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    />
  ),
);
Badge.displayName = "Badge";
