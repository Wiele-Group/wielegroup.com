import { buildCoreEntityGraph } from "@/lib/schema-graph";

interface JsonLdGraphProps {
  nodes?: Record<string, unknown>[];
  includeCore?: boolean;
}

export function JsonLdGraph({ nodes = [], includeCore = true }: JsonLdGraphProps) {
  const graph = [
    ...(includeCore ? buildCoreEntityGraph() : []),
    ...nodes,
  ];

  const payload = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
      }}
    />
  );
}
