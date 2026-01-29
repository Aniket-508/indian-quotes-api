import type { MetadataRoute } from "next";

import { SITE } from "@/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api",
      },
    ],
    sitemap: `${SITE.URL}/sitemap.xml`,
  };
}
