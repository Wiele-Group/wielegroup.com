import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";

/* ─────────────────────────────────────────────────────────────
   Frontmatter schema — enforced at build time.
   Missing required field → build fails (no runtime "oops the
   article rendered without an author").
   Authority: founder reinforcement #1 from Phase 4 brief.
───────────────────────────────────────────────────────────────── */

const FrontmatterSchema = z.object({
  title: z.string().min(8).max(120),
  summary: z.string().min(40).max(400),
  category: z.enum(["Strategy", "Methodology", "Field notes", "Founder thesis"]),
  author: z.string().min(2),
  reviewer: z.string().min(2),
  /** ISO date string YYYY-MM-DD. */
  lastUpdated: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "lastUpdated must be YYYY-MM-DD"),
  /** Optional override; defaults to /og-image.png. */
  ogImage: z.string().optional(),
  /** Hide from /labs index + sitemap (drafts). */
  hidden: z.boolean().optional(),
  /** Optional FAQ list rendered after the body in an Accordion. */
  faq: z
    .array(
      z.object({
        question: z.string().min(8),
        answer: z.string().min(20),
      }),
    )
    .optional(),
  /** Optional related-system slugs rendered as links after the FAQ. */
  relatedSystems: z
    .array(z.enum(["ai-visibility", "search", "brand-authority", "web-experience"]))
    .optional(),
});

export type LabsFrontmatter = z.infer<typeof FrontmatterSchema>;

export type LabsArticle = LabsFrontmatter & {
  slug: string;
  /** Estimated reading time in minutes (rounded). */
  readingMinutes: number;
  /** Full URL for canonical / OG. */
  url: string;
};

/* ─────────────────────────────────────────────────────────────
   Filesystem reader — pure function, evaluated at build time.
   Same pattern as selectFixture(date): no runtime surprises.
───────────────────────────────────────────────────────────────── */

const CONTENT_DIR = path.join(process.cwd(), "src/content/labs");
const SITE_URL = "https://wielegroup.com";

function readArticles(): LabsArticle[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filepath = path.join(CONTENT_DIR, file);
      const raw = fs.readFileSync(filepath, "utf8");
      const { data, content } = matter(raw);

      const parsed = FrontmatterSchema.safeParse(data);
      if (!parsed.success) {
        const issues = parsed.error.issues
          .map((i) => `  · ${i.path.join(".")}: ${i.message}`)
          .join("\n");
        throw new Error(
          `\n[labs] Frontmatter validation failed for ${file}:\n${issues}\n`,
        );
      }

      const fm = parsed.data;
      const stats = readingTime(content);

      return {
        ...fm,
        slug,
        readingMinutes: Math.max(1, Math.round(stats.minutes)),
        url: `${SITE_URL}/labs/${slug}`,
      } satisfies LabsArticle;
    })
    .sort((a, b) => (a.lastUpdated < b.lastUpdated ? 1 : -1));
}

let cache: LabsArticle[] | null = null;
function articles(): LabsArticle[] {
  if (cache) return cache;
  cache = readArticles();
  return cache;
}

/* ─────────────────────────────────────────────────────────────
   Public API
───────────────────────────────────────────────────────────────── */

export function getAllArticles(includeHidden = false): LabsArticle[] {
  return includeHidden ? articles() : articles().filter((a) => !a.hidden);
}

export function getArticleBySlug(slug: string): LabsArticle | undefined {
  return articles().find((a) => a.slug === slug);
}

export function getAllCategories(): string[] {
  const set = new Set<string>();
  for (const a of getAllArticles()) set.add(a.category);
  return Array.from(set).sort();
}

export function getAllSlugs(includeHidden = false): string[] {
  return getAllArticles(includeHidden).map((a) => a.slug);
}
