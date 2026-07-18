import { listMdxFiles, readMdxFile } from "./mdx";
import { blogFrontmatterSchema } from "./validation";
import type { BlogFrontmatter } from "./validation";
import type { BlogPost, BlogCardData } from "./types";
import readingTime from "reading-time";

const CATEGORY_NAMES: Record<string, string> = {
  "seo-audit-guides": "SEO Audit Guides",
  "technical-seo": "Technical SEO",
  "content-seo": "Content & Keywords",
};

/**
 * Get all published (non-draft) blog posts sorted by date (newest first).
 */
export function getAllPosts(): BlogPost[] {
  const files = listMdxFiles("blog");
  const posts: BlogPost[] = [];

  for (const file of files) {
    const { frontmatter, content } = readMdxFile<BlogFrontmatter>(file);
    const parsed = blogFrontmatterSchema.safeParse(frontmatter);

    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in ${file}:\n${parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n")}`
      );
    }

    const data = parsed.data;
    if (data.draft) continue;

    posts.push({
      slug: data.slug,
      frontmatter: data,
      content,
    });
  }

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime()
  );
}

/**
 * Get a single blog post by slug.
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

/**
 * Get posts by category slug.
 */
export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return getAllPosts().filter(
    (p) => p.frontmatter.category === categorySlug
  );
}

/**
 * Get all unique post slugs (for generateStaticParams).
 */
export function getAllPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

/**
 * Get card projection for list rendering.
 */
export function toBlogCardData(post: BlogPost, rt?: number): BlogCardData {
  return {
    title: post.frontmatter.title,
    slug: post.slug,
    description: post.frontmatter.description,
    category: post.frontmatter.category,
    categoryName: post.frontmatter.categoryName || CATEGORY_NAMES[post.frontmatter.category] || post.frontmatter.category,
    tags: post.frontmatter.tags,
    publishedAt: post.frontmatter.publishedAt,
    updatedAt: post.frontmatter.updatedAt,
    author: post.frontmatter.author,
    featuredImage: post.frontmatter.featuredImage,
    featuredImageAlt: post.frontmatter.featuredImageAlt,
    featured: post.frontmatter.featured,
    readingTime: rt || 1,
  };
}

export function getReadingTime(content: string): number {
  return Math.max(1, Math.round(readingTime(content).minutes));
}
