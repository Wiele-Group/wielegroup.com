import { getCloudflareContext } from "@opennextjs/cloudflare";
import { investmentReport } from "@/lib/investment-report";
import { privateHeaders, readAccess, validAccess, type ReportEnvironment } from "@/server/report-access";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  let env: ReportEnvironment;
  try { env = getCloudflareContext().env as unknown as ReportEnvironment; } catch { return Response.json({ error: "Download is temporarily unavailable." }, { status: 503, headers: privateHeaders }); }
  if (!env.REPORT_ACCESS_SECRET || env.REPORT_ACCESS_SECRET.length < 32) return Response.json({ error: "Download is temporarily unavailable." }, { status: 503, headers: privateHeaders });
  if (!await validAccess(env.REPORT_ACCESS_SECRET, readAccess(request))) return Response.json({ error: "Please register on the report page to download your copy.", registrationUrl: investmentReport.path }, { status: 401, headers: privateHeaders });
  // The PDF is a server-only module, deliberately absent from public/static assets.
  const { reportPdfBase64 } = await import("@/server/report-pdf");
  const pdf = Buffer.from(reportPdfBase64, "base64");
  return new Response(pdf, { headers: { ...privateHeaders, "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="${investmentReport.filename}"`, "Content-Length": String(pdf.byteLength) } });
}
