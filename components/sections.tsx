import type { CSSProperties } from "react";
import { CopyEmail, ContactForm } from "@/components/contact-form";
import { CodeCard } from "@/components/hero";
import { Icon } from "@/components/icons";
import { Projects } from "@/components/projects";
import { Stats } from "@/components/stats";
import { Rich, SectionHeading, SocialLinks } from "@/components/ui";
import { portfolio } from "@/data/portfolio";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Marquee() {
  const items = portfolio.marquee.length < 10 ? [...portfolio.marquee, ...portfolio.marquee] : portfolio.marquee;
  const group = (hidden: boolean) => (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <span className="marquee-item" key={i}>
          {t}
          <span className="marquee-sep" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" role="region" aria-label="Technologies I work with">
      <div className="marquee-track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}

export function About() {
  const { about, location, email, currently, stats, photo } = portfolio;
  return (
    <section id="about" className="section">
      <div className="wrap">
        <SectionHeading index="01" label="About me" title="Turning ideas into elegant, reliable software." />
        <div className="about-grid">
          <div className="about-text reveal">
            {about.map((p, i) => (
              <p key={i}>
                <Rich text={p} />
              </p>
            ))}
            <ul className="about-info">
              <li>
                <Icon name="pin" />
                <span>{location}</span>
              </li>
              <li>
                <Icon name="mail" />
                <a href={`mailto:${email}`}>{email}</a>
              </li>
              {currently && (
                <li>
                  <Icon name="sparkles" />
                  <span>
                    <span className="muted">Currently: </span>
                    {currently}
                  </span>
                </li>
              )}
            </ul>
          </div>
          <div className="about-side">
            {/* When the hero shows the portrait, the code card lives here instead */}
            {photo && (
              <div className="reveal">
                <CodeCard />
              </div>
            )}
            <Stats stats={stats} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="wrap">
        <SectionHeading
          index="02"
          label="Skills"
          title="My tech stack & toolbox"
          description="The technologies I use every day to bring ideas to life — and the ones I'm always learning more about."
        />
        <div className="skills-grid">
          {portfolio.skills.map((s, i) => (
            <article key={s.title} className="card spot skill-card reveal" style={delay(i * 80)}>
              <div className="skill-icon">
                <Icon name={s.icon} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.blurb}</p>
              <ul className="chips">
                {s.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Work() {
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <SectionHeading
          index="03"
          label="Projects"
          title="Selected work I'm proud of"
          description="A mix of client work, side projects and open source — each one taught me something new."
        />
        <Projects projects={portfolio.projects} />
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <SectionHeading index="04" label="Experience" title="Where I've been building" />
        <ol className="timeline">
          {portfolio.experience.map((x, i) => (
            <li key={`${x.company}-${x.period}`} className="tl-item reveal" style={delay(i * 80)}>
              <span className="tl-dot" aria-hidden="true">
                <Icon name={x.type === "education" ? "graduation" : "briefcase"} />
              </span>
              <div className="card spot tl-card">
                <div className="tl-top">
                  <div>
                    <h3 className="tl-role">{x.role}</h3>
                    <p className="tl-company">
                      {x.company}
                      {x.location && <span className="muted"> · {x.location}</span>}
                    </p>
                  </div>
                  <span className="tl-period">{x.period}</span>
                </div>
                {x.description && (
                  <p className="tl-desc">
                    <Rich text={x.description} />
                  </p>
                )}
                {x.highlights && x.highlights.length > 0 && (
                  <ul className="tl-points">
                    {x.highlights.map((h) => (
                      <li key={h}>
                        <Rich text={h} />
                      </li>
                    ))}
                  </ul>
                )}
                {x.tags && x.tags.length > 0 && (
                  <ul className="tags">
                    {x.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>

        {portfolio.certifications.length > 0 && (
          <div className="certs">
            <h3 className="certs-title reveal">Certifications</h3>
            <div className="certs-grid">
              {portfolio.certifications.map((c, i) => (
                <div key={c.title} className="card spot cert reveal" style={delay(i * 80)}>
                  <span className="cert-icon" aria-hidden="true">
                    <Icon name="award" />
                  </span>
                  <div>
                    <h4>{c.title}</h4>
                    <p>{c.issuer}</p>
                    <span className="cert-date">{c.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function Contact() {
  const { email, socials, formEndpoint } = portfolio;
  return (
    <section id="contact" className="section">
      <div className="wrap">
        <div className="contact-card reveal">
          <div className="contact-glow" aria-hidden="true" />
          <div className="contact-intro">
            <span className="section-label">05 — Contact</span>
            <h2 className="contact-title">
              Let&apos;s build something <span className="gradient-text">great</span> together.
            </h2>
            <p className="section-desc">
              Have a project in mind, a role to fill, or just want to say hi? My inbox is always
              open — I&apos;ll get back to you within a day.
            </p>
            <CopyEmail email={email} />
            <SocialLinks socials={socials} />
          </div>
          <ContactForm email={email} endpoint={formEndpoint || undefined} />
        </div>
      </div>
    </section>
  );
}

async function getYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await getYear();
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <p>
          © {year} {portfolio.name}. Designed &amp; built with <span className="heart">♥</span> using
          Next.js.
        </p>
        <SocialLinks socials={portfolio.socials} className="socials-sm" />
        <a href="#home" className="to-top">
          Back to top <Icon name="arrowUp" />
        </a>
      </div>
    </footer>
  );
}
