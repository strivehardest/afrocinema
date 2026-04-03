import { Hero } from "@/components/movie/Hero";
import { MovieGrid } from "@/components/movie/MovieGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getTrendingHollywood,
  getTrendingBollywood,
  tmdbToMovieCard,
} from "@/lib/tmdb";
import type { MovieCard } from "@/types/movie";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let hollywood: MovieCard[] = [];
  let bollywood: MovieCard[] = [];

  try {
    const [hollywoodData, bollywoodData] = await Promise.all([
      getTrendingHollywood(1),
      getTrendingBollywood(1),
    ]);
    hollywood = hollywoodData.results.slice(0, 10).map((m) => tmdbToMovieCard(m, "hollywood"));
    bollywood = bollywoodData.results.slice(0, 10).map((m) => tmdbToMovieCard(m, "bollywood"));
  } catch (e) {
    console.error("[HomePage] Failed to fetch movies:", e);
  }

  const heroMovie = hollywood[0] ?? bollywood[0] ?? null;

  return (
    <>
      {heroMovie && <Hero movie={heroMovie} />}

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
        <section>
          <SectionHeader
            title="Trending in Hollywood"
            href="/hollywood"
          />
          {hollywood.length > 0 ? (
            <MovieGrid movies={hollywood} />
          ) : (
            <p className="text-center py-12 text-muted-foreground">Unable to load movies right now.</p>
          )}
        </section>

        <section>
          <SectionHeader
            title="Trending in Bollywood"
            href="/bollywood"
          />
          {bollywood.length > 0 ? (
            <MovieGrid movies={bollywood} />
          ) : (
            <p className="text-center py-12 text-muted-foreground">Unable to load movies right now.</p>
          )}
        </section>
      </div>
    </>
  );
}
