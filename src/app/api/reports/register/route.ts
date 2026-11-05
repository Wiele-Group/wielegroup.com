import { getCloudflareContext } from "@opennextjs/cloudflare";
import { z } from "zod";
import { investmentReport } from "@/lib/investment-report";
import { accessSeconds, createAccess, privateHeaders, reportCookie, type ReportEnvironment } from "@/server/report-access";

export const runtime = "nodejs";
const input = z.object({
  name: z.string().trim().min(2).max(100).refine(v => !/[\r\n]/.test(v)),
  email: z.string().trim().email().max(254),
  objective: z.enum(["exploring", "apartment", "residence", "portfolio", "consortium"]).optional().default("exploring"),
  updates: z.boolean().optional().default(false),
  website: z.string().max(500).optional().default(""),
  token: z.string().min(1).max(2048),
});
const json = (data: unknown, status: number, headers: Record<string, string> = {}) => Response.json(data, { status, headers: { ...privateHeaders, ...headers } });

export async function POST(request: Request) {
  const url = new URL(request.url);
  const allowedOrigins = ["https://wielegroup.com", "https://www.wielegroup.com"];
  if (["localhost", "127.0.0.1"].includes(url.hostname)) allowedOrigins.push(url.origin);
  if (!allowedOrigins.includes(request.headers.get("origin") ?? "")) return json({ error: "Please register through the Wiele website." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return json({ error: "Unsupported request format." }, 415);
  let raw: string;
  try { raw = await request.text(); } catch { return json({ error: "Please check your details and try again." }, 400); }
  if (raw.length > 6000) return json({ error: "Please shorten your submission." }, 413);
  let body: unknown;
  try { body = JSON.parse(raw); } catch { return json({ error: "Please check your details and try again." }, 400); }
  const parsed = input.safeParse(body);
  if (!parsed.success) return json({ error: "Please enter your name and a valid email address, then complete verification." }, 400);
  const { website, token, ...submission } = parsed.data;
  if (website) return json({ error: "Registration could not be completed. Please try again." }, 400);
  let env: ReportEnvironment;
  try { env = getCloudflareContext().env as unknown as ReportEnvironment; } catch { return json({ error: "Registration is temporarily unavailable. Please try again shortly." }, 503); }
  if (!env.AUDIT_QUEUE || !env.TURNSTILE_SECRET_KEY || !env.REPORT_ACCESS_SECRET || env.REPORT_ACCESS_SECRET.length < 32) return json({ error: "Registration is temporarily unavailable. Please try again shortly." }, 503);
  try {
    const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token }), signal: AbortSignal.timeout(10000) });
    if (!verify.ok) return json({ error: "Verification is temporarily unavailable. Please retry." }, 503);
    const result = await verify.json() as { success?: boolean; hostname?: string };
    const hosts = ["wielegroup.com", "www.wielegroup.com"];
    if (["localhost", "127.0.0.1"].includes(url.hostname)) hosts.push(url.hostname);
    if (!result.success || !result.hostname || !hosts.includes(result.hostname)) return json({ error: "The security check expired or failed. Please retry verification." }, 403);
  } catch { return json({ error: "Verification is temporarily unavailable. Please retry." }, 503); }

  const registrationId = crypto.randomUUID();
  const registeredAt = new Date().toISOString();
  let access: string;
  try {
    access = await createAccess(env.REPORT_ACCESS_SECRET, registrationId);
    await env.AUDIT_QUEUE.put(`report-registration:${registrationId}`, JSON.stringify({
      registrationId, reportId: investmentReport.id, registeredAt, source: investmentReport.path,
      submission, emailVerified: false,
      marketingConsent: { accepted: submission.updates, version: investmentReport.consentVersion, recordedAt: registeredAt },
    }), { expirationTtl: 60 * 60 * 24 * 90 });
  } catch { return json({ error: "We could not save your registration. Please try again." }, 503); }

  // Saved registration is the success boundary. Inbox delivery is supplementary.
  if (env.RESEND_API_KEY) {
    try {
      const sent = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `report-registration-${registrationId}` }, body: JSON.stringify({
        from: "Wiele Investments <admin@wielegroup.com>", to: ["admin@wielegroup.com"], reply_to: submission.email,
        subject: "Investor report registration · Wiele Investments",
        text: `WIELE INVESTMENTS\nReport: ${investmentReport.title}\nReference: ${registrationId}\nRegistered: ${registeredAt}\n\nName: ${submission.name}\nEmail: ${submission.email} (provided, not verified)\nInterest: ${submission.objective}\nOptional market/opportunity updates: ${submission.updates ? "OPTED IN" : "NOT OPTED IN"}\nConsent wording version: ${investmentReport.consentVersion}\n\nRegistration unlocks the report; it is not a property reservation or investment commitment.`,
      }), signal: AbortSignal.timeout(10000) });
      if (!sent.ok) console.error("Report registration notification unavailable; record retained");
    } catch { console.error("Report registration notification unavailable; record retained"); }
  }
  return json({ registered: true, downloadUrl: "/api/reports/download" }, 201, {
    "Set-Cookie": `${reportCookie}=${access}; Max-Age=${accessSeconds}; Path=/api/reports; HttpOnly; Secure; SameSite=Strict`,
  });
}
