import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
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
    },
    prepare({ title }) {
      return {
        title: title || "Untitled Page",
      };
    },
  },
});
