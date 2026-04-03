import { NextRequest, NextResponse } from "next/server";
import { searchTMDB, tmdbToMovieCard } from "@/lib/tmdb";
import { searchNollywood, nollywoodToMovieCard } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim();
  const page = Number(searchParams.get("page") ?? 1);

  if (!query || query.length < 2) {
    return NextResponse.json(
      { error: "Query must be at least 2 characters" },
      { status: 400 }
    );
  }

  try {
    // Run TMDB + Supabase searches in parallel
    const [tmdbResults, nollywoodResults] = await Promise.allSettled([
      searchTMDB(query, page),
      searchNollywood(query),
    ]);

    const tmdbMovies =
      tmdbResults.status === "fulfilled"
        ? tmdbResults.value.results.map((m) => {
            // Determine industry by original language
            const industry =
              m.original_language === "hi" ? "bollywood" : "hollywood";
            return tmdbToMovieCard(m, industry);
          })
        : [];

    const nollywoodMovies =
      nollywoodResults.status === "fulfilled"
        ? nollywoodResults.value.map(nollywoodToMovieCard)
        : [];

    const allResults = [...nollywoodMovies, ...tmdbMovies];

    return NextResponse.json({
      results: allResults,
      total: allResults.length,
      query,
      page,
    });
  } catch (error) {
    console.error("[API /movies/search]", error);
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}