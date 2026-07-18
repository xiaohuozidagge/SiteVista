import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Briefcase } from "lucide-react";

interface CaseCardProps {
  title: string;
  slug: string;
  excerpt?: string;
  industry?: string;
  featuredImage?: { url: string; alt: string };
  auditDate?: string;
  className?: string;
}

export default function CaseCard({
  title,
  slug,
  excerpt,
  industry,
  featuredImage,
  auditDate,
  className = "",
}: CaseCardProps) {
  const formattedDate = auditDate
    ? new Date(auditDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : null;

  return (
    <article
      className={`group flex flex-col bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300 overflow-hidden ${className}`}
    >
      {/* Image */}
      <Link
        href={`/seo-audit-cases/${slug}/`}
        className="block relative w-full aspect-[16/10] overflow-hidden bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)]"
        aria-label={`View case study: ${title}`}
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
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
            <Briefcase size={56} strokeWidth={1.5} />
            <span className="text-xs font-medium mt-2 uppercase tracking-widest">
              Case Study
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Industry Badge */}
        {industry && (
          <span className="inline-block self-start mb-2 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide bg-[var(--color-success)]/10 text-[var(--color-success)]">
            {industry}
          </span>
        )}

        {/* Title */}
        <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg leading-snug mb-2">
          <Link
            href={`/seo-audit-cases/${slug}/`}
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
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--color-border-light)]">
          {formattedDate && (
            <time
              dateTime={auditDate}
              className="text-xs text-[var(--color-text-muted)]"
            >
              Audited {formattedDate}
            </time>
          )}
          <Link
            href={`/seo-audit-cases/${slug}/`}
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors no-underline ml-auto"
          >
            View Case Study
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
