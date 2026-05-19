import type { AnimalResponseDto, FarmSnapshotDto } from "@wafrivet/types";
import { API_CONFIG } from "../config";
import { createApiClient } from "../client";

const herdClient = createApiClient({
  baseURL: `${API_CONFIG.gatewayUrl}${API_CONFIG.herdBasePath}`,
});

const coreHerdClient = createApiClient({ baseURL: API_CONFIG.coreUrl });

async function tryGateway<T>(fn: () => Promise<T>, fallback: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback();
  }
}

export async function listAnimals(params?: { farmId?: string }): Promise<AnimalResponseDto[]> {
  return tryGateway(
    async () => {
      const { data } = await herdClient.get<AnimalResponseDto[]>("/animals", { params });
      return Array.isArray(data) ? data : (data as { data?: AnimalResponseDto[] }).data ?? [];
    },
    async () => {
      const { data } = await coreHerdClient.get<AnimalResponseDto[]>("/animals", { params });
      return Array.isArray(data) ? data : [];
    },
  );
}

export async function getAnimal(animalUid: string): Promise<AnimalResponseDto> {
  return tryGateway(
    async () => {
      const { data } = await herdClient.get<AnimalResponseDto>(`/animals/${animalUid}`);
      return data;
    },
    async () => {
      const { data } = await coreHerdClient.get<AnimalResponseDto>(`/animals/${animalUid}`);
      return data;
    },
  );
}

export async function listFarms(): Promise<FarmSnapshotDto[]> {
  return tryGateway(
    async () => {
      const { data } = await herdClient.get<FarmSnapshotDto[]>("/farms");
      return Array.isArray(data) ? data : [];
    },
    async () => {
      const { data } = await coreHerdClient.get<FarmSnapshotDto[]>("/farms");
      return Array.isArray(data) ? data : [];
    },
  );
}

export async function postAiContext(animalUid: string, body: Record<string, unknown> = {}) {
  return tryGateway(
    async () => {
      const { data } = await herdClient.post(`/ai-context/${animalUid}`, body);
      return data;
    },
    async () => {
      const { data } = await coreHerdClient.post(`/ai-context/${animalUid}`, body);
      return data;
    },
  );
}
