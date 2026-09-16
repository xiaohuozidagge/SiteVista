import { Metadata } from "next";
import Link from "next/link";
import { AuditRequestForm } from "@/components/forms/AuditRequestForm";
import { FiverrButton } from "@/components/cta/FiverrButton";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Manufacturing SEO Audit Services for B2B Websites",
  description:
    "SEO audits for B2B manufacturing websites. Find the technical, content, and keyword issues limiting your lead generation and discoverability.",
  alternates: {
    canonical: "https://seoauditpro.cloud/manufacturing-seo-audit/",
  },
};

const firstScreenPoints = [
  "Technical, on-page, and content audit for B2B manufacturing sites",
  "Review of product, capability, and industry pages",
  "Keyword targeting for engineers and procurement buyers",
  "Prioritized remediation list ordered by impact and effort",
  "Delivered as a PDF report within 3 business days",
];

const includedItems = [
  {
    title: "Technical SEO Audit",
    desc: "Crawlability, indexation, site architecture, page speed, and structured data for your product and capability pages.",
  },
  {
    title: "Product & Capability Page Review",
    desc: "Assessment of how well your product pages, specifications, and capabilities content matches what buyers search for.",
  },
  {
    title: "Content & Keyword Analysis",
    desc: "Keyword targeting for technical and procurement audiences, search intent alignment, and content gap opportunities.",
  },
  {
    title: "On-Page SEO Review",
    desc: "Title tags, meta descriptions, headings, internal linking, and image optimization across your key pages.",
  },
  {
    title: "Lead Generation Review",
    desc: "Evaluation of your calls to action, quote-request paths, and contact points for converting search traffic into inquiries.",
  },
  {
    title: "Prioritized Recommendations",
    desc: "Every finding ranked by impact and effort so your team knows what to fix first and what drives the most inquiries.",
  },
];

const audiences = [
  {
    title: "OEMs & Job Shops",
    desc: "Manufacturers whose product pages should be found by engineers searching for specific capabilities.",
  },
  {
    title: "Industrial Suppliers",
    desc: "Suppliers of components, materials, and equipment selling to procurement teams.",
  },
  {
    title: "Marketing Teams",
    desc: "In-house teams that need a clear technical roadmap for manufacturing SEO.",
  },
];

const steps = [
  { step: 1, title: "Submit", desc: "Share your website URL, target industries, and lead goals." },
  { step: 2, title: "Review", desc: "We audit your technical SEO, product pages, and content." },
  { step: 3, title: "Prioritize", desc: "Findings are ranked by impact and effort for lead generation." },
  { step: 4, title: "Receive", desc: "Get your PDF report within 3 business days." },
];

const faqs = [
  {
    q: "What makes manufacturing SEO different?",
    a: "Manufacturing buyers search with highly specific technical terms — materials, tolerances, certifications, and capabilities. The audit focuses on matching those searches with product, capability, and industry pages that convert into inquiries.",
  },
  {
    q: "Which pages should be audited?",
    a: "The Growth Audit covers up to 30 pages, which for most manufacturers includes the homepage, key product and capability pages, industry pages, and contact or quote-request pages.",
  },
  {
    q: "Will this help us generate more leads?",
    a: "The audit identifies the technical and content issues preventing your pages from ranking and converting. Fixing those issues is what improves lead generation from search.",
  },
  {
    q: "How long does a manufacturing SEO audit take?",
    a: "The Growth Audit is delivered within 3 business days for sites up to 30 pages.",
  },
];

export default function ManufacturingSeoAuditPage() {
  return (
    <>
      <ServiceSchema
        name="Manufacturing SEO Audit Service"
        description="A B2B website SEO audit for manufacturers, covering technical SEO, product and capability pages, content and keyword targeting, and lead generation, delivered as a prioritized PDF action plan."
        url="/manufacturing-seo-audit/"
        offers={[
          {
            name: "Growth Audit",
            price: 129,
            description:
              "A complete technical, content, and on-page audit for growing B2B manufacturing sites, delivered within 3 business days.",
          },
        ]}
      />
      <BreadcrumbSchema items={[{ label: "Manufacturing SEO Audit" }]} />

      <div className="container-content py-12 lg:py-16 space-y-20">
        {/* Hero */}
        <section>
          <nav className="text-sm text-[var(--color-text-muted)] mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-[var(--color-accent)]">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-[var(--color-text)]" aria-current="page">Manufacturing SEO Audit</li>
            </ol>
          </nav>

          <span className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
            Manufacturing SEO Audit
          </span>
          <h1 className="mt-4 text-3xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-balance leading-tight">
            SEO Audits for B2B Manufacturing Websites
          </h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
            Manufacturing buyers search with highly specific technical terms. We audit
            your site to find the issues preventing your product and capability pages
            from being found — and converting into inquiries.
          </p>

          <ul className="mt-8 grid sm:grid-cols-2 gap-3 max-w-2xl">
            {firstScreenPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]">
                <span className="text-[var(--color-success)] mt-0.5" aria-hidden>✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4">
            <a
              href="#request-audit"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] transition-colors"
            >
              Request a Manufacturing SEO Audit
            </a>
            <Link
              href="/sample-seo-audit-report/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-[var(--color-border)] font-semibold hover:bg-[var(--color-bg-secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] transition-colors"
            >
              View Sample Report
            </Link>
            <FiverrButton />
          </div>
        </section>

        {/* What Is Included */}
        <section>
          <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-heading)] text-center">
            What Is Included
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {includedItems.map((item) => (
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
            {audiences.map((item) => (
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
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-accent)] text-white font-bold text-lg mb-4">{s.step}</div>
                <h3 className="font-bold font-[family-name:var(--font-heading)]">{s.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Request Form */}
        <section id="request-audit" className="scroll-mt-24">
          <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-heading)] text-center">
            Request Your Manufacturing SEO Audit
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] text-center max-w-2xl mx-auto">
            Tell us about your website, products, and target industries. We will
            review the details and respond within one business day.
          </p>
          <div className="mt-10 max-w-2xl mx-auto">
            <AuditRequestForm initialPackage="Growth Audit" />
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-heading)] text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="max-w-2xl mx-auto space-y-2">
            {faqs.map((faq) => (
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
            Learn More
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Website SEO Audit Service", href: "/seo-audit/" },
              { label: "International SEO Audit Services", href: "/international-seo-audit-services/" },
              { label: "Technical SEO Audit Guide", href: "/blog/technical-seo-audit/" },
              { label: "On-Page SEO Audit Guide", href: "/blog/on-page-seo-audit/" },
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
      </div>
    </>
  );
}
