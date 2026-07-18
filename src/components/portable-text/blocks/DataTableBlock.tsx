interface DataTableBlockProps {
  value: {
    caption?: string;
    headers?: { text?: string; _key?: string }[];
    rows?: { cells?: { text?: string; _key?: string }[]; _key?: string }[];
    responsiveMode?: "scroll" | "stack";
    [key: string]: unknown;
  };
}

export default function DataTableBlock({ value }: DataTableBlockProps) {
  const {
    caption,
    headers,
    rows,
    responsiveMode = "scroll",
  } = value || {};

  if (!rows || !Array.isArray(rows) || rows.length === 0) return null;

  const validRows = rows.filter(
    (row) => row.cells && Array.isArray(row.cells) && row.cells.length > 0
  );

  if (validRows.length === 0) return null;

  const validHeaders =
    headers && Array.isArray(headers) && headers.length > 0 ? headers : null;

  if (responsiveMode === "scroll") {
    return (
      <div className="my-8 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <table className="w-full text-sm border-collapse">
          {caption && (
            <caption className="text-sm text-[var(--color-text-muted)] mb-2 text-left">
              {caption}
            </caption>
          )}
          {validHeaders && (
            <thead>
              <tr className="border-b-2 border-[var(--color-border)]">
                {validHeaders.map((header, i) => (
                  <th
                    key={header._key || i}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] whitespace-nowrap"
                  >
                    {header.text || ""}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {validRows.map((row, rowIndex) => (
              <tr
                key={row._key || rowIndex}
                className="border-b border-[var(--color-border-light)] last:border-b-0 hover:bg-[var(--color-bg-secondary)] transition-colors"
              >
                {row.cells!.map((cell, cellIndex) => (
                  <td
                    key={cell._key || cellIndex}
                    className="px-4 py-3 text-[var(--color-text)] whitespace-nowrap"
                  >
                    {cell.text || ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Stack mode fallback for mobile
  return (
    <div className="my-8">
      {caption && (
        <p className="text-sm text-[var(--color-text-muted)] mb-4">{caption}</p>
      )}
      <div className="space-y-4">
        {validRows.map((row, rowIndex) => (
          <div
            key={row._key || rowIndex}
            className="rounded-[var(--radius-md)] border border-[var(--color-border)] p-4"
          >
            {validHeaders
              ? row.cells!.map((cell, cellIndex) => (
                  <div key={cell._key || cellIndex} className="flex justify-between py-1 border-b border-[var(--color-border-light)] last:border-b-0">
                    <span className="text-xs font-semibold text-[var(--color-text-muted)]">
                      {validHeaders[cellIndex]?.text || `Col ${cellIndex + 1}`}
                    </span>
                    <span className="text-sm text-[var(--color-text)] text-right">
                      {cell.text || ""}
                    </span>
                  </div>
                ))
              : row.cells!.map((cell, cellIndex) => (
                  <div key={cell._key || cellIndex} className="py-1 text-sm text-[var(--color-text)]">
                    {cell.text || ""}
                  </div>
                ))}
          </div>
        ))}
      </div>
    </div>
  );
}
