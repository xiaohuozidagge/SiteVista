import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SiteVista — Clear SEO Insights. Practical Growth Strategies.",
    template: "%s | SiteVista",
  },
  description:
    "SiteVista provides practical SEO guides, website audit case studies, and manually prepared SEO audits for businesses and website owners.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://sitevista.net"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "SiteVista",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
