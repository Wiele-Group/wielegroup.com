import { Metadata } from "next";
import { siteConfig, jsonLd } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Pricing — Wiele Group",
  description: "Transparent pricing for SEO, AEO, GEO, advertising, web design, and growth marketing. Four tiers from £1,500 to £15,000+/mo.",
};

const tiers = [
  {
    name: "Launch",
    price: "£1,500",
    period: "/mo",
    desc: "For businesses starting their visibility journey.",
    features: [
      "Technical SEO audit + implementation",
      "AEO setup + monitoring",
      "Keyword and intent research",
      "On-page optimization",
      "JSON-LD schema markup",
      "Monthly reporting",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Growth",
    price: "£4,000",
    period: "/mo",
    desc: "For businesses ready to compound organic growth.",
    features: [
      "Everything in Launch",
      "Full content strategy + production",
      "GEO — Generative Engine Optimization",
      "Performance advertising management",
      "Email marketing setup",
      "Social media strategy",
      "Weekly performance reviews",
      "Dedicated strategist",
    ],
    cta: "Most Popular",
    highlight: true,
  },
  {
    name: "Scale",
    price: "£8,000",
    period: "/mo",
    desc: "For businesses that want the full growth stack.",
    features: [
      "Everything in Growth",
      "Full paid media management",
      "Web design & development",
      "Advanced AI visibility engineering",
      "Conversion rate optimization",
      "Marketing automation",
      "Quarterly strategy recalibration",
      "Priority support",
    ],
    cta: "Talk to Us",
    highlight: false,
  },
  {
    name: "Enterprise",
    price: "£15,000+",
    period: "/mo",
    desc: "For businesses that want market dominance.",
    features: [
      "Everything in Scale",
      "Dedicated growth team",
      "Custom integrations",
      "Executive reporting",
      "Competitive displacement strategy",
      "International expansion support",
      "Board-level reporting",
      "SLA-backed response times",
    ],
    cta: "Custom Scope",
    highlight: false,
  },
];

export default function PricingPage() {
  const crumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "Pricing", url: `${siteConfig.url}/pricing` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />

      <section className="relative py-32 flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="ambient-gradient" />
        <div className="grid-pattern" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-display-lg font-bold mb-6" style={{ color: "var(--white)" }}>
            Transparent pricing. Real outcomes.
          </h1>
          <p className="text-body-lg" style={{ color: "var(--silver)" }}>
            No hidden fees. No long lock-ins. Choose the tier that matches your growth stage.
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-8 flex flex-col ${tier.highlight ? "ring-2" : "glass"}`}
              style={tier.highlight ? { background: "var(--graphite)", borderColor: "var(--electric)", } : {}}
            >
              {tier.highlight && (
                <span className="text-body-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full self-start mb-4" style={{ background: "var(--electric)", color: "var(--white)" }}>
                  Most Popular
                </span>
              )}
              <h2 className="text-heading-lg font-bold mb-2" style={{ color: "var(--white)" }}>
                {tier.name}
              </h2>
              <div className="mb-2">
                <span className="text-display-md font-bold font-mono" style={{ color: "var(--electric)" }}>
                  {tier.price}
                </span>
                <span className="text-body-md" style={{ color: "var(--smoke)" }}>{tier.period}</span>
              </div>
              <p className="text-body-sm mb-6" style={{ color: "var(--smoke)" }}>
                {tier.desc}
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-body-sm" style={{ color: "var(--silver)" }}>
                    <span style={{ color: "var(--neon)" }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/contact"
                className={tier.highlight ? "btn-primary text-center py-3" : "btn-ghost text-center py-3"}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6" style={{ background: "var(--obsidian)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-display-sm font-bold mb-12 text-center" style={{ color: "var(--white)" }}>
            Pricing FAQ
          </h2>
          <div className="space-y-6">
            {[
              { q: "Are there setup fees?", a: "No setup fees on retainer engagements. Web design projects have separate project-based pricing." },
              { q: "What's the minimum commitment?", a: "3-month initial commitment, then month-to-month. SEO and GEO compound over time — we recommend 6+ months for best results." },
              { q: "Can I switch tiers?", a: "Yes. Upgrade or downgrade at the start of any month. We'll adjust scope and deliverables accordingly." },
              { q: "Is ad spend included?", a: "No. Our management fee and your ad platform spend are separate. We recommend a minimum £3,000/mo ad budget." },
              { q: "What if I need a custom scope?", a: "Contact us. We build custom proposals for businesses that don't fit neatly into a tier. Enterprise is fully custom by default." },
            ].map((faq, i) => (
              <details key={i} className="glass rounded-2xl overflow-hidden group">
                <summary className="p-6 cursor-pointer text-heading-sm font-semibold flex justify-between items-center" style={{ color: "var(--white)" }}>
                  {faq.q}
                  <span className="transition-transform group-open:rotate-45 text-xl" style={{ color: "var(--electric)" }}>+</span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-body-md" style={{ color: "var(--silver)" }}>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-display-md font-bold mb-6" style={{ color: "var(--white)" }}>
            Not sure which tier fits?
          </h2>
          <p className="text-body-lg mb-8" style={{ color: "var(--silver)" }}>
            Book a free audit call and we&apos;ll recommend the right scope for your business.
          </p>
          <a href="/audit" className="btn-primary text-lg px-10 py-4">Get Your Free Audit</a>
        </div>
      </section>
    </>
  );
}
