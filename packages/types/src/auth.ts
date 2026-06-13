import type { GatewayOnboardingRole } from "./roles";

export type UserRole =
  | "ADMIN"
  | "SUPPORT"
  | "VET"
  | "SUPPLIER"
  | "MANUFACTURER"
  | "RIDER"
  | "FARMER"
  | "REGULAR_CUSTOMER"
  | "PERSON"
  | "SECURITY_COMPANY";

export type HerdRole = "FARMER" | "VETERINARIAN" | "FIELD_AGENT" | "ADMIN" | "SUPPORT";

export type LoginDto = {
  email: string;
  password: string;
};

/** Legacy product-facing role ids used in some UI labels. */
export type SignupRole = "farmer" | "vet" | "chemist" | "distributor";

export type SignupDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  referralCode?: string;
};

export type AuthTokenResponseDto = {
  accessToken: string;
  expiresIn: number;
};

export type AuthUserProfileDto = {
  id: string;
  email: string;
  role: UserRole;
  roles?: UserRole[];
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatarUrl?: string | null;
  phone?: string;
};

export type AuthMeDto = {
  id: string;
  email?: string;
  role?: UserRole | string;
  roles?: (UserRole | string)[];
  kyc_required_for?: GatewayOnboardingRole[];
  isVerified?: boolean;
  isActive?: boolean;
  firstName?: string | null;
  lastName?: string | null;
  displayName?: string | null;
  avatarUrl?: string | null;
  phone?: string | null;
  createdAt?: string;
  user?: {
    id?: string;
    roles?: (UserRole | string)[];
    kyc_required_for?: GatewayOnboardingRole[];
  };
};

export type RefreshTokenDto = {
  refreshToken?: string;
};
