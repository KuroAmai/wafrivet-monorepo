"use client";

import { useContext } from "react";
import { AuthContext, type AuthContextValue } from "./AuthProvider";

export type AuthState = {
  user?: unknown;
  role?: string;
  loading: boolean;
  isAuthenticated: boolean;
  login: AuthContextValue["login"];
  logout: AuthContextValue["logout"];
};

const fallback: AuthState = {
  loading: false,
  isAuthenticated: false,
  login: async () => {
    throw new Error("AuthProvider is required for login");
  },
  logout: async () => {
    throw new Error("AuthProvider is required for logout");
  },
};

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) return fallback;
  return {
    user: ctx.user ?? undefined,
    role: ctx.role,
    loading: ctx.loading,
    isAuthenticated: ctx.isAuthenticated,
    login: ctx.login,
    logout: ctx.logout,
  };
}
