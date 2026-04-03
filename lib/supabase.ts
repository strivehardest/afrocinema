import { createClient } from "@supabase/supabase-js";
import type { NollywoodMovie, MovieCard } from "@/types/movie";

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase environment variables are not set");
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

// ─── Fetch Nollywood Movies ───────────────────────────────────────────────────
export async function getNollywoodMovies(options?: {
  genre?: string;
  limit?: number;
  page?: number;
  sortBy?: "rating" | "release_year" | "created_at";
}): Promise<{ data: NollywoodMovie[]; count: number }> {
  const { genre, limit = 20, page = 1, sortBy = "created_at" } = options ?? {};
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = getSupabaseClient()
    .from("nollywood_movies")
    .select("*", { count: "exact" })
    .order(sortBy, { ascending: false })
    .range(from, to);

  if (genre) {
    query = query.contains("genres", [genre]);
  }

  const { data, error, count } = await query;

  if (error) throw new Error(`Supabase error: ${error.message}`);

  return { data: data ?? [], count: count ?? 0 };
}

// ─── Fetch Single Nollywood Movie ─────────────────────────────────────────────
export async function getNollywoodMovieById(
  id: string
): Promise<NollywoodMovie | null> {
  const { data, error } = await getSupabaseClient()
    .from("nollywood_movies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

// ─── Search Nollywood ─────────────────────────────────────────────────────────
export async function searchNollywood(query: string): Promise<NollywoodMovie[]> {
  const { data, error } = await getSupabaseClient()
    .from("nollywood_movies")
    .select("*")
    .ilike("title", `%${query}%`)
    .limit(10);

  if (error) return [];
  return data ?? [];
}

// ─── Normalizer: Nollywood → MovieCard ───────────────────────────────────────
export function nollywoodToMovieCard(movie: NollywoodMovie): MovieCard {
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    posterUrl: movie.poster_url,
    backdropUrl: movie.backdrop_url,
    releaseYear: String(movie.release_year),
    rating: movie.rating,
    genres: movie.genres,
    industry: "nollywood",
    youtubeUrl: movie.youtube_url,
    netflixUrl: movie.netflix_url,
    isFreeOnYoutube: movie.is_free_on_youtube,
  };
}