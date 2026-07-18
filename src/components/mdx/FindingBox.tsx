import { AlertTriangle, Lightbulb, CheckCircle, Zap, Info, PenLine } from "lucide-react";

interface FindingBoxProps {
  type: "keyFinding" | "criticalIssue" | "recommendation" | "quickWin" | "important" | "expertNote";
  title: string;
  children?: React.ReactNode;
}

const config: Record<string, { icon: React.ReactNode; border: string; bg: string; label: string }> = {
  keyFinding: {
    icon: <Lightbulb size={18} />,
    border: "border-l-[var(--color-accent)]",
    bg: "bg-blue-50",
    label: "Key Finding",
  },
  criticalIssue: {
    icon: <AlertTriangle size={18} />,
    border: "border-l-[var(--color-critical)]",
    bg: "bg-red-50",
    label: "Critical Issue",
  },
  recommendation: {
    icon: <CheckCircle size={18} />,
    border: "border-l-[var(--color-success)]",
    bg: "bg-emerald-50",
    label: "Recommendation",
  },
  quickWin: {
    icon: <Zap size={18} />,
    border: "border-l-[var(--color-warning)]",
    bg: "bg-amber-50",
    label: "Quick Win",
  },
  important: {
    icon: <Info size={18} />,
    border: "border-l-[var(--color-primary)]",
    bg: "bg-slate-50",
    label: "Important",
  },
  expertNote: {
    icon: <PenLine size={18} />,
    border: "border-l-[var(--color-text-muted)]",
    bg: "bg-gray-50",
    label: "Expert Note",
  },
};

export function FindingBox({ type, title, children }: FindingBoxProps) {
  const c = config[type] || config.keyFinding;

  return (
    <div className={`my-6 border-l-4 ${c.border} ${c.bg} rounded-r-lg p-5`}>
      <div className="flex items-center gap-2 mb-2 text-sm font-semibold">
        {c.icon}
        <span>{c.label}</span>
      </div>
      <p className="font-bold text-sm mb-1">{title}</p>
      <div className="text-sm text-[var(--color-text-secondary)] [&>p]:my-1">{children}</div>
    </div>
  );
}
