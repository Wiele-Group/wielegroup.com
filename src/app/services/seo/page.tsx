import { Metadata } from "next";
import ServicePageTemplate, { ServicePageData } from "@/components/ServicePageTemplate";

export const metadata: Metadata = {
  title: "SEO Services — Wiele Group",
  description: "Technical SEO, content strategy, and authority building that drives organic revenue. Not rankings reports — growth systems.",
  openGraph: { title: "SEO Services — Wiele Group", description: "Technical SEO, content strategy, and authority building that drives organic revenue." },
};

const data: ServicePageData = {
  slug: "seo",
  name: "SEO",
  headline: "Rankings are a side effect. Revenue is the goal.",
  subheadline: "We build organic growth systems that compound — technical foundations, authority content, and conversion architecture working together.",
  problemTitle: "Most SEO is backwards",
  problemBody: "Agencies chase rankings and deliver traffic reports. But traffic without intent is noise. Pages without authority decay. Rankings without conversion architecture waste every click. We engineer the full system: technical health, content that answers buyer questions, and page structures that turn visitors into pipeline.",
  steps: [
    { num: "01", title: "Technical Foundation", desc: "Core Web Vitals, crawlability, indexation, schema markup, site architecture — the infrastructure that everything else depends on." },
    { num: "02", title: "Intent Mapping", desc: "We map your buyers' decision journey to search behaviour, targeting queries that signal purchase intent, not just volume." },
    { num: "03", title: "Authority Content", desc: "Pillar pages, comparison guides, and answer assets that position you as the category expert in both search engines and AI systems." },
    { num: "04", title: "Conversion Architecture", desc: "CTAs, internal linking, page flow — every ranking page is engineered to move visitors toward a business outcome." },
  ],
  deliverables: [
    { text: "Full technical SEO audit + implementation" },
    { text: "Keyword and intent research" },
    { text: "Content strategy and editorial calendar" },
    { text: "On-page optimization for all target pages" },
    { text: "Schema markup (JSON-LD) on every page" },
    { text: "Monthly performance reporting with revenue attribution" },
    { text: "Core Web Vitals monitoring and optimization" },
    { text: "Internal linking architecture" },
  ],
  results: [
    { metric: "+340%", label: "Avg organic traffic growth" },
    { metric: "+215%", label: "Organic lead volume increase" },
    { metric: "<1s", label: "Average LCP achieved" },
    { metric: "47+", label: "Clients served" },
  ],
  pricingFrom: "From £1,500/mo",
  pricingNote: "Included in Launch tier and above. Custom scoping available.",
  faqs: [
    { question: "How long until we see results?", answer: "Most clients see measurable traffic improvements within 60-90 days. Significant revenue impact typically compounds from month 4 onward. We set expectations clearly at kickoff." },
    { question: "Do you guarantee rankings?", answer: "No one can guarantee specific rankings — anyone who does is misleading you. We guarantee a systematic process, transparent reporting, and measurable business outcomes." },
    { question: "What makes your SEO different from other agencies?", answer: "We optimize for revenue, not rankings. Every page we build is designed to be cited by AI systems and convert visitors. We combine technical SEO, AEO, and GEO into one integrated system." },
    { question: "Do you work with e-commerce or SaaS?", answer: "Both. Our approach adapts to your business model — whether that means product page optimization, programmatic SEO, or content-led demand generation." },
    { question: "What do your reports look like?", answer: "Revenue attribution first, then rankings, traffic, and technical health. We report on what matters to your business, not vanity metrics." },
  ],
};

export default function SeoPage() {
  return <ServicePageTemplate data={data} />;
}
