import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./algorithm.css";
import "./property-premium.css";
import "./property-experience.css";
import "./property-articles.css";
import "./property-cinematic.css";
import "./property-editorial.css";
import "./property-atlas.css";
import "./purchase-guide.css";
import "./valuations.css";
import "./listing-examples.css";
import "./design-system.css";
import "./wiele-architectural-system.css";
import { Header, Footer } from "@/components/property/chrome";
import { PropertyAnalytics } from "@/components/property/analytics";
import { JsonLdGraph } from "@/components/JsonLdGraph";
import { defaultOpenGraphImage, propertyBrand } from "@/lib/property";
const sans = localFont({ src: "./fonts/inter.woff2", weight: "100 900", variable: "--font-inter", display: "swap" });
const serif = localFont({ src: [{ path: "./fonts/cormorant.woff2", weight: "300 700", style: "normal" }, { path: "./fonts/cormorant-italic.woff2", weight: "300 700", style: "italic" }], variable: "--font-display", display: "swap" });
const mono = localFont({ src: "./fonts/jetbrains-mono.woff2", weight: "100 800", variable: "--font-jetbrains", display: "swap" });
export const metadata: Metadata = {
 metadataBase: new URL(propertyBrand.url),
 title: { default: `Global Luxury Asset Brokerage | ${propertyBrand.name}`, template: `%s | ${propertyBrand.name}` },
 description: propertyBrand.description,
 applicationName: propertyBrand.name, category: "Real estate", manifest: "/site.webmanifest",
 alternates: { canonical: "/" },
 openGraph: { type: "website", locale: "en_GB", siteName: propertyBrand.name, title: "Global Luxury Asset Brokerage | Wiele Investments", description: propertyBrand.description, url: "/", images: [defaultOpenGraphImage] },
 twitter: { card: "summary_large_image", title: "Global Luxury Asset Brokerage | Wiele Investments", description: propertyBrand.description, images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }] },
 icons: { icon: [{ url: "/property-identity/gold-rings/favicon-16.png", sizes: "16x16", type: "image/png" }, { url: "/property-identity/gold-rings/favicon-32.png", sizes: "32x32", type: "image/png" }], apple: "/property-identity/gold-rings/apple-touch-icon.png" },
 other: { "geo.region": "MT", "geo.placename": "Swieqi, Malta", "msvalidate.01": "6392E5D05679A01E548B4F101B23B188" },
 robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#171a19" };
export default function Layout({ children }: { children: React.ReactNode }) {
 return <html lang="en-GB" data-scroll-behavior="smooth" className={`${sans.variable} ${serif.variable} ${mono.variable}`}><body><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main">{children}</main><Footer /><PropertyAnalytics /><JsonLdGraph includeCore={true} /></body></html>;
}
