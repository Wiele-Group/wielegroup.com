const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let scriptLoadingPromise: Promise<void> | null = null;

/** Share in-flight loads, but allow a fresh request after a failure or timeout. */
export function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined" || window.turnstile) return Promise.resolve();
  if (scriptLoadingPromise) return scriptLoadingPromise;

  scriptLoadingPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]',
    );
    const script = existing ?? document.createElement("script");
    let settled = false;
    const finish = (error?: Error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      script.removeEventListener("load", loaded);
      script.removeEventListener("error", failed);
      if (error) {
        script.remove();
        reject(error);
      } else resolve();
    };
    const loaded = () => finish(window.turnstile ? undefined : new Error("Verification did not initialise"));
    const failed = () => finish(new Error("Verification could not load"));
    const timer = setTimeout(() => finish(new Error("Verification took too long to load")), 15000);
    script.addEventListener("load", loaded, { once: true });
    script.addEventListener("error", failed, { once: true });
    if (!existing) {
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }).catch(error => {
    scriptLoadingPromise = null;
    throw error;
  });
  return scriptLoadingPromise;
}
