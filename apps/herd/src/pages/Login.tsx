import { useEffect } from "react";
import { getCentralLoginUrl } from "@wafrivet/auth";

/** Herd sign-in is centralized on app.wafrivet.com. */
export default function Login() {
  useEffect(() => {
    window.location.replace(getCentralLoginUrl(window.location.href));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-6">
      <p className="text-sm text-gray-500">Redirecting to sign in…</p>
    </div>
  );
}
