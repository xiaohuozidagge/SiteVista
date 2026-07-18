import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

const quickLinks: FooterLink[] = [
  { label: "SEO Audit Cases", href: "/seo-audit-cases/" },
  { label: "SEO Audit Guides", href: "/seo-audit-guides/" },
  { label: "Technical SEO", href: "/technical-seo/" },
  { label: "Content & Keywords", href: "/content-seo/" },
  { label: "About", href: "/about/" },
  { label: "Sample SEO Audit Report", href: "/seo-audit/" },
];

const seoGuides: FooterLink[] = [
  { label: "SEO Audit Guide", href: "/seo-audit-guides/" },
  { label: "Technical SEO Guide", href: "/technical-seo/" },
  { label: "Content SEO Guide", href: "/content-seo/" },
  { label: "SEO Audit Cases", href: "/seo-audit-cases/" },
];

const legalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms", href: "/terms/" },
  { label: "Refund Policy", href: "/refund-policy/" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-[var(--color-primary)] text-white mt-auto"
      role="contentinfo"
    >
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo + Description */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white no-underline font-[family-name:var(--font-heading)] font-bold text-xl tracking-tight mb-4"
            >
              <div className="h-8 w-8 rounded-[var(--radius-sm)] bg-[var(--color-accent)] flex items-center justify-center text-white text-sm font-extrabold">
                SEO
              </div>
              <span>SEO Audit Pro</span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed mt-4 max-w-xs">
              Practical SEO audit guides, independent case studies, and manually
              prepared website audits with clear, prioritized recommendations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-150 no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SEO Guides */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">
              SEO Guides
            </h3>
            <ul className="space-y-2.5">
              {seoGuides.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-150 no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">
              Get Your Audit
            </h3>
            <p className="text-sm text-white/60 mb-4 leading-relaxed">
              Find out what is holding your website back from ranking higher.
            </p>
            <Link
              href="/seo-audit/"
              className="inline-flex items-center px-4 py-2.5 rounded-[var(--radius-md)] text-sm font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] transition-colors duration-150 no-underline"
            >
              Audit Your Website
            </Link>
          </div>
        </div>

        {/* Legal Row */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            &copy; {year} SEO Audit Pro. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/50 hover:text-white/80 transition-colors duration-150 no-underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
