interface ArticleBodyProps {
  children: React.ReactNode;
}

export function ArticleBody({ children }: ArticleBodyProps) {
  return (
    <article
      className="
        prose prose-slate min-w-0 max-w-none
        prose-lg

        prose-p:my-6
        prose-p:text-[17px]
        prose-p:leading-[1.85]

        prose-headings:font-[family-name:var(--font-heading)]
        prose-headings:tracking-tight
        prose-headings:scroll-mt-24

        prose-h2:mb-6
        prose-h2:mt-16
        prose-h2:text-3xl
        prose-h2:leading-tight

        prose-h3:mb-4
        prose-h3:mt-10
        prose-h3:text-2xl
        prose-h3:leading-snug

        prose-h4:mb-3
        prose-h4:mt-8

        prose-ul:my-6
        prose-ol:my-6
        prose-li:my-2
        prose-li:leading-8

        prose-blockquote:my-8
        prose-blockquote:border-l-4
        prose-blockquote:border-[var(--color-border-hover)]
        prose-blockquote:bg-[var(--color-bg-secondary)]
        prose-blockquote:px-6
        prose-blockquote:py-1
        prose-blockquote:not-italic

        prose-hr:my-12

        prose-img:my-10
        prose-img:rounded-xl
        prose-img:max-w-full

        prose-a:text-[var(--color-accent)]
        prose-a:no-underline
        hover:prose-a:underline

        prose-strong:text-[var(--color-text)]

        prose-figcaption:text-center
        prose-figcaption:text-sm
        prose-figcaption:text-[var(--color-text-muted)]

        prose-pre:my-8
        prose-pre:rounded-xl
        prose-pre:px-5
        prose-pre:py-5
        prose-pre:overflow-x-auto

        prose-code:text-sm
        prose-code:before:content-none
        prose-code:after:content-none
      "
    >
      {children}
    </article>
  );
}
