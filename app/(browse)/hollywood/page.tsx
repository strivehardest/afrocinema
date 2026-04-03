import { Suspense } from "react";
import { MovieGrid } from "@/components/movie/MovieGrid";
import { MovieGridSkeleton } from "@/components/movie/Skeletons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GenreFilter } from "@/components/ui/GenreFilter";
import { Pagination } from "@/components/ui/Pagination";
import { getTrendingHollywood, tmdbToMovieCard } from "@/lib/tmdb";

interface PageProps {
  searchParams: { genre?: string; page?: string };
}

export const metadata = {
  title: "Hollywood Movies",
  description: "Browse trending and popular Hollywood movies.",
};

export default async function HollywoodPage({ searchParams }: PageProps) {
  const page = Number(searchParams.page ?? 1);
  const data = await getTrendingHollywood(page);
  const movies = data.results.map((m) => tmdbToMovieCard(m, "hollywood"));
  const totalPages = data.total_pages;

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader title="Hollywood" />

      <Suspense fallback={null}>
        <GenreFilter baseUrl="/hollywood" />
      </Suspense>

      <Suspense fallback={<MovieGridSkeleton />}>
        <MovieGrid movies={movies} />
      </Suspense>

      <Suspense fallback={null}>
        <Pagination currentPage={page} totalPages={totalPages} baseUrl="/hollywood" />
      </Suspense>
    </div>
  );
}
