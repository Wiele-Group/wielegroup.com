import { Metadata } from "next";
import { siteConfig, jsonLd } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Our Work — Wiele Group",
  description: "Case studies and results from SEO, AEO, GEO, advertising, and growth marketing campaigns across multiple industries.",
};

const caseStudies = [
  {
    industry: "SaaS",
    title: "B2B SaaS Platform",
    result: "+312% organic traffic in 6 months",
    services: ["SEO", "AEO", "Content"],
    desc: "Technical SEO overhaul, authority content engine, and AI citation strategy that tripled organic pipeline.",
  },
  {
    industry: "E-commerce",
    title: "Premium E-commerce Brand",
    result: "+189% ROAS on paid campaigns",
    services: ["Advertising", "Web Design"],
    desc: "Full funnel paid media restructure with landing page optimization and creative testing framework.",
  },
  {
    industry: "Professional Services",
    title: "Legal Services Firm",
    result: "+240% qualified leads",
    services: ["SEO", "GEO", "Marketing"],
    desc: "Local SEO dominance, AI answer engine visibility, and content-led demand generation.",
  },
  {
    industry: "FinTech",
    title: "FinTech Scale-up",
    result: "4x AI citation frequency",
    services: ["AEO", "GEO", "Content"],
    desc: "Entity authority engineering and answer asset creation across ChatGPT, Gemini, and Perplexity.",
  },
  {
    industry: "Healthcare",
    title: "Health Tech Company",
    result: "+156% conversion rate",
    services: ["Web Design", "SEO"],
    desc: "Performance-engineered website rebuild with sub-second load times and 100/100 Lighthouse scores.",
  },
  {
    industry: "Education",
    title: "EdTech Platform",
    result: "+420% marketing pipeline",
    services: ["Marketing", "Advertising", "SEO"],
    desc: "Integrated growth system combining organic, paid, and email into a single compounding engine.",
  },
];

export default function WorkPage() {
  const crumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "Work", url: `${siteConfig.url}/work` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />

      <section className="relative min-h-[50vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="ambient-gradient" />
        <div className="grid-pattern" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-display-lg font-bold mb-6" style={{ color: "var(--white)" }}>
            Results, not promises.
          </h1>
          <p className="text-body-lg" style={{ color: "var(--silver)" }}>
            Every engagement is measured against revenue. Here&apos;s what that looks like.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {caseStudies.map((cs, i) => (
            <div key={i} className="glass p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-body-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: "var(--graphite)", color: "var(--neon)" }}>
                  {cs.industry}
                </span>
              </div>
              <h2 className="text-heading-md font-semibold mb-2" style={{ color: "var(--white)" }}>
                {cs.title}
              </h2>
              <p className="text-display-sm font-bold font-mono mb-4" style={{ color: "var(--electric)" }}>
                {cs.result}
              </p>
              <p className="text-body-md mb-4" style={{ color: "var(--silver)" }}>
                {cs.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {cs.services.map((s) => (
                  <span key={s} className="text-body-xs px-2 py-1 rounded" style={{ background: "var(--graphite)", color: "var(--smoke)" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-display-md font-bold mb-6" style={{ color: "var(--white)" }}>
            Your results could be next.
          </h2>
          <p className="text-body-lg mb-8" style={{ color: "var(--silver)" }}>
            Book a free strategy call and we&apos;ll show you exactly what&apos;s achievable for your business.
          </p>
          <a href="/contact" className="btn-primary text-lg px-10 py-4">Book Strategy Call</a>
        </div>
      </section>
    </>
  );
}
