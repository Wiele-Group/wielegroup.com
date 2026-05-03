import { proofStripItems } from "@/data/homepage";

export function ProofStrip() {
  return (
    <section
      aria-label="Capability strip"
      className="border-y border-[var(--color-border-default)] bg-[var(--color-obsidian)]/50"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {proofStripItems.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-2 text-body-xs uppercase tracking-[0.18em] font-mono text-silver"
            >
              <span aria-hidden className="block h-1 w-1 rounded-full bg-electric" />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
