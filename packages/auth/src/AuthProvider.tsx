"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuthUserProfileDto, LoginDto } from "@wafrivet/types";
import { authApi, getAccessToken, hydrateTokenFromSession, queryKeys } from "@wafrivet/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export type AuthContextValue = {
  user: AuthUserProfileDto | null;
  role: string | undefined;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginDto) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    hydrateTokenFromSession();
    setBootstrapped(true);
  }, []);

  const {
    data: user,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: () => authApi.getMe(),
    enabled: bootstrapped && Boolean(getAccessToken()),
    retry: false,
    staleTime: 60_000,
  });

  const login = useCallback(
    async (credentials: LoginDto) => {
      await authApi.login(credentials);
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      await refetch();
    },
    [queryClient, refetch],
  );

  const logout = useCallback(async () => {
    const id = user?.id;
    await authApi.logout(id);
    queryClient.setQueryData(queryKeys.auth.me, null);
    queryClient.clear();
  }, [queryClient, user?.id]);

  const refreshUser = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: user ?? null,
      role: user?.role,
      loading: !bootstrapped || isLoading || isFetching,
      isAuthenticated: Boolean(user),
      login,
      logout,
      refreshUser,
    }),
    [user, bootstrapped, isLoading, isFetching, login, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return ctx;
}
