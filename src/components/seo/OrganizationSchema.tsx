const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sitevista.net";

export function OrganizationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SiteVista",
    url: SITE_URL,
    description:
      "SiteVista provides manually prepared SEO audits and practical search optimization resources for businesses, marketers, and website owners.",
    sameAs: [] as string[],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
