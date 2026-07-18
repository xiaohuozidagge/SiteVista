import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("SiteVista Studio")
    .items([
      // Blog Posts
      S.listItem()
        .title("Blog Posts")
        .child(
          S.list()
            .title("Blog Posts")
            .items([
              S.listItem()
                .title("All Posts")
                .schemaType("post")
                .child(S.documentTypeList("post").title("All Posts")),
              S.listItem()
                .title("Featured Posts")
                .schemaType("post")
                .child(
                  S.documentList()
                    .title("Featured Posts")
                    .filter("_type == 'post' && featured == true")
                ),
              S.listItem()
                .title("Draft Posts")
                .schemaType("post")
                .child(
                  S.documentList()
                    .title("Draft Posts")
                    .filter("_type == 'post' && !defined(publishedAt)")
                ),
            ])
        ),

      // SEO Audit Cases
      S.listItem()
        .title("SEO Audit Cases")
        .child(
          S.list()
            .title("SEO Audit Cases")
            .items([
              S.listItem()
                .title("All Cases")
                .schemaType("seoAuditCase")
                .child(S.documentTypeList("seoAuditCase").title("All Cases")),
              S.listItem()
                .title("Featured Cases")
                .schemaType("seoAuditCase")
                .child(
                  S.documentList()
                    .title("Featured Cases")
                    .filter("_type == 'seoAuditCase' && featured == true")
                ),
              S.listItem()
                .title("Draft Cases")
                .schemaType("seoAuditCase")
                .child(
                  S.documentList()
                    .title("Draft Cases")
                    .filter("_type == 'seoAuditCase' && !defined(publishedAt)")
                ),
            ])
        ),

      S.divider(),

      // Categories
      S.listItem()
        .title("Categories")
        .schemaType("category")
        .child(S.documentTypeList("category").title("Categories")),

      // Tags
      S.listItem()
        .title("Tags")
        .schemaType("tag")
        .child(S.documentTypeList("tag").title("Tags")),

      // Authors
      S.listItem()
        .title("Authors")
        .schemaType("author")
        .child(S.documentTypeList("author").title("Authors")),

      // Pages
      S.listItem()
        .title("Pages")
        .schemaType("page")
        .child(S.documentTypeList("page").title("Pages")),

      S.divider(),

      // Site Settings (singleton)
      S.listItem()
        .title("Site Settings")
        .schemaType("siteSettings")
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings")
        ),
    ]);
