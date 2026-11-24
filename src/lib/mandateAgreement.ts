export const MANDATE_VERSION = "v1.3-2026-11";
export const MANDATE_EFFECTIVE_DATE = "2026-11-24";

export const mandateSummary = {
  title: "Asset Marketing & Brokerage Mandate Agreement",
  version: MANDATE_VERSION,
  effectiveDate: MANDATE_EFFECTIVE_DATE,
  effectiveDateLabel: "November 24, 2026",
  publicPath: "/terms/seller-retainer",
  contractingParty: "Wiele Group",
  contractingWebsite: "wielegroup.com",
  monthlyRetainerEur: 599,
  minimumTermMonths: 3,
  commissionPercent: 5,
  netRetainerCreditPercent: 100,
  tailMonths: 12,
  cancellationEmail: "admin@wielegroup.com",
} as const;

export const mandateScheduleAFields = [
  { key: "sellerName", label: "Seller name" },
  { key: "sellerEmail", label: "Seller email" },
  { key: "assetTitle", label: "Designated asset" },
  { key: "assetCategory", label: "Asset category" },
  { key: "assetReference", label: "Asset reference" },
  { key: "askingPrice", label: "Asking price (EUR)" },
] as const;

export type MandateScheduleAValues = Partial<Record<(typeof mandateScheduleAFields)[number]["key"], string>>;

export const mandateScheduleACommercialTerms = [
  { label: "Appointment", value: "Non-exclusive, for one designated asset" },
  { label: "Monthly retainer", value: "€599.00 EUR plus applicable VAT" },
  { label: "Minimum term", value: "Three monthly billing cycles" },
  { label: "Success commission", value: "5.0% of Gross Transaction Price unless otherwise agreed in writing" },
  { label: "Retainer credit", value: "100% of net retainer fees paid for the designated asset" },
  { label: "Post-termination tail", value: "12 months for Wiele-introduced buyers" },
  { label: "Cancellation", value: "Email admin@wielegroup.com. Five Malta business days’ notice before the next billing date." },
] as const;

export const mandateAgreement = [
  {
    title: "1. Non-exclusive appointment and single-asset scope",
    paragraphs: [
      "The seller enters this Agreement with Wiele Group (referred to as Wiele), which operates from Malta via wielegroup.com. Send notices to admin@wielegroup.com, subject to any statutory notice rights. The seller appoints Wiele on a non-exclusive basis to market the one designated property, yacht or classic car identified in Schedule A and introduce prospective buyers. The seller may market the asset independently or appoint other providers. Wiele has no authority to bind the seller, accept an offer or receive sale proceeds on the seller’s behalf.",
      "Each €599.00 monthly subscription, plus applicable VAT, covers one designated asset only. The retainer never bundles assets from the same seller, family office or corporate group. Wiele calibrates its marketing and advertising plans for each asset. A separate asset requires its own mandate and subscription.",
      "Wiele works within the agreed scope and where legally permitted. An appropriately authorised practitioner handles any regulated activity, transaction documentation or formal advice that requires a licence in the relevant jurisdiction.",
    ],
  },
  {
    title: "2. Dedicated marketing and advertising",
    paragraphs: [
      "The retainer funds ongoing marketing and positioning for the designated asset, paid digital media distribution, algorithmic audience optimisation, editorial dossier production and performance reporting. Wiele will provide a monthly intelligence report for each completed billing cycle, covering work undertaken, available response data and proposed next steps.",
    ],
  },
  {
    title: "3. Retainer, minimum term and email cancellation",
    paragraphs: [
      "The retainer is €599.00 EUR per monthly billing cycle, exclusive of VAT. Billed retainers are non-refundable, including if the seller ends the mandate or the asset does not sell, subject to mandatory consumer withdrawal, refund and other statutory rights. Applicable VAT is added at Checkout. The minimum commitment is three monthly billing cycles from the start of the subscription, a total of €1,797.00 before VAT. It then renews automatically month to month at €599.00 before VAT.",
      "After the minimum term ends, the seller may cancel at any time by emailing admin@wielegroup.com with the asset reference. To prevent the next renewal, Wiele must receive the email at least five business days before the next scheduled billing date. Business days are Monday to Friday excluding public holidays in Malta. If notice arrives later, cancellation takes effect at the end of the following billing cycle. The seller may give advance notice to end the subscription when the minimum term expires, subject to the same notice period.",
      "These contractual cancellation rules preserve mandatory consumer rights, including statutory withdrawal where applicable. Tell Wiele promptly if a sale completes so marketing and billing for that asset can be stopped.",
    ],
  },
  {
    title: "4. Success commission and net retainer credit",
    paragraphs: [
      "If the sale completes with a buyer introduced by Wiele under this mandate, the seller owes a gross success commission of 5.0% of the Gross Transaction Price, unless otherwise agreed in writing. Gross Transaction Price means the total consideration agreed for the designated asset at completion, before deduction of transaction costs, fees, commissions or the retainer credit. Any VAT applicable to the commission is calculated separately. Wiele must be able to document the introduction. An independent sale to a buyer Wiele did not introduce does not trigger this commission.",
      "At closing, Wiele credits 100% of the cumulative net retainer fees actually paid for that specific asset, excluding VAT, euro for euro against the gross success commission. Net commission payable equals the gross success commission less that credit, with a minimum of zero. The credit cannot be transferred to another asset or redeemed for cash.",
    ],
  },
  {
    title: "5. Twelve-month tail and anti-circumvention",
    paragraphs: [
      "The success commission and same-asset credit in clause 4 also apply if a sale completes within 12 months after this mandate ends with a buyer Wiele introduced during the mandate. Wiele must be able to identify the documented introduction. This clause survives termination for that period.",
      "The seller must promptly notify Wiele of a transaction with a Wiele-introduced buyer during the mandate or the tail period. The seller must not route or structure a transaction through a nominee, intermediary or buyer-controlled entity, or otherwise conceal the transaction or consideration, to avoid commission. Where a transaction completes through such a structure for the benefit of the Wiele-introduced buyer within the applicable period, the same commission and credit rules apply.",
    ],
  },
  {
    title: "6. Service standards and regulatory licensing",
    paragraphs: [
      "6.1 Best efforts. Wiele provides marketing and advertising on a best-efforts basis.",
      "6.2 Transaction outcomes. Wiele gives no guarantee or warranty of sale, valuation, sale price, enquiry volume or quality, or closing timeframe.",
      "6.3 Advertising outcomes. Wiele gives no guarantee or warranty of advertising-platform approval, delivery or performance.",
      "6.4 Regulatory Licensing Notice. Any mandate involving immovable property situated in Malta is executed strictly through an intermediary licensed by Malta’s Property Market Agency under the Property Market Agency Act (Chapter 644 of the Laws of Malta). Marine, automotive and non-Maltese asset mandates are governed directly by this Agreement, subject to mandatory law and any licensing requirements in the relevant jurisdiction.",
    ],
  },
  {
    title: "7. Seller warranties, due diligence and consumer withdrawal",
    paragraphs: [
      "The seller warrants that they own the asset or are authorised to instruct Wiele, that the particulars supplied are accurate to the best of their knowledge, and that they hold the rights or permissions needed for Wiele to use the photographs, descriptions and other materials provided. The seller grants Wiele non-exclusive permission to use those materials for the agreed marketing and reporting and must promptly disclose material changes, competing instructions, restrictions or encumbrances.",
      "The seller will cooperate with checks required under applicable Maltese and EU know-your-customer, anti-money-laundering, sanctions and ultimate-beneficial-ownership rules. Wiele or the responsible practitioner may need to verify identity, authority and ultimate beneficial ownership before acting. Provide identity and ownership records through an agreed secure channel.",
      "Consumers who conclude this service contract online generally have 14 days from contract conclusion to withdraw where the law gives them that right. They may send a clear withdrawal statement to admin@wielegroup.com or use the online withdrawal function where applicable. Acceptance of this mandate alone does not request early performance. If a consumer separately requests early performance, they may owe a proportionate amount for services already provided before withdrawal where the law permits. The right is lost for a paid service only after full performance and where the consumer previously gave the required express consent and acknowledgement.",
    ],
  },
  {
    title: "8. Brokerage liability exclusions and cap",
    paragraphs: [
      "Wiele does not provide legal, tax, surveying or regulated financial advice under this mandate. The seller should obtain independent advice from appropriately qualified and authorised practitioners for the asset and jurisdiction.",
      "To the extent permitted by law, Wiele excludes liability for buyer or other third-party defaults for which Wiele is not legally responsible, and for indirect or consequential loss. To the same extent, Wiele’s aggregate liability arising out of or in connection with the mandate is capped at the net retainer fees, excluding VAT, actually paid for the designated asset during the three months preceding the event giving rise to the claim.",
      "The exclusions and cap do not limit liability for fraud, wilful misconduct, gross negligence, death or personal injury, or any other liability or statutory right that cannot lawfully be excluded or limited.",
    ],
  },
  {
    title: "9. Governing law and jurisdiction",
    paragraphs: [
      "The laws of the Republic of Malta govern this mandate. The courts of Malta have exclusive jurisdiction over disputes arising from it to the extent permitted by applicable law. This choice preserves a consumer’s mandatory protections under the law that would otherwise apply, and any right to bring or defend a claim in another competent court.",
    ],
  },
] as const;

export function formatMandateAgreement(schedule: MandateScheduleAValues = {}) {
  return [
    mandateSummary.title,
    `Version ${mandateSummary.version} · Effective date ${mandateSummary.effectiveDateLabel}`,
    ...mandateAgreement.flatMap(clause => [clause.title, ...clause.paragraphs]),
    "Schedule A — Designated asset and commercial terms",
    ...mandateScheduleAFields.map(({ key, label }) => `${label}: ${schedule[key] || "To be entered during onboarding"}`),
    ...mandateScheduleACommercialTerms.map(({ label, value }) => `${label}: ${value}`),
  ].join("\n\n");
}

export const mandateAgreementText = formatMandateAgreement();
