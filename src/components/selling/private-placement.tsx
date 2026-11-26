import Link from "next/link";
import type { Metadata } from "next";
import { JsonLdGraph } from "@/components/JsonLdGraph";
import { DeskProtocol } from "@/components/property/desk-protocol";
import { homeLanguages, type HomeLocale } from "@/lib/home-locales/routing";
import { mandatePath } from "@/lib/mandate-locales/routing";
import { sellingCopy } from "@/lib/selling-locales";
import { sellingAlternates, sellingPath, sellingUpdated } from "@/lib/selling-locales/routing";
import { availableSellingMedia } from "@/lib/sellingMedia";
import { mandateSummary } from "@/lib/mandateAgreement";
import { propertyBrand } from "@/lib/property";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema-graph";
import { RetainerCalculator } from "./retainer-calculator";
import { SellerImage } from "./seller-image";
import "../buying/private-acquisition.css";
import "./private-placement.css";

const chapter644 = "https://legislation.mt/eli/cap/644/eng";
const shareImage = "/images/selling/private-placement-social.png";
const { version, publicPath, monthlyRetainerEur, minimumTermMonths, commissionPercent, netRetainerCreditPercent, cancellationEmail } = mandateSummary;
const calculatorTerms = { version, publicPath, monthlyRetainerEur, minimumTermMonths, commissionPercent, netRetainerCreditPercent };

export function sellingMetadata(locale: HomeLocale): Metadata {
  const copy = sellingCopy[locale];
  const path = sellingPath(locale);
  const title = `${copy.title} | ${propertyBrand.name}`;
  const og = homeLanguages[locale].og;
  const image = { url: shareImage, width: 1200, height: 630, alt: copy.socialAlt };
  return {
    title: { absolute: title }, description: copy.description,
    alternates: { canonical: path, languages: sellingAlternates },
    openGraph: { title, description: copy.description, url: path, siteName: propertyBrand.name,
      locale: og, alternateLocale: Object.values(homeLanguages).map(lang => lang.og).filter(tag => tag !== og),
      type: "website", images: [image] },
    twitter: { card: "summary_large_image", title, description: copy.description, images: [image] },
  };
}

export function PrivatePlacement({ locale }: { locale: HomeLocale }) {
  const copy = sellingCopy[locale];
  const { tag, path: homePath } = homeLanguages[locale];
  const path = sellingPath(locale);
  const url = propertyBrand.url + path;
  const hero = availableSellingMedia("hero");
  const [question, answer] = copy.faq;
  const euros = new Intl.NumberFormat(tag, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const percent = new Intl.NumberFormat(tag, { style: "percent" });
  const figures = [
    euros.format(monthlyRetainerEur), String(minimumTermMonths),
    percent.format(commissionPercent / 100), percent.format(netRetainerCreditPercent / 100),
  ];
  return (
    <div className="acq-page seller-placement" lang={tag}>
      <JsonLdGraph includeCore={false} nodes={[
        { "@type": "WebPage", "@id": `${url}#webpage`, url, name: copy.title, description: copy.description,
          inLanguage: tag, dateModified: sellingUpdated, isPartOf: { "@id": `${propertyBrand.url}/#website` },
          breadcrumb: { "@id": `${url}#breadcrumb` }, mainEntity: { "@id": `${url}#service` },
          hasPart: { "@id": `${url}#questions` }, citation: [chapter644],
          primaryImageOfPage: { "@type": "ImageObject", contentUrl: propertyBrand.url + (hero ?? shareImage),
            description: hero ? copy.alt.hero : copy.socialAlt } },
        { "@type": "Service", "@id": `${url}#service`, url, name: copy.eyebrow, description: copy.scope,
          provider: { "@id": `${propertyBrand.url}/#organization` }, termsOfService: propertyBrand.url + publicPath,
          mainEntityOfPage: { "@id": `${url}#webpage` } },
        buildBreadcrumbSchema([{ name: copy.home, path: homePath }, { name: copy.title, path }]),
        { ...buildFaqSchema([{ question, answer }]), "@id": `${url}#questions`, url: `${url}#questions`, inLanguage: tag },
      ]} />
      <section className="acq-hero seller-hero" aria-labelledby="seller-title">
        <SellerImage media="hero" alt={copy.alt.hero} credit={copy.artwork} />
        <div className="acq-wrap acq-hero-inner">
          <nav className="acq-language" aria-label={copy.language}>
            {(Object.keys(homeLanguages) as HomeLocale[]).map(key => (
              <Link key={key} href={sellingPath(key)} hrefLang={homeLanguages[key].tag} lang={homeLanguages[key].tag}
                aria-label={homeLanguages[key].name} aria-current={locale === key ? "page" : undefined}>{key.toUpperCase()}</Link>
            ))}
          </nav>
          <p className="acq-eyebrow">{copy.eyebrow}</p>
          <h1 id="seller-title">{copy.title}</h1>
          <p className="acq-hero-copy">{copy.intro}</p>
          <div className="seller-actions">
            <Link className="acq-button acq-button-primary" href="/list-asset" hrefLang="en-GB">{copy.list}<span aria-hidden="true">↗</span></Link>
            <a className="acq-button acq-button-plain" href="#mandate-terms">{copy.terms}<span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>
      <div className="acq-wrap">
        <span id="sales-brief" className="acq-legacy-anchor" aria-hidden="true" />
        <span id="sales-brief-planner" className="acq-legacy-anchor" aria-hidden="true" />
        <DeskProtocol copy={copy} sectionId="mandate-walkthrough" stageId="seller-stage" />
        <section className="acq-section seller-features" aria-label={copy.eyebrow}>
          {(["craft","corridor"] as const).map(media => (
            <article key={media}>
              <div className="seller-feature-frame"><SellerImage media={media} alt={copy.alt[media]} credit={copy.artwork} /></div>
              <div><h2>{copy[media][0]}</h2><p>{copy[media][1]}</p>
                {media === "corridor" && <Link className="acq-link" href={mandatePath(locale)} hrefLang={tag}>{copy.dossiers}<span aria-hidden="true">↗</span></Link>}
              </div>
            </article>
          ))}
        </section>
        <section className="acq-section seller-terms" id="mandate-terms" aria-labelledby="seller-terms-title">
          <div className="acq-heading">
            <h2 id="seller-terms-title">{copy.termsTitle}</h2><p>{copy.termsIntro}</p>
          </div>
          <dl className="seller-terms-ledger">
            {copy.termLabels.map((label, index) => <div key={label}><dt>{label}</dt><dd>{figures[index]}</dd></div>)}
          </dl>
          <div className="seller-terms-grid">
            <div className="seller-conditions">
              <div><p>{copy.cancellation}</p><a className="acq-link" href={`mailto:${cancellationEmail}`}>{cancellationEmail}</a></div>
              <div><p>{copy.trigger}</p><p>{copy.qualifiedCredit}</p></div>
              <p>{copy.scope}</p>
              <div className="seller-malta"><h3>{copy.maltaTitle}</h3><p>{copy.malta}</p>
                <a className="acq-link" href={chapter644}>{copy.statute}<span aria-hidden="true">↗</span></a>
              </div>
              <Link className="acq-link" href={publicPath} hrefLang="en-GB">{copy.agreement} · {version}<span aria-hidden="true">↗</span></Link>
            </div>
            <RetainerCalculator copy={copy.calculator} language={tag} terms={calculatorTerms} />
          </div>
        </section>
        <section className="acq-section acq-faq" id="questions" aria-labelledby="seller-faq-title">
          <div><h2 id="seller-faq-title">{copy.faqTitle}</h2>
            <Link className="acq-link" href="/list-asset" hrefLang="en-GB">{copy.list}<span aria-hidden="true">↗</span></Link></div>
          <div><details><summary>{question}</summary><p>{answer}</p></details></div>
        </section>
      </div>
    </div>
  );
}
