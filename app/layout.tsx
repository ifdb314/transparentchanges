import type { Metadata } from "next";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://transparentchanges.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TransparentChanges — Help build a better future, from the ground up.",
    template: "%s — TransparentChanges",
  },
  description:
    "We're building companies that publish their receipts and put employees and customers first — a grocery distributor, a law firm, a plumber, a home builder, a rideshare — one industry at a time.",
  openGraph: {
    title: "TransparentChanges — Help build a better future, from the ground up.",
    description:
      "Companies that publish their receipts and put employees and customers first. Join the Founding Circle — $0 required.",
    url: siteUrl,
    siteName: "TransparentChanges",
    images: [{ url: "/images/hero_hands.jpg", width: 1000, height: 667 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TransparentChanges — Help build a better future, from the ground up.",
    description:
      "Companies that publish their receipts and put employees and customers first.",
    images: ["/images/hero_hands.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
