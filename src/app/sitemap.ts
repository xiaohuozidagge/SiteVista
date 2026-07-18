import { MetadataRoute } from "next";
import { client } from "@/lib/sanity.client";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sitevista.net";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/seo-audit-cases/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/seo-audit-guides/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/technical-seo/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/content-seo/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/seo-audit/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/sample-seo-audit-report/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.1 },
    { url: `${SITE_URL}/terms/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.1 },
    { url: `${SITE_URL}/refund-policy/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.1 },
  ];

  // Fetch dynamic routes from Sanity
  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const [posts, cases] = await Promise.all([
      client.fetch<{ slug: string; updatedAt?: string }[]>(
        `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, updatedAt }`
      ),
      client.fetch<{ slug: string; updatedAt?: string }[]>(
        `*[_type == "seoAuditCase" && defined(slug.current)]{ "slug": slug.current, updatedAt }`
      ),
    ]);

    dynamicRoutes = [
      ...(posts || []).map((p) => ({
        url: `${SITE_URL}/blog/${p.slug}/`,
        lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
      ...(cases || []).map((c) => ({
        url: `${SITE_URL}/seo-audit-cases/${c.slug}/`,
        lastModified: c.updatedAt ? new Date(c.updatedAt) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ];
  } catch {
    // Sanity not configured yet — return static routes only
  }

  return [...staticRoutes, ...dynamicRoutes];
}
