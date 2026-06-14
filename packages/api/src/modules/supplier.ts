import type { OfferCreateDto, OfferUpdateDto, UpdateSupplierProfileDto } from "@wafrivet/types";
import { apiClient } from "../client";

export async function listSupplierOffers(params?: {
  cursor?: string;
  limit?: number;
  is_active?: boolean;
  master_sku_id?: string;
}) {
  const { data } = await apiClient.get("/supplier/offers", { params });
  return data;
}

export async function createSupplierOffer(body: OfferCreateDto) {
  const { data } = await apiClient.post("/supplier/offers", body);
  return data;
}

export async function updateSupplierOffer(offerId: string, body: OfferUpdateDto) {
  const { data } = await apiClient.patch(`/supplier/offers/${offerId}`, body);
  return data;
}

export async function deleteSupplierOffer(offerId: string) {
  const { data } = await apiClient.delete(`/supplier/offers/${offerId}`);
  return data;
}

export async function getSupplierProfile() {
  const { data } = await apiClient.get("/supplier/profile");
  return data;
}

export async function getSupplierWallet(params?: { cursor?: string; limit?: number }) {
  const { data } = await apiClient.get("/supplier/wallet", { params });
  return data;
}

export async function updateSupplierProfile(body: UpdateSupplierProfileDto) {
  const { data } = await apiClient.patch("/supplier/profile", body);
  return data;
}

export async function listSupplierOrders(params?: { cursor?: string; limit?: number }) {
  const { data } = await apiClient.get("/supplier/orders", { params });
  return data;
}
