import type { SettlementCopy } from "./types";

export default {
  home: "Home", language: "Guide language",
  eyebrow: "Cross-Border Acquisition & Settlement Briefing",
  title: "Structuring Cross-Border Acquisitions with Clarity.",
  intro: "A practical briefing on due diligence, currency corridors, registry transfer, and counsel-led settlement across the United Kingdom, Continental Europe, the Mediterranean, and Southern Africa.",
  matrix: "Due diligence, escrow & registry transfer",
  matrixIntro: "Select an asset class and destination corridor to see what your appointed specialists should verify before you sign or release funds.",
  assetLabel: "Asset class", corridorLabel: "Destination corridor",
  fields: ["Title, registry & licensing", "Technical & provenance checks", "Escrow & settlement"],
  assets: [
    { name: "Prime Real Estate", checks: [
      "Confirm the seller’s authority, title, encumbrances and any acquisition or use permissions.",
      "Commission an independent structural survey and reconcile boundaries, condition and permitted works with the title and planning records.",
      "Have counsel document deposit protection, conditions, transfer papers and the evidence required for release of funds.",
    ] },
    { name: "Superyachts", checks: [
      "Reconcile the chain of ownership, flag eligibility, liens and any deletion or transfer certificates.",
      "Commission an independent condition and machinery survey and sea trial. Verify class status and outstanding recommendations with the relevant society, where applicable.",
      "Agree the delivery location, acceptance criteria and documents for simultaneous release with the bill of sale and physical delivery.",
    ] },
    { name: "Collector Automobiles", checks: [
      "Reconcile seller title, chassis identity and export or import documents with the intended destination.",
      "Engage a marque specialist to verify chassis and engine numbers, originality, restoration records and condition against the provenance file.",
      "Specify custody, insured transport, document handover and the evidence needed before releasing payment.",
    ] },
  ],
  corridors: [
    { name: "United Kingdom", titleChecks: [
      "Identify the relevant UK jurisdiction and its land register. Ask local counsel to confirm the conveyancing route.",
      "If UK registration is intended, confirm eligibility, the registry evidence and import status before committing.",
      "Confirm import status, any approval needed for road use and the evidence required for registration.",
    ], settlement: "Agree the contract and funding currencies with counsel and your bank. Confirm GBP conversion and the completion cut-off in advance." },
    { name: "Continental Europe & Malta", titleChecks: [
      "Confirm the local notarial or registry process. For Maltese immovable property, verify the intermediary’s licence and ask the notary to confirm any acquisition permissions.",
      "Confirm flag and customs or VAT evidence for the intended use and place of delivery. Check continuity of class with the relevant society where applicable.",
      "Confirm the destination’s customs and registration documents, including conformity or historic-vehicle evidence where applicable.",
    ], settlement: "Prepare the local tax and duty schedule. Have counsel agree deposit and release conditions and the bank confirm the settlement currency and transfer arrangements." },
    { name: "Southern Africa", titleChecks: [
      "Confirm the country’s deeds or land registry process, any transfer permissions and the authorised conveyancing practitioner.",
      "Confirm the chosen flag, local entry or import status and registry documents before moving the yacht.",
      "Check destination-specific import permission and registration eligibility before purchase, shipment or any non-refundable payment.",
    ], settlement: "Have counsel and your bank confirm the settlement currency, any exchange-control requirements and records needed for future remittance." },
  ],
  checklist: "Five stages from brief to handover",
  stages: [
    ["Mandate & scope definition", "Record the asset specification, intended use, destination, buyer and holding structure, budget and target completion date. Identify the principal and appointed advisers before approaching sellers."],
    ["Technical & legal due diligence", "Obtain a written report on title and seller authority, independent inspection and provenance findings, and a schedule of permissions, tax questions and conditions to resolve."],
    ["Currency & escrow structuring", "Agree the all-in budget, funding and contract currencies, conversion timing, verified bank or escrow instructions and contractual release conditions."],
    ["Agreement execution & registry transfer", "Have counsel confirm signing authority, conditions and closing documents. Coordinate cleared funds with filing, registration or transfer and obtain written evidence of completion."],
    ["Handover & post-completion governance", "Reconcile keys or custody, insurance, registrations, warranties and records. Assign responsibility for filings, renewals and any outstanding work."],
  ],
  buying: "Discuss an acquisition mandate", mandates: "View private mandates",
  governance: "Counsel-led settlement",
  roles: "Wiele provides marketing, origination, introductions and transaction orientation. Appointed lawyers and tax advisers handle legal advice and tax structuring. The parties’ appointed counsel, banks and registry professionals arrange escrow, settlement and title or registry transfer.",
  malta: "For Maltese immovable property, intermediary activity within Chapter 644 must be handled by an appropriately licensed intermediary. Confirm the intermediary and conveyancing arrangements with your appointed Maltese notary or counsel.",
  sources: "Property Market Agency Act · Malta Chapter 644",
  directory: "Jurisdiction & asset references",
  directoryIntro: "Browse 35 jurisdictions, including separate UK legal systems. The linked country and technical guides are in English and include sources, dates and coverage limits.",
  country: "Search by country or jurisdiction", countryPlaceholder: "For example, Malta or Scotland",
  all: "All", clear: "Clear filters", results: "{shown} of {total} jurisdictions", noResults: "No matching jurisdictions. Try another country or clear the filters.",
  primary: "Primary Corridor", regions: ["United Kingdom", "European Union", "Other Europe", "South Africa"],
  referenceLinks: ["Malta acquisition guide", "Landed-cost estimator", "Cross-border seller guidance", "Yacht registry and import guide", "Collector automobile import guide", "Illustrative dossiers"],
  faq: "Questions before you commit",
  questions: ["Who handles escrow and title transfer?", "Who handles regulated property intermediary activity in Malta?"],
  images: ["Walnut desk with a brass lamp overlooking a Mediterranean harbour at twilight", "Limestone residence and terrace above a coastal cove at dusk", "Teak aft deck and stern of a superyacht moored at blue hour"],
  illustration: "Illustrative scene",
} satisfies SettlementCopy;
