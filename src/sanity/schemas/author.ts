import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (rule) => rule.required(),
      options: {
        source: "name",
        maxLength: 200,
      },
    }),
    defineField({
      name: "jobTitle",
      title: "Job Title",
      type: "string",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "imageAlt",
      title: "Image Alt Text",
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
          type: "string",
        }),
        defineField({
          name: "x",
          title: "X (Twitter)",
          type: "string",
        }),
        defineField({
          name: "website",
          title: "Website",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "jobTitle",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Untitled Author",
        subtitle,
        media,
      };
    },
  },
});
