import Link from "next/link";
import type { Metadata } from "next";
import { JsonLdGraph } from "@/components/JsonLdGraph";
import { homeLanguages, type HomeLocale } from "@/lib/home-locales/routing";
import { mandateCopy } from "@/lib/mandate-locales/copy";
import { mandateAlternates, mandatePath, mandateUpdated } from "@/lib/mandate-locales/routing";
import { dossierRateDate, mandateRecords } from "@/lib/mandateRecords";
import { propertyBrand } from "@/lib/property";
import { buildBreadcrumbSchema } from "@/lib/schema-graph";
import { MandateDesk } from "./mandate-desk";
import { MandateMap } from "./mandate-map";
import "./private-mandates.css";

const mapSource = "https://github.com/nvkelso/natural-earth-vector/blob/v5.1.2/geojson/ne_110m_admin_0_countries.geojson";
const shareImage = "/images/mandates/private-mandates-social.png";
const hubs = [
  { point: [-0.128, 51.507], offset: [-67, -7] },
  { point: [6.143, 46.204], offset: [9, -9] },
  { point: [14.514, 35.899], offset: [11, -3] },
  { point: [18.424, -33.925], offset: [12, 3] },
] as const;

export function mandateMetadata(locale: HomeLocale): Metadata {
  const copy = mandateCopy[locale];
  const path = mandatePath(locale);
  const title = `${copy.title} | ${propertyBrand.name}`;
  const preview = { url: shareImage, width: 1200, height: 630, alt: copy.footprint };
  const og = homeLanguages[locale].og;
  return {
    title: { absolute: title }, description: copy.description,
    alternates: { canonical: path, languages: mandateAlternates },
    openGraph: {
      type: "website", url: path, siteName: propertyBrand.name, locale: og,
      alternateLocale: Object.values(homeLanguages).map(lang => lang.og).filter(tag => tag !== og),
      title, description: copy.description, images: [preview],
    },
    twitter: { card: "summary_large_image", title, description: copy.description, images: [preview] },
  };
}

export function PrivateMandates({ locale }: { locale: HomeLocale }) {
  const copy = mandateCopy[locale];
  const { tag } = homeLanguages[locale];
  const path = mandatePath(locale);
  const url = propertyBrand.url + path;
  return (
    <div className="mandates-index" lang={tag}>
      <JsonLdGraph includeCore={false} nodes={[
        { "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: copy.title, description: copy.description,
          inLanguage: tag, dateModified: mandateUpdated, isPartOf: { "@id": `${propertyBrand.url}/#website` },
          breadcrumb: { "@id": `${url}#breadcrumb` },
          mainEntity: { "@type": "ItemList", name: copy.collection, numberOfItems: mandateRecords.length,
            itemListElement: mandateRecords.map((entry, index) => ({ "@type": "ListItem", position: index + 1,
              name: entry.title, url: propertyBrand.url + entry.href })) } },
        buildBreadcrumbSchema([{ name: copy.home, path: homeLanguages[locale].path }, { name: copy.title, path }]),
      ]} />

      <div className="mandate-wrap">
        <section className="mandate-intro" aria-labelledby="mandates-title">
          <nav className="mandate-languages" aria-label={copy.language}>
            {(Object.keys(homeLanguages) as HomeLocale[]).map(key => (
              <Link key={key} href={mandatePath(key)} hrefLang={homeLanguages[key].tag} lang={homeLanguages[key].tag}
                aria-label={homeLanguages[key].name} aria-current={key === locale ? "page" : undefined}>{key.toUpperCase()}</Link>
            ))}
          </nav>
          <p className="mandate-eyebrow">{copy.eyebrow}</p>
          <h1 id="mandates-title">{copy.title}</h1>
          <p className="mandate-intro-copy">{copy.intro}</p>
          <div className="mandate-availability">
            <p>{copy.emptyActive}</p>
            <Link href="/contact?interest=buying" hrefLang="en-GB">{copy.enquire} <span aria-hidden="true">↗</span></Link>
          </div>
        </section>
        <span id="listing-examples" className="mandate-anchor" aria-hidden="true" />
        <section className="mandate-collection" id="mandate-dossiers" aria-labelledby="mandate-collection-title">
          <header className="mandate-section-heading">
            <h2 id="mandate-collection-title">{copy.collection}</h2><p>{copy.disclosure}</p>
          </header>
          <MandateDesk copy={copy} language={tag} entries={mandateRecords} rateDate={dossierRateDate} />
        </section>
        <section className="mandate-footprint" aria-labelledby="mandate-footprint-title">
          <div>
            <h2 id="mandate-footprint-title">{copy.footprint}</h2>
            <p>{copy.footprintNote}</p>
            <ul>{copy.hubs.map(hub => <li key={hub}>{hub}</li>)}</ul>
            <a className="mandate-map-credit" href={mapSource}>{copy.mapSource} · Natural Earth</a>
          </div>
          <MandateMap label={copy.footprint + " · " + copy.hubs.join(" · ")}
            points={hubs.map((hub, index) => ({ ...hub, label: copy.hubs[index] }))} pulse />
        </section>
      </div>
    </div>
  );
}
