interface MDXTableProps {
  children?: React.ReactNode;
}

export function MDXTable({ children }: MDXTableProps) {
  return (
    <div className="my-8 w-full overflow-x-auto rounded-xl border border-[var(--color-border)]">
      <table className="min-w-[680px] w-full border-collapse text-sm">
        {children}
      </table>
    </div>
  );
}
