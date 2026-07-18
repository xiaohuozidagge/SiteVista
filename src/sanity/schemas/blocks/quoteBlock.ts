import { defineField, defineType } from "sanity";

export const quoteBlock = defineType({
  name: "quoteBlock",
  title: "Quote Block",
  type: "object",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
    }),
    defineField({
      name: "sourceUrl",
      title: "Source URL",
      type: "url",
    }),
  ],
  preview: {
    select: {
      quote: "quote",
      author: "author",
    },
    prepare({ quote, author }) {
      const excerpt = quote ? quote.substring(0, 60) + (quote.length > 60 ? "..." : "") : "";
      return {
        title: author ? `"${excerpt}" — ${author}` : `"${excerpt || "Quote"}"`,
      };
    },
  },
});
