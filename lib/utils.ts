import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format rating to one decimal place
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

// Format runtime from minutes to "2h 15m"
export function formatRuntime(minutes: number | null): string {
  if (!minutes) return "N/A";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

// Truncate overview text
export function truncate(text: string, maxLength = 150): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

// Get YouTube video ID from URL
export function getYouTubeId(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// YouTube thumbnail from video ID
export function getYouTubeThumbnail(
  videoId: string,
  quality: "default" | "hqdefault" | "maxresdefault" = "hqdefault"
): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}
