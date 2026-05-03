import { Clock, ShieldCheck, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/**
 * Author + reviewer + last-updated + reading-time row.
 * Visible on the article page; also encodes the same facts the JSON-LD
 * Article schema carries, so AI engines + crawlers see consistent metadata.
 *
 * Phase 7.4: typed against the minimal shape (not LabsArticle) so callers
 * can pass either the build-time fs-derived LabsArticle OR the runtime-safe
 * ArticleManifestEntry without conversion. This unblocks /labs/<slug> on
 * Cloudflare Workers where fs reads fail silently.
 */
type ArticleMetaProps = {
  category: string;
  author: string;
  reviewer: string;
  readingMinutes: number;
  lastUpdated: string;
};

export function ArticleMeta({ article }: { article: ArticleMetaProps }) {
  const formatted = new Date(article.lastUpdated).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-[var(--color-border-default)]">
      <Badge variant="electric" size="sm">
        {article.category}
      </Badge>
      <span className="flex items-center gap-1.5 text-body-xs font-mono text-silver">
        <User size={12} aria-hidden />
        {article.author}
      </span>
      <span className="flex items-center gap-1.5 text-body-xs font-mono text-silver">
        <ShieldCheck size={12} aria-hidden />
        Reviewed by {article.reviewer}
      </span>
      <span className="flex items-center gap-1.5 text-body-xs font-mono text-silver">
        <Clock size={12} aria-hidden />
        {article.readingMinutes} min read
      </span>
      <span className="text-body-xs font-mono text-smoke ml-auto">
        Updated {formatted}
      </span>
    </div>
  );
}
