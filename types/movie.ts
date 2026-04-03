// ─── Industry ───────────────────────────────────────────────────────────────
export type Industry = "nollywood" | "bollywood" | "hollywood";

// ─── TMDB Types ──────────────────────────────────────────────────────────────
export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  original_language: string;
  popularity: number;
  adult: boolean;
}

export interface TMDBMovieDetail extends TMDBMovie {
  genres: { id: number; name: string }[];
  runtime: number | null;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  production_countries: { iso_3166_1: string; name: string }[];
  spoken_languages: { iso_639_1: string; name: string }[];
  credits?: {
    cast: TMDBCastMember[];
    crew: TMDBCrewMember[];
  };
  videos?: {
    results: TMDBVideo[];
  };
}

export interface TMDBCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface TMDBCrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface TMDBVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TMDBGenre {
  id: number;
  name: string;
}

// ─── Nollywood (Supabase) Types ───────────────────────────────────────────────
export interface NollywoodMovie {
  id: string;                        // UUID
  title: string;
  overview: string;
  poster_url: string;
  backdrop_url?: string | null;
  release_year: number;
  rating: number;                    // 0–10
  genres: string[];
  cast_members: string[];
  director?: string | null;
  runtime_minutes?: number | null;
  youtube_url?: string | null;       // Full movie or trailer on YouTube
  netflix_url?: string | null;       // Netflix deep link
  is_free_on_youtube: boolean;       // True = full movie free
  tmdb_id?: number | null;           // Link to TMDB if available
  created_at: string;
  updated_at: string;
}

// ─── Unified Movie Card Type ──────────────────────────────────────────────────
// Used across all components so Nollywood/TMDB movies look the same
export interface MovieCard {
  id: string | number;
  title: string;
  overview: string;
  posterUrl: string | null;
  backdropUrl?: string | null;
  releaseYear: string;
  rating: number;
  genres: string[];
  industry: Industry;
  // Nollywood-specific
  youtubeUrl?: string | null;
  netflixUrl?: string | null;
  isFreeOnYoutube?: boolean;
  // TMDB-specific
  tmdbId?: number;
}

// ─── Search ───────────────────────────────────────────────────────────────────
export interface SearchResult {
  movies: MovieCard[];
  total: number;
  query: string;
}

// ─── Filters ─────────────────────────────────────────────────────────────────
export interface MovieFilters {
  genre?: string;
  year?: number;
  sortBy?: "popularity" | "rating" | "release_date";
  page?: number;
}