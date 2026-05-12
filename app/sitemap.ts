import type { MetadataRoute } from "next";
import { PAPER_NUMBERS, YEARS, getAllSpecPoints } from "@/lib/data";
import { getBiologyNotes } from "@/lib/notes";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/biology`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/biology/spec`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/biology/notes`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/biology/topics`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/biology/progress`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const yearRoutes: MetadataRoute.Sitemap = YEARS.map((year) => ({
    url: `${SITE_URL}/biology/${year}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const paperRoutes: MetadataRoute.Sitemap = YEARS.flatMap((year) =>
    PAPER_NUMBERS.map((n) => ({
      url: `${SITE_URL}/biology/${year}/${n}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    }))
  );

  const specRoutes: MetadataRoute.Sitemap = getAllSpecPoints().map((sp) => ({
    url: `${SITE_URL}/biology/spec/${sp.id}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const topicRoutes: MetadataRoute.Sitemap = [
    ...new Set(getAllSpecPoints().map((sp) => sp.topic)),
  ].map((topic) => ({
    url: `${SITE_URL}/biology/topics/${encodeURIComponent(topic)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const noteRoutes: MetadataRoute.Sitemap = getBiologyNotes().map((note) => ({
    url: `${SITE_URL}/biology/notes/${note.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...yearRoutes,
    ...paperRoutes,
    ...specRoutes,
    ...topicRoutes,
    ...noteRoutes,
  ];
}
