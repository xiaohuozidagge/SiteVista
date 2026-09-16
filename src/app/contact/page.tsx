import { Metadata } from "next";
import { AuditRequestForm } from "@/components/forms/AuditRequestForm";

export const metadata: Metadata = {
  title: "Contact SEO Audit Pro",
  description:
    "Request an SEO audit or get in touch with SEO Audit Pro. Tell us about your website and we will respond within one business day.",
};

export default function ContactPage() {
  return (
    <div className="container-content py-12 lg:py-16">
      <h1 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-heading)]">
        Contact Us
      </h1>
      <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
        Interested in an SEO audit or have a question? Tell us about your website
        and what you want to achieve, and we will respond within one business day.
      </p>

      <div className="mt-10 max-w-2xl">
        <AuditRequestForm />
      </div>
    </div>
  );
}
