import type { AnySchema } from "@/lib/schema";

/**
 * Server component that injects schema.org JSON-LD into the SSR HTML.
 *
 * Authority: founder reinforcement #2 from Phase 4 brief.
 *
 * Hardening (binding):
 * - Typed schema prop, not free-form `Record<string, unknown>` —
 *   discriminated union over 8 supported @types via AnySchema.
 * - The escaping rule: a literal `</script>` substring inside any
 *   string field would close the surrounding <script> tag. Replacing
 *   every `<` with `<` prevents that. JSON spec allows the
 *   escape; the JSON still parses identically. This is the standard
 *   pattern recommended by OWASP and Next.js docs.
 * - Rendered as a plain <script> with dangerouslySetInnerHTML so the
 *   payload ships in the initial server-rendered HTML — what crawlers
 *   and AI engines parse on first byte. next/script's `<Script>` with
 *   strategy="afterInteractive" inserts after hydration and is NOT
 *   suitable for SEO-critical schema.
 *
 * Each route imports the helpers it needs from @/lib/schema and passes
 * them as the `schema` prop. Multiple <JsonLd> instances per route OK.
 */
export function JsonLd({
  schema,
  id,
}: {
  schema: AnySchema;
  /** Unique id helps deduplicate when the same schema appears on multiple routes. */
  id?: string;
}) {
  const json = JSON.stringify(schema).replace(/</g, "\\u003c");
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
