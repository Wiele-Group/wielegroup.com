import type { ReactNode } from "react";

type SectionLink = { id: string; label: string };

export function ReferenceLayout({ eyebrow, title, description, sections, children }: {
  eyebrow: string;
  title: string;
  description: string;
  sections: readonly SectionLink[];
  children: ReactNode;
}) {
  return <div className="reference-layout wrap">
    <header className="reference-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
      <nav className="reference-jump" aria-label="On this page">
        {sections.map(({ id, label }) => <a key={id} href={`#${id}`} data-site-action="reference_jump">{label}</a>)}
      </nav>
    </header>
    {children}
  </div>;
}
