import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseBySlug, getAllCaseSlugs, getAllCases, toCaseCardData } from "@/lib/content/cases";
import { getReadingTime } from "@/lib/content/blog";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { FAQPageSchema } from "@/components/seo/FAQPageSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { FindingBox, MetricCards, AuditCTA, FullImage } from "@/components/mdx";

const mdxComponents = {
  FindingBox,
  MetricCards,
  AuditCTA,
  FullImage,
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
      canonical:
        c.frontmatter.canonical ||
        `https://seoauditpro.cloud/seo-audit-cases/${slug}/`,
    },
    robots: { index: !c.frontmatter.noIndex, follow: true },
    openGraph: {
      title: c.frontmatter.title,
      description: c.frontmatter.description,
      images: c.frontmatter.featuredImage
        ? [{ url: c.frontmatter.featuredImage }]
        : [],
    },
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://seoauditpro.cloud";

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const caseItem = getCaseBySlug(slug);
  if (!caseItem) notFound();

  const rt = getReadingTime(caseItem.content);

  // Extract H2/H3 headings for ToC
  const headings = extractHeadings(caseItem.content);

  // Related cases
  const relatedCases = [];
  if (caseItem.frontmatter.relatedCases.length > 0) {
    for (const rcSlug of caseItem.frontmatter.relatedCases) {
      const rc = getCaseBySlug(rcSlug);
      if (rc && rc.slug !== slug) relatedCases.push(toCaseCardData(rc));
    }
  }
  if (relatedCases.length === 0) {
    relatedCases.push(
      ...getAllCases()
        .filter((c) => c.slug !== slug)
        .slice(0, 3)
        .map(toCaseCardData)
    );
  }

  return (
    <>
      <ArticleSchema
        title={caseItem.frontmatter.title}
        description={caseItem.frontmatter.description}
        imageUrl={caseItem.frontmatter.featuredImage}
        publishedAt={caseItem.frontmatter.publishedAt}
        updatedAt={caseItem.frontmatter.updatedAt}
        url={`${SITE_URL}/seo-audit-cases/${slug}/`}
      />
      <BreadcrumbSchema
        items={[
          { label: "SEO Audit Cases", href: "/seo-audit-cases/" },
          { label: caseItem.frontmatter.title },
        ]}
      />
      {caseItem.frontmatter.faq.length > 0 && (
        <FAQPageSchema questions={caseItem.frontmatter.faq} />
      )}

      <article className="container-content py-12 lg:py-16">
        {/* Breadcrumb */}
        <nav
          className="text-sm text-[var(--color-text-muted)] mb-6"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[var(--color-accent)]">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href="/seo-audit-cases/"
                className="hover:text-[var(--color-accent)]"
              >
                SEO Audit Cases
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li
              className="text-[var(--color-text)] truncate"
              aria-current="page"
            >
              {caseItem.frontmatter.title}
            </li>
          </ol>
        </nav>

        {/* Industry + Website Type badges */}
        <div className="flex flex-wrap gap-3 mb-3">
          {caseItem.frontmatter.industry && (
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] bg-[var(--color-bg-secondary)] px-2 py-1 rounded">
              {caseItem.frontmatter.industry}
            </span>
          )}
          {caseItem.frontmatter.websiteType && (
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] px-2 py-1 rounded">
              {caseItem.frontmatter.websiteType}
            </span>
          )}
        </div>

        {/* H1 */}
        <h1 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-heading)] text-balance leading-tight">
          {caseItem.frontmatter.title}
        </h1>
        <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
          {caseItem.frontmatter.description}
        </p>

        {/* Meta */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--color-text-muted)]">
          {caseItem.frontmatter.auditDate && (
            <time dateTime={caseItem.frontmatter.auditDate}>
              Audit Date:{" "}
              {new Date(caseItem.frontmatter.auditDate).toLocaleDateString(
                "en-US",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </time>
          )}
          <span>{rt} min read</span>
        </div>

        {/* Featured Image */}
        {caseItem.frontmatter.featuredImage && (
          <figure className="mt-8 -mx-4 lg:-mx-8">
            <img
              src={caseItem.frontmatter.featuredImage}
              alt={
                caseItem.frontmatter.featuredImageAlt ||
                caseItem.frontmatter.title
              }
              className="w-full rounded-lg"
            />
            {caseItem.frontmatter.featuredImageAlt && (
              <figcaption className="mt-2 text-center text-sm text-[var(--color-text-muted)]">
                {caseItem.frontmatter.featuredImageAlt}
              </figcaption>
            )}
          </figure>
        )}

        {/* Layout: ToC sidebar + Body */}
        <div className="mt-10 lg:grid lg:grid-cols-[1fr_240px] lg:gap-10">
          {/* MDX Body */}
          <div className="prose prose-slate max-w-none prose-headings:font-[family-name:var(--font-heading)] prose-headings:scroll-mt-24 prose-a:text-[var(--color-accent)] prose-a:no-underline hover:prose-a:underline prose-table:text-sm prose-table:overflow-x-auto prose-img:rounded-lg min-w-0">
            <MDXRemote
              source={caseItem.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                  ],
                },
                parseFrontmatter: false,
              }}
              components={mdxComponents}
            />
          </div>

          {/* Table of Contents sidebar */}
          {headings.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
                  On This Page
                </h4>
                <nav aria-label="Table of Contents">
                  <ul className="space-y-1.5 text-sm">
                    {headings.map((h) => (
                      <li
                        key={h.id}
                        style={{ paddingLeft: h.level === 3 ? "1rem" : 0 }}
                      >
                        <a
                          href={`#${h.id}`}
                          className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors leading-snug block"
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          )}
        </div>

        {/* Key Findings (from frontmatter) */}
        {caseItem.frontmatter.keyFindings.length > 0 && (
          <section className="mt-12 border-t border-[var(--color-border)] pt-10">
            <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">
              Key Findings
            </h2>
            <div className="space-y-3">
              {caseItem.frontmatter.keyFindings.map((f, i) => (
                <div
                  key={i}
                  className="border border-[var(--color-border)] rounded-lg p-5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {f.type === "criticalIssue" && (
                      <span className="text-[var(--color-critical)] font-semibold text-sm">
                        ⚠ Critical
                      </span>
                    )}
                    {f.type === "keyFinding" && (
                      <span className="text-[var(--color-accent)] font-semibold text-sm">
                        • Key Finding
                      </span>
                    )}
                    {f.type === "recommendation" && (
                      <span className="text-[var(--color-success)] font-semibold text-sm">
                        ✓ Recommendation
                      </span>
                    )}
                    {f.type === "quickWin" && (
                      <span className="text-[var(--color-warning)] font-semibold text-sm">
                        ⚡ Quick Win
                      </span>
                    )}
                    {f.type === "important" && (
                      <span className="text-[var(--color-primary)] font-semibold text-sm">
                        ℹ Important
                      </span>
                    )}
                    {f.type === "expertNote" && (
                      <span className="text-[var(--color-text-muted)] font-semibold text-sm">
                        ✎ Expert Note
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold">{f.heading}</h3>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    {f.content}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {caseItem.frontmatter.faq.length > 0 && (
          <section className="mt-12 border-t border-[var(--color-border)] pt-10">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">
              FAQ
            </h2>
            <div className="space-y-2">
              {caseItem.frontmatter.faq.map((item, i) => (
                <details
                  key={i}
                  className="group border border-[var(--color-border)] rounded-lg"
                >
                  <summary className="px-5 py-4 font-semibold cursor-pointer hover:bg-[var(--color-bg-secondary)] list-none flex items-center justify-between">
                    {item.question}
                    <span className="text-[var(--color-text-muted)] group-open:rotate-180 transition-transform">
                      ▾
                    </span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Disclosure */}
        {caseItem.frontmatter.caseDisclosure && (
          <section className="mt-10 border-t border-[var(--color-border)] pt-8">
            <p className="text-xs text-[var(--color-text-muted)] italic">
              {caseItem.frontmatter.caseDisclosure}
            </p>
          </section>
        )}

        {/* Related Cases */}
        {relatedCases.length > 0 && (
          <section className="mt-12 border-t border-[var(--color-border)] pt-10">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">
              Related Cases
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCases.map((rc) => (
                <Link
                  key={rc.slug}
                  href={`/seo-audit-cases/${rc.slug}/`}
                  className="group block border border-[var(--color-border)] rounded-lg overflow-hidden hover:shadow-[var(--shadow-card-hover)] transition-shadow"
                >
                  <div className="aspect-video bg-[var(--color-bg-secondary)] flex items-center justify-center">
                    {rc.featuredImage ? (
                      <img
                        src={rc.featuredImage}
                        alt={rc.featuredImageAlt || rc.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-[var(--color-text-muted)] text-xs">
                        Image
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold font-[family-name:var(--font-heading)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
                      {rc.title}
                    </h3>
                    {rc.industry && (
                      <span className="mt-1 text-xs text-[var(--color-text-muted)]">
                        {rc.industry}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mt-12 bg-[var(--color-bg-secondary)] rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold font-[family-name:var(--font-heading)]">
            Want your own SEO audit?
          </h2>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            Get a manually prepared audit with clear, prioritized
            recommendations.
          </p>
          <Link
            href="/seo-audit/"
            className="mt-6 inline-flex items-center px-6 py-3 rounded-md bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-light)] transition-colors"
          >
            Audit Your Website
          </Link>
        </section>
      </article>
    </>
  );
}

/* ─── Extract headings from raw MDX ────────────────────────── */
function extractHeadings(raw: string): { id: string; text: string; level: 2 | 3 }[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const result: { id: string; text: string; level: 2 | 3 }[] = [];
  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(raw)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/<[^>]*>/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    result.push({ id, text, level });
  }
  return result;
}
