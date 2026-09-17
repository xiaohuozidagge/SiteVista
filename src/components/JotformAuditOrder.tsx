"use client";

import { useCallback, useEffect, useRef } from "react";
import Script from "next/script";
import { trackAuditEvent } from "@/lib/analytics";

// Jotform payment form. The final public form URL is:
//   https://pci.jotform.com/form/262583606356059
// This component only embeds the hosted form via an iframe; it never touches
// the Jotform or PayPal internals, and it never fakes a payment success state.
const FORM_ID = "262583606356059";
const FORM_ORIGIN = "https://pci.jotform.com";
const FORM_SRC = `${FORM_ORIGIN}/${FORM_ID}`;
const IFRAME_ID = `JotFormIFrame-${FORM_ID}`;
const EMBED_SCRIPT_URL = "https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js";

declare global {
  interface Window {
    jotformEmbedHandler?: (selector: string, baseUrl: string) => void;
  }
}

export function JotformAuditOrder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const viewFiredRef = useRef(false);

  const initializeEmbed = useCallback(() => {
    if (initializedRef.current) return;
    if (typeof window.jotformEmbedHandler !== "function") return;
    initializedRef.current = true;
    window.jotformEmbedHandler(
      `iframe[id='${IFRAME_ID}']`,
      `${FORM_ORIGIN}/`
    );
  }, []);

  // Fallback for when the embed script is already present (e.g. back/forward
  // navigation on a cached page). onReady below covers the fresh-load path.
  useEffect(() => {
    initializeEmbed();
  }, [initializeEmbed]);

  // Fire a single "audit_form_view" event the first time the form enters view.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      if (!viewFiredRef.current) {
        viewFiredRef.current = true;
        trackAuditEvent("audit_form_view");
      }
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting) && !viewFiredRef.current) {
          viewFiredRef.current = true;
          trackAuditEvent("audit_form_view");
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-sm"
    >
      <Script
        src={EMBED_SCRIPT_URL}
        strategy="afterInteractive"
        onReady={initializeEmbed}
      />
      <iframe
        id={IFRAME_ID}
        title="SEO Audit Order Form"
        allow="geolocation; microphone; camera; fullscreen; payment"
        src={FORM_SRC}
        loading="lazy"
        className="block w-full min-h-[640px] sm:min-h-[900px]"
        style={{ border: 0 }}
      />
    </div>
  );
}
