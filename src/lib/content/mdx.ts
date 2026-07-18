import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import readingTime from "reading-time";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

const CONTENT_ROOT = path.join(process.cwd(), "content");

/**
 * Read and parse an MDX file. Returns raw frontmatter + raw MDX body.
 */
export function readMdxFile<T>(filePath: string): {
  frontmatter: T;
  content: string;
  stats: { readingTime: number; wordCount: number };
} {
  const fullPath = path.join(CONTENT_ROOT, filePath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`MDX file not found: ${filePath}`);
  }

  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    frontmatter: data as T,
    content,
    stats: {
      readingTime: Math.max(1, Math.round(stats.minutes)),
      wordCount: stats.words,
    },
  };
}

/**
 * Serialize MDX content to be rendered with <MDXRemote>.
 */
export async function serializeMdx(source: string): Promise<MDXRemoteSerializeResult> {
  return serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
      ],
    },
    parseFrontmatter: false,
  });
}

/**
 * List all MDX files in a content subdirectory.
 *
 * Only in server components / RSC — uses Node.js `fs`.
 */
export function listMdxFiles(subdir: string): string[] {
  const dir = path.join(CONTENT_ROOT, subdir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => path.join(subdir, f));
}
