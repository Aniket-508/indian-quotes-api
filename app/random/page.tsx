import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import RandomQuote from "@/components/randomquote";
import { RANDOM_QUOTE_METADATA } from "@/lib/meta";

export const metadata = {
  title: RANDOM_QUOTE_METADATA.TITLE,
  description: RANDOM_QUOTE_METADATA.DESCRIPTION,
  openGraph: {
    title: RANDOM_QUOTE_METADATA.TITLE,
    description: RANDOM_QUOTE_METADATA.DESCRIPTION,
    url: RANDOM_QUOTE_METADATA.URL,
    images: RANDOM_QUOTE_METADATA.IMAGE,
  },
  twitter: {
    card: "summary_large_image",
    title: RANDOM_QUOTE_METADATA.TITLE,
    description: RANDOM_QUOTE_METADATA.DESCRIPTION,
    images: RANDOM_QUOTE_METADATA.IMAGE,
  },
};

export default function RandomPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pb-12 pt-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h1 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Random Quote
              </h1>
              <p className="text-base text-gray-600 md:text-lg">
                Get inspired with wisdom from India&apos;s most successful
                entrepreneurs
              </p>
            </div>

            <RandomQuote />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
