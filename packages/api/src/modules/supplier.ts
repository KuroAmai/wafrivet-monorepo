import { apiClient } from "../client";

export async function listSupplierOffers(params?: { cursor?: string; limit?: number }) {
  const { data } = await apiClient.get("/supplier/offers", { params });
  return data;
}

export async function getSupplierProfile() {
  const { data } = await apiClient.get("/supplier/profile");
  return data;
}

export async function getSupplierWallet() {
  const { data } = await apiClient.get("/supplier/wallet");
  return data;
}
