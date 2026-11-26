import Image from "next/image";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { Icon } from "@/components/icons";
import { Typed } from "@/components/typed";
import { SocialLinks } from "@/components/ui";
import { portfolio } from "@/data/portfolio";

const str = (v: string) => <span className="tk-s">{`"${v}"`}</span>;
const list = (items: string[]) => (
  <>
    [
    {items.map((it, i) => (
      <Fragment key={it}>
        {i > 0 && ", "}
        {str(it)}
      </Fragment>
    ))}
    ]
  </>
);
const Line = ({ children = " " }: { children?: ReactNode }) => (
  <span className="ln">{children}</span>
);
const Prop = ({ k, children }: { k: string; children: ReactNode }) => (
  <Line>
    {"  "}
    <span className="tk-p">{k}</span>: {children},
  </Line>
);

type PortraitProps = { src: string; mask?: string; width: number; height: number; name: string };

/**
 * Background-removed photo lit by the page itself: an ambient glow behind it,
 * a colored rim light around the silhouette and a theme-colored tint on the
 * photo, fading into the page at the bottom so it doesn't look pasted on.
 */
function Portrait({ src, mask, width, height, name }: PortraitProps) {
  return (
    <div className="portrait">
      <div className="portrait-aura" aria-hidden="true" />
      <div className="portrait-figure">
        <div className="portrait-photo">
          <Image
            className="portrait-img"
            src={src}
            alt={`Portrait of ${name}`}
            width={width}
            height={height}
            sizes="(max-width: 600px) 100vw, (max-width: 1280px) 500px, 32vw"
            quality={90}
            preload
          />
          {mask && (
            <span
              className="portrait-tint"
              aria-hidden="true"
              style={{ "--mask": `url(${mask})` } as CSSProperties}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export function CodeCard() {
  const { name, role, available, codeCard } = portfolio;

  return (
    <div className="code-card">
      <div className="code-head">
        <i />
        <i />
        <i />
        <span className="code-file">{codeCard.filename}</span>
      </div>
      <pre className="code-body">
        <code>
          <Line>
            <span className="tk-c">{`// ${codeCard.filename}`}</span>
          </Line>
          <Line>
            <span className="tk-k">const</span> <span className="tk-v">developer</span> = {"{"}
          </Line>
          <Prop k="name">{str(name)}</Prop>
          <Prop k="role">{str(role)}</Prop>
          <Prop k="location">{str(codeCard.location)}</Prop>
          <Prop k="stack">{list(codeCard.stack)}</Prop>
          <Prop k="loves">{list(codeCard.loves)}</Prop>
          <Prop k="available">
            <span className="tk-b">{String(available)}</span>
          </Prop>
          <Line>{"};"}</Line>
          <Line />
          <Line>
            <span className="tk-v">developer</span>.<span className="tk-f">build</span>(
            {str("something amazing")});
          </Line>
        </code>
      </pre>
    </div>
  );
}

export function Hero() {
  const { name, roles, bio, available, resumeUrl, socials, heroBadges, photo } = portfolio;
  // Optional: add `availabilityText: "Open to new opportunities"` in data/portfolio.ts to show the pill
  const availabilityText = (portfolio as { availabilityText?: string }).availabilityText;

  return (
    <section id="home" className={photo ? "hero has-photo" : "hero"}>
      <div className="wrap hero-inner">
        <div className="hero-text">
          {available && availabilityText && (
            <div className="status-pill intro">
              <span className="dot" aria-hidden="true" />
              {availabilityText}
            </div>
          )}
          <p className="eyebrow intro" style={{ "--d": "60ms" } as CSSProperties}>
            <span className="wave" aria-hidden="true">
              👋
            </span>{" "}
            Hello, I&apos;m
          </p>
          <h1 className="hero-title intro" style={{ "--d": "120ms" } as CSSProperties}>
            {name}
          </h1>
          <p className="hero-sub intro" style={{ "--d": "180ms" } as CSSProperties}>
            <span className="sr-only">{roles.join(", ")}</span>
            <span aria-hidden="true">
              I&apos;m a <Typed words={roles} />
              <span className="caret" />
            </span>
          </p>
          <p className="hero-bio intro" style={{ "--d": "240ms" } as CSSProperties}>
            {bio}
          </p>
          <div className="hero-cta intro" style={{ "--d": "300ms" } as CSSProperties}>
            <a className="btn btn-primary" href="#projects">
              View my work <Icon name="arrowRight" />
            </a>
            {resumeUrl && (
              <a className="btn btn-ghost" href={resumeUrl} download>
                <Icon name="download" /> Download CV
              </a>
            )}
          </div>
          <div className="intro" style={{ "--d": "360ms" } as CSSProperties}>
            <SocialLinks socials={socials} />
          </div>
        </div>

        <div
          className={photo ? "hero-visual has-portrait intro" : "hero-visual intro"}
          style={{ "--d": "200ms" } as CSSProperties}
        >
          {photo ? <Portrait {...photo} name={name} /> : <CodeCard />}
          {heroBadges.map((b, i) => (
            <div key={b.title} className={`float-badge fb-${i + 1}`}>
              <span className="fb-icon">
                <Icon name={b.icon} />
              </span>
              <span>
                <strong>{b.title}</strong>
                <small>{b.subtitle}</small>
              </span>
            </div>
          ))}
        </div>
      </div>

      <a href="#about" className="scroll-hint" aria-label="Scroll to About section">
        <span />
      </a>
    </section>
  );
}
