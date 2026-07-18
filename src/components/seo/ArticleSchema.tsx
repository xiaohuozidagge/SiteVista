interface ArticleSchemaProps {
  title: string;
  description?: string;
  imageUrl?: string;
  publishedAt?: string;
  updatedAt?: string;
  authorName?: string;
  url: string;
}

export function ArticleSchema({
  title,
  description,
  imageUrl,
  publishedAt,
  updatedAt,
  authorName,
  url,
}: ArticleSchemaProps) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    url,
  };

  if (description) jsonLd.description = description;
  if (imageUrl) jsonLd.image = imageUrl;
  if (publishedAt) jsonLd.datePublished = publishedAt;
  if (updatedAt) jsonLd.dateModified = updatedAt;
  if (authorName) {
    jsonLd.author = { "@type": "Person", name: authorName };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
