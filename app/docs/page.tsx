import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "@/components/ui/codeblock";
import { API_JSON_OUTPUT } from "@/lib/code";

export const metadata = {
  title: "API Documentation - Indian Entrepreneur Quotes API",
  description:
    "Complete documentation for the Indian Entrepreneur Quotes API endpoints, including examples and usage guidelines.",
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
                        <li>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            id
                          </code>
                          : Unique identifier (number)
                        </li>
                        <li>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            created_at
                          </code>
                          : Creation timestamp (ISO 8601)
                        </li>
                        <li>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            quote
                          </code>
                          : The actual quote text (string)
                        </li>
                        <li>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            tags
                          </code>
                          : Array of related tags (string[])
                        </li>
                        <li>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            author_id
                          </code>
                          : Reference to author (number)
                        </li>
                        <li>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            author
                          </code>
                          : Nested author object
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">
                        Author Fields
                      </h5>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            id
                          </code>
                          : Unique identifier (number)
                        </li>
                        <li>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            img
                          </code>
                          : Profile image URL (string)
                        </li>
                        <li>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            url
                          </code>
                          : Author&apos;s website/profile (string)
                        </li>
                        <li>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            name
                          </code>
                          : Full name (string)
                        </li>
                        <li>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            slug
                          </code>
                          : URL-friendly name (string)
                        </li>
                        <li>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            company_id
                          </code>
                          : Reference to company (number)
                        </li>
                        <li>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            company
                          </code>
                          : Nested company object
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">
                        Company Fields
                      </h5>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            id
                          </code>
                          : Unique identifier (number)
                        </li>
                        <li>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            url
                          </code>
                          : Company website (string)
                        </li>
                        <li>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            name
                          </code>
                          : Company name (string)
                        </li>
                        <li>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            slug
                          </code>
                          : URL-friendly name (string)
                        </li>
                        <li>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            created_at
                          </code>
                          : Creation timestamp (ISO 8601)
                        </li>
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
                  <li>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      X-RateLimit-Limit
                    </code>
                    : Requests allowed per window
                  </li>
                  <li>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      X-RateLimit-Remaining
                    </code>
                    : Requests remaining in window
                  </li>
                  <li>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      X-RateLimit-Reset
                    </code>
                    : Time when the rate limit resets
                  </li>
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
                      <li>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          page
                        </code>
                        : Page number (default: 1)
                      </li>
                      <li>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          limit
                        </code>
                        : Items per page (default: 10, max: 100)
                      </li>
                      <li>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          author
                        </code>
                        : Filter by author name
                      </li>
                      <li>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          company
                        </code>
                        : Filter by company name
                      </li>
                      <li>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          tags
                        </code>
                        : Filter by tag
                      </li>
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
                  <li>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      200
                    </code>
                    : Success
                  </li>
                  <li>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      400
                    </code>
                    : Bad Request - Invalid parameters
                  </li>
                  <li>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      404
                    </code>
                    : Not Found - Resource doesn&apos;t exist
                  </li>
                  <li>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      429
                    </code>
                    : Too Many Requests - Rate limit exceeded
                  </li>
                  <li>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      500
                    </code>
                    : Internal Server Error
                  </li>
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
