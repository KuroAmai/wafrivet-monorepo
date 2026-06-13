import type {
  AdminAnimalClinicalDto,
  AdminAnimalDetailDto,
  AdminAnimalListResponseDto,
  AdminAnimalVitalsDto,
  AdminDiagnosisListResponseDto,
  AdminHealthEventListResponseDto,
  AdminLivestockSummaryDto,
  AdminValuationListResponseDto,
} from "@wafrivet/types";
import { apiClient } from "../client";

export async function getLivestockSummary(): Promise<AdminLivestockSummaryDto> {
  const { data } = await apiClient.get<AdminLivestockSummaryDto>("/admin/livestock/summary");
  return data;
}

export async function listAnimals(params?: {
  limit?: number;
  cursor?: string;
  search?: string;
  species?: string;
  status?: string;
  farmId?: string;
}): Promise<AdminAnimalListResponseDto> {
  const { data } = await apiClient.get<AdminAnimalListResponseDto>("/admin/livestock/animals", {
    params,
  });
  return data;
}

export async function getAnimal(animalUid: string): Promise<AdminAnimalDetailDto> {
  const { data } = await apiClient.get<AdminAnimalDetailDto>(
    `/admin/livestock/animals/${encodeURIComponent(animalUid)}`,
  );
  return data;
}

export async function getAnimalClinical(animalUid: string): Promise<AdminAnimalClinicalDto> {
  const { data } = await apiClient.get<AdminAnimalClinicalDto>(
    `/admin/livestock/animals/${encodeURIComponent(animalUid)}/clinical`,
  );
  return data;
}

export async function getAnimalVitals(animalUid: string): Promise<AdminAnimalVitalsDto> {
  const { data } = await apiClient.get<AdminAnimalVitalsDto>(
    `/admin/livestock/animals/${encodeURIComponent(animalUid)}/vitals`,
  );
  return data;
}

export async function listHealthEvents(params?: {
  limit?: number;
  cursor?: string;
  search?: string;
  eventType?: string;
  species?: string;
}): Promise<AdminHealthEventListResponseDto> {
  const { data } = await apiClient.get<AdminHealthEventListResponseDto>(
    "/admin/livestock/health-events",
    { params },
  );
  return data;
}

export async function listDiagnoses(params?: {
  limit?: number;
  cursor?: string;
  search?: string;
  status?: string;
}): Promise<AdminDiagnosisListResponseDto> {
  const { data } = await apiClient.get<AdminDiagnosisListResponseDto>(
    "/admin/livestock/diagnoses",
    { params },
  );
  return data;
}

export async function listValuations(params?: {
  limit?: number;
  cursor?: string;
  search?: string;
  species?: string;
}): Promise<AdminValuationListResponseDto> {
  const { data } = await apiClient.get<AdminValuationListResponseDto>(
    "/admin/livestock/valuations",
    { params },
  );
  return data;
}
