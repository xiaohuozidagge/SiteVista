import type { BlogFrontmatter, CaseFrontmatter, AuthorFrontmatter } from "./validation";

// ─── Blog Post ──────────────────────────────────────────────
export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string; // raw MDX body
}

// ─── SEO Audit Case ─────────────────────────────────────────
export interface AuditCase {
  slug: string;
  frontmatter: CaseFrontmatter;
  content: string;
}

// ─── Author ─────────────────────────────────────────────────
export interface Author {
  slug: string;
  frontmatter: AuthorFrontmatter;
}

// ─── Category ───────────────────────────────────────────────
export interface Category {
  title: string;
  slug: string;
  description?: string;
}

// ─── Card projections (for lists) ───────────────────────────
export interface BlogCardData {
  title: string;
  slug: string;
  description: string;
  category: string;
  categoryName: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  author: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  featured: boolean;
  readingTime: number;
}

export interface CaseCardData {
  title: string;
  slug: string;
  description: string;
  industry?: string;
  websiteType?: string;
  auditDate?: string;
  publishedAt: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  coverImage?: string;
  coverImageAlt?: string;
  featured: boolean;
  readingTime: number;
}
