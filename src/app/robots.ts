import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/site";

// ponytail: basic robots rules, upgrade with crawler-specific directives when needed
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/*", "/api/*", "/auth/*"],
    },
    sitemap: `${SITE_CONFIG.website}/sitemap.xml`,
  };
}
