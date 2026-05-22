"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@wafrivet/auth";

export default function ShopLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message ?? "Login failed");
        return;
      }
      if (data.accessToken && typeof document !== "undefined") {
        document.cookie = `jwt=${encodeURIComponent(data.accessToken)}; path=/; max-age=${data.expiresIn ?? 3600}; SameSite=Lax`;
      }
      await login({ email, password });
      router.push("/dashboard");
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
        <p className="text-sm text-gray-500 mb-6">Use your Wafrivet vet or supplier account.</p>
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
        />
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 rounded-xl border border-gray-200 px-4 py-3"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2D4D31] text-white font-semibold py-3 rounded-xl disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
        <p className="mt-4 text-center text-sm text-gray-500">
          <Link href="/" className="text-[#2D4D31] font-semibold hover:underline">
            Back to marketplace
          </Link>
        </p>
      </form>
    </div>
  );
}
