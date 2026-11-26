"use client";
import { useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { homeLanguages } from "@/lib/home-locales/routing";
import { siteLocale } from "@/lib/site-navigation";

const consentLabels = {
 en: ["Analytics choice", "May we use Google Analytics to understand visits and enquiries? It is optional.", "Privacy notice", "Reject analytics", "Accept analytics", "Turn analytics off", "Allow analytics"],
 de: ["Analyse-Einstellungen", "Dürfen wir Google Analytics nutzen, um Besuche und Anfragen auszuwerten? Ihre Zustimmung ist freiwillig.", "Datenschutzhinweis", "Analyse ablehnen", "Analyse akzeptieren", "Analyse deaktivieren", "Analyse erlauben"],
 fr: ["Préférences de mesure d’audience", "Pouvons-nous utiliser Google Analytics pour comprendre les visites et les demandes ? Votre accord est facultatif.", "Avis de confidentialité", "Refuser la mesure d’audience", "Accepter la mesure d’audience", "Désactiver la mesure d’audience", "Autoriser la mesure d’audience"],
 it: ["Preferenze di analisi", "Possiamo usare Google Analytics per comprendere le visite e le richieste? Il consenso è facoltativo.", "Informativa sulla privacy", "Rifiuta l’analisi", "Accetta l’analisi", "Disattiva l’analisi", "Consenti l’analisi"],
 es: ["Preferencias de análisis", "¿Podemos usar Google Analytics para conocer mejor las visitas y consultas? El consentimiento es opcional.", "Aviso de privacidad", "Rechazar el análisis", "Aceptar el análisis", "Desactivar el análisis", "Permitir el análisis"],
} as const;

const measurementId = "G-8YCESQ46BH";
// Load the current Google tag; keep events directed to the existing Wiele stream.
const googleTagId = "GT-5R652DLW";
const storageKey = "wiele-analytics-consent-v1";
const changeEvent = "wiele-consent-change";
let loaded = false;
let configured = false;
let lastPage = "";
const siteActions = new Set(["buyer_brief", "seller_brief", "valuation_brief", "currency_converter", "property_examples", "reference_jump", "origination_protocol"]);

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
export function trackPropertyEvent(name: "seller_preparation" | "brief_start" | "brief_step" | "brief_transfer" | "brief_storage_error" | "asset_perspective" | "generate_lead" | "contact_click" | "report_download_click" | "property_journey" | "site_action", props: Record<string,string> = {}) {
 if (choice() !== "accepted") return;
 window.gtag?.("event", name, { ...props, send_to: measurementId });
}
function measureConsentBanner(banner: HTMLElement | null) {
 if (!banner) return;
 const root = document.documentElement;
 const update = () => {
  const clearance = getComputedStyle(banner).position === "fixed"
   ? Math.max(0, Math.ceil(window.innerHeight - banner.getBoundingClientRect().top))
   : 0;
  root.style.setProperty("--analytics-clearance", `${clearance}px`);
 };
 const observer = new ResizeObserver(update);
 observer.observe(banner);
 window.addEventListener("resize", update);
 update();
 return () => {
  observer.disconnect();
  window.removeEventListener("resize", update);
  root.style.removeProperty("--analytics-clearance");
 };
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
   script.addEventListener("error", () => { loaded = false; script.remove(); }, { once: true });
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
   const siteAction = anchor.getAttribute("data-site-action");
   if (siteAction && siteActions.has(siteAction)) trackPropertyEvent("site_action", { action: siteAction, page_path: window.location.pathname });
   if (channel) trackPropertyEvent("contact_click", { contact_channel: channel });
  };
  document.addEventListener("click",onClick);
  return () => document.removeEventListener("click",onClick);
 },[]);
 const bannerRef = useRef<HTMLElement>(null);
 useEffect(() => measureConsentBanner(bannerRef.current), [consent, pathname]);
 if (consent !== null) return null;
 const locale = siteLocale(pathname) ?? "en";
 const [label, message, privacy, reject, accept] = consentLabels[locale];
 return (
  <section ref={bannerRef} className="analytics-consent" lang={homeLanguages[locale].tag} aria-label={label}>
   <p>{message} <Link href="/privacy" hrefLang="en-GB">{privacy}</Link></p>
   <div>
    <button type="button" onClick={() => setChoice("rejected")}>{reject}</button>
    <button type="button" onClick={() => setChoice("accepted")}>{accept}</button>
   </div>
  </section>
 );
}

export function AnalyticsSettings() {
 const consent = useSyncExternalStore(subscribe, choice, () => null);
 const locale = siteLocale(usePathname()) ?? "en";
 const [, , , , , disable, enable] = consentLabels[locale];
 return (
  <button type="button" lang={homeLanguages[locale].tag} className="analytics-settings"
    onClick={() => setChoice(consent === "accepted" ? "rejected" : "accepted")}>
   {consent === "accepted" ? disable : enable}
  </button>
 );
}
