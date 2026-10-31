export const onboardingSources = {
  acquisition: { label: "Acquisition by non-residents — Cap. 246", url: "https://legislation.mt/eli/cap/246/eng/pdf" },
  aml: { label: "Customer due diligence — S.L. 373.1", url: "https://legislation.mt/eli/sl/373.1/eng/pdf" },
  procedures: { label: "FIAU implementing procedures", url: "https://fiaumalta.org/procedures-guidance-2/implementing-procedures/" },
  epc: { label: "BCA energy performance requirements", url: "https://bca.gov.mt/epcs/" },
  licensing: { label: "Property Market Agency licensing", url: "https://realestateregistration.gov.mt/licensing/" },
  privacy: { label: "GDPR — Regulation (EU) 2016/679", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" },
  cash: { label: "FIAU physical-cash restrictions", url: "https://fiaumalta.org/what-we-do/introducing-the-use-of-cash-restriction-regulations/" },
  sanctions: { label: "Sanctions Monitoring Board guidance", url: "https://smb.gov.mt/latest-news/implementing-article-32-sanctions-compliance-requirements/" },
  contract: { label: "Promise-of-sale notification — S.L. 364.6", url: "https://legislation.mt/eli/sl/364.6/eng/pdf" },
} as const;
export type OnboardingSource = keyof typeof onboardingSources;
export const onboardingContent = {
  investor: {
    title: "Investor Onboarding in Malta", description: "Malta property investor onboarding: share your purchase brief, prepare acquisition and funding checks, and understand the next steps with Wiele Properties.",
    eyebrow: "Malta property investment / Investor onboarding", heading: "Your ambition.", emphasis: "A considered beginning.",
    introduction: "Malta property investment starts with your circumstances and your goals. Share an initial brief, understand the documents to prepare, and agree the next step with Jonathan Landman.",
    formTitle: "Share your investor brief.",
    steps: [
      ["01 / Your brief", "Define the purchase.", "Tell us the property type, localities, budget, funding route, purchasing structure and intended use. Local buyers, international investors and joint purchasers are welcome."],
      ["02 / Professional checks", "Establish the route.", "Your independent Maltese notary or advocate assesses acquisition eligibility. Relevant subject persons complete their own identity, beneficial-ownership, funding and risk checks."],
      ["03 / A clear next step", "Agree how to proceed.", "Discuss a suitable search or introduction and any service terms. Before committing funds, your advisers review the specific property, contract, taxes, financing and lawful use."],
    ],
    checks: [
      { title: "Acquisition eligibility", body: "Prepare citizenship and residence-history evidence for each purchaser, any recognised long-term-resident status, existing Malta acquisitions and the proposed ownership structure. The notary must assess AIP requirements or an exemption against the exact transaction. A company or an SDA label alone does not settle every requirement.", sources: ["acquisition"] },
      { title: "Identity, ownership and funding", body: "Expect identification of purchasers, representatives and natural-person beneficial owners, plus proportionate source-of-funds and source-of-wealth evidence. Appointed professionals assess risk, politically exposed persons and sanctions under their applicable duties. Keep documents for the agreed secure process; a bank balance alone may not explain the origin of funds.", sources: ["aml", "procedures", "sanctions"] },
      { title: "Property and intended use", body: "Ask your notary to check title, ground rent, burdens and occupation. A warranted perit should review approved plans, physical condition and conformity. Acquisition permission does not by itself authorise rental use: check permit conditions, lease or tourism requirements and any condominium restrictions before relying on rental projections.", sources: ["acquisition"] },
      { title: "Contracts, costs and payment", body: "Agree financing, deposit custody, deadlines and conditions with your notary before signing. Budget separately for duty, taxes, professional fees and ongoing costs; property has no single blanket VAT treatment. Covered property purchases prohibit physical-cash payments of €10,000 or more, including linked payments. Verify payment instructions independently.", sources: ["contract", "cash"] },
    ],
    faqs: [
      { question: "Does this form confirm I can buy property in Malta?", answer: "No. It records an initial property brief. Acquisition eligibility depends on each purchaser, residence and status, ownership or control, the exact property and intended use. A Maltese notary or advocate must confirm the applicable AIP or exemption route before you commit." },
      { question: "Should I upload my passport or bank statements?", answer: "No. This public form has no document-upload facility. Do not enter identity numbers or bank details. The relevant professional will explain which documents are required and agree an appropriate secure way to provide them." },
      { question: "Can I buy through a company or with other investors?", answer: "You can outline a proposed structure in your brief. Corporate and joint purchases need their own ownership, control, authority, acquisition and funding assessment. Pooled investment arrangements may also need regulatory advice. Wiele does not offer fund management." },
      { question: "What happens after I send my investor brief?", answer: "Your brief is saved with a reference. Wiele reviews the information and contacts you to discuss an appropriate next step. No property is reserved, no eligibility clearance is issued and no payment or service agreement is created by submission." },
    ],
  },
  seller: {
    title: "Seller Onboarding in Malta", description: "Malta property seller onboarding: share your property brief and prepare ownership, authority, EPC, planning and income records before marketing with Wiele Properties.",
    eyebrow: "Malta property marketing / Seller onboarding", heading: "Your property.", emphasis: "Prepared with purpose.",
    introduction: "Malta property marketing begins with a clear brief and reliable particulars. Tell us about your property, understand what to prepare, and agree the scope before advertising starts.",
    formTitle: "Introduce your property.",
    steps: [
      ["01 / Your property", "Start with the facts.", "Share the locality, property type, tenure, occupancy, document status and timing. Flag known defects, disputes, leases and any existing agency instruction."],
      ["02 / Preparation", "Bring the evidence together.", "Confirm who can instruct the sale. Prepare ownership, authority, planning and energy-performance information, alongside supported income and cost records where relevant."],
      ["03 / Agreed instruction", "Set the terms clearly.", "Agree the marketing scope, fees, VAT where applicable, duration, exclusivity and practitioner involvement in writing. Advertising follows the required checks and authority."],
    ],
    checks: [
      { title: "Ownership and authority", body: "Prepare the acquisition deed, relevant succession or corporate records, and any power of attorney for professional review. Identify co-owners, relevant matrimonial or estate interests and who may sign. Disclose current agency agreements. Wiele must separately confirm the instruction and scope; submitting this form is not authority to advertise.", sources: ["licensing"] },
      { title: "EPC before advertising", body: "BCA guidance requires an EPC to be commissioned before a building is put on the market where no valid EPC exists. Commercial advertising must show the energy rating where available, following BCA requirements. The buyer must receive the EPC free of charge. Have an accredited assessor confirm any claimed exemption and the applicable requirements for the property.", sources: ["epc"] },
      { title: "Plans, occupation and income", body: "Gather approved plans and permits for a warranted perit to review against the property. Disclose alterations, enforcement matters, defects, ground rent, burdens, leases and condominium issues. Provide redacted tenancy and cost information through the agreed process; separate collected rent, contractual rent and projections in all particulars.", sources: [] },
      { title: "Identity, terms and completion", body: "Relevant subject persons complete their own customer, representative, beneficial-owner and risk checks. Your notary or advocate should review title, contract conditions, tax treatment and filing obligations. Agree agency or marketing fees and any applicable VAT separately; an enquiry creates no commission obligation or sale contract.", sources: ["aml", "procedures", "contract"] },
    ],
    faqs: [
      { question: "Does the seller form appoint Wiele to sell my property?", answer: "No. It is an initial enquiry. Authority, service scope, fees, any applicable VAT, duration, exclusivity and practitioner involvement must be agreed separately in writing before the relevant work begins." },
      { question: "Do I need an EPC before advertising my Malta property?", answer: "Where no valid EPC exists, BCA guidance requires one to be commissioned before the building is put on the market. The energy rating must appear in commercial advertising where available, following the applicable BCA requirements. Have an accredited assessor confirm any exemption for your property." },
      { question: "Can I submit a property with tenants or missing paperwork?", answer: "Yes, you can make an initial enquiry and identify what remains unresolved. Disclose occupancy, leases, missing documents and known issues. Marketing readiness and the transaction route depend on the evidence and professional review; submission does not establish clear title or planning conformity." },
      { question: "Which documents should I send with my seller brief?", answer: "Do not send documents through this public form. Start with the locality and a summary. Ownership, authority, EPC, planning and income records can be requested separately through an agreed process. Redact tenant personal information from initial working copies." },
    ],
  },
} as const;
