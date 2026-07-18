import Link from "next/link";
import { getPostsByCategory, toBlogCardData, getReadingTime } from "@/lib/content/blog";
import { getCategoryBySlug, getAllCategories } from "@/lib/content/categories";
import { CategoryPageLayout } from "@/components/content/CategoryPageLayout";

interface Props {
  categorySlug: string;
  searchParams: Promise<{ page?: string }>;
}

const PER_PAGE = 9;

export async function CategoryPage({ categorySlug, searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam || "1", 10) || 1);
  const category = getCategoryBySlug(categorySlug);
  const categoryPosts = getPostsByCategory(categorySlug);
  const totalPages = Math.max(1, Math.ceil(categoryPosts.length / PER_PAGE));
  const start = (currentPage - 1) * PER_PAGE;
  const pagedPosts = categoryPosts.slice(start, start + PER_PAGE);
  const posts = pagedPosts.map((p) => toBlogCardData(p, getReadingTime(p.content)));
  const otherCategories = getAllCategories().filter((c) => c.slug !== categorySlug);

  const featuredPost = currentPage === 1 ? posts[0] : null;
  const gridPosts = currentPage === 1 ? posts.slice(1) : posts;

  return (
    <CategoryPageLayout
      breadcrumb={
        <nav className="text-sm text-[var(--color-text-muted)] mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-[var(--color-accent)]">Home</Link></li>
            <li aria-hidden>/</li>
            <li className="text-[var(--color-text)]" aria-current="page">{category?.title || categorySlug}</li>
          </ol>
        </nav>
      }
      title={category?.title || "Category"}
      description={category?.description}
      featuredArticle={
        featuredPost ? (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">Featured Article</h2>
            <Link
              href={`/blog/${featuredPost.slug}/`}
              className="group block overflow-hidden rounded-xl border border-[var(--color-border)] bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="grid lg:grid-cols-2 gap-6 items-center">
                <div className="aspect-[16/9] bg-[var(--color-bg-secondary)] flex items-center justify-center">
                  {featuredPost.featuredImage ? (
                    <img src={featuredPost.featuredImage} alt={featuredPost.featuredImageAlt || featuredPost.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[var(--color-text-muted)] text-sm">SEO Audit Pro</span>
                  )}
                </div>
                <div className="p-6 lg:p-8 lg:pl-0">
                  <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] group-hover:text-[var(--color-accent)] transition-colors">{featuredPost.title}</h3>
                  <p className="mt-3 text-sm text-[var(--color-text-secondary)] line-clamp-2">{featuredPost.description}</p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                    <time dateTime={featuredPost.publishedAt}>{new Date(featuredPost.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</time>
                    <span>{featuredPost.readingTime} min read</span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        ) : undefined
      }
      articles={gridPosts}
      emptyMessage="No articles in this category yet. Check back soon."
      pagination={
        totalPages > 1 ? (
          <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
            {currentPage > 1 && (
              <Link href={`/${categorySlug}/${currentPage > 2 ? `?page=${currentPage - 1}` : ""}`} className="px-4 py-2 border border-[var(--color-border)] rounded-md text-sm font-medium hover:bg-[var(--color-bg-secondary)] transition-colors">← Previous</Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link key={p} href={p === 1 ? `/${categorySlug}/` : `/${categorySlug}/?page=${p}`} className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${p === currentPage ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]" : "border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)]"}`}>{p}</Link>
            ))}
            {currentPage < totalPages && (
              <Link href={`/${categorySlug}/?page=${currentPage + 1}`} className="px-4 py-2 border border-[var(--color-border)] rounded-md text-sm font-medium hover:bg-[var(--color-bg-secondary)] transition-colors">Next →</Link>
            )}
          </nav>
        ) : undefined
      }
      exploreMore={
        otherCategories.length > 0 ? (
          <>
            <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-6">Explore More</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherCategories.map((c) => (
                <Link key={c.slug} href={`/${c.slug}/`} className="block p-5 border border-[var(--color-border)] rounded-lg hover:shadow-[var(--shadow-card-hover)] transition-shadow hover:border-[var(--color-accent)]">
                  <h3 className="font-bold font-[family-name:var(--font-heading)]">{c.title}</h3>
                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">Browse articles →</p>
                </Link>
              ))}
            </div>
          </>
        ) : undefined
      }
      cta={
        <section className="bg-[var(--color-bg-secondary)] rounded-xl p-10 text-center">
          <h2 className="text-xl font-bold font-[family-name:var(--font-heading)]">Need a professional SEO audit?</h2>
          <p className="mt-2 text-[var(--color-text-secondary)] max-w-md mx-auto">Get a manually prepared audit with clear findings and prioritized recommendations.</p>
          <Link href="/seo-audit/" className="mt-6 inline-flex items-center px-6 py-3 rounded-md bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-light)] transition-colors">Audit Your Website</Link>
        </section>
      }
    />
  );
}
