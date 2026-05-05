import type { AuditInput, ContactInput, OnboardingInput } from "./validations";
import { siteConfig } from "./metadata";

/**
 * Transactional email senders for audit + contact + onboarding submissions.
 *
 * Two emails per audit / onboarding submission, not one
 * (founder reinforcement #3): customer confirmation + founder notification.
 *
 * All via Resend. Transactional only — no marketing list, no double-opt-in
 * nonsense. These are confirmations of paid intent.
 *
 * Failure semantics: send() never throws. On error, returns
 * { ok: false, reason }. The route handler logs and continues —
 * the lead is already in KV.
 *
 * VISUAL: Brand v2 B4 Chromaglass (2026-05-04 PM). All HTML uses inline
 * hex colors (no CSS variables — email clients strip them). Tables for
 * layout (Outlook safety). color-scheme meta tag for client awareness.
 */

const RESEND_URL = "https://api.resend.com/emails";

const FROM_AUDITS = "Wiele Audits <audits@wielegroup.com>";
const FROM_CONTACT = "Wiele <hello@wielegroup.com>";
const FROM_ONBOARDING = "Wiele Onboarding <onboarding@wielegroup.com>";

/* ─────────────────────────────────────────────────────────────
   B4 Chromaglass color tokens — INLINE HEX, no CSS vars.
   Email clients (especially Outlook + Gmail) strip CSS variables,
   so every color must be a literal hex. Single source of truth here;
   referenced by template builders below.
───────────────────────────────────────────────────────────────── */

const C = {
  bgVoid: "#070B14",
  bgMidnight: "#0C1220",
  bgFloor: "#141C2E",
  bgElevated: "#1A2540",
  chromeHi: "#EEF2F8",
  chromeMid: "#B8C4D6",
  chromeLo: "#5C6A82",
  chromeVlo: "#2A3447",
  blueCore: "#3B82F6",
  blueHi: "#5BABFF",
  coralCore: "#F08566",
  coralHi: "#FFC2A0",
} as const;

/* Email-safe wrapper builder: dark-mode aware, Outlook-safe.
   `body` = the inner HTML (tables/text/etc), already escaped.
   Renders header (chrome wordmark) + body + footer. */
function chromaglassShell(body: string, opts?: { footerNote?: string }): string {
  const footer = opts?.footerNote
    ? `<tr><td style="padding:24px 32px 32px;color:${C.chromeLo};font-size:12px;font-family:ui-monospace,'SF Mono',Menlo,monospace;letter-spacing:0.04em">${opts.footerNote}</td></tr>`
    : "";

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>Wiele Group</title>
</head>
<body style="margin:0;padding:0;background:${C.bgVoid};color:${C.chromeMid};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bgVoid};margin:0;padding:0;">
<tr><td align="center" style="padding:40px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${C.bgMidnight};border:1px solid ${C.chromeVlo};border-radius:16px;overflow:hidden;">

  <!-- Header bar with wordmark -->
  <tr>
    <td style="padding:28px 32px 20px;background:${C.bgFloor};border-bottom:1px solid ${C.chromeVlo};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;font-size:22px;font-weight:300;letter-spacing:-0.02em;color:${C.chromeHi};">
            wiele
          </td>
          <td align="right" style="font-family:ui-monospace,'SF Mono',Menlo,monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:${C.chromeLo};">
            The agency operating system
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Duality accent line -->
  <tr><td style="height:2px;background:linear-gradient(90deg,${C.blueHi} 0%,${C.coralCore} 100%);font-size:0;line-height:0;">&nbsp;</td></tr>

  <!-- Body -->
  <tr><td style="padding:32px;color:${C.chromeMid};font-size:15px;line-height:1.65;">${body}</td></tr>

  ${footer}

</table>
</td></tr>
</table>
</body>
</html>`;
}

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
// Budget tier labels for founder-facing onboarding email rendering.
// Keys mirror src/data/pricing.ts tier IDs exactly. Keep in lockstep with
// src/data/onboarding.ts BUDGET_TIER_OPTIONS + src/lib/validations.ts.
// Updated 2026-05-05 v2.5.1-revenue-hygiene.
const BUDGET_LABELS: Record<string, string> = {
  "signal-audit": "Signal Audit (£2,500 one-off)",
  "growth-system": "Growth System (£4,000 / mo)",
  "authority-engine": "Authority Engine (£8,000 / mo)",
  "wiele-os": "Wiele OS (£15,000+ / mo)",
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
  const body = `
<p style="margin:0 0 16px;color:${C.chromeHi};font-size:16px;">Hi ${escapeHtml(input.name.split(" ")[0])},</p>
<p style="margin:0 0 16px;">We've received your Signal Audit request for <strong style="color:${C.chromeHi};">${escapeHtml(input.company)}</strong>.</p>
<p style="margin:0 0 24px;">Your full report will arrive within <strong style="color:${C.blueHi};">14 days</strong> — including a 30-day implementation roadmap and a strategy session with a Wiele principal.</p>
<table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin:0 0 24px;background:${C.bgFloor};border:1px solid ${C.chromeVlo};border-radius:10px;overflow:hidden;"><tbody>
${row("Company", input.company)}
${row("Website", input.website)}
${row("Industry", input.industry)}
${row("Market", input.market)}
${row("Competitors", input.competitors)}
${row("Positioning", input.positioning)}
</tbody></table>
<p style="margin:0 0 16px;">Reply to this email if anything changes before we run the engine.</p>
<p style="margin:24px 0 0;color:${C.chromeMid};">— ${escapeHtml(siteConfig.founder)}<br/><span style="color:${C.chromeLo};">${escapeHtml(siteConfig.legalName)}</span> · <a href="${siteConfig.url}" style="color:${C.blueHi};text-decoration:none;">${siteConfig.url.replace(/^https?:\/\//, "")}</a></p>`;
  const html = chromaglassShell(body, { footerNote: `Reference: ${escapeHtml(runId)}` });

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
  const body = `
<h2 style="margin:0 0 24px;font-size:18px;font-weight:600;color:${C.chromeHi};letter-spacing:-0.01em;">New Signal Audit — <span style="color:${C.blueHi};">${escapeHtml(input.company)}</span></h2>
<table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;background:${C.bgFloor};border:1px solid ${C.chromeVlo};border-radius:10px;overflow:hidden;margin:0 0 24px;"><tbody>
${row("Name", input.name)}
${row("Email", `<a href="mailto:${escapeHtml(input.email)}" style="color:${C.blueHi};text-decoration:none;">${escapeHtml(input.email)}</a>`)}
${row("Company", input.company)}
${row("Website", `<a href="${escapeHtml(input.website)}" style="color:${C.blueHi};text-decoration:none;">${escapeHtml(input.website)}</a>`)}
${row("Industry", input.industry)}
${row("Market", input.market)}
${row("Competitors", input.competitors)}
${row("Positioning", input.positioning)}
</tbody></table>
${sectionLabel("Forensics")}
<table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;background:${C.bgFloor};border:1px solid ${C.chromeVlo};border-radius:10px;overflow:hidden;margin:8px 0 0;"><tbody>
${row("KV ref", `audit:${runId}`)}
${row("User-Agent", meta.userAgent ?? "(none)")}
${row("IP", meta.ip ?? "(none)")}
${row("Referer", meta.referer ?? "(none)")}
</tbody></table>`;
  const html = chromaglassShell(body);

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
  const body = `
<h2 style="margin:0 0 8px;font-size:18px;font-weight:600;color:${C.chromeHi};letter-spacing:-0.01em;">${escapeHtml(input.name)}</h2>
<p style="margin:0 0 20px;color:${C.chromeLo};font-size:13px;"><a href="mailto:${escapeHtml(input.email)}" style="color:${C.blueHi};text-decoration:none;">${escapeHtml(input.email)}</a>${input.company ? ` · ${escapeHtml(input.company)}` : ""}</p>
<div style="white-space:pre-wrap;line-height:1.65;background:${C.bgFloor};border:1px solid ${C.chromeVlo};border-left:3px solid ${C.coralCore};padding:16px 20px;border-radius:8px;color:${C.chromeMid};">${escapeHtml(input.message)}</div>`;
  const footerNote = `KV ref: contact:${escapeHtml(ticketId)} · UA: ${escapeHtml(meta.userAgent ?? "(none)")} · IP: ${escapeHtml(meta.ip ?? "(none)")}`;
  const html = chromaglassShell(body, { footerNote });

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

  const body = `
<p style="margin:0 0 16px;color:${C.chromeHi};font-size:16px;">Hi ${escapeHtml(firstName)},</p>
<p style="margin:0 0 16px;">Thank you for completing the onboarding questionnaire for <strong style="color:${C.chromeHi};">${escapeHtml(input.company)}</strong>.</p>
<p style="margin:0 0 24px;">A Wiele principal will review every detail personally. You'll hear from us inside <strong style="color:${C.blueHi};">one business day</strong> with a tailored strategy proposal and next steps.</p>

<div style="background:${C.bgFloor};border:1px solid ${C.chromeVlo};border-radius:10px;padding:18px 22px;margin:0 0 24px;">
  <div style="font-family:ui-monospace,'SF Mono',Menlo,monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:${C.chromeLo};margin:0 0 8px;">Services of interest</div>
  <div style="color:${C.chromeHi};font-size:15px;">${escapeHtml(services)}</div>
</div>

${sectionLabel("What happens next")}
<table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin:8px 0 24px;"><tbody>
${stepRow("01", "We review your submission, presence, and competitive landscape.")}
${stepRow("02", "We come back with an initial strategic read and recommended engagement model.")}
${stepRow("03", "We schedule a strategy call to align on direction, scope, and investment.")}
${stepRow("04", "Engagement kicks off with a structured 30-day onboarding sprint.")}
</tbody></table>

<p style="margin:0 0 16px;">If anything changes before we connect, simply reply to this email.</p>
<p style="margin:24px 0 0;color:${C.chromeMid};">— ${escapeHtml(siteConfig.founder)}<br/><span style="color:${C.chromeLo};">${escapeHtml(siteConfig.legalName)}</span> · <a href="${siteConfig.url}" style="color:${C.blueHi};text-decoration:none;">${siteConfig.url.replace(/^https?:\/\//, "")}</a></p>`;
  const html = chromaglassShell(body, { footerNote: `Reference: ${escapeHtml(intakeId)}` });

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
    `<tr><td colspan="2" style="background:${C.bgElevated};color:${C.chromeHi};padding:10px 14px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;font-size:10px;font-family:ui-monospace,'SF Mono',Menlo,monospace;border-top:1px solid ${C.chromeVlo};border-bottom:1px solid ${C.chromeVlo};">${escapeHtml(title)}</td></tr>`;
  const longRow = (label: string, value: string) =>
    value && value.trim()
      ? `<tr><td colspan="2" style="border-bottom:1px solid ${C.chromeVlo};padding:14px 16px;color:${C.chromeMid};"><div style="color:${C.chromeLo};font-size:10px;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.14em;font-family:ui-monospace,'SF Mono',Menlo,monospace;">${escapeHtml(label)}</div><div style="white-space:pre-wrap;color:${C.chromeHi};font-size:14px;line-height:1.55;">${escapeHtml(value)}</div></td></tr>`
      : "";

  const body = `
<h2 style="margin:0 0 24px;font-size:18px;font-weight:600;color:${C.chromeHi};letter-spacing:-0.01em;">New onboarding intake — <span style="color:${C.coralCore};">${escapeHtml(input.company)}</span></h2>
<table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;background:${C.bgFloor};border:1px solid ${C.chromeVlo};border-radius:10px;overflow:hidden;"><tbody>
${sec("Contact")}
${row("Name", input.name)}
${row("Role", input.role || "(not provided)")}
${row("Email", `<a href="mailto:${escapeHtml(input.email)}" style="color:${C.blueHi};text-decoration:none;">${escapeHtml(input.email)}</a>`)}
${row("Phone", input.phone || "(not provided)")}
${sec("Company")}
${row("Company", input.company)}
${row("Website", `<a href="${escapeHtml(input.website)}" target="_blank" style="color:${C.blueHi};text-decoration:none;">${escapeHtml(input.website)}</a>`)}
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
</tbody></table>`;
  const html = chromaglassShell(body);

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
  return `<tr><td style="border-bottom:1px solid ${C.chromeVlo};color:${C.chromeLo};width:32%;vertical-align:top;padding:12px 16px;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;font-family:ui-monospace,'SF Mono',Menlo,monospace;">${escapeHtml(label)}</td><td style="border-bottom:1px solid ${C.chromeVlo};color:${C.chromeHi};padding:12px 16px;font-size:14px;line-height:1.55;">${value}</td></tr>`;
}

function sectionLabel(title: string): string {
  return `<div style="font-family:ui-monospace,'SF Mono',Menlo,monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:${C.chromeLo};margin:24px 0 0;">${escapeHtml(title)}</div>`;
}

function stepRow(num: string, text: string): string {
  return `<tr><td style="vertical-align:top;padding:10px 0;width:48px;color:${C.blueHi};font-family:ui-monospace,'SF Mono',Menlo,monospace;font-size:12px;letter-spacing:0.06em;">${escapeHtml(num)}</td><td style="vertical-align:top;padding:10px 0;color:${C.chromeMid};font-size:14px;line-height:1.6;">${escapeHtml(text)}</td></tr>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
