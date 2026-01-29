import { notFound } from "next/navigation";
import { Quote } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import Highlight from "@/components/ui/highlight";
import { LINK, SITE } from "@/constants";
import { getAllQuotes, getQuotesByCompanySlug } from "@/lib/quotes-data";
import { API_BASE_URL, ROUTES } from "@/lib/routes";
import { titleCase } from "@/lib/utils";
import { BreadcrumbJsonLd } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

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

  return createMetadata({
    title: `${processedCompany} Quotes`,
    description: `Inspirational quotes from entrepreneurs at ${processedCompany}`,
    image: `${API_BASE_URL}/og?company=${slug}`,
    canonical: `${ROUTES.COMPANY}/${slug}`,
  });
}

const CompanyJsonLd = ({ company }: { company: string }) => {
  const processedCompany = titleCase(company);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: processedCompany,
    description: `Inspirational quotes from entrepreneurs at ${processedCompany}.`,
    url: `${ROUTES.COMPANY}/${company}`,
    image: `${API_BASE_URL}/og?company=${company}`,
    codeRepository: LINK.GITHUB,
    programmingLanguage: ["TypeScript", "Next.js", "JavaScript"],
    license: LINK.LICENSE,
    isPartOf: {
      "@type": "SoftwareSourceCode",
      name: SITE.NAME,
      url: SITE.URL,
    },
    keywords: [processedCompany, "quotes", "inspiration"],
  };

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
};

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
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE.URL },
          { name: "Companies", url: `${SITE.URL}${ROUTES.COMPANY}` },
          {
            name: processedCompany,
            url: `${SITE.URL}${ROUTES.COMPANY}/${company}`,
          },
        ]}
      />
      <CompanyJsonLd company={company} />
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
    </>
  );
}
