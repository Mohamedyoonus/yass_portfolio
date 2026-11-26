"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { Icon } from "@/components/icons";
import type { Project } from "@/data/portfolio";

export function Projects({ projects }: { projects: Project[] }) {
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div className="filters reveal" role="group" aria-label="Filter projects by category">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={c === filter ? "filter-btn active" : "filter-btn"}
            aria-pressed={c === filter}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Cards stagger in once this group scrolls into view; the key remounts
          the grid on filter change so the entrance animation replays. */}
      <div className="reveal-group">
        <div className="projects-grid" key={filter}>
          {visible.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}

function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  const style = { "--c1": p.colors[0], "--c2": p.colors[1], "--i": index } as CSSProperties;

  return (
    <article className="card spot tilt project-card" style={style}>
      <div className={p.image ? "project-cover has-image" : "project-cover"}>
        {p.image ? (
          <Image
            src={p.image}
            alt={`${p.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="mock" aria-hidden="true">
            <div className="mock-bar">
              <i />
              <i />
              <i />
              <span>{p.domain ?? p.title.toLowerCase().replace(/\s+/g, "")}</span>
            </div>
            <div className="mock-body">
              <div className="mock-title">{p.title}</div>
              <div className="sk" style={{ width: "72%" }} />
              <div className="sk" style={{ width: "48%" }} />
              <div className="mock-tiles">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="project-body">
        <div className="project-meta">
          <span className="project-cat">{p.category}</span>
          {p.featured && (
            <span className="badge">
              <Icon name="sparkles" /> Featured
            </span>
          )}
        </div>
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        <ul className="tags">
          {p.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {(p.github || p.live) && (
          <div className="project-links">
            {p.github && (
              <a href={p.github} target="_blank" rel="noopener noreferrer">
                <Icon name="github" /> Source
              </a>
            )}
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener noreferrer">
                <Icon name="external" /> Live demo
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
