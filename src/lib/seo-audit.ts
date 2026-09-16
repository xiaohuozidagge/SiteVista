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
  mostPopular?: boolean;
}

export const AUDIT_PACKAGES: AuditPackage[] = [
  {
    slug: "starter",
    name: "Starter Audit",
    price: 49,
    priceLabel: "$49",
    pages: "Up to 5 key pages",
    description:
      "A focused on-page and indexability review for smaller sites and landing pages.",
    features: [
      "Up to 5 key pages",
      "Indexability and crawlability review",
      "Title, meta description and heading review",
      "On-page SEO findings",
      "Prioritized issue list",
      "PDF report",
    ],
    delivery: "Delivery within 2 business days",
  },
  {
    slug: "growth",
    name: "Growth Audit",
    price: 129,
    priceLabel: "$129",
    pages: "Up to 30 pages",
    description:
      "A complete technical, content, and on-page audit for growing sites.",
    features: [
      "Up to 30 pages",
      "Technical SEO audit",
      "Content and keyword analysis",
      "Internal linking review",
      "Structured data review",
      "Core Web Vitals review",
      "Prioritized action roadmap",
      "PDF report",
    ],
    delivery: "Delivery within 3 business days",
    mostPopular: true,
  },
  {
    slug: "international",
    name: "International SEO Audit",
    price: 249,
    priceLabel: "$249",
    pages: "Up to 50 pages",
    description:
      "A multilingual and multi-region audit for sites serving more than one country or language.",
    features: [
      "Up to 50 pages",
      "Everything in Growth Audit",
      "Hreflang validation",
      "Canonical conflict analysis",
      "Multilingual sitemap review",
      "International URL structure",
      "Localized metadata review",
      "Country and language targeting",
      "International content gap analysis",
      "PDF report",
    ],
    delivery: "Delivery within 4 business days",
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
