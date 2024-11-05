export interface Quote {
  id: number;
  created_at: string;
  quote: string;
  tags: string[];
  author_id: number;
  author: Author;
}

export interface Author {
  id: number;
  img: string;
  url: string;
  name: string;
  slug: string;
  company: Company;
  company_id: number;
  created_at: string;
}

export interface Company {
  id: number;
  url: string;
  name: string;
  slug: string;
  created_at: string;
}
