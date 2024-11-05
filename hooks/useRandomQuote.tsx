import { useState, useEffect, useCallback } from "react";
import { API_ROUTES } from "@/lib/routes";
import { Quote } from "@/types/quote";

export function useRandomQuote() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchQuote = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api${API_ROUTES.QUOTES}${API_ROUTES.RANDOM}`
      );
      const data = await response.json();
      setQuote(data);
    } catch (error) {
      console.error("Error fetching random quote:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(() => {
    fetchQuote();
  }, [fetchQuote]);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return { quote, isLoading, refresh };
}
