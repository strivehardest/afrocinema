"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "War",
  "Western",
] as const;

interface GenreFilterProps {
  baseUrl: string;
}

export function GenreFilter({ baseUrl }: GenreFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeGenre = searchParams.get("genre") ?? "";

  function handleSelect(genre: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (genre === activeGenre) {
      params.delete("genre");
    } else {
      params.set("genre", genre);
    }

    params.delete("page"); // reset to page 1
    const qs = params.toString();
    router.push(qs ? `${baseUrl}?${qs}` : baseUrl);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {GENRES.map((genre) => (
        <button
          key={genre}
          type="button"
          onClick={() => handleSelect(genre)}
          className={cn(
            "genre-badge cursor-pointer transition-colors",
            genre === activeGenre &&
              "border-cinema-gold bg-cinema-gold/10 text-cinema-gold"
          )}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
