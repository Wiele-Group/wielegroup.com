import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Terms",
  description:
    "Terms of service for wielegroup.com. Body copy pending counsel review and Phase 5 sign-off.",
  path: "/terms",
  noindex: true,
});

export default function TermsPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-[var(--container-px)]">
        <Badge variant="warning" size="sm" className="mb-5">
          Pending counsel review
        </Badge>
        <h1 className="text-display-md text-white text-balance mb-5">
          Terms
        </h1>
        <p className="text-body-md text-silver">
          [LEGAL REVIEW: this page needs counsel sign-off on the terms of
          service. Body copy lands in Phase 5. Page exists today so the
          Footer link doesn&apos;t 404 during the IA cutover.]
        </p>
      </div>
    </section>
  );
}
