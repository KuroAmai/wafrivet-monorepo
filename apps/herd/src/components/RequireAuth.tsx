import { getAccessToken, hydrateTokenFromSession } from "@wafrivet/api";
import { useEffect, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

export function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    hydrateTokenFromSession();
    setAuthed(Boolean(getAccessToken()));
    setReady(true);
  }, [location.pathname]);

  if (!ready) return null;
  if (!authed) return <Navigate to="/login" replace state={{ from: location }} />;
  return <>{children}</>;
}
