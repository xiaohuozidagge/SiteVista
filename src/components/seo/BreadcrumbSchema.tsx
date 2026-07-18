interface CrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbSchemaProps {
  items: CrumbItem[];
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://seoauditpro.cloud";

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  if (!items || items.length === 0) return null;

  const allItems = [{ label: "Home", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@id": item.href ? `${SITE_URL}${item.href}` : undefined,
        name: item.label,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
