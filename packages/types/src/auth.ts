export type UserRole = "ADMIN" | "VET" | "SUPPLIER" | "RIDER";

export type HerdRole = "FARMER" | "VETERINARIAN" | "FIELD_AGENT" | "ADMIN" | "SUPPORT";

export type LoginDto = {
  email: string;
  password: string;
};

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
};

export type RefreshTokenDto = {
  refreshToken?: string;
};
