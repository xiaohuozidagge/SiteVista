"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  trackAuditEvent,
  type AuditEventName,
  type AuditEventParams,
} from "@/lib/analytics";

interface TrackedCtaLinkProps {
  href: string;
  eventName: AuditEventName;
  eventParams?: AuditEventParams;
  className?: string;
  children: ReactNode;
}

/**
 * A Next.js <Link> that reports an audit analytics event on click. Used for
 * CTAs whose destination is a real page but whose click should still be tracked.
 */
export function TrackedCtaLink({
  href,
  eventName,
  eventParams,
  className,
  children,
}: TrackedCtaLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackAuditEvent(eventName, eventParams)}
    >
      {children}
    </Link>
  );
}
