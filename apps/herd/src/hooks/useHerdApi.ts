import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { herdApi, queryKeys } from "@wafrivet/api";
import type { CreateAnimalDto } from "@wafrivet/types";
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

export function useCreateAnimal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateAnimalDto) => herdApi.createAnimal(body),
    onSuccess: () => void qc.invalidateQueries({ queryKey: queryKeys.herd.animals() }),
  });
}
