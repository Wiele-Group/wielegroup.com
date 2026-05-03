export const siteConfig = {
  name: "Wiele Group",
  url: "https://wielegroup.com",
  tagline: "We engineer visibility that converts.",
  description: "AI-first growth agency combining SEO, AEO, GEO, performance advertising, and web design into one integrated system for measurable growth.",
  founder: "Jonny Wiele",
  email: "hello@wielegroup.com",
  socials: {
    linkedin: "https://linkedin.com/company/wiele-group",
    x: "https://x.com/wielegroup",
  },
};

export function jsonLd(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data),
  };
}
