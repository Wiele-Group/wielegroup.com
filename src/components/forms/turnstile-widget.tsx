"use client";

import { useEffect, useId, useRef } from "react";
import { loadTurnstileScript } from "@/lib/turnstile-script";

/**
 * Cloudflare Turnstile client widget.
 *
 * Shares the Turnstile script across forms, renders a verification widget, and
 * fires `onToken` with the verification token. The token is then sent
 * with the form submission and re-verified server-side
 * (mandatory — see src/lib/turnstile.ts).
 *
 * Dev mode: when NEXT_PUBLIC_TURNSTILE_SITE_KEY isn't set, fires a
 * "dev-bypass" token immediately so local development works without
 * Cloudflare. The server side accepts tokens prefixed with "dev-" only
 * when TURNSTILE_SECRET_KEY isn't configured — both ends fail closed
 * in production.
 */

declare global {
  interface Window {
    turnstile?: {
      render: (
        target: string | HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "flexible" | "compact";
        },
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export type TurnstileWidgetProps = {
  onToken: (token: string) => void;
  onError?: () => void;
  className?: string;
  size?: "normal" | "flexible" | "compact";
};

export function TurnstileWidget({ onToken, onError, className, size }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const id = useId();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    // Dev / unconfigured: bypass with a deterministic token.
    if (!siteKey) {
      onToken(`dev-bypass-${id}`);
      return;
    }

    let cancelled = false;
    loadTurnstileScript()
      .then(() => {
        if (cancelled) return;
        if (!window.turnstile || !containerRef.current) return;
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: onToken,
          "error-callback": () => onError?.(),
          "expired-callback": () => onError?.(),
          theme: "light",
          size: size ?? (containerRef.current.clientWidth < 300 ? "compact" : "flexible"),
        });
      })
      .catch(() => { if (!cancelled) onError?.(); });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* widget already torn down */
        }
        widgetIdRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onToken/onError captured intentionally on first render
  }, [siteKey, id, size]);

  if (!siteKey) {
    return (
      <p className={className}>
        <span className="text-body-xs font-mono text-smoke">
          Verification is unavailable. Please contact us by email.
        </span>
      </p>
    );
  }

  return <div ref={containerRef} className={className} aria-label="Verification" />;
}
