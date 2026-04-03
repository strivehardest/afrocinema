"use client";

import { Film, WifiOff } from "lucide-react";
import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cinema-surface border border-cinema-border mb-6">
        <WifiOff className="h-10 w-10 text-cinema-gold" />
      </div>
      <h1
        className="text-3xl sm:text-4xl text-foreground mb-3"
        style={{ fontFamily: "var(--font-display)" }}
      >
        YOU&rsquo;RE OFFLINE
      </h1>
      <p className="text-muted-foreground max-w-md mb-8">
        It looks like you&rsquo;ve lost your internet connection. Check your
        network and try again to continue browsing movies.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="inline-flex items-center gap-2 rounded-xl bg-cinema-gold px-6 py-2.5 text-sm font-semibold text-cinema-dark transition-opacity hover:opacity-90"
      >
        <Film className="h-4 w-4" />
        Try Again
      </button>
    </div>
  );
}
