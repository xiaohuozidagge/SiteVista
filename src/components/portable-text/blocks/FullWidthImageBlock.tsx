"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { urlFor } from "@/lib/sanity.image";
import type { SanityImageSource } from "@sanity/image-url";

interface FullWidthImageBlockProps {
  value: {
    image?: SanityImageSource;
    alt?: string;
    caption?: string;
    displayWidth?: "content" | "wide" | "full";
    enableLightbox?: boolean;
    [key: string]: unknown;
  };
}

const widthClasses: Record<string, string> = {
  content: "max-w-[760px] mx-auto",
  wide: "max-w-[1000px] mx-auto",
  full: "w-full",
};

function ImageLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Focus trap: focus the close button on mount
  // The overlay is a backdrop with role="dialog"

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        onClick={onClose}
        aria-label="Close lightbox"
        autoFocus
      >
        <X size={24} />
      </button>
      <div
        className="relative max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || "Lightbox image"}
          className="max-w-full max-h-[90vh] object-contain rounded-[var(--radius-lg)]"
        />
      </div>
    </div>
  );
}

export default function FullWidthImageBlock({ value }: FullWidthImageBlockProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = useCallback(() => {
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  if (!value?.image) return null;

  const imageUrl = urlFor(value.image).url();
  const widthClass = widthClasses[value.displayWidth || "content"] || widthClasses.content;
  const alt = value.alt || "";
  const caption = value.caption || "";
  const enableLightbox = value.enableLightbox ?? true;

  return (
    <figure className={`my-8 ${widthClass}`}>
      <div className="relative overflow-hidden rounded-[var(--radius-lg)]">
        {enableLightbox ? (
          <button
            type="button"
            onClick={openLightbox}
            className="block w-full cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] rounded-[var(--radius-lg)]"
            aria-label={`View larger image: ${alt}`}
          >
            <Image
              src={imageUrl}
              alt={alt}
              width={1200}
              height={675}
              sizes="(max-width: 768px) 100vw, (max-width: 1000px) 760px, 1000px"
              className="w-full h-auto rounded-[var(--radius-lg)]"
            />
          </button>
        ) : (
          <Image
            src={imageUrl}
            alt={alt}
            width={1200}
            height={675}
            sizes="(max-width: 768px) 100vw, (max-width: 1000px) 760px, 1000px"
            className="w-full h-auto rounded-[var(--radius-lg)]"
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-[var(--color-text-muted)] italic">
          {caption}
        </figcaption>
      )}
      {lightboxOpen && (
        <ImageLightbox
          src={imageUrl}
          alt={alt}
          onClose={closeLightbox}
        />
      )}
    </figure>
  );
}
