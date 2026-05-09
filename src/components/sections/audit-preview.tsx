import Link from "next/link";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { FadeIn } from "@/components/motion/fade-in";
import { PromptSimulator } from "@/components/sections/prompt-simulator";
import { auditPreviewSteps } from "@/data/homepage";
import { promptSimulatorFixtures } from "@/data/prompt-simulator-fixtures";

export function AuditPreview() {
  // Always show the SaaS fixture in audit preview — gives the section a stable,
  // recognisable visual anchor across visits.
  const showcase = promptSimulatorFixtures[0];

  return (
    <section className="py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 items-center">
          {/* Copy + step list */}
          <div>
            <Badge variant="electric" size="sm" className="mb-4">
              Signal Audit
            </Badge>
            <h2 className="text-display-lg text-white text-balance mb-5">
              See where AI places you.
            </h2>
            <p className="text-body-lg text-silver mb-8 max-w-lg">
              In 14 days, you get the engine output above — for your brand,
              your market, your competitors. No mock fixtures. Your actual
              citation graph, score, and gap report.
            </p>

            <Reveal stagger={0.06} className="flex flex-col gap-3 mb-8">
              {auditPreviewSteps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] px-4 py-3"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-electric/15 text-electric"
                  >
                    <Check size={12} />
                  </span>
                  <span className="text-body-sm text-cloud">
                    <span className="font-mono text-smoke mr-2">
                      0{i + 1}
                    </span>
                    {step}
                  </span>
                </div>
              ))}
            </Reveal>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/audit"
                className={buttonStyles({ variant: "featured", size: "lg" })}
              >
                Run a Growth Audit · £2,500
              </Link>
              <Link
                href="/platform"
                className={buttonStyles({ variant: "ghost", size: "lg" })}
              >
                See the methodology
              </Link>
            </div>
          </div>

          {/* Static simulator — the deliverable preview */}
          <FadeIn whileInView className="w-full">
            <div className="relative">
              <p className="absolute -top-7 left-1 text-body-xs font-mono uppercase tracking-[0.14em] text-smoke">
                Engine output · Sample
              </p>
              <PromptSimulator data={showcase} animate={false} />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
