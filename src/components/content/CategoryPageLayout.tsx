import Link from "next/link";
import type { BlogCardData } from "@/lib/content/types";

interface CategoryPageLayoutProps {
  breadcrumb: React.ReactNode;
  title: string;
  description?: string;
  featuredArticle?: React.ReactNode;
  articles: BlogCardData[];
  emptyMessage?: string;
  pagination?: React.ReactNode;
  exploreMore?: React.ReactNode;
  cta?: React.ReactNode;
}

export function CategoryPageLayout({
  breadcrumb,
  title,
  description,
  featuredArticle,
  articles,
  emptyMessage = "No articles yet.",
  pagination,
  exploreMore,
  cta,
}: CategoryPageLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
      {breadcrumb}

      <h1 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-heading)] max-w-[900px]">
        {title}
      </h1>
      {description && (
        <p className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-[720px] leading-relaxed">
          {description}
        </p>
      )}

      {/* Featured Article */}
      {featuredArticle && <div className="mt-12">{featuredArticle}</div>}

      {/* Articles Grid */}
      <div className={featuredArticle ? "mt-16" : "mt-12"}>
        {articles.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-[var(--color-border)] rounded-xl">
            <p className="text-[var(--color-text-muted)]">{emptyMessage}</p>
            <Link
              href="/"
              className="mt-4 inline-block text-sm text-[var(--color-accent)] hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        )}
      </div>

      {pagination}

      {exploreMore && (
        <div className="mt-16 border-t border-[var(--color-border)] pt-12">
          {exploreMore}
        </div>
      )}

      {cta && <div className="mt-12">{cta}</div>}
    </div>
  );
}

/* ─── Article Card ─────────────────────────────────────────── */
function ArticleCard({ post }: { post: BlogCardData }) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="aspect-[16/9] bg-[var(--color-bg-secondary)] flex items-center justify-center shrink-0">
        {post.featuredImage ? (
          <img
            src={post.featuredImage}
            alt={post.featuredImageAlt || post.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="text-[var(--color-text-muted)] text-sm">
            SEO Audit Pro
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
          {post.categoryName}
        </span>
        <h3 className="mt-2 font-bold font-[family-name:var(--font-heading)] leading-snug group-hover:text-[var(--color-accent)] transition-colors line-clamp-3">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-3">
          {post.description}
        </p>
        <div className="mt-auto pt-5 flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          <span>{post.readingTime} min read</span>
        </div>
      </div>
    </Link>
  );
}
