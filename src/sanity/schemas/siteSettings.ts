import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
    }),
    defineField({
      name: "siteUrl",
      title: "Site URL",
      type: "string",
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default Open Graph Image",
      type: "image",
      description: "Default social sharing image. Recommended: 1200x630px.",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
        }),
        defineField({
          name: "x",
          title: "X (Twitter)",
          type: "url",
        }),
        defineField({
          name: "website",
          title: "Website",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "footerDescription",
      title: "Footer Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "organizationName",
      title: "Organization Name",
      type: "string",
    }),
    defineField({
      name: "organizationDescription",
      title: "Organization Description",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "siteName",
    },
    prepare({ title }) {
      return {
        title: title || "Site Settings",
      };
    },
  },
});
