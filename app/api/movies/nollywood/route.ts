import { NextRequest, NextResponse } from "next/server";
import { getNollywoodMovies, nollywoodToMovieCard } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const genre = searchParams.get("genre") ?? undefined;
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 20);
  const sortBy = (searchParams.get("sortBy") as "rating" | "release_year" | "created_at") ?? "created_at";

  try {
    const { data, count } = await getNollywoodMovies({ genre, page, limit, sortBy });

    return NextResponse.json({
      movies: data.map(nollywoodToMovieCard),
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error("[API /movies/nollywood]", error);
    return NextResponse.json(
      { error: "Failed to fetch Nollywood movies" },
      { status: 500 }
    );
  }
}