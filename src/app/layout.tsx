import type { Metadata, Viewport } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import "./property-premium.css";
import "./property-experience.css";
import "./property-articles.css";
import { ExperienceMotion } from "@/components/property/experience-motion";
import { Header, Footer } from "@/components/property/chrome";
import { PropertyAnalytics } from "@/components/property/analytics";
import { StructuredData } from "@/components/property/structured-data";
import { propertyBrand } from "@/lib/property";
const sans = Manrope({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans", display: "swap" });
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-display", display: "swap" });
export const metadata: Metadata = {
 metadataBase: new URL(propertyBrand.url),
 title: { default: `Malta Investment Real Estate | ${propertyBrand.name}`, template: `%s | ${propertyBrand.name}` },
 description: propertyBrand.description,
 alternates: { canonical: "/" },
 openGraph: { type: "website", locale: "en_GB", siteName: propertyBrand.name, title: "Malta Investment Real Estate | Wiele Investments", description: propertyBrand.description, url: "/", images: [{ url: "/property/og-wiele-investments.jpg", width: 1200, height: 630, alt: `Wiele Investments reflective gold logo for Malta investment property.` }] },
 twitter: { card: "summary_large_image", title: "Malta Investment Real Estate | Wiele Investments", description: propertyBrand.description, images: ["/property/og-wiele-investments.jpg"] },
 icons: { icon: [{ url: "/property-identity/reflective-gold/favicon-16.png", sizes: "16x16", type: "image/png" }, { url: "/property-identity/reflective-gold/favicon-32.png", sizes: "32x32", type: "image/png" }], apple: "/property-identity/reflective-gold/apple-touch-icon.png" },
 other: { "msvalidate.01": "6392E5D05679A01E548B4F101B23B188" },
 robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#171a19" };
export default function Layout({ children }: { children: React.ReactNode }) {
 const schema = { "@context": "https://schema.org", "@type": "Organization", name: propertyBrand.name, slogan: propertyBrand.tagline, alternateName: ["Wiele Properties", "Wiele Property", "Wiele Group", "WieleGroup"], url: propertyBrand.url, email: propertyBrand.email, description: propertyBrand.description,
 "@id": `${propertyBrand.url}/#organization`, logo: `${propertyBrand.url}/property-identity/reflective-gold/organisation-icon.png`,
 foundingDate: propertyBrand.founded,
 address: { "@type": "PostalAddress", addressLocality: "Swieqi", addressCountry: "MT" },
 sameAs: Object.values(propertyBrand.social),
 contactPoint: { "@type": "ContactPoint", email: propertyBrand.email, contactType: "customer enquiries", availableLanguage: propertyBrand.languages },
 areaServed: { "@type": "Country", name: "Malta" } };
 return <html lang="en-GB" data-scroll-behavior="smooth" className={`${sans.variable} ${serif.variable}`}><body><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main">{children}</main><Footer /><PropertyAnalytics /><ExperienceMotion /><StructuredData data={{ "@context": "https://schema.org", "@graph": [schema, { "@type": "WebSite", "@id": `${propertyBrand.url}/#website`, url: `${propertyBrand.url}/`, name: propertyBrand.name, alternateName: ["Wiele Properties", "wielegroup.com"], description: propertyBrand.description, inLanguage: "en-GB", publisher: { "@id": `${propertyBrand.url}/#organization` } }] }} /></body></html>;
}
