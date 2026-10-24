import type { NextConfig } from "next";
const nextConfig: NextConfig = {
 poweredByHeader: false,
 images: { unoptimized: true },
 async redirects() { return [
  { source: "/", has: [{ type: "host", value: "www.wielegroup.com" }], destination: "https://wielegroup.com/", permanent: true },
  { source: "/:path+", has: [{ type: "host", value: "www.wielegroup.com" }], destination: "https://wielegroup.com/:path+", permanent: true },
  { source: "/imprint", destination: "/terms", permanent: true },
 ]; },
 async headers() { return [{ source: "/:path*", headers: [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'" },
 ] }]; },
};
export default nextConfig;
