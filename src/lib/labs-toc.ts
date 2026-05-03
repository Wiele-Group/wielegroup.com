import fs from "node:fs";
import nodePath from "node:path";
import matter from "gray-matter";

export type TocEntry = {
  level: 2 | 3;
  text: string;
  slug: string;
};

const CONTENT_DIR = nodePath.join(process.cwd(), "src/content/labs");

/**
 * Extract h2/h3 entries from raw MDX source at build time.
 * Slug algorithm matches mdx-components.tsx slugify(), so anchors line up.
 */
export function getArticleToc(slug: string): TocEntry[] {
  const filepath = nodePath.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return [];
  const raw = fs.readFileSync(filepath, "utf8");
  const { content } = matter(raw);

  const toc: TocEntry[] = [];
  let inFence = false;
  for (const line of content.split("\n")) {
    if (line.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const headingMatch = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!headingMatch) continue;
    const level = headingMatch[1].length === 2 ? 2 : 3;
    const text = headingMatch[2].replace(/`/g, "").trim();
    const tocSlug = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    toc.push({ level, text, slug: tocSlug });
  }
  return toc;
}
