import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-content py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">404</p>
      <h1 className="mt-2 text-3xl font-bold font-[family-name:var(--font-heading)]">Page Not Found</h1>
      <p className="mt-4 text-[var(--color-text-secondary)]">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex items-center justify-center gap-4">
        <Link href="/" className="px-6 py-3 rounded-md bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-light)] transition-colors">
          Go Home
        </Link>
        <Link href="/seo-audit-guides/" className="px-6 py-3 rounded-md border border-[var(--color-border)] font-semibold hover:bg-[var(--color-bg-secondary)] transition-colors">
          Browse Guides
        </Link>
      </div>
    </div>
  );
}
