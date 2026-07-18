import { defineField, defineType } from "sanity";

export const gallery = defineType({
  name: "gallery",
  title: "Gallery",
  type: "object",
  fields: [
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          name: "galleryImage",
          title: "Gallery Image",
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
                title: title || "Gallery Image",
                media,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "columns",
      title: "Columns",
      type: "number",
      options: {
        list: [
          { title: "2 Columns", value: 2 },
          { title: "3 Columns", value: 3 },
        ],
      },
      initialValue: 3,
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
      imageCount: "images",
    },
    prepare({ imageCount }) {
      const count = Array.isArray(imageCount) ? imageCount.length : 0;
      return {
        title: `Gallery (${count} image${count !== 1 ? "s" : ""})`,
      };
    },
  },
});
