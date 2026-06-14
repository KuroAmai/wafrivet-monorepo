import type { AuthMeDto } from "@wafrivet/types";
import { redirectByRole, extractRolesFromMe, hasAdminAccess } from "@wafrivet/auth";
import { hasRolesConfirmed } from "@/lib/onboardingSession";
import {
  normalizePlatformRoles,
  pickPrimaryProductRole,
} from "@/lib/platformRoles";

function extractKycRequired(me: AuthMeDto): string[] {
  return me.kyc_required_for ?? me.user?.kyc_required_for ?? [];
}

export { extractKycRequired };

/** True when user must complete /onboarding (role pick only — KYC business profile is optional). */
export function needsOnboarding(me: AuthMeDto): boolean {
  if (hasAdminAccess(extractRolesFromMe(me))) {
    return false;
  }

  const roles = normalizePlatformRoles(extractRolesFromMe(me));
  if (roles.length === 0) return true;
  if (roles.length === 1 && roles[0] === "REGULAR_CUSTOMER" && !hasRolesConfirmed()) {
    return true;
  }
  return false;
}

/** Where to send the user after login, verify, or onboarding completion. */
export async function resolveAuthDestination(): Promise<string> {
  const res = await fetch("/api/auth/me", { credentials: "same-origin" });
  if (!res.ok) {
    return "/login";
  }
  const me = (await res.json()) as AuthMeDto;

  if (hasAdminAccess(extractRolesFromMe(me))) {
    return "/admin";
  }

  if (needsOnboarding(me)) {
    return "/onboarding";
  }

  const productRole = pickPrimaryProductRole(extractRolesFromMe(me));
  if (!productRole) {
    return "/onboarding";
  }

  return redirectByRole(productRole);
}
