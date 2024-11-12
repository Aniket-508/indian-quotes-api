import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { ratelimit } from "@/lib/rate-limit";
import { z } from "zod";

export const runtime = "edge";

const QuerySchema = z
  .object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
    author: z.string().optional(),
    company: z.string().optional(),
    tags: z.string().optional(),
  })
  .strict();

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
    const validationResult = QuerySchema.safeParse(query);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid query parameters",
          details: validationResult.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    const {
      page,
      limit: pageLimit,
      author,
      company,
      tags,
    } = validationResult.data;

    let quotesQuery = supabase.from("quotes").select(
      `*,
        author!inner(*, company!inner (*))`,
      { count: "exact" }
    );

    // Apply filters if provided
    if (author) quotesQuery = quotesQuery.ilike("author.name", `%${author}%`);
    if (company)
      quotesQuery = quotesQuery.ilike("author.company.name", `%${company}%`);
    if (tags) quotesQuery = quotesQuery.contains("tags", [tags]);

    // First get the total count
    const { count, error: countError } = await quotesQuery;

    if (countError) throw countError;

    const totalPages = Math.ceil((count ?? 0) / pageLimit);

    // Check if requested page exists
    if (page > totalPages) {
      return NextResponse.json(
        {
          error: "Page not found",
          details: {
            currentPage: page,
            totalPages,
            totalItems: count,
          },
        },
        { status: 404 }
      );
    }

    // Apply pagination
    const from = (page - 1) * pageLimit;
    const to = from + pageLimit - 1;

    const { data, error } = await quotesQuery
      .range(from, to)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(
      {
        data,
        pagination: {
          page,
          pageSize: pageLimit,
          totalPages,
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
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
