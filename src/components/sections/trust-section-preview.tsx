import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { trustPoints } from "@/data/homepage";

export function TrustSectionPreview() {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
            Trust
          </p>
          <h2 className="text-display-lg text-white text-balance">
            AI-native, not AI-opaque.
          </h2>
          <p className="text-body-lg text-silver mt-5">
            How Wiele uses AI is part of the deliverable, not a footnote. Six
            commitments that make the difference between a system you can buy
            from and a black box you can&apos;t.
          </p>
        </div>

        <Reveal
          stagger={0.05}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6"
            >
              <ShieldCheck
                size={18}
                className="text-electric shrink-0"
                aria-hidden
              />
              <h3 className="text-heading-sm text-white leading-tight">
                {point.title}
              </h3>
              <p className="text-body-sm text-silver">{point.body}</p>
            </div>
          ))}
        </Reveal>

        <div className="mt-10 flex justify-center">
          <Link
            href="/trust"
            className={buttonStyles({ variant: "ghost", size: "md" })}
          >
            Read the full trust commitments
            <ArrowUpRight size={15} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
