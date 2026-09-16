import { Metadata } from "next";
import Link from "next/link";
import { SampleReportDownload } from "@/components/cta/SampleReportDownload";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Sample SEO Audit Report: Findings and Action Plan",
  description:
    "View a sample professional SEO audit report covering technical SEO, on-page issues, content, keywords and prioritized recommendations.",
  alternates: { canonical: "https://seoauditpro.cloud/sample-seo-audit-report/" },
};

type Priority = "High" | "Medium" | "Low";
type Effort = "Low" | "Medium" | "High";

interface FindingRow {
  finding: string;
  evidence: string;
  impact: string;
  priority: Priority;
  action: string;
  effort: Effort;
}

const technicalFindings: FindingRow[] = [
  {
    finding: "Multiple pages return soft 404 responses",
    evidence: "12 URLs return HTTP 200 with empty or near-empty content",
    impact: "Wastes crawl budget and signals thin content to search engines",
    priority: "High",
    action: "Serve a proper 404 status and consolidate or improve the affected pages",
    effort: "Low",
  },
  {
    finding: "Duplicate meta descriptions across product pages",
    evidence: "38% of indexed pages share one of three template descriptions",
    impact: "Reduces click-through rate and makes pages harder to differentiate",
    priority: "Medium",
    action: "Write unique descriptions for priority pages; template the rest by category",
    effort: "Medium",
  },
  {
    finding: "Missing structured data on key pages",
    evidence: "Homepage and product templates lack Product and BreadcrumbList markup",
    impact: "Limits eligibility for rich results and reduced SERP visibility",
    priority: "Medium",
    action: "Add Product, Organization, and BreadcrumbList schema to relevant templates",
    effort: "Medium",
  },
];

const onPageFindings: FindingRow[] = [
  {
    finding: "H1 headings duplicated across category pages",
    evidence: "6 category pages share the H1 \"Products\"",
    impact: "Weakens topical relevance and confuses search engines",
    priority: "High",
    action: "Give each category a unique, keyword-led H1",
    effort: "Low",
  },
  {
    finding: "Title tags exceed recommended display length",
    evidence: "22% of titles are over 60 characters and truncate in results",
    impact: "Truncated titles lose context and reduce click-through",
    priority: "Medium",
    action: "Shorten titles to under ~60 characters while keeping the primary keyword",
    effort: "Low",
  },
  {
    finding: "Internal links use generic anchor text",
    evidence: "Most navigation links read \"Learn more\" or \"Click here\"",
    impact: "Reduces the descriptive signal passed between pages",
    priority: "Low",
    action: "Use descriptive anchor text that reflects the destination page's topic",
    effort: "Medium",
  },
];

const contentFindings: FindingRow[] = [
  {
    finding: "Top-funnel content gap around buying considerations",
    evidence: "Competitors rank for comparison queries the site does not cover",
    impact: "Misses searches from users early in the purchase journey",
    priority: "High",
    action: "Produce comparison and selection guides for the top 5 gap queries",
    effort: "High",
  },
  {
    finding: "Thin content on product category pages",
    evidence: "Most category pages contain under 150 words of unique text",
    impact: "Hard for search engines to understand page relevance",
    priority: "Medium",
    action: "Add unique, intent-matched copy to each priority category page",
    effort: "Medium",
  },
  {
    finding: "Keyword cannibalization between two service pages",
    evidence: "Two URLs target \"managed SEO service\" and split rankings",
    impact: "Splits authority and prevents either page from ranking well",
    priority: "Medium",
    action: "Consolidate into one canonical page and 301 the other",
    effort: "Medium",
  },
];

const internationalFindings: FindingRow[] = [
  {
    finding: "Hreflang annotations are not reciprocal",
    evidence: "EN page references FR page, but FR page does not reference EN",
    impact: "Search engines may ignore the hreflang cluster",
    priority: "High",
    action: "Add missing reciprocal hreflang tags on every language version",
    effort: "Low",
  },
  {
    finding: "Missing self-referencing hreflang",
    evidence: "Several regional pages omit their own language-country tag",
    impact: "Can break the hreflang relationship for the whole cluster",
    priority: "Medium",
    action: "Include a self-referencing hreflang tag on each page",
    effort: "Low",
  },
  {
    finding: "Canonical conflicts with hreflang targets",
    evidence: "A regional page canonicals to the EN version while in a hreflang cluster",
    impact: "Sends contradictory signals and can deindex the regional page",
    priority: "High",
    action: "Make canonical tags self-referencing on each regional URL",
    effort: "Low",
  },
];

const actionPlan = [
  {
    phase: "0–30 Days",
    focus: "Fix indexation and on-page fundamentals",
    actions: "Resolve soft 404s, deduplicate titles and H1s, fix hreflang reciprocity",
  },
  {
    phase: "31–60 Days",
    focus: "Content and structured data",
    actions: "Close top content gaps, add Product and BreadcrumbList schema, improve anchor text",
  },
  {
    phase: "61–90 Days",
    focus: "International and consolidation",
    actions: "Complete multilingual sitemaps, resolve canonical conflicts, consolidate cannibalizing pages",
  },
];

const healthOverview = [
  { area: "Crawlability", status: "Fair", note: "Crawlable, but soft 404s waste budget" },
  { area: "Indexation", status: "Good", note: "Core pages are indexed; some thin pages excluded" },
  { area: "On-Page SEO", status: "Needs Work", note: "Duplicate titles and H1s on templates" },
  { area: "Content", status: "Needs Work", note: "Top-funnel topics underrepresented" },
  { area: "International", status: "Needs Work", note: "Hreflang reciprocity broken" },
  { area: "Structured Data", status: "Fair", note: "Present but incomplete on product pages" },
];

const priorityClass: Record<Priority, string> = {
  High: "bg-[var(--color-critical)]/10 text-[var(--color-critical)]",
  Medium: "bg-[var(--color-warning)]/10 text-[var(--color-warning)]",
  Low: "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]",
};

const effortClass: Record<Effort, string> = {
  Low: "text-[var(--color-success)]",
  Medium: "text-[var(--color-warning)]",
  High: "text-[var(--color-critical)]",
};

function FindingTable({ rows }: { rows: FindingRow[] }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-[var(--color-border)]">
      <table className="min-w-[760px] w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[var(--color-bg-secondary)] text-left">
            <th className="px-4 py-3 font-semibold">Finding</th>
            <th className="px-4 py-3 font-semibold">Evidence</th>
            <th className="px-4 py-3 font-semibold">SEO Impact</th>
            <th className="px-4 py-3 font-semibold">Priority</th>
            <th className="px-4 py-3 font-semibold">Recommended Action</th>
            <th className="px-4 py-3 font-semibold">Effort</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.finding} className="border-t border-[var(--color-border)] align-top">
              <td className="px-4 py-3 font-medium text-[var(--color-text)]">{row.finding}</td>
              <td className="px-4 py-3 text-[var(--color-text-secondary)]">{row.evidence}</td>
              <td className="px-4 py-3 text-[var(--color-text-secondary)]">{row.impact}</td>
              <td className="px-4 py-3">
                <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${priorityClass[row.priority]}`}>
                  {row.priority}
                </span>
              </td>
              <td className="px-4 py-3 text-[var(--color-text-secondary)]">{row.action}</td>
              <td className={`px-4 py-3 font-semibold ${effortClass[row.effort]}`}>{row.effort}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SampleReportPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ label: "Sample SEO Audit Report" }]} />

      <div className="container-content py-12 lg:py-16">
        <nav className="text-sm text-[var(--color-text-muted)] mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-[var(--color-accent)]">Home</Link></li>
            <li aria-hidden>/</li>
            <li className="text-[var(--color-text)]" aria-current="page">Sample SEO Audit Report</li>
          </ol>
        </nav>

        <h1 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-heading)]">
          Sample SEO Audit Report
        </h1>
        <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
          A professional SEO audit goes beyond automated tool output. This page shows
          the structure of a typical report — from technical findings to a prioritized
          action plan.
        </p>

        <p className="mt-6 inline-block rounded-lg bg-[var(--color-bg-secondary)] px-4 py-2 text-sm font-medium text-[var(--color-text-muted)]">
          Illustrative sample findings
        </p>

        <div className="mt-10 space-y-16">
          {/* 1. Executive Summary */}
          <section>
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)]">1. Executive Summary</h2>
            <p className="mt-3 text-[var(--color-text-secondary)] leading-relaxed">
              The site is crawlable and its core pages are indexed, but three areas are
              limiting organic growth: duplicated on-page elements, incomplete structured
              data, and broken international signals. Fixing these in the order below
              delivers the largest visibility gains for the least effort.
            </p>
            <ul className="mt-4 space-y-2 text-[var(--color-text-secondary)]">
              <li className="flex gap-2"><span className="text-[var(--color-accent)]" aria-hidden>→</span> Resolve indexation leaks (soft 404s) before adding new content.</li>
              <li className="flex gap-2"><span className="text-[var(--color-accent)]" aria-hidden>→</span> Deduplicate titles and H1s across template pages.</li>
              <li className="flex gap-2"><span className="text-[var(--color-accent)]" aria-hidden>→</span> Repair hreflang reciprocity for international pages.</li>
            </ul>
          </section>

          {/* 2. Website Health Overview */}
          <section>
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)]">2. Website Health Overview</h2>
            <div className="mt-4 overflow-x-auto rounded-xl border border-[var(--color-border)]">
              <table className="min-w-[560px] w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[var(--color-bg-secondary)] text-left">
                    <th className="px-4 py-3 font-semibold">Area</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {healthOverview.map((row) => (
                    <tr key={row.area} className="border-t border-[var(--color-border)]">
                      <td className="px-4 py-3 font-medium">{row.area}</td>
                      <td className="px-4 py-3 text-[var(--color-text-secondary)]">{row.status}</td>
                      <td className="px-4 py-3 text-[var(--color-text-secondary)]">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. Critical SEO Issues */}
          <section>
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)]">3. Critical SEO Issues</h2>
            <p className="mt-3 text-[var(--color-text-secondary)]">
              Issues that directly gate crawl, indexation, or ranking. Address these first.
            </p>
            <FindingTable
              rows={[
                technicalFindings[0],
                onPageFindings[0],
                internationalFindings[0],
              ]}
            />
          </section>

          {/* 4. Technical SEO Findings */}
          <section>
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)]">4. Technical SEO Findings</h2>
            <FindingTable rows={technicalFindings} />
          </section>

          {/* 5. On-Page SEO Findings */}
          <section>
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)]">5. On-Page SEO Findings</h2>
            <FindingTable rows={onPageFindings} />
          </section>

          {/* 6. Content and Keyword Opportunities */}
          <section>
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)]">6. Content and Keyword Opportunities</h2>
            <FindingTable rows={contentFindings} />
          </section>

          {/* 7. International SEO Findings */}
          <section>
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)]">7. International SEO Findings</h2>
            <FindingTable rows={internationalFindings} />
          </section>

          {/* 8. Impact and Effort Prioritization */}
          <section>
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)]">8. Impact and Effort Prioritization</h2>
            <p className="mt-3 text-[var(--color-text-secondary)]">
              Each finding is ranked by the size of its expected impact relative to the
              effort required, so you can sequence the work for maximum return.
            </p>
            <FindingTable
              rows={[
                technicalFindings[0],
                onPageFindings[0],
                internationalFindings[0],
                contentFindings[0],
                technicalFindings[2],
                contentFindings[2],
              ]}
            />
          </section>

          {/* 9. 30/60/90-Day Action Plan */}
          <section>
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)]">9. 30/60/90-Day Action Plan</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {actionPlan.map((phase) => (
                <div key={phase.phase} className="rounded-xl border border-[var(--color-border)] p-5">
                  <h3 className="font-bold font-[family-name:var(--font-heading)]">{phase.phase}</h3>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-accent)]">{phase.focus}</p>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">{phase.actions}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-xl bg-[var(--color-primary)] p-10 text-center text-white">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)]">
            Want a Real SEO Audit Report for Your Website?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-300">
            This sample shows the structure. Your report will be tailored to your
            website with specific findings and prioritized recommendations.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/seo-audit/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-light)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
            >
              Request Your Website Audit
            </Link>
            <SampleReportDownload />
          </div>
        </div>
      </div>
    </>
  );
}
