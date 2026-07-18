import { FileText, Briefcase, Search, Info } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: "posts" | "cases" | "search" | "general";
}

const iconMap = {
  posts: FileText,
  cases: Briefcase,
  search: Search,
  general: Info,
};

export default function EmptyState({
  title,
  description,
  icon = "general",
}: EmptyStateProps) {
  const IconComponent = iconMap[icon];

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="w-16 h-16 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center mb-5">
        <IconComponent
          size={28}
          className="text-[var(--color-text-muted)]"
          strokeWidth={1.5}
        />
      </div>
      <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--color-text)] mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-[var(--color-text-secondary)] max-w-sm leading-relaxed">
          {description}
        </p>
      )}
      <p className="text-xs text-[var(--color-text-muted)] mt-4">
        Check back soon for updates.
      </p>
    </div>
  );
}
