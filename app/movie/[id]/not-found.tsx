import Link from "next/link";
import { Film } from "lucide-react";

export default function MovieNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <Film className="h-16 w-16 text-muted-foreground/40" />
      <h1 className="font-display text-4xl tracking-wide">Movie Not Found</h1>
      <p className="max-w-md text-muted-foreground">
        The movie you&apos;re looking for doesn&apos;t exist or may have been removed.
      </p>
      <Link
        href="/"
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cinema-gold px-5 py-2.5 text-sm font-semibold text-cinema-dark transition-opacity hover:opacity-90"
      >
        Back to Home
      </Link>
    </div>
  );
}
