"use client";

import { useState, useCallback, KeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question?: string;
  answer?: string;
  _key?: string;
}

interface FAQBlockBlockProps {
  value: {
    items?: FAQItem[];
    [key: string]: unknown;
  };
}

function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onToggle();
      }
    },
    [onToggle]
  );

  return (
    <div className="border-b border-[var(--color-border)] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item._key || ""}`}
        className="flex items-center justify-between w-full py-4 text-left text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-inset rounded-[var(--radius-sm)]"
      >
        <span className="pr-4">{item.question || ""}</span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-[var(--color-text-muted)] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>
      <div
        id={`faq-answer-${item._key || ""}`}
        role="region"
        aria-labelledby={`faq-question-${item._key || ""}`}
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[1000px] pb-4" : "max-h-0"
        }`}
      >
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {item.answer || ""}
        </p>
      </div>
    </div>
  );
}

export default function FAQBlockBlock({ value }: FAQBlockBlockProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  const items = value?.items;

  const toggleItem = useCallback((index: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  if (!items || !Array.isArray(items) || items.length === 0) return null;

  const validItems = items.filter((item) => item.question);

  if (validItems.length === 0) return null;

  return (
    <div className="my-8" role="region" aria-label="Frequently asked questions">
      <div className="border-t border-[var(--color-border)]">
        {validItems.map((item, index) => (
          <FAQAccordionItem
            key={item._key || index}
            item={item}
            isOpen={openIndexes.has(index)}
            onToggle={() => toggleItem(index)}
          />
        ))}
      </div>
    </div>
  );
}
