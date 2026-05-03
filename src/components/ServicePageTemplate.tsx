
import { siteConfig, jsonLd } from "@/lib/metadata";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceStep {
  num: string;
  title: string;
  desc: string;
}

export interface ServiceDeliverable {
  text: string;
}

export interface ServiceResult {
  metric: string;
  label: string;
}

export interface ServicePageData {
  slug: string;
  name: string;
  headline: string;
  subheadline: string;
  problemTitle: string;
  problemBody: string;
  steps: ServiceStep[];
  deliverables: ServiceDeliverable[];
  results: ServiceResult[];
  pricingFrom: string;
  pricingNote: string;
  faqs: ServiceFaq[];
}

export default function ServicePageTemplate({ data }: { data: ServicePageData }) {
  const crumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "Services", url: `${siteConfig.url}/services` },
    { name: data.name, url: `${siteConfig.url}/services/${data.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(serviceSchema(data.name, `${siteConfig.url}/services/${data.slug}`, data.subheadline))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(faqSchema(data.faqs))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))}
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="ambient-gradient" />
        <div className="grid-pattern" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-body-sm font-mono uppercase tracking-[0.2em] mb-4" style={{ color: "var(--neon)" }}>
            {data.name}
          </p>
          <h1 className="text-display-lg font-bold mb-6" style={{ color: "var(--white)" }}>
            {data.headline}
          </h1>
          <p className="text-body-lg mb-8" style={{ color: "var(--silver)" }}>
            {data.subheadline}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/audit" className="btn-primary">Get Your Free Audit</a>
            <a href="/pricing" className="btn-ghost">See Pricing</a>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-display-sm font-bold mb-6" style={{ color: "var(--white)" }}>
            {data.problemTitle}
          </h2>
          <p className="text-body-lg leading-relaxed" style={{ color: "var(--silver)" }}>
            {data.problemBody}
          </p>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 px-6" style={{ background: "var(--obsidian)" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-display-sm font-bold mb-16 text-center" style={{ color: "var(--white)" }}>
            Our Approach
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {data.steps.map((step) => (
              <div key={step.num} className="glass p-8 rounded-2xl">
                <span className="text-display-sm font-bold font-mono" style={{ color: "var(--electric)" }}>
                  {step.num}
                </span>
                <h3 className="text-heading-md font-semibold mt-2 mb-3" style={{ color: "var(--white)" }}>
                  {step.title}
                </h3>
                <p className="text-body-md" style={{ color: "var(--silver)" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-display-sm font-bold mb-12 text-center" style={{ color: "var(--white)" }}>
            What You Get
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {data.deliverables.map((d, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "var(--graphite)" }}>
                <span style={{ color: "var(--neon)" }}>✓</span>
                <span className="text-body-md" style={{ color: "var(--cloud)" }}>{d.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24 px-6" style={{ background: "var(--obsidian)" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-display-sm font-bold mb-16 text-center" style={{ color: "var(--white)" }}>
            Results That Compound
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.results.map((r, i) => (
              <div key={i} className="glass p-8 rounded-2xl text-center">
                <p className="text-display-md font-bold font-mono" style={{ color: "var(--electric)" }}>
                  {r.metric}
                </p>
                <p className="text-body-sm mt-2" style={{ color: "var(--smoke)" }}>
                  {r.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-display-sm font-bold mb-4" style={{ color: "var(--white)" }}>
            Investment
          </h2>
          <p className="text-display-md font-bold font-mono mb-2" style={{ color: "var(--electric)" }}>
            {data.pricingFrom}
          </p>
          <p className="text-body-md mb-8" style={{ color: "var(--smoke)" }}>
            {data.pricingNote}
          </p>
          <a href="/pricing" className="btn-primary">View Full Pricing</a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6" style={{ background: "var(--obsidian)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-display-sm font-bold mb-12 text-center" style={{ color: "var(--white)" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {data.faqs.map((faq, i) => (
              <details key={i} className="glass rounded-2xl overflow-hidden group">
                <summary className="p-6 cursor-pointer text-heading-sm font-semibold flex justify-between items-center" style={{ color: "var(--white)" }}>
                  {faq.question}
                  <span className="transition-transform group-open:rotate-45 text-xl" style={{ color: "var(--electric)" }}>+</span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-body-md" style={{ color: "var(--silver)" }}>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-display-md font-bold mb-6" style={{ color: "var(--white)" }}>
            Ready to dominate {data.name.toLowerCase()}?
          </h2>
          <p className="text-body-lg mb-8" style={{ color: "var(--silver)" }}>
            Book a free strategy call and we&apos;ll show you exactly what&apos;s possible.
          </p>
          <a href="/contact" className="btn-primary text-lg px-10 py-4">Book Strategy Call</a>
        </div>
      </section>
    </>
  );
}
