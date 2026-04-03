export function MovieCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="skeleton aspect-[2/3] w-full rounded-lg" />
      <div className="skeleton mt-2 h-4 w-3/4 rounded" />
      <div className="skeleton mt-1 h-3 w-1/2 rounded" />
    </div>
  );
}

export function MovieGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative h-[70vh] min-h-[420px] w-full animate-pulse bg-cinema-surface">
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl space-y-4 px-4 pb-12 sm:px-6 lg:px-8">
        <div className="skeleton h-4 w-32 rounded" />
        <div className="skeleton h-12 w-2/3 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="skeleton h-10 w-36 rounded-lg" />
      </div>
    </div>
  );
}
