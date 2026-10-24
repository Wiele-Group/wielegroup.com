import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/property/chrome";
import { propertyBrand } from "@/lib/property";
const sans = Geist({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-display", display: "swap" });
export const metadata: Metadata = {
 metadataBase: new URL(propertyBrand.url),
 title: { default: "Wiele Property | Independent Property Marketing in Malta", template: "%s | Wiele Property" },
 description: propertyBrand.description,
 alternates: { canonical: "/" },
 openGraph: { type: "website", locale: "en_GB", siteName: propertyBrand.name, title: "Wiele Property — A more personal way home.", description: propertyBrand.description, url: "/", images: [{ url: "/property/og-property-premium.jpg", width: 1200, height: 630, alt: "Wiele Property — Independent property marketing in Malta" }] },
 twitter: { card: "summary_large_image", title: "Wiele Property", description: propertyBrand.description, images: ["/property/og-property-premium.jpg"] },
 icons: { icon: "/property-identity/premium/favicon.svg", apple: "/apple-touch-icon.png?v=premium" },
 other: { "msvalidate.01": "6392E5D05679A01E548B4F101B23B188" },
 robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#17332e" };
export default function Layout({ children }: { children: React.ReactNode }) {
 const schema = { "@context": "https://schema.org", "@type": "Organization", name: propertyBrand.name, url: propertyBrand.url, email: propertyBrand.email, telephone: propertyBrand.phone, description: propertyBrand.description, areaServed: { "@type": "Country", name: "Malta" } };
 return <html lang="en-GB" className={`${sans.variable} ${serif.variable}`}><body><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main">{children}</main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\u003c") }} /></body></html>;
}
