import type { Metadata } from "next";
import { propertyBrand, propertyMetadata } from "./property";

// Public catalogue only. Full article text and charts live in server-only modules.
export const articles = [{
  slug: "malta-short-let-investment-2026",
  title: "Malta Short-Let Investment: Income, New Rules and Europe’s Market Outlook",
  description: "Malta property investment through short lets: tourism demand, the 2026 accommodation rules, going-concern checks and a measured outlook for income-focused buyers.",
  excerpt: "An established short-let business and a property with potential require different evidence. Explore Malta’s tourism demand, new operating rules and the investment questions that turn a busy calendar into a credible income case.",
  category: "Income property / Short lets",
  date: "2026-11-03",
  displayDate: "3 November 2026",
  readingMinutes: 9,
  image: "/property/articles/malta-short-lets-2026.webp",
  imageAlt: "AI-created Mediterranean apartment with limestone walls and an open window; an imagined setting, not a real listing",
  imageCaption: "AI-generated editorial illustration · Imagined Mediterranean setting, not a real property or location photograph.",
}] as const;
export const articlesPath = "/articles";
export const articlesDescription = "Malta investment property articles: income-producing real estate, established going concerns and properties with potential. Research and practical acquisition considerations from Wiele Properties.";
export const articleConsentVersion = "article-updates-2026-11-03";
export function findArticle(slug: string) { return articles.find(article => article.slug === slug); }
export function articleMetadata(article: typeof articles[number]): Metadata {
  const path = `/articles/${article.slug}`;
  const metadata = propertyMetadata(article.title, article.description, path);
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article", publishedTime: article.date, modifiedTime: article.date, authors: [propertyBrand.name], images: [{url: article.image,width:1536,height:1024,alt:article.imageAlt}] }, twitter: { ...metadata.twitter, card:"summary_large_image", images:[article.image] } };
}
