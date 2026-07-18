import { Metadata } from "next";
import Link from "next/link";
import { getAllCases, toCaseCardData } from "@/lib/content/cases";
import type { CaseCardData } from "@/lib/content/types";

export const metadata: Metadata = {
  title: "SEO Audit Cases",
  description:
    "Real-world website SEO audit case studies covering technical SEO, content strategy, and search performance analysis.",
};

export default function CasesListPage() {
  const allCases = getAllCases();
  const featuredCase = allCases.find((c) => c.frontmatter.featured) || null;
  const cases = allCases.map(toCaseCardData);

  return (
    <div className="container-site py-12 lg:py-16">
      <h1 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-heading)]">SEO Audit Cases</h1>
      <p className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-2xl">
        Real-world website SEO audit case studies. Each case covers technical findings, content analysis, and actionable recommendations.
      </p>

      {featuredCase && (
        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">Featured Case</h2>
          <Link href={`/seo-audit-cases/${featuredCase.slug}/`} className="group block border border-[var(--color-border)] rounded-xl overflow-hidden hover:shadow-[var(--shadow-card-hover)] transition-shadow">
            <div className="grid lg:grid-cols-2 gap-6 items-center">
              <div className="aspect-video bg-[var(--color-bg-secondary)] flex items-center justify-center">
                {featuredCase.frontmatter.featuredImage ? (
                  <img src={featuredCase.frontmatter.featuredImage} alt={featuredCase.frontmatter.featuredImageAlt || featuredCase.frontmatter.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[var(--color-text-muted)] text-sm">Featured Image</span>
                )}
              </div>
              <div className="p-6 lg:p-8 lg:pl-0">
                {featuredCase.frontmatter.industry && <span className="text-xs font-semibold uppercase text-[var(--color-accent)]">{featuredCase.frontmatter.industry}</span>}
                <h3 className="mt-2 text-xl font-bold font-[family-name:var(--font-heading)] group-hover:text-[var(--color-accent)] transition-colors">{featuredCase.frontmatter.title}</h3>
                <p className="mt-3 text-sm text-[var(--color-text-secondary)] line-clamp-2">{featuredCase.frontmatter.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-[var(--color-accent)]">Read Case Study →</span>
              </div>
            </div>
          </Link>
        </section>
      )}

      <section className="mt-16">
        {cases.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c) => (
              <Link key={c.slug} href={`/seo-audit-cases/${c.slug}/`} className="group block border border-[var(--color-border)] rounded-lg overflow-hidden hover:shadow-[var(--shadow-card-hover)] transition-shadow">
                <div className="aspect-video bg-[var(--color-bg-secondary)] flex items-center justify-center">
                  {c.featuredImage ? <img src={c.featuredImage} alt={c.featuredImageAlt || c.title} className="w-full h-full object-cover" loading="lazy" /> : <span className="text-[var(--color-text-muted)] text-sm">Case Image</span>}
                </div>
                <div className="p-5">
                  {c.industry && <span className="text-xs font-semibold uppercase text-[var(--color-accent)]">{c.industry}</span>}
                  <h3 className="mt-2 font-bold font-[family-name:var(--font-heading)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">{c.title}</h3>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)] line-clamp-2">{c.description}</p>
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

      <section className="mt-16 bg-[var(--color-bg-secondary)] rounded-xl p-10 text-center">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)]">Want your own SEO audit?</h2>
        <p className="mt-2 text-[var(--color-text-secondary)] max-w-md mx-auto">Get a manually prepared audit with clear findings and prioritized recommendations.</p>
        <Link href="/seo-audit/" className="mt-6 inline-flex items-center px-6 py-3 rounded-md bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-light)] transition-colors">Audit Your Website</Link>
      </section>
    </div>
  );
}
