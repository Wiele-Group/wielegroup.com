import {
  forwardRef,
  useId,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  containerClassName?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, error, containerClassName, id, rows = 4, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const hintId = hint ? `${textareaId}-hint` : undefined;
    const errorId = error ? `${textareaId}-error` : undefined;

    return (
      <div className={cn("flex flex-col gap-1.5", containerClassName)}>
        {label ? (
          <label
            htmlFor={textareaId}
            className="text-body-sm text-cloud font-medium"
          >
            {label}
          </label>
        ) : null}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          aria-invalid={error ? true : undefined}
          aria-describedby={cn(hintId, errorId) || undefined}
          className={cn(
            "px-4 py-3 w-full resize-y min-h-[6.5rem]",
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
Textarea.displayName = "Textarea";
