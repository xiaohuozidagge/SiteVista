// ─── GA4 event tracking (reserved) ─────────────────────────
// GA4 is not currently installed on this site. These helpers reserve the
// event-calling logic and are safe no-ops while gtag.js is absent.
//
// To enable, install GA4 (e.g. via @next/third-parties <GoogleAnalytics /> in
// the root layout) so that `window.gtag` / `window.dataLayer` exists. The
// helpers below will then begin forwarding events automatically — no changes
// needed here.
//
// Security note: never pass personally identifiable information (names,
// emails, website URLs, or message contents) into these events.

export type AuditEventName =
  | "audit_form_start"
  | "audit_form_submit"
  | "audit_form_success"
  | "audit_form_view"
  | "audit_package_cta_click"
  | "contact_before_order_click"
  | "sample_report_view"
  | "sample_report_download"
  | "sample_report_click"
  | "fiverr_click";

export interface AuditEventParams {
  package_name?: string;
  package_price?: number;
  page_path?: string;
  source_page?: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

function currentPagePath(): string {
  if (typeof window === "undefined") return "";
  return window.location.pathname;
}

/**
 * Send a GA4 event. Silently no-ops when GA4 is not installed.
 */
export function trackAuditEvent(
  name: AuditEventName,
  params: AuditEventParams = {}
): void {
  if (typeof window === "undefined") return;

  const pagePath = params.page_path ?? currentPagePath();
  const eventParams: Record<string, unknown> = { page_path: pagePath };
  if (params.package_name) eventParams.package_name = params.package_name;
  if (params.package_price !== undefined) eventParams.package_price = params.package_price;
  if (params.source_page) eventParams.source_page = params.source_page;

  if (typeof window.gtag === "function") {
    window.gtag("event", name, eventParams);
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...eventParams });
  }
  // else: GA4 not installed — intentional no-op.
}
