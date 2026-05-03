import { Metadata } from "next";
import ServicePageTemplate, { ServicePageData } from "@/components/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Web Design & Development — Wiele Group",
  description: "High-performance websites built for conversion, speed, and search visibility. Not templates — growth-engineered web systems.",
  openGraph: { title: "Web Design & Development — Wiele Group", description: "High-performance websites built for conversion, speed, and search." },
};

const data: ServicePageData = {
  slug: "web-design",
  name: "Web Design & Development",
  headline: "Websites that convert, not just impress.",
  subheadline: "Performance-engineered web design where every page has a job, every section earns attention, and speed is non-negotiable.",
  problemTitle: "Pretty websites don't generate revenue",
  problemBody: "Most agencies deliver a beautiful site that loads slowly, ranks nowhere, and converts no one. Your website is your highest-leverage growth asset — it should be fast enough for perfect Lighthouse scores, structured for search engines and AI systems, and designed to turn every visitor into a measurable business outcome.",
  steps: [
    { num: "01", title: "Strategy & Architecture", desc: "Information architecture, user flow mapping, and conversion pathway design before a single pixel is placed." },
    { num: "02", title: "Design System", desc: "A cohesive visual system — typography, colour, spacing, components — that scales across every page and device." },
    { num: "03", title: "Performance Build", desc: "Built on modern frameworks (Next.js, Astro) with static generation, optimized assets, and sub-second load times." },
    { num: "04", title: "SEO Integration", desc: "Schema markup, semantic HTML, Core Web Vitals optimization, and content structure built for both search engines and AI citation." },
  ],
  deliverables: [
    { text: "Custom website design and development" },
    { text: "Responsive across all devices" },
    { text: "100/100 Lighthouse performance target" },
    { text: "JSON-LD schema on every page" },
    { text: "CMS integration (Sanity, MDX, or headless)" },
    { text: "Analytics and conversion tracking setup" },
    { text: "Hosting and deployment (Cloudflare Pages)" },
    { text: "30-day post-launch support" },
  ],
  results: [
    { metric: "100", label: "Lighthouse performance score" },
    { metric: "<1s", label: "Average page load time" },
    { metric: "+156%", label: "Avg conversion rate improvement" },
    { metric: "0", label: "CLS score (no layout shift)" },
  ],
  pricingFrom: "From £8,000 one-time",
  pricingNote: "Project-based pricing. Ongoing maintenance and iteration available as retainer add-on.",
  faqs: [
    { question: "What tech stack do you use?", answer: "Next.js or Astro for the framework, Tailwind CSS for styling, Cloudflare Pages for hosting, and Sanity or MDX for content management. We choose based on your needs." },
    { question: "How long does a website project take?", answer: "Typical builds run 4-8 weeks from kickoff to launch. Complex sites with custom functionality may extend to 10-12 weeks." },
    { question: "Do you redesign existing sites?", answer: "Yes. We can rebuild on a modern stack while preserving your SEO equity, or iterate on your existing platform depending on your situation." },
    { question: "What about ongoing maintenance?", answer: "We offer retainer-based maintenance packages for content updates, performance monitoring, and iterative improvements post-launch." },
    { question: "Will the site be optimized for AI search?", answer: "Every site we build includes structured data, entity markup, and content architecture designed for both traditional search and AI answer engines." },
  ],
};

export default function WebDesignPage() {
  return <ServicePageTemplate data={data} />;
}
