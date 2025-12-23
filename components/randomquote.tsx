"use client";

import React from "react";
import { Quote, RefreshCw } from "lucide-react";

import { useRandomQuote } from "@/hooks/useRandomQuote";
import { ROUTES } from "@/lib/routes";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function RandomQuote() {
  const { quote, isLoading, refresh } = useRandomQuote();

  return (
    <div className="relative">
      <div className="absolute -inset-1 animate-gradient-xy rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-25 blur"></div>
      <div className="relative rounded-xl border border-transparent bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-start justify-between">
          <Quote className="h-8 w-8 text-indigo-600" />
          <Button variant="ghost" onClick={refresh} disabled={isLoading}>
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
            New Quote
          </Button>
        </div>

        <div
          className={`transition-opacity duration-200 ${
            isLoading ? "opacity-50" : "opacity-100"
          }`}
        >
          {quote ? (
            <>
              <blockquote className="mb-6 text-lg leading-relaxed text-gray-900 sm:text-xl md:text-2xl">
                &quot;{quote.quote}&quot;
              </blockquote>
              <footer>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <a
                      href={`${ROUTES.AUTHOR}/${encodeURIComponent(
                        quote.author.slug
                      )}`}
                      className="text-base font-medium text-indigo-600 hover:text-indigo-700 sm:text-lg"
                    >
                      {quote.author.name}
                    </a>
                    <p className="text-gray-600">
                      at{" "}
                      <a
                        href={`${ROUTES.COMPANY}/${encodeURIComponent(
                          quote.author.company.slug
                        )}`}
                        className="text-gray-900 hover:text-indigo-600"
                      >
                        {quote.author.company.name}
                      </a>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quote.tags?.map((tag: string) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </div>
              </footer>
            </>
          ) : (
            <div className="py-12 text-center text-gray-600">
              Loading quote...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
