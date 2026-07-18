/**
 * SiteVista Seed Script
 *
 * Creates example categories, authors, and demo blog posts in Sanity.
 *
 * Usage:
 *   1. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local
 *   2. Run: npx tsx scripts/seed/seed.ts
 *
 * All content is explicitly marked as demo/example material.
 * No fake clients, reviews, or growth data.
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN || "";

if (!projectId || !token) {
  console.error(
    "ERROR: Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

async function seed() {
  console.log("Seeding SiteVista demo content...\n");

  // ─── Categories ─────────────────────────────────────────
  const categories = [
    {
      _type: "category",
      _id: "category-seo-audit-guides",
      title: "SEO Audit Guides",
      slug: { _type: "slug", current: "seo-audit-guides" },
      description:
        "Practical guides on how to audit your website's SEO — from crawlability to Core Web Vitals. [Demo category]",
    },
    {
      _type: "category",
      _id: "category-technical-seo",
      title: "Technical SEO",
      slug: { _type: "slug", current: "technical-seo" },
      description:
        "In-depth articles on technical SEO topics including page speed, structured data, and JavaScript rendering. [Demo category]",
    },
    {
      _type: "category",
      _id: "category-content-seo",
      title: "Content & Keywords",
      slug: { _type: "slug", current: "content-seo" },
      description:
        "Content strategy, keyword research, and writing content that ranks. [Demo category]",
    },
  ];

  for (const cat of categories) {
    await client.createOrReplace(cat);
    console.log(`  ✓ Category: ${cat.title}`);
  }

  // ─── Author ─────────────────────────────────────────────
  const author = {
    _type: "author",
    _id: "author-sitevista",
    name: "SiteVista Editor",
    slug: { _type: "slug", current: "sitevista-editor" },
    jobTitle: "SEO Analyst",
    bio: "SEO analyst at SiteVista. Writing about technical SEO, content strategy, and practical website audits. [Demo author]",
  };

  await client.createOrReplace(author);
  console.log(`  ✓ Author: ${author.name}`);

  // ─── Demo Posts ─────────────────────────────────────────
  const posts = [
    {
      _type: "post",
      _id: "post-seo-audit-checklist",
      title: "Complete SEO Audit Checklist [Demo]",
      slug: { _type: "slug", current: "complete-seo-audit-checklist" },
      excerpt:
        "A step-by-step SEO audit checklist covering technical SEO, on-page factors, content quality, and off-page signals. [Demo article]",
      category: { _type: "reference", _ref: "category-seo-audit-guides" },
      author: { _type: "reference", _ref: "author-sitevista" },
      publishedAt: new Date().toISOString(),
      featured: true,
      body: [
        {
          _type: "block",
          style: "h2",
          children: [{ _type: "span", text: "Introduction [Demo]" }],
        },
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "This is a demo article. It demonstrates the blog post structure with Portable Text content blocks. Replace with real content in Sanity Studio.",
            },
          ],
        },
        {
          _type: "block",
          style: "h2",
          children: [{ _type: "span", text: "Technical SEO Checklist" }],
        },
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "Start with crawlability — ensure your site can be discovered and indexed. Check robots.txt, XML sitemaps, and Google Search Console coverage reports.",
            },
          ],
        },
        {
          _type: "block",
          style: "h2",
          children: [{ _type: "span", text: "On-Page SEO Checklist" }],
        },
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "Review title tags, meta descriptions, heading structure, and content quality across your key pages.",
            },
          ],
        },
      ],
      seo: {
        metaTitle: "Complete SEO Audit Checklist [Demo] | SiteVista",
        metaDescription:
          "A step-by-step SEO audit checklist covering technical SEO, on-page factors, and content quality. Demo article.",
      },
    },
    {
      _type: "post",
      _id: "post-what-is-seo-audit",
      title: "What Is Included in an SEO Audit? [Demo]",
      slug: { _type: "slug", current: "what-is-included-in-seo-audit" },
      excerpt:
        "Learn what a professional SEO audit covers — from technical analysis to content evaluation and competitor research. [Demo article]",
      category: { _type: "reference", _ref: "category-seo-audit-guides" },
      author: { _type: "reference", _ref: "author-sitevista" },
      publishedAt: new Date().toISOString(),
      body: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "This demo article explains what goes into a professional SEO audit. Replace with your real content.",
            },
          ],
        },
      ],
    },
    {
      _type: "post",
      _id: "post-website-not-indexed",
      title: "Why Is My Website Not Indexed by Google? [Demo]",
      slug: { _type: "slug", current: "why-is-my-website-not-indexed" },
      excerpt:
        "Common reasons your website is not indexed and how to diagnose and fix indexing issues. [Demo article]",
      category: { _type: "reference", _ref: "category-technical-seo" },
      author: { _type: "reference", _ref: "author-sitevista" },
      publishedAt: new Date().toISOString(),
      body: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "This demo article covers Google indexing issues. Replace with your real content.",
            },
          ],
        },
      ],
    },
    {
      _type: "post",
      _id: "post-keyword-cannibalization",
      title: "How to Identify Keyword Cannibalization [Demo]",
      slug: { _type: "slug", current: "how-to-identify-keyword-cannibalization" },
      excerpt:
        "Keyword cannibalization hurts your rankings. Learn how to find and fix pages competing for the same keywords. [Demo article]",
      category: { _type: "reference", _ref: "category-content-seo" },
      author: { _type: "reference", _ref: "author-sitevista" },
      publishedAt: new Date().toISOString(),
      body: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "This demo article covers keyword cannibalization. Replace with your real content.",
            },
          ],
        },
      ],
    },
  ];

  for (const post of posts) {
    await client.createOrReplace(post);
    console.log(`  ✓ Post: ${post.title}`);
  }

  // ─── Demo Cases ─────────────────────────────────────────
  const cases = [
    {
      _type: "seoAuditCase",
      _id: "case-saas-website",
      title: "SaaS Website SEO Audit Case Study [Demo]",
      slug: { _type: "slug", current: "saas-website-seo-audit-case-study" },
      excerpt:
        "An example SEO audit of a B2B SaaS website, covering technical issues, content gaps, and keyword opportunities. [Demo case study — not a real client]",
      industry: "SaaS",
      websiteType: "B2B SaaS Website",
      auditDate: new Date().toISOString().split("T")[0],
      publishedAt: new Date().toISOString(),
      featured: true,
      caseDisclosure:
        "This is a demo case study based on publicly available information and is not presented as a client engagement.",
      body: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "This is a demo SEO audit case study. It demonstrates the case study format. Replace with your real audit content.",
            },
          ],
        },
      ],
      keyFindings: [
        {
          _type: "finding",
          type: "keyFinding",
          heading: "Missing meta descriptions on 40% of pages [Demo]",
          content:
            "Several key landing pages were missing unique meta descriptions, reducing click-through rates from search results.",
        },
        {
          _type: "finding",
          _key: "finding-critical",
          type: "criticalIssue",
          heading: "Slow mobile page speed [Demo]",
          content:
            "Core Web Vitals assessment showed LCP above 4 seconds on mobile for the homepage and key product pages.",
        },
        {
          _type: "finding",
          _key: "finding-recommendation",
          type: "recommendation",
          heading: "Implement structured data [Demo]",
          content:
            "Adding Product and Organization schema would qualify the site for rich results and improve CTR.",
        },
      ],
      metrics: [
        {
          _type: "metric",
          _key: "m1",
          label: "Pages Indexed",
          value: "78%",
          direction: "down",
          sentiment: "negative",
          description: "22% of pages not indexed due to crawl budget or quality issues [Demo]",
        },
        {
          _type: "metric",
          _key: "m2",
          label: "Mobile LCP",
          value: "4.2s",
          direction: "up",
          sentiment: "negative",
          description: "Above the recommended 2.5s threshold [Demo]",
        },
      ],
    },
    {
      _type: "seoAuditCase",
      _id: "case-ecommerce",
      title: "E-commerce SEO Audit Case Study [Demo]",
      slug: { _type: "slug", current: "ecommerce-seo-audit-case-study" },
      excerpt:
        "An example SEO audit of an e-commerce website, covering product page optimization, category structure, and technical SEO. [Demo case study — not a real client]",
      industry: "E-commerce",
      websiteType: "Online Store",
      auditDate: new Date().toISOString().split("T")[0],
      publishedAt: new Date().toISOString(),
      caseDisclosure:
        "This is a demo case study based on publicly available information and is not presented as a client engagement.",
      body: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "This is a demo e-commerce SEO audit case study. Replace with your real audit content.",
            },
          ],
        },
      ],
    },
  ];

  for (const c of cases) {
    await client.createOrReplace(c);
    console.log(`  ✓ Case: ${c.title}`);
  }

  console.log("\n✅ Seed complete! Run `npm run dev` and visit /studio/ to manage content.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
