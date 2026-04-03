"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Loader2 } from "lucide-react";
import { MovieGrid } from "@/components/movie/MovieGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { MovieCard } from "@/types/movie";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MovieCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 2) return;
    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch(`/api/movies/search?q=${encodeURIComponent(q.trim())}`);
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setResults(data.results ?? []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce search as user types
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }

    const timer = setTimeout(() => search(query), 400);
    return () => clearTimeout(timer);
  }, [query, search]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader title="Search Movies" />

      {/* Search input */}
      <div className="relative mb-8 max-w-xl">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Nollywood, Bollywood, Hollywood..."
          autoFocus
          className="w-full rounded-lg border border-cinema-border bg-cinema-surface py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-cinema-gold focus:outline-none focus:ring-1 focus:ring-cinema-gold"
        />
      </div>

      {/* Results */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-cinema-gold" />
        </div>
      )}

      {!loading && results.length > 0 && (
        <div>
          <p className="mb-4 text-sm text-muted-foreground">
            {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
          <MovieGrid movies={results} />
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">
          <p className="text-lg">No movies found for &ldquo;{query}&rdquo;</p>
          <p className="mt-1 text-sm">Try a different search term.</p>
        </div>
      )}

      {!searched && !loading && (
        <div className="py-20 text-center text-muted-foreground">
          <p className="text-lg">Find your favorite movies</p>
          <p className="mt-1 text-sm">
            Search across Nollywood, Bollywood, and Hollywood.
          </p>
        </div>
      )}
    </div>
  );
}
