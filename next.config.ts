import type { NextConfig } from "next";
import { legacyRoutes, originationRedirects } from "./src/lib/site-redirects";
const nextConfig: NextConfig = {
 poweredByHeader: false,
 images: { unoptimized: true },
 async redirects() { return [
  ...Object.entries(originationRedirects).map(([source, destination]) => ({
   source, destination: `https://wielegroup.com${destination}`, statusCode: 301,
   has: [{ type: "host" as const, value: "www.wielegroup.com" }],
  })),
  ...Object.entries(originationRedirects).map(([source, destination]) => ({ source, destination, statusCode: 301 })),
  { source: "/", has: [{ type: "host", value: "www.wielegroup.com" }], destination: "https://wielegroup.com/", permanent: true },
  { source: "/:path+", has: [{ type: "host", value: "www.wielegroup.com" }], destination: "https://wielegroup.com/:path+", permanent: true },
  ...Object.entries(legacyRoutes).map(([source, destination]) => ({ source, destination, permanent: true })),
 ]; },
 async headers() { return [{ source: "/:path*", headers: [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://challenges.cloudflare.com https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com; frame-src https://challenges.cloudflare.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'" },
 ] }, { source: "/articles/:slug", headers: [
 { key: "Cache-Control", value: "private, no-store, max-age=0" },
 { key: "CDN-Cache-Control", value: "no-store" },
 { key: "Cloudflare-CDN-Cache-Control", value: "no-store" },
 ] }]; },
};
export default nextConfig;
