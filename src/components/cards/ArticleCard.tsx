import Link from "next/link";
import Image from "next/image";
import { Clock, FileText } from "lucide-react";

interface ArticleCardProps {
  title: string;
  slug: string;
  excerpt?: string;
  category?: { title: string; slug: string };
  featuredImage?: { url: string; alt: string };
  publishedAt?: string;
  readingTime?: number;
  className?: string;
}

export default function ArticleCard({
  title,
  slug,
  excerpt,
  category,
  featuredImage,
  publishedAt,
  readingTime,
  className = "",
}: ArticleCardProps) {
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article
      className={`group flex flex-col bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300 overflow-hidden ${className}`}
    >
      {/* Image */}
      <Link
        href={`/blog/${slug}/`}
        className="block relative w-full aspect-[16/10] overflow-hidden bg-[var(--color-bg-tertiary)]"
        aria-label={`Read article: ${title}`}
      >
        {featuredImage?.url ? (
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <FileText
              size={48}
              className="text-[var(--color-text-muted)] opacity-30"
            />
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category Badge */}
        {category && (
          <Link
            href={`/blog/category/${category.slug}/`}
            className="inline-block self-start mb-2 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide bg-[var(--color-accent)]/10 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/20 transition-colors no-underline"
          >
            {category.title}
          </Link>
        )}

        {/* Title */}
        <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg leading-snug mb-2">
          <Link
            href={`/blog/${slug}/`}
            className="text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-150 no-underline"
          >
            {title}
          </Link>
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-3 mb-4 flex-1">
            {excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)] mt-auto pt-3 border-t border-[var(--color-border-light)]">
          {formattedDate && (
            <time dateTime={publishedAt} className="flex items-center gap-1">
              {formattedDate}
            </time>
          )}
          {readingTime !== undefined && readingTime > 0 && (
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {readingTime} min read
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
