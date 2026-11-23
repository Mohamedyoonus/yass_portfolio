"use client";

import { useEffect, useRef } from "react";

/**
 * Page-wide visual effects:
 *  - scroll progress bar
 *  - reveal-on-scroll for `.reveal` / `.reveal-group` elements
 *  - cursor glow + card spotlight (`.spot`) + 3D tilt (`.tilt`) on fine pointers
 * Render it once, after the page content.
 */
export function Effects() {
  const barRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Scroll progress
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Reveal on scroll (uses a data attribute so React className updates never remove it)
  useEffect(() => {
    const SELECTOR = ".reveal:not([data-revealed]), .reveal-group:not([data-revealed])";
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    const watch = (root: ParentNode) =>
      root.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => observer.observe(el));
    watch(document);

    // Also pick up elements added after load (e.g. Fast Refresh while editing,
    // or any client-side re-render that creates new nodes) — otherwise they'd stay hidden.
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.matches(SELECTOR)) observer.observe(node);
          watch(node);
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  // Cursor glow, spotlight and tilt
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const glow = glowRef.current;
    let current: HTMLElement | null = null;
    let raf = 0;
    let gx = 0;
    let gy = 0;

    const resetCard = () => {
      if (current) current.style.transform = "";
      current = null;
    };

    const onMove = (e: PointerEvent) => {
      gx = e.clientX;
      gy = e.clientY;
      if (glow && !raf) {
        raf = requestAnimationFrame(() => {
          glow.style.transform = `translate(${gx}px, ${gy}px)`;
          glow.dataset.on = "";
          raf = 0;
        });
      }

      const card = e.target instanceof Element ? e.target.closest<HTMLElement>(".spot") : null;
      if (card !== current) resetCard();
      if (!card) return;
      current = card;

      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);

      if (!reduceMotion && card.classList.contains("tilt")) {
        const rx = (y / r.height - 0.5) * -6;
        const ry = (x / r.width - 0.5) * 6;
        card.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
      }
    };

    const onLeave = () => {
      if (glow) delete glow.dataset.on;
      resetCard();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={barRef} className="scroll-progress" aria-hidden="true" />
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
    </>
  );
}
