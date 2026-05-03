import { Metadata } from "next";
import { siteConfig, jsonLd } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Services — Wiele Group",
  description: "SEO, AEO, GEO, Performance Advertising, Web Design, and Growth Marketing — integrated into one AI-first growth system.",
};

const services = [
  { slug: "seo", name: "SEO", icon: "🔍", desc: "Technical foundations, authority content, and conversion architecture that compounds organic revenue." },
  { slug: "aeo", name: "AEO", icon: "🤖", desc: "Answer Engine Optimization — get your brand cited by ChatGPT, Gemini, Perplexity, and Copilot." },
  { slug: "geo", name: "GEO", icon: "🌐", desc: "Generative Engine Optimization — shape how AI represents your brand across every platform." },
  { slug: "advertising", name: "Performance Advertising", icon: "📈", desc: "Paid media engineered for pipeline and revenue across Google, Meta, and LinkedIn." },
  { slug: "web-design", name: "Web Design & Development", icon: "⚡", desc: "Performance-engineered websites where every page converts and every metric hits 100." },
  { slug: "marketing", name: "Growth Marketing", icon: "🚀", desc: "Content, email, social, and demand gen — integrated into a single compounding growth engine." },
];

export default function ServicesPage() {
  const crumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "Services", url: `${siteConfig.url}/services` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />

      <section className="relative min-h-[50vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="ambient-gradient" />
        <div className="grid-pattern" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-display-lg font-bold mb-6" style={{ color: "var(--white)" }}>
            One system. Six disciplines. Total visibility.
          </h1>
          <p className="text-body-lg" style={{ color: "var(--silver)" }}>
            We don&apos;t sell isolated services. We engineer integrated growth systems where SEO, AEO, GEO, advertising, web design, and marketing work as one.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`/services/${s.slug}`}
              className="glass p-8 rounded-2xl hover:scale-[1.02] transition-transform group block"
            >
              <span className="text-3xl mb-4 block">{s.icon}</span>
              <h2 className="text-heading-md font-semibold mb-3 group-hover:text-[var(--electric)] transition-colors" style={{ color: "var(--white)" }}>
                {s.name}
              </h2>
              <p className="text-body-md" style={{ color: "var(--silver)" }}>
                {s.desc}
              </p>
              <span className="inline-block mt-4 text-body-sm font-mono" style={{ color: "var(--electric)" }}>
                Learn more →
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-display-md font-bold mb-6" style={{ color: "var(--white)" }}>
            Not sure where to start?
          </h2>
          <p className="text-body-lg mb-8" style={{ color: "var(--silver)" }}>
            Book a free AI visibility audit and we&apos;ll map your biggest growth opportunities.
          </p>
          <a href="/audit" className="btn-primary text-lg px-10 py-4">Get Your Free Audit</a>
        </div>
      </section>
    </>
  );
}
