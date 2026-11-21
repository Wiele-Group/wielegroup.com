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
