"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./chrome";

const perspectives = [
  { image: "apartment-exterior.webp", label: "Income evidence", title: "Start with the income.", caption: "Distinguish collected rent, contracted rent and projected income.", detail: "The figure is only the beginning. Understand what has been received, what is agreed and what is assumed.", alt: "Contemporary apartment building with glass balconies; illustrative stock photograph, not a Malta property listing", disclosure: "Illustrative stock photograph · not a Malta property listing" },
  { image: "modern-malta-interior-concept.webp", label: "Asset fundamentals", title: "Understand the property.", caption: "Assess location, condition, lease terms and future capital requirements.", detail: "Look at the space. Look closer at the detail. The condition and commitments belong in the same conversation.", alt: "AI-created contemporary Malta-inspired interior; not an actual property or listing", disclosure: "AI-created interior concept · not a property listing" },
  { image: "premium-detail.webp", label: "Investor fit", title: "Define your mandate.", caption: "Match the asset to your budget, income objectives and holding period.", detail: "A first apartment or a wider portfolio. Begin with the outcome you want, then shape the brief around it.", alt: "AI-created limestone and interior material study; not an actual property", disclosure: "AI-created material study · not a property listing" },
];

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
const compactSnapshot = () => window.matchMedia("(max-width: 760px)").matches;
function subscribeCompact(callback: () => void) {
  const media = window.matchMedia("(max-width: 760px)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export function PerspectiveGallery() {
  const [active, setActive] = useState(0);
  const enhanced = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const compact = useSyncExternalStore(subscribeCompact, compactSnapshot, serverSnapshot);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function select(index: number, focus = false) { setActive(index); if (focus) tabs.current[index]?.focus(); }
  return <section className="perspective-gallery" aria-labelledby="perspective-title" data-enhanced={enhanced}>
    <div className="wrap perspective-heading"><span className="eyebrow">Malta investment property / A closer look</span><h2 id="perspective-title">Look beyond<br /><em>the asking price.</em></h2><p>Income objectives. Operating costs. Lease quality.<br />The right questions come before a return claim.</p></div>
    <div className="wrap perspective-stage">
      <div className="perspective-tabs" role={enhanced ? "tablist" : undefined} aria-label="Investment perspectives" aria-orientation={compact ? "horizontal" : "vertical"}>{perspectives.map((item,index) => <button ref={el => { tabs.current[index]=el; }} key={item.label} type="button" role="tab" id={`perspective-tab-${index}`} aria-selected={active===index} aria-controls={`perspective-panel-${index}`} tabIndex={active===index ? 0 : -1} onClick={() => select(index)} onKeyDown={event => { const keys:Record<string,number> = { ArrowDown:(active+1)%3, ArrowRight:(active+1)%3, ArrowUp:(active+2)%3, ArrowLeft:(active+2)%3, Home:0, End:2 }; if (event.key in keys) {event.preventDefault(); select(keys[event.key],true);} }}><span>0{index+1}</span><strong>{item.label}</strong><Arrow diagonal /></button>)}</div>
      <div className="perspective-panels">{perspectives.map((item,index) => <article className="perspective-panel" key={item.title} id={`perspective-panel-${index}`} role={enhanced ? "tabpanel" : undefined} aria-labelledby={enhanced ? `perspective-tab-${index}` : undefined} hidden={enhanced && active!==index} tabIndex={enhanced ? 0 : undefined}>
        <figure><Image src={`/property/${item.image}`} alt={item.alt} fill sizes="(max-width: 760px) 100vw, 65vw" /><figcaption>{item.disclosure}</figcaption><span className="perspective-image-index" aria-hidden="true">0{index+1}</span></figure>
        <div className="perspective-panel-copy"><div><span className="eyebrow">0{index+1} / {item.label}</span><h3>{item.title}</h3></div><div><p>{item.caption}</p><p className="perspective-detail">{item.detail}</p><Link className="text-link" href="/contact?interest=buying">Share your investment brief <Arrow diagonal /></Link></div></div>
      </article>)}</div>
    </div>
    <div className="perspective-foot wrap"><span>Understand the proposition.</span><span>Independent. Individual. Wiele.</span></div>
  </section>;
}
