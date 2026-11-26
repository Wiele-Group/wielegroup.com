import type { SellingMediaKey } from "@/lib/sellingMedia";

type Stage = [title: string, summary: string, deliverable: string, governance: string, timing: string];
type Feature = [title: string, description: string];

export type SellingCopy = {
  title: string; intro: string; description: string; eyebrow: string; home: string; language: string;
  artwork: string; alt: Record<SellingMediaKey, string>; socialAlt: string;
  list: string; terms: string; agreement: string;
  protocolTitle: string; protocolIntro: string; stageControl: string; stageFields: [string,string,string];
  stages: [Stage,Stage,Stage,Stage];
  craft: Feature; corridor: Feature; dossiers: string;
  termsTitle: string; termsIntro: string; termLabels: [string,string,string,string];
  cancellation: string; trigger: string; qualifiedCredit: string; scope: string; maltaTitle: string;
  malta: string; statute: string;
  calculator: {
    title: string; note: string; value: string; duration: string; months: string; mandateType: string;
    eligible: string; malta: string; maltaNotice: string; invalid: string; excluded: string;
    retainer: string; gross: string; credit: string; closing: string; total: string;
  };
  faqTitle: string; faq: [string,string];
};
