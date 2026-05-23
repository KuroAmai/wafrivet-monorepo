"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@wafrivet/auth";
import { useState, type ReactNode } from "react";
import { ShopLocationProvider } from "@/contexts/ShopLocationContext";
import { LocationPicker } from "@/components/shop/LocationPicker";

export function ShopProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 30_000, retry: 1 },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider meUrl="/api/auth/me">
        <ShopLocationProvider>
          {children as never}
          <LocationPicker />
        </ShopLocationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
