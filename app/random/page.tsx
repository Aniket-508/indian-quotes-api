import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import RandomQuote from "@/components/randomquote";

export const metadata = {
  title: "Random Quote - Indian Entrepreneur Quotes API",
  description:
    "Get inspired with random quotes from Indian entrepreneurs and business leaders.",
};

export default function RandomPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Random Quote
              </h1>
              <p className="text-base md:text-lg text-gray-600">
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
