import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  if (!items || items.length === 0) return null;

  const breadcrumbList = [
    { label: "Home", href: "/" },
    ...items,
  ];

  // Build Schema.org BreadcrumbList JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbList.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@id": item.href
          ? `${process.env.NEXT_PUBLIC_SITE_URL || "https://sitevista.net"}${item.href}`
          : undefined,
        name: item.label,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] py-3 overflow-x-auto"
      >
        {breadcrumbList.map((item, index) => {
          const isLast = index === breadcrumbList.length - 1;

          return (
            <span key={index} className="flex items-center gap-1.5 whitespace-nowrap">
              {index === 0 ? (
                item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors no-underline"
                  >
                    <Home size={14} />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                ) : (
                  <span className="flex items-center gap-1 text-[var(--color-text-muted)]">
                    <Home size={14} />
                  </span>
                )
              ) : isLast ? (
                <span
                  className="text-[var(--color-text)] font-medium truncate"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors no-underline truncate"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="truncate">{item.label}</span>
              )}

              {!isLast && (
                <ChevronRight
                  size={14}
                  className="text-[var(--color-border-hover)] flex-shrink-0"
                  aria-hidden="true"
                />
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
