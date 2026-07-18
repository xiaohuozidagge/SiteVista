import { defineField, defineType } from "sanity";

export const metric = defineType({
  name: "metric",
  title: "Metric",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "change",
      title: "Change",
      type: "string",
      description: "e.g., +12%, -5s",
    }),
    defineField({
      name: "direction",
      title: "Direction",
      type: "string",
      options: {
        list: [
          { title: "Up", value: "up" },
          { title: "Down", value: "down" },
          { title: "Neutral", value: "neutral" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "sentiment",
      title: "Sentiment",
      type: "string",
      options: {
        list: [
          { title: "Positive", value: "positive" },
          { title: "Negative", value: "negative" },
          { title: "Neutral", value: "neutral" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      label: "label",
      value: "value",
    },
    prepare({ label, value }) {
      return {
        title: `${label || "Metric"}: ${value || ""}`,
      };
    },
  },
});
