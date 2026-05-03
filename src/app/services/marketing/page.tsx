import { Metadata } from "next";
import ServicePageTemplate, { ServicePageData } from "@/components/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Growth Marketing — Wiele Group",
  description: "Full-funnel growth marketing that integrates content, email, social, and demand generation into one revenue-focused system.",
  openGraph: { title: "Growth Marketing — Wiele Group", description: "Full-funnel growth marketing integrated into one revenue system." },
};

const data: ServicePageData = {
  slug: "marketing",
  name: "Growth Marketing",
  headline: "Growth isn't a department. It's a system.",
  subheadline: "Content, email, social, and demand generation — integrated into a single engine that compounds authority and converts pipeline.",
  problemTitle: "Tactics without a system produce noise",
  problemBody: "A blog post here, a LinkedIn campaign there, an email sequence that nobody maintains. Disconnected marketing creates activity but not growth. We build the system: a unified strategy where every channel reinforces the others, every piece of content has a job, and every touchpoint moves prospects toward a decision.",
  steps: [
    { num: "01", title: "Growth Audit", desc: "We map your current channels, content, and conversion points — identifying what's working, what's wasted, and where the highest-leverage opportunities are." },
    { num: "02", title: "Strategy Architecture", desc: "A unified growth plan connecting content, email, social, paid, and organic into a single system with clear KPIs and ownership." },
    { num: "03", title: "Execution Engine", desc: "Content production, email sequences, social publishing, and campaign management — executed consistently, measured rigorously." },
    { num: "04", title: "Optimization Loop", desc: "Weekly performance reviews, monthly strategy adjustments, and quarterly planning — continuously compounding what works." },
  ],
  deliverables: [
    { text: "Full-funnel growth strategy" },
    { text: "Content marketing plan and production" },
    { text: "Email nurture sequences" },
    { text: "Social media strategy and management" },
    { text: "Lead magnet creation" },
    { text: "Marketing automation setup" },
    { text: "Monthly performance reporting" },
    { text: "Quarterly strategy reviews" },
  ],
  results: [
    { metric: "+420%", label: "Marketing-sourced pipeline" },
    { metric: "3.8x", label: "Email engagement improvement" },
    { metric: "+200%", label: "Social audience growth" },
    { metric: "28%", label: "Lead-to-opportunity rate" },
  ],
  pricingFrom: "From £4,000/mo",
  pricingNote: "Included in Growth tier and above. Custom scoping available for enterprise.",
  faqs: [
    { question: "How is this different from just hiring a marketer?", answer: "You get a system, not a person. Strategy, execution, creative, analytics, and optimization — integrated and accountable to revenue. No ramp-up time, no management overhead." },
    { question: "What channels do you cover?", answer: "Content (blog, guides, thought leadership), email (nurture, newsletters, sequences), social (LinkedIn, X), and demand generation. We add paid media when it makes sense." },
    { question: "Do you produce the content?", answer: "Yes. Strategy, writing, design, and distribution. We produce everything in-house and to brand standard." },
    { question: "How do you measure success?", answer: "Pipeline generated, lead quality, conversion rates, and revenue attribution. We report on business outcomes, not marketing vanity metrics." },
    { question: "Can we start with just one channel?", answer: "Yes. Many clients start with content + SEO and expand as results compound. We recommend what makes sense for your stage and budget." },
  ],
};

export default function MarketingPage() {
  return <ServicePageTemplate data={data} />;
}
