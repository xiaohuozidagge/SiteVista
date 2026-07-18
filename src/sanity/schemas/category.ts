import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
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
        title: title || "Untitled Category",
      };
    },
  },
});
