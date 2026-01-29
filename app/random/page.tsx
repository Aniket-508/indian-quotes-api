import RandomQuote from "@/components/randomquote";
import { ROUTES } from "@/lib/routes";
import { createMetadata } from "@/seo/metadata";

export const metadata = createMetadata({
  title: "Random Quote",
  description:
    "Get inspired with random quotes from Indian entrepreneurs and business leaders.",
  image:
    "https://ik.imagekit.io/2oajjadqkz/1731074413664.jpg?updatedAt=1731074450534",
  canonical: ROUTES.RANDOM,
});

export default function RandomPage() {
  return (
    <>
      <div className="container mx-auto px-6 pb-12 pt-24">
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
    </>
  );
}
