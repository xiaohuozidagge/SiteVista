"use client";

import { FIVERR_GIG_URL } from "@/lib/seo-audit";
import { trackAuditEvent } from "@/lib/analytics";

export function FiverrButton() {
  // TODO: Set NEXT_PUBLIC_FIVERR_GIG_URL to a real gig URL to enable this button.
  if (!FIVERR_GIG_URL) return null;

  return (
    <a
      href={FIVERR_GIG_URL}
      target="_blank"
      rel="noopener noreferrer nofollow"
      onClick={() => trackAuditEvent("fiverr_click", { source_page: "seo_audit" })}
      className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-[var(--color-border)] text-[var(--color-text)] font-semibold hover:bg-[var(--color-bg-secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] transition-colors"
    >
      Order Through Fiverr
    </a>
  );
}
