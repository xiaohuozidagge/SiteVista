import { Metadata } from "next";
import Link from "next/link";
import { AuditRequestForm } from "@/components/forms/AuditRequestForm";
import { FiverrButton } from "@/components/cta/FiverrButton";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "International SEO Audit Services",
  description:
    "Audit hreflang, canonicals, multilingual URLs, localized content and international targeting for your multilingual or multi-region website.",
  alternates: {
    canonical: "https://seoauditpro.cloud/international-seo-audit-services/",
  },
};

const firstScreenPoints = [
  "Hreflang validation across every language and region version",
  "Canonical and hreflang conflict analysis",
  "Multilingual URL structure and sitemap review",
  "Localized title, description, and content assessment",
  "Country and language targeting recommendations",
  "Delivered as a PDF report within 4 business days",
];

const includedItems = [
  {
    title: "Hreflang Audit",
    desc: "Verification of reciprocity, self-referencing tags, and language/region codes across every version of your site.",
  },
  {
    title: "Canonical Conflict Analysis",
    desc: "Detection of canonical and hreflang conflicts that cause search engines to index the wrong language version.",
  },
  {
    title: "URL Structure Review",
    desc: "Evaluation of subdirectories, subdomains, and ccTLDs, with a recommendation for the structure that best fits your markets.",
  },
  {
    title: "Multilingual Sitemap Review",
    desc: "Confirmation that every indexable language version is discoverable and that redirects and noindex pages are excluded.",
  },
  {
    title: "Localized Content Assessment",
    desc: "Review of localized titles, descriptions, headings, and content quality across your target markets.",
  },
  {
    title: "International Targeting",
    desc: "Geo-specific trust signals, language navigation, and internal linking recommendations for each region.",
  },
];

const audiences = [
  {
    title: "Multilingual Businesses",
    desc: "Sites serving two or more languages that need each version indexed in the right market.",
  },
  {
    title: "Multi-Region Brands",
    desc: "Businesses targeting several countries that want the correct regional pages to rank locally.",
  },
  {
    title: "Marketing Teams",
    desc: "Teams expanding internationally that need a clear roadmap for their multilingual SEO.",
  },
];

const steps = [
  { step: 1, title: "Submit", desc: "Tell us your target countries, languages, and current URL structure." },
  { step: 2, title: "Review", desc: "We audit your hreflang, canonicals, sitemaps, and localized content." },
  { step: 3, title: "Prioritize", desc: "Findings are ranked by impact and effort across each market." },
  { step: 4, title: "Receive", desc: "Get your PDF report within 4 business days." },
];

const faqs = [
  {
    q: "What is included in an international SEO audit?",
    a: "The audit covers hreflang validation, canonical and hreflang conflicts, multilingual URL structure, sitemaps, localized titles and content, international targeting signals, and indexation by country and language.",
  },
  {
    q: "How is this different from a general SEO audit?",
    a: "A general audit focuses on one language and market. An international audit adds the layer of managing multiple language and region versions — making sure each version is indexed correctly and the right page appears to the right audience.",
  },
  {
    q: "What URL structure should I use for languages?",
    a: "Subdirectories (example.com/fr/) consolidate authority and are easiest to maintain. Subdomains do not inherit the full authority of the main domain. Country-code domains carry the strongest geo-signal but cost the most. The audit recommends the structure that fits your specific situation.",
  },
  {
    q: "How long does the international SEO audit take?",
    a: "The International SEO Audit is delivered within 4 business days for sites up to 50 pages.",
  },
];

export default function InternationalSeoAuditServicesPage() {
  return (
    <>
      <ServiceSchema
        name="International SEO Audit Service"
        description="A multilingual and multi-region website audit covering hreflang, canonicals, multilingual URLs, localized content, and international targeting, delivered as a prioritized PDF action plan."
        url="/international-seo-audit-services/"
        offers={[
          {
            name: "International SEO Audit",
            price: 249,
            description:
              "A multilingual and multi-region audit for sites serving more than one country or language, delivered within 4 business days.",
          },
        ]}
      />
      <BreadcrumbSchema items={[{ label: "International SEO Audit Services" }]} />

      <div className="container-content py-12 lg:py-16 space-y-20">
        {/* Hero */}
        <section>
          <nav className="text-sm text-[var(--color-text-muted)] mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-[var(--color-accent)]">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-[var(--color-text)]" aria-current="page">International SEO Audit Services</li>
            </ol>
          </nav>

          <span className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
            International SEO Audit Services
          </span>
          <h1 className="mt-4 text-3xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-balance leading-tight">
            International SEO Audit for Multilingual and Multi-Region Websites
          </h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
            Ensure the right language and regional version of each page appears to
            the right audience. We audit hreflang, canonicals, multilingual URLs,
            and localized content across every market you serve.
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
              Request an International SEO Audit
            </a>
            <Link
              href="/blog/international-seo-audit/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-[var(--color-border)] font-semibold hover:bg-[var(--color-bg-secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] transition-colors"
            >
              View the Checklist Guide
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
            Request Your International SEO Audit
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] text-center max-w-2xl mx-auto">
            Tell us about your website, target markets, and current URL structure.
            We will review the details and respond within one business day.
          </p>
          <div className="mt-10 max-w-2xl mx-auto">
            <AuditRequestForm initialPackage="International SEO Audit" />
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
              { label: "International SEO Audit Guide", href: "/blog/international-seo-audit/" },
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
