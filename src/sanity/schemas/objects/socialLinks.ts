import { defineField, defineType } from "sanity";

export const socialLinks = defineType({
  name: "socialLinks",
  title: "Social Links",
  type: "object",
  fields: [
    defineField({
      name: "linkedin",
      title: "LinkedIn",
      type: "url",
    }),
    defineField({
      name: "x",
      title: "X (Twitter)",
      type: "url",
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
    }),
  ],
});
