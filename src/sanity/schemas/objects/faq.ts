import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ Item",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "question",
    },
    prepare({ title }) {
      return {
        title: title || "FAQ Item",
      };
    },
  },
});
