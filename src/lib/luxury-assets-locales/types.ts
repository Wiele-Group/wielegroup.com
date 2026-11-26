import type { LuxuryAssetsMediaKey } from "@/lib/luxuryAssetsMedia";

export type DeskCopy = {
  name: string;
  profile: string;
  corridors: string;
  governance: string;
  scale: string;
  inspection: string;
  settlement: string;
  liquidity: string; holding: string; lead: string;
  guide: string;
};

export type LuxuryAssetsCopy = {
  title: string; intro: string; description: string; eyebrow: string;
  home: string; language: string; artwork: string; alt: Record<LuxuryAssetsMediaKey, string>; socialAlt: string;
  explore: string; mandates: string; submit: string;
  explorerTitle: string; explorerIntro: string; deskControl: string; deskLabels: [string,string,string];
  desks: [DeskCopy,DeskCopy,DeskCopy];
  matrixTitle: string; matrixIntro: string; matrixLabels: [string,string,string,string,string,string];
  governanceTitle: string; governance: string; malta: string; chapter: string;
  terms: string; dueDiligence: string; costs: string;
  faqTitle: string; faqs: { question: string; answer: string }[];
};
