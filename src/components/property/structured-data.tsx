import { JsonLdGraph } from "@/components/JsonLdGraph";
import { buildBreadcrumbSchema } from "@/lib/schema-graph";
import { propertyBrand } from "@/lib/property";

export function StructuredData({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function PageStructuredData({ path, title, description, citations, includeBreadcrumb = true }: { path: string; title: string; description: string; citations?: string[]; includeBreadcrumb?: boolean }) {
  const url = `${propertyBrand.url}${path}`;
  const service = path === "/property-maintenance" ? {
    name: "Wiele Property Maintenance",
    description: "Wiele-managed and operated property maintenance in Malta: repairs and fittings, painting and making-good, kitchen and bathroom upkeep, planned maintenance, property care visits and preparation for sale or occupation. Work and availability are agreed per property.",
  } : undefined;
  const trail = [
    { name: "Home", path: "/" },
    ...(path.startsWith("/luxury-assets/") ? [{ name: "Luxury assets", path: "/luxury-assets" }] : []),
    ...(path.startsWith("/terms/") ? [{ name: "Website terms", path: "/terms" }] : []),
    { name: title, path },
  ];
  return <JsonLdGraph includeCore={false} nodes={[
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: title, description, inLanguage: "en-GB", ...(path.startsWith("/listing-examples/") ? { isAccessibleForFree: true } : {}), ...(citations?.length ? { citation: citations } : {}), ...(path === "/privacy" ? { dateModified: "2026-11-26" } : ["/about", "/contact", "/malta-investment-report", "/research", "/seller-enquiry", "/valuations"].includes(path) ? { dateModified: "2026-11-25" } : ["/legal-compliance/cross-border", "/asset-taxonomy"].includes(path) || path.startsWith("/listing-examples/") ? { dateModified: "2026-11-21" } : path.startsWith("/purchase-guide") ? { dateModified: "2026-11-15" } : {}), isPartOf: { "@id": `${propertyBrand.url}/#website` }, about: { "@id": `${propertyBrand.url}/#organization` }, breadcrumb: { "@id": `${url}#breadcrumb` }, ...(service ? { mainEntity: { "@id": `${url}#service` } } : {}) },
    ...(includeBreadcrumb ? [buildBreadcrumbSchema(trail)] : []),
    ...(service ? [{ "@type": "Service", "@id": `${url}#service`, url, ...service, provider: { "@id": `${propertyBrand.url}/#organization` }, ...(path === "/property-maintenance" ? { areaServed: { "@type": "Country", name: "Malta" } } : {}), mainEntityOfPage: { "@id": `${url}#webpage` } }] : []),
  ]} />;
}
