/* eslint-disable @next/next/no-img-element */
import {
  getQuotesByAuthorSlug,
  getQuotesByCompanySlug,
} from "@/lib/quotes-data";
import { ImageResponse } from "@vercel/og";
import { z } from "zod";

interface EntityProfile {
  name: string;
  img: string;
  desc: string;
}

const QuerySchema = z.object({
  author: z.string().optional(),
  company: z.string().optional(),
});

export const config = {
  runtime: "edge",
};

export async function GET(request: Request) {
  try {
    // TODO: Add Font
    // const geistVF = await fetch(
    //   new URL("../../fonts/GeistVF.woff", import.meta.url)
    // ).then((res) => res.arrayBuffer());

    let entity: EntityProfile = {
      name: "John Doe",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQpZaeWxczipxrTdSIThz5hmwrRYhEeeAl5A&s",
      desc: "Collection of inspirational quotes by Indian entrepreneurs",
    };

    const { searchParams } = new URL(request.url);
    const query = Object.fromEntries(searchParams.entries());

    // Validate and parse query parameters
    const { author: authorQuery, company: companyQuery } =
      QuerySchema.parse(query);

    if (authorQuery) {
      const quotes = getQuotesByAuthorSlug(authorQuery);
      if (quotes.length === 0) {
        throw new Error("Author not found");
      }
      const author = quotes[0].author;
      entity = {
        name: author.name,
        img: author.img || entity.img,
        desc: "Collection of inspirational quotes by",
      };
    }

    if (companyQuery) {
      const quotes = getQuotesByCompanySlug(companyQuery);
      if (quotes.length === 0) {
        throw new Error("Company not found");
      }
      const company = quotes[0].author.company;
      const hostname = company.url ? new URL(company.url).hostname : "";
      entity = {
        name: company.name,
        img: hostname ? `https://logo.clearbit.com/${hostname}` : entity.img,
        desc: "Inspirational quotes from entrepreneurs at",
      };
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#000",
            padding: "2rem",
            backgroundImage:
              "linear-gradient(to right, #111827 1px, transparent 1px),linear-gradient(to bottom, #111827 1px, transparent 1px)",
            backgroundSize: "8px 8px",
            color: "#fff",
            fontFamily: "Geist",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
              <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
            </svg>
            <div
              style={{
                marginLeft: "0.5rem",
                fontSize: "1.5rem",
                fontWeight: "600",
              }}
            >
              Indian Quotes API
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: "2.5rem", fontWeight: "500" }}>
                {entity.desc}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "1rem",
                  gap: "1rem",
                }}
              >
                <img
                  src={entity.img}
                  alt={entity.name + " photo"}
                  width={80}
                  height={80}
                  style={{ borderRadius: "100%" }}
                />
                <div style={{ fontSize: "5rem", fontWeight: "600" }}>
                  {entity.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        // fonts: [
        //   {
        //     name: "Geist",
        //     data: geistVF,
        //     style: "normal",
        //   },
        // ],
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
