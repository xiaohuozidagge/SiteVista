import { listMdxFiles, readMdxFile } from "./mdx";
import { authorFrontmatterSchema } from "./validation";
import type { AuthorFrontmatter } from "./validation";
import type { Author } from "./types";

/**
 * Get an author by slug.
 */
export function getAuthorBySlug(slug: string): Author | null {
  const files = listMdxFiles("authors");

  for (const file of files) {
    const { frontmatter } = readMdxFile<AuthorFrontmatter>(file);
    const parsed = authorFrontmatterSchema.safeParse(frontmatter);
    if (!parsed.success) continue;
    if (parsed.data.slug === slug) {
      return { slug: parsed.data.slug, frontmatter: parsed.data };
    }
  }

  return null;
}

/**
 * Get all authors.
 */
export function getAllAuthors(): Author[] {
  const files = listMdxFiles("authors");
  const authors: Author[] = [];

  for (const file of files) {
    const { frontmatter } = readMdxFile<AuthorFrontmatter>(file);
    const parsed = authorFrontmatterSchema.safeParse(frontmatter);
    if (parsed.success) {
      authors.push({ slug: parsed.data.slug, frontmatter: parsed.data });
    }
  }

  return authors;
}
