import Link from "next/link";
import { JsonLdGraph } from "@/components/JsonLdGraph";
import { availableDeskImage, DeskEditorialHero, DeskEditorialImage, deskMetadata } from "@/components/private-desk/editorial";
import { homeLanguages, type HomeLocale } from "@/lib/home-locales/routing";
import { mandateSummary } from "@/lib/mandateAgreement";
import { mandatePath } from "@/lib/mandate-locales/routing";
import { sellingPath } from "@/lib/selling-locales/routing";
import { valuationsPath } from "@/lib/valuation-locales/routing";
import { originationCopy } from "@/lib/origination-locales/copy";
import { originationAlternates, originationPath, originationUpdated } from "@/lib/origination-locales/routing";
import { originationMedia } from "@/lib/originationMedia";
import { propertyBrand } from "@/lib/property";
import { buildBreadcrumbSchema } from "@/lib/schema-graph";
import "./protocol.css";

const fallback = "/images/origination/origination-social.png";
const chapter644 = "https://legislation.mt/eli/cap/644/eng/portalpdf";
const pictures = [null, originationMedia.syndicate, null, originationMedia.inspection] as const;

export function originationMetadata(locale: HomeLocale) {
 const copy = originationCopy[locale];
 return deskMetadata(locale, originationPath(locale), originationAlternates, copy,
  { src: originationMedia.hero, alt: copy.captions[0] }, fallback);
}

export function OriginationProtocol({ locale }: { locale: HomeLocale }) {
 const copy = originationCopy[locale];
 const { path: homePath, tag } = homeLanguages[locale];
 const path = originationPath(locale);
 const url = propertyBrand.url + path;
 const percent = new Intl.NumberFormat(tag, { style: "percent" });
 const terms = {
  retainer: new Intl.NumberFormat(tag, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(mandateSummary.monthlyRetainerEur),
  commission: percent.format(mandateSummary.commissionPercent / 100),
  credit: percent.format(mandateSummary.netRetainerCreditPercent / 100),
  months: String(mandateSummary.minimumTermMonths),
 };
 const interpolate = (value: string) => value.replace(/\{(retainer|commission|credit|months)\}/g, (_, key: keyof typeof terms) => terms[key]);

 return <div className="acq-page desk-editorial origination-page" lang={tag}>
  <JsonLdGraph includeCore={false} nodes={[
   { "@type": "WebPage", "@id": `${url}#webpage`, url, name: copy.title, description: copy.intro,
    inLanguage: tag, dateModified: originationUpdated, isPartOf: { "@id": `${propertyBrand.url}/#website` },
    breadcrumb: { "@id": `${url}#breadcrumb` }, citation: [chapter644, propertyBrand.url + mandateSummary.publicPath],
    primaryImageOfPage: { "@type": "ImageObject", contentUrl: propertyBrand.url + (availableDeskImage(originationMedia.hero) ? originationMedia.hero : fallback) },
    mainEntity: { "@type": "ItemList", name: copy.architecture, numberOfItems: copy.phases.length,
     itemListElement: copy.phases.map(([name, description], index) => ({
      "@type": "ListItem", position: index + 1, name, description,
     })) },
   },
   buildBreadcrumbSchema([{ name: copy.home, path: homePath }, { name: copy.eyebrow, path }]),
  ]}/>
  <DeskEditorialHero copy={copy} locale={locale} href={originationPath} anchor="#origination-architecture"
   image={{ src: originationMedia.hero, alt: copy.captions[0], credit: copy.illustration }}/>
  <div className="acq-wrap">
   <section className="acq-section" id="origination-architecture" aria-labelledby="origination-architecture-title">
    <h2 id="origination-architecture-title">{copy.architecture}</h2>
    <div className="desk-glass protocol-switcher">
     <fieldset>
      <legend>{copy.selection}</legend>
      <div className="desk-choice">
       {copy.phases.map(([name], index) => <label key={name}>
        <input type="radio" name="origination-phase" value={index + 1} defaultChecked={index === 0} aria-controls={`origination-phase-${index + 1}`} />
        <span><b aria-hidden="true">0{index + 1}</b>{name}</span>
       </label>)}
      </div>
     </fieldset>
     {copy.phases.map(([name, ...details], index) => {
      const picture = pictures[index];
      return <section className="protocol-phase" key={name} id={`origination-phase-${index + 1}`} aria-label={name}>
       <div>
        <h3>{name}</h3>
        <dl>{details.map((detail, field) => <div key={copy.fields[field]}><dt>{copy.fields[field]}</dt><dd>{detail}</dd></div>)}</dl>
       </div>
       {picture && <DeskEditorialImage src={picture} alt={copy.captions[index === 1 ? 1 : 2]} credit={copy.illustration}/>}
      </section>;
     })}
    </div>
   </section>
   <section className="acq-section" id="discretion-ledger" aria-labelledby="discretion-title">
    <h2 id="discretion-title">{copy.comparison}</h2>
    <table className="protocol-ledger" aria-labelledby="discretion-title">
     <thead><tr><th scope="col">{copy.portal}</th><th scope="col">{copy.placement}</th></tr></thead>
     {copy.rows.map(([label, portal, privatePlacement]) => <tbody key={label}>
      <tr><th scope="rowgroup" colSpan={2}>{label}</th></tr>
      <tr><td>{portal}</td><td>{interpolate(privatePlacement)}</td></tr>
     </tbody>)}
    </table>
    <div className="protocol-terms"><p>{interpolate(copy.terms)}</p><p>{copy.malta}</p>
     <div className="desk-editorial-actions">
      <Link className="acq-link" href={mandateSummary.publicPath}>{copy.termsLink} · {mandateSummary.version} <span aria-hidden="true">↗</span></Link>
      <a className="acq-link" href={chapter644}>Chapter 644 <span aria-hidden="true">↗</span></a>
     </div>
    </div>
   </section>
   <section className="acq-section protocol-actions" aria-labelledby="protocol-action-title">
    <h2 id="protocol-action-title">{copy.actionTitle}</h2>
    <div className="desk-editorial-actions">
     <Link className="acq-button acq-button-primary" href="/list-asset">{copy.list}<span aria-hidden="true">↗</span></Link>
     <Link className="acq-button acq-button-plain" href={sellingPath(locale)}>{copy.selling}<span aria-hidden="true">↗</span></Link>
     <Link className="acq-button acq-button-plain" href={mandatePath(locale)}>{copy.mandates}<span aria-hidden="true">↗</span></Link>
     <Link className="acq-link" href={valuationsPath(locale)+"#landed-cost-estimator"}>{copy.valuation}<span aria-hidden="true">↗</span></Link>
    </div>
   </section>
  </div>
 </div>;
}
