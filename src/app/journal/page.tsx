import { Metadata } from "next";
import { siteConfig, jsonLd } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Journal — Wiele Group",
  description: "Insights on SEO, AEO, GEO, growth marketing, and AI visibility from the Wiele Group team.",
};

const posts = [
  {
    slug: "what-is-aeo",
    title: "What Is Answer Engine Optimization (AEO)?",
    excerpt: "AI systems are answering your buyers' questions. Here's how to make sure your brand is the answer they give.",
    date: "2026-04-28",
    category: "AEO",
    readTime: "8 min",
  },
  {
    slug: "geo-vs-seo",
    title: "GEO vs SEO: What's the Difference and Why It Matters",
    excerpt: "Generative Engine Optimization isn't replacing SEO — it's expanding the battlefield. Here's how they work together.",
    date: "2026-04-21",
    category: "GEO",
    readTime: "6 min",
  },
  {
    slug: "ai-visibility-audit",
    title: "How to Audit Your Brand's AI Visibility in 30 Minutes",
    excerpt: "A practical framework for checking how ChatGPT, Gemini, and Perplexity currently represent your brand.",
    date: "2026-04-14",
    category: "Strategy",
    readTime: "10 min",
  },
  {
    slug: "seo-dead-2026",
    title: "Is SEO Dead in 2026? No — But It's Evolved",
    excerpt: "The SEO-is-dead narrative is wrong. But SEO as most agencies practice it? That's very dead.",
    date: "2026-04-07",
    category: "SEO",
    readTime: "7 min",
  },
  {
    slug: "website-performance-revenue",
    title: "Website Performance Is a Revenue Problem",
    excerpt: "Every 100ms of load time costs you conversions. Here's how to hit 100/100 Lighthouse and why it matters.",
    date: "2026-03-31",
    category: "Web Design",
    readTime: "5 min",
  },
  {
    slug: "growth-marketing-system",
    title: "Stop Doing Marketing. Start Building Growth Systems.",
    excerpt: "Disconnected tactics produce activity. Integrated systems produce revenue. Here's the difference.",
    date: "2026-03-24",
    category: "Marketing",
    readTime: "9 min",
  },
];

export default function JournalPage() {
  const crumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "Journal", url: `${siteConfig.url}/journal` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />

      <section className="relative py-32 flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="ambient-gradient" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-display-lg font-bold mb-6" style={{ color: "var(--white)" }}>
            Journal
          </h1>
          <p className="text-body-lg" style={{ color: "var(--silver)" }}>
            Frameworks, strategies, and insights on building visibility that converts.
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {posts.map((post) => (
            <article key={post.slug} className="glass p-8 rounded-2xl hover:scale-[1.01] transition-transform">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-body-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: "var(--graphite)", color: "var(--neon)" }}>
                  {post.category}
                </span>
                <span className="text-body-xs" style={{ color: "var(--smoke)" }}>{post.date}</span>
                <span className="text-body-xs" style={{ color: "var(--smoke)" }}>{post.readTime}</span>
              </div>
              <h2 className="text-heading-lg font-semibold mb-3" style={{ color: "var(--white)" }}>
                {post.title}
              </h2>
              <p className="text-body-md" style={{ color: "var(--silver)" }}>
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
