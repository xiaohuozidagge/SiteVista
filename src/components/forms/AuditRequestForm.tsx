"use client";

import { useRef, useState } from "react";
import { WEBSITE_TYPES, AUDIT_PACKAGE_OPTIONS } from "@/lib/seo-audit";
import { submitAuditRequest } from "@/lib/audit-request";
import { trackAuditEvent } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "not_configured" | "error";

interface FieldErrors {
  [key: string]: string | undefined;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_SUBMIT_INTERVAL_MS = 30_000;

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

const inputClass =
  "w-full px-3.5 py-2.5 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed transition-shadow";
const labelClass = "block text-sm font-medium text-[var(--color-text)] mb-1.5";
const errorClass = "mt-1 text-sm text-[var(--color-critical)]";

export function AuditRequestForm({ initialPackage = "" }: { initialPackage?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [websiteType, setWebsiteType] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [targetCountries, setTargetCountries] = useState("");
  const [mainChallenge, setMainChallenge] = useState("");
  const [packageName, setPackageName] = useState(initialPackage);
  const [additionalInfo, setAdditionalInfo] = useState("");
  // Honeypot — hidden from real users, tempting to bots.
  const [company, setCompany] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const startFiredRef = useRef(false);
  const lastSubmitRef = useRef(0);

  function fireStartOnce() {
    if (startFiredRef.current) return;
    startFiredRef.current = true;
    trackAuditEvent("audit_form_start", { source_page: "audit_form" });
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};

    if (!name.trim()) next.name = "Please enter your name.";
    if (!email.trim()) next.email = "Please enter your email address.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "Please enter a valid email address.";

    if (!websiteUrl.trim()) next.websiteUrl = "Please enter your website URL.";
    else if (!isValidUrl(websiteUrl.trim()))
      next.websiteUrl = "Please enter a valid URL, including http:// or https://.";

    if (!websiteType) next.websiteType = "Please select your website type.";
    if (!pageCount.trim()) next.pageCount = "Please tell us roughly how many pages your site has.";
    if (!targetCountries.trim())
      next.targetCountries = "Please list your target countries or languages.";
    if (!mainChallenge.trim()) next.mainChallenge = "Please describe your main SEO challenge.";
    if (!packageName) next.packageName = "Please select a preferred package.";

    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fireStartOnce();

    // Honeypot: if the hidden field is filled, drop silently.
    if (company.trim()) {
      setStatus("success");
      return;
    }

    const now = Date.now();
    if (now - lastSubmitRef.current < MIN_SUBMIT_INTERVAL_MS) {
      setStatus("error");
      setErrorMessage("Please wait a moment before submitting again.");
      return;
    }

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");
    lastSubmitRef.current = now;
    trackAuditEvent("audit_form_submit", { package_name: packageName });

    const result = await submitAuditRequest({
      name: name.trim(),
      email: email.trim(),
      websiteUrl: websiteUrl.trim(),
      websiteType,
      pageCount: pageCount.trim(),
      targetCountries: targetCountries.trim(),
      mainChallenge: mainChallenge.trim(),
      packageName,
      additionalInfo: additionalInfo.trim(),
    });

    if (result.status === "success") {
      trackAuditEvent("audit_form_success", { package_name: packageName });
      setStatus("success");
    } else if (result.status === "not_configured") {
      setStatus("not_configured");
    } else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-xl border border-[var(--color-success)] bg-[var(--color-bg-secondary)] p-8 text-center"
      >
        <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-success)]">
          Request Received
        </h3>
        <p className="mt-3 text-[var(--color-text-secondary)] max-w-md mx-auto leading-relaxed">
          Thank you. Your audit request has been received. We will review your
          website and respond within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="SEO audit request form">
      {/* Honeypot field — visually hidden */}
      <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
        <label htmlFor="audit-company">Company</label>
        <input
          id="audit-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="audit-name" className={labelClass}>
            Name <span className="text-[var(--color-critical)]" aria-hidden>*</span>
          </label>
          <input
            id="audit-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => { setName(e.target.value); fireStartOnce(); }}
            required
            aria-invalid={!!errors.name}
            className={inputClass}
          />
          {errors.name && <p className={errorClass}>{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="audit-email" className={labelClass}>
            Email <span className="text-[var(--color-critical)]" aria-hidden>*</span>
          </label>
          <input
            id="audit-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); fireStartOnce(); }}
            required
            aria-invalid={!!errors.email}
            className={inputClass}
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>

        {/* Website URL */}
        <div className="sm:col-span-2">
          <label htmlFor="audit-website" className={labelClass}>
            Website URL <span className="text-[var(--color-critical)]" aria-hidden>*</span>
          </label>
          <input
            id="audit-website"
            type="url"
            placeholder="https://example.com"
            value={websiteUrl}
            onChange={(e) => { setWebsiteUrl(e.target.value); fireStartOnce(); }}
            required
            aria-invalid={!!errors.websiteUrl}
            className={inputClass}
          />
          {errors.websiteUrl && <p className={errorClass}>{errors.websiteUrl}</p>}
        </div>

        {/* Website Type */}
        <div>
          <label htmlFor="audit-website-type" className={labelClass}>
            Website Type <span className="text-[var(--color-critical)]" aria-hidden>*</span>
          </label>
          <select
            id="audit-website-type"
            value={websiteType}
            onChange={(e) => { setWebsiteType(e.target.value); fireStartOnce(); }}
            required
            aria-invalid={!!errors.websiteType}
            className={inputClass}
          >
            <option value="">Select a type</option>
            {WEBSITE_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.websiteType && <p className={errorClass}>{errors.websiteType}</p>}
        </div>

        {/* Number of Pages */}
        <div>
          <label htmlFor="audit-pages" className={labelClass}>
            Number of Pages <span className="text-[var(--color-critical)]" aria-hidden>*</span>
          </label>
          <input
            id="audit-pages"
            type="text"
            inputMode="numeric"
            placeholder="e.g. 25"
            value={pageCount}
            onChange={(e) => { setPageCount(e.target.value); fireStartOnce(); }}
            required
            aria-invalid={!!errors.pageCount}
            className={inputClass}
          />
          {errors.pageCount && <p className={errorClass}>{errors.pageCount}</p>}
        </div>

        {/* Target Countries / Languages */}
        <div>
          <label htmlFor="audit-countries" className={labelClass}>
            Target Countries or Languages <span className="text-[var(--color-critical)]" aria-hidden>*</span>
          </label>
          <input
            id="audit-countries"
            type="text"
            placeholder="e.g. US, Germany (EN + DE)"
            value={targetCountries}
            onChange={(e) => { setTargetCountries(e.target.value); fireStartOnce(); }}
            required
            aria-invalid={!!errors.targetCountries}
            className={inputClass}
          />
          {errors.targetCountries && <p className={errorClass}>{errors.targetCountries}</p>}
        </div>

        {/* Preferred Audit Package */}
        <div>
          <label htmlFor="audit-package" className={labelClass}>
            Preferred Audit Package <span className="text-[var(--color-critical)]" aria-hidden>*</span>
          </label>
          <select
            id="audit-package"
            value={packageName}
            onChange={(e) => { setPackageName(e.target.value); fireStartOnce(); }}
            required
            aria-invalid={!!errors.packageName}
            className={inputClass}
          >
            <option value="">Select a package</option>
            {AUDIT_PACKAGE_OPTIONS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {errors.packageName && <p className={errorClass}>{errors.packageName}</p>}
        </div>

        {/* Main SEO Challenge */}
        <div className="sm:col-span-2">
          <label htmlFor="audit-challenge" className={labelClass}>
            Main SEO Challenge <span className="text-[var(--color-critical)]" aria-hidden>*</span>
          </label>
          <textarea
            id="audit-challenge"
            rows={3}
            placeholder="What is the biggest issue you are trying to solve?"
            value={mainChallenge}
            onChange={(e) => { setMainChallenge(e.target.value); fireStartOnce(); }}
            required
            aria-invalid={!!errors.mainChallenge}
            className={inputClass}
          />
          {errors.mainChallenge && <p className={errorClass}>{errors.mainChallenge}</p>}
        </div>

        {/* Additional Information */}
        <div className="sm:col-span-2">
          <label htmlFor="audit-additional" className={labelClass}>
            Additional Information <span className="text-[var(--color-text-muted)]">(optional)</span>
          </label>
          <textarea
            id="audit-additional"
            rows={3}
            placeholder="Anything else we should know?"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {status === "not_configured" && (
        <p role="alert" className="mt-5 rounded-lg border border-[var(--color-warning)] bg-[var(--color-bg-secondary)] p-4 text-sm text-[var(--color-text-secondary)]">
          We couldn&apos;t submit your request because the submission service is not
          connected yet. Please try again shortly.
        </p>
      )}
      {status === "error" && errorMessage && (
        <p role="alert" className="mt-5 rounded-lg border border-[var(--color-critical)] bg-[var(--color-bg-secondary)] p-4 text-sm text-[var(--color-critical)]">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-md bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {status === "submitting" ? "Sending…" : "Submit Request"}
      </button>

      <p className="mt-3 text-xs text-[var(--color-text-muted)]">
        Fields marked with <span className="text-[var(--color-critical)]">*</span> are required.
        We will only use your details to respond to your request.
      </p>
    </form>
  );
}
