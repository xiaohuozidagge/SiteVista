"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface ToCItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  items: ToCItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [expanded, setExpanded] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        setActiveId(entry.target.id);
      }
    }
  }, []);

  useEffect(() => {
    if (items.length === 0) return;

    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin: "-80px 0px -70% 0px",
      threshold: 0,
    });

    const headingElements: Element[] = [];
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) {
        observerRef.current.observe(el);
        headingElements.push(el);
      }
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [items, handleIntersection]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
    }
    // Close mobile accordion after click
    setExpanded(false);
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="w-full">
      {/* Mobile: Collapsible Accordion */}
      <div className="lg:hidden mb-6 border border-[var(--color-border)] rounded-[var(--radius-lg)] overflow-hidden">
        <button
          className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-[var(--color-text)] bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-controls="toc-mobile-list"
        >
          <span>On this page</span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
        {expanded && (
          <ul
            id="toc-mobile-list"
            className="p-4 space-y-1 border-t border-[var(--color-border)]"
          >
            {items.map((item) => (
              <li
                key={item.id}
                style={{ paddingLeft: item.level === 3 ? "1.25rem" : "0" }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`block py-1.5 text-sm leading-snug transition-colors duration-150 no-underline border-l-2 pl-3 -ml-0 ${
                    activeId === item.id
                      ? "border-[var(--color-accent)] text-[var(--color-accent)] font-medium"
                      : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                  } ${item.level === 2 ? "font-medium" : "text-xs"}`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Desktop: Sticky Sidebar */}
      <div className="hidden lg:block sticky top-24">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
          On this page
        </h4>
        <ul className="space-y-0.5">
          {items.map((item) => (
            <li
              key={item.id}
              style={{ paddingLeft: item.level === 3 ? "1rem" : "0" }}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`block py-1.5 text-sm leading-snug transition-colors duration-150 no-underline border-l-2 pl-3 ${
                  activeId === item.id
                    ? "border-[var(--color-accent)] text-[var(--color-accent)] font-medium"
                    : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:border-[var(--color-border-hover)]"
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
