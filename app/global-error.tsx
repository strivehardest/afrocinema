"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body className="flex min-h-screen items-center justify-center bg-[#0A0A0F] text-white">
        <div className="text-center space-y-4 px-4">
          <h1 className="text-4xl font-bold">Something went wrong</h1>
          <p className="text-gray-400 max-w-md">
            {error.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={reset}
            className="mt-4 rounded-lg bg-[#F5C518] px-5 py-2.5 text-sm font-semibold text-[#0A0A0F] hover:opacity-90"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
