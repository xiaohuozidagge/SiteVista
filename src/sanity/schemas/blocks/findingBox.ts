import { defineField, defineType } from "sanity";

export const findingBox = defineType({
  name: "findingBox",
  title: "Finding Box",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Key Finding", value: "keyFinding" },
          { title: "Critical Issue", value: "criticalIssue" },
          { title: "Recommendation", value: "recommendation" },
          { title: "Quick Win", value: "quickWin" },
          { title: "Important", value: "important" },
          { title: "Expert Note", value: "expertNote" },
        ],
      },
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "text",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      type: "type",
      heading: "heading",
    },
    prepare({ type, heading }) {
      const typeLabels: Record<string, string> = {
        keyFinding: "Key Finding",
        criticalIssue: "Critical Issue",
        recommendation: "Recommendation",
        quickWin: "Quick Win",
        important: "Important",
        expertNote: "Expert Note",
      };
      return {
        title: `${typeLabels[type || ""] || "Finding"}: ${heading || ""}`,
      };
    },
  },
});
