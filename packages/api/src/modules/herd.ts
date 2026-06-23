import type {
  AnimalResponseDto,
  CreateAnimalDto,
  FarmSnapshotDto,
  UpdateAnimalDto,
} from "@wafrivet/types";
import { API_CONFIG } from "../config";
import { apiClient } from "../client";

const herdBase = API_CONFIG.herdBasePath.replace(/\/$/, "");

type ApiEnvelope<T> = {
  success?: boolean;
  data?: T;
};

function unwrapData<T>(payload: unknown): T {
  if (payload && typeof payload === "object" && "data" in payload) {
    const envelope = payload as ApiEnvelope<T>;
    if (envelope.data !== undefined) {
      return envelope.data;
    }
  }
  return payload as T;
}

function asArray<T>(value: unknown): T[] {
  const unwrapped = unwrapData<T[] | { items?: T[] }>(value);
  if (Array.isArray(unwrapped)) {
    return unwrapped;
  }
  if (unwrapped && typeof unwrapped === "object" && Array.isArray(unwrapped.items)) {
    return unwrapped.items;
  }
  return [];
}

export async function listAnimals(params?: { farmId?: string }): Promise<AnimalResponseDto[]> {
  const { data } = await apiClient.get<unknown>(`${herdBase}/animals`, { params });
  return asArray<AnimalResponseDto>(data);
}

export async function getAnimal(animalUid: string): Promise<AnimalResponseDto> {
  const { data } = await apiClient.get<unknown>(`${herdBase}/animals/${animalUid}`);
  return unwrapData<AnimalResponseDto>(data);
}

export async function listFarms(): Promise<FarmSnapshotDto[]> {
  const { data } = await apiClient.get<unknown>(`${herdBase}/farms`);
  return asArray<FarmSnapshotDto>(data);
}

export async function postAiContext(animalUid: string, body: Record<string, unknown> = {}) {
  const { data } = await apiClient.post<unknown>(`${herdBase}/ai-context/${animalUid}`, body);
  return unwrapData<unknown>(data);
}

export async function createAnimal(body: CreateAnimalDto): Promise<AnimalResponseDto> {
  const { data } = await apiClient.post<unknown>(`${herdBase}/animals`, body);
  return unwrapData<AnimalResponseDto>(data);
}

export async function updateAnimal(
  animalUid: string,
  body: UpdateAnimalDto,
): Promise<AnimalResponseDto> {
  const { data } = await apiClient.patch<unknown>(`${herdBase}/animals/${animalUid}`, body);
  return unwrapData<AnimalResponseDto>(data);
}

export type TagResolutionResponse = {
  animal: AnimalResponseDto;
  tag: { chipUid: string; animalUid: string; status: string };
};

export async function resolveTag(chipUid: string): Promise<TagResolutionResponse> {
  const encoded = encodeURIComponent(chipUid);
  const { data } = await apiClient.get<unknown>(`${herdBase}/tags/${encoded}`);
  return unwrapData<TagResolutionResponse>(data);
}
