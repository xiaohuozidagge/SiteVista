// ─── SEO Audit service configuration ────────────────────────
// Single source of truth for pricing, form options, and links.
// Edit values here rather than duplicating them across components.

export interface AuditPackage {
  slug: string;
  name: string;
  price: number;
  priceLabel: string;
  pages: string;
  description: string;
  features: string[];
  delivery: string;
  ctaLabel: string;
  mostPopular?: boolean;
}

export const AUDIT_PACKAGES: AuditPackage[] = [
  {
    slug: "starter",
    name: "Starter Audit",
    price: 99,
    priceLabel: "$99",
    pages: "Up to 5 URLs",
    description:
      "A focused SEO audit for small websites, landing pages, and businesses that need a clear starting point.",
    features: [
      "Up to 5 URLs",
      "Indexability and crawlability review",
      "Title, meta description and heading review",
      "On-page SEO findings",
      "Key technical issues",
      "Prioritized recommendations",
      "PDF report",
    ],
    delivery: "Delivery within 3 Business Days",
    ctaLabel: "Start Starter Audit — $99",
  },
  {
    slug: "growth",
    name: "Growth Audit",
    price: 299,
    priceLabel: "$299",
    pages: "Up to 50 URLs",
    description:
      "A comprehensive technical, content, keyword, and on-page audit for growing websites.",
    features: [
      "Up to 50 URLs",
      "Technical SEO audit",
      "Content and keyword analysis",
      "Internal linking review",
      "Structured data review",
      "Core Web Vitals review",
      "Prioritized action roadmap",
      "PDF report",
    ],
    delivery: "Delivery within 5 Business Days",
    ctaLabel: "Choose Growth Audit — $299",
    mostPopular: true,
  },
  {
    slug: "international",
    name: "International SEO Audit",
    price: 599,
    priceLabel: "$599",
    pages: "Up to 100 URLs across up to 5 language or regional markets",
    description:
      "A multilingual and multi-region SEO audit for websites targeting multiple countries or languages.",
    features: [
      "Everything in Growth Audit",
      "Hreflang validation",
      "Canonical conflict analysis",
      "Multilingual sitemap review",
      "International URL structure review",
      "Localized metadata review",
      "Country and language targeting",
      "International content gap analysis",
      "PDF report",
    ],
    delivery: "Delivery within 7 Business Days",
    ctaLabel: "Order International Audit — $599",
  },
];

export const WEBSITE_TYPES = [
  "B2B / Manufacturing",
  "SaaS",
  "E-commerce",
  "Local Business",
  "Publisher / Blog",
  "Other",
] as const;

export const AUDIT_PACKAGE_OPTIONS = [
  "Starter Audit",
  "Growth Audit",
  "International SEO Audit",
  "Not Sure",
] as const;

// ─── Links & external configuration ─────────────────────────

// TODO: Set your Fiverr gig URL to enable the "Order Through Fiverr" button.
// Leave empty to hide the button entirely — no broken link will be rendered.
export const FIVERR_GIG_URL = process.env.NEXT_PUBLIC_FIVERR_GIG_URL || "";

// TODO: Set your form submission endpoint (a Formspree endpoint, a serverless
// function, or your own API route). Leave empty and the inquiry form will show
// an honest "submission not configured" notice instead of faking success.
export const AUDIT_FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_AUDIT_FORM_ENDPOINT || "";
