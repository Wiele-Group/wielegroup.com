import type { Metadata } from "next";
import { OnboardingForm } from "@/components/forms/onboarding-form";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, howToSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata, siteConfig } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title:
    "Client Onboarding — start your engagement with Wiele Group",
  description:
    "Complete the Wiele onboarding questionnaire so a principal can review your goals, existing presence, and target market — and come back with a tailored strategy inside one business day.",
  path: "/onboarding",
});

export default function OnboardingPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Onboarding", url: `${siteConfig.url}/onboarding` },
  ]);
  const onboardingService = serviceSchema({
    name: `${siteConfig.name} Client Onboarding`,
    description:
      "Structured intake for new Wiele engagements. Captures goals, existing presence, target market, competitors, and constraints so a principal can return a tailored strategic read inside one business day.",
    url: `${siteConfig.url}/onboarding`,
    serviceType: "Client onboarding",
  });
  const onboardingHowTo = howToSchema({
    name: "How to start a Wiele engagement",
    description:
      "Five-step intake the founding cohort runs to begin a Wiele engagement.",
    totalTime: "PT10M",
    steps: [
      {
        name: "Tell us who you are",
        text: "Founder, decision-maker, company name, role, and the website we should be looking at.",
      },
      {
        name: "Frame the engagement",
        text: "Vision in 12–24 months, primary objectives, ideal customer, and the markets you operate in.",
      },
      {
        name: "Map current presence",
        text: "Social, content, paid, partner, and analyst surfaces — wherever your brand currently lives.",
      },
      {
        name: "Name competitors and constraints",
        text: "Direct competitors, indirect alternatives, urgency, and any constraints we need to design around.",
      },
      {
        name: "Submit and receive a tailored read",
        text: "A Wiele principal reviews every line and returns a strategic read plus engagement recommendation inside one business day.",
      },
    ],
  });

  return (
    <>
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-onboarding" />
      <JsonLd schema={onboardingService} id="schema-service-onboarding" />
      <JsonLd schema={onboardingHowTo} id="schema-howto-onboarding" />

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 ambient-gradient pointer-events-none"
        />
        <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-10 md:pb-14">
          <div className="max-w-3xl">
            <FadeIn>
              <Badge variant="electric" size="sm" className="mb-5">
                <span aria-hidden>●</span> Client Onboarding
              </Badge>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="text-display-xl text-white text-balance mb-5">
                Start the engagement.
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-body-lg text-silver max-w-2xl">
                Complete the questionnaire and a Wiele principal will review
                every detail personally — your existing presence, your vision,
                your market, your competition. We come back inside one
                business day with a tailored strategic read and a recommended
                engagement model.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-5 text-body-xs font-mono text-smoke">
                Brand · Marketing · Web · Advertising · SEO · AI Search ·
                ~10 minutes
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 lg:py-16">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-3xl mx-auto">
            <OnboardingForm />
          </div>
        </div>
      </section>
    </>
  );
}
