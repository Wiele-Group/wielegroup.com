import { propertyBrand } from "@/lib/property";

export function StructuredData({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function PageStructuredData({ path, title, description }: { path: string; title: string; description: string }) {
  const url = `${propertyBrand.url}${path}`;
  const service = path === "/selling" ? {
    name: "Global asset sales marketing enquiries",
    description: "Malta-based asset brokerage enquiries for property, aircraft, yachts, exotic cars and classic cars. The asset, owner objectives and available evidence shape the brief. Coverage, authority, scope, fees and specialist involvement are confirmed separately.",
  } : path === "/buying" ? {
    name: "Global asset acquisition enquiries",
    description: "Acquisition briefs for property, aircraft, yachts, exotic cars and classic cars. Country coverage, availability and specialist involvement are confirmed per enquiry. No assets are currently advertised.",
  } : path === "/property-maintenance" ? {
    name: "Wiele Property Maintenance",
    description: "Wiele-managed and operated property maintenance in Malta: repairs and fittings, painting and making-good, kitchen and bathroom upkeep, planned maintenance, property care visits and preparation for sale or occupation. Work and availability are agreed per property.",
  } : undefined;
  return <StructuredData data={{ "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: title, description, inLanguage: "en-GB", isPartOf: { "@id": `${propertyBrand.url}/#website` }, about: { "@id": `${propertyBrand.url}/#organization` }, breadcrumb: { "@id": `${url}#breadcrumb` }, ...(service ? { mainEntity: { "@id": `${url}#service` } } : {}) },
    { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${propertyBrand.url}/` }, { "@type": "ListItem", position: 2, name: title, item: url }] },
    ...(service ? [{ "@type": "Service", "@id": `${url}#service`, url, ...service, provider: { "@id": `${propertyBrand.url}/#organization` }, ...(path === "/property-maintenance" ? { areaServed: { "@type": "Country", name: "Malta" } } : {}), mainEntityOfPage: { "@id": `${url}#webpage` } }] : []),
  ] }} />;
}
