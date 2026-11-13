import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./property-premium.css";
import "./property-experience.css";
import "./property-articles.css";
import "./property-cinematic.css";
import { ExperienceMotion } from "@/components/property/experience-motion";
import { Header, Footer } from "@/components/property/chrome";
import { PropertyAnalytics } from "@/components/property/analytics";
import { StructuredData } from "@/components/property/structured-data";
import { propertyBrand } from "@/lib/property";
const sans = localFont({ src: "./fonts/manrope.ttf", weight: "200 800", variable: "--font-sans", display: "swap" });
const serif = localFont({ src: [{ path: "./fonts/cormorant.ttf", weight: "300 700", style: "normal" }, { path: "./fonts/cormorant-italic.ttf", weight: "300 700", style: "italic" }], variable: "--font-display", display: "swap" });
export const metadata: Metadata = {
 metadataBase: new URL(propertyBrand.url),
 title: { default: `Global Asset Brokerage | ${propertyBrand.name}`, template: `%s | ${propertyBrand.name}` },
 description: propertyBrand.description,
 applicationName: propertyBrand.name, category: "Real estate",
 alternates: { canonical: "/" },
 openGraph: { type: "website", locale: "en_GB", siteName: propertyBrand.name, title: "Global Asset Brokerage | Wiele Investments", description: propertyBrand.description, url: "/", images: [{ url: "/luxury-assets/og-wiele-global-assets-20261113.jpg", width: 1200, height: 630, alt: `Wiele Investments — global asset brokerage. South African roots. Global perspective. AI-created architectural concept.` }] },
 twitter: { card: "summary_large_image", title: "Global Asset Brokerage | Wiele Investments", description: propertyBrand.description, images: ["/luxury-assets/og-wiele-global-assets-20261113.jpg"] },
 icons: { icon: [{ url: "/property-identity/reflective-gold/favicon-16.png", sizes: "16x16", type: "image/png" }, { url: "/property-identity/reflective-gold/favicon-32.png", sizes: "32x32", type: "image/png" }], apple: "/property-identity/reflective-gold/apple-touch-icon.png" },
 other: { "geo.region": "MT", "geo.placename": "Swieqi, Malta", "msvalidate.01": "6392E5D05679A01E548B4F101B23B188" },
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
 knowsAbout: ["International property marketing", "Luxury residences", "Investment property", "Property buyer introductions", "Aircraft acquisition enquiries", "Yacht acquisition enquiries", "Exotic and classic cars"] };
 return <html lang="en-GB" data-scroll-behavior="smooth" className={`${sans.variable} ${serif.variable}`}><body><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main">{children}</main><Footer /><PropertyAnalytics /><ExperienceMotion /><StructuredData data={{ "@context": "https://schema.org", "@graph": [schema, { "@type": "WebSite", "@id": `${propertyBrand.url}/#website`, url: `${propertyBrand.url}/`, name: propertyBrand.name, alternateName: ["Wiele Properties", "wielegroup.com"], description: propertyBrand.description, inLanguage: "en-GB", publisher: { "@id": `${propertyBrand.url}/#organization` } }] }} /></body></html>;
}
