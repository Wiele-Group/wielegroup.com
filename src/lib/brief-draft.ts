export const BRIEF_DRAFT_KEY = "wiele-property-brief";
const lifetime = 30 * 60 * 1000;
type DraftStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;
export function readBriefDraft(storage: DraftStorage, now = Date.now()): string | null {
 try {
  const raw=storage.getItem(BRIEF_DRAFT_KEY); if(!raw)return null;
  const value=JSON.parse(raw);
  if(typeof value.draft!=="string" || value.draft.length>3000 || typeof value.expires!=="number" || value.expires<=now) { storage.removeItem(BRIEF_DRAFT_KEY); return null; }
  return value.draft;
 } catch { return null; }
}
export type MandateHandoff = { asset: string; location?: string; currency?: string; available?: string[] };
export function readMandateHandoff(storage: DraftStorage, now = Date.now()): MandateHandoff | null {
 if (readBriefDraft(storage, now) === null) return null;
 try {
  const data = JSON.parse(storage.getItem(BRIEF_DRAFT_KEY) ?? "").mandate;
  if (!data || !["property","yachts","classic-cars"].includes(data.asset)) return null;
  return {
   asset:data.asset,
   location:typeof data.location === "string" ? data.location.slice(0,140) : undefined,
   currency:["GBP","EUR","ZAR","USD"].includes(data.currency) ? data.currency : undefined,
   available:Array.isArray(data.available) ? data.available.filter((key: unknown) => typeof key === "string").slice(0,5) : undefined,
  };
 } catch { return null; }
}
export function saveBriefDraft(storage: DraftStorage, draft: string, now = Date.now(), mandate?: MandateHandoff) {
 if(draft.length>3000)throw new Error("Brief is too long");
 storage.setItem(BRIEF_DRAFT_KEY,JSON.stringify({draft,expires:now+lifetime,...(mandate ? { mandate } : {})}));
}
export function clearBriefDraft(storage: DraftStorage) { storage.removeItem(BRIEF_DRAFT_KEY); }

// Read only the structured fields that the builders put before free-text asset notes.
export function summariseBriefDraft(draft: string): { label: string; value: string }[] {
 const lines = draft.split(/\r?\n/);
 const valuation = /^Indicative valuation enquiry — (Property|Yachts|Classic cars)$/.exec(lines[0]);
 const homepageBrief = /^Asset: (Property|Yachts|Classic cars)\.$/.test(lines[0]);
 if (!valuation && !homepageBrief) return [];

 const fields: Record<string, string> = {
  Asset: "Asset",
  Objective: "Objective",
  "Property purpose": "Property purpose",
  "Country or location": "Location",
  "Purchase budget": "Budget",
  "Asking price, if set": "Asking price",
  Timing: "Timing",
  "Country / locality": "Location",
  Purpose: "Purpose",
  "Indicative budget or asset value": "Indicative amount",
 };
 const summary = new Map<string, string>();
 if (valuation) summary.set("Asset", valuation[1]);
 for (const line of lines.slice(valuation ? 1 : 0)) {
  if (valuation && line === "Starting point: illustrative estimator inputs. Confirm any sample figures against the asset.") {
   summary.set("Basis", "Illustrative estimator example");
   break;
  }
  const boundary = line.indexOf(": ");
  const key = line.slice(0, boundary);
  if (boundary < 0 || !Object.hasOwn(fields, key)) break;
  const value = line.slice(boundary + 2).trim();
  if (value && !summary.has(fields[key])) summary.set(fields[key], homepageBrief ? value.replace(/\.$/, "") : value);
 }
 return Array.from(summary, ([label, value]) => ({ label, value }));
}
