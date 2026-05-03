import { NextResponse } from "next/server";
import { auditSchema } from "@/lib/validations";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { recordAuditSubmission, type AuditQueueRecord } from "@/lib/kv";
import {
  sendAuditCustomerConfirmation,
  sendAuditFounderNotification,
} from "@/lib/resend";
import { submitToWieleAi } from "@/lib/wiele-ai";

export const runtime = "nodejs";

/**
 * POST /api/audit — Signal Audit submission handler.
 *
 * Authority:
 *  · directive §6 Phase 5
 *  · memory/feedback_lead_capture_failopen.md (binding sequence)
 *  · CLAUDE.md "Lead-capture forms fail-open to KV"
 *
 * Fail-open sequence (binding):
 *  1. Validate Zod                     → 400 if invalid (only failure path the user sees)
 *  2. Verify Turnstile server-side     → 403 if invalid
 *  3. Write KV FIRST                   → log on fail, continue
 *  4. Attempt wiele-ai (stub|real)     → swallow on fail, log result
 *  5. Update KV with engine status     → log on fail, continue
 *  6. Send 2 transactional emails      → log on fail, continue
 *  7. Return 202 { runId, queuedAt }
 *
 * Customer-facing failure path = invalid input or bot. Everything
 * else = succeed and recover async. A £2,500 audit lead must never
 * see "submission failed."
 */
export async function POST(request: Request): Promise<Response> {
  // ── 1. Parse + validate ────────────────────────────────────
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const parsed = auditSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        issues: parsed.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400 },
    );
  }
  const input = parsed.data;

  const meta = {
    userAgent: request.headers.get("user-agent") ?? undefined,
    ip: extractIp(request),
    referer: request.headers.get("referer") ?? undefined,
  };

  // ── 2. Server-side Turnstile verification ──────────────────
  const verification = await verifyTurnstileToken(input.turnstileToken, meta.ip);
  if (!verification.ok) {
    console.warn(
      `[audit] turnstile rejected — ${verification.reason}${verification.codes ? ` (${verification.codes.join(",")})` : ""}`,
    );
    return NextResponse.json(
      { error: "Verification failed. Please reload and try again." },
      { status: 403 },
    );
  }

  // ── 3. Generate runId + write KV first ─────────────────────
  const runId = newRunId();
  const queuedAt = new Date().toISOString();

  // Strip the captcha token before persisting — no need to store it.
  const { turnstileToken: _ignore, ...submission } = input;
  void _ignore;

  const initialRecord: AuditQueueRecord = {
    runId,
    queuedAt,
    submission: submission as Record<string, string>,
    meta,
    engineStatus: "queued",
  };

  try {
    await recordAuditSubmission(initialRecord);
  } catch (err) {
    console.error(
      `[audit] KV write failed for ${runId} — falling back to log only: ${errMsg(err)}`,
    );
    // Lead is still being processed — emails below carry the full payload
    // to the founder's inbox even without a KV record.
  }

  // ── 4. Attempt wiele-ai (best effort) ──────────────────────
  const engine = await submitToWieleAi(input).catch((err) => ({
    ok: false as const,
    reason: errMsg(err),
    mode: "real" as const,
  }));

  if (!engine.ok) {
    console.error(`[audit] wiele-ai ${engine.mode} mode failed for ${runId}: ${engine.reason}`);
  }

  // ── 5. Update KV with engine status (best effort) ──────────
  if (!engine.ok) {
    try {
      await recordAuditSubmission({
        ...initialRecord,
        engineStatus: "failed",
        engineError: engine.reason,
      });
    } catch (err) {
      console.error(`[audit] KV update failed for ${runId}: ${errMsg(err)}`);
    }
  } else if (engine.mode === "stub") {
    try {
      await recordAuditSubmission({
        ...initialRecord,
        engineStatus: "stubbed",
      });
    } catch (err) {
      console.error(`[audit] KV update failed for ${runId}: ${errMsg(err)}`);
    }
  }

  // ── 6. Send transactional emails (best effort, in parallel) ─
  const [customerResult, founderResult] = await Promise.all([
    sendAuditCustomerConfirmation(input, runId).catch((err) => ({
      ok: false as const,
      reason: errMsg(err),
    })),
    sendAuditFounderNotification(input, runId, meta).catch((err) => ({
      ok: false as const,
      reason: errMsg(err),
    })),
  ]);

  if (!customerResult.ok) {
    console.error(`[audit] customer email failed for ${runId}: ${customerResult.reason}`);
  }
  if (!founderResult.ok) {
    console.error(`[audit] founder email failed for ${runId}: ${founderResult.reason}`);
  }

  // ── 7. Return 202 ──────────────────────────────────────────
  return NextResponse.json(
    {
      runId,
      queuedAt,
      mode: engine.mode,
    },
    { status: 202 },
  );
}

/* ─────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────── */

function newRunId(): string {
  try {
    return `wiele-${crypto.randomUUID()}`;
  } catch {
    const hex = (n: number) => Math.floor(Math.random() * n).toString(16).padStart(2, "0");
    return `wiele-${hex(256)}${hex(256)}${hex(256)}${hex(256)}-${Date.now().toString(16)}`;
  }
}

function extractIp(request: Request): string | undefined {
  // Cloudflare standard. Falls back to X-Forwarded-For first hop.
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    undefined
  );
}

function errMsg(err: unknown): string {
  return err instanceof Error ? err.message : "unknown";
}
