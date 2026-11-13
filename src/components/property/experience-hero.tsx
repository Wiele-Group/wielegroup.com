"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Arrow } from "./chrome";
import { ExperienceMotionControl } from "./luxury-motion";

const scenes = [
  { name: "Property", image: "/property/wiele-global-villa-20261113.webp", label: "Architectural villa · AI-created concept" },
  { name: "Aircraft", image: "/luxury-assets/wiele-aircraft-20261113.webp", label: "Private aircraft · AI-created concept" },
  { name: "Yachts", image: "/luxury-assets/wiele-yachts-20261113.webp", label: "Motor yacht · AI-created concept" },
  { name: "Exotic cars", image: "/luxury-assets/wiele-exotic-cars-20261113.webp", label: "Exotic car · AI-created concept" },
  { name: "Classic cars", image: "/luxury-assets/wiele-classic-cars-20261113.webp", label: "Classic car · AI-created concept" },
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
      setLoaded(scenes.map((_, index) => index));
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
    <div className="cinema-scene" aria-hidden="true">{loaded.map(index => <div className={`cinema-frame ${active === index ? "is-active" : ""}`} key={index}><Image src={scenes[index].image} alt="" fill sizes="100vw" priority={index === 0} fetchPriority={index === 0 ? "high" : "auto"} /></div>)}</div>
    <div className="cinema-shade" aria-hidden="true" />
    <div className="cinema-rail" aria-hidden="true"><span>WIELE INVESTMENTS</span><i /><span>SOUTH AFRICAN ROOTS · GLOBAL PERSPECTIVE</span></div>
    <div className="cinema-hero-copy">
      <span className="cinema-eyebrow"><i /> Global asset brokerage / Based in Malta</span>
      <h1 id="home-title" className="cinema-global-title"><span>Exceptional property.</span><em>Global perspective.</em></h1>
      <p>Property at our core. A global asset perspective.<br />Yachts. Aircraft. Exotic &amp; classic cars.</p>
      <div className="cinema-hero-actions"><Link className="cinema-button" href="/contact?interest=buying" data-property-journey="buyer">Share your property brief <Arrow diagonal /></Link><Link className="cinema-quiet-link" href="/luxury-assets">Explore luxury assets <Arrow /></Link></div>
    </div>
    <div className="cinema-bottom">
      <a className="cinema-discover" href="#discover"><span aria-hidden="true">↓</span> Discover Wiele</a>
      <div className="cinema-scenes" aria-label="Choose a scene">{scenes.map((scene, index) => <button key={scene.name} onClick={() => choose(index)} aria-pressed={active === index}><span>0{index + 1}</span>{scene.name}</button>)}</div>
      <div className="cinema-count"><span>0{active + 1}</span><i />{String(scenes.length).padStart(2,"0")}</div>
    </div>
    <div className="cinema-caption"><span>{scenes[active].label} · not an asset for sale</span><details><summary>Motion settings</summary><div><button type="button" aria-pressed={automatic} onClick={() => setAutomatic(!automatic)}>{automatic ? "Pause slideshow" : "Play slideshow"}</button><ExperienceMotionControl /></div></details></div>
  </section>;
}
