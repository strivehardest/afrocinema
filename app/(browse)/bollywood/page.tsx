import { Suspense } from "react";
import { MovieGrid } from "@/components/movie/MovieGrid";
import { MovieGridSkeleton } from "@/components/movie/Skeletons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GenreFilter } from "@/components/ui/GenreFilter";
import { Pagination } from "@/components/ui/Pagination";
import { getTrendingBollywood, tmdbToMovieCard } from "@/lib/tmdb";

interface PageProps {
  searchParams: { genre?: string; page?: string };
}

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Bollywood Movies",
  description: "Browse trending and popular Bollywood movies.",
};

export default async function BollywoodPage({ searchParams }: PageProps) {
  const page = Number(searchParams.page ?? 1);

  let movies: ReturnType<typeof tmdbToMovieCard>[] = [];
  let totalPages = 1;

  try {
    const data = await getTrendingBollywood(page);
    movies = data.results.map((m) => tmdbToMovieCard(m, "bollywood"));
    totalPages = data.total_pages;
  } catch (e) {
    console.error("[BollywoodPage] Failed to fetch movies:", e);
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader title="Bollywood" />

      <Suspense fallback={null}>
        <GenreFilter baseUrl="/bollywood" />
      </Suspense>

      <Suspense fallback={<MovieGridSkeleton />}>
        <MovieGrid movies={movies} />
      </Suspense>

      <Suspense fallback={null}>
        <Pagination currentPage={page} totalPages={totalPages} baseUrl="/bollywood" />
      </Suspense>
    </div>
  );
}
