import type {
  TMDBMovie,
  TMDBMovieDetail,
  TMDBResponse,
  TMDBGenre,
  MovieCard,
} from "@/types/movie";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

// ─── Image URL Helpers ────────────────────────────────────────────────────────
export function getPosterUrl(
  path: string | null,
  size: "w185" | "w342" | "w500" | "w780" | "original" = "w500"
): string {
  if (!path) return "/images/no-poster.png";
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function getBackdropUrl(
  path: string | null,
  size: "w300" | "w780" | "w1280" | "original" = "w1280"
): string {
  if (!path) return "/images/no-backdrop.png";
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function getProfileUrl(
  path: string | null,
  size: "w45" | "w185" | "h632" | "original" = "w185"
): string {
  if (!path) return "/images/no-profile.png";
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

// ─── Fetch Helper ─────────────────────────────────────────────────────────────
async function tmdbFetch<T>(
  endpoint: string,
  params: Record<string, string | number> = {}
): Promise<T> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error("TMDB_API_KEY is not set");

  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("language", "en-US");

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 }, // Cache for 1 hour (ISR)
  });

  if (!res.ok) {
    throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// ─── Hollywood (English) ──────────────────────────────────────────────────────
export async function getTrendingHollywood(
  page = 1
): Promise<TMDBResponse<TMDBMovie>> {
  return tmdbFetch<TMDBResponse<TMDBMovie>>("/discover/movie", {
    with_original_language: "en",
    sort_by: "popularity.desc",
    "vote_count.gte": 100,
    page,
  });
}

export async function getPopularHollywood(
  page = 1
): Promise<TMDBResponse<TMDBMovie>> {
  return tmdbFetch<TMDBResponse<TMDBMovie>>("/movie/popular", { page });
}

export async function getTopRatedHollywood(
  page = 1
): Promise<TMDBResponse<TMDBMovie>> {
  return tmdbFetch<TMDBResponse<TMDBMovie>>("/movie/top_rated", { page });
}

// ─── Bollywood (Hindi) ────────────────────────────────────────────────────────
export async function getTrendingBollywood(
  page = 1
): Promise<TMDBResponse<TMDBMovie>> {
  return tmdbFetch<TMDBResponse<TMDBMovie>>("/discover/movie", {
    with_original_language: "hi",
    sort_by: "popularity.desc",
    "vote_count.gte": 50,
    page,
  });
}

export async function getTopRatedBollywood(
  page = 1
): Promise<TMDBResponse<TMDBMovie>> {
  return tmdbFetch<TMDBResponse<TMDBMovie>>("/discover/movie", {
    with_original_language: "hi",
    sort_by: "vote_average.desc",
    "vote_count.gte": 200,
    page,
  });
}

// ─── Movie Detail ─────────────────────────────────────────────────────────────
export async function getMovieDetail(tmdbId: number): Promise<TMDBMovieDetail> {
  return tmdbFetch<TMDBMovieDetail>(`/movie/${tmdbId}`, {
    append_to_response: "credits,videos",
  });
}

// ─── Search ───────────────────────────────────────────────────────────────────
export async function searchTMDB(
  query: string,
  page = 1
): Promise<TMDBResponse<TMDBMovie>> {
  return tmdbFetch<TMDBResponse<TMDBMovie>>("/search/movie", { query, page });
}

// ─── Genres ───────────────────────────────────────────────────────────────────
export async function getGenres(): Promise<{ genres: TMDBGenre[] }> {
  return tmdbFetch<{ genres: TMDBGenre[] }>("/genre/movie/list");
}

export const GENRE_MAP: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

// ─── Normalizer: TMDB → MovieCard ─────────────────────────────────────────────
export function tmdbToMovieCard(
  movie: TMDBMovie,
  industry: "hollywood" | "bollywood"
): MovieCard {
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    posterUrl: getPosterUrl(movie.poster_path),
    backdropUrl: getBackdropUrl(movie.backdrop_path),
    releaseYear: movie.release_date?.split("-")[0] ?? "N/A",
    rating: Math.round(movie.vote_average * 10) / 10,
    genres: movie.genre_ids.map((id) => GENRE_MAP[id]).filter(Boolean),
    industry,
    tmdbId: movie.id,
  };
}
