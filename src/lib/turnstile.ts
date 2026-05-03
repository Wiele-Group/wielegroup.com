/**
 * Server-side Cloudflare Turnstile verification.
 *
 * The client widget alone is security theater — the route handler MUST
 * post the token back to Cloudflare's siteverify endpoint with the secret
 * key before any KV write. If verification fails or returns success:false,
 * reject with 403.
 *
 * Authority: founder reinforcement #5 from Phase 5 brief (binding).
 */

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type TurnstileResult = {
  success: boolean;
  /** ISO-8601 timestamp the challenge was issued. */
  challenge_ts?: string;
  /** Hostname the challenge was solved on. */
  hostname?: string;
  /** List of error codes if success: false. */
  "error-codes"?: string[];
  /** Customer widget id as configured. */
  cdata?: string;
};

export type VerifyResult =
  | { ok: true; challengeAt?: string; hostname?: string }
  | { ok: false; reason: string; codes?: string[] };

export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string,
): Promise<VerifyResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // Dev mode: when no secret is configured, accept tokens prefixed with
  // "dev-" so local development works without hitting Cloudflare. Anything
  // else gets rejected — never accept untrusted input silently in dev.
  if (!secret) {
    if (token.startsWith("dev-")) {
      return { ok: true, hostname: "localhost" };
    }
    return {
      ok: false,
      reason: "TURNSTILE_SECRET_KEY not configured (dev token required)",
    };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (remoteIp) body.set("remoteip", remoteIp);

  let response: Response;
  try {
    response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  } catch (err) {
    return {
      ok: false,
      reason: `Turnstile fetch failed: ${err instanceof Error ? err.message : "unknown"}`,
    };
  }

  if (!response.ok) {
    return {
      ok: false,
      reason: `Turnstile returned HTTP ${response.status}`,
    };
  }

  const data = (await response.json()) as TurnstileResult;
  if (data.success) {
    return { ok: true, challengeAt: data.challenge_ts, hostname: data.hostname };
  }
  return {
    ok: false,
    reason: "Turnstile rejected the token",
    codes: data["error-codes"],
  };
}
