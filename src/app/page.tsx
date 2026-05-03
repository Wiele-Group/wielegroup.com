import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { siteConfig } from "@/lib/metadata";
import { cn } from "@/lib/utils";

/**
 * Phase 1 placeholder homepage.
 * Shows the foundation (tokens + fonts + Header + Footer) is wired correctly.
 * Replaced in Phase 2 with the full 12-section blueprint.
 */
export default function HomePage() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 ambient-gradient pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-32 lg:py-40">
        <div className="max-w-2xl">
          <Badge variant="electric" size="sm" className="mb-6">
            <span aria-hidden>●</span> {siteConfig.descriptor}
          </Badge>
          <h1 className="text-display-xl text-white mb-6">
            {siteConfig.tagline}
          </h1>
          <p className="text-body-lg text-silver mb-10 max-w-xl">
            {siteConfig.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/audit"
              className={buttonStyles({ variant: "primary", size: "lg" })}
            >
              Run AI Visibility Audit
            </Link>
            <Link
              href="/platform"
              className={buttonStyles({
                variant: "ghost",
                size: "lg",
              })}
            >
              View the System
            </Link>
          </div>
        </div>

        {/* Phase 1 verification panel — confirms the foundation is wired.
            Removed in Phase 2 when the full homepage replaces this view. */}
        <aside
          aria-labelledby="phase-status"
          className={cn(
            "mt-20 max-w-md p-5 rounded-[var(--radius-lg)]",
            "bg-[var(--color-surface-glass)] backdrop-blur-[14px]",
            "border border-[var(--color-border-default)]",
          )}
        >
          <div className="flex items-center gap-2 mb-3">
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full bg-success"
            />
            <p
              id="phase-status"
              className="text-body-xs uppercase tracking-[0.12em] text-silver font-mono"
            >
              Phase 1 — Foundation
            </p>
          </div>
          <p className="text-body-sm text-cloud">
            Tokens, fonts, layout chrome, and primitives are live. The full
            homepage (12 sections, animated prompt simulator) ships in Phase 2.
          </p>
        </aside>
      </div>
    </section>
  );
}
