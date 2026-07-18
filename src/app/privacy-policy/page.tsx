import { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy", description: "SiteVista Privacy Policy." };

export default function PrivacyPage() {
  return (
    <div className="container-content py-12 lg:py-16 prose prose-slate max-w-none prose-headings:font-[family-name:var(--font-heading)]">
      <h1>Privacy Policy</h1>
      <p>This page will contain the SiteVista privacy policy.</p>
    </div>
  );
}
