import { Metadata } from "next";
import { CategoryPage } from "@/components/pages/CategoryPage";

export const metadata: Metadata = {
  title: "Content & Keywords",
  description: "Guides on content strategy, keyword research, search intent, and writing content that ranks and converts.",
};

export default function ContentSeoPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  return <CategoryPage categorySlug="content-seo" searchParams={searchParams} />;
}
