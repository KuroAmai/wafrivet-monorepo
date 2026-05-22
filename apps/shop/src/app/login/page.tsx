"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getAccessToken, hydrateTokenFromSession, setAccessToken } from "@wafrivet/api";
import {
  decodeJwtPayload,
  resolvePostLoginPathFromJwt,
  sanitizeShopRedirect,
  useAuth,
} from "@wafrivet/auth";

const APP_SIGNUP_URL =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_APP_URL
    ? process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "")
    : "https://app.wafrivet.com") + "/signup";

function ShopLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const redirectParam = sanitizeShopRedirect(searchParams.get("redirect"));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message ?? "Login failed");
        return;
      }
      hydrateTokenFromSession();
      const cookieToken = getAccessToken();
      const accessToken =
        (typeof data.accessToken === "string" ? data.accessToken : null) ??
        cookieToken;
      if (accessToken && accessToken !== cookieToken) {
        setAccessToken(accessToken, data.expiresIn ?? 3600);
      }
      await refreshUser();

      const jwtRole = accessToken
        ? decodeJwtPayload(accessToken)?.role
        : undefined;
      const destination = resolvePostLoginPathFromJwt(
        typeof jwtRole === "string" ? jwtRole : undefined,
        redirectParam,
      );
      router.push(destination);
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl border border-black/[0.06] p-8 shadow-sm"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Shop sign in</h1>
        <p className="text-sm text-gray-500 mb-6">
          Sign in with your Wafrivet chemist or distributor account.
          {redirectParam ? (
            <span className="block mt-1 text-gray-400">
              You&apos;ll return to{" "}
              <span className="font-medium text-gray-600">{redirectParam}</span> after
              signing in.
            </span>
          ) : null}
        </p>
        {error ? (
          <p className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        ) : null}
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 rounded-xl border border-gray-200 px-4 py-3"
          required
          autoComplete="email"
        />
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 rounded-xl border border-gray-200 px-4 py-3"
          required
          autoComplete="current-password"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2D4D31] text-white font-semibold py-3 rounded-xl disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
        <p className="mt-4 text-center text-sm text-gray-500">
          New chemist or distributor?{" "}
          <a href={APP_SIGNUP_URL} className="text-[#2D4D31] font-semibold hover:underline">
            Create account
          </a>
        </p>
        <p className="mt-3 text-center text-sm text-gray-500">
          <Link href="/" className="text-[#2D4D31] font-semibold hover:underline">
            Back to marketplace
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function ShopLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
          Loading…
        </div>
      }
    >
      <ShopLoginForm />
    </Suspense>
  );
}
