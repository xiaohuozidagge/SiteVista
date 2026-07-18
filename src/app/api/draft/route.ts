import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { client } from "@/lib/sanity.client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const type = searchParams.get("type") || "post";

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }

  if (!slug) {
    return new Response("Missing slug parameter", { status: 400 });
  }

  // Validate that the document exists in Sanity
  const query =
    type === "seoAuditCase"
      ? `*[_type == "seoAuditCase" && slug.current == $slug][0]._id`
      : `*[_type == "post" && slug.current == $slug][0]._id`;

  const doc = await client.fetch<string | null>(query, { slug });

  if (!doc) {
    return new Response("Document not found", { status: 404 });
  }

  const draft = await draftMode();
  draft.enable();

  const path = type === "seoAuditCase" ? `/seo-audit-cases/${slug}/` : `/blog/${slug}/`;
  redirect(path);
}
