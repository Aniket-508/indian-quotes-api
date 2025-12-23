import fs from "fs";
import path from "path";
import { supabase } from "../lib/supabase";
import type { Author, Company } from "../types/quote";

type SeedCompany = Pick<Company, "name" | "url" | "slug">;

type SeedAuthor = Pick<Author, "name" | "img" | "url" | "slug"> & {
  company: SeedCompany;
};

type SeedQuote = {
  quote: string;
  tags?: string[];
  author: SeedAuthor;
};

async function main() {
  const seedPath = path.resolve(process.cwd(), "quotes_seed.json");
  const raw = fs.readFileSync(seedPath, "utf-8");
  const data = JSON.parse(raw) as SeedQuote[];

  console.log(`Syncing ${data.length} quotes to Supabase...`);

  for (const item of data) {
    const { author, quote, tags = [] } = item;

    // Upsert company based on slug
    const { data: companyRow, error: companyError } = await supabase
      .from("company")
      .upsert(
        {
          name: author.company.name,
          url: author.company.url ?? null,
          slug: author.company.slug,
        },
        {
          onConflict: "slug",
        }
      )
      .select()
      .single();

    if (companyError) {
      console.error(
        "Failed to upsert company",
        author.company.slug,
        companyError
      );
      process.exitCode = 1;
      continue;
    }

    // Upsert author based on slug
    const { data: authorRow, error: authorError } = await supabase
      .from("author")
      .upsert(
        {
          name: author.name,
          img: author.img ?? null,
          url: author.url ?? null,
          slug: author.slug,
          company_id: companyRow.id,
        },
        {
          onConflict: "slug",
        }
      )
      .select()
      .single();

    if (authorError) {
      console.error("Failed to upsert author", author.slug, authorError);
      process.exitCode = 1;
      continue;
    }

    // Upsert quote based on quote text + author_id
    const { error: quoteError } = await supabase.from("quotes").upsert(
      {
        quote,
        tags,
        author_id: authorRow.id,
      },
      {
        onConflict: "quote,author_id",
      }
    );

    if (quoteError) {
      console.error(
        "Failed to upsert quote for author",
        author.slug,
        quoteError
      );
      process.exitCode = 1;
      continue;
    }

    console.log(`Synced quote for ${author.name}`);
  }

  console.log("Done syncing quotes.");
}

main().catch((err) => {
  console.error("Unexpected error while syncing quotes", err);
  process.exit(1);
});
