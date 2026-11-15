"use client";
import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

const measurementId = "G-8YCESQ46BH";
// Load the current Google tag; keep events directed to the existing Wiele stream.
const googleTagId = "GT-5R652DLW";
const storageKey = "wiele-analytics-consent-v1";
const changeEvent = "wiele-consent-change";
let loaded = false;
let configured = false;
let lastPage = "";

declare global {
 interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; }
}
function choice() { try { return localStorage.getItem(storageKey); } catch { return null; } }
function subscribe(callback: () => void) {
 window.addEventListener(changeEvent, callback); window.addEventListener("storage", callback);
 return () => { window.removeEventListener(changeEvent, callback); window.removeEventListener("storage", callback); };
}
function setChoice(value: "accepted" | "rejected") {
 try { localStorage.setItem(storageKey,value); } catch { /* Keep browsing available without local storage. */ }
 window.dispatchEvent(new Event(changeEvent));
 if (value === "rejected") {
  lastPage = "";
  (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = true;
  window.gtag?.("consent", "update", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  document.cookie.split(";").forEach(cookie => {
   const name = cookie.trim().split("=")[0];
   if (name === "_ga" || name.startsWith("_ga_")) {
    for (const domain of ["", "; domain=wielegroup.com", "; domain=.wielegroup.com"]) document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax; Secure`;
   }
  });
 }
}
export function trackPropertyEvent(name: "seller_preparation" | "brief_start" | "brief_step" | "brief_transfer" | "brief_storage_error" | "asset_perspective" | "generate_lead" | "contact_click" | "report_download_click" | "algorithm_action" | "algorithm_brief_open" | "property_journey", props: Record<string,string> = {}) {
 if (choice() !== "accepted") return;
 window.gtag?.("event", name, { ...props, send_to: measurementId });
}
export function PropertyAnalytics() {
 const consent = useSyncExternalStore(subscribe, choice, () => null);
 const pathname = usePathname();
 useEffect(() => {
  if (consent !== "accepted") return;
  (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = false;
  window.dataLayer ??= [];
  // Google tag commands use the standard gtag arguments queue.
  // eslint-disable-next-line prefer-rest-params
  window.gtag ??= function () { window.dataLayer?.push(arguments); };
  if (!configured) {
   window.gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
   window.gtag("consent", "update", { analytics_storage: "granted" });
   window.gtag("js", new Date());
   window.gtag("config", measurementId, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
   configured = true;
  } else window.gtag("consent", "update", { analytics_storage: "granted" });
  if (!loaded) {
   const script = document.createElement("script"); script.async = true;
   script.src = `https://www.googletagmanager.com/gtag/js?id=${googleTagId}`;
   document.head.appendChild(script); loaded = true;
  }
  if (lastPage !== pathname) {
   window.gtag("event", "page_view", { send_to: measurementId, page_location: window.location.origin + pathname, page_title: document.title, page_referrer: document.referrer ? new URL(document.referrer).origin : "" });
   lastPage = pathname;
  }
 },[consent,pathname]);
 useEffect(() => {
  const onClick = (event: MouseEvent) => {
   const anchor = (event.target as Element).closest?.("a");
   if (!anchor) return;
   const href = anchor.getAttribute("href") || "";
   const channel = href.startsWith("https://wa.me/") ? "whatsapp" : href.startsWith("mailto:") ? "email" : href.startsWith("tel:") ? "phone" : null;
   const journey = anchor.getAttribute("data-property-journey");
   if (journey && ["buyer", "residence", "investment", "seller", "luxury-assets"].includes(journey)) trackPropertyEvent("property_journey", { journey, page_path: window.location.pathname });
   const algorithmAction = anchor.getAttribute("data-algorithm-action");
   if (algorithmAction) trackPropertyEvent("algorithm_action", { action: algorithmAction, page_path: window.location.pathname });
   if (channel) trackPropertyEvent("contact_click", { contact_channel: channel });
  };
  const onToggle = (event: Event) => {
   const detail = event.target;
   if (detail instanceof HTMLDetailsElement && detail.open && detail.hasAttribute("data-algorithm-brief")) trackPropertyEvent("algorithm_brief_open", { page_path: window.location.pathname });
  };
  document.addEventListener("click",onClick);
  document.addEventListener("toggle",onToggle,true);
  return () => { document.removeEventListener("click",onClick); document.removeEventListener("toggle",onToggle,true); };
 },[]);
 return <><button type="button" className="analytics-settings" onClick={() => setChoice(consent === "accepted" ? "rejected" : "accepted")}>{consent === "accepted" ? "Turn analytics off" : "Allow analytics"}</button>{consent === null && <section className="analytics-consent" aria-label="Analytics choice"><p>May we use Google Analytics to understand visits and enquiries? It is optional. <a href="/privacy">Privacy notice</a></p><div><button type="button" onClick={() => setChoice("rejected")}>Reject analytics</button><button type="button" onClick={() => setChoice("accepted")}>Accept analytics</button></div></section>}</>;
}
