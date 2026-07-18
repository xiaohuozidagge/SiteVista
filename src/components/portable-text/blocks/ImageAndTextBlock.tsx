import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/lib/sanity.image";
import type { SanityImageSource } from "@sanity/image-url";

interface ImageAndTextBlockProps {
  value: {
    image?: SanityImageSource;
    alt?: string;
    imagePosition?: "left" | "right";
    heading?: string;
    content?: string;
    buttonText?: string;
    buttonUrl?: string;
    [key: string]: unknown;
  };
}

export default function ImageAndTextBlock({ value }: ImageAndTextBlockProps) {
  if (!value) return null;

  const {
    image,
    alt = "",
    imagePosition = "left",
    heading,
    content,
    buttonText,
    buttonUrl,
  } = value;

  const hasText = heading || content || (buttonText && buttonUrl);
  const imageOnLeft = imagePosition === "left";

  if (!image && !hasText) return null;

  const imageElement = image ? (
    <div className="relative w-full aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-bg-tertiary)]">
      <Image
        src={urlFor(image).url()}
        alt={alt || heading || ""}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
    </div>
  ) : null;

  const textElement = hasText ? (
    <div className="flex flex-col justify-center">
      {heading && (
        <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--color-text)] mb-3">
          {heading}
        </h3>
      )}
      {content && (
        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
          {content}
        </p>
      )}
      {buttonText && buttonUrl && (
        <Link
          href={buttonUrl}
          className="inline-flex items-center gap-2 self-start text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors no-underline"
        >
          {buttonText}
          <ArrowRight size={14} />
        </Link>
      )}
    </div>
  ) : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 items-center">
      {/* Mobile: image always on top */}
      <div className={`md:hidden`}>
        {imageElement}
      </div>
      <div className="md:hidden mt-6">
        {textElement}
      </div>

      {/* Desktop: position-aware */}
      <div className={`hidden md:block ${imageOnLeft ? "" : "md:order-2"}`}>
        {imageElement}
      </div>
      <div className={`hidden md:block ${imageOnLeft ? "" : "md:order-1"}`}>
        {textElement}
      </div>
    </div>
  );
}
