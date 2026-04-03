import Image from "next/image";
import Link from "next/link";
import { Star, Play, Youtube } from "lucide-react";
import { cn, formatRating, truncate } from "@/lib/utils";
import type { MovieCard as MovieCardType } from "@/types/movie";

interface Props {
  movie: MovieCardType;
  priority?: boolean;
}

const INDUSTRY_STYLES = {
  nollywood: {
    badge: "bg-green-950 text-green-400 border-green-800",
    label: "Nollywood",
  },
  bollywood: {
    badge: "bg-orange-950 text-orange-400 border-orange-800",
    label: "Bollywood",
  },
  hollywood: {
    badge: "bg-blue-950 text-blue-400 border-blue-800",
    label: "Hollywood",
  },
};

export function MovieCard({ movie, priority = false }: Props) {
  const style = INDUSTRY_STYLES[movie.industry];
  const href =
    movie.industry === "nollywood"
      ? `/movie/${movie.id}?source=nollywood`
      : `/movie/${movie.id}?source=tmdb`;

  return (
    <Link href={href} className="group block">
      <div className="relative">
        {/* Poster */}
        <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-cinema-surface border border-cinema-border">
          {movie.posterUrl ? (
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={priority}
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Play className="w-10 h-10 text-muted-foreground" />
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Hover content */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <p className="text-xs text-white/80 leading-relaxed line-clamp-3">
              {truncate(movie.overview, 120)}
            </p>
            {/* Watch badges */}
            <div className="flex gap-1.5 mt-2 flex-wrap">
              {movie.isFreeOnYoutube && movie.youtubeUrl && (
                <span className="flex items-center gap-1 text-[10px] font-semibold bg-red-600 text-white px-2 py-0.5 rounded-full">
                  <Youtube className="w-2.5 h-2.5" /> FREE
                </span>
              )}
              {movie.netflixUrl && (
                <span className="text-[10px] font-semibold bg-[#E50914] text-white px-2 py-0.5 rounded-full">
                  NETFLIX
                </span>
              )}
            </div>
          </div>

          {/* Rating badge */}
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg">
            <Star className="w-3 h-3 fill-cinema-gold text-cinema-gold" />
            <span className="text-xs font-semibold text-white">
              {formatRating(movie.rating)}
            </span>
          </div>
        </div>

        {/* Info below poster */}
        <div className="mt-2.5 space-y-1">
          {/* Industry + year */}
          <div className="flex items-center justify-between">
            <span
              className={cn(
                "text-[10px] font-semibold px-2 py-0.5 rounded-full border",
                style.badge
              )}
            >
              {style.label}
            </span>
            <span className="text-xs text-muted-foreground">
              {movie.releaseYear}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-medium text-foreground leading-tight line-clamp-2 group-hover:text-cinema-gold transition-colors">
            {movie.title}
          </h3>

          {/* Genres */}
          {movie.genres.length > 0 && (
            <p className="text-xs text-muted-foreground truncate">
              {movie.genres.slice(0, 2).join(" · ")}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
