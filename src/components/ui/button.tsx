import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap rounded-[var(--radius-md)] transition-[background-color,border-color,color,box-shadow,transform] duration-[var(--duration-fast)] ease-[var(--ease-standard)] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-void)]";

const variantStyles = {
  primary:
    "bg-electric text-white hover:bg-electric-light hover:shadow-[var(--shadow-glow-electric)] active:translate-y-[1px]",
  secondary:
    "bg-graphite text-white border border-[var(--color-border-default)] hover:border-[var(--color-border-strong)] hover:bg-steel",
  ghost:
    "bg-transparent text-cloud border border-[var(--color-border-default)] hover:border-electric hover:text-white",
  link: "bg-transparent text-electric hover:text-electric-light underline-offset-4 hover:underline px-0 py-0 h-auto",
} as const;

const sizeStyles = {
  sm: "text-[0.8125rem] h-9 px-3.5",
  md: "text-[0.9375rem] h-11 px-5",
  lg: "text-base h-12 px-6",
} as const;

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(base, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

/**
 * For anchor or Next.js Link rendering — apply the same visual styles as Button
 * via className. e.g. `<Link href="/audit" className={buttonStyles({variant: "primary"})}>`
 */
export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(base, variantStyles[variant], sizeStyles[size], className);
}
