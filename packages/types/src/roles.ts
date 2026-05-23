/** Platform roles selectable after signup (gateway GET /roles/options, POST /roles/select). */
export type PlatformSelectableRole =
  | "FARMER"
  | "REGULAR_CUSTOMER"
  | "VET"
  | "SUPPLIER"
  | "MANUFACTURER";

export type GatewayOnboardingRole = "VET" | "SUPPLIER" | "MANUFACTURER";

export type RoleOptionDto = {
  id: PlatformSelectableRole;
  name: string;
  label: string;
  description: string;
  requires_kyc: boolean;
};

export type RoleOptionsResponseDto = {
  roles: RoleOptionDto[];
};

export type SelectRolesDto = {
  roles: PlatformSelectableRole[];
};

export type SelectRolesResponseDto = {
  user: {
    id: string;
    roles: PlatformSelectableRole[];
    kyc_required_for: GatewayOnboardingRole[];
  };
};

export type RegionDto = {
  id: string;
  name: string;
  isActive?: boolean;
  defaultDeliveryFee?: number;
};

export type RegionListResponseDto = {
  data?: RegionDto[];
  regions?: RegionDto[];
  meta?: {
    nextCursor?: string | null;
    hasNextPage?: boolean;
  };
};
