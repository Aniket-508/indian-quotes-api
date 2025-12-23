import type { Quote } from "@/types/quote";
import { useCallback, useEffect, useState } from "react";

import { API_ROUTES } from "@/lib/routes";

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
