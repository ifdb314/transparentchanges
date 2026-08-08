import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://transparentchanges.com";
const DEFAULT_IMAGE = "/images/hero_hands.jpg";

/** Builds consistent per-page metadata: canonical URL + page-specific Open Graph/Twitter
 *  tags, instead of every page silently inheriting the root layout's generic ones. */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  index = true,
  follow = true,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  index?: boolean;
  follow?: boolean;
}): Metadata {
  const url = `${siteUrl}${path}`;
  const fullTitle = `${title} — TransparentChanges`;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: { index, follow },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "TransparentChanges",
      images: [{ url: image, width: 1000, height: 667 }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
