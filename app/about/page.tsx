import { Film, Globe, Heart, Tv, Youtube, Clapperboard } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about AfroCinema — the best place to discover and watch Nollywood, Bollywood, and Hollywood movies.",
};

const FEATURES = [
  {
    icon: Clapperboard,
    title: "Nollywood First",
    description:
      "We spotlight Nigerian cinema, making it easy to discover the best Nollywood films — from classics to the latest releases.",
  },
  {
    icon: Globe,
    title: "Global Cinema",
    description:
      "Explore Bollywood and Hollywood alongside Nollywood. One platform for three of the world's biggest film industries.",
  },
  {
    icon: Youtube,
    title: "Watch for Free",
    description:
      "Many Nollywood movies are available free on YouTube. We flag them so you can start watching instantly.",
  },
  {
    icon: Tv,
    title: "Streaming Links",
    description:
      "Find where to stream every movie — Netflix, YouTube, and more — without jumping between apps.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-cinema-gold/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <Film className="h-10 w-10 text-cinema-gold" />
            <span
              className="text-4xl sm:text-5xl text-cinema-gold tracking-wide"
              style={{ fontFamily: "var(--font-display)" }}
            >
              AFROCINEMA
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ABOUT US
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            AfroCinema is the home of global cinema — built to celebrate
            Nollywood, Bollywood, and Hollywood movies in one beautiful,
            easy-to-use platform.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl border border-cinema-border bg-cinema-surface p-8 sm:p-12">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-5 w-5 text-cinema-gold" />
            <h2
              className="text-2xl text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              OUR MISSION
            </h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed max-w-3xl">
            <p>
              We believe great stories deserve a global stage. African cinema —
              especially Nollywood — has grown into one of the largest film
              industries in the world, yet discovering and watching these films
              can still be difficult.
            </p>
            <p>
              AfroCinema bridges that gap. We curate movies across Nollywood,
              Bollywood, and Hollywood, show you where to stream them, and
              highlight the ones you can watch completely free on YouTube.
            </p>
            <p>
              Whether you&rsquo;re a lifelong Nollywood fan or just discovering
              Nigerian cinema for the first time, AfroCinema is your guide.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <h2
          className="text-2xl text-foreground mb-8"
          style={{ fontFamily: "var(--font-display)" }}
        >
          WHAT WE OFFER
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-cinema-border bg-cinema-surface p-6 hover:border-cinema-gold/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-cinema-gold/10 border border-cinema-gold/20 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-cinema-gold" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Data attribution */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl border border-cinema-border bg-cinema-surface p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Movie data for Hollywood and Bollywood is provided by{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cinema-gold/80 hover:text-cinema-gold underline-offset-2 hover:underline"
            >
              The Movie Database (TMDB)
            </a>
            . Nollywood movie data is curated by the AfroCinema team.
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            Designed &amp; Developed by{" "}
            <a
              href="https://www.celestialwebsolutions.net"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-cinema-gold/80 hover:text-cinema-gold underline-offset-2 hover:underline"
            >
              Celestial Web Solutions
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
