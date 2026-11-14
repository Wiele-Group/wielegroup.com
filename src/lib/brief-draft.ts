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
export function saveBriefDraft(storage: DraftStorage, draft: string, now = Date.now()) {
 if(draft.length>3000)throw new Error("Brief is too long");
 storage.setItem(BRIEF_DRAFT_KEY,JSON.stringify({draft,expires:now+lifetime}));
}
export function clearBriefDraft(storage: DraftStorage) { storage.removeItem(BRIEF_DRAFT_KEY); }
