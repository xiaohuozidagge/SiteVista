import type { TocItem } from "@/lib/content/types";
import { TableOfContents } from "./TableOfContents";

interface ArticleLayoutProps {
  children: React.ReactNode;
  headings?: TocItem[];
  header: React.ReactNode;
  footerContent?: React.ReactNode;
}

export function ArticleLayout({
  children,
  headings = [],
  header,
  footerContent,
}: ArticleLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-[1240px] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
      {/* Header: breadcrumb, title, description, meta */}
      {header}

      {/* Body + ToC */}
      <div className="mt-12 lg:grid lg:grid-cols-[minmax(0,820px)_260px] lg:justify-between lg:gap-16">
        {/* Main content area */}
        <div className="min-w-0">{children}</div>

        {/* Table of Contents sidebar */}
        {headings.length > 0 && <TableOfContents items={headings} />}
      </div>

      {/* Footer modules: findings, FAQ, disclosure, related, CTA */}
      {footerContent && (
        <div className="mx-auto max-w-[820px]">{footerContent}</div>
      )}
    </div>
  );
}
