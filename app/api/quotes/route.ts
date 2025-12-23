import { NextResponse } from "next/server";
import { ratelimit } from "@/lib/rate-limit";
import { getAllQuotes, paginateQuotes } from "@/lib/quotes-data";
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

    // Get filtered quotes
    const filteredQuotes = getAllQuotes({ author, company, tags });

    // Paginate
    const paginated = paginateQuotes(filteredQuotes, page, pageLimit);

    // Check if requested page exists
    if (page > paginated.totalPages && paginated.totalPages > 0) {
      return NextResponse.json(
        {
          error: "Page not found",
          details: {
            currentPage: page,
            totalPages: paginated.totalPages,
            totalItems: paginated.total,
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: paginated.data,
        pagination: {
          page: paginated.page,
          pageSize: paginated.pageSize,
          totalPages: paginated.totalPages,
          totalItems: paginated.total,
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
