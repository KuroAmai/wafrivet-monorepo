import type { GatewayOnboardingRole } from "./roles";

export type { GatewayOnboardingRole };

export type StartOnboardingDto = {
  role: GatewayOnboardingRole;
};

export type OnboardingSessionDto = {
  id: string;
  role?: GatewayOnboardingRole;
  status?: string;
  sessionId?: string;
};

export type SubmitOnboardingDto = {
  role: GatewayOnboardingRole;
  regionId: string;
  businessName: string;
  phone: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  vcnLicenseNumber?: string;
  nafdacLicenseNumber?: string;
  cacNumber?: string;
  workingHours?: string;
};

export type UpdateUserProfileDto = {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatarUrl?: string;
};
