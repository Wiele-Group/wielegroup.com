import type { Metadata } from "next";
import { SystemDetail } from "@/components/sections/system-detail";
import { getSystemDetail } from "@/data/systems-detail";
import { buildMetadata } from "@/lib/metadata";

const system = getSystemDetail("ai-visibility");

export const metadata: Metadata = buildMetadata({
  title: `${system.hero.title} — Lead system`,
  description: system.hero.subtitle,
  path: `/systems/${system.slug}`,
});

export default function AiVisibilityPage() {
  return <SystemDetail system={system} />;
}
