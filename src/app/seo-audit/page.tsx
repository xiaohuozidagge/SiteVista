import { Metadata } from "next";
import Link from "next/link";
import { PricingCards } from "@/components/pricing/PricingCards";
import { JotformAuditOrder } from "@/components/JotformAuditOrder";
import { TrackedCtaLink } from "@/components/cta/TrackedCtaLink";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { AUDIT_PACKAGES } from "@/lib/seo-audit";

export const metadata: Metadata = {
  title: "Professional Website SEO Audit Services",
  description:
    "Choose an audit package, pay securely through PayPal, and receive a manually prepared PDF SEO audit with prioritized recommendations by email within 3–7 business days.",
  alternates: { canonical: "https://seoauditpro.cloud/seo-audit/" },
  openGraph: {
    title: "Professional Website SEO Audit Services",
    description:
      "Choose an audit package, pay securely through PayPal, and receive a manually prepared PDF SEO audit with prioritized recommendations by email.",
    url: "https://seoauditpro.cloud/seo-audit/",
    type: "website",
  },
};

const firstScreenPoints = [
  "Manually prepared by an SEO analyst",
  "Technical, on-page, content, and keyword analysis",
  "Prioritized recommendations based on impact and effort",
  "Delivered as a structured PDF report by email",
  "Delivery within 3–7 business days",
];

const trustBar = [
  "Secure PayPal Checkout",
  "Manual SEO Analysis",
  "PDF Report by Email",
  "Clear Delivery Timeline",
];

const includedItems = [
  {
    title: "Full Website SEO Audit",
    desc: "A complete review of your site covering technical SEO, on-page factors, content quality, keyword targeting, and international signals that affect search visibility.",
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
    desc: "Your audit is delivered by email as a structured PDF report organized by priority. Each issue includes the finding, why it matters, and how to fix it.",
  },
];

const steps = [
  {
    step: 1,
    title: "Choose Your Audit",
    desc: "Select the package that matches your website size and target markets.",
  },
  {
    step: 2,
    title: "Submit and Pay",
    desc: "Provide your website information and complete secure payment through PayPal.",
  },
  {
    step: 3,
    title: "Manual Analysis",
    desc: "Your website is reviewed manually using professional SEO tools and analyst evaluation.",
  },
  {
    step: 4,
    title: "Receive Your Report",
    desc: "Your completed PDF audit is delivered to the email address submitted with your order.",
  },
];

const orderHints = [
  "Secure payment processed through PayPal",
  "Order confirmation sent by email",
  "PDF audit delivered within the selected package timeline",
];

const faqs = [
  {
    q: "How do I place an order?",
    a: "Choose the package that matches your website size in the pricing section above, then complete the order form with your website information. Payment is processed securely through PayPal, and you will receive an order confirmation by email.",
  },
  {
    q: "When does the delivery period begin?",
    a: "Delivery time begins after successful payment and receipt of all required website information. The delivery timeline for each package — 3, 5, or 7 business days — is shown before you pay.",
  },
  {
    q: "How will I receive the SEO audit?",
    a: "Your audit is delivered as a structured PDF report to the email address you submit with your order.",
  },
  {
    q: "Does the audit include implementation?",
    a: "No. The audit includes SEO analysis, findings, and prioritized recommendations. Website implementation, content writing, and link building are not included unless separately agreed.",
  },
  {
    q: "What if my website exceeds the package limit?",
    a: "Choose the package that matches your website size. If your site is close to or over a limit, or you are unsure which package fits, contact us before ordering and we will help you select the right scope.",
  },
  {
    q: "Is payment secure?",
    a: "Yes. Payment is processed securely through PayPal, and we do not see or store your payment details.",
  },
];

export default function SeoAuditPage() {
  return (
    <>
      <ServiceSchema
        name="Website SEO Audit Service"
        description="A manually prepared website SEO audit covering technical, on-page, content, and keyword analysis, delivered as a prioritized PDF report by email within 3–7 business days."
        url="/seo-audit/"
        offers={AUDIT_PACKAGES.map((p) => ({
          name: p.name,
          price: p.price,
          description: `${p.pages}. ${p.delivery}. ${p.description}`,
        }))}
      />
      <BreadcrumbSchema items={[{ label: "SEO Audit" }]} />

      <div className="container-content py-12 lg:py-16 space-y-20">
        {/* Hero */}
        <section>
          <nav className="text-sm text-[var(--color-text-muted)] mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-[var(--color-accent)]">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-[var(--color-text)]" aria-current="page">SEO Audit</li>
            </ol>
          </nav>

          <span className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
            SEO Audit Services
          </span>
          <h1 className="mt-4 text-3xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-balance leading-tight">
            Professional SEO Audit for Your Website
          </h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
            Identify the technical, content, keyword, and on-page issues limiting
            your search visibility. Receive a manually prepared PDF audit with
            prioritized, actionable recommendations.
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
              href="#pricing"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] transition-colors"
            >
              Choose an Audit Package
            </a>
            <TrackedCtaLink
              href="/sample-seo-audit-report/"
              eventName="sample_report_click"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-[var(--color-border)] font-semibold hover:bg-[var(--color-bg-secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] transition-colors"
            >
              View Sample Report
            </TrackedCtaLink>
          </div>
        </section>

        {/* Trust bar */}
        <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 sm:p-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {trustBar.map((item) => (
              <div key={item} className="flex items-center justify-center gap-2.5 text-center">
                <span className="text-[var(--color-success)]" aria-hidden>✓</span>
                <span className="text-sm font-semibold text-[var(--color-text)]">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-24">
          <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-heading)] text-center">
            Choose Your Audit Package
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] text-center max-w-2xl mx-auto">
            Every package includes a manually prepared PDF report with prioritized
            findings, delivered to your email within the timeline shown.
          </p>
          <div className="mt-10">
            <PricingCards />
          </div>
          <p className="mt-8 text-center text-sm text-[var(--color-text-secondary)]">
            Not sure which package fits your website?{" "}
            <TrackedCtaLink
              href="/contact/"
              eventName="contact_before_order_click"
              className="font-semibold text-[var(--color-accent)] hover:underline"
            >
              Contact us before ordering.
            </TrackedCtaLink>
          </p>
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

        {/* How It Works */}
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
          <p className="mt-10 text-center text-sm text-[var(--color-text-secondary)]">
            Delivery time begins after successful payment and receipt of all required
            website information.
          </p>
        </section>

        {/* Order Form */}
        <section id="order-form" className="scroll-mt-24">
          <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-heading)] text-center">
            Complete Your SEO Audit Order
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] text-center max-w-2xl mx-auto">
            Select your audit package, provide your website information, and complete
            your payment securely through PayPal.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3 max-w-3xl mx-auto">
            {orderHints.map((hint) => (
              <li key={hint} className="flex items-start justify-center gap-2 text-sm text-[var(--color-text-secondary)]">
                <span className="text-[var(--color-success)] mt-0.5" aria-hidden>✓</span>
                <span>{hint}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 max-w-3xl mx-auto">
            <JotformAuditOrder />
          </div>

          <div className="mt-8 max-w-3xl mx-auto space-y-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">
            <div>
              <h3 className="font-bold font-[family-name:var(--font-heading)] text-[var(--color-text)]">
                What Happens After Payment?
              </h3>
              <p className="mt-1.5">
                When your payment is completed, you will receive an order confirmation
                by email. We will review the information submitted with your order and
                begin the audit. Your completed PDF report will be delivered to your
                email within the timeline of the selected package.
              </p>
            </div>
            <p>
              This service includes SEO analysis, findings, and recommendations.
              Website implementation, content writing, link building, and guaranteed
              ranking improvements are not included unless separately agreed.
            </p>
            <p>
              <Link href="/terms/" className="font-semibold text-[var(--color-accent)] hover:underline">Terms of Service</Link>
              {" · "}
              <Link href="/privacy-policy/" className="font-semibold text-[var(--color-accent)] hover:underline">Privacy Policy</Link>
              {" · "}
              <Link href="/refund-policy/" className="font-semibold text-[var(--color-accent)] hover:underline">Refund Policy</Link>
            </p>
          </div>
        </section>

        {/* Sample Report CTA */}
        <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-10 lg:p-12 text-center">
          <h2 className="text-xl font-bold font-[family-name:var(--font-heading)]">
            See What a Professional SEO Audit Includes
          </h2>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            Review a sample PDF report to understand the format, findings, and
            prioritization you will receive.
          </p>
          <TrackedCtaLink
            href="/sample-seo-audit-report/"
            eventName="sample_report_click"
            className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-md bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] transition-colors"
          >
            View Sample Report
          </TrackedCtaLink>
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

        {/* Related Guides */}
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
              { label: "International SEO Audit Guide", href: "/blog/international-seo-audit/" },
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
