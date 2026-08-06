import type { MetadataRoute } from "next";
import { VENTURES } from "@/lib/ventures";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://transparentchanges.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/first-steps",
    "/founding-circle",
    "/ventures",
    "/ideal-company",
    "/truth",
    "/about",
  ];

  const staticEntries = staticPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const ventureEntries = VENTURES.map((v) => ({
    url: `${siteUrl}/ventures/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...ventureEntries];
}
