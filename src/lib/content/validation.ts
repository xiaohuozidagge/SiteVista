import { z } from "zod";

// ─── Shared ─────────────────────────────────────────────────
const slugSchema = z.string().min(1, "slug is required");
const dateStringSchema = z.string().min(1, "date is required");

// ─── FAQ ────────────────────────────────────────────────────
export const faqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

// ─── Blog Post ──────────────────────────────────────────────
export const blogFrontmatterSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  slug: slugSchema,
  category: z.string().min(1, "category is required"),
  categoryName: z.string().optional(),
  tags: z.array(z.string()).default([]),
  publishedAt: dateStringSchema,
  updatedAt: z.string().optional(),
  author: z.string().min(1, "author is required"),
  featuredImage: z.string().optional(),
  featuredImageAlt: z.string().optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  noIndex: z.boolean().default(false),
  canonical: z.string().optional(),
  relatedPosts: z.array(z.string()).default([]),
  faq: z.array(faqItemSchema).default([]),
});

// ─── SEO Audit Case ─────────────────────────────────────────
export const caseFrontmatterSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  slug: slugSchema,
  industry: z.string().optional(),
  websiteType: z.string().optional(),
  auditDate: dateStringSchema.optional(),
  publishedAt: dateStringSchema,
  updatedAt: z.string().optional(),
  author: z.string().optional(),
  featuredImage: z.string().optional(),
  featuredImageAlt: z.string().optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  noIndex: z.boolean().default(false),
  caseDisclosure: z.string().optional(),
  keyFindings: z
    .array(
      z.object({
        type: z.enum(["keyFinding", "criticalIssue", "recommendation", "quickWin", "important", "expertNote"]),
        heading: z.string(),
        content: z.string(),
      })
    )
    .default([]),
  metrics: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        change: z.string().optional(),
        direction: z.enum(["up", "down", "neutral"]).optional(),
        description: z.string().optional(),
        sentiment: z.enum(["positive", "negative", "neutral"]).optional(),
      })
    )
    .default([]),
  faq: z.array(faqItemSchema).default([]),
  relatedCases: z.array(z.string()).default([]),
});

// ─── Author ─────────────────────────────────────────────────
export const authorFrontmatterSchema = z.object({
  name: z.string().min(1),
  slug: slugSchema,
  jobTitle: z.string().optional(),
  bio: z.string().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  socialLinks: z
    .object({
      linkedin: z.string().optional(),
      x: z.string().optional(),
      website: z.string().optional(),
    })
    .optional(),
});

// ─── Category ───────────────────────────────────────────────
export const categorySchema = z.object({
  title: z.string().min(1),
  slug: slugSchema,
  description: z.string().optional(),
});

// ─── Types ──────────────────────────────────────────────────
export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema>;
export type CaseFrontmatter = z.infer<typeof caseFrontmatterSchema>;
export type AuthorFrontmatter = z.infer<typeof authorFrontmatterSchema>;
export type FAQItem = z.infer<typeof faqItemSchema>;
