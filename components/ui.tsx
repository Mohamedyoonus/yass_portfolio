import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import type { Social } from "@/data/portfolio";

/** Renders a string, turning **double-asterisk** spans into <strong>. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  description,
}: {
  index: string;
  label: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <div className="section-head reveal">
      <span className="section-label">
        {index} — {label}
      </span>
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-desc">{description}</p>}
    </div>
  );
}

export function SocialLinks({
  socials,
  className = "",
}: {
  socials: Social[];
  className?: string;
}) {
  return (
    <div className={`socials ${className}`.trim()}>
      {socials.map((s) => {
        const external = !s.url.startsWith("mailto:");
        return (
          <a
            key={s.name}
            className="social"
            href={s.url}
            aria-label={s.name}
            title={s.name}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <Icon name={s.icon} />
          </a>
        );
      })}
    </div>
  );
}
