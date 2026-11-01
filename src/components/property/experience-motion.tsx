"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** A single transform owner for the architectural scene. No perpetual render loop. */
export function ExperienceMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const hero = document.querySelector<HTMLElement>("[data-experience-hero]");
    if (!hero) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0, x = 0, y = 0, visible = true;
    const enabled = () => !reduced.matches && root.dataset.motionPaused !== "true" && !document.hidden;
    const clear = () => {
      hero.style.removeProperty("--scene-x"); hero.style.removeProperty("--scene-y"); hero.style.removeProperty("--scene-scroll");
    };
    const render = () => {
      frame = 0;
      if (!enabled() || !visible) { clear(); return; }
      const bounds = hero.getBoundingClientRect();
      hero.style.setProperty("--scene-x", `${fine.matches ? x : 0}px`);
      hero.style.setProperty("--scene-y", `${fine.matches ? y : 0}px`);
      hero.style.setProperty("--scene-scroll", `${fine.matches ? Math.min(Math.max(-bounds.top,0)*.10,65) : 0}px`);
    };
    const schedule = () => { if (!frame) frame=requestAnimationFrame(render); };
    const pointer = (event:PointerEvent) => {
      if (!fine.matches || !enabled()) return;
      const bounds=hero.getBoundingClientRect();
      x=((event.clientX-bounds.left)/bounds.width-.5)*-18;
      y=((event.clientY-bounds.top)/bounds.height-.5)*-12;
      schedule();
    };
    const settle = () => { x=0; y=0; schedule(); };
    const observer = "IntersectionObserver" in window ? new IntersectionObserver(entries => { visible=entries[0].isIntersecting; schedule(); }) : null;
    observer?.observe(hero);
    const mutation = new MutationObserver(schedule);
    mutation.observe(root,{attributes:true,attributeFilter:["data-motion-paused"]});
    hero.addEventListener("pointermove",pointer,{passive:true});
    hero.addEventListener("pointerleave",settle); hero.addEventListener("pointercancel",settle);
    window.addEventListener("scroll",schedule,{passive:true}); window.addEventListener("resize",settle);
    document.addEventListener("visibilitychange",settle);
    reduced.addEventListener("change",settle); fine.addEventListener("change",settle);
    schedule();
    return () => {
      cancelAnimationFrame(frame); observer?.disconnect(); mutation.disconnect(); clear();
      hero.removeEventListener("pointermove",pointer); hero.removeEventListener("pointerleave",settle); hero.removeEventListener("pointercancel",settle);
      window.removeEventListener("scroll",schedule); window.removeEventListener("resize",settle); document.removeEventListener("visibilitychange",settle);
      reduced.removeEventListener("change",settle); fine.removeEventListener("change",settle);
    };
  },[pathname]);
  return null;
}
