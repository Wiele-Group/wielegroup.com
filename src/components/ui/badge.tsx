import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const variantStyles = {
  default:
    "bg-[var(--color-surface-elevated)] text-cloud border border-[var(--color-border-default)]",
  electric:
    "bg-[rgba(59,130,246,0.12)] text-[var(--color-blue-hi)] border border-[rgba(59,130,246,0.32)]",
  neon:
    "bg-[rgba(184,196,214,0.10)] text-[var(--color-chrome-mid)] border border-[rgba(184,196,214,0.30)]",
  pulse:
    "bg-[rgba(240,133,102,0.10)] text-[var(--color-coral-hi)] border border-[rgba(240,133,102,0.30)]",
  success:
    "bg-[rgba(74,222,128,0.10)] text-success border border-[rgba(74,222,128,0.30)]",
  warning:
    "bg-[rgba(251,191,36,0.10)] text-warning border border-[rgba(251,191,36,0.30)]",
  danger:
    "bg-[rgba(248,113,113,0.10)] text-danger border border-[rgba(248,113,113,0.30)]",
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
