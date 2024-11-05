"use client";

import React from "react";
import { Quote, RefreshCw } from "lucide-react";
import { useRandomQuote } from "@/hooks/useRandomQuote";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function RandomQuote() {
  const { quote, isLoading, refresh } = useRandomQuote();

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur opacity-25 animate-gradient-xy"></div>
      <div className="relative bg-white rounded-xl p-8 shadow-sm border border-transparent">
        <div className="flex justify-between items-start mb-6">
          <Quote className="w-8 h-8 text-indigo-600" />
          <Button variant="ghost" onClick={refresh} disabled={isLoading}>
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
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
              <blockquote className="text-lg sm:text-xl md:text-2xl text-gray-900 mb-6 leading-relaxed">
                &quot;{quote.quote}&quot;
              </blockquote>
              <footer>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <a
                      href={`/author/${encodeURIComponent(quote.author.slug)}`}
                      className="text-base sm:text-lg font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      {quote.author.name}
                    </a>
                    <p className="text-gray-600">
                      at{" "}
                      <a
                        href={`/company/${encodeURIComponent(
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
            <div className="text-center py-12 text-gray-600">
              Loading quote...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
