import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Mail, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { ContactForm } from "@/components/forms/contact-form";
import { FadeIn } from "@/components/motion/fade-in";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Contact — Talk to Wiele",
  description:
    "Direct line to Wiele. Strategy calls, partnership enquiries, press, or general questions.",
  path: "/contact",
});

const channels = [
  {
    icon: Calendar,
    title: "Book a strategy call",
    body: "30-minute call with a Wiele principal. Best for active engagements or sizing fit.",
    cta: { label: "Open calendar", href: "/contact#form", external: false },
  },
  {
    icon: Mail,
    title: "Email Wiele",
    body: "Direct line for partnership, press, or operational questions.",
    cta: { label: siteConfig.email, href: `mailto:${siteConfig.email}`, external: true },
  },
  {
    icon: MessageCircle,
    title: "Run an audit first",
    body: "Most engagements start with a Signal Audit — diagnose before you commit.",
    cta: { label: "Run AI Visibility Audit", href: "/audit", external: false },
  },
];

export default function ContactPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Contact", url: `${siteConfig.url}/contact` },
  ]);
  return (
    <>
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-contact" />
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 ambient-gradient pointer-events-none" />
        <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-12 md:pb-16">
          <div className="max-w-3xl">
            <FadeIn>
              <Badge variant="electric" size="sm" className="mb-5">
                Contact
              </Badge>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="text-display-xl text-white text-balance mb-5">
                Talk to Wiele.
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-body-lg text-silver max-w-2xl">
                Three ways to reach us. Pick the one that matches what you
                need; we&apos;ll route from there.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="grid gap-4 md:grid-cols-3 mb-12 md:mb-16">
            {channels.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6"
                >
                  <Icon size={20} className="text-electric mb-4" aria-hidden />
                  <h2 className="text-heading-sm text-white mb-2.5">{c.title}</h2>
                  <p className="text-body-sm text-silver flex-1">{c.body}</p>
                  <Link
                    href={c.cta.href}
                    {...(c.cta.external
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                    className={buttonStyles({
                      variant: "ghost",
                      size: "sm",
                      className: "mt-5 self-start",
                    })}
                  >
                    {c.cta.label}
                  </Link>
                </div>
              );
            })}
          </div>

          <div
            id="form"
            className="mx-auto max-w-2xl rounded-[var(--radius-xl)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6 md:p-8 scroll-mt-24"
          >
            <h2 className="text-heading-lg text-white mb-2">Send a message</h2>
            <p className="text-body-sm text-silver mb-6">
              We respond inside one business day. For audits, the form on{" "}
              <Link href="/audit" className="text-electric hover:text-electric-light underline-offset-4 hover:underline">
                /audit
              </Link>{" "}
              is the faster path.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
