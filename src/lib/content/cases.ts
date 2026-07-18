import { listMdxFiles, readMdxFile } from "./mdx";
import { caseFrontmatterSchema } from "./validation";
import type { CaseFrontmatter } from "./validation";
import type { AuditCase, CaseCardData } from "./types";

/**
 * Get all published (non-draft) audit cases sorted by date.
 */
export function getAllCases(): AuditCase[] {
  const files = listMdxFiles("cases");
  const cases: AuditCase[] = [];

  for (const file of files) {
    const { frontmatter, content } = readMdxFile<CaseFrontmatter>(file);
    const parsed = caseFrontmatterSchema.safeParse(frontmatter);

    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in ${file}:\n${parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n")}`
      );
    }

    const data = parsed.data;
    if (data.draft) continue;

    cases.push({
      slug: data.slug,
      frontmatter: data,
      content,
    });
  }

  return cases.sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime()
  );
}

/**
 * Get a single case by slug.
 */
export function getCaseBySlug(slug: string): AuditCase | null {
  return getAllCases().find((c) => c.slug === slug) || null;
}

/**
 * Get all case slugs.
 */
export function getAllCaseSlugs(): string[] {
  return getAllCases().map((c) => c.slug);
}

/**
 * Card projection.
 */
export function toCaseCardData(c: AuditCase): CaseCardData {
  return {
    title: c.frontmatter.title,
    slug: c.slug,
    description: c.frontmatter.description,
    industry: c.frontmatter.industry,
    websiteType: c.frontmatter.websiteType,
    auditDate: c.frontmatter.auditDate,
    publishedAt: c.frontmatter.publishedAt,
    featuredImage: c.frontmatter.featuredImage,
    featuredImageAlt: c.frontmatter.featuredImageAlt,
    featured: c.frontmatter.featured,
    readingTime: 1,
  };
}
