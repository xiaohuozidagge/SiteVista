"use client";

import { useState, useCallback, FormEvent } from "react";
import { Mail } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!email.trim()) return;
      setSubmitted(true);
      // Show feedback
      alert("Newsletter subscriptions will be available soon.");
    },
    [email]
  );

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2"
        noValidate
      >
        <div className="relative flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none">
            <Mail size={16} />
          </span>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={submitted}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-shadow"
          />
        </div>
        <button
          type="submit"
          disabled={submitted || !email.trim()}
          className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] rounded-[var(--radius-md)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {submitted ? "Subscribed!" : "Subscribe"}
        </button>
      </form>
      <p className="mt-2 text-xs text-[var(--color-text-muted)]">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
