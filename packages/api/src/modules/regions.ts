import type { RegionListResponseDto } from "@wafrivet/types";
import { apiClient } from "../client";

export async function listRegions(params?: {
  cursor?: string;
  limit?: number;
}): Promise<RegionListResponseDto> {
  const { data } = await apiClient.get<RegionListResponseDto>("/regions", { params });
  return data;
}
