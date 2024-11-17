import { MetadataRoute } from "next";
import { BASE_URL, ROUTES } from "@/lib/routes";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all authors and companies for dynamic routes
  const { data: companies } = await supabase
    .from("company")
    .select("*")
    .order("created_at", { ascending: false });
  const { data: authors } = await supabase
    .from("author")
    .select("*")
    .order("created_at", { ascending: false });

  const uniqueAuthors = [...new Set(authors?.map((q) => q.slug) || [])];
  const uniqueCompanies = [...new Set(companies?.map((q) => q.slug) || [])];

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
