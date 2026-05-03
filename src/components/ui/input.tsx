import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  containerClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, containerClassName, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className={cn("flex flex-col gap-1.5", containerClassName)}>
        {label ? (
          <label
            htmlFor={inputId}
            className="text-body-sm text-cloud font-medium"
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={cn(hintId, errorId) || undefined}
          className={cn(
            "h-11 px-4 w-full",
            "bg-[var(--color-surface-elevated)] text-white placeholder:text-smoke",
            "border border-[var(--color-border-default)] rounded-[var(--radius-md)]",
            "transition-[border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
            "hover:border-[var(--color-border-strong)]",
            "focus-visible:outline-none focus-visible:border-electric focus-visible:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]",
            error &&
              "border-danger focus-visible:border-danger focus-visible:shadow-[0_0_0_3px_rgba(255,77,77,0.15)]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className,
          )}
          {...props}
        />
        {hint && !error ? (
          <p id={hintId} className="text-body-xs text-smoke">
            {hint}
          </p>
        ) : null}
        {error ? (
          <p id={errorId} className="text-body-xs text-danger" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
Input.displayName = "Input";
