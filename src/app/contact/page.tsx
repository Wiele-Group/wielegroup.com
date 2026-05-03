"use client";

import { siteConfig, jsonLd } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { useState } from "react";

const contactMethods = [
  { label: "Email", value: "hello@wielegroup.com", href: "mailto:hello@wielegroup.com" },
  { label: "Growth Inquiries", value: "growth@wielegroup.com", href: "mailto:growth@wielegroup.com" },
  { label: "LinkedIn", value: "Wiele Group", href: "https://linkedin.com/company/wiele-group" },
  { label: "X", value: "@wielegroup", href: "https://x.com/wielegroup" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const crumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "Contact", url: `${siteConfig.url}/contact` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />

      <section className="relative py-32 flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="ambient-gradient" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-display-lg font-bold mb-6" style={{ color: "var(--white)" }}>
            Let&apos;s talk growth.
          </h1>
          <p className="text-body-lg" style={{ color: "var(--silver)" }}>
            Tell us about your business and we&apos;ll show you what&apos;s possible.
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            {submitted ? (
              <div className="glass p-12 rounded-2xl text-center">
                <p className="text-display-sm font-bold mb-4" style={{ color: "var(--electric)" }}>
                  Message received.
                </p>
                <p className="text-body-md" style={{ color: "var(--silver)" }}>
                  We&apos;ll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="space-y-6"
              >
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
                  <label className="block text-body-sm font-medium mb-2" style={{ color: "var(--cloud)" }}>Company</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl text-body-md outline-none focus:ring-2"
                    style={{ background: "var(--graphite)", color: "var(--white)", border: "1px solid var(--steel)" }}
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label className="block text-body-sm font-medium mb-2" style={{ color: "var(--cloud)" }}>What do you need help with?</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl text-body-md outline-none focus:ring-2"
                    style={{ background: "var(--graphite)", color: "var(--white)", border: "1px solid var(--steel)" }}
                  >
                    <option value="">Select a service</option>
                    <option value="seo">SEO</option>
                    <option value="aeo">AEO — Answer Engine Optimization</option>
                    <option value="geo">GEO — Generative Engine Optimization</option>
                    <option value="advertising">Performance Advertising</option>
                    <option value="web-design">Web Design & Development</option>
                    <option value="marketing">Growth Marketing</option>
                    <option value="audit">Free AI Visibility Audit</option>
                    <option value="other">Something else</option>
                  </select>
                </div>
                <div>
                  <label className="block text-body-sm font-medium mb-2" style={{ color: "var(--cloud)" }}>Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl text-body-md outline-none focus:ring-2 resize-none"
                    style={{ background: "var(--graphite)", color: "var(--white)", border: "1px solid var(--steel)" }}
                    placeholder="Tell us about your goals..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-4 text-lg">
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-heading-lg font-semibold mb-8" style={{ color: "var(--white)" }}>
              Direct Contact
            </h2>
            <div className="space-y-6">
              {contactMethods.map((m) => (
                <div key={m.label}>
                  <p className="text-body-sm font-mono uppercase tracking-wider mb-1" style={{ color: "var(--smoke)" }}>
                    {m.label}
                  </p>
                  <a
                    href={m.href}
                    className="text-heading-sm font-medium hover:opacity-80 transition-opacity"
                    style={{ color: "var(--electric)" }}
                    target={m.href.startsWith("http") ? "_blank" : undefined}
                    rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {m.value}
                  </a>
                </div>
              ))}
            </div>

            <div className="glass p-8 rounded-2xl mt-12">
              <h3 className="text-heading-md font-semibold mb-3" style={{ color: "var(--white)" }}>
                Prefer a call?
              </h3>
              <p className="text-body-md mb-4" style={{ color: "var(--silver)" }}>
                Book a free 30-minute strategy call and we&apos;ll map your growth opportunities live.
              </p>
              <a href="/audit" className="btn-ghost inline-block">Book Free Audit Call</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
