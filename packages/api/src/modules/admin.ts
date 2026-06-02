import type {
  AdminOrderListResponseDto,
  AdminUserDetailDto,
  AdminUserListResponseDto,
  AdminWarRoomSnapshotDto,
  OrderStatus,
} from "@wafrivet/types";
import { apiClient } from "../client";

export async function getWarRoomSnapshot(): Promise<AdminWarRoomSnapshotDto> {
  const { data } = await apiClient.get<AdminWarRoomSnapshotDto>("/admin/war-room/snapshot");
  return data;
}

export async function listAdminOrders(params?: {
  limit?: number;
  cursor?: string;
  status?: OrderStatus;
}): Promise<AdminOrderListResponseDto> {
  const { data } = await apiClient.get<AdminOrderListResponseDto>("/admin/orders", { params });
  return data;
}

export async function listAdminUsers(params?: {
  limit?: number;
  cursor?: string;
}): Promise<AdminUserListResponseDto> {
  const { data } = await apiClient.get<AdminUserListResponseDto>("/admin/users", { params });
  return data;
}

export async function getAdminUser(userId: string): Promise<AdminUserDetailDto> {
  const { data } = await apiClient.get<AdminUserDetailDto>(`/admin/users/${userId}`);
  return data;
}

export async function deactivateAdminUser(
  userId: string,
  body: { reason: string },
): Promise<{ id: string; role: string; isActive: boolean; updatedAt: string }> {
  const { data } = await apiClient.patch(`/admin/users/${userId}/deactivate`, body);
  return data;
}

export async function deleteAdminUser(
  userId: string,
  body: { reason: string },
): Promise<{ id: string; deleted: true }> {
  const { data } = await apiClient.delete(`/admin/users/${userId}`, { data: body });
  return data;
}

export async function updateOrderStatus(
  orderId: string,
  body: { newStatus: OrderStatus; adminNote: string },
): Promise<unknown> {
  const { data } = await apiClient.patch(`/admin/orders/${orderId}/status`, body);
  return data;
}

export async function listAdminCatalog(params?: { limit?: number; cursor?: string }) {
  const { data } = await apiClient.get("/admin/catalog", { params });
  return data;
}

export async function listOversightSuppliers(params?: { limit?: number; cursor?: string }) {
  const { data } = await apiClient.get("/admin/oversight/suppliers", { params });
  return data;
}
