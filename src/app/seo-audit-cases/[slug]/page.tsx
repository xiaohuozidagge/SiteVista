import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCaseBySlug,
  getAllCaseSlugs,
  getAllCases,
  toCaseCardData,
} from "@/lib/content/cases";
import { getReadingTime } from "@/lib/content/blog";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { FAQPageSchema } from "@/components/seo/FAQPageSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { FindingBox, MetricCards, AuditCTA, FullImage, MDXTable } from "@/components/mdx";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { ArticleBody } from "@/components/content/ArticleBody";
import type { TocItem } from "@/lib/content/types";

const mdxComponents = {
  FindingBox,
  MetricCards,
  AuditCTA,
  FullImage,
  table: MDXTable,
};

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseBySlug(slug);
  if (!c) return { title: "Case Not Found" };
  return {
    title: c.frontmatter.title,
    description: c.frontmatter.description,
    alternates: {
      canonical: c.frontmatter.canonical || `https://seoauditpro.cloud/seo-audit-cases/${slug}/`,
    },
    robots: { index: !c.frontmatter.noIndex, follow: true },
    openGraph: {
      title: c.frontmatter.title,
      description: c.frontmatter.description,
      images: c.frontmatter.coverImage ? [{ url: c.frontmatter.coverImage, alt: c.frontmatter.coverImageAlt }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: c.frontmatter.title,
      description: c.frontmatter.description,
      images: c.frontmatter.coverImage ? [c.frontmatter.coverImage] : [],
    },
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://seoauditpro.cloud";

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const caseItem = getCaseBySlug(slug);
  if (!caseItem) notFound();

  const rt = getReadingTime(caseItem.content);
  const headings = extractHeadings(caseItem.content);

  const relatedCases = [];
  if (caseItem.frontmatter.relatedCases.length > 0) {
    for (const rcSlug of caseItem.frontmatter.relatedCases) {
      const rc = getCaseBySlug(rcSlug);
      if (rc && rc.slug !== slug) relatedCases.push(toCaseCardData(rc));
    }
  }
  if (relatedCases.length === 0) {
    relatedCases.push(...getAllCases().filter((c) => c.slug !== slug).slice(0, 3).map(toCaseCardData));
  }

  return (
    <>
      <ArticleSchema
        title={caseItem.frontmatter.title}
        description={caseItem.frontmatter.description}
        imageUrl={caseItem.frontmatter.coverImage || caseItem.frontmatter.featuredImage}
        publishedAt={caseItem.frontmatter.publishedAt}
        updatedAt={caseItem.frontmatter.updatedAt}
        url={`${SITE_URL}/seo-audit-cases/${slug}/`}
      />
      <BreadcrumbSchema items={[{ label: "SEO Audit Cases", href: "/seo-audit-cases/" }, { label: caseItem.frontmatter.title }]} />
      {caseItem.frontmatter.faq.length > 0 && <FAQPageSchema questions={caseItem.frontmatter.faq} />}

      <ArticleLayout
        headings={headings}
        header={
          <>
            <nav className="text-sm text-[var(--color-text-muted)] mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2">
                <li><Link href="/" className="hover:text-[var(--color-accent)]">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link href="/seo-audit-cases/" className="hover:text-[var(--color-accent)]">SEO Audit Cases</Link></li>
                <li aria-hidden>/</li>
                <li className="text-[var(--color-text)] truncate" aria-current="page">{caseItem.frontmatter.title}</li>
              </ol>
            </nav>

            <div className="flex flex-wrap gap-3 mb-3">
              {caseItem.frontmatter.industry && (
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] bg-[var(--color-bg-secondary)] px-2 py-1 rounded">{caseItem.frontmatter.industry}</span>
              )}
              {caseItem.frontmatter.websiteType && (
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] px-2 py-1 rounded">{caseItem.frontmatter.websiteType}</span>
              )}
            </div>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.15] tracking-tight lg:text-5xl font-[family-name:var(--font-heading)]">
              {caseItem.frontmatter.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-text-secondary)] lg:text-xl">
              {caseItem.frontmatter.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--color-text-muted)]">
              {caseItem.frontmatter.auditDate && (
                <time dateTime={caseItem.frontmatter.auditDate}>
                  Audit Date: {new Date(caseItem.frontmatter.auditDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </time>
              )}
              <span>{rt} min read</span>
            </div>

            {/* Featured Image */}
            {caseItem.frontmatter.featuredImage && (
              <figure className="mt-8">
                <img src={caseItem.frontmatter.featuredImage} alt={caseItem.frontmatter.featuredImageAlt || caseItem.frontmatter.title} className="w-full rounded-xl" />
                {caseItem.frontmatter.featuredImageAlt && (
                  <figcaption className="mt-2 text-center text-sm text-[var(--color-text-muted)]">{caseItem.frontmatter.featuredImageAlt}</figcaption>
                )}
              </figure>
            )}
          </>
        }
        footerContent={
          <>
            {/* Key Findings */}
            {caseItem.frontmatter.keyFindings.length > 0 && (
              <section className="mt-16 border-t border-[var(--color-border)] pt-10">
                <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">Key Findings</h2>
                <div className="space-y-3">
                  {caseItem.frontmatter.keyFindings.map((f, i) => (
                    <div key={i} className="border border-[var(--color-border)] rounded-lg p-6">
                      <div className="flex items-center gap-2 mb-2">
                        {f.type === "criticalIssue" && <span className="text-[var(--color-critical)] font-semibold text-sm">⚠ Critical</span>}
                        {f.type === "keyFinding" && <span className="text-[var(--color-accent)] font-semibold text-sm">• Key Finding</span>}
                        {f.type === "recommendation" && <span className="text-[var(--color-success)] font-semibold text-sm">✓ Recommendation</span>}
                        {f.type === "quickWin" && <span className="text-[var(--color-warning)] font-semibold text-sm">⚡ Quick Win</span>}
                        {f.type === "important" && <span className="text-[var(--color-primary)] font-semibold text-sm">ℹ Important</span>}
                        {f.type === "expertNote" && <span className="text-[var(--color-text-muted)] font-semibold text-sm">✎ Expert Note</span>}
                      </div>
                      <h3 className="font-bold">{f.heading}</h3>
                      <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{f.content}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ */}
            {caseItem.frontmatter.faq.length > 0 && (
              <section className="mt-16 border-t border-[var(--color-border)] pt-10">
                <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">FAQ</h2>
                <div className="space-y-3">
                  {caseItem.frontmatter.faq.map((item, i) => (
                    <details key={i} className="group border border-[var(--color-border)] rounded-lg">
                      <summary className="px-5 py-4 font-semibold cursor-pointer hover:bg-[var(--color-bg-secondary)] list-none flex items-center justify-between">{item.question}<span className="text-[var(--color-text-muted)] group-open:rotate-180 transition-transform">▾</span></summary>
                      <div className="px-5 pb-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">{item.answer}</div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Disclosure */}
            {caseItem.frontmatter.caseDisclosure && (
              <section className="mt-16 border-t border-[var(--color-border)] pt-10">
                <p className="text-xs text-[var(--color-text-muted)] italic">{caseItem.frontmatter.caseDisclosure}</p>
              </section>
            )}

            {/* Related Cases */}
            {relatedCases.length > 0 && (
              <section className="mt-16 border-t border-[var(--color-border)] pt-10">
                <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">Related Cases</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedCases.map((rc) => (
                    <Link key={rc.slug} href={`/seo-audit-cases/${rc.slug}/`} className="group block border border-[var(--color-border)] rounded-lg overflow-hidden hover:shadow-[var(--shadow-card-hover)] transition-shadow">
                      <div className="aspect-video bg-[var(--color-bg-secondary)] flex items-center justify-center">
                        {rc.coverImage || rc.featuredImage ? (
                          <img src={rc.coverImage || rc.featuredImage} alt={rc.coverImageAlt || rc.featuredImageAlt || rc.title} className="w-full h-full object-cover" loading="lazy" />
                        ) : (
                          <span className="text-[var(--color-text-muted)] text-xs">Image</span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold font-[family-name:var(--font-heading)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">{rc.title}</h3>
                        {rc.industry && <span className="mt-1 text-xs text-[var(--color-text-muted)]">{rc.industry}</span>}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <section className="mt-20 bg-[var(--color-bg-secondary)] rounded-xl p-10 lg:p-12 text-center">
              <h2 className="text-xl font-bold font-[family-name:var(--font-heading)]">Want your own SEO audit?</h2>
              <p className="mt-2 text-[var(--color-text-secondary)]">Get a manually prepared audit with clear, prioritized recommendations.</p>
              <Link href="/seo-audit/" className="mt-6 inline-flex items-center px-6 py-3 rounded-md bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-light)] transition-colors">Audit Your Website</Link>
            </section>
          </>
        }
      >
        <ArticleBody>
          <MDXRemote
            source={caseItem.content}
            options={{
              mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]] },
              parseFrontmatter: false,
            }}
            components={mdxComponents}
          />
        </ArticleBody>
      </ArticleLayout>
    </>
  );
}

function extractHeadings(raw: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const result: TocItem[] = [];
  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(raw)) !== null) {
    const level = (match[1].length === 2 ? 2 : 3) as 2 | 3;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/<[^>]*>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    result.push({ id, text, level });
  }
  return result;
}
