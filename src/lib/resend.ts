import type { AuditInput, ContactInput, OnboardingInput } from "./validations";
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
const FROM_ONBOARDING = "Wiele Onboarding <onboarding@wielegroup.com>";

/* ─────────────────────────────────────────────────────────────
   Service + enum label maps — for human-readable email rendering.
───────────────────────────────────────────────────────────────── */

const SERVICE_LABELS: Record<string, string> = {
  "brand-marketing": "Brand Design & Marketing",
  "web-design": "Web Design",
  advertising: "Advertising",
  seo: "SEO Services",
  "ai-search": "AI Search Optimization",
};
const STAGE_LABELS: Record<string, string> = {
  founder: "Founder / Startup",
  scaling: "Scaling",
  established: "Established",
  enterprise: "Enterprise",
};
const REVENUE_LABELS: Record<string, string> = {
  "lt-500k": "Under £500k",
  "500k-2m": "£500k – £2M",
  "2m-10m": "£2M – £10M",
  "10m-50m": "£10M – £50M",
  "50m-plus": "£50M+",
  "prefer-not": "Prefer not to say",
};
const BUDGET_LABELS: Record<string, string> = {
  launch: "Launch (£2,500/mo)",
  growth: "Growth (£6,500/mo)",
  scale: "Scale (£14,000/mo)",
  enterprise: "Enterprise (bespoke)",
  "not-sure": "Not sure yet",
};
const TIMELINE_LABELS: Record<string, string> = {
  asap: "ASAP",
  "1-3": "1 – 3 months",
  "3-6": "3 – 6 months",
  exploring: "Just exploring",
};
const ASSETS_LABELS: Record<string, string> = {
  complete: "Have full brand guidelines",
  partial: "Some brand assets, no formal guidelines",
  none: "No brand assets — starting fresh",
};

function lbl(map: Record<string, string>, value: string | undefined): string {
  if (!value) return "(not provided)";
  return map[value] ?? value;
}

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
   Onboarding emails — two per submission (client confirm + founder notify).
───────────────────────────────────────────────────────────────── */

export async function sendOnboardingClientConfirmation(
  input: OnboardingInput,
  intakeId: string,
): Promise<ResendResult> {
  const firstName = input.name.split(" ")[0];
  const services = input.services.map((s) => SERVICE_LABELS[s] ?? s).join(", ");

  const subject = `Wiele Onboarding — submission received (${intakeId})`;
  const text = `Hi ${firstName},

Thank you for completing the Wiele onboarding questionnaire for ${input.company}.

We've received your submission and a Wiele principal will review every detail
personally. You'll hear from us inside one business day with a tailored
strategy proposal and next steps.

Services you've expressed interest in:
  ${services}

What happens next:
  1. We review your submission, your existing presence, and your competitive landscape.
  2. We come back to you with an initial strategic read and a recommended engagement model.
  3. We schedule a strategy call to align on direction, scope, and investment.
  4. Engagement kicks off with a structured 30-day onboarding sprint.

If anything changes before we connect, simply reply to this email.

— ${siteConfig.founder}
${siteConfig.legalName} · ${siteConfig.url}
Reference: ${intakeId}`;

  const html = `<!doctype html><html><body style="font-family:ui-sans-serif,system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;color:#0B0D10;line-height:1.6">
<p>Hi ${escapeHtml(firstName)},</p>
<p>Thank you for completing the Wiele onboarding questionnaire for <strong>${escapeHtml(input.company)}</strong>.</p>
<p>We've received your submission and a Wiele principal will review every detail personally. You'll hear from us inside <strong>one business day</strong> with a tailored strategy proposal and next steps.</p>
<p style="margin-top:20px"><strong>Services you've expressed interest in:</strong><br/>${escapeHtml(services)}</p>
<p style="margin-top:20px"><strong>What happens next</strong></p>
<ol style="padding-left:20px;line-height:1.7">
<li>We review your submission, your existing presence, and your competitive landscape.</li>
<li>We come back to you with an initial strategic read and a recommended engagement model.</li>
<li>We schedule a strategy call to align on direction, scope, and investment.</li>
<li>Engagement kicks off with a structured 30-day onboarding sprint.</li>
</ol>
<p>If anything changes before we connect, simply reply to this email.</p>
<p>— ${escapeHtml(siteConfig.founder)}<br/>${escapeHtml(siteConfig.legalName)} · <a href="${siteConfig.url}">${siteConfig.url.replace(/^https?:\/\//, "")}</a></p>
<p style="color:#6B7280;font-size:12px;margin-top:32px">Reference: ${escapeHtml(intakeId)}</p>
</body></html>`;

  return send({
    from: FROM_ONBOARDING,
    to: input.email,
    replyTo: siteConfig.email,
    subject,
    text,
    html,
  });
}

export async function sendOnboardingFounderNotification(
  input: OnboardingInput,
  intakeId: string,
  meta: { userAgent?: string; ip?: string; referer?: string },
): Promise<ResendResult> {
  const subject = `New onboarding intake — ${input.company}`;
  const services = input.services.map((s) => SERVICE_LABELS[s] ?? s).join(", ");

  const text = `New onboarding intake — ${input.company}

═══ CONTACT ═══
Name:           ${input.name}
Role:           ${input.role || "(not provided)"}
Email:          ${input.email}
Phone:          ${input.phone || "(not provided)"}

═══ COMPANY ═══
Company:        ${input.company}
Website:        ${input.website}
Location:       ${input.location}
Industry:       ${input.industry || "(not provided)"}
Stage:          ${lbl(STAGE_LABELS, input.companyStage)}
Revenue range:  ${lbl(REVENUE_LABELS, input.revenueRange)}

═══ SERVICES INTERESTED IN ═══
${services}

Service notes:
${input.serviceNotes || "(none)"}

═══ EXISTING PRESENCE ═══
LinkedIn:       ${input.linkedinUrl || "(not provided)"}
Instagram:      ${input.instagramHandle || "(not provided)"}
Twitter / X:    ${input.twitterHandle || "(not provided)"}
Facebook:       ${input.facebookUrl || "(not provided)"}
TikTok:         ${input.tiktokHandle || "(not provided)"}
YouTube:        ${input.youtubeUrl || "(not provided)"}
Other channels: ${input.otherChannels || "(none)"}
Brand assets:   ${lbl(ASSETS_LABELS, input.brandAssetsStatus)}

═══ VISION + GOALS ═══
Vision:
${input.vision}

Primary goals:
${input.primaryGoals}

Target audience:
${input.targetAudience}

Geographic markets: ${input.geographicMarkets || "(not provided)"}
Competitors:        ${input.competitors || "(not provided)"}

Differentiation:
${input.differentiation || "(not provided)"}

Growth blockers:
${input.growthBlockers || "(not provided)"}

═══ ENGAGEMENT ═══
Budget tier:    ${lbl(BUDGET_LABELS, input.budgetTier)}
Timeline:       ${lbl(TIMELINE_LABELS, input.timeline)}
Decision makers:${input.decisionMakers || "(not provided)"}
Heard via:      ${input.hearAboutUs || "(not provided)"}
Best contact:   ${input.bestContactMethod || "(not provided)"}

Additional notes:
${input.additionalNotes || "(none)"}

═══ FORENSICS ═══
KV reference:   onboarding:${intakeId}
User-Agent:     ${meta.userAgent ?? "(none)"}
IP:             ${meta.ip ?? "(none)"}
Referer:        ${meta.referer ?? "(none)"}`;

  const sec = (title: string) =>
    `<tr><td colspan="2" style="background:#0B0D10;color:#fff;padding:8px 12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;font-size:11px;font-family:ui-monospace,monospace">${escapeHtml(title)}</td></tr>`;
  const longRow = (label: string, value: string) =>
    value && value.trim()
      ? `<tr><td colspan="2" style="border-bottom:1px solid #E5E7EB;padding:10px 12px;color:#0B0D10"><div style="color:#6B7280;font-size:12px;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.06em">${escapeHtml(label)}</div><div style="white-space:pre-wrap">${escapeHtml(value)}</div></td></tr>`
      : "";

  const html = `<!doctype html><html><body style="font-family:ui-sans-serif,system-ui,-apple-system,sans-serif;max-width:720px;margin:0 auto;padding:24px;font-size:14px;color:#0B0D10">
<h2 style="margin:0 0 16px;font-size:20px">New onboarding intake — ${escapeHtml(input.company)}</h2>
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;border:1px solid #E5E7EB"><tbody>
${sec("Contact")}
${row("Name", input.name)}
${row("Role", input.role || "(not provided)")}
${row("Email", `<a href="mailto:${escapeHtml(input.email)}">${escapeHtml(input.email)}</a>`)}
${row("Phone", input.phone || "(not provided)")}
${sec("Company")}
${row("Company", input.company)}
${row("Website", `<a href="${escapeHtml(input.website)}" target="_blank">${escapeHtml(input.website)}</a>`)}
${row("Location", input.location)}
${row("Industry", input.industry || "(not provided)")}
${row("Stage", lbl(STAGE_LABELS, input.companyStage))}
${row("Revenue range", lbl(REVENUE_LABELS, input.revenueRange))}
${sec("Services interested in")}
${row("Services", services)}
${longRow("Service notes", input.serviceNotes ?? "")}
${sec("Existing presence")}
${row("LinkedIn", input.linkedinUrl || "(not provided)")}
${row("Instagram", input.instagramHandle || "(not provided)")}
${row("Twitter / X", input.twitterHandle || "(not provided)")}
${row("Facebook", input.facebookUrl || "(not provided)")}
${row("TikTok", input.tiktokHandle || "(not provided)")}
${row("YouTube", input.youtubeUrl || "(not provided)")}
${row("Other channels", input.otherChannels || "(none)")}
${row("Brand assets", lbl(ASSETS_LABELS, input.brandAssetsStatus))}
${sec("Vision + goals")}
${longRow("Vision", input.vision)}
${longRow("Primary goals", input.primaryGoals)}
${longRow("Target audience", input.targetAudience)}
${row("Geographic markets", input.geographicMarkets || "(not provided)")}
${row("Competitors", input.competitors || "(not provided)")}
${longRow("Differentiation", input.differentiation ?? "")}
${longRow("Growth blockers", input.growthBlockers ?? "")}
${sec("Engagement")}
${row("Budget tier", lbl(BUDGET_LABELS, input.budgetTier))}
${row("Timeline", lbl(TIMELINE_LABELS, input.timeline))}
${row("Decision makers", input.decisionMakers || "(not provided)")}
${row("Heard via", input.hearAboutUs || "(not provided)")}
${row("Best contact", input.bestContactMethod || "(not provided)")}
${longRow("Additional notes", input.additionalNotes ?? "")}
${sec("Forensics")}
${row("KV ref", `onboarding:${intakeId}`)}
${row("User-Agent", meta.userAgent ?? "(none)")}
${row("IP", meta.ip ?? "(none)")}
${row("Referer", meta.referer ?? "(none)")}
</tbody></table>
</body></html>`;

  return send({
    from: FROM_ONBOARDING,
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
