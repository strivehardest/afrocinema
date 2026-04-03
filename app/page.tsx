import { Hero } from "@/components/movie/Hero";
import { MovieGrid } from "@/components/movie/MovieGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getTrendingHollywood,
  getTrendingBollywood,
  tmdbToMovieCard,
} from "@/lib/tmdb";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [hollywoodData, bollywoodData] = await Promise.all([
    getTrendingHollywood(1),
    getTrendingBollywood(1),
  ]);

  const hollywood = hollywoodData.results.slice(0, 10).map((m) => tmdbToMovieCard(m, "hollywood"));
  const bollywood = bollywoodData.results.slice(0, 10).map((m) => tmdbToMovieCard(m, "bollywood"));
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
          <MovieGrid movies={hollywood} />
        </section>

        <section>
          <SectionHeader
            title="Trending in Bollywood"
            href="/bollywood"
          />
          <MovieGrid movies={bollywood} />
        </section>
      </div>
    </>
  );
}
