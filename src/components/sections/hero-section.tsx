import Link from "next/link";
import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { HeroBackdrop } from "@/components/sections/hero-backdrop";
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
      <HeroBackdrop />

      <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 items-center">
          {/* Copy */}
          <div className="max-w-xl">
            <FadeIn>
              <Badge variant="electric" size="sm" className="mb-6">
                <span aria-hidden>●</span> {siteConfig.descriptor}
              </Badge>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="text-display-xl text-white mb-4 text-balance">
                {siteConfig.tagline}
              </h1>
            </FadeIn>
            <FadeIn delay={0.075}>
              <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-electric/30 bg-electric/5">
                <Shield size={12} className="text-electric" aria-hidden />
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-electric">
                  AI Visibility Defense built into every engagement
                </span>
              </div>
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
            <FadeIn delay={0.18}>
              <hr
                className="duality-hairline mt-6 mb-3"
                aria-hidden="true"
              />
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-body-xs text-smoke font-mono">
                Brand · Marketing · Web · Advertising · SEO · AI Search
              </p>
            </FadeIn>
          </div>

          {/* Simulator */}
          <FadeIn delay={0.1} className="w-full wg-depth-scene">
            <div className="wg-depth-card">
              <PromptSimulator data={fixture} animate />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
