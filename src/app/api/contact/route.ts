import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { recordContactSubmission, type ContactQueueRecord } from "@/lib/kv";
import { sendContactNotification } from "@/lib/resend";

export const runtime = "nodejs";

/**
 * POST /api/contact — Contact form handler.
 *
 * Same fail-open sequence as /api/audit, simpler payload (4 fields,
 * one founder-bound email — no customer confirmation since the message
 * itself is the conversation start).
 */
export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
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
    console.warn(`[contact] turnstile rejected — ${verification.reason}`);
    return NextResponse.json(
      { error: "Verification failed. Please reload and try again." },
      { status: 403 },
    );
  }

  const ticketId = newTicketId();
  const queuedAt = new Date().toISOString();

  const { turnstileToken: _ignore, ...submission } = input;
  void _ignore;

  const record: ContactQueueRecord = {
    ticketId,
    queuedAt,
    submission: submission as Record<string, string>,
    meta,
  };

  try {
    await recordContactSubmission(record);
  } catch (err) {
    console.error(
      `[contact] KV write failed for ${ticketId}: ${err instanceof Error ? err.message : "unknown"}`,
    );
  }

  const emailResult = await sendContactNotification(input, ticketId, meta).catch((err) => ({
    ok: false as const,
    reason: err instanceof Error ? err.message : "unknown",
  }));
  if (!emailResult.ok) {
    console.error(`[contact] founder email failed for ${ticketId}: ${emailResult.reason}`);
  }

  return NextResponse.json({ ticketId, queuedAt }, { status: 202 });
}

function newTicketId(): string {
  try {
    return `contact-${crypto.randomUUID()}`;
  } catch {
    return `contact-${Date.now().toString(16)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}
