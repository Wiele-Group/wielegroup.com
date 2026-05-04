import { CheckCircle2 } from "lucide-react";
import type { OnboardingInput } from "@/lib/validations";

/**
 * OnboardingThankYou — post-submit confirmation state.
 *
 * Shown after a successful POST to /api/onboarding (202 + intakeId).
 * Mirrors the AuditThankYou tone — confirmation + what-happens-next +
 * reference id. No CTA spam — the next move is ours, not theirs.
 */
export function OnboardingThankYou({
  input,
  intakeId,
}: {
  input: OnboardingInput;
  intakeId: string;
}) {
  const firstName = input.name.split(" ")[0];

  return (
    <div className="glass-strip p-7 md:p-9 grid gap-5">
      <div className="flex items-start gap-3">
        <CheckCircle2
          size={26}
          className="shrink-0 text-success mt-0.5"
          aria-hidden
        />
        <div className="grid gap-1">
          <h2 className="text-heading-lg text-white tracking-tight">
            Thank you, {firstName}.
          </h2>
          <p className="text-body-md text-cloud">
            Your onboarding submission for{" "}
            <strong className="text-white">{input.company}</strong> is in.
          </p>
        </div>
      </div>

      <div className="grid gap-4 mt-2">
        <p className="text-body-md text-silver">
          A Wiele principal will personally review every detail you&apos;ve
          shared — your existing presence, your vision, your competitive
          landscape — and come back to you inside one business day with an
          initial strategic read and recommended engagement model.
        </p>

        <div className="grid gap-2.5 mt-1">
          <h3 className="text-body-sm font-semibold text-white tracking-tight">
            What happens next
          </h3>
          <ol className="grid gap-2 text-body-sm text-cloud list-decimal list-inside marker:text-electric marker:font-mono">
            <li>We review your submission and existing presence.</li>
            <li>
              We respond with an initial strategic read and recommended
              engagement model.
            </li>
            <li>
              We schedule a strategy call to align on direction, scope, and
              investment.
            </li>
            <li>Engagement kicks off with a structured 30-day onboarding sprint.</li>
          </ol>
        </div>
      </div>

      <p className="text-body-xs font-mono text-smoke mt-2">
        A confirmation email is on its way to {input.email}. Reference:{" "}
        {intakeId}
      </p>
    </div>
  );
}
