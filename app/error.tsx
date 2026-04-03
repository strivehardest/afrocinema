"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <AlertTriangle className="h-12 w-12 text-cinema-gold" />
      <h1 className="font-display text-3xl tracking-wide">Something went wrong</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        {error.message || "An unexpected error occurred while loading this page."}
      </p>
      <div className="flex gap-3 mt-4">
        <button
          onClick={reset}
          className="rounded-lg bg-cinema-gold px-5 py-2.5 text-sm font-semibold text-cinema-dark transition-opacity hover:opacity-90"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="rounded-lg border border-cinema-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
