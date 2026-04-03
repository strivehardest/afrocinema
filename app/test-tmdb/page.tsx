import { getTrendingHollywood, getTrendingBollywood, getPosterUrl } from "@/lib/tmdb";
import Image from "next/image";

export const dynamic = "force-dynamic"; // Always fresh on this test page

export default async function TestTMDBPage() {
  let hollywoodMovies = [];
  let bollywoodMovies = [];
  let error: string | null = null;

  try {
    const [hollywood, bollywood] = await Promise.all([
      getTrendingHollywood(1),
      getTrendingBollywood(1),
    ]);
    hollywoodMovies = hollywood.results.slice(0, 6);
    bollywoodMovies = bollywood.results.slice(0, 6);
  } catch (e: unknown) {
    error = e instanceof Error ? e.message : "Unknown error";
  }

  return (
    <div className="min-h-screen bg-cinema-dark p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-cinema-gold mb-2" style={{ fontFamily: "var(--font-display)" }}>
            TMDB API TEST — DAY 2
          </h1>
          <p className="text-muted-foreground text-sm">
            If you see movie posters below, your TMDB_API_KEY is working ✅
          </p>
        </div>

        {/* Error state */}
        {error && (
          <div className="bg-red-950 border border-red-800 rounded-xl p-6 mb-8">
            <p className="text-red-400 font-semibold text-lg mb-2">❌ API Error</p>
            <p className="text-red-300 text-sm font-mono">{error}</p>
            <div className="mt-4 text-sm text-red-300 space-y-1">
              <p>Check these:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Is <code className="bg-red-900 px-1 rounded">TMDB_API_KEY</code> set in <code className="bg-red-900 px-1 rounded">.env.local</code>?</li>
                <li>Did you restart the dev server after adding the key?</li>
                <li>Is the key a v3 API key (not a Bearer token)?</li>
              </ul>
            </div>
          </div>
        )}

        {/* Success state */}
        {!error && (
          <div className="space-y-10">

            {/* Status banner */}
            <div className="bg-green-950 border border-green-800 rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="text-green-400 font-semibold">TMDB API Connected!</p>
                <p className="text-green-300 text-sm">
                  Fetched {hollywoodMovies.length} Hollywood + {bollywoodMovies.length} Bollywood movies
                </p>
              </div>
            </div>

            {/* Hollywood */}
            <section>
              <h2 className="text-2xl text-white mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                🎬 TRENDING HOLLYWOOD
                <span className="text-sm font-sans font-normal text-blue-400 bg-blue-950 border border-blue-800 px-2 py-0.5 rounded-full">
                  {hollywoodMovies.length} results
                </span>
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {hollywoodMovies.map((movie) => (
                  <div key={movie.id} className="space-y-1">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-cinema-surface">
                      <Image
                        src={getPosterUrl(movie.poster_path, "w185")}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        sizes="120px"
                      />
                    </div>
                    <p className="text-xs text-white truncate">{movie.title}</p>
                    <p className="text-xs text-cinema-gold">⭐ {movie.vote_average.toFixed(1)}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Bollywood */}
            <section>
              <h2 className="text-2xl text-white mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                🎭 TRENDING BOLLYWOOD
                <span className="text-sm font-sans font-normal text-orange-400 bg-orange-950 border border-orange-800 px-2 py-0.5 rounded-full">
                  {bollywoodMovies.length} results
                </span>
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {bollywoodMovies.map((movie) => (
                  <div key={movie.id} className="space-y-1">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-cinema-surface">
                      <Image
                        src={getPosterUrl(movie.poster_path, "w185")}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        sizes="120px"
                      />
                    </div>
                    <p className="text-xs text-white truncate">{movie.title}</p>
                    <p className="text-xs text-cinema-gold">⭐ {movie.vote_average.toFixed(1)}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* API endpoints */}
            <section>
              <h2 className="text-2xl text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
                🔌 API ROUTES READY
              </h2>
              <div className="grid gap-2">
                {[
                  { method: "GET", path: "/api/movies/trending?industry=all", desc: "Trending Hollywood + Bollywood" },
                  { method: "GET", path: "/api/movies/trending?industry=hollywood", desc: "Trending Hollywood only" },
                  { method: "GET", path: "/api/movies/trending?industry=bollywood", desc: "Trending Bollywood only" },
                  { method: "GET", path: "/api/movies/search?q=lion", desc: "Search all industries" },
                  { method: "GET", path: "/api/movies/detail/550?source=tmdb", desc: "TMDB movie detail (Fight Club)" },
                  { method: "GET", path: "/api/movies/nollywood", desc: "Nollywood from Supabase (Day 3)" },
                ].map((route) => (
                  <div
                    key={route.path}
                    className="flex items-center gap-3 bg-cinema-surface border border-cinema-border rounded-lg px-4 py-3"
                  >
                    <span className="text-xs font-bold text-green-400 bg-green-950 border border-green-800 px-2 py-0.5 rounded font-mono w-12 text-center shrink-0">
                      {route.method}
                    </span>
                    <code className="text-sm text-cinema-gold font-mono flex-1">{route.path}</code>
                    <span className="text-xs text-muted-foreground hidden sm:block">{route.desc}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Next step */}
            <div className="bg-cinema-surface border border-cinema-border rounded-xl p-6">
              <p className="text-white font-semibold mb-1">✅ Day 2 Complete — What&apos;s next?</p>
              <p className="text-muted-foreground text-sm">
                Day 3: Set up Supabase, run <code className="bg-cinema-border px-1 rounded text-cinema-gold">supabase-schema.sql</code>, and seed your first Nollywood movies.
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Delete this test page before launch: <code className="bg-cinema-border px-1 rounded text-cinema-gold">app/test-tmdb/page.tsx</code>
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}