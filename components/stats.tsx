"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type Stat = { value: number; suffix?: string; label: string };

const format = (n: number, suffix = "") => `${n.toLocaleString("en-US")}${suffix}`;

/** Stat cards whose numbers count up the first time they scroll into view. */
export function Stats({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nums = Array.from(root.querySelectorAll<HTMLElement>("[data-value]"));
    const paint = (progress: number) => {
      for (const n of nums) {
        n.textContent = format(Math.round(Number(n.dataset.value) * progress), n.dataset.suffix);
      }
    };
    paint(0);

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min((now - start) / 1600, 1);
          paint(1 - Math.pow(1 - t, 3)); // ease-out cubic
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.35 },
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      paint(1);
    };
  }, []);

  return (
    <div className="stats" ref={ref}>
      {stats.map((s, i) => (
        <div
          key={s.label}
          className="card spot stat reveal"
          style={{ "--d": `${i * 80}ms` } as CSSProperties}
        >
          <div className="stat-num" data-value={s.value} data-suffix={s.suffix ?? ""}>
            {format(s.value, s.suffix)}
          </div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
