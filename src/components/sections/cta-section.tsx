import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";

export function CTASection() {
  return (
    <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.10) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 grid-pattern opacity-30 pointer-events-none"
      />

      <div className="relative mx-auto max-w-3xl px-[var(--container-px)] text-center">
        <FadeIn whileInView>
          <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-5">
            Run the audit
          </p>
        </FadeIn>
        <FadeIn whileInView delay={0.05}>
          <h2 className="text-display-xl text-white text-balance mb-6">
            Find out if AI recommends you.
          </h2>
        </FadeIn>
        <FadeIn whileInView delay={0.1}>
          <p className="text-body-lg text-silver mb-10 max-w-xl mx-auto">
            14 days. One engine run. Five signals. A 30-day implementation
            roadmap delivered with a Wiele principal on the call.
          </p>
        </FadeIn>
        <FadeIn whileInView delay={0.15}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/audit"
              className={buttonStyles({ variant: "primary", size: "lg" })}
            >
              Run AI Visibility Audit
            </Link>
            <Link
              href="/contact"
              className={buttonStyles({ variant: "ghost", size: "lg" })}
            >
              Book Strategy Call
            </Link>
          </div>
        </FadeIn>
        <FadeIn whileInView delay={0.2}>
          <p className="mt-6 text-body-xs text-smoke font-mono">
            £2,500 one-off · No retainer required to start
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
