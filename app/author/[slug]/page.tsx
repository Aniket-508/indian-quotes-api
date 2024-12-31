import { notFound } from "next/navigation";
import { Quote } from "lucide-react";
import Highlight from "@/components/ui/highlight";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { titleCase } from "@/lib/utils";
import { API_BASE_URL, BASE_URL, ROUTES } from "@/lib/routes";

// Generate static params for all authors
export async function generateStaticParams() {
  const { data: authors } = await supabase
    .from("author")
    .select("*")
    .order("id");

  const uniqueAuthors = [...new Set(authors?.map((q) => q.slug))];
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
  const title = `${processedAuthor} Quotes - Indian Quotes API`;
  const description = `Collection of inspirational quotes by ${processedAuthor}.`;
  const images = `${API_BASE_URL}/og?author=${slug}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${ROUTES.AUTHOR}/${slug}`,
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

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const author = decodeURIComponent((await params).slug);

  const { data: quotes, error } = await supabase
    .from("quotes")
    .select(
      `*,
      author!inner(*, company!inner (*))`
    )
    .eq("author.slug", author)
    .order("created_at", { ascending: false });

  if (error || !quotes.length) {
    notFound();
  }

  const processedAuthor = titleCase(author);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-6 pt-24 pb-12 grow">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-bricolage">
              {processedAuthor}
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Inspiring quotes and wisdom from{" "}
              <Highlight>{processedAuthor}</Highlight>
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
                    <blockquote className="text-base md:text-xl text-gray-900 mb-4">
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
      <Footer />
    </div>
  );
}
