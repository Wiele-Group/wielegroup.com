import { getCloudflareContext } from "@opennextjs/cloudflare";
import { z } from "zod";
import { listingConsentVersion, findListingExample } from "@/lib/listing-examples";
import { listingAccessSeconds, listingCookie, listingPrivateHeaders, createListingAccess, type ListingEnvironment } from "@/server/listing-access";
export const runtime = "nodejs";
const input = z.object({name:z.string().trim().min(2).max(100).refine(v=>!/[\r\n]/.test(v)),email:z.string().trim().email().max(254),updates:z.boolean().optional().default(false),website:z.string().max(500).optional().default(""),token:z.string().min(1).max(2048),listing:z.string().max(100)});
const json = (data:unknown,status:number,headers:Record<string,string>={}) => Response.json(data,{status,headers:{...listingPrivateHeaders,...headers}});
export async function POST(request:Request) {
  const url = new URL(request.url);
  const origins = ["https://wielegroup.com","https://www.wielegroup.com"];
  if (["localhost","127.0.0.1"].includes(url.hostname)) origins.push(url.origin);
  if (!origins.includes(request.headers.get("origin")??"")) return json({error:"Please register through the Wiele website."},403);
  if (!request.headers.get("content-type")?.includes("application/json")) return json({error:"Unsupported request format."},415);
  let raw:string;
  try { raw=await request.text(); } catch { return json({error:"Please check your details and try again."},400); }
  if (raw.length>6000) return json({error:"Please shorten your submission."},413);
  let body:unknown;
  try { body=JSON.parse(raw); } catch { return json({error:"Please check your details and try again."},400); }
  const parsed=input.safeParse(body);
  if (!parsed.success) return json({error:"Please enter your name and a valid email address, then complete verification."},400);
  const {website,token,listing:slug,...submission}=parsed.data;
  const listing=findListingExample(slug);
  if (website || !listing) return json({error:"Registration could not be completed. Please try again from the listing."},400);
  let env:ListingEnvironment;
  try { env=getCloudflareContext().env as unknown as ListingEnvironment; } catch { return json({error:"Registration is temporarily unavailable. Please try again shortly."},503); }
  if (!env.AUDIT_QUEUE || !env.TURNSTILE_SECRET_KEY || !env.REPORT_ACCESS_SECRET || env.REPORT_ACCESS_SECRET.length<32) return json({error:"Registration is temporarily unavailable. Please try again shortly."},503);
  try {
    const verify=await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{method:"POST",body:new URLSearchParams({secret:env.TURNSTILE_SECRET_KEY,response:token}),signal:AbortSignal.timeout(10000)});
    if (!verify.ok) return json({error:"Verification is temporarily unavailable. Please retry."},503);
    const result=await verify.json() as {success?:boolean;hostname?:string};
    const hosts=["wielegroup.com","www.wielegroup.com"];
    if (["localhost","127.0.0.1"].includes(url.hostname)) hosts.push(url.hostname);
    if (!result.success || !result.hostname || !hosts.includes(result.hostname)) return json({error:"The security check expired or failed. Please retry verification."},403);
  } catch { return json({error:"Verification is temporarily unavailable. Please retry."},503); }
  const registrationId=crypto.randomUUID();
  const registeredAt=new Date().toISOString();
  let access:string;
  try {
    access=await createListingAccess(env.REPORT_ACCESS_SECRET,registrationId);
    await env.AUDIT_QUEUE.put(`listing-registration:${registrationId}`,JSON.stringify({registrationId,registeredAt,source:`/listing-examples/${listing.slug}`,submission,emailVerified:false,accessScope:"listings",marketingConsent:{accepted:submission.updates,version:listingConsentVersion,recordedAt:registeredAt}}),{expirationTtl:60*60*24*90});
  } catch { return json({error:"We could not save your registration. Please try again."},503); }
  // Access depends on a saved registration; supplementary inbox delivery may fail.
  if (env.RESEND_API_KEY) {
    try {
      const sent=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,"Content-Type":"application/json","Idempotency-Key":`listing-registration-${registrationId}`},body:JSON.stringify({from:"Wiele Investments <admin@wielegroup.com>",to:["admin@wielegroup.com"],reply_to:submission.email,subject:"Listing registration · Wiele Investments",text:`WIELE INVESTMENTS\nListing: ${listing.title}\nReference: ${registrationId}\nRegistered: ${registeredAt}\n\nName: ${submission.name}\nEmail: ${submission.email} (provided, not verified)\nOptional market/opportunity updates: ${submission.updates?"OPTED IN":"NOT OPTED IN"}\nConsent wording version: ${listingConsentVersion}\n\nSaved registration unlocks Listings in this browser for 30 days. No account or investment commitment is created.`}),signal:AbortSignal.timeout(10000)});
      if (!sent.ok) console.error("Listing registration notification unavailable; record retained");
    } catch { console.error("Listing registration notification unavailable; record retained"); }
  }
  return json({registered:true,listingUrl:`/listing-examples/${listing.slug}`},201,{"Set-Cookie":`${listingCookie}=${access}; Max-Age=${listingAccessSeconds}; Path=/; HttpOnly; Secure; SameSite=Lax`});
}
