import { JsonLdGraph } from "@/components/JsonLdGraph";
import { buildBreadcrumbSchema } from "@/lib/schema-graph";
import { propertyBrand } from "@/lib/property";

export function StructuredData({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function PageStructuredData({ path, title, description, citations, includeBreadcrumb = true }: { path: string; title: string; description: string; citations?: string[]; includeBreadcrumb?: boolean }) {
  const url = `${propertyBrand.url}${path}`;
  const service = path === "/selling" ? {
    name: "Property and luxury asset sales enquiries",
    description: "Malta-based property and luxury asset sales enquiries with Wiele Investments. The Wiele Algorithm brings considered presentation, relevant buyer conversations and clear next steps to the individual engagement. Scope, costs and specialist roles are agreed separately.",
  } : path === "/buying" ? {
    name: "Residence and investment property acquisition enquiries",
    description: "Residence and investment property acquisition briefs for a Malta-based brokerage with an international outlook. Country coverage, availability, scope, fees and responsible practitioners are confirmed individually. No properties are currently advertised.",
  } : path === "/property-maintenance" ? {
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
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: title, description, inLanguage: "en-GB", ...(path.startsWith("/listing-examples/") ? { isAccessibleForFree: true } : {}), ...(citations?.length ? { citation: citations } : {}), ...(["/about", "/contact", "/malta-investment-report", "/privacy", "/research", "/seller-enquiry", "/valuations"].includes(path) ? { dateModified: "2026-11-25" } : path === "/wiele-algorithm" ? { dateModified: "2026-11-22" } : ["/properties", "/buying", "/selling", "/legal-compliance/cross-border", "/asset-taxonomy"].includes(path) || path.startsWith("/listing-examples/") ? { dateModified: "2026-11-21" } : path === "/luxury-assets" ? { dateModified: "2026-11-18" } : path.startsWith("/purchase-guide") ? { dateModified: "2026-11-15" } : {}), isPartOf: { "@id": `${propertyBrand.url}/#website` }, about: { "@id": `${propertyBrand.url}/#organization` }, breadcrumb: { "@id": `${url}#breadcrumb` }, ...(service ? { mainEntity: { "@id": `${url}#service` } } : {}) },
    ...(includeBreadcrumb ? [buildBreadcrumbSchema(trail)] : []),
    ...(service ? [{ "@type": "Service", "@id": `${url}#service`, url, ...service, provider: { "@id": `${propertyBrand.url}/#organization` }, ...(path === "/property-maintenance" ? { areaServed: { "@type": "Country", name: "Malta" } } : {}), mainEntityOfPage: { "@id": `${url}#webpage` } }] : []),
  ]} />;
}
