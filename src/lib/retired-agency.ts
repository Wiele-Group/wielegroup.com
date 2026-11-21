// Former marketing-agency sections have no equivalent property-service replacement.
export const retiredAgencySections = [
  "/audit", "/platform", "/systems", "/pricing", "/marketing-agency",
  "/advertising-agency", "/brand-management-agency", "/web-design-agency",
  "/for-agencies", "/for-brands", "/services", "/onboarding", "/proof",
  "/labs", "/citation-brief", "/citation-score", "/trust",
] as const;

export function isRetiredAgencyPath(pathname: string): boolean {
  return retiredAgencySections.some(path => pathname === path || pathname.startsWith(`${path}/`));
}

export function retiredAgencyResponse(method: string): Response {
  return new Response(method === "HEAD" ? null : `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Former agency page removed | Wiele Investments</title></head><body><main><h1>This former agency page has been removed.</h1><p>Wiele Investments handles property, yacht and classic car enquiries for clients in the UK, Europe and South Africa. Wiele-managed property maintenance is available in Malta.</p><p>The former marketing-agency, SEO and AI-search services and prices on this URL are no longer offered on wielegroup.com.</p><p><a href="https://wielegroup.com/about">About Wiele Investments</a> · <a href="https://wielegroup.com/">Explore Wiele Investments</a> · <a href="https://wielegroup.com/contact">Contact Wiele Investments</a></p></main></body></html>`, {
    status: 410,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, follow",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Content-Security-Policy": "default-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",
    },
  });
}
