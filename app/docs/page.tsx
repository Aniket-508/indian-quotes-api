import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { API_JSON_OUTPUT } from "@/lib/code";
import { DOCS_METADATA } from "@/lib/meta";
import {
  ALLOWED_QUERY_PARAMS,
  ERROR_CODES_MAP,
  RATE_LIMITING_HEADERS,
  RESPONSE_FIELDS_FORMAT,
} from "@/lib/docs";
import { API_ROUTES, API_BASE_URL } from "@/lib/routes";
import FieldList from "@/components/docs/fieldlist";
import EndpointCard from "@/components/docs/endpointcard";

export const metadata = {
  title: DOCS_METADATA.TITLE,
  description: DOCS_METADATA.DESCRIPTION,
  openGraph: {
    title: DOCS_METADATA.TITLE,
    description: DOCS_METADATA.DESCRIPTION,
    url: DOCS_METADATA.URL,
    images: DOCS_METADATA.IMAGE,
  },
  twitter: {
    card: "summary_large_image",
    title: DOCS_METADATA.TITLE,
    description: DOCS_METADATA.DESCRIPTION,
    images: DOCS_METADATA.IMAGE,
  },
};

function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">{children}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function DocsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <SectionHeader title={title} />
      {children}
    </section>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
      {title}
    </h2>
  );
}

export default function DocsPage() {
  return (
    <DocsLayout>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        API Documentation
      </h1>

      <div className="space-y-12">
        {/* Base URL Section */}
        <DocsSection title="Base URL">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <code className="text-indigo-600">{API_BASE_URL}</code>
          </div>
        </DocsSection>

        {/* Response Format Section */}
        <DocsSection title="Response Format">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">
              Fields Description
            </h4>
            <div className="grid gap-4">
              {RESPONSE_FIELDS_FORMAT.map(({ title, fields }) => (
                <div key={title} className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">{title}</h5>
                  <FieldList fields={fields} />
                </div>
              ))}
            </div>
          </div>
        </DocsSection>

        {/* Rate Limiting Section */}
        <DocsSection title="Rate Limiting">
          <p className="text-gray-600 mb-4">
            All API endpoints are rate-limited to 100 requests per minute per IP
            address. Rate limit information is included in the response headers:
          </p>
          <FieldList fields={RATE_LIMITING_HEADERS} />
        </DocsSection>

        {/* Endpoints Section */}
        <DocsSection title="Endpoints">
          <div className="space-y-8">
            {/* Get All Quotes */}
            <EndpointCard
              method="GET"
              route={API_ROUTES.QUOTES}
              description="Get a paginated list of quotes with optional filters."
              queryParams={ALLOWED_QUERY_PARAMS}
              exampleQueryParams={{
                page: 1,
                limit: 10,
                author: "Ratan Tata",
                company: "Tata",
              }}
              exampleCode={`// Example: Get quotes from Ratan Tata
const response = await fetch('${API_BASE_URL}${API_ROUTES.QUOTES}?author=Ratan%20Tata');
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

            {/* Get Single Quote */}
            <EndpointCard
              method="GET"
              route={`${API_ROUTES.QUOTES}/{id}`}
              description="Get a specific quote by ID."
              examplePathParams={{ id: 1 }}
              exampleCode={`// Example: Get quote with ID 1
const response = await fetch('${API_BASE_URL}${API_ROUTES.QUOTES}/1');
const data = await response.json();

console.log(data);
/* Output:
${API_JSON_OUTPUT}
*/`}
            />

            {/* Get Random Quote */}
            <EndpointCard
              method="GET"
              route={`${API_ROUTES.QUOTES}${API_ROUTES.RANDOM}`}
              description="Get a random quote."
              exampleCode={`// Example: Get a random quote
const response = await fetch('${API_BASE_URL}${API_ROUTES.QUOTES}${API_ROUTES.RANDOM}');
const data = await response.json();

console.log(data);
/* Output:
${API_JSON_OUTPUT}
*/`}
            />
          </div>
        </DocsSection>

        {/* Error Handling Section */}
        <DocsSection title="Error Handling">
          <p className="text-gray-600 mb-4">
            The API uses conventional HTTP response codes to indicate the
            success or failure of requests:
          </p>
          <FieldList fields={ERROR_CODES_MAP} />
        </DocsSection>
      </div>
    </DocsLayout>
  );
}
