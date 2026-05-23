import { cookies } from "next/headers";
import type { GatewayOnboardingRole, PlatformSelectableRole } from "@wafrivet/types";
import { FALLBACK_ROLE_OPTIONS, FALLBACK_REGIONS, isKycPlatformRole } from "./roleOptionsFallback";

const MOCK_PROFILE_COOKIE = "wafrivet_mock_profile";

export const MOCK_ROLE_OPTIONS = FALLBACK_ROLE_OPTIONS;
export const MOCK_REGIONS = FALLBACK_REGIONS;

type MockProfile = {
  roles: PlatformSelectableRole[];
  kyc_required_for: GatewayOnboardingRole[];
  profileComplete: boolean;
};

const DEFAULT_MOCK_PROFILE: MockProfile = {
  roles: ["REGULAR_CUSTOMER"],
  kyc_required_for: [],
  profileComplete: false,
};

function kycForRoles(roles: PlatformSelectableRole[]): GatewayOnboardingRole[] {
  return roles.filter(isKycPlatformRole);
}

async function readMockProfile(): Promise<MockProfile> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(MOCK_PROFILE_COOKIE)?.value;
  if (!raw) return { ...DEFAULT_MOCK_PROFILE };
  try {
    return JSON.parse(raw) as MockProfile;
  } catch {
    return { ...DEFAULT_MOCK_PROFILE };
  }
}

async function writeMockProfile(profile: MockProfile): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(MOCK_PROFILE_COOKIE, JSON.stringify(profile), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function getMockAuthMe() {
  const profile = await readMockProfile();
  return {
    id: "mock-user",
    email: "demo@wafrivet.com",
    role: profile.roles[0] ?? "REGULAR_CUSTOMER",
    roles: profile.roles,
    kyc_required_for: profile.kyc_required_for,
    isVerified: true,
    isActive: true,
  };
}

export async function applyMockRoleSelection(
  roles: PlatformSelectableRole[],
): Promise<MockProfile> {
  const selected = roles.length > 0 ? roles : (["REGULAR_CUSTOMER"] as PlatformSelectableRole[]);
  const kyc_required_for = kycForRoles(selected);
  const profile: MockProfile = {
    roles: selected,
    kyc_required_for,
    profileComplete: kyc_required_for.length === 0,
  };
  await writeMockProfile(profile);
  return profile;
}

export async function markMockProfileComplete(): Promise<void> {
  const profile = await readMockProfile();
  await writeMockProfile({
    ...profile,
    kyc_required_for: [],
    profileComplete: true,
  });
}

export async function markMockProfileSaved(): Promise<void> {
  const profile = await readMockProfile();
  await writeMockProfile({ ...profile, profileComplete: false });
}
