import { defineField, defineType } from "sanity";

export const imageAndText = defineType({
  name: "imageAndText",
  title: "Image and Text",
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
      name: "imageAlt",
      title: "Image Alt Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "text",
    }),
    defineField({
      name: "imagePosition",
      title: "Image Position",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
      },
      initialValue: "left",
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
    }),
  ],
  preview: {
    select: {
      title: "heading",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Image and Text",
        media,
      };
    },
  },
});
