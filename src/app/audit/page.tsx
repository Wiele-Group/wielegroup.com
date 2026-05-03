"use client";

import { siteConfig, jsonLd } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { useState } from "react";

const auditChecks = [
  "AI citation audit across ChatGPT, Gemini, Perplexity, Copilot",
  "Technical SEO health scan",
  "Core Web Vitals assessment",
  "Competitor visibility comparison",
  "Content gap analysis",
  "Schema markup review",
  "Conversion architecture evaluation",
  "Prioritized action plan with ROI estimates",
];

export default function AuditPage() {
  const [submitted, setSubmitted] = useState(false);

  const crumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "Free AI Audit", url: `${siteConfig.url}/audit` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />

      <section className="relative py-32 flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="ambient-gradient" />
        <div className="grid-pattern" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-body-sm font-mono uppercase tracking-[0.2em] mb-4" style={{ color: "var(--neon)" }}>
            Free — No obligation
          </p>
          <h1 className="text-display-lg font-bold mb-6" style={{ color: "var(--white)" }}>
            AI Visibility Audit
          </h1>
          <p className="text-body-lg" style={{ color: "var(--silver)" }}>
            Find out exactly where your brand appears — and doesn&apos;t — across AI answer engines, search, and your competitors&apos; blind spots.
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          {/* What's Included */}
          <div>
            <h2 className="text-heading-lg font-semibold mb-8" style={{ color: "var(--white)" }}>
              What&apos;s Included
            </h2>
            <div className="space-y-4">
              {auditChecks.map((check, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "var(--graphite)" }}>
                  <span style={{ color: "var(--neon)" }}>✓</span>
                  <span className="text-body-md" style={{ color: "var(--cloud)" }}>{check}</span>
                </div>
              ))}
            </div>

            <div className="glass p-8 rounded-2xl mt-8">
              <h3 className="text-heading-md font-semibold mb-3" style={{ color: "var(--white)" }}>
                What happens after?
              </h3>
              <p className="text-body-md" style={{ color: "var(--silver)" }}>
                We&apos;ll deliver a custom report within 3 business days and schedule a 30-minute call to walk through findings and recommendations. No obligation, no hard sell.
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="text-heading-lg font-semibold mb-8" style={{ color: "var(--white)" }}>
              Request Your Audit
            </h2>
            {submitted ? (
              <div className="glass p-12 rounded-2xl text-center">
                <p className="text-display-sm font-bold mb-4" style={{ color: "var(--electric)" }}>
                  Audit requested.
                </p>
                <p className="text-body-md" style={{ color: "var(--silver)" }}>
                  We&apos;ll deliver your custom audit report within 3 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
                <div>
                  <label className="block text-body-sm font-medium mb-2" style={{ color: "var(--cloud)" }}>Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl text-body-md outline-none focus:ring-2"
                    style={{ background: "var(--graphite)", color: "var(--white)", border: "1px solid var(--steel)" }}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-body-sm font-medium mb-2" style={{ color: "var(--cloud)" }}>Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl text-body-md outline-none focus:ring-2"
                    style={{ background: "var(--graphite)", color: "var(--white)", border: "1px solid var(--steel)" }}
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-body-sm font-medium mb-2" style={{ color: "var(--cloud)" }}>Website URL</label>
                  <input
                    type="url"
                    required
                    className="w-full px-4 py-3 rounded-xl text-body-md outline-none focus:ring-2"
                    style={{ background: "var(--graphite)", color: "var(--white)", border: "1px solid var(--steel)" }}
                    placeholder="https://yourcompany.com"
                  />
                </div>
                <div>
                  <label className="block text-body-sm font-medium mb-2" style={{ color: "var(--cloud)" }}>What&apos;s your biggest growth challenge?</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl text-body-md outline-none focus:ring-2 resize-none"
                    style={{ background: "var(--graphite)", color: "var(--white)", border: "1px solid var(--steel)" }}
                    placeholder="Optional — helps us tailor the audit..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-4 text-lg">
                  Request Free Audit
                </button>
                <p className="text-body-xs text-center" style={{ color: "var(--smoke)" }}>
                  No credit card. No commitment. Just clarity.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
