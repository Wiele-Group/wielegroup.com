import Link from "next/link";
import { Arrow } from "./chrome";

const tax = [
 {
  region: "United Kingdom",
  name: "Non-resident Capital Gains Tax",
  copy: "Non-resident individuals must generally report UK property disposals to HMRC and pay any tax due within 60 days of completion. Reporting can apply even where no tax is due.",
  source: ["HMRC reporting and payment", "https://www.gov.uk/guidance/capital-gains-tax-for-non-residents-uk-residential-property"],
 },
 {
  region: "Malta",
  name: "Property Transfer Tax",
  copy: "Ask the notary to confirm the seller’s transfer tax, how it is paid on the deed, and any exceptions or reliefs. The buyer’s stamp duty is a separate calculation.",
  source: ["Malta Tax and Customs Administration", "https://mtca.gov.mt/personal-tax/property-taxes/buying-property"],
 },
 {
  region: "South Africa",
  name: "Section 35A withholding",
  copy: "If the non-resident seller’s gross price exceeds R2 million, the buyer generally withholds 7.5% for an individual, 10% for a company or 15% for a trust, subject to any SARS directive. This is an advance payment towards the seller’s tax liability.",
  source: ["SARS non-resident seller guide", "https://www.sars.gov.za/wp-content/uploads/Ops/Guides/IT-PP-02-G01-Amounts-to-be-Withheld-When-a-Non-Resident-Sells-Immovable-Property-in-South-AfricaSA-External-Guide.pdf"],
 },
] as const;

const certificates = [
 ["UK energy certificates", "https://www.gov.uk/selling-a-home/energy-performance-certificates"],
 ["Malta energy certificates", "https://epc.gov.mt/information-certification"],
 ["SA electrical compliance", "https://www.labour.gov.za/DocumentCenter/Regulations%20and%20Notices/Regulations/Occupational%20Health%20and%20Safety/eir2009.pdf"],
 ["Municipal rates clearance", "https://www.overstrand.gov.za/obtaining-rates-clearance-certificates-from-the-municipality/"],
] as const;

const bank = ["SARB exchange-control manual", "https://www.resbank.co.za/content/dam/sarb/what-we-do/financial-surveillance/financial-surveillance-documents/2026/Currency%20and%20Exchanges%20Manual%20for%20Authorised%20Dealers.pdf"] as const;
export const disposalCitations = [...tax.map(item => item.source[1]), ...certificates.map(([, url]) => url), bank[1]];

export function TransactionTools() {
 return <section id="transaction-tools" className="purchase-section purchase-transaction-tools" aria-labelledby="transaction-tools-title">
  <span className="eyebrow">From eligibility to completion</span>
  <h2 id="transaction-tools-title">Cross-Border Transaction Tools</h2>
  <nav className="purchase-tool-links" aria-label="Cross-border transaction tools">
   <Link href="/legal-guide"><span className="purchase-tool-copy"><strong>27-Entry Cross-Border Legal &amp; Tax Compliance Matrix</strong><span>Compare buyer and seller routes by asset and market.</span></span><Arrow diagonal/></Link>
   <Link href="/valuations#landed-cost-estimator"><span className="purchase-tool-copy"><strong>Total Landed Cost &amp; Net Proceeds Estimator</strong><span>Model acquisition costs or deductions from a sale.</span></span><Arrow diagonal/></Link>
  </nav>
 </section>;
}

export function SellerDisposalChecks() {
 return <section id="selling-across-borders" className="purchase-section seller-disposal" aria-labelledby="seller-disposal-title">
  <span className="eyebrow">UK · Malta · South Africa / Seller checkpoints</span>
  <h2 id="seller-disposal-title">Selling Across Borders</h2>
  <p>Confirm your tax residence, the seller’s legal capacity and how the sale will be reported before agreeing the completion statement.</p>
  <div className="purchase-cards">
   {tax.map(item => <article className="purchase-card" key={item.region}>
    <span>{item.region}</span><h3>{item.name}</h3><p>{item.copy}</p>
    <a className="purchase-source" href={item.source[1]}>{item.source[0]} <Arrow diagonal/></a>
   </article>)}
  </div>
  <div className="purchase-status-grid disposal-document-checks">
   <article><h3>Compliance certificates</h3><p>Confirm which energy, electrical and municipal or clearance certificates apply, who obtains them and when they are due. Check for a valid EPC where required in the UK or Malta. In South Africa, ask the conveyancer about electrical compliance and municipal rates clearance.</p><div className="disposal-source-links">{certificates.map(([label,url]) => <a className="purchase-source" href={url} key={url}>{label} <Arrow diagonal/></a>)}</div></article>
   <article><h3>Capital repatriation</h3><p>Ask the receiving and remitting banks what they need before completion. Retain evidence of original funding, the signed deed or contract, the settlement statement and tax documents. For South African proceeds, confirm the exchange-control route with an Authorised Dealer.</p><a className="purchase-source" href={bank[1]}>{bank[0]} <Arrow diagonal/></a></article>
  </div>
  <Link href="/selling" className="button">Prepare your sales brief <Arrow diagonal/></Link>
 </section>;
}
