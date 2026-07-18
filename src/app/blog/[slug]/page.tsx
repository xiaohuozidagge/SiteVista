import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs, getAllPosts, toBlogCardData, getReadingTime } from "@/lib/content/blog";
import { getAuthorBySlug } from "@/lib/content/authors";
import { serializeMdx } from "@/lib/content/mdx";
import { BlogPostingSchema } from "@/components/seo/BlogPostingSchema";
import { FAQPageSchema } from "@/components/seo/FAQPageSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { BlogCardData } from "@/lib/content/types";

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
    alternates: { canonical: post.frontmatter.canonical || `/blog/${slug}/` },
    robots: { index: !post.frontmatter.noIndex, follow: true },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: post.frontmatter.featuredImage ? [{ url: post.frontmatter.featuredImage }] : [],
    },
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://seoauditpro.cloud";

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const author = getAuthorBySlug(post.frontmatter.author);
  const mdxSource = await serializeMdx(post.content);
  const readingTime = getReadingTime(post.content);

  const showUpdated = post.frontmatter.updatedAt && post.frontmatter.updatedAt > post.frontmatter.publishedAt;

  // Auto-suggest related posts by same category if none explicitly set
  const relatedPosts: BlogCardData[] = [];
  if (post.frontmatter.relatedPosts.length > 0) {
    for (const rpSlug of post.frontmatter.relatedPosts) {
      const rp = getPostBySlug(rpSlug);
      if (rp && rp.slug !== slug) relatedPosts.push(toBlogCardData(rp));
    }
  }
  if (relatedPosts.length === 0) {
    const sameCategory = getAllPosts().filter((p) => p.frontmatter.category === post.frontmatter.category && p.slug !== slug).slice(0, 3);
    relatedPosts.push(...sameCategory.map(toBlogCardData));
  }

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
      <BreadcrumbSchema items={[{ label: post.frontmatter.categoryName || post.frontmatter.category, href: `/${post.frontmatter.category}/` }, { label: post.frontmatter.title }]} />
      {post.frontmatter.faq.length > 0 && <FAQPageSchema questions={post.frontmatter.faq} />}

      <article className="container-content py-12 lg:py-16">
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

        {/* Category */}
        <Link href={`/${post.frontmatter.category}/`} className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">{post.frontmatter.categoryName || post.frontmatter.category}</Link>

        {/* Title */}
        <h1 className="mt-3 text-3xl lg:text-4xl font-bold font-[family-name:var(--font-heading)] text-balance leading-tight">{post.frontmatter.title}</h1>
        <p className="mt-4 text-lg text-[var(--color-text-secondary)]">{post.frontmatter.description}</p>

        {/* Meta */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)]">
          {author && <span>{author.frontmatter.name}</span>}
          <time dateTime={post.frontmatter.publishedAt}>{new Date(post.frontmatter.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
          {showUpdated && <time dateTime={post.frontmatter.updatedAt!}>Updated: {new Date(post.frontmatter.updatedAt!).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>}
          <span>{readingTime} min read</span>
        </div>

        {/* Featured Image */}
        {post.frontmatter.featuredImage && (
          <figure className="mt-8 -mx-4 lg:-mx-8">
            <img src={post.frontmatter.featuredImage} alt={post.frontmatter.featuredImageAlt || post.frontmatter.title} className="w-full rounded-lg" />
            {post.frontmatter.featuredImageAlt && <figcaption className="mt-2 text-center text-sm text-[var(--color-text-muted)]">{post.frontmatter.featuredImageAlt}</figcaption>}
          </figure>
        )}

        {/* Body */}
        <div className="mt-10 prose prose-slate max-w-none prose-headings:font-[family-name:var(--font-heading)] prose-headings:scroll-mt-24 prose-a:text-[var(--color-accent)]">
          <MDXRemote source={mdxSource} />
        </div>

        {/* Tags */}
        {post.frontmatter.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {post.frontmatter.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-medium bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] rounded-full">{tag}</span>
            ))}
          </div>
        )}

        {/* FAQ */}
        {post.frontmatter.faq.length > 0 && (
          <section className="mt-12 border-t border-[var(--color-border)] pt-10">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-2">
              {post.frontmatter.faq.map((item, i) => (
                <details key={i} className="group border border-[var(--color-border)] rounded-lg">
                  <summary className="px-5 py-4 font-semibold cursor-pointer hover:bg-[var(--color-bg-secondary)] list-none flex items-center justify-between">{item.question}<span className="text-[var(--color-text-muted)] group-open:rotate-180 transition-transform">▾</span></summary>
                  <div className="px-5 pb-4 text-[var(--color-text-secondary)]">{item.answer}</div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Author Box */}
        {author && (
          <section className="mt-12 border-t border-[var(--color-border)] pt-10">
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
          <section className="mt-12 border-t border-[var(--color-border)] pt-10">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}/`} className="group block border border-[var(--color-border)] rounded-lg overflow-hidden hover:shadow-[var(--shadow-card-hover)] transition-shadow">
                  <div className="aspect-video bg-[var(--color-bg-secondary)] flex items-center justify-center">
                    {rp.featuredImage ? <img src={rp.featuredImage} alt={rp.featuredImageAlt || rp.title} className="w-full h-full object-cover" loading="lazy" /> : <span className="text-[var(--color-text-muted)] text-xs">Image</span>}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold font-[family-name:var(--font-heading)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">{rp.title}</h3>
                    <time dateTime={rp.publishedAt} className="mt-2 text-xs text-[var(--color-text-muted)]">{new Date(rp.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</time>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* SEO Audit CTA */}
        <section className="mt-12 bg-[var(--color-bg-secondary)] rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold font-[family-name:var(--font-heading)]">Need a professional SEO audit?</h2>
          <p className="mt-2 text-[var(--color-text-secondary)]">Get a manually prepared audit with clear, prioritized recommendations.</p>
          <Link href="/seo-audit/" className="mt-6 inline-flex items-center px-6 py-3 rounded-md bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-light)] transition-colors">Audit Your Website</Link>
        </section>
      </article>
    </>
  );
}
