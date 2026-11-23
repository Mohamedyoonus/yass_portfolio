"use client";

import { useEffect, useState } from "react";

/** Types and deletes each word in turn. Server-renders the first word. */
export function Typed({ words }: { words: string[] }) {
  const [text, setText] = useState(words[0] ?? "");

  useEffect(() => {
    if (words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let w = 0;
    let i = words[0].length;
    let deleting = true;
    let timer: number;

    const tick = () => {
      const word = words[w];
      i += deleting ? -1 : 1;
      setText(word.slice(0, i));

      let delay = deleting ? 45 : 90;
      if (!deleting && i === word.length) {
        deleting = true;
        delay = 1800;
      } else if (deleting && i === 0) {
        deleting = false;
        w = (w + 1) % words.length;
        delay = 380;
      }
      timer = window.setTimeout(tick, delay);
    };

    timer = window.setTimeout(tick, 2200);
    return () => window.clearTimeout(timer);
  }, [words]);

  return <span className="gradient-text typed">{text}</span>;
}
