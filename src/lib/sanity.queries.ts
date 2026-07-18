import { groq } from "next-sanity";
import { client } from "./sanity.client";

// ─── Site Settings ───────────────────────────────────────────
export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]{
  siteName, siteUrl, siteDescription,
  logo, favicon, defaultOgImage,
  contactEmail, footerDescription,
  organizationName, organizationDescription,
  socialLinks
}`;

// ─── Navigation ──────────────────────────────────────────────
export const CATEGORIES_NAV_QUERY = groq`*[_type == "category"] | order(title asc) {
  title, slug, description
}`;

// ─── Posts ───────────────────────────────────────────────────
const POST_CARD_FRAGMENT = groq`
  _id, title, slug, excerpt, publishedAt,
  "readingTime": round(length(pt::text(body)) / 5 / 200),
  featuredImage {
    asset->{ _id, url, metadata { dimensions { width, height } } },
    alt
  },
  "category": category->{ title, slug }
`;

export const HOME_PAGE_QUERY = groq`{
  "featuredCase": *[_type == "seoAuditCase" && featured == true] | order(publishedAt desc)[0]{
    _id, title, slug, excerpt, industry, auditDate,
    featuredImage { asset->{ _id, url }, alt },
    "readingTime": round(length(pt::text(body)) / 5 / 200)
  },
  "latestCases": *[_type == "seoAuditCase"] | order(publishedAt desc)[0...3]{
    _id, title, slug, excerpt, industry, auditDate,
    featuredImage { asset->{ _id, url }, alt }
  },
  "seoAuditGuides": *[_type == "post" && category->slug.current == "seo-audit-guides"] | order(publishedAt desc)[0...3]{
    ${POST_CARD_FRAGMENT}
  },
  "technicalSeo": *[_type == "post" && category->slug.current == "technical-seo"] | order(publishedAt desc)[0...3]{
    ${POST_CARD_FRAGMENT}
  },
  "contentSeo": *[_type == "post" && category->slug.current == "content-seo"] | order(publishedAt desc)[0...3]{
    ${POST_CARD_FRAGMENT}
  }
}`;

export const POST_BY_SLUG_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
  _id, title, slug, excerpt, body[],
  publishedAt, updatedAt,
  "readingTime": round(length(pt::text(body)) / 5 / 200),
  featuredImage { asset->{ _id, url }, alt },
  "category": category->{ title, slug },
  "tags": tags[]->{ title, slug },
  "author": author->{ name, slug, jobTitle, bio, image, imageAlt, socialLinks },
  featured,
  "relatedPosts": relatedPosts[]->{ ${POST_CARD_FRAGMENT} },
  faq[] { question, answer },
  seo { metaTitle, metaDescription, canonicalUrl, openGraphImage, noIndex, noFollow, focusKeyword }
}`;

export const POSTS_BY_CATEGORY_QUERY = groq`{
  "category": *[_type == "category" && slug.current == $categorySlug][0]{
    _id, title, slug, description,
    featuredImage { asset->{ _id, url }, alt },
    seo
  },
  "posts": *[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc)[$start...$end]{
    ${POST_CARD_FRAGMENT}
  },
  "total": count(*[_type == "post" && category->slug.current == $categorySlug])
}`;

export const ALL_POSTS_SLUGS_QUERY = groq`*[_type == "post" && defined(slug.current)]{
  "slug": slug.current
}`;

// ─── SEO Audit Cases ─────────────────────────────────────────
const CASE_CARD_FRAGMENT = groq`
  _id, title, slug, excerpt, industry, auditDate,
  featuredImage { asset->{ _id, url }, alt },
  "readingTime": round(length(pt::text(body)) / 5 / 200)
`;

export const ALL_CASES_SLUGS_QUERY = groq`*[_type == "seoAuditCase" && defined(slug.current)]{
  "slug": slug.current
}`;

export const CASES_LIST_QUERY = groq`{
  "featuredCase": *[_type == "seoAuditCase" && featured == true] | order(publishedAt desc)[0]{
    ${CASE_CARD_FRAGMENT}
  },
  "cases": *[_type == "seoAuditCase"] | order(publishedAt desc)[$start...$end]{
    ${CASE_CARD_FRAGMENT}
  },
  "total": count(*[_type == "seoAuditCase"])
}`;

export const CASE_BY_SLUG_QUERY = groq`*[_type == "seoAuditCase" && slug.current == $slug][0]{
  _id, title, slug, excerpt, body[],
  industry, websiteType, auditDate,
  publishedAt, updatedAt,
  caseDisclosure,
  "readingTime": round(length(pt::text(body)) / 5 / 200),
  featuredImage { asset->{ _id, url }, alt },
  keyFindings[] { type, heading, content },
  metrics[] { label, value, change, direction, description, sentiment },
  featured,
  "relatedCases": relatedCases[]->{ ${CASE_CARD_FRAGMENT} },
  faq[] { question, answer },
  seo { metaTitle, metaDescription, canonicalUrl, openGraphImage, noIndex, noFollow, focusKeyword }
}`;

// ─── Pages ───────────────────────────────────────────────────
export const PAGE_BY_SLUG_QUERY = groq`*[_type == "page" && slug.current == $slug][0]{
  _id, title, slug, excerpt, body[],
  featuredImage { asset->{ _id, url }, alt },
  seo { metaTitle, metaDescription, canonicalUrl, openGraphImage, noIndex, noFollow, focusKeyword }
}`;

// ─── Static Paths ────────────────────────────────────────────
export async function getPostSlugs() {
  const data = await client.fetch<{ slug: string }[]>(ALL_POSTS_SLUGS_QUERY);
  return (data || []).map((item) => ({ slug: item.slug }));
}

export async function getCaseSlugs() {
  const data = await client.fetch<{ slug: string }[]>(ALL_CASES_SLUGS_QUERY);
  return (data || []).map((item) => ({ slug: item.slug }));
}

// ─── Article Cards helper ────────────────────────────────────
export const LATEST_POSTS_QUERY = groq`*[_type == "post"] | order(publishedAt desc)[0...$limit]{
  ${POST_CARD_FRAGMENT}
}`;
