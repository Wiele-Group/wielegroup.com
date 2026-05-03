import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { proofPlaceholders } from "@/data/homepage";

export function ProofSection() {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-[var(--color-obsidian)]/40">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-xl">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              Proof
            </p>
            <h2 className="text-display-lg text-white text-balance">
              Engine output. Real engagements. Live in Phase 3.
            </h2>
            <p className="text-body-lg text-silver mt-5">
              Every Wiele case study renders the same engine panel you see in
              the hero — applied to a real brand, real prompt surface, real
              before/after.
            </p>
          </div>
          <Link
            href="/proof"
            className={buttonStyles({ variant: "ghost", size: "md" })}
          >
            See all case studies
            <ArrowUpRight size={15} aria-hidden />
          </Link>
        </div>

        <Reveal stagger={0.06} className="grid gap-4 md:grid-cols-3">
          {proofPlaceholders.map((proof) => (
            <article
              key={proof.headline}
              className="group flex flex-col rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6 min-h-[14rem]"
            >
              <Badge variant="outline" size="sm" className="mb-4 self-start">
                {proof.sector}
              </Badge>
              <h3 className="text-heading-md text-white leading-tight mb-3">
                {proof.headline}
              </h3>
              <p className="text-body-sm text-silver flex-1">{proof.summary}</p>
              <div className="mt-5 pt-4 border-t border-[var(--color-border-default)]">
                <span className="text-body-xs font-mono text-smoke">
                  Case Study Pending · Phase 3
                </span>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
