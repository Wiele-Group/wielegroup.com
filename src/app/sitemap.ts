import type { MetadataRoute } from "next";
import { propertyBrand } from "@/lib/property";
export default function sitemap(): MetadataRoute.Sitemap { return ["", "/selling", "/buying", "/properties", "/malta-investment-report", "/about", "/contact", "/privacy", "/terms", "/credits"].map(path => ({ url: propertyBrand.url + path, lastModified: "2026-10-30", changeFrequency: path === "/properties" ? "weekly" : "monthly", priority: path === "" ? 1 : 0.7 })); }
