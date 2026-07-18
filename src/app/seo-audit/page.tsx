import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SEO Audit Services",
  description: "Get a manually prepared SEO audit with clear findings and prioritized recommendations for your website.",
};

export default function SeoAuditPage() {
  return (
    <div className="container-content py-16 lg:py-24 text-center">
      <span className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">Coming Soon</span>
      <h1 className="mt-4 text-3xl lg:text-4xl font-bold font-[family-name:var(--font-heading)]">Professional SEO Audit Services</h1>
      <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
        We are preparing a detailed SEO audit service. Each audit is manually prepared with clear findings,
        prioritized recommendations, and an actionable roadmap — not an automated tool report.
      </p>
      <div className="mt-10 max-w-md mx-auto bg-[var(--color-bg-secondary)] rounded-xl p-8 text-left">
        <h2 className="font-bold font-[family-name:var(--font-heading)] text-lg">What to expect:</h2>
        <ul className="mt-4 space-y-3 text-sm text-[var(--color-text-secondary)]">
          <li>✓ Technical SEO analysis (crawl, index, speed, structure)</li>
          <li>✓ Content & keyword evaluation</li>
          <li>✓ Competitor comparison</li>
          <li>✓ Prioritized recommendations by impact and effort</li>
          <li>✓ Actionable step-by-step roadmap</li>
        </ul>
      </div>
      <div className="mt-10">
        <Link href="/contact/" className="inline-flex items-center px-6 py-3 rounded-md bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-light)] transition-colors">
          Get in Touch
        </Link>
      </div>
      <p className="mt-8 text-sm text-[var(--color-text-muted)]">
        In the meantime, explore our{" "}
        <Link href="/seo-audit-cases/" className="text-[var(--color-accent)] hover:underline">SEO audit case studies</Link>
        {" "}and{" "}
        <Link href="/seo-audit-guides/" className="text-[var(--color-accent)] hover:underline">SEO guides</Link>.
      </p>
    </div>
  );
}
