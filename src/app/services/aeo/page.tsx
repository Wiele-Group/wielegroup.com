import { Metadata } from "next";
import ServicePageTemplate, { ServicePageData } from "@/components/ServicePageTemplate";

export const metadata: Metadata = {
  title: "AEO — Answer Engine Optimization — Wiele Group",
  description: "Get your brand cited by ChatGPT, Gemini, and Perplexity. Answer Engine Optimization that puts you in AI-generated answers.",
  openGraph: { title: "AEO — Answer Engine Optimization — Wiele Group", description: "Get your brand cited by ChatGPT, Gemini, and Perplexity." },
};

const data: ServicePageData = {
  slug: "aeo",
  name: "AEO",
  headline: "Be the answer AI gives.",
  subheadline: "Answer Engine Optimization ensures your brand appears when ChatGPT, Gemini, Perplexity, and Copilot answer questions your buyers ask.",
  problemTitle: "Search is fragmenting — are you visible?",
  problemBody: "Your prospects are asking ChatGPT instead of Google. AI systems synthesise answers from the most authoritative, clearly structured sources. If your content isn't optimized for extraction, you're invisible in the fastest-growing discovery channel. AEO is the new competitive moat.",
  steps: [
    { num: "01", title: "AI Citation Audit", desc: "We test your brand visibility across ChatGPT, Gemini, Perplexity, and Copilot — mapping where you appear, where competitors appear, and where you're absent." },
    { num: "02", title: "Entity Architecture", desc: "We strengthen your brand's entity signals — structured data, consistent mentions, and authoritative content that AI systems can confidently attribute." },
    { num: "03", title: "Answer Asset Creation", desc: "Direct answer blocks, FAQ schemas, comparison content, and definitive guides designed to be extracted and cited by AI answer engines." },
    { num: "04", title: "Citation Monitoring", desc: "Ongoing tracking of your brand's AI mention frequency, sentiment, and competitive share of AI-generated recommendations." },
  ],
  deliverables: [
    { text: "AI citation audit across 4 major answer engines" },
    { text: "Entity optimization roadmap" },
    { text: "Answer-optimized content creation" },
    { text: "FAQ schema implementation (JSON-LD)" },
    { text: "Monthly AI visibility tracking reports" },
    { text: "Competitor AI citation benchmarking" },
    { text: "Content extraction testing" },
    { text: "Brand entity strengthening" },
  ],
  results: [
    { metric: "4x", label: "Avg AI citation frequency" },
    { metric: "67%", label: "AI recommendation rate" },
    { metric: "+280%", label: "Brand mention growth" },
    { metric: "12", label: "Industries served" },
  ],
  pricingFrom: "From £1,500/mo",
  pricingNote: "AEO is included in every tier. Standalone AEO audits available from £2,500.",
  faqs: [
    { question: "What is Answer Engine Optimization?", answer: "AEO is the practice of optimizing your content and brand signals so that AI systems — ChatGPT, Gemini, Perplexity, Copilot — cite and recommend your brand when users ask questions relevant to your business." },
    { question: "How do you track AI citations?", answer: "We run systematic queries across all major AI answer engines, tracking when your brand is mentioned, in what context, and how you compare to competitors. This is reported monthly with trend analysis." },
    { question: "Is AEO replacing SEO?", answer: "No — they're complementary. Strong SEO provides the authority foundation that AI systems use to determine trust. AEO adds the structural and entity optimizations that make your content extractable by AI." },
    { question: "How quickly can we appear in AI answers?", answer: "Some improvements show within weeks as AI systems re-index content. Full entity authority building is a 3-6 month compounding process. We prioritize quick wins alongside long-term positioning." },
    { question: "Do you work with B2B and B2C?", answer: "Yes. AI answer engines serve both audiences. The query patterns differ, but the optimization principles — authority, structure, entity clarity — apply universally." },
  ],
};

export default function AeoPage() {
  return <ServicePageTemplate data={data} />;
}
