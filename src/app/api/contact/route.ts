import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { recordContactSubmission, type ContactQueueRecord } from "@/lib/kv";
import { sendContactNotification } from "@/lib/resend";

export const runtime = "nodejs";

/**
 * POST /api/contact — Contact form handler.
 *
 * Same fail-open sequence as /api/audit, simpler payload (4 fields,
 * one founder-bound email — no customer confirmation since the message
 * itself is the conversation start).
 *
 * Spam protection: hidden honeypot field (company_website). Dumb bots
 * auto-fill it; we silently 200 those without recording or emailing.
 * Real users never see the field. Sophisticated targeted attackers
 * bypass this — Cloudflare WAF rate-limiting layer follows separately.
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

  // Honeypot trip → silent 200. Returning 200 (vs 400) prevents the bot from
  // learning it was caught, so it disengages instead of retrying with mutations.
  if (input.company_website && input.company_website.length > 0) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const meta = {
    userAgent: request.headers.get("user-agent") ?? undefined,
    ip:
      request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      undefined,
    referer: request.headers.get("referer") ?? undefined,
  };

  const ticketId = newTicketId();
  const queuedAt = new Date().toISOString();

  const { company_website: _ignore, ...submission } = input;
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
