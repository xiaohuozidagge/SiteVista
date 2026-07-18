import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [];

  // Always show first page
  pages.push(1);

  if (current > 3) {
    pages.push("ellipsis");
  }

  // Pages around current
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("ellipsis");
  }

  // Always show last page
  if (total > 1) {
    pages.push(total);
  }

  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const normalizedBase = basePath.endsWith("/") ? basePath : `${basePath}/`;
  const pages = getPageNumbers(currentPage, totalPages);

  const prevHref =
    currentPage > 1
      ? currentPage === 2
        ? normalizedBase
        : `${normalizedBase}?page=${currentPage - 1}`
      : null;

  const nextHref =
    currentPage < totalPages
      ? `${normalizedBase}?page=${currentPage + 1}`
      : null;

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1 py-8"
    >
      {/* Previous */}
      {prevHref ? (
        <Link
          href={prevHref}
          className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)] rounded-[var(--radius-sm)] transition-colors no-underline"
          aria-label="Go to previous page"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Previous</span>
        </Link>
      ) : (
        <span
          className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--color-text-muted)] opacity-50 cursor-not-allowed rounded-[var(--radius-sm)]"
          aria-hidden="true"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Previous</span>
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1 mx-2">
        {pages.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-9 h-9 flex items-center justify-center text-sm text-[var(--color-text-muted)]"
                aria-hidden="true"
              >
                &hellip;
              </span>
            );
          }

          const isCurrent = page === currentPage;
          const pageHref = page === 1 ? normalizedBase : `${normalizedBase}?page=${page}`;

          return (
            <Link
              key={page}
              href={pageHref}
              className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-[var(--radius-sm)] transition-colors no-underline ${
                isCurrent
                  ? "bg-[var(--color-accent)] text-white"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)]"
              }`}
              aria-label={`Page ${page}`}
              aria-current={isCurrent ? "page" : undefined}
            >
              {page}
            </Link>
          );
        })}
      </div>

      {/* Next */}
      {nextHref ? (
        <Link
          href={nextHref}
          className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)] rounded-[var(--radius-sm)] transition-colors no-underline"
          aria-label="Go to next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={16} />
        </Link>
      ) : (
        <span
          className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--color-text-muted)] opacity-50 cursor-not-allowed rounded-[var(--radius-sm)]"
          aria-hidden="true"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={16} />
        </span>
      )}
    </nav>
  );
}
