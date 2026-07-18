import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity.client";
import { POST_BY_SLUG_QUERY, ALL_POSTS_SLUGS_QUERY, LATEST_POSTS_QUERY } from "@/lib/sanity.queries";
import type { PostData, PostCardData } from "@/lib/sanity.types";
import { BlogPostingSchema } from "@/components/seo/BlogPostingSchema";
import { FAQPageSchema } from "@/components/seo/FAQPageSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(ALL_POSTS_SLUGS_QUERY);
  return (slugs || []).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<PostData | null>(POST_BY_SLUG_QUERY, { slug });
  if (!post) return { title: "Post Not Found" };

  const seo = post.seo;
  return {
    title: seo?.metaTitle || post.title,
    description: seo?.metaDescription || post.excerpt,
    alternates: { canonical: seo?.canonicalUrl || `/blog/${slug}/` },
    robots: {
      index: !seo?.noIndex,
      follow: !seo?.noFollow,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await client.fetch<PostData | null>(POST_BY_SLUG_QUERY, { slug });

  if (!post) notFound();

  const showUpdated =
    post.updatedAt &&
    post.publishedAt &&
    post.updatedAt > post.publishedAt;

  return (
    <>
      <BlogPostingSchema
        title={post.title}
        description={post.excerpt}
        imageUrl={post.featuredImage?.asset?.url ? `${post.featuredImage.asset.url}?w=1200&h=630&fit=crop&auto=format` : undefined}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        authorName={post.author?.name}
        url={`${process.env.NEXT_PUBLIC_SITE_URL || "https://sitevista.net"}/blog/${post.slug.current}/`}
      />
      <BreadcrumbSchema
        items={[
          ...(post.category ? [{ label: post.category.title, href: `/${post.category.slug.current}/` }] : []),
          { label: post.title },
        ]}
      />
      {post.faq && post.faq.length > 0 && <FAQPageSchema questions={post.faq} />}
      <article className="container-content py-12 lg:py-16">
      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--color-text-muted)] mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="hover:text-[var(--color-accent)]">Home</Link></li>
          <li aria-hidden>/</li>
          {post.category && (
            <>
              <li><Link href={`/${post.category.slug.current}/`} className="hover:text-[var(--color-accent)]">{post.category.title}</Link></li>
              <li aria-hidden>/</li>
            </>
          )}
          <li className="text-[var(--color-text)] truncate" aria-current="page">{post.title}</li>
        </ol>
      </nav>

      {/* Category */}
      {post.category && (
        <Link href={`/${post.category.slug.current}/`} className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
          {post.category.title}
        </Link>
      )}

      {/* Title */}
      <h1 className="mt-3 text-3xl lg:text-4xl font-bold font-[family-name:var(--font-heading)] text-balance leading-tight">
        {post.title}
      </h1>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="mt-4 text-lg text-[var(--color-text-secondary)]">{post.excerpt}</p>
      )}

      {/* Meta */}
      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)]">
        {post.author && (
          <span>{post.author.name}</span>
        )}
        {post.publishedAt && (
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </time>
        )}
        {showUpdated && (
          <time dateTime={post.updatedAt!}>
            Updated: {new Date(post.updatedAt!).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </time>
        )}
        {post.readingTime != null && post.readingTime > 0 && (
          <span>{post.readingTime} min read</span>
        )}
      </div>

      {/* Featured Image */}
      {post.featuredImage?.asset?.url && (
        <figure className="mt-8 -mx-4 lg:-mx-8">
          <img
            src={`${post.featuredImage.asset.url}?w=1200&h=675&fit=crop&auto=format`}
            alt={post.featuredImage.alt || post.title}
            className="w-full rounded-lg"
          />
          {post.featuredImage.alt && (
            <figcaption className="mt-2 text-center text-sm text-[var(--color-text-muted)]">{post.featuredImage.alt}</figcaption>
          )}
        </figure>
      )}

      {/* Body */}
      <div className="mt-10 prose prose-slate max-w-none prose-headings:font-[family-name:var(--font-heading)] prose-headings:scroll-mt-24 prose-a:text-[var(--color-accent)]">
        {post.body ? (
          <PortableTextBody value={post.body} />
        ) : (
          <p className="text-[var(--color-text-muted)]">No content yet.</p>
        )}
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag.slug.current} className="px-3 py-1 text-xs font-medium bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] rounded-full">
              {tag.title}
            </span>
          ))}
        </div>
      )}

      {/* FAQ */}
      {post.faq && post.faq.length > 0 && (
        <section className="mt-12 border-t border-[var(--color-border)] pt-10">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {post.faq.map((item) => (
              <details key={item._key} className="group border border-[var(--color-border)] rounded-lg">
                <summary className="px-5 py-4 font-semibold cursor-pointer hover:bg-[var(--color-bg-secondary)] list-none flex items-center justify-between">
                  {item.question}
                  <span className="text-[var(--color-text-muted)] group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-5 pb-4 text-[var(--color-text-secondary)]">{item.answer}</div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Author Box */}
      {post.author && (
        <section className="mt-12 border-t border-[var(--color-border)] pt-10">
          <div className="flex items-start gap-4 p-6 bg-[var(--color-bg-secondary)] rounded-lg">
            <div className="w-14 h-14 rounded-full bg-[var(--color-border)] flex items-center justify-center text-lg font-bold text-[var(--color-text-muted)] shrink-0">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <p className="font-bold font-[family-name:var(--font-heading)]">{post.author.name}</p>
              {post.author.jobTitle && <p className="text-sm text-[var(--color-text-muted)]">{post.author.jobTitle}</p>}
              {post.author.bio && <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{post.author.bio}</p>}
            </div>
          </div>
        </section>
      )}

      {/* Related Posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="mt-12 border-t border-[var(--color-border)] pt-10">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">Related Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {post.relatedPosts.map((rp) => (
              <Link key={rp._id} href={`/blog/${rp.slug.current}/`} className="group block border border-[var(--color-border)] rounded-lg overflow-hidden hover:shadow-[var(--shadow-card-hover)] transition-shadow">
                <div className="aspect-video bg-[var(--color-bg-secondary)] flex items-center justify-center">
                  {rp.featuredImage?.asset?.url ? (
                    <img src={`${rp.featuredImage.asset.url}?w=400&h=225&fit=crop&auto=format`} alt={rp.featuredImage.alt || rp.title} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <span className="text-[var(--color-text-muted)] text-xs">Image</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold font-[family-name:var(--font-heading)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">{rp.title}</h3>
                  {rp.publishedAt && <time dateTime={rp.publishedAt} className="mt-2 text-xs text-[var(--color-text-muted)]">{new Date(rp.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</time>}
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

/* ─── Portable Text Body ──────────────────────────────────── */
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";

function PortableTextBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <PortableText
      value={value}
      components={{
        block: {
          h2: ({ children }) => <h2 id={slugify(children)}>{children}<a href={`#${slugify(children)}`} className="no-underline ml-2 opacity-0 group-hover:opacity-100 text-[var(--color-text-muted)]" aria-hidden>#</a></h2>,
          h3: ({ children }) => <h3 id={slugify(children)}>{children}<a href={`#${slugify(children)}`} className="no-underline ml-2 opacity-0 group-hover:opacity-100 text-[var(--color-text-muted)]" aria-hidden>#</a></h3>,
        },
        marks: {
          link: ({ children, value }) => {
            const rel = [value?.nofollow && "nofollow", value?.sponsored && "sponsored"].filter(Boolean).join(" ");
            return (
              <a
                href={value?.href}
                target={value?.openInNewTab ? "_blank" : undefined}
                rel={rel || undefined}
              >
                {children}
              </a>
            );
          },
        },
      }}
    />
  );
}

function slugify(children: React.ReactNode): string {
  const text = typeof children === "string" ? children : Array.isArray(children) ? children.map(c => typeof c === "string" ? c : "").join("") : "";
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
}
