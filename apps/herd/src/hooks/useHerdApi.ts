import { useQuery } from "@tanstack/react-query";
import { herdApi, queryKeys } from "@wafrivet/api";
import { useAuth } from "@wafrivet/auth";

export function useAnimals() {
  const { isAuthenticated, loading } = useAuth();
  return useQuery({
    queryKey: queryKeys.herd.animals(),
    queryFn: () => herdApi.listAnimals(),
    enabled: !loading && isAuthenticated,
  });
}

export function useFarms() {
  const { isAuthenticated, loading } = useAuth();
  return useQuery({
    queryKey: queryKeys.herd.farms,
    queryFn: () => herdApi.listFarms(),
    enabled: !loading && isAuthenticated,
  });
}

export function useAnimal(animalUid: string) {
  return useQuery({
    queryKey: queryKeys.herd.animal(animalUid),
    queryFn: () => herdApi.getAnimal(animalUid),
    enabled: Boolean(animalUid),
  });
}

export function useAiContext(animalUid: string) {
  return useQuery({
    queryKey: ["herd", "ai-context", animalUid] as const,
    queryFn: () => herdApi.postAiContext(animalUid),
    enabled: Boolean(animalUid),
  });
}
