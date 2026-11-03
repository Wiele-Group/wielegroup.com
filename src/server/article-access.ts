import { privateHeaders, type ReportEnvironment } from "./report-access";
export type ArticleEnvironment = ReportEnvironment;
export const articleCookie = "wiele_article_access";
export const articleAccessSeconds = 60 * 60 * 24 * 30;
export const articlePrivateHeaders = { ...privateHeaders };
async function signingKey(secret: string) {
  return crypto.subtle.importKey("raw", new TextEncoder().encode(secret), {name:"HMAC",hash:"SHA-256"}, false, ["sign","verify"]);
}
export async function createArticleAccess(secret: string, id: string, now = Date.now()) {
  const payload = `articles-v1.${id}.${Math.floor(now/1000)+articleAccessSeconds}`;
  const signature = await crypto.subtle.sign("HMAC", await signingKey(secret), new TextEncoder().encode(payload));
  return `${payload}.${Buffer.from(signature).toString("base64url")}`;
}
export async function validArticleAccess(secret: string, token: string, now = Date.now()) {
  if (secret.length < 32 || token.length > 500) return false;
  const parts = token.split(".");
  if (parts.length !== 4) return false;
  const [scope,id,expiry,signature] = parts;
  if (scope !== "articles-v1" || !/^[0-9a-f-]{36}$/.test(id) || !/^\d{10}$/.test(expiry) || !/^[A-Za-z0-9_-]{43}$/.test(signature)) return false;
  const seconds = Math.floor(now/1000);
  if (Number(expiry) <= seconds || Number(expiry) > seconds + articleAccessSeconds + 60) return false;
  try { return await crypto.subtle.verify("HMAC", await signingKey(secret), Buffer.from(signature,"base64url"), new TextEncoder().encode(parts.slice(0,3).join("."))); }
  catch { return false; }
}
export function readArticleAccess(request: Request) {
  return request.headers.get("cookie")?.split(";").map(v=>v.trim()).find(v=>v.startsWith(`${articleCookie}=`))?.slice(articleCookie.length+1) ?? "";
}
