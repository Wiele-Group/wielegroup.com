import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wiele Group — We Engineer Visibility That Converts",
  description: "AI-first growth agency combining SEO, AEO, GEO, performance advertising, and web design into one integrated system for measurable growth.",
};

const services = [
  { title: "Search Engine Optimization", desc: "Rank where it matters. Technical SEO, content strategy, and authority building that compounds.", href: "/services/seo", icon: "🔍" },
  { title: "AI Answer Engine Optimization", desc: "Get cited by ChatGPT, Gemini, and Perplexity. The new front page of the internet.", href: "/services/aeo", icon: "🤖" },
  { title: "Generative Engine Optimization", desc: "Engineer your brand into AI-generated answers. Entity-level visibility competitors can't copy.", href: "/services/geo", icon: "⚡" },
  { title: "Performance Advertising", desc: "Google Ads, Meta, LinkedIn, programmatic. Every dollar tracked. Every campaign profitable.", href: "/services/advertising", icon: "📈" },
  { title: "Web Design & Development", desc: "Dark-mode, conversion-first websites built for speed and search. No templates. No compromises.", href: "/services/web-design", icon: "🖥️" },
  { title: "Growth Marketing", desc: "Full-funnel strategy from awareness to revenue. Content, email, social, CRO. Integrated.", href: "/services/marketing", icon: "🚀" },
];

const stats = [
  { value: "340%", label: "Avg. organic growth" },
  { value: "47+", label: "Clients served" },
  { value: "$12M+", label: "Revenue generated" },
  { value: "<1s", label: "Target LCP" },
];

const differences = [
  { title: "AI-Native", desc: "Built around the new discovery landscape — not retrofitted for it." },
  { title: "Full-Spectrum", desc: "SEO + AEO + GEO + Ads + Design. One team. One strategy. Zero gaps." },
  { title: "Outcome-Obsessed", desc: "We don't report vanity metrics. We report revenue impact." },
];

const results = [
  { industry: "SaaS", metric: "+312% organic traffic", time: "6 months" },
  { industry: "E-commerce", metric: "+189% ROAS", time: "90 days" },
  { industry: "Professional Services", metric: "+47 AI citations", time: "4 months" },
  { industry: "B2B Tech", metric: "+$2.1M pipeline", time: "12 months" },
];

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Ambient gradient */}
        <div className="absolute inset-0 ambient-gradient" />
        {/* Grid */}
        <div className="absolute inset-0 grid-pattern opacity-50" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <p className="text-body-sm font-semibold uppercase tracking-widest mb-6" style={{ color: "var(--electric)" }}>
            AI-First Growth Agency
          </p>
          <h1 className="text-display-xl mb-6" style={{ color: "var(--white)" }}>
            Your competitors rank.{" "}
            <span style={{ color: "var(--electric)" }}>You dominate.</span>
          </h1>
          <p className="text-body-lg max-w-2xl mx-auto mb-10" style={{ color: "var(--silver)" }}>
            SEO. AEO. GEO. Advertising. Web Design. One integrated system engineered for measurable growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/audit" className="btn-primary text-base px-8 py-3.5">
              Get Your Free AI Visibility Audit <span aria-hidden>→</span>
            </Link>
            <Link href="/work" className="btn-ghost text-base px-8 py-3.5">
              See Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF BAR ═══ */}
      <section className="py-12" style={{ borderTop: "1px solid var(--elevated-border)", borderBottom: "1px solid var(--elevated-border)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-display-md font-mono" style={{ color: "var(--white)" }}>{s.value}</p>
                <p className="text-body-sm mt-1" style={{ color: "var(--smoke)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES GRID ═══ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <p className="text-body-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--electric)" }}>What We Do</p>
            <h2 className="text-display-md" style={{ color: "var(--white)" }}>One system. Six engines.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link key={s.href} href={s.href} className="glass p-8 group transition-all duration-200 hover:border-[var(--electric)] hover:shadow-[0_0_40px_rgba(99,102,241,0.1)]">
                <span className="text-2xl mb-4 block">{s.icon}</span>
                <h3 className="text-heading-sm mb-3" style={{ color: "var(--white)" }}>{s.title}</h3>
                <p className="text-body-md" style={{ color: "var(--smoke)" }}>{s.desc}</p>
                <span className="inline-block mt-4 text-sm font-medium transition-transform group-hover:translate-x-1" style={{ color: "var(--electric)" }}>
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE WIELE DIFFERENCE ═══ */}
      <section className="py-24" style={{ background: "var(--obsidian)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-body-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--neon)" }}>The Difference</p>
              <h2 className="text-display-md mb-6" style={{ color: "var(--white)" }}>
                Most agencies optimize pages. We engineer systems.
              </h2>
              <p className="text-body-lg" style={{ color: "var(--silver)" }}>
                While other agencies are still selling 2019 SEO playbooks, we built an integrated growth engine around AI search, conversion architecture, and compounding authority.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {differences.map((d) => (
                <div key={d.title} className="elevated p-6">
                  <h3 className="text-heading-sm mb-2" style={{ color: "var(--electric)" }}>{d.title}</h3>
                  <p className="text-body-md" style={{ color: "var(--cloud)" }}>{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ RESULTS ═══ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <p className="text-body-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--electric)" }}>Results</p>
            <h2 className="text-display-md" style={{ color: "var(--white)" }}>Numbers. Not promises.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((r) => (
              <div key={r.industry} className="glass p-8 text-center">
                <p className="text-body-sm uppercase tracking-wider mb-3" style={{ color: "var(--smoke)" }}>{r.industry}</p>
                <p className="text-heading-lg font-mono mb-2" style={{ color: "var(--neon)" }}>{r.metric}</p>
                <p className="text-body-sm" style={{ color: "var(--smoke)" }}>{r.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)" }} />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-display-md mb-6" style={{ color: "var(--white)" }}>
            Ready to stop guessing and start growing?
          </h2>
          <p className="text-body-lg mb-10" style={{ color: "var(--silver)" }}>
            Get a free AI visibility audit. See exactly where you rank in traditional search and AI answer engines.
          </p>
          <Link href="/audit" className="btn-primary text-base px-10 py-4">
            Claim Your Free Audit <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
