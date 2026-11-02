import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { getProjects } from "@/features/projects/services";

// ponytail: static + projects routes, add pagination/blog when added
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  const projectUrls: MetadataRoute.Sitemap = projects.map((p) => {
    const date = p.createdAt ? new Date(p.createdAt) : new Date();
    return {
      url: `${SITE_CONFIG.website}/projects/${p.slug}`,
      lastModified: isNaN(date.getTime()) ? new Date() : date,
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  return [
    {
      url: SITE_CONFIG.website,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_CONFIG.website}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_CONFIG.website}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...projectUrls,
  ];
}
