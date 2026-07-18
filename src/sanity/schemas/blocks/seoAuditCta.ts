import { defineField, defineType } from "sanity";

export const seoAuditCta = defineType({
  name: "seoAuditCta",
  title: "SEO Audit CTA",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
    }),
    defineField({
      name: "buttonUrl",
      title: "Button URL",
      type: "string",
      initialValue: "/seo-audit/",
    }),
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Light", value: "light" },
          { title: "Primary", value: "primary" },
          { title: "Bordered", value: "bordered" },
        ],
      },
      initialValue: "primary",
    }),
  ],
  preview: {
    select: {
      heading: "heading",
    },
    prepare({ heading }) {
      return {
        title: heading || "SEO Audit CTA",
      };
    },
  },
});
