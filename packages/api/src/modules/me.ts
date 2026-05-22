import { apiClient } from "../client";

export async function getDashboardLayout() {
  const { data } = await apiClient.get("/me/dashboard-layout");
  return data;
}
