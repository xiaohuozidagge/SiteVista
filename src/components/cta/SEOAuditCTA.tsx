import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

interface SEOAuditCTAProps {
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  style?: "light" | "primary" | "bordered";
}

const styleConfig = {
  primary: {
    bg: "bg-[var(--color-primary)]",
    text: "text-white",
    heading: "text-white",
    desc: "text-white/70",
    button:
      "bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white",
    iconColor: "text-white/15",
  },
  light: {
    bg: "bg-[var(--color-bg-secondary)]",
    text: "text-[var(--color-text)]",
    heading: "text-[var(--color-text)]",
    desc: "text-[var(--color-text-secondary)]",
    button:
      "bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white",
    iconColor: "text-[var(--color-border-hover)]",
  },
  bordered: {
    bg: "bg-[var(--color-bg)] border-2 border-[var(--color-border)]",
    text: "text-[var(--color-text)]",
    heading: "text-[var(--color-text)]",
    desc: "text-[var(--color-text-secondary)]",
    button:
      "bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white",
    iconColor: "text-[var(--color-border-hover)]",
  },
};

export default function SEOAuditCTA({
  heading = "Find Out What Is Holding Your Website Back",
  description = "Get a comprehensive, manual SEO audit from an experienced professional. I identify technical issues, content gaps, and untapped opportunities specific to your website.",
  buttonText = "Audit Your Website",
  buttonUrl = "/seo-audit/",
  style = "primary",
}: SEOAuditCTAProps) {
  const styles = styleConfig[style];

  return (
    <section className={`${styles.bg} rounded-[var(--radius-xl)] p-8 md:p-12 relative overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-48 h-48 opacity-10 pointer-events-none">
        <Search size={192} className={styles.iconColor} strokeWidth={1} />
      </div>

      <div className="relative z-10 max-w-2xl">
        <h2
          className={`font-[family-name:var(--font-heading)] font-bold text-2xl md:text-3xl leading-tight mb-3 ${styles.heading}`}
        >
          {heading}
        </h2>
        <p className={`text-base leading-relaxed mb-6 max-w-xl ${styles.desc}`}>
          {description}
        </p>
        <Link
          href={buttonUrl}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-md)] text-sm font-semibold transition-colors duration-150 no-underline shadow-sm ${styles.button}`}
        >
          {buttonText}
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
