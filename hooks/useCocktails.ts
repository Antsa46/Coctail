import { useState } from "react";
import Constants from "expo-constants";
import type { CocktailResponse, Drink } from "../types/coctailTypes";
import { useFetch } from "./useFetch";

export function useCocktails(initialQuery = "margarita") {
  const [query, setQuery] = useState<string>(initialQuery);

  const base =
    ((Constants as any).expoConfig?.extra as any)
      ?.API_BASE_URL as string | undefined;

  const buildUrl = (term: string) =>
    base
      ? `${base.replace(/\/$/, "")}/search.php?s=${encodeURIComponent(term)}`
      : null;

  const { data, loading, error } = useFetch<CocktailResponse | null>(
    buildUrl(query)
  );

  const rawDrinks = (data as CocktailResponse | null)?.drinks ?? null;

  const drinks: Drink[] | null = Array.isArray(rawDrinks)
    ? (rawDrinks as Drink[]).filter(Boolean)
    : null;

  return {
    drinks,
    query,
    setQuery,
    error,
    loading,
  } as const;
}
