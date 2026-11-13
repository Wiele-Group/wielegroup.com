export const investmentReport = {
  id: "malta-investment-2026",
  title: "Malta Investment Property Report",
  edition: "2025 review · 2026 outlook",
  updated: "2026-11-02",
  updatedLabel: "2 November 2026",
  published: "2026-10-29",
  path: "/malta-investment-report",
  filename: "Wiele-Properties-Malta-Investment-Report-2026.pdf",
  consentVersion: "report-updates-2026-10-29",
} as const;

export const globalLuxuryReport = {
  id: "global-luxury-2026",
  title: "Global Luxury Property Market Report",
  edition: "Interim 2026 · Outlook 2027–2030",
  updated: "2026-11-13",
  updatedLabel: "13 November 2026",
  published: "2026-11-13",
  path: "/research/global-luxury-property-report-2026",
  filename: "Wiele-Investments-Global-Luxury-Property-Report-2026.pdf",
  consentVersion: "report-updates-2026-10-29",
} as const;

export function getReport(id: string | null = null) {
  if (!id || id === investmentReport.id) return investmentReport;
  if (id === globalLuxuryReport.id) return globalLuxuryReport;
  return null;
}
