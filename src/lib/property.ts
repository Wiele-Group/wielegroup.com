import type { Metadata } from "next";

export const propertyBrand = {
  name: "Wiele Investments",
  tagline: "South African roots. Global perspective.",
  url: "https://wielegroup.com",
  email: "admin@wielegroup.com",
  location: "Swieqi, Malta",
  founded: "2026",
  languages: ["English", "Afrikaans"],
  social: {
    facebook: "https://www.facebook.com/wieleinvestments/",
    linkedin: "https://www.linkedin.com/company/wiele-investments/",
  },
  description: "Malta-based global asset brokerage. Property at our core, complemented by yachts, aircraft, exotic and classic cars. South African roots. Global perspective.",
} as const;

export const propertyNavigation = [
  { href: "/properties", label: "Property" },
  { href: "/buying", label: "For buyers" },
  { href: "/selling", label: "For sellers" },
  { href: "/luxury-assets", label: "Luxury assets" },
  { href: "/research", label: "Research" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "Our approach" },
];

export function propertyMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} | ${propertyBrand.name}`;
  return {
    title, description, alternates: { canonical: path },
    openGraph: { type: "website", locale: "en_GB", siteName: propertyBrand.name,
      title: fullTitle, description, url: path,
      images: [{ url: "/luxury-assets/og-wiele-global-assets-20261113.jpg", width: 1200, height: 630, alt: `Wiele Investments — global asset brokerage. South African roots. Global perspective. AI-created architectural concept.` }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/luxury-assets/og-wiele-global-assets-20261113.jpg"] },
  };
}
