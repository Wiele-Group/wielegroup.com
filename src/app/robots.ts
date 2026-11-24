import type { MetadataRoute } from "next";
import { propertyBrand } from "@/lib/property";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/seller/portal"] },
    sitemap: `${propertyBrand.url}/sitemap.xml`,
  };
}
