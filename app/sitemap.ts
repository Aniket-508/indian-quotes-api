import type { MetadataRoute } from "next";

import { SITE } from "@/constants";
import { getAllQuotes } from "@/lib/quotes-data";
import { ROUTES } from "@/lib/routes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all quotes to extract unique authors and companies
  const quotes = getAllQuotes();
  const uniqueAuthors = [...new Set(quotes.map((q) => q.author.slug))];
  const uniqueCompanies = [
    ...new Set(quotes.map((q) => q.author.company.slug)),
  ];

  // Base URLs
  const baseUrls = [
    {
      url: SITE.URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE.URL}${ROUTES.DOCS}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE.URL}${ROUTES.RANDOM}`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0,
    },
  ] as MetadataRoute.Sitemap;

  // Author pages
  const authorUrls = uniqueAuthors.map((author) => ({
    url: `${SITE.URL}${ROUTES.AUTHOR}/${encodeURIComponent(author)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  })) as MetadataRoute.Sitemap;

  // Company pages
  const companyUrls = uniqueCompanies.map((company) => ({
    url: `${SITE.URL}${ROUTES.COMPANY}/${encodeURIComponent(company)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  })) as MetadataRoute.Sitemap;

  return [...baseUrls, ...authorUrls, ...companyUrls];
}
