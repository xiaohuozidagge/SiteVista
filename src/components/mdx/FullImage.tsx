interface FullImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export function FullImage({ src, alt, caption }: FullImageProps) {
  return (
    <figure className="my-8 -mx-4 lg:-mx-8">
      <img src={src} alt={alt} className="w-full rounded-lg" loading="lazy" />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-[var(--color-text-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
