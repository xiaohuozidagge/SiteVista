import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Professional Website SEO Audit Services | SEO Audit Pro",
  description:
    "Get a manually prepared website SEO audit covering technical issues, content, keywords and prioritized recommendations.",
  alternates: { canonical: "https://seoauditpro.cloud/seo-audit/" },
};

export default function SeoAuditPage() {
  return (
    <div className="container-content py-12 lg:py-16 space-y-20">
      {/* Hero */}
      <section className="text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
          SEO Audit Services
        </span>
        <h1 className="mt-4 text-3xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-balance leading-tight">
          Professional SEO Audit for Your Website
        </h1>
        <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
          Identify the technical, content, keyword, and on-page issues affecting
          your search visibility with a manually prepared website SEO audit.
        </p>
        <div className="mt-8">
          <Link
            href="/contact/"
            className="inline-flex items-center px-6 py-3 rounded-md bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-light)] transition-colors"
          >
            Inquire About an Audit
          </Link>
        </div>
      </section>

      {/* What Is Included */}
      <section>
        <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-heading)] text-center">
          What Is Included
        </h2>
        <div className="mt-10 grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              title: "Full Website SEO Audit",
              desc: "A complete review of your site covering technical SEO, on-page factors, content quality, keyword targeting, and off-page signals that affect search visibility.",
            },
            {
              title: "Technical SEO Audit",
              desc: "Crawlability, indexation, site architecture, page speed, Core Web Vitals, structured data, mobile usability, and JavaScript rendering.",
            },
            {
              title: "Content & Keyword Analysis",
              desc: "Evaluation of your content strategy, keyword targeting, search intent alignment, duplicate content, and content gap opportunities.",
            },
            {
              title: "On-Page SEO Review",
              desc: "Title tags, meta descriptions, heading structure, internal linking, image optimization, and URL structure across your key pages.",
            },
            {
              title: "Prioritized Recommendations",
              desc: "Every finding is ranked by impact and effort so you know what to fix first, what moves the needle most, and what actions to take next.",
            },
            {
              title: "Delivery Format",
              desc: "You receive a structured PDF report organized by priority. Each issue includes the finding, why it matters, and how to fix it.",
            },
          ].map((item) => (
            <div key={item.title} className="border border-[var(--color-border)] rounded-lg p-6">
              <h3 className="font-bold font-[family-name:var(--font-heading)]">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who This Is For */}
      <section>
        <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-heading)] text-center">
          Who This Audit Is For
        </h2>
        <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-center">
          {[
            { title: "Business Owners", desc: "Understand why your site is not getting the traffic it should and what to do about it." },
            { title: "Marketing Teams", desc: "Get a clear roadmap to improve organic search performance and content strategy." },
            { title: "Agencies & Consultants", desc: "Use our audits to support your client recommendations with independent analysis." },
          ].map((item) => (
            <div key={item.title} className="p-5 border border-[var(--color-border)] rounded-lg">
              <h3 className="font-bold font-[family-name:var(--font-heading)]">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Delivery Process */}
      <section className="bg-[var(--color-bg-secondary)] rounded-xl p-10 lg:p-16">
        <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-heading)] text-center">
          How It Works
        </h2>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: 1, title: "Submit", desc: "Provide your website URL and business information." },
            { step: 2, title: "Review", desc: "Your site is reviewed manually by an SEO analyst." },
            { step: 3, title: "Analyze", desc: "Findings are organized and prioritized by impact." },
            { step: 4, title: "Receive", desc: "Get your PDF report within two business days." },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-accent)] text-white font-bold text-lg mb-4">{s.step}</div>
              <h3 className="font-bold font-[family-name:var(--font-heading)]">{s.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Placeholder */}
      <section className="text-center">
        <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-heading)]">
          Pricing
        </h2>
        <p className="mt-4 text-[var(--color-text-secondary)] max-w-md mx-auto">
          Pricing details will be available when the service launches. Each audit
          is priced based on website size and scope — you only pay for what you need.
        </p>
        <div className="mt-6">
          <Link
            href="/contact/"
            className="inline-flex items-center px-6 py-3 rounded-md border border-[var(--color-border)] font-semibold hover:bg-[var(--color-bg-secondary)] transition-colors"
          >
            Contact for Details
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-heading)] text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="max-w-2xl mx-auto space-y-2">
          {[
            {
              q: "What does a website SEO audit include?",
              a: "A full website SEO audit covers technical SEO (crawlability, indexing, site speed), on-page factors (titles, headings, content), keyword targeting, and competitive positioning. You get a prioritized report with clear, actionable recommendations.",
            },
            {
              q: "Is this an automated tool report?",
              a: "No. Every audit is manually prepared by an SEO analyst. You get context, explanation, and prioritization — not a generic list of issues from an automated crawler.",
            },
            {
              q: "How long does an SEO audit take?",
              a: "Most audits are delivered within two business days. Larger sites may take additional time. You will be informed of the timeline when you submit your site.",
            },
            {
              q: "What is a technical SEO audit?",
              a: "A technical SEO audit reviews the underlying infrastructure of your site — crawlability, indexation, page speed, structured data, mobile usability, and architecture — to identify issues that prevent search engines from accessing and ranking your content.",
            },
            {
              q: "Do you offer SEO audit consulting?",
              a: "Yes. Each audit includes clear explanations and recommendations. If you need help implementing the fixes, we can discuss consulting options.",
            },
          ].map((faq) => (
            <details key={faq.q} className="group border border-[var(--color-border)] rounded-lg">
              <summary className="px-5 py-4 font-semibold cursor-pointer hover:bg-[var(--color-bg-secondary)] list-none flex items-center justify-between">
                {faq.q}
                <span className="text-[var(--color-text-muted)] group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-5 pb-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Internal Links */}
      <section className="border-t border-[var(--color-border)] pt-12">
        <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-center mb-6">
          Learn More About SEO Audits
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { label: "SEO Audit Checklist", href: "/blog/seo-audit-checklist/" },
            { label: "Technical SEO Audit Guide", href: "/blog/technical-seo-audit/" },
            { label: "On-Page SEO Audit Guide", href: "/blog/on-page-seo-audit/" },
            { label: "Content SEO Audit Guide", href: "/blog/content-seo-audit/" },
            { label: "Sample SEO Audit Report", href: "/sample-seo-audit-report/" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 border border-[var(--color-border)] rounded-md text-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-primary)] text-white rounded-xl p-10 lg:p-16 text-center">
        <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-heading)]">
          Ready to Find Out What Is Holding Your Website Back?
        </h2>
        <p className="mt-4 text-gray-300 max-w-xl mx-auto">
          Get a manually prepared website SEO audit with clear findings and
          prioritized recommendations you can act on.
        </p>
        <Link
          href="/contact/"
          className="mt-8 inline-flex items-center px-6 py-3 rounded-md bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-light)] transition-colors"
        >
          Inquire About an Audit
        </Link>
      </section>
    </div>
  );
}
