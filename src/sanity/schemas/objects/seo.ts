import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO Settings",
  type: "object",
  groups: [
    { name: "seo", title: "SEO Settings", default: true },
  ],
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      group: "seo",
      validation: (rule) =>
        rule.max(70).warning("Meta titles should be 70 characters or fewer for optimal display in search results."),
      description: "Recommended: 50-70 characters. Search engines may truncate longer titles.",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      group: "seo",
      rows: 3,
      validation: (rule) =>
        rule.max(150).warning("Meta descriptions should be 150 characters or fewer for optimal display in search results."),
      description: "Recommended: 120-150 characters. Search engines may truncate longer descriptions.",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      group: "seo",
      description: "Set a canonical URL if this content appears elsewhere or has duplicate versions.",
    }),
    defineField({
      name: "openGraphImage",
      title: "Open Graph Image",
      type: "image",
      group: "seo",
      description: "Recommended size: 1200x630px. Used when sharing on social media.",
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      group: "seo",
      initialValue: false,
      description: "Prevent search engines from indexing this page.",
    }),
    defineField({
      name: "noFollow",
      title: "No Follow",
      type: "boolean",
      group: "seo",
      initialValue: false,
      description: "Prevent search engines from following links on this page.",
    }),
    defineField({
      name: "focusKeyword",
      title: "Focus Keyword",
      type: "string",
      group: "seo",
      description: "The primary keyword this content is targeting.",
    }),
  ],
});
