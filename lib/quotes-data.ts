import type { Author, Company, Quote } from "@/types/quote";

import quotesData from "../quotes_seed.json";

// Transform seed data to match Quote type with IDs
type SeedQuote = {
  quote: string;
  tags?: string[];
  author: {
    name: string;
    img?: string;
    url?: string;
    slug: string;
    company: {
      name: string;
      url?: string;
      slug: string;
    };
  };
};

type QuoteWithId = Quote & {
  id: number;
  created_at: string;
};

// Transform and index data
let quotesCache: QuoteWithId[] | null = null;
let indexes: {
  byId: Map<number, QuoteWithId>;
  byAuthorSlug: Map<string, QuoteWithId[]>;
  byCompanySlug: Map<string, QuoteWithId[]>;
  byTag: Map<string, QuoteWithId[]>;
} | null = null;

function buildIndexes() {
  if (quotesCache && indexes) return { quotes: quotesCache, indexes };

  const quotes: QuoteWithId[] = [];
  const byId = new Map<number, QuoteWithId>();
  const byAuthorSlug = new Map<string, QuoteWithId[]>();
  const byCompanySlug = new Map<string, QuoteWithId[]>();
  const byTag = new Map<string, QuoteWithId[]>();

  // Track unique companies and authors to ensure consistent IDs
  const companyMap = new Map<string, Company>();
  const authorMap = new Map<string, { author: Author; companyId: number }>();
  let companyIdCounter = 1;
  let authorIdCounter = 1;
  const now = new Date().toISOString();

  (quotesData as SeedQuote[]).forEach((seedQuote, index) => {
    const quoteId = index + 1;

    // Get or create company
    let company: Company;
    if (companyMap.has(seedQuote.author.company.slug)) {
      company = companyMap.get(seedQuote.author.company.slug)!;
    } else {
      company = {
        id: companyIdCounter++,
        name: seedQuote.author.company.name,
        url: seedQuote.author.company.url || "",
        slug: seedQuote.author.company.slug,
        created_at: now,
      };
      companyMap.set(company.slug, company);
    }

    // Get or create author
    let author: Author;
    if (authorMap.has(seedQuote.author.slug)) {
      const cached = authorMap.get(seedQuote.author.slug)!;
      author = { ...cached.author, company }; // Update company reference
    } else {
      author = {
        id: authorIdCounter++,
        name: seedQuote.author.name,
        img: seedQuote.author.img || "",
        url: seedQuote.author.url || "",
        slug: seedQuote.author.slug,
        company,
        company_id: company.id,
        created_at: now,
      };
      authorMap.set(author.slug, { author, companyId: company.id });
    }

    // Build quote object
    const quote: QuoteWithId = {
      id: quoteId,
      quote: seedQuote.quote,
      tags: seedQuote.tags || [],
      author_id: author.id,
      created_at: now,
      author,
    };

    quotes.push(quote);
    byId.set(quote.id, quote);

    // Index by author slug
    if (!byAuthorSlug.has(author.slug)) {
      byAuthorSlug.set(author.slug, []);
    }
    byAuthorSlug.get(author.slug)!.push(quote);

    // Index by company slug
    if (!byCompanySlug.has(company.slug)) {
      byCompanySlug.set(company.slug, []);
    }
    byCompanySlug.get(company.slug)!.push(quote);

    // Index by tags
    quote.tags.forEach((tag) => {
      if (!byTag.has(tag)) {
        byTag.set(tag, []);
      }
      byTag.get(tag)!.push(quote);
    });
  });

  quotesCache = quotes;
  indexes = { byId, byAuthorSlug, byCompanySlug, byTag };

  return { quotes, indexes };
}

// Get all quotes (with optional filtering)
export function getAllQuotes(filters?: {
  author?: string;
  company?: string;
  tags?: string;
}): QuoteWithId[] {
  const { quotes } = buildIndexes();
  let result = quotes;

  // Apply filters (case-insensitive partial match)
  if (filters?.author) {
    const searchTerm = filters.author.toLowerCase();
    result = result.filter((q) =>
      q.author.name.toLowerCase().includes(searchTerm)
    );
  }

  if (filters?.company) {
    const searchTerm = filters.company.toLowerCase();
    result = result.filter((q) =>
      q.author.company.name.toLowerCase().includes(searchTerm)
    );
  }

  if (filters?.tags) {
    result = result.filter((q) => q.tags.includes(filters.tags!));
  }

  return result;
}

// Get quote by ID
export function getQuoteById(id: number): QuoteWithId | undefined {
  const { indexes } = buildIndexes();
  return indexes.byId.get(id);
}

// Get random quote
export function getRandomQuote(): QuoteWithId {
  const { quotes } = buildIndexes();
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

// Get quotes by author slug
export function getQuotesByAuthorSlug(slug: string): QuoteWithId[] {
  const { indexes } = buildIndexes();
  return indexes.byAuthorSlug.get(slug) || [];
}

// Get quotes by company slug
export function getQuotesByCompanySlug(slug: string): QuoteWithId[] {
  const { indexes } = buildIndexes();
  return indexes.byCompanySlug.get(slug) || [];
}

// Paginate quotes
export function paginateQuotes(
  quotes: QuoteWithId[],
  page: number,
  limit: number
) {
  const sorted = [...quotes].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const from = (page - 1) * limit;
  const to = from + limit;
  return {
    data: sorted.slice(from, to),
    total: sorted.length,
    page,
    pageSize: limit,
    totalPages: Math.ceil(sorted.length / limit),
  };
}
