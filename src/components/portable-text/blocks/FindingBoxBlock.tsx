import {
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Zap,
  Info,
  PenLine,
} from "lucide-react";

interface FindingBoxBlockProps {
  value: {
    type?:
      | "keyFinding"
      | "criticalIssue"
      | "recommendation"
      | "quickWin"
      | "important"
      | "expertNote";
    title?: string;
    content?: string;
    [key: string]: unknown;
  };
}

const config: Record<
  string,
  {
    icon: React.FC<{ size?: number; className?: string }>;
    bg: string;
    border: string;
    titleColor: string;
    iconColor: string;
    label: string;
  }
> = {
  keyFinding: {
    icon: Lightbulb,
    bg: "bg-blue-50",
    border: "border-blue-200",
    titleColor: "text-blue-800",
    iconColor: "text-blue-600",
    label: "Key Finding",
  },
  criticalIssue: {
    icon: AlertTriangle,
    bg: "bg-red-50",
    border: "border-red-200",
    titleColor: "text-red-800",
    iconColor: "text-red-600",
    label: "Critical Issue",
  },
  recommendation: {
    icon: CheckCircle,
    bg: "bg-green-50",
    border: "border-green-200",
    titleColor: "text-green-800",
    iconColor: "text-green-600",
    label: "Recommendation",
  },
  quickWin: {
    icon: Zap,
    bg: "bg-amber-50",
    border: "border-amber-200",
    titleColor: "text-amber-800",
    iconColor: "text-amber-600",
    label: "Quick Win",
  },
  important: {
    icon: Info,
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    titleColor: "text-indigo-800",
    iconColor: "text-indigo-600",
    label: "Important",
  },
  expertNote: {
    icon: PenLine,
    bg: "bg-slate-50",
    border: "border-slate-200",
    titleColor: "text-slate-800",
    iconColor: "text-slate-600",
    label: "Expert Note",
  },
};

export default function FindingBoxBlock({ value }: FindingBoxBlockProps) {
  if (!value) return null;

  const type = value.type || "keyFinding";
  const { title, content } = value;
  const { icon: Icon, bg, border, titleColor, iconColor, label } =
    config[type] || config.keyFinding;

  const displayTitle = title || label;

  if (!content && !title) return null;

  return (
    <div
      className={`my-6 rounded-[var(--radius-lg)] border ${bg} ${border} p-5`}
      role="note"
    >
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 mt-0.5 ${iconColor}`}>
          <Icon size={20} />
        </div>
        <div>
          <h4 className={`font-semibold text-sm mb-1 ${titleColor}`}>
            {displayTitle}
          </h4>
          {content && (
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {content}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
