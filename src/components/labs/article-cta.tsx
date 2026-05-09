import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";

export function ArticleCta() {
  return (
    <section className="mt-12 pt-10 border-t border-[var(--color-border-default)]">
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-7 text-center">
        <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-3">
          Run the audit
        </p>
        <h2 className="text-heading-lg text-white text-balance mb-3">
          Find out if AI recommends you.
        </h2>
        <p className="text-body-md text-silver mb-6 max-w-md mx-auto">
          Apply this thinking to your brand. £2,500. 14 days. Engine output,
          gap report, 30-day roadmap.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/audit" className={buttonStyles({ variant: "featured", size: "md" })}>
            Run a Growth Audit
          </Link>
          <Link href="/labs" className={buttonStyles({ variant: "ghost", size: "md" })}>
            More field notes
          </Link>
        </div>
      </div>
    </section>
  );
}
