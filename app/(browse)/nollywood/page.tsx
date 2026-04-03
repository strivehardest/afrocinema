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

  const { data, count } = await getNollywoodMovies({ genre, page, limit, sortBy: "rating" });
  const movies = data.map(nollywoodToMovieCard);
  const totalPages = Math.ceil(count / limit);

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