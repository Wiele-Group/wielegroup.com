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
  description: "Global property sales. Based in Malta, with South African roots. Luxury apartments, architectural villas and wine estates. An international perspective from Wiele Investments.",
} as const;

export const propertyNavigation = [
  { href: "/selling", label: "For owners" },
  { href: "/buying", label: "For buyers" },
  { href: "/properties", label: "Opportunities" },
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
      images: [{ url: "/property/og-wiele-global-20261113.jpg", width: 1200, height: 630, alt: `Wiele Investments — global property sales. South African roots. Global perspective. AI-created architectural concept.` }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/property/og-wiele-global-20261113.jpg"] },
  };
}
