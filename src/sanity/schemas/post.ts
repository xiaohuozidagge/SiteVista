import { defineField, defineType, defineArrayMember } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "seo", title: "SEO Settings" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (rule) => rule.required(),
      options: {
        source: "title",
        maxLength: 200,
      },
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      validation: (rule) =>
        rule.required().max(300).warning("Excerpt should be 300 characters or fewer."),
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "richText" },
        { type: "fullWidthImage" },
        { type: "imageAndText" },
        { type: "gallery" },
        { type: "metricCards" },
        { type: "comparisonBlock" },
        { type: "dataTable" },
        { type: "findingBox" },
        { type: "quoteBlock" },
        { type: "faqBlock" },
        { type: "seoAuditCta" },
        { type: "codeBlock" },
      ],
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "featuredImageAlt",
      title: "Featured Image Alt Text",
      type: "string",
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { featuredImage?: unknown };
          if (parent?.featuredImage && !value) {
            return "Alt text is required when a featured image is present.";
          }
          return true;
        }),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "tag" }],
        }),
      ],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "relatedPosts",
      title: "Related Posts",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "post" }],
        }),
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [{ type: "faq" }],
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category.title",
      media: "featuredImage",
      publishedAt: "publishedAt",
    },
    prepare({ title, subtitle, media, publishedAt }) {
      return {
        title: title || "Untitled Post",
        subtitle: [subtitle, publishedAt ? new Date(publishedAt).toLocaleDateString() : "Draft"]
          .filter(Boolean)
          .join(" | "),
        media,
      };
    },
  },
});
