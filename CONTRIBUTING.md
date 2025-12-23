## Contributing quotes

Thanks for contributing to **Indian Quotes API**!  
This project is data‑driven: all quotes live in `quotes_seed.json` and are synced to Supabase via GitHub Actions.

### 1. Workflow overview

- **You edit**: `quotes_seed.json`.
- **You open a PR** with your changes.
- After the PR is merged, a **GitHub Action** runs and upserts your changes into the Supabase database.

You never need direct access to Supabase to add or update quotes.

### 2. JSON format

Each quote in `quotes_seed.json` looks like this:

```json
{
  "quote": "Clear, concise quote text from an Indian founder.",
  "tags": ["product", "early-stage"],
  "source": "YouTube: https://www.youtube.com/watch?v=example",
  "context": "Optional short context for where/why this was said.",
  "author": {
    "name": "Founder Name",
    "img": "",
    "url": "https://example.com",
    "slug": "founder-name",
    "company": {
      "name": "Company Name",
      "url": "https://company.com",
      "slug": "company-name"
    }
  }
}
```

- **Required**: `quote`, `author.name`, `author.slug`, `author.company.name`, `author.company.slug`.
- **Optional**: `tags`, `source`, `context`, `author.img`, `author.url`, `author.company.url`.
- `tags` should be a small list of lowercase strings, e.g. `["fundraising", "product", "hiring"]`.

### 3. Slugs and avoiding duplicates

We use `slug` fields to uniquely identify authors and companies. The sync script upserts based on these slugs, so **reusing slugs correctly prevents duplicates**.

- **Company slug** (`author.company.slug`)

  - Lowercase, kebab‑case.
  - Example: `"flipkart"`, `"zerodha"`, `"freshworks"`.
  - **If the company already exists in `quotes_seed.json`, you must reuse the existing `slug` and `name`.**

- **Author slug** (`author.slug`)
  - Lowercase, kebab‑case of the full name.
  - Example: `"nithin-kamath"`, `"bhavish-aggarwal"`.
  - **If the author already exists, reuse the exact same `slug` and `name`.**

#### How to check if an author or company exists

- Search inside `quotes_seed.json` for the **company name** or **author name**.
- If you find an entry:
  - Copy the existing `company.slug` and `author.slug`.
  - Keep the `name` field identical (don’t change spelling/casing for an existing slug).
- If you do **not** find an entry:
  - Create a new `slug`:
    - Author: `"first-last"` (lowercase, hyphens only).
    - Company: short, recognizable company name in lowercase, hyphens instead of spaces.

### 4. What makes a good quote

- **Relevant**: from Indian founders / operators / investors; about startups, product, growth, leadership, fundraising, etc.
- **Verifiable**: comes from a talk, interview, podcast, article, book, or social post with a clear source (link if possible).
- **Respectful**: no hate speech, personal attacks, or private/sensitive information.
- **Accurate**: don’t heavily paraphrase; keep the wording close to the original.

### 5. How to submit a PR

1. **Fork** this repository and create a new branch.
2. Add one or more quote objects to `quotes_seed.json` (keep it valid JSON).
3. (Optional but recommended) Run:

   ```bash
   npm install
   npm run lint
   ```

4. Open a PR with a clear title, e.g. `Add quote by <Author Name>`.
5. In the PR description, include the **source link** and any extra context if helpful.

Once your PR is merged:

- A GitHub Action will run `npm run sync:quotes` to upsert your entries into Supabase.
- Your quotes should show up in the API/UI shortly after.

### 6. Questions or corrections

If you notice a misattributed quote, incorrect slug, or other issue:

- Open an issue describing the problem, or
- Submit a PR fixing the relevant object in `quotes_seed.json`.

Thank you for helping build a high‑quality library of Indian founder wisdom! 🙏
