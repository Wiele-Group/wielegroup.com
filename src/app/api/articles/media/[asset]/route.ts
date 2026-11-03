import { getCloudflareContext } from "@opennextjs/cloudflare";
import { articlePrivateHeaders, readArticleAccess, validArticleAccess, type ArticleEnvironment } from "@/server/article-access";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function GET(request:Request,{params}:{params:Promise<{asset:string}>}) {
  const {asset}=await params;
  if (!["demand-growth","occupancy-sensitivity"].includes(asset)) return new Response(null,{status:404,headers:articlePrivateHeaders});
  let env:ArticleEnvironment;
  try {env=getCloudflareContext().env as unknown as ArticleEnvironment;} catch {return new Response(null,{status:503,headers:articlePrivateHeaders});}
  if (!env.REPORT_ACCESS_SECRET || !await validArticleAccess(env.REPORT_ACCESS_SECRET,readArticleAccess(request))) return new Response(null,{status:401,headers:articlePrivateHeaders});
  const {articleMedia}=await import("@/server/articles/media");
  return new Response(Buffer.from(articleMedia[asset],"base64"),{headers:{...articlePrivateHeaders,"Content-Type":"image/png"}});
}
