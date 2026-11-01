import { getCloudflareContext } from "@opennextjs/cloudflare";
import { briefInputSchema, prepareBrief, type BriefEnvironment } from "@/lib/property-brief";
export const runtime="nodejs";
const reply=(data:unknown,status=200)=>Response.json(data,{status,headers:{"Cache-Control":"no-store","X-Robots-Tag":"noindex"}});
export async function POST(request:Request) {
 const origin=request.headers.get("origin");
 const host=request.headers.get("host")||new URL(request.url).host;
 const localOrigin=origin && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) && /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host) && new URL(origin).port===(host.split(":")[1]||"");
 if(!origin||(!localOrigin&&![new URL(request.url).origin,"https://wielegroup.com","https://www.wielegroup.com"].includes(origin)))return reply({error:"Please prepare your brief through the Wiele website."},403);
 if(!request.headers.get("content-type")?.includes("application/json"))return reply({error:"Unsupported request format."},415);
 const body=await request.text();if(body.length>2000)return reply({error:"Please use the brief selections."},413);
 let input:unknown;try{input=JSON.parse(body);}catch{return reply({error:"Please check the selections."},400);}
 const parsed=briefInputSchema.safeParse(input);
 if(!parsed.success)return reply({error:"Please check the brief selections."},400);
 let env:BriefEnvironment={};try{env=getCloudflareContext().env as unknown as BriefEnvironment;}catch{/* Honest guided fallback remains available in local previews. */}
 return reply(await prepareBrief(parsed.data,env,request.headers.get("cf-connecting-ip")||"local"));
}
