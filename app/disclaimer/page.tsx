import { AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Legal disclaimer for AfroCinema — movie data attribution and usage terms.",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-cinema-gold/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="mx-auto h-10 w-10 text-cinema-gold mb-4" />
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            DISCLAIMER
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground">
            Please read this disclaimer carefully before using AfroCinema.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
        <div className="rounded-2xl border border-cinema-border bg-cinema-surface p-8">
          <h2 className="text-xl text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Movie Data &amp; Attribution
          </h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed text-sm">
            <p>
              AfroCinema uses the{" "}
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cinema-gold underline-offset-2 hover:underline"
              >
                TMDB API
              </a>{" "}
              for movie information including titles, overviews, ratings, cast details, and images.
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
            <p>
              All movie posters, backdrop images, and profile photos are the property of their
              respective owners and are provided through the TMDB API for informational purposes only.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-cinema-border bg-cinema-surface p-8">
          <h2 className="text-xl text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
            No Streaming or Hosting
          </h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed text-sm">
            <p>
              AfroCinema does not host, stream, or distribute any movies or copyrighted content.
              We provide links to legitimate streaming platforms such as Netflix and YouTube where
              movies are officially available.
            </p>
            <p>
              We are not responsible for the availability of movies on third-party platforms.
              Streaming availability may vary by region and is subject to change.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-cinema-border bg-cinema-surface p-8">
          <h2 className="text-xl text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Accuracy of Information
          </h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed text-sm">
            <p>
              While we strive to provide accurate and up-to-date movie information,
              AfroCinema makes no warranties or representations regarding the completeness,
              accuracy, or reliability of any information displayed on this platform.
            </p>
            <p>
              Movie ratings, release dates, cast details, and other metadata are sourced from
              third-party APIs and user contributions. We cannot guarantee their accuracy.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-cinema-border bg-cinema-surface p-8">
          <h2 className="text-xl text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
            External Links
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm">
            AfroCinema may contain links to external websites and services. We are not responsible
            for the content, privacy policies, or practices of any third-party websites. Visiting
            external links is at your own risk.
          </p>
        </div>

        <div className="rounded-2xl border border-cinema-border bg-cinema-surface p-8">
          <h2 className="text-xl text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Changes to This Disclaimer
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm">
            We reserve the right to update or modify this disclaimer at any time without prior notice.
            Continued use of AfroCinema after changes constitutes acceptance of the updated disclaimer.
          </p>
        </div>
      </section>
    </div>
  );
}
