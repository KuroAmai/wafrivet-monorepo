import { useQuery } from "@tanstack/react-query";
import { herdApi, queryKeys } from "@wafrivet/api";

export function useAnimals() {
  return useQuery({
    queryKey: queryKeys.herd.animals(),
    queryFn: () => herdApi.listAnimals(),
  });
}

export function useFarms() {
  return useQuery({
    queryKey: queryKeys.herd.farms,
    queryFn: () => herdApi.listFarms(),
  });
}

export function useAnimal(animalUid: string) {
  return useQuery({
    queryKey: queryKeys.herd.animal(animalUid),
    queryFn: () => herdApi.getAnimal(animalUid),
    enabled: Boolean(animalUid),
  });
}
