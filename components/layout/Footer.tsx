import Link from "next/link";
import { Film, Sun, Moon } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Footer() {
  return (
    <footer className="border-t border-cinema-border bg-cinema-surface/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <Film className="h-6 w-6 text-cinema-gold" />
            <span className="font-display text-2xl tracking-wide text-cinema-gold">
              AFROCINEMA
            </span>
          </Link>

          {/* Links */}
          <ul className="flex flex-wrap justify-center gap-8 text-sm font-medium text-muted-foreground">
            <li>
              <Link href="/" className="transition-colors hover:text-cinema-gold">
                Home
              </Link>
            </li>
            <li>
              <Link href="/nollywood" className="transition-colors hover:text-cinema-gold">
                Nollywood
              </Link>
            </li>
            <li>
              <Link href="/bollywood" className="transition-colors hover:text-cinema-gold">
                Bollywood
              </Link>
            </li>
            <li>
              <Link href="/hollywood" className="transition-colors hover:text-cinema-gold">
                Hollywood
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition-colors hover:text-cinema-gold">
                About
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="transition-colors hover:text-cinema-gold">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors hover:text-cinema-gold">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="transition-colors hover:text-cinema-gold">
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-cinema-border" />

        {/* Bottom row */}
        <div className="flex flex-col items-center gap-3 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} AfroCinema. Data provided by{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cinema-gold/80 underline-offset-2 hover:text-cinema-gold hover:underline"
            >
              TMDB
            </a>
          </p>

          <p className="flex items-center gap-1">
            Designed &amp; Developed by{" "}
            <a
              href="https://www.celestialwebsolutions.net"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-cinema-gold/80 underline-offset-2 hover:text-cinema-gold hover:underline"
            >
              Celestial Web Solutions
            </a>
          </p>

          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
