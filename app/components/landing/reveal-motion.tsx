"use client";
import { useEffect } from "react";
export function RevealMotion() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.querySelector(".kynetic");
    if (!root) return;
    root.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
      },
      { threshold: 0.08 }
    );
    root
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");
    };
  }, []);
  return null;
}
