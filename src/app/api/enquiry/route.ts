import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { z } from "zod";
import { correspondenceAssets, correspondenceCorridors, correspondenceDesks, correspondenceRoles } from "@/lib/contact-locales/correspondence";
import { propertyOnboardingSchema, onboardingFieldLabels } from "@/lib/property-onboarding";
import { assetMandateSubmissionSchema, mandateEnquiryRoute, mandateNames, mandateNotification } from "@/schemas/assetMandateIntake";
export const runtime = "nodejs";
const correspondenceSchema = z.object({
 desk: z.enum(correspondenceDesks),
 role: z.enum(correspondenceRoles),
 corridor: z.enum(correspondenceCorridors),
 asset: z.enum(correspondenceAssets),
});
const inputSchema = z.object({name:z.string().trim().min(2).max(100),email:z.string().trim().email().max(254),phone:z.string().trim().max(40).optional().default(""),interest:z.enum(["marketing","buying","consortium","general","maintenance","luxury-assets"]),assetCategory:z.enum(["yachts","classic-cars"]).optional(),assetIntent:z.enum(["acquire","offer"]).optional(),message:z.string().trim().min(10).max(3000),website:z.string().max(500).optional().default(""),token:z.string().min(1).max(2048),correspondence:correspondenceSchema.optional(),onboarding:propertyOnboardingSchema.optional(),mandate:assetMandateSubmissionSchema.optional()}).superRefine((data,ctx)=>{if(data.interest === "luxury-assets" ? !data.assetCategory || !data.assetIntent : data.assetCategory !== undefined || data.assetIntent !== undefined) ctx.addIssue({code:z.ZodIssueCode.custom,message:"Select an asset category and enquiry purpose for a luxury asset enquiry.",path:["assetCategory"]});if(data.onboarding && data.interest !== (data.onboarding.kind === "investor" ? "buying" : "marketing")) ctx.addIssue({code:z.ZodIssueCode.custom,message:"Invalid onboarding route",path:["interest"]});
 if (data.mandate) {
  const expected = mandateEnquiryRoute(data.mandate.details.assetCategory);
  if (data.onboarding || data.interest !== expected.interest || data.assetCategory !== expected.assetCategory || data.assetIntent !== expected.assetIntent)
   ctx.addIssue({code:"custom",message:"Invalid seller mandate route",path:["mandate"]});
 }
});
interface EnquiryEnvironment { AUDIT_QUEUE?: {put:(key:string,value:string,options:{expirationTtl:number})=>Promise<void>}; TURNSTILE_SECRET_KEY?:string; RESEND_API_KEY?:string; }
function json(data:unknown,status:number) { return NextResponse.json(data,{status,headers:{"Cache-Control":"no-store"}}); }
export async function POST(request:Request) {
 const origin=request.headers.get("origin");
 const host=new URL(request.url).host;
 if(!origin || ![new URL(request.url).origin,"https://wielegroup.com","https://www.wielegroup.com"].includes(origin)) return json({error:"Please send your enquiry through this website."},403);
 if(!request.headers.get("content-type")?.includes("application/json")) return json({error:"Unsupported request format."},415);
 let raw:string;try {raw=await request.text();}catch{return json({error:"Please check your enquiry and try again."},400);}
 if(raw.length>18000) return json({error:"Your message is too long."},413);
 let body:unknown;try{body=JSON.parse(raw);}catch{return json({error:"Please check your enquiry and try again."},400);}
 if(raw.length>10000 && !(body && typeof body==="object" && "mandate" in body)) return json({error:"Your message is too long."},413);
 const parsed=inputSchema.safeParse(body);
 if(!parsed.success) return json({error:"Please check your name, email, message (10–3,000 characters) and all required brief fields."},400);
 const {website,token,...submission}=parsed.data;
 if(website) return json({ticketId:crypto.randomUUID()},202);
 let env:EnquiryEnvironment;try {env=getCloudflareContext().env as unknown as EnquiryEnvironment;}catch{return json({error:"Online enquiries are temporarily unavailable. Please email admin@wielegroup.com."},503);}
 if(!env.AUDIT_QUEUE || !env.TURNSTILE_SECRET_KEY) return json({error:"Online enquiries are temporarily unavailable. Please email admin@wielegroup.com."},503);
 try {
  const verify=await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{method:"POST",body:new URLSearchParams({secret:env.TURNSTILE_SECRET_KEY,response:token}),signal:AbortSignal.timeout(10000)});
  if(!verify.ok) return json({error:"Security verification is temporarily unavailable. Please retry."},503);
  const result=await verify.json() as {success?:boolean;hostname?:string};
  if(!result.success || !result.hostname || !["wielegroup.com","www.wielegroup.com",host.split(":")[0]].includes(result.hostname)) return json({error:"The security check expired or failed. Please retry verification."},403);
 }catch {return json({error:"Security verification is temporarily unavailable. Please retry."},503);}
 const onboardingSummary=submission.onboarding ? `\n\n${submission.onboarding.kind.toUpperCase()} ONBOARDING BRIEF\n${Object.entries(submission.onboarding.details).map(([key,value])=>`${onboardingFieldLabels[key] || key}: ${value}`).join("\n")}\nProcess acknowledgement: accepted (initial enquiry only; version 2026-10-31)` : "";
 const mandateSummary = submission.mandate ? `

SELLER MANDATE INTAKE
${mandateNotification(submission.mandate.details)}
Process acknowledgement: accepted (initial enquiry only; version 2026-11-21)` : "";
 const correspondence = submission.correspondence
  ? `\n\nPRIVATE CORRESPONDENCE\nDesk: ${submission.correspondence.desk}\nRole: ${submission.correspondence.role}\nCorridor: ${submission.correspondence.corridor}\nAsset: ${submission.correspondence.asset}`
  : "";
 const ticketId=crypto.randomUUID();
 const queuedAt=new Date().toISOString();
 try {await env.AUDIT_QUEUE.put(`property-enquiry:${ticketId}`,JSON.stringify({ticketId,queuedAt,submission,...(submission.onboarding ? {onboardingVersion:"2026-10-31"} : {}),...(submission.mandate ? {mandateVersion:"2026-11-21"} : {}),notification:"pending"}),{expirationTtl:60*60*24*90});}
 catch {console.error("Property enquiry storage failed");return json({error:"Your enquiry could not be saved. Please email admin@wielegroup.com."},503);}
 // Durable storage is the success boundary; notification failure never loses the enquiry.
 if(env.RESEND_API_KEY) {
  try {
   const sent=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,"Content-Type":"application/json","Idempotency-Key":`property-enquiry-${ticketId}`},body:JSON.stringify({from:"Wiele Investments <admin@wielegroup.com>",to:["admin@wielegroup.com"],reply_to:submission.email,subject:submission.mandate ? `Seller mandate intake · ${mandateNames[submission.mandate.details.assetCategory]}` : submission.interest === "luxury-assets" ? `Luxury asset enquiry · ${submission.assetCategory} · ${submission.assetIntent}` : submission.onboarding ? `Property onboarding · ${submission.onboarding.kind}` : `Property enquiry · ${submission.interest}`,text:`WIELE INVESTMENTS\nReference: ${ticketId}\nReceived: ${queuedAt}\n\nName: ${submission.name}\nEmail: ${submission.email}\nPhone: ${submission.phone || "Not supplied"}\nInterest: ${submission.interest}${submission.assetCategory ? `\nAsset category: ${submission.assetCategory}\nAsset enquiry: ${submission.assetIntent}` : ""}\n\n${submission.message}${correspondence}${onboardingSummary}${mandateSummary}`}),signal:AbortSignal.timeout(10000)});
   if(!sent.ok) console.error("Property enquiry notification rejected",sent.status);
  }catch{console.error("Property enquiry notification unavailable; enquiry retained in storage");}
 }
 return json({ticketId,queuedAt},202);
}
