"use client";

export type AuthState = {
  user?: unknown;
  role?: string;
  loading: boolean;
};

export function useAuth(): AuthState {
  return { loading: true };
}

