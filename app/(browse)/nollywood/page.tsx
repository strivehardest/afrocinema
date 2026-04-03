import { Suspense } from "react";
import { getNollywoodMovies, nollywoodToMovieCard } from "@/lib/supabase";
import { MovieGrid } from "@/components/movie/MovieGrid";
import { MovieGridSkeleton } from "@/components/movie/Skeletons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GenreFilter } from "@/components/ui/GenreFilter";
import { Pagination } from "@/components/ui/Pagination";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nollywood Movies",
  description: "Browse the best Nollywood movies. Find where to watch on Netflix or free on YouTube.",
};

export const dynamic = "force-dynamic";

interface Props {
  searchParams: { genre?: string; page?: string };
}

export default async function NollywoodPage({ searchParams }: Props) {
  const genre = searchParams.genre;
  const page = Number(searchParams.page ?? 1);
  const limit = 20;

  let movies: ReturnType<typeof nollywoodToMovieCard>[] = [];
  let count = 0;
  let totalPages = 0;
  let error = false;

  try {
    const result = await getNollywoodMovies({ genre, page, limit, sortBy: "rating" });
    movies = result.data.map(nollywoodToMovieCard);
    count = result.count;
    totalPages = Math.ceil(count / limit);
  } catch (e) {
    console.error("[NollywoodPage] Failed to fetch movies:", e);
    error = true;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <SectionHeader title="Nollywood" />
        <div className="text-center py-24 text-muted-foreground">
          <p className="text-lg mb-2">Unable to load movies right now.</p>
          <p className="text-sm">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <SectionHeader title="Nollywood" />
        <p className="text-muted-foreground text-sm -mt-2 mb-6">
          {count} movies · Watch on Netflix or free on YouTube
        </p>
        <Suspense>
          <GenreFilter baseUrl="/nollywood" />
        </Suspense>
      </div>

      <Suspense fallback={<MovieGridSkeleton count={20} />}>
        {movies.length > 0 ? (
          <MovieGrid movies={movies} />
        ) : (
          <div className="text-center py-24 text-muted-foreground">
            No movies found{genre ? ` in "${genre}"` : ""}. More coming soon!
          </div>
        )}
      </Suspense>

      <Suspense>
        <Pagination currentPage={page} totalPages={totalPages} baseUrl="/nollywood" />
      </Suspense>
    </div>
  );
}