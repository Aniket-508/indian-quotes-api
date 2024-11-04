import { notFound } from "next/navigation";
import { Quote } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Highlight from "@/components/ui/highlight";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";

// Generate static params for all authors
export async function generateStaticParams() {
  const { data: authors } = await supabase
    .from("author")
    .select("*")
    .order("id");

  const uniqueAuthors = [...new Set(authors?.map((q) => q.name))];
  return uniqueAuthors.map((author) => ({
    slug: encodeURIComponent(author),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const author = decodeURIComponent((await params).slug);
  return {
    title: `${author} Quotes - Indian Entrepreneur Quotes API`,
    description: `Collection of inspirational quotes by ${author}`,
  };
}

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const author = decodeURIComponent((await params).slug);

  const { data: quotes, error } = await supabase
    .from("quotes")
    .select("*, author (*, company (*))")
    .eq("author.name", author)
    .order("created_at", { ascending: false });

  if (error || !quotes.length) {
    notFound();
  }

  // Get unique companies
  // const companies = [
  //   ...new Set(quotes.map((quote) => quote.author.company.name)),
  // ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 capitalize font-bricolage">
              {author}
            </h1>
            {/* <div className="flex flex-wrap gap-2 mb-4">
              {companies.map((company) => (
                <a
                  key={company}
                  href={`/company/${encodeURIComponent(company)}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-colors"
                >
                  {company}
                </a>
              ))}
            </div> */}
            <p className="text-lg text-gray-600">
              Inspiring quotes and wisdom from <Highlight>{author}</Highlight>
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
                    <blockquote className="text-xl text-gray-900 mb-4">
                      &quot;{quote.quote}&quot;
                    </blockquote>
                    <footer>
                      <p className="text-gray-600">
                        at{" "}
                        {/* <a
                          href={`/company/${encodeURIComponent(
                            quote.author.company.name
                          )}`}
                          className="font-medium text-indigo-600 hover:text-indigo-700"
                        >
                          {quote.author.company.name}
                        </a> */}
                        {/* {quote.year && `, ${quote.year}`} */}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {quote.tags?.map((tag: string) => (
                          <Badge
                            key={tag}
                            className="bg-indigo-100 text-indigo-800"
                          >
                            {tag}
                          </Badge>
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
