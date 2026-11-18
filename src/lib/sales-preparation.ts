import assetClasses from "@/data/wiele-asset-classes.json";
export { assetClasses };
export type SalesCategory = keyof typeof assetClasses;
export const salesCategories = Object.keys(assetClasses) as SalesCategory[];
export type SalesIntake = { category: SalesCategory; location: string; specification: string; price: string; currency: string; authority: string; liquidity: string; timing: string; privacy: string; evidence: string[] };
export function prepareSalesBrief(input: SalesIntake) {
 const asset=assetClasses[input.category];
 if(!asset)throw new Error("Choose a supported asset category.");
 const text=(value:string,max:number)=>value.trim().slice(0,max);
 const location=text(input.location,120),specification=text(input.specification,500),rawPrice=text(input.price,60);
 const price=/[1-9]/.test(rawPrice)?rawPrice:"";
 const available=asset.evidence.filter(value=>input.evidence.includes(value));
 const missing=asset.evidence.filter(value=>!available.includes(value));
 const questions:string[]=[];
 if(!location)questions.push("Where is the asset located, and which jurisdiction will govern the sale?");
 if(!specification)questions.push(`What are the exact ${asset.name.toLowerCase()} specifications, condition and key value drivers?`);
 if(!price)questions.push("What asking price and currency are proposed, and what evidence supports them?");
 if(input.authority==="To confirm")questions.push("Who can instruct the sale, and are there existing agency commitments?");
 if(input.liquidity==="Not assessed")questions.push("What evidence supports demand, competing supply and your sale deadline?");
 if(questions.length<3)questions.push("Which provenance, condition or maintenance claims can be documented for independent review?");
 if(questions.length<3)questions.push("What may be shared privately or publicly, and who must approve the presentation?");
 if(questions.length<3)questions.push("Which fees, channel costs and specialist roles should be agreed before an instruction?");
 const draft=["WIELE INVESTMENTS — SELLER ENQUIRY BRIEF",`Asset: ${asset.name}`,`Location: ${location||"To confirm"}`,`Specification: ${specification||"To confirm"}`,`Asking price: ${price?`${input.currency} ${price}`:"To discuss"}`,`Authority (self-described): ${input.authority}`,`Liquidity (seller's view, unverified): ${input.liquidity}`,`Timing: ${input.timing}. Privacy: ${input.privacy}.`,"Evidence marked available (not verified):",...(available.length?available.map(x=>`• ${x}`):["• None selected; availability to clarify."]),"Questions for our conversation:",...questions.slice(0,5).map(x=>`• ${x}`),"This is preparation only; no instruction, campaign, valuation or qualification has been created."].join("\n");
 return {asset,available,missing,questions:questions.slice(0,5),draft};
}
