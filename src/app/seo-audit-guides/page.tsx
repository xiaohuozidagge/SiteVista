import { Metadata } from "next";
import { CategoryPage } from "@/components/pages/CategoryPage";

export const metadata: Metadata = {
  title: "SEO Audit Guides, Checklists & Resources | SEO Audit Pro",
  description:
    "Explore practical SEO audit guides and checklists for evaluating technical SEO, content, keywords and website performance.",
  alternates: { canonical: "https://seoauditpro.cloud/seo-audit-guides/" },
};

export default function SeoAuditGuidesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  return <CategoryPage categorySlug="seo-audit-guides" searchParams={searchParams} />;
}
