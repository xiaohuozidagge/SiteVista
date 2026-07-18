// Shared utility types for SiteVista

import type { PortableTextBlock } from "@portabletext/react";

export type { PortableTextBlock };

export interface SanityImageAsset {
  _id: string;
  url: string;
  metadata?: {
    dimensions?: {
      width: number;
      height: number;
    };
  };
}

export interface SanityImage {
  asset?: SanityImageAsset;
  alt?: string;
}

export interface CategoryRef {
  title: string;
  slug: { current: string };
}

export interface TagRef {
  title: string;
  slug: { current: string };
}

export interface AuthorRef {
  name: string;
  slug: { current: string };
  jobTitle?: string;
  bio?: string;
  image?: SanityImage;
  imageAlt?: string;
  socialLinks?: {
    linkedin?: string;
    x?: string;
    website?: string;
  };
}

export interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  openGraphImage?: SanityImage;
  noIndex?: boolean;
  noFollow?: boolean;
  focusKeyword?: string;
}

export interface FAQItem {
  _key?: string;
  question: string;
  answer: string;
}

// Post card (used in lists)
export interface PostCardData {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  readingTime?: number;
  featuredImage?: SanityImage;
  category?: CategoryRef;
}

// Full post
export interface PostData extends PostCardData {
  body?: PortableTextBlock[];
  updatedAt?: string;
  tags?: TagRef[];
  author?: AuthorRef;
  featured?: boolean;
  relatedPosts?: PostCardData[];
  faq?: FAQItem[];
  seo?: SEOData;
}

// Case card
export interface CaseCardData {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  industry?: string;
  auditDate?: string;
  readingTime?: number;
  featuredImage?: SanityImage;
}

// Full case
export interface AuditCaseData extends CaseCardData {
  body?: PortableTextBlock[];
  websiteType?: string;
  publishedAt?: string;
  updatedAt?: string;
  caseDisclosure?: string;
  keyFindings?: FindingData[];
  metrics?: MetricData[];
  featured?: boolean;
  relatedCases?: CaseCardData[];
  faq?: FAQItem[];
  seo?: SEOData;
}

export interface FindingData {
  _key?: string;
  type?: "keyFinding" | "criticalIssue" | "recommendation" | "quickWin" | "important" | "expertNote";
  heading: string;
  content: string;
}

export interface MetricData {
  _key?: string;
  label: string;
  value: string;
  change?: string;
  direction?: "up" | "down" | "neutral";
  description?: string;
  sentiment?: "positive" | "negative" | "neutral";
}

export interface CategoryData {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  featuredImage?: SanityImage;
  seo?: SEOData;
}

export interface SiteSettings {
  siteName?: string;
  siteUrl?: string;
  siteDescription?: string;
  logo?: SanityImage;
  favicon?: SanityImage;
  defaultOgImage?: SanityImage;
  contactEmail?: string;
  footerDescription?: string;
  organizationName?: string;
  organizationDescription?: string;
  socialLinks?: {
    linkedin?: string;
    x?: string;
    website?: string;
  };
}

export interface PageData {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  body?: PortableTextBlock[];
  featuredImage?: SanityImage;
  seo?: SEOData;
}
