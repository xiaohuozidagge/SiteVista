import { defineField, defineType } from "sanity";

export const faqBlock = defineType({
  name: "faqBlock",
  title: "FAQ Block",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "questions",
      title: "Questions",
      type: "array",
      of: [
        {
          name: "faqQuestion",
          title: "Question",
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
                title: title || "FAQ Question",
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      heading: "heading",
      questionCount: "questions",
    },
    prepare({ heading, questionCount }) {
      const count = Array.isArray(questionCount) ? questionCount.length : 0;
      return {
        title: heading || `FAQ Block (${count} question${count !== 1 ? "s" : ""})`,
      };
    },
  },
});
