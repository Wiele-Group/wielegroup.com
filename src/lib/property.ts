import type { Metadata } from "next";

export const propertyBrand = {
  name: "Wiele Property",
  url: "https://wielegroup.com",
  email: "admin@wielegroup.com",
  phone: "+356 9932 0474",
  phoneHref: "tel:+35699320474",
  whatsapp: "https://wa.me/35699320474",
  location: "Swieqi, Malta",
  founded: "2026",
  languages: ["English", "Afrikaans"],
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61596012142539",
    instagram: "https://www.instagram.com/wieleproperty/",
    linkedin: "https://www.linkedin.com/company/wiele-properties/",
  },
  description: "Malta property sales marketing, with thoughtful presentation, direct personal contact and transaction documentation handled by licensed practitioners.",
} as const;

export const propertyNavigation = [
  { href: "/selling", label: "For sellers" },
  { href: "/buying", label: "For buyers" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "Our approach" },
];

export function propertyMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} | ${propertyBrand.name}`;
  return {
    title, description, alternates: { canonical: path },
    openGraph: { type: "website", locale: "en_GB", siteName: propertyBrand.name,
      title: fullTitle, description, url: path,
      images: [{ url: "/property/og-property-ring.jpg", width: 1200, height: 630, alt: "Wiele Property · Malta property marketing" }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/property/og-property-ring.jpg"] },
  };
}
