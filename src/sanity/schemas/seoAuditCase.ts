import { defineField, defineType, defineArrayMember } from "sanity";

export const seoAuditCase = defineType({
  name: "seoAuditCase",
  title: "SEO Audit Case",
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
      validation: (rule) => rule.required(),
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
      name: "industry",
      title: "Industry",
      type: "string",
    }),
    defineField({
      name: "websiteType",
      title: "Website Type",
      type: "string",
    }),
    defineField({
      name: "auditDate",
      title: "Audit Date",
      type: "date",
    }),
    defineField({
      name: "keyFindings",
      title: "Key Findings",
      type: "array",
      of: [{ type: "finding" }],
    }),
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [{ type: "metric" }],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "relatedCases",
      title: "Related Cases",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "seoAuditCase" }],
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
      name: "caseDisclosure",
      title: "Case Disclosure",
      type: "text",
      initialValue:
        "This independent SEO analysis is based on publicly available information and is not presented as a client engagement unless explicitly stated.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      industry: "industry",
      auditDate: "auditDate",
    },
    prepare({ title, industry, auditDate }) {
      return {
        title: title || "Untitled Case",
        subtitle: [industry, auditDate].filter(Boolean).join(" | "),
      };
    },
  },
});
