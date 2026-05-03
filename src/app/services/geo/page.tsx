import { Metadata } from "next";
import ServicePageTemplate, { ServicePageData } from "@/components/ServicePageTemplate";

export const metadata: Metadata = {
  title: "GEO — Generative Engine Optimization — Wiele Group",
  description: "Generative Engine Optimization that positions your brand inside AI-generated content, recommendations, and search results.",
  openGraph: { title: "GEO — Generative Engine Optimization — Wiele Group", description: "Position your brand inside AI-generated content and recommendations." },
};

const data: ServicePageData = {
  slug: "geo",
  name: "GEO",
  headline: "Shape what AI says about you.",
  subheadline: "Generative Engine Optimization ensures your brand is woven into AI-generated content, summaries, and recommendations across every platform.",
  problemTitle: "AI is writing your industry's narrative — with or without you",
  problemBody: "Generative AI doesn't just answer questions — it creates content, summaries, product recommendations, and market analyses. If your brand lacks the authority signals and structured presence that generative systems draw from, your competitors fill that space. GEO is the discipline of engineering your brand's presence inside AI-generated outputs.",
  steps: [
    { num: "01", title: "Generative Presence Audit", desc: "We map how generative AI systems currently represent your brand, competitors, and category across content generation, search, and recommendation contexts." },
    { num: "02", title: "Authority Signal Engineering", desc: "Build the external trust signals — mentions, citations, reviews, structured data — that generative systems weight when constructing narratives." },
    { num: "03", title: "Content Architecture for Generation", desc: "Structure your content so generative AI systems draw from it when creating summaries, comparisons, and recommendations." },
    { num: "04", title: "Competitive Displacement", desc: "Systematically increase your brand's share of AI-generated mentions while reducing competitor visibility in your category." },
  ],
  deliverables: [
    { text: "Generative AI presence audit" },
    { text: "Authority signal gap analysis" },
    { text: "Structured content for AI extraction" },
    { text: "External mention and citation building" },
    { text: "AI content generation monitoring" },
    { text: "Competitor displacement tracking" },
    { text: "Entity graph optimization" },
    { text: "Quarterly strategy recalibration" },
  ],
  results: [
    { metric: "5x", label: "AI content mention growth" },
    { metric: "+310%", label: "Generative recommendation rate" },
    { metric: "82%", label: "Share of AI voice in category" },
    { metric: "3mo", label: "Avg time to measurable lift" },
  ],
  pricingFrom: "From £4,000/mo",
  pricingNote: "Full GEO included in Growth tier and above. Standalone audits available.",
  faqs: [
    { question: "What is the difference between AEO and GEO?", answer: "AEO focuses on getting cited when AI answers direct questions. GEO is broader — it addresses how generative AI represents your brand across all output types: content generation, summaries, recommendations, market analyses, and more." },
    { question: "Which AI platforms does GEO cover?", answer: "ChatGPT, Gemini, Perplexity, Copilot, Claude, and any generative system that creates content about your industry. As new platforms emerge, we extend coverage." },
    { question: "Can you control what AI says about our brand?", answer: "Not control — influence. By strengthening your brand's authority signals, entity clarity, and content structure, we shift the probability that AI systems represent you accurately and favourably." },
    { question: "How do you measure GEO success?", answer: "AI mention frequency, sentiment analysis, competitive share of voice in AI outputs, and downstream business metrics like branded search volume and inbound inquiry quality." },
    { question: "Is this relevant for our industry?", answer: "If anyone in your market uses AI tools to research, compare, or make purchasing decisions, GEO is relevant. That now includes virtually every B2B and high-consideration B2C market." },
  ],
};

export default function GeoPage() {
  return <ServicePageTemplate data={data} />;
}
