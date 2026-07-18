interface MetricItem {
  label: string;
  value: string;
  direction?: "up" | "down" | "neutral";
  sentiment?: "positive" | "negative" | "neutral";
  description?: string;
  change?: string;
}

interface MetricCardsProps {
  items?: MetricItem[];
}

export function MetricCards({ items }: MetricCardsProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="my-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
      {items.map((m, i) => {
        const sentimentColor =
          m.sentiment === "positive"
            ? "text-[var(--color-success)]"
            : m.sentiment === "negative"
            ? "text-[var(--color-critical)]"
            : "text-[var(--color-text)]";
        const arrow =
          m.direction === "up" ? "↑" : m.direction === "down" ? "↓" : "";

        return (
          <div
            key={i}
            className="border border-[var(--color-border)] rounded-lg p-4 text-center"
          >
            <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
              {m.label}
            </p>
            <p className={`mt-1 text-2xl font-bold ${sentimentColor}`}>
              {m.value}
              {m.change && (
                <span className="text-sm ml-1">
                  {arrow} {m.change}
                </span>
              )}
            </p>
            {m.description && (
              <p className="mt-1 text-xs text-[var(--color-text-muted)] leading-relaxed">
                {m.description}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
