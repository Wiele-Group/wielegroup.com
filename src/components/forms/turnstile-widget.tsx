"use client";

import { useEffect, useId, useRef } from "react";

/**
 * Cloudflare Turnstile client widget.
 *
 * Loads challenges.js once per page, renders an invisible widget, and
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

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let scriptLoadingPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptLoadingPromise) return scriptLoadingPromise;

  scriptLoadingPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Turnstile load failed")), {
        once: true,
      });
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("Turnstile load failed")), {
      once: true,
    });
    document.head.appendChild(script);
  });
  return scriptLoadingPromise;
}

export type TurnstileWidgetProps = {
  onToken: (token: string) => void;
  onError?: () => void;
  className?: string;
};

export function TurnstileWidget({ onToken, onError, className }: TurnstileWidgetProps) {
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
          theme: "dark",
          size: "flexible",
        });
      })
      .catch(() => onError?.());

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
  }, [siteKey, id]);

  if (!siteKey) {
    return (
      <p className={className}>
        <span className="text-body-xs font-mono text-smoke">
          Verification skipped (dev mode — Turnstile not configured)
        </span>
      </p>
    );
  }

  return <div ref={containerRef} className={className} aria-label="Verification" />;
}
