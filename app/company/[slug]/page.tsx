import { notFound } from "next/navigation";
import { Quote } from "lucide-react";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import Highlight from "@/components/ui/highlight";
import { getAllQuotes, getQuotesByCompanySlug } from "@/lib/quotes-data";
import { API_BASE_URL, BASE_URL, ROUTES } from "@/lib/routes";
import { titleCase } from "@/lib/utils";

// Generate static params for common companies
export async function generateStaticParams() {
  const quotes = getAllQuotes();
  const uniqueCompanies = [
    ...new Set(quotes.map((q) => q.author.company.slug)),
  ];
  return uniqueCompanies.map((company) => ({
    slug: encodeURIComponent(company),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const company = decodeURIComponent(slug);
  const processedCompany = titleCase(company);
  const title = `${processedCompany} Quotes - Indian Quotes API`;
  const description = `Inspirational quotes from entrepreneurs at ${processedCompany}`;
  const images = `${API_BASE_URL}/og?company=${slug}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${ROUTES.COMPANY}/${slug}`,
      images,
      locale: "en_US",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const company = decodeURIComponent((await params).slug);

  const quotes = getQuotesByCompanySlug(company);

  if (!quotes.length) {
    notFound();
  }

  // Sort by created_at descending
  quotes.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const processedCompany = titleCase(company);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto grow px-6 pb-12 pt-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12">
            <h1 className="mb-4 font-bricolage text-2xl font-bold capitalize text-gray-900 sm:text-3xl md:text-4xl">
              {processedCompany}
            </h1>
            <p className="text-base text-gray-600 md:text-lg">
              Discover inspiring quotes from entrepreneurs at{" "}
              <Highlight>{processedCompany}</Highlight>
            </p>
          </div>

          <div className="space-y-6">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <Quote className="mt-1 h-6 w-6 flex-shrink-0 text-indigo-600" />
                  <div>
                    <blockquote className="mb-4 text-lg text-gray-900 sm:text-xl">
                      &quot;{quote.quote}&quot;
                    </blockquote>
                    <footer>
                      <p className="text-gray-600">
                        —{" "}
                        <a
                          href={`${ROUTES.AUTHOR}/${encodeURIComponent(
                            quote.author.slug
                          )}`}
                          className="font-medium text-indigo-600 hover:text-indigo-700"
                        >
                          {quote.author.name}
                        </a>
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {quote.tags?.map((tag: string) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>
                    </footer>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
