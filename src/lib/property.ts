import type { Metadata } from "next";

export const propertyBrand = {
  name: "Wiele Properties",
  tagline: "Malta Property. Global Ambition.",
  url: "https://wielegroup.com",
  email: "admin@wielegroup.com",
  location: "Swieqi, Malta",
  founded: "2026",
  languages: ["English", "Afrikaans"],
  social: {
    facebook: "https://www.facebook.com/wieleproperties/",
    instagram: "https://www.instagram.com/wieleproperty/",
    linkedin: "https://www.linkedin.com/company/wiele-properties/",
  },
  description: "Malta property marketing, buyer introductions and Wiele-managed property maintenance. Based in Swieqi, serving local and international property owners and buyers.",
} as const;

export const propertyNavigation = [
  { href: "/selling", label: "For owners" },
  { href: "/buying", label: "For buyers" },
  { href: "/properties", label: "Opportunities" },
  { href: "/property-maintenance", label: "Maintenance" },
  { href: "/malta-investment-report", label: "Report" },
  { href: "/articles", label: "Articles" },
  { href: "/legal-compliance", label: "Legal guide" },
  { href: "/about", label: "Our approach" },
];

export function propertyMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} | ${propertyBrand.name}`;
  return {
    title, description, alternates: { canonical: path },
    openGraph: { type: "website", locale: "en_GB", siteName: propertyBrand.name,
      title: fullTitle, description, url: path,
      images: [{ url: "/property/og-wiele-investments.jpg", width: 1200, height: 630, alt: `Wiele Investments reflective gold logo for Malta investment property.` }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/property/og-wiele-investments.jpg"] },
  };
}
