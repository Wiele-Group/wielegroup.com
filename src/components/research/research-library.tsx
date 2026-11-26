import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { JsonLdGraph } from "@/components/JsonLdGraph";
import { buyingPath } from "@/lib/buying-locales/routing";
import { homeLanguages, type HomeLocale } from "@/lib/home-locales/routing";
import { luxuryAssetsPath } from "@/lib/luxury-assets-locales/routing";
import { mandatePath } from "@/lib/mandate-locales/routing";
import { propertyBrand } from "@/lib/property";
import { purchaseGuidePath } from "@/lib/purchase-guide-locales/routing";
import { researchCopy } from "@/lib/research-locales";
import { researchAlternates, researchPath, researchUpdated } from "@/lib/research-locales/routing";
import type { ResearchCopy } from "@/lib/research-locales/types";
import { availableResearchMedia, type ResearchMediaKey } from "@/lib/researchMedia";
import { buildBreadcrumbSchema } from "@/lib/schema-graph";
import { valuationsPath } from "@/lib/valuation-locales/routing";
import { sellingPath } from "@/lib/selling-locales/routing";
import { briefings, leadBriefing } from "./briefing-catalogue";
import { BriefingFilter } from "./briefing-filter";
import "../buying/private-acquisition.css";
import "./research-library.css";

const socialFallback = "/images/research/research-social.png";
const captionIndex = { hero: 0, corridor: 1, provenance: 2 } as const;

export function researchMetadata(locale: HomeLocale): Metadata {
  const copy = researchCopy[locale];
  const path = researchPath(locale);
  const title = `${copy.title} | ${propertyBrand.name}`;
  const { og } = homeLanguages[locale];
  const hero = availableResearchMedia("hero");
  const image = hero
    ? { url: hero, width: 1664, height: 936, alt: copy.captions[0] }
    : { url: socialFallback, width: 1200, height: 630, alt: copy.title };

  return {
    title: { absolute: title }, description: copy.intro,
    alternates: { canonical: path, languages: researchAlternates },
    openGraph: {
      title, description: copy.intro, url: path, siteName: propertyBrand.name,
      locale: og, alternateLocale: Object.values(homeLanguages).map(language => language.og).filter(tag => tag !== og),
      type: "website", images: [image],
    },
    twitter: { card: "summary_large_image", title, description: copy.intro, images: [image] },
  };
}

function ResearchImage({ media, copy }: { media: ResearchMediaKey; copy: ResearchCopy }) {
  const src = availableResearchMedia(media);
  return (
    <div className="research-image" data-media={media}>
      {src ? (
        <>
          <Image src={src} alt={copy.captions[captionIndex[media]]} fill preload={media === "hero"}
            sizes={media === "hero" ? "100vw" : "(max-width: 760px) 95vw, 50vw"} />
          <span className="acq-image-credit">{copy.illustration}</span>
        </>
      ) : <div className="acq-linework" aria-hidden="true"><i /><i /><i /></div>}
    </div>
  );
}

function localizedBriefing(briefing: typeof briefings[number], locale: HomeLocale) {
  const copy = researchCopy[locale];
  const note = briefing.copyKey ? copy.notes[briefing.copyKey] : briefing.fallback;
  return { ...briefing, ...note, href: briefing.localized ? purchaseGuidePath(locale) : briefing.href };
}

type LocalizedBriefing = ReturnType<typeof localizedBriefing>;

function BriefingCard({ briefing, copy, tag }: { briefing: LocalizedBriefing; copy: ResearchCopy; tag: string }) {
  const { id, title, abstract, desk, corridors, date, minutes, media, href, report, sources } = briefing;
  const lead = id === leadBriefing.id;
  const dateFormat = new Intl.DateTimeFormat(tag, { dateStyle: "medium", timeZone: "UTC" });
  const localeOfDestination = briefing.localized ? tag : "en-GB";
  const observations = lead ? copy.globalObservations : copy.maltaObservations;
  const takeawaySource = lead ? sources?.[1] : undefined;

  return (
    <article className={lead ? "research-brief research-brief-lead" : "research-brief"} aria-labelledby={`${id}-title`}>
      {media && (
        <div className="research-visual">
          <ResearchImage media={media} copy={copy} />
          {takeawaySource && (
            <div className="research-takeaway">
              <strong>{copy.takeaway}</strong>
              <p>{copy.globalObservations[1]}</p>
              <a className="acq-link" href={takeawaySource[1]}>{takeawaySource[0]} <span aria-hidden="true">↗</span></a>
            </div>
          )}
        </div>
      )}
      <div className="research-brief-body">
        <p className="acq-eyebrow">{lead ? copy.featured : copy.desks[desk]}</p>
        <h3 id={`${id}-title`}>{title}</h3>
        <div className="research-reading">
          <time dateTime={date}>{dateFormat.format(Date.parse(date))}</time>
          <span>{copy.minutes.replace("{count}", String(minutes))}</span>
        </div>
        <p className="research-abstract">{abstract}</p>
        <p className="research-regions"><strong>{copy.regions}</strong> {corridors.map(key => copy.corridors[key]).join(" · ")}</p>
        <div className="research-actions">
          <Link className={lead ? "acq-button acq-button-primary" : "acq-link"} href={href} hrefLang={localeOfDestination}>
            {report ? copy.overview : copy.read}<span aria-hidden="true">↗</span>
          </Link>
          {report && <Link className={lead ? "acq-button acq-button-plain" : "acq-link"} href={`${href}#register`} hrefLang="en-GB">
            {copy.register.replace("{count}", String(report.pages))}<span aria-hidden="true">↗</span>
          </Link>}
        </div>
        {report && (
          <details className="research-observation-list">
            <summary>{copy.observations}</summary>
            <p className="research-reading">{copy.cutoff} <time dateTime={report.cutoff}>{dateFormat.format(Date.parse(report.cutoff))}</time></p>
            <ul>{sources?.map(([label, url], index) => (
              url === takeawaySource?.[1] ? null : (
                <li key={url}>{observations[index]} <a className="acq-link" href={url}>{label}<span aria-hidden="true">↗</span></a></li>
              )
            ))}</ul>
          </details>
        )}
        {!report && sources && (
          <ul className="research-source-links">
            {sources.map(([label, url]) => <li key={url}><a className="acq-link" href={url}>{label}<span aria-hidden="true">↗</span></a></li>)}
          </ul>
        )}
      </div>
    </article>
  );
}

export function ResearchLibrary({ locale }: { locale: HomeLocale }) {
  const copy = researchCopy[locale];
  const { tag, path: homePath } = homeLanguages[locale];
  const path = researchPath(locale);
  const url = propertyBrand.url + path;
  const catalogue = briefings.map(briefing => localizedBriefing(briefing, locale));
  const references = ["/articles", luxuryAssetsPath(locale), "/legal-compliance/cross-border", valuationsPath(locale) + "#landed-cost-estimator"];

  return (
    <div className="acq-page research-page" lang={tag}>
      <JsonLdGraph includeCore={false} nodes={[
        {
          "@type": "CollectionPage", "@id": `${url}#webpage`, name: copy.title, description: copy.intro, url,
          dateModified: researchUpdated, inLanguage: tag, isPartOf: { "@id": `${propertyBrand.url}/#website` },
          breadcrumb: { "@id": `${url}#breadcrumb` },
          citation: [...new Set(catalogue.flatMap(item => item.sources?.map(([, source]) => source) ?? []))],
          primaryImageOfPage: { "@type": "ImageObject", contentUrl: propertyBrand.url + (availableResearchMedia("hero") ?? socialFallback) },
          mainEntity: {
            "@type": "ItemList", name: copy.index, numberOfItems: catalogue.length,
            itemListElement: catalogue.map((item, index) => ({
              "@type": "ListItem", position: index + 1, name: item.title, url: propertyBrand.url + item.href,
            })),
          },
        },
        buildBreadcrumbSchema([{ name: copy.home, path: homePath }, { name: copy.eyebrow, path }]),
      ]} />

      <section className="acq-hero research-hero" aria-labelledby="research-title">
        <ResearchImage media="hero" copy={copy} />
        <div className="acq-wrap acq-hero-inner">
          <nav className="acq-language" aria-label={copy.language}>
            {(Object.keys(homeLanguages) as HomeLocale[]).map(key => (
              <Link key={key} href={researchPath(key)} lang={homeLanguages[key].tag} hrefLang={homeLanguages[key].tag}
                aria-label={homeLanguages[key].name} aria-current={locale === key ? "page" : undefined}>{key.toUpperCase()}</Link>
            ))}
          </nav>
          <p className="acq-eyebrow">{copy.eyebrow}</p>
          <h1 id="research-title">{copy.title}</h1>
          <p className="acq-hero-copy">{copy.intro}</p>
          <a className="acq-button acq-button-primary" href="#briefings-index">{copy.jump}<span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <div className="acq-wrap">
        <aside className="research-notice">{copy.notice}</aside>
        <section className="acq-section" id="briefings-index" aria-labelledby="briefings-title">
          <span id="asset-intelligence" className="acq-legacy-anchor" aria-hidden="true" />
          <div className="acq-heading"><h2 id="briefings-title">{copy.index}</h2><p>{copy.indexIntro}</p></div>
          <BriefingFilter labels={{
            desk: copy.desk, corridor: copy.corridor, all: copy.all, allCorridors: copy.allCorridors,
            desks: copy.desks, corridors: copy.corridors, results: copy.results, empty: copy.empty,
          }} entries={catalogue.map(briefing => ({
            id: briefing.id, desk: briefing.desk, corridors: briefing.corridors, lead: briefing.id === leadBriefing.id,
            card: <BriefingCard briefing={briefing} copy={copy} tag={tag} />,
          }))} />
          {locale !== "en" && <p className="research-language-note">{copy.reportsLanguage}</p>}
        </section>

        <section className="acq-section research-references" aria-labelledby="research-references-title">
          <h2 id="research-references-title">{copy.references}</h2>
          <ul>
            {references.map((href, index) => (
              <li key={href}><Link className="acq-link" href={href}>{copy.referenceLabels[index]}<span aria-hidden="true">↗</span></Link></li>
            ))}
          </ul>
        </section>

        <section className="acq-section research-dispatch" aria-labelledby="research-dispatch-title">
          <div>
            <h2 id="research-dispatch-title">{copy.dispatch}</h2>
            <p>{copy.dispatchIntro}</p>
          </div>
          <div className="research-actions">
            <Link className="acq-button acq-button-primary" href={mandatePath(locale)}>{copy.mandates}<span aria-hidden="true">↗</span></Link>
            <Link className="acq-button acq-button-plain" href={buyingPath(locale)}>{copy.buying}<span aria-hidden="true">↗</span></Link>
            <Link className="acq-button acq-button-plain" href={sellingPath(locale)}>{copy.selling}<span aria-hidden="true">↗</span></Link>
            <Link className="acq-link" href="/contact?interest=general">{copy.contact}<span aria-hidden="true">↗</span></Link>
          </div>
        </section>
      </div>
    </div>
  );
}
