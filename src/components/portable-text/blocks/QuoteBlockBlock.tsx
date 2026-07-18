import { Quote } from "lucide-react";

interface QuoteBlockBlockProps {
  value: {
    quote?: string;
    author?: string;
    sourceUrl?: string;
    sourceLabel?: string;
    [key: string]: unknown;
  };
}

export default function QuoteBlockBlock({ value }: QuoteBlockBlockProps) {
  if (!value?.quote) return null;

  const { quote, author, sourceUrl, sourceLabel } = value;

  return (
    <blockquote className="my-8 border-l-4 border-[var(--color-accent)] pl-6 py-2 bg-[var(--color-bg-secondary)] rounded-r-[var(--radius-md)]">
      <div className="flex items-start gap-3">
        <Quote
          size={24}
          className="flex-shrink-0 text-[var(--color-accent)]/30 mt-1"
          aria-hidden="true"
        />
        <div>
          <p className="text-lg text-[var(--color-text)] leading-relaxed italic mb-3">
            &ldquo;{quote}&rdquo;
          </p>
          <footer className="text-sm text-[var(--color-text-muted)] not-italic">
            {author && <span className="font-medium">{author}</span>}
            {author && sourceUrl && sourceLabel && <span>, </span>}
            {sourceUrl && sourceLabel && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] hover:underline"
              >
                {sourceLabel}
              </a>
            )}
            {sourceUrl && !sourceLabel && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] hover:underline"
              >
                {sourceUrl}
              </a>
            )}
          </footer>
        </div>
      </div>
    </blockquote>
  );
}
