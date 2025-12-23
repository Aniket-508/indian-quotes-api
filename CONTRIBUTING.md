## Contributing quotes

Thanks for contributing to **Indian Quotes API**!  
This project is data‑driven: data is organized in three JSON files and served directly from them.

### 1. Workflow overview

- **You edit**: `data/companies.json`, `data/authors.json`, and/or `data/quotes.json`.
- **You open a PR** with your changes.
- After the PR is merged, your quotes will be immediately available in the API.

The API serves quotes directly from the JSON files, so there's no database sync needed.

### 2. Data structure

The data is organized in three separate files to avoid redundancy and make it easy to check if companies/authors already exist:

- **`data/companies.json`**: List of all unique companies
- **`data/authors.json`**: List of all unique authors (references companies by slug)
- **`data/quotes.json`**: List of all quotes (references authors by slug)

### 3. JSON formats

#### Companies (`data/companies.json`)

```json
{
  "name": "Company Name",
  "url": "https://company.com",
  "slug": "company-name"
}
```

- **Required**: `name`, `slug`
- **Optional**: `url`
- `slug` should be lowercase, kebab-case (e.g., `"flipkart"`, `"zerodha"`)

#### Authors (`data/authors.json`)

```json
{
  "name": "Founder Name",
  "img": "https://example.com/image.jpg",
  "url": "https://example.com",
  "slug": "founder-name",
  "companySlug": "company-name"
}
```

- **Required**: `name`, `slug`, `companySlug`
- **Optional**: `img`, `url`
- `slug` should be lowercase, kebab-case of the full name (e.g., `"nithin-kamath"`, `"bhavish-aggarwal"`)
- `companySlug` must match an existing company slug from `data/companies.json`

#### Quotes (`data/quotes.json`)

```json
{
  "quote": "Clear, concise quote text from an Indian founder.",
  "tags": ["product", "early-stage"],
  "authorSlug": "founder-name"
}
```

- **Required**: `quote`, `authorSlug`
- **Optional**: `tags`
- `tags` should be a small list of lowercase strings, e.g. `["fundraising", "product", "hiring"]`
- `authorSlug` must match an existing author slug from `data/authors.json`

### 4. How to add a new quote

#### Step 1: Check if the company exists

1. Open `data/companies.json`
2. Search for the company name or slug
3. If it exists: note the `slug` and move to Step 2
4. If it doesn't exist: add it to `data/companies.json` (sorted alphabetically by slug)

#### Step 2: Check if the author exists

1. Open `data/authors.json`
2. Search for the author name or slug
3. If it exists: note the `slug` and move to Step 3
4. If it doesn't exist: add the author to `data/authors.json` with the company slug from Step 1 (sorted alphabetically by slug)

#### Step 3: Add the quote

1. Open `data/quotes.json`
2. Add your quote object at the end of the array
3. Use the `authorSlug` from Step 2

**Example workflow:**

Let's say you want to add a quote from "Rohit Sharma" who works at "Tata Motors":

1. Check `data/companies.json` → Find "Tata Group" (slug: `"tata"`) or add "Tata Motors" if it doesn't exist
2. Check `data/authors.json` → Find "Rohit Sharma" or add if new (with `companySlug: "tata"` or `companySlug: "tata-motors"`)
3. Add to `data/quotes.json`:
   ```json
   {
     "quote": "Your quote here",
     "tags": ["leadership"],
     "authorSlug": "rohit-sharma"
   }
   ```

### 5. Slugs and avoiding duplicates

We use `slug` fields to uniquely identify authors and companies. **Reusing slugs correctly prevents duplicates** and ensures consistency.

- **Company slug**: Lowercase, kebab-case (e.g., `"flipkart"`, `"zerodha"`)
- **Author slug**: Lowercase, kebab-case of the full name (e.g., `"nithin-kamath"`, `"bhavish-aggarwal"`)

**Important**: If a company or author already exists, you **must** reuse the existing `slug` exactly as it appears. Don't create duplicates!

### 6. What makes a good quote

- **Relevant**: from Indian founders / operators / investors; about startups, product, growth, leadership, fundraising, etc.
- **Verifiable**: comes from a talk, interview, podcast, article, book, or social post with a clear source (link if possible).
- **Respectful**: no hate speech, personal attacks, or private/sensitive information.
- **Accurate**: don’t heavily paraphrase; keep the wording close to the original.

### 7. How to submit a PR

1. **Fork** this repository and create a new branch.
2. Add your changes to the relevant JSON file(s):
   - Add company to `data/companies.json` if new
   - Add author to `data/authors.json` if new
   - Add quote to `data/quotes.json`
3. (Optional but recommended) Run:

   ```bash
   npm install
   npm run lint
   ```

4. Open a PR with a clear title, e.g. `Add quote by <Author Name>`.
5. In the PR description, include the **source link** and any extra context if helpful.

Once your PR is merged:

- Your quotes will be immediately available in the API/UI (after the next deployment).
- No additional sync or database update is needed.

### 8. Questions or corrections

If you notice a misattributed quote, incorrect slug, or other issue:

- Open an issue describing the problem, or
- Submit a PR fixing the relevant object in the appropriate JSON file(s).

Thank you for helping build a high‑quality library of Indian founder wisdom! 🙏
