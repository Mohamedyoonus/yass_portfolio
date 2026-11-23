"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";

const LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Nav({ logo, initials }: { logo: string; initials: string }) {
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Glass background once the page is scrolled, and whether the nav is still
  // over the (always dark) hero. Set as data attributes so React re-renders
  // never clobber them.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const hero = document.getElementById("home");
    const onScroll = () => {
      const y = window.scrollY;
      header.dataset.scrolled = String(y > 20);
      const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;
      header.dataset.onHero = String(y + header.offsetHeight < heroBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Highlight the link of the section currently in the middle of the screen.
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header ref={headerRef} className={open ? "nav menu-open" : "nav"} data-on-hero="true">
      <div className="wrap nav-inner">
        <a className="logo" href="#home" onClick={close} aria-label="Back to top">
          <span className="logo-mark">{initials}</span>
          <span className="logo-text">{logo}</span>
        </a>

        <nav id="primary-nav" className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={close}
              className={active === l.id ? "active" : undefined}
              aria-current={active === l.id ? "true" : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          <a className="btn btn-primary btn-sm nav-cta" href="#contact">
            Hire me
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

function ThemeToggle() {
  // The inline script in layout.tsx sets the theme before paint. In dev,
  // Strict Mode's remount resets <html> attributes, so re-apply it here.
  useLayoutEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") {
        document.documentElement.setAttribute("data-theme", saved);
      }
    } catch {}
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      className="icon-btn theme-toggle"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
    >
      <Icon name="sun" className="i-sun" />
      <Icon name="moon" className="i-moon" />
    </button>
  );
}
