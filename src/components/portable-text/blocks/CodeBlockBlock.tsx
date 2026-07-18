"use client";

import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockBlockProps {
  value: {
    code?: string;
    language?: string;
    filename?: string;
    showLineNumbers?: boolean;
    [key: string]: unknown;
  };
}

export default function CodeBlockBlock({ value }: CodeBlockBlockProps) {
  const [copied, setCopied] = useState(false);

  const {
    code,
    language,
    filename,
    showLineNumbers = false,
  } = value || {};

  const handleCopy = useCallback(async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available, fallback silently
    }
  }, [code]);

  if (!code) return null;

  const lines = code.split("\n");

  return (
    <div className="my-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          {filename && (
            <span className="text-xs font-mono text-[var(--color-text-muted)]">
              {filename}
            </span>
          )}
          {language && (
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)] bg-[var(--color-bg-tertiary)] px-2 py-0.5 rounded-[var(--radius-sm)]">
              {language}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-tertiary)] rounded-[var(--radius-sm)] transition-colors"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <>
              <Check size={12} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={12} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed font-mono text-[var(--color-text)] bg-[var(--color-bg)]">
          <code className={`language-${language || "plaintext"}`}>
            {showLineNumbers
              ? lines.map((line, i) => (
                  <span key={i} className="block">
                    <span className="inline-block w-10 pr-4 text-right text-[var(--color-text-muted)] select-none">
                      {i + 1}
                    </span>
                    {line || " "}
                  </span>
                ))
              : code}
          </code>
        </pre>
      </div>
    </div>
  );
}
