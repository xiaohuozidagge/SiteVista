// Generates branded 1200x675 PNG thumbnails for blog posts, one per post,
// into public/images/blog/<slug>.png. Re-run after adding or renaming posts.
//
// Requires `sharp` (a transitive dependency of Next.js — present after
// `npm install`). Usage:  node scripts/generate-blog-thumbnails.cjs

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const OUT_DIR = path.join(__dirname, "..", "public", "images", "blog");

// Keep slug + title in sync with the frontmatter in content/blog/*.mdx.
const CATEGORY_COLORS = {
  "seo-audit-guides": "#3b82f6", // blue
  "technical-seo": "#0ea5e9", // sky
  "content-seo": "#10b981", // emerald
};

const POSTS = [
  { slug: "content-seo-audit", category: "content-seo", categoryName: "Content & Keywords", title: "Content SEO Audit: Evaluate Content Quality & Keyword Performance" },
  { slug: "how-to-identify-keyword-cannibalization", category: "content-seo", categoryName: "Content & Keywords", title: "How to Identify Keyword Cannibalization" },
  { slug: "international-seo-audit", category: "technical-seo", categoryName: "Technical SEO", title: "International SEO Audit: Complete Multilingual Checklist" },
  { slug: "on-page-seo-audit", category: "seo-audit-guides", categoryName: "SEO Audit Guides", title: "On-Page SEO Audit Checklist: 15 Essential Checks" },
  { slug: "seo-audit-checklist", category: "seo-audit-guides", categoryName: "SEO Audit Guides", title: "Complete SEO Audit Checklist: How to Perform an SEO Audit" },
  { slug: "seo-audit-cost", category: "seo-audit-guides", categoryName: "SEO Audit Guides", title: "SEO Audit Pricing: What Does a Website SEO Audit Cost?" },
  { slug: "seo-audit-report", category: "seo-audit-guides", categoryName: "SEO Audit Guides", title: "How to Make an SEO Audit Report: Structure, Findings & Recommendations" },
  { slug: "technical-seo-audit", category: "technical-seo", categoryName: "Technical SEO", title: "Technical SEO Audit: Crawling, Indexing & Site Architecture" },
  { slug: "what-is-included-in-seo-audit", category: "seo-audit-guides", categoryName: "SEO Audit Guides", title: "What Is Included in an SEO Audit?" },
  { slug: "white-label-seo-audit", category: "seo-audit-guides", categoryName: "SEO Audit Guides", title: "White Label SEO Audit: What Agencies Need to Know" },
  { slug: "why-is-my-website-not-indexed", category: "technical-seo", categoryName: "Technical SEO", title: "Why Is My Website Not Indexed by Google?" },
];

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Greedy word-wrap to at most `maxLines` lines of up to `maxChars` characters.
function wrapTitle(title, maxChars = 32, maxLines = 3) {
  const words = title.split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    if (!current) {
      current = word;
    } else if ((current + " " + word).length <= maxChars) {
      current += " " + word;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, maxLines);
}

function buildSvg({ title, categoryName, color }) {
  const lines = wrapTitle(title);
  const titleLines = [0, 1, 2]
    .map((i) =>
      lines[i]
        ? `<text x="80" y="${430 + i * 58}" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="700" fill="#f8fafc">${escapeXml(lines[i])}</text>`
        : ""
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1a2332"/>
      <stop offset="1" stop-color="#263349"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <circle cx="1080" cy="-120" r="560" fill="${color}" opacity="0.10"/>
  <circle cx="1160" cy="200" r="240" fill="${color}" opacity="0.08"/>
  <rect x="80" y="66" width="16" height="16" rx="4" fill="${color}"/>
  <text x="110" y="81" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" letter-spacing="3" fill="#ffffff">SEO AUDIT PRO</text>
  <text x="80" y="134" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" letter-spacing="5" fill="${color}">${escapeXml(categoryName.toUpperCase())}</text>
  ${titleLines}
  <rect x="80" y="586" width="76" height="7" rx="3.5" fill="${color}"/>
</svg>`;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const post of POSTS) {
    const color = CATEGORY_COLORS[post.category] || "#3b82f6";
    const svg = buildSvg({ title: post.title, categoryName: post.categoryName, color });
    const outPath = path.join(OUT_DIR, `${post.slug}.png`);
    await sharp(Buffer.from(svg)).png().toFile(outPath);
    console.log(`✓ ${post.slug}.png`);
  }
  console.log(`\nDone. ${POSTS.length} thumbnails written to ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
