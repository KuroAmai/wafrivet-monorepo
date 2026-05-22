import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@wafrivet/auth";

export default function Login() {
  const navigate = useNavigate();
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
      await login({ email, password });
      navigate("/");
    } catch (err) {
      setError((err as Error).message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm"
      >
        <h1 className="text-2xl font-black text-gray-900 mb-2">Herd sign in</h1>
        <p className="text-sm text-gray-500 mb-6">Sign in with your Wafrivet account.</p>
        {error ? (
          <p className="mb-4 text-sm text-red-700 bg-red-50 rounded-xl px-3 py-2">{error}</p>
        ) : null}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 rounded-2xl border-none bg-gray-100 px-4 py-4 font-bold"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 rounded-2xl border-none bg-gray-100 px-4 py-4 font-bold"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2D4D31] text-white font-black py-4 rounded-2xl disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
