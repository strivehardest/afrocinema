import Image from "next/image";
import Link from "next/link";
import { Play, Star } from "lucide-react";
import { formatRating, truncate } from "@/lib/utils";
import type { MovieCard } from "@/types/movie";

export function Hero({ movie }: { movie: MovieCard }) {
  const href =
    movie.industry === "nollywood"
      ? `/movie/${movie.id}?source=nollywood`
      : `/movie/${movie.id}?source=tmdb`;

  return (
    <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden">
      {/* Backdrop image */}
      {movie.backdropUrl && (
        <Image
          src={movie.backdropUrl}
          alt={movie.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-7xl flex-col gap-4 px-4 pb-12 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-sm font-semibold text-cinema-gold">
            <Star className="h-4 w-4 fill-cinema-gold text-cinema-gold" />
            {formatRating(movie.rating)}
          </span>
          <span className="text-sm text-muted-foreground">
            {movie.releaseYear}
          </span>
          {movie.genres.slice(0, 3).map((g) => (
            <span key={g} className="genre-badge hidden sm:inline-block">
              {g}
            </span>
          ))}
        </div>

        <h1 className="max-w-2xl font-display text-4xl leading-tight tracking-wide sm:text-5xl lg:text-6xl">
          {movie.title}
        </h1>

        <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
          {truncate(movie.overview, 200)}
        </p>

        <Link
          href={href}
          className="mt-2 inline-flex w-fit items-center gap-2 rounded-lg bg-cinema-gold px-5 py-2.5 text-sm font-semibold text-cinema-dark transition-opacity hover:opacity-90"
        >
          <Play className="h-4 w-4" />
          View Details
        </Link>
      </div>
    </section>
  );
}
