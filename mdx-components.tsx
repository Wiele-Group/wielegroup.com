import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "next/image";

/**
 * Global MDX component overrides — tokens-bound only.
 *
 * No `prose` fallback. Every HTML element MDX produces in a Labs article
 * inherits Wiele design tokens explicitly. This is what stops articles
 * drifting into "default markdown" register.
 *
 * Authority: founder reinforcement #3 from Phase 4 brief.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1
        id={slugify(children)}
        className="text-display-lg text-white text-balance mt-2 mb-6 scroll-mt-24"
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        id={slugify(children)}
        className="text-display-md text-white text-balance mt-12 mb-4 scroll-mt-24"
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        id={slugify(children)}
        className="text-heading-lg text-white mt-8 mb-3 scroll-mt-24"
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-heading-md text-white mt-6 mb-2">{children}</h4>
    ),
    p: ({ children }) => (
      <p className="text-body-md text-cloud leading-[1.7] mb-5">{children}</p>
    ),
    a: ({ href, children, ...rest }) => {
      const isExternal = typeof href === "string" && /^https?:\/\//.test(href);
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="text-electric hover:text-electric-light underline underline-offset-4 decoration-electric/40 hover:decoration-electric"
            {...rest}
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={(href ?? "#") as string}
          className="text-electric hover:text-electric-light underline underline-offset-4 decoration-electric/40 hover:decoration-electric"
        >
          {children}
        </Link>
      );
    },
    ul: ({ children }) => (
      <ul className="list-disc marker:text-electric pl-6 text-body-md text-cloud mb-5 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal marker:text-electric pl-6 text-body-md text-cloud mb-5 space-y-2">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-[1.7]">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-electric pl-5 my-6 text-silver italic [&_p]:text-silver [&_p]:mb-0">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="font-mono text-[0.9em] bg-graphite border border-[var(--color-border-default)] text-electric-light px-1.5 py-0.5 rounded-[var(--radius-sm)]">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="font-mono text-[0.875rem] bg-graphite border border-[var(--color-border-default)] text-cloud p-4 rounded-[var(--radius-md)] my-6 overflow-x-auto">
        {children}
      </pre>
    ),
    hr: () => (
      <hr className="my-10 border-0 h-px bg-[var(--color-border-default)]" />
    ),
    img: ({ src, alt, width, height }) => {
      if (typeof src !== "string") return null;
      return (
        <Image
          src={src}
          alt={alt ?? ""}
          width={typeof width === "number" ? width : 1200}
          height={typeof height === "number" ? height : 630}
          className="my-8 rounded-[var(--radius-md)] border border-[var(--color-border-default)] w-full h-auto"
        />
      );
    },
    strong: ({ children }) => (
      <strong className="text-white font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="text-cloud italic">{children}</em>,
    ...components,
  };
}

function slugify(node: unknown): string | undefined {
  if (typeof node !== "string") return undefined;
  return node
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
