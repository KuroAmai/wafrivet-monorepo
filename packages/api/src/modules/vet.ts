import { apiClient } from "../client";

export async function listVetOrders(params?: { cursor?: string; limit?: number }) {
  const { data } = await apiClient.get("/vet/orders", { params });
  return data;
}

export async function getVetOrder(orderId: string) {
  const { data } = await apiClient.get(`/vet/orders/${orderId}`);
  return data;
}

export async function getProcurementDraft() {
  const { data } = await apiClient.get("/vet/procurement/draft");
  return data;
}

export async function upsertProcurementDraft(body: { items: { offerId: string; quantity: number }[] }) {
  const { data } = await apiClient.post("/vet/procurement/draft", body);
  return data;
}

export async function clearProcurementDraft() {
  await apiClient.delete("/vet/procurement/draft");
}

export async function submitProcurement(body: unknown = {}) {
  const { data } = await apiClient.post("/vet/procurement", body);
  return data;
}

export async function cancelVetOrder(orderId: string) {
  const { data } = await apiClient.patch(`/vet/orders/${orderId}/cancel`, {});
  return data;
}
