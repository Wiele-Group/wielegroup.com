import Link from "next/link";
import { Arrow } from "./chrome";

export function MarketPerspective(){return <section className="market-perspective wrap" aria-labelledby="market-title"><span className="eyebrow">UK · Europe · South Africa / Property & luxury assets</span><h2 id="market-title">Three perspectives.<br/><em>One considered brief.</em></h2><p className="market-intro">Based in Malta, with South African roots. We welcome acquisition and sales enquiries from clients across the UK, Europe and South Africa.</p><div className="market-columns"><article><span>01 / United Kingdom</span><h3>Your next move, across borders.</h3><p>Tell us your asset location, intended use and budget in GBP or the original asking currency. We clarify the brief and the appropriate route before an engagement.</p></article><article><span>02 / Europe</span><h3>The detail belongs to the country.</h3><p>Start with the country, asset specification and budget in EUR or the relevant currency. Coverage, documentation and specialist involvement are confirmed for the individual market.</p></article><article><span>03 / South Africa</span><h3>Local roots. An outward view.</h3><p>Discuss a South African or overseas asset in English or Afrikaans. Include its location, your objectives and a budget in ZAR or your preferred currency.</p>
   <details className="market-afrikaans">
    <summary><span lang="af">AF</span> Executive brief in Afrikaans</summary>
    <p lang="af">Wiele Investments is in Malta gevestig. Ons ontvang navrae oor die koop en verkoop van eiendom, seiljagte en klassieke motors in Suid-Afrika, die Verenigde Koninkryk en Europa. Deel die bate se ligging, jou doelwit en jou begroting in rand of jou voorkeurgeldeenheid. Ons bevestig die mandaat, omvang, fooie en betrokke praktisyns vir elke opdrag. Toepaslik gelisensieerde praktisyns hanteer die transaksiedokumente. Gesprekke in Afrikaans is op afspraak beskikbaar.</p>
   </details></article></div>
  <section className="market-malta-hub" aria-labelledby="market-malta-title">
   <div><span className="eyebrow">Our base / Malta</span><h3 id="market-malta-title">Why Malta?</h3></div>
   <div>
    <p>Malta is an EU member state with English as an official language and an established flag registry for superyachts. Its working day overlaps with both the UK and South Africa, making it a practical base for coordinating cross-border ownership and structuring discussions.</p>
    <p>Flag eligibility, ownership structures and tax treatment depend on the jurisdiction and the asset. Appropriately licensed practitioners handle formal advice and transaction documentation.</p>
    <div className="market-hub-sources"><a className="text-link" href="https://investgozo.gov.mt/page/2/">Malta’s EU and language profile <Arrow diagonal/></a><a className="text-link" href="https://www.transport.gov.mt/landing_registration.asp?pageid=2011">Transport Malta yacht registry <Arrow diagonal/></a></div>
   </div>
  </section>
  <aside className="market-legal-callout" aria-labelledby="market-legal-title">
   <h3 id="market-legal-title"><Link className="text-link" href="/legal-compliance/cross-border">27-Entry Cross-Border Legal &amp; Tax Compliance Matrix <Arrow diagonal/></Link></h3>
   <p>Compare routes across the UK, EU and South Africa for domestic, EU/EEA and non-resident buyers and sellers of property, yachts and classic cars.</p>
  </aside>
  <p className="fine-print">These are our client markets, not a list of offices or a guarantee of asset availability. Asset location, authority, scope, fees and responsible practitioners are confirmed individually.</p><Link className="text-link" href="/contact">Discuss your market and asset ↗</Link></section>}
