"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { urlFor } from "@/lib/sanity.image";
import type { SanityImageSource } from "@sanity/image-url";

interface GalleryImage {
  image?: SanityImageSource;
  alt?: string;
  caption?: string;
  _key?: string;
}

interface GalleryBlockProps {
  value: {
    images?: GalleryImage[];
    columns?: 2 | 3;
    enableLightbox?: boolean;
    [key: string]: unknown;
  };
}

function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  const currentImage = images[currentIndex];
  if (!currentImage?.image) return null;

  const imageUrl = urlFor(currentImage.image).url();
  const alt = currentImage.alt || "";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery lightbox"
    >
      <button
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        onClick={onClose}
        aria-label="Close gallery"
        autoFocus
      >
        <X size={24} />
      </button>
      {images.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </>
      )}
      <div
        className="relative max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={alt}
          className="max-w-full max-h-[90vh] object-contain rounded-[var(--radius-lg)]"
        />
        {currentImage.caption && (
          <p className="text-white/80 text-sm text-center mt-3">{currentImage.caption}</p>
        )}
      </div>
    </div>
  );
}

export default function GalleryBlock({ value }: GalleryBlockProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const columns = value?.columns === 3 ? 3 : 2;
  const images = value?.images;
  const enableLightbox = value?.enableLightbox ?? true;

  const validImages = (images && Array.isArray(images) ? images.filter((img) => img.image) : []);

  const openLightbox = useCallback(
    (index: number) => {
      if (enableLightbox) setLightboxIndex(index);
    },
    [enableLightbox]
  );

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? validImages.length - 1 : prev - 1;
    });
  }, [validImages.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === validImages.length - 1 ? 0 : prev + 1;
    });
  }, [validImages.length]);

  if (validImages.length === 0) return null;

  return (
    <div className="my-8">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          columns === 3 ? "lg:grid-cols-3" : ""
        } gap-4`}
      >
        {validImages.map((img, index) => (
          <figure key={img._key || index} className="group">
            <div className="relative aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-bg-tertiary)]">
              {enableLightbox ? (
                <button
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="block w-full h-full cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] rounded-[var(--radius-lg)]"
                  aria-label={`View image: ${img.alt || ""}`}
                >
                  <Image
                    src={urlFor(img.image!).url()}
                    alt={img.alt || ""}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </button>
              ) : (
                <Image
                  src={urlFor(img.image!).url()}
                  alt={img.alt || ""}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              )}
            </div>
            {img.caption && (
              <figcaption className="mt-2 text-center text-sm text-[var(--color-text-muted)]">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={validImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </div>
  );
}
