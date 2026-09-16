interface ServiceOffer {
  name: string;
  price: number;
  description?: string;
  currency?: string;
}

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  offers?: ServiceOffer[];
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://seoauditpro.cloud";

export function ServiceSchema({
  name,
  description,
  url,
  offers = [],
}: ServiceSchemaProps) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: "SEO Audit",
    provider: {
      "@type": "Organization",
      name: "SEO Audit Pro",
      url: SITE_URL,
    },
    areaServed: "Worldwide",
    url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
  };

  if (offers.length > 0) {
    jsonLd.offers = offers.map((o) => ({
      "@type": "Offer",
      name: o.name,
      price: o.price,
      priceCurrency: o.currency || "USD",
      ...(o.description ? { description: o.description } : {}),
    }));
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
