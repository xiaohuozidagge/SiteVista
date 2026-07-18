import { defineField, defineType } from "sanity";

export const fullWidthImage = defineType({
  name: "fullWidthImage",
  title: "Full Width Image",
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
    defineField({
      name: "displayWidth",
      title: "Display Width",
      type: "string",
      options: {
        list: [
          { title: "Content Width", value: "content" },
          { title: "Wide", value: "wide" },
          { title: "Full Width", value: "full" },
        ],
      },
      initialValue: "content",
    }),
    defineField({
      name: "border",
      title: "Show Border",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "shadow",
      title: "Show Shadow",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "enableLightbox",
      title: "Enable Lightbox",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "alt",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Full Width Image",
        media,
      };
    },
  },
});
