import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import type { SanityImageSource } from "@sanity/image-url";

interface ComparisonSide {
  image?: SanityImageSource;
  alt?: string;
  content?: string;
  label?: string;
}

interface ComparisonBlockProps {
  value: {
    before?: ComparisonSide;
    after?: ComparisonSide;
    [key: string]: unknown;
  };
}

function SideCard({
  side,
  sideLabel,
}: {
  side: ComparisonSide;
  sideLabel: string;
}) {
  if (!side) return null;

  const { image, alt = "", content } = side;

  return (
    <div className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden bg-[var(--color-bg)]">
      <div className="px-4 py-2 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)]">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          {side.label || sideLabel}
        </span>
      </div>
      {image && (
        <div className="relative w-full aspect-[16/10] bg-[var(--color-bg-tertiary)]">
          <Image
            src={urlFor(image).url()}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      )}
      {content && (
        <div className="p-4">
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {content}
          </p>
        </div>
      )}
    </div>
  );
}

export default function ComparisonBlock({ value }: ComparisonBlockProps) {
  const { before, after } = value || {};

  if (!before && !after) return null;

  return (
    <div className="my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SideCard side={before!} sideLabel="Before" />
        <SideCard side={after!} sideLabel="After" />
      </div>
    </div>
  );
}
