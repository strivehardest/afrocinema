import { MovieCard } from "@/components/movie/MovieCard";
import type { MovieCard as MovieCardType } from "@/types/movie";

export function MovieGrid({ movies }: { movies: MovieCardType[] }) {
  if (movies.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No movies found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard key={`${movie.industry}-${movie.id}`} movie={movie} />
      ))}
    </div>
  );
}
