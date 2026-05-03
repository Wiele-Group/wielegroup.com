import { Metadata } from "next";
import { siteConfig, jsonLd } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About — Wiele Group",
  description: "Wiele Group is an AI-first growth agency founded by Jonny Wiele. We engineer visibility that converts across SEO, AEO, GEO, advertising, and web design.",
};

const values = [
  { title: "Revenue Over Vanity", desc: "Every metric we track connects to business outcomes. We don't report on impressions — we report on pipeline." },
  { title: "Systems Over Tactics", desc: "Tactics decay. Systems compound. We build growth infrastructure that gets stronger over time." },
  { title: "Speed Over Perfection", desc: "Fast execution with iteration beats slow perfection every time. We ship, measure, and improve." },
  { title: "Transparency Over Spin", desc: "You see exactly what we're doing, why, and what it's producing. No black boxes, no jargon shields." },
];

const timeline = [
  { year: "2024", event: "Founded by Jonny Wiele with a single premise: visibility should convert." },
  { year: "2025", event: "Launched AEO and GEO services ahead of market demand. Early mover advantage." },
  { year: "2026", event: "Full-stack agency model: SEO + AEO + GEO + Advertising + Web Design + Marketing." },
];

export default function AboutPage() {
  const crumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "About", url: `${siteConfig.url}/about` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="ambient-gradient" />
        <div className="grid-pattern" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-display-lg font-bold mb-6" style={{ color: "var(--white)" }}>
            Built different. By design.
          </h1>
          <p className="text-body-lg" style={{ color: "var(--silver)" }}>
            Wiele Group exists because the agency model is broken. Most agencies sell hours and deliver reports. We engineer systems and deliver revenue.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-body-sm font-mono uppercase tracking-[0.2em] mb-4" style={{ color: "var(--neon)" }}>
              Founder
            </p>
            <h2 className="text-display-sm font-bold mb-6" style={{ color: "var(--white)" }}>
              Jonny Wiele
            </h2>
            <p className="text-body-lg mb-4" style={{ color: "var(--silver)" }}>
              I started Wiele Group because I saw two things happening simultaneously: search was fragmenting across AI systems, and agencies were still selling the 2018 playbook.
            </p>
            <p className="text-body-md" style={{ color: "var(--smoke)" }}>
              The opportunity was clear — build an agency that treats AI visibility as a core discipline from day one, not an afterthought. Every system we build, every strategy we deploy, is engineered for the world where AI mediates discovery.
            </p>
          </div>
          <div className="glass p-8 rounded-2xl">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3" style={{ borderBottom: "1px solid var(--steel)" }}>
                <span className="text-body-sm" style={{ color: "var(--smoke)" }}>Clients served</span>
                <span className="font-mono font-bold" style={{ color: "var(--electric)" }}>47+</span>
              </div>
              <div className="flex justify-between items-center py-3" style={{ borderBottom: "1px solid var(--steel)" }}>
                <span className="text-body-sm" style={{ color: "var(--smoke)" }}>Revenue influenced</span>
                <span className="font-mono font-bold" style={{ color: "var(--electric)" }}>£12M+</span>
              </div>
              <div className="flex justify-between items-center py-3" style={{ borderBottom: "1px solid var(--steel)" }}>
                <span className="text-body-sm" style={{ color: "var(--smoke)" }}>Avg organic growth</span>
                <span className="font-mono font-bold" style={{ color: "var(--electric)" }}>340%</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-body-sm" style={{ color: "var(--smoke)" }}>Focus</span>
                <span className="font-mono font-bold" style={{ color: "var(--electric)" }}>AI-first</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6" style={{ background: "var(--obsidian)" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-display-sm font-bold mb-16 text-center" style={{ color: "var(--white)" }}>
            How We Operate
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <div key={i} className="glass p-8 rounded-2xl">
                <h3 className="text-heading-md font-semibold mb-3" style={{ color: "var(--white)" }}>
                  {v.title}
                </h3>
                <p className="text-body-md" style={{ color: "var(--silver)" }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-display-sm font-bold mb-12 text-center" style={{ color: "var(--white)" }}>
            The Story So Far
          </h2>
          <div className="space-y-8">
            {timeline.map((t, i) => (
              <div key={i} className="flex gap-6 items-start">
                <span className="text-display-sm font-bold font-mono shrink-0" style={{ color: "var(--electric)" }}>
                  {t.year}
                </span>
                <p className="text-body-lg pt-2" style={{ color: "var(--silver)" }}>
                  {t.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-display-md font-bold mb-6" style={{ color: "var(--white)" }}>
            Let&apos;s build something that compounds.
          </h2>
          <a href="/contact" className="btn-primary text-lg px-10 py-4">Start a Conversation</a>
        </div>
      </section>
    </>
  );
}
