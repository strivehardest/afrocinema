"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, Search, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Nollywood", href: "/nollywood" },
  { label: "Bollywood", href: "/bollywood" },
  { label: "Hollywood", href: "/hollywood" },
  { label: "About", href: "/about" },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getLinkClassName = (href: string, mobile = false) =>
    cn(
      "font-medium transition-colors",
      pathname === href
        ? "text-cinema-gold"
        : "text-muted-foreground hover:text-foreground",
      mobile
        ? "block rounded-xl px-3 py-3 text-base hover:bg-accent"
        : "text-sm"
    );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cinema-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <Film className="h-6 w-6 shrink-0 text-cinema-gold" />
          <span className="truncate font-display text-xl tracking-wide text-cinema-gold sm:text-2xl">
            AFROCINEMA
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-1 sm:gap-3">
          {/* Desktop links */}
          <ul className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={getLinkClassName(link.href)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side: search + mobile toggle */}
          <Link
            href="/search"
            aria-label="Search movies"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinema-gold"
          >
            <Search className="h-5 w-5" />
          </Link>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinema-gold md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={cn("md:hidden", mobileOpen ? "pointer-events-auto" : "pointer-events-none")}>
        <button
          type="button"
          aria-label="Close navigation menu"
          className={cn(
            "fixed inset-0 top-16 z-40 bg-black/40 transition-opacity duration-200",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
        />

        <div
          id="mobile-nav"
          className={cn(
            "absolute inset-x-0 top-full z-50 border-t border-cinema-border bg-background/95 shadow-xl backdrop-blur-md transition-all duration-200",
            mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          )}
        >
          <ul className="flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={getLinkClassName(link.href, true)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
