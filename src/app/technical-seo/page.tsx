import { Metadata } from "next";
import { CategoryPage } from "@/components/pages/CategoryPage";

export const metadata: Metadata = {
  title: "Technical SEO Guides & Best Practices | SEO Audit Pro",
  description:
    "Learn technical SEO with practical guides covering crawling, indexing, site speed, structured data and website architecture.",
  alternates: { canonical: "https://seoauditpro.cloud/technical-seo/" },
};

export default function TechnicalSeoPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  return <CategoryPage categorySlug="technical-seo" searchParams={searchParams} />;
}
