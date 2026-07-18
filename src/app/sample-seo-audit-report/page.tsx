import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sample SEO Audit Report",
  description: "Explore a sample SEO audit report structure covering technical SEO, content, keyword visibility, and prioritized recommendations.",
};

export default function SampleReportPage() {
  return (
    <div className="container-content py-12 lg:py-16">
      <h1 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-heading)]">Sample SEO Audit Report</h1>
      <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
        A professional SEO audit covers more than just automated tool output. Here is what a typical report includes.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 gap-6">
        {[
          { title: "Technical SEO", items: ["Crawlability & indexation review", "Site architecture analysis", "Page speed & Core Web Vitals", "Mobile usability check", "Structured data validation"] },
          { title: "Content & Keywords", items: ["Keyword visibility assessment", "Content quality & depth review", "Duplicate content detection", "Title tag & meta description audit", "Internal linking analysis"] },
          { title: "Competitive Analysis", items: ["Top competitor identification", "Keyword gap analysis", "Content gap analysis", "Backlink profile comparison", "Market positioning review"] },
          { title: "Recommendations", items: ["Prioritized by impact and effort", "Quick wins you can implement today", "Strategic roadmap for 3-6 months", "Developer-ready technical specs", "Measurement & tracking plan"] },
        ].map((section) => (
          <div key={section.title} className="border border-[var(--color-border)] rounded-lg p-6">
            <h2 className="font-bold font-[family-name:var(--font-heading)] text-lg mb-3">{section.title}</h2>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              {section.items.map((item) => <li key={item} className="flex items-start gap-2"><span className="text-[var(--color-accent)] mt-0.5">•</span> {item}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/seo-audit/" className="inline-flex items-center px-6 py-3 rounded-md bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-light)] transition-colors">
          Get Your SEO Audit
        </Link>
      </div>
    </div>
  );
}
