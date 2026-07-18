import { defineField, defineType } from "sanity";

export const metricCards = defineType({
  name: "metricCards",
  title: "Metric Cards",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [{ type: "metric" }],
    }),
  ],
  preview: {
    select: {
      heading: "heading",
      metricCount: "metrics",
    },
    prepare({ heading, metricCount }) {
      const count = Array.isArray(metricCount) ? metricCount.length : 0;
      return {
        title: heading || `Metric Cards (${count} metric${count !== 1 ? "s" : ""})`,
      };
    },
  },
});
