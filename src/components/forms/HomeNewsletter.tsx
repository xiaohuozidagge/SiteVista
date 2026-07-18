"use client";

import { useState } from "react";

export function HomeNewsletter() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="max-w-md mx-auto text-center">
      <h2 className="text-xl font-bold font-[family-name:var(--font-heading)]">Stay Updated</h2>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
        Get the latest SEO guides and audit case studies delivered to your inbox.
      </p>
      {submitted ? (
        <p className="mt-6 p-4 bg-[var(--color-bg-secondary)] rounded-lg text-sm text-[var(--color-text-secondary)]">
          Newsletter subscriptions will be available soon. Thank you for your interest!
        </p>
      ) : (
        <form className="mt-6 flex gap-2" onSubmit={handleSubmit}>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Your email address"
            required
            className="flex-1 px-4 py-3 border border-[var(--color-border)] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-md hover:bg-[var(--color-primary-light)] transition-colors"
          >
            Subscribe
          </button>
        </form>
      )}
      <p className="mt-3 text-xs text-[var(--color-text-muted)]">
        No spam. Unsubscribe anytime.
      </p>
    </section>
  );
}
