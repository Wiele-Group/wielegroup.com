import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { articleMetadata, findArticle } from "@/lib/articles";
import { propertyBrand } from "@/lib/property";
import { articleCookie, validArticleAccess, type ArticleEnvironment } from "@/server/article-access";
import { ArticleRegistration } from "@/components/property/article-registration";
import { StructuredData } from "@/components/property/structured-data";
export const runtime="nodejs";
export const dynamic="force-dynamic";
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props) {const article=findArticle((await params).slug);return article?articleMetadata(article):{};}
export default async function Article({params}:Props) {
  const article=findArticle((await params).slug);
  if (!article) notFound();
  const cookie=(await cookies()).get(articleCookie)?.value??"";
  let allowed=false;
  try {const env=getCloudflareContext().env as unknown as ArticleEnvironment;allowed=!!env.REPORT_ACCESS_SECRET&&await validArticleAccess(env.REPORT_ACCESS_SECRET,cookie);} catch { /* Fail closed when access configuration is unavailable. */ }
  const url=`${propertyBrand.url}/articles/${article.slug}`;
  // Never import or serialise protected prose for an unregistered request.
  const full=allowed?await import("@/server/articles/malta-short-lets"):undefined;
  return <>
    <StructuredData data={{"@context":"https://schema.org","@graph":[{"@type":"WebPage","@id":`${url}#webpage`,url,name:article.title,description:article.description,isPartOf:{"@id":`${propertyBrand.url}/#website`},breadcrumb:{"@id":`${url}#breadcrumb`},mainEntity:{"@id":`${url}#article`}}, {"@type":"Article","@id":`${url}#article`,headline:article.title,description:article.description,datePublished:article.date,dateModified:article.date,inLanguage:"en-GB",author:{"@type":"Organization",name:propertyBrand.name,"@id":`${propertyBrand.url}/#organization`},publisher:{"@id":`${propertyBrand.url}/#organization`},image:`${propertyBrand.url}${article.image}`,mainEntityOfPage:{"@id":`${url}#webpage`},isAccessibleForFree:false,hasPart:{"@type":"WebPageElement",isAccessibleForFree:false,cssSelector:".registered-article-body"}}, {"@type":"BreadcrumbList","@id":`${url}#breadcrumb`,itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${propertyBrand.url}/`},{"@type":"ListItem",position:2,name:"Articles",item:`${propertyBrand.url}/articles`},{"@type":"ListItem",position:3,name:article.title,item:url}]}]}}/>
    <article className="investment-article wrap"><header className="investment-article-header"><Link className="article-back" href="/articles">← Articles</Link><span className="eyebrow">Malta investment property / Short lets</span><h1>{article.title}</h1><p className="article-deck">For Malta property investors, Europe’s short-let market offers growing demand—and a more demanding investment test.</p><div className="article-byline"><span>Wiele Properties</span><time dateTime={article.date}>{article.displayDate}</time><span>{article.readingMinutes} minute read</span><span>{allowed?"Reader access active":"Registration required"}</span></div>{!allowed&&<Link className="text-link" href="#register">Register to read <span aria-hidden="true">↗</span></Link>}</header>
    <figure className="article-hero"><Image src={article.image} alt={article.imageAlt} width={1536} height={1024} sizes="(max-width: 1200px) 100vw, 1200px" priority/><figcaption>{article.imageCaption}</figcaption></figure>
    {full?<><div className="registered-article-body" dangerouslySetInnerHTML={{__html:full.articleHtml}}/><aside className="article-access-footer"><p>Reader access is active in this browser for 30 days from registration.</p><Link className="text-link" href="/articles">Explore Wiele Articles <span aria-hidden="true">↗</span></Link></aside></>:<><div className="article-public-intro"><p>{article.excerpt}</p><p>This article examines Malta’s operating environment, the distinction between an established going concern and a property with potential, and a conditional outlook for 2027–2028.</p></div><section id="register" className="article-gate"><div><span className="eyebrow">The complete perspective</span><h2>The evidence behind<br/><em>the income.</em></h2><p>Register to read the full article, including sourced market analysis, regulatory changes and two explanatory charts.</p><ul><li>Malta’s demand in a European context</li><li>The 2026 accommodation rules</li><li>Going-concern evidence and projected income</li><li>Operating costs and the 2027–2028 outlook</li></ul><p className="fine-print">Complimentary access to all Articles for 30 days in this browser. If access expires or you use a different browser, register again. Future marketing emails are optional.</p></div><ArticleRegistration slug={article.slug}/></section></>}
    </article>
  </>;
}
