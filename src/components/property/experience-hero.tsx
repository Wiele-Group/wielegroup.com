"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Arrow } from "./chrome";
import { ExperienceMotionControl } from "./luxury-motion";

const scenes = [
  { name: "The residence", image: "wiele-malta-residence-concept.webp", title: "A different perspective.", label: "Mediterranean residence · AI-created concept" },
  { name: "The architecture", image: "wiele-malta-apartments-concept.webp", title: "An individual approach.", label: "Contemporary architecture · AI-created concept" },
  { name: "The detail", image: "wiele-malta-material-detail-concept.webp", title: "A considered decision.", label: "Natural material study · AI-created concept" },
];

export function ExperienceHero() {
  const [active, setActive] = useState(0);
  const [automatic, setAutomatic] = useState(false);
  const [loaded, setLoaded] = useState([0]);
  useEffect(() => {
    if (!automatic) return;
    const timer = window.setInterval(() => {
      const hero = document.querySelector("[data-experience-hero]");
      if (document.hidden || window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motionPaused === "true" || !hero || hero.getBoundingClientRect().bottom < 100) return;
      setLoaded([0, 1, 2]);
      setActive(current => (current + 1) % scenes.length);
    }, 10000);
    return () => window.clearInterval(timer);
  }, [automatic]);
  function choose(index: number) {
    setAutomatic(false);
    setLoaded(current => current.includes(index) ? current : [...current, index]);
    setActive(index);
  }
  return <section className="cinema-hero" data-experience-hero aria-labelledby="home-title">
    <div className="cinema-scene" aria-hidden="true">{loaded.map(index => <div className={`cinema-frame ${active === index ? "is-active" : ""}`} key={index}><Image src={`/property/${scenes[index].image}`} alt="" fill sizes="100vw" priority={index === 0} fetchPriority={index === 0 ? "high" : "auto"} /></div>)}</div>
    <div className="cinema-shade" aria-hidden="true" />
    <div className="cinema-rail" aria-hidden="true"><span>WIELE INVESTMENTS</span><i /><span>35°54′ N · 14°30′ E</span></div>
    <div className="cinema-hero-copy">
      <span className="cinema-eyebrow"><i /> Malta / Investment real estate</span>
      <h1 id="home-title">Malta Property.<br /><em>Global Ambition.</em></h1>
      <p>From your first apartment to your next portfolio.<br />Investment real estate, shaped around your goals.</p>
      <div className="cinema-hero-actions"><Link className="cinema-button" href="/buying">Explore the Wiele perspective <Arrow diagonal /></Link><Link className="cinema-quiet-link" href="/contact">Start a conversation <Arrow /></Link></div>
    </div>
    <div className="cinema-bottom">
      <a className="cinema-discover" href="#discover"><span aria-hidden="true">↓</span> Discover Wiele</a>
      <div className="cinema-scenes" aria-label="Choose a scene">{scenes.map((scene, index) => <button key={scene.name} onClick={() => choose(index)} aria-pressed={active === index}><span>0{index + 1}</span>{scene.name}</button>)}</div>
      <div className="cinema-count"><span>0{active + 1}</span><i />03</div>
    </div>
    <div className="cinema-caption"><span>{scenes[active].label} · not a property for sale</span><details><summary>Motion settings</summary><div><button type="button" aria-pressed={automatic} onClick={() => setAutomatic(!automatic)}>{automatic ? "Pause slideshow" : "Play slideshow"}</button><ExperienceMotionControl /></div></details></div>
  </section>;
}
