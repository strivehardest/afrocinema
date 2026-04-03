"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";

interface TrailerPlayerProps {
  videoKey: string;
  title: string;
}

export function TrailerPlayer({ videoKey, title }: TrailerPlayerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg bg-cinema-gold px-5 py-2.5 text-sm font-semibold text-cinema-dark transition-opacity hover:opacity-90"
      >
        <Play className="h-4 w-4" />
        Watch Trailer
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-4 rounded-full p-1 text-white/70 transition-colors hover:text-white"
              aria-label="Close trailer"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="relative aspect-video w-full overflow-hidden rounded-xl">
              <iframe
                src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
                title={`${title} - Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
