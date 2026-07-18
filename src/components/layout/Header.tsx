"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "SEO Audit Cases", href: "/seo-audit-cases/" },
  { label: "SEO Audit Guides", href: "/seo-audit-guides/" },
  { label: "Technical SEO", href: "/technical-seo/" },
  { label: "Content & Keywords", href: "/content-seo/" },
  { label: "About", href: "/about/" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.replace(/\/$/, ""));
  };

  return (
    <header
      className="sticky top-0 z-50 bg-[var(--color-bg)] shadow-[var(--shadow-header)] border-b border-[var(--color-border-light)]"
      role="banner"
    >
      <div className="container-site flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[var(--color-primary)] no-underline font-[family-name:var(--font-heading)] font-bold text-xl tracking-tight"
          aria-label="SiteVista Home"
        >
          <div className="h-8 w-8 rounded-[var(--radius-sm)] bg-[var(--color-accent)] flex items-center justify-center text-white text-sm font-extrabold">
            SV
          </div>
          <span>SiteVista</span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-[var(--radius-sm)] text-sm font-medium transition-colors duration-150 ${
                isActive(link.href)
                  ? "text-[var(--color-accent)] bg-[var(--color-bg-secondary)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/seo-audit/"
            className="inline-flex items-center px-4 py-2 rounded-[var(--radius-md)] text-sm font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] transition-colors duration-150 shadow-sm"
          >
            Audit Your Website
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden inline-flex items-center justify-center p-2 rounded-[var(--radius-sm)] text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)] transition-colors"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 top-16 z-40 bg-[var(--color-bg)] transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav className="flex flex-col p-6 gap-1" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className={`px-4 py-3 rounded-[var(--radius-md)] text-base font-medium transition-colors duration-150 ${
                isActive(link.href)
                  ? "text-[var(--color-accent)] bg-[var(--color-bg-secondary)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
            <Link
              href="/seo-audit/"
              onClick={handleNavClick}
              className="inline-flex items-center justify-center w-full px-4 py-3 rounded-[var(--radius-md)] text-base font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] transition-colors duration-150"
            >
              Audit Your Website
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
