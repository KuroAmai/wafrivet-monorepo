import type { AuthMeDto } from "@wafrivet/types";
import { redirectByRole } from "@wafrivet/auth";
import { hasRolesConfirmed } from "@/lib/onboardingSession";
import {
  normalizePlatformRoles,
  pickPrimaryProductRole,
} from "@/lib/platformRoles";

function extractRoles(me: AuthMeDto): string[] {
  const fromUser = me.user?.roles ?? [];
  const top = me.roles ?? [];
  const single = me.role ? [me.role] : [];
  return [...top, ...fromUser, ...single];
}

function extractKycRequired(me: AuthMeDto): string[] {
  return me.kyc_required_for ?? me.user?.kyc_required_for ?? [];
}

/** True when user must complete /onboarding (role pick and/or KYC). */
export function needsOnboarding(me: AuthMeDto): boolean {
  const kyc = extractKycRequired(me);
  if (kyc.length > 0) return true;

  const roles = normalizePlatformRoles(extractRoles(me));
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

  if (needsOnboarding(me)) {
    return "/onboarding";
  }

  const productRole = pickPrimaryProductRole(extractRoles(me));
  if (!productRole) {
    return "/onboarding";
  }

  const dest = redirectByRole(productRole);
  return dest;
}
