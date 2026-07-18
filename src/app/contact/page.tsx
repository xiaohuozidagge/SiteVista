import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact SiteVista",
  description: "Get in touch with SiteVista about SEO audits, questions, or collaboration opportunities.",
};

export default function ContactPage() {
  return (
    <div className="container-content py-12 lg:py-16">
      <h1 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-heading)]">Contact</h1>
      <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
        Interested in an SEO audit or have a question? We would love to hear from you.
      </p>

      <div className="mt-10 bg-[var(--color-bg-secondary)] rounded-xl p-8">
        <p className="text-[var(--color-text-muted)] text-sm">
          Contact form will be available soon. In the meantime, explore our{" "}
          <Link href="/seo-audit-guides/" className="text-[var(--color-accent)] hover:underline">SEO guides</Link>
          {" "}and{" "}
          <Link href="/seo-audit-cases/" className="text-[var(--color-accent)] hover:underline">audit case studies</Link>.
        </p>
        <div className="mt-6">
          <Link href="/seo-audit/" className="inline-flex items-center px-6 py-3 rounded-md bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-light)] transition-colors">
            Learn About SEO Audits
          </Link>
        </div>
      </div>
    </div>
  );
}
