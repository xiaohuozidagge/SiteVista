import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, toBlogCardData } from "@/lib/content/blog";
import { getAllCases, toCaseCardData } from "@/lib/content/cases";
import type { BlogCardData, CaseCardData } from "@/lib/content/types";
import { HomeNewsletter } from "@/components/forms/HomeNewsletter";

export const metadata: Metadata = {
  title: "Website SEO Audits, Guides & Case Studies | SEO Audit Pro",
  description:
    "Explore practical SEO guides, website audit case studies, and manually prepared SEO audits with clear, prioritized recommendations.",
};

export default function HomePage() {
  const allPosts = getAllPosts();
  const allCases = getAllCases();

  const featuredCase = allCases.find((c) => c.frontmatter.featured) || allCases[0] || null;
  const latestCases = allCases.slice(0, 3);
  const seoAuditGuides = allPosts.filter((p) => p.frontmatter.category === "seo-audit-guides").slice(0, 3);
  const technicalSeo = allPosts.filter((p) => p.frontmatter.category === "technical-seo").slice(0, 3);
  const contentSeo = allPosts.filter((p) => p.frontmatter.category === "content-seo").slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-primary)] text-white py-20 lg:py-28">
        <div className="container-site text-center">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold font-[family-name:var(--font-heading)] text-balance leading-tight">
            Clear SEO Insights.
            <br className="hidden sm:block" /> Practical Growth Strategies.
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto text-balance">
            SEO Audit Pro provides practical SEO guides, website audit case studies,
            and manually prepared audits designed to identify issues and prioritize improvements.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/seo-audit-cases/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-dark)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore SEO Audit Cases
            </Link>
            <Link
              href="/seo-audit/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-gray-400 text-white font-semibold hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Audit Your Website
            </Link>
          </div>
        </div>
      </section>

      <div className="container-site py-16 lg:py-24 space-y-24">
        {/* Featured SEO Audit Case */}
        {featuredCase ? (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-heading)]">Featured SEO Audit Case</h2>
              <Link href="/seo-audit-cases/" className="text-sm font-medium text-[var(--color-accent)] hover:underline">View all cases →</Link>
            </div>
            <Link href={`/seo-audit-cases/${featuredCase.slug}/`} className="group block">
              <article className="grid lg:grid-cols-2 gap-8 items-center border border-[var(--color-border)] rounded-xl overflow-hidden hover:shadow-[var(--shadow-card-hover)] transition-shadow">
                <div className="aspect-video bg-[var(--color-bg-secondary)] flex items-center justify-center">
                  {featuredCase.frontmatter.featuredImage ? (
                    <img src={featuredCase.frontmatter.featuredImage} alt={featuredCase.frontmatter.featuredImageAlt || featuredCase.frontmatter.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[var(--color-text-muted)] text-sm">Featured Image</span>
                  )}
                </div>
                <div className="p-6 lg:p-8 lg:pl-0">
                  {featuredCase.frontmatter.industry && (
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] mb-2">{featuredCase.frontmatter.industry}</span>
                  )}
                  <h3 className="text-xl lg:text-2xl font-bold font-[family-name:var(--font-heading)] group-hover:text-[var(--color-accent)] transition-colors">{featuredCase.frontmatter.title}</h3>
                  <p className="mt-3 text-[var(--color-text-secondary)] line-clamp-2">{featuredCase.frontmatter.description}</p>
                  {featuredCase.frontmatter.auditDate && (
                    <time dateTime={featuredCase.frontmatter.auditDate} className="mt-4 inline-block text-sm text-[var(--color-text-muted)]">
                      Audit Date: {new Date(featuredCase.frontmatter.auditDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </time>
                  )}
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-[var(--color-accent)]">Read Case Study →</span>
                </div>
              </article>
            </Link>
          </section>
        ) : (
          <section>
            <div className="text-center py-12 border border-dashed border-[var(--color-border)] rounded-xl">
              <p className="text-[var(--color-text-muted)]">No featured SEO audit case yet. Check back soon.</p>
            </div>
          </section>
        )}

        {/* Latest SEO Audit Cases */}
        <ArticleSection title="Latest SEO Audit Cases" viewAllHref="/seo-audit-cases/" viewAllLabel="View all cases" items={latestCases.map(toCaseCardData)} renderCard={(item) => <CaseCard key={item.slug} caseItem={item} />} emptyMessage="No SEO audit cases published yet." />

        {/* SEO Audit Guides */}
        <ArticleSection title="SEO Audit Guides" viewAllHref="/seo-audit-guides/" viewAllLabel="View all guides" items={seoAuditGuides.map(toBlogCardData)} renderCard={(item) => <ArticleCard key={item.slug} post={item} />} emptyMessage="No SEO audit guides published yet." />

        {/* Technical SEO */}
        <ArticleSection title="Technical SEO" viewAllHref="/technical-seo/" viewAllLabel="View all articles" items={technicalSeo.map(toBlogCardData)} renderCard={(item) => <ArticleCard key={item.slug} post={item} />} emptyMessage="No technical SEO articles published yet." />

        {/* Content & Keywords */}
        <ArticleSection title="Content & Keywords" viewAllHref="/content-seo/" viewAllLabel="View all articles" items={contentSeo.map(toBlogCardData)} renderCard={(item) => <ArticleCard key={item.slug} post={item} />} emptyMessage="No content SEO articles published yet." />

        {/* Why SEO Audit Pro */}
        <section>
          <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-heading)] text-center mb-12">Why SEO Audit Pro</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Manual SEO Analysis", desc: "Every audit is prepared by an experienced SEO analyst — not an automated tool generating generic reports." },
              { title: "Clear Explanations", desc: "Findings are explained in plain English with context, so you understand not just what to fix but why it matters." },
              { title: "Prioritized Recommendations", desc: "Recommendations are ranked by impact and effort, helping you focus on what moves the needle first." },
              { title: "Practical SEO Roadmaps", desc: "You get an actionable step-by-step plan, not just a list of issues." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="font-bold font-[family-name:var(--font-heading)] text-lg mb-2">{item.title}</h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sample Report */}
        <section className="bg-[var(--color-bg-secondary)] rounded-xl p-10 lg:p-16 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-heading)]">See What a Professional SEO Audit Includes</h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto">Explore a sample report structure covering technical SEO, content, keyword visibility, competitors, and prioritized recommendations.</p>
          <Link href="/sample-seo-audit-report/" className="mt-8 inline-flex items-center px-6 py-3 rounded-md bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-light)] transition-colors">View Sample Report</Link>
        </section>

        {/* CTA */}
        <section className="bg-[var(--color-primary)] text-white rounded-xl p-10 lg:p-16 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-heading)]">Find Out What Is Holding Your Website Back</h2>
          <p className="mt-4 text-gray-300 max-w-xl mx-auto">Get a manually prepared SEO audit with clear findings and prioritized recommendations.</p>
          <Link href="/seo-audit/" className="mt-8 inline-flex items-center px-6 py-3 rounded-md bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-light)] transition-colors">Audit Your Website</Link>
        </section>

        {/* Newsletter */}
        <HomeNewsletter />
      </div>
    </>
  );
}

/* ─── Reusable Section ────────────────────────────────────── */
function ArticleSection<T extends { slug: string }>({ title, viewAllHref, viewAllLabel, items, renderCard, emptyMessage }: {
  title: string; viewAllHref: string; viewAllLabel: string; items: T[]; renderCard: (item: T) => React.ReactNode; emptyMessage: string;
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-heading)]">{title}</h2>
        <Link href={viewAllHref} className="text-sm font-medium text-[var(--color-accent)] hover:underline">{viewAllLabel} →</Link>
      </div>
      {items.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{items.map(renderCard)}</div>
      ) : (
        <div className="text-center py-12 border border-dashed border-[var(--color-border)] rounded-xl"><p className="text-[var(--color-text-muted)]">{emptyMessage}</p></div>
      )}
    </section>
  );
}

/* ─── Article Card ─────────────────────────────────────────── */
function ArticleCard({ post }: { post: BlogCardData }) {
  return (
    <Link href={`/blog/${post.slug}/`} className="group block border border-[var(--color-border)] rounded-lg overflow-hidden hover:shadow-[var(--shadow-card-hover)] transition-shadow">
      <div className="aspect-video bg-[var(--color-bg-secondary)] flex items-center justify-center">
        {post.featuredImage ? (
          <img src={post.featuredImage} alt={post.featuredImageAlt || post.title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <span className="text-[var(--color-text-muted)] text-sm">Featured Image</span>
        )}
      </div>
      <div className="p-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">{post.categoryName}</span>
        <h3 className="mt-2 font-bold font-[family-name:var(--font-heading)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">{post.title}</h3>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)] line-clamp-2">{post.description}</p>
        <div className="mt-3 flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
          <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</time>
          <span>{post.readingTime} min read</span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Case Card ────────────────────────────────────────────── */
function CaseCard({ caseItem }: { caseItem: CaseCardData }) {
  return (
    <Link href={`/seo-audit-cases/${caseItem.slug}/`} className="group block border border-[var(--color-border)] rounded-lg overflow-hidden hover:shadow-[var(--shadow-card-hover)] transition-shadow">
      <div className="aspect-video bg-[var(--color-bg-secondary)] flex items-center justify-center">
        {caseItem.featuredImage ? (
          <img src={caseItem.featuredImage} alt={caseItem.featuredImageAlt || caseItem.title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <span className="text-[var(--color-text-muted)] text-sm">Case Image</span>
        )}
      </div>
      <div className="p-5">
        {caseItem.industry && <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] bg-[var(--color-bg-secondary)] px-2 py-0.5 rounded">{caseItem.industry}</span>}
        <h3 className="mt-2 font-bold font-[family-name:var(--font-heading)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">{caseItem.title}</h3>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)] line-clamp-2">{caseItem.description}</p>
        {caseItem.auditDate && <time dateTime={caseItem.auditDate} className="mt-3 inline-block text-xs text-[var(--color-text-muted)]">Audit: {new Date(caseItem.auditDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</time>}
      </div>
    </Link>
  );
}
