import type {
  RoleOptionsResponseDto,
  SelectRolesDto,
  SelectRolesResponseDto,
} from "@wafrivet/types";
import { apiClient } from "../client";

export async function getRoleOptions(): Promise<RoleOptionsResponseDto> {
  const { data } = await apiClient.get<RoleOptionsResponseDto>("/roles/options");
  return data;
}

export async function selectRoles(body: SelectRolesDto): Promise<SelectRolesResponseDto> {
  const { data } = await apiClient.post<SelectRolesResponseDto>("/roles/select", body);
  return data;
}
