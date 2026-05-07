import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/json-ld";
import { PlausibleScript } from "@/components/plausible";
import { AmbientGrid } from "@/components/visual/ambient-grid";
import { fontSans, fontMono } from "@/lib/fonts";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  themeColor: "#0C1220", // B4 Chromaglass midnight
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/**
 * Root layout — wires fonts, sets dark theme, mounts Header + Footer
 * around every route.
 *
 * NOTE: JSON-LD schema injection (organizationSchema, websiteSchema)
 * lands in Phase 4 alongside sitemap.ts, robots.ts, and llms.txt.
 * Helpers are already exported from `@/lib/schema` and ready to wire.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      className={`${fontSans.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="min-h-dvh flex flex-col bg-[var(--color-void)] text-cloud antialiased">
        <PlausibleScript />
        <JsonLd schema={organizationSchema} id="schema-organization" />
        <JsonLd schema={websiteSchema} id="schema-website" />
        <AmbientGrid />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-md)] focus:bg-electric focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <span className="sr-only">{siteConfig.legalName}</span>
      </body>
    </html>
  );
}
