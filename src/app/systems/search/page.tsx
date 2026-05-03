import type { Metadata } from "next";
import { SystemDetail } from "@/components/sections/system-detail";
import { getSystemDetail } from "@/data/systems-detail";
import { buildMetadata } from "@/lib/metadata";

const system = getSystemDetail("search");

export const metadata: Metadata = buildMetadata({
  title: system.hero.title,
  description: system.hero.subtitle,
  path: `/systems/${system.slug}`,
});

export default function SearchAuthorityPage() {
  return <SystemDetail system={system} />;
}
