import Image from "next/image";
import Link from "next/link";
import { articles, articlesDescription } from "@/lib/articles";
import { propertyMetadata } from "@/lib/property";
import { Arrow, PageIntro } from "@/components/property/chrome";
export const metadata=propertyMetadata("Property Intelligence & Perspectives",articlesDescription,"/articles");
export default function Articles() {
  const latest=articles[0];
  return <><PageIntro path="/articles" eyebrow="Property intelligence / Articles" title="The income. The operation. The opportunity." description="Property decisions deserve market-specific evidence. Explore our published research on Malta and European context, income-producing real estate and the questions behind an investment."/>
    <section className="article-catalogue wrap" aria-label="Investment property articles"><div className="article-catalogue-top"><span className="eyebrow">The latest perspective</span><span className="article-access-label">Registration required · Complimentary access</span></div>
    <article className="article-feature"><Link className="article-feature-image" href={`/articles/${latest.slug}`} aria-label={`Read ${latest.title}`}><Image src={latest.image} alt={latest.imageAlt} width={1536} height={1024} priority sizes="(max-width: 800px) 100vw, 54vw"/></Link><div className="article-feature-copy"><span className="eyebrow">{latest.category}</span><h2><Link href={`/articles/${latest.slug}`}>{latest.title}</Link></h2><p>{latest.excerpt}</p><div className="article-byline"><time dateTime={latest.date}>{latest.displayDate}</time><span>{latest.readingMinutes} minute read</span></div><Link className="text-link" href={`/articles/${latest.slug}`}>Explore the article <Arrow diagonal/></Link><p className="article-image-note">{latest.imageCaption}</p></div></article>
    <div className="article-editorial-note"><h2>Market by market.<br/><em>Detail by detail.</em></h2><div><p>Our Articles examine the property and the operation together: income evidence, acquisition costs, operating requirements, regulation and the route from potential to a functioning investment.</p><p>Existing trading results, contracted income and projected income are always distinguished. Each article states its geographic scope. Evidence from one country is not a substitute for research on another.</p><p className="fine-print">Register to read full articles. Marketing updates are a separate, optional choice.</p></div></div></section></>;
}
