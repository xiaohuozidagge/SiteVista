import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCard {
  label?: string;
  value?: string;
  direction?: "up" | "down" | "neutral";
  sentiment?: "positive" | "negative" | "neutral";
  description?: string;
  _key?: string;
}

interface MetricCardsBlockProps {
  value: {
    cards?: MetricCard[];
    columns?: number;
    [key: string]: unknown;
  };
}

function getIndicatorColor(sentiment?: string, direction?: string): string {
  // Color based on sentiment first, not direction
  if (sentiment === "positive") return "text-[var(--color-success)]";
  if (sentiment === "negative") return "text-[var(--color-critical)]";
  if (sentiment === "neutral") return "text-[var(--color-text-muted)]";

  // Fallback based on direction if sentiment not set
  if (direction === "up") return "text-[var(--color-success)]";
  if (direction === "down") return "text-[var(--color-critical)]";
  return "text-[var(--color-text-muted)]";
}

function getBgColor(sentiment?: string): string {
  if (sentiment === "positive") return "bg-[var(--color-success)]/5";
  if (sentiment === "negative") return "bg-[var(--color-critical)]/5";
  return "bg-[var(--color-bg-secondary)]";
}

export default function MetricCardsBlock({ value }: MetricCardsBlockProps) {
  const cards = value?.cards;

  if (!cards || !Array.isArray(cards) || cards.length === 0) return null;

  return (
    <div className="my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <div
            key={card._key || index}
            className={`rounded-[var(--radius-lg)] p-5 border border-[var(--color-border)] ${getBgColor(card.sentiment)}`}
          >
            <div className="flex items-center justify-between mb-2">
              {card.label && (
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                  {card.label}
                </span>
              )}
              {card.direction && card.direction !== "neutral" && (
                <span className={getIndicatorColor(card.sentiment, card.direction)}>
                  {card.direction === "up" ? (
                    <TrendingUp size={18} />
                  ) : (
                    <TrendingDown size={18} />
                  )}
                </span>
              )}
            </div>
            {card.value && (
              <span
                className={`block text-2xl font-bold font-[family-name:var(--font-heading)] mb-1 ${getIndicatorColor(card.sentiment, card.direction)}`}
              >
                {card.value}
              </span>
            )}
            {card.description && (
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mt-1">
                {card.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
