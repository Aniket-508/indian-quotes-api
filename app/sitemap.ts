import { MetadataRoute } from "next";
import { BASE_URL, ROUTES } from "@/lib/routes";
import { getAllQuotes } from "@/lib/quotes-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all quotes to extract unique authors and companies
  const quotes = getAllQuotes();
  const uniqueAuthors = [...new Set(quotes.map((q) => q.author.slug))];
  const uniqueCompanies = [...new Set(quotes.map((q) => q.author.company.slug))];

  // Base URLs
  const baseUrls = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}${ROUTES.DOCS}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}${ROUTES.RANDOM}`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0,
    },
  ] as MetadataRoute.Sitemap;

  // Author pages
  const authorUrls = uniqueAuthors.map((author) => ({
    url: `${BASE_URL}${ROUTES.AUTHOR}/${encodeURIComponent(author)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  })) as MetadataRoute.Sitemap;

  // Company pages
  const companyUrls = uniqueCompanies.map((company) => ({
    url: `${BASE_URL}${ROUTES.COMPANY}/${encodeURIComponent(company)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  })) as MetadataRoute.Sitemap;

  return [...baseUrls, ...authorUrls, ...companyUrls];
}
