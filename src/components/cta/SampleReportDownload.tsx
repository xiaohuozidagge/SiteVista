"use client";

import { useEffect } from "react";
import { trackAuditEvent } from "@/lib/analytics";

// TODO: Add a real sample PDF URL (NEXT_PUBLIC_SAMPLE_REPORT_PDF_URL) to enable
// the download button. Leave empty and the button is hidden — no dead link.
const SAMPLE_PDF_URL = process.env.NEXT_PUBLIC_SAMPLE_REPORT_PDF_URL || "";

export function SampleReportDownload() {
  useEffect(() => {
    trackAuditEvent("sample_report_view");
  }, []);

  if (!SAMPLE_PDF_URL) return null;

  return (
    <a
      href={SAMPLE_PDF_URL}
      onClick={() => trackAuditEvent("sample_report_download")}
      className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-white/40 text-white font-semibold hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
    >
      Download Sample Report
    </a>
  );
}
