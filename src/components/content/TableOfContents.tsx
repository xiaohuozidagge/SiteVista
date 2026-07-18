"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/content/types";

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  // If more than 16 items, show only H2
  const displayItems = items.length > 16 ? items.filter((h) => h.level === 2) : items;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    displayItems.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [displayItems]);

  if (displayItems.length === 0) return null;

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-xl border border-[var(--color-border)] bg-white p-5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
          On This Page
        </h4>
        <nav aria-label="Table of Contents">
          <ul className="space-y-0.5">
            {displayItems.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  className={`block rounded-md px-2 py-2 text-sm leading-5 transition-colors hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-accent)] ${
                    h.level === 3 ? "ml-3 text-[13px]" : ""
                  } ${
                    activeId === h.id
                      ? "text-[var(--color-accent)] font-medium bg-[var(--color-bg-secondary)]"
                      : "text-[var(--color-text-secondary)]"
                  }`}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
