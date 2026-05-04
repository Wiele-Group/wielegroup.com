import { NextResponse } from "next/server";
import { onboardingSchema } from "@/lib/validations";
import { verifyTurnstileToken } from "@/lib/turnstile";
import {
  recordOnboardingSubmission,
  type OnboardingQueueRecord,
} from "@/lib/kv";
import {
  sendOnboardingClientConfirmation,
  sendOnboardingFounderNotification,
} from "@/lib/resend";

export const runtime = "nodejs";

/**
 * POST /api/onboarding — Client onboarding questionnaire handler.
 *
 * Fail-open sequence (mirrors /api/audit and /api/contact):
 *   1. Validate payload (zod) — 400 on schema failure
 *   2. Verify Turnstile token — 403 on bot/spam
 *   3. Persist to KV (best-effort, non-fatal)
 *   4. Send founder notification email (Resend)
 *   5. Send client confirmation email (Resend)
 *   6. Return 202 with intakeId
 *
 * Email failures are logged but do NOT fail the request — the lead is
 * already in KV. Client gets 202 + intakeId either way.
 */
export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = onboardingSchema.safeParse(body);
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
    ip:
      request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      undefined,
    referer: request.headers.get("referer") ?? undefined,
  };

  const verification = await verifyTurnstileToken(input.turnstileToken, meta.ip);
  if (!verification.ok) {
    console.warn(`[onboarding] turnstile rejected — ${verification.reason}`);
    return NextResponse.json(
      { error: "Verification failed. Please reload and try again." },
      { status: 403 },
    );
  }

  const intakeId = newIntakeId();
  const queuedAt = new Date().toISOString();

  // Strip turnstileToken before persisting / forwarding.
  const { turnstileToken: _ignore, ...rest } = input;
  void _ignore;

  // KV requires Record<string,string>; flatten arrays + non-strings.
  const submission: Record<string, string> = {};
  for (const [k, v] of Object.entries(rest)) {
    if (Array.isArray(v)) submission[k] = v.join(",");
    else submission[k] = String(v ?? "");
  }

  const record: OnboardingQueueRecord = {
    intakeId,
    queuedAt,
    submission,
    meta,
  };

  try {
    await recordOnboardingSubmission(record);
  } catch (err) {
    console.error(
      `[onboarding] KV write failed for ${intakeId}: ${err instanceof Error ? err.message : "unknown"}`,
    );
  }

  // Founder notification — primary, must succeed in spirit but non-fatal.
  const founderResult = await sendOnboardingFounderNotification(
    input,
    intakeId,
    meta,
  ).catch((err) => ({
    ok: false as const,
    reason: err instanceof Error ? err.message : "unknown",
  }));
  if (!founderResult.ok) {
    console.error(
      `[onboarding] founder email failed for ${intakeId}: ${founderResult.reason}`,
    );
  }

  // Client confirmation — non-fatal.
  const clientResult = await sendOnboardingClientConfirmation(
    input,
    intakeId,
  ).catch((err) => ({
    ok: false as const,
    reason: err instanceof Error ? err.message : "unknown",
  }));
  if (!clientResult.ok) {
    console.error(
      `[onboarding] client email failed for ${intakeId}: ${clientResult.reason}`,
    );
  }

  return NextResponse.json({ intakeId, queuedAt }, { status: 202 });
}

function newIntakeId(): string {
  try {
    return `onboarding-${crypto.randomUUID()}`;
  } catch {
    return `onboarding-${Date.now().toString(16)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}
