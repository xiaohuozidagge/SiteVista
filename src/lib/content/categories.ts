import type { Category } from "./types";

const CATEGORIES: Category[] = [
  {
    title: "SEO Audit Guides",
    slug: "seo-audit-guides",
    description:
      "Practical guides on how to audit your website's SEO — from crawlability to Core Web Vitals.",
  },
  {
    title: "Technical SEO",
    slug: "technical-seo",
    description:
      "In-depth articles on technical SEO topics including page speed, structured data, and JavaScript rendering.",
  },
  {
    title: "Content & Keywords",
    slug: "content-seo",
    description:
      "Content strategy, keyword research, and writing content that ranks.",
  },
];

export function getAllCategories(): Category[] {
  return CATEGORIES;
}

export function getCategoryBySlug(slug: string): Category | null {
  return CATEGORIES.find((c) => c.slug === slug) || null;
}
