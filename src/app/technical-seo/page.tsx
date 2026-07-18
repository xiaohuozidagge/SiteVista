import { Metadata } from "next";
import { CategoryPage } from "@/components/pages/CategoryPage";

export const metadata: Metadata = {
  title: "Technical SEO",
  description: "In-depth articles on technical SEO — page speed, Core Web Vitals, structured data, JavaScript rendering, and crawl optimization.",
};

export default function TechnicalSeoPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  return <CategoryPage categorySlug="technical-seo" searchParams={searchParams} />;
}
