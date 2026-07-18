import { Metadata } from "next";
import Link from "next/link";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";

export const metadata: Metadata = {
  title: "About SEO Audit Pro",
  description:
    "SEO Audit Pro provides manually prepared SEO audits and practical search optimization resources for businesses, marketers, and website owners.",
  alternates: { canonical: "/about/" },
  openGraph: {
    title: "About SEO Audit Pro",
    description:
      "SEO Audit Pro provides manually prepared SEO audits and practical search optimization resources.",
  },
};

const analysisItems = [
  "Technical SEO",
  "Crawling and Indexing",
  "On-Page SEO",
  "Website Structure",
  "Keyword Visibility",
  "Content Performance",
  "Competitor Opportunities",
  "Backlink Profile",
  "Core Web Vitals",
  "AI Search Visibility",
];

const steps = [
  {
    step: 1,
    title: "Submit Your Website",
    description: "Submit your website URL and business information through our secure form.",
  },
  {
    step: 2,
    title: "Complete Payment",
    description: "Complete payment securely online. Your audit will be scheduled immediately.",
  },
  {
    step: 3,
    title: "Manual Review",
    description: "Your website is reviewed manually by an experienced SEO analyst — not an automated tool.",
  },
  {
    step: 4,
    title: "Receive Your Report",
    description: "Receive the PDF audit report by email within two business days with clear findings and prioritized recommendations.",
  },
];

const whyItems = [
  {
    title: "Manually Prepared Reports",
    description:
      "Every audit is prepared by hand. You get real analysis, not a generic tool-generated checklist.",
  },
  {
    title: "Clear Explanations",
    description:
      "Findings are explained in plain English with context — you understand not just what to fix, but why it matters.",
  },
  {
    title: "Prioritized Recommendations",
    description:
      "Recommendations are ranked by impact and effort, so you know exactly where to start and what moves the needle.",
  },
  {
    title: "Practical SEO Roadmap",
    description:
      "You get an actionable step-by-step plan, not just a list of issues. Give it to your developer or do it yourself.",
  },
];

export default function AboutPage() {
  return (
    <>
      <OrganizationSchema />
      {/* Hero */}
      <section className="bg-[var(--color-primary)] text-white py-16 lg:py-24">
        <div className="container-content text-center">
          <h1 className="text-3xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-balance leading-tight">
            About SEO Audit Pro
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto text-balance leading-relaxed">
            SEO Audit Pro provides manually prepared SEO audits and practical search
            optimization resources for businesses, marketers, and website owners.
          </p>
        </div>
      </section>

      <div className="container-content py-16 lg:py-24 space-y-24">
        {/* Brand Positioning */}
        <section>
          <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-heading)] text-center">
            Clear SEO Insights, Practical Recommendations
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] text-center max-w-2xl mx-auto">
            SEO Audit Pro does not just list errors that SEO tools find. Every audit
            helps you understand:
          </p>
          <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              "What is affecting search visibility",
              "Which issues matter most",
              "What should be fixed first",
              "Where content and keyword opportunities exist",
              "What actions should be taken next",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 p-4 border border-[var(--color-border)] rounded-lg"
              >
                <span className="text-[var(--color-accent)] font-bold mt-0.5 shrink-0">
                  →
                </span>
                <span className="text-sm text-[var(--color-text-secondary)]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* What We Analyze */}
        <section>
          <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-heading)] text-center">
            What We Analyze
          </h2>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
            {analysisItems.map((item) => (
              <div
                key={item}
                className="p-4 border border-[var(--color-border)] rounded-lg text-center text-sm font-medium text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-text)] transition-colors"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* How SEO Audit Pro Works */}
        <section className="bg-[var(--color-bg-secondary)] rounded-xl p-10 lg:p-16">
          <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-heading)] text-center">
            How SEO Audit Pro Works
          </h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-accent)] text-white font-bold text-lg mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold font-[family-name:var(--font-heading)]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              Payment processing will be available soon. You can learn more about our audit process now.
            </p>
            <Link
              href="/seo-audit/"
              className="inline-flex items-center px-6 py-3 rounded-md bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-light)] transition-colors"
            >
              Learn About SEO Audits
            </Link>
          </div>
        </section>

        {/* Why Choose SEO Audit Pro */}
        <section>
          <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-heading)] text-center">
            Why Choose SEO Audit Pro
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyItems.map((item) => (
              <div
                key={item.title}
                className="p-6 border border-[var(--color-border)] rounded-lg"
              >
                <h3 className="font-bold font-[family-name:var(--font-heading)] text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-[var(--color-primary)] text-white rounded-xl p-10 lg:p-16">
          <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-heading)] text-balance">
            Ready to Understand What Is Holding Your Website Back?
          </h2>
          <Link
            href="/seo-audit/"
            className="mt-8 inline-flex items-center px-6 py-3 rounded-md bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-light)] transition-colors"
          >
            Audit Your Website
          </Link>
        </section>
      </div>
    </>
  );
}
