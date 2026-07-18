import { defineField, defineType } from "sanity";

export const codeBlock = defineType({
  name: "codeBlock",
  title: "Code Block",
  type: "object",
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      initialValue: "javascript",
    }),
    defineField({
      name: "filename",
      title: "Filename",
      type: "string",
    }),
    defineField({
      name: "code",
      title: "Code",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "showLineNumbers",
      title: "Show Line Numbers",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      language: "language",
      filename: "filename",
    },
    prepare({ language, filename }) {
      return {
        title: filename
          ? `Code: ${filename} (${language || "text"})`
          : `Code Block (${language || "text"})`,
      };
    },
  },
});
