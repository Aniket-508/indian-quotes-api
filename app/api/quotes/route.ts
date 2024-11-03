import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { ratelimit } from "@/lib/rate-limit";
import { z } from "zod";

export const runtime = "edge";

const QuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  author: z.string().optional(),
  company: z.string().optional(),
  tags: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = Object.fromEntries(searchParams.entries());

    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    if (!success) {
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      });
    }

    // Validate and parse query parameters
    const {
      page,
      limit: pageLimit,
      author,
      company,
      tags,
    } = QuerySchema.parse(query);

    let quotesQuery = supabase.from("quotes").select("*", { count: "exact" });

    // Apply filters if provided
    if (author) quotesQuery = quotesQuery.ilike("author", `%${author}%`);
    if (company) quotesQuery = quotesQuery.ilike("company", `%${company}%`);
    if (tags) quotesQuery = quotesQuery.contains("tags", [tags]);

    // Apply pagination
    const from = (page - 1) * pageLimit;
    const to = from + pageLimit - 1;

    const { data, error, count } = await quotesQuery
      .range(from, to)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(
      {
        data,
        pagination: {
          page,
          pageSize: pageLimit,
          totalPages: Math.ceil((count ?? 0) / pageLimit),
          totalItems: count,
        },
      },
      {
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
