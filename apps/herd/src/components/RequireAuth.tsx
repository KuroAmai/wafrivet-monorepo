import { getAccessToken, hydrateTokenFromSession } from "@wafrivet/api";
import { getCentralLoginUrl } from "@wafrivet/auth";
import { useEffect, useState, type ReactNode } from "react";

export function RequireAuth({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    hydrateTokenFromSession();
    setAuthed(Boolean(getAccessToken()));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || authed) return;
    window.location.assign(getCentralLoginUrl(window.location.href));
  }, [ready, authed]);

  if (!ready) return null;
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Redirecting to sign in…
      </div>
    );
  }
  return <>{children}</>;
}
