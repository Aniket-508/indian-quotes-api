import { notFound } from "next/navigation";
import { Quote } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import Highlight from "@/components/ui/highlight";
import { LINK, SITE } from "@/constants";
import { getAllQuotes, getQuotesByAuthorSlug } from "@/lib/quotes-data";
import { API_BASE_URL, ROUTES } from "@/lib/routes";
import { titleCase } from "@/lib/utils";
import { BreadcrumbJsonLd } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

// Generate static params for all authors
export async function generateStaticParams() {
  const quotes = getAllQuotes();
  const uniqueAuthors = [...new Set(quotes.map((q) => q.author.slug))];
  return uniqueAuthors.map((author) => ({
    slug: encodeURIComponent(author),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const author = decodeURIComponent(slug);
  const processedAuthor = titleCase(author);

  return createMetadata({
    title: `${processedAuthor} Quotes`,
    description: `Collection of inspirational quotes by ${processedAuthor}.`,
    image: `${API_BASE_URL}/og?author=${slug}`,
    canonical: `${ROUTES.AUTHOR}/${slug}`,
  });
}

const AuthorJsonLd = ({ author }: { author: string }) => {
  const processedAuthor = titleCase(author);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: processedAuthor,
    description: `Inspirational quotes by ${processedAuthor}.`,
    url: `${ROUTES.AUTHOR}/${author}`,
    image: `${API_BASE_URL}/og?author=${author}`,
    codeRepository: LINK.GITHUB,
    programmingLanguage: ["TypeScript", "Next.js", "JavaScript"],
    license: LINK.LICENSE,
    isPartOf: {
      "@type": "SoftwareSourceCode",
      name: SITE.NAME,
      url: SITE.URL,
    },
    keywords: [processedAuthor, "quotes", "inspiration"],
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

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const author = decodeURIComponent((await params).slug);

  const quotes = getQuotesByAuthorSlug(author);

  if (!quotes.length) {
    notFound();
  }

  const processedAuthor = titleCase(author);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE.URL },
          { name: "Authors", url: `${SITE.URL}${ROUTES.AUTHOR}` },
          {
            name: processedAuthor,
            url: `${SITE.URL}${ROUTES.AUTHOR}/${author}`,
          },
        ]}
      />
      <AuthorJsonLd author={author} />
      <div className="container mx-auto grow px-6 pb-12 pt-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="mb-4 font-bricolage text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              {processedAuthor}
            </h1>
            <p className="text-base text-gray-600 md:text-lg">
              Inspiring quotes and wisdom from{" "}
              <Highlight>{processedAuthor}</Highlight>
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
                    <blockquote className="mb-4 text-base text-gray-900 md:text-xl">
                      &quot;{quote.quote}&quot;
                    </blockquote>
                    <footer>
                      <p className="text-gray-600">
                        at{" "}
                        <a
                          href={`${ROUTES.COMPANY}/${encodeURIComponent(
                            quote.author.company.slug
                          )}`}
                          className="font-medium text-indigo-600 hover:text-indigo-700"
                        >
                          {quote.author.company.name}
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
