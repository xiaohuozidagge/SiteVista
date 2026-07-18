import { Metadata } from "next";
import Link from "next/link";
import { client } from "@/lib/sanity.client";
import { HOME_PAGE_QUERY } from "@/lib/sanity.queries";
import type { AuditCaseData, PostCardData } from "@/lib/sanity.types";
import { HomeNewsletter } from "@/components/forms/HomeNewsletter";

export const metadata: Metadata = {
  title: "Clear SEO Insights. Practical Growth Strategies.",
  description:
    "SiteVista provides practical SEO guides, website audit case studies, and manually prepared SEO audits for businesses and website owners.",
};

interface HomeData {
  featuredCase?: AuditCaseData | null;
  latestCases?: AuditCaseData[];
  seoAuditGuides?: PostCardData[];
  technicalSeo?: PostCardData[];
  contentSeo?: PostCardData[];
}

async function getHomeData(): Promise<HomeData | null> {
  try {
    return await client.fetch<HomeData>(HOME_PAGE_QUERY);
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const data = await getHomeData();

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
            SiteVista provides practical SEO guides, website audit case studies,
            and manually prepared SEO audits for businesses and website owners.
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
        <ArticleSection
          title="Featured SEO Audit Case"
          viewAllHref="/seo-audit-cases/"
          viewAllLabel="View all cases"
          items={data?.latestCases ? [data.latestCases[0]].filter(Boolean) as AuditCaseData[] : []}
          renderCard={(item) => <CaseCard caseItem={item} featured />}
          emptyMessage="No SEO audit cases published yet."
        />

        {/* Latest SEO Audit Cases */}
        <ArticleSection
          title="Latest SEO Audit Cases"
          viewAllHref="/seo-audit-cases/"
          viewAllLabel="View all cases"
          items={data?.latestCases}
          renderCard={(item) => <CaseCard key={item._id} caseItem={item} />}
          emptyMessage="No SEO audit cases published yet."
        />

        {/* SEO Audit Guides */}
        <ArticleSection
          title="SEO Audit Guides"
          viewAllHref="/seo-audit-guides/"
          viewAllLabel="View all guides"
          items={data?.seoAuditGuides}
          renderCard={(item) => <ArticleCard key={item._id} post={item} />}
          emptyMessage="No SEO audit guides published yet."
        />

        {/* Technical SEO */}
        <ArticleSection
          title="Technical SEO"
          viewAllHref="/technical-seo/"
          viewAllLabel="View all articles"
          items={data?.technicalSeo}
          renderCard={(item) => <ArticleCard key={item._id} post={item} />}
          emptyMessage="No technical SEO articles published yet."
        />

        {/* Content & Keywords */}
        <ArticleSection
          title="Content & Keywords"
          viewAllHref="/content-seo/"
          viewAllLabel="View all articles"
          items={data?.contentSeo}
          renderCard={(item) => <ArticleCard key={item._id} post={item} />}
          emptyMessage="No content SEO articles published yet."
        />

        {/* Why SiteVista */}
        <section>
          <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-heading)] text-center mb-12">
            Why SiteVista
          </h2>
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
function ArticleSection<T extends { _id: string }>({ title, viewAllHref, viewAllLabel, items, renderCard, emptyMessage }: {
  title: string; viewAllHref: string; viewAllLabel: string; items?: T[]; renderCard: (item: T) => React.ReactNode; emptyMessage: string;
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-heading)]">{title}</h2>
        <Link href={viewAllHref} className="text-sm font-medium text-[var(--color-accent)] hover:underline">{viewAllLabel} →</Link>
      </div>
      {items && items.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{items.map(renderCard)}</div>
      ) : (
        <div className="text-center py-12 border border-dashed border-[var(--color-border)] rounded-xl"><p className="text-[var(--color-text-muted)]">{emptyMessage}</p></div>
      )}
    </section>
  );
}

/* ─── Article Card ─────────────────────────────────────────── */
function ArticleCard({ post }: { post: PostCardData }) {
  return (
    <Link href={`/blog/${post.slug?.current}/`} className="group block border border-[var(--color-border)] rounded-lg overflow-hidden hover:shadow-[var(--shadow-card-hover)] transition-shadow">
      <div className="aspect-video bg-[var(--color-bg-secondary)] flex items-center justify-center">
        {post.featuredImage?.asset?.url ? (
          <img src={`${post.featuredImage.asset.url}?w=600&h=338&fit=crop&auto=format`} alt={post.featuredImage.alt || post.title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <span className="text-[var(--color-text-muted)] text-sm">Featured Image</span>
        )}
      </div>
      <div className="p-5">
        {post.category && <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">{post.category.title}</span>}
        <h3 className="mt-2 font-bold font-[family-name:var(--font-heading)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">{post.title}</h3>
        {post.excerpt && <p className="mt-2 text-sm text-[var(--color-text-secondary)] line-clamp-2">{post.excerpt}</p>}
        <div className="mt-3 flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
          {post.publishedAt && <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</time>}
          {post.readingTime != null && post.readingTime > 0 && <span>{post.readingTime} min read</span>}
        </div>
      </div>
    </Link>
  );
}

/* ─── Case Card ────────────────────────────────────────────── */
function CaseCard({ caseItem, featured }: { caseItem: AuditCaseData; featured?: boolean }) {
  return (
    <Link href={`/seo-audit-cases/${caseItem.slug?.current}/`} className={`group block border border-[var(--color-border)] rounded-lg overflow-hidden hover:shadow-[var(--shadow-card-hover)] transition-shadow ${featured ? "lg:col-span-2 lg:grid lg:grid-cols-2" : ""}`}>
      <div className="aspect-video bg-[var(--color-bg-secondary)] flex items-center justify-center">
        {caseItem.featuredImage?.asset?.url ? (
          <img src={`${caseItem.featuredImage.asset.url}?w=600&h=338&fit=crop&auto=format`} alt={caseItem.featuredImage.alt || caseItem.title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <span className="text-[var(--color-text-muted)] text-sm">Case Image</span>
        )}
      </div>
      <div className="p-5">
        {caseItem.industry && <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] bg-[var(--color-bg-secondary)] px-2 py-0.5 rounded">{caseItem.industry}</span>}
        <h3 className="mt-2 font-bold font-[family-name:var(--font-heading)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">{caseItem.title}</h3>
        {caseItem.excerpt && <p className="mt-2 text-sm text-[var(--color-text-secondary)] line-clamp-2">{caseItem.excerpt}</p>}
        {caseItem.auditDate && <time dateTime={caseItem.auditDate} className="mt-3 inline-block text-xs text-[var(--color-text-muted)]">Audit: {new Date(caseItem.auditDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</time>}
      </div>
    </Link>
  );
}
