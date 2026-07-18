# SiteVista

**Clear SEO Insights. Practical Growth Strategies.**

SiteVista is an SEO audit blog website built with Next.js 16, Sanity CMS, and Tailwind CSS. It publishes SEO guides, website audit case studies, and provides a platform for offering manual SEO audit services.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React Server Components)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **CMS:** Sanity (embedded studio at `/studio/`)
- **Content:** Portable Text with 12 custom block types
- **Fonts:** Manrope (headings) + Inter (body) via next/font
- **Icons:** Lucide React
- **Deployment:** Vercel

## Project Structure

```
SiteVista/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (Header + Footer)
│   │   ├── page.tsx            # Home page
│   │   ├── about/              # About page
│   │   ├── blog/[slug]/        # Blog post detail
│   │   ├── seo-audit-cases/    # Case studies list + detail
│   │   ├── seo-audit-guides/   # Category page
│   │   ├── technical-seo/      # Category page
│   │   ├── content-seo/        # Category page
│   │   ├── seo-audit/          # Service placeholder
│   │   ├── studio/             # Embedded Sanity Studio
│   │   ├── api/draft/          # Draft mode endpoint
│   │   ├── api/revalidate/     # Webhook revalidation
│   │   ├── sitemap.ts          # Dynamic sitemap
│   │   └── robots.ts           # Robots.txt
│   ├── components/
│   │   ├── layout/             # Header, Footer
│   │   ├── cards/              # ArticleCard, CaseCard
│   │   ├── navigation/         # Breadcrumb, TOC, Pagination
│   │   ├── forms/              # Newsletter, HomeNewsletter
│   │   ├── ui/                 # EmptyState
│   │   ├── cta/                # SEOAuditCTA
│   │   ├── portable-text/      # 12 PT block renderers
│   │   ├── pages/              # CategoryPage shared component
│   │   ├── seo/                # Schema.org structured data
│   │   └── studio/             # Studio client wrapper
│   ├── lib/                    # Sanity client, queries, types
│   └── sanity/                 # Sanity schemas & Studio config
├── scripts/seed/               # Content seed script
├── sanity.config.ts            # Sanity Studio config
├── next.config.ts              # Next.js config
└── .env.example                # Environment variables template
```

## Getting Started

### 1. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### 2. Sanity Project Setup

1. Create a free Sanity project at [sanity.io](https://www.sanity.io/get-started)
2. Get your Project ID from the Sanity Manage dashboard
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
4. Add CORS origins in Sanity dashboard: `http://localhost:3000`

### 3. Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Access Sanity Studio

Open [http://localhost:3000/studio/](http://localhost:3000/studio/).

Log in with your Sanity account. From the Studio you can:
- Create and edit blog posts
- Create SEO audit case studies
- Manage categories, tags, and authors
- Configure site settings

### 5. Seed Demo Content

```bash
# Set SANITY_API_WRITE_TOKEN in .env.local (find in Sanity dashboard > API)
npx tsx scripts/seed/seed.ts
```

This creates demo categories, articles, and case studies. All content is marked as `[Demo]`.

### 6. Create Your First Post

1. Go to `/studio/`
2. Navigate to **Blog Posts → All Posts**
3. Click the pencil icon to create a new post
4. Fill in: Title, Slug, Excerpt, Category, Author
5. Add body content using Portable Text blocks
6. Set Published At date and click **Publish**

### 7. Create a Case Study

1. Go to `/studio/` → **SEO Audit Cases → All Cases**
2. Create a new case with: Title, Industry, Website Type, Audit Date
3. Add Key Findings and Metrics
4. Publish when ready

### 8. Content Blocks (Portable Text)

The editor supports 12 custom content blocks:
- Rich Text (H2-H4, bold, italic, links)
- Full Width Image (with lightbox)
- Image and Text (two-column layout)
- Gallery (2 or 3 columns, lightbox)
- Metric Cards (with sentiment coloring)
- Comparison Block (before/after)
- Data Table (responsive)
- Finding Box (6 types: keyFinding, criticalIssue, recommendation, quickWin, important, expertNote)
- Quote Block
- FAQ Block (accordion)
- SEO Audit CTA
- Code Block (with copy button)

### 9. Deploy to Vercel

1. Push to GitHub
2. Import in Vercel: [vercel.com/import](https://vercel.com/import)
3. Add environment variables in Vercel dashboard
4. Set up Sanity webhook for revalidation:
   - Go to Sanity dashboard → API → Webhooks
   - Add webhook URL: `https://your-domain.vercel.app/api/revalidate`
   - Set secret to match `SANITY_REVALIDATE_SECRET`
   - Trigger on: Create, Update, Delete

### 10. Custom Domain

1. In Vercel dashboard: Settings → Domains → Add `sitevista.net`
2. Update DNS: Add CNAME record pointing to `cname.vercel-dns.com`
3. Update `NEXT_PUBLIC_SITE_URL` in Vercel env vars

## Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
npm run typecheck  # TypeScript type checking
```

## Content Revalidation

When content is published in Sanity, the site updates via:

**Webhook (recommended for production):**
Set up a Sanity webhook to POST to `/api/revalidate` with header `x-revalidate-secret`.

**Draft Mode:**
Preview unpublished content by visiting:
`/api/draft?secret=YOUR_SECRET&slug=post-slug&type=post`

## Performance

- React Server Components by default (only interactive elements use "use client")
- next/font for font optimization (zero layout shift)
- next/image with sizes for responsive images
- Semantic HTML throughout
- No heavy third-party scripts
- No auto-playing video

## SEO Features

- Dynamic sitemap.xml with all published content
- robots.txt (disallows /studio/)
- Per-page metadata (title, description, canonical, Open Graph, Twitter Card)
- Schema.org structured data: Organization, BlogPosting, Article, BreadcrumbList, FAQPage
- Semantic heading hierarchy
- Studio page set to noindex
- Draft/preview content not indexed

## Notes

- The `/seo-audit/` page is a service preview with CTA — payment processing is not implemented yet
- Newsletter form shows "coming soon" message — email collection is not active
- All demo/seed content is explicitly marked as `[Demo]`
- No fake clients, reviews, growth data, or brand logos are used
