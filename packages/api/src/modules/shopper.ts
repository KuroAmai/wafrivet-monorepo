import type {
  DraftCartDto,
  OrderListResponseDto,
  PaymentInitializationDto,
  VetProfileDto,
} from "@wafrivet/types";
import { apiClient } from "../client";

export async function getProcurementDraft(): Promise<DraftCartDto> {
  const { data } = await apiClient.get<DraftCartDto>("/vet/procurement/draft");
  return data;
}

export async function upsertProcurementDraft(body: { items: { offerId: string; quantity: number }[] }) {
  const { data } = await apiClient.post<DraftCartDto>("/vet/procurement/draft", body);
  return data;
}

export async function clearProcurementDraft() {
  await apiClient.delete("/vet/procurement/draft");
}

export async function submitProcurementOrder() {
  const { data } = await apiClient.post("/vet/procurement", {});
  return data;
}

export async function listShopperOrders(params?: { cursor?: string; limit?: number }) {
  const { data } = await apiClient.get<OrderListResponseDto>("/vet/orders", { params });
  return data;
}

export async function getShopperOrder(orderId: string) {
  const { data } = await apiClient.get(`/vet/orders/${orderId}`);
  return data;
}

export async function cancelShopperOrder(orderId: string) {
  const { data } = await apiClient.patch(`/vet/orders/${orderId}/cancel`, {});
  return data;
}

export async function initializePayment(body: { orderId: string }) {
  const { data } = await apiClient.post<PaymentInitializationDto>("/payments/initialize", body);
  return data;
}

export async function verifyPayment(paymentId: string, source?: "callback" | "manual") {
  const { data } = await apiClient.get(`/payments/${paymentId}/verify`, {
    params: source ? { source } : undefined,
  });
  return data;
}

export async function getVetProfile(): Promise<VetProfileDto> {
  const { data } = await apiClient.get<VetProfileDto>("/vet/profile");
  return data;
}

export async function patchVetProfile(body: Partial<VetProfileDto>) {
  const { data } = await apiClient.patch<VetProfileDto>("/vet/profile", body);
  return data;
}

export async function listNotifications(params?: { cursor?: string; limit?: number }) {
  const { data } = await apiClient.get("/notifications", { params });
  return data;
}
