import type { AuthMeDto } from "@wafrivet/types";
import {
  extractRolesFromMe,
  hasAdminAccess,
  isAllowedReturnTo,
  redirectByRole,
  resolveProductRoleFromRoles,
  returnToMatchesRole,
} from "@wafrivet/auth";
import {
  clearStoredReturnTo,
  persistReturnTo,
  readStoredReturnTo,
} from "@/lib/authReturnTo";
import { needsOnboarding } from "@/lib/resolveAuthDestination";

function pickReturnTo(returnToFromQuery?: string | null): string | null {
  if (returnToFromQuery && isAllowedReturnTo(returnToFromQuery)) {
    return returnToFromQuery;
  }
  return readStoredReturnTo();
}

/** Post-login / verify / onboarding destination; honors safe cross-app `returnTo`. */
export async function resolvePostAuthDestination(
  returnToFromQuery?: string | null,
): Promise<string> {
  const returnToRaw = pickReturnTo(returnToFromQuery);

  const res = await fetch("/api/auth/me", { credentials: "same-origin" });
  if (!res.ok) {
    return "/login";
  }
  const me = (await res.json()) as AuthMeDto;

  if (hasAdminAccess(extractRolesFromMe(me))) {
    clearStoredReturnTo();
    return returnToRaw && returnToRaw.startsWith("/admin") ? returnToRaw : "/admin";
  }

  if (needsOnboarding(me)) {
    if (returnToRaw) persistReturnTo(returnToRaw);
    return "/onboarding";
  }

  const productRole = resolveProductRoleFromRoles(extractRolesFromMe(me));
  if (!productRole) {
    clearStoredReturnTo();
    return "/onboarding";
  }

  if (returnToRaw && returnToMatchesRole(returnToRaw, productRole)) {
    clearStoredReturnTo();
    return returnToRaw;
  }

  clearStoredReturnTo();
  return redirectByRole(productRole);
}
