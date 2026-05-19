import type { CatalogListResponseDto, CategoryDto, MasterSkuDto } from "@wafrivet/types";
import { apiClient } from "../client";

export async function listCategories(): Promise<CategoryDto[]> {
  const { data } = await apiClient.get<CategoryDto[]>("/catalog/categories");
  return data;
}

export async function listCatalog(params?: {
  cursor?: string;
  limit?: number;
  categoryId?: string;
  search?: string;
}): Promise<CatalogListResponseDto | MasterSkuDto[]> {
  const { data } = await apiClient.get<CatalogListResponseDto | MasterSkuDto[]>("/catalog", {
    params,
  });
  return data;
}

export async function getCatalogItem(id: string): Promise<MasterSkuDto> {
  const { data } = await apiClient.get<MasterSkuDto>(`/catalog/${id}`);
  return data;
}
