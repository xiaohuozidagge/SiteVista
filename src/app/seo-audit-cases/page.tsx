import { Metadata } from "next";
import Link from "next/link";
import { client } from "@/lib/sanity.client";
import { CASES_LIST_QUERY } from "@/lib/sanity.queries";
import type { AuditCaseData } from "@/lib/sanity.types";

export const metadata: Metadata = {
  title: "SEO Audit Cases",
  description:
    "Real-world website SEO audit case studies covering technical SEO, content strategy, and search performance analysis.",
};

const PER_PAGE = 9;

export default async function CasesListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam || "1", 10) || 1);
  const start = (currentPage - 1) * PER_PAGE;
  const end = start + PER_PAGE;

  const data = await client
    .fetch<{ featuredCase?: AuditCaseData | null; cases: AuditCaseData[]; total: number }>(CASES_LIST_QUERY, { start, end })
    .catch(() => null);

  const totalPages = Math.max(1, Math.ceil((data?.total || 0) / PER_PAGE));
  const cases = data?.cases || [];

  return (
    <div className="container-site py-12 lg:py-16">
      <h1 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-heading)]">SEO Audit Cases</h1>
      <p className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-2xl">
        Real-world website SEO audit case studies. Each case covers technical findings, content analysis, and actionable recommendations.
      </p>

      {/* Featured Case */}
      {data?.featuredCase && (
        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">Featured Case</h2>
          <Link href={`/seo-audit-cases/${data.featuredCase.slug.current}/`} className="group block border border-[var(--color-border)] rounded-xl overflow-hidden hover:shadow-[var(--shadow-card-hover)] transition-shadow">
            <div className="grid lg:grid-cols-2 gap-6 items-center">
              <div className="aspect-video bg-[var(--color-bg-secondary)] flex items-center justify-center">
                {data.featuredCase.featuredImage?.asset?.url ? (
                  <img src={`${data.featuredCase.featuredImage.asset.url}?w=800&h=450&fit=crop&auto=format`} alt={data.featuredCase.featuredImage.alt || data.featuredCase.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[var(--color-text-muted)] text-sm">Featured Image</span>
                )}
              </div>
              <div className="p-6 lg:p-8 lg:pl-0">
                {data.featuredCase.industry && <span className="text-xs font-semibold uppercase text-[var(--color-accent)]">{data.featuredCase.industry}</span>}
                <h3 className="mt-2 text-xl font-bold font-[family-name:var(--font-heading)] group-hover:text-[var(--color-accent)] transition-colors">{data.featuredCase.title}</h3>
                {data.featuredCase.excerpt && <p className="mt-3 text-sm text-[var(--color-text-secondary)] line-clamp-2">{data.featuredCase.excerpt}</p>}
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-[var(--color-accent)]">Read Case Study →</span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Cases Grid */}
      <section className="mt-16">
        {cases.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c) => (
              <Link key={c._id} href={`/seo-audit-cases/${c.slug.current}/`} className="group block border border-[var(--color-border)] rounded-lg overflow-hidden hover:shadow-[var(--shadow-card-hover)] transition-shadow">
                <div className="aspect-video bg-[var(--color-bg-secondary)] flex items-center justify-center">
                  {c.featuredImage?.asset?.url ? (
                    <img src={`${c.featuredImage.asset.url}?w=600&h=338&fit=crop&auto=format`} alt={c.featuredImage.alt || c.title} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <span className="text-[var(--color-text-muted)] text-sm">Case Image</span>
                  )}
                </div>
                <div className="p-5">
                  {c.industry && <span className="text-xs font-semibold uppercase text-[var(--color-accent)]">{c.industry}</span>}
                  <h3 className="mt-2 font-bold font-[family-name:var(--font-heading)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">{c.title}</h3>
                  {c.excerpt && <p className="mt-2 text-sm text-[var(--color-text-secondary)] line-clamp-2">{c.excerpt}</p>}
                  {c.auditDate && <time dateTime={c.auditDate} className="mt-3 inline-block text-xs text-[var(--color-text-muted)]">Audit: {new Date(c.auditDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</time>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-[var(--color-border)] rounded-xl">
            <p className="text-[var(--color-text-muted)]">No SEO audit cases published yet.</p>
          </div>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
          {currentPage > 1 && (
            <Link href={`/seo-audit-cases/${currentPage > 2 ? `?page=${currentPage - 1}` : ""}`} className="px-4 py-2 border border-[var(--color-border)] rounded-md text-sm font-medium hover:bg-[var(--color-bg-secondary)] transition-colors">
              ← Previous
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={p === 1 ? "/seo-audit-cases/" : `/seo-audit-cases/?page=${p}`}
              className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                p === currentPage
                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                  : "border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)]"
              }`}
            >
              {p}
            </Link>
          ))}
          {currentPage < totalPages && (
            <Link href={`/seo-audit-cases/?page=${currentPage + 1}`} className="px-4 py-2 border border-[var(--color-border)] rounded-md text-sm font-medium hover:bg-[var(--color-bg-secondary)] transition-colors">
              Next →
            </Link>
          )}
        </nav>
      )}

      {/* CTA */}
      <section className="mt-16 bg-[var(--color-bg-secondary)] rounded-xl p-10 text-center">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)]">Want your own SEO audit?</h2>
        <p className="mt-2 text-[var(--color-text-secondary)] max-w-md mx-auto">Get a manually prepared audit with clear findings and prioritized recommendations.</p>
        <Link href="/seo-audit/" className="mt-6 inline-flex items-center px-6 py-3 rounded-md bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-light)] transition-colors">Audit Your Website</Link>
      </section>
    </div>
  );
}
