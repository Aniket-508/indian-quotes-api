import EndpointCard from "@/components/docs/endpointcard";
import FieldList from "@/components/docs/fieldlist";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { API_JSON_OUTPUT } from "@/lib/code";
import {
  ALLOWED_QUERY_PARAMS,
  ERROR_CODES_MAP,
  RATE_LIMITING_HEADERS,
  RESPONSE_FIELDS_FORMAT,
} from "@/lib/docs";
import { DOCS_METADATA } from "@/lib/meta";
import { API_BASE_URL, API_ROUTES } from "@/lib/routes";

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
      <div className="min-h-screen bg-gray-50 pb-12 pt-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">{children}</div>
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
    <h2 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl">
      {title}
    </h2>
  );
}

export default function DocsPage() {
  return (
    <DocsLayout>
      <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
        API Documentation
      </h1>

      <div className="space-y-12">
        {/* Base URL Section */}
        <DocsSection title="Base URL">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <code className="text-indigo-600">{API_BASE_URL}</code>
          </div>
        </DocsSection>

        {/* Response Format Section */}
        <DocsSection title="Response Format">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h4 className="mb-2 font-semibold text-gray-900">
              Fields Description
            </h4>
            <div className="grid gap-4">
              {RESPONSE_FIELDS_FORMAT.map(({ title, fields }) => (
                <div key={title} className="rounded-lg bg-gray-50 p-4">
                  <h5 className="mb-2 font-medium text-gray-900">{title}</h5>
                  <FieldList fields={fields} />
                </div>
              ))}
            </div>
          </div>
        </DocsSection>

        {/* Rate Limiting Section */}
        <DocsSection title="Rate Limiting">
          <p className="mb-4 text-gray-600">
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
          <p className="mb-4 text-gray-600">
            The API uses conventional HTTP response codes to indicate the
            success or failure of requests:
          </p>
          <FieldList fields={ERROR_CODES_MAP} />
        </DocsSection>
      </div>
    </DocsLayout>
  );
}
