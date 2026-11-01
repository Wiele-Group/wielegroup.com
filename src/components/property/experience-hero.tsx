"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Arrow } from "./chrome";
import { ExperienceMotionControl } from "./luxury-motion";

const studies = [
  { name: "The asset", image: "modern-malta-apartments-concept.webp", label: "Architectural light study", alt: "AI-created contemporary limestone apartment architecture; not an actual Malta property or listing" },
  { name: "The setting", image: "premium-terrace.webp", label: "Contemporary residence study", alt: "AI-created Malta-inspired terrace and residence; not an actual property or listing" },
  { name: "The detail", image: "premium-detail.webp", label: "Natural material study", alt: "AI-created limestone and natural interior materials; not an actual property or listing" },
];

export function ExperienceHero() {
  const [active, setActive] = useState(0);
  const [autopilot,setAutopilot] = useState(true);
  const [loaded, setLoaded] = useState<number[]>([0]);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!autopilot) return;
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer=window.setInterval(() => {
      const hero=document.querySelector("[data-experience-hero]");
      if (reduced.matches || document.hidden || document.documentElement.dataset.motionPaused === "true" || !hero) return;
      const rect=hero.getBoundingClientRect();
      if(rect.bottom<100 || rect.top>window.innerHeight) return;
      setActive(current => {
        const next=(current+1)%3;
        return next;
      });
      setLoaded([0,1,2]);
    },12000);
    return () => window.clearInterval(timer);
  },[autopilot]);
  function choose(index: number) {
    setAutopilot(false);
    if (index === active) return;
    setFailed(false); setActive(index);
    setLoaded(current => current.includes(index) ? current : [...current, index]);
  }
  return <section className="experience-hero" aria-labelledby="home-title" data-experience-hero>
    <div className="experience-hero-scene" aria-hidden="true">
      {loaded.map(index => <div className={`experience-hero-frame ${active === index ? "is-active" : ""}`} key={index}>
        <Image src={`/property/${studies[index].image}`} alt="" fill sizes="100vw" priority={index === 0} fetchPriority={index === 0 ? "high" : "auto"} onError={() => { if (index === active) setFailed(true); }} />
      </div>)}
    </div>
    <div className="experience-hero-shade" aria-hidden="true" />
    <div className="experience-hero-grid" aria-hidden="true"><span /><span /><span /></div>
    <div className="experience-hero-top wrap"><span className="eyebrow">Malta property marketing &amp; introductions</span><div className="experience-hero-tools"><span className="experience-edition">An individual perspective <i aria-hidden="true" /></span><button className="experience-autopilot" type="button" aria-pressed={autopilot} onClick={()=>setAutopilot(value=>!value)}>{autopilot ? "Image sequence on" : "Image sequence off"}</button><ExperienceMotionControl /></div></div>
    <div className="experience-hero-body wrap">
      <span className="experience-kicker">A perspective on investment.</span>
      <h1 id="home-title"><span>Malta Property.</span><em>Global Ambition.</em></h1>
      <div className="experience-hero-bottom"><p>Investment real estate in Malta, shaped around your goals. From your first apartment to your next portfolio.</p><Link className="experience-orbit-link" href="/contact?interest=buying"><span>Discuss your<br />property brief</span><span className="experience-orbit"><Arrow diagonal /></span></Link></div>
    </div>
    <aside className="hero-property-window"><div className="hero-property-window-plane"><div className="hero-property-window-image"><Image src={`/property/${studies[(active+1)%3].image}`} alt="Supporting AI-created property concept; not a property offered for sale" fill sizes="(max-width: 1100px) 1px, 25vw" /></div><div className="hero-property-window-caption"><span>Wiele / Investment perspective</span><strong>{["The asset. The income. The detail.","A residence. A considered decision.","Every detail informs the brief."][active]}</strong><small>AI-created property concepts · not listings</small></div></div></aside>
    <div className="experience-hero-foot wrap">
      <a className="experience-discover" href="#property-journey"><span className="experience-scroll-line" aria-hidden="true" />Find your next move</a>
      <div className="experience-study-controls" aria-label="Choose an illustrative architecture study">{studies.map((study,index) => <button type="button" key={study.name} aria-pressed={index === active} onClick={() => choose(index)}><span className="study-number">0{index+1}</span>{study.name}</button>)}</div>
      <Link className="experience-report-link" href="/malta-investment-report">The Wiele report <Arrow diagonal /></Link>
    </div>
    <div className="experience-imagery-label"><span>{failed ? "Image unavailable" : studies[active].label}</span><span>AI-created concept · not a property offered for sale</span></div>
    <span className="experience-hero-description sr-only">{studies[active].alt}</span>
  </section>;
}
