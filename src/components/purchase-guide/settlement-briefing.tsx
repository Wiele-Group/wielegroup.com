import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { JsonLdGraph } from "@/components/JsonLdGraph";
import { JurisdictionDirectory } from "@/components/property/jurisdiction-directory";
import { disposalCitations, fundingCitations, FundingReferences, SellerDisposalChecks, TransactionTools } from "@/components/property/purchase-guide-checkpoints";
import jurisdictions from "@/data/purchase-jurisdictions.json";
import { buyingPath } from "@/lib/buying-locales/routing";
import { homeLanguages, type HomeLocale } from "@/lib/home-locales/routing";
import { mandatePath } from "@/lib/mandate-locales/routing";
import { propertyBrand } from "@/lib/property";
import { settlementCopy } from "@/lib/purchase-guide-locales";
import { valuationsPath } from "@/lib/valuation-locales/routing";
import { purchaseGuideAlternates, purchaseGuidePath, purchaseGuideUpdated } from "@/lib/purchase-guide-locales/routing";
import { availablePurchaseGuideMedia, type PurchaseGuideMediaKey } from "@/lib/purchaseGuideMedia";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema-graph";
import "../buying/private-acquisition.css";
import "./settlement-briefing.css";

const chapter644 = "https://legislation.mt/eli/cap/644/eng/portalpdf";
const shareFallback = "/images/purchase-guide/settlement-social.png";
const assetKeys = ["estate", "yacht", "automobile"] as const;
const corridorKeys = ["uk", "europe", "southern-africa"] as const;
const referenceDestinations = [
  "/legal-compliance/cross-border", "/purchase-guide#selling-across-borders",
  "/purchase-guide/assets/yachts", "/purchase-guide/assets/vehicles", "/flagship-examples/index.html",
] as const;

export function settlementMetadata(locale: HomeLocale): Metadata {
  const copy = settlementCopy[locale];
  const path = purchaseGuidePath(locale);
  const title = `${copy.eyebrow} | ${propertyBrand.name}`;
  const { og } = homeLanguages[locale];
  const hero = availablePurchaseGuideMedia("hero");
  const image = hero ? { url: hero, width: 1664, height: 936, alt: copy.images[0] } : { url: shareFallback, width: 1200, height: 630, alt: title };

  return {
    title: { absolute: title },
    description: copy.intro,
    alternates: { canonical: path, languages: purchaseGuideAlternates },
    openGraph: {
      title, description: copy.intro, url: path, siteName: propertyBrand.name, locale: og,
      alternateLocale: Object.values(homeLanguages).map(language => language.og).filter(tag => tag !== og),
      type: "website", images: [image],
    },
    twitter: { card: "summary_large_image", title, description: copy.intro, images: [image] },
  };
}

function SettlementImage({ media, alt, caption }: { media: PurchaseGuideMediaKey; alt: string; caption: string }) {
  const src = availablePurchaseGuideMedia(media);

  return (
    <div className="settlement-image" data-media={media}>
      {src ? (
        <>
          <Image src={src} alt={alt} fill preload={media === "hero"}
            sizes={media === "hero" ? "100vw" : "(max-width: 720px) 100vw, 50vw"} />
          <span className="acq-image-credit">{caption}</span>
        </>
      ) : (
        <div className="acq-linework" aria-hidden="true"><i /><i /><i /></div>
      )}
    </div>
  );
}

function SettlementMatrix({ copy }: { copy: typeof settlementCopy[HomeLocale] }) {
  return (
    <div className="settlement-matrix">
      <fieldset>
        <legend>{copy.assetLabel}</legend>
        <div className="settlement-options">
          {assetKeys.map((key, index) => (
            <label key={key}>
              <input type="radio" name="settlement-asset" value={key} defaultChecked={index === 0} />
              <span>{copy.assets[index].name}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>{copy.corridorLabel}</legend>
        <div className="settlement-options">
          {corridorKeys.map((key, index) => (
            <label key={key}>
              <input type="radio" name="settlement-corridor" value={key} defaultChecked={index === 0} />
              <span>{copy.corridors[index].name}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {assetKeys.map((assetKey, assetIndex) => corridorKeys.map((corridorKey, corridorIndex) => {
        const asset = copy.assets[assetIndex];
        const corridor = copy.corridors[corridorIndex];

        return (
          <section className="settlement-result" data-asset={assetKey} data-corridor={corridorKey}
            key={`${assetKey}-${corridorKey}`}>
            <h3>{asset.name} <span aria-hidden="true">/</span> {corridor.name}</h3>
            <dl>
              {asset.checks.map((check, index) => (
                <div key={copy.fields[index]}>
                  <dt>{copy.fields[index]}</dt>
                  <dd>
                    <p>{check}</p>
                    {index === 0 && <p>{corridor.titleChecks[assetIndex]}</p>}
                    {index === 2 && <p>{corridor.settlement}</p>}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        );
      }))}
    </div>
  );
}

export function SettlementBriefing({ locale }: { locale: HomeLocale }) {
  const copy = settlementCopy[locale];
  const { tag, path: homePath } = homeLanguages[locale];
  const path = purchaseGuidePath(locale);
  const url = propertyBrand.url + path;
  const buying = buyingPath(locale);
  const references = [referenceDestinations[0], valuationsPath(locale) + "#landed-cost-estimator", ...referenceDestinations.slice(1)];
  const mandates = mandatePath(locale);
  const faqs = [
    { question: copy.questions[0], answer: copy.roles },
    { question: copy.questions[1], answer: copy.malta },
  ];

  return (
    <div className="acq-page settlement-page" lang={tag}>
      <JsonLdGraph includeCore={false} nodes={[
        {
          "@type": "WebPage", "@id": `${url}#webpage`, url, name: copy.eyebrow, description: copy.intro,
          inLanguage: tag, dateModified: purchaseGuideUpdated, isPartOf: { "@id": `${propertyBrand.url}/#website` },
          breadcrumb: { "@id": `${url}#breadcrumb` }, hasPart: { "@id": `${url}#faq` }, citation: locale === "en" ? [chapter644, ...fundingCitations, ...disposalCitations] : [chapter644],
          primaryImageOfPage: { "@type": "ImageObject", contentUrl: propertyBrand.url + (availablePurchaseGuideMedia("hero") ?? shareFallback) },
        },
        buildBreadcrumbSchema([{ name: copy.home, path: homePath }, { name: copy.eyebrow, path }]),
        { ...buildFaqSchema(faqs), "@id": `${url}#faq`, url: `${url}#faq`, inLanguage: tag },
      ]} />

      <section className="acq-hero settlement-hero" aria-labelledby="settlement-title">
        <SettlementImage media="hero" alt={copy.images[0]} caption={copy.illustration} />
        <div className="acq-wrap acq-hero-inner">
          <nav className="acq-language" aria-label={copy.language}>
            {(Object.keys(homeLanguages) as HomeLocale[]).map(key => (
              <Link key={key} href={purchaseGuidePath(key)} lang={homeLanguages[key].tag} hrefLang={homeLanguages[key].tag}
                aria-label={homeLanguages[key].name} aria-current={locale === key ? "page" : undefined}>{key.toUpperCase()}</Link>
            ))}
          </nav>
          <p className="acq-eyebrow">{copy.eyebrow}</p>
          <h1 id="settlement-title">{copy.title}</h1>
          <p className="acq-hero-copy">{copy.intro}</p>
          <div className="settlement-actions">
            <a className="acq-button acq-button-primary" href="#settlement-matrix">{copy.matrix}<span aria-hidden="true">↓</span></a>
            <Link className="acq-button acq-button-plain" href={buying}>{copy.buying}<span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <div className="acq-wrap">
        <section className="acq-section" id="settlement-matrix" aria-labelledby="matrix-title">
          <div className="acq-heading"><h2 id="matrix-title">{copy.matrix}</h2><p>{copy.matrixIntro}</p></div>
          <SettlementMatrix copy={copy} />
          <div className="settlement-plates">
            <SettlementImage media="coastal" alt={copy.images[1]} caption={copy.illustration} />
            <SettlementImage media="maritime" alt={copy.images[2]} caption={copy.illustration} />
          </div>
        </section>

        <section className="acq-section" id="acquisition-checklist" aria-labelledby="checklist-title">
          <div className="settlement-checklist">
            <h2 id="checklist-title">{copy.checklist}</h2>
            <ol role="list">
              {copy.stages.map(([title, deliverable], index) => (
                <li key={title} id={index === 0 ? "buyer-status" : index === 2 ? "currency-and-escrow" : undefined}>
                  <details name="acquisition-checklist" open={index === 0}>
                    <summary><span className="settlement-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span>{title}</span></summary>
                    <p>{deliverable}</p>
                  </details>
                </li>
              ))}
            </ol>
          </div>
          <div className="settlement-actions">
            <Link className="acq-button acq-button-primary" href={buying}>{copy.buying}<span aria-hidden="true">↗</span></Link>
            <Link className="acq-button acq-button-plain" href={mandates}>{copy.mandates}<span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <section className="acq-section settlement-governance" id="faq" aria-labelledby="governance-title">
          <div className="acq-heading"><h2 id="governance-title">{copy.governance}</h2><p>{copy.faq}</p></div>
          <div className="settlement-answers">
            {faqs.map(({ question, answer }) => (
              <article key={question}><h3>{question}</h3><p>{answer}</p></article>
            ))}
          </div>
          <a className="acq-link" href={chapter644}>{copy.sources}<span aria-hidden="true">↗</span></a>
        </section>

        <section className="acq-section settlement-references" id="destinations" aria-labelledby="references-title">
          <div className="acq-heading"><h2 id="references-title">{copy.directory}</h2><p>{copy.directoryIntro}</p></div>
          <JurisdictionDirectory destinations={jurisdictions.map(({ slug, name, group }) => ({ slug, name, group }))}
            labels={{
              country: copy.country, placeholder: copy.countryPlaceholder, corridor: copy.corridorLabel, all: copy.all,
              clear: copy.clear, results: copy.results, noResults: copy.noResults, primary: copy.primary,
              regions: copy.regions, navigation: copy.directory,
            }} />
          <ul className="settlement-reference-links">
            {references.map((href, index) => (
              <li key={href}><Link className="acq-link" href={href} hrefLang={index === 1 ? tag : "en-GB"}>{copy.referenceLinks[index]} <span aria-hidden="true">↗</span></Link></li>
            ))}
          </ul>
        </section>
      </div>

      {locale === "en" && (
        <div className="settlement-legacy"><div className="purchase-guide wrap">
          <FundingReferences />
          <TransactionTools />
          <SellerDisposalChecks />
        </div></div>
      )}
    </div>
  );
}
