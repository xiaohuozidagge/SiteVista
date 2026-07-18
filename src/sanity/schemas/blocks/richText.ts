import { defineType, defineField, defineArrayMember } from "sanity";

export const richText = defineType({
  name: "richText",
  title: "Rich Text",
  type: "object",
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
            { title: "Normal", value: "normal" },
            { title: "Blockquote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "string",
                    validation: (rule) => rule.required(),
                  }),
                  defineField({
                    name: "openInNewTab",
                    title: "Open in new tab",
                    type: "boolean",
                    initialValue: false,
                  }),
                  defineField({
                    name: "nofollow",
                    title: "No Follow",
                    type: "boolean",
                    initialValue: false,
                  }),
                  defineField({
                    name: "sponsored",
                    title: "Sponsored",
                    type: "boolean",
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Rich Text Block",
      };
    },
  },
});
