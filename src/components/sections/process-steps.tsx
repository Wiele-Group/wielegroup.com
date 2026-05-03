import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { processSteps } from "@/data/homepage";
import { Fragment } from "react";

export function ProcessSteps() {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-[var(--color-obsidian)]/40">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
            The process
          </p>
          <h2 className="text-display-lg text-white text-balance">
            Map. Build. Compound.
          </h2>
          <p className="text-body-lg text-silver mt-5">
            Wiele engagements run on a three-stage rhythm. Diagnose what AI
            engines see. Engineer what they cite. Compound the asset.
          </p>
        </div>

        <Reveal
          stagger={0.1}
          className="grid gap-6 md:grid-cols-3 md:gap-4 lg:gap-8"
        >
          {processSteps.map((step, i) => (
            <Fragment key={step.label}>
              <div className="relative rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-7">
                <p className="text-body-xs font-mono text-electric mb-4">
                  {step.label}
                </p>
                <h3 className="text-heading-lg text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-body-md text-silver">{step.body}</p>
              </div>
              {i < processSteps.length - 1 ? (
                <ArrowRight
                  aria-hidden
                  size={28}
                  className="hidden md:block self-center mx-auto text-smoke -mx-2"
                />
              ) : null}
            </Fragment>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
