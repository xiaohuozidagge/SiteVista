import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content/blog";
import { getAllCases } from "@/lib/content/cases";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://seoauditpro.cloud";

export default function sitemap(): MetadataRoute.Sitemap {
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

  const posts = getAllPosts().filter((p) => !p.frontmatter.noIndex);
  const cases = getAllCases().filter((c) => !c.frontmatter.noIndex);

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}/`,
      lastModified: new Date(p.frontmatter.updatedAt || p.frontmatter.publishedAt || ""),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...cases.map((c) => ({
      url: `${SITE_URL}/seo-audit-cases/${c.slug}/`,
      lastModified: new Date(c.frontmatter.updatedAt || c.frontmatter.publishedAt || c.frontmatter.date || ""),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
