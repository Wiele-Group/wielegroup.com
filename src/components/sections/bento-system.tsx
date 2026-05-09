import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { systems } from "@/data/systems";
import { cn } from "@/lib/utils";

export function BentoSystem() {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-[var(--color-void)]/50">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
            The system
          </p>
          <h2 className="text-display-lg text-white text-balance">
            One platform. Five compounding systems. One outcome.
          </h2>
          <p className="text-body-lg text-silver mt-5">
            Wiele runs as one integrated growth engine — visibility, search,
            authority, experience, and revenue intelligence. The systems make
            each other stronger.
          </p>
        </div>

        <Reveal
          stagger={0.06}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]"
        >
          {systems.map((system, idx) => {
            const wide = system.span === "2x1";
            const Wrapper = system.slug ? Link : "div";
            const wrapperProps = system.slug
              ? { href: `/systems/${system.slug}` }
              : {};
            // Rotate strip variant per card for a "live, breathing grid" effect.
            // Most cards use the default electric sweep. Featured/wiele-os card
            // gets the violet pulse. Index-1 gets neon for variety.
            const stripVariant =
              system.id === "wiele-os"
                ? "glass-strip-pulse"
                : idx % 3 === 1
                  ? "glass-strip-neon"
                  : "";
            return (
              <Wrapper
                key={system.id}
                {...(wrapperProps as { href: string })}
                className={cn(
                  "group relative flex flex-col justify-between p-6 md:p-7",
                  "glass-strip",
                  stripVariant,
                  "focus-visible:outline-none",
                  wide && "md:col-span-2",
                )}
              >
                <div>
                  <Badge
                    variant={system.id === "wiele-os" ? "neon" : "outline"}
                    size="sm"
                    className="mb-4"
                  >
                    {system.id === "wiele-os" ? "Platform" : "System"}
                  </Badge>
                  <h3 className="text-heading-md text-white mb-2 leading-tight">
                    {system.title}
                  </h3>
                  <p className="text-body-md text-cloud mb-3">
                    {system.headline}
                  </p>
                  <p className="text-body-sm text-silver">{system.description}</p>
                </div>
                {system.slug ? (
                  <span className="mt-6 inline-flex items-center gap-1.5 text-body-sm font-medium text-electric">
                    Explore
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </span>
                ) : null}
              </Wrapper>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
