import sales from "@/data/property-sales-process.json";

type SourceLink = { label: string; url: string };
export function LegalSource({ source }: { source: SourceLink }) {
  return <a className="purchase-source" href={source.url} target="_blank" rel="noopener noreferrer">{source.label} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>;
}
export function AdditionalNationalities({ slug }: { slug: string }) {
  const entry = sales[slug as keyof typeof sales];
  return <div className="purchase-additional-nationalities">
    <div className="purchase-status-grid">
      <article><h3>EEA &amp; Swiss individuals</h3><p>{entry.nationalities.eea}</p></article>
      <article><h3>Other nationalities &amp; dual citizens</h3><p>{entry.nationalities.other}</p></article>
    </div>
    <p className="purchase-caption">{entry.nationalityNote}</p>
    <details className="purchase-evidence"><summary>Sources for nationality and status</summary><div className="purchase-sources">{entry.nationalitySources.map(source => <LegalSource key={source.url} source={source} />)}</div></details>
  </div>;
}
export function LegalSalesProcess({ slug, name }: { slug: string; name: string }) {
  const entry = sales[slug as keyof typeof sales];
  return <section id="legal-sales-process" className="purchase-section">
    <span className="eyebrow">{name} / From agreement to transfer</span>
    <h2>The legal sales process.</h2>
    <p>Use this sequence with your appointed local practitioner. “Sourced requirement” identifies a specific formality described by an authority; “Planning check” is a recommended action; “Confirm locally” marks a point this research has not settled.</p>
    <aside className="purchase-binding"><h3>When does the commitment bind?</h3><p>{entry.binding}</p><p className="purchase-caption">Read with the sources and process coverage below. A binding contract, payment, possession and registered title can occur at different stages.</p></aside>
    <ol className="purchase-legal-stages">{entry.stages.map((stage, index) => <li key={stage.title}>
      <span className="purchase-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <div><span className="purchase-stage-kind">{stage.kind}</span><h3>{stage.title}</h3><p>{stage.text}</p><LegalSource source={entry.sources[stage.source]} /></div>
    </li>)}</ol>
    <div id="sale-documents" className="purchase-status-grid purchase-document-grid">
      <article><h3>Prepare the documents.</h3><p>{entry.documents}</p><p className="purchase-caption">Preparation checklist. Your practitioner confirms which documents are legally required, their validity, translations, authentication and any power of attorney.</p></article>
      <article><h3>For the seller.</h3><p>{entry.seller}</p><p className="purchase-caption">Agree responsibility for debt release, certificates, taxes, filing and handover in the contract.</p></article>
    </div>
    <details className="purchase-evidence" open><summary>Process coverage &amp; sources</summary><p>{entry.coverage}</p><p className="purchase-caption">Source review: <time dateTime={entry.checked}>15 November 2026</time>. This is a research date; it does not establish the effective date of every law or amendment.</p><div className="purchase-sources">{entry.sources.map(source => <LegalSource source={source} key={source.url} />)}</div></details>
    <p className="purchase-caption">Ask the practitioner and bank to confirm identity, source-of-funds, sanctions and payment controls. Keep passports and financial evidence in their secure document process.</p>
  </section>;
}
