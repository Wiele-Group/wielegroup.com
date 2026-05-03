import type { AuditInput, ContactInput } from "./validations";
import { siteConfig } from "./metadata";

/**
 * Transactional email senders for audit + contact submissions.
 *
 * Two emails per audit submission, not one (founder reinforcement #3):
 * 1. Customer confirmation
 * 2. Founder notification
 *
 * Both via Resend. Transactional only — no marketing list, no
 * double-opt-in nonsense. These are confirmations of paid intent.
 *
 * Failure semantics: send() never throws. On error, returns
 * { ok: false, reason }. The route handler logs and continues —
 * the lead is already in KV.
 */

const RESEND_URL = "https://api.resend.com/emails";

const FROM_AUDITS = "Wiele Audits <audits@wielegroup.com>";
const FROM_CONTACT = "Wiele <hello@wielegroup.com>";

type ResendResult = { ok: true; id: string } | { ok: false; reason: string };

async function send(input: {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
}): Promise<ResendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Dev / build / unconfigured environments — log and pretend OK so
    // the fail-open sequence completes without spurious "failed" logs.
    if (process.env.NODE_ENV !== "production") {
      console.info(`[resend:dev-stub] would send: ${input.subject} → ${input.to}`);
      return { ok: true, id: "dev-stub" };
    }
    return { ok: false, reason: "RESEND_API_KEY not configured" };
  }

  try {
    const res = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: input.from,
        to: input.to,
        reply_to: input.replyTo,
        subject: input.subject,
        html: input.html,
        text: input.text,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { ok: false, reason: `Resend HTTP ${res.status}: ${body.slice(0, 200)}` };
    }
    const data = (await res.json()) as { id: string };
    return { ok: true, id: data.id };
  } catch (err) {
    return {
      ok: false,
      reason: err instanceof Error ? err.message : "unknown",
    };
  }
}

/* ─────────────────────────────────────────────────────────────
   Audit emails
───────────────────────────────────────────────────────────────── */

export async function sendAuditCustomerConfirmation(
  input: AuditInput,
  runId: string,
): Promise<ResendResult> {
  const subject = `Wiele Signal Audit — submission received (${runId})`;
  const text = `Hi ${input.name.split(" ")[0]},

We've received your Signal Audit request for ${input.company}. Your full
report will arrive within 14 days, with a 30-day implementation roadmap
and a strategy session with a Wiele principal.

What you submitted:
  Company:      ${input.company}
  Website:      ${input.website}
  Industry:     ${input.industry}
  Market:       ${input.market}
  Competitors:  ${input.competitors}
  Positioning:  ${input.positioning}

Reply to this email if anything changes before we run the engine.

— ${siteConfig.founder}
${siteConfig.legalName} · ${siteConfig.url}
Reference: ${runId}`;
  const html = `<!doctype html><html><body style="font-family:ui-sans-serif,system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;color:#0B0D10;line-height:1.6">
<p>Hi ${escapeHtml(input.name.split(" ")[0])},</p>
<p>We've received your Signal Audit request for <strong>${escapeHtml(input.company)}</strong>. Your full report will arrive within 14 days, with a 30-day implementation roadmap and a strategy session with a Wiele principal.</p>
<table cellpadding="6" style="border-collapse:collapse;margin:20px 0;font-size:14px"><tbody>
${row("Company", input.company)}
${row("Website", input.website)}
${row("Industry", input.industry)}
${row("Market", input.market)}
${row("Competitors", input.competitors)}
${row("Positioning", input.positioning)}
</tbody></table>
<p>Reply to this email if anything changes before we run the engine.</p>
<p>— ${escapeHtml(siteConfig.founder)}<br/>${escapeHtml(siteConfig.legalName)} · <a href="${siteConfig.url}">${siteConfig.url.replace(/^https?:\/\//, "")}</a></p>
<p style="color:#6B7280;font-size:12px;margin-top:32px">Reference: ${escapeHtml(runId)}</p>
</body></html>`;

  return send({
    from: FROM_AUDITS,
    to: input.email,
    replyTo: siteConfig.email,
    subject,
    text,
    html,
  });
}

export async function sendAuditFounderNotification(
  input: AuditInput,
  runId: string,
  meta: { userAgent?: string; ip?: string; referer?: string },
): Promise<ResendResult> {
  const subject = `New Signal Audit submission — ${input.company}`;
  const text = `New Signal Audit submission

Company:      ${input.company}
Name:         ${input.name}
Email:        ${input.email}
Website:      ${input.website}
Industry:     ${input.industry}
Market:       ${input.market}
Competitors:  ${input.competitors}
Positioning:  ${input.positioning}

KV reference: audit:${runId}
User agent:   ${meta.userAgent ?? "(none)"}
IP:           ${meta.ip ?? "(none)"}
Referer:      ${meta.referer ?? "(none)"}`;
  const html = `<!doctype html><html><body style="font-family:ui-monospace,monospace;max-width:680px;margin:0 auto;padding:24px;font-size:14px;color:#0B0D10">
<h2 style="margin:0 0 16px;font-size:18px">New Signal Audit submission — ${escapeHtml(input.company)}</h2>
<table cellpadding="6" style="border-collapse:collapse;width:100%"><tbody>
${row("Name", input.name)}
${row("Email", `<a href="mailto:${escapeHtml(input.email)}">${escapeHtml(input.email)}</a>`)}
${row("Company", input.company)}
${row("Website", `<a href="${escapeHtml(input.website)}">${escapeHtml(input.website)}</a>`)}
${row("Industry", input.industry)}
${row("Market", input.market)}
${row("Competitors", input.competitors)}
${row("Positioning", input.positioning)}
</tbody></table>
<h3 style="margin-top:24px;font-size:14px">Forensics</h3>
<table cellpadding="6" style="border-collapse:collapse;width:100%;color:#6B7280"><tbody>
${row("KV ref", `audit:${runId}`)}
${row("User-Agent", meta.userAgent ?? "(none)")}
${row("IP", meta.ip ?? "(none)")}
${row("Referer", meta.referer ?? "(none)")}
</tbody></table>
</body></html>`;

  return send({
    from: FROM_AUDITS,
    to: siteConfig.email,
    replyTo: input.email,
    subject,
    text,
    html,
  });
}

/* ─────────────────────────────────────────────────────────────
   Contact email (single — founder notification only)
───────────────────────────────────────────────────────────────── */

export async function sendContactNotification(
  input: ContactInput,
  ticketId: string,
  meta: { userAgent?: string; ip?: string; referer?: string },
): Promise<ResendResult> {
  const subject = `Wiele contact form — ${input.company || input.name}`;
  const text = `Name:    ${input.name}
Email:   ${input.email}
Company: ${input.company || "(not provided)"}

${input.message}

—
KV reference: contact:${ticketId}
User-Agent:   ${meta.userAgent ?? "(none)"}
IP:           ${meta.ip ?? "(none)"}`;
  const html = `<!doctype html><html><body style="font-family:ui-sans-serif,system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:24px;font-size:14px;color:#0B0D10">
<h2 style="margin:0 0 12px">${escapeHtml(input.name)}</h2>
<p style="color:#6B7280;margin:0 0 16px"><a href="mailto:${escapeHtml(input.email)}">${escapeHtml(input.email)}</a>${input.company ? ` · ${escapeHtml(input.company)}` : ""}</p>
<div style="white-space:pre-wrap;line-height:1.6;border-left:2px solid #6366F1;padding:8px 12px;background:#fafafa">${escapeHtml(input.message)}</div>
<p style="color:#6B7280;font-size:12px;margin-top:24px">KV ref: contact:${escapeHtml(ticketId)} · UA: ${escapeHtml(meta.userAgent ?? "(none)")} · IP: ${escapeHtml(meta.ip ?? "(none)")}</p>
</body></html>`;

  return send({
    from: FROM_CONTACT,
    to: siteConfig.email,
    replyTo: input.email,
    subject,
    text,
    html,
  });
}

/* ─────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────── */

function row(label: string, value: string): string {
  return `<tr><td style="border-bottom:1px solid #E5E7EB;color:#6B7280;width:32%;vertical-align:top">${escapeHtml(label)}</td><td style="border-bottom:1px solid #E5E7EB;color:#0B0D10">${value}</td></tr>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
