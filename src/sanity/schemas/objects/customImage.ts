import { defineField, defineType } from "sanity";

export const customImage = defineType({
  name: "customImage",
  title: "Custom Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      validation: (rule) => rule.required(),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "alt",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Image",
        media,
      };
    },
  },
});
