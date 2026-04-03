import { NextRequest, NextResponse } from "next/server";
import {
  getTrendingHollywood,
  getTrendingBollywood,
  tmdbToMovieCard,
} from "@/lib/tmdb";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const industry = searchParams.get("industry") ?? "all";
  const page = Number(searchParams.get("page") ?? 1);

  try {
    if (industry === "hollywood") {
      const data = await getTrendingHollywood(page);
      return NextResponse.json({
        movies: data.results.map((m) => tmdbToMovieCard(m, "hollywood")),
        totalPages: data.total_pages,
        page: data.page,
      });
    }

    if (industry === "bollywood") {
      const data = await getTrendingBollywood(page);
      return NextResponse.json({
        movies: data.results.map((m) => tmdbToMovieCard(m, "bollywood")),
        totalPages: data.total_pages,
        page: data.page,
      });
    }

    // "all" — fetch both in parallel
    const [hollywood, bollywood] = await Promise.all([
      getTrendingHollywood(1),
      getTrendingBollywood(1),
    ]);

    return NextResponse.json({
      hollywood: hollywood.results
        .slice(0, 10)
        .map((m) => tmdbToMovieCard(m, "hollywood")),
      bollywood: bollywood.results
        .slice(0, 10)
        .map((m) => tmdbToMovieCard(m, "bollywood")),
    });
  } catch (error) {
    console.error("[API /movies/trending]", error);
    return NextResponse.json(
      { error: "Failed to fetch trending movies" },
      { status: 500 }
    );
  }
}