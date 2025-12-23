import { notFound } from "next/navigation";
import { Quote } from "lucide-react";
import Highlight from "@/components/ui/highlight";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { getQuotesByCompanySlug, getAllQuotes } from "@/lib/quotes-data";
import { titleCase } from "@/lib/utils";
import { API_BASE_URL, BASE_URL, ROUTES } from "@/lib/routes";

// Generate static params for common companies
export async function generateStaticParams() {
  const quotes = getAllQuotes();
  const uniqueCompanies = [...new Set(quotes.map((q) => q.author.company.slug))];
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-6 pt-24 pb-12 grow">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 capitalize font-bricolage">
              {processedCompany}
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Discover inspiring quotes from entrepreneurs at{" "}
              <Highlight>{processedCompany}</Highlight>
            </p>
          </div>

          <div className="space-y-6">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <Quote className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                  <div>
                    <blockquote className="text-lg sm:text-xl text-gray-900 mb-4">
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
