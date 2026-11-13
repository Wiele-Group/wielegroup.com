import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getReport, globalLuxuryReport } from "@/lib/investment-report";
import { privateHeaders, readAccess, validAccess, type ReportEnvironment } from "@/server/report-access";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const report = getReport(new URL(request.url).searchParams.get("report"));
  if (!report) return Response.json({ error: "Report not found." }, { status: 404, headers: privateHeaders });
  let env: ReportEnvironment;
  try { env = getCloudflareContext().env as unknown as ReportEnvironment; } catch { return Response.json({ error: "Download is temporarily unavailable." }, { status: 503, headers: privateHeaders }); }
  if (!env.REPORT_ACCESS_SECRET || env.REPORT_ACCESS_SECRET.length < 32) return Response.json({ error: "Download is temporarily unavailable." }, { status: 503, headers: privateHeaders });
  if (!await validAccess(env.REPORT_ACCESS_SECRET, readAccess(request, report.id), Date.now(), report.id)) return Response.json({ error: "Please register on the report page to download your copy.", registrationUrl: report.path }, { status: 401, headers: privateHeaders });
  // The PDF is a server-only module, deliberately absent from public/static assets.
  const encoded = report.id === globalLuxuryReport.id
    ? (await import("@/server/global-report-pdf")).globalReportPdfBase64
    : (await import("@/server/report-pdf")).reportPdfBase64;
  const pdf = Buffer.from(encoded, "base64");
  return new Response(pdf, { headers: { ...privateHeaders, "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="${report.filename}"`, "Content-Length": String(pdf.byteLength) } });
}
