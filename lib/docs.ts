export const ERROR_CODES_MAP = {
  200: "Success",
  400: "Bad Request - Invalid parameters",
  404: "Not Found - Resource doesn't exist",
  429: "Too Many Requests - Rate limit exceeded",
  500: "Internal Server Error",
};

export const QUOTE_FIELDS_MAP = {
  id: "Unique identifier (number)",
  created_at: "Creation timestamp (ISO 8601)",
  quote: "The actual quote text (string)",
  tags: "Array of related tags (string[])",
  author_id: "Reference to author (number)",
  author: "Nested author object",
};

export const AUTHOR_FIELDS_MAP = {
  id: "Unique identifier (number)",
  img: "Profile image URL (string)",
  url: "Author's website/profile (string)",
  name: "Full name (string)",
  slug: "URL-friendly name (string)",
  company_id: "Reference to company (number)",
  company: "Nested company object",
};

export const COMPANY_FIELDS_MAP = {
  id: "Unique identifier (number)",
  url: "Company website (string)",
  name: "Company name (string)",
  slug: "URL-friendly name (string)",
  created_at: "Creation timestamp (ISO 8601)",
};

export const RATE_LIMITING_HEADERS = {
  "X-RateLimit-Limit": "Requests allowed per window",
  "X-RateLimit-Remaining": "Requests remaining in window",
  "X-RateLimit-Reset": "Time when the rate limit resets",
};

export const ALLOWED_QUERY_PARAMS = {
  page: "Page number (default: 1)",
  limit: "Items per page (default: 10, max: 100)",
  author: "Filter by author name",
  company: "Filter by company name",
  tags: "Filter by tag",
};

export const RESPONSE_FIELDS_FORMAT = [
  {
    title: "Quote Fields",
    fields: QUOTE_FIELDS_MAP,
  },
  {
    title: "Author Fields",
    fields: AUTHOR_FIELDS_MAP,
  },
  {
    title: "Company Fields",
    fields: COMPANY_FIELDS_MAP,
  },
];
