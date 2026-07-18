import { defineField, defineType, defineArrayMember } from "sanity";

export const dataTable = defineType({
  name: "dataTable",
  title: "Data Table",
  type: "object",
  fields: [
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
    defineField({
      name: "headers",
      title: "Headers",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "cells",
              title: "Cells",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            select: {
              cells: "cells",
            },
            prepare({ cells }) {
              const cellArr = Array.isArray(cells) ? cells : [];
              const preview = cellArr.slice(0, 3).join(", ");
              return {
                title: preview || "Empty Row",
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "firstColumnHeader",
      title: "First Column is Header",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "responsiveMode",
      title: "Responsive Mode",
      type: "string",
      options: {
        list: [
          { title: "Scroll", value: "scroll" },
          { title: "Collapse", value: "collapse" },
        ],
      },
      initialValue: "scroll",
    }),
  ],
  preview: {
    select: {
      caption: "caption",
    },
    prepare({ caption }) {
      return {
        title: caption || "Data Table",
      };
    },
  },
});
