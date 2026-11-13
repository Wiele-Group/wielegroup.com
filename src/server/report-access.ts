import { investmentReport } from "@/lib/investment-report";

export const reportCookie = "wiele_report_access";
export function reportCookieName(reportId: string = investmentReport.id) {
  return reportId === investmentReport.id ? reportCookie : "wiele_global_report_access";
}
export const accessSeconds = 60 * 60 * 24;
export const privateHeaders = {
  "Cache-Control": "private, no-store, max-age=0",
  "CDN-Cache-Control": "no-store",
  "Cloudflare-CDN-Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  Vary: "Cookie",
};
export interface ReportEnvironment {
  AUDIT_QUEUE?: { put: (key: string, value: string, options: { expirationTtl: number }) => Promise<void> };
  TURNSTILE_SECRET_KEY?: string;
  REPORT_ACCESS_SECRET?: string;
  RESEND_API_KEY?: string;
}
async function key(secret: string) {
  return crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}
export async function createAccess(secret: string, registrationId: string, now = Date.now(), reportId: string = investmentReport.id) {
  const payload = `${reportId}.${registrationId}.${Math.floor(now / 1000) + accessSeconds}`;
  const signature = await crypto.subtle.sign("HMAC", await key(secret), new TextEncoder().encode(payload));
  return `${payload}.${Buffer.from(signature).toString("base64url")}`;
}
export async function validAccess(secret: string, cookie: string, now = Date.now(), reportId: string = investmentReport.id) {
  if (cookie.length > 500) return false;
  const parts = cookie.split(".");
  if (parts.length !== 4) return false;
  const [report, id, expiry, signature] = parts;
  if (report !== reportId || !/^[0-9a-f-]{36}$/.test(id) || !/^\d{10}$/.test(expiry) || !/^[A-Za-z0-9_-]{43}$/.test(signature)) return false;
  const expires = Number(expiry);
  if (expires <= Math.floor(now / 1000) || expires > Math.floor(now / 1000) + accessSeconds + 60) return false;
  try {
    return await crypto.subtle.verify("HMAC", await key(secret), Buffer.from(signature, "base64url"), new TextEncoder().encode(parts.slice(0, 3).join(".")));
  } catch { return false; }
}
export function readAccess(request: Request, reportId: string = investmentReport.id) {
  return request.headers.get("cookie")?.split(";").map(v => v.trim()).find(v => v.startsWith(`${reportCookieName(reportId)}=`))?.slice(reportCookieName(reportId).length + 1) ?? "";
}
