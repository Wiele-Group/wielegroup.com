import { z } from "zod";

export const briefInputSchema=z.object({
 goal:z.enum(["income","residence","portfolio","marketing","maintenance"]),
 property:z.enum(["Apartment","Residence","Portfolio","To discuss"]),
 location:z.enum(["Swieqi / St Julian’s","Sliema / Gżira","Central Malta","Northern Malta","Southern Malta","Gozo","Open to locations"]),
 budget:z.enum(["Under €300,000","€300,000–€600,000","€600,000–€1,000,000","Above €1,000,000","To discuss"]),
 timing:z.enum(["Within 3 months","3–6 months","6–12 months","Exploring options"]),
}).strict();
export type BriefInput=z.infer<typeof briefInputSchema>;
export const briefQuestions={
 income_basis:"What evidence separates collected rent, contracted rent and projected income?",
 operating_costs:"Which recurring owner costs and vacancy assumptions need to be included?",
 lease_terms:"Which lease terms, break clauses or commitments affect the property?",
 capital_works:"What condition issues or future capital works need independent assessment?",
 acquisition_route:"Which acquisition eligibility and ownership questions should I discuss with an independent adviser?",
 residence_fit:"Which layout, access and outdoor-space requirements matter for my own use?",
 portfolio_scope:"What purchasing structure, decision process and asset information should the portfolio brief cover?",
 marketing_authority:"What ownership or marketing authority and property particulars should I prepare?",
 presentation:"Which documents, photographs and income evidence are available for the presentation?",
 care_scope:"What work, access arrangements and specialist involvement should the maintenance brief specify?",
};
export type QuestionId=keyof typeof briefQuestions;
const defaults:Record<BriefInput["goal"],QuestionId[]>={income:["income_basis","operating_costs","lease_terms"],residence:["residence_fit","capital_works","acquisition_route"],portfolio:["portfolio_scope","income_basis","operating_costs"],marketing:["marketing_authority","presentation","income_basis"],maintenance:["care_scope","capital_works","presentation"]};
const purpose={income:"an income-led property acquisition",residence:"a residence for my own use",portfolio:"a wider property portfolio",marketing:"marketing my property",maintenance:"practical property maintenance"};
export function arrangeBrief(input:BriefInput,ids:QuestionId[]=defaults[input.goal]) {
 const summary=`I would like to discuss ${purpose[input.goal]} in Malta.\nProperty: ${input.property}.\nPreferred area: ${input.location}.\n${input.goal==="marketing"||input.goal==="maintenance"?"Budget to be discussed for the agreed scope.":`Purchase-budget range: ${input.budget}.`}\nTiming: ${input.timing}.`;
 const questions=ids.map(id=>briefQuestions[id]);
 return {summary,questions,draft:`${summary}\n\nQuestions I would like to discuss:\n${questions.map(q=>`• ${q}`).join("\n")}`};
}
export interface BriefEnvironment {
 AI?:{run:(model:string,inputs:Record<string,unknown>)=>Promise<{response?:string}>};
 AUDIT_QUEUE?:{get:(key:string)=>Promise<string|null>;put:(key:string,value:string,options:{expirationTtl:number})=>Promise<void>};
}
export async function prepareBrief(input:BriefInput,env:BriefEnvironment,identity:string) {
 const fallback={...arrangeBrief(input),mode:"guided" as const};
 if(!env.AI || !env.AUDIT_QUEUE) return fallback;
 const digest=async(value:string)=>Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(value)))).map(b=>b.toString(16).padStart(2,"0")).join("");
 const day=new Date().toISOString().slice(0,10);
 const key=`property-brief:cache:${await digest(JSON.stringify(input))}`;
 try {
  const cached=await env.AUDIT_QUEUE.get(key);
  if(cached) {const ids=JSON.parse(cached) as QuestionId[];if(ids.length===3&&ids.every(id=>id in briefQuestions))return {...arrangeBrief(input,ids),mode:"ai" as const};}
  const limitKey=`property-brief:limit:${day}:${await digest(identity+day)}`;
  const totalKey=`property-brief:daily:${day}`;
  const used=Number(await env.AUDIT_QUEUE.get(limitKey)||0);
  const total=Number(await env.AUDIT_QUEUE.get(totalKey)||0);
  if(used>=8||total>=100) return fallback;
  // KV counters are best-effort abuse controls; they are not an atomic billing cap.
  await Promise.all([env.AUDIT_QUEUE.put(limitKey,String(used+1),{expirationTtl:86400}),env.AUDIT_QUEUE.put(totalKey,String(total+1),{expirationTtl:86400})]);
  let timer:ReturnType<typeof setTimeout>|undefined;
  const inference=env.AI.run("@cf/meta/llama-3.1-8b-instruct-fp8",{
   messages:[{role:"system",content:`You organise property enquiry preparation for Wiele Properties in Malta. Choose exactly three distinct relevant question IDs from the supplied approved bank. Return JSON only: {"questions":["id","id","id"]}. Never write advice, property recommendations, numbers, availability, legal conclusions or new questions. Wiele has no advertised stock. The user's selections are preferences, not verified financial facts. Approved bank: ${JSON.stringify(briefQuestions)}`},{role:"user",content:JSON.stringify(input)}],
   response_format:{type:"json_object"},temperature:.1,max_tokens:100,
  });
  const response=await Promise.race([inference,new Promise<never>((_,reject)=>{timer=setTimeout(()=>reject(new Error("Preparation timed out")),12000);})]).finally(()=>clearTimeout(timer));
  const raw=response.response||"";
  const match=raw.match(/\{[\s\S]*\}/);
  const parsed=z.object({questions:z.array(z.enum(Object.keys(briefQuestions) as [QuestionId,...QuestionId[]])).length(3)}).safeParse(match?JSON.parse(match[0]):null);
  if(!parsed.success||new Set(parsed.data.questions).size!==3)return fallback;
  // Audience-specific boundaries: maintenance and marketing never acquire investment eligibility advice automatically.
  const ids=parsed.data.questions;
  if(input.goal==="maintenance" && !ids.includes("care_scope"))return fallback;
  if(input.goal==="marketing" && !ids.includes("marketing_authority"))return fallback;
  await env.AUDIT_QUEUE.put(key,JSON.stringify(ids),{expirationTtl:86400});
  return {...arrangeBrief(input,ids),mode:"ai" as const};
 } catch {return fallback;}
}
