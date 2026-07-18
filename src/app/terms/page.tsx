import { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service", description: "SEO Audit Pro Terms of Service." };

export default function TermsPage() {
  return (
    <div className="container-content py-12 lg:py-16 prose prose-slate max-w-none prose-headings:font-[family-name:var(--font-heading)]">
      <h1>Terms of Service</h1>
      <p>This page will contain the SEO Audit Pro terms of service.</p>
    </div>
  );
}
