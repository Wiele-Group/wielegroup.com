export type Stage = [title: string, summary: string, deliverable: string, specialists: string, approval: string];
export type Protection = [title: string, description: string, linkLabel: string];
export type BriefKey = "role" | "asset" | "corridor" | "capital" | "horizon";
export type BriefCopy = {
  title: string; intro: string; steps: [string, string, string]; fields: Record<BriefKey, string>;
  roles: [string, string, string]; assets: [string, string, string];
  corridors: [string, string, string, string]; capital: [string, string, string, string, string];
  horizons: [string, string, string, string]; choose: string; next: string; back: string;
  handoff: string; privacy: string; plainForm: string; failed: string; prepared: string;
};
export type BuyingCopy = {
  title: string; intro: string; description: string; eyebrow: string; start: string; scope: string;
  home: string; language: string; artwork: string; socialAlt: string;
  protocolTitle: string; protocolIntro: string; stageControl: string;
  stageFields: [string, string, string]; stages: [Stage, Stage, Stage, Stage];
  matrixTitle: string; matrixIntro: string; protections: [Protection, Protection, Protection];
  imageAlt: { hero: string; maritime: string; provenance: string };
  faqTitle: string; faqs: { question: string; answer: string }[];
  mandates: string; brief: BriefCopy;
};
