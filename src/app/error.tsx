"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-content py-20 text-center">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Something went wrong</h1>
      <p className="mt-4 text-[var(--color-text-secondary)]">
        An unexpected error occurred. Please try again.
      </p>
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={reset}
          className="px-6 py-3 rounded-md bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-light)] transition-colors"
        >
          Try Again
        </button>
        <Link href="/" className="px-6 py-3 rounded-md border border-[var(--color-border)] font-semibold hover:bg-[var(--color-bg-secondary)] transition-colors">
          Go Home
        </Link>
      </div>
    </div>
  );
}
