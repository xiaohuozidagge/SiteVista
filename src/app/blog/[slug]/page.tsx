import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getAllPostSlugs,
  getAllPosts,
  toBlogCardData,
  getReadingTime,
} from "@/lib/content/blog";
import { getAuthorBySlug } from "@/lib/content/authors";
import { BlogPostingSchema } from "@/components/seo/BlogPostingSchema";
import { FAQPageSchema } from "@/components/seo/FAQPageSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { FindingBox, MetricCards, AuditCTA, FullImage, MDXTable } from "@/components/mdx";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { ArticleBody } from "@/components/content/ArticleBody";
import type { TocItem } from "@/lib/content/types";

const mdxComponents = {
  FindingBox,
  MetricCards,
  AuditCTA,
  FullImage,
  table: MDXTable,
};

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: {
      canonical:
        post.frontmatter.canonical ||
        `https://seoauditpro.cloud/blog/${slug}/`,
    },
    robots: { index: !post.frontmatter.noIndex, follow: true },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: post.frontmatter.featuredImage
        ? [{ url: post.frontmatter.featuredImage }]
        : [],
    },
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://seoauditpro.cloud";

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const author = getAuthorBySlug(post.frontmatter.author);
  const readingTime = getReadingTime(post.content);
  const showUpdated =
    post.frontmatter.updatedAt &&
    post.frontmatter.publishedAt &&
    post.frontmatter.updatedAt > post.frontmatter.publishedAt;

  // Related posts
  const relatedPosts = [];
  if (post.frontmatter.relatedPosts.length > 0) {
    for (const rpSlug of post.frontmatter.relatedPosts) {
      const rp = getPostBySlug(rpSlug);
      if (rp && rp.slug !== slug) relatedPosts.push(toBlogCardData(rp));
    }
  }
  if (relatedPosts.length === 0) {
    relatedPosts.push(
      ...getAllPosts()
        .filter((p) => p.frontmatter.category === post.frontmatter.category && p.slug !== slug)
        .slice(0, 3)
        .map(toBlogCardData)
    );
  }

  const headings = extractHeadings(post.content);

  return (
    <>
      <BlogPostingSchema
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        imageUrl={post.frontmatter.featuredImage}
        publishedAt={post.frontmatter.publishedAt}
        updatedAt={post.frontmatter.updatedAt}
        authorName={author?.frontmatter.name}
        url={`${SITE_URL}/blog/${slug}/`}
      />
      <BreadcrumbSchema
        items={[
          { label: post.frontmatter.categoryName || post.frontmatter.category, href: `/${post.frontmatter.category}/` },
          { label: post.frontmatter.title },
        ]}
      />
      {post.frontmatter.faq.length > 0 && <FAQPageSchema questions={post.frontmatter.faq} />}

      <ArticleLayout
        headings={headings}
        header={
          <>
            {/* Breadcrumb */}
            <nav className="text-sm text-[var(--color-text-muted)] mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2">
                <li><Link href="/" className="hover:text-[var(--color-accent)]">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link href={`/${post.frontmatter.category}/`} className="hover:text-[var(--color-accent)]">{post.frontmatter.categoryName || post.frontmatter.category}</Link></li>
                <li aria-hidden>/</li>
                <li className="text-[var(--color-text)] truncate" aria-current="page">{post.frontmatter.title}</li>
              </ol>
            </nav>

            <Link href={`/${post.frontmatter.category}/`} className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
              {post.frontmatter.categoryName || post.frontmatter.category}
            </Link>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.15] tracking-tight lg:text-5xl font-[family-name:var(--font-heading)]">
              {post.frontmatter.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-text-secondary)] lg:text-xl">
              {post.frontmatter.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--color-text-muted)]">
              {author && <span>{author.frontmatter.name}</span>}
              <time dateTime={post.frontmatter.publishedAt}>
                {new Date(post.frontmatter.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </time>
              {showUpdated && (
                <time dateTime={post.frontmatter.updatedAt!}>
                  Updated: {new Date(post.frontmatter.updatedAt!).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </time>
              )}
              <span>{readingTime} min read</span>
            </div>

            {/* Featured Image */}
            {post.frontmatter.featuredImage && (
              <figure className="mt-8">
                <img src={post.frontmatter.featuredImage} alt={post.frontmatter.featuredImageAlt || post.frontmatter.title} className="w-full rounded-xl" />
                {post.frontmatter.featuredImageAlt && (
                  <figcaption className="mt-2 text-center text-sm text-[var(--color-text-muted)]">{post.frontmatter.featuredImageAlt}</figcaption>
                )}
              </figure>
            )}
          </>
        }
        footerContent={
          <>
            {/* Tags */}
            {post.frontmatter.tags.length > 0 && (
              <div className="mb-10 flex flex-wrap gap-2">
                {post.frontmatter.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] rounded-full">{tag}</span>
                ))}
              </div>
            )}

            {/* FAQ */}
            {post.frontmatter.faq.length > 0 && (
              <section className="mt-16 border-t border-[var(--color-border)] pt-10">
                <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {post.frontmatter.faq.map((item, i) => (
                    <details key={i} className="group border border-[var(--color-border)] rounded-lg">
                      <summary className="px-5 py-4 font-semibold cursor-pointer hover:bg-[var(--color-bg-secondary)] list-none flex items-center justify-between">
                        {item.question}<span className="text-[var(--color-text-muted)] group-open:rotate-180 transition-transform">▾</span>
                      </summary>
                      <div className="px-5 pb-4 text-[var(--color-text-secondary)]">{item.answer}</div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Author Box */}
            {author && (
              <section className="mt-16 border-t border-[var(--color-border)] pt-10">
                <div className="flex items-start gap-4 p-6 bg-[var(--color-bg-secondary)] rounded-lg">
                  <div className="w-14 h-14 rounded-full bg-[var(--color-border)] flex items-center justify-center text-lg font-bold text-[var(--color-text-muted)] shrink-0">{author.frontmatter.name.charAt(0)}</div>
                  <div>
                    <p className="font-bold font-[family-name:var(--font-heading)]">{author.frontmatter.name}</p>
                    {author.frontmatter.jobTitle && <p className="text-sm text-[var(--color-text-muted)]">{author.frontmatter.jobTitle}</p>}
                    {author.frontmatter.bio && <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{author.frontmatter.bio}</p>}
                  </div>
                </div>
              </section>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-16 border-t border-[var(--color-border)] pt-10">
                <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">Related Articles</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map((rp) => (
                    <Link key={rp.slug} href={`/blog/${rp.slug}/`} className="group block border border-[var(--color-border)] rounded-lg overflow-hidden hover:shadow-[var(--shadow-card-hover)] transition-shadow">
                      <div className="aspect-video bg-[var(--color-bg-secondary)] flex items-center justify-center">
                        {rp.featuredImage ? (
                          <img src={rp.featuredImage} alt={rp.featuredImageAlt || rp.title} className="w-full h-full object-cover" loading="lazy" />
                        ) : (
                          <span className="text-[var(--color-text-muted)] text-xs">Image</span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold font-[family-name:var(--font-heading)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">{rp.title}</h3>
                        <time dateTime={rp.publishedAt} className="mt-2 text-xs text-[var(--color-text-muted)]">
                          {new Date(rp.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                        </time>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <section className="mt-20 bg-[var(--color-bg-secondary)] rounded-xl p-10 lg:p-12 text-center">
              <h2 className="text-xl font-bold font-[family-name:var(--font-heading)]">Need a professional SEO audit?</h2>
              <p className="mt-2 text-[var(--color-text-secondary)]">Get a manually prepared audit with clear, prioritized recommendations.</p>
              <Link href="/seo-audit/" className="mt-6 inline-flex items-center px-6 py-3 rounded-md bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-light)] transition-colors">Audit Your Website</Link>
            </section>
          </>
        }
      >
        <ArticleBody>
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]] },
              parseFrontmatter: false,
            }}
            components={mdxComponents}
          />
        </ArticleBody>
      </ArticleLayout>
    </>
  );
}

function extractHeadings(raw: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const result: TocItem[] = [];
  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(raw)) !== null) {
    const level = (match[1].length === 2 ? 2 : 3) as 2 | 3;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/<[^>]*>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    result.push({ id, text, level });
  }
  return result;
}
