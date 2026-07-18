import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const secret = request.headers.get("x-revalidate-secret");

    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const { _type, slug } = body;

    if (!_type || !slug?.current) {
      return NextResponse.json(
        { message: "Missing _type or slug" },
        { status: 400 }
      );
    }

    // Revalidate the specific page
    if (_type === "post") {
      revalidatePath(`/blog/${slug.current}`);
      revalidatePath("/");
      revalidatePath(`/${_type === "post" ? "seo-audit-guides" : ""}`);
    } else if (_type === "seoAuditCase") {
      revalidatePath(`/seo-audit-cases/${slug.current}`);
      revalidatePath("/seo-audit-cases");
      revalidatePath("/");
    } else if (_type === "category") {
      revalidatePath(`/${slug.current}`);
      revalidatePath("/");
    } else if (_type === "page") {
      revalidatePath(`/${slug.current}`);
    }

    // Always revalidate sitemap and home on any change
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: String(err) },
      { status: 500 }
    );
  }
}
