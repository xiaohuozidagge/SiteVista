"use client";

import { Check } from "lucide-react";
import { AUDIT_PACKAGES } from "@/lib/seo-audit";
import { trackAuditEvent } from "@/lib/analytics";

export const PACKAGE_SELECT_EVENT = "audit:select-package";

export function PricingCards() {
  function handleSelect(packageName: string) {
    trackAuditEvent("pricing_package_select", { package_name: packageName });
    window.dispatchEvent(
      new CustomEvent<string>(PACKAGE_SELECT_EVENT, { detail: packageName })
    );
    document
      .getElementById("request-audit")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {AUDIT_PACKAGES.map((pkg) => (
        <div
          key={pkg.slug}
          className={`relative flex flex-col rounded-xl border p-6 ${
            pkg.mostPopular
              ? "border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]"
              : "border-[var(--color-border)]"
          }`}
        >
          {pkg.mostPopular && (
            <span className="absolute -top-3 left-6 inline-flex items-center rounded-full bg-[var(--color-accent)] px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
              Most Popular
            </span>
          )}

          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)]">
            {pkg.name}
          </h3>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
            {pkg.pages}
          </p>
          <p className="mt-3 text-3xl font-bold font-[family-name:var(--font-heading)]">
            {pkg.priceLabel}
          </p>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {pkg.description}
          </p>

          <ul className="mt-5 flex-1 space-y-2.5">
            {pkg.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]">
                <Check size={16} className="mt-0.5 shrink-0 text-[var(--color-success)]" aria-hidden />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-sm font-semibold text-[var(--color-text)]">
            {pkg.delivery}
          </p>

          <button
            type="button"
            onClick={() => handleSelect(pkg.name)}
            className="mt-4 inline-flex w-full items-center justify-center px-5 py-2.5 rounded-md text-sm font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] transition-colors"
          >
            Request This Audit
          </button>
        </div>
      ))}
    </div>
  );
}
