import { supabase } from "@/lib/supabase";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;

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
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/random`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0,
    },
  ] as MetadataRoute.Sitemap;

  // Author pages
  const authorUrls = uniqueAuthors.map((author) => ({
    url: `${baseUrl}/author/${encodeURIComponent(author)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  })) as MetadataRoute.Sitemap;

  // Company pages
  const companyUrls = uniqueCompanies.map((company) => ({
    url: `${baseUrl}/company/${encodeURIComponent(company)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  })) as MetadataRoute.Sitemap;

  return [...baseUrls, ...authorUrls, ...companyUrls];
}
