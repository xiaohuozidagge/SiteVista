import React from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

interface RichTextBlockProps {
  value: {
    content?: PortableTextBlock[];
    [key: string]: unknown;
  };
}

const customComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 leading-relaxed last:mb-0">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold mt-10 mb-4 text-[var(--color-text)]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold mt-8 mb-3 text-[var(--color-text)]">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-[family-name:var(--font-heading)] text-lg font-semibold mt-6 mb-2 text-[var(--color-text)]">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--color-accent)] pl-5 py-1 my-5 text-[var(--color-text-secondary)] italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const openInNewTab = value?.openInNewTab || value?.blank || false;
      const nofollow = value?.nofollow || false;
      const sponsored = value?.sponsored || false;

      const relParts: string[] = [];
      if (nofollow) relParts.push("nofollow");
      if (sponsored) relParts.push("sponsored");
      if (openInNewTab) relParts.push("noopener", "noreferrer");

      const rel = relParts.length > 0 ? relParts.join(" ") : undefined;

      return (
        <a
          href={href}
          target={openInNewTab ? "_blank" : undefined}
          rel={rel}
          className="text-[var(--color-accent)] underline decoration-[var(--color-accent)]/30 hover:decoration-[var(--color-accent)] transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-6 mb-5 space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-6 mb-5 space-y-1">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
};

export default function RichTextBlock({ value }: RichTextBlockProps) {
  if (!value?.content || !Array.isArray(value.content) || value.content.length === 0) {
    return null;
  }

  return (
    <div className="prose prose-slate max-w-none prose-headings:font-[family-name:var(--font-heading)] prose-headings:scroll-mt-24 prose-a:text-[var(--color-accent)] prose-a:no-underline hover:prose-a:underline prose-img:rounded-[var(--radius-lg)]">
      <PortableText value={value.content} components={customComponents} />
    </div>
  );
}
