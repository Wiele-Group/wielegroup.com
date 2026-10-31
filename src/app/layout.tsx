import type { Metadata, Viewport } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import "./property-premium.css";
import { Header, Footer } from "@/components/property/chrome";
import { PropertyAnalytics } from "@/components/property/analytics";
import { StructuredData } from "@/components/property/structured-data";
import { propertyBrand } from "@/lib/property";
const sans = Manrope({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans", display: "swap" });
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-display", display: "swap" });
export const metadata: Metadata = {
 metadataBase: new URL(propertyBrand.url),
 title: { default: "Malta Investment Real Estate | Wiele Properties", template: "%s | Wiele Properties" },
 description: propertyBrand.description,
 alternates: { canonical: "/" },
 openGraph: { type: "website", locale: "en_GB", siteName: propertyBrand.name, title: "Malta Investment Real Estate | Wiele Properties", description: propertyBrand.description, url: "/", images: [{ url: "/property/og-premium-editorial-20261030.jpg", width: 1200, height: 630, alt: `${propertyBrand.name} — ${propertyBrand.tagline} AI-created architecture concept; not a property listing.` }] },
 twitter: { card: "summary_large_image", title: "Malta Investment Real Estate | Wiele Properties", description: propertyBrand.description, images: ["/property/og-premium-editorial-20261030.jpg"] },
 icons: { icon: [{ url: "/property-identity/option-1/icon-32.png", sizes: "32x32", type: "image/png" }, { url: "/property-identity/option-1/icon-64.png", sizes: "64x64", type: "image/png" }], apple: "/property-identity/option-1/icon-180.png" },
 other: { "msvalidate.01": "6392E5D05679A01E548B4F101B23B188" },
 robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#171a19" };
export default function Layout({ children }: { children: React.ReactNode }) {
 const schema = { "@context": "https://schema.org", "@type": "Organization", name: propertyBrand.name, slogan: propertyBrand.tagline, alternateName: ["Wiele Property", "Wiele Group", "WieleGroup"], url: propertyBrand.url, email: propertyBrand.email, telephone: propertyBrand.phone, description: propertyBrand.description,
 "@id": `${propertyBrand.url}/#organization`, logo: `${propertyBrand.url}/property-identity/option-1/wiele-premium-stacked-ivory.png`,
 foundingDate: propertyBrand.founded, founder: { "@type": "Person", name: "Jonathan Landman" },
 address: { "@type": "PostalAddress", addressLocality: "Swieqi", addressCountry: "MT" },
 sameAs: Object.values(propertyBrand.social),
 contactPoint: { "@type": "ContactPoint", telephone: propertyBrand.phone, email: propertyBrand.email, contactType: "customer enquiries", availableLanguage: propertyBrand.languages },
 areaServed: { "@type": "Country", name: "Malta" } };
 return <html lang="en-GB" data-scroll-behavior="smooth" className={`${sans.variable} ${serif.variable}`}><body><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main">{children}</main><Footer /><PropertyAnalytics /><StructuredData data={{ "@context": "https://schema.org", "@graph": [schema, { "@type": "WebSite", "@id": `${propertyBrand.url}/#website`, url: `${propertyBrand.url}/`, name: propertyBrand.name, alternateName: ["Wiele Group", "WieleGroup", "Wiele Property"], description: propertyBrand.description, inLanguage: "en-GB", publisher: { "@id": `${propertyBrand.url}/#organization` } }] }} /></body></html>;
}
