// ─── Audit inquiry submission ───────────────────────────────
// No backend submission endpoint is configured out of the box. This module is
// the single place to wire up a real handler.
//
// Configure NEXT_PUBLIC_AUDIT_FORM_ENDPOINT (a Formspree endpoint, a
// serverless function, or your own API route) to enable actual submission.
// Until then, submitAuditRequest() returns { status: "not_configured" } so the
// form can show an honest message instead of faking success.

import { AUDIT_FORM_ENDPOINT } from "./seo-audit";

export interface AuditRequestPayload {
  name: string;
  email: string;
  websiteUrl: string;
  websiteType: string;
  pageCount: string;
  targetCountries: string;
  mainChallenge: string;
  packageName: string;
  additionalInfo?: string;
}

export type SubmitResult =
  | { status: "success" }
  | { status: "error"; message: string }
  | { status: "not_configured" };

export async function submitAuditRequest(
  payload: AuditRequestPayload
): Promise<SubmitResult> {
  if (!AUDIT_FORM_ENDPOINT) {
    // Honest "not configured" path — do NOT fake success.
    return { status: "not_configured" };
  }

  try {
    const res = await fetch(AUDIT_FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) return { status: "success" };

    const text = await res.text().catch(() => "");
    return {
      status: "error",
      message: `Submission failed (${res.status}). ${text}`.trim(),
    };
  } catch {
    return {
      status: "error",
      message: "Could not reach the submission server. Please try again.",
    };
  }
}
