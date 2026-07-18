import { Metadata } from "next";
import { CategoryPage } from "@/components/pages/CategoryPage";

export const metadata: Metadata = {
  title: "SEO Audit Guides",
  description: "Practical guides on how to audit your website's SEO, covering crawlability, indexation, site architecture, and more.",
};

export default function SeoAuditGuidesPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  return <CategoryPage categorySlug="seo-audit-guides" searchParams={searchParams} />;
}
