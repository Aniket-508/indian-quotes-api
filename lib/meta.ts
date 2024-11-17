import { BASE_URL, ROUTES } from "./routes";

export const MAIN_METADATA = {
  SITE_NAME: "Indian Quotes API",
  TITLE: "IndianQuotesAPI",
  DESCRIPTION:
    "Free, open-source API delivering curated quotes from India's most successful entrepreneurs.",
  IMAGE:
    "https://ik.imagekit.io/2oajjadqkz/1731074413647.jpg?updatedAt=1731074450615",
  URL: BASE_URL,
};

export const DOCS_METADATA = {
  TITLE: "API Documentation - Indian Entrepreneur Quotes API",
  DESCRIPTION:
    "Complete documentation for the Indian Entrepreneur Quotes API endpoints, including examples and usage guidelines.",
  IMAGE:
    "https://ik.imagekit.io/2oajjadqkz/1731074413676.jpg?updatedAt=1731074450524",
  URL: `${BASE_URL}${ROUTES.DOCS}`,
};

export const RANDOM_QUOTE_METADATA = {
  TITLE: "Random Quote - Indian Entrepreneur Quotes API",
  DESCRIPTION:
    "Get inspired with random quotes from Indian entrepreneurs and business leaders.",
  IMAGE:
    "https://ik.imagekit.io/2oajjadqkz/1731074413664.jpg?updatedAt=1731074450534",
  URL: `${BASE_URL}${ROUTES.RANDOM}`,
};
