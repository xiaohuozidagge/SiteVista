import { Metadata } from "next";
import { CategoryPage } from "@/components/pages/CategoryPage";

export const metadata: Metadata = {
  title: "Content SEO Guides & Keyword Optimization | SEO Audit Pro",
  description:
    "Guides on content strategy, keyword research, search intent, and writing content that ranks and converts.",
  alternates: { canonical: "https://seoauditpro.cloud/content-seo/" },
};

export default function ContentSeoPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  return <CategoryPage categorySlug="content-seo" searchParams={searchParams} />;
}
