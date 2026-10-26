import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/property/chrome";
import { PropertyAnalytics } from "@/components/property/analytics";
import { propertyBrand } from "@/lib/property";
const sans = Geist({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-display", display: "swap" });
export const metadata: Metadata = {
 metadataBase: new URL(propertyBrand.url),
 title: { default: "Malta Investment Property & Introductions | Wiele Property", template: "%s | Wiele Property" },
 description: propertyBrand.description,
 alternates: { canonical: "/" },
 openGraph: { type: "website", locale: "en_GB", siteName: propertyBrand.name, title: "Malta Investment Property & Introductions | Wiele Property", description: propertyBrand.description, url: "/", images: [{ url: "/property/og-property-ring.jpg", width: 1200, height: 630, alt: "Wiele Property — Malta investment property marketing" }] },
 twitter: { card: "summary_large_image", title: "Malta Investment Property & Introductions | Wiele Property", description: propertyBrand.description, images: ["/property/og-property-ring.jpg"] },
 icons: { icon: [{ url: "/property-identity/ring/icon-32.png", sizes: "32x32", type: "image/png" }, { url: "/property-identity/ring/icon-64.png", sizes: "64x64", type: "image/png" }], apple: "/property-identity/ring/icon-180.png" },
 other: { "msvalidate.01": "6392E5D05679A01E548B4F101B23B188" },
 robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#17332e" };
export default function Layout({ children }: { children: React.ReactNode }) {
 const schema = { "@context": "https://schema.org", "@type": "Organization", name: propertyBrand.name, url: propertyBrand.url, email: propertyBrand.email, telephone: propertyBrand.phone, description: propertyBrand.description,
 "@id": `${propertyBrand.url}/#organization`, logo: `${propertyBrand.url}/property-identity/ring/icon-180.png`,
 foundingDate: propertyBrand.founded, founder: { "@type": "Person", name: "Jonathan Landman" },
 address: { "@type": "PostalAddress", addressLocality: "Swieqi", addressCountry: "MT" },
 sameAs: Object.values(propertyBrand.social),
 contactPoint: { "@type": "ContactPoint", telephone: propertyBrand.phone, email: propertyBrand.email, contactType: "customer enquiries", availableLanguage: propertyBrand.languages },
 areaServed: { "@type": "Country", name: "Malta" } };
 return <html lang="en-GB" data-scroll-behavior="smooth" className={`${sans.variable} ${serif.variable}`}><body><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main">{children}</main><Footer /><PropertyAnalytics /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\u003c") }} /></body></html>;
}
