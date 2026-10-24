import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { z } from "zod";
export const runtime = "nodejs";
const inputSchema = z.object({name:z.string().trim().min(2).max(100),email:z.string().trim().email().max(254),phone:z.string().trim().max(40).optional().default(""),interest:z.enum(["marketing","buying","general"]),message:z.string().trim().min(10).max(3000),website:z.string().max(500).optional().default(""),token:z.string().min(1).max(2048)});
interface EnquiryEnvironment { AUDIT_QUEUE?: {put:(key:string,value:string,options:{expirationTtl:number})=>Promise<void>}; TURNSTILE_SECRET_KEY?:string; RESEND_API_KEY?:string; }
function json(data:unknown,status:number) { return NextResponse.json(data,{status,headers:{"Cache-Control":"no-store"}}); }
export async function POST(request:Request) {
 const origin=request.headers.get("origin");
 const host=new URL(request.url).host;
 if(!origin || ![new URL(request.url).origin,"https://wielegroup.com","https://www.wielegroup.com"].includes(origin)) return json({error:"Please send your enquiry through this website."},403);
 if(!request.headers.get("content-type")?.includes("application/json")) return json({error:"Unsupported request format."},415);
 let raw:string;try {raw=await request.text();}catch{return json({error:"Please check your enquiry and try again."},400);}
 if(raw.length>10000) return json({error:"Your message is too long."},413);
 let body:unknown;try{body=JSON.parse(raw);}catch{return json({error:"Please check your enquiry and try again."},400);}
 const parsed=inputSchema.safeParse(body);
 if(!parsed.success) return json({error:"Please check your name, email and message (10–3,000 characters)."},400);
 const {website,token,...submission}=parsed.data;
 if(website) return json({ticketId:crypto.randomUUID()},202);
 let env:EnquiryEnvironment;try {env=getCloudflareContext().env as unknown as EnquiryEnvironment;}catch{return json({error:"Online enquiries are temporarily unavailable. Please email admin@wielegroup.com or use WhatsApp."},503);}
 if(!env.AUDIT_QUEUE || !env.TURNSTILE_SECRET_KEY) return json({error:"Online enquiries are temporarily unavailable. Please email admin@wielegroup.com or use WhatsApp."},503);
 try {
  const verify=await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{method:"POST",body:new URLSearchParams({secret:env.TURNSTILE_SECRET_KEY,response:token}),signal:AbortSignal.timeout(10000)});
  if(!verify.ok) return json({error:"Security verification is temporarily unavailable. Please retry."},503);
  const result=await verify.json() as {success?:boolean;hostname?:string};
  if(!result.success || !result.hostname || !["wielegroup.com","www.wielegroup.com",host.split(":")[0]].includes(result.hostname)) return json({error:"The security check expired or failed. Please retry verification."},403);
 }catch {return json({error:"Security verification is temporarily unavailable. Please retry."},503);}
 const ticketId=crypto.randomUUID();
 const queuedAt=new Date().toISOString();
 try {await env.AUDIT_QUEUE.put(`property-enquiry:${ticketId}`,JSON.stringify({ticketId,queuedAt,submission,notification:"pending"}),{expirationTtl:60*60*24*90});}
 catch {console.error("Property enquiry storage failed");return json({error:"Your enquiry could not be saved. Please email admin@wielegroup.com or use WhatsApp."},503);}
 // Durable storage is the success boundary; notification failure never loses the enquiry.
 if(env.RESEND_API_KEY) {
  try {
   const sent=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,"Content-Type":"application/json","Idempotency-Key":`property-enquiry-${ticketId}`},body:JSON.stringify({from:"Wiele Property <admin@wielegroup.com>",to:["admin@wielegroup.com"],reply_to:submission.email,subject:`Property enquiry · ${submission.interest}`,text:`WIELE PROPERTY\nReference: ${ticketId}\nReceived: ${queuedAt}\n\nName: ${submission.name}\nEmail: ${submission.email}\nPhone: ${submission.phone || "Not supplied"}\nInterest: ${submission.interest}\n\n${submission.message}`}),signal:AbortSignal.timeout(10000)});
   if(!sent.ok) console.error("Property enquiry notification rejected",sent.status);
  }catch{console.error("Property enquiry notification unavailable; enquiry retained in storage");}
 }
 return json({ticketId,queuedAt},202);
}
