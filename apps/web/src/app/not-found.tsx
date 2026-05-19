import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for could not be found on Wafrivet.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <h1 className="sr-only">Page not found</h1>
      <div className="w-full max-w-3xl">
        <img
          src="/404%20Error%20with%20a%20cute%20animal-bro.svg"
          alt="Wafrivet 404 — page not found illustration"
          className="w-full h-auto"
        />
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
