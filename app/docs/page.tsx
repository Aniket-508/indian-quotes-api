import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "@/components/ui/codeblock";
import { API_JSON_OUTPUT } from "@/lib/code";
import { DOCS_METADATA } from "@/lib/meta";
import {
  ALLOWED_QUERY_PARAMS,
  AUTHOR_FIELDS_MAP,
  COMPANY_FIELDS_MAP,
  ERROR_CODES_MAP,
  QUOTE_FIELDS_MAP,
  RATE_LIMITING_HEADERS,
} from "@/lib/docs";

export const metadata = {
  title: DOCS_METADATA.TITLE,
  description: DOCS_METADATA.DESCRIPTION,
  openGraph: {
    title: DOCS_METADATA.TITLE,
    description: DOCS_METADATA.DESCRIPTION,
    url: `${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}/docs`,
    images: DOCS_METADATA.IMAGE,
  },
  twitter: {
    card: "summary_large_image",
    title: DOCS_METADATA.TITLE,
    description: DOCS_METADATA.DESCRIPTION,
    images: DOCS_METADATA.IMAGE,
  },
};

export default function DocsPage() {
  const baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}/api`;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              API Documentation
            </h1>

            <div className="space-y-12">
              {/* Base URL Section */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                  Base URL
                </h2>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <code className="text-indigo-600">{baseUrl}</code>
                </div>
              </section>

              {/* Response Format Section */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Response Format
                </h2>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Fields Description
                  </h4>
                  <div className="grid gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">
                        Quote Fields
                      </h5>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {Object.entries(QUOTE_FIELDS_MAP).map(
                          ([key, description]) => (
                            <li key={key}>
                              <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                {key}
                              </code>
                              : {description}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">
                        Author Fields
                      </h5>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {Object.entries(AUTHOR_FIELDS_MAP).map(
                          ([key, description]) => (
                            <li key={key}>
                              <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                {key}
                              </code>
                              : {description}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">
                        Company Fields
                      </h5>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {Object.entries(COMPANY_FIELDS_MAP).map(
                          ([key, description]) => (
                            <li key={key}>
                              <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                {key}
                              </code>
                              : {description}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Rate Limiting Section */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                  Rate Limiting
                </h2>
                <p className="text-gray-600 mb-4">
                  All API endpoints are rate-limited to 100 requests per minute
                  per IP address. Rate limit information is included in the
                  response headers:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                  {Object.entries(RATE_LIMITING_HEADERS).map(
                    ([key, description]) => (
                      <li key={key}>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {key}
                        </code>
                        : {description}
                      </li>
                    )
                  )}
                </ul>
              </section>

              {/* Endpoints Section */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
                  Endpoints
                </h2>

                {/* Get All Quotes */}
                <div className="space-y-8">
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        GET
                      </span>
                      <code className="text-lg text-gray-900">/quotes</code>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Get a paginated list of quotes with optional filters.
                    </p>

                    <h4 className="font-semibold text-gray-900 mb-2">
                      Query Parameters
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                      {Object.entries(ALLOWED_QUERY_PARAMS).map(
                        ([key, description]) => (
                          <li key={key}>
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                              {key}
                            </code>
                            : {description}
                          </li>
                        )
                      )}
                    </ul>

                    <CodeBlock
                      code={`// Example: Get quotes from Ratan Tata
const response = await fetch('${baseUrl}/quotes?author=Ratan%20Tata');
const data = await response.json();

console.log(data);
/* Output:
{
  "data": [${API_JSON_OUTPUT}],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "totalPages": 5,
    "totalItems": 42
  }
}
*/`}
                    />
                  </div>

                  {/* Get Single Quote */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        GET
                      </span>
                      <code className="text-lg text-gray-900">
                        /quotes/{"{id}"}
                      </code>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Get a specific quote by ID.
                    </p>

                    <CodeBlock
                      code={`// Example: Get quote with ID 1
const response = await fetch('${baseUrl}/quotes/1');
const data = await response.json();

console.log(data);
/* Output:
${API_JSON_OUTPUT}
*/`}
                    />
                  </div>

                  {/* Get Random Quote */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        GET
                      </span>
                      <code className="text-lg text-gray-900">
                        /quotes/random
                      </code>
                    </div>
                    <p className="text-gray-600 mb-4">Get a random quote.</p>

                    <CodeBlock
                      code={`// Example: Get a random quote
const response = await fetch('${baseUrl}/quotes/random');
const data = await response.json();

console.log(data);
/* Output:
${API_JSON_OUTPUT}
*/`}
                    />
                  </div>
                </div>
              </section>

              {/* Error Handling Section */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                  Error Handling
                </h2>
                <p className="text-gray-600 mb-4">
                  The API uses conventional HTTP response codes to indicate the
                  success or failure of requests:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {Object.entries(ERROR_CODES_MAP).map(
                    ([code, description]) => (
                      <li key={code}>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {code}
                        </code>
                        : {description}
                      </li>
                    )
                  )}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
