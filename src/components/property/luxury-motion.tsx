"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: content remains visible if motion cannot initialise. */
export function LuxuryMotion() {
  const pathname = usePathname();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const receive = (event: Event) => setPaused((event as CustomEvent<boolean>).detail);
    window.addEventListener("wiele-motion-request", receive);
    return () => window.removeEventListener("wiele-motion-request", receive);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.motionPaused = String(paused);
    return () => { delete root.dataset.motionPaused; };
  }, [paused]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(
      ".estate-introduction>div, .home-report>div, .estate-section-heading, .estate-lifestyle, .estate-seller-copy, .estate-collection>div, .estate-principles-grid article, .band-inner>*, .page-intro>*, .split-feature>*, .buyer-grid article, .process-list article"
    ));
    const reset = () => {
      observer?.disconnect();
      elements.forEach(el => el.classList.remove("reveal-pending", "reveal-visible"));
    };
    const initialise = () => {
      reset();
      if (media.matches || paused || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
      elements.forEach((el, i) => {
        // Never hide content already in the first viewport.
        if (el.getBoundingClientRect().top < window.innerHeight) return;
        el.style.setProperty("--reveal-delay", `${(i % 3) * 80}ms`);
        el.classList.add("reveal-pending");
        observer?.observe(el);
      });
    };
    const update = () => {
      frame = 0;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--reading-progress", String(height > 0 ? window.scrollY / height : 0));
      const hero = document.querySelector<HTMLElement>(".estate-hero");
      if (hero && !media.matches && !paused && window.innerWidth > 850 && window.scrollY < hero.offsetHeight) {
        hero.style.setProperty("--hero-drift", `${Math.min(window.scrollY * 0.12, 85)}px`);
      } else hero?.style.setProperty("--hero-drift", "0px");
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    initialise(); update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const onMotionChange = () => { initialise(); update(); };
    media.addEventListener("change", onMotionChange);
    return () => {
      reset(); cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      media.removeEventListener("change", onMotionChange);
    };
  }, [pathname, paused]);

  return <button className="motion-toggle" type="button" aria-pressed={paused} aria-label={paused ? "Resume decorative motion" : "Pause decorative motion"} onClick={() => setPaused(value => !value)}><span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span><span className="motion-label">{paused ? "Play motion" : "Pause motion"}</span></button>;
}

function subscribeMotion(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion-paused"] });
  return () => observer.disconnect();
}
const motionSnapshot = () => document.documentElement.dataset.motionPaused === "true";
const serverMotionSnapshot = () => false;

export function ExperienceMotionControl() {
  const paused = useSyncExternalStore(subscribeMotion, motionSnapshot, serverMotionSnapshot);
  return <button className="experience-motion-control" type="button" aria-pressed={paused} aria-label={paused ? "Resume decorative motion" : "Pause decorative motion"} onClick={() => window.dispatchEvent(new CustomEvent("wiele-motion-request", { detail: !paused }))}><span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>{paused ? "Motion off" : "Motion on"}</button>;
}
