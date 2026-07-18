import { Metadata } from "next";

export const metadata: Metadata = { title: "Refund Policy", description: "SEO Audit Pro Refund Policy." };

export default function RefundPage() {
  return (
    <div className="container-content py-12 lg:py-16 prose prose-slate max-w-none prose-headings:font-[family-name:var(--font-heading)]">
      <h1>Refund Policy</h1>
      <p>This page will contain the SEO Audit Pro refund policy.</p>
    </div>
  );
}
