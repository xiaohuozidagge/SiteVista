import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity.client";
import { CASE_BY_SLUG_QUERY, ALL_CASES_SLUGS_QUERY } from "@/lib/sanity.queries";
import type { AuditCaseData } from "@/lib/sanity.types";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { FAQPageSchema } from "@/components/seo/FAQPageSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(ALL_CASES_SLUGS_QUERY);
  return (slugs || []).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseItem = await client.fetch<AuditCaseData | null>(CASE_BY_SLUG_QUERY, { slug });
  if (!caseItem) return { title: "Case Not Found" };
  const seo = caseItem.seo;
  return {
    title: seo?.metaTitle || caseItem.title,
    description: seo?.metaDescription || caseItem.excerpt,
    alternates: { canonical: seo?.canonicalUrl || `/seo-audit-cases/${slug}/` },
    robots: { index: !seo?.noIndex, follow: !seo?.noFollow },
  };
}

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const caseItem = await client.fetch<AuditCaseData | null>(CASE_BY_SLUG_QUERY, { slug });

  if (!caseItem) notFound();

  return (
    <>
      <ArticleSchema
        title={caseItem.title}
        description={caseItem.excerpt}
        imageUrl={caseItem.featuredImage?.asset?.url ? `${caseItem.featuredImage.asset.url}?w=1200&h=630&fit=crop&auto=format` : undefined}
        publishedAt={caseItem.publishedAt}
        updatedAt={caseItem.updatedAt}
        url={`${process.env.NEXT_PUBLIC_SITE_URL || "https://sitevista.net"}/seo-audit-cases/${caseItem.slug.current}/`}
      />
      <BreadcrumbSchema
        items={[
          { label: "SEO Audit Cases", href: "/seo-audit-cases/" },
          { label: caseItem.title },
        ]}
      />
      {caseItem.faq && caseItem.faq.length > 0 && <FAQPageSchema questions={caseItem.faq} />}
      <article className="container-content py-12 lg:py-16">
      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--color-text-muted)] mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="hover:text-[var(--color-accent)]">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/seo-audit-cases/" className="hover:text-[var(--color-accent)]">SEO Audit Cases</Link></li>
          <li aria-hidden>/</li>
          <li className="text-[var(--color-text)] truncate" aria-current="page">{caseItem.title}</li>
        </ol>
      </nav>

      {/* Header metadata */}
      <div className="flex flex-wrap gap-3 mb-3">
        {caseItem.industry && <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] bg-[var(--color-bg-secondary)] px-2 py-1 rounded">{caseItem.industry}</span>}
        {caseItem.websiteType && <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] px-2 py-1 rounded">{caseItem.websiteType}</span>}
      </div>

      <h1 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-heading)] text-balance leading-tight">{caseItem.title}</h1>
      {caseItem.excerpt && <p className="mt-4 text-lg text-[var(--color-text-secondary)]">{caseItem.excerpt}</p>}

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--color-text-muted)]">
        {caseItem.auditDate && <time dateTime={caseItem.auditDate}>Audit Date: {new Date(caseItem.auditDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>}
        {caseItem.readingTime != null && caseItem.readingTime > 0 && <span>{caseItem.readingTime} min read</span>}
      </div>

      {/* Featured Image */}
      {caseItem.featuredImage?.asset?.url && (
        <figure className="mt-8 -mx-4 lg:-mx-8">
          <img src={`${caseItem.featuredImage.asset.url}?w=1200&h=675&fit=crop&auto=format`} alt={caseItem.featuredImage.alt || caseItem.title} className="w-full rounded-lg" />
          {caseItem.featuredImage.alt && <figcaption className="mt-2 text-center text-sm text-[var(--color-text-muted)]">{caseItem.featuredImage.alt}</figcaption>}
        </figure>
      )}

      {/* Key Findings */}
      {caseItem.keyFindings && caseItem.keyFindings.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">Key Findings</h2>
          <div className="space-y-3">
            {caseItem.keyFindings.map((f) => (
              <div key={f._key} className="border border-[var(--color-border)] rounded-lg p-5">
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

      {/* Metrics */}
      {caseItem.metrics && caseItem.metrics.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">Metrics</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {caseItem.metrics.map((m) => {
              const sentimentColor =
                m.sentiment === "positive" ? "text-[var(--color-success)]" :
                m.sentiment === "negative" ? "text-[var(--color-critical)]" :
                "text-[var(--color-text)]";
              const arrow =
                m.direction === "up" ? "↑" :
                m.direction === "down" ? "↓" :
                "";
              return (
                <div key={m._key} className="border border-[var(--color-border)] rounded-lg p-5">
                  <p className="text-sm text-[var(--color-text-muted)]">{m.label}</p>
                  <p className={`text-2xl font-bold ${sentimentColor}`}>
                    {m.value}
                    {m.change && <span className="text-sm ml-2">{arrow} {m.change}</span>}
                  </p>
                  {m.description && <p className="mt-1 text-xs text-[var(--color-text-muted)]">{m.description}</p>}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Case Body */}
      <div className="mt-10 prose prose-slate max-w-none prose-headings:font-[family-name:var(--font-heading)] prose-headings:scroll-mt-24 prose-a:text-[var(--color-accent)]">
        {caseItem.body ? (
          <PortableTextBody value={caseItem.body} />
        ) : (
          <p className="text-[var(--color-text-muted)]">No content yet.</p>
        )}
      </div>

      {/* FAQ */}
      {caseItem.faq && caseItem.faq.length > 0 && (
        <section className="mt-12 border-t border-[var(--color-border)] pt-10">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">FAQ</h2>
          <div className="space-y-2">
            {caseItem.faq.map((item) => (
              <details key={item._key} className="group border border-[var(--color-border)] rounded-lg">
                <summary className="px-5 py-4 font-semibold cursor-pointer hover:bg-[var(--color-bg-secondary)] list-none flex items-center justify-between">{item.question}<span className="text-[var(--color-text-muted)] group-open:rotate-180 transition-transform">▾</span></summary>
                <div className="px-5 pb-4 text-[var(--color-text-secondary)]">{item.answer}</div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Disclosure */}
      {caseItem.caseDisclosure && (
        <section className="mt-10 border-t border-[var(--color-border)] pt-8">
          <p className="text-xs text-[var(--color-text-muted)] italic">{caseItem.caseDisclosure}</p>
        </section>
      )}

      {/* Related Cases */}
      {caseItem.relatedCases && caseItem.relatedCases.length > 0 && (
        <section className="mt-12 border-t border-[var(--color-border)] pt-10">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">Related Cases</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseItem.relatedCases.map((rc) => (
              <Link key={rc._id} href={`/seo-audit-cases/${rc.slug.current}/`} className="group block border border-[var(--color-border)] rounded-lg overflow-hidden hover:shadow-[var(--shadow-card-hover)] transition-shadow">
                <div className="aspect-video bg-[var(--color-bg-secondary)] flex items-center justify-center">
                  {rc.featuredImage?.asset?.url ? (
                    <img src={`${rc.featuredImage.asset.url}?w=400&h=225&fit=crop&auto=format`} alt={rc.featuredImage.alt || rc.title} className="w-full h-full object-cover" loading="lazy" />
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
      <section className="mt-12 bg-[var(--color-bg-secondary)] rounded-xl p-8 text-center">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)]">Want your own SEO audit?</h2>
        <p className="mt-2 text-[var(--color-text-secondary)]">Get a manually prepared audit with clear, prioritized recommendations.</p>
        <Link href="/seo-audit/" className="mt-6 inline-flex items-center px-6 py-3 rounded-md bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-light)] transition-colors">Audit Your Website</Link>
      </section>
    </article>
    </>
  );
}

import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";

function PortableTextBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <PortableText
      value={value}
      components={{
        block: {
          h2: ({ children }) => <h2 id={slugify(children)}>{children}<a href={`#${slugify(children)}`} className="no-underline ml-2 opacity-0 group-hover:opacity-100 text-[var(--color-text-muted)]" aria-hidden>#</a></h2>,
          h3: ({ children }) => <h3 id={slugify(children)}>{children}<a href={`#${slugify(children)}`} className="no-underline ml-2 opacity-0 group-hover:opacity-100 text-[var(--color-text-muted)]" aria-hidden>#</a></h3>,
        },
        marks: {
          link: ({ children, value }) => {
            const rel = [value?.nofollow && "nofollow", value?.sponsored && "sponsored"].filter(Boolean).join(" ");
            return <a href={value?.href} target={value?.openInNewTab ? "_blank" : undefined} rel={rel || undefined}>{children}</a>;
          },
        },
      }}
    />
  );
}

function slugify(children: React.ReactNode): string {
  const text = typeof children === "string" ? children : Array.isArray(children) ? children.map(c => typeof c === "string" ? c : "").join("") : "";
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
}
