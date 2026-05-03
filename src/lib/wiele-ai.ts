import type { AuditInput } from "./validations";

/**
 * wiele-ai integration — stub-or-real, single env-var swap.
 *
 * Stub mode: WIELE_AI_API_URL is unset OR set to "stub".
 *   The handler returns a synthetic { runId, queuedAt } shape without
 *   calling any external API. KV record is the durable source of truth.
 *
 * Real mode: WIELE_AI_API_URL is a real URL like
 *   https://wiele-ai.example.com (no trailing slash). The handler POSTs
 *   to ${url}/api/projects with the audit payload, expects { runId,
 *   queuedAt } back. Same response shape — no UI changes when swapped.
 *
 * SWAP PROCEDURE (binding, also documented in CLAUDE.md):
 *   1. Set WIELE_AI_API_URL to the production wiele-ai base URL in the
 *      Cloudflare Pages dashboard env vars
 *   2. Set WIELE_AI_API_KEY to the server-to-server auth token
 *   3. Trigger a redeploy. No code change required.
 *
 * Authority: founder reinforcement #2 from Phase 5 brief (binding).
 * Memory: feedback_lead_capture_failopen.md.
 */

export type WieleAiResult =
  | {
      ok: true;
      runId: string;
      queuedAt: string;
      mode: "stub" | "real";
    }
  | {
      ok: false;
      reason: string;
      mode: "stub" | "real";
    };

function isStubMode(): boolean {
  const url = process.env.WIELE_AI_API_URL;
  return !url || url === "stub";
}

function newStubRunId(): string {
  // Crypto.randomUUID is available in Node 20+ and Workers; fallback for
  // any environment that doesn't expose it.
  try {
    return `stub-${crypto.randomUUID()}`;
  } catch {
    const hex = (n: number) => Math.floor(Math.random() * n).toString(16).padStart(2, "0");
    return `stub-${hex(256)}${hex(256)}${hex(256)}${hex(256)}-${Date.now().toString(16)}`;
  }
}

export async function submitToWieleAi(input: AuditInput): Promise<WieleAiResult> {
  if (isStubMode()) {
    return {
      ok: true,
      runId: newStubRunId(),
      queuedAt: new Date().toISOString(),
      mode: "stub",
    };
  }

  const url = process.env.WIELE_AI_API_URL!;
  const key = process.env.WIELE_AI_API_KEY;

  if (!key) {
    return {
      ok: false,
      reason: "WIELE_AI_API_URL is set but WIELE_AI_API_KEY is missing",
      mode: "real",
    };
  }

  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        // Strip the captcha token before forwarding — wiele-ai doesn't
        // need it and shouldn't see internal trust tokens.
        name: input.name,
        email: input.email,
        company: input.company,
        website: input.website,
        industry: input.industry,
        market: input.market,
        competitors: input.competitors,
        positioning: input.positioning,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return {
        ok: false,
        reason: `wiele-ai HTTP ${res.status}: ${body.slice(0, 200)}`,
        mode: "real",
      };
    }
    const data = (await res.json()) as { runId?: string; queuedAt?: string };
    if (!data.runId || !data.queuedAt) {
      return {
        ok: false,
        reason: "wiele-ai response missing runId/queuedAt",
        mode: "real",
      };
    }
    return {
      ok: true,
      runId: data.runId,
      queuedAt: data.queuedAt,
      mode: "real",
    };
  } catch (err) {
    return {
      ok: false,
      reason: err instanceof Error ? err.message : "unknown",
      mode: "real",
    };
  }
}
