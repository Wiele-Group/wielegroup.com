import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { LogoMark3D } from "@/components/ui/logo-mark-3d";
import { FadeIn } from "@/components/motion/fade-in";
import { PromptSimulator } from "@/components/sections/prompt-simulator";
import {
  selectFixture,
} from "@/data/prompt-simulator-fixtures";
import { siteConfig } from "@/lib/metadata";

export function HeroSection() {
  // Picked once on the server per minute. SSR and client agree.
  const fixture = selectFixture();

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 ambient-gradient pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-0 grid-pattern opacity-30 pointer-events-none"
      />

      <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 items-center">
          {/* Copy */}
          <div className="max-w-xl">
            <FadeIn>
              {/* Decorative mark — lazy-loaded so the H1 wins LCP. */}
              <div className="mb-6 -ml-2">
                <LogoMark3D size="sm" alt="" />
              </div>
            </FadeIn>
            <FadeIn delay={0.03}>
              <Badge variant="electric" size="sm" className="mb-6">
                <span aria-hidden>●</span> {siteConfig.descriptor}
              </Badge>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="text-display-xl text-white mb-6 text-balance">
                {siteConfig.tagline}
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-body-lg text-silver mb-8 max-w-lg">
                {siteConfig.description}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/audit"
                  className={buttonStyles({ variant: "primary", size: "lg" })}
                >
                  Run a Growth Audit
                </Link>
                <Link
                  href="#disciplines"
                  className={buttonStyles({ variant: "ghost", size: "lg" })}
                >
                  Explore the Agency
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-body-xs text-smoke font-mono">
                Brand · Marketing · Web · Advertising · SEO · AI Search
              </p>
            </FadeIn>
          </div>

          {/* Simulator */}
          <FadeIn delay={0.1} className="w-full">
            <PromptSimulator data={fixture} animate />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
