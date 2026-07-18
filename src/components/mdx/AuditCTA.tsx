import Link from "next/link";

interface AuditCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export function AuditCTA({
  title = "Ready to Find Out What Is Holding Your Website Back?",
  description = "Get a manually prepared SEO audit with clear findings and prioritized recommendations.",
  buttonText = "Audit Your Website",
  buttonUrl = "/seo-audit/",
}: AuditCTAProps) {
  return (
    <div className="my-10 bg-[var(--color-primary)] text-white rounded-xl p-8 lg:p-12 text-center not-prose">
      <h2 className="text-xl lg:text-2xl font-bold font-[family-name:var(--font-heading)]">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-gray-300 max-w-lg mx-auto text-sm leading-relaxed">
          {description}
        </p>
      )}
      <Link
        href={buttonUrl}
        className="mt-6 inline-flex items-center px-6 py-3 rounded-md bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-light)] transition-colors"
      >
        {buttonText}
      </Link>
    </div>
  );
}
