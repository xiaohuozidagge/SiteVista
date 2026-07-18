import { defineField, defineType } from "sanity";

export const comparisonBlock = defineType({
  name: "comparisonBlock",
  title: "Comparison Block",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "beforeTitle",
      title: "Before Title",
      type: "string",
    }),
    defineField({
      name: "beforeContent",
      title: "Before Content",
      type: "text",
    }),
    defineField({
      name: "beforeImage",
      title: "Before Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "beforeImageAlt",
      title: "Before Image Alt",
      type: "string",
    }),
    defineField({
      name: "afterTitle",
      title: "After Title",
      type: "string",
    }),
    defineField({
      name: "afterContent",
      title: "After Content",
      type: "text",
    }),
    defineField({
      name: "afterImage",
      title: "After Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "afterImageAlt",
      title: "After Image Alt",
      type: "string",
    }),
  ],
  preview: {
    select: {
      heading: "heading",
    },
    prepare({ heading }) {
      return {
        title: heading || "Comparison Block",
      };
    },
  },
});
