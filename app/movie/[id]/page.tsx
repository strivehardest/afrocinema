import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Star, Clock, Calendar, ChevronLeft,
  Youtube, Play, ExternalLink, Film, User, Tv
} from "lucide-react";
import {
  getMovieDetail,
  getPosterUrl,
  getBackdropUrl,
  getProfileUrl,
} from "@/lib/tmdb";
import { getNollywoodMovieById } from "@/lib/supabase";
import { TrailerPlayer } from "@/components/movie/TrailerPlayer";
import { formatRating, formatRuntime, getYouTubeId } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { id: string };
  searchParams: { source?: string; industry?: string };
}

// ─── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const source = searchParams.source ?? searchParams.industry ?? "tmdb";

  if (source === "nollywood") {
    const movie = await getNollywoodMovieById(params.id);
    if (!movie) return { title: "Movie Not Found" };
    return {
      title: movie.title,
      description: movie.overview,
      openGraph: { images: movie.poster_url ? [movie.poster_url] : [] },
    };
  }

  const tmdbId = Number(params.id);
  if (!Number.isFinite(tmdbId) || tmdbId <= 0) return { title: "Movie Not Found" };

  try {
    const movie = await getMovieDetail(tmdbId);
    return {
      title: movie.title,
      description: movie.overview,
      openGraph: {
        images: movie.poster_path
          ? [`https://image.tmdb.org/t/p/w780${movie.poster_path}`]
          : [],
      },
    };
  } catch {
    return { title: "Movie Not Found" };
  }
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function MovieDetailPage({ params, searchParams }: PageProps) {
  const source = searchParams.source ?? searchParams.industry ?? "tmdb";

  // ─── Nollywood (Supabase) ─────────────────────────────────────────────────
  if (source === "nollywood") {
    const movie = await getNollywoodMovieById(params.id);
    if (!movie) notFound();

    const youtubeId = movie.youtube_url ? getYouTubeId(movie.youtube_url) : null;
    const hasTrailer = youtubeId !== null;

    return (
      <main className="min-h-screen">
        {/* Backdrop */}
        <div className="relative w-full h-[55vh] min-h-[400px]">
          {movie.backdrop_url ? (
            <Image src={movie.backdrop_url} alt={movie.title} fill priority className="object-cover" unoptimized />
          ) : movie.poster_url ? (
            <Image src={movie.poster_url} alt={movie.title} fill priority className="object-cover blur-sm scale-105" unoptimized />
          ) : (
            <div className="w-full h-full bg-cinema-surface" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-cinema-dark/50 to-cinema-dark/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-dark/90 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-52 relative z-10 pb-20">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="shrink-0 w-48 sm:w-56 mx-auto md:mx-0">
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-cinema-border">
                {movie.poster_url ? (
                  <Image src={movie.poster_url} alt={movie.title} fill className="object-cover" sizes="224px" unoptimized />
                ) : (
                  <div className="w-full h-full bg-cinema-surface flex items-center justify-center text-muted-foreground">No Poster</div>
                )}
              </div>
              {/* Streaming badges under poster */}
              <div className="mt-3 flex flex-col gap-2">
                {movie.netflix_url && (
                  <a href={movie.netflix_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#E50914] hover:bg-red-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm w-full">
                    <Play className="w-3.5 h-3.5 fill-white" /> Watch on Netflix
                  </a>
                )}
                {movie.youtube_url && (
                  <a href={movie.youtube_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm w-full">
                    <Youtube className="w-3.5 h-3.5" />
                    {movie.is_free_on_youtube ? "Watch Free on YouTube" : "Trailer on YouTube"}
                  </a>
                )}
                {!movie.netflix_url && !movie.youtube_url && (
                  <div className="flex items-center justify-center gap-2 border border-cinema-border text-muted-foreground px-4 py-2.5 rounded-xl text-xs text-center">
                    Not streaming yet
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 pt-2 md:pt-20">
              <Link href="/nollywood" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
                <ChevronLeft className="w-4 h-4" /> Nollywood
              </Link>

              <div className="mb-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-950 text-green-400 border border-green-800">
                  Nollywood
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl text-foreground mb-2 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                {movie.title}
              </h1>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-5">
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-cinema-gold text-cinema-gold" />
                  <span className="text-cinema-gold font-bold text-base">{formatRating(movie.rating)}</span>
                  <span className="text-xs">/10</span>
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{movie.release_year}</span>
                {movie.runtime_minutes && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{formatRuntime(movie.runtime_minutes)}</span>
                  </>
                )}
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-5">
                {movie.genres.map((g) => (
                  <span key={g} className="text-xs px-3 py-1 rounded-full border border-cinema-border text-muted-foreground hover:border-foreground/40 transition-colors">
                    {g}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl text-base">{movie.overview}</p>

              {/* Details grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 p-4 bg-cinema-surface border border-cinema-border rounded-2xl">
                {movie.director && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Director</p>
                    <p className="text-sm text-foreground font-medium">{movie.director}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Released</p>
                  <p className="text-sm text-foreground font-medium">{movie.release_year}</p>
                </div>
                {movie.runtime_minutes && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Runtime</p>
                    <p className="text-sm text-foreground font-medium">{formatRuntime(movie.runtime_minutes)}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Industry</p>
                  <p className="text-sm text-green-400 font-medium">Nollywood</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Language</p>
                  <p className="text-sm text-foreground font-medium">English</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Streaming</p>
                  <p className="text-sm font-medium">
                    {movie.netflix_url && <span className="text-red-400">Netflix</span>}
                    {movie.netflix_url && movie.youtube_url && <span className="text-muted-foreground"> · </span>}
                    {movie.youtube_url && <span className="text-red-500">YouTube</span>}
                    {!movie.netflix_url && !movie.youtube_url && <span className="text-muted-foreground">N/A</span>}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── YouTube Trailer ──────────────────────────────────────── */}
          {hasTrailer && youtubeId && (
            <div className="mt-14">
              <h2 className="text-2xl text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>
                {movie.is_free_on_youtube ? "WATCH FULL MOVIE" : "TRAILER"}
              </h2>
              <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden border border-cinema-border">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                  title={`${movie.title} ${movie.is_free_on_youtube ? "Full Movie" : "Trailer"}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          )}

          {/* ── Cast ─────────────────────────────────────────────────── */}
          {movie.cast_members?.length > 0 && (
            <div className="mt-14">
              <h2 className="text-2xl text-foreground mb-5" style={{ fontFamily: "var(--font-display)" }}>
                CAST & CREW
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {/* Director card */}
                {movie.director && (
                  <div className="bg-cinema-surface border border-cinema-gold/30 rounded-xl p-3 flex flex-col items-center text-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-cinema-gold/20 border-2 border-cinema-gold/40 flex items-center justify-center">
                      <Film className="w-5 h-5 text-cinema-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground leading-tight">{movie.director}</p>
                      <p className="text-xs text-cinema-gold mt-0.5">Director</p>
                    </div>
                  </div>
                )}
                {/* Cast members */}
                {movie.cast_members.map((name) => (
                    <div key={name} className="bg-cinema-surface border border-cinema-border rounded-xl p-3 flex flex-col items-center text-center gap-2 hover:border-foreground/20 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-foreground/10 border-2 border-cinema-border flex items-center justify-center">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <p className="text-xs font-medium text-foreground leading-tight">{name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── More Like This ───────────────────────────────────────── */}
          <div className="mt-14">
            <h2 className="text-2xl text-foreground mb-5" style={{ fontFamily: "var(--font-display)" }}>
              FIND MORE NOLLYWOOD
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/nollywood"
                className="flex items-center gap-3 bg-cinema-surface border border-cinema-border hover:border-green-800 rounded-xl p-4 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-green-950 border border-green-800 flex items-center justify-center shrink-0">
                  <Tv className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-green-400 transition-colors">Browse Nollywood</p>
                  <p className="text-xs text-muted-foreground">All Nigerian movies</p>
                </div>
              </Link>
              {movie.netflix_url && (
                <a href="https://www.netflix.com/browse/genre/1077508" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-cinema-surface border border-cinema-border hover:border-red-900 rounded-xl p-4 transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-red-950 border border-red-900 flex items-center justify-center shrink-0">
                    <Play className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-red-400 transition-colors">Nollywood on Netflix</p>
                    <p className="text-xs text-muted-foreground">Stream Nigerian films</p>
                  </div>
                </a>
              )}
              <a href="https://www.youtube.com/results?search_query=nollywood+full+movies" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 bg-cinema-surface border border-cinema-border hover:border-red-800 rounded-xl p-4 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-red-950 border border-red-800 flex items-center justify-center shrink-0">
                  <Youtube className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-red-400 transition-colors">Free on YouTube</p>
                  <p className="text-xs text-muted-foreground">Watch Nollywood free</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ─── TMDB (Hollywood / Bollywood) ─────────────────────────────────────────
  const tmdbId = Number(params.id);
  if (isNaN(tmdbId)) notFound();

  const movie = await getMovieDetail(tmdbId).catch(() => null);
  if (!movie) notFound();

  const industry = movie.original_language === "hi" ? "bollywood" : "hollywood";
  const backHref = industry === "bollywood" ? "/bollywood" : "/hollywood";
  const industryLabel = industry === "bollywood" ? "Bollywood" : "Hollywood";
  const industryStyle = industry === "bollywood"
    ? "bg-orange-950 text-orange-400 border-orange-800"
    : "bg-blue-950 text-blue-400 border-blue-800";

  const trailer = movie.videos?.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube" && v.official
  ) ?? movie.videos?.results.find((v) => v.type === "Trailer" && v.site === "YouTube");

  const cast = movie.credits?.cast.slice(0, 10) ?? [];
  const director = movie.credits?.crew.find((c) => c.job === "Director");

  return (
    <main className="min-h-screen">
      {/* Backdrop */}
      <div className="relative w-full h-[55vh] min-h-[400px]">
        {movie.backdrop_path && (
          <Image src={getBackdropUrl(movie.backdrop_path, "w1280")} alt={movie.title} fill priority className="object-cover" unoptimized />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-cinema-dark/40 to-cinema-dark/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-cinema-dark/90 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-52 relative z-10 pb-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="shrink-0 w-48 sm:w-56 mx-auto md:mx-0">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-cinema-border">
              {movie.poster_path ? (
                <Image src={getPosterUrl(movie.poster_path, "w500")} alt={movie.title} fill className="object-cover" sizes="224px" unoptimized />
              ) : (
                <div className="w-full h-full bg-cinema-surface flex items-center justify-center">
                  <Film className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 pt-2 md:pt-20">
            <Link href={backHref} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ChevronLeft className="w-4 h-4" /> {industryLabel}
            </Link>

            <div className="mb-3">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${industryStyle}`}>
                {industryLabel}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl text-foreground mb-1 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-cinema-gold italic text-sm mb-4">&ldquo;{movie.tagline}&rdquo;</p>
            )}

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-5">
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-cinema-gold text-cinema-gold" />
                <span className="text-cinema-gold font-bold text-base">{formatRating(movie.vote_average)}</span>
                <span className="text-xs">({movie.vote_count.toLocaleString()})</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{movie.release_date?.split("-")[0]}</span>
              {movie.runtime && (
                <>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{formatRuntime(movie.runtime)}</span>
                </>
              )}
              {director && (
                <>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <span>Dir. {director.name}</span>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {movie.genres.map((g) => (
                <span key={g.id} className="text-xs px-3 py-1 rounded-full border border-cinema-border text-muted-foreground">{g.name}</span>
              ))}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">{movie.overview}</p>

            <div className="flex flex-wrap gap-3">
              {trailer && <TrailerPlayer videoKey={trailer.key} title={movie.title} />}
              <a href={`https://www.justwatch.com/us/search?q=${encodeURIComponent(movie.title)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 border border-cinema-border hover:border-foreground/40 text-foreground/80 hover:text-foreground font-semibold px-5 py-3 rounded-xl transition-all text-sm">
                <ExternalLink className="w-4 h-4" /> Where to Watch
              </a>
            </div>
          </div>
        </div>

        {/* Trailer embed */}
        {trailer && (
          <div className="mt-14">
            <h2 className="text-2xl text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>TRAILER</h2>
            <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden border border-cinema-border">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?rel=0&modestbranding=1`}
                title={`${movie.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        )}

        {/* Cast */}
        {cast.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl text-foreground mb-5" style={{ fontFamily: "var(--font-display)" }}>CAST</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {cast.map((member) => (
                <div key={member.id} className="flex flex-col items-center text-center gap-2">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-cinema-border bg-cinema-surface shrink-0">
                    {member.profile_path ? (
                      <Image src={getProfileUrl(member.profile_path)} alt={member.name} fill className="object-cover" sizes="64px" unoptimized />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground font-bold">{member.name[0]}</div>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground leading-tight">{member.name}</p>
                    <p className="text-xs text-muted-foreground leading-tight mt-0.5 line-clamp-1">{member.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
