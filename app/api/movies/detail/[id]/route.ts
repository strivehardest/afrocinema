import { NextRequest, NextResponse } from "next/server";
import { getMovieDetail, getPosterUrl, getBackdropUrl } from "@/lib/tmdb";
import { getNollywoodMovieById } from "@/lib/supabase";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { searchParams } = new URL(req.url);
  const source = searchParams.get("source") ?? "tmdb"; // "tmdb" | "nollywood"

  try {
    if (source === "nollywood") {
      const movie = await getNollywoodMovieById(id);
      if (!movie) {
        return NextResponse.json({ error: "Movie not found" }, { status: 404 });
      }
      return NextResponse.json({ movie, source: "nollywood" });
    }

    // Default: TMDB
    const tmdbId = Number(id);
    if (isNaN(tmdbId)) {
      return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 });
    }

    const detail = await getMovieDetail(tmdbId);

    // Pick the official trailer
    const trailer = detail.videos?.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube" && v.official
    ) ?? detail.videos?.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    );

    // Top 8 cast members
    const cast = detail.credits?.cast.slice(0, 8) ?? [];

    // Director
    const director = detail.credits?.crew.find((c) => c.job === "Director");

    return NextResponse.json({
      movie: {
        id: detail.id,
        title: detail.title,
        overview: detail.overview,
        posterUrl: getPosterUrl(detail.poster_path, "w500"),
        backdropUrl: getBackdropUrl(detail.backdrop_path, "w1280"),
        releaseYear: detail.release_date?.split("-")[0] ?? "N/A",
        releaseDate: detail.release_date,
        rating: Math.round(detail.vote_average * 10) / 10,
        voteCount: detail.vote_count,
        genres: detail.genres.map((g) => g.name),
        runtime: detail.runtime,
        tagline: detail.tagline,
        status: detail.status,
        cast: cast.map((c) => ({
          id: c.id,
          name: c.name,
          character: c.character,
          profileUrl: c.profile_path
            ? `https://image.tmdb.org/t/p/w185${c.profile_path}`
            : null,
        })),
        director: director
          ? { id: director.id, name: director.name }
          : null,
        trailerKey: trailer?.key ?? null,
        industry:
          detail.original_language === "hi" ? "bollywood" : "hollywood",
      },
      source: "tmdb",
    });
  } catch (error) {
    console.error("[API /movies/detail]", error);
    return NextResponse.json(
      { error: "Failed to fetch movie detail" },
      { status: 500 }
    );
  }
}